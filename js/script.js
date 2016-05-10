
  // niceScroll
  // $("html").niceScroll();


  var $container = $('.grid');
  var isFirstShow = true;

  $container.imagesLoaded(function() {
    $container.masonry({
      itemSelector: 'li'
    });
  });

  // Stick menu
  $(".menu").sticky({topSpacing:0});




  // Menu Scroll to content and Active menu
  var lastId,
    topMenu = $("#menu"),
    topMenuHeight = topMenu.outerHeight()+145,
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

   $('a[href*=#]').bind('click', function(e) {
	e.preventDefault();

	var target = $(this).attr("href");


	$('html, body').stop().animate({ scrollTop: $(target).offset().top-61 }, 1000, function() {

	});

	return false;
   });

  $(window).scroll(function(){
   var fromTop = $(this).scrollTop()+topMenuHeight;
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });

   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";

   if (lastId !== id) {
       lastId = id;
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }
  });


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

    $(".footer").css( "position", "relative" );
    $(".contact").css( "marginBottom", "0" );

}
else
{

  // FadeTo elements
  if ( $(window).width() > 1023) {

    tiles = $("h2, h3, .column-one, .column-two, .column-three, .grid li, .contact .content .code_wrap, .contact .content .contact-text ").fadeTo(0, 0);

    $(window).scroll(function(d,h) {
      tiles.each(function(i) {
          a = $(this).offset().top + $(this).height();
          b = $(window).scrollTop() + $(window).height();
          if (a < b) $(this).fadeTo(1000,1);
      });
    });

  }

}



  //Menu mobile click
  $( ".icon" ).click(function() {
    $( " ul.menu-click" ).slideToggle( "slow", function() {
    // Animation complete.
    });
  });


$(window).load(function(){

  $.getJSON('json/main.json', function(data) {
    var $items;
    var obj = data.content;
    var innerHTML = '';

    (obj.length <= 10) && $('.read-more').hide();

    for (var i = 0, length = obj.length; i < length; i++) {
      innerHTML += '<li>';
      innerHTML += '  <a href="' + obj[i].link +　'">';
      innerHTML += '    <img src="' + obj[i].src + '" alt="Portfolio item" />';
      innerHTML += '    <div class="text">';
      innerHTML += '      <p class="p_one">' + obj[i].name + '</p>';
      innerHTML += '      <p class="description">' + obj[i].dec + '</p>';
      innerHTML += '    </div>';
      innerHTML += '  </a>';
      innerHTML += '</li>';
    }

    $items = $(innerHTML);

    $container.imagesLoaded(function() {
      $container.append($items)
        .masonry('layout')
        .masonry('appended', $items);
    });

    setTimeout(function() {
      $container.imagesLoaded(function() {
        $container.masonry('layout')
      });
    }, 1000);

  });

  $(".preloader").delay(1000).fadeOut("slow");

  // Parallax
  if ($('.parallax-background').length) {
    $(".parallax-background").parallax();
  }

  // Parallax
  if ($('.parallax-background-partners').length) {
    $(".parallax-background-partners").parallax();
  }

});
