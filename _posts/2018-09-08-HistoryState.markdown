---
layout: post
title: HTML5历史状态管理
date: 2018-09-08 14:10:00 +0800
categories: [HTML5, History]
tags: [HTML5, state, history]
keywords: HTML5历史状态管理
description: HTML5历史状态管理
---

历史状态管理是现代 Web 应用开发中的一个难点。在现代 Web 应用中，用户的的每次操作不一定会打开一个全新的页面，因此“后退”和“前进”按钮也就失去了作用，导致用户很难在不同状态间切换。要解决这个问题，首选使用`haschange`事件（第 13 章讨论过）。HTML5 通过更新 history 对象为管理历史状态提供了方便。

通过 haschange 事件，可以知道 URL 的参数什么时候发生了变化，即什么时候该有所反应。而通过状态管理 API，能够在不加载新页面的情况下改变浏览器的 URL。为此，需要使用`history.pushState()`方法，该方法接收三个参数：状态对象、新新状态的标题和可选的相对 URL。例如：

`history.pushState({name: "Nicholas"}, "Nicholas' page", "nicholas.html");`

执行 pushState()方法后，新的状态信息就会被加入历史状态栈，而浏览器地址栏也会变成新的相对 URL。但是，浏览器并不会真的向服务器发送请求，即使状态改变之后查询`location.href`也会返回与地址栏中相同的地址。另外第二个参数目前还没浏览器实现，因此完全可以只传入一个空字符串，或者一个短标题也可以。而第一个参数则应该尽可能提供初始化页面状态所需的各种信息。

因为 pushState()会创建新的历史状态，所以你会发现“后退”的按钮也能使用了。按下“后退”按钮，会触发 window 对象的`popState`事件
[^1]。 popState 事件的事件对象有一个`state`属性，这个属性就包含着当初以第一个参数传递给 pushState()的状态对象。

```js
EventUtil.addHandler(window, 'popState', function(event) {
	var state = event.state;
	if (state) {
		//第一个页面加载时state为空
		processState(state);
	}
});
```

得到这个状态对象后，必须把页面重置为状态对象中的数据表示的状态（因为浏览器不会自动为你做这些）。记住，浏览器加载的第一个页面没有状态，因此单机“后退”按钮返回浏览器加载的第一个页面时，event.state 值为 null。

要更新当前状态，可以调用`replaceState()`，传入的参数与 pushState()的前两个参数相同。调用这个方法不会再历史状态栈中创建新状态，只会重写当前状态。

`hisotry.replaceState({name: "Greg"}, "Greg's page")`

支持 HTML5 历史状态的浏览器有 Firefox4+、Safari5+、Opera11.5+和 Chrome。在 Safari 和 Chrome 中，传递给 pushState()或 replaceState()的状态对象中不能包含 DOM 元素。而 Firefox 支持在状态对象中包含 DOM 元素。Opera 还支持一个 history.state 属性，它返回当前状态的状态对象。

在使用 HTML5 的状态管理机制时，请确保使用 pushState()创造的每一个“假”URL，在 Web 服务器上都有一个真的、实际存在的 URL 与之对应。否则，单击“刷新”按钮会导致 404 错误。

[^1]: popState 事件发生后，事件对象中的状态对象（event.state）是当前状态。

> 【本文内容摘自：《JavaScript 高级程序设计》（第 3 版）Nicholas C.Zakas 著 李松峰 曹力 译】
