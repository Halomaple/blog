$(document).ready(function(){
	var elementPreIndex = 0;
	var logCount = 1;
	$('pre > code').each(function(index, el) {
		elementPreIndex = index;
		eval($(el).text());
		if ($(el).text().indexOf('/*------------output--------------') > -1)
			$('pre > code')[elementPreIndex].append('--------------------------------*/\n');
		logCount = 1;
	});

	function newline(text) {
		$('pre > code')[elementPreIndex].append('-----------------\n');
	}

	function log(output) {
		if (logCount == 1)
			$('pre > code')[elementPreIndex].append('\n/*------------output--------------\n');

		$('pre > code')[elementPreIndex].append(logCount + ': ' + output + '\n');
		logCount++;
	}
});