---
layout: post
title: 获取两个日期Date之间间隔的天数
date: 2019-08-17 18:00:00 +0800
categories: [JS, Tools]
tags: [原创, JS, Date, 日期间隔]
keywords: 日期间隔
description: 获取两个日期Date之间间隔的天数
---

今天交了水、电、燃气费，然后为了算算自己在这个房间住了多久，花了多少钱，写了一个**获取两个日期之间间隔的天数**的函数：

```js
function getDaysBetweenTwoDates(dateFrom, dateTo) {
	var millisecondsBetweenTwoDates = 0;

	if (dateFrom instanceof Date && dateTo instanceof Date) {
		millisecondsBetweenTwoDates = dateFrom - dateTo;
	} else if (Date.parse(dateFrom) && Date.parse(dateTo)) {
		millisecondsBetweenTwoDates = new Date(dateFrom) - new Date(dateTo);
	} else {
		throw Error('Exception: params are not valid!');
	}

	return millisecondsBetweenTwoDates / (86400 * 1000);
}

var day1= new Date('2019-08-17');
var day2 = new Date('2017-07-29');
console.log(getDaysBetweenTwoDates(day1, day2);
```

> Date.parse() 方法解析一个表示某个日期的字符串，并返回从 1970-1-1 00:00:00 UTC 到该日期对象（该日期对象的 UTC 时间）的毫秒数，如果该字符串无法识别，或者一些情况下，包含了不合法的日期数值（如：2015-02-31），则返回值为 NaN。<br/>不推荐在 ES5 之前使用 Date.parse 方法，因为字符串的解析完全取决于实现。直到至今，不同宿主在如何解析日期字符串上仍存在许多差异，因此最好还是手动解析日期字符串（在需要适应不同格式时库能起到很大帮助）[^1]。

本文属原创，转载请联系：<a href="mailto:jeff.doyle@foxmail.com">jeff.doyle@foxmail.com</a>

引用：

[^1]: [MDN web docs: Date.parse()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)
