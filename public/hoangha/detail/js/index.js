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
    
    $( "#frmQuote" ).on( "submit", function( event ) {

        event.preventDefault();
        const formEvent = event.target;
        let formData = new FormData();
        if(formEvent.name.value){
            formData.append("name", formEvent.name.value);
        }else{
            alert('Bạn chưa nhập tên!');
            return false;
        }
        if(formEvent.phone.value){
            formData.append("email", formEvent.phone.value);
        }else{
            alert('Bạn chưa nhập số điện thoại!');
            return false;
        }
        if(formEvent.quantity.value){
            formData.append("quantity", formEvent.quantity.value);
        }else{
            alert('Bạn chưa nhập Số lượng!');
            return false;
        }
        console.log($( "#frmQuote" ).attr('title'));
        formData.append("description", formEvent.note.value);
        formData.append("productName", $( "#frmQuote" ).attr('title'));
        var url = "/api/contacts";
        $.ajax({
            type: 'POST',
            url: url,
            data: formData,
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            beforeSend: function() {},
            success: function(data) {
                data = JSON.parse(data);
                if (!data.error) {
                    alert(data.message);
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            }
        });
      });
});


