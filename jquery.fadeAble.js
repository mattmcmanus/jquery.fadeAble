(function($) {
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
		  var containerImage = $(container).children('img');
		  
		  $(container).css({'position':'relative','height':$(containerImage).height(),'width':$(containerImage).width()});
		  
		  $(options.images).each(function(){
		    $(container).append('<img style="display:none" src="'+this+'" />');
		  });
		  
		  $(container).children('img').css({'position':'absolute','top':'0','left':'0','z-index':'-1'});
		  
		  options.images = $.merge([$(container).children('img:eq(0)').attr('src')],options.images);
			
		  if (options.controlsShow){
				var controls = ' <span class="button" id="'+ options.prevId +'"><a href=\"javascript:void(0);\">'+ options.prevText +'</a></span>';
				controls += ' <span class="button" id="'+ options.nextId +'"><a href=\"javascript:void(0);\">'+ options.nextText +'</a></span>';
				$(this).append(controls);
				
				$("#"+options.nextId).click(function(){		
  				fade("next", container);
  			});
  			$("#"+options.prevId).click(function(){		
  				fade("prev", container);				
  			});	
			};
			
			if (options.loop) {
			  options.timeout = setTimeout(function(){
					fade("next", container);
				},options.pause);
			};
		});
		
		function fade(direction, container) {
      if (options.timeout) {clearTimeout(options.timeout)};
      
  	  var nextIndex;
  	  if (direction == 'prev') {
  	    nextIndex = ( options.current == 0 ) ? options.images.length-1 : options.current-1;
  	  } else {
  	    nextIndex = ( options.current == options.images.length-1 ) ? 0 : options.current+1;
  	    
  	  };
  	  
  	  $(container).children('img:eq('+nextIndex+')').fadeIn(options.speed);
  	  $(container).children('img:eq('+options.current+')').fadeOut(options.speed);
      
  		options.current = nextIndex;
      
      if (options.loop) {
  		  options.timeout = setTimeout(function(){
  				fade("next", container);
  			},options.pause);
  		};
    };
	};
})(jQuery);



