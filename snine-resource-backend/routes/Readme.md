***** 简历模型 留存
    1:创建模型，快速生成一个模型
 * tb_article
     sequelize model:generate --name tb_article --attributes authorId:bigint,authorName:string,content:text,html:text,desc:string,cover:string,class:bigint,status:bigint,readVal:bigint,praiseVal:bigint
 * tb_class
     sequelize model:generate --name tb_class --attributes className:string,desc:string

 * tb_tag
     sequelize model:generate --name tb_tag --attributes tagName:string,color:string


    2：通过模型创建数据库
 * 运行模型，在数据库创建数据库
     sequelize db:migrate