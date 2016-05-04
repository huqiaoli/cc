jQuery.noConflict();

(function($) {
  var cache = [];
  $.preLoadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cache.push(cacheImage);
    }
  }
})(jQuery);

/**
 * IE detection
 * @returns true / false on IE or IE 6 detection
 * @type Boolean
 */
var isIE = /*@cc_on!@*/!1;
function ie6(){
	var strChUserAgent = navigator.userAgent;
	var intSplitStart = strChUserAgent.indexOf("(",0);
	var intSplitEnd = strChUserAgent.indexOf(")",0);
	var strChMid = strChUserAgent.substring(intSplitStart, intSplitEnd);

	if(strChMid.indexOf("MSIE 6") != -1) return true;
	else return false;
}

var popup = function(link, width, height)
{
    window.open(link.href,'tools','menubar=1,location=1,resizable=1,scrollbars=1,status=1,width='+width+', height='+height);
    return false;
};


var stopVideo = function(){
	//alert("STOP VIDEO FNT");
	manageVideo("stop");
	//document.getElementById("flash").style.visibility = "hidden";
}
var restartVideo = function(){
	//alert("RESTART VIDEO FNT");
	manageVideo("start");
	//document.getElementById("flash").style.visibility = "visible";
}

var manageVideo = function(cmd){
	calleFlashMovie = document.getElementById("flash");
   calleFlashMovie.manageVideo(cmd);
}

var calltracking = function(ch_lang, ch_cat, ch_scat1)
{
    /*var _tag=new WebTrends();
    _tag.dcsGetId();*/

 
};

(function($) {
    $.kresize = {
        bind:false
    };
	$.fn.kresize = function(f)
	{
        if(!$.kresize.bind) {
            $.kresize.bind = true;
            var timeOut = 200;
            var to = false;
            $(window).resize(function() {
                if(to !== false)
                    clearTimeout(to);
                to = setTimeout(function(){$(window).triggerHandler('kresize')}, timeOut);
            });
        }
        this.each(function() {
            if(this == window) {
                $(this).bind('resize',f);
            }
        });
        return this;
    };
})(jQuery);

jQuery(document).ready(function($){

    var relUrl = '';
    if($('input[name="lang"]').length > 0) {
        relUrl = '../';
    }

    var cookieName = 'hp_lang';
    var pushCookie = function(lang)
    {
        var expDate = new Date();
        expDate.setTime(expDate.getTime() + (3650 * 24 * 3600 * 1000))
        document.cookie = cookieName + "=" + escape(lang) + ";expires=" + expDate.toGMTString() + ";path=/";
    }

    var getCookie = function()
    {
        deb = document.cookie.indexOf(cookieName + "=")
        if (deb >= 0)
        {
            deb += cookieName.length + 1
            fin = document.cookie.indexOf(";",deb)
            if (fin < 0) fin = document.cookie.length
            return unescape(document.cookie.substring(deb,fin))
        }
        return null;
    }

    var destroyCookie = function()
    {
        var expDate = new Date()
        expDate.setTime(expDate.getTime() + (-1 * 24 * 3600 * 1000));
        document.cookie = cookieName + "=" + escape('') + ";expires=" + expDate.toGMTString() + ";path=/";
    }

    var slideshowTime = 3000;
    //var animMinHeight = 300;
    //var animMaxHeight = 520;
    
    var animMinHeight = 350;
    var animMaxHeight = 800;
    var animRatio = 774/520;
    var slider_control = null;

    $('#flash').before('<iframe frameborder="0"></iframe>');
    var animHeight = 0;
    var resize = function() {

       if($.browser.msie && $.browser.version <= 6)
       {
           if($(window).width() < 960)
               $('.main').width(960);
           else
               $('.main').width('auto');
       }

       animHeight =  Math.min(Math.max($(window).height() - ($('.menu').outerHeight() + $('.footer').outerHeight()),animMinHeight),animMaxHeight);
       //animHeight =  animHeight + 100;
       $('.anim').height(animHeight);
       $('.anim iframe').height(animHeight);
       $('.anim #flash img').attr('height',animHeight);
       $('.anim #flash').attr('height',animHeight);
       
       animWidth = Math.round(animHeight * animRatio);
       $('.anim #flash').attr('width',animWidth);
     
       /*$('.main .specialmenu').css('width',(animWidth+2)+'px');
       $('.main .specialmenu').css('margin-left','-'+(animWidth+2)/2+'px');
       
       if(parseInt($('.main .specialmenu').css('height').substring(0,$('.main .specialmenu').css('height').indexOf('px', 0))) > 120 ){
    	   $('.main .specialmenu').css('height',(animHeight+30)+'px');
    	   $('.main .specialmenu .textbox').css('height',(animHeight-90)+'px');
    	   $('.main .specialmenu #slider').css('height',(animHeight-90)+'px');
    	       	   
    	   document.getElementById('textbox').scrollTop = 1;
    	   //alert(document.getElementById('textbox').scrollTop);
    	   if(document.getElementById('textbox').scrollTop == 0){
    		   $('.main .specialmenu #slider').hide();
    	   }else{
    		   $('.main .specialmenu #slider').show();
    	   }
    	   document.getElementById('textbox').scrollTop = 0;
    	   
    	   //$('.main .specialmenu').css('top','+='+animHeight+'px');
    	   slider_control.setDisabled();
    	   //if(document.getElementById('textbox')){
			slider_control = new Control.Slider('handle', 'slider', {
	        	axis: 'vertical',
	        	onSlide: function(value) {
					document.getElementById('textbox').scrollTop = Math.round(value/slider_control.maximum*(document.getElementById('textbox').scrollHeight-document.getElementById('textbox').offsetHeight));
	             },
	            onChange: function(value) {
	            	document.getElementById('textbox').scrollTop = Math.round(value/slider_control.maximum*(document.getElementById('textbox').scrollHeight-document.getElementById('textbox').offsetHeight));	
	            }
	        });
			//}
			slider_control.setEnabled();
       }*/
    }
    resize();

    var params = {
        wmode:"transparent",
        quality:"high",
        bgcolor:"#000000"
    };
    swfobject.embedSWF(relUrl+'swf/anim.swf', 'flash', animWidth, animHeight,'8.0.0',null, null,params);

        if($('.main .menu').length > 0) {
            var toM = null;
            $('.main .menu ul.lang>li:not(.ext)').mouseover(function(){
                clearTimeout(toM);
                if(!$(this).find('ul').hasClass('open')) {
                    $('.main .menu ul.lang li ul.open').stop();
                    $('.main .menu ul.lang li ul.open').css('height','auto');
                    $('.main .menu ul.lang li ul.open').hide().removeClass('open');
                    $(this).find('ul').addClass('open');
                    $(this).find('ul').css('left',- $(this).find('ul').parents('li').offset().left);
                    $(this).find('ul').css('padding-left',$(this).find('ul').parents('li').offset().left);
                    $(this).find('ul').width($(document.body).width() - $(this).find('ul').parents('li').offset().left-10);
                    var height = $(this).find('ul').height();
                    $(this).find('ul').height(0);
                    $(this).find('ul').show();
                    $(this).find('ul').animate({'height':height});
                    $(this).parents('ul').children('li').addClass('disable');
                    $(this).removeClass('disable');
                }
                return false;
            }).mouseout(function(){
                var ul = $(this).find('ul');
                toM = setTimeout(function(){
                    ul.stop(true,true);
                    ul.hide();
                    ul.css('height','auto');
                    ul.removeClass('open');
                    ul.parents('ul').find('li').removeClass('disable');
                }, 200);
            }).click(function(){
                clearTimeout(toM);
                if(!$(this).find('ul').hasClass('open')) {
                    $('.main .menu ul.lang li ul.open').stop();
                    $('.main .menu ul.lang li ul.open').css('height','auto');
                    $('.main .menu ul.lang li ul.open').hide().removeClass('open');
                    $(this).find('ul').addClass('open');
                    $(this).find('ul').css('left',- $(this).find('ul').parents('li').offset().left);
                    $(this).find('ul').css('padding-left',$(this).find('ul').parents('li').offset().left);
                    $(this).find('ul').width($(document.body).width() - $(this).find('ul').parents('li').offset().left-10);
                    var height = $(this).find('ul').height();
                    $(this).find('ul').height(0);
                    $(this).find('ul').show();
                    $(this).find('ul').animate({'height':height});
                    $(this).parents('ul').children('li').addClass('disable');
                    $(this).removeClass('disable');
                }
                return false;
            }).blur(function(){
                var ul = $(this).find('ul');
                toM = setTimeout(function(){
                    ul.stop(true,true);
                    ul.hide();
                    ul.css('height','auto');
                    ul.removeClass('open');
                    ul.parents('ul').find('li').removeClass('disable');
                }, 200);
            });
        }

    if($.browser.opera)
    {
        $('.main .menu ul.lang li ul').css('background','#000');
    }

    var slideshowTimer = null;

    $('.main .submenu ul li a').live('mouseover',function(){
        var imgs = $(this).children('img');
        if(imgs.length > 0) {
            imgs.each(function(){
                if($(this).attr('src').indexOf('_on.') == -1)
                    $(this).attr('src',$(this).attr('src').replace(/^(.*)\.(.*?)$/,'$1_on.$2'));
            });
        }
        stopVideo();
        
        if($(this).attr('rel')) {
            var img = $(this).attr('rel');
            if(img.indexOf(',') != -1)
                img = img.split(',');
            else
                img = [img];
            if($('.main .anim .slide .overlay').length == 0)
                $('.main .anim .slide').html('<div style="display:none" class="overlay"></div><div class="imgCont"></div>');
            for(var i = 0; i < img.length; i = i + 2) {
                if(img.length > i + 1) {
                	if(ie6()){
                		$('.main .anim .slide .overlay').after('<span style="position: absolute; top: 0px; left: 50%; margin-left:-'+Math.round((img[i + 1] * animHeight) / 2)+'px'+'; z-index: 100; height='+animHeight+'; display: inline-block; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+relUrl+'img/slides/'+currentLang+'/'+img[i]+'.jpg\',sizingMethod=\'scale\');"><img style="filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);display:none;" height="'+animHeight+'" src="'+relUrl+'img/slides/'+currentLang+'/'+img[i]+'.jpg" alt="" /></span>');
                	}else{
                		$('.main .anim .slide .overlay').after('<img class="slideshow" style="display:none;margin-left:-'+Math.round((img[i + 1] * animHeight) / 2)+'px'+'" height="'+animHeight+'" src="'+relUrl+'img/slides/'+currentLang+'/'+img[i]+'.jpg" alt="" />');
                	}
                } else {
                	if(ie6()){
                		$('.main .anim .slide .overlay').after('<span style="z-index: 100; height='+animHeight+'; display: inline-block; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+relUrl+'img/slides/'+currentLang+'/'+img[i]+'.jpg\',sizingMethod=\'scale\');"><img style="filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);display: none;" height="'+animHeight+'" src="'+relUrl+'img/slides/'+currentLang+'/'+img[i]+'.jpg" alt="" /></span>');
                	}else{
                		$('.main .anim .slide .overlay').after('<img style="display:none" height="'+animHeight+'" src="'+relUrl+'img/slides/'+currentLang+'/'+img[i]+'.jpg" alt="" />');
                	}
                }
            }
            if($('.main .anim .slide img').length > 1) {
                var idx = 0;
                var slideshowMove = function()
                {
                    if(idx == 0) {
                        idx = $('.main .anim .slide img').length - 1;
                        $($('.main .anim .slide img').get(idx)).fadeIn('def', function(){
                            if($('.main .anim .slide img').length >= idx)
                                $($('.main .anim .slide img').get(idx - 1)).show();
                        });
                    } else {
                        idx--;
                        $($('.main .anim .slide img').get(idx + 1)).fadeOut('def', function(){
                            if(idx > 0) {
                                if($('.main .anim .slide img').length >= idx)
                                    $($('.main .anim .slide img').get(idx - 1)).show();
                            }
                        });
                    }
                }

                if(!$.browser.opera) {
                    $('.main .anim .slide .overlay').fadeIn('fast');
                    slideshowTimer = setInterval(slideshowMove, slideshowTime);
                    slideshowMove();
                } else {
                    $('.main .anim .slide img:last').show();
                }
            } else {
                if(!$.browser.opera) {
                    $('.main .anim .slide .overlay').fadeIn('fast');
                    $('.main .anim .slide img').fadeIn();
                } else {
                    $('.main .anim .slide img').show();
                }
            }
        }
    }).live('mouseout', function(){
        var imgs = $(this).children('img');
        if(imgs.length > 0) {
            imgs.attr('src',imgs.attr('src').replace(/^(.*)_on\.(.*?)$/,'$1.$2'));
        }
        
        restartVideo();

        clearInterval(slideshowTimer);
        $('.main .anim .slide img').stop(true,true);
        $('.main .anim .slide img').remove();
        /*if(!$.browser.opera)*/
            setTimeout(function(){
                if($('.main .anim .slide img').length == 0)
                    $('.main .anim .slide .overlay').fadeOut('fast',function(){
                        $('.main .anim .slide .overlay').remove();
                    });
            },100);
    });

    $('.main .submenu ul li:not(.ext)').live('mouseover', function(){
        var div = $(this).find('div');
        div.show();
        var dif = Math.ceil(div.offset().left + div.width() - $(document.body).width());
        if(dif > 0) {
            div.css('margin-left',parseInt(div.css('margin-left').replace('px','')) - dif + 'px');
        }
        dif = Math.ceil(div.offset().left);
        if(dif < 0) {
            div.css('margin-left',parseInt(div.css('margin-left').replace('px','')) - dif + 'px');
        }
        $(this).parents('ul').children('li').addClass('disable');
        $(this).removeClass('disable');
        
        var imgs = $(this).parents('ul').children('li').children('a').children('img');
        if(imgs.length > 0) {
            imgs.each(function(){
            	if($(this).parents('li').hasClass('disable')){
            		$(this).attr('src',$(this).attr('src').replace(/^(.*)_on\.(.*?)$/,'$1.$2'));
            	}
            });
        }
        
    }).live('mouseout', function(){
        var div = $(this).find('div');
        div.hide();
        $(this).parents('ul').children('li').removeClass('disable');
        
        var imgs = $(this).parents('ul').children('li').children('a').children('img');
        if(imgs.length > 0) {
            imgs.each(function(){
            	if($(this).attr('src').indexOf('_on.') == -1)
                    $(this).attr('src',$(this).attr('src').replace(/^(.*)\.(.*?)$/,'$1_on.$2'));
            });
        }
    });
    
    $('.index .footer ul li:not(.ext)').live('mouseover', function(){
        
        $(this).parents('ul').children('li').addClass('disable');
        $(this).removeClass('disable');
        
    }).live('mouseout', function(){
       
        $(this).parents('ul').children('li').removeClass('disable');
        
    });
    
    $('.index .footer a.lang').click(function(){
        calltracking(currentLang,'CHANEL HP Footer','change language link');
        destroyCookie();
        $('.index .specialmenu').hide();
        $('.index .submenu').hide();
        $('.index .footer a.lang').hide();
        $('.index .footer ul').remove();
        $('.index .mainmenu ul.lang li.disable').removeClass('disable');
        $('.index .mainmenu').fadeIn();
        $('.index .submenu').show();
        calltracking(null,'CHANELcom Language Selector Page');
        return false;
    });

    $('.index .footer a.logo').click(function(){
        calltracking(currentLang,'CHANEL HP Footer','change language link');
        destroyCookie();
        $('.index .specialmenu').hide();
        $('.index .submenu').hide();
        $('.index .footer a.lang').hide();
        $('.index .footer ul').remove();
        $('.index .mainmenu ul.lang li.disable').removeClass('disable');
        $('.index .mainmenu').fadeIn();
        $('.index .submenu').show();
        calltracking(null,'CHANELcom Language Selector Page');
        return false;
    });

    $('.country .footer a.lang').click(function(){
        calltracking(currentLang,'CHANEL HP Footer','change language link');
        destroyCookie();
    });

    $('.country .footer a.logo').click(function(){
        calltracking(currentLang,'CHANEL HP Footer','change language link');
        destroyCookie();
    });
    
    var displaySpecialMenu = function(boxheight,topheight)
    {	
   	    if ( $('.main .specialmenu').is(':hidden') ){
   	    	$('.main .submenu').fadeOut(400, function() {
   				$('.main .specialmenu').css('height','0px');
   				//$('.main .specialmenu').css('top','0px');
   				//$('.main').find('.specialmenu').stop().animate({height:boxheight+"px", top:"-="+topheight+"px"},{queue:false, duration:1000})
   				$('.main').find('.specialmenu').stop().animate({height:boxheight+"px"},{queue:false, duration:1000})
   				
   				if(document.getElementById('textbox')){
	   				$('.main .specialmenu .textbox').css('height',(boxheight-110)+'px');
	   				$('.main .specialmenu #slider').css('height',(boxheight-110)+'px');
	   				
	   				document.getElementById('textbox').scrollTop = 1;
	   	    	   //alert(document.getElementById('textbox').scrollTop);
	   	    	   if(document.getElementById('textbox').scrollTop == 0){
	   	    		   $('.main .specialmenu #slider').hide();
	   	    	   }else{
	   	    		   $('.main .specialmenu #slider').show();
	   	    	   }
	   	    	   document.getElementById('textbox').scrollTop = 0;
	   	    	   
	   				slider_control = new Control.Slider('handle', 'slider', {
	   		        	axis: 'vertical',
	   		        	onSlide: function(value) {
	   						document.getElementById('textbox').scrollTop = Math.round(value/slider_control.maximum*(document.getElementById('textbox').scrollHeight-document.getElementById('textbox').offsetHeight));
	   		             },
	   		            onChange: function(value) {
	   		            	document.getElementById('textbox').scrollTop = Math.round(value/slider_control.maximum*(document.getElementById('textbox').scrollHeight-document.getElementById('textbox').offsetHeight));
	   		            }
	   		        });
   				}
   			  });
   		}else{
   			topheight = Math.abs(parseInt($('.main .specialmenu').css('top'))); 

   			//$('.main').find('.specialmenu').stop().animate({height:"0px", top:"+="+topheight+"px"}, 1000, function() {
   			$('.main').find('.specialmenu').stop().animate({height:"0px"}, 1000, function() {
   				$(this).hide();
   				$('.main .submenu').fadeIn(200);
   				$('.main .specialmenu').css('height','0px');
   				//$('.main .specialmenu').css('top','0px');
   			  });
   		}
    }
    
    var positionSubmenu = function(nbItem)
    {
        /*var liW = $('.main .submenu ul li').width();
        $('.main .submenu ul').width(nbItem * (liW));*/
        /*$('.main .submenu ul').css('margin-left',-$('.main .submenu ul').width() / 2);
        $('.main .submenu ul').css('left','50%');*/
        $('.main .submenu ul li div').each(function(){
            //$(this).css('width',$(this).width());
            $(this).css('margin-left',-$(this).width() / 2 + 'px');
            $(this).css('left','50%');
        });
        $('.main .submenu ul li div').hide();
    }
    
    var currentLang = '';

    var showSubMenu = function(lang)
    {
        currentLang = lang;
        var items = menus[currentLang];
        var ifop = ifop_popup[currentLang];
        var content = '<ul><li class="ext">&nbsp;</li>';
        var nbItem = items.length;
        var liW = Math.floor(960 / nbItem);
        $.each(items, function(){
            //content += '<li style="width:'+liW+'px">';
        	if(this.separator){
        		content += '<li class="separator">&nbsp;</li>';
        	}else if(this.wrap){
        		//content += '<li class="ext">&nbsp;</li></ul>';
        		//content += '<ul><li class="ext">&nbsp;</li>';
        		content += '<li class="wrap">&nbsp;</li>';
        	}else{
        		content += '<li>';
        		
	            if(this.url) {
	            	if(this.img) {
                        jQuery.preLoadImages(relUrl+'img/'+this.img[0]);
                    }
                    jQuery.preLoadImages(relUrl+'img/slides/'+currentLang+'/'+this.slide+'.jpg');
	                var onclick = '';
	                if(this.webtrend || ifop) {
	                	onclick += "onclick=\"";
                		if(webtrends[this.webtrend]){
	                        onclick += "calltracking('"+currentLang+"','"+webtrends[this.webtrend][0]+"','"+webtrends[this.webtrend][1]+"');";
	                    }
                		if(ifop){
                			if(ifop.popup && ifop.popout){
                				var randomnumber=Math.floor(Math.random()*2);
                			}else if(ifop.popup){
                				var randomnumber = 1;
                			}else if(ifop.popout){
                				var randomnumber = 0;
                			}
                			if(randomnumber == 1){
            					var inout = ifop.popup;
            				}else{
            					var inout = ifop.popout;
            				}
	                		onclick += "w=window.open('"+inout.url+"','"+inout.name.replace(/ /g, '_')+"','menubar=no, status=no, scrollbars=no, menubar=no, width="+inout.dimension[0]+", height="+inout.dimension[1]+"');";
	                		if(randomnumber == 0){
	                			onclick += "w.blur(); window.focus();";
	                		}
	                	}
                		if(this.popup){
                			onclick += "window.open('"+this.url+"','','fullscreen,scrollbars'); return false;"
                		}
                		onclick += "\"";
	                }
	                
                    content += '<a class="cat" href="'+this.url+'" rel="'+this.slide+'"'+onclick+'>';
                    
	                if(this.img) {
                        content += '<img src="'+relUrl+'img/'+this.img[0]+'" width="'+this.img[1]+'" height="17" />';
                    } else {
                        content += this.title;
                    }
	                content += '</a>';
	                if(this.title2) {
	                	content += '<span class="barre"><small>'+this.title2+'</small></span>';
	                }
	            } else {
	                content += '<span>'+this.title
	                if(this.title2) {
	                	content += '<small>'+this.title2+'</small>';
	                }
	                content += '</span>';
	            }
	            if(this.subs) {
	                content += '<div';
	                if(this.width)
	                     content += ' style="width:'+this.width+'px">';
	                else
	                     content += ' style="">';
	
	                $.each(this.subs, function(){
	                    if(this.img) {
	                        jQuery.preLoadImages(relUrl+'img/'+this.img[0]);
	                    }
	                    jQuery.preLoadImages(relUrl+'img/slides/'+currentLang+'/'+this.slide+'.jpg');
	                    var onclick = '';
	                    if(this.webtrend) {
	                        if(webtrends[this.webtrend])
	                            onclick = "onclick=\"calltracking('"+currentLang+"','"+webtrends[this.webtrend][0]+"','"+webtrends[this.webtrend][1]+"');\"";
	                    }
	                    content += '<a href="'+this.url+'" rel="'+this.slide+'"'+onclick+'>';
	                    if(this.img) {
	                        content += '<img src="'+relUrl+'img/'+this.img[0]+'" width="'+this.img[1]+'" height="17" />';
	                    } else {
	                        content += this.title;
	                    }
	                    content += '</a>';
	                });
	                content += '</div>'
	             }
	            content += '</li>';
        	}
        });
        content += '<li class="ext">&nbsp;</li></ul>';
        $('.main .submenu').html(content);
        positionSubmenu(nbItem);

        var footerConfig = footer[currentLang];
        $('.main .footer a.lang').html(footerConfig.lang);
        $('.main .footer .wrapper').append('<ul></ul>');
        $.each(footerConfig.list, function(){
            var onclick = '';
            var id = '';
            if(this.webtrend) {
                if(webtrends[this.webtrend])
                    onclick = "onclick=\"calltracking('"+currentLang+"','"+webtrends[this.webtrend][0]+"','"+webtrends[this.webtrend][1]+"');";
            }
            if(this.popup) {
                if(onclick.length == 0)
                    onclick = ' onclick="';
                onclick += 'return popup(this,'+this.popup[0]+','+this.popup[1]+')"';
            } else if(onclick.length > 0) {
                onclick += '"';
            }
            if(this.clickeffect) {
                id = 'id=\"'+this.clickeffect+'link\" ';
            }
            $('.main .footer ul').append('<li><a '+id+'href="'+this.url+'"'+onclick+'>'+this.name+'</a></li>');
            if(this.clickeffect) {
            	if(this.clickeffect == "subscribe"){
            		$('.main .footer ul li a#subscribelink').click(function(){
                		showSpecialMenu(lang,subscribe_menu);
                    	displaySpecialMenu(120,90);
                        return false;
                    });
            	}else if(this.clickeffect == "storelocator"){
            		$('.main .footer ul li a#storelocatorlink').click(function(){
                		showSpecialMenu(lang,storelocator_menu);
                    	displaySpecialMenu(120,90);
                        return false;
                    });
            	}else if(this.clickeffect == "legalstatement"){
            		$('.main .footer ul li a#legalstatementlink').click(function(){
                		showSpecialMenu(lang,legalstatement_menu);
                    	//displaySpecialMenu(380,350);
                		displaySpecialMenu((animHeight+30),animHeight);
                		
                        return false;
                    });
            	}
            }
        });
        
        $('.main .specialmenu').hide();
        $('.main .submenu').hide();
        $('.main .mainmenu').hide();
        $('.main .submenu').fadeIn();
        $('.main .footer a.lang').fadeIn();
        $('.main .footer ul').fadeIn();
    }
	
    var showSpecialMenu = function(lang,specialmenu)
    {
        currentLang = lang;
        var items = specialmenu[currentLang];
        var content = '';
        var nbItem = items.length;
        var liW = Math.floor(960 / nbItem);
        var flag = 0;
        $.each(items, function(){
        	if(this.closetext) {
        		//content += '<div class="close"><a href="#"><img src="'+relUrl+'img/croix.gif" align="absmiddle" />&nbsp;'+this.closetext+'</a></div>';
        		content += '<div class="close"><a href="#">'+this.closetext+'</a></div>';
        	}
            if(this.subtitle) {
            	content += '<h2>'+this.title+'</h2>';
            	content += '<p>'+this.subtitle+'</p>';
            }
            if(this.longtext) {
            	content += '<h2 class="cms">'+this.title+'</h2>';
            	flag = 1;
            	//content += '<div id="slider" class="slider"><div id="handle" class="handle"></div></div><div class="textbox"><p>'+this.longtext+'</p></div>';
            	content += '<div id="textbox" class="textbox"><p>'+this.longtext+'</p></div>';
            }
        });
        content += '<ul><li class="ext">&nbsp;</li>';
        $.each(items, function(){
            if(this.title && !this.subtitle && !this.longtext) {
            	content += '<li>';
             
                    content += '<span><a href="'+this.url+'">';
                    if(this.img) {
                        content += '<img src="'+relUrl+'img/'+this.img[0]+'" width="'+this.img[1]+'" height="17" />';
                    } else {
                        content += this.title;
                    }
                    content += '</a></span>';
                      
            	content += '</li>'
                }
        });
        
        content += '<li class="ext">&nbsp;</li></ul>';
        $('.main .specialmenu').html(content);
        if(flag == 1){
	        var sliderelmt = document.createElement("div");
	        sliderelmt.setAttribute("id", "slider");
	        sliderelmt.setAttribute("class", "slider");
	        var handlerelmt = document.createElement("div");
	        handlerelmt.setAttribute("id", "handle");
	        handlerelmt.setAttribute("class", "handle");
	        sliderelmt.appendChild(handlerelmt);
	        //document.getElementById("specialmenu").insert({top: 'sliderelmt'});
	        //Element.insert(document.getElementById("specialmenu"),{top: 'sliderelmt'});
	        document.getElementById("specialmenu").appendChild(sliderelmt);
        }
        
        $('.main .specialmenu .close a').click(function(){
        	//showSpecialMenu(lang);
        	displaySpecialMenu(0,0);
            return false;
        });
        
       $('.main .specialmenu').hide();
    }
    
    jQuery.preLoadImages(relUrl+'img/chanel-news.png');

    if($('.main .menu .lang').length > 0) {
        var cookieLang = getCookie();
        if(cookieLang) {
            showSubMenu(cookieLang);
            calltracking(cookieLang,'CHANEL Homepage');
        } else {
            calltracking(null,'CHANELcom Language Selector Page');
        }

        $('.main .menu .lang a').click(function(){
            var lang = $(this).attr('rel');
            pushCookie(lang);
            showSubMenu(lang);
            calltracking(lang,'CHANEL Homepage');
            return false;
        });
    } else {
        if($('input[name="lang"]').length > 0) {
            currentLang = $('input[name="lang"]').val();
            pushCookie(currentLang);
        }
        var liW = Math.floor(960 / $('.country .submenu ul li').length);
        /*$('.country .submenu ul li').width(liW);*/
        positionSubmenu($('.country .submenu ul li').length);
        calltracking(currentLang,'CHANEL Homepage');
    }

    $(window).kresize(resize);
});