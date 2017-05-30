$(document).ready(function(){
	var elementPreIndex = 0;
	var logCount = 1;
	$('pre > code').each(function(index, el) {
		elementPreIndex = index;
		try{
			eval($(el).text());
		}catch(e){
			console.log(e,'NOT JS code');
		}
		if ($(el).text().indexOf('/*------------Output--------------') > -1)
			$('pre > code')[elementPreIndex].append('--------------------------------*/\n');
		logCount = 1;
	});

	function newline(text) {
		$('pre > code')[elementPreIndex].append('-----------------\n');
	}

	function log(output) {
		if (logCount == 1)
			$('pre > code')[elementPreIndex].append('\n/*------------Output--------------\n');

		var result = '';
		for(var i = 0; i < arguments.length; i++){
			result += arguments[i] + ', ';
		}
		$('pre > code')[elementPreIndex].append(logCount + ': ' + result.slice(0, result.length-2) + '\n');
		logCount++;
	}
});