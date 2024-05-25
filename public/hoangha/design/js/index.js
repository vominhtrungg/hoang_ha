$(document).ready(function(){
    $(function(){
        $(window).scroll(function(){
            $('.thietke .sanpham:even .hinhanh img').addClass('animated fadeInLeft');
            $('.thietke .sanpham:odd .hinhanh img').addClass('animated fadeInRight');
        });
    });
})
