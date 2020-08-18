<div class="m-cnt" itemprop="articleBody">
  <div class="breadcrumb">
    {{ theme.apiMenuTitle }} {{ getTiter() }}
  </div>
      {#<a href="{{ raw_link(page.source) }}" class="article-edit-link" title="{{ __('page.improve') }}"><i class="fa fa-pencil"></i></a>#}
  {{ page_anchor(page.content) }}
</div>
<div id="catalogue" class="m-sd-r">
  <div id="toccnt" class="m-sd-cnt">
    <!-- 此处是 -->
    {{ toc(page.content, {list_number: true}) }}
  </div>
</div>


{# <div id="content-wrap">
  <div id="content" class="wrapper">
    <div id="content-inner">
      <article class="article-container" itemscope itemtype="http://schema.org/Article">
        <div class="article-inner">
          <!-- 这里是makedown文件内的展示，最中间 -->
          <div class="article">
            <div class="inner">
              <!--<header class="article-header">
                <h1 class="article-title" itemprop="name">{{ page.title }}</h1>
                  {#<a href="{{ raw_link(page.source) }}" class="article-edit-link" title="{{ __('page.improve') }}"><i class="fa fa-pencil"></i></a>#}
              {#</header>
              <div class="article-content" itemprop="articleBody">
                {{ page_anchor(page.content) }}
              </div>
              <footer class="article-footer">
                <time class="article-footer-updated" datetime="{{ date_xml(page.updated) }}" itemprop="dateModified">{{ __('page.last_updated', date(page.updated)) }}</time>
                {{ page_nav() }}
              </footer>-->
              {{ partial('partial/comment') }}
            </div>
          </div>
          <!-- 这里是makedown文件内的标题导航栏，最右侧竖框 -->
          <aside id="article-toc" role="navigation">
            <div id="article-toc-inner">
              {# <div id="sidebar-ad-wrapper" class="tagmanager_ad"></div>#}
              <!-- 这是具体的makedown标题结构 -->
              <!--<strong class="sidebar-title">{{ __('page.contents') }}</strong>
              {{ toc(page.content, {list_number: false}) }}
              <a href="#" id="article-toc-top">{{ __('page.back_to_top') }}</a>-->
            {#</div>
          </aside>
        </div>
      </article>
      <!-- 这里是所有makedown文件的目录，最左侧菜单 -->
      <!-- {{ partial('partial/sidebar') }}-->
    </div>
  </div>
</div>#}