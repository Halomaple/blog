---
layout: post
title: 正则练习
date: 2018-08-07 22:40:00 +0800
categories: [Learning, JS, 正则]
tags: [JS, 正则]
keywords: JavaScript正则表达式练习
description: JavaScript正则表达式练习
---

> 题目来自[https://regexone.com](https://regexone.com)

## 1 正则习题练习

### 1.1 Exercise 1: Matching Characters

![](https://ws4.sinaimg.cn/large/0069RVTdgy1fu1jg4citgj30rg07kdfs.jpg)

```js
var reg = /[a-z]*/;
console.log(reg.exec('abcdefg')); //abcdefg
console.log(reg.exec('abcde')); //abcde
console.log(reg.exec('abc')); //abc
```

### 1.2 Exercise 1½: Matching Digits

![](https://ws3.sinaimg.cn/large/0069RVTdgy1fu1j83ytu1j30qi07uwei.jpg)

```js
var reg = /123/;
console.log(reg.exec('abc123xyz')); //123
console.log(reg.exec('define "123"')); //123
console.log(reg.exec('var g = 123;')); //123
```

### 1.3 Exercise 2: Matching With Wildcards

![](https://ws4.sinaimg.cn/large/0069RVTdgy1fu1jikhoflj30u209eweg.jpg)

```js
var reg = /...\./;
console.log(reg.test('cat')); //true
console.log(reg.test(896)); //true
console.log(reg.test('?=+')); //true
console.log(reg.test('abc1')); //false
```

### 1.4 Exercise 3: Matching Characters

![](https://ws2.sinaimg.cn/large/0069RVTdgy1fu1jsprhllj30su0daq2z.jpg)

```js
var reg = /[cmf]an/;
console.log(reg.test('can')); //true
console.log(reg.test('man')); //true
console.log(reg.test('fan')); //true

console.log(reg.test('dan')); //false
console.log(reg.test('ran')); //false
console.log(reg.test('pan')); //false
```
