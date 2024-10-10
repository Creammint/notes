---
title: Oracle 函数
createTime: 2024/09/23 21:01:31
permalink: /database/oracle/s53l996n/
---
# Oracle函数

## 数值型函数

### trunc

trunc：将数字截尾取整

```sql
trunc(17.991,0)=Trunc(17.991)17,
trunc(17.991,1)=17.9,
trunc(sysdate,’Year’)=xxxx-1-1,
trunc(sysdate,’MM’)=xxxx-xx-1,
trunc(sysdate,’dd’)=trunc(sysdate)=xxxx-xx-xx:0:00:00,
```

### ceil(n)

向上取整：大于或等于数值n的最小整数

```sql
select ceil(10.6) from dual;    --11
```

### floor(n)

向下取整：小于等于数值n的最大整数

```sql
select ceil(10.6) from dual;   --10
```

### mod(m,n)

m除以n的余数,若n=0,则返回m

```sql
select mod(7,5) from dual;    --2
```

### power(m,n)

m的n次方

```sql
select power(3,2) from dual;	--9
```

### round(n,m)

将n四舍五入,保留小数点后m位

```sql
select round(1234.5678,2) from dual;	--1234.57
```

### sign()

sign()：函数根据某个值是0、正数还是负数，分别返回0、1、-1

sign(正数)=1，sign(负数)=-1，sign(0)=0，

### sqrt(n)

n的平方根

```sql
select sqrt(25) from dual ;		--5
```

### to_number()

1. 将char或varchar2类型的string转换为一个number类型的数值，需要注意的是，被转换的字符串必须符合数值类型格式,如果被转换的字符串不符合数值型格式，Oracle将抛出错误提示;

2. to_number和to_char恰好是两个相反的函数；

   ```sql
   select to_number('000012134') from dual;
   select to_number('88877') from dual; 
   ```

   

3. 如果数字在格式范围内的话，就是正确的，否则就是错误的；如：

   ```sql
   select to_number('$12345.678', '$999999.99') from dual;
   select to_number('$12345.678', '$999999.999') from dual;
   ```

   

4. 可以用来实现进制转换；16进制转换为10进制：

   ```sql
   select to_number('19f','xxx') from dual;
   select to_number('f','xx') from dual;
   ```



### abs

获取数字的绝对值

```sql
SELECT ABS(10) FROM DUAL;   –- 返回 10
SELECT ABS(-10) FROM DUAL;   –- 返回 10
```

## 字符函数

### initcap(char)

把每个字符串的第一个字符换成大写

```sql
select initicap('mr.ecop') from dual;	--Mr.Ecop
```



### lower(), upper()

`LOWER()` 函数将字符串中的所有大写字母转换为小写字母。

```sql
SELECT LOWER('HELLO WORLD') FROM dual; 	--hello world
```

`UPPER()` 函数将字符串中的所有小写字母转换为大写字母。

```sql
SELECT UPPER('hello world') FROM dual;  --HELLO WORLD
```



### replace()

函数：replace()
含义：替换字符串
用法：replace(原字段，“原字段旧内容“,“原字段新内容“)

```sql
select replace('Scott','s','Boy') from dual;	--Boycott
```



### length()

`LENGTH` 函数用于返回字符串的字符数。这个函数计算字符串中的字节数，而不是显示的字符数，因此对于多字节字符集，显示的字符数可能与字节数不同。

```sql
SELECT LENGTH('Hello') FROM dual;    --5
```

### ||

并置运算符

```sql
select 'ABCD'||'EFGH' from dual;	--ABCDEFGH
```

### concat

`CONCAT` 函数用于连接两个或多个字符串，也可以用`||`来连接字符串，它在语法上更简单，使用起来更直观。

```sql
SELECT CONCAT('Hello', ' ', 'World') FROM dual;		--Hello World
```

### ltrim ，rtrim ，trim

**`ltrim `**：函数用于去除字符串左侧的指定字符。如果未指定字符，默认去除空格。

```sql
SELECT LTRIM('<=====>BROWNING<=====>', '<>=') FROM dual;	--BROWNING<=====>
```

**`rtrim `**：函数用于去除字符串右侧的指定字符。如果未指定字符，默认去除空格。

```sql
SELECT RTRIM('Tech___', '_.') FROM dual;	--Tech
```

**`trim`**：函数用于去除字符串左侧和/或右侧的指定字符。如果不指定任何参数，`TRIM` 默认去除空格。

语法：TRIM([LEADING|TRAILING|BOTH trim_character FROM] string)

- `LEADING`: 去除字符串左侧的字符。
- `TRAILING`: 去除字符串右侧的字符。
- `BOTH`: 去除字符串两侧的字符。
- `trim_character`: 要去除的字符。
- `string`: 要处理的字符串。

```sql
SELECT TRIM(BOTH 'x' FROM 'xxxxTechxxxxx') FROM dual;	--Tech
```

输出结果将去除字符串两侧的所有 `x` 字符。



### instr()

**使用方法一**：instr( string1, string2 ) >0 / instr(源字符串, 目标字符串)>0

此用法类似like 如果把大于0改成等于0则相当于 not like

```sql
SELECT * FROM TABLE T WHERE INSTR(A.COL,'xx')>0
等同于
SELECT * FROM TABLE T WHERE LIKE '%xx%'
```

**使用方法二**：instr( string1, string2 ) / instr(源字符串, 目标字符串)字符查找函数

在string1中查找string2返回string1中第一次出现string2的下标

```sql
select instr('helloworld','l') from dual --返回的结果是3，oracle中下标从1开始
```

**使用方法三**：instr( string1, string2 ,start_position,times) instr(源字符串, 目标字符串,开始位子，第几次出现)

| –    | h    | e    | l    | l    | o    | w    | o    | r    | l    | d    |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 正序 | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    | 10   |
| 倒序 | -10  | -9   | -8   | -7   | -6   | -5   | -4   | -3   | -2   | -1   |

```sql
1 select instr('helloworld','l',2,2) from dual;
 --返回结果：4 ：在"helloworld"的第2(e)号位置开始，查找第二次出现的“l”的位置
2 select instr('helloworld','l',3,2) from dual; 
--返回结果：4 ：在"helloworld"的第3(l)号位置开始，查找第二次出现的“l”的位置
3 select instr('helloworld','l',4,2) from dual; 
--返回结果：9 ：在"helloworld"的第4(l)号位置开始，查找第二次出现的“l”的位置
4 select instr('helloworld','l',-1,1) from dual;
--返回结果：9 ：在"helloworld"的倒数第1(d)号位置开始，往回查找第一次出现的“l”
5 select instr('helloworld','l',-2,2) from dual; 
--返回结果：4 ：在"helloworld"的倒数第1(d)号位置开始，往回查找第二次出现的“l”的位置
6 select instr('helloworld','l',2,3) from dual;  
--返回结果：9 ：在"helloworld"的第2(e)号位置开始，查找第三次出现的“l”的位置
7 select instr('helloworld','l',-2,3) from dual;  
--返回结果：3 ：在"helloworld"的倒数第2(l)号位置开始，往回查找第三次出现的“l”
```



### substr()

函数用于从字符串中提取子字符串

```sql
-- 提取前5个字符开始的剩余所有字符
SELECT SUBSTR('Hello World', 1, 5) FROM dual;	--Hello
-- 提取从第8个字符开始的剩余所有字符
SELECT SUBSTR('Hello World', 8) FROM dual;		--World
-- 提取从第2个字符开始的3个字符
SELECT SUBSTR('Hello World', 2, 3) FROM dual;	--ell
-- 提取从字符串末尾的第5个字符开始的所有字符
SELECT SUBSTR('Hello World', -5) FROM dual;		--World
```



### decode

decode(条件,值1,返回值1,值2,返回值2,…值n,返回值n,缺省值)
该函数的含义如下：

```sql
IF 条件=值1 THEN
   RETURN(翻译值1)
ELSIF 条件=值2 THEN
   RETURN(翻译值2)
ELSIF 条件=值n THEN
   RETURN(翻译值n)	
  ......
ELSE　　　　
     RETURN(缺省值)
END IF　　　　
```

decode(字段或字段的运算，值1，值2，值3）
这个函数运行的结果是，当字段或字段的运算的值等于值1时，该函数返回值2，否则返回值3
当然值1，值2，值3也可以是表达式，这个函数使得某些sql语句简单了许多



### to_date()

函数在Oracle数据库中用于将字符串转换为日期类型。它使用特定的格式模型来解析字符串，并将其转换为Oracle的日期类型。

`语法:`TO_DATE(string, format)

`格式模型:`

- `YYYY` 四位年份
- `MM` 两位月份
- `DD` 两位日期
- `HH24` 两位24小时制小时
- `MI` 分钟
- `SS` 秒

```sql
SELECT TO_DATE('2023-03-01', 'YYYY-MM-DD') FROM dual;	
```

`NLS参数:` `TO_DATE` 函数也可以接受NLS参数来定义一些特定的本地化设置，例如：

- `NLS_DATE_LANGUAGE` 定义日期和时间的语言。

```sql
SELECT TO_DATE('2023-03-01', 'YYYY-MM-DD', 'NLS_DATE_LANGUAGE = American') FROM dual;
```

### to_char()

`TO_CHAR` 函数在Oracle数据库中用于将数值或日期时间类型的数据转换为格式化的字符串。这个函数非常灵活，可以接受不同的格式模型来定义输出的字符串格式。

#### 转换日期和时间

当转换日期和时间时，`TO_CHAR` 可以使用各种格式模型来定义输出的字符串，例如：

- `'YYYY-MM-DD HH24:MI:SS'`：将日期时间转换为年-月-日 时:分:秒的格式。
- `'DD MON YYYY'`：将日期转换为日 月名 年的格式。
- `'HH24:MI'`：仅转换时间为小时:分钟的格式。

```sql
SELECT TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') FROM dual;
```

#### 转换数字

当转换数字时，`TO_CHAR` 同样可以接受格式模型来定义输出的字符串，例如：

- `'999,999.99'`：将数字转换为带有千分位和两位小数的格式。
- `'$9999.99'`：将数字转换为货币格式。

```sql
SELECT TO_CHAR(1234567.89, '999,999.99') FROM dual;
```

#### 格式化选项

`TO_CHAR` 函数支持许多格式化选项，包括但不限于：

- `'FM'`：去除前导和尾随的空格。
- `'MI'`：在正数前添加空格，在负数前添加负号。
- `'99'`：填充数字，如果数字不足则用空格填充。
- `'0'`：填充数字，如果数字不足则用0填充。

```sql
SELECT TO_CHAR(123, 'FM9990999.9') FROM dual;
```

#### NLS参数

`TO_CHAR` 函数还可以接受NLS参数来定义一些特定的本地化设置，例如：

- `'NLS_DATE_LANGUAGE = language'`：定义日期和时间的语言。
- `'NLS_NUMERIC_CHARACTERS = .,'`：定义小数点和组分隔符。

```sql
SELECT TO_CHAR(1234567.89, '999,999.99', 'NLS_NUMERIC_CHARACTERS = .,') FROM dual;
```



### lpad，rpad

`LPAD` 函数用于在字符串的左侧填充指定的字符，直到达到指定的长度。

```sql
LPAD(str, len [, padstr ])
```

- `str`: 需要被填充的字符串，可以是 `CHAR`, `VARCHAR2`, `NCHAR`, `NVARCHAR2`, `CLOB`, 或 `NCLOB`。
- `len`: 填充后的字符串长度，必须是 `NUMBER` 整数或可以隐式转换为 `NUMBER` 整数的值。
- `padstr`: 可选参数，用于填充到原字符串左侧的字符串，默认值为空格。

```sql
SELECT LPAD('Hello', 10, '*') FROM dual;	--*****Hello
```



`RPAD` 函数用于在字符串的右侧填充指定的字符，直到达到指定的长度。

```sql
SELECT RPAD('Hello', 10, '*') FROM dual;	--Hello*****
```



## 日期函数

### **获取当前时间**

```sql
select sysdate from dual;
```

### **日期格式**

以2023-03-02 17:09:23 为例

|                | **格式** |   **类型**   |               **名称**                |             **示例**             |
| :------------: | :------: | :----------: | :-----------------------------------: | :------------------------------: |
|   年（Year）   |    yy    |  two digits  |                两位年                 |              显示23              |
|                |   yyy    | three digits |                三位年                 |             显示023              |
|                |   yyyy   | four digits  |                四位年                 |             显示2023             |
|  月（Month）   |    mm    |    number    |                两位月                 |              显示03              |
|                |   mon    | abbreviated  |              字符集表示               |   显示3月(若是英文版，显示Mar)   |
|                |  month   | spelled out  |              字符集表示               |  显示3月(若是英文版，显示March)  |
|   日（Day）    |    dd    |    number    |              当月第几天               |              显示02              |
|                |   ddd    |    number    |              当年第几天               |             显示061              |
|                |    dy    | abbreviated  |            当周第几天缩写             |  显示星期四，若是英文版显示Thur  |
|                |   day    | spelled out  |            当周第几天全写             | 显示星期三，若是英语显示Thursday |
|                |    d     |    number    |         当周第几天，返回数字          |     显示5, 每周第1天是星期天     |
|                |  ddspth  | spelled out  |        当月第几天（英文显示）         |            显示second            |
|   Hour（时）   |    hh    |  two digits  |               12小时制                |              显示05              |
|                |   hh24   |  two digits  |               24小时制                |              显示17              |
|  Minute（分）  |    mi    |  two digits  |                60进制                 |              显示09              |
|  Second（秒）  |    ss    |  two digits  |                60进制                 |              显示23              |
| Quarter(季度） |    Q     |    digit     |                 季度                  |              显示1               |
|   当年第几周   |    WW    |    digit     | 当年第几周（从年的第一天算7天为一周） |              显示09              |
|                |    IW    |    digit     |              年的自然周               |              显示09              |
|   当月第几周   |    W     |    digit     |              当月第几周               |              显示1               |



### 周

1. WW 是从年的第一天算7天为一周，IW是自然周算的，可以看如下代码：

   ```sql
   select to_char(to_date('2023-03-05','yyyy-mm-dd'),'IW')  from dual;  --09
    
   select to_char(to_date('2023-03-05','yyyy-mm-dd'),'WW')  from dual;  --10
   ```

   24小时格式下时间范围为： 0:00:00 - 23:59:59.... 12小时格式下时间范围为： 1:00:00 - 12:59:59....

2. 一周内的第几天：`D` 每星期的第1天是 `星期日`

3. 按周，月，季度，年分组的写法

   ```sql
   --按周分组：自然周 和 年的第一天算7天为一周
   select to_char(时间字段,'yyyy-IW'),其他字段 from 操作表 group by to_char(时间字段,'yyyy-IW');
   select to_char(时间字段,'yyyy-WW'),其他字段 from 操作表 group by to_char(时间字段,'yyyy-WW');
   
   --按月份分组
   select to_char(时间字段,'yyyy-mm'),其他字段 from 操作表 group by to_char(时间字段,'yyyy-mm');
   
   --按季度分组
   select to_char(时间字段,'yyyy-Q'),其他字段 from 操作表 group by to_char(时间字段,'yyyy-Q');
   
   --按年分组
   select to_char(时间字段,'yyyy'),其他字段 from 操作表 group by to_char(时间字段,'yyyy');
   ```



### to_char

```sql
select to_char(sysdate,'yyyy-mm-dd hh24:mi:ss') as nowTime from dual;   //日期转化为字符串   
select to_char(sysdate,'yyyy') as nowYear   from dual;   //获取时间的年   
select to_char(sysdate,'mm')    as nowMonth from dual;   //获取时间的月   
select to_char(sysdate,'dd')    as nowDay    from dual;   //获取时间的日   
select to_char(sysdate,'hh24') as nowHour   from dual;   //获取时间的时   
select to_char(sysdate,'mi')    as nowMinute from dual;   //获取时间的分   
select to_char(sysdate,'ss')    as nowSecond from dual;   //获取时间的秒
```

### to_date

```sql
select to_date('2023-03-05 17:09:23','yyyy-mm-dd hh24:mi:ss') time from dual; --2023-03-05 17:09:23
```

注意： to_date就要求转换的格式要和输入的字符型日期要对应，不然会报错，如下：

![请添加图片描述](https://y.creammint.cn/articles/images/7f73e5445a4d47ae8027d72b72f18b52.png)

这里是因为少了`时分秒`的缘故。

### NEXT_DAY(X,Y)

X：用于计算的时间

Y： 一个字符串，表示用当前会话语言表示的一周中某一天的全称（如星期一、星期二等），也可以是数值

```
select NEXT_DAY(to_date('2023-03-02','yyyy-MM-dd'),'星期三') nextDay from dual;  --2023-03-08
select NEXT_DAY(to_date('2023-03-02','yyyy-MM-dd'),3) nextDay from dual;  --2023-03-07 
```

注意：每星期的第1天是 `星期日`



### TRUNC(X [,FORMAT])

截断日期，返回的是日期, FORMAT 中与周相关的有D，IW，WW，W，FMWW

```sql
--取周的开始时间和结束时间
SELECT TRUNC(TO_DATE('2023-03-02','YYYY-MM-DD'),'IW') AS STARTDATE FROM DUAL; --本周周一
SELECT TRUNC(TO_DATE('2023-03-02','YYYY-MM-DD'),'IW') + 6 AS ENDDATE FROM DUAL; --本周周日
 
SELECT TRUNC(TO_DATE('2023-03-02','YYYY-MM-DD'),'IW') - 7 AS STARTDATE FROM DUAL;--上周周一   
SELECT TRUNC(TO_DATE('2023-03-02','YYYY-MM-DD'),'IW') - 1  AS ENDDATE FROM DUAL;--上周周日
```



### EXTRACT()

从一个date或者interval类型中截取到特定的部分

```sql
extract (    
 
        { year | month | day | hour | minute | second }    
 
        | { timezone_hour | timezone_minute }    
 
        | { timezone_region | timezone_abbr }    
 
from { date_value | interval_value } )
```

只可以从一个date类型中截取年月日

```sql
select  extract (year from sysdate) year, extract (month from sysdate) month, extract (day from sysdate) day from  dual;

YEAR      MONTH        DAY
------ ---------- ----------
2023         3           2
```

从timestamp中获取年月日时分秒

```sql
select 
 extract(year from systimestamp) year
,extract(month from systimestamp) month
,extract(day from systimestamp) day
,extract(minute from systimestamp) minute
,extract(second from systimestamp) second
,extract(timezone_hour from systimestamp) th
,extract(timezone_minute from systimestamp) tm
,extract(timezone_region from systimestamp) tr
,extract(timezone_abbr from systimestamp) ta
from dual
```

![image-20240923205627645](https://y.creammint.cn/articles/images/image-20240923205627645.png)



### **时间差**

#### **年份差（相差月数/12）**

```
select ((months_between(TO_DATE('2018-5-31','yyyy-mm-dd hh24:mi:ss'),TO_DATE('2016-5-31','yyyy-mm-dd hh24:mi:ss')))/12)
As 相差年份 from dual;
--结果:2 
select trunc(months_between(sysdate, to_date('2017-01-01','yyyy-mm-dd')) / 12) As 相差年份 from dual;
--结果：6
SELECT EXTRACT(YEAR FROM SYSDATE) - EXTRACT(YEAR FROM TO_DATE('2017-01-01','YYYY-MM-DD')) As 相差年份 YEARS FROM DUAL;
--结果:6
```



#### **月数差（months_between()函数）**

```sql
--oracle两个日期的相差月数--
--1）月份都是最后一天，A日期 > B日期 ,返回整数 ---
select months_between(TO_DATE('2018-6-30','yyyy-mm-dd hh24:mi:ss'),TO_DATE('2018-5-31','yyyy-mm-dd hh24:mi:ss'))
As 相差月份1 from dual;  --返结果：1
 
--2）月份都是最后一天，B日期 > A日期 ,返回负数 ---
select months_between(TO_DATE('2018-4-30','yyyy-mm-dd hh24:mi:ss'),TO_DATE('2018-5-31','yyyy-mm-dd hh24:mi:ss'))
As 相差月份2 from dual;  --f返回结果：-1
 
--3）月份天数不一样，A日期 > B日期 ,返回带小数的数字---
select months_between(TO_DATE('2018-6-25','yyyy-mm-dd hh24:mi:ss'),TO_DATE('2018-5-31','yyyy-mm-dd hh24:mi:ss'))
As 相差月份3 from dual;  --返回结果：0.8064516...
```

#### **相差天数（两个日期相减，并用to_number()函数）**

```sql
--Oracle中两个日期相差天数--
select TO_NUMBER(TO_DATE('2023-3-2','yyyy-mm-dd hh24:mi:ss')- TO_DATE('1999-7-15','yyyy-mm-dd hh24:mi:ss'))
AS 相差天数 from dual; --8631
```



#### **相差小时数，分钟数，秒数（时制进行转换）**

```sql
--Oracle中两个日期相差小时数--
select TO_NUMBER((TO_DATE('2018-6-5','yyyy-mm-dd hh24:mi:ss')- TO_DATE('2018-5-31','yyyy-mm-dd hh24:mi:ss'))*24)
AS 相差小时数 from dual;
 
--Oracle中两个日期相差分钟数--
select TO_NUMBER((TO_DATE('2018-6-5','yyyy-mm-dd hh24:mi:ss')- TO_DATE('2018-5-31','yyyy-mm-dd hh24:mi:ss'))*24*60)
AS 相差分钟数 from dual;
 
--Oracle中两个日期相差秒数--
select TO_NUMBER((TO_DATE('2018-6-5','yyyy-mm-dd hh24:mi:ss')- TO_DATE('2018-5-31','yyyy-mm-dd hh24:mi:ss'))*24*60*60)
AS 相差秒数 from dual;
```



#### **日期加减法**

在Oralce中我发现有add_months函数，加天数N可以用如下方法实现，select sysdate+N from dual；

sysdate+1 加一天 sysdate+1/24 加1小时 sysdate+1/(24*60) 加1分钟 sysdate+1/(24*60*60) 加1秒钟 类推至毫秒0.001秒

##### 加法

```sql
select sysdate,add_months(sysdate,12) from dual;        --加1年 
select sysdate,add_months(sysdate,1) from dual;        --加1月 
select sysdate,to_char(sysdate+7,'yyyy-mm-dd HH24:MI:SS') from dual;  --加1星期 
select sysdate,to_char(sysdate+1,'yyyy-mm-dd HH24:MI:SS') from dual;  --加1天 
select sysdate,to_char(sysdate+1/24,'yyyy-mm-dd HH24:MI:SS') from dual;  --加1小时 
select sysdate,to_char(sysdate+1/24/60,'yyyy-mm-dd HH24:MI:SS') from dual;  --加1分钟 
select sysdate,to_char(sysdate+1/24/60/60,'yyyy-mm-dd HH24:MI:SS') from dual;  --加1秒 
```

##### 减法

```sql
select sysdate,add_months(sysdate,-12) from dual;        --减1年 
select sysdate,add_months(sysdate,-1) from dual;        --减1月 
select sysdate,to_char(sysdate-7,'yyyy-mm-dd HH24:MI:SS') from dual;  --减1星期 
select sysdate,to_char(sysdate-1,'yyyy-mm-dd HH24:MI:SS') from dual;  --减1天 
select sysdate,to_char(sysdate-1/24,'yyyy-mm-dd HH24:MI:SS') from dual;  --减1小时 
select sysdate,to_char(sysdate-1/24/60,'yyyy-mm-dd HH24:MI:SS') from dual;  --减1分钟 
select sysdate,to_char(sysdate-1/24/60/60,'yyyy-mm-dd HH24:MI:SS') from dual;  --减1秒

```



#### **获取两个日期之间的时间间隔，extract()函数是最好的选择**

```sql
select
extract (day from dt2 - dt1) day,
extract (hour from dt2 - dt1) hour,
extract (minute from dt2 - dt1) minute,
extract (second from dt2 - dt1) second
from
(
select
to_timestamp ('2023-02-04 15:07:00','yyyy-mm-dd hh24:mi:ss') dt1,
to_timestamp ('2023-05-17 19:08:46','yyyy-mm-dd hh24:mi:ss') dt2
from
dual
)

```

![image-20240923205737343](https://y.creammint.cn/articles/images/image-20240923205737343.png)



#### **获取日期中最晚的一个**

```sql
select greatest('2023-01-01','2023-03-08','2022-10-01') from dual; --2023-03-08
```



#### **查找月的第一天，最后一天**

```sql
SELECT Trunc(Trunc(SYSDATE, 'MONTH') - 1, 'MONTH') First_Day_Last_Month,
 Trunc(SYSDATE, 'MONTH') - 1 / 86400 Last_Day_Last_Month,
 Trunc(SYSDATE, 'MONTH') First_Day_Cur_Month,
 LAST_DAY(Trunc(SYSDATE, 'MONTH')) + 1 - 1 / 86400 Last_Day_Cur_Month
FROM dual;
```



## 特殊函数

### row_number() over()

`ROW_NUMBER()` 是一个分析函数，它在查询结果集中为每一行分配一个唯一的连续整数。这个函数通常与 `OVER()` 子句结合使用，以定义窗口规则，例如分区和排序。

`语法：`ROW_NUMBER() OVER(PARTITION BY column1, column2 ... ORDER BY column1, column2 ...)

`参数:`

- `PARTITION BY`: 可选参数，用于将数据划分为多个分区。在每个分区内，行号将独立重新从1开始分配。
- `ORDER BY`: 必需参数，用于指定行号分配的顺序。如果未指定 `ORDER BY`，则行号的分配顺序是不确定的。

```sql
--查询将为 employees 表中的每一行员工分配一个唯一的行号，根据工资从高到低的顺序。
SELECT employee_id, salary, ROW_NUMBER() OVER(ORDER BY salary DESC) AS rn
FROM employees;

--查询将为每个部门的员工分配行号，首先按照部门ID分区，然后在每个部门内按照工资从高到低分配行号。
SELECT department_id, employee_id, salary, ROW_NUMBER() OVER(PARTITION BY department_id ORDER BY salary DESC) AS rn
FROM employees;
```



### CASE 

流程控制语句 流程控制函数

#### simple CASE(简单形式) 

`simple CASE：`类似DECODE函数

simple case的表达式：

```sql
	写法一
	case expr 
		when compare1 then value1
		when compare2 then value2
		when compare3 then value3
		else defualtvalue 
	end alias
	decode(expr ,compare1 ,value1,compare2 ,value2,compare3 ,value3,defualtvalue ) alias
	--两个语句返回的结果是一样的
```

每个when单个值匹配， 当expr匹配到compare时返回then后面value,匹配不到值的时候就返回else中的defualtvalue，**decode**函数也是这个用法
也跟switch case类似语句
最多支持255个参数，其中每对When…Then算作2个参数

#### Case When

searched case的表达式：

```sql
	case 
		when condition1 then returnvalue1
		when condition2 then returnvalue2
		when condition3 then returnvalue3
		else defualtvalue 
	end
	case 
		when expr > comparevalue1 then returnvalue1
		when expr = comparevalue2 then returnvalue2*x
		when expr in (comparevalue3 ,comparevalue4 ) then returnvalue3
		else defualtvalue 
	end
```

例如：

```sql
select
fname,
fweight,
(case
	when fweight <40 then 'thin'
	when fweight > 50 then 'fat'
	else 'ok'
 end ) as isnormal
from T_person
```

condition1 是条件表达式与expr>comparevalue1一样
最多支持255个参数，其中每对When…Then算作2个参数



### pivot：行转列

`PIVOT`操作符允许你根据一个或多个列的值来聚合数据，并将这些值转换成新的列。也可以使用 `decode`和`case when`实现；

**语法：**

```sql
SELECT *
FROM
(
  SELECT column1, column2, ...
  FROM your_table_name
)
PIVOT
(
  aggregate_function (column_to_aggregate)
  FOR pivot_column IN (list_of_values)
)
```

`参数说明：`

- `aggregate_function`: 聚合函数，如`SUM`, `COUNT`, `AVG`, `MAX`, `MIN`等。
- `column_to_aggregate`: 需要聚合的列。
- `pivot_column`: 包含将要转换成列的值的列。
- `list_of_values`: 你希望成为新列标题的`pivot_column`中的值的列表。

```sql
--product_code列的值'A'、'B'和'C'被转换成了新的列product_A、product_B和product_C，并且每个产品的销售数量通过SUM函数进行聚合。
SELECT *
FROM sales_data
PIVOT
(
  SUM(quantity)
  FOR product_code IN ('A' AS product_A, 'B' AS product_B, 'C' AS product_C)
);
```



### in，exists，not in，not exists

#### 定义

**in/not in**：用于比较一个值与一组值。它返回 `TRUE` 如果左边的表达式在右边的值列表中找到匹配项。

```sql
SELECT * FROM employees
WHERE department_id IN (1, 2, 3);
```

这个查询会返回所有 `department_id` 为1、2或3的员工记录。

**exists/not exists**：检查子查询是否返回至少一行数据。它是一个布尔操作符，如果子查询至少返回一行，它就返回 `TRUE`。

```sql
SELECT * FROM employees e
WHERE EXISTS (SELECT * FROM departments d WHERE e.department_id = d.department_id);
```

这个查询会返回所有至少在 `departments` 表中有对应部门的员工记录。

#### 区别

`IN/NOT IN` 通常与子查询一起使用，如果子查询返回大量数据，可能会导致性能问题，因为Oracle需要在内部执行两次查询：一次是子查询本身，另一次是外部查询与子查询结果的比较。

`EXISTS/NOT EXISTS` 通常更高效，因为它只检查子查询是否返回行，而不需要实际检索所有行。一旦找到匹配的行，子查询就会停止执行。



## 其它单行函数

### nvl, nvl2

`NVL` 函数用于将 `NULL` 值替换为指定的值。如果第一个参数是非 `NULL` 值，`NVL` 函数返回第一个参数的值；如果第一个参数是 `NULL`，则返回第二个参数的值。

```sql
--如果 employee_name 是 NULL，它将被替换为 'No Name Provided'。
SELECT NVL(employee_name, 'No Name Provided') FROM employees;	
```

`NVL2` 函数是 `NVL` 函数的扩展，它接受三个参数。如果第一个参数是 `NULL`，它返回第三个参数的值；如果第一个参数不是 `NULL`，则返回第二个参数的值。

```sql
--如果 employee_name 是 NULL，它将返回 'No Name Provided'；否则，返回 'Employee'。
SELECT NVL2(employee_name, 'Employee', 'No Name Provided') FROM employees;
```

`区别：`

- `NVL` 仅替换 `NULL` 值为指定的值。
- `NVL2` 提供了更多的灵活性，允许你为 `NULL` 和非 `NULL` 值指定不同的返回值



### rownum

返回行号

```sql
Select rownum From dual;	--1
```



## 聚合函数

| 函数   | 说明                      |
| ------ | ------------------------- |
| AVG    | 平均值                    |
| sum(x) | 返回结果集中 x 列的总合。 |
| MIN    | 最小值                    |
| MAX    | 最大值                    |
| COUNT  | 统计个数                  |



























































