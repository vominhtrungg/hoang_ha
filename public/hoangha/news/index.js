$(document).ready(function(){
	$("#news_content").find("img").each(function(){
			console.log($(this).attr("alt"));
			$(this).parent("p").css({"position": "relative", "display": "inline-block"});
			$(this).parent("p").append("<span class='my_title_news'>"+$(this).attr("alt")+"</span>");
	});
$(".view_more").on('click', function (e) {
		e.preventDefault();
		$(this).parent().parent().children('article:hidden').slice(0, 4).slideDown();
		if(($(this).parent().parent().children('article:hidden')).length == 0) {
			$(this).hide();
		};
	});
});