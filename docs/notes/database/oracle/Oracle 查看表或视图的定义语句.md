---
title: Oracle 查看表或视图的定义语句
createTime: 2024/10/10 11:39:28
permalink: /database/oracle/8kj3b9wb/
---
# Oracle 查看表或视图的定义语句

查看表的定义，`TABLE_NAME` 表名

```
SELECT DBMS_METADATA.GET_DDL('TABLE','TABLE_NAME') FROM DUAL;
```

查看视图的定义语句，`VIEW_NAME` 视图名

```
SELECT DBMS_METADATA.GET_DDL('VIEW','VIEW_NAME') FROM DUAL;
```

`注： 表名跟视图名称均要大写。`