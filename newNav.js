
(function($,sr){
  var debounce = function (func, threshold, execAsap) {
      var timeout;
      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };
          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize'); 
(function(){
	$wrapper = $('#wrapper');
	$drawerRight = $('#drawer-right');

	function setSlideNav(){
		var scrollTop = jQuery(window).scrollTop();

		jQuery(".toggleDrawer").click(function(e){
			//alert($wrapper.css('marginRight'));
			e.preventDefault();

			if($wrapper.css('marginLeft')=='0px'){
				$drawerRight.animate({marginRight : 0},400);
				$wrapper.animate({marginLeft : -300},400);
				$('#headerA #main_navbar').removeClass('navbar-fixed-top');

			}
			else{
				$drawerRight.animate({marginRight : -300},400);
				$wrapper.animate({marginLeft : 0},400);
			 
			}

		})
	} 
	function setHeaderBackground() {		
		var scrollTop = jQuery(window).scrollTop(); // our current vertical position from the top	
		if (scrollTop > 300 || jQuery(window).width() < 700) { 
			jQuery('#headerA .topA').addClass('solid');
			jQuery('#headerA .dropdown-menu').removeClass('wbg');
			jQuery('#headerA .nav').addClass('navbar-default');	
			jQuery('#headerA a').addClass('wtxt');
			jQuery('#Nsearch .form-group').addClass('dakr');	
			jQuery('#Nsearch .srccolor').addClass('dakr');	
			jQuery('#Nsearch .srccolor').removeClass('whtr');
			jQuery('#Nsearch .search-form').addClass('dakr');	
			jQuery('#Nsearch .form-control').removeClass('wform'); 
			jQuery('#headerA .no-border-radius').removeClass('twbg');

			if($wrapper.css('marginLeft')=='-300px'){
				$drawerRight.animate({marginRight : -300},400);
				$wrapper.animate({marginLeft : 0},400);
			 

			}
		} else {
			jQuery('#headerA .topA').removeClass('solid');
			jQuery('#headerA .dropdown-menu').addClass('wbg');
			jQuery('#headerA .nav').removeClass('navbar-default');	
			jQuery('#headerA a').removeClass('wtxt');
			jQuery('#Nsearch .form-group').removeClass('dakr');	
			jQuery('#Nsearch .srccolor').addClass('whtr');
			jQuery('#Nsearch .search-form').removeClass('dakr');	
			jQuery('#Nsearch .form-control').addClass('wform');
			jQuery('#headerA .no-border-radius').addClass('twbg');


		}
	}
	setSlideNav();
	setHeaderBackground();
	jQuery(window).scroll( function() {
	   setHeaderBackground();
	});

})();
