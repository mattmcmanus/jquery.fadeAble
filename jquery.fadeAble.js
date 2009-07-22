;(function($) {
	$.fn.fadeAble = function(options)	{
	  var defaults = {
	    prevId: 		  'prevButton',
  		prevText: 		'Previous',
  		nextId: 		  'nextButton',	
  		nextText: 		'Next',
  		controlsShow: true,
  		controlsFade: true,
  		speed:        800,
  		autoPlay:     false,
  		pause:        2000,
  		loop:         false,
  		images:       [],
  		current:      0
	  };
	  
		// Set the options.
		var options = $.extend(defaults, options);
    
		// Go through the matched elements and return the jQuery object.
		this.each(function(){
		  var container = this;
		  var defaultLink = $(container).children('a');
		  	defaultLink.addClass("fadeAble")
		  var defaultImage = $(defaultLink).children('img');
		  
		  // Let's make sure things don't start jumping around all crazy like
		  $(container).css({
		    position: 'relative',
		    height:   $(defaultImage).height(),
		    width:    $(defaultImage).width()
		  });
		  
		  // Add the additional images inside your container
		  $(options.images).each(function(){
		    $(container).append('<a href="'+this.href+'" class="fadeAble" style="display:none" title="'+this.title+'"><img src="'+this.src+'" /></a>');
		  });
		  
		  // Make sure things line up nicely
		  $(container).children('a').css({
		    position:  'absolute',
		    top:        0,
		    left:       0
		  });
		  
		  //prepend $(img:first).src to array
		  options.images.unshift({
		  		"src": $(defaultImage).attr('src'),
		  		"href": $(defaultLink).attr('src'),
		  		"title": $(defaultLink).attr('title')
		  });
		  
			
		  if (options.controlsShow) {
				$(this).append(
				  '<span class="button" style="z-index:2" id="'+options.prevId+'">' + 
  					'<a href=\"javascript:void(0);\">'+options.prevText +'</a></span>' +
  				'<span class="button" style="z-index:2" id="'+options.nextId+'">' +
  					'<a href=\"javascript:void(0);\">'+  options.nextText +'</a></span>'
				);
				
				$("#"+options.nextId).click(function(){ fade("next", container); });
  			$("#"+options.prevId).click(function(){ fade("prev", container); });	
			}
			
			if (options.loop) {
			  options.timeout = setTimeout(function(){
					fade("next", container);
				}, options.pause);
			}
		});
		
		function fade(direction, container) {
      if (options.timeout) {
        clearTimeout(options.timeout);
      }
      
      //Figure out what the next index should be
  	  var nextIndex;
  	  if (direction == 'prev') {
  	    nextIndex = ( options.current == 0 ) ? options.images.length-1 : options.current-1;
  	  } else {
  	    nextIndex = ( options.current == options.images.length-1 ) ? 0 : options.current+1;
  	  }
  	  
  	  // Animate the transition
  	  var imgs = $(container).children('a.fadeAble');
  	  imgs.hide();
  	  imgs.eq(options.current).show().css('z-index', '0');
  	  imgs.eq(nextIndex).css('z-index', '1').fadeIn(options.speed);
      
  		options.current = nextIndex;
      
  		// Reset the time
      if (options.loop) {
  		  options.timeout = setTimeout(function(){
  				fade("next", container);
  			}, options.pause);
  		}
    }
	};
})(jQuery);
