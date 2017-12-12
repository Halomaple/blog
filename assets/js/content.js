$(document).ready(function() {
	var elementPreIndex = 0;
	var logCount = 1;

	//Temporally modify window.console a little bit
	var originLog = deep_copy(console.log);
	console.log = log;
	console.line = newLine;

	function log(output) {
		if (logCount == 1)
			$('pre > code')[elementPreIndex].append('\n/*------------Output--------------\n');

		var result = '';
		for (var i = 0; i < arguments.length; i++) {
			result += arguments[i] + ', ';
		}
		$('pre > code')[elementPreIndex].append(logCount + ': ' + result.slice(0, result.length - 2) + '\n');
		logCount++;
	}

	function newLine(text) {
		$('pre > code')[elementPreIndex].append('-----------------\n');
	}

	$('pre > code').each(function(index, el) {
		elementPreIndex = index;
		try {
			var skipEvalTagIndex = $(el).text().indexOf('//##skipEval');
			if(skipEvalTagIndex == -1)
				window.eval($(el).text());
			else
				window.eval($(el).text().slice(0, skipEvalTagIndex));
		} catch (e) {
			//Exclude Invalid character exception(not js code)
			if(e.toString().indexOf('Invalid character') == -1){
				console.warn(e, 'Exception!', '===================================================\n' +  $(el).text());
			}
		}
		if ($(el).text().indexOf('/*------------Output--------------') > -1)
			$('pre > code')[elementPreIndex].append('--------------------------------*/\n');
		logCount = 1;
	});

	//Restore window.console
	console.log = deep_copy(originLog);
	console.line = undefined;

	function deep_copy(obj) {
		var newOBJ = {};
		if (typeof obj != 'object') {
			//console.trace();
			return obj;
		}
		for (var attr in obj) {
			newOBJ[attr] = deep_copy(obj[attr]);
		}
		return newOBJ;
	}
});