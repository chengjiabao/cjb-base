(function(window){
	'use strict';
	var base, is_exports;
	base = {};
	base.inherit = function inherit(p){
		if(Object&&Object.create){
			return Object.create(p);
		}
		var CJB = function CJB() {};
		CJB.prototype = p ;
		return new CJB();
	};
	var class2typearrsy = 'Boolean Number String Function Array Date RegExp Object Error'.split(' ');
	var i=0 ;
	base.class2type = {};
	for (i = 0; i < class2typearrsy.length; i++) {
		base.class2type[ '[object ' + class2typearrsy[i] + ']' ] = class2typearrsy[i].toLowerCase();
	}
	i = undefined ;
	class2typearrsy = undefined ;
	base.toString = base.class2type.toString;

	try{
		base.ie678 = !!window.VBArray ;
	}catch(e){}
	

	/**
	 * 第一个参数是true是深度复制
	 * [extend description]
	 * @author: 桦 <yuchonghua@163.com>
	 * @DateTime 2016-06-08T22:38:18+0800
	 * @return   {[type]}                 [description]
	 */
	base.extend = function extend() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
			if ( typeof target === 'boolean' ) {
				deep = target;
				target = arguments[ i ] || {};
				i++;
			}
			if ( typeof target !== "object" && !base.type(target,'function') ) {
				target = {};
			}
			if ( i === length ) {
				target = this;
				i--;
			}
			for ( ; i < length; i++ ) {
				if ( (options = arguments[ i ]) !== null && options !==undefined ) {
					for ( name in options ) {
						src = target[ name ];
						copy = options[ name ];
						if ( target === copy ) {
							continue;
						}
						if ( deep && copy && ( base.is.plainObject(copy) || (copyIsArray = base.type(copy,'array')) ) ) {
							if ( copyIsArray ) {
								copyIsArray = false;
								clone = src && base.type(src,'array') ? src : [];
							} else {
								clone = src && base.is.plainObject(src) ? src : {};
							}
							target[ name ] = base.extend( deep, clone, copy );
						} else if ( copy !== undefined ) {
							target[ name ] = copy;
						}
					}
				}
			}
		return target;
	};
	//获取当前时间开始
	base.now = function now() {
		return (new Date()).getTime();
	};
	//获取php的时间戳
	base.time = function time() {
		return parseInt(base.now()/1000);
	};
	//获取当前时间结束
	base.type = function type(obj, is_type) {
		var type ;
		//获取判断类型
		if (typeof (is_type) == 'string') {
			is_type = base.type.str[is_type]?base.type.str[is_type]:is_type;
			is_type = is_type.toLowerCase();
			if (base.typeExtendArray[is_type]&&base.type(base.typeExtendArray[is_type],'function')){
				return base.typeExtendArray[is_type](obj);
			}
		}else{
			is_type = false;
		}
		if ( obj === null || obj === undefined ) {
			type = obj + '';
		}else if(typeof(obj)==='undefined'){
			type ='undefined' ;
		}else{
			try{
				type = ( (typeof obj === 'object' || typeof obj === 'function') ? 
						(base.class2type[ base.toString.call(obj) ] || 'object') : (typeof obj));
			}catch(e){
				obj = 'object';
			}
		}
		type = (type || 'undefined').toLowerCase();
		if (is_type){
			type = type === is_type || false ;
		}else if(type==='object'){
			base.each(base.typeExtendArray,function(try_type, fn) {
				type = fn(obj)?try_type:type ;
				try_type = undefined ;
			});
		}else if(type==='string'){
			type = base.typeExtendArray.number(obj)?'number':'string';
		}

		obj = undefined ;
		is_type = undefined ;
		return type ;
	};
	base.type.str = {};
	base.typeExtendArray = base.inherit(null);
	base.typeExtendArray.window = function(obj){
		return obj !== undefined && obj === obj.window;
	};
	base.typeExtendArray.global = function(obj){
		return obj !== undefined && obj === obj.global;
	};
	base.typeExtendArray.jqdom = function(obj){
		var r = false ;
		try{
			r = $&&($($((window.window||window).document).find(obj)).length>0);
		}catch (e){}
		return r ;
	};
	base.typeExtendArray.number = base.typeExtendArray.numeric = function(obj){
		return (typeof obj==='string'||typeof obj==='number')&&(!base.is.array( obj ) && (obj - parseFloat( obj ) >= 0));
	};

	base.each = function each( obj, callback, args, this_obj ) {
		if(typeof obj !== 'object' && typeof obj !== 'function'){
			return ;
		}
		var value,
			i = 0,
			length = obj.length,
			isArray = base.type( obj ,'array');
			if ( args === true ) {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.call( this_obj, i, obj[ i ] );
						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.call( this_obj, i, obj[ i ] );
						if ( value === false ) {
							break;
						}
					}
				}
			}else if ( args ) {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.apply( obj[ i ], args );
						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.apply( obj[ i ], args );
						if ( value === false ) {
							break;
						}
					}
				}
			} else {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.call( obj[ i ], i, obj[ i ] );
						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.call( obj[ i ], i, obj[ i ] );
						if ( value === false ) {
							break;
						}
					}
				}
			}
		return obj;
	};
	base.is = base.inherit(null);
	base.is.type = function Type(){
		return base.type.apply(base.type,arguments);
	};
	base.each(('undefined string boolean function array object error'+' number int money window global jqdom').split(' '),function(i,type){
		base.is[type] = function(o){
			return base.type(o, type);
		};
	});

	base.is.numeric = base.is.number;
	base.is.money = function(obj){
		return /^[0-9]{1}\d*(\.\d{1,2})?$/.test(obj)||false;
	};

	base.is.emptyObject = function isEmptyObject(obj){
		for ( var name in obj ) {
			return false;
		}
		return true;
	};
	base.is.empty = function isEmpty(obj){
		return (!obj || (base.is.array(obj)&&obj.length===0));
	};
	base.is.set = function isSet(obj){
		return obj !== undefined ;
	};
	base.is.plainObject = function isPlainObject( obj ) {
		var hasOwn = {}.hasOwnProperty;
		var key;
		var support = {};

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || base.type(obj) !== "object" || obj.nodeType || base.is.window( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	};

	/**
	 * 用途: 去掉字符串两边的空格
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	base.trim = function trim(str) {
		str = str || '';
		return str.replace(/(^\s*)|(\s*$)/g, '');
	};

	//克隆数据开始(可克隆嵌套)
	base.clone=function clone(myObj,newObj){
		if(!(myObj&&(typeof myObj == 'object'))){
			return myObj;
		}
		newObj = typeof newObj === 'object' ? newObj : (base.type(myObj,'array')?[]:base.inherit(null));
		base.extend(true, newObj, myObj);
		myObj = undefined ;
		return newObj;
	};
	base.type.str={
		'undefined' : base.type(undefined),
		'string' : base.type('string'),
		'boolean' : base.type(true),
		'functionstr' : base.type(function(){}),
		'array' : base.type([]),
		'object' : base.type({})
	};

	base.get = base.inherit(null);
	//生成guid
	base.get.guid = function guid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	};
	//随机数获取 开始
	base.get.rand = function rand(s1,s2){
		var r = 0;
		switch(arguments.length){
			case 0:
				s1 = 0;
				s2 = 1000;
			break;
			case 1:
				s1 = parseInt(s1);
				s1 = (s1>0)?s1:4;
				s2 = Math.pow(10,s1)-1;
				s1 = Math.pow(10,(s1-1));
			break;
			case 2:
				s1 = base.is.numeric(s1)?s1:0;
				s2 = base.is.numeric(s2)?s2:1000;
			break;
		}
		r = s1+parseFloat(Math.round(Math.random()*(s2 - s1)));
		s1 = undefined ;
		s2 = undefined ;
		return r;
	};
	//通过key去data
	base.get.dataByKey = function(keys,obj){
		var p = {};
			p.keys = keys;
			p.data = base.is.object(obj)?obj:base.inherit(null);
			keys = undefined ;
			obj = undefined ;
			p.keys = APP.is.string(p.keys) ? p.keys.split(',') : p.keys;
			p.data_out = base.inherit(null);
			if (APP.is.array(p.keys)) {
				APP.each(p.keys,function(index, key) {
					if (APP.is.array(p.data[key])||APP.is.string(p.data[key])||APP.is.number(p.data[key])){
						p.data_out[key] = p.data[key];
					}
				});
				p.data = p.data_out ;
			}
			p = p.data ;
			return p ;
	};


	//关闭窗口结束
	//cjb.replenish(text,total,rstr) //text的长度不足total,自动填充rstr
	base.replenish = function replenish(text,total,rstr){
		text = text.toString();
		var rstrlen = (total-text.length)||0;
		var rstri = 0;
		var r = text;
		switch(arguments.length){
			case 3:
			break;
			case 2:
				rstr = '0' ;
			break;
			default:
			return r;
		}
		for (rstri = 0; rstri<rstrlen; rstri++) {
			r = rstr.toString()+r.toString();
		}
		return r;
	};

	/**
	 * [formatUrl 格式化url]
	 * @author: 桦 <yuchonghua@163.com>
	 * @DateTime 2016-05-10T21:03:37+0800
	 * @param    {[type]}    url [传入的要格式化的url]
	 * @return   {[type]}        [description]
	 */
	base.formatUrl = function(url){
		var p = {};
			p.url = (url||'').toString() ;
			p.protocol_index = p.url.indexOf('://');
			p.protocol_delimiter_len = '://'.length;
			p.protocol = '' ;
			p.hostpath = '' ;
			p.search_hash = '' ;
			if (p.protocol_index>-1){
				p.protocol = p.url.substr(0,(p.protocol_index + p.protocol_delimiter_len));
				p.hostpath = p.url.substr( p.protocol_index + p.protocol_delimiter_len );
			}else{
				p.protocol = '' ;
				p.hostpath = p.url ;
			}
			p.hash_index = p.hostpath.indexOf('#');
			if (p.hash_index>-1){
				p.search_hash = p.hostpath.substr( p.hash_index ) + p.search_hash;
				p.hostpath = p.hostpath.substr(0,(p.hash_index));
			}

			p.search_index = p.hostpath.indexOf('?');
			if (p.search_index>-1){
				p.search_hash = p.hostpath.substr( p.search_index ) + p.search_hash;
				p.hostpath = p.hostpath.substr(0,(p.search_index));
			}
			p.hostpath = base.formatPath(p.hostpath);

			p = p.url = p.protocol + p.hostpath + p.search_hash ;
			return p ;

	};
	base.formatPath = function(path){
		var p = {};
			p.path = path ;
			p.is_window = (p.path.indexOf('\\')>-1) ;
			p.path = p.path.replace(/\\/g,'/');
			p.delimiter_d = '//';
			p.delimiter_len = p.delimiter_d.length;
			while((p.pos = p.path.indexOf(p.delimiter_d))>-1){
				p.path = p.path.replace(p.delimiter_d,'/');
			}
			p.delimiter_d = '/./';
			p.delimiter_len = p.delimiter_d.length;
			while((p.pos = p.path.indexOf(p.delimiter_d))>-1){
				p.path = p.path.replace(p.delimiter_d,'/');
			}

			p.parent_d = '/../';
			p.parent_len = '/../'.length;

			while((p.pos = p.path.indexOf(p.parent_d))>-1){
				p.path_after = p.path.substr(p.pos+p.parent_len);
				p.path_before = p.path.substr(0,p.pos);
				//去除一级目录
				p.pos = p.path_before.lastIndexOf('/') ;
				if(p.pos>-1){
					p.path_before = p.path_before.substr(0,p.pos);
					p.path = p.path_before + '/' + p.path_after ;
				}
			}
			if (p.is_window) {
				p.path = p.path.replace(/\//g,'\\');
			}
			p = p.path;
			return p ;
	};

	base.mapPath = function(app_load_url,path){
		var p = {};
			//获取路径
			p.path = path ; path = undefined ;
			p.app_load_url = app_load_url ; app_load_url = undefined ;
			//去除#号后面的hash
			p.pos = p.app_load_url.indexOf('#') ;
			if(p.pos>-1){
				p.app_load_url = p.app_load_url.substr(0,p.pos);
			}
			//去除问号后面的参数
			p.pos = p.app_load_url.indexOf('?') ;
			if(p.pos>-1){
				p.app_load_url = p.app_load_url.substr(0,p.pos);
			}
			//去除文件名
			p.pos = p.app_load_url.lastIndexOf('/') ;
			if(p.pos>-1){
				p.app_load_url = p.app_load_url.substr(0,p.pos);
			}

			p.path = p.app_load_url + '/' + p.path ;

			p.parent_d = '/../';
			p.parent_len = '/../'.length;

			while((p.pos = p.path.indexOf(p.parent_d))>-1){
				p.path_after = p.path.substr(p.pos+p.parent_len);
				p.path_before = p.path.substr(0,p.pos);
				//去除一级目录
				p.pos = p.path_before.lastIndexOf('/') ;
				if(p.pos>-1){
					p.path_before = p.path_before.substr(0,p.pos);
					p.path = p.path_before + '/' + p.path_after ;
				}
			}
			p = base.formatUrl(p.path) ;
		return p;
	};
	base.array = base.inherit(null);
	base.array.unique = function(array) {
		var p = {};
			p.array = array ; array = undefined ;
			p.r = [];
			p.hash = {};
			p.i = 0 ;
			for (; (p.elem = p.array[p.i]) != (void 0); p.i++) {
				if (!p.hash[p.elem]) {
					p.r.push(p.elem);
					p.hash[p.elem] = true;
				}
			}
			delete p.i;delete p.array;delete p.hash;
			p = p.r ;
		return p;
	};
	base.array.index = function(value,array) {
		if (!base.is.array(array)) {
			return -1;
		}
		if (array.length<1) {
			return -1;
		}
		for (var i = 0; i < array.length; i++) {
			if(array[i]===value){
				return i;
			}
		}
		return -1;
	};
	base.array.remove = function(value,array) {
		var p = {};
			p.value = value ; value = undefined ;
			p.array = array ; array = undefined ;
			p.len = p.array.length;
			p.i = 0 ;
			p.r = [];
			for (; p.i < p.len; p.i++) {
				if(p.array[p.i] != p.value){
					p.r.push(p.array[p.i]) ;
				}
			}
			p.array = p.r ;
			delete p.r;delete p.i;delete p.len;delete p.value;
			p = p.array ;
		return p;
	};
	//对象转换为JSON开始
	base.toJSON = function(o) {
		if (typeof JSON !== 'undefined'&&JSON.stringify){
			return JSON.stringify(o);
		}
		var k,l,s = [];
		switch (base.type(o)) {
			case 'undefined':
				return 'undefined';
			case 'null':
				return 'null';
			case 'number':
			case 'boolean':
			case 'date':
			case 'function':
				return o.toString();
			case 'string':
				return "\"" + o.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
			case 'array':
				for (k = 0, l = o.length; k < l; k++) {
					if(base.type(o[k],'function')){
						continue;
					}
					s.push(base.toJSON(o[k]));
				}
				return '[' + s.join(',') + ']';
			case 'error':
			case 'object':
				for (k in o) {
					if(base.type(o[k],'function')){
						continue;
					}
					s.push('"' + k + '":' + base.toJSON(o[k]));
				}
				return '{' + s.join(',') + '}';
			default:
				return '';
		}
	};
	//对象转换为JSON结束
	//json转换为数组对象开始
	base.parseJSON = function(strJson) {
		if (strJson===undefined||strJson===null) {
			throw Error('Unexpected end of JSON input');
		}
		if (typeof JSON !== 'undefined'&&JSON.parse){
			return JSON.parse(strJson);
		}
		var filtered = strJson;
		filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
		filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
		filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');

		if (/^[\],:{}\s]*$/.test(filtered)) {
			/*jslint evil: true */
			return eval('(' + strJson + ')');
		} else {
			throw Error('Unexpected end of JSON input');
		}
	};
	if ( typeof define === 'function' && define.amd ) {
		define(function() {
			return base;
		});
		is_exports = true ;
	}
	if ( typeof module === 'object' && typeof module.exports === 'object' ) {
		module.exports = base;
		is_exports = true ;
	}
	if (is_exports!==true) {
		window.cjbbase = base ;
	}
	is_exports = undefined ;


	var createNewidSumLast, createNewidTimeLast ;
	createNewidSumLast = 0 ;
	createNewidTimeLast = 0 ;
	base.createNewPid = function createNewid(is_10) {
		var r ;
			if (createNewidTimeLast!==base.time()) {
				createNewidTimeLast = base.time() ;
				createNewidSumLast = 0 ;
			}
			r = createNewidTimeLast.toString() + (++createNewidSumLast).toString();
			//使用36进制
			if (!is_10) {
				r = parseInt(r,10).toString(36);
			}
			return r ;
	};
	
	//生成请求id
	base.createRequestId = function(){
		var pid, t, rid, rid_len, rid_t, rid_new, i ;
			//获取16进制的 pid
			pid = Number(base.createNewPid(true)).toString(16);
			//种子
			rid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
			rid_new = '';
			for (i = rid.length - 1; i >= 0; i--) {
				rid_t = rid[i] ;
				if (rid_t == 'x') {
					rid_len = pid.length ;
					rid_t = pid ? pid.charAt(rid_len-1):'x';
					pid = pid.substr(0, rid_len-1);
				}
				rid_new = rid_t + rid_new;
			}
			rid = base.createGuid(rid_new);
			i = rid_new = rid_t = rid_len = t = pid = undefined ;
		return rid ;
	};
	//生成guid
	base.createGuid = function (s) {
		return (s||'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	};
	base.argsToArray = function(args){
		return Array.prototype.slice.call(args) ;
	};

	//字符编码数值对应的存储长度：     
	//UCS-2编码(16进制) UTF-8 字节流(二进制)    
	//0000 - 007F       0xxxxxxx （1字节）     
	//0080 - 07FF       110xxxxx 10xxxxxx （2字节）     
	//0800 - FFFF       1110xxxx 10xxxxxx 10xxxxxx （3字节）    
	base.getBytesLength = function(str) {   
		var totalLength = 0;
		var charCode;
		for (var i = 0; i < str.length; i++) {
			charCode = str.charCodeAt(i);
			if (charCode < 0x007f)  {
				totalLength++;
			} else if ((0x0080 <= charCode) && (charCode <= 0x07ff))  {
				totalLength += 2;
			} else if ((0x0800 <= charCode) && (charCode <= 0xffff))  {
				totalLength += 3;
			} else{
				totalLength += 4;
			}
		}
		return totalLength;
	};

	base.rowraw = {};
	base.rowraw._undefined_str = 'undefined';
	base.rowraw._r = '\r';
	base.rowraw._n = '\n';
	base.rowraw._rn = base.rowraw._r+base.rowraw._n;
	base.rowraw._rn2len = base.rowraw._rn.length*2;
	
	base.rowraw.stringify = function stringifyRaw(headers, body, start, callback){
		if (callback === undefined && base.type(start, 'function')) {
			callback = start ;
			start = undefined ;
		}
		var key, headers_str = '', is_rn_end = true;
		//拼接header字符串,转buffer
		for (key in headers) {
			is_rn_end = false;
			headers_str += key+': ' + (headers[key]) + base.rowraw._rn;
		}
		headers_str += base.rowraw._rn ;
		if (is_rn_end) {
			//内容中是否只有一个换行符
			headers_str += base.rowraw._rn ;
		}
		headers = headers_str ;
		if (base.type(start, 'string')) {
			headers = start + (headers.length==base.rowraw._rn2len?'':base.rowraw._rn) + headers ;
		}
		headers_str = key = is_rn_end = start = undefined ;
		if (typeof body==='string') {
			return base.rowraw.stringifyByString(headers, body, callback);
		}else if ((typeof Buffer)!==base.rowraw._undefined_str&&Buffer.isBuffer&&Buffer.isBuffer(body)) {
			return base.rowraw.stringifyByBuffer(headers, body, callback);
		}else if ((typeof Blob)!==base.rowraw._undefined_str&&(body instanceof Blob)) {
			return base.rowraw.stringifyByBlob(headers, body, callback);
		}else{
			throw Error('Unable to parse the recognition input type');
		}

	};
	base.rowraw.parse = function parseRaw(raw, callback){
		var e;
		if (typeof raw==='string') {
			return base.rowraw.parseByString(raw, callback);
		}else if ((typeof Buffer)!==base.rowraw._undefined_str&&Buffer.isBuffer&&Buffer.isBuffer(raw)) {
			return base.rowraw.parseByBuffer(raw, callback);
		}else if ((typeof Blob)!==base.rowraw._undefined_str&&(raw instanceof Blob)) {
			if (typeof callback !== 'function') {
				throw Error('The second argument must have a callback');
			}
			return base.rowraw.parseByBlob(raw, callback);
		}else{
			e = Error('Unable to parse the recognition input type');
			if (typeof callback !== 'function') {
				throw e;
			}else{
				callback(e);
			}
		}
	};
	base.rowraw.stringifyByString = function stringifyByString(headers_str, body, callback){
		var raw = headers_str + (body||'');
		headers_str = body = undefined ;
		return base.rowraw.stringifyCb(raw, callback);
	};
	base.rowraw.stringifyByBuffer = function stringifyByBuffer(headers_str, body, callback){
		var raw = new Buffer(headers_str, 'utf-8');//将头信息字符串转buffer
			raw = Buffer.concat([raw, body]);
			headers_str = body = undefined ;
			return base.rowraw.stringifyCb(raw, callback);
	};
	base.rowraw.stringifyByBlob = function stringifyByBuffer(headers_str, body, callback){
		var raw = new Blob([headers_str,body]);//将头信息字符串转buffer
			headers_str = body = undefined ;
			return base.rowraw.stringifyCb(raw, callback);
	};
	base.rowraw.stringifyCb = function(raw, callback){
		if (typeof callback === 'function') {
			callback(raw);
			callback = raw = undefined ;
		}else{
			callback = undefined;
			return raw;
		}
	};
	/**
	 * [parseChunk description]
	 * -1 继续
	 * 0  终止
	 * 1  解析
	 */
	base.rowraw.parseChunk = function parseChunk(chunk, p, _r, _n){
		var r;
		p = p || {};
		p.chunk_prev_1 = p.chunk_prev_1 || null;
		p.chunk_prev_2 = p.chunk_prev_2 || null;
		r = -1 ;
		//如果是换行符
		if (chunk==_r) {
			//忽略
		}else if (chunk==_n) {
			//双回车终止
			if (p.chunk_prev_2==_n) {
				r = 0;
			}else{
				r = 1;
			}
		}
		p.chunk_prev_2 = p.chunk_prev_1 ;
		p.chunk_prev_1 = chunk ;
		chunk = undefined ;
		return r;
	};
	base.rowraw.parseByString = function(raw, callback){
		var chunk, i, len=raw.length,p={}, start=0, rawHeaders=[],r,pr ;
		for (i = 0; i < len; i++) {
			//提取一个字符串
			chunk = raw.charAt(i);
			pr = base.rowraw.parseChunk(chunk,p,'\r','\n');
			if (pr === 1) {
				base.rowraw.parseLine(raw.substr(start,(i-1-start)), rawHeaders);
				start = i+1 ;
			}else if(pr === 0) {
				raw =(len-1>i)?raw.substr(i+1):'';
				break;
			}
		}
		r = base.rowraw.parseHeaderCb('string', rawHeaders, raw, callback);
		i = len = raw = p = start = rawHeaders = pr = undefined ;
		return r;
	};
	base.rowraw.parseByBuffer = function(raw, callback){
		var chunk, i, len=raw.length,p={}, start=0, rawHeaders=[],r,pr ;
		for (i = 0; i < len; i++) {
			//提取一个字符串
			chunk = raw[i];
			pr = base.rowraw.parseChunk(chunk,p,0x0d,0x0a);
			if (pr === 1) {
				base.rowraw.parseLine(raw.slice(start,i-1).toString(), rawHeaders);
				start = i+1 ;
			}else if(pr === 0) {
				raw =(len-1>i)?raw.slice(i+1):(new Buffer(0));
				break;
			}
		}
		r = base.rowraw.parseHeaderCb('buffer', rawHeaders, raw, callback);
		i = len = raw = p = start = rawHeaders = pr = undefined ;
		return r;
	};
	base.rowraw.parseByBlob = function(raw, callback){
		var size=raw.size,p={}, start=0, end=10, rawHeaders=[],r, is_read_row=false, is_read_row_end=false, row_start = 0, pr ;
		var fileReader, fileReaderRun;
		fileReader = new FileReader();
		//文件读取后的处理
		fileReader.onload = function(e) {
			var chunk, chunk_i, chunk_res_i, chunk_len;
			chunk = e.target.result;
			if (is_read_row) {
				base.rowraw.parseLine(chunk.toString(), rawHeaders);
				end = start = row_start = end+2;
				is_read_row = false;
				if (is_read_row_end) {
					base.rowraw.parseHeaderCb('blob', rawHeaders, raw.slice((start+'\r\n'.length)), callback);
					fileReader = fileReaderRun = undefined ;
					size = p = start = end = rawHeaders = r = is_read_row = is_read_row_end = row_start = undefined ;
					return ;
				}
			}else{
				for (chunk_i = 0, chunk_len = chunk.length; chunk_i < chunk_len; chunk_i++) {
					//提取一个字符串
					chunk_res_i = chunk.charAt(chunk_i);
					pr = base.rowraw.parseChunk(chunk_res_i,p,'\r','\n');
					if (pr===1) {
						//解析一条
						is_read_row = true;
						end = end-(chunk_len-chunk_i)-1;
						start = row_start ;
						break;
					}else if (pr===0) {
						//终止
						is_read_row_end = true;
						is_read_row = true;
						end = end-(chunk_len-chunk_i)-1;
						start = row_start ;
						break;
					}
				}
				
			}
			chunk = chunk_i = chunk_res_i = chunk_len = undefined ;
			if (start<=size) {
				if (is_read_row!==true) {
					start = end ;
					end = start+12 ;
				}
				fileReaderRun();
			}
		};
		fileReader.onerror = function(e) {
			callback(e);
		};
		fileReaderRun = function fileReaderRun(){
			start = start||0;
			end = Math.min(end,size) ;
			if (start>size) {
				return true;
			}
			//开始读流
			try{
				fileReader.readAsText(raw.slice(start,end));
			}catch(e){
				throw Error('Failed to read blob');
			}
		};
		fileReaderRun();
	};
	base.rowraw.parseHeaderCb = function(bodytype, rawHeaders, raw, callback){
		var r, i, len ;
		r = {
			rawHeaders:rawHeaders,
			headers:{},
			body:raw,
			bodytype:bodytype,
			type:'unknow'
		};
		if (base.type(rawHeaders,'array')&&base.type(rawHeaders[0],'object')) {
			base.extend.call(r,true,r,rawHeaders.shift());
		}
		len = rawHeaders.length || 0 ;
		for (i = 0; i < len; i++) {
			r.headers[base.trim((rawHeaders[i]).toLowerCase()).replace(/\-/g,'_')] = base.trim((rawHeaders[++i]).toString()||'') ;
		}
		i = len = undefined;
		if (typeof callback === 'function') {
			callback(null, r);
			callback = r = undefined ;
		}else{
			callback = undefined;
			return r;
		}
	};
	base.rowraw.exp = base.inherit(null);
	base.rowraw.exp.start = /^[A-Z_]+(\/\d\.\d)? /;
	base.rowraw.exp.request = /^([A-Z_]+) (.+) ([A-Z]+)\/(\d)\.(\d)$/;
	base.rowraw.exp.status = /^([A-Z]+)\/(\d)\.(\d) (\d{3}) (.*)$/;
	base.rowraw.exp.header = /^([^: \t]+):[ \t]*((?:.*[^ \t])|)/;
	base.rowraw.exp.headerContinue = /^[ \t]+(.*[^ \t])/;
	base.rowraw.parseLine = function (line, headers) {
		var match, is_start_line, t, matchContinue;
		if (headers.length<1) {
			if (base.rowraw.exp.start.test(line)) {
				if ((match = base.rowraw.exp.status.exec(line)) && match[1]) {
					t = {};
					t.type = 'response';
					t.version = [(match[2]||0),(match[3]||0)];
					t.protocol = (match[1]||'unknow');
					t.status = (match[4]||0);
					t.statusText = (match[5]||'unknow');
					t.start_source = match[0]||'';
					headers.push(t);
				}else if ((match = base.rowraw.exp.request.exec(line)) && match[1]) {
					t = {};
					t.type = 'request';
					t.version = [(match[4]||0),(match[5]||0)];
					t.protocol = (match[3]||'unknow');
					t.method = (match[1]||0);
					t.path = (match[2]||'unknow');
					t.start_source = match[0]||'';
					headers.push(t);
				}
				is_start_line = true; t = undefined ;
			}
		}
		if (!is_start_line) {
			if ((match = base.rowraw.exp.header.exec(line)) && match[1]) { // skip empty string (malformed header)
				headers.push(match[1]);
				headers.push(match[2]);
			} else {
				matchContinue = base.rowraw.exp.headerContinue.exec(line);
				if (matchContinue && headers.length) {
					if (headers[headers.length - 1]) {
						headers[headers.length - 1] += ' ';
					}
					headers[headers.length - 1] += matchContinue[1];
				}
				matchContinue = undefined ;
			}
		}
	};
	base.nextTickQueue = [];
	base.nextTick = (function(){
		var fnc;
		if (typeof process != 'undefined' && typeof process.nextTick == 'function') {
			fnc = process.nextTick;
		}else{
			base.each('r webkitR mozR msR oR'.split(' '),function(index, prefixes) {
				if (base.type(fnc,'function')) {
					return false;
				}
				fnc = window[prefixes + 'equestAnimationFrame'];
			});
			fnc = (fnc && fnc.bind && fnc.bind(window)) || window.setImmediate;
			if (!base.type(fnc,'function')) {
				if (typeof window == 'undefined' || window.ActiveXObject || !window.postMessage) {
					fnc = function(f) {
						setTimeout(f,0);
					};
				} else {
					window.addEventListener('message', function() {
						var i = 0;
						while (i < base.nextTickQueue.length) {
							try {
								base.nextTickQueue[i++]();
							} catch (e) {
								base.nextTickQueue = base.nextTickQueue.slice(i);
								window.postMessage('nextTick!', '*');
								throw e;
							}
						}
						base.nextTickQueue.length = 0;
					}, true);
					fnc = function(fn) {
						if (!base.nextTickQueue.length) {
							window.postMessage('nextTick!', '*');
						}
						base.nextTickQueue.push(fn);
					};
				}
			}
		}
		return fnc;
	}());
	base.bindFnInit = function(){
		if (!Function.prototype.bind) {
			Function.prototype.bind = function(oThis) {
				if (typeof this !== "function") {
					throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
				}
				var aArgs = Array.prototype.slice.call(arguments, 1),
					fToBind = this,
					fNOP = function() {},
					fBound = function() {
						return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
					};
				fNOP.prototype = this.prototype;
				fBound.prototype = new fNOP();
				return fBound;
			};
		}
	};
	base.EventEmitter=(function(){
		// This constructor is used to store event handlers. Instantiating this is
		// faster than explicitly calling `Object.create(null)` to get a "clean" empty
		// object (tested with v8 v4.9).
		function EventHandlers() {}
		EventHandlers.prototype = Object.create(null);

		function EventEmitter() {
			EventEmitter.init.call(this);
		}

		// Backwards-compat with node 0.10.x
		EventEmitter.EventEmitter = EventEmitter;

		EventEmitter.usingDomains = false;

		EventEmitter.prototype._events = undefined;
		EventEmitter.prototype._maxListeners = undefined;

		// By default EventEmitters will print a warning if more than 10 listeners are
		// added to it. This is a useful default which helps finding memory leaks.
		var defaultMaxListeners = 10;

		Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
			enumerable: true,
			get: function() {
				return defaultMaxListeners;
			},
			set: function(arg) {
				// force global console to be compiled.
				// see https://github.com/nodejs/node/issues/4467
				defaultMaxListeners = arg;
			}
		});

		EventEmitter.init = function() {
			if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
				this._events = new EventHandlers();
				this._eventsCount = 0;
			}

			this._maxListeners = this._maxListeners || undefined;
		};

		// Obviously not all Emitters should be limited to 10. This function allows
		// that to be increased. Set to zero for unlimited.
		EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
			if (typeof n !== 'number' || n < 0 || isNaN(n))
				throw new TypeError('"n" argument must be a positive number');
			this._maxListeners = n;
			return this;
		};

		function $getMaxListeners(that) {
			if (that._maxListeners === undefined)
				return EventEmitter.defaultMaxListeners;
			return that._maxListeners;
		}

		EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
			return $getMaxListeners(this);
		};

		// These standalone emit* functions are used to optimize calling of event
		// handlers for fast cases because emit() itself often has a variable number of
		// arguments and can be deoptimized because of that. These functions always have
		// the same number of arguments and thus do not get deoptimized, so the code
		// inside them can execute faster.
		function emitNone(handler, isFn, self) {
			if (isFn)
				handler.call(self);
			else {
				var len = handler.length;
				var listeners = arrayClone(handler, len);
				for (var i = 0; i < len; ++i)
					listeners[i].call(self);
			}
		}
		function emitOne(handler, isFn, self, arg1) {
			if (isFn)
				handler.call(self, arg1);
			else {
				var len = handler.length;
				var listeners = arrayClone(handler, len);
				for (var i = 0; i < len; ++i)
					listeners[i].call(self, arg1);
			}
		}
		function emitTwo(handler, isFn, self, arg1, arg2) {
			if (isFn)
				handler.call(self, arg1, arg2);
			else {
				var len = handler.length;
				var listeners = arrayClone(handler, len);
				for (var i = 0; i < len; ++i)
					listeners[i].call(self, arg1, arg2);
			}
		}
		function emitThree(handler, isFn, self, arg1, arg2, arg3) {
			if (isFn)
				handler.call(self, arg1, arg2, arg3);
			else {
				var len = handler.length;
				var listeners = arrayClone(handler, len);
				for (var i = 0; i < len; ++i)
					listeners[i].call(self, arg1, arg2, arg3);
			}
		}

		function emitMany(handler, isFn, self, args) {
			if (isFn)
				handler.apply(self, args);
			else {
				var len = handler.length;
				var listeners = arrayClone(handler, len);
				for (var i = 0; i < len; ++i)
					listeners[i].apply(self, args);
			}
		}

		EventEmitter.prototype.emit = function emit(type) {
			var er, handler, len, args, i, events;
			var needDomainExit = false;
			var doError = (type === 'error');
			var _this = this._this||this ;

			events = this._events;
			if (events)
				doError = (doError && events.error == (void 0));
			else if (!doError)
				return false;


			// If there is no 'error' event listener then throw.
			if (doError) {
				er = arguments[1];
				if (er instanceof Error) {
					throw er; // Unhandled 'error' event
				} else {
					// At least give some kind of context to the user
					var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
					err.context = er;
					throw err;
				}
				return false;
			}

			handler = events[type];

			if (!handler)
				return false;

			var isFn = typeof handler === 'function';
			len = arguments.length;
			switch (len) {
				// fast cases
				case 1:
					emitNone(handler, isFn, _this);
					break;
				case 2:
					emitOne(handler, isFn, _this, arguments[1]);
					break;
				case 3:
					emitTwo(handler, isFn, _this, arguments[1], arguments[2]);
					break;
				case 4:
					emitThree(handler, isFn, _this, arguments[1], arguments[2], arguments[3]);
					break;
				// slower
				default:
					args = new Array(len - 1);
					for (i = 1; i < len; i++)
						args[i - 1] = arguments[i];
					emitMany(handler, isFn, _this, args);
			}

			return true;
		};

		function _addListener(target, type, listener, prepend) {
			var m;
			var events;
			var existing;

			if (typeof listener !== 'function')
				throw new TypeError('"listener" argument must be a function');

			events = target._events;
			if (!events) {
				events = target._events = new EventHandlers();
				target._eventsCount = 0;
			} else {
				// To avoid recursion in the case that type === "newListener"! Before
				// adding it to the listeners, first emit "newListener".
				if (events.newListener) {
					target.emit('newListener', type,
											listener.listener ? listener.listener : listener);

					// Re-assign `events` because a newListener handler could have caused the
					// this._events to be assigned to a new object
					events = target._events;
				}
				existing = events[type];
			}

			if (!existing) {
				// Optimize the case of one listener. Don't need the extra array object.
				existing = events[type] = listener;
				++target._eventsCount;
			} else {
				if (typeof existing === 'function') {
					// Adding the second element, need to change to array.
					existing = events[type] = prepend ? [listener, existing] :
																							[existing, listener];
				} else {
					// If we've already got an array, just append.
					if (prepend) {
						existing.unshift(listener);
					} else {
						existing.push(listener);
					}
				}

				// Check for listener leak
				if (!existing.warned) {
					m = $getMaxListeners(target);
					if (m && m > 0 && existing.length > m) {
						existing.warned = true;
						var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + type +' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit');
						w.name = 'MaxListenersExceededWarning';
						w.emitter = target;
						w.type = type;
						w.count = existing.length;
						process.emitWarning(w);
					}
				}
			}

			return target;
		}

		EventEmitter.prototype.addListener = function addListener(type, listener) {
			return _addListener(this, type, listener, false);
		};

		EventEmitter.prototype.on = EventEmitter.prototype.addListener;

		EventEmitter.prototype.prependListener =
				function prependListener(type, listener) {
					return _addListener(this, type, listener, true);
				};

		function _onceWrap(target, type, listener) {
			var fired = false;
			function g() {
				target.removeListener(type, g);
				if (!fired) {
					fired = true;
					listener.apply(target, arguments);
				}
			}
			g.listener = listener;
			return g;
		}

		EventEmitter.prototype.once = function once(type, listener) {
			if (typeof listener !== 'function')
				throw new TypeError('"listener" argument must be a function');
			this.on(type, _onceWrap(this, type, listener));
			return this;
		};

		EventEmitter.prototype.prependOnceListener =
				function prependOnceListener(type, listener) {
					if (typeof listener !== 'function')
						throw new TypeError('"listener" argument must be a function');
					this.prependListener(type, _onceWrap(this, type, listener));
					return this;
				};

		// emits a 'removeListener' event iff the listener was removed
		EventEmitter.prototype.removeListener =
				function removeListener(type, listener) {
					var list, events, position, i, originalListener;

					if (typeof listener !== 'function')
						throw new TypeError('"listener" argument must be a function');

					events = this._events;
					if (!events)
						return this;

					list = events[type];
					if (!list)
						return this;

					if (list === listener || (list.listener && list.listener === listener)) {
						if (--this._eventsCount === 0)
							this._events = new EventHandlers();
						else {
							delete events[type];
							if (events.removeListener)
								this.emit('removeListener', type, list.listener || listener);
						}
					} else if (typeof list !== 'function') {
						position = -1;

						for (i = list.length; i-- > 0;) {
							if (list[i] === listener ||
									(list[i].listener && list[i].listener === listener)) {
								originalListener = list[i].listener;
								position = i;
								break;
							}
						}

						if (position < 0)
							return this;

						if (list.length === 1) {
							list[0] = undefined;
							if (--this._eventsCount === 0) {
								this._events = new EventHandlers();
								return this;
							} else {
								delete events[type];
							}
						} else {
							spliceOne(list, position);
						}

						if (events.removeListener)
							this.emit('removeListener', type, originalListener || listener);
					}

					return this;
				};

		EventEmitter.prototype.removeAllListeners =
				function removeAllListeners(type) {
					var listeners, events;

					events = this._events;
					if (!events)
						return this;

					// not listening for removeListener, no need to emit
					if (!events.removeListener) {
						if (arguments.length === 0) {
							this._events = new EventHandlers();
							this._eventsCount = 0;
						} else if (events[type]) {
							if (--this._eventsCount === 0)
								this._events = new EventHandlers();
							else
								delete events[type];
						}
						return this;
					}

					// emit removeListener for all listeners on all events
					if (arguments.length === 0) {
						var keys = Object.keys(events);
						for (var i = 0, key; i < keys.length; ++i) {
							key = keys[i];
							if (key === 'removeListener') continue;
							this.removeAllListeners(key);
						}
						this.removeAllListeners('removeListener');
						this._events = new EventHandlers();
						this._eventsCount = 0;
						return this;
					}

					listeners = events[type];

					if (typeof listeners === 'function') {
						this.removeListener(type, listeners);
					} else if (listeners) {
						// LIFO order
						do {
							this.removeListener(type, listeners[listeners.length - 1]);
						} while (listeners[0]);
					}

					return this;
				};

		EventEmitter.prototype.listeners = function listeners(type) {
			var evlistener;
			var ret;
			var events = this._events;

			if (!events)
				ret = [];
			else {
				evlistener = events[type];
				if (!evlistener)
					ret = [];
				else if (typeof evlistener === 'function')
					ret = [evlistener.listener || evlistener];
				else
					ret = unwrapListeners(evlistener);
			}

			return ret;
		};

		EventEmitter.listenerCount = function(emitter, type) {
			if (typeof emitter.listenerCount === 'function') {
				return emitter.listenerCount(type);
			} else {
				return EventEmitter.prototype.listenerCount.call(emitter, type);
			}
		};

		EventEmitter.prototype.listenerCount = function listenerCount(type) {
			var events = this._events;

			if (events) {
				var evlistener = events[type];

				if (typeof evlistener === 'function') {
					return 1;
				} else if (evlistener) {
					return evlistener.length;
				}
			}

			return 0;
		};

		EventEmitter.prototype.eventNames = function eventNames() {
			return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
		};

		// About 1.5x faster than the two-arg version of Array#splice().
		function spliceOne(list, index) {
			for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
				list[i] = list[k];
			list.pop();
		}

		function arrayClone(arr, i) {
			var copy = new Array(i);
			while (i--)
				copy[i] = arr[i];
			return copy;
		}

		function unwrapListeners(arr) {
			var ret = new Array(arr.length);
			for (var i = 0; i < ret.length; ++i) {
				ret[i] = arr[i].listener || arr[i];
			}
			return ret;
		}
		return EventEmitter;
	}());

	/*************************队列模块--开始*************************/
	var q = base.inherit(null);
		/**
		 * [queue 通过push插入参数，并且初始化]
		 * @author: 桦 <yuchonghua@163.com>
		 * @DateTime 2016-06-11T18:28:41+0800
		 * @return   {[type]}                 [description]
		 */
		q.queue = function queue(){
			return (new q.Queue()).push(arguments);
		};
		q.Queue = function Queue(){
			if (this instanceof q.Queue) {
				base.EventEmitter.init.call(this);
				this.on('end',function(){
					if (base.type(this.destroy, 'function')) {
						this.destroy();
					}
				}.bind(this));
				//初始化基本参数
				q.fn.init.call(this);
				this.push(base.argsToArray(arguments));
			}else{
				return new Queue(base.argsToArray(arguments));
			}
		};
		q.Queue.prototype = q.e = base.inherit(null);
		q.e.push = function push(){
			//插入队列
			q.fn.push.call(this, base.argsToArray(arguments));
			//返回this好链式调用
			return this;
		};
		q.e.run = function run(){
			//如果队列不要存在或者已经在运行中就不在操作
			if ((!q.fn.isInit(this))||this._sys.run===true) {
				return false;
			}
			this.next();
			return this;
		};
		q.e.next = function next(i){
			//如果队列不要存在或者已经在运行中就不在操作
			if (!q.fn.isInit(this)) {
				return false;
			}
			if (i&&base.type(i, 'string')) {
				var index ;
				if ((index=base.array.index(i,this._sys.fns_name_index))===-1) {
					return false;
				}
				i = index;
				index = void 0;
				//解锁
				this._sys.lockRun = false;
			}else if((i!=void 0)&&base.type(i, 'number')){
				i = parseInt(i||0);
				//解锁
				this._sys.lockRun = false;
			}else{
				//要运行到的坐标
				i = i || this._sys.runIndex ||0 ;
			}
			return this.nextToTick(i);
		};
		q.e.nextToName = function nextToName(fn_name){
			return this.next(fn_name);
		};
		q.e.nextToTick = function nextToTick(end){
			var _this;
			if (!q.fn.isInit(this)) {
				return false;
			}
			_this = this ;
			base.nextTick(function(){
				if (_this) {
					_this.nextTo(end);
				}
				_this = end = void 0 ;
			});
			setTimeout(function(){
				if (_this) {
					_this.nextTo(end);
				}
				_this = end = void 0 ;
			},0);
		};
		q.e.nextTo = function nextTo(end){
			if (!q.fn.isInit(this)) {
				return ;
			}
			var i;
			if (!((end!=void 0)&&base.type(end, 'number')&&(end>-1))) {
				return false;
			}
			//更新时间
			this._sys.uptime = base.now();
			this._sys.fns_runed_index = [];
			this._sys.fns_runcall_index = [];
			for (i = 0; i < end; i++) {
				this._sys.fns_runed_index[i] = true ;
				this._sys.fns_runcall_index[i] = true ;
			}
			this._sys.runIndex = end ;
			//检查
			return q.fn.check.call(this);
		};
		q.e.setThis = function setThis(_this){
			if (!q.fn.isInit(this)) {
				return false;
			}
			this._this = _this;
			return this;
		};
		q.e.abort = function(){
			this.destroy();
		};
		q.e.destroy = function destroy(){
			if (!q.fn.isInit(this)) {
				return false;
			}
			delete this._sys.init;
			var _this = this;
			base.nextTick(function(){
				if (_this&&base.type(_this.__destroy, 'function')) {
					_this.__destroy();
				}
				_this = undefined ;
			});
			setTimeout(function(){
				if (_this&&base.type(_this.__destroy, 'function')) {
					_this.__destroy();
				}
				_this = undefined ;
			},0);
		};
		q.e.__destroy = function(){
			var key ;
			if (base.type(this._sys, 'object')) {
				for (key in this._sys) {
					if (!base.class2type.hasOwnProperty.apply(this._sys,[key])) continue;
					delete this._sys[key];
				}
			}
			for (key in this) {
				if (!base.class2type.hasOwnProperty.apply(this,[key])) continue;
				delete this[key];
			}
			key = undefined ;
		};
		//对象的状态改变成成功,同时传递一个参数用于后续成功后的操作
		q.e.resolve = function resolve(res){
			if (!q.fn.isInit(this)) {
				return false;
			}
			delete this._sys.init;
			this.emit('success',res);
		};
		//对象的状态改变为失败，同时将错误的信息传递到后续错误处理的操作
		q.e.reject = function reject(err, isNotEnd){
			if (!q.fn.isInit(this)) {
				return false;
			}
			if(err&&base.type(err, 'object')&&(!err.stack)){
				err.stack = new Error(err.message||err.error_id||'Unknow Error').stack;
			}else if(err&&(base.type(err, 'string')||base.type(err, 'number'))){
				var source_msg = err;
				err = new Error(err.toString()||'Unknow Error');
				err.source_msg = source_msg;
				err.error_id = err.message||'UNKNOW_ERROR';
				source_msg = void 0;
			}else if((!err)||(!err.stack)){
				err = new Error('Unknow Error');
			}
			err.error_id = err.error_id || 'UNKNOW_ERROR';
			try{
				this.emit('error',err);
				delete this._sys.init;
			}catch(e){
				if (!isNotEnd) {
					delete this._sys.init;
				}
				e._isErrorRejectOnce = true ;
				throw e;
			}
		};
		//触发或者绑定事件
		q.e.fail = q.e.error = function error(fn){
			if (base.type(fn, 'function')) {
				return this.onError(fn);
			}else{
				return this.reject(fn);
			}
		};
		//触发成功或者绑定事件
		q.e.success = function success(fn){
			if (base.type(fn, 'function')) {
				return this.onSuccess(fn);
			}else{
				return this.resolve(fn);
			}
		};
		//错误
		q.e.onError = function onError(fn){
			if (!q.fn.isInit(this)) {
				return false;
			}
			this.on('error',fn);
			return this;
		};
		//成功
		q.e.onSuccess = function onSuccess(fn){
			if (!q.fn.isInit(this)) {
				return false;
			}
			this.on('success',fn);
			return this;
		};
		//完成
		q.e.onEnd = function onEnd(fn){
			if (!q.fn.isInit(this)) {
				return false;
			}
			if (!this._sys.isBindEnd) {
				this._sys.isBindEnd = true ;
				this.on('success',function(res){
					this.emit('end', true, res);
				}.bind(this));
				this.on('error',function(err){
					this.emit('end', false, err);
				}.bind(this));
			}
			this.on('end',fn);
			return this;
		};
		q.e.onerror = q.e.onError;
		q.e.onsuccess = q.e.onSuccess;
		q.e.onend = q.e.onEnd;
		q.e.end = function(fn){
			if (base.type(fn, 'function')) {
				return this.onEnd(fn);
			}else{
				if (base.type(fn, 'object')&&fn.name&&fn.message&&fn.stack) {
					return this.reject(fn);
				}else{
					return this.resolve(fn);
				}
			}
		};
		base.extend.call(q.e, true, q.e, base.EventEmitter.prototype);
		q.fn = base.inherit(null);
		q.fn.init = function(){
			if (q.fn.isInit(this)) {
				return ;
			}
			//系统变量
			var s = this._sys = base.inherit(null);
			//定义已经初始化
			s.init = true ;
			//标记还没有运行
			s.run = false ;
			//当前运行到的下标
			s.runIndex = 0 ;
			//队列方法池
			s.fns = [];
			//方法名
			s.fns_name_index = [];
			//已经运行的下标
			s.fns_runed_index = [];
			//调用过
			s.fns_runcall_index = [];
			//更新时间
			s.uptime = base.now();
			//设置上下文
			this._this = this ;

		};
		q.fn.push = function(){
			if (!q.fn.isInit(this)) {
				return ;
			}
			base.each(base.argsToArray(arguments), function(index, fn) {
				var fn_name;
				if (!q.fn.isInit(this)) {
					return false;
				}
				if (fn&&base.type(fn, 'function')) {
					fn_name = fn.name||(void 0);
					if (!fn_name) {
						try{
							fn_name = fn.toString().replace(/function\s?/mi,"").split('(')[0];
						} catch ( e ) {
							fn_name = fn_name || (void 0);
						}
					}
					this._sys.fns[this._sys.fns.length] = fn ;
					this._sys.fns_name_index.push(base.trim(fn_name));
					fn_name = (void 0);
				}else if (fn&&base.type(fn, 'boolean')) {
					//加入数组
					this._sys.fns[this._sys.fns.length] = fn ;
					this._sys.fns_name_index.push((void 0));
					this._sys.fns_runed_index[index] = true;
				}else if (fn&&base.type(fn, 'array')) {
					q.fn.push.apply(this, fn);
				}
			}, true, this);
		};
		q.fn.check = function(){
			var _this;
			if (!q.fn.isInit(this)) {
				return false;
			}
			_this = this ;
			base.nextTick(function(){
				if (_this) {
					q.fn.checkRun.call(_this);
				}
				_this = undefined ;
			});
			setTimeout(function(){
				if (_this) {
					q.fn.checkRun.call(_this);
				}
				_this = undefined ;
			},0);
		};
		q.fn.checkRun = function(){
			if (!q.fn.isInit(this)) {
				return false;
			}
			if (this._sys.lockRun===true) {
				return;
			}
			var fn, isRun, i=this._sys.runIndex;
			while((fn = this._sys.fns[i++])!=(void 0)){
				isRun = this._sys.fns_runed_index[(i-1)]||false;
				if (fn===true) {
					this._sys.lockRun = true;
					this._sys.runIndex = i ;
					q.fn.checkNextTick(this);
					break;
				}else if(base.type(fn, 'function')){
					q.fn.runFn.call(this, (i-1), fn);
				}
			}
		};
		//运行方法
		q.fn.runFn = function(i, fn){
			var _this, runTime;
			if (!q.fn.isInit(this)) {
				return false;
			}
			if (!(fn&&base.type(fn, 'function'))) {
				return false;
			}
			if (this._sys.fns_runcall_index[i]===true) {
				return false;
			}
			this._sys.fns_runcall_index[i]=true;
			//存储上下文
			_this = this ;
			//开始时间
			runTime = this._sys.uptime;
			//运行方法
			try{
				fn.call(this._this, function next(toI){
					if (!_this) {
						//如果没有了上下文就不再执行，防止多次执行，或者执行多个状态
						return;
					}
					q.fn.checkNextByFnRunEnd.call(_this, i, runTime, toI);
					//清理上下文
					runTime  = _this = i = toI = void 0;
				},function resolve(res){
					//对象的状态改变成成功,同时传递一个参数用于后续成功后的操作
					if (!_this) {
						//如果没有了上下文就不再执行，防止多次执行，或者执行多个状态
						return;
					}
					_this.resolve(res);
					//清理上下文
					runTime  = _this = i = res = void 0;
				},function reject(err){
					//对象的状态改变为失败，同时将错误的信息传递到后续错误处理的操作
					if (!_this) {
						//如果没有了上下文就不再执行，防止多次执行，或者执行多个状态
						return;
					}
					_this.reject(err, true);
					//清理上下文
					runTime  = _this = i = err = void 0;
				});
			}catch(err){
				//对象的状态改变为失败，同时将错误的信息传递到后续错误处理的操作
				if (!_this) {
					//如果没有了上下文就不再执行，防止多次执行，或者执行多个状态
					return;
				}
				runTime  = i = void 0;
				if (err&&err._isErrorRejectOnce===true) {
					_this = void 0;
					throw err;
				}else{
					_this.reject(err);
				}
				_this = void 0;
				//清理上下文
			}
			//释放
			fn = void 0;
		};
		//检测是否继续
		q.fn.checkNext = function(toI){
			//判断是否继续
			if (!q.fn.isInit(this)) {
				return false;
			}
			var isRun, i = 0, state = true;
			for (i = 0; i < this._sys.runIndex; i++) {
				isRun = this._sys.fns_runed_index[i]||false;
				if (isRun!==true&&base.type(this._sys.fns[i], 'boolean')) {
					isRun = true ;
				}
				state = state&&isRun&&true||false;
			}
			if (state) {
				this._sys.lockRun = false;
				if(toI!=(void 0)){
					this.next(toI);
				}else{
					q.fn.check.call(this);
				}
			}
		};
		//检测是否继续
		q.fn.checkNextByFnRunEnd = function(i, runTime, toI){
			//判断是否要继续
			if (!q.fn.isInit(this)) {
				return false;
			}
			//过期
			if (runTime !== this._sys.uptime) {
				return ;
			}
			//标记
			this._sys.fns_runed_index[i] = true;
			//进入检查
			q.fn.checkNext.call(this, toI);
		};
		//检测是否继续
		q.fn.checkNextTick = function(Q){
			//判断是否继续
			if (!q.fn.isInit(Q)) {
				return false;
			}
			base.nextTick(function(){
				if (!q.fn.isInit(Q)) {
					return false;
				}
				q.fn.checkNext.call(Q);
				Q = void 0;
			});
		};
		q.fn.isInit = function(Q){
			if(Q&&Q._sys&&base.type(Q._sys, 'object')&&Q._sys.init===true){
				Q = void 0;
				return true ;
			}
			return false;
		};
	/*************************队列模块--结束*************************/

	base.queue = function() {
		return q.queue.apply(q.queue,arguments);
	};
	base.url = (function() {

			function _t() {
				return new RegExp(/(.*?)\.?([^\.]*?)\.?(com|net|org|biz|ws|in|me|co\.uk|co|org\.uk|ltd\.uk|plc\.uk|me\.uk|edu|mil|br\.com|cn\.com|eu\.com|hu\.com|no\.com|qc\.com|sa\.com|se\.com|se\.net|us\.com|uy\.com|ac|co\.ac|gv\.ac|or\.ac|ac\.ac|af|am|as|at|ac\.at|co\.at|gv\.at|or\.at|asn\.au|com\.au|edu\.au|org\.au|net\.au|id\.au|be|ac\.be|adm\.br|adv\.br|am\.br|arq\.br|art\.br|bio\.br|cng\.br|cnt\.br|com\.br|ecn\.br|eng\.br|esp\.br|etc\.br|eti\.br|fm\.br|fot\.br|fst\.br|g12\.br|gov\.br|ind\.br|inf\.br|jor\.br|lel\.br|med\.br|mil\.br|net\.br|nom\.br|ntr\.br|odo\.br|org\.br|ppg\.br|pro\.br|psc\.br|psi\.br|rec\.br|slg\.br|tmp\.br|tur\.br|tv\.br|vet\.br|zlg\.br|br|ab\.ca|bc\.ca|mb\.ca|nb\.ca|nf\.ca|ns\.ca|nt\.ca|on\.ca|pe\.ca|qc\.ca|sk\.ca|yk\.ca|ca|cc|ac\.cn|com\.cn|edu\.cn|gov\.cn|org\.cn|bj\.cn|sh\.cn|tj\.cn|cq\.cn|he\.cn|nm\.cn|ln\.cn|jl\.cn|hl\.cn|js\.cn|zj\.cn|ah\.cn|gd\.cn|gx\.cn|hi\.cn|sc\.cn|gz\.cn|yn\.cn|xz\.cn|sn\.cn|gs\.cn|qh\.cn|nx\.cn|xj\.cn|tw\.cn|hk\.cn|mo\.cn|cn|cx|cz|de|dk|fo|com\.ec|tm\.fr|com\.fr|asso\.fr|presse\.fr|fr|gf|gs|co\.il|net\.il|ac\.il|k12\.il|gov\.il|muni\.il|ac\.in|co\.in|org\.in|ernet\.in|gov\.in|net\.in|res\.in|is|it|ac\.jp|co\.jp|go\.jp|or\.jp|ne\.jp|ac\.kr|co\.kr|go\.kr|ne\.kr|nm\.kr|or\.kr|li|lt|lu|asso\.mc|tm\.mc|com\.mm|org\.mm|net\.mm|edu\.mm|gov\.mm|ms|nl|no|nu|pl|ro|org\.ro|store\.ro|tm\.ro|firm\.ro|www\.ro|arts\.ro|rec\.ro|info\.ro|nom\.ro|nt\.ro|se|si|com\.sg|org\.sg|net\.sg|gov\.sg|sk|st|tf|ac\.th|co\.th|go\.th|mi\.th|net\.th|or\.th|tm|to|com\.tr|edu\.tr|gov\.tr|k12\.tr|net\.tr|org\.tr|com\.tw|org\.tw|net\.tw|ac\.uk|uk\.com|uk\.net|gb\.com|gb\.net|vg|sh|kz|ch|info|ua|gov|name|pro|ie|hk|com\.hk|org\.hk|net\.hk|edu\.hk|us|tk|cd|by|ad|lv|eu\.lv|bz|es|jp|cl|ag|mobi|eu|co\.nz|org\.nz|net\.nz|maori\.nz|iwi\.nz|io|la|md|sc|sg|vc|tw|travel|my|se|tv|pt|com\.pt|edu\.pt|asia|fi|com\.ve|net\.ve|fi|org\.ve|web\.ve|info\.ve|co\.ve|tel|im|gr|ru|net\.ru|org\.ru|hr|com\.hr|ly|xyz|so)$/);
			}

			function _d(s) {
				return decodeURIComponent(s.replace(/\+/g, ' '));
			}

			function _i(arg, str) {
				var sptr = arg.charAt(0),
					split = str.split(sptr);

				if (sptr === arg) { return split; }

				arg = parseInt(arg.substring(1), 10);

				return split[arg < 0 ? split.length + arg : arg - 1];
			}

			function _f(arg, str) {
				var sptr = arg.charAt(0),
					split = str.split('&'),
					field = [],
					params = {},
					tmp = [],
					arg2 = arg.substring(1);

				for (var i = 0, ii = split.length; i < ii; i++) {
					field = split[i].match(/(.*?)=(.*)/);

					// TODO: regex should be able to handle this.
					if ( ! field) {
						field = [split[i], split[i], ''];
					}

					if (field[1].replace(/\s/g, '') !== '') {
						field[2] = _d(field[2] || '');

						// If we have a match just return it right away.
						if (arg2 === field[1]) { return field[2]; }

						// Check for array pattern.
						tmp = field[1].match(/(.*)\[([0-9]+)\]/);

						if (tmp) {
							params[tmp[1]] = params[tmp[1]] || [];
						
							params[tmp[1]][tmp[2]] = field[2];
						}
						else {
							params[field[1]] = field[2];
						}
					}
				}

				if (sptr === arg) { return params; }

				return params[arg2];
			}

			return function(arg, url) {
				var _l = {}, tmp, tmp2;

				if (arg === 'tld?') { return _t(); }

				url = url || (window.location||'').toString();

				if ( ! arg) { return url; }

				arg = arg.toString();

				if ((tmp = url.match(/^mailto:([^\/].+)/))) {
					_l.protocol = 'mailto';
					_l.email = tmp[1];
				}
				else {

					// Ignore Hashbangs.
					if ((tmp = url.match(/(.*?)\/#\!(.*)/))) {
						url = tmp[1] + tmp[2];
					}

					// Hash.
					if ((tmp = url.match(/(.*?)#(.*)/))) {
						_l.hash = tmp[2];
						url = tmp[1];
					}

					// Return hash parts.
					if (_l.hash && arg.match(/^#/)) { return _f(arg, _l.hash); }

					// Query
					if ((tmp = url.match(/(.*?)\?(.*)/))) {
						_l.query = tmp[2];
						url = tmp[1];
					}

					// Return query parts.
					if (_l.query && arg.match(/^\?/)) { return _f(arg, _l.query); }

					// Protocol.
					if ((tmp = url.match(/(.*?)\:?\/\/(.*)/))) {
						_l.protocol = tmp[1].toLowerCase();
						url = tmp[2];
					}

					// Path.
					if ((tmp = url.match(/(.*?)(\/.*)/))) {
						_l.path = tmp[2];
						url = tmp[1];
					}

					// Clean up path.
					_l.path = (_l.path || '').replace(/^([^\/])/, '/$1').replace(/\/$/, '');

					// Return path parts.
					if (arg.match(/^[\-0-9]+$/)) { arg = arg.replace(/^([^\/])/, '/$1'); }
					if (arg.match(/^\//)) { return _i(arg, _l.path.substring(1)); }

					// File.
					tmp = _i('/-1', _l.path.substring(1));
					
					if (tmp && (tmp = tmp.match(/(.*?)\.(.*)/))) {
						_l.file = tmp[0];
						_l.filename = tmp[1];
						_l.fileext = tmp[2];
					}

					// Port.
					if ((tmp = url.match(/(.*)\:([0-9]+)$/))) {
						_l.port = tmp[2];
						url = tmp[1];
					}

					// Auth.
					if ((tmp = url.match(/(.*?)@(.*)/))) {
						_l.auth = tmp[1];
						url = tmp[2];
					}

					// User and pass.
					if (_l.auth) {
						tmp = _l.auth.match(/(.*)\:(.*)/);

						_l.user = tmp ? tmp[1] : _l.auth;
						_l.pass = tmp ? tmp[2] : undefined;
					}

					// Hostname.
					_l.hostname = url.toLowerCase();

					// Return hostname parts.
					if (arg.charAt(0) === '.') { return _i(arg, _l.hostname); }

					// Domain, tld and sub domain.
					if (_t()) {
						tmp = _l.hostname.match(_t());

						if (tmp) {
							_l.tld = tmp[3];
							_l.domain = tmp[2] ? tmp[2] + '.' + tmp[3] : undefined;
							_l.sub = tmp[1] || undefined;
						}
					}

					// Set port and protocol defaults if not set.
					_l.port = _l.port || (_l.protocol === 'https' ? '443' : '80');
					_l.protocol = _l.protocol || (_l.port === '443' ? 'https' : 'http');
				}

				// Return arg.
				if (arg in _l) { return _l[arg]; }

				// Return everything.
				if (arg === '{}') { return _l; }

				// Default to undefined for no match.
				return undefined;
			};
		})();
	return base;
}(function(){
	var w ;
	try{
		w = window ;
	} catch ( e ) {
		try{
			w = global ;
		} catch ( e ) {
			throw 'find not global';
		}
	}
	return w;
}()));