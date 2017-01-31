
define(['jquery'],function($){
	$('span.logo').hover(function(){
		$(this).css({
			color:'firebrick',
		})
	},function(){
		$(this).css({
			color:'darkgray'
		})
	})
	
	$('#container').on('mouseover','div.plus',function(){
		$(this).animate({
			'width':'80px',
			'opacity':'1',
			'font-size':'40px'
		},500)
		
		$(this).click(function(){
			console.log(plus)
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
})
