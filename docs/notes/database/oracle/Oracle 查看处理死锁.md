---
title: Oracle 查看处理死锁
createTime: 2024/10/10 11:11:00
permalink: /database/oracle/1ygs65e7/
---
## 前言

### 什么是表的死锁以及死锁的产生原因

表的死锁是指在Oracle数据库中，两个或多个事务相互等待对方持有的锁资源，导致它们无法继续执行下去，从而形成死锁现象。

死锁的产生原因通常是因为事务在操作数据时，对数据进行了锁定，但是由于事务执行顺序或者并发操作的原因导致了互相等待对方持有的锁资源，从而形成死锁。

### 产生死锁的案例

具体业务场景及代码示例： 假设有两个用户同时对同一张表进行更新操作，用户A执行UPDATE语句锁住了表中的某些行，而用户B也执行UPDATE语句锁住了表中的另一些行，此时就可能发生死锁。

代码示例： 用户A的更新操作：

```sql
BEGIN
  UPDATE table_name SET column1 = 'value1' WHERE condition;
  COMMIT;
END;
```

用户B的更新操作：

```sql
BEGIN
  UPDATE table_name SET column2 = 'value2' WHERE condition;
  COMMIT;
END;
```

在这种情况下，用户A和用户B可能会出现死锁。为了避免死锁，可以考虑修改事务的执行顺序，或者使用数据库的锁机制和事务隔离级别来避免死锁的发生。

## 查看死锁

1、下面的语句用来查询哪些对象被锁：

```sql
select a.object_name,b.session_id,c.serial#,c.program,c.username,c.command,c.machine,c.lockwait 
from all_objects a,v$locked_object b,v$session c where a.object_id=b.object_id and c.sid=b.session_id;
```

2、查询锁表原因以及sid、serial#

```sql
select l.session_id sid, s.serial#, l.locked_mode, l.oracle_username, s.user#, l.os_user_name, s.machine, s.terminal, a.sql_text, a.action
from v$sqlarea a, v$session s, v$locked_object l 
where l.session_id = s.sid and s.prev_sql_addr = a.address 
order by sid, s.serial#;
```

3、用下面的语句用来杀死引起死锁的进程：

```sql
--sid,serial对应2步骤的值
alter system kill session 'sid,serial#'； 
```



## 问题

**ORA-00054: 资源正忙，锁表”以及“ORA-00031：标记要终止的会话”的解决方法**

### 现象描述

在ORACLE数据处理过程中，当某个PL/SQL developer正在运行创建一个临时表对大的数据进行暂存处理时，由于处理速度很慢，这时突然做了中断处理，甚至于直接从“任务管理器”中关掉PL/SQL developer。再次对该数据临时表进行处理时，会发现无论是删除、更新、查询等操作，都处于一直的执行等待状态。这种情况，很有可能是表已经被锁住了。但是当查询到死锁会话，采用`alter system kill session'sid,serial#';`来处理时，却提示报错，无法杀掉线程，只能到操作系统级杀掉线程了。下面就对这种情况的处理过程进行详细的说明。

![img](https://y.creammint.cn/articles/images/1875512-20220218155418508-1041493563.png)

### 解决方法

1. 可以通过下列语句查询：

```sql
select a.spid,b.sid,b.serial#,b.username 
from v$process a,v$session b 
where a.addr=b.paddr 
and b.status='KILLED';
```

![img](https://y.creammint.cn/articles/images/1875512-20220218161428300-662981761.png)



1. 如果利用上面的命令杀死一个进程后，进程状态被置为"killed"，但是锁定的资源很长时间没有被释放，那么可以在OS级再杀死相应的进程（线程），首先执行下面的语句获得进程（线程）号：

```sql
select b.spid,a.osuser,b.program 
  from v$session a,v$process b 
 where a.paddr=b.addr 
   and a.sid=176     --176就是上面的sid
```

![img](https://y.creammint.cn/articles/images/1875512-20220218161605390-1686124764.png)



1. 在OS上杀死这个进程（线程）

1)、在unix/linux上，用root身份执行命令：

```sql
#kill -9 9532（9532 即第4步查询出的spid） 
```

2)、在windows（unix也适用）用orakill杀死线程，orakill是oracle提供的一个可执行命令，语法为：

```sql
orakill sid thread 
```

其中：

sid：表示要杀死的进程属于的实例名

thread：是要杀掉的线程号，即第3步查询出的spid。

```sql
例：C:>orakill ACVS 9532
```

![img](https://y.creammint.cn/articles/images/1875512-20220218161852049-245548292.png)

**注意**：这里要注意的是kill OS进程是在服务端操作，而不是你程序所在客户机。



---

**参考文献**：

https://blog.csdn.net/qq_46645079/article/details/135219181

https://www.cnblogs.com/String-song/p/15909325.html