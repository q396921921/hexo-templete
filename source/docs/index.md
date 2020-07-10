---
title: 群组相关
layout: page
---

## dz-docs

__存储学习文档__

1. 支持无限级结构
2. （待解决：目前由于目录结构是存储在cookie中的所以更新之后由于cookie不一致会出现层级不能折叠问题）
3. 用来存储我自己所学习的新技术或者新项目的各个文档

__严重说明__：
  + 1.css写的和粑粑一样，自己改会很痛苦的，最好不要试图更改。。。。我自己都蒙蔽__
  + 2.makedown文档的标题必须是连贯的，不能出现1级标题下面是3级标题， 2级标题下面是4级标题类似的情况，否则右面的标题栏会出现问题

### 环境配置

1. 安装nodejs环境： [下载地址](https://nodejs.org/en/download/)
    + windows: Windows Installer (.msi) 32-bit或者63-bit
    + mac:直接点击下载即可
2. 傻瓜式安装即可
3. 安装完毕后，打开命令窗口输入命令 __node --version__, 输出类似版本号 __v13.12.0__， 即说明安装成功
4. 打开我们的项目，运行在根目录运行命令 __npm i__ 安装所需要的依赖

### 操作方法

+ 添加一个文件，并设置对应层级
  + 我们配置了一个目录：人(people),该目录中包含男人(boy)和女人(girl).男人和女人目录中是各自不同的文件。比如男人目录中有 __little_boy__ , __big_boy__ __old_boy__ 三种，此时为了便于区分我们就直接就分别对应, __little_boy.html__,  __big_boy.html__, __old_boy.html__

  + 1.在根目录/source/_data/sidebar.yml文件中有两个字段
    + __childrens__: 存放所有包含下一级的字段。
      + 比如上面的people就相当于1级目录，boy和girl相当于2级目录，little_boy，big_boy，old_boy相当于3级目录，而.html文件就相当于存储在第三级目录中
      + 关于在docs中新建文件夹进行分类.md文件：假如我们在docs下新建animal1文件夹，内部有dog文件夹，dog文件夹中存放我们的md文件.具体配置如下
      + 
      ```yml
        childrens:
          people: "people"
          boy: "boy"
          girl: "girl"

          animal: "animal"
          dog: "dog"
      ```
    + __docs__: 配置目录字段所对应的层级
      + 
      ```yml
        docs:
          people: # 相当于一级目录
            boy: # 二级目录
              little_boy: /little_boy.html # 在二级目录中的具体展示页面
              big_boy: /big_boy.html
              old_boy: /old_boy.html
            girl: # 二级目录
              little_girl: /little_girl.html
          animal: # 这里同样可以加新的一级目录
            dog:
              big_dog: /animal1/dog/big_dog.html
      ```
+ 2.设置字段对应的目录名
  + 将我们所有用过的字段在/themes/navy/languages/zh_CN.yml文件中进行添加
  + 
  ```yml
  sidebar:
    docs:
      0index: 文档介绍
      1java: java相关
      1java_project: 项目学习
      1xhs_project: 小红绳
      test: 哈哈
      test2: 嘿嘿
      test3: 呵呵
      0xhs_web: 后台管理文档
  ```
+ 3.创建我们字段对应的 .md(makedown)文档
  + 在根目录的/source/docs/下创建名字要与们字段对应的xxx.html的xxx相同
+ 4.makedown文件生成对应的html文件
  + 在装好环境的前提下运行npm run build命令

### 本地调试命令

#### 1.安装依赖包

```
npm install
```

#### 2.生成静态页面

```
npm run build
```

#### 3.本地启动服务

```
npm run dev
```

#### 4. 上传到github

```
npm run deploy
```