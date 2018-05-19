---
layout: post
title: "Cross Document Messaging - 跨文档消息传递"
date: 2018-05-16 22:00:00 +0800
categories: [Learning, JS, HTML]
tags: [JS, HTML, iFrame]
---

**跨文档消息传送**（cross-document-messaging），有时候简称为**XDM**，指的是**在来自不同域页面间传递消息**。例如，www.wrox.com域中的页面与位于一个内嵌框架中的p2p.wrox.com域中的页面通信。在XDM机制出现之前，要稳妥地实现这种通信需要花很多功夫。XDM把这种机制规范化，让我们能既稳妥又简单地实现跨文档通信。

XDM的核心是`postMessage()`方法。在HTML5规范中，除了XDM部分之外的其他部分也会提到这个方法名，但都是为了同一个目的：向另一个地方传递数据。对于XDM而言，“另一个地方”指的是包含在当前页面中的`<iframe>`元素，或者由当前页面弹出的窗口。

`postMessage()`方法接收两个参数：**一条消息**和**一个表示消息接收方来自哪个域的字符串**。第二个参数对保障安全通信非常重要，可以防止浏览器把消息发送到不安全的地方。来看下面的例子。

```
//##skipEval
//注意：所有支持XDM的浏览器也支持iframe的contentWindow属性
var iframeWindow = document.getElementById('myframe').contentWindow;
iframeWindow.postMessage('A secret', 'http://www.wrox.com');
```

最后一行代码尝试向内嵌框架中发送一条消息，并指定框架中的文档必须来源于“http://www.wrox.com”域。如果来源匹配，消息会传递到内嵌框架中；否则，postMessage()什么也不做。这一限制可以避免窗口中的位置在你不知道情的情况下发生改变。如果传给postMessage()的第二个参数是“*”，则表示可以把消息发送给来自任何域的文档，但我们不推荐这样做。

**接收到XDM消息时，会触发window对象的`message`事件**。这个事件是以异步的形式触发的，因此从发送消息到接收消息（触发接收窗口的message事件）可能要经过一段时间的延迟。触发message事件后，传递给`onmessage`处理程序的事件对象包含以下三方面的重要信息。

- data：作为postMessage()第一个参数传入的字符串数据。
- origin：发送消息文档所在的域，例如“http://www.wrox.com"。
- source：发送消息的文档的window对象的代理。这个代理对象主要用于在发送上一条消息的窗口中调用postMessage()方法。如果发送消息的窗口来自同一个域，那这个对象就是window。

接收到消息后验证发送窗口的来源是至关重要的。就像给postMessage()方法指定第二个参数，以确保浏览器不会把消息发送给未知页面一样，在onmessage处理程序中检测消息来源可以确保传入的消息来自已知页面。基本的检测模式如下：

```
//##skipEval
EvenUtil.addHanlder(window, 'message', function(event){
	//确保发送消息的域是已知的域
	if(event.origin == 'http://www.wrox.com') {
		//处理接收到的数据
		processMessage(event.data);

		//可选：向来源窗口发送回执
		event.source.postMessage('Received!', 'http://p2p.wrox.com');
	}
});
```

还是要提醒大家，event.source大多数情况下只是window对象的代理，并非实际的window对象。换句话说，不能通过这个代理访问window对象的其他任何信息。记住，只通过这个代理调用postMessage()就好，这个方法永远存在，永远可以调用。

XDM还有一些怪异之处。首先postMessage()的第一个参数**最早是作为“永远都是字符串”来实现的**。但后来这个参数的定义改了，改成允许传入任何数据结构。可是，并非所有浏览器都实现了这一变化！为保险起见，使用postMessage()时，最好还是只传字符串。如果你想传入结构化的数据，最佳选择是**先要在传入的数据上调用JSON.stringify()，通过postMessage()传入得到的字符串，然后再在onmessage事件处理程序中调用JSON.parse()**。

在通过内嵌框架加载其他域的内容时，使用XDM是非常方便的。因此，在混搭（mashup）和社交网络应用中，这种传递消息的方法极为常用。有了XDM，包含&lt;iframe&gt;的页面可以确保自身不受恶意内容的侵扰，因为它只通过XDM与嵌入的框架通信。而XDM也可以在来自相同域的页面间使用。

支持XDM的浏览器有IE8+、Firefox3.5+、Safari4+、Opera、Chrome、iOS版Safari及Android版Webkit。XDM已经作为一个规范独立出来，现在它的名字叫Web Messaging，官方页面是[http://dev.w3.org/html5/postmsg/](http://dev.w3.org/html5/postmsg/)。

[Live Demo](/html/cross-document-messaging.html)

>【本文内容摘自：《JavaScript高级程序设计》（第3版）Nicholas C.Zakas 著   李松峰 曹力 译】