//   // niceScroll
//   // $("html").niceScroll();


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

$('a[href*=#]').bind('click', function(e) {
  e.preventDefault();

  var target = $(this).attr("href");


  $('html, body').stop().animate({
    scrollTop: $(target).offset().top - 61
  }, 1000, function() {

  });

  return false;
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

}

var getUrlParam = function(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

var type = getUrlParam('type');
var number = getUrlParam('number');


//Menu mobile click
$(".icon").click(function() {
  $(" ul.menu-click").slideToggle("slow", function() {
    // Animation complete.
  });
});


$(window).load(function() {

  $(".preloader").delay(1000).fadeOut("slow");

  $.getJSON('json/' + type + '/' + number + '.json', function(data) {
    renderData(data);
  });
});

var renderData = function(data) {
  var startPage = $('.start-page');
  var workShowPage = $('.work-show');
  var textContent = data.text;
  var images = data.images;
  var videos = data.videos;
  var innerHtml = '';

  startPage.find('h1').text(data.headline);
  startPage.find('.custom').text(data.custom);
  startPage.find('.industry').text(data.industry);
  startPage.find('.serveice').text(data.serveice);

  if (textContent) {
    for (var i = 0; i < textContent.length; i++) {
      innerHtml += '<div class="text">';
      innerHtml += '  <h2>' + textContent[i].head + '</h2>';
      for (var j = 0; j < textContent[i].content.length; j++) {
        innerHtml += "  <p>" + textContent[i].content[j] + '</p>';
      }
      innerHtml += '</div>';
    }
  }

  if(images.length) {
    innerHtml += '<div class="margin-wrap"></div>';
    for(var i = 0; i < images.length; i++) {
      innerHtml += '<img src="' + images[i] + '" />';
    }
  }

  console.dir(videos);
  if(videos.length) {
    innerHtml += '<div class="margin-wrap"></div>';
    for(var i = 0; i < videos.length; i++) {
      innerHtml += '<iframe src="' + videos[i] + '" />';
    }
  }

  innerHtml += '<a href="../morework/morework.html">返回列表</a>'

  workShowPage.html(innerHtml);

  console.log(innerHtml);
};