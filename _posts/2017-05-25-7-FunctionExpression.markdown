---
layout: post
title: "7 函数表达式"
date: 2017-05-25 21:00:00 +0800
categories: [Learning, JavaScript, Function Expression]
tags: [JS, Function Expression]
---

本章内容

- 函数表达式的特征
- 使用函数实现递归
- 使用闭包定义私有变量


定义函数的方式有两种：**函数声明**和**函数表达式**

## 1. 函数声明

```
function functionName(arg0, arg1, arg2){
	//函数体
}

//Firefox, Opera, Safari和Chrome给函数定义了一个非标准的name属性，通过这个属性可以访问到给函数制定的名字。这个属性永远等于在function关键字后面的标识符

console.log(functionName.name);	//'functionName'
```

关于函数声明，有一个重要的特征就是“函数声明提升“（function declaration hoisting）,意思是在执行代码之前会先读取函数声明。意味着可以可函数声明放在调用它的语句后面。
```

sayHi();

function sayHi(){
	console.log("Hi!");
}
```

## 2. 使用函数表达式

```
var functionName = function(arg0, arg1, arg2){
	//函数体
};

//创建一个匿名函数（anonymous function）赋值给变量functionName。叫匿名函数是因为function后面没有标识符。（匿名函数有时候也叫拉姆达函数lamda function）匿名函数的name属性是空字符串。

//函数表达式与其他表达式一样，使用前必须先赋值
try {
	sayHi();
}catch(e){
	console.log(e);//错误：函数还不存在
}

var sayHi = function(){
	console.log('Hi!');
};
```

下面写法有风险

```
var condition = true;

if(condition){
	function sayHi(){
		console.log('Hi!');
	}
} else {
	function sayHi(){
		console.log('Yo!');
	}
}
//多数浏览器忽略条件返回第二个声明，Firefox会长condition为true时返回第一个声明。

//而用函数表达式就没有问题了
var sayHello;
if(condition){
	sayHello = function(){
		console.log('Hello');
	}
} else {
	sayHello = function(){
		console.log('Yo!');
	}
}
```

能够创建函数在赋值给变量，也能把函数作为其他函数的值返回。

```
function createComparisonFunction(propertyName){
	return function(obj1, obj2){
		var value1 = obj1[propertyName];
		var value2 = obj2[propertyName];

		if(value1 < value2){
			return -1;
		} else if(value1 > value2){
			return 1;
		} else {
			return 0;
		}
	};
}
```

createComparisonFunction( )返回了一个匿名函数，这个匿名可能赋值给一个变量或者被调用。在createComparisonFunction内部，它是匿名的。在把函数当成值来使用的情况下，都可以使用匿名函数。

>【本文内容摘自：《JavaScript高级程序设计》（第3版）Nicholas C.Zakas 著   李松峰 曹力 译】