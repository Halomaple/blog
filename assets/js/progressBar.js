$(document).ready(function() {
	if ($('.post-content').length === 0) return;

	var progressBarHtml = '<div id="reading-progress-bar" style="z-index: 100000; position: fixed; top: 0; left: 0;  height: 4px; background-color: #35a6c9;"></div>';
	$('body').append(progressBarHtml);

	var documentObj = $(document),
		windowObj = $(window);
	documentObj.scroll(function() {
		$('#reading-progress-bar').width((documentObj.scrollTop() + windowObj.height()) / documentObj.height() * 100 + '%');
	});
});