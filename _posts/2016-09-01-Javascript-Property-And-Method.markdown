---
layout: post
title: "函数属性和方法"
date: 2016-08-26 23:00:00 +0800
category: Javascript
tag: function, property
---

对于ECMAScript 中的引用而言Prototype是保存它们所有实例方法的真正所在。换句话说，诸如toString()和valueOf()等方法实际上都保存在prototype名下，只不过是通过各自对象的实例访问。在ECMAScript5中，prototype属性是不可枚举的因此，使用for-in无法发现。

每个函数都包含两个非继承而来的方法：apply()和call()。这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。首先，apply()方法接收两个参数：一个是在其中运行函数的作用域，另一个是参数数组。

```
function sum(num1, num2){
	return num1 + num2;
}

function callSum1(num1, num2){
	return sum.apply(this, arguments);   //传入arguments对象
}

function callSum2(num1, num2){
	return sum.apply(this, [num1, num2]);
}

alert(callSum1(10, 10));  //20
alert(callSum2(10, 10));  //20

```