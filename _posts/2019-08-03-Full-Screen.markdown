---
layout: post
title: JavaScript全屏
date: 2019-08-03 18:30:00 +0800
categories: [JS, Tools]
tags: [JS, 原创, full screen, 网页全屏, js全屏]
keywords: 网页全屏
description: 网页全屏代码
---

在一些网页游戏或者大屏实时显示数据（列车、航空信息等）的网页里，我们们常常会需要全屏显示。

本文通过document的Fullscreen API（目前还有[兼容性](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API#Browser_compatibility)的问题），写了一个全屏小插件：

### 代码
```js
var fullscreen = {
	enter: function(element) {
		element = element || document.documentElement;

		element.requestFullscreen && element.requestFullscreen();
		element.webkitRequestFullScreen && element.webkitRequestFullScreen();
		element.mozRequestFullScreen && element.mozRequestFullScreen();
		element.msRequestFullscreen && element.msRequestFullscreen();
	},
	exit: function() {
		document.exitFullscreen && document.exitFullscreen();
		document.webkitExitFullscreen && document.webkitExitFullscreen();
		document.mozExitFullscreen && document.mozExitFullscreen();
		document.msExitFullscreen && document.msExitFullscreen();
	},
	isFullscreen: function() {
		return !!(
			document.fullscreenElement ||
			document.webkitFullscreenElement ||
			document.mozFullScreenElement ||
			document.msFullscreenElement
		);
	},
	onFullscreenChange: function(callback) {
		document.onfullscreenchange = callback;
		document.onwebkitfullscreenchange = callback;
		document.onmozfullscreenchange = callback;
		document.onmsfullscreenchange = callback;
	}
};
```

### 示例

<button onclick="fullscreen.enter()">点击进入全屏<button>

<button onclick="fullscreen.exit()">点击退出全屏<button>

```js
setInterval(function() {
	document.querySelector('#in-full-screen').innerText = fullscreen.inFullscreen();
}, 1000);
```

<p >全屏状态：<span id="in-full-screen" style="color: red"></span></p>

### API文档：

> Element.requestFullscreen() 方法用于发出异步请求使元素进入全屏模式。[^1]

> Document.exitFullscreen() 方法用于让当前文档退出全屏模式（原文表述不准确，详见备注）。调用这个方法会让文档回退到上一个调用 Element.requestFullscreen()方法进入全屏模式之前的状态。[^2]

> The DocumentOrShadowRoot.fullscreenElement read-only property returns the Element that is currently being presented in full-screen mode in this document, or null if full-screen mode is not currently in use. <br /> Although this property is read-only, it will not throw if it is modified (even in strict mode); the setter is a no-operation and it will be ignored.[^3]

> The Document interface's onfullscreenchange property is an event handler for the fullscreenchange event that is fired immediately before a document transitions into or out of full-screen mode.[^4]

本文属原创，转载请联系：<a href="mailto:jeff.doyle@foxmail.com">jeff.doyle@foxmail.com</a>

引用：

[^1]: [MDN web docs: Element.requestFullscreen()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullscreen)
[^2]: [MDN web docs: Document.exitFullscreen()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/exitFullscreen)
[^3]: [MDN web docs: DocumentOrShadowRoot.fullscreenElement](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/fullscreenElement)
[^4]: [MDN web docs: targetDocument.onfullscreenchange](https://developer.mozilla.org/en-US/docs/Web/API/Document/onfullscreenchange)
