console.log('runnig');
// $(".formbutton").click(function(){
//  $('.form1').toggle();
   
//     });


    $('.formbutton').click(function() {
    $(this).nextAll('.form1:lt(1)').toggle();
    });
