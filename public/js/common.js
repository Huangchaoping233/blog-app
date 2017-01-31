
define(['jquery','cookie'],function($){
	// logo变色效果

	$('span.logo').hover(function(){
		$(this).css({
			color:'firebrick',
		})
	},function(){
		$(this).css({
			color:'darkgray'
		})
	})


	// plus 动画效果
	$('#container').on('mouseover','div.plus',function(){
		$(this).animate({
			'width':'80px',
			'opacity':'1',
			'font-size':'40px'
		},500)

		$(this).click(function(){
			$('.popup').css('display','block')
		})

		$('.cancel').click(function(){
			$('.popup').css('display','none')
		})
	})

	$('#container').on('mouseleave','div.plus',function(){
		$(this).stop(true,true);
		$(this).css({
			'width':'20px',
			'opacity':'0.7',
			'font-size':'20px'
		},1000)
	})

	// 照片功能
	$('#container').on('click','.popup_img',function(event){
	    event.stopPropagation();
	    $('#photo').trigger('click');
	})

	$('#container').on('change','#photo',function(){
	    console.log('22');
	    $('.popup_img img').attr('src',URL.createObjectURL(this.files[0]));
	})

	$('#container').on('submit','.life_form',function(event){
		event.preventDefault();
		var time = new Date();
	    var formData = new FormData(this);

	    $.cookie('time',time.getTime())
	    formData.append('time',time.getTime());
	    formData.append('date',formDate(time));
	    $.ajax({
	        url:'/life/photo',
	        method:'post',
	        data:formData,
	        contentType:false,
	        cache:false,
	        processData:false,
	        async: false,
	        success:function(res){

	            if(res.code == 'success'){
	                console.log(res.code);
	                alert('保存成功');
	                $('.popup').css('display','none')
	            }
	        }
	    })

	})

	function formDate(date){
		var Y = date.getFullYear()
		var M = date.getMonth() + 1
		var D = date.getDate()
		var h = date.getHours()
		var m = date.getMinutes()

		var M = M < 10 ? '0'+ M:M;
		var D = D < 10 ? '0'+ D:D;
		var h = h < 10 ? '0'+ h:h;
		var m = m < 10 ? '0'+ m:m;

		return Y + "-" + M + "-" + D + " " + h + ":" + m;

	}


})
