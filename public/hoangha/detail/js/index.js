jQuery(document).ready(function($) {
    var slideshow = $('#detail_slideshow');
    slideshow.owlCarousel({
        items: 1,
        margin: 0,
        slideSpeed: 4000,
        autoplaySpeed: 1000,
        lazyLoad: true,
        nav: false,
        autoplay: true,
        dots: true,
        loop: true,

        animateOut: 'lightSpeedOut',
        animateIn: 'lightSpeedln',

    });
    $('#detail_slideshow').on('mouseover', function(e) {
        slideshow.trigger('stop.owl.autoplay');
    });
    $('#detail_slideshow').on('mouseleave', function(e) {
        slideshow.trigger('play.owl.autoplay');
    });

    $(window).load(function() {
        $("body,html").animate({ scrollTop: $(".content").offset().top }, 1000);
    });
    $(".contact-btn").on('click', function() {
        $(".custom-model-main").addClass('model-open');
    });
    $(".close-btn, .bg-overlay").click(function() {
        $(".custom-model-main").removeClass('model-open');
    });
});