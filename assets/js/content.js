$(document).ready(function() {
	var elementPreIndex = 0,
		logCount = 1,
		jsoutputContainer;

	//Temporally modify window.console a little bit
	var originLog = deep_copy(console.log);
	console.log = log;

	function log(output) {
		if ($($('div.highlighter-rouge')[elementPreIndex]).find('.jsoutputtag').length === 0) {
			$('div.highlighter-rouge')[elementPreIndex].append($('<div class="jsoutputtag">Output</div>')[0]);
		}

		var result = '';
		for (var i = 0; i < arguments.length; i++) {
			result += arguments[i] + ', ';
		}

		$('div.highlighter-rouge')[elementPreIndex].append(
			$(
				'<div class="jsoutput"> <pre>' +
					logCount +
					': ' +
					result.slice(0, result.length - 2) +
					'</pre></div>'
			)[0]
		);
		logCount++;
	}

	$('div.highlighter-rouge table td:last-child > pre').each(function(index, el) {
		elementPreIndex = index;
		try {
			var text = $(el).text();
			var skipEvalTagIndex = text.indexOf('//##skipEval');
			var htmlStartCharIndex = text.indexOf('<!');

			if (htmlStartCharIndex == 0) return;

			if (skipEvalTagIndex == -1) window.eval(text);
			else window.eval(text.slice(0, skipEvalTagIndex));
		} catch (e) {
			//Exclude Invalid character exception(not js code)
			if (e.toString().indexOf('Invalid character') == -1) {
				console.warn(
					e,
					'Exception!',
					'===================================================\n' + $(el).text()
				);
			}
		}

		logCount = 1;
	});

	//Restore window.console
	console.log = deep_copy(originLog);

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
