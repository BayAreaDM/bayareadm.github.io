$(document).ready(function(){
  $('.js-long-text').readmore({
    collapsedHeight: 100,
    speed:500
  });

  var active_nav = $('.nav').data('active');
  if (active_nav) {
    $('#'+active_nav).addClass('active');
  }

});
