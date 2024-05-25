jQuery(document).ready(function($) {
	 $(window).load(function(){
		   $(".lazyload_not").addClass("lazyload").removeClass("lazyload_not");
		});
	var slideshow =$('#boxslide');
	slideshow.owlCarousel({
	    items : 1,
	    margin: 0,
	    slideSpeed : 4000,
		autoplaySpeed: 1000,
		lazyLoad:true,
	    nav: true,
	    autoplay: true,
	    dots: true,
	    loop: true,
	    
	    animateOut: 'lightSpeedOut',
    	animateIn: 'lightSpeedln',

	 });
	 $('#boxslide').on('mouseover',function(e){
	    slideshow.trigger('stop.owl.autoplay');
	  });
	  $('#boxslide').on('mouseleave',function(e){
	      slideshow.trigger('play.owl.autoplay');
	  });


	$(".boxsearch >a").click(function(){
     	$(".frm_search").toggleClass("shown");
  	});
  	$(".handle").click(function(){
      $(".navigation").toggle(500);
    });
    $(".view_more").on('click', function (e) {
		e.preventDefault();
		$(this).parent().parent().children('article:hidden').slice(0, 4).slideDown();
		if(($(this).parent().parent().children('article:hidden')).length == 0) {
			$(this).hide();
		};
	});
   
});