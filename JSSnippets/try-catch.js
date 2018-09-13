function one() {
	console.log(noneExistVariable);
}

function two() {
	console.log('function two() successfully execute');
}

try {
	one();
	two();
} catch (exception) {
	console.warn(exception);
}

//如果try块中的任何代码发生了错误，就会立即退出代码执行过程
//所以two()不会被执行！
