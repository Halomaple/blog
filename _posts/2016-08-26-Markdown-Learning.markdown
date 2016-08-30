---
layout: post
title: "Markdown Learning"
date: 2016-08-26 14:49:39 +0800
category: Learning
tag: markdown
---

**6 Headings using #**

# First - Link

This is a [link](http://halomaple.com) to Halomaple.com

## Second - Font

This is a *itallic* (using \*\* ) _text_ (using \_ \_ ).
And this is a **bold** (using \*\* \*\* ) __font__ (using \_ \_&nbsp;&nbsp;\_ \_ )

### Third - Language

Markdown supports 中文, 日本語の, 한국어, русский, El español, Português, svenska, In Italiano ...

#### Fourth - List

I'd like to see a unordered list(using *, + or - ).

* Hello
* こんにちは
* 你好

and a ordered list

1. Throw away your mobile phone
2. Talk to someone
3. Be happy

##### Fifth - HTML & Table
I can create a table using:

```
<table>
    <thead>
        <tr>
            <th>Head</th>
            <th>Head2</th>
            <th>Head3</th>
            <th>Head4</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Foo</td>
            <td>Foo2</td>
            <td>Foo3</td>
            <td>Foo4</td>
        </tr>
        <tr>
            <td>Coo</td>
            <td>Coo2</td>
            <td>Coo3</td>
            <td>Coo4</td>
        </tr>
    </tbody>
</table>
```
And it shows like this:
<table>
    <thead>
        <tr>
            <th>Head</th>
            <th>Head2</th>
            <th>Head3</th>
            <th>Head4</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Foo</td>
            <td>Foo2</td>
            <td>Foo3</td>
            <td>Foo4</td>
        </tr>
        <tr>
            <td>Coo</td>
            <td>Coo2</td>
            <td>Coo3</td>
            <td>Coo4</td>
        </tr>
    </tbody>
</table>

Or using: 

```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```
which shows like

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

###### Sixth - JS code
\`\`\` &nbsp;&nbsp; \`\`\` is use for presenting codes
```
console.log("Hello there!");
console.info("How good the weather it is!");
```
I also can use &lt;code&gt; &lt;/code&gt;:

<code>
    console.log(" <code> code <code> again </code> </code> ");
</code>

Or \`  \` for inline code: `alert("inline code")`

***

---

**2 Headings using = and -**

Seventh - Split lines
=======
*** or --- at new lines can generate split lines.

***
line1

---
line2

---
line3

---

Eighth - Image
--
![This is an image](../assets/img/logo.png "logo image")

Currently markdown can't control the width and height of an image.