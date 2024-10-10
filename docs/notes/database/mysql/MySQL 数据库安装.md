---
title: MySQL 数据库安装
createTime: 2024/10/10 13:50:11
permalink: /database/mysql/loxjmjer/
---

## MySQL介绍

MySQL是一个[关系型数据库管理系统](https://baike.baidu.com/item/关系型数据库管理系统/696511?fromModule=lemma_inlink)，由瑞典 MySQL AB 公司开发，属于 [Oracle](https://baike.baidu.com/item/Oracle?fromModule=lemma_inlink) 旗下产品。MySQL 是最流行的[关系型数据库管理系统](https://baike.baidu.com/item/关系型数据库管理系统/696511?fromModule=lemma_inlink)之一，在 [WEB](https://baike.baidu.com/item/WEB/150564?fromModule=lemma_inlink) 应用方面，MySQL是最好的 [RDBMS](https://baike.baidu.com/item/RDBMS/1048260?fromModule=lemma_inlink) (Relational Database Management System，关系数据库管理系统) 应用软件之一。

MySQL是一种关系型数据库管理系统，关系数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。

MySQL所使用的 SQL 语言是用于访问[数据库](https://baike.baidu.com/item/数据库/103728?fromModule=lemma_inlink)的最常用标准化语言。MySQL 软件采用了双授权政策，分为社区版和商业版，由于其体积小、速度快、总体拥有成本低，尤其是[开放源码](https://baike.baidu.com/item/开放源码/7176422?fromModule=lemma_inlink)这一特点，一般中小型和大型网站的开发都选择 MySQL 作为网站数据库。

## Windows 安装MySQL

### 下载MySQL

#### 官网安装

下载MySQL，地址：https://dev.mysql.com/downloads/installer/

mysql官网上提供了两种安装方式，第一种是在线版联网安装，第二种是本地安装。二者的区别是前者是联网安装，当安装时必须能访问互联网，后者是离线安装使用的，一般建议下载离线安装使用的版本。
![在这里插入图片描述](https://y.creammint.cn/articles/images/d01712cd32f445059e5e25cb7de8e321.png)在这里插入图片描述

以上两种安装方法均为图形界面向导方式安装，优点是可以比较清晰地看到整个mysql安装过程，并且可以选择性的安装所需的功能。缺点是安装过程中会出现一些环境依赖问题，导致安装失败。

#### 本地压缩包安装

**压缩包下载地址**：https://dev.mysql.com/downloads/mysql/5.5.html#downloads![在这里插入图片描述](https://y.creammint.cn/articles/images/8f58408bdbde45b0b0600e1f45903153.png)在这里插入图片描述

解压下载好的压缩包文件：

![在这里插入图片描述](https://y.creammint.cn/articles/images/05f559f01ed14d728a0dfd9f779ec79c.png)在这里插入图片描述

### MySQL本地配置

1. 打开已下载的MySQL文件，内容如下：

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/081c3c14f56741d3b8b2fdbc1ef33e7b.png)在这里插入图片描述

2. 配置电脑的系统环境变量，找到Path变量；

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/d4657101a0a041ce9ec94161b01004dd.png)在这里插入图片描述

3. 添加MySQL安装的bin文件目录的路径，如下图所示：

![在这里插入图片描述](https://y.creammint.cn/articles/images/676985f788dd4941bb1e1af92d76b3d6.png)在这里插入图片描述

1. 环境配置完成后，打开文件夹，创建一个新的文件后缀名为 .ini 的 `my.ini` 空白文件。

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/54f2395fd73c4fdeab306d5aec398877.png)在这里插入图片描述

2. 编辑创建好的my.ini文件，用于初始化MySQL数据库，tips：路径必须为 `\` 的形式。

   ini 代码:

   ```ini
   [mysql]
   # 设置mysql客户端默认字符集
   default-character-set=utf8
   [mysqld]
   # 设置3306端口
   port = 3306
   # 设置mysql的安装目录
   basedir = D:\\tools\\mysql-8.0.30-winx64
   # 设置mysql数据库的数据的存放目录
   datadir = D:\\tools\\mysql-8.0.30-winx64\\data
   # 允许最大连接数
   max_connections=20
   # 服务端使用的字符集默认为8比特编码的latin1字符集
   character-set-server=utf8
   # 创建新表时将使用的默认存储引擎
   default-storage-engine=INNODB
   # 创建模式
   sql_mode = NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES
   ```

   **注意MySQL的安装目录路径是否填写正确**

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/ef8576fa3fbd476cbccdd3dd7316b01e.png)在这里插入图片描述

3. 快捷键`Windows + R` 输入cmd，进入本地Windows 命令行窗口，然后通过命令行 进入MySQL下的bin文件夹。

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/e2854259cb0a42cc8dc1017175d0cb43.png)在这里插入图片描述

或者直接在该文件下路径上输入 cmd ，然后回车确认即可。

![在这里插入图片描述](https://y.creammint.cn/articles/images/4e3fbb163ca84f15aa3069ca35ec69cd.png)在这里插入图片描述![在这里插入图片描述](https://y.creammint.cn/articles/images/227c9fb3dc4946f8bd7d6fad762e2398.png)在这里插入图片描述

1. 输入`mysqld --initialize` 进行初始化MySQL。

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/4ab47a9b85504c8d9b437138b0b56909.png)在这里插入图片描述

输入上述命令，按回车，会发现文件夹下会多出一个新的文件夹data。

![在这里插入图片描述](https://y.creammint.cn/articles/images/909cd577e8fc41e9a14d8b06dfece112.png)在这里插入图片描述

等待初始化完成会生成一个后缀名为.err的文件，里面存放的是初始化登录MySQL的密码；

![在这里插入图片描述](https://y.creammint.cn/articles/images/945209cc22224c8b84a809bba38bcc42.png)在这里插入图片描述

打开.err文件：找到下图中所示的root账户和root密码；

![在这里插入图片描述](https://y.creammint.cn/articles/images/b658bf36ed33414bbf11d03b1d37b9f5.png)在这里插入图片描述

1. 注意：如果**先前**在电脑中装过MySQL，请在cmd命令窗口输入`sc delete mysql` 删除之前的MySQL服务。**第一次安装请忽略** ， 如下图所示：

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/ec807f3802c04f27a8afe75dea821d50.png)在这里插入图片描述

2. 打开cmd窗口，输入`mysqld --install` 命令；

   我这边已经装过了，所以显示为已存在； 第一次安装成功会提示：`Service successfully installed`；

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/74c2e3349c2c428e9dad6572f90e3367.png)在这里插入图片描述

**注意：如果出现** `Install/Remove of the Service Denied!` 错误的话。

**解决办法一：**

使用管理员身份运行cmd，如下图：

![在这里插入图片描述](https://y.creammint.cn/articles/images/499f3973377f4927964a4852de24e025.png)在这里插入图片描述

接上，通过命令方式开启MySQL服务；

- 开启服务： `net start mysql`
- 关闭服务：`net stop mysql`

**提示：**

> - Redhat Linux 支持service command，
>   启动：# service mysqld start
>   停止：# service mysqld stop
>   重启：# service mysqld restart
> - Windows下不能直接重启(restart)，只能先停止，再启动。

![在这里插入图片描述](https://y.creammint.cn/articles/images/1c2cf5d827b646a8b8c1a424980556eb.png)在这里插入图片描述

**解决办法二：**

两种打开服务的方式：

text 代码:

```text
  1. 手动启动MySQL服务，本机电脑打开管理面板；
```

![在这里插入图片描述](https://y.creammint.cn/articles/images/d9a59db9a1c4405b928823f9e034b3b2.png)在这里插入图片描述text 代码:

```text
  2. Windows 键 + R 键 打开本地命令行窗口，输入`services.msc`快速打开电脑 “服务”，检查MySQL服务，如下图所示： 
```

![在这里插入图片描述](https://y.creammint.cn/articles/images/5fa061f3c08b47aaaa03fb446ff810cd.png)在这里插入图片描述

找到MySQL服务，如未开启，可手动开启服务；

![在这里插入图片描述](https://y.creammint.cn/articles/images/36ce25245e7a42ab9d88a7c534c7e844.png)在这里插入图片描述

设置MySQL服务启动类型为：“ 自动 ”，启动服务。

![在这里插入图片描述](https://y.creammint.cn/articles/images/536f056df6fd4b9a9d41ab5f82fc4114.png)在这里插入图片描述

1. 使用root账户和刚刚文件里查看的密码进行登录；

   命令：`mysql -uroot -p7lb7hWyuj!se`

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/ae1e7f5476024a7d88191238337b8eb2.png)在这里插入图片描述

出现以下界面说明MySQL登录成功；

**注意：这里我的密码已经修改过了；**

![在这里插入图片描述](https://y.creammint.cn/articles/images/6161a03f32f0434185cced0a5e2350b6.png)在这里插入图片描述

1. 修改MySQL root账户密码：使用命令：`alter user 'root'@'localhost' identified with mysql_native_password by ' **这里填写新密码** ';`

   **注意：这里是在MySQL中进行操作的；**

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/41e5ede488c540b99edc5ef164ba8feb.png)在这里插入图片描述

### 连接第三方工具

为了更便捷地使用数据库，可以选择连接MySQL数据库客户端navicat工具：

![在这里插入图片描述](https://y.creammint.cn/articles/images/e7998fe81f36423da9207563fe15084d.png)在这里插入图片描述

测试连接：

![在这里插入图片描述](https://y.creammint.cn/articles/images/86ca11b87401495f962372e65d5188b8.png)在这里插入图片描述

## Linux 安装MySQL

### 1、卸载MySQL

1. 查看是否已经安装 MySQL

   sql 代码:

   ```sql
   rpm -qa|grep -i mysql
   ```

   这里我的服务已经装过了，如下图所示：

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/37724ceb4774462b8bfd3dea8ce48bcd.png)在这里插入图片描述

2. 停止MySQL服务

   > 1、使用 service 启动：service mysqld start
   >
   > 2、使用 mysqld 脚本启动：/etc/inint.d/mysqld start

3. 删除MySQL

   sql 代码:

   ```sql
   rpm -e 文件名
   ```

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/e4288955c69845deaad5875d743c8529.png)在这里插入图片描述

**可能会遇到的问题：**

- `error: Failed dependencies`

  通过 YUM 查询和卸载：

  text 代码:

  ```text
  查询：yum list installed mysql*    
  卸载：yum remove mysql*
  ```

1. 删除mysql的目录文件和库

   text 代码:

   ```text
   shell> find / -name mysql  #查找所有mysql相关的文件
   /usr/share/mysql
   /etc/selinux/targeted/active/modules/100/mysql
   /var/lib/mysql
   /var/lib/mysql/mysql
   
   shell> rm -rf /usr/share/mysql   #删除命令
   shell> rm -rf /etc/my.cnf    #卸载后/etc/my.cnf不会删除，需要进行手工删除
   ```

2. 再次查看是否存有mysql

   text 代码:

   ```text
   rpm -qa|grep -i mysql
   ```

无结果，说明已经卸载彻底、接下来直接安装mysql即可

### 2、安装MySQL

1. 本次安装MySQL完整版本为：5.7.10,如需安装其他版本，可以去官网：https://repo.mysql.com/ 选择其他的RPM替换下面命令中的链接地址即可。

   text 代码:

   ```text
   wget -i -c http://dev.mysql.com//mysql57-community-release-el7-10.noarch.rpm
   ```

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/f88b55e71dee438fa06915fca0c1fc9c.png)在这里插入图片描述

如果安装有提示：`Cannot write to ‘mysql57-community-release-el7-10.noarch.rpm’ (No such file or directory)`，那就是权限不够

可以输入 su root 来解决，然后重新下载。

1. 安装MySQL包

   text 代码:

   ```text
   yum -y install mysql57-community-release-el7-10.noarch.rpm
   ```

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/c807210a7e144235b9ebcd4c074c4f2b.png)在这里插入图片描述

2. 安装 MySQL

   text 代码:

   ```text
   yum -y install mysql-community-server
   ```

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/001f0a224d7f4376aaf5153758fb37d9.png)在这里插入图片描述

如果执行命令过程中提示：`Unable to find a match: mysql-community-server`

则可以通过命令解决

text 代码:

```text
yum module disable mysql
```

1. 启动MySQL服务

   text 代码:

   ```text
   systemctl start mysqld.service
   ```

   如果没有报错，进入下一步，

   如果执行报错，多半是没有权限，执行下面语句赋予权限，然后重试

   text 代码:

   ```text
   chown mysql:mysql -R /var/lib/mysql
   ```

2. 查看MySQL运行状态

   text 代码:

   ```text
   service mysqld status
   ```

   看见这个绿色就表示启动成功了

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/e145795c1fe24eaba4438d79149fd7ce.png)在这里插入图片描述

3. 查看初始密码（红色部分为初始密码)

   text 代码:

   ```text
   grep 'password' /var/log/mysqld.log
   ```

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/7dfb5ba7105347dea226229fe627698f.png)在这里插入图片描述

如果能正常查看到，则OK；如果查看不到，则表示没有密码。

1. 进入数据库

   text 代码:

   ```text
   mysql -u root -p
   ```

   输入命令后，点击回车，会让你输入密码，然后输入刚刚的初始密码（输密码的时候不可见），当然支持粘贴，你可以复制初始密码后，然后粘贴。如果没有密码，直接回车即可。

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/0635476ccbc34aa2821d853516aeb454.png)在这里插入图片描述

**注: 如果显示数据库无法访问**

修改MySql配置文件my.cnf，新增 `skip-grant-tables`

text 代码:

```text
find / -name my.cnf
```

![在这里插入图片描述](https://y.creammint.cn/articles/images/e312f91aedd7492c872e87e7ee8c56cf.png)在这里插入图片描述

修改文件之前记得先关闭mysql服务

text 代码:

```text
service mysqld stop
```

通过 vi 指令进入文件

text 代码:

```text
vi /etc/my.cnf
```

新增 `skip-grant-tables` ,添加skip-grant-tables，这样mysql可以免密登录。

![在这里插入图片描述](https://y.creammint.cn/articles/images/efd9af4e1f2340e88336d3651fba6179.png)在这里插入图片描述text 代码:

```text
重启服务
```

text 代码:

```text
service mysqld start
```

再次连接MySql，重置密码

text 代码:

```text
mysql -u root -p
```

任意密码就可以进入了

![在这里插入图片描述](https://y.creammint.cn/articles/images/773189ab574649068773c5a925885d5e.png)在这里插入图片描述

通过 show databases;

text 代码:

```text
 show databases;
```

![在这里插入图片描述](https://y.creammint.cn/articles/images/cf7948e1c4c8457f8ce44d97c1fde82a.png)在这里插入图片描述

切换到MySQL数据库

![在这里插入图片描述](https://creammint-pic-1304832043.cos.ap-hongkong.myqcloud.com/img2/f0f70053650b4a4a9054e75cd46aa4bd.png)在这里插入图片描述

重置密码（为123456）

text 代码:

```text
update user set authentication_string=password('root') where user='123456';
```

修改配置文件my.cnf，删除 skip-grant-tables，重启，再登录

删除skip-grant-tables

![在这里插入图片描述](https://y.creammint.cn/articles/images/01355cdec7be415693cfd5b256c68c73.png)在这里插入图片描述

重启服务

text 代码:

```text
service mysqld start
```

根据指令进入MySQL数据库

text 代码:

```text
mysql -uroot -p123456
```

![在这里插入图片描述](https://y.creammint.cn/articles/images/71b328ecdcf240fa91c385c63e24e27d.png)在这里插入图片描述

再次使用新密码登录即可至此！Linux 下 Mysql 安装到使用讲解完成！

### 3、Navicat 无法连接

1. 服务器的防火墙mysql端口3306是否开放

   text 代码:

   ```text
   查看防火墙是否已开放3306端口
   firewall-cmd --query-port=3306/tcp
    
   设置3306端口为永久开放
   firewall-cmd --add-port=3306/tcp --permanent
    
   查看firewalld状态，发现当前是dead状态，即防火墙未开启
   systemctl status firewalld
    
   关闭防火墙
   systemctl stop firewalld
    
   重启防火墙（设置了新的端口记得先关闭，再重启）
   systemctl status firewalld
   ```

1. 如果是阿里云服务器，记得查看云安全组规则是否开放了3306端口，如果没有，记得加上

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/3dcb7c3f7b8943aca0d3563b3ba889dc.png)在这里插入图片描述

2. 如果链接提示如下，则是没有允许远程登录

   `1130-host ... is not allowed to connect to this MySql server`

   解决办法：

   登录服务器mysql数据库

   sql 代码:

   ```sql
   --1. 进入mysql数据库：
   use mysql;
   
   --2. 查看mysql数据库中所有的表：
   show tables;
   
   --3. 查看user表中的数据：
   select Host, User,authentication_string from user;
   
   --4. 修改user表中的Host:
   update user set Host='%' where User='root';
   
   --5. 最后刷新一下：
   flush privileges;
   ```

   重新在Navicat中测试一下 ，连接成功。

   ![在这里插入图片描述](https://y.creammint.cn/articles/images/31f91bd798984077acacd41de303fde4.png)