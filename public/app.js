console.log('runnig');
$(document).ready(function(){

$(".formbutton").click(function(){

var $toggle=$(this);

var id="#replycomment-"+$toggle.data('id');
$(id).toggle();
});
 
});
