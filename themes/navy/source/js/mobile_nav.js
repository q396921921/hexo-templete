
(function() {
  'use strict';
  // document.getElementsByClassName("new_sidebar")[0].style.height = document.body.clientHeight + "px"
  var body = document.getElementsByTagName('body')[0];

  
  // 第一次cookie没有值时就把默认值先都赋值进去
  var doc_cook = getCookie("doc_cook")
  var titleObj = {};
  // 如果有值了就取内部的值
  if (doc_cook !== 'undefined' && doc_cook && doc_cook !== '{}') {
    titleObj = JSON.parse(doc_cook)
    var menu = titleObj.menu;
    if (menu !== 'undefined' && menu && menu !== '{}') {
      for (const id in menu) {
        if (menu.hasOwnProperty(id)) {
          let className = menu[id];
          className = className.slice(0,9)+' '+ className.slice(9)
          document.getElementById(id).setAttribute('class', className)
        }
      }
    }
    var color = titleObj.color;
    if (color !== 'undefined' && color && color !== '{}') {
      const id = color.id;
      document.getElementById(id).setAttribute('class', 'm-sd-row active')
    }
  }
  var h3Eles = document.getElementsByClassName('m-sd-head')
  for (const it of h3Eles) {
    const tagName = it.tagName;
    if (tagName === 'H2') {
      continue
    }
    it.addEventListener('click', function () {
      return menuChange(it)
    })
  }
  var sdLinkEles = document.getElementsByClassName('sd-link');
  for (const it of sdLinkEles) {
    it.parentElement.addEventListener('click', function () {
      return changeColor(it)
    })
  }
  doc_cook = JSON.stringify(titleObj)
  setCookie("doc_cook", doc_cook, 3600);
}());

function changeColor(ele) {
  var doc_cook = getCookie("doc_cook")
  var titleObj = {};
  if (doc_cook !== 'undefined' && doc_cook && doc_cook !== '{}') {
    titleObj = JSON.parse(doc_cook)
    var color = titleObj.color;
    if (color !== 'undefined' && color && color !== '{}') {
      var color = titleObj.color;
      const id = color.id;
      document.getElementById(id).setAttribute('class', 'm-sd-row')
    }
  }
  const newId = ele.parentElement.id;
  ele.parentElement.setAttribute('class', 'm-sd-row active')
  titleObj.color = {}
  titleObj.color = { id: newId }
  doc_cook = JSON.stringify(titleObj)
  setCookie("doc_cook", doc_cook, 3600);
}
function setCookie(key,val,time){//设置cookie方法
  var date=new Date(); //获取当前时间
  var expiresDays=time;  //将date设置为n天以后的时间
  // date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
  date.setTime(date.getTime()+expiresDays*1000); //格式化为cookie识别的时间
  document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
}

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

// 这个是左侧菜单用来记录菜单状态以及箭头状态的
function menuChange(ele) {
  var doc_cook = getCookie("doc_cook")
  var titleObj = {};
  titleObj = JSON.parse(doc_cook)
  let id = ele.parentElement.getAttribute('id')
  let className = ele.parentElement.getAttribute("class")
  if (className === 'm-sd-unit hide') {
    className = "m-sd-unit show"
  } else {
    className = 'm-sd-unit hide'
  }
  if (!!titleObj.menu) {
    titleObj.menu[id] = className
  } else {
    titleObj.menu = {}
    titleObj.menu[id] = className
  }
  ele.parentElement.setAttribute('class', className)
  doc_cook = JSON.stringify(titleObj)
  setCookie("doc_cook", doc_cook, 3600);
}