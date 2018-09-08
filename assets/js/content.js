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
	//console.log = deep_copy(originLog);

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

/*Global EventUtil*/
var EventUtil = {
	addHandler: function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent('on' + type, handler);
		} else {
			element['on' + type] = handler;
		}
	},
	removeHanlder: function() {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent('on' + type, handler);
		} else {
			element['on' + type] = null;
		}
	},
	getEvent: function(event) {
		return event ? event : window.event;
	},
	getTarget: function(event) {
		return event.target || event.srcElement;
	},
	getRelatedTarget: function() {
		if (event.relatedTarget) {
			return event.relatedTarget;
		} else if (event.toElement) {
			return event.toElement;
		} else if (event.fromElement) {
			return event.fromElement;
		} else {
			return null;
		}
	},
	getButton: function(event) {
		if (document.implementation.hasFeature('MouseEvents', '2.0')) {
			return event.button;
		} else {
			switch (event.button) {
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	},
	getWheelDelta: function(event) {
		if (event.wheelDelta) {
			var engine = {};
			if (window.opera) {
				engine.ver = window.opera.version();
				engine.opera = parseFloat(engine.ver);
			}
			return engine.opera && engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta;
		} else {
			return -event.detail * 40;
		}
	},
	getCharCode: function(event) {
		if (typeof event.charCode == 'number') {
			return event.charCode;
		} else {
			return event.keyCode;
		}
	},
	getClipboardText: function(event) {
		var clipboardData = event.clipboardData || window.clipboardData;
		return clipboardData.getData('text');
	},
	setClipboardText: function(event, value) {
		if (event.clipboardData) {
			return event.clipboardData.setData('text/plain', value);
		} else if (window.clipboardData) {
			return window.clipboardData.setData('text', value);
		}
	},
	preventDefault: function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	stopPropagation: function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
};
