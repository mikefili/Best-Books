
$(".formbutton").click(function(){
    $(".formbutton").not(this).removeClass('form1');
    $(this).toggleClass('form1');
   
    });


