---
layout: post
title: "JavaScript Array"
date: 2016-12-08 22:40:00 +0800
category: [Learning, JavaScript, Array]
tag: [JS, Array]
---


## Array基本

构建：

```
	var colors = new Array(); 
	var fruit = new Array("orange", "apple", "banana");
```

关键字`new`可以省略。

Array的**每一项可以保存任何类型的数据**：第一项保存字符串，第二项保存数值，第三项保存对象···而且数组的大小时可以动态调整的（预知数组项目数量的情况下也可长度`var colors = new Array(20);`）。

读取和设置数组的值时，使用方括号并提供相应值基于0的数字索引。如果索引超过了数组的长度，则增加数组长度，新的项默认为`undefined`。

数组的`length`属性可以设置`colors.length = 0;` 将会置空colors数组。每当在数组末尾添加一项后，length属性都会自动更新。

## 数组检测

```
if(value instanceof Array)
	//对数组执行某些操作
```
`instanceof`操作符的局限在于，它假定直邮一个全局执行环境。如果网页包含多个框架，从一个框架向另一个框架传入数组，那么传入的数组与在第二个框架中原生创建的数组分别具有不同的构造函数。

ECMAScript5新增了`Array.isArray()`方法（IE9+），最终确定某个值是不是数组。

```
if(Array.isArray(value)){
	//对数组执行某些操作
}
```

##  转换方法

具有所有对象所具有的`toLocaleString()`, `toString()`和`valueOf()`方法。toString()会返回数组每一项的字符串形式，然后以逗号分隔符的字符串（给每一项调用toString()）。而toLocaleString()也是返回一个逗号分隔的字符串，只是每一项调用toLocaleString()方法。toString

```
var person1 = {
	toLocaleString: function(){
		return 'Nikolaos';
	},
	toString: function(){
		return 'Nicholas';
	}
};

var person2 = {
	toLocaleString: function(){
		return 'Grigorios';
	},
	toString: function(){
		return 'Greg';
	}
}

var people = [person1, person2];

alert(people);					//Nicholas,Greg
alert(people.toString());		//Nicholas,Greg
alert(people.toLocaleString());	//Nikolaos,Grigorios
```

## 栈方法 

栈是LIFO（Last-In-First-Out）的数据结构。ECMAScript为数组提供了：

* 1). `push()`接收任意数量的参数，逐个添加到数组末尾，并返 回修改后数组的长度； 

```
var arr = [1,2,3,4];
arr.push(5, 6);
console.log(arr);	//[1,2,3,4,5,6]
```

* 2). `pop()`从数组的末尾移除最后一项，减少数组的length值，并返回移除的项。

```
var arr = [1,2,3,4];
var item = arr.pop();
console.log(item, arr);		//4, [1,2,3]
```

## 队列方法

队列是FIFO（First-In-First-Out）。ECMAScript也提供了两个方法：

* 1). `shift()`移除数组中的第一项兵返回该项，同时将数组长度减1；结合push()方法使用来模拟队列；

```
var arr = [1,2,3,4];
var item = arr.shift();
console.log(item, arr);		//1, [2,3,4]
```

* 2). `unshift()`在数组的前端添加任意个项并返回新数组的长度；结合pop()方法使用来模拟队列。

```
var arr = [1,2,3,4];
var count = arr.unshift(-1,0);
console.log(count, arr);	//6, [-1,0,1,2,3,4]
```

## 重排序方法

见[JavaScript中reverse( )和sort( )方法](../JavaScript-reverse-sort)

## 操作方法

* 1). `concat()`创建当前数组的一个副本，然后将接收到的参数添加到这个副本的末尾，并返回新构建的数组；

* 2). `slice()`接收两个参数：startIndex，endIndex（可选），只有startIndex时将返回从startIndex到数组末尾的所有项；注意slice()不会影响原始数组。如果参数为负数，则用数组长度加上该数再确定位置。

* 3). `splice()`直接操作原始数组并返回一个数组，该数组包含了从原始数组中删除的项（如果没有删除则为空数组）
	a. 删除 —— 删除任意数量的项，需2个参数：要删除的第一项的位置和要删除的项数，例如splice(0,2)删除数组前两项
	b. 插入 —— 指定位置插入任意数量的项，3个参数：起始位置，0（要删除的项数），和要插入的项
	c. 替换 —— 指定位置插入任意数量的项，并删除任意数量的项，3个参数：起始位置，要删除的项数，和要插入任意数量的项。插入的项数不必和删除项数的相等。

```
var color = ["red", "green", "blue"];
var removed = colors.splice(0,1);		//删除第一项
alert(colors);		//green, blue
alert(removed);		//red, 返回数组中只包含一项（所删除的项）

removed = colors.splice(1, 0, "yellow", "orange");		//从位置1开始插入两项
alert(colors);		//green, yellow, orange, blue
alert(removed);		//返回的是一个空数组（没有删除）

removed = colors.splice(1, 1, "red", "purple");		//插入两项，删除一项
alert(colors);		//green, red, purple, orange, blue
alert(removed);		//yellow, 返回数组只包含一项（所删除的项）
```

## 位置方法

* 1). `indexOf()`2个参数：查找的项和（可选）查找起点位置索引，从数组的开头开始向后查找
* 2). `lastIndexOf()`同样也是2个参数：查找的项和查找起点位置索引，从数组的末尾向前查找

两个函数（IE9+）都返回要查找的项在数组中的位置，或在没有找到的情况下返回-1。查找时会使用全等操作符。

## 迭代方法

ECMAScript5为数组定义啦5个迭代方法。每个方法都接受两个参数：要在每一项上运行的函数和（可选的）作用域对象`this`。传入这些方法中的函数会接收三个参数：数组项的值，该项在数组中的位置和数组对象本身。

* 1). `every()`对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true；
* 2). `filter()`对数组的每一项运行给定函数，返回该函数会返回true的项组成的数组。
* 3). `forEach()`对数组中的每一项运行给定函数。没有返回值。
* 4). `map()`对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
* 5). `some()`对数组中的每一项运行给定函数，如果该函数对任一项返回true，则返回true。

```
var numbers = [1,2,3,4,5,4,3,2,1];

var everyResult = numbers.every(function(item, index, array){
	return item > 2;
});
alert(everyResult);		//false

var someResult = numbers.some(function(item, index, array){
	return item > 2;
});
alert(someResult); 		//true

var filterResult = numbers.filter(function(item, index, array){
	return item > 2;
});
alert(filterResult);	//[3, 4, 5, 4, 3]

var mapResult = numbers.map(function(item, index, array){
	return item * 2;
});
alert(mapResult);	//[2, 4, 6, 8, 10, 8, 6, 4, 2]

numbers.forEach(function(item, index, array){
	//执行某些操作
});
```

以上方法都不会修改数组中的包含的值，但是可以通过运行函数时`array[index]`来修改，不建议这么做。

## 归并方法

* 1). `reduce()`从第一项开始迭代所有的项，构建一个最终返回值

* 2). `reduceRight()`从最后一项开始迭代所有的项，构建最终返回值

两个方法（IE9+）都接收两个参数：一个在每一项上调用函数和（可选）作为基础的初始值。传给reduce()和reduceRight()的函数接收4个参数：前一个值，当前值，项的索引和数组对象，函数的任何返回值都会作为第一个参数自动传给下一项。

```
var values = [1, 2, 3, 4, 5];
var sum = values.reduce(function(prev, cur, index, array){
	return prev + cur;
});

alert(sum);		//15
```

reduceRight()的作用类似，只不过方向相反：

```
var anotherSum = values.reduceRight(function(prev, cur, index, array){
	return prev + cur;
});

alert(anotherSum);		//15
```