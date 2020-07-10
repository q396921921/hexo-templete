---
title: 文档更新说明
layout: explain
---

## 文档更新步骤
1. 将编写好的markdown文档放入source/docs/文件夹内
2. 在source/_data/sidebar.yml中编写左侧目录
3. 在themes/navy/languages/zh_CN.yml中添加左侧菜单名对应翻译
4. 运行 npm run build && npm run dev, 本地启动服务进行预览
5. 部署则只需将代码push到master分支
