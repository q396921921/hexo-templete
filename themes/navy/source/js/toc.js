(function() {
  'use strict';
  var header = document.getElementById('header');
  var toc = document.getElementById('article-toc');
  // var tocTop = document.getElementById('article-toc-top');
  var headerHeight = header.clientHeight;

  var ol = document.getElementsByClassName("toc")[0] // 根节点
  function loop(ul, hEle = 2) {
    for (const it of ul.children) {
      const children = it.children
      const aEle = children[0]
      const ulEle = children.length === 1 ? '' : children[1]
      const aInterHtml = aEle.innerHTML; // a
      const aHref = aEle.getAttribute('href');
      const aClass = aEle.getAttribute('class');
      const aNowHtml = `<a class="${aClass}" state="show" href="${aHref}">${aInterHtml}</a>`;
      if (ulEle) {
        const hEle2 = Number(hEle) + 1
        it.innerHTML = `<h${hEle}>${aNowHtml}<span class="f-toggle f-toggle-plus"></span></h${hEle}>` +
        `<ul>${ulEle.innerHTML}</ul>`;
        const arrowsEle = it.children[0].children[1];
        // 为箭头添加点击事件
        arrowsEle.addEventListener('click', function () {
          return test(arrowsEle)
        })
        loop(it.children[1], hEle2)
      } else {
        it.innerHTML = `<h${hEle}>${aNowHtml}</h${hEle}>`
      }
    }
  }
  loop(ol)
  const spanTextEles = document.getElementsByClassName('toc-text')
  for (const it of spanTextEles) {
    it.addEventListener('click', function () {
      return changeColor(it);
    })
  }
  function changeColor(ele) {
    const alreadayColor = document.getElementsByClassName('f-sel')
    for (const it of alreadayColor) {
      it.setAttribute('class', 'toc-text')
    }
    ele.setAttribute('class', 'f-sel')
  }
  function test(ele) {
    let className = ele.getAttribute('class')
    // ele.parentElement.parentElement.setAttribute('class', 'f-sel')
    if (className === 'f-toggle f-toggle-minus') {
      ele.parentElement.nextElementSibling.style.display = '';
      ele.setAttribute('class', 'f-toggle f-toggle-plus')
    } else {
      ele.parentElement.nextElementSibling.style.display = 'none';
      ele.setAttribute('class', 'f-toggle f-toggle-minus')
    }
  }
  // let result = '';


  // for (const it of olChildsOl) {
  //   it.nextElementSibling
  //   it.setAttribute("state", "show");
  //   it.addEventListener('click', function() {
  //     return click(it)
  //   })
  // }

  // for (const it of ol.children) {
  //   it.tagName
  //   result += loop(it)
  // }
  // alert(result)
  if (!toc) return;

  function getCookie(key){//获取cookie方法
    /*获取cookie参数*/
    var getCookie = document.cookie.replace(/[ ]/g,"");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
    var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
    var tips;  //声明变量tips
    for(var i=0;i<arrCookie.length;i++){   //使用for循环查找cookie中的tips变量
        var arr=arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
        if(key==arr[0]){  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
            tips=arr[1];   //将cookie的值赋给变量tips
            break;   //终止for循环遍历
        } 
    }
    return tips;
  }

  function updateSidebarPosition() {
    var scrollTop = document.scrollingElement.scrollTop;

    if (scrollTop > headerHeight) {
      toc.classList.add('fixed');
    } else {
      toc.classList.remove('fixed');
    }
  }

  window.addEventListener('scroll', function() {
    window.requestAnimationFrame(updateSidebarPosition);
  });

  updateSidebarPosition();

  // tocTop.addEventListener('click', function(e) {
  //   e.preventDefault();
  //   document.scrollingElement.scrollTop = 0;
  // });
}());
