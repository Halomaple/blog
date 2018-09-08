---
layout: post
title: HTML5媒体元素
date: 2018-08-22 20:00:00 +0800
categories: [HTML5]
tags: [HTML5, Player]
keywords: HTML5媒体播放器
description: HTML5媒体播放器
---

### 1. 属性

&lt;audio&gt;和&lt;video&gt;元素都提供了完善的 JavaScript 接口。下表列出了这两个元素共有的属性，通过这些属性可以知道媒体的当前状态。

![](https://i.loli.net/2018/08/21/5b7c0e6691d38.jpg)

其中很多属性也可以直接在&lt;audio&gt;和&lt;video&gt;中设置。

### 2. 事件

除了大量属性之外，这两个媒体元素还可以触发很多事件。这些事件监控着不同的属性变化，这些变化可能是媒体播放的结果，也可能是用户操作播放器的结果。

![](https://i.loli.net/2018/08/21/5b7c1208b6f8c.jpg)

这些事件之所以如此具体，就是为了让开发人员只使用少量 HTML 和 JavaScript（与创建 Flash 影片相比）即可编写出自定义的音频/视频播放器。

### 3. 自定义媒体播放器

使用&lt;audio&gt;和&lt;video&gt;元素的 play()和 pause()方法，可以手工控制媒体文件的播放。组合使用属性、事件和这两个方法，很容易创建一个自定义的媒体播放器，如下面的例子所示。

<div class="mediaplayer">
	<div class="video">
		<video id="player" src="/media/Humanity.mp4" poster="/media/Humanity.png" width="300" height="200">
			Video player not avaiable
		</video>
	</div>
	<div class="controls">
		<input type="button" value="Play" id="video-btn" />
		<span id="curtime">0</span>/<span id="duration">0</span>
	</div>
</div>

```html
<div class="mediaplayer">
	<div class="video">
		<video id="player" src="/media/Humanity.mp4" poster="/media/Humanity.png" width="300" height="200">
			Video player not avaiable
		</video>
	</div>
	<div class="controls">
		<input type="button" value="Play" id="video-btn" />
		<span id="curtime">0</span>/<span id="duration">0</span>
	</div>
</div>
```

```js
//取得元素的引用
var player = document.getElementById('player'),
	btn = document.getElementById('video-btn'),
	curtime = document.getElementById('curtime'),
	duration = document.getElementById('duration');

//更新播放时间
duration.innnerHTML = player.duration;

//为按钮添加事件处理程序
EventUtil.addHandler(btn, 'click', function(event) {
	if (player.paused) {
		player.play();
		btn.value = 'Pause';
	} else {
		player.pause();
		btn.value = 'Play';
	}
});

//定时更新当前时间
setInterval(function() {
	curtime.innerHTML = player.currentTime;
}, 250);
```

以上 JavaScript 代码给按钮添加了一个事件处理程序，单击它能让视频在暂停时播放，在播放时暂停。通过&lt;video&gt;的 load 事件处理程序，设置了加载完视频后显示播放时间。最后，设置了一个定时器，以更新当前显示的时间。

> 【本文内容摘自：《JavaScript 高级程序设计》（第 3 版）Nicholas C.Zakas 著 李松峰 曹力 译】
