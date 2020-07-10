<!DOCTYPE html>
<!-- 此处是整体的布局，包括headter头，body体，footer页脚 -->
<!-- 直接通过引用当前相对目录下的模版文件即可 -->
<!-- 通过page全局对象可以直接引用到其中挂载的信息 -->
<html lang="{{ page.lang }}">
{{ partial('partial/head') }}
<body>
  {{ partial('partial/header') }}
  {% if page.layout === 'page' %}
    {{ partial('partial/sidebar') }}
  {% endif %}
  {{ body }}
  {# <div id="container">
    {{ partial('partial/footer') }}
  </div>
  #}
  <div id="mobile-nav-dimmer"></div>
  {{ partial('partial/mobile_nav') }}
  {{ partial('partial/after_footer') }}
</body>
</html>
