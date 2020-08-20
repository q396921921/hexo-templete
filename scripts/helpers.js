/* global hexo */

'use strict'
// 动态生成页面代码的，因为被注册了，所以可以通过{{ registerName() }}这样进行调用
// 在此文件中如果需要调用触发事件，需要将方法写到页面的<script></script>中

var pathFn = require('path')
var _ = require('lodash')
var cheerio = require('cheerio')
var lunr = require('lunr')
const { format } = require('path')

// 顶部标题栏【文档， 】
var localizedPath = ['docs', 'community', 'contribute']

function startsWith(str, start) {
    return str.substring(0, start.length) === start
}

hexo.extend.helper.register('page_nav', function () {
    var type = this.page.canonical_path.split('/')[0]
    var sidebar = this.site.data.sidebar[type]
    var path = pathFn.basename(this.path)
    var list = {}
    var prefix = 'sidebar.' + type + '.'

    for (var i in sidebar) {
        for (var j in sidebar[i]) {
            list[sidebar[i][j]] = j
        }
    }

    var keys = Object.keys(list)
    var index = keys.indexOf(path)
    var result = ''

    if (index > 0) {
        result +=
            '<a href="' +
            keys[index - 1] +
            '" class="article-footer-prev" title="' +
            this.__(prefix + list[keys[index - 1]]) +
            '">' +
            '<i class="fa fa-chevron-left"></i><span>' +
            this.__('page.prev') +
            '</span></a>'
    }

    if (index < keys.length - 1) {
        result +=
            '<a href="' +
            keys[index + 1] +
            '" class="article-footer-next" title="' +
            this.__(prefix + list[keys[index + 1]]) +
            '">' +
            '<span>' +
            this.__('page.next') +
            '</span><i class="fa fa-chevron-right"></i></a>'
    }
    return result
})

// 左侧菜单导航栏
hexo.extend.helper.register('doc_sidebar', function (className) {
    var type = this.page.canonical_path.split('/')[0]
    var sidebar = this.site.data.sidebar[type]
    var path = pathFn.basename(this.path)
    var childrens = this.site.data.sidebar.childrens
    const apiMenuTitle = this.theme.apiMenuTitle
    var result = ''
    if (this.page.layout === 'page') {
        result = `<h2 class="m-sd-head">${apiMenuTitle}</h2>`
        var self = this
        var prefix = 'sidebar.' + type + '.'
    
        _.each(sidebar, function (menu, title) {
            // state 所说的是当前元素下面子级的显示状况
            if (isInclude(childrens, title)) {
                result +=
                    '<ul class="m-sd-unit hide"  id="' + title + '">' +
                    '<h3 class="m-sd-head"><span class="sd-tab">' + self.__(prefix + title) + '</span><span class="sd-icon"></span></h3>'
                result += eachSidebar(menu, self, prefix, className, path, childrens, title, -1) + '</ul>';
            } else {
                var itemClass = 'sd-link'
                if (menu === path) itemClass += ' current'
                itemClass += ' current'
                result +=
                    `<li class="m-sd-row" id="${title}"><a href="/docs${menu}" class="${itemClass}">${self.__(prefix + title)}</a></li>`
            }
        })
    }
    return result
})

function isInclude(object, text) {
    for (const key in object) {
        const val = object[key]
        if (val === text) {
            return true
        }
    }
    return false
}

function eachSidebar(menu, self, prefix, className, path, childrens, tier, width) {
    var result = ''
    if (typeof (menu) === 'object') {
        _.each(menu, function (link, text) {
            if (isInclude(childrens, text)) {
                const newTier = tier + '/' + text
                let width2 = 0;
                if (width === -1) {
                    width2 = 0;
                } else if (width === 0){
                    width2 = 3
                } else {
                    width2 = width + 1;
                }
                const style = width2 === 0 ? '' : ` style="text-indent:${width2}em"`
                // const width2 = width + 20;
                // const style = `style="text-indent:${width + 20}px"`
                result +=
                    '<ul class="m-sd-unit hide" id="' + newTier + '">' +
                    `<h3 class="m-sd-head"><span class="sd-tab"${style}>` + self.__(prefix + text) + '</span><span class="sd-icon"></span></h3>'
                result += eachSidebar(
                    link,
                    self,
                    prefix,
                    className,
                    path,
                    childrens,
                    newTier,
                    width2
                ) + '</ul>';
            } else {
                let style = ''
                if (width === 0){
                    style = ` style="text-indent:${3}em"`
                } else if (width > 0) {
                    style = ` style="text-indent:${width+1}em"`
                }
                // const style = `style="text-indent:${width + 20}px"`
                var itemClass = 'sd-link'
                if (link === path) itemClass += ' current'
                const newTier = tier + '/' + link.split('.html')[0]
                result +=
                    // '<li class="m-sd-row"><a href="' + link + '" class="' + itemClass + '">' + self.__(prefix + text) + '</a></li>'
                    `<li class="m-sd-row" id="${newTier}"><a href="/docs${link}" class="${itemClass}"${style}>${self.__(prefix + text)}</a></li>`
            }
        })
    } else {
        let style = ''
        if (width === 0){
            style = ` style="text-indent:${3}em"`
        } else if (width > 0) {
            style = ` style="text-indent:${width+1}em"`
        }
        // const style = `style="text-indent:${width + 20}px"`
        var itemClass = 'sd-link'
        if (menu === path) itemClass += ' current'
        itemClass += ' current'
        result +=
            // '<li class="m-sd-row">' +
            // '<a href="' + menu + '" class="' + itemClass + '">' + self.__(prefix + type) + '</a></li>'
            `<li class="m-sd-row" id="${tier}"><a href="/docs${menu}" class="${itemClass}"${style}>${self.__(prefix + tier)}</a></li>`
    }
    return result
}

// 顶部标题栏以及点击跳转链接【文档，说明。。。】
// 关键：
hexo.extend.helper.register('header_menu', function (className) {
    var menu = this.site.data.menu
    var result = ''
    var self = this
    var lang = this.page.lang
    var isChinese = lang === 'zh_CN'

    _.each(menu, function (path, title) {
        // 动态配置该url链接（多语言）
        if (!isChinese && ~localizedPath.indexOf(title)) path = lang + path
        const obj = {
            lang,
            path,
            isChinese,
            include: ~localizedPath.indexOf(title),
            localizedPath,
            title,
        }
        // 如果menu中配置的链接为一个网址，就跳转到一个新的页面【target="_blank"】
        if (path.startsWith('http://') || path.startsWith('https://')) {
            result +=
                '<span class="m-hd-nav-tab"><a href="' +
                self.url_for(path) +
                '" target="_blank">' +
                '<span class="u-tab">' + 
                self.__('menu.' + title) +
                '</span></a></span>'
        } else {
            result +=
                '<span class="m-hd-nav-tab"><a href="' +
                self.url_for(path) +
                '"><span class="u-tab">'
                + self.__('menu.' + title) +
                '</span></a></span>'
        }
    })

    return result
})

// 将当前页面的路径与config中配置的url拼接为一个可以直接访问的链接（多语言）
hexo.extend.helper.register('canonical_url', function (lang) {
    var path = this.page.canonical_path
    if (lang && lang !== 'zh_CN') path = lang + '/' + path
    return this.config.url + '/' + path
})

// 将当前的路径与语言拼接成为一个针对当前语言的主页链接（默认中文）
hexo.extend.helper.register('url_for_lang', function (path) {
    var lang = this.page.lang
    var url = this.url_for(path)
    if (lang !== 'zh_CN' && url[0] === '/') url = '/' + lang + url

    return url
})

hexo.extend.helper.register('raw_link', function (path) {
    return 'https://github.com/jinzhu/gorm.io/edit/master/pages/' + path
})

hexo.extend.helper.register('page_anchor', function (str) {
    var $ = cheerio.load(str, { decodeEntities: false })
    var headings = $('h1, h2, h3, h4, h5, h6')

    if (!headings.length) return str

    headings.each(function () {
        var id = $(this).attr('id')

        $(this)
            .addClass('article-heading')
            .append(
                '<a class="article-anchor" href="#' + id + '" aria-hidden="true"></a>'
            )
    })

    return $.html()
})

hexo.extend.helper.register('lunr_index', function (data) {
    var index = lunr(function () {
        this.field('name', { boost: 10 })
        this.field('tags', { boost: 50 })
        this.field('description')
        this.ref('id')

        _.sortBy(data, 'name').forEach((item, i) => {
            this.add(_.assign({ id: i }, item))
        })
    })

    return JSON.stringify(index)
})

hexo.extend.helper.register('canonical_path_for_nav', function () {
    var path = this.page.canonical_path

    if (startsWith(path, 'docs/') || startsWith(path, 'api/')) {
        return path
    }
    return ''
})

// 传入en, zh_CN等获得在languages.yml中对应的 name 显示名
hexo.extend.helper.register('lang_name', function (lang) {

    var data = this.site.data.languages[lang]

    if (data == null) {
        return lang
    }
    return data.name || data
})

// 
hexo.extend.helper.register('disqus_lang', function () {

    var lang = this.page.lang
    var data = this.site.data.languages[lang]

    if (data == null) {
        return lang
    }

    return data.disqus_lang || lang
})

hexo.extend.helper.register('hexo_version', function () {
    return this.env.version
})
// 此方法对应的是文档导航栏。
// 原理是将点击之后的路径与树状菜单对象结构，做比对。通过html页面名（value）即：/xx/yy/zz.html拿到对应的key
// 然后通过递归，一级一级向上查找，直到树状结构的根。然后通过self.__(prefix + val)【val是我们需要的值】，得到对应的菜单名字
hexo.extend.helper.register('getTiter', function () {
    var type = this.page.canonical_path.split('/')[0]
    var self = this
    var sidebar = this.site.data.sidebar[type]
    var prefix = 'sidebar.' + type + '.'
    var path = this.page.path;
    path = path.split('/')[1]
    var result = '';
    var arr = getTiter(sidebar, path, []).reverse()
    for (let i = 0; i < arr.length; i++) {
        const val = arr[i];
        result += ' > ' + self.__(prefix + val)
    }
    return result
})
function loopObj (obj, str, key) {
    for (const k in obj) {
        if (obj.hasOwnProperty(k)) {
            const v = obj[k];
            if (JSON.stringify(v) === JSON.stringify(str)) {
                key = k;
                return key
            } else {
                if (typeof(v) === 'object') {
                    return loopObj(v, str, key)
                }
            }
        }
    }
  }
  function loopObjKey (obj, str) {
    for (const k in obj) {
        if (obj.hasOwnProperty(str)) {
            return obj
        } else {
            const v = obj[k];
            if (typeof v === 'object') {
                return loopObjKey(v, str)
            }
        }
    }
  }
  function getTiter(obj, str, result) {
    var a = loopObj(obj, str)
    if (a) {
        result.push(a)
        var b = loopObjKey(obj, a)
        if (b) {
            return getTiter(obj, b, result)
        } else {
            return result
        }
    } else {
        return result
    }
  }