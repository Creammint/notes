---
title: Oracle 查看表空间
createTime: 2024/10/10 11:03:47
permalink: /database/oracle/vldlwjq0/
---
## 查看数据库所有表空间

```sql
select tablespace_name, sum(bytes)/1024/1024 proportion from dba_data_files group by tablespace_name;
```



## 查看具体表单所占空间

```sql
Select Segment_Name,Sum(bytes)/1024/1024 proportion From User_Extents Group By Segment_Name
```



## 查看所有表空间占用率

```sql
SELECT 
c.ts#, c.name,  
d.contents, d.extent_management, 
e.file_bytes, c.used,
SUBSTR (c.used / e.file_bytes * 100, 1, 5) proportion --占比
FROM (SELECT name, ts#, SUM(used) used
          FROM (SELECT a.allocated_space * (SELECT value  -- 查询db_block_size当前值
                                              FROM v$parameter
                                             WHERE name = 'db_block_size') / 1024/ 1024 used,
                        b.ts#, b.name
                  FROM v$filespace_usage a, v$tablespace b
         WHERE a.tablespace_id = b.ts#)
         GROUP BY name, ts#
) c,dba_tablespaces d,
(SELECT ts#, SUM(bytes) / 1024/ 1024 file_bytes FROM v$datafile GROUP BY ts#) e      
WHERE c.name = d.tablespace_name
   AND e.ts# = c.ts#
ORDER BY ts#
```

查询临时表空间大小

```sql
select c.tablespace_name "表空间",
       Round(c.bytes/1024/1024,2)  "表空间大小(M)",
       Round((c.bytes-d.bytes_used)/1024/1024,2)  "空闲空间(M)",
       Round(d.bytes_used/1024/1024,2)  "已使用空间(M)",
       Round(d.bytes_used*100/c.bytes,2) || '%' "使用率"
from
(select tablespace_name,sum(bytes) bytes
from dba_temp_files Group by tablespace_name) c,
(select tablespace_name,sum(bytes_cached) bytes_used
from v$temp_extent_pool Group by tablespace_name) d
where c.tablespace_name = d.tablespace_name
```

查询单个session所占用的临时表

```sql
SELECT S.sid || ',' || S.serial# sid_serial, S.username, S.osuser, P.spid,
       S.module, P.program, SUM(T.blocks) * TBS.block_size / 1024 / 1024 mb_used,
       T.tablespace, COUNT(*) statements
  FROM v$sort_usage T, v$session S, dba_tablespaces TBS, v$process P
 WHERE T.session_addr = S.saddr
   AND S.paddr = P.addr
   AND T.tablespace = TBS.tablespace_name
 GROUP BY S.sid, S.serial#, S.username, S.osuser, P.spid,
          S.module, P.program, TBS.block_size, T.tablespace
 ORDER BY mb_used desc;
```

查询每个sql占用的临时表

```sql
SELECT S.sid || ',' || S.serial# sid_serial, S.username, Q.hash_value, Q.sql_text,
       T.blocks * TBS.block_size / 1024 / 1024 mb_used, T.tablespace
  FROM v$sort_usage T, v$session S, v$sqlarea Q, dba_tablespaces TBS
 WHERE T.session_addr = S.saddr AND T.sqladdr = Q.address AND T.tablespace = TBS.tablespace_name
 ORDER BY mb_used desc;
```



## 查看具体dbf表空间占用率

```sql
select b.file_id,/*文件ID*/
　　b.tablespace_name,/*表空间*/
　　b.file_name,/*物理文件名*/
　　b.bytes,/*总字节数*/
　　(b.bytes-sum(nvl(a.bytes,0))) Used,/*已使用*/
　　sum(nvl(a.bytes,0)) surplus,/*剩余*/
　　sum(nvl(a.bytes,0))/(b.bytes)*100　proportion/*剩余百分比*/
from dba_free_space a,dba_data_files b
where a.file_id=b.file_id
group by b.tablespace_name,b.file_name,b.file_id,b.bytes
order by b.tablespace_name
```



## 检查数据文件路径

```sql
Select * From dba_data_files t where t.TABLESPACE_NAME = 'CREAMMINT'; 
```



## 追加数据文件

```sql
Alter Tablespace CREAMMINT Add Datafile '/data3/oradata/creammint/creammint001.dbf' SIZE 20G; 
```



## 扩容原数据文件

```sql
alter database datafile '/ssddata/oradata/creammint/creammint001.dbf' RESIZE 20G; 
```



## 缩小临时表

```sql
alter database tempfile 'D:\ORACLE\PRODUCT\10.2.0\ORADATA\TELEMT\TEMP01.DBF' resize 100M;
```