$(document).ready(function(){
	var elementPreIndex = 0;
	var logCount = 1;
	$('#code-article-page > pre').each(function(index, el) {
		elementPreIndex = index;
		eval($(el).text());
		if ($(el).text().indexOf('/*------------output--------------') > -1)
			$('#code-article-page > pre')[elementPreIndex].append('--------------------------------*/\n');
		logCount = 1;
	});

	function newline(text) {
		$('#code-article-page > pre')[elementPreIndex].append('-----------------\n');
	}

	function log(output) {
		if (logCount == 1)
			$('#code-article-page > pre')[elementPreIndex].append('\n/*------------output--------------\n');

		$('#code-article-page > pre')[elementPreIndex].append(logCount + ': ' + output + '\n');
		logCount++;
	}

	if($('#code-article-page > h4').length > 0){
		createContent();
	}

	function createContent() {
		var templateHeader = '<div id="toc" class="toc-article toc-content" style="display: block;">' +
			'<strong class="toc-title">目录</strong>' +
			'<ol class="toc">';
		var templateFooter = '</ol>' + '</div>';
		var contentItemList =[], contentTemplate = [], itemName = '';

		$('#code-article-page > h4').each(function(index, element){
			itemName = $(element).text();
			$(element).attr({
				id: itemName
			});
			contentItemList.push(
				'<li class="toc-item toc-level-2">' +
				'<a class="toc-link" href="#'+ itemName +'">' +
					'<span class="toc-number"></span><span class="toc-text">'+ itemName +'</span>' +
				'</a>' +
				'</li>'
			);
		});

		contentTemplate = templateHeader + contentItemList.toString().replace(/,/g,'') + templateFooter;
		$('#code-article-page').prepend(contentTemplate);
	}
});