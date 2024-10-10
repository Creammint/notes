---
title: Oracle 数据库创建导入
createTime: 2024/09/20 18:06:41
permalink: /database/oracle/vvucl4ea/
---
# Oracle 数据库创建导入

在本章教程中，将教大家如何在 Oracle 中创建导入数据库。

> 注意：本教程中的有些命令您可能并不熟悉，但没关系，只需按照说明一步一步创建示例数据库即可。在之后的教程中，会详细介绍每个命令。

## 1.创建新用户并授予权限

**1.1.打开**

首先，启动 SQL plus 程序的命令行：

```
sqlplus
```

如下所示：

![1](https://y.creammint.cn/articles/images/1528082919563202.png)

或者从开始菜单的安装目录打开 SQL Plus：

![2](https://y.creammint.cn/articles/images/1528082941733238.png)

**1.2.登录**

当 SQL Plus 启动后，它会提示您输入用户名和密码。继续使用在安装 Oracle 数据库服务器期间输入的密码以 sys 用户身份登录：

```
C:\Users\Administrator>sqlplus

SQL*Plus: Release 11.2.0.1.0 Production on 星期五 11月 10 04:32:17 2017
Copyright (c) 1982, 2010, Oracle.  All rights reserved.

请输入用户名:  sys as sysdba
输入口令:
```

**1.3.创建新用户**

使用以下 CREATE USER 语句创建一个新用户：ot，用于在可插入数据库中创建示例

ot 可为任意名字

数据库：

```
SQL> CREATE USER OT IDENTIFIED BY Orcl1234;

User created.
```

上面的语句创建了一个名为:OT 的新用户，并在 IDENTIFIED BY 子句之后指定了一个密码，在这个示例中，创建的用户：OT 对应的密码为：Orcl1234 。

**1.4.授权**

通过使用以下 GRANT 语句授予 OT 用户权限：

```
SQL> GRANT CONNECT, RESOURCE, DBA TO OT;

Grant succeeded.
```

## 2.登录新账号

使用OT用户帐户连接到数据库(ORCL)。 当 SQL Plus 提示输入密码时，输入：Orcl1234。

对于 Oracle 11g/12c，使用如下命令：

> docker 中只需执行 CONNECT ot

```
SQL> CONNECT ot@orcl
输入口令:
已连接。
```

> 注意，OT 用户仅存在于 ORCL 数据库中，因此，必须在 CONNECT 命令中明确指定用户名为 ot@orcl。

## 3.创建数据库表

要为示例数据库创建表，需要从 SQL plus 执行 ot_schema.sql 文件中的语句，

演示数据库文件下载地址：[https://github.com/ensa-tetouan/ressources-tp-plsql](https://www.w3cschool.cn/targetlink?url=https://github.com/ensa-tetouan/ressources-tp-plsql)

> 我们为您提供一个名为 OT 的Oracle示例数据库，它基于全球虚拟公司，销售计算机硬件，包括存储，主板，RAM，视频卡和CPU。
> 公司保存产品信息，如：名称，描述标准成本，标价，产品线。它还跟踪所有产品的库存信息，包括产品可用的仓库。由于该公司在全球运营，因此在世界各地拥有仓库。
> 公司记录所有客户信息，包括姓名，地址和网站。 每个客户至少有一个联系人，包括姓名，电子邮件和电话等详细信息。公司还对每位客户设置了信用限额，以限制客户可能欠的金额。
> 只要客户发出采购订单，就会在数据库中创建具有待处理状态的销售订单。当公司运送订单时，订单状态变成 - 运送。如果客户取消订单，则订单状态将被 - 取消。
> 除销售信息外，员工数据还记录了一些基本信息，如姓名，电子邮件，电话，职位，经理和雇用日期。

在 SQL plus 的文件中执行 SQL 语句，可以使用下面的命令(语法)：

```
SQL> @path_to_sql_file
```

假设 ot_schema.sql 文件位于 F:\website\oraok\ot 目录中，则执行下面的语句 ：

```sql
SQL>@F:\website\oraok\ot\11g\ot_schema.sql
```

当执行语句完成后，可以通过列出 OT 用户拥有的表来验证表是否成功创建。以下是这样做的声明：

```sql
SQL> SELECT table_name FROM user_tables ORDER BY Table_name;

TABLE_NAME
------------------------------
CONTACTS
COUNTRIES
CUSTOMERS
EMPLOYEES
INVENTORIES
LOCATIONS
ORDERS
ORDER_ITEMS
PRODUCTS
PRODUCT_CATEGORIES
REGIONS

TABLE_NAME
------------------------------
WAREHOUSES

已选择12行。

SQL>
```

在这个语句中，我们从 user_tables 表中选择了 table_name 列中的值，并按字母顺序排列了表名。如上结果中所见，有12个表名按预期方式返回。

接下来，我们可以将数据加载/导入到这些表中。

## 4.将数据加载到表中

要将数据加载到表中，请按如下所示执行 ot_data.sql 文件中的语句：

```
SQL>@F:\website\oraok\ot\11g\ot_data.sql
```

如果没有看到任何错误消息，则意味着数据已成功加载导入。

还可以使用 SELECT 语句验证数据是否已成功加载导入。 例如，要获取 contacts 表中的行数，请使用以下语句：

```sql
SQL> SELECT COUNT(*) FROM contacts;

  COUNT(*)
----------
       319

SQL> SELECT COUNT(*) FROM countries;

  COUNT(*)
----------
        25

SQL> SELECT COUNT(*) FROM customers;

  COUNT(*)
----------
       319

SQL> SELECT COUNT(*) FROM employees;

  COUNT(*)
----------
       107

SQL> SELECT COUNT(*) FROM inventories;

  COUNT(*)
----------
      1112

SQL> SELECT COUNT(*) FROM locations;

  COUNT(*)
----------
        23

SQL> SELECT COUNT(*) FROM orders;

  COUNT(*)
----------
       105

SQL> SELECT COUNT(*) FROM order_items;

  COUNT(*)
----------
       665

SQL> SELECT COUNT(*) FROM product_categories;

  COUNT(*)
----------
         5

SQL> SELECT COUNT(*) FROM products;

  COUNT(*)
----------
       288

SQL> SELECT COUNT(*) FROM regions;

  COUNT(*)
----------
         4

SQL> SELECT COUNT(*) FROM warehouses;

  COUNT(*)
----------
         9
```

查询返回319表示 contacts 表有319行。通过用另一个表替换表名(联系人)，可以检查所有表中的数据。如果这是您第一次使用数据库系统，这对您来说是一个很好的练习。

要删除上面模式中的表，请执行：

```
SQL>@F:\website\oraok\ot\11g\ot_drop.sql
```