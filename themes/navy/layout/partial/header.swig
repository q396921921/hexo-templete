<header id="header" class="m-hd">
  <div class="m-hd-body-wrap">
    <div class="m-hd-body">
      {# logo, 标题栏左上角的 主页 标题 #}
      <span class="m-hd-logo">
        <a href="{{ url_for_lang('') }}" id="logo">
          <span class="u-logo">
            {{ config.title }}
            {# <span class="logo"></span>#}
          </span>
        </a>
      </span>
      {# 顶部标题菜单 #}
      <span class="m-hd-nav">
        {{ header_menu('main-nav') }}
      </span>
      <!-- 搜索栏 -->
      <!--
      <div class="m-hd-search">
        <div class="u-box">
          <div id="search-input-icon">
            <i class="fa fa-search"></i>
          </div>
          <input type="search" id="search-input" placeholder="{{ __('menu.search') }}">
        </div>
      </div>
      -->
      <!--
      <div id="search-input-wrap">
          <div id="search-input-icon">
            <i class="fa fa-search"></i>
          </div>
          <input type="search" id="search-input" placeholder="{{ __('menu.search') }}">
        </div>
        -->
      <!-- 顶部语言选择栏 -->
      <div id="lang-select-wrap">
        <label id="lang-select-label"><i class="fa fa-globe"></i><span>{{ lang_name(page.lang) }}</span></label>
        <select id="lang-select" data-canonical="{{ canonical_path_for_nav() }}">
          {% for lang in site.data.languages %}
            <option value="{{ loop.key }}"{% if page.lang === loop.key %} selected{% endif %}>{{ lang_name(loop.key) }}</option>
          {% endfor %}
        </select>
      </div>
    </div>
  </div>
</header>
