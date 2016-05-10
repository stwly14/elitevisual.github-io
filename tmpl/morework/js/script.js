var arrayObj = {
  design: [],
  view: [],
  net: []
};
var $container = $('.grid');
var isFirstShow = true;

$container.imagesLoaded(function() {
  $container.masonry({
    itemSelector: 'li'
  });
});

// Stick menu
$(".menu").sticky({
  topSpacing: 0
});



// Menu Scroll to content and Active menu
var lastId,
  topMenu = $("#menu"),
  topMenuHeight = topMenu.outerHeight() + 145,
  menuItems = topMenu.find("a");
scrollItems = menuItems.map(function() {
  var item = $($.parseHTML($(this).attr("href")));
  if (item.length) {
    return item;
  }
});

$(window).scroll(function() {
  var fromTop = $(this).scrollTop() + topMenuHeight;
  var cur = scrollItems.map(function() {
    if ($(this).offset().top < fromTop)
      return this;
  });

  cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : "";

  if (lastId !== id) {
    lastId = id;
    menuItems
      .parent().removeClass("active")
      .end().filter("[href=#" + id + "]").parent().addClass("active");
  }
});


if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

  $(".footer").css("position", "relative");
  $(".contact").css("marginBottom", "0");

} else {

  // FadeTo elements
  if ($(window).width() > 1023) {

    tiles = $("h2, h3, .column-one, .column-two, .column-three, .grid li, .contact .content .code_wrap, .contact .content .contact-text ").fadeTo(0, 0);

    $(window).scroll(function(d, h) {
      tiles.each(function(i) {
        a = $(this).offset().top + $(this).height();
        b = $(window).scrollTop() + $(window).height();
        if (a < b) $(this).fadeTo(1000, 1);
      });
    });

  }

}



//Menu mobile click
$(".icon").click(function() {
  $(" ul.menu-click").slideToggle("slow", function() {
    // Animation complete.
  });
});


$(window).load(function() {

  $.getJSON('json/design.json', function(data) {
    var $items;
    var obj = data['design'];
    var innerHTML = '';

    (obj.length <= 10) && $('.read-more').hide();

    for (var i = 0, length = obj.length; i < length; i++) {
      innerHTML += '<li>';
      innerHTML += '  <a href="../detail/detail.html?type=design&number=' + (i + 1) + '">';
      innerHTML += '    <img src="' + obj[i].src + '" alt="work item" />';
      innerHTML += '    <div class="text">';
      innerHTML += '      <div>';
      innerHTML += '        <p class="p_one">' + obj[i].name + '</p>';
      innerHTML += '        <p class="description">' + obj[i].dec + '</p>';
      innerHTML += '      </div>';
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

  initEvent();
});

var initEvent = function() {
  var i = 0;
  var j = 0;
  var btnLength = 0;
  var portfolioLength = 0;
  var typeGlobal = $('.read-more').attr('data-type');

  var renderListData = function(type) {
    i = 0;
    var $item;
    var innerHTML = '';

    $('.read-more').attr('data-type', type).show();

    var obj = arrayObj[type];

    btnLength = obj.length - i < 10 ? obj.length : 10;
    (obj.length - i < 10) && $('.read-more').hide();

    for (; i < btnLength; i++) {
      innerHTML += '<li>';
      innerHTML += '  <a href="../detail/detail.html?type=' + type + '&number=' + (i + 1) + '">';
      innerHTML += '    <img src="' + obj[i].src + '" alt="work item" />';
      innerHTML += '    <div class="text">';
      innerHTML += '      <p class="p_one">' + obj[i].name + '</p>';
      innerHTML += '      <p class="description">' + obj[i].dec + '</p>';
      innerHTML += '    </div>';
      innerHTML += '  </a>';
      innerHTML += '</li>';
    }

    $items = $(innerHTML);
    $itemsBefore = $container.find('li');
    $container.imagesLoaded(function() {
      $container.masonry('remove', $itemsBefore)
        .masonry('layout')
        .prepend($items)
        .masonry('prepended', $items);
    });

    typeGlobal = type;
  };

  $('#portfolio').on('click', '.btn', function() {
    var type = $(this).attr('data-type');
    isFirstShow = false;

    if (!arrayObj[type].length) {
      $.getJSON('json/' + type + '.json', function(data) {
        arrayObj[type] = data[type];
        renderListData(type);
      });
    } else if (typeGlobal !== type) {
      renderListData(type);
    }



  });

  $('#portfolio').on('click', '.read-more', function() {
    var $item;
    var innerHTML = '';
    var type = $(this).attr('data-type');
    if (type == 'design' && isFirstShow) {
      i += 10;
      isFirstShow = false;
    }


    $.getJSON('json/' + type + '.json', function(data) {
      var obj = data[type];
      portfolioLength = obj.length - i < 10 ? obj.length : i + 10;
      (obj.length - i <= 10) && $('.read-more').hide();

      for (; i < portfolioLength; i++) {
        innerHTML += '<li>';
        innerHTML += '  <a href="../detail/detail.html?type=' + type + '&number=' + (i + 1) + '">';
        innerHTML += '    <img src="' + obj[i].src + '" alt="work item" />';
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
      }, 500);
    });
  });


};