// 监听语言改变，跳转对应语言的页面
(function () {
  'use strict'
  
  function changeLang() {
    var lang = this.value
    var canonical = this.dataset.canonical
    if (lang === 'zh_CN') lang = ''
    if (lang) lang += '/'

    location.href = '/' + lang + canonical
  }

  document.getElementById('lang-select').addEventListener('change', changeLang);
})()
