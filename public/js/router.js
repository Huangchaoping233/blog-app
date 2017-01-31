// 定义一个路由文件 控制页面之间的跳转
define(['jquery','template','text!tplHome',  'text!tplLife', 'text!tplLearn','text!tplMe','text!tplContact'],function($,template,home,life,learn,me,contact){
	// console.log(template)
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
                getLifeData(function(res){
                    $('#container').html(res);
                });
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

    function getLifeData(callback){
        // 通过ajax取远程数据
        $.getJSON('/life/getData',function(res){
            var render = template.compile(life) //生成一个渲染函数
            var strHtml = render({life:res.data}) //传递数据到页面中进行页面生成
            callback(strHtml)
        })
    }
})