# Cjb-base #

## 一、初始化
```javascript
var cjbbase = require('cjb-base');
```
## 二、基本工具
### 1、cjbbase.trim()
>* 去除字符串两边空格

```javascript
var a,b;
	a = ' dfa ';
	b = cjbbase.is.trim(a);
	console.log(b);
	//dfa
```
### 2、cjbbase.replenish(text,total[,rstr='0'])
>* 如果我要保证text是4位，当text不足时候，补充指定值


>* 去除字符串两边空格
>* text字符串
>* text字符串 + 填充部分 总字节数为total
>* rstr默认填充0

```javascript
var a,b;
	a = '2';
	b = cjbbase.replenish(a,2);
	console.log(b);
	//02
	
	a = '2';
	b = cjbbase.replenish(a,3);
	console.log(b);
	//002
	
	a = '2';
	b = cjbbase.replenish(a,3,'D');
	console.log(b);
	//DD2
```

## 三、判断工具

### 1、cjbbase.type(obj[,type])
>* 如果不传type就好返回传入变量的类型
>* 如果传入type，如果传入变量是type指定的类型返回true

```javascript
var a,b;
	a = {};
	b = cjbbase.is.type(a,'object');
	console.log(b);
	//true
```
### 2、cjbbase.is.undefined(obj)
>* 判断类型是不是`未定义`
>* 注意，如果没有var 过aaa，而且想判断全局下有没有aaa
>* 不能直接 cjbbase.is.undefined(aaa);
>* 需要 cjbbase.is.undefined(window.aaa);
>* 需要 cjbbase.is.undefined(global.aaa);

```javascript
var a,b;
	b = cjbbase.is.undefined(a);
	console.log(b)
	//true
```
### 3、cjbbase.is.string(obj)
>* 判断类型是不是`字符串`类型
>* 返回`true`|`false`

```javascript
var a,b;
	b = cjbbase.is.string(a);
	console.log(b)
	//true
```
### 4、cjbbase.is.boolean(obj)
>* 判断类型是不是`布尔值`类型

```javascript
var a,b;
	a = false ;
	b = cjbbase.is.boolean(a);
	console.log(b)
	//true
```
### 5、cjbbase.is.function(obj)
>* 判断类型是不是`方法`类型

```javascript
var a,b;
	a = function(){} ;
	b = cjbbase.is.function(a);
	console.log(b)
	//true
```
### 6、cjbbase.is.array(obj)
>* 判断类型是不是`数组`类型

```javascript
var a,b;
	a = [] ;
	b = cjbbase.is.array(a);
	console.log(b)
	//true
```
### 7、cjbbase.is.object(obj)
>* 判断类型是不是`对象`类型

```javascript
var a,b;
	a = {} ;
	b = cjbbase.is.object(a);
	console.log(b)
	//true
```
### 8、cjbbase.is.error(obj)
>* 判断类型是不是错误类型

```javascript
var a,b;
	a = Error() ;
	b = cjbbase.is.error(a);
	console.log(b)
	//true
```
### 9、cjbbase.is.number(obj)
>* 判断类型是不是`数字类型`
>* 别名 `cjbbase.is.numeric(obj)`

```javascript
var a,b;
	a = 11 ;
	b = cjbbase.is.number(a);
	console.log(b)
	//true
	a = '11' ;
	b = cjbbase.is.number(a);
	console.log(b)
	//true
	a = '1b1' ;
	b = cjbbase.is.number(a);
	console.log(b)
	//false
```
### 10、cjbbase.is.int(obj)
>* 判断类型是不是`整型`类型

```javascript
var a,b;
	a = 11 ;
	b = cjbbase.is.int(a);
	console.log(b)
	//true
	a = 11.3 ;
	b = cjbbase.is.int(a);
	console.log(b)
	//false
```
### 11、cjbbase.is.money(obj)
>* 判断类型是不是`价格`
>* 小数点不能超过2位
>* 不能带货币符号，不能是$22.22或者￥22.22

```javascript
var a,b;
	a = '22.3' ;
	b = cjbbase.is.money(a);
	console.log(b)
	//true
	a = '22.333' ;
	b = cjbbase.is.money(a);
	console.log(b)
	//false
	a = '￥22.33' ;
	b = cjbbase.is.money(a);
	console.log(b)
	//false
```
### 12、cjbbase.is.window(obj)
>* 判断类型是不是window对象
>* 主要判断node和window
>* node[node服务程序]下没有window

```javascript
var a,b;
	a = window ;
	b = cjbbase.is.window(a);
	console.log(b)
	//true
	a = {} ;
	b = cjbbase.is.set(a);
	console.log(b)
	//false
```
### 13、cjbbase.is.global(obj)
>* 判断类型是不是global对象
>* 主要判断node和window
>* window[浏览器]下没有global

```javascript
var a,b;
	a = global ;
	b = cjbbase.is.global(a);
	console.log(b)
	//true
	a = {} ;
	b = cjbbase.is.set(a);
	console.log(b)
	//false
```
### 14、cjbbase.is.emptyObject(obj)
>* 判断类型是不是空对象
>* 不支持 cjbbase.type(obj,'emptyObject')

```javascript
var a,b;
	a = {} ;
	b = cjbbase.is.emptyObject(a);
	console.log(b)
	//true
	a = {dd:"ss"} ;
	b = cjbbase.is.emptyObject(a);
	console.log(b)
	//false
```
### 15、cjbbase.is.empty(obj)
>* 判断类型是不是为空或者空数组
>* 空数组也返回true
>* 不支持 cjbbase.type(obj,'empty')

```javascript
var a,b;
	a = '' ;
	b = cjbbase.is.empty(a);
	console.log(b)
	//true
	a = [] ;
	b = cjbbase.is.empty(a);
	console.log(b)
	//true
	a = {} ;
	b = cjbbase.is.empty(a);
	console.log(b)
	//false
```
### 16、cjbbase.is.set(obj)
>* 判断类型是不是设置了 和 cjbbase.is.undefined对立
>* 不支持 cjbbase.type(obj,'set')

```javascript
var a,b;
	a = '' ;
	b = cjbbase.is.set(a);
	console.log(b)
	//true
	a = null ;
	b = cjbbase.is.set(a);
	console.log(b)
	//true
	a = undefined ;
	b = cjbbase.is.set(a);
	console.log(b)
	//false
```
### 17、cjbbase.is.plainObject(obj)
>* 判断类型是不是纯粹的对象
>* 不支持 cjbbase.type(obj,'plainObject')

```javascript
var a,b;
	a = {} ;
	b = cjbbase.is.plainObject(a);
	console.log(b)
	//true
	a = window ;
	b = cjbbase.is.set(a);
	console.log(b)
	//false
```


## 四、基本获取工具
### 1、cjbbase.time() 
>* 返回一个时间戳，精确度到秒

```javascript
var a;
	a =  cjbbase.time();
	console.log(a);
	//1465483055
```
### 2、cjbbase.now() 
>* 返回一个时间戳，精确度到毫秒

```javascript
var a;
	a =  cjbbase.now();
	console.log(a);
	//1465483078039
```
### 3、cjbbase.get.guid() 获取GUID

```javascript
var a;
	a = cjbbase.get.guid()
	console.log(a)
	//"7a1af541-ac6a-4c8d-a73b-a754e3eb9c99"
```
### 4、cjbbase.get.rand() 获取一个随机数


##### 4.1、获取一个随机数

```javascript
var a;
	a = cjbbase.get.rand()
	console.log(a)
	//447
```

##### 4.2、获取一个4位的随机数

```javascript
var a;
	a = cjbbase.get.rand(4)
	console.log(a)
	//2021
```

##### 4.3、获取一个1000到9999之间的的随机数

```javascript
var a;
	a = cjbbase.get.rand(1000,9999)
	console.log(a)
	//5806
```
## 五、对象处理

> 处理各种复杂的操作和构造对象或者开发插件使用到的方法

### 1、cjbbase.inherit
> 创建一个对象
##### 1.1、创建纯粹的对象
> 为了避免不必要的原型链干扰，可以使用该方法创建没有继承的纯粹对象

```javascript
var a;
	a = cjbbase.inherit(null)
	console.log(a.toString)
	//打印出 undefined
```

##### 1.2、创建指定继承的对象

> 创建一个继承的对象

```javascript
var a,b;
	a = {};
	a.aa=44;
	b = cjbbase.inherit(a)
	console.log(b.aa);
	//打印出 44
	b.aa=88;
	console.log(a.aa);
	//打印出 44
	console.log(b.aa);
	//打印出 88
	delete b.aa ;
	console.log(b.aa);
	//打印出 44
```

##### 1.3、创建指定多级继承的对象

> 创建一个多级继承的对象

```javascript
var a,b,c,d;
	a = {};
	a.aa=44;
	b = cjbbase.inherit(a)
	b.bb=88;
	c = cjbbase.inherit(b)
	console.log(c.aa);
	//打印出 44
	console.log(c.bb);
	//打印出 88
	c.cc=66;
	d = cjbbase.inherit(c);
	console.log(d.aa+d.bb+d.cc)
	//打印出 198
```

##### 1.4、`注意`继承的误区1

```javascript
var a,b;
	a = {};
	a.aa=44;
	a.bb={};
	a.bb.bb=55;
	b = cjbbase.inherit(a)
	b.aa=88;
	b.bb.bb=88;
	console.log(b.aa);
	//打印出 88
	console.log(a.aa);
	//打印出 44
	console.log(b.bb.bb);
	//打印出 88
	console.log(a.bb.bb);
	//打印出 88
```

> 因为 `b.bb` 已经是 `原型链` `a` 上的 `bb` 即 `a.bb`，所有修改会被联动


### 2、cjbbase.extend

> cjbbase的extend扩展方法：

>* cjbbase的扩展方法extend是我们在写插件的过程中常用的方法，
>* 该方法有一些重载原型，
>* 在此，我们一起去了解了解。


##### 2.1、cjbbase的扩展方法原型是:　　　

```javascript
	cjbbase.extend(dest,src1,src2,src3...);
```

>* 它的含义是将src1,src2,src3...合并到dest中,
>* 返回值为合并后的dest,由此可以看出该方法合并后，
>* 是修改了dest的结构的。
>* 如果想要得到合并的结果却又不想修改dest的结构，可以如下使用：


```javascript
	var newSrc=cjbbase.extend({},src1,src2,src3...);
	//也就是将"{}"作为dest参数。
```

>* 这样就可以将src1,src2,src3...进行合并，
>* 然后将合并结果返回给newSrc了。
>* 如下例：

```javascript
	var result=cjbbase.extend({},{name:'Tom',age:21},{name:'Jerry',sex:'Boy'});
```

> 那么合并后的结果

```javascript
	console.log(result)
	//输出了 {name:"Jerry",age:21,sex:"Boy"}
```

> 也就是说后面的参数如果和前面的参数存在相同的名称，那么后面的会覆盖前面的参数值。

##### 2.2、省略dest参数

>* 上述的extend方法原型中的dest参数是可以省略的，
>* 如果省略了，则该方法就只能有一个src参数，
>* 而且是将该src合并到调用extend方法的对象中去，
>* 如：


###### 2.2.1、cjbbase.extend(src);

> 该方法就是将src合并到cjbbase的全局对象中去，如：

```javascript
cjbbase.extend({
	hello:function(){
		alert('hello');
	}
});
```

> 就是将hello方法合并到jquery的全局对象中。

###### 2.2.2、cjbbase.extend 下面例举几个常用的扩展实。

```javascript
cjbbase.extend({
	net:{}
});
```

> 这是在cjbbase全局对象中扩展一个net命名空间。


```javascript
cjbbase.extend(cjbbase.net,{
	hello:function(){
		alert('hello');
	}
})
```
> 这是将hello方法扩展到之前扩展的cjbbase的net命名空间中去。

##### 2.3、cjbbase的extend方法还有一个重载原型[克隆]：  

```javascript
cjbbase.extend(boolean,dest,src1,src2,src3...)
```

>* 第一个参数boolean代表是否进行深度拷贝，
>* 其余参数和前面介绍的一致，
>* 什么叫深层拷贝，
>* 我们看一个例子：

```javascript
var result = cjbbase.extend( true, {},  
		{ name: 'John', location: {city: 'Boston',county:'USA'} },  
		{ last: 'Resig', location: {state: 'MA',county:'China'} }
	);
```

>* 我们可以看出src1中嵌套子对象location:{city:"Boston"},
>* src2中也嵌套子对象location:{state:"MA"},
>* 第一个深度拷贝参数为true，
>* 那么合并后的结果就是： 


```javascript
console.log(result);

//打印出
//{name:"John",last:"Resig",location:{city:"Boston",state:"MA",county:"China"}}

```


>* 也就是说它会将src中的嵌套子对象也进行合并，
>* 而如果第一个参数boolean为false，
>* 我们看看合并的结果是什么，
>* 如下：

```javascript
var result = cjbbase.extend( false, {},  
		{ name: 'John', location:{city: 'Boston',county:'USA'} },  
		{ last: 'Resig', location: {state: 'MA',county:'China'} }
	); 
```

> 那么合并后的结果就是:

```javascript
console.log(result);

//打印出
//{name:"John",last:"Resig",location:{state:"MA",county:"China"}}

```

### 3、cjbbase.clone 克隆

>* 因为 javascript 对 function 、{} 、[] 是引用同一块内存
>* 很多时候给我们处理数据的时候带来了很多麻烦
>* 我们在此讲一下如何克隆对象存储数据

##### 3.1、直接赋值[引用]

```javascript
var a,b;
	a = {
		a:'11'
	};
	
console.log(a);
//打印出
//{ a: "11" }
	
	b = a ;
console.log(b);
//打印出
//{ a: "11" }
	b.a = '22' ;

console.log(b);
//打印出
//{ b: "22" }
console.log(a);
//打印出
//{ a: "22" }
//杯具来了
	

```

##### 3.2、克隆数据

```javascript
var a,b;
	a = {
		a:'11'
	};
	
console.log(a);
//打印出
//{ a: "11" }
	
	b = cjbbase.clone(a) ;
console.log(b);
//打印出
//{ a: "11" }
	b.a = '22' ;

console.log(b);
//打印出
//{ b: "22" }
console.log(a);
//打印出
//{ a: "11" }
//a没有被改变
	

```

##### 3.3、克隆指定对象克隆，指定的对象会被修改
> IE 678 系列可能兼容不好，这个待测

```javascript
var a,b;
	a = {
		a:'11'
	};
	b = {
		b:'22'
	};
	
console.log(a);
//打印出
//{ a: "11" }
	
console.log(b);
//打印出
//{ b: "22" }
	
cjbbase.clone(a,b) ;
console.log(b);
//打印出
//{ b: "22", a: "11" }
	c.a = '1188' ;
	c.b = '2288' ;

console.log(b);
//打印出
//{ b: "2288", a: "1188" }
console.log(a);
//打印出
//{ a: "11" }
//a没有被改变
```
> 可以考虑基本等价于cjbbase.extend( true, b, a);


### 4、cjbbase.each  遍历

>* 通过它，你可以遍历对象、数组的属性值并进行处理。


使用说明

>* each函数根据参数的类型实现的效果不完全一致：

##### 4.1、遍历对象(有附加参数)

```javascript
cjbbase.each(Object, function(p1, p2) {
	 this;       //这里的this指向每次遍历中Object的当前属性值
	 p1; p2;     //访问附加参数
}, ['参数1', '参数2']);
```

> 例子:

```javascript
cjbbase.each({'d':'332','sa':'33444'},function(i,v){
	console.log(this.toString(),i,v);
},['d','fs']);
//打印出
//332 d fs
//33444 d fs
```

##### 4.2、遍历数组(有附加参数)

```javascript
cjbbase.each(Array, function(p1, p2){
	 this;       //这里的this指向每次遍历中Array的当前元素
	 p1; p2;     //访问附加参数
}, ['参数1', '参数2']);
```

> 例子:

```javascript
cjbbase.each(['d','332','sa','33444'],function(i,v){
	console.log(this.toString(),i,v);
},['d88','fs89']);
//打印出
//d d88 fs89
//332 d88 fs89
//sa d88 fs89
//33444 d88 fs89
```
 
##### 4.3、遍历对象(没有附加参数)

```javascript
cjbbase.each(Object, function(name, value) {
	 this;      //this指向当前属性的值
	 name;      //name表示Object当前属性的名称
	 value;     //value表示Object当前属性的值
});
```

> 列子:

```javascript
cjbbase.each({'d':'332','sa':'33444'},function(i,v){
	console.log(this.toString(),i,v);
});
//打印出
//332 d 332
//33444 sa 33444
```
 

##### 4.4、遍历数组(没有附加参数)

```javascript
cjbbase.each(Array, function(i, value) {
	 this;      //this指向当前元素
	 i;         //i表示Array当前下标
	 value;     //value表示Array当前元素
});
```

```javascript
cjbbase.each(['d','332','sa','33444'],function(i,v){
	console.log(this.toString(),i,v);
});
//打印出
//d 0 d
//332 1 332
//sa 2 sa
//33444 3 33444
```

>* 下面提一下cjbbase.each方法的几种常用的用法
>* 例如1:

```javascript
 var arr = [ 'one', 'two', 'three', 'four'];     
 cjbbase.each(arr, function(){     
	alert(this);     
 });
```  
>* 上面这个each输出的结果分别为：one,two,three,four    

```javascript
var arr1 = [[1, 4, 3], [4, 6, 6], [7, 20, 9]]     
cjbbase.each(arr1, function(i, item){     
   alert(item[0]);     
});
```
>* 其实arr1为一个二维数组，item相当于取每一个一维数组，   
>* item[0]相对于取每一个一维数组里的第一个值   
>* 所以上面这个each输出分别为：1   4   7     


```javascript
var obj = { one:1, two:2, three:3, four:4};
cjbbase.each(obj, function(key, val) {
	alert(obj[key]);
});
```

>* 这个each就有更厉害了，能循环每一个属性     
>* 输出结果为：1   2  3  4

### 5、cjbbase.get.dataByKey  将对象中的一部分属性抽取出来创建一个新的对象

>* 比如后台给了一个包含很多数据的对象，但你只需要用其中的一部分来渲染页面就可以使用此方法

使用说明

```javascript
例子:

//参数解释：
//第一个参数：所有你想获得的属性的键值
//第二个参数：你想从哪个对象中获得属性就传哪个对象
var obj = cjbbase.get.dataByKey('a,c,k',{a:55,b:66,c:77,k:99});
console.log(obj);
//打印出
//Object {a: 55, c: 77, k: 99}
//此时obj就是一个全新对象
```



## 六、队列处理 [cjbbase.queue]

>* 很多时候，请求网络数据不是实时返回数据，
>* 即所有网络请求和数据库操作均是异步，
>* 我们在开发多级联动数据的时候，
>* 出现了很多的麻烦，就此引入队列处理
>* 该队列还可以暂停和恢复
>* 可以指定回调循环
>* 我们现在就队列详细说下使用说明
>* 目前队列仅仅继承到我们的前端框架


### 1、同步并发队列
>* 该队列有以下特点
>* 队列中间任何一个步骤不相互影响
>* 最后一步依赖前面所有数据
>* 这个时候我们用到了同步队列
>* `特征` `:` `除最后一个请求，其他请求互不相关，类似汇总`
>* `注意` `:` `本手册仅仅适用该框架的cjbbase.queue`
>* `和其他的语言的队列不一样`

例子1

>* `老师` 给 `小明` 布置作业，作业有 `语文`、`数学`、`英语`、`物理`、`化学`。
>* `老师`要求`小明`必须`同时` `按时` 交作业才算`通过`
>* 这个时候，先完成那个作业其实不是那么重要

```javascript
var p = cjbbase.queue();
	p.push(function(next){
		console.log('准备做语文作业');
		setTimeout(function(){
			console.log('完成语文作业');
			next();
		},1000*3);
	});
	p.push(function(next){
		console.log('准备做数学作业');
		setTimeout(function(){
			console.log('完成数学作业');
			next();
		},1000*1);
	});
	p.push(function(next){
		console.log('准备做英语作业');
		setTimeout(function(){
			console.log('完成英语作业');
			next();
		},1000*4);
	});
	p.push(function(next){
		console.log('准备做物理作业');
		setTimeout(function(){
			console.log('完成物理作业');
			next();
		},1000*2.5);
	});
	p.push(function(next){
		console.log('准备做化学作业');
		setTimeout(function(){
			console.log('完成化学作业');
			next();
		},1000*0.8);
	});
	p.push(true,function(){
		console.log('所有作业都做完了,开始交作业');
	});
	console.log('开始运行');
	p.run();
```

> 打印结果如下:

```text
开始运行
准备做语文作业
准备做数学作业
准备做英语作业
准备做物理作业
准备做化学作业
完成化学作业
完成数学作业
完成物理作业
完成语文作业
完成英语作业
所有作业都做完了
```

>* 温馨提醒：
>* 1、cjbbase.queue();创建一个实例化队列
>* 2、不停给实例化队列p里面push方法
>* 3、最后一个方法前加了个布尔值true
>* 4、我们把这个true定义为队列的断点
>* 5、这个断点就是等前面所有方法都方法了结果才继续
>* 6、每一个方法都需要通过调用next()，来告知插件走下一步

### 2、步步依赖，循序渐进的队列[类似阻塞]

>* 有些时候，我们每一步都是需要依赖上一步
>* 我们学习英语会有一个过程
>* 首先我们要学会26个字母
>* 然后记熟英语单词
>* 再然后准备做用英语单词造句
>* 之后学会用英语单词造
>* 准备做英语作业
>* 完成英语作业
>* 作业完成了，开始交作业。
>* 接下来用程序思维实现

```javascript
var p = cjbbase.queue();
	p.push(function(next){
		console.log('准备学习26个英文字母');
		setTimeout(function(){
			console.log('学会了26个英文字母');
			next();
		},1000*3);
	});
	p.push(true,function(next){
		console.log('准备记英语单词');
		setTimeout(function(){
			console.log('记熟英语单词');
			next();
		},1000*1);
	});
	p.push(true,function(next){
		console.log('准备做用英语单词造句');
		setTimeout(function(){
			console.log('学会英语单词造');
			next();
		},1000*4);
	});
	p.push(true,function(next){
		console.log('准备做英语作业');
		setTimeout(function(){
			console.log('完成英语作业');
			next();
		},1000*2.5);
	});
	p.push(true,function(){
		console.log('作业都做完了,开始交作业');
	});
	console.log('开始运行');
	p.run();
```

> 打印结果如下:

```text
开始运行
准备学习26个英文字母
学会了26个英文字母
准备记英语单词
记熟英语单词
准备做用英语单词造句
学会英语单词造
准备做英语作业
完成英语作业
作业都做完了,开始交作业
```

>* 虽然每一步完成的时间不一样
>* 但是保证了每一步的先后顺序
>* 这种是每一步都加断点
>* 下一步等待上一步完成


### 3、交叉型[实用型]

>* 很多时候，以上两种单一的情况不多
>* 我们需要引入交叉型才可以解决问题
>* 比如我们从做地基到进入主到吃饭来做个例子
>* 当中的延时执行，代表我们平时请求服务器数据的延时
>* 延时只是为了模拟数据不是同步先后返回
>* 这里让我们用同步思维写异步代码

----------

>* 比如建房子，首先要打好地基
>* 等地基做好了就盖房子
>* 等盖好房子了就装修
>* 等装修好了打扫卫生
>* 等打扫卫生完了就买厨具
>* 买厨具的同时可以买房间用品，买洗澡用品
>* 等买完厨具，房间用品之类的东西就搬进房子住
>* 等搬进来住了就买菜
>* 买菜的同时可以买米
>* 等菜和米买好了就做饭
>* 等做饭了就吃饭

```javascript
var p = cjbbase.queue();
	p.push(function(next){
		console.log('做地基');
		setTimeout(function(){
			console.log('完成地基');
			next();
		},1000*3);
	});
	p.push(true,function(next){
		console.log('做房子');
		setTimeout(function(){
			console.log('做好房子');
			next();
		},1000*1);
	});
	p.push(true,function(next){
		console.log('开始装修');
		setTimeout(function(){
			console.log('完成装修');
			next();
		},1000*2);
	});
	p.push(true,function(next){
		console.log('打扫卫生');
		setTimeout(function(){
			console.log('完成卫生');
			next();
		},1000*2.5);
	});
	p.push(true,function(next){
		console.log('买厨具');
		setTimeout(function(){
			console.log('完成买厨具');
			next();
		},1000*2.5);
	});
	p.push(function(next){
		console.log('买房间用品');
		setTimeout(function(){
			console.log('完成买房间用品');
			next();
		},1000*2.8);
	});
	p.push(function(next){
		console.log('买洗澡用品');
		setTimeout(function(){
			console.log('完成洗澡用品');
			next();
		},1000*1);
	});
	p.push(true,function(next){
		console.log('搬进房子住');
		setTimeout(function(){
			console.log('完成搬进房子住');
			next();
		},1000*2.5);
	});
	p.push(true,function(next){
		console.log('买菜');
		setTimeout(function(){
			console.log('完成买菜');
			next();
		},1000*1);
	});
	p.push(function(next){
		console.log('买米');
		setTimeout(function(){
			console.log('完成买米');
			next();
		},1000*0.8);
	});
	p.push(true,function(next){
		console.log('做饭');
		setTimeout(function(){
			console.log('完成做饭');
			next();
		},1000*0.8);
	});
	p.push(true,function(next){
		console.log('吃饭');
		setTimeout(function(){
			console.log('完成吃饭');
			next();
		},1000*0.8);
	});
	p.push(true,function(){
		console.log('流程完成！');
	});
	console.log('开始运行');
	p.run();
```

> 打印结果如下:

```text
开始运行
做地基
完成地基
做房子
做好房子
开始装修
完成装修
打扫卫生
完成卫生
买厨具
买房间用品
买洗澡用品
完成洗澡用品
完成买厨具
完成买房间用品
搬进房子住
完成搬进房子住
买菜
买米
完成买米
完成买菜
做饭
完成做饭
吃饭
完成吃饭
流程完成！
```

>* `重点`
>* 1、每个方法前，如果有个true，
>*  就会停下来等前面的数据都回来
>* 2、我们可以一次性传入数组


### 4、重复跳转指定位置从来[复杂型]
>* 接下来提供一个复杂组合型
>* 这个因为用得不是特别频繁
>* 都是特别难的功能用到
>* 这里就给出代码样板
>* 希望大家花业余时间研究一下


```javascript
var a=0;
var p = base.queue();
	p.push(function(next,datas,i){
		console.log('准备开始1');
		setTimeout(function(){
			console.log('完成1',i);
			next(477);
		},1000);
	});
	p.push(function(next){
		console.log('准备开始2');
		setTimeout(function(){
			console.log('完成2');
			next(99);
		},1000);
	});
	p.push(true,function(next){
		console.log('准备开始3');
		setTimeout(function(){
			console.log('完成3');
			next(99);
		},1000);
	});
	p.push(function(next){
		console.log('准备开始4');
		setTimeout(function(){
			console.log('完成4');
			next(99);
		},1000);
	});
	p.push(function(next){
		console.log('准备开始5');
		setTimeout(function(){
			console.log('完成5');
			next(99);
		},1000);
	});
	p.push(true,function(next){
		if (a++<3) {
			console.log('回到3');
			p.nextTo(3);
		}else{
			console.log('准备开始6');
			setTimeout(function(){
				console.log('完成6');
				next(99);
			},1000);
		}
	});
	p.push(function(next){
		console.log('准备开始7');
		setTimeout(function(){
			console.log('完成7');
			next(99);
		},1000);
	});
	p.push(true,function(next,datas,i){
		console.log('准备开始8');
		setTimeout(function(){
			console.log('完成8',datas,i);
			next();
		},1000);
	});
console.log('开始运行');
p.run();
```

> 打印结果如下:

```text
开始运行
准备开始1
准备开始2
完成1 0
完成2
准备开始3
准备开始4
准备开始5
完成3
完成4
完成5
回到3
准备开始3
准备开始4
准备开始5
完成3
完成4
完成5
回到3
准备开始3
准备开始4
准备开始5
完成3
完成4
完成5
回到3
准备开始3
准备开始4
准备开始5
完成3
完成4
完成5
准备开始6
准备开始7
完成6
完成7
准备开始8
完成8 [477, 99, undefined, 99, 99, 99, undefined, 99, 99, undefined, undefined] 10
```

### 5、暂停和恢复[增强型]
>* 接下来提供一个增强型
>* 这个因为用得不是特别频繁

```javascript
var a=0,aa=0;
var p = base.queue();
	p.push(function(next){
		console.log('准备开始1');
		setTimeout(function(){
			console.log('完成1');
			next(477);
		},1000);
	});
	p.push([[function(next){
		console.log('准备开始2');
		setTimeout(function(){
			console.log('完成2');
			next(99);
		},1000);
	}]]);
	p.push(true,[[function(next){

		if (aa==0) {
			aa = 1;
			p.pasue();
		}
		console.log('准备开始3');
		setTimeout(function(){
			console.log('完成3');
			next(99);
		},1000);
	}]]);
	p.push([[function(next){
		console.log('准备开始4');
		setTimeout(function(){
			console.log('完成4');
			next(99);
		},1000);
	}]]);
	p.push([[function(next){
		console.log('准备开始5');

		setTimeout(function(){
			console.log('完成5');
			next(99);
		},1000);
		//}
	}]]);
	p.push(true,[[function(next){
		if (a++<3) {
			console.log('回到3');
			p.nextTo(3);
		}else{
			console.log('准备开始6');
			setTimeout(function(){
				console.log('完成6');
				next(99);
			},1000);
		}
	}]]);
	p.push([[function(next){
		console.log('准备开始7');
		setTimeout(function(){
			console.log('完成7');
			next(99);
		},1000);
	}]]);
	p.push([true,[function(next,datas,i){
		console.log('准备开始8');
		setTimeout(function(){
			console.log('完成8',datas,i);
			next();
		},1000);
	}]]);
console.log('开始运行',p);
p.run();
```

>* 打印结果

```text
开始运行
Object {__is_once: true, __is_init: true, __is_runing: false, __is_abort: false, __is_auto_destroy: true…}
准备开始1
准备开始2
Object {__is_once: false, __is_init: true, __is_runing: true, __is_abort: false, __is_auto_destroy: true…}
完成1
完成2
准备开始3
完成3
```

>* 我们需要在控制台输入`p.resume()`,来继续恢复

```javascript
p.resume()
```

>* 打印出

```text
准备开始4
准备开始5
Object {__is_once: false, __is_init: true, __is_runing: true, __is_abort: false, __is_auto_destroy: true…}
完成4
完成5
回到3
准备开始3
准备开始4
准备开始5
完成3
完成4
完成5
回到3
准备开始3
准备开始4
准备开始5
完成3
完成4
完成5
回到3
准备开始3
准备开始4
准备开始5
完成3
完成4
完成5
准备开始6
准备开始7
完成6
完成7
准备开始8
完成8 [477, 99, undefined, 99, 99, 99, undefined, 99, 99, undefined, undefined] 10
```

### 6、更多操作[增强型]
>* 第一个参数如果传入布尔值 `true`，
>* 程序将不会在最后自动摧毁实例化的对象
>* 可以继续回调
>* 由于比较深夜了，更多的文档就不在书写了
>* 迟点有时间再深入介绍