<!-- 此页相当于每个md文档的html页面[上：导航 中：内容 右：页内导航] -->
<div class="m-cnt" itemprop="articleBody">
  <div class="breadcrumb">
  <!-- makedown上面的导航栏标题 和 后面的具体导航 -->
    {{ theme.apiMenuTitle }} {{ getTiter() }}
  </div>
  <!-- mk文档显示的内容 -->
  {{ page_anchor(page.content) }}
</div>
<div id="catalogue" class="m-sd-r">
  <div id="toccnt" class="m-sd-cnt">
    <!-- 此处是右面的小导航栏 -->
    {{ toc(page.content, {list_number: true}) }}
  </div>
</div>