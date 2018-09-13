---
layout: post
title: JavaScript异常处理
date: 2018-09-13 21:00:00 +0800
categories: [JS, Exception]
tags: [JS, try-catch, exception, 错误, 异常]
keywords: JavaScript中的异常处理
description: JavaScript中的异常处理
---

### try-catch 语句

ECMA-262 第 3 版引入了`try-catch`语句，作为 JavaScript 中处理异常的一种标准方式。基本的语法如下所示：

```js
try {
	//可能会发生错误的代码
} catch (error) {
	//在错误发生时怎么处理
}
```

也就是说，我们应该把所有可能会抛出错误的代码都放在 try 语句块中，而把那些用于错误处理的代码放在 catch 块中。例如：

```js
try {
	Array.someNoneExistentFunction();
} catch (error) {
	console.log('An error happened!');
}
```

如果 try 块中的任何代码发生了错误，就会立即退出代码执行过程。所以下例中的`two()`不会被执行：

```js
function one() {
	console.log(noneExistVariable);
}

function two() {
	console.log('function two() executed successfully.');
}

try {
	one();
	two();
} catch (exception) {
	console.log(exception.message);
}
```

try 块推出代码执行后，接着执行 catch 块。此时，catch 块会接收到一个包含错误信息的对象。即使你不想使用这个错误对象，也要给它起个名字。这个对象包含的实际信息会因浏览器二异，但共同的是有一个保存着错误消息的`message`属性。ECMA-262 还规定了一个保存错误的`name`属性；当前所有浏览器都支持这个属性。

### 1.1 finally 子句

**虽然在 try-catch 语句中是可选的，但 finally 子句一旦使用，其代码无论如何都会执行（不管 try 语句中的代码有没有出错，finally 都会执行）**。只要代码中包含 finally 子句，则无论 try 或 catch 语句块中包含什么代码——甚至是 return 语句，都不会阻止 finally 子句的执行。

```js
function testFinally() {
	try {
		return 2;
	} catch (error) {
		return 1;
	} finally {
		return 0;
	}
}
console.log(testFinally());
```

这个函数永远会返回 0。

**如果提供 finally 子句，则 catch 子句就成了可选的（catch 或 finally 有一个即可）**

### 1.2 错误类型

执行代码期间可能会发生的错误有很多种类型。每种错误都有对应的错误类型，而当错误发生时，就会抛出相应类型的错误对象。ECMA-262 定义了下列 7 种错误类型：

> Error

> EvalError

> RangeError

> ReferenceError

> SyntaxError

> TypeError

> URIError

其中 Error 是基类型，其他错误类型都继承自该类型。因此，所有错误类型共享了一组相同的属性（错误对象中的方法全是默认的对象方法）。Error 类型的错误很少见，如果有也是浏览器抛出的；这个基类型的主要目的是供开发人员抛出自定义错误的。

EvalError 类型的错误会在使用 eval()函数而发生异常时抛出。如果没有把 eval()当成函数使用，就会抛出该错误：

```js
//##skipEval
try {
	new eval();
} catch (error) {
	console.log(error.name + ':' + error.message);
}

try {
	var foo;
	eval = foo;
} catch (error) {
	console.log(error.name + ':' + error.message);
}
```

在实践中，浏览器不一定会应该抛出错误时就抛出 EvalError。例如 Firfox4+, IE8 和 Safari 对一种情况会抛出 TypeError，而第二种情况会成功执行，不抛出错误。

RangeError 类型的错误会在数值超出相应范围时触发。例如，在定义数组时，如果指定了数组不支持的项数（如-20 或 Number.MAX_VALUE），就会触发这种错误：

```js
try {
	var items1 = new Array(-20);
} catch (error) {
	console.log(error.name + ':' + error.message);
}

try {
	var items2 = new Array(Number.MAX_VALUE);
} catch (error) {
	console.log(error.name + ':' + error.message);
}
```

ReferenceError 会在找不到对象的情况下触发。

```js
try {
	var obj = x;
} catch (error) {
	console.log(error.name + ':' + error.message);
}
```

SyntaxError 会在我们把错误的 JavaScript 字符串传入 eval()函数时产生。

```js
try {
	eval('a ++ b');
} catch (error) {
	console.log(error.name + ':' + error.message);
}
```

如果语法错误的代码出现在 eval()函数之外，则不太可能使用 SyntaxError，因为此时的语法错误会导致 JavaScript 代码立即停止执行。

TypeError 类型在 JavaScript 中经常用到，在变量中保存着意外的类型时，或者访问不存在等方法时，都会导致这种错误。错误的原因很多，但归根结底还是由于在执行特定类型的操作时，变量的类型并不符合要求所致。

```js
try {
	var o = new 10();
} catch (error) {
	console.log(error.name + ':' + error.message);
}

try {
	alert('name' in true);
} catch (error) {
	console.log(error.name + ':' + error.message);
}

try {
	Function.prototype.toString.call('name');
} catch (error) {
	console.log(error.name + ':' + error.message);
}
```

URIError 会在使用`encodeURI()`或`decodeURI()`，而 URI 格式不正确时触发。

利用不同的错误类型，可以获悉更多有关异常的信息，从而有助于对错误作出恰当的处理。要想知道错误的类型，可以像下面这样在 try-catch 中使用 instanceof 操作符。

```js
try {
	someFunction();
} catch (error) {
	if (error instanceof TypeError) {
		//处理类型错误
	} else if (error instanceof ReferenceError) {
		//处理引用错误
	} else {
		//处理其他类型的错误
	}
}
```

在跨浏览器编程中，检查错误类型是确定处理方式的最简便途径；包含在 message 属性中的错误消息会因浏览器而异。

### 1.3 合理使用 try-catch

当 try-catch 语句中发生错误时，浏览器会认为错误已经被处理了。使用 try-catch 最适合处理那些我们无法控制的错误。假设你在使用一个大型 JavaScript 库中的函数，该函数可能会有意无意地抛出一些错误。由于我们不能修改这个库的的源代码，所以大可将对该函数的调用放在 try-catch 中，万一有错误发生，也好恰当地处理它们。

在明明白白地知道自己的代码会发生错误时，再使用 try-catch 语句就不合适了。例如，如果传递给函数的参数是字符串而非数值，就会造成函数出错，那么就应该先检查参数的类型，然后再决定如何去坐。在这种情况下，不应该使用 try-catch 语句。

## 抛出错误

与 try-catch 语句相配的还有一个`throw`操作符，用于随时抛出自定义错误。抛出错误时，必须给 throw 操作符指定一个值，这个值是什么类型，没有要求。

```js
//##skipEval
throw 12345;
throw 'Hello world!';
throw true;
throw { name: 'JavaScript' };
```

在遇到 throw 操作符时，代码会立即执行。仅当有 try-catch 语句捕获到被抛出的值时，代码才会继续执行。

通过使用某种内置的错误类型，可以更真实地模拟浏览器错误。每种错误的构造函数接收一个参数，即实际的错误消息：

```js
try {
	throw new Error('Something bad happened.');
} catch (error) {
	console.log(error.name + ':' + error.message);
}
```

另外利用原型链还可以通过继承 Error 来创建自定义错误类型。此时，需要为新创建的错误类型指定 name 和 message 属性。

```js
function CustomError(message) {
	this.name = 'CustomError';
	this.message = message;
}

CustomError.prototype = new Error();

try {
	throw new CustomError('My message');
} catch (error) {
	console.log(error.name + ':' + error.message);
}
```

浏览器对待继承自 Error 的自定义错误类型，就像对待其他错误一样。如果要捕获自己抛出的错误并且把它与浏览器区别对待的话，创建自定义错误时很有用的。

应该在出现某种特定的已知错误条件，导致函数无法正常执行时抛出错误。

```js
function process(values) {
	if (!value instanceof Array) {
		throw new Error('process(): Argument must be an array.');
	}

	values.sort();

	for (var i = 0, len = values.length; i < len; i++) {
		if (values[i] > 1000) {
			return values[i];
		}
	}

	return -1;
}

try {
	process('');
} catch (error) {
	console.log(error.name + ':' + error.message);
}
```

上面的函数中，如果 values 不是数组，就会抛出一个错误。错误消息包含了函数的名称，以及为什么会发生错误的明确描述。如果一个复杂的 Web 应用程序发生了这个错误，那么查找问题的根源也就容易多了。

> 【本文内容摘自：《JavaScript 高级程序设计》（第 3 版）Nicholas C.Zakas 著 李松峰 曹力 译】
