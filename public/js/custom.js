$(document).ready(function(){	

/* fixes */
function viewport(){
	var e = window
	, a = 'inner';
	if ( !( 'innerWidth' in window ) )
	{
	a = 'client';
	e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}

var handler1 = function(){
	var footH = $(".footer").height();
	$(".main-wrapper").css("margin-bottom","-"+footH+"px");
	$(".main").css("padding-bottom",footH+"px");
	
	var slickH2 = $(".slider").height();
	$(".slider__image").each(function(){
     	$(this).height(slickH2);   
    });		
	
	$(".catalog__left_styled").each(function(){
		$(this).css("min-height","auto");
     	var catFix = $(this).find(".catalog-nav").height();   
		var curFix = $(this).height();
		if(catFix>=curFix){$(this).css("min-height",catFix)};		
    });	
	
	var winW = viewport().width;	
	if(winW>767){
		var slickH1 = $(".main-slider").height();
		$(".main-slider__item").each(function(){
			$(this).css("height",slickH1+"px");   
		});			
		$(".catalog__left").each(function(){
			var width1 = $(this).width();
			var height1 = $(this).height();	
			$(this).find(".catalog__content").width(width1).height(height1);	
		});					
	}
	if(winW<=767){
		var slickH1 = $(".main-slider").height();
		$(".main-slider__item").each(function(){
			$(this).css("height","auto");
		});			
		$(".catalog__left").each(function(){
			var width1 = $(this).width();
			var height1 = $(this).find(".catalog__image").height();	
			$(this).find(".catalog__content").width(width1).height(height1);	
		});					
	}			
	
}
$(window).bind('load', handler1);
$(window).bind('resize', handler1);

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){$('body').addClass('ios');}
/* fixes */

/* scroll to id */
$(".scroll-button, .anchor-link").click(function(){	
    elementClick = $(this).attr("href");
    destination = $(elementClick).offset().top;
    $("html,body").stop().animate({scrollTop: destination},400, "easeInOutExpo",function(){
        window.location.hash = elementClick;
    });
    return false;
});
/* scroll to id */	

/* compare */
$(this).find('.compare__top').css("height","auto")
var height2 = 0; 	
$('.compare__top').each(function() {height2 = height2 > $(this).height() ? height2 : $(this).height();});	
$('.compare__top').each(function() {$(this).css("height",height2+"px")});

var handler2 = function(){
	setTimeout(function(){
		$(".compare").each(function(){	
			$(this).find('.main-catalog__item').css("height","auto");
			var maxHeight1 = -1; 
			$(this).find('.main-catalog__item').each(function() {maxHeight1 = maxHeight1 > $(this).height() ? maxHeight1 : $(this).height();});	   
			$(this).find('.main-catalog__item').each(function() {$(this).css("height",maxHeight1+"px");}); 
			
			$(this).find('.compare__top').css("height","auto")
			var height2 = 0; 	
			$('.compare__top').each(function() {height2 = height2 > $(this).height() ? height2 : $(this).height();});	
			$('.compare__top').each(function() {$(this).css("height",height2+"px")});			
		})	
	},500);				
	  
	$('.compare-table__main td, .compare-table__main th').each(function() {$(this).css("height","auto")});
	for (var i=1; i<999; i++){
		var height2 = 0; 	
		$('.compare-table__main tr:nth-child('+i+') td,'+'.compare-table__main tr:nth-child('+i+') th').each(function() {height2 = height2 > $(this).height() ? height2 : $(this).height();});	
		$('.compare-table__main tr:nth-child('+i+') td,'+'.compare-table__main tr:nth-child('+i+') th').each(function() {$(this).css("height",height2+"px")});		
	}

	var winW = viewport().width;
	if(winW>1024){
		$(".compare__select").css("margin-top","30px");				
	}		
	if(winW<=1024){
		$(".compare__select").css("margin-top","24px");				
	}
	if(winW<=767){
		var topH = $(".compare__body .main-catalog__item-wrapper").height();
		$(".compare__select").css("margin-top",topH+"px");				
	}		
}
$(window).bind('resize', handler2);
$(window).bind('load', handler2);

$(".compare__radio_script .radio__label").live("click",function(){
	var curIndex = $(this).closest(".radio__item").index()+1;
	$(".compare__select_script .jq-selectbox__dropdown li:nth-child("+curIndex+")").click();
})

$(".compare__list").slick({
  dots: false,
  infinite: true,
  autoplay: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  touchThreshold: 200,
  responsive: [
    {breakpoint: 800,settings: {slidesToShow: 2,slidesToScroll: 2,speed: 0}}	
  ]    
});
/* compare */

/* clear input */		  
$("input, textarea").live("focus", function(){		
  $(this).data('placeholder',$(this).attr('placeholder'))
  $(this).attr('placeholder','');
  $(this).closest(".input-wrapper").addClass("focused");			
}).live("blur", function(){		
  $(this).attr('placeholder',$(this).data('placeholder'));
  $(this).closest(".input-wrapper").removeClass("focused");		
})

$(".input-wrapper").live("click", function(){	
	if($(this).find("input, textarea").is(":focus")){return}	
	else{$(this).find("input").focus();$(this).find("textarea").focus();}		
})
/* clear input */

/* popups */
$('a.popup').live("click", function(e){	
	$('#mask').fadeIn(200).addClass("fixed");
	e.preventDefault();
	var id = $(this).attr('href');
	var winH = $(window).height();
	var winW = $(window).width();
	$(id).css('top',  winH/2-$(id).height()/2);
	$(id).css('left', winW/2-$(id).width()/2);
	$(id).fadeIn(200);	
})
$('.window .window-close, .window .window-fix, #mask').live("click", function(e){		
	e.preventDefault();
	$('#mask, .window').fadeOut(0);
	$("#mask").removeClass("fixed");
	$(".header-basket__window").fadeOut(0);
	$(".header").removeClass("fixed");
	$(".header-basket, .header-nav-mob .header-nav-location").removeClass("active");		
	$("#popup-location").fadeOut(0).removeClass("fixed");
	$(".header-search").fadeOut(0);
	$(".header").removeClass("search-fix").removeClass("index");
	$(".slider").removeClass("index");
	$(".header-nav-mob-wrapper, .header-icon").css("display","block");	
	$(".header-location__open").removeClass("header-location__open_active");
	$(".header-nav-location").removeClass("active");
	$(".header-nav-location__hide").fadeOut(0);	
	$("html, body").removeClass("fixed");	
	$(".header-nav-2.fixed .header-nav-2__item").mouseleave();
	var winW = viewport().width;	
	if(winW<=767){
		$(".header-nav-mob-wrapper, .header-login").stop(true).animate({ width: '0' }, 0)
		$(".price__main").removeClass("active");
		$(".price__main, .price__button-2").removeClass("active");
		$(".price__left").stop(true).animate({ width: '0' }, 0);				
	}
})
$(document).keyup(function(e) {
	if (e.keyCode == 27) {
		$('#mask, .gallery__close').click();		  
	}
});

var handler3 = function(){
	var winH = $(window).height();
	var winW = $(window).width();
	var popupV = $(".window:visible").attr("id");
	var popupH = $(".window:visible").find(".window-content").height()+60;
	$(".window:visible").css('top',  winH/2-$("#"+popupV).height()/2);
	$(".window:visible").css('left', winW/2-$("#"+popupV).width()/2);
	if(popupH>=winH){
		$(".window:visible").find(".window-content").height(winH-60);
		var newH1 = $(".window:visible").find(".window-content").height();		
		$(".window:visible").find(".window-main").css("height",newH1);					
		$('.window:visible .window-main').jScrollPane({showArrows: false, animateScroll:true, verticalGutter: 0, mouseWheelSpeed:1000, autoReinitialise: true, verticalDragMinHeight:60, verticalDragMaxHeight:60});	
		$(".window:visible").css('top',  winH/2-$("#"+popupV).height()/2);
		$(".window:visible").css('left', winW/2-$("#"+popupV).width()/2);						
	}
}
$(window).bind('resize', handler3);
$(window).bind('click', handler3);

$(".window-fix").click(function(){
	$("#mask").click();	
})

/*
$(window).bind('resize', function(){
	var winW = viewport().width;	
	if(winW>767){
		$("#mask").click();				
	}	
});
*/
/* popups */

/* header nav, login nav */
$(".header-login__open").click(function(e){
	var winW = viewport().width;
	if(winW>767){
		if($(this).hasClass("header-login__open_active")){
			$(".header-login__window").stop().fadeOut(0);
			$(".header-login__open").removeClass("header-login__open_active");		
		}
		else{
			$(".header-login__window").stop().fadeIn(200);
			$(".header-login__open").addClass("header-login__open_active");									
		}
	}
	e.preventDefault();	
	$(".header-basket__window, #mask").fadeOut(0);
	$(".header").removeClass("fixed");
	$(".header-basket").removeClass("active");	
	$(".header-search").fadeOut(0);
	$(".header").removeClass("search-fix");
	$(".header-nav-mob-wrapper, .header-icon").css("display","block");			
			
})	

var handler4 = function(){
	var winW = viewport().width;	
	if(winW<1000){
		$(".header-basket__window").addClass("window");
		$(".header-basket__open").addClass("popup").removeClass("fixed").addClass("index");
		$(".header-basket").removeClass("active");				
	}	
	if(winW>767){	
		$(".header-location__open").click(function(){$(this).addClass("header-location__open_active");})				
		$(".plus-minus__input").removeAttr("readonly");
		$(".header-nav-2").removeClass("mobile").addClass("fixed");	
		$("#popup-location").removeClass("fixed-2").addClass("window");
		$(".cities-form__input").removeAttr("placeholder");
		$(".filter").removeClass("fixed");
		/* $(".header-login__content-wrapper").removeClass("fixed"); */
		
		$('body').click(function(e) {
			var target = $(e.target);
			if(target.is('.header-login')||target.is('.header-login *')){return}
			else{
				$(".header-login__window").stop().fadeOut(0);
				$(".header-login__open").removeClass("header-login__open_active");					
			}
		});
		
		if(winW>1000){
			$(".header-basket__window").removeClass("window").css("top","100%").css("left","auto");
			$(".header-basket__open").removeClass("popup").removeClass("index").addClass("fixed");
		}
		
	}
	if(winW<=767){
		$(".plus-minus__input").attr("readonly",true);	
		$(".header-nav-2").removeClass("fixed").addClass("mobile");
		$("#popup-location").removeClass("window").addClass("fixed-2");
		$(".header-basket__open").removeClass("index");
		$(".filter").addClass("fixed");
		/* $(".header-login__content-wrapper").addClass("fixed"); */
		$(".header-nav-2__list, #popup-location.fixed-2 .window-main, .header-login__content-wrapper.fixed, .filter.fixed").jScrollPane({showArrows: false, animateScroll:true, verticalGutter: 0, mouseWheelSpeed:1000, autoReinitialise: true, verticalDragMinHeight:60, verticalDragMaxHeight:60});		
		$(".cities-form__input").attr("placeholder","Название города");
	}
}
$(window).bind('load', handler4);
$(window).bind('resize', handler4);
/* header nav, login nav */

/* header nav */
$(".header-nav-2.fixed .header-nav-2__link").live("mouseover", function(e){		
	$(this).next(".header-nav-2-in").fadeIn(0);
	$(this).closest(".header-nav-2__item").addClass("header-nav-2__item_active");
	$("#mask").fadeIn(0);
	$(".header").addClass("fixed");
	$(".header-basket__window").fadeOut(0);
	$(".header-basket").removeClass("active");		
})
$(".header-nav-2.fixed .header-nav-2__item").live("mouseleave", function(e){		
	$(this).find(".header-nav-2-in").fadeOut(0);
	$("#mask").fadeOut(0);
	$(".header").removeClass("fixed");
	$(".header-nav-2__item").removeClass("header-nav-2__item_active");	
})	

$(".header-nav-2.mobile .header-nav-2__link").live("click", function(e){
	if($(this).closest(".header-nav-2__item").hasClass("header-nav-2__item_active")){
		$(this).closest(".header-nav-2__item").removeClass("header-nav-2__item_active");	
		$(this).next(".header-nav-2-in").stop().slideUp(200);
	}
	else{
		$(this).closest(".header-nav-2__item").addClass("header-nav-2__item_active");
		$(this).next(".header-nav-2-in").stop().slideDown(200);
	}
	e.preventDefault();	
})	

$(".header-nav-2.mobile .header-nav-2-in__title .header-nav-2-in__link").live("click", function(e){
	if($(this).closest(".header-nav-2-in__title").hasClass("header-nav-2-in__title_active")){
		$(this).closest(".header-nav-2-in__title").removeClass("header-nav-2-in__title_active");	
		$(this).closest(".header-nav-2-in__title").next(".header-nav-2-in__list").stop().slideUp(200);
	}
	else{
		$(this).closest(".header-nav-2-in__title").addClass("header-nav-2-in__title_active");
		$(this).closest(".header-nav-2-in__title").next(".header-nav-2-in__list").stop().slideDown(200);
	}
	e.preventDefault();	
})	

$(document).on('touchstart', function() {
    documentClick = true;
});
$(document).on('touchmove', function() {
    documentClick = false;
});
$(document).on('click touchend', function(event) {
    if (event.type == "click") documentClick = true;
    if (documentClick){
		var target = $(event.target);
		if(target.is('.header')||target.is('.header *')||target.is('.price__panel')||target.is('.price__panel *')||target.is('.filter *')||target.is('.filter *')||target.is('.popup')||target.is('.window')||target.is('.window *')){return}
		else{$(".header-nav-2.fixed .header-nav-2__item").mouseleave()};
    }
 });
 
 $(".header-nav-2-in__close").live("click",function(){$(".header-nav-2.fixed .header-nav-2__item").mouseleave();})
/* header nav */

/* basket nav */
$(".header-basket__open.fixed").live("click", function(e){		
	if($(".header-basket").hasClass("active")){
		$("#mask").fadeOut(0);
		$(".header-basket__window").fadeOut(0);
		$(".header").removeClass("fixed");
		$(".header-basket").removeClass("active");	
	}
	else{
		$("#mask").fadeIn(200);
		$(".header-basket__window").fadeIn(200);
		$(".header").addClass("fixed");
		$(".header-basket").addClass("active");
		$(".header-search").fadeOut(0);
		$(".header").removeClass("search-fix");
		$(".header-nav-mob-wrapper, .header-icon").css("display","block");			
	}
	e.preventDefault();	
})

$(".header-basket__open.index").live("click", function(e){	
	$(".header, .slider").addClass("index");
})

$(".mask-fix").click(function(){
	$("#mask").click();	
})
/* basket nav */

/* login nav */
$(".header-login-form__open-auth").click(function(e){
	$(".header-login-form__content-reg").fadeOut(0);
	$(".header-login-form__content-auth").fadeIn(0);	
	e.preventDefault();
})
$(".header-login-form__open-reg").click(function(e){
	$(".header-login-form__content-auth").fadeOut(0);
	$(".header-login-form__content-reg").fadeIn(0);	
	e.preventDefault();
})	
/* login nav */

/* mobile nav */
$(".header-mobile").live("click",function(){
	$("#mask").fadeIn(200);	
	$(".header-nav-mob-wrapper").stop(true).animate({ width: '100%' }, 200);
	var winW = viewport().width;	
	if(winW<=767){$("html, body").addClass("fixed");}		
})

$(".header-nav-mob-fix, .header-nav-mob-close").live("click",function(){
	$(".header-nav-mob-wrapper").stop(true).animate({ width: '0' }, 0)	
	$("#mask").fadeOut(0);	
	$("html, body").removeClass("fixed");
})

$(".header-icon__link_3").live("click",function(){
	$("#mask").fadeIn(200);	
	$(".header-login").stop(true).animate({ width: '100%' }, 200)
	$("#popup-location").addClass("fixed");
	var winW = viewport().width;	
	if(winW<=767){$("html, body").addClass("fixed");}		
})

$(".header-login-fix, .header-login__close").live("click",function(){
	$(".header-login").stop(true).animate({ width: '0' }, 0)	
	$("#mask").click();	
	$("html, body").removeClass("fixed");
})

var handler6 = function(){		
	var curH1 = $(".header-nav-mob").height()-44;
	$(".header-nav-2__list, #popup-location.fixed-2 .window-main, .header-login__content-wrapper.fixed").css("height",curH1+"px");

	setTimeout(function(){
		$(".main-reviews__image-wrapper").each(function(){
			var curH2 = $(this).height();
			$(this).find(".main-reviews__image").css("height",curH2+"px");
		});
		
		$(".reviews__image-wrapper").each(function(){
			var curH2 = $(this).height();
			$(this).find(".reviews__image").css("height",curH2+"px");
		});	
	},500);		

}
$(window).bind('load', handler6);
$(window).bind('resize', handler6);
$(window).bind('click', handler6);
/* mobile nav */

/* search nav */
$(".header-icon__link_1").live("click",function(e){
	$("#mask").fadeIn(0);	
	$(".header-search").fadeIn(0);
	$(".header").addClass("fixed");
	$(".header").addClass("search-fix");
	$(".header-nav-mob-wrapper, .header-icon").css("display","none");
	$(".header-search__input").focus();
	e.preventDefault();
})

$(".header-search__input").focus(function(){
	$(".header-search__dropdown-wrapper").fadeIn(0);
	var winW = viewport().width;	
	if(winW<=767){
		  var iDevices = [
			'iPhone Simulator',
			'iPod Simulator',
			'iPhone',
			'iPod'
		  ];
		
		  while (iDevices.length) {
			if (navigator.platform === iDevices.pop()){
				$("#mask").fadeIn(0);
				$("body, html").addClass("fixed");
				window.scrollTo(0, 0);
			}
		  }	
	}		
})

$(".header-search__button-2").click(function(e){
	$("#mask").click();	
	$("body, html").removeClass("fixed");
	e.preventDefault();	
})

/*
$(".header").click(function(e){
	var target = $(e.target);
	if(target.is('.header-nav-2')||target.is('.header-nav-2 *')){return}
	else{$(".header-nav-2.fixed .header-nav-2__item").mouseleave();}	
})
*/
/* search nav */

/* plus minus */
$(".plus-minus__fix").click(function(){
	if($(this).closest(".plus-minus__form").hasClass("plus-minus__form_active")){
		$(this).closest(".plus-minus").find(".plus-minus__window-wrapper").fadeOut(0);	
		$(this).closest(".plus-minus__form").removeClass("plus-minus__form_active");		
	}
	else{
		$(this).closest(".plus-minus").find(".plus-minus__window-wrapper").fadeIn(0);	
		$(this).closest(".plus-minus__form").addClass("plus-minus__form_active");
	}
})

$(".plus-minus__link").click(function(e){
	var curVal = $(this).text();
	$(this).closest(".plus-minus").find(".plus-minus__input").val(curVal);
	$(this).closest(".plus-minus").find(".plus-minus__window-wrapper").fadeOut(0);	
	$(this).closest(".plus-minus").find(".plus-minus__form").removeClass("plus-minus__form_active");	
	e.preventDefault();	
})

		$('.plus-minus__list').jScrollPane({showArrows: false, animateScroll:true, verticalGutter: 0, mouseWheelSpeed:1000, autoReinitialise: true, verticalDragMinHeight:60, verticalDragMaxHeight:60});
/* plus minus */			

/* footer nav */
$(".header-logo").click(function(e){
	$(this).stop().toggleClass("active");
	e.preventDefault();	
})

$(".footer-nav__button").click(function(){	
if($(this).closest(".footer-nav__section").hasClass("active")){
	$(this).closest(".footer-nav__section").find(".footer-nav__main").stop().slideUp(200);
	$(this).closest(".footer-nav__section").removeClass("active");
}
else{
	$(this).closest(".footer-nav__section").find(".footer-nav__main").stop().slideDown(200);
	$(this).closest(".footer-nav__section").addClass("active");
}
})

/* footer nav */

/* counter */
$('.plus-button').live("click", function(){		
	var inpVal = $(this).prev().val();
	$(this).prev().val(+inpVal + 1);	
})
$('.minus-button').live("click", function(){		
	var inpVal = $(this).next().val();
	if (inpVal > 1) {
		$(this).next().val(+inpVal - 1);
	}	
})

$('.plus-minus__form input').keypress(function(event){
	var key, keyChar;
	if(!event) var event = window.event;
	
	if (event.keyCode) key = event.keyCode;
	else if(event.which) key = event.which;

	if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
	keyChar=String.fromCharCode(key);
	
	if(!/\d/.test(keyChar))	return false;

});				
/* counter */	

/* height fix */
$('.main-slider__list').slick({
  dots: true,
  infinite: true,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: false,
  touchThreshold: 100
});	

setTimeout(function(){
$(".main-slider__link").css("display","block");		
},100);	

$('.main-catalog__title-1-link, .main-discount__link, .main-reviews__link, .main-reviews__head-2').ellipsis({lines: 2,ellipClass: 'ellip'});
$('.main-catalog__title-2-link').ellipsis({lines: 1,ellipClass: 'ellip'});
$('.main-discount__text, .main-articles__link').ellipsis({lines: 3,ellipClass: 'ellip'});	
$('.main-articles__text').ellipsis({lines: 4,ellipClass: 'ellip'});	

	var winW = viewport().width;	
	if(winW>1000){
		$('.main-discount__link, .main-reviews__link, .main-reviews__head-2').ellipsis({
		  lines: 2,
		  ellipClass: 'ellip'
		});
		$('.main-discount__text, .main-articles__link').ellipsis({
		  lines: 3,
		  ellipClass: 'ellip'
		});	
		$('.main-articles__text').ellipsis({
		  lines: 4,
		  ellipClass: 'ellip'
		});
	}
	if(winW<=1000){	
		$('.main-discount__link, .main-reviews__link, .main-reviews__head-2, .main-articles__link').ellipsis({
		  lines: 2,
		  ellipClass: 'ellip'
		});
		$('.main-discount__text, .main-articles__text').ellipsis({
		  lines: 3,
		  ellipClass: 'ellip'
		});	
	}
	if(winW<=900){	
		$('.main-discount__link, .main-reviews__link, .main-reviews__head-2, .main-articles__link').ellipsis({
		  lines: 2,
		  ellipClass: 'ellip'
		});
		$('.main-discount__text, .main-articles__text').ellipsis({
		  lines: 2,
		  ellipClass: 'ellip'
		});	
	}
	if(winW<=767){	
		$('.main-discount__link, .main-reviews__link, .main-reviews__head-2, .main-articles__link').ellipsis({
		  lines: 2,
		  ellipClass: 'ellip'
		});
		$('.main-discount__text, .main-articles__text').ellipsis({
		  lines: 3,
		  ellipClass: 'ellip'
		});			
	}	

var handler5 = function(){		
	$(".main-catalog, .price").each(function(){	
		$(this).find('.main-catalog__item').css("height","auto");
		var maxHeight1 = -1; 
		$(this).find('.main-catalog__item').each(function() {maxHeight1 = maxHeight1 > $(this).height() ? maxHeight1 : $(this).height();});	   
		$(this).find('.main-catalog__item').each(function() {$(this).css("height",maxHeight1+"px");}); 
	})	
	
	var curH1 = $(".main-discount__fix img").height();
	$(".main-discount__item").each(function(){
        $(this).height(curH1);
    });
	
	$(".main-reviews__article").each(function(){
        var curH3 = $(this).find(".main-reviews__fix img").height();
		$(this).find(".main-reviews__content").height(curH3);
    });
	
	$(".main-articles__slider").each(function(){
		$(this).css("min-height","auto");
		var curH2 = $(this).find(".main-articles__fix img").height();
		$(this).find(".main-articles__item-wrapper").height(curH2); 
		$(this).css("min-height",curH2+"px");       
	});	
													
}
$(window).bind('load', handler5);
$(window).bind('resize', handler5);
/* height fix */

/* sliders + tabs */
$(".main-discount__slider-wrapper .slider-prev, .main-discount__slider-wrapper .slider-next").each(function(){
 	var slideCount = $(this).closest(".main-discount__slider-wrapper").find(".main-discount__item").length;
	if(slideCount<=3){$(this).fadeOut(0);}
});
$(".main-reviews__slider-wrapper .slider-prev, .main-reviews__slider-wrapper .slider-next").each(function(){
 	var slideCount = $(this).closest(".main-reviews__slider-wrapper").find(".main-reviews__item").length;
	if(slideCount<=2){$(this).fadeOut(0);}
});

$('.slider-1').slick({
  dots: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  touchThreshold: 100
});

$('.slider-2, .slider-3, .slider-4').slick({
  dots: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  touchThreshold: 100,
  responsive: [
    {breakpoint: 767,settings: {slidesToShow: 3}}	
  ]    
});

$('.slider-5').slick({
  dots: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 2,
  touchThreshold: 100,
  responsive: [
    {breakpoint: 767,settings: {slidesToShow: 3, slidesToScroll: 3}},
	{breakpoint: 500,settings: {slidesToShow: 2, slidesToScroll: 2}}		
  ]    
});

$('.reviews-slider .reviews__list').slick({
  dots: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  touchThreshold: 100 
});

$('.slider__list').slick({
  dots: true,
  infinite: true,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: false,
  touchThreshold: 100
});
	

$(".main-articles__slider").each(function(){
	$(this).css("min-height","auto");
	var curH2 = $(this).find(".main-articles__fix img").height();
	$(this).find(".main-articles__item-wrapper").height(curH2); 
	$(this).css("min-height",curH2+"px");       
});	

$('.slider-1__prev').live("click",function(){$(".slider-1").slick('slickPrev');});
$('.slider-1__next').live("click",function(){ $(".slider-1").slick('slickNext');});
$('.slider-2__prev').live("click",function(){$(".slider-2").slick('slickPrev');});
$('.slider-2__next').live("click",function(){ $(".slider-2").slick('slickNext');});
$('.slider-3__prev').live("click",function(){$(".slider-3").slick('slickPrev');});
$('.slider-3__next').live("click",function(){ $(".slider-3").slick('slickNext');});
$('.slider-4__prev').live("click",function(){$(".slider-4").slick('slickPrev');});
$('.slider-4__next').live("click",function(){ $(".slider-4").slick('slickNext');});
$('.slider-5__prev').live("click",function(){$(".slider-5").slick('slickPrev');});
$('.slider-5__next').live("click",function(){ $(".slider-5").slick('slickNext');});
$('.gallery__prev').live("click",function(){$(".gallery_1 .gallery-slider__list").slick('slickPrev');});
$('.gallery__next').live("click",function(){ $(".gallery_1 .gallery-slider__list").slick('slickNext');});

$(".tabs__title a").live("click",function(e){
	$(this).closest(".tabs__title").find("a").removeClass("tabs__active");
	$(this).addClass("tabs__active");
	var curTab = $(this).attr("href");
	$(this).closest(".tabs").find(".tabs__content .tabs__item").addClass("tabs__hide");
	$(curTab).removeClass("tabs__hide");
	
	if($(this).closest(".tabs").hasClass("main-articles-tabs")){
		$(".main-articles__slider").each(function(){
			$(this).css("min-height","auto");
			var curH2 = $(this).find(".main-articles__fix img").height();
			$(this).find(".main-articles__item-wrapper").height(curH2); 
			$(this).css("min-height",curH2+"px");       
		});					
	}	
	e.preventDefault();
})


/* sliders + tabs */

/* cities */
$(".cities__link").live("click",function(e){
	var curTxt = $(this).text();
	$(".header-location__open, .header-nav-location__button").text(curTxt);
	$(".cities__item").removeClass("cities__item_active");
	$(this).closest(".cities__item").addClass("cities__item_active");
	e.preventDefault();
	$(".header-nav-location").removeClass("active");
	$("#popup-location").fadeOut(0);
	$(".header-nav-location__hide").fadeOut(0);	
	
	var winW = viewport().width;	
	if(winW>767){
		$("#mask").fadeOut(0);
		$(".header-location__open").removeClass("header-location__open_active");
	}	
})

$(".header-nav-mob .header-nav-location").live("click",function(e){
	if($(this).hasClass("active")){
		$(this).removeClass("active");
		$("#popup-location").fadeOut(0);
		$(".header-nav-location__hide").fadeOut(0);			
	}
	else{
		$(this).addClass("active");
		$("#popup-location").fadeIn(0);
		$(".header-nav-location__hide").fadeIn(0);	
	}
})

$(".header-login__window .header-nav-location").live("click",function(e){
	if($(this).hasClass("active")){
		$(this).removeClass("active");
		$("#popup-location").fadeOut(0);	
		$(".header-nav-location__hide").fadeOut(0);	
	}
	else{
		$(this).addClass("active");
		$("#popup-location").fadeIn(0);
		$(".header-nav-location__hide").fadeIn(0);	
	}
})
/* cities */

/* countdown */
$('.countdown').countdown({
  render: function(data) {
	$(this.el).html('<div class="countdown__text">До конца <span>акции</span></div><div class="countdown__list"><div class="countdown__item">' + this.leadingZeros(data.days, 2) + '<span class="countdown__label">Дней</span></div><div class="countdown__item">' + this.leadingZeros(data.hours, 2) + '<span class="countdown__label">Часов</span></div><div class="countdown__item">' + this.leadingZeros(data.min, 2) + '<span class="countdown__label">Минут</span></div><div class="countdown__item">' + this.leadingZeros(data.sec, 2) + '<span class="countdown__label">Секунд</span></div></div>');
  }
});
/* countdown */

/* accordion */
$(".accordion__item_active").each(function(){
    $(this).find(".accordion__content-wrapper").css("display","block");
	$(this).find(".accordion__content").css("display","block");
});

$(".accordion_1 .accordion__link").click(function(){
	if($(this).closest(".accordion__item").hasClass("accordion__item_active")){
		$(this).closest(".accordion__item").removeClass("accordion__item_active");
		$(this).closest(".accordion__item").find(".accordion__content-wrapper").stop().slideUp(100);
		$(this).closest(".accordion__item").find(".accordion__content").fadeOut(0).removeClass("animated fadeInDown")
	}
	else{
		$(this).closest(".accordion__item").addClass("accordion__item_active");
		$(this).closest(".accordion__item").find(".accordion__content-wrapper").slideDown(100);
		$(this).closest(".accordion__item").find(".accordion__content").fadeIn(0).addClass("animated").addClass("fadeInDown")
	}	
})
/* accordion */

/* prompt */
$(".prompt__button").mouseover(function(){
	$(this).closest(".prompt").find(".prompt__content-wrapper").fadeIn(200);	
})
$(".prompt-wrapper").mouseleave(function(){
	$(this).find(".prompt__content-wrapper").fadeOut(200);	
})
/* prompt */

/* form styler */
$('.radio input').styler({
  wrapper: '.radio'
})

$('select, .checkbox input').styler({
})

$(".radio__link").live("click",function(e){e.preventDefault();})

$(".jq-radio.checked, .jq-checkbox.checked").each(function(){
	$(this).closest(".radio__label").addClass("active");
})

$(".jq-checkbox.checked").each(function(){
	$(this).closest(".checkbox__label").addClass("active");
})

$(".radio__label").live("click",function(){
	$(this).closest(".radio").find(".radio__label").removeClass("active");
	$(this).addClass("active");
})

$(".checkbox__label").live("click",function(){
	$(this).toggleClass("active");
})

$(".jq-selectbox__select-text").live("click",function(){
	if($(this).hasClass("active")){$(this).removeClass("active");}
	else{$(".jq-selectbox__select-text").removeClass("active");$(this).addClass("active");}	
})

$(".jq-selectbox li").live("click",function(){$(".jq-selectbox__select-text").removeClass("active");})

$("body").click(function(e){
	var target = $(e.target);
	if(target.is('.jq-selectbox')||target.is('.jq-selectbox *')){return}
	else{$(".jq-selectbox__select-text").removeClass("active");}	
})

$(".radio__item_1").click(function(){$(".settings__tab_2").removeClass("settings__tab_active");	$(".settings__tab_1").addClass("settings__tab_active");})
$(".radio__item_2").click(function(){$(".settings__tab_1").removeClass("settings__tab_active");	$(".settings__tab_2").addClass("settings__tab_active");})
/* form styler */

/* filter */
$(".price__button-1").click(function(e){
	var winW = viewport().width;	
	if(winW>767){
		if($(".price__main").hasClass("active")){
			$(this).removeClass("active");
			$(".price__main, .price__button-2").removeClass("active");
			$(".price__left").stop(true).animate({ width: '0' }, 0);		
		}
		else{
			$(this).addClass("active");
			$(".price__main, .price__button-2").addClass("active");	
			$(".price__left").stop(true).animate({ width: '100%' }, 0);		
		}			
	}				
	if(winW<=767){
		$("html, body").addClass("fixed");		
		if($(".price__main").hasClass("active")){
			$(this).removeClass("active");
			$(".price__main, .price__button-2").removeClass("active");
			$(".price__left").stop(true).animate({ width: '0' }, 0);	
			$("#mask").fadeOut(0);	
		}
		else{
			$(this).addClass("active");
			$(".price__main, .price__button-2").addClass("active");	
			$(".price__left").stop(true).animate({ width: '100%' }, 300);	
			$("#mask").fadeIn(0);	
		}	
	}		
	$(".main-catalog, .price").each(function(){	
		$(this).find('.main-catalog__item').css("height","auto");
		var maxHeight1 = -1; 
		$(this).find('.main-catalog__item').each(function() {maxHeight1 = maxHeight1 > $(this).height() ? maxHeight1 : $(this).height();});	   
		$(this).find('.main-catalog__item').each(function() {$(this).css("height",maxHeight1+"px");}); 
	})	
	$('.main-catalog__title-1-link').ellipsis({lines: 2,ellipClass: 'ellip',responsive: true});
	$('.main-catalog__title-2-link').ellipsis({lines: 1,ellipClass: 'ellip',responsive: true});		
	e.preventDefault();
})

$(".price__fix, .filter__button-2").live("click",function(){
	$("#mask").click();
	$("html, body").removeClass("fixed");
})

$(".filter-check__more").live("click",function(){
	$(this).fadeOut(0);
	$(this).closest(".filter-check").find(".filter-check__item_hide").css("display","block");
})
/* filter */

/* range slider */
$(".range-slider").noUiSlider({connect: true, range:{'min': 0,'max': 200000},step: 1,start: [300, 160000]});
$(".range-slider").Link('lower').to($(".range-slider__min"), null, wNumb({decimals:0, thousand: ' '}));
$(".range-slider").Link('upper').to($(".range-slider__max"), null, wNumb({decimals:0, thousand: ' '}));

$(".bonus-range__slider").noUiSlider({connect: true, range:{'min': 0,'max': 874},step: 1,start: [0,612]});
$(".bonus-range__slider").Link('upper').to($(".bonus-range__input"), null, wNumb({decimals:0, thousand: ' '}));








/* range slider */

/* gallery */
$(".gallery-slider__item.active").fadeIn(0);

var style = 'easeOutExpo';
var default_left = Math.round($('.gallery-thumb ul li.active').offset().left - $('.gallery-thumb ul').offset().left);
var default_top = $('.gallery-thumb ul li.active').height()+10;
var default_width = $('.gallery-thumb ul li.active').outerWidth();
$('.gallery-thumbs__border').css({left: default_left, top: default_top, width: default_width});	
$('.gallery-thumb ul li').click(function () {
	left = Math.round($(this).offset().left - $('.gallery-thumb ul').offset().left);
	width = $(this).outerWidth();
	$('.gallery-thumbs__border').stop(false, true).animate({left: left, width: width},{duration:1000, easing: style});	
}).click(function () {												
	$('.gallery-thumb ul li').removeClass('active');	
	$(this).addClass('active');
	if($(this).hasClass("item-1")){$(".slick-dots li:first-child a").click();}
	if($(this).hasClass("item-2")){$(".slick-dots li:nth-child(2) a").click();}	
	if($(this).hasClass("item-3")){$(".slick-dots li:nth-child(3) a").click();}	
	if($(this).hasClass("item-4")){$(".slick-dots li:nth-child(4) a").click();}	
	if($(this).hasClass("item-5")){$(".slick-dots li:nth-child(5) a").click();}		
});

$('.gallery_1 .gallery-slider__list').slick({
	dots: true,
	infinite: true,
	autoplay: false,
	speed: 0,
	slidesToShow: 1,
	slidesToScroll: 1,
	fade: true, 
	touchThreshold: 100
});

$('.gallery_1 .gallery-slider__list').on('swipe', function(event, slick, direction){
  if(direction==="left"){
	var actDot1 = $(".gallery_1 .slick-dots li.slick-active").index();
	var actDot2 = actDot1+1;	
	$(".gallery-thumb__item:nth-child("+actDot2+")").click();		  
  }
  if(direction==="right"){
	var actDot1 = $(".gallery_1 .slick-dots li.slick-active").index();
	var actDot2 = actDot1+1;	
	$(".gallery-thumb__item:nth-child("+actDot2+")").click();		  
  }  
});

var handler7 = function(){		

	var curH = $(".gallery-slider").height();
	$(".gallery-slider__item").each(function(){
		$(this).css("height",curH);   
	});		
	
	var win1 = $(window).width();
	var win2 = $(window).height();
	$(".gallery_1").css("width","auto").css("height","auto");
	$(".gallery_1 .gallery-slider__image-wrapper").css("height","100%").css("width","100%");	
	$(".gallery_1 .gallery-slider__image img").css("max-width","100%").css("max-height","100%");
	$(".gallery_1.fixed, .gallery_1.fixed .gallery-slider__image-wrapper").css("width",win1+"px");
	$(".gallery_1.fixed, .gallery_1.fixed .gallery-slider__image-wrapper").css("height",win2+"px");	
	$(".gallery_1.fixed .gallery-slider__image img").css("max-width",win1+"px");
	$(".gallery_1.fixed .gallery-slider__image img").css("max-height",win2-100+"px");	

	var winH = $(window).height();
	$(".gallery_1").css("height","auto");
	$(".gallery_1.fixed").css("height",winH+"px");	
	var imageH1 = $(".gallery-slider__image-wrapper").height();
	$(".gallery-slider__image").css("height",imageH1+"px");
	$(".gallery_1.fixed .gallery-slider__image").css("height","auto");
	$(".gallery-thumb__item").each(function(){
    	var imageH2 = $(this).height();
		$(this).find(".gallery-thumb__image").height(imageH2);   
    });	
				
}
$(window).bind('resize', handler7);
$(window).bind('load', handler7);
$(window).bind('click', handler7);

var handler8 = function(){		
	var actDot1 = $(".gallery_1 .slick-dots li.slick-active").index();
	var actDot2 = actDot1+1;	
	$(".gallery-thumb__item:nth-child("+actDot2+")").click();	
}
$(window).bind('resize', handler8);

var handler9 = function(){	
	var style = 'easeOutExpo';
	var default_left = Math.round($('.gallery-thumb ul li.active').offset().left - $('.gallery-thumb ul').offset().left);
	var default_top = $('.gallery-thumb ul li.active').height();
	var default_width = $('.gallery-thumb ul li.active').outerWidth();
	$('.gallery-thumbs__border').css({left: default_left, top: default_top, width: default_width});			
}
$(window).bind('resize', handler9);
$(window).bind('load', handler9);

$(".gallery_default .gallery-slider__item").live("click",function(){
	var actDot1 = $(".gallery_1 .slick-dots li.slick-active").index();
	var actDot2 = actDot1+1;	
	$(".gallery_1").removeClass("gallery_default").addClass("fixed");
	$('.gallery_1 .gallery-slider__list').slick("unslick").slick({
		dots: true,
		infinite: true,
		autoplay: false,
		speed: 0,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		touchThreshold: 100
});	
	$(".gallery-thumb__item:nth-child("+actDot2+")").click();	
})

$(".gallery_1.fixed .gallery-slider__item").live("click",function(){
	$(".gallery_1 .gallery-slider__list").slick('slickNext'); 
})

$(".gallery__close").live("click",function(){
	$(".gallery_1").removeClass("fixed").addClass("gallery_default");
	$(".gallery_1, .gallery_1 .gallery-slider__image-wrapper").css("width","auto");
	$(".gallery_1, .gallery_1 .gallery-slider__image-wrapper").css("height","auto");	
	$(".gallery_1 .gallery-slider__image img").css("max-width","100%");
	$(".gallery_1 .gallery-slider__image img").css("max-height","100%");
	var actDot1 = $(".gallery_1 .slick-dots li.slick-active").index();
	var actDot2 = actDot1+1;				
	$('.gallery_1 .gallery-slider__list').slick("unslick").slick({
		dots: true,
		infinite: true,
		autoplay: false,
		speed: 0,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		touchThreshold: 100
	});	
	$(".gallery-thumb__item:nth-child("+actDot2+")").click();	
})
/* gallery */
				
});//ready eof