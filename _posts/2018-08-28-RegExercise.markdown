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

### 1.2 Exercise 2: Matching Digits

![](https://ws3.sinaimg.cn/large/0069RVTdgy1fu1j83ytu1j30qi07uwei.jpg)

```js
var reg = /123/;
console.log(reg.exec('abc123xyz')); //123
console.log(reg.exec('define "123"')); //123
console.log(reg.exec('var g = 123;')); //123
```

### 1.3 Exercise 3: Matching With Wildcards

![](https://ws4.sinaimg.cn/large/0069RVTdgy1fu1jikhoflj30u209eweg.jpg)

```js
var reg = /...\./;
console.log(reg.test('cat')); //true
console.log(reg.test(896)); //true
console.log(reg.test('?=+')); //true
console.log(reg.test('abc1')); //false
```

### 1.4 Exercise 4: Matching Characters

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

### 1.5 Exercise 5: Excluding Characters

![](https://ws4.sinaimg.cn/large/006tNbRwgy1fu8fhhtcktj30sm07mglj.jpg)

```js
var reg = /[^b]og/;

console.log(reg.test('hog')); //true
console.log(reg.test('dog')); //true
console.log(reg.test('bog')); //false
```

### 1.6 Exercise 6: Matching Character Ranges

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fu8g8ebc5kj30u00d40ss.jpg)

```js
var reg = /[A-C][n-p][a-c]/;

console.log(reg.test('Ana')); //true
console.log(reg.test('Bob')); //true
console.log(reg.test('Cpc')); //true
console.log(reg.test('aax')); //false
console.log(reg.test('bby')); //false
console.log(reg.test('ccz')); //false
```

### 1.7 Exercise 7: Matching Repeated Characters

![](https://ws4.sinaimg.cn/large/006tNbRwgy1fudzafftpzj30x007ot8o.jpg)

```js
var reg = /waz{3,5}up/;

console.log(reg.test('wazzzzzup')); //true
console.log(reg.test('wazzzup')); //true
console.log(reg.test('wazup')); //false
```

### 1.8 Exercise 8: Matching Repeated Characters

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fudzcm1jo5j30tq09eq2x.jpg)

```js
var reg = /a{2,4}b{0,4}c{1,2}/;

console.log(reg.test('aaaabcc')); //true
console.log(reg.test('aabbbbc')); //true
console.log(reg.test('aacc')); //true
console.log(reg.test('a')); //false
```

### 1.9 Exercise 9: Matching Optional Characters

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fudzenkg3aj30s809oglq.jpg)

```js
var reg = /\d+ files? found\?/;

console.log(reg.test('1 file found?')); //true
console.log(reg.test('2 files found?')); //true
console.log(reg.test('24 files found?')); //true
console.log(reg.test('No files found.')); //false
```

### 1.10 Exercise 10: Matching Whitespaces

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fudzgt9udqj30qm09m0sq.jpg)

```js
var reg = /\d\.\s+abc/;

console.log(reg.test('1.   abc')); //true
console.log(reg.test('2.	abc')); //true
console.log(reg.test('3.           abc')); //true
console.log(reg.test('4.abc')); //false
```

### 1.11 Exercise 11: Matching Lines

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fudzj7hkozj30rk07uzki.jpg)

```js
var reg = /^Mission: successful$/;

console.log(reg.test('Mission: successful')); //true
console.log(reg.test('Last Mission: unsuccessful')); //false
console.log(reg.test('Next Mission: successful upon capture of target')); //false
```

### 1.12 Exercise 12: Matching Groups

![](https://ws3.sinaimg.cn/large/006tNbRwgy1fudzo7a4zjj30zg08cgly.jpg)

```js
var reg = /^(file.+)\.pdf$/;

console.log(reg.exec('file_record_transcript.pdf')[1]); //file_record_transcript
console.log(reg.exec('file_07241999.pdf')[1]); //file_07241999
console.log(reg.exec('testfile_fake.pdf.tmp')); //null
```

### 1.13 Exercise 13: Matching Nested Groups

![](https://ws4.sinaimg.cn/large/006tNbRwgy1fudzwqae2aj30yo08ct8y.jpg)

```js
var reg = /(\S+\s(\d+))/;

console.log(reg.exec('Jan 1987')); //Jan 1987, 1987
console.log(reg.exec('May 1969')); //May 1969, 1969
console.log(reg.exec('Aug 2011')); //Aug 2011, 2011
```

### 1.14 Exercise 14: Matching Nested Groups

![](https://ws1.sinaimg.cn/large/006tNbRwgy1fue01gy6eyj310808c74j.jpg)

```js
var reg = /(\d+)x(\d+)/;

console.log(reg.exec('1280x720')); //1280, 720
console.log(reg.exec('1920x1600')); //1920, 1600
console.log(reg.exec('1024x768')); //1024, 768
```

### 1.15 Exercise 15: Matching Conditional Text

![](https://ws3.sinaimg.cn/large/006tNbRwgy1fue03wozyxj30wy09sq31.jpg)

```js
var reg = /I love (cats|dogs)/;

console.log(reg.test('I love cats')); //true
console.log(reg.test('I love dogs')); //true
console.log(reg.test('I love logs')); //false
console.log(reg.test('I love cogs')); //false
```

### 1.16 Exercise 16: Matching Other Special Characters

![](https://ws1.sinaimg.cn/large/006tNbRwgy1fue07d0i3nj30wm07m0t8.jpg)

```js
var reg = /.*/;

console.log(reg.test('The quick brown fox jumps over the lazy dog.')); //true
console.log(reg.test('There were 614 instances of students getting 90.0% or above.')); //true
console.log(reg.test('The FCC had to censor the network for saying &$#*@!.')); //true
```
