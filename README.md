# node_project
# 简单的记录（此node的小项目是参考imooc的教程来的，后续功能正完善，下面是简单的记录）
## 由于教程的录制时间比较早，所以express node 都有很多用法 api 发生了变化。
npm install express  moment mongoose  bootstrap jquery 等  详情看 package,json的版本
jade == pug    现在 jade 模板改名为 pug
npm install bower -g   （现在bower官网已经停止更新了，我全局安装也失败，所以静态资源的引用npm来完成）
npm install body-parser

Mongoose  安装  
			1. .msi 二进制文件
			2.  配置Path
			3.  开启服务mongod 进入交互mongo
      4.  选择数据库 use xxx
Mongoose  Mongodb
	Schema    模式  数据字段的定义
	Model     模型  对模式进行编译  生成模型
	Documents 文档  调用构造函数   （数据存入）
