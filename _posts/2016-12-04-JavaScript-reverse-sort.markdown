---
layout: post
title: "JavaScript中reverse()和sort()方法"
date: 2016-12-04 22:40:00 +0800
category: [Learning, JavaScript, reverse(),sort()]
tag: [JS, reverse(), sort()]
---

## reverse( )

reverse( )仅仅会反转数组项的顺序，不进行对比。

```
var values = [0, 1, 5, 10, 15, 3];
values.reverse();
console.log(values);  //[3, 15, 10, 5, 1, 0]
```

## sort( )

默认情况下sort( )方法按照升序排列数组项--即最小的值位于最前面，最大值位于最后面。

sort( )方法会调用每个数组项的toString( )转型方法，然后比较得到的字符串来确定排序。

即使数组中的每一项都是数值，sort( )方法比较的也是字符串，考虑以下代码：

```
var values = [0, 1, 5, 10, 15];
values.sort();
console.log(values);  //[0,1,10,15,5] 因为'10'，'15'在'5'的前面。
```

sort( )方法可以接收一个比较函数以便开发者指定哪个值位于哪个值前面。

比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等返回0，如果第一个参数应该位于第二个之后则返回一个正数。

* 升序排序：

```
function compareAsc(value1, value2){
	if(value1 < value2){
		return -1;
	}else if(value1 < value 2){
		return 1;
	}else {
		return 0;
	}
}

var values = [0, 1, 5, 10, 15, 3];
values.sort(compareAsc);
console.log(values);  //[0, 1, 3, 5, 10, 15] 
```

* 降序排序（相对于升序，只需修改函数返回值）：

```
function compareDsc(value1, value2){
	if(value1 < value2){
		return 1;
	}else if(value1 < value 2){
		return -1;
	}else {
		return 0;
	}
}

var values = [0, 1, 5, 10, 15, 3];
values.sort(compareAsc);
console.log(values);  //[0, 1, 3, 5, 10, 15] 
```

* 对于数值类型或者其valueOf( )方法会返回数值类型的对象类型，可以使用一个更简单的比较函数：

```
function compareAsc(value1, value2){
	return value1 - value2;
}
```

！注意：reverse( )和sort( )方法的返回值是经过排序之后的数组（改变了原数组）。










