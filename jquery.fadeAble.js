;(function($) {
	$.fn.fadeAble = function(options)	{
	  var defaults = {
	    constrolsContainerID:  'controls-container',
	    prevId: 		  'prevButton',
  		prevText: 		'Previous',
  		nextId: 		  'nextButton',	
  		nextText: 		'Next',
  		playId: 		  'playButton',	
  		playText: 		'Play/Pause',
  		controlsShow: false,
  		controlsFade: true,
  		controlsFadeTo: 0,
  		speed:        800,
  		autoPlay:     true,
  		pause:        2000,
  		loop:         true,
  		images:       [],
  		current:      0,
  		timeoutToggle:true
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
				  '<div id="'+options.constrolsContainerID+'" style="opacity:0">'+
				    '<a class="button" id="'+options.prevId+'" href=\"javascript:void(0);\">'+options.prevText +'</a>'+
				    '<a class="button" id="'+options.playId+'" href=\"javascript:void(0);\">'+options.playText +'</a>'+
				    '<a class="button" id="'+options.nextId+'" href=\"javascript:void(0);\">'+  options.nextText +'</a>'+
			    '</div>'
				);
				// Set the right class, If auto play is on set pause if it's not, set play
				$('#'+options.playId).addClass((options.autoPlay)?'pause':'play');
				
				// Set the onclick events
				$("#"+options.nextId).click(function(){ fade("next", container); });
				$("#"+options.playId).click(function(){ toggle(container); });
  			$("#"+options.prevId).click(function(){ fade("prev", container); });
  			
  			// Should the controls fade in and out all fancy like?
  			if (options.controlsFade) {
  			  $('#'+options.constrolsContainerID).fadeTo(250,options.controlsFadeTo);
  			  $(container).hover(
  			    function(){ $('#'+options.constrolsContainerID).fadeTo(250,1); },
  			    function(){ $('#'+options.constrolsContainerID).fadeTo(250,options.controlsFadeTo); }
  			  )
  			}
			}
			// TODO: Decide whether to supply a stylesheet with this or keep it in js
			$('#controls-container .button').css({'z-index':5})
			
			if (options.loop && options.autoPlay) {
			  options.timeoutToggle = true;
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
    
    function toggle (container) {
      if (options.timeoutToggle && options.timeout) {
        clearTimeout(options.timeout);
        options.timeoutToggle = false;
      } else if (!options.timeoutToggle){
        options.timeoutToggle = true;
			  options.timeout = setTimeout(function(){
					fade("next", container);
				}, options.pause);
      };
      $('#playButton').toggleClass("play").toggleClass("pause")
    }
	};
})(jQuery);
