    jQuery(document).ready(function() {
        var offset = 220;
        var duration = 500;
        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() &gt; offset) {
                jQuery(&#39;.toTop&#39;).fadeIn(duration);
            } else {  
                jQuery(&#39;.toTop&#39;).fadeOut(duration);
            } 
            if (jQuery(this).scrollTop() &gt; offset) {
                jQuery(&#39;.counter&#39;).fadeIn(duration);
            } else {  
                jQuery(&#39;.counter&#39;).fadeOut(duration);
            } 
        });

        jQuery(&#39;.toTop&#39;).click(function(event) {
            event.preventDefault();
            jQuery(&#39;html, body&#39;).animate({scrollTop: 0}, duration);
            return false;
        })
    });
//toSectionOnclik
 !function(a){&#39;use strict&#39;;a(document).on(&#39;click&#39;,&#39;a.mew&#39;,function(e){
var l=a(this);a(&#39;html, body&#39;).stop().animate({scrollTop:a(l.attr(&#39;href&#39;)).offset().top-0},1250),e.preventDefault()})}(jQuery) ;
