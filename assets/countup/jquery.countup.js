

 (function($){
	

	var years = (24*60*60)*365,
		months = (24*60*60)*30,
		weeks =  (24*60*60)*7,
		days	= 24*60*60,
		hours	= 60*60,
		minutes	= 60;

	$.fn.countup = function(prop){
		
		var options = $.extend({
			callback	: function(){},
			start		: new Date()
		},prop);
		
		var passed = 0, szyear, szmonth, szweeks, d, h, m, s, positions;


		init(this, options);
		
		positions = this.find('.position');
		
		(function tick(){
			
			console.log("Microtime:"+options.start.getTime());
			difference = Math.floor((new Date() - options.start)) / 1000;
			
		       
			var szData = {                     
				year: 31536000,
				month: 2592000,
				week: 604800, 
				day: 86400,   
				hour: 3600,
				minute: 60,
				second: 1
			};
			
			  szyear = Math.floor(difference / szData['year']);
					difference -= szyear * szData['year'];	
					
			  szmonth = (Math.floor(difference / szData['month'])+1);
					difference -= (szmonth -1)* szData['month'];	
			
		

			  d = Math.floor(difference / szData['day']);
					difference -= d * szData['day'];	
	 

			  h = Math.floor(difference / szData['hour']);
					difference -= h * szData['hour'];	

			  m = Math.floor(difference / szData['minute']);
					difference -= m * szData['minute'];	

			  s = Math.floor(difference / szData['second']);
					
					
			updateDuo(0, 1, szyear);
			updateDuo(2, 3, szmonth);
			updateDuo(4, 5, d);
			updateDuo(6, 7, h);
			updateDuo(8, 9, m);
			updateDuo(10, 11, s);
	
			options.callback(szyear, szmonth, szweeks, d, h, m, s);
			

			setTimeout(tick, 1000);
		})();
		
	
		function updateDuo(minor,major,value){
			switchDigit(positions.eq(minor),Math.floor(value/10)%10);
			switchDigit(positions.eq(major),value%10);
		}
		
		return this;
	};


	function init(elem, options){
		elem.addClass('countdownHolder');


		$.each(['Years','Months','Days','Hours','Minutes','Seconds'],function(i){
			$('<span class="count'+this+'">').html(
				'<span class="position">\
					<span class="digit static">0</span>\
				</span>\
				<span class="position">\
					<span class="digit static">0</span>\
				</span>'
			).appendTo(elem);
			
			if(this!="Seconds"){
				elem.append('<span class="countDiv countDiv'+i+'"></span>');
			}
		});

	}

	function switchDigit(position,number){
		
		var digit = position.find('.digit')
		
		if(digit.is(':animated')){
			return false;
		}
		
		if(position.data('digit') == number){

			return false;
		}
		
		position.data('digit', number);
		
		var replacement = $('<span>',{
			'class':'digit',
			css:{
				top:'-2.1em',
				opacity:0
			},
			html:number
		});

		digit
			.before(replacement)
			.removeClass('static')
			.animate({top:'2.5em',opacity:0},'fast',function(){
				digit.remove();
			})

		replacement
			.delay(100)
			.animate({top:0,opacity:1},'fast',function(){
				replacement.addClass('static');
			});
	}
})(jQuery);