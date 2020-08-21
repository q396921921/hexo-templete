<!DOCTYPE html>
<!-- 此处是整体的布局，包括headter头，body体，footer页脚 -->
<!-- 直接通过引用当前相对目录下的模版文件即可 -->
<!-- 通过page全局对象可以直接引用到其中挂载的信息 -->

<!-- 赋值网页默认语言 并  -->
<html lang="{{ page.lang }}">{{ partial('partial/head') }}
<body>
  {{ partial('partial/header') }}
  <!-- 如果当前页面的布局layout是page，就展示左侧菜单栏 -->
  {% if page.layout === 'page' %}
    {{ partial('partial/sidebar') }}
  {% endif %}
  <!-- 中间md文档html页面内容（对应page） -->
  {{ body }}
  <!-- 加载多个js功能文件 -->
  {{ partial('partial/after_footer') }}
</body>
</html>
