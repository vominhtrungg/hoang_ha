jQuery(document).ready(function($) {
	var slideshow =$('#detail_slideshow');
	slideshow.owlCarousel({
	    items : 1,
	    margin: 0,
	    slideSpeed : 4000,
		autoplaySpeed: 1000,
		lazyLoad:true,
	    nav: false,
	    autoplay: true,
	    dots: true,
	    loop: true,
	    
	    animateOut: 'lightSpeedOut',
    	animateIn: 'lightSpeedln',

	 });
	 $('#detail_slideshow').on('mouseover',function(e){
	    slideshow.trigger('stop.owl.autoplay');
	  });
	  $('#detail_slideshow').on('mouseleave',function(e){
	      slideshow.trigger('play.owl.autoplay');
	  });

	  $(".hinhanh").children(".boxlazy").click(function(){
	  		//slideshow.jumpTo(2);
	  		//slideshow.trigger('owl.jumpTo', [3,0]);
	  		$(".owl-dots .owl-dot:nth-child("+parseInt($(this).attr("idx"))+")").click();
	  });	

});