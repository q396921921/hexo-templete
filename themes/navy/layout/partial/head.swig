<head prefix="og: http://ogp.me/ns#">
  <meta charset="utf-8">
  <title>{% if page.title %}{{ page.title }} | {% endif %}{{ config.title }} - {{ config.subtitle }}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Canonical links 不知道有啥用，反正没有被用到 -->
  <!-- <link rel="canonical" href="{{ url }}"> -->
  <!-- Alternative links -->
  <!-- 只是用来展示该文档所有不同语言的当前页面对应的链接,可以去除 -->
  {% if page.layout == 'page' or page.layout == 'index' %}
    {% for lang in site.data.languages %}
      <link rel="alternative" hreflang="{{ loop.key }}" href="{{ canonical_url(loop.key) }}">
    {% endfor %}
  {% endif %}
  <!-- Icon, 在win上删除这些链接并未有和影响 -->
  <link rel="apple-touch-icon" sizes="57x57" href="{{ url_for('icon/apple-touch-icon-57x57.png') }}">
  <link rel="apple-touch-icon" sizes="114x114" href="{{ url_for('icon/apple-touch-icon-114x114.png') }}">
  <link rel="apple-touch-icon" sizes="72x72" href="{{ url_for('icon/apple-touch-icon-72x72.png') }}">
  <link rel="apple-touch-icon" sizes="144x144" href="{{ url_for('icon/apple-touch-icon-144x144.png') }}">
  <link rel="apple-touch-icon" sizes="60x60" href="{{ url_for('icon/apple-touch-icon-60x60.png') }}">
  <link rel="apple-touch-icon" sizes="120x120" href="{{ url_for('icon/apple-touch-icon-120x120.png') }}">
  <link rel="apple-touch-icon" sizes="76x76" href="{{ url_for('icon/apple-touch-icon-76x76.png') }}">
  <link rel="apple-touch-icon" sizes="152x152" href="{{ url_for('icon/apple-touch-icon-152x152.png') }}">
  <link rel="icon" type="image/png" href="{{ url_for('icon/favicon-196x196.png') }}" sizes="196x196">
  <link rel="icon" type="image/png" href="{{ url_for('icon/favicon-160x160.png') }}" sizes="160x160">
  <link rel="icon" type="image/png" href="{{ url_for('icon/favicon-96x96.png') }}" sizes="96x96">
  <link rel="icon" type="image/png" href="{{ url_for('icon/favicon-16x16.png') }}" sizes="16x16">
  <link rel="icon" type="image/png" href="{{ url_for('icon/favicon-32x32.png') }}" sizes="32x32">
  <meta name="msapplication-TileColor" content="#2f83cd">
  <meta name="msapplication-TileImage" content="{{ url_for('icon/mstile-144x144.png') }}">
  <!-- 用于标记hexo版本,无其他实际功能 -->
  <meta name="generator" content="Hexo {{ hexo_version() }}">
  <!-- CSS -->
  <!-- build:css build/css/navy.css 载入总的css文件 -->
  {{ css('css/navy') }}
  <!-- endbuild -->
  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css" />
  <!-- RSS -->
  <!-- 一知半解：xml是基础的可扩展标记语言 1.atom资源可以方便被其他站点、方便各种客户端引用 2.atom是构筑在xml之上的网站资源联合发布协议 -->
  {{ feed_tag('atom.xml') }}
</head>
