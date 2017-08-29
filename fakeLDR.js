(function(b){b.fn.fakeLoader=function(m){var f=b.extend({timeToHide:1200,pos:"fixed",top:"0px",left:"0px",width:"100%",height:"100%",zIndex:"999",bgColor:"#2ecc71",imagePath:""},m);var j='<div class="fl spinner3"><div class="dot1"></div><div class="dot2"></div></div>';var d=b(this);var c={position:f.pos,width:f.width,height:f.height,top:f.top,left:f.left};d.css(c);d.each(function(){var n=f.spinner;switch(n){case"spinner3":d.html(j);break;default:d.html(l)}if(f.imagePath!=""){d.html('<div class="fl"><img src="'+f.imagePath+'"></div>');a()}});setTimeout(function(){b(d).fadeOut()},f.timeToHide);return this.css({backgroundColor:f.bgColor,zIndex:f.zIndex})};function a(){var c=b(window).width();var e=b(window).height();var d=b(".fl").outerWidth();var f=b(".fl").outerHeight();b(".fl").css({position:"absolute",left:(c/2)-(d/2),top:(e/2)-(f/2)})}b(window).load(function(){a();b(window).resize(function(){a()})})}(jQuery));
            $(document).ready(function(){
                $(".fakeloader").fakeLoader({
                    timeToHide:500,
                    bgColor:"#34495e",
                    spinner:"spinner3"
                });
            });
