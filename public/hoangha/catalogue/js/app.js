$(document).ready(function(){
   $("#flipbook").turn({
    width: 600,
    height: 400,
    autoCenter: true

   });
   $(".left_arrows").hide();
   $(".right_arrows").click(function(){
        $("#flipbook").turn("next");
        
    });
   $(".left_arrows").click(function(){
        $("#flipbook").turn("previous");
        
    });

    $("#flipbook").bind("turning", function(event, page) {
                                   var range=$("#flipbook").turn("range");
                                    if(page == 1 ){
                                         $(".left_arrows").hide();
                                    }else{
                                          $(".left_arrows").show();
                                    }

                                    if(page==range[1]){
                                      $(".right_arrows").hide();
                                    }else{
                                        $(".right_arrows").show();
                                    }
                                   


                                       
    });

     $( window ).resize(function() {
                       
                        if($(window).width() <800){
                   
                             $("#flipbook").turn("size", 400, 300);
                            
                         
                        }
                   });
       if($(window).width() <800){
         
                             $("#flipbook").turn("size", 400, 300);
                            
                         
                        }
});