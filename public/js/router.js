// 定义一个路由文件 控制页面之间的跳转
define(['jquery','template','text!tplHome',  'text!tplLife', 'text!tplLearn','text!tplMe','text!tplContact'],function($,template,home, life,learn, me,contact){
	console.log(template)
    $('#container').html(home);
        //导航按钮被点击之后
    $('.nav a').click(function() {
        $(this).parent().parent().find('a').removeClass('cur');
        $(this).addClass('cur');
        var page = $(this).data('page');
        var strPage = "";
        switch (page) {
            case "home":
            	strPage = home;
                break;
            case "life":
            	strPage = life;
                break;
            case "learn":
        	strPage = learn;
            break;
            case "me":
            	strPage = me;
                break;
            case "contact":
            	strPage = contact;
                break;
            default:
            	strPage = home;
            	break;

        }
        $('#container').html(strPage);
	})
    ///渲染书籍列表页数据
    function getBooksPage(callback){
        // 通过ajax取远程数据
        $.getJSON('http://localhost:3000/api/v1/books/get_data',function(res){
            console.log(res)
            var render = template.compile(tpl) //生成一个渲染函数
            var strHtml = render({books:res.data}) //传递数据到页面中进行页面生成
            // var strHtml = '<ul class="books">'
            // res.data.forEach(function(item){
            //     strHtml += `<li class="book-item">
            //                     <img class="cover-img" src="${item.img}"/>
            //                     <p class="title">${item.title}</p>
            //                     <p class="author">${item.author}</p>
            //                 </li>`
            // })
            // strHtml += "</ul>"
            callback(strHtml)
        })
    }
})