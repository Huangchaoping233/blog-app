//require.js的入口文件,引入指定的文件
//
//通过require.config配置项 设置相关内容
require.config({
    // baseUrl: "./js", //设置默认的模块基地址
    //配置模块的路径,在配置路径的时候不能写.js后缀名
    paths: {
        "jquery": "http://cdn.bootcss.com/jquery/2.2.1/jquery.min", //指定一个url地址
        "cookie": "http://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min",
        "bootstrap": "http://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min",
        "text": "text", //引入text.js
        "tplContact": "/js/tpl/contact.html", //引入html文件
        "tplHome": "/js/tpl/home.html",
        "tplLearn": "/js/tpl/learn.html",
        "tplMe": "/js/tpl/me.html",
        "tplLife": "/js/tpl/life.html",
        "template":"template", //引入art-template模版引擎
    },
    shim: {
        "bootstrap":["jquery"],//引入bootstrap,其依赖于jQuery
        "cookie":["jquery"]

    },
    urlArgs: "v=" + (new Date()).getTime() //为每一个js的引入加一个后缀参数,防止浏览器缓存
})

//定义一个路由模块直接使用
require(['router']);
require(['common']);
