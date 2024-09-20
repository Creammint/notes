---
title: Excel文件上传
createTime: 2024/09/20 18:06:34
permalink: /java/skg8dhyj/
---
# Excel文件上传后端

## 业务背景

人员大类管理模块：通过Excel批量导入，如有报错则需要导出报错信息；

1. 判断表头是否正确 isValidTemplate() 方法，判断导入文件是否为空或只有表头；

2. 判断Excel的单元格数据是否填写规范，排除null、数据类型不规范等，记录错误信息；

3. 判断人员和大类信息是否在当前数据库中存在，记录错误信息；

   > 1. 数据量小：人员信息和大类信息单独查出来，放到 list集合中，然后跟file中的数据对比；
   > 2. 数据量大：单行去对比

4. 如有错误信息，则把错误信息存到redis中，设置存储时间为5min；用户导出错误信息Excel表格；

5. 最后导入到数据库中；



## 依赖包pom.xml

```xml
<!-- Web 相关 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- redis 相关 -->
<dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-redis</artifactId>
    <optional>true</optional>
</dependency>
```



## 实体类

在需要导出的字段上增加注解 `@ExcelProperty("字段名")`

如该字段不需要导出则添加 `@ExcelIgnore`

如果某个字段不需要映射到数据库列，可以通过 `@TableField` 来忽略它。

```java 
@Schema(description = "管理后台 - 大类人员管理企划 Response VO")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ExcelIgnoreUnannotated
public class BigCategoriesPlanRespVO extends BaseDO {

    @Schema(description = "编号", requiredMode = Schema.RequiredMode.REQUIRED, example = "4128")
    private Long id;

    @Schema(description = "大类代码", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("大类代码")
    private String bigCode;

    @Schema(description = "大类名称", example = "美天惠")
    @ExcelProperty("大类名称")
    private String bigName;

    @Schema(description = "企划专员代码")
    @ExcelProperty("企划专员代码")
    private String planningSpecialistCode;

    @Schema(description = "企划专员姓名", example = "赵六")
    @ExcelProperty("企划专员姓名")
    private String planningSpecialistName;

    @Schema(description = "企划主管代码")
    @ExcelProperty("企划主管代码")
    private String planningDirectorCode;

    @Schema(description = "企划主管姓名", example = "王五")
    @ExcelProperty("企划主管姓名")
    private String planningDirectorName;

    @Schema(description = "状态", requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    @ExcelProperty("状态")
    private Integer status;

    @Schema(description = "备注", example = "你说的对")
    @ExcelProperty("备注")
    private String remark;

    @Schema(description = "父编号", requiredMode = Schema.RequiredMode.REQUIRED, example = "26306")
    private Integer parentId;

    @Schema(description = "创建时间", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime createTime;

    @Schema(description = "校验说明")
    private String checkSpecification;

    @Schema(description = "创建人")
    private String creator;

    @Schema(description = "修改人")
    private String updater;

    @TableField(exist = false)
    private String creatorName;

    @TableField(exist = false)
    private String updaterName;

    @TableField(exist = false)
    private List<BigCategoriesPlanDO> voList;
}
```





## Controller层

```java 
@PostMapping("/import")
@Operation(summary = "导入大类人员管理企划")
@Parameters({
    @Parameter(name = "file", description = "Excel 文件", required = true),
    @Parameter(name = "updateSupport", description = "是否支持更新，默认为 false", example = "true")
})
public Object importExcel(@RequestParam("file") MultipartFile file,
                          @RequestParam(value = "updateSupport", required = false, defaultValue = "false") Boolean updateSupport
                         ) throws Exception {
    return bigCategoriesPlanService.importBigCategoriesPlanList(file, updateSupport);
}


@GetMapping("/export-error")
@Operation(summary = "获得导入大类人员管理企划失败信息")
public void exportError(HttpServletResponse response) throws IOException {
    // 手动创建导出 demo
    List<BigCategoriesPlanRespErrorVO> list = bigCategoriesPlanService.exportBigCategoriesPlanErrorList(response);
    // 输出
    ExcelUtils.write(response, "错误信息.xls", "大类人员管理企划", BigCategoriesPlanRespErrorVO.class, list);
}
```



## Service层

### Excel导入

`STATUS_NOT_EXISTS` 、`BIG_CATEGORIES_ERROR` 等这些字段属于枚举类，自己定义错误信息，可以自己填写；

```java 
private static final Logger log = LoggerFactory.getLogger(BigCategoriesPlanServiceImpl.class);

@Resource
private BigCategoriesPlanMapper bigCategoriesPlanMapper;

@Resource
private StringRedisTemplate stringRedisTemplate;

@Resource
private AdminUserApi userApi;


@Override
public Object importBigCategoriesPlanList(MultipartFile file, Boolean updateSupport) throws IOException {
    // 定义 Redis 的 key
    String redisKey = "BigCategoriesPlan:ErrorList"+getLoginUser().getId();
    // 每次新导入前，清除旧的记录
    stringRedisTemplate.delete(redisKey);

    // 校验大类
    List<BigCategoriesPlanRespVO> allCategories = bigCategoriesPlanMapper.getAllCategories();
    // 检验人员
    List<AdminUserRespDTO> allUser = userApi.getUserLists().getData();

    Map<String, String> collect1 = allCategories.stream()
        .filter(v -> v.getBigCode() != null && v.getBigName() != null)
        .collect(Collectors.toMap(BigCategoriesPlanRespVO::getBigCode, BigCategoriesPlanRespVO::getBigName));

    Map<Long, String> collect2 = allUser.stream()
        .filter(v -> v.getId() != null && v.getNickname() != null)
        .collect(Collectors.toMap(AdminUserRespDTO::getId, AdminUserRespDTO::getNickname));

    // 导入失败原因记录
    List<BigCategoriesPlanRespErrorVO> errorVOList = new ArrayList<>();

    // 记录导入成功的信息
    List<BigCategoriesPlanRespVO> arrayList = new ArrayList<>();

    // 读取工作簿
    Workbook workBook = WorkbookFactory.create(file.getInputStream());
    // 读取工作表
    Sheet sheet = workBook.getSheetAt(0);

    // 验证表头是否符合预期
    Row titleRow = sheet.getRow(0);
    if (!isValidTemplate(titleRow)) {
        return error(new ErrorCode(1_006_000_007, "Excel表格的表头不正确"));
    }

    // 判断导入文件是否为空或只有表头
    if (sheet == null || sheet.getPhysicalNumberOfRows() <= 1) {
        throw exception(BIG_CATEGORIES_ERROR);
    }

    // 用于跟踪已处理的 BigCode 及其首次出现的行号
    Map<String, Integer> bigCodeMap = new HashMap<>();

    for (Row row : sheet) {
        if(row.getRowNum() > 0) {
            BigCategoriesPlanRespVO rowData;

            //导入失败原因记录
            BigCategoriesPlanRespErrorVO errorVO = new BigCategoriesPlanRespErrorVO();
            StringBuilder errorRecord = new StringBuilder();
            StringBuilder error = new StringBuilder();

            rowData = parseRow(row);

            log.info("打印每一行数据===>{}", JSON.toJSONString(rowData));
            // 数据校验
            verifyData(rowData, collect1, collect2, error);

            // 检查 BigCode 是否重复
            if (bigCodeMap.containsKey(rowData.getBigCode())) {
                int firstOccurrenceRowNum = bigCodeMap.get(rowData.getBigCode());
                error.append("大类代码重复: ").append(rowData.getBigCode())
                    .append("，出现在第 ").append(firstOccurrenceRowNum).append(" 行;\n");
            } else {
                bigCodeMap.put(rowData.getBigCode(), row.getRowNum());
            }

            errorVO.setBigCode(rowData.getBigCode())
                .setBigName(rowData.getBigName())
                .setPlanningSpecialistCode(rowData.getPlanningSpecialistCode())
                .setPlanningSpecialistName(rowData.getPlanningSpecialistName())
                .setPlanningDirectorCode(rowData.getPlanningDirectorCode())
                .setPlanningDirectorName(rowData.getPlanningDirectorName())
                // 判断 getStatus 的值，0 为 "有效"，1 为 "无效"，其他保留原值
                .setStatus(rowData.getStatus() == 0 ? "有效" : (rowData.getStatus() == 1 ? "无效" : rowData.getStatus().toString()))
                .setRemark(rowData.getRemark());
            log.info("error-->{}",error);
            //记录 错误信息 到 校验说明 中
            if (!error.isEmpty()) {
                errorVO.setCheckSpecification(String.valueOf(errorRecord.append("第").append(row.getRowNum()).append("行数据有错误,").append(error).append("\n")));
                errorVOList.add(errorVO);
            }else{
                arrayList.add(rowData);
            }
        }
    }
    log.info("校验说明errorRecord=====>{}", errorVOList);

    // 过滤出 CheckSpecification 不为空的 errorVO
    List<BigCategoriesPlanRespErrorVO> validErrorVOList = errorVOList.stream()
        .filter(errorVO -> errorVO.getCheckSpecification() != null && !errorVO.getCheckSpecification().isEmpty())
        .collect(Collectors.toList());

    if (!CollUtil.isEmpty(validErrorVOList)) {
        // 将错误列表存入 Redis，并设置5分钟的过期时间
        stringRedisTemplate.opsForValue().set(redisKey, JSON.toJSONString(errorVOList), 3000, TimeUnit.MINUTES);
        // 抛出异常
        return error(-1,BIG_CATEGORIES_FAIL.getMsg());
        //            throw exception(BIG_CATEGORIES_FAIL);
    }

    // 不为空批量导入
    if (CollUtil.isNotEmpty(arrayList)) {
        log.info("arrayList===>{}", JSON.toJSONString(arrayList));
        List<String> category = arrayList.stream().map(BigCategoriesPlanRespVO::getBigCode).toList();

        // 校验大类是否存在
        validateCategoriesExists(category);
        bigCategoriesPlanMapper.insertBatch(BeanUtils.toBean(arrayList, BigCategoriesPlanDO.class));
    }
    return success(null,"导入成功");
}


private BigCategoriesPlanRespVO parseRow(Row row) {
    BigCategoriesPlanRespVO rowData = new BigCategoriesPlanRespVO();
    if (row.getCell(0) != null){
        rowData.setBigCode(getStringValue(row.getCell(0)));
    }
    if (row.getCell(1) != null){
        rowData.setBigName(getStringValue(row.getCell(1)));
    }

    if (row.getCell(2) != null){
        rowData.setPlanningSpecialistCode(getStringValue(row.getCell(2)));
    }

    if (row.getCell(3) != null){
        rowData.setPlanningSpecialistName(getStringValue(row.getCell(3)));
    }
    if (row.getCell(4) != null){
        rowData.setPlanningDirectorCode(getStringValue(row.getCell(4)));

    }
    if (row.getCell(5) != null){
        rowData.setPlanningDirectorName(getStringValue(row.getCell(5)));
    }
    if (row.getCell(6) != null){
        if ("有效".equals(getStringValue(row.getCell(6)))){
            rowData.setStatus(0);
        }else if ("无效".equals(getStringValue(row.getCell(6)))){
            rowData.setStatus(1);
        }else {
            rowData.setStatus(2);
        }
    }
    if (row.getCell(7) != null){
        rowData.setRemark(getStringValue(row.getCell(7)));
    }
    return rowData;
}


private void verifyData(BigCategoriesPlanRespVO data, Map<String, String> collect1, Map<Long, String> collect2, StringBuilder errorRecord) {
    // 校验大类
    if (StringUtils.isEmpty(data.getBigCode())) {
        errorRecord.append(BIGCODE_NOT_EXISTS.getMsg()).append("\n");
    } else {
        if (collect1.containsKey(data.getBigCode())) {
            data.setBigName(collect1.get(data.getBigCode()));
        } else {
            errorRecord.append(BIGCODE_SYSTEM_NOT_EXISTS.getMsg()).append("\n");
        }
    }

    // 校验用户-企划
    if (data.getPlanningSpecialistCode() == null) {
        errorRecord.append(PLANNINGSPECIALISTCODE_REQUIRED.getMsg()).append("\n");
    } else {
        try {
            Long specialistCode = Long.valueOf(data.getPlanningSpecialistCode());
            if (collect2.containsKey(specialistCode)) {
                data.setPlanningSpecialistName(collect2.get(specialistCode));
            } else {
                errorRecord.append(PLANNINGSPECIALISTCODE_SYSTEM_NOT_EXISTS.getMsg()).append("\n");
            }
        } catch (NumberFormatException e) {
            errorRecord.append("企划专员代码格式不正确，请确认!").append("\n");
        }
    }

    // 校验企划负责人
    if (data.getPlanningDirectorCode() == null) {
        errorRecord.append(PLANNINGDIRECTORCODE_REQUIRED.getMsg()).append("\n");
    } else {
        try {
            Long directorCode = Long.valueOf(data.getPlanningDirectorCode());
            if (collect2.containsKey(directorCode)) {
                data.setPlanningDirectorName(collect2.get(directorCode));
            } else {
                errorRecord.append(PLANNINGDIRECTORCODE_SYSTEM_NOT_EXISTS.getMsg()).append("\n");
            }
        } catch (NumberFormatException e) {
            errorRecord.append("企划主管代码格式不正确，请确认!").append("\n");
        }
    }

    // 校验状态
    Optional<String> status = Optional.ofNullable(String.valueOf(data.getStatus()));
    if (!status.isPresent()) {
        errorRecord.append(STATUS_REQUIRED.getMsg()).append("\n");
    } else if (data.getStatus() == 2) {
        errorRecord.append(STATUS_NOT_EXISTS.getMsg()).append("\n");
    }
}

private void validateCategoriesExists(List<String> bigCode) {
    List<BigCategoriesPlanDO> bigCategoriesDOList = bigCategoriesPlanMapper.selectList(new LambdaQueryWrapper<BigCategoriesPlanDO>()
                                                                                       .in(BigCategoriesPlanDO::getBigCode, bigCode)
                                                                                       .eq(BigCategoriesPlanDO::getParentId,0));
    if (CollUtil.isNotEmpty(bigCategoriesDOList)) {
        bigCategoriesDOList.forEach(bigCodeDO -> {
            bigCodeDO.setParentId(1);
            bigCodeDO.setStatus(1);
            bigCategoriesPlanMapper.updateBatch(bigCategoriesDOList);
        });
    }
}

private boolean isValidTemplate(Row titleRow) {
    if (titleRow == null) return false;

    List<String> requiredHeaders = Arrays.asList("大类代码", "大类名称", "企划专员代码", "企划专员姓名", "企划主管代码" ,"企划主管姓名","状态","备注");
    for (String header : requiredHeaders) {
        boolean found = false;
        for (Cell cell : titleRow) {
            if (cell.getCellType() == CellType.STRING && cell.getStringCellValue().equals(header)) {
                found = true;
                break;
            }
        }
        if (!found) return false;
    }
    return true;
}
```

### Excel导出失败信息

当用户导入失败时，需要导出错误清单；

![image-20240906162459801](https://y.creammint.cn/articles/images/image-20240906162459801.png)

![image-20240906162624335](https://y.creammint.cn/articles/images/image-20240906162624335.png)

```java 
 @Override
public List<BigCategoriesPlanRespErrorVO> exportBigCategoriesPlanErrorList(HttpServletResponse response) {
    // 定义 Redis 的 key
    String redisKey = "BigCategoriesPlan:ErrorList"+getLoginUser().getId();
    // 从 Redis 中读取错误信息
    String errorList = stringRedisTemplate.opsForValue().get(redisKey);

    log.info("redis缓存错误信息{}",errorList);

    // 如果 Redis 中没有数据，返回空列表
    if (errorList == null) {
        return List.of();
    }

    return JSON.parseArray(errorList,BigCategoriesPlanRespErrorVO.class);
}
```



## 页面展示

前端功能展示：

![image-20240906162056805](https://y.creammint.cn/articles/images/image-20240906162056805.png)

导入模板：

![image-20240906162245031](https://y.creammint.cn/articles/images/image-20240906162245031.png)