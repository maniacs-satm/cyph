var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports === 'object' &&
               typeof exports.nodeName !== 'string') {
        factory(exports);
    } else {
        factory(root.libsodium = {});
    }
})(this, function (exports) {
    "use strict";
    var Module = exports;
var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};var moduleOverrides={};for(var key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var ENVIRONMENT_IS_WEB=typeof window==="object";var ENVIRONMENT_IS_WORKER=typeof importScripts==="function";var ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof require==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;var ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;if(ENVIRONMENT_IS_NODE){if(!Module["print"])Module["print"]=function print(x){process["stdout"].write(x+"\n")};if(!Module["printErr"])Module["printErr"]=function printErr(x){process["stderr"].write(x+"\n")};var nodeFS=require("fs");var nodePath=require("path");Module["read"]=function read(filename,binary){filename=nodePath["normalize"](filename);var ret=nodeFS["readFileSync"](filename);if(!ret&&filename!=nodePath["resolve"](filename)){filename=path.join(__dirname,"..","src",filename);ret=nodeFS["readFileSync"](filename)}if(ret&&!binary)ret=ret.toString();return ret};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};Module["load"]=function load(f){globalEval(read(f))};if(!Module["thisProgram"]){if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}else{Module["thisProgram"]="unknown-program"}}Module["arguments"]=process["argv"].slice(2);if(typeof module!=="undefined"){module["exports"]=Module}process["on"]("uncaughtException",(function(ex){if(!(ex instanceof ExitStatus)){throw ex}}));Module["inspect"]=(function(){return"[Emscripten Module object]"})}else if(ENVIRONMENT_IS_SHELL){if(!Module["print"])Module["print"]=print;if(typeof printErr!="undefined")Module["printErr"]=printErr;if(typeof read!="undefined"){Module["read"]=read}else{Module["read"]=function read(){throw"no read() available (jsc?)"}}Module["readBinary"]=function readBinary(f){if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}var data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){Module["read"]=function read(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof console!=="undefined"){if(!Module["print"])Module["print"]=function print(x){console.log(x)};if(!Module["printErr"])Module["printErr"]=function printErr(x){console.log(x)}}else{var TRY_USE_DUMP=false;if(!Module["print"])Module["print"]=TRY_USE_DUMP&&typeof dump!=="undefined"?(function(x){dump(x)}):(function(x){})}if(ENVIRONMENT_IS_WORKER){Module["load"]=importScripts}if(typeof Module["setWindowTitle"]==="undefined"){Module["setWindowTitle"]=(function(title){document.title=title})}}else{throw"Unknown runtime environment. Where are we?"}function globalEval(x){throw"NO_DYNAMIC_EXECUTION was set, cannot eval"}if(!Module["load"]&&Module["read"]){Module["load"]=function load(f){globalEval(Module["read"](f))}}if(!Module["print"]){Module["print"]=(function(){})}if(!Module["printErr"]){Module["printErr"]=Module["print"]}if(!Module["arguments"]){Module["arguments"]=[]}if(!Module["thisProgram"]){Module["thisProgram"]="./this.program"}Module.print=Module["print"];Module.printErr=Module["printErr"];Module["preRun"]=[];Module["postRun"]=[];for(var key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}var Runtime={setTempRet0:(function(value){tempRet0=value}),getTempRet0:(function(){return tempRet0}),stackSave:(function(){return STACKTOP}),stackRestore:(function(stackTop){STACKTOP=stackTop}),getNativeTypeSize:(function(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return Runtime.QUANTUM_SIZE}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8}else{return 0}}}}),getNativeFieldSize:(function(type){return Math.max(Runtime.getNativeTypeSize(type),Runtime.QUANTUM_SIZE)}),STACK_ALIGN:16,prepVararg:(function(ptr,type){if(type==="double"||type==="i64"){if(ptr&7){assert((ptr&7)===4);ptr+=4}}else{assert((ptr&3)===0)}return ptr}),getAlignSize:(function(type,size,vararg){if(!vararg&&(type=="i64"||type=="double"))return 8;if(!type)return Math.min(size,8);return Math.min(size||(type?Runtime.getNativeFieldSize(type):0),Runtime.QUANTUM_SIZE)}),dynCall:(function(sig,ptr,args){if(args&&args.length){if(!args.splice)args=Array.prototype.slice.call(args);args.splice(0,0,ptr);return Module["dynCall_"+sig].apply(null,args)}else{return Module["dynCall_"+sig].call(null,ptr)}}),functionPointers:[null,null,null,null,null,null,null,null],addFunction:(function(func){for(var i=0;i<Runtime.functionPointers.length;i++){if(!Runtime.functionPointers[i]){Runtime.functionPointers[i]=func;return 1*(1+i)}}throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."}),removeFunction:(function(index){Runtime.functionPointers[(index-1)/1]=null}),warnOnce:(function(text){if(!Runtime.warnOnce.shown)Runtime.warnOnce.shown={};if(!Runtime.warnOnce.shown[text]){Runtime.warnOnce.shown[text]=1;Module.printErr(text)}}),funcWrappers:{},getFuncWrapper:(function(func,sig){assert(sig);if(!Runtime.funcWrappers[sig]){Runtime.funcWrappers[sig]={}}var sigCache=Runtime.funcWrappers[sig];if(!sigCache[func]){sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func,arguments)}}return sigCache[func]}),getCompilerSetting:(function(name){throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work"}),stackAlloc:(function(size){var ret=STACKTOP;STACKTOP=STACKTOP+size|0;STACKTOP=STACKTOP+15&-16;return ret}),staticAlloc:(function(size){var ret=STATICTOP;STATICTOP=STATICTOP+size|0;STATICTOP=STATICTOP+15&-16;return ret}),dynamicAlloc:(function(size){var ret=DYNAMICTOP;DYNAMICTOP=DYNAMICTOP+size|0;DYNAMICTOP=DYNAMICTOP+15&-16;if(DYNAMICTOP>=TOTAL_MEMORY){var success=enlargeMemory();if(!success){DYNAMICTOP=ret;return 0}}return ret}),alignMemory:(function(size,quantum){var ret=size=Math.ceil(size/(quantum?quantum:16))*(quantum?quantum:16);return ret}),makeBigInt:(function(low,high,unsigned){var ret=unsigned?+(low>>>0)+ +(high>>>0)*+4294967296:+(low>>>0)+ +(high|0)*+4294967296;return ret}),GLOBAL_BASE:8,QUANTUM_SIZE:4,__dummy__:0};Module["Runtime"]=Runtime;var __THREW__=0;var ABORT=false;var EXITSTATUS=0;var undef=0;var tempValue,tempInt,tempBigInt,tempInt2,tempBigInt2,tempPair,tempBigIntI,tempBigIntR,tempBigIntS,tempBigIntP,tempBigIntD,tempDouble,tempFloat;var tempI64,tempI64b;var tempRet0,tempRet1,tempRet2,tempRet3,tempRet4,tempRet5,tempRet6,tempRet7,tempRet8,tempRet9;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}var globalScope=this;function getCFunc(ident){var func=Module["_"+ident];if(!func){abort("NO_DYNAMIC_EXECUTION was set, cannot eval - ccall/cwrap are not functional")}assert(func,"Cannot call unknown function "+ident+" (perhaps LLVM optimizations or closure removed it?)");return func}var cwrap,ccall;((function(){var JSfuncs={"stackSave":(function(){Runtime.stackSave()}),"stackRestore":(function(){Runtime.stackRestore()}),"arrayToC":(function(arr){var ret=Runtime.stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}),"stringToC":(function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){ret=Runtime.stackAlloc((str.length<<2)+1);writeStringToMemory(str,ret)}return ret})};var toC={"string":JSfuncs["stringToC"],"array":JSfuncs["arrayToC"]};ccall=function ccallFunc(ident,returnType,argTypes,args,opts){var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=Runtime.stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);if(returnType==="string")ret=Pointer_stringify(ret);if(stack!==0){if(opts&&opts.async){EmterpreterAsync.asyncFinalizers.push((function(){Runtime.stackRestore(stack)}));return}Runtime.stackRestore(stack)}return ret};cwrap=function cwrap(ident,returnType,argTypes){return(function(){return ccall(ident,returnType,argTypes,arguments)})}}))();Module["ccall"]=ccall;Module["cwrap"]=cwrap;function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble- +(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}Module["setValue"]=setValue;function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for setValue: "+type)}return null}Module["getValue"]=getValue;var ALLOC_NORMAL=0;var ALLOC_STACK=1;var ALLOC_STATIC=2;var ALLOC_DYNAMIC=3;var ALLOC_NONE=4;Module["ALLOC_NORMAL"]=ALLOC_NORMAL;Module["ALLOC_STACK"]=ALLOC_STACK;Module["ALLOC_STATIC"]=ALLOC_STATIC;Module["ALLOC_DYNAMIC"]=ALLOC_DYNAMIC;Module["ALLOC_NONE"]=ALLOC_NONE;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==="number"){zeroinit=true;size=slab}else{zeroinit=false;size=slab.length}var singleType=typeof types==="string"?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr}else{ret=[_malloc,Runtime.stackAlloc,Runtime.staticAlloc,Runtime.dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length))}if(zeroinit){var ptr=ret,stop;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0}stop=ret+size;while(ptr<stop){HEAP8[ptr++>>0]=0}return ret}if(singleType==="i8"){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret)}else{HEAPU8.set(new Uint8Array(slab),ret)}return ret}var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];if(typeof curr==="function"){curr=Runtime.getFunctionIndex(curr)}type=singleType||types[i];if(type===0){i++;continue}if(type=="i64")type="i32";setValue(ret+i,curr,type);if(previousType!==type){typeSize=Runtime.getNativeTypeSize(type);previousType=type}i+=typeSize}return ret}Module["allocate"]=allocate;function getMemory(size){if(!staticSealed)return Runtime.staticAlloc(size);if(typeof _sbrk!=="undefined"&&!_sbrk.called||!runtimeInitialized)return Runtime.dynamicAlloc(size);return _malloc(size)}Module["getMemory"]=getMemory;function Pointer_stringify(ptr,length){if(length===0||!ptr)return"";var hasUtf=0;var t;var i=0;while(1){t=HEAPU8[ptr+i>>0];hasUtf|=t;if(t==0&&!length)break;i++;if(length&&i==length)break}if(!length)length=i;var ret="";if(hasUtf<128){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK}return ret}return Module["UTF8ToString"](ptr)}Module["Pointer_stringify"]=Pointer_stringify;function AsciiToString(ptr){var str="";while(1){var ch=HEAP8[ptr++>>0];if(!ch)return str;str+=String.fromCharCode(ch)}}Module["AsciiToString"]=AsciiToString;function stringToAscii(str,outPtr){return writeAsciiToMemory(str,outPtr,false)}Module["stringToAscii"]=stringToAscii;function UTF8ArrayToString(u8Array,idx){var u0,u1,u2,u3,u4,u5;var str="";while(1){u0=u8Array[idx++];if(!u0)return str;if(!(u0&128)){str+=String.fromCharCode(u0);continue}u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u3=u8Array[idx++]&63;if((u0&248)==240){u0=(u0&7)<<18|u1<<12|u2<<6|u3}else{u4=u8Array[idx++]&63;if((u0&252)==248){u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4}else{u5=u8Array[idx++]&63;u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5}}}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}Module["UTF8ArrayToString"]=UTF8ArrayToString;function UTF8ToString(ptr){return UTF8ArrayToString(HEAPU8,ptr)}Module["UTF8ToString"]=UTF8ToString;function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=2097151){if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=67108863){if(outIdx+4>=endIdx)break;outU8Array[outIdx++]=248|u>>24;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else{if(outIdx+5>=endIdx)break;outU8Array[outIdx++]=252|u>>30;outU8Array[outIdx++]=128|u>>24&63;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}}outU8Array[outIdx]=0;return outIdx-startIdx}Module["stringToUTF8Array"]=stringToUTF8Array;function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}Module["stringToUTF8"]=stringToUTF8;function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){++len}else if(u<=2047){len+=2}else if(u<=65535){len+=3}else if(u<=2097151){len+=4}else if(u<=67108863){len+=5}else{len+=6}}return len}Module["lengthBytesUTF8"]=lengthBytesUTF8;function UTF16ToString(ptr){var i=0;var str="";while(1){var codeUnit=HEAP16[ptr+i*2>>1];if(codeUnit==0)return str;++i;str+=String.fromCharCode(codeUnit)}}Module["UTF16ToString"]=UTF16ToString;function stringToUTF16(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647}if(maxBytesToWrite<2)return 0;maxBytesToWrite-=2;var startPtr=outPtr;var numCharsToWrite=maxBytesToWrite<str.length*2?maxBytesToWrite/2:str.length;for(var i=0;i<numCharsToWrite;++i){var codeUnit=str.charCodeAt(i);HEAP16[outPtr>>1]=codeUnit;outPtr+=2}HEAP16[outPtr>>1]=0;return outPtr-startPtr}Module["stringToUTF16"]=stringToUTF16;function lengthBytesUTF16(str){return str.length*2}Module["lengthBytesUTF16"]=lengthBytesUTF16;function UTF32ToString(ptr){var i=0;var str="";while(1){var utf32=HEAP32[ptr+i*4>>2];if(utf32==0)return str;++i;if(utf32>=65536){var ch=utf32-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}else{str+=String.fromCharCode(utf32)}}}Module["UTF32ToString"]=UTF32ToString;function stringToUTF32(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647}if(maxBytesToWrite<4)return 0;var startPtr=outPtr;var endPtr=startPtr+maxBytesToWrite-4;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343){var trailSurrogate=str.charCodeAt(++i);codeUnit=65536+((codeUnit&1023)<<10)|trailSurrogate&1023}HEAP32[outPtr>>2]=codeUnit;outPtr+=4;if(outPtr+4>endPtr)break}HEAP32[outPtr>>2]=0;return outPtr-startPtr}Module["stringToUTF32"]=stringToUTF32;function lengthBytesUTF32(str){var len=0;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343)++i;len+=4}return len}Module["lengthBytesUTF32"]=lengthBytesUTF32;function demangle(func){var hasLibcxxabi=!!Module["___cxa_demangle"];if(hasLibcxxabi){try{var buf=_malloc(func.length);writeStringToMemory(func.substr(1),buf);var status=_malloc(4);var ret=Module["___cxa_demangle"](buf,0,0,status);if(getValue(status,"i32")===0&&ret){return Pointer_stringify(ret)}}catch(e){}finally{if(buf)_free(buf);if(status)_free(status);if(ret)_free(ret)}}var i=3;var basicTypes={"v":"void","b":"bool","c":"char","s":"short","i":"int","l":"long","f":"float","d":"double","w":"wchar_t","a":"signed char","h":"unsigned char","t":"unsigned short","j":"unsigned int","m":"unsigned long","x":"long long","y":"unsigned long long","z":"..."};var subs=[];var first=true;function dump(x){if(x)Module.print(x);Module.print(func);var pre="";for(var a=0;a<i;a++)pre+=" ";Module.print(pre+"^")}function parseNested(){i++;if(func[i]==="K")i++;var parts=[];while(func[i]!=="E"){if(func[i]==="S"){i++;var next=func.indexOf("_",i);var num=func.substring(i,next)||0;parts.push(subs[num]||"?");i=next+1;continue}if(func[i]==="C"){parts.push(parts[parts.length-1]);i+=2;continue}var size=parseInt(func.substr(i));var pre=size.toString().length;if(!size||!pre){i--;break}var curr=func.substr(i+pre,size);parts.push(curr);subs.push(curr);i+=pre+size}i++;return parts}function parse(rawList,limit,allowVoid){limit=limit||Infinity;var ret="",list=[];function flushList(){return"("+list.join(", ")+")"}var name;if(func[i]==="N"){name=parseNested().join("::");limit--;if(limit===0)return rawList?[name]:name}else{if(func[i]==="K"||first&&func[i]==="L")i++;var size=parseInt(func.substr(i));if(size){var pre=size.toString().length;name=func.substr(i+pre,size);i+=pre+size}}first=false;if(func[i]==="I"){i++;var iList=parse(true);var iRet=parse(true,1,true);ret+=iRet[0]+" "+name+"<"+iList.join(", ")+">"}else{ret=name}paramLoop:while(i<func.length&&limit-->0){var c=func[i++];if(c in basicTypes){list.push(basicTypes[c])}else{switch(c){case"P":list.push(parse(true,1,true)[0]+"*");break;case"R":list.push(parse(true,1,true)[0]+"&");break;case"L":{i++;var end=func.indexOf("E",i);var size=end-i;list.push(func.substr(i,size));i+=size+2;break};case"A":{var size=parseInt(func.substr(i));i+=size.toString().length;if(func[i]!=="_")throw"?";i++;list.push(parse(true,1,true)[0]+" ["+size+"]");break};case"E":break paramLoop;default:ret+="?"+c;break paramLoop}}}if(!allowVoid&&list.length===1&&list[0]==="void")list=[];if(rawList){if(ret){list.push(ret+"?")}return list}else{return ret+flushList()}}var parsed=func;try{if(func=="Object._main"||func=="_main"){return"main()"}if(typeof func==="number")func=Pointer_stringify(func);if(func[0]!=="_")return func;if(func[1]!=="_")return func;if(func[2]!=="Z")return func;switch(func[3]){case"n":return"operator new()";case"d":return"operator delete()"}parsed=parse()}catch(e){parsed+="?"}if(parsed.indexOf("?")>=0&&!hasLibcxxabi){Runtime.warnOnce("warning: a problem occurred in builtin C++ name demangling; build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling")}return parsed}function demangleAll(text){return text.replace(/__Z[\w\d_]+/g,(function(x){var y=demangle(x);return x===y?x:x+" ["+y+"]"}))}function jsStackTrace(){var err=new Error;if(!err.stack){try{throw new Error(0)}catch(e){err=e}if(!err.stack){return"(no stack trace available)"}}return err.stack.toString()}function stackTrace(){return demangleAll(jsStackTrace())}Module["stackTrace"]=stackTrace;var PAGE_SIZE=4096;function alignMemoryPage(x){if(x%4096>0){x+=4096-x%4096}return x}var HEAP;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;var STATIC_BASE=0,STATICTOP=0,staticSealed=false;var STACK_BASE=0,STACKTOP=0,STACK_MAX=0;var DYNAMIC_BASE=0,DYNAMICTOP=0;function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which adjusts the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function enlargeMemory(){abortOnCannotGrowMemory()}var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||131072;var totalMemory=64*1024;while(totalMemory<TOTAL_MEMORY||totalMemory<2*TOTAL_STACK){if(totalMemory<16*1024*1024){totalMemory*=2}else{totalMemory+=16*1024*1024}}if(totalMemory!==TOTAL_MEMORY){TOTAL_MEMORY=totalMemory}assert(typeof Int32Array!=="undefined"&&typeof Float64Array!=="undefined"&&!!(new Int32Array(1))["subarray"]&&!!(new Int32Array(1))["set"],"JS engine does not provide full typed array support");var buffer;buffer=new ArrayBuffer(TOTAL_MEMORY);HEAP8=new Int8Array(buffer);HEAP16=new Int16Array(buffer);HEAP32=new Int32Array(buffer);HEAPU8=new Uint8Array(buffer);HEAPU16=new Uint16Array(buffer);HEAPU32=new Uint32Array(buffer);HEAPF32=new Float32Array(buffer);HEAPF64=new Float64Array(buffer);HEAP32[0]=255;assert(HEAPU8[0]===255&&HEAPU8[3]===0,"Typed arrays 2 must be run on a little-endian system");Module["HEAP"]=HEAP;Module["buffer"]=buffer;Module["HEAP8"]=HEAP8;Module["HEAP16"]=HEAP16;Module["HEAP32"]=HEAP32;Module["HEAPU8"]=HEAPU8;Module["HEAPU16"]=HEAPU16;Module["HEAPU32"]=HEAPU32;Module["HEAPF32"]=HEAPF32;Module["HEAPF64"]=HEAPF64;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Runtime.dynCall("v",func)}else{Runtime.dynCall("vi",func,[callback.arg])}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}Module["addOnPreRun"]=addOnPreRun;function addOnInit(cb){__ATINIT__.unshift(cb)}Module["addOnInit"]=addOnInit;function addOnPreMain(cb){__ATMAIN__.unshift(cb)}Module["addOnPreMain"]=addOnPreMain;function addOnExit(cb){__ATEXIT__.unshift(cb)}Module["addOnExit"]=addOnExit;function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}Module["addOnPostRun"]=addOnPostRun;function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}Module["intArrayFromString"]=intArrayFromString;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}Module["intArrayToString"]=intArrayToString;function writeStringToMemory(string,buffer,dontAddNull){var array=intArrayFromString(string,dontAddNull);var i=0;while(i<array.length){var chr=array[i];HEAP8[buffer+i>>0]=chr;i=i+1}}Module["writeStringToMemory"]=writeStringToMemory;function writeArrayToMemory(array,buffer){for(var i=0;i<array.length;i++){HEAP8[buffer++>>0]=array[i]}}Module["writeArrayToMemory"]=writeArrayToMemory;function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer>>0]=0}Module["writeAsciiToMemory"]=writeAsciiToMemory;function unSign(value,bits,ignore){if(value>=0){return value}return bits<=32?2*Math.abs(1<<bits-1)+value:Math.pow(2,bits)+value}function reSign(value,bits,ignore){if(value<=0){return value}var half=bits<=32?Math.abs(1<<bits-1):Math.pow(2,bits-1);if(value>=half&&(bits<=32||value>half)){value=-2*half+value}return value}if(!Math["imul"]||Math["imul"](4294967295,5)!==-5)Math["imul"]=function imul(a,b){var ah=a>>>16;var al=a&65535;var bh=b>>>16;var bl=b&65535;return al*bl+(ah*bl+al*bh<<16)|0};Math.imul=Math["imul"];if(!Math["clz32"])Math["clz32"]=(function(x){x=x>>>0;for(var i=0;i<32;i++){if(x&1<<31-i)return i}return 32});Math.clz32=Math["clz32"];var Math_abs=Math.abs;var Math_cos=Math.cos;var Math_sin=Math.sin;var Math_tan=Math.tan;var Math_acos=Math.acos;var Math_asin=Math.asin;var Math_atan=Math.atan;var Math_atan2=Math.atan2;var Math_exp=Math.exp;var Math_log=Math.log;var Math_sqrt=Math.sqrt;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_pow=Math.pow;var Math_imul=Math.imul;var Math_fround=Math.fround;var Math_min=Math.min;var Math_clz32=Math.clz32;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function getUniqueRunDependency(id){return id}function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}Module["addRunDependency"]=addRunDependency;function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["removeRunDependency"]=removeRunDependency;Module["preloadedImages"]={};Module["preloadedAudios"]={};var memoryInitializer=null;var ASM_CONSTS=[(function(){{return Module.getRandomValue()}}),(function(){{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self,crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto,randomValuesStandard=(function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0});randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto"),randomValueNodeJS=(function(){var buf=crypto.randomBytes(4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0});randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}})];function _emscripten_asm_const_0(code){return ASM_CONSTS[code]()}STATIC_BASE=8;STATICTOP=STATIC_BASE+34176;__ATINIT__.push();allocate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,38,232,149,143,194,178,39,176,69,195,244,137,242,239,152,240,213,223,172,5,211,198,51,57,177,56,2,136,109,83,252,5,199,23,106,112,61,77,216,79,186,60,11,118,13,16,103,15,42,32,83,250,44,57,204,198,78,199,253,119,146,172,3,122,19,232,149,143,194,178,39,176,69,195,244,137,242,239,152,240,213,223,172,5,211,198,51,57,177,56,2,136,109,83,252,133,180,23,106,112,61,77,216,79,186,60,11,118,13,16,103,15,42,32,83,250,44,57,204,198,78,199,253,119,146,172,3,250,236,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,127,237,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,127,238,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,127,217,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,218,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,219,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,8,201,188,243,103,230,9,106,59,167,202,132,133,174,103,187,43,248,148,254,114,243,110,60,241,54,29,95,58,245,79,165,209,130,230,173,127,82,14,81,31,108,62,43,140,104,5,155,107,189,65,251,171,217,131,31,121,33,126,19,25,205,224,91,182,120,89,255,133,114,211,0,189,110,21,255,15,10,106,0,41,192,1,0,152,232,121,255,188,60,160,255,153,113,206,255,0,183,226,254,180,13,72,255,176,160,14,254,211,201,134,255,158,24,143,0,127,105,53,0,96,12,189,0,167,215,251,255,159,76,128,254,106,101,225,255,30,252,4,0,146,12,174,0,89,241,178,254,10,229,166,255,123,221,42,254,30,20,212,0,82,128,3,0,48,209,243,0,119,121,64,255,50,227,156,255,0,110,197,1,103,27,144,0,133,59,140,1,189,241,36,255,248,37,195,1,96,220,55,0,183,76,62,255,195,66,61,0,50,76,164,1,225,164,76,255,76,61,163,255,117,62,31,0,81,145,64,255,118,65,14,0,162,115,214,255,6,138,46,0,124,230,244,255,10,138,143,0,52,26,194,0,184,244,76,0,129,143,41,1,190,244,19,255,123,170,122,255,98,129,68,0,121,213,147,0,86,101,30,255,161,103,155,0,140,89,67,255,239,229,190,1,67,11,181,0,198,240,137,254,238,69,188,255,67,151,238,0,19,42,108,255,229,85,113,1,50,68,135,255,17,106,9,0,50,103,1,255,80,1,168,1,35,152,30,255,16,168,185,1,56,89,232,255,101,210,252,0,41,250,71,0,204,170,79,255,14,46,239,255,80,77,239,0,189,214,75,255,17,141,249,0,38,80,76,255,190,85,117,0,86,228,170,0,156,216,208,1,195,207,164,255,150,66,76,255,175,225,16,255,141,80,98,1,76,219,242,0,198,162,114,0,46,218,152,0,155,43,241,254,155,160,104,255,51,187,165,0,2,17,175,0,66,84,160,1,247,58,30,0,35,65,53,254,69,236,191,0,45,134,245,1,163,123,221,0,32,110,20,255,52,23,165,0,186,214,71,0,233,176,96,0,242,239,54,1,57,89,138,0,83,0,84,255,136,160,100,0,92,142,120,254,104,124,190,0,181,177,62,255,250,41,85,0,152,130,42,1,96,252,246,0,151,151,63,254,239,133,62,0,32,56,156,0,45,167,189,255,142,133,179,1,131,86,211,0,187,179,150,254,250,170,14,255,210,163,78,0,37,52,151,0,99,77,26,0,238,156,213,255,213,192,209,1,73,46,84,0,20,65,41,1,54,206,79,0,201,131,146,254,170,111,24,255,177,33,50,254,171,38,203,255,78,247,116,0,209,221,153,0,133,128,178,1,58,44,25,0,201,39,59,1,189,19,252,0,49,229,210,1,117,187,117,0,181,179,184,1,0,114,219,0,48,94,147,0,245,41,56,0,125,13,204,254,244,173,119,0,44,221,32,254,84,234,20,0,249,160,198,1,236,126,234,255,47,99,168,254,170,226,153,255,102,179,216,0,226,141,122,255,122,66,153,254,182,245,134,0,227,228,25,1,214,57,235,255,216,173,56,255,181,231,210,0,119,128,157,255,129,95,136,255,110,126,51,0,2,169,183,255,7,130,98,254,69,176,94,255,116,4,227,1,217,242,145,255,202,173,31,1,105,1,39,255,46,175,69,0,228,47,58,255,215,224,69,254,207,56,69,255,16,254,139,255,23,207,212,255,202,20,126,255,95,213,96,255,9,176,33,0,200,5,207,255,241,42,128,254,35,33,192,255,248,229,196,1,129,17,120,0,251,103,151,255,7,52,112,255,140,56,66,255,40,226,245,255,217,70,37,254,172,214,9,255,72,67,134,1,146,192,214,255,44,38,112,0,68,184,75,255,206,90,251,0,149,235,141,0,181,170,58,0,116,244,239,0,92,157,2,0,102,173,98,0,233,137,96,1,127,49,203,0,5,155,148,0,23,148,9,255,211,122,12,0,34,134,26,255,219,204,136,0,134,8,41,255,224,83,43,254,85,25,247,0,109,127,0,254,169,136,48,0,238,119,219,255,231,173,213,0,206,18,254,254,8,186,7,255,126,9,7,1,111,42,72,0,111,52,236,254,96,63,141,0,147,191,127,254,205,78,192,255,14,106,237,1,187,219,76,0,175,243,187,254,105,89,173,0,85,25,89,1,162,243,148,0,2,118,209,254,33,158,9,0,139,163,46,255,93,70,40,0,108,42,142,254,111,252,142,255,155,223,144,0,51,229,167,255,73,252,155,255,94,116,12,255,152,160,218,255,156,238,37,255,179,234,207,255,197,0,179,255,154,164,141,0,225,196,104,0,10,35,25,254,209,212,242,255,97,253,222,254,184,101,229,0,222,18,127,1,164,136,135,255,30,207,140,254,146,97,243,0,129,192,26,254,201,84,33,255,111,10,78,255,147,81,178,255,4,4,24,0,161,238,215,255,6,141,33,0,53,215,14,255,41,181,208,255,231,139,157,0,179,203,221,255,255,185,113,0,189,226,172,255,113,66,214,255,202,62,45,255,102,64,8,255,78,174,16,254,133,117,68,255,133,59,140,1,189,241,36,255,248,37,195,1,96,220,55,0,183,76,62,255,195,66,61,0,50,76,164,1,225,164,76,255,76,61,163,255,117,62,31,0,81,145,64,255,118,65,14,0,162,115,214,255,6,138,46,0,124,230,244,255,10,138,143,0,52,26,194,0,184,244,76,0,129,143,41,1,190,244,19,255,123,170,122,255,98,129,68,0,121,213,147,0,86,101,30,255,161,103,155,0,140,89,67,255,239,229,190,1,67,11,181,0,198,240,137,254,238,69,188,255,234,113,60,255,37,255,57,255,69,178,182,254,128,208,179,0,118,26,125,254,3,7,214,255,241,50,77,255,85,203,197,255,211,135,250,255,25,48,100,255,187,213,180,254,17,88,105,0,83,209,158,1,5,115,98,0,4,174,60,254,171,55,110,255,217,181,17,255,20,188,170,0,146,156,102,254,87,214,174,255,114,122,155,1,233,44,170,0,127,8,239,1,214,236,234,0,175,5,219,0,49,106,61,255,6,66,208,255,2,106,110,255,81,234,19,255,215,107,192,255,67,151,238,0,19,42,108,255,229,85,113,1,50,68,135,255,17,106,9,0,50,103,1,255,80,1,168,1,35,152,30,255,16,168,185,1,56,89,232,255,101,210,252,0,41,250,71,0,204,170,79,255,14,46,239,255,80,77,239,0,189,214,75,255,17,141,249,0,38,80,76,255,190,85,117,0,86,228,170,0,156,216,208,1,195,207,164,255,150,66,76,255,175,225,16,255,141,80,98,1,76,219,242,0,198,162,114,0,46,218,152,0,155,43,241,254,155,160,104,255,178,9,252,254,100,110,212,0,14,5,167,0,233,239,163,255,28,151,157,1,101,146,10,255,254,158,70,254,71,249,228,0,88,30,50,0,68,58,160,255,191,24,104,1,129,66,129,255,192,50,85,255,8,179,138,255,38,250,201,0,115,80,160,0,131,230,113,0,125,88,147,0,90,68,199,0,253,76,158,0,28,255,118,0,113,250,254,0,66,75,46,0,230,218,43,0,229,120,186,1,148,68,43,0,136,124,238,1,187,107,197,255,84,53,246,255,51,116,254,255,51,187,165,0,2,17,175,0,66,84,160,1,247,58,30,0,35,65,53,254,69,236,191,0,45,134,245,1,163,123,221,0,32,110,20,255,52,23,165,0,186,214,71,0,233,176,96,0,242,239,54,1,57,89,138,0,83,0,84,255,136,160,100,0,92,142,120,254,104,124,190,0,181,177,62,255,250,41,85,0,152,130,42,1,96,252,246,0,151,151,63,254,239,133,62,0,32,56,156,0,45,167,189,255,142,133,179,1,131,86,211,0,187,179,150,254,250,170,14,255,68,113,21,255,222,186,59,255,66,7,241,1,69,6,72,0,86,156,108,254,55,167,89,0,109,52,219,254,13,176,23,255,196,44,106,255,239,149,71,255,164,140,125,255,159,173,1,0,51,41,231,0,145,62,33,0,138,111,93,1,185,83,69,0,144,115,46,0,97,151,16,255,24,228,26,0,49,217,226,0,113,75,234,254,193,153,12,255,182,48,96,255,14,13,26,0,128,195,249,254,69,193,59,0,132,37,81,254,125,106,60,0,214,240,169,1,164,227,66,0,210,163,78,0,37,52,151,0,99,77,26,0,238,156,213,255,213,192,209,1,73,46,84,0,20,65,41,1,54,206,79,0,201,131,146,254,170,111,24,255,177,33,50,254,171,38,203,255,78,247,116,0,209,221,153,0,133,128,178,1,58,44,25,0,201,39,59,1,189,19,252,0,49,229,210,1,117,187,117,0,181,179,184,1,0,114,219,0,48,94,147,0,245,41,56,0,125,13,204,254,244,173,119,0,44,221,32,254,84,234,20,0,249,160,198,1,236,126,234,255,143,62,221,0,129,89,214,255,55,139,5,254,68,20,191,255,14,204,178,1,35,195,217,0,47,51,206,1,38,246,165,0,206,27,6,254,158,87,36,0,217,52,146,255,125,123,215,255,85,60,31,255,171,13,7,0,218,245,88,254,252,35,60,0,55,214,160,255,133,101,56,0,224,32,19,254,147,64,234,0,26,145,162,1,114,118,125,0,248,252,250,0,101,94,196,255,198,141,226,254,51,42,182,0,135,12,9,254,109,172,210,255,197,236,194,1,241,65,154,0,48,156,47,255,153,67,55,255,218,165,34,254,74,180,179,0,218,66,71,1,88,122,99,0,212,181,219,255,92,42,231,255,239,0,154,0,245,77,183,255,94,81,170,1,18,213,216,0,171,93,71,0,52,94,248,0,18,151,161,254,197,209,66,255,174,244,15,254,162,48,183,0,49,61,240,254,182,93,195,0,199,228,6,1,200,5,17,255,137,45,237,255,108,148,4,0,90,79,237,255,39,63,77,255,53,82,207,1,142,22,118,255,101,232,18,1,92,26,67,0,5,200,88,255,33,168,138,255,149,225,72,0,2,209,27,255,44,245,168,1,220,237,17,255,30,211,105,254,141,238,221,0,128,80,245,254,111,254,14,0,222,95,190,1,223,9,241,0,146,76,212,255,108,205,104,255,63,117,153,0,144,69,48,0,35,228,111,0,192,33,193,255,112,214,190,254,115,152,151,0,23,102,88,0,51,74,248,0,226,199,143,254,204,162,101,255,208,97,189,1,245,104,18,0,230,246,30,255,23,148,69,0,110,88,52,254,226,181,89,255,208,47,90,254,114,161,80,255,33,116,248,0,179,152,87,255,69,144,177,1,88,238,26,255,58,32,113,1,1,77,69,0,59,121,52,255,152,238,83,0,52,8,193,0,231,39,233,255,199,34,138,0,222,68,173,0,91,57,242,254,220,210,127,255,192,7,246,254,151,35,187,0,195,236,165,0,111,93,206,0,212,247,133,1,154,133,209,255,155,231,10,0,64,78,38,0,122,249,100,1,30,19,97,255,62,91,249,1,248,133,77,0,197,63,168,254,116,10,82,0,184,236,113,254,212,203,194,255,61,100,252,254,36,5,202,255,119,91,153,255,129,79,29,0,103,103,171,254,237,215,111,255,216,53,69,0,239,240,23,0,194,149,221,255,38,225,222,0,232,255,180,254,118,82,133,255,57,209,177,1,139,232,133,0,158,176,46,254,194,115,46,0,88,247,229,1,28,103,191,0,221,222,175,254,149,235,44,0,151,228,25,254,218,105,103,0,142,85,210,0,149,129,190,255,213,65,94,254,117,134,224,255,82,198,117,0,157,221,220,0,163,101,36,0,197,114,37,0,104,172,166,254,11,182,0,0,81,72,188,255,97,188,16,255,69,6,10,0,199,147,145,255,8,9,115,1,65,214,175,255,217,173,209,0,80,127,166,0,247,229,4,254,167,183,124,255,90,28,204,254,175,59,240,255,11,41,248,1,108,40,51,255,144,177,195,254,150,250,126,0,138,91,65,1,120,60,222,255,245,193,239,0,29,214,189,255,128,2,25,0,80,154,162,0,77,220,107,1,234,205,74,255,54,166,103,255,116,72,9,0,228,94,47,255,30,200,25,255,35,214,89,255,61,176,140,255,83,226,163,255,75,130,172,0,128,38,17,0,95,137,152,255,215,124,159,1,79,93,0,0,148,82,157,254,195,130,251,255,40,202,76,255,251,126,224,0,157,99,62,254,207,7,225,255,96,68,195,0,140,186,157,255,131,19,231,255,42,128,254,0,52,219,61,254,102,203,72,0,141,7,11,255,186,164,213,0,31,122,119,0,133,242,145,0,208,252,232,255,91,213,182,255,143,4,250,254,249,215,74,0,165,30,111,1,171,9,223,0,229,123,34,1,92,130,26,255,77,155,45,1,195,139,28,255,59,224,78,0,136,17,247,0,108,121,32,0,79,250,189,255,96,227,252,254,38,241,62,0,62,174,125,255,155,111,93,255,10,230,206,1,97,197,40,255,0,49,57,254,65,250,13,0,18,251,150,255,220,109,210,255,5,174,166,254,44,129,189,0,235,35,147,255,37,247,141,255,72,141,4,255,103,107,255,0,247,90,4,0,53,44,42,0,2,30,240,0,4,59,63,0,88,78,36,0,113,167,180,0,190,71,193,255,199,158,164,255,58,8,172,0,77,33,12,0,65,63,3,0,153,77,33,255,172,254,102,1,228,221,4,255,87,30,254,1,146,41,86,255,138,204,239,254,108,141,17,255,187,242,135,0,210,208,127,0,68,45,14,254,73,96,62,0,81,60,24,255,170,6,36,255,3,249,26,0,35,213,109,0,22,129,54,255,21,35,225,255,234,61,56,255,58,217,6,0,143,124,88,0,236,126,66,0,209,38,183,255,34,238,6,255,174,145,102,0,95,22,211,0,196,15,153,254,46,84,232,255,117,34,146,1,231,250,74,255,27,134,100,1,92,187,195,255,170,198,112,0,120,28,42,0,209,70,67,0,29,81,31,0,29,168,100,1,169,173,160,0,107,35,117,0,62,96,59,255,81,12,69,1,135,239,190,255,220,252,18,0,163,220,58,255,137,137,188,255,83,102,109,0,96,6,76,0,234,222,210,255,185,174,205,1,60,158,213,255,13,241,214,0,172,129,140,0,93,104,242,0,192,156,251,0,43,117,30,0,225,81,158,0,127,232,218,0,226,28,203,0,233,27,151,255,117,43,5,255,242,14,47,255,33,20,6,0,137,251,44,254,27,31,245,255,183,214,125,254,40,121,149,0,186,158,213,255,89,8,227,0,69,88,0,254,203,135,225,0,201,174,203,0,147,71,184,0,18,121,41,254,94,5,78,0,224,214,240,254,36,5,180,0,251,135,231,1,163,138,212,0,210,249,116,254,88,129,187,0,19,8,49,254,62,14,144,255,159,76,211,0,214,51,82,0,109,117,228,254,103,223,203,255,75,252,15,1,154,71,220,255,23,13,91,1,141,168,96,255,181,182,133,0,250,51,55,0,234,234,212,254,175,63,158,0,39,240,52,1,158,189,36,255,213,40,85,1,32,180,247,255,19,102,26,1,84,24,97,255,69,21,222,0,148,139,122,255,220,213,235,1,232,203,255,0,121,57,147,0,227,7,154,0,53,22,147,1,72,1,225,0,82,134,48,254,83,60,157,255,145,72,169,0,34,103,239,0,198,233,47,0,116,19,4,255,184,106,9,255,183,129,83,0,36,176,230,1,34,103,72,0,219,162,134,0,245,42,158,0,32,149,96,254,165,44,144,0,202,239,72,254,215,150,5,0,42,66,36,1,132,215,175,0,86,174,86,255,26,197,156,255,49,232,135,254,103,182,82,0,253,128,176,1,153,178,122,0,245,250,10,0,236,24,178,0,137,106,132,0,40,29,41,0,50,30,152,255,124,105,38,0,230,191,75,0,143,43,170,0,44,131,20,255,44,13,23,255,237,255,155,1,159,109,100,255,112,181,24,255,104,220,108,0,55,211,131,0,99,12,213,255,152,151,145,255,238,5,159,0,97,155,8,0,33,108,81,0,1,3,103,0,62,109,34,255,250,155,180,0,32,71,195,255,38,70,145,1,159,95,245,0,69,229,101,1,136,28,240,0,79,224,25,0,78,110,121,255,248,168,124,0,187,128,247,0,2,147,235,254,79,11,132,0,70,58,12,1,181,8,163,255,79,137,133,255,37,170,11,255,141,243,85,255,176,231,215,255,204,150,164,255,239,215,39,255,46,87,156,254,8,163,88,255,172,34,232,0,66,44,102,255,27,54,41,254,236,99,87,255,41,123,169,1,52,114,43,0,117,134,40,0,155,134,26,0,231,207,91,254,35,132,38,255,19,102,125,254,36,227,133,255,118,3,113,255,29,13,124,0,152,96,74,1,88,146,206,255,167,191,220,254,162,18,88,255,182,100,23,0,31,117,52,0,81,46,106,1,12,2,7,0,69,80,201,1,209,246,172,0,12,48,141,1,224,211,88,0,116,226,159,0,122,98,130,0,65,236,234,1,225,226,9,255,207,226,123,1,89,214,59,0,112,135,88,1,90,244,203,255,49,11,38,1,129,108,186,0,89,112,15,1,101,46,204,255,127,204,45,254,79,255,221,255,51,73,18,255,127,42,101,255,241,21,202,0,160,227,7,0,105,50,236,0,79,52,197,255,104,202,208,1,180,15,16,0,101,197,78,255,98,77,203,0,41,185,241,1,35,193,124,0,35,155,23,255,207,53,192,0,11,125,163,1,249,158,185,255,4,131,48,0,21,93,111,255,61,121,231,1,69,200,36,255,185,48,185,255,111,238,21,255,39,50,25,255,99,215,163,255,87,212,30,255,164,147,5,255,128,6,35,1,108,223,110,255,194,76,178,0,74,101,180,0,243,47,48,0,174,25,43,255,82,173,253,1,54,114,192,255,40,55,91,0,215,108,176,255,11,56,7,0,224,233,76,0,209,98,202,254,242,25,125,0,44,193,93,254,203,8,177,0,135,176,19,0,112,71,213,255,206,59,176,1,4,67,26,0,14,143,213,254,42,55,208,255,60,67,120,0,193,21,163,0,99,164,115,0,10,20,118,0,156,212,222,254,160,7,217,255,114,245,76,1,117,59,123,0,176,194,86,254,213,15,176,0,78,206,207,254,213,129,59,0,233,251,22,1,96,55,152,255,236,255,15,255,197,89,84,255,93,149,133,0,174,160,113,0,234,99,169,255,152,116,88,0,144,164,83,255,95,29,198,255,34,47,15,255,99,120,134,255,5,236,193,0,249,247,126,255,147,187,30,0,50,230,117,255,108,217,219,255,163,81,166,255,72,25,169,254,155,121,79,255,28,155,89,254,7,126,17,0,147,65,33,1,47,234,253,0,26,51,18,0,105,83,199,255,163,196,230,0,113,248,164,0,226,254,218,0,189,209,203,255,164,247,222,254,255,35,165,0,4,188,243,1,127,179,71,0,37,237,254,255,100,186,240,0,5,57,71,254,103,72,73,255,244,18,81,254,229,210,132,255,238,6,180,255,11,229,174,255,227,221,192,1,17,49,28,0,163,215,196,254,9,118,4,255,51,240,71,0,113,129,109,255,76,240,231,0,188,177,127,0,125,71,44,1,26,175,243,0,94,169,25,254,27,230,29,0,15,139,119,1,168,170,186,255,172,197,76,255,252,75,188,0,137,124,196,0,72,22,96,255,45,151,249,1,220,145,100,0,64,192,159,255,120,239,226,0,129,178,146,0,0,192,125,0,235,138,234,0,183,157,146,0,83,199,192,255,184,172,72,255,73,225,128,0,77,6,250,255,186,65,67,0,104,246,207,0,188,32,138,255,218,24,242,0,67,138,81,254,237,129,121,255,20,207,150,1,41,199,16,255,6,20,128,0,159,118,5,0,181,16,143,255,220,38,15,0,23,64,147,254,73,26,13,0,87,228,57,1,204,124,128,0,43,24,223,0,219,99,199,0,22,75,20,255,19,27,126,0,157,62,215,0,110,29,230,0,179,167,255,1,54,252,190,0,221,204,182,254,179,158,65,255,81,157,3,0,194,218,159,0,170,223,0,0,224,11,32,255,38,197,98,0,168,164,37,0,23,88,7,1,164,186,110,0,96,36,134,0,234,242,229,0,250,121,19,0,242,254,112,255,3,47,94,1,9,239,6,255,81,134,153,254,214,253,168,255,67,124,224,0,245,95,74,0,28,30,44,254,1,109,220,255,178,89,89,0,252,36,76,0,24,198,46,255,76,77,111,0,134,234,136,255,39,94,29,0,185,72,234,255,70,68,135,255,231,102,7,254,77,231,140,0,167,47,58,1,148,97,118,255,16,27,225,1,166,206,143,255,110,178,214,255,180,131,162,0,143,141,225,1,13,218,78,255,114,153,33,1,98,104,204,0,175,114,117,1,167,206,75,0,202,196,83,1,58,64,67,0,138,47,111,1,196,247,128,255,137,224,224,254,158,112,207,0,154,100,255,1,134,37,107,0,198,128,79,255,127,209,155,255,163,254,185,254,60,14,243,0,31,219,112,254,29,217,65,0,200,13,116,254,123,60,196,255,224,59,184,254,242,89,196,0,123,16,75,254,149,16,206,0,69,254,48,1,231,116,223,255,209,160,65,1,200,80,98,0,37,194,184,254,148,63,34,0,139,240,65,255,217,144,132,255,56,38,45,254,199,120,210,0,108,177,166,255,160,222,4,0,220,126,119,254,165,107,160,255,82,220,248,1,241,175,136,0,144,141,23,255,169,138,84,0,160,137,78,255,226,118,80,255,52,27,132,255,63,96,139,255,152,250,39,0,188,155,15,0,232,51,150,254,40,15,232,255,240,229,9,255,137,175,27,255,75,73,97,1,218,212,11,0,135,5,162,1,107,185,213,0,2,249,107,255,40,242,70,0,219,200,25,0,25,157,13,0,67,82,80,255,196,249,23,255,145,20,149,0,50,72,146,0,94,76,148,1,24,251,65,0,31,192,23,0,184,212,201,255,123,233,162,1,247,173,72,0,162,87,219,254,126,134,89,0,159,11,12,254,166,105,29,0,73,27,228,1,113,120,183,255,66,163,109,1,212,143,11,255,159,231,168,1,255,128,90,0,57,14,58,254,89,52,10,255,253,8,163,1,0,145,210,255,10,129,85,1,46,181,27,0,103,136,160,254,126,188,209,255,34,35,111,0,215,219,24,255,212,11,214,254,101,5,118,0,232,197,133,255,223,167,109,255,237,80,86,255,70,139,94,0,158,193,191,1,155,15,51,255,15,190,115,0,78,135,207,255,249,10,27,1,181,125,233,0,95,172,13,254,170,213,161,255,39,236,138,255,95,93,87,255,190,128,95,0,125,15,206,0,166,150,159,0,227,15,158,255,206,158,120,255,42,141,128,0,101,178,120,1,156,109,131,0,218,14,44,254,247,168,206,255,212,112,28,0,112,17,228,255,90,16,37,1,197,222,108,0,254,207,83,255,9,90,243,255,243,244,172,0,26,88,115,255,205,116,122,0,191,230,193,0,180,100,11,1,217,37,96,255,154,78,156,0,235,234,31,255,206,178,178,255,149,192,251,0,182,250,135,0,246,22,105,0,124,193,109,255,2,210,149,255,169,17,170,0,0,96,110,255,117,9,8,1,50,123,40,255,193,189,99,0,34,227,160,0,48,80,70,254,211,51,236,0,45,122,245,254,44,174,8,0,173,37,233,255,158,65,171,0,122,69,215,255,90,80,2,255,131,106,96,254,227,114,135,0,205,49,119,254,176,62,64,255,82,51,17,255,241,20,243,255,130,13,8,254,128,217,243,255,162,27,1,254,90,118,241,0,246,198,246,255,55,16,118,255,200,159,157,0,163,17,1,0,140,107,121,0,85,161,118,255,38,0,149,0,156,47,238,0,9,166,166,1,75,98,181,255,50,74,25,0,66,15,47,0,139,225,159,0,76,3,142,255,14,238,184,0,11,207,53,255,183,192,186,1,171,32,174,255,191,76,221,1,247,170,219,0,25,172,50,254,217,9,233,0,203,126,68,255,183,92,48,0,127,167,183,1,65,49,254,0,16,63,127,1,254,21,170,255,59,224,127,254,22,48,63,255,27,78,130,254,40,195,29,0,250,132,112,254,35,203,144,0,104,169,168,0,207,253,30,255,104,40,38,254,94,228,88,0,206,16,128,255,212,55,122,255,223,22,234,0,223,197,127,0,253,181,181,1,145,102,118,0,236,153,36,255,212,217,72,255,20,38,24,254,138,62,62,0,152,140,4,0,230,220,99,255,1,21,212,255,148,201,231,0,244,123,9,254,0,171,210,0,51,58,37,255,1,255,14,255,244,183,145,254,0,242,166,0,22,74,132,0,121,216,41,0,95,195,114,254,133,24,151,255,156,226,231,255,247,5,77,255,246,148,115,254,225,92,81,255,222,80,246,254,170,123,89,255,74,199,141,0,29,20,8,255,138,136,70,255,93,75,92,0,221,147,49,254,52,126,226,0,229,124,23,0,46,9,181,0,205,64,52,1,131,254,28,0,151,158,212,0,131,64,78,0,206,25,171,0,0,230,139,0,191,253,110,254,103,247,167,0,64,40,40,1,42,165,241,255,59,75,228,254,124,243,189,255,196,92,178,255,130,140,86,255,141,89,56,1,147,198,5,255,203,248,158,254,144,162,141,0,11,172,226,0,130,42,21,255,1,167,143,255,144,36,36,255,48,88,164,254,168,170,220,0,98,71,214,0,91,208,79,0,159,76,201,1,166,42,214,255,69,255,0,255,6,128,125,255,190,1,140,0,146,83,218,255,215,238,72,1,122,127,53,0,189,116,165,255,84,8,66,255,214,3,208,255,213,110,133,0,195,168,44,1,158,231,69,0,162,64,200,254,91,58,104,0,182,58,187,254,249,228,136,0,203,134,76,254,99,221,233,0,75,254,214,254,80,69,154,0,64,152,248,254,236,136,202,255,157,105,153,254,149,175,20,0,22,35,19,255,124,121,233,0,186,250,198,254,132,229,139,0,137,80,174,255,165,125,68,0,144,202,148,254,235,239,248,0,135,184,118,0,101,94,17,255,122,72,70,254,69,130,146,0,127,222,248,1,69,127,118,255,30,82,215,254,188,74,19,255,229,167,194,254,117,25,66,255,65,234,56,254,213,22,156,0,151,59,93,254,45,28,27,255,186,126,164,255,32,6,239,0,127,114,99,1,219,52,2,255,99,96,166,254,62,190,126,255,108,222,168,1,75,226,174,0,230,226,199,0,60,117,218,255,252,248,20,1,214,188,204,0,31,194,134,254,123,69,192,255,169,173,36,254,55,98,91,0,223,42,102,254,137,1,102,0,157,90,25,0,239,122,64,255,252,6,233,0,7,54,20,255,82,116,174,0,135,37,54,255,15,186,125,0,227,112,175,255,100,180,225,255,42,237,244,255,244,173,226,254,248,18,33,0,171,99,150,255,74,235,50,255,117,82,32,254,106,168,237,0,207,109,208,1,228,9,186,0,135,60,169,254,179,92,143,0,244,170,104,255,235,45,124,255,70,99,186,0,117,137,183,0,224,31,215,0,40,9,100,0,26,16,95,1,68,217,87,0,8,151,20,255,26,100,58,255,176,165,203,1,52,118,70,0,7,32,254,254,244,254,245,255,167,144,194,255,125,113,23,255,176,121,181,0,136,84,209,0,138,6,30,255,89,48,28,0,33,155,14,255,25,240,154,0,141,205,109,1,70,115,62,255,20,40,107,254,138,154,199,255,94,223,226,255,157,171,38,0,163,177,25,254,45,118,3,255,14,222,23,1,209,190,81,255,118,123,232,1,13,213,101,255,123,55,123,254,27,246,165,0,50,99,76,255,140,214,32,255,97,65,67,255,24,12,28,0,174,86,78,1,64,247,96,0,160,135,67,0,66,55,243,255,147,204,96,255,26,6,33,255,98,51,83,1,153,213,208,255,2,184,54,255,25,218,11,0,49,67,246,254,18,149,72,255,13,25,72,0,42,79,214,0,42,4,38,1,27,139,144,255,149,187,23,0,18,164,132,0,245,84,184,254,120,198,104,255,126,218,96,0,56,117,234,255,13,29,214,254,68,47,10,255,167,154,132,254,152,38,198,0,66,178,89,255,200,46,171,255,13,99,83,255,210,187,253,255,170,45,42,1,138,209,124,0,214,162,141,0,12,230,156,0,102,36,112,254,3,147,67,0,52,215,123,255,233,171,54,255,98,137,62,0,247,218,39,255,231,218,236,0,247,191,127,0,195,146,84,0,165,176,92,255,19,212,94,255,17,74,227,0,88,40,153,1,198,147,1,255,206,67,245,254,240,3,218,255,61,141,213,255,97,183,106,0,195,232,235,254,95,86,154,0,209,48,205,254,118,209,241,255,240,120,223,1,213,29,159,0,163,127,147,255,13,218,93,0,85,24,68,254,70,20,80,255,189,5,140,1,82,97,254,255,99,99,191,255,132,84,133,255,107,218,116,255,112,122,46,0,105,17,32,0,194,160,63,255,68,222,39,1,216,253,92,0,177,105,205,255,149,201,195,0,42,225,11,255,40,162,115,0,9,7,81,0,165,218,219,0,180,22,0,254,29,146,252,255,146,207,225,1,180,135,96,0,31,163,112,0,177,11,219,255,133,12,193,254,43,78,50,0,65,113,121,1,59,217,6,255,110,94,24,1,112,172,111,0,7,15,96,0,36,85,123,0,71,150,21,255,208,73,188,0,192,11,167,1,213,245,34,0,9,230,92,0,162,142,39,255,215,90,27,0,98,97,89,0,94,79,211,0,90,157,240,0,95,220,126,1,102,176,226,0,36,30,224,254,35,31,127,0,231,232,115,1,85,83,130,0,210,73,245,255,47,143,114,255,68,65,197,0,59,72,62,255,183,133,173,254,93,121,118,255,59,177,81,255,234,69,173,255,205,128,177,0,220,244,51,0,26,244,209,1,73,222,77,255,163,8,96,254,150,149,211,0,158,254,203,1,54,127,139,0,161,224,59,0,4,109,22,255,222,42,45,255,208,146,102,255,236,142,187,0,50,205,245,255,10,74,89,254,48,79,142,0,222,76,130,255,30,166,63,0,236,12,13,255,49,184,244,0,187,113,102,0,218,101,253,0,153,57,182,254,32,150,42,0,25,198,146,1,237,241,56,0,140,68,5,0,91,164,172,255,78,145,186,254,67,52,205,0,219,207,129,1,109,115,17,0,54,143,58,1,21,248,120,255,179,255,30,0,193,236,66,255,1,255,7,255,253,192,48,255,19,69,217,1,3,214,0,255,64,101,146,1,223,125,35,255,235,73,179,255,249,167,226,0,225,175,10,1,97,162,58,0,106,112,171,1,84,172,5,255,133,140,178,255,134,245,142,0,97,90,125,255,186,203,185,255,223,77,23,255,192,92,106,0,15,198,115,255,217,152,248,0,171,178,120,255,228,134,53,0,176,54,193,1,250,251,53,0,213,10,100,1,34,199,106,0,151,31,244,254,172,224,87,255,14,237,23,255,253,85,26,255,127,39,116,255,172,104,100,0,251,14,70,255,212,208,138,255,253,211,250,0,176,49,165,0,15,76,123,255,37,218,160,255,92,135,16,1,10,126,114,255,70,5,224,255,247,249,141,0,68,20,60,1,241,210,189,255,195,217,187,1,151,3,113,0,151,92,174,0,231,62,178,255,219,183,225,0,23,23,33,255,205,181,80,0,57,184,248,255,67,180,1,255,90,123,93,255,39,0,162,255,96,248,52,255,84,66,140,0,34,127,228,255,194,138,7,1,166,110,188,0,21,17,155,1,154,190,198,255,214,80,59,255,18,7,143,0,72,29,226,1,199,217,249,0,232,161,71,1,149,190,201,0,217,175,95,254,113,147,67,255,138,143,199,255,127,204,1,0,29,182,83,1,206,230,155,255,186,204,60,0,10,125,85,255,232,96,25,255,255,89,247,255,213,254,175,1,232,193,81,0,28,43,156,254,12,69,8,0,147,24,248,0,18,198,49,0,134,60,35,0,118,246,18,255,49,88,254,254,228,21,186,255,182,65,112,1,219,22,1,255,22,126,52,255,189,53,49,255,112,25,143,0,38,127,55,255,226,101,163,254,208,133,61,255,137,69,174,1,190,118,145,255,60,98,219,255,217,13,245,255,250,136,10,0,84,254,226,0,201,31,125,1,240,51,251,255,31,131,130,255,2,138,50,255,215,215,177,1,223,12,238,255,252,149,56,255,124,91,68,255,72,126,170,254,119,255,100,0,130,135,232,255,14,79,178,0,250,131,197,0,138,198,208,0,121,216,139,254,119,18,36,255,29,193,122,0,16,42,45,255,213,240,235,1,230,190,169,255,198,35,228,254,110,173,72,0,214,221,241,255,56,148,135,0,192,117,78,254,141,93,207,255,143,65,149,0,21,18,98,255,95,44,244,1,106,191,77,0,254,85,8,254,214,110,176,255,73,173,19,254,160,196,199,255,237,90,144,0,193,172,113,255,200,155,136,254,228,90,221,0,137,49,74,1,164,221,215,255,209,189,5,255,105,236,55,255,42,31,129,1,193,255,236,0,46,217,60,0,138,88,187,255,226,82,236,255,81,69,151,255,142,190,16,1,13,134,8,0,127,122,48,255,81,64,156,0,171,243,139,0,237,35,246,0,122,143,193,254,212,122,146,0,95,41,255,1,87,132,77,0,4,212,31,0,17,31,78,0,39,45,173,254,24,142,217,255,95,9,6,255,227,83,6,0,98,59,130,254,62,30,33,0,8,115,211,1,162,97,128,255,7,184,23,254,116,28,168,255,248,138,151,255,98,244,240,0,186,118,130,0,114,248,235,255,105,173,200,1,160,124,71,255,94,36,164,1,175,65,146,255,238,241,170,254,202,198,197,0,228,71,138,254,45,246,109,255,194,52,158,0,133,187,176,0,83,252,154,254,89,189,221,255,170,73,252,0,148,58,125,0,36,68,51,254,42,69,177,255,168,76,86,255,38,100,204,255,38,53,35,0,175,19,97,0,225,238,253,255,81,81,135,0,210,27,255,254,235,73,107,0,8,207,115,0,82,127,136,0,84,99,21,254,207,19,136,0,100,164,101,0,80,208,77,255,132,207,237,255,15,3,15,255,33,166,110,0,156,95,85,255,37,185,111,1,150,106,35,255,166,151,76,0,114,87,135,255,159,194,64,0,12,122,31,255,232,7,101,254,173,119,98,0,154,71,220,254,191,57,53,255,168,232,160,255,224,32,99,255,218,156,165,0,151,153,163,0,217,13,148,1,197,113,89,0,149,28,161,254,207,23,30,0,105,132,227,255,54,230,94,255,133,173,204,255,92,183,157,255,88,144,252,254,102,33,90,0,159,97,3,0,181,218,155,255,240,114,119,0,106,214,53,255,165,190,115,1,152,91,225,255,88,106,44,255,208,61,113,0,151,52,124,0,191,27,156,255,110,54,236,1,14,30,166,255,39,127,207,1,229,199,28,0,188,228,188,254,100,157,235,0,246,218,183,1,107,22,193,255,206,160,95,0,76,239,147,0,207,161,117,0,51,166,2,255,52,117,10,254,73,56,227,255,152,193,225,0,132,94,136,255,101,191,209,0,32,107,229,255,198,43,180,1,100,210,118,0,114,67,153,255,23,88,26,255,89,154,92,1,220,120,140,255,144,114,207,255,252,115,250,255,34,206,72,0,138,133,127,255,8,178,124,1,87,75,97,0,15,229,92,254,240,67,131,255,118,123,227,254,146,120,104,255,145,213,255,1,129,187,70,255,219,119,54,0,1,19,173,0,45,150,148,1,248,83,72,0,203,233,169,1,142,107,56,0,247,249,38,1,45,242,80,255,30,233,103,0,96,82,70,0,23,201,111,0,81,39,30,255,161,183,78,255,194,234,33,255,68,227,140,254,216,206,116,0,70,27,235,255,104,144,79,0,164,230,93,254,214,135,156,0,154,187,242,254,188,20,131,255,36,109,174,0,159,112,241,0,5,110,149,1,36,165,218,0,166,29,19,1,178,46,73,0,93,43,32,254,248,189,237,0,102,155,141,0,201,93,195,255,241,139,253,255,15,111,98,255,108,65,163,254,155,79,190,255,73,174,193,254,246,40,48,255,107,88,11,254,202,97,85,255,253,204,18,255,113,242,66,0,110,160,194,254,208,18,186,0,81,21,60,0,188,104,167,255,124,166,97,254,210,133,142,0,56,242,137,254,41,111,130,0,111,151,58,1,111,213,141,255,183,172,241,255,38,6,196,255,185,7,123,255,46,11,246,0,245,105,119,1,15,2,161,255,8,206,45,255,18,202,74,255,83,124,115,1,212,141,157,0,83,8,209,254,139,15,232,255,172,54,173,254,50,247,132,0,214,189,213,0,144,184,105,0,223,254,248,0,255,147,240,255,23,188,72,0,7,51,54,0,188,25,180,254,220,180,0,255,83,160,20,0,163,189,243,255,58,209,194,255,87,73,60,0,106,24,49,0,245,249,220,0,22,173,167,0,118,11,195,255,19,126,237,0,110,159,37,255,59,82,47,0,180,187,86,0,188,148,208,1,100,37,133,255,7,112,193,0,129,188,156,255,84,106,129,255,133,225,202,0,14,236,111,255,40,20,101,0,172,172,49,254,51,54,74,255,251,185,184,255,93,155,224,255,180,249,224,1,230,178,146,0,72,57,54,254,178,62,184,0,119,205,72,0,185,239,253,255,61,15,218,0,196,67,56,255,234,32,171,1,46,219,228,0,208,108,234,255,20,63,232,255,165,53,199,1,133,228,5,255,52,205,107,0,74,238,140,255,150,156,219,254,239,172,178,255,251,189,223,254,32,142,211,255,218,15,138,1,241,196,80,0,28,36,98,254,22,234,199,0,61,237,220,255,246,57,37,0,142,17,142,255,157,62,26,0,43,238,95,254,3,217,6,255,213,25,240,1,39,220,174,255,154,205,48,254,19,13,192,255,244,34,54,254,140,16,155,0,240,181,5,254,155,193,60,0,166,128,4,255,36,145,56,255,150,240,219,0,120,51,145,0,82,153,42,1,140,236,146,0,107,92,248,1,189,10,3,0,63,136,242,0,211,39,24,0,19,202,161,1,173,27,186,255,210,204,239,254,41,209,162,255,182,254,159,255,172,116,52,0,195,103,222,254,205,69,59,0,53,22,41,1,218,48,194,0,80,210,242,0,210,188,207,0,187,161,161,254,216,17,1,0,136,225,113,0,250,184,63,0,223,30,98,254,77,168,162,0,59,53,175,0,19,201,10,255,139,224,194,0,147,193,154,255,212,189,12,254,1,200,174,255,50,133,113,1,94,179,90,0,173,182,135,0,94,177,113,0,43,89,215,255,136,252,106,255,123,134,83,254,5,245,66,255,82,49,39,1,220,2,224,0,97,129,177,0,77,59,89,0,61,29,155,1,203,171,220,255,92,78,139,0,145,33,181,255,169,24,141,1,55,150,179,0,139,60,80,255,218,39,97,0,2,147,107,255,60,248,72,0,173,230,47,1,6,83,182,255,16,105,162,254,137,212,81,255,180,184,134,1,39,222,164,255,221,105,251,1,239,112,125,0,63,7,97,0,63,104,227,255,148,58,12,0,90,60,224,255,84,212,252,0,79,215,168,0,248,221,199,1,115,121,1,0,36,172,120,0,32,162,187,255,57,107,49,255,147,42,21,0,106,198,43,1,57,74,87,0,126,203,81,255,129,135,195,0,140,31,177,0,221,139,194,0,3,222,215,0,131,68,231,0,177,86,178,254,124,151,180,0,184,124,38,1,70,163,17,0,249,251,181,1,42,55,227,0,226,161,44,0,23,236,110,0,51,149,142,1,93,5,236,0,218,183,106,254,67,24,77,0,40,245,209,255,222,121,153,0,165,57,30,0,83,125,60,0,70,38,82,1,229,6,188,0,109,222,157,255,55,118,63,255,205,151,186,0,227,33,149,255,254,176,246,1,227,177,227,0,34,106,163,254,176,43,79,0,106,95,78,1,185,241,122,255,185,14,61,0,36,1,202,0,13,178,162,255,247,11,132,0,161,230,92,1,65,1,185,255,212,50,165,1,141,146,64,255,158,242,218,0,21,164,125,0,213,139,122,1,67,71,87,0,203,158,178,1,151,92,43,0,152,111,5,255,39,3,239,255,217,255,250,255,176,63,71,255,74,245,77,1,250,174,18,255,34,49,227,255,246,46,251,255,154,35,48,1,125,157,61,255,106,36,78,255,97,236,153,0,136,187,120,255,113,134,171,255,19,213,217,254,216,94,209,255,252,5,61,0,94,3,202,0,3,26,183,255,64,191,43,255,30,23,21,0,129,141,77,255,102,120,7,1,194,76,140,0,188,175,52,255,17,81,148,0,232,86,55,1,225,48,172,0,134,42,42,255,238,50,47,0,169,18,254,0,20,147,87,255,14,195,239,255,69,247,23,0,238,229,128,255,177,49,112,0,168,98,251,255,121,71,248,0,243,8,145,254,246,227,153,255,219,169,177,254,251,139,165,255,12,163,185,255,164,40,171,255,153,159,27,254,243,109,91,255,222,24,112,1,18,214,231,0,107,157,181,254,195,147,0,255,194,99,104,255,89,140,190,255,177,66,126,254,106,185,66,0,49,218,31,0,252,174,158,0,188,79,230,1,238,41,224,0,212,234,8,1,136,11,181,0,166,117,83,255,68,195,94,0,46,132,201,0,240,152,88,0,164,57,69,254,160,224,42,255,59,215,67,255,119,195,141,255,36,180,121,254,207,47,8,255,174,210,223,0,101,197,68,255,255,82,141,1,250,137,233,0,97,86,133,1,16,80,69,0,132,131,159,0,116,93,100,0,45,141,139,0,152,172,157,255,90,43,91,0,71,153,46,0,39,16,112,255,217,136,97,255,220,198,25,254,177,53,49,0,222,88,134,255,128,15,60,0,207,192,169,255,192,116,209,255,106,78,211,1,200,213,183,255,7,12,122,254,222,203,60,255,33,110,199,254,251,106,117,0,228,225,4,1,120,58,7,255,221,193,84,254,112,133,27,0,189,200,201,255,139,135,150,0,234,55,176,255,61,50,65,0,152,108,169,255,220,85,1,255,112,135,227,0,162,26,186,0,207,96,185,254,244,136,107,0,93,153,50,1,198,97,151,0,110,11,86,255,143,117,174,255,115,212,200,0,5,202,183,0,237,164,10,254,185,239,62,0,236,120,18,254,98,123,99,255,168,201,194,254,46,234,214,0,191,133,49,255,99,169,119,0,190,187,35,1,115,21,45,255,249,131,72,0,112,6,123,255,214,49,181,254,166,233,34,0,92,197,102,254,253,228,205,255,3,59,201,1,42,98,46,0,219,37,35,255,169,195,38,0,94,124,193,1,156,43,223,0,95,72,133,254,120,206,191,0,122,197,239,255,177,187,79,255,254,46,2,1,250,167,190,0,84,129,19,0,203,113,166,255,249,31,189,254,72,157,202,255,208,71,73,255,207,24,72,0,10,16,18,1,210,81,76,255,88,208,192,255,126,243,107,255,238,141,120,255,199,121,234,255,137,12,59,255,36,220,123,255,148,179,60,254,240,12,29,0,66,0,97,1,36,30,38,255,115,1,93,255,96,103,231,255,197,158,59,1,192,164,240,0,202,202,57,255,24,174,48,0,89,77,155,1,42,76,215,0,244,151,233,0,23,48,81,0,239,127,52,254,227,130,37,255,248,116,93,1,124,132,118,0,173,254,192,1,6,235,83,255,110,175,231,1,251,28,182,0,129,249,93,254,84,184,128,0,76,181,62,0,175,128,186,0,100,53,136,254,109,29,226,0,221,233,58,1,20,99,74,0,0,22,160,0,134,13,21,0,9,52,55,255,17,89,140,0,175,34,59,0,84,165,119,255,224,226,234,255,7,72,166,255,123,115,255,1,18,214,246,0,250,7,71,1,217,220,185,0,212,35,76,255,38,125,175,0,189,97,210,0,114,238,44,255,41,188,169,254,45,186,154,0,81,92,22,0,132,160,193,0,121,208,98,255,13,81,44,255,203,156,82,0,71,58,21,255,208,114,191,254,50,38,147,0,154,216,195,0,101,25,18,0,60,250,215,255,233,132,235,255,103,175,142,1,16,14,92,0,141,31,110,254,238,241,45,255,153,217,239,1,97,168,47,255,249,85,16,1,28,175,62,255],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE);allocate([57,254,54,0,222,231,126,0,166,45,117,254,18,189,96,255,228,76,50,0,200,244,94,0,198,152,120,1,68,34,69,255,12,65,160,254,101,19,90,0,167,197,120,255,68,54,185,255,41,218,188,0,113,168,48,0,88,105,189,1,26,82,32,255,185,93,164,1,228,240,237,255,66,182,53,0,171,197,92,255,107,9,233,1,199,120,144,255,78,49,10,255,109,170,105,255,90,4,31,255,28,244,113,255,74,58,11,0,62,220,246,255,121,154,200,254,144,210,178,255,126,57,129,1,43,250,14,255,101,111,28,1,47,86,241,255,61,70,150,255,53,73,5,255,30,26,158,0,209,26,86,0,138,237,74,0,164,95,188,0,142,60,29,254,162,116,248,255,187,175,160,0,151,18,16,0,209,111,65,254,203,134,39,255,88,108,49,255,131,26,71,255,221,27,215,254,104,105,93,255,31,236,31,254,135,0,211,255,143,127,110,1,212,73,229,0,233,67,167,254,195,1,208,255,132,17,221,255,51,217,90,0,67,235,50,255,223,210,143,0,179,53,130,1,233,106,198,0,217,173,220,255,112,229,24,255,175,154,93,254,71,203,246,255,48,66,133,255,3,136,230,255,23,221,113,254,235,111,213,0,170,120,95,254,251,221,2,0,45,130,158,254,105,94,217,255,242,52,180,254,213,68,45,255,104,38,28,0,244,158,76,0,161,200,96,255,207,53,13,255,187,67,148,0,170,54,248,0,119,162,178,255,83,20,11,0,42,42,192,1,146,159,163,255,183,232,111,0,77,229,21,255,71,53,143,0,27,76,34,0,246,136,47,255,219,39,182,255,92,224,201,1,19,142,14,255,69,182,241,255,163,118,245,0,9,109,106,1,170,181,247,255,78,47,238,255,84,210,176,255,213,107,139,0,39,38,11,0,72,21,150,0,72,130,69,0,205,77,155,254,142,133,21,0,71,111,172,254,226,42,59,255,179,0,215,1,33,128,241,0,234,252,13,1,184,79,8,0,110,30,73,255,246,141,189,0,170,207,218,1,74,154,69,255,138,246,49,255,155,32,100,0,125,74,105,255,90,85,61,255,35,229,177,255,62,125,193,255,153,86,188,1,73,120,212,0,209,123,246,254,135,209,38,255,151,58,44,1,92,69,214,255,14,12,88,255,252,153,166,255,253,207,112,255,60,78,83,255,227,124,110,0,180,96,252,255,53,117,33,254,164,220,82,255,41,1,27,255,38,164,166,255,164,99,169,254,61,144,70,255,192,166,18,0,107,250,66,0,197,65,50,0,1,179,18,255,255,104,1,255,43,153,35,255,80,111,168,0,110,175,168,0,41,105,45,255,219,14,205,255,164,233,140,254,43,1,118,0,233,67,195,0,178,82,159,255,138,87,122,255,212,238,90,255,144,35,124,254,25,140,164,0,251,215,44,254,133,70,107,255,101,227,80,254,92,169,55,0,215,42,49,0,114,180,85,255,33,232,27,1,172,213,25,0,62,176,123,254,32,133,24,255,225,191,62,0,93,70,153,0,181,42,104,1,22,191,224,255,200,200,140,255,249,234,37,0,149,57,141,0,195,56,208,255,254,130,70,255,32,173,240,255,29,220,199,0,110,100,115,255,132,229,249,0,228,233,223,255,37,216,209,254,178,177,209,255,183,45,165,254,224,97,114,0,137,97,168,255,225,222,172,0,165,13,49,1,210,235,204,255,252,4,28,254,70,160,151,0,232,190,52,254,83,248,93,255,62,215,77,1,175,175,179,255,160,50,66,0,121,48,208,0,63,169,209,255,0,210,200,0,224,187,44,1,73,162,82,0,9,176,143,255,19,76,193,255,29,59,167,1,24,43,154,0,28,190,190,0,141,188,129,0,232,235,203,255,234,0,109,255,54,65,159,0,60,88,232,255,121,253,150,254,252,233,131,255,198,110,41,1,83,77,71,255,200,22,59,254,106,253,242,255,21,12,207,255,237,66,189,0,90,198,202,1,225,172,127,0,53,22,202,0,56,230,132,0,1,86,183,0,109,190,42,0,243,68,174,1,109,228,154,0,200,177,122,1,35,160,183,255,177,48,85,255,90,218,169,255,248,152,78,0,202,254,110,0,6,52,43,0,142,98,65,255,63,145,22,0,70,106,93,0,232,138,107,1,110,179,61,255,211,129,218,1,242,209,92,0,35,90,217,1,182,143,106,255,116,101,217,255,114,250,221,255,173,204,6,0,60,150,163,0,73,172,44,255,239,110,80,255,237,76,153,254,161,140,249,0,149,232,229,0,133,31,40,255,174,164,119,0,113,51,214,0,129,228,2,254,64,34,243,0,107,227,244,255,174,106,200,255,84,153,70,1,50,35,16,0,250,74,216,254,236,189,66,255,153,249,13,0,230,178,4,255,221,41,238,0,118,227,121,255,94,87,140,254,254,119,92,0,73,239,246,254,117,87,128,0,19,211,145,255,177,46,252,0,229,91,246,1,69,128,247,255,202,77,54,1,8,11,9,255,153,96,166,0,217,214,173,255,134,192,2,1,0,207,0,0,189,174,107,1,140,134,100,0,158,193,243,1,182,102,171,0,235,154,51,0,142,5,123,255,60,168,89,1,217,14,92,255,19,214,5,1,211,167,254,0,44,6,202,254,120,18,236,255,15,113,184,255,184,223,139,0,40,177,119,254,182,123,90,255,176,165,176,0,247,77,194,0,27,234,120,0,231,0,214,255,59,39,30,0,125,99,145,255,150,68,68,1,141,222,248,0,153,123,210,255,110,127,152,255,229,33,214,1,135,221,197,0,137,97,2,0,12,143,204,255,81,41,188,0,115,79,130,255,94,3,132,0,152,175,187,255,124,141,10,255,126,192,179,255,11,103,198,0,149,6,45,0,219,85,187,1,230,18,178,255,72,182,152,0,3,198,184,255,128,112,224,1,97,161,230,0,254,99,38,255,58,159,197,0,151,66,219,0,59,69,143,255,185,112,249,0,119,136,47,255,123,130,132,0,168,71,95,255,113,176,40,1,232,185,173,0,207,93,117,1,68,157,108,255,102,5,147,254,49,97,33,0,89,65,111,254,247,30,163,255,124,217,221,1,102,250,216,0,198,174,75,254,57,55,18,0,227,5,236,1,229,213,173,0,201,109,218,1,49,233,239,0,30,55,158,1,25,178,106,0,155,111,188,1,94,126,140,0,215,31,238,1,77,240,16,0,213,242,25,1,38,71,168,0,205,186,93,254,49,211,140,255,219,0,180,255,134,118,165,0,160,147,134,255,110,186,35,255,198,243,42,0,243,146,119,0,134,235,163,1,4,241,135,255,193,46,193,254,103,180,79,255,225,4,184,254,242,118,130,0,146,135,176,1,234,111,30,0,69,66,213,254,41,96,123,0,121,94,42,255,178,191,195,255,46,130,42,0,117,84,8,255,233,49,214,254,238,122,109,0,6,71,89,1,236,211,123,0,244,13,48,254,119,148,14,0,114,28,86,255,75,237,25,255,145,229,16,254,129,100,53,255,134,150,120,254,168,157,50,0,23,72,104,255,224,49,14,0,255,123,22,255,151,185,151,255,170,80,184,1,134,182,20,0,41,100,101,1,153,33,16,0,76,154,111,1,86,206,234,255,192,160,164,254,165,123,93,255,1,216,164,254,67,17,175,255,169,11,59,255,158,41,61,255,73,188,14,255,195,6,137,255,22,147,29,255,20,103,3,255,246,130,227,255,122,40,128,0,226,47,24,254,35,36,32,0,152,186,183,255,69,202,20,0,195,133,195,0,222,51,247,0,169,171,94,1,183,0,160,255,64,205,18,1,156,83,15,255,197,58,249,254,251,89,110,255,50,10,88,254,51,43,216,0,98,242,198,1,245,151,113,0,171,236,194,1,197,31,199,255,229,81,38,1,41,59,20,0,253,104,230,0,152,93,14,255,246,242,146,254,214,169,240,255,240,102,108,254,160,167,236,0,154,218,188,0,150,233,202,255,27,19,250,1,2,71,133,255,175,12,63,1,145,183,198,0,104,120,115,255,130,251,247,0,17,212,167,255,62,123,132,255,247,100,189,0,155,223,152,0,143,197,33,0,155,59,44,255,150,93,240,1,127,3,87,255,95,71,207,1,167,85,1,255,188,152,116,255,10,23,23,0,137,195,93,1,54,98,97,0,240,0,168,255,148,188,127,0,134,107,151,0,76,253,171,0,90,132,192,0,146,22,54,0,224,66,54,254,230,186,229,255,39,182,196,0,148,251,130,255,65,131,108,254,128,1,160,0,169,49,167,254,199,254,148,255,251,6,131,0,187,254,129,255,85,82,62,0,178,23,58,255,254,132,5,0,164,213,39,0,134,252,146,254,37,53,81,255,155,134,82,0,205,167,238,255,94,45,180,255,132,40,161,0,254,111,112,1,54,75,217,0,179,230,221,1,235,94,191,255,23,243,48,1,202,145,203,255,39,118,42,255,117,141,253,0,254,0,222,0,43,251,50,0,54,169,234,1,80,68,208,0,148,203,243,254,145,7,135,0,6,254,0,0,252,185,127,0,98,8,129,255,38,35,72,255,211,36,220,1,40,26,89,0,168,64,197,254,3,222,239,255,2,83,215,254,180,159,105,0,58,115,194,0,186,116,106,255,229,247,219,255,129,118,193,0,202,174,183,1,166,161,72,0,201,107,147,254,237,136,74,0,233,230,106,1,105,111,168,0,64,224,30,1,1,229,3,0,102,151,175,255,194,238,228,255,254,250,212,0,187,237,121,0,67,251,96,1,197,30,11,0,183,95,204,0,205,89,138,0,64,221,37,1,255,223,30,255,178,48,211,255,241,200,90,255,167,209,96,255,57,130,221,0,46,114,200,255,61,184,66,0,55,182,24,254,110,182,33,0,171,190,232,255,114,94,31,0,18,221,8,0,47,231,254,0,255,112,83,0,118,15,215,255,173,25,40,254,192,193,31,255,238,21,146,255,171,193,118,255,101,234,53,254,131,212,112,0,89,192,107,1,8,208,27,0,181,217,15,255,231,149,232,0,140,236,126,0,144,9,199,255,12,79,181,254,147,182,202,255,19,109,182,255,49,212,225,0,74,163,203,0,175,233,148,0,26,112,51,0,193,193,9,255,15,135,249,0,150,227,130,0,204,0,219,1,24,242,205,0,238,208,117,255,22,244,112,0,26,229,34,0,37,80,188,255,38,45,206,254,240,90,225,255,29,3,47,255,42,224,76,0,186,243,167,0,32,132,15,255,5,51,125,0,139,135,24,0,6,241,219,0,172,229,133,255,246,214,50,0,231,11,207,255,191,126,83,1,180,163,170,255,245,56,24,1,178,164,211,255,3,16,202,1,98,57,118,255,141,131,89,254,33,51,24,0,243,149,91,255,253,52,14,0,35,169,67,254,49,30,88,255,179,27,36,255,165,140,183,0,58,189,151,0,88,31,0,0,75,169,66,0,66,101,199,255,24,216,199,1,121,196,26,255,14,79,203,254,240,226,81,255,94,28,10,255,83,193,240,255,204,193,131,255,94,15,86,0,218,40,157,0,51,193,209,0,0,242,177,0,102,185,247,0,158,109,116,0,38,135,91,0,223,175,149,0,220,66,1,255,86,60,232,0,25,96,37,255,225,122,162,1,215,187,168,255,158,157,46,0,56,171,162,0,232,240,101,1,122,22,9,0,51,9,21,255,53,25,238,255,217,30,232,254,125,169,148,0,13,232,102,0,148,9,37,0,165,97,141,1,228,131,41,0,222,15,243,255,254,18,17,0,6,60,237,1,106,3,113,0,59,132,189,0,92,112,30,0,105,208,213,0,48,84,179,255,187,121,231,254,27,216,109,255,162,221,107,254,73,239,195,255,250,31,57,255,149,135,89,255,185,23,115,1,3,163,157,255,18,112,250,0,25,57,187,255,161,96,164,0,47,16,243,0,12,141,251,254,67,234,184,255,41,18,161,0,175,6,96,255,160,172,52,254,24,176,183,255,198,193,85,1,124,121,137,255,151,50,114,255,220,203,60,255,207,239,5,1,0,38,107,255,55,238,94,254,70,152,94,0,213,220,77,1,120,17,69,255,85,164,190,255,203,234,81,0,38,49,37,254,61,144,124,0,137,78,49,254,168,247,48,0,95,164,252,0,105,169,135,0,253,228,134,0,64,166,75,0,81,73,20,255,207,210,10,0,234,106,150,255,94,34,90,255,254,159,57,254,220,133,99,0,139,147,180,254,24,23,185,0,41,57,30,255,189,97,76,0,65,187,223,255,224,172,37,255,34,62,95,1,231,144,240,0,77,106,126,254,64,152,91,0,29,98,155,0,226,251,53,255,234,211,5,255,144,203,222,255,164,176,221,254,5,231,24,0,179,122,205,0,36,1,134,255,125,70,151,254,97,228,252,0,172,129,23,254,48,90,209,255,150,224,82,1,84,134,30,0,241,196,46,0,103,113,234,255,46,101,121,254,40,124,250,255,135,45,242,254,9,249,168,255,140,108,131,255,143,163,171,0,50,173,199,255,88,222,142,255,200,95,158,0,142,192,163,255,7,117,135,0,111,124,22,0,236,12,65,254,68,38,65,255,227,174,254,0,244,245,38,0,240,50,208,255,161,63,250,0,60,209,239,0,122,35,19,0,14,33,230,254,2,159,113,0,106,20,127,255,228,205,96,0,137,210,174,254,180,212,144,255,89,98,154,1,34,88,139,0,167,162,112,1,65,110,197,0,241,37,169,0,66,56,131,255,10,201,83,254,133,253,187,255,177,112,45,254,196,251,0,0,196,250,151,255,238,232,214,255,150,209,205,0,28,240,118,0,71,76,83,1,236,99,91,0,42,250,131,1,96,18,64,255,118,222,35,0,113,214,203,255,122,119,184,255,66,19,36,0,204,64,249,0,146,89,139,0,134,62,135,1,104,233,101,0,188,84,26,0,49,249,129,0,208,214,75,255,207,130,77,255,115,175,235,0,171,2,137,255,175,145,186,1,55,245,135,255,154,86,181,1,100,58,246,255,109,199,60,255,82,204,134,255,215,49,230,1,140,229,192,255,222,193,251,255,81,136,15,255,179,149,162,255,23,39,29,255,7,95,75,254,191,81,222,0,241,81,90,255,107,49,201,255,244,211,157,0,222,140,149,255,65,219,56,254,189,246,90,255,178,59,157,1,48,219,52,0,98,34,215,0,28,17,187,255,175,169,24,0,92,79,161,255,236,200,194,1,147,143,234,0,229,225,7,1,197,168,14,0,235,51,53,1,253,120,174,0,197,6,168,255,202,117,171,0,163,21,206,0,114,85,90,255,15,41,10,255,194,19,99,0,65,55,216,254,162,146,116,0,50,206,212,255,64,146,29,255,158,158,131,1,100,165,130,255,172,23,129,255,125,53,9,255,15,193,18,1,26,49,11,255,181,174,201,1,135,201,14,255,100,19,149,0,219,98,79,0,42,99,143,254,96,0,48,255,197,249,83,254,104,149,79,255,235,110,136,254,82,128,44,255,65,41,36,254,88,211,10,0,187,121,187,0,98,134,199,0,171,188,179,254,210,11,238,255,66,123,130,254,52,234,61,0,48,113,23,254,6,86,120,255,119,178,245,0,87,129,201,0,242,141,209,0,202,114,85,0,148,22,161,0,103,195,48,0,25,49,171,255,138,67,130,0,182,73,122,254,148,24,130,0,211,229,154,0,32,155,158,0,84,105,61,0,177,194,9,255,166,89,86,1,54,83,187,0,249,40,117,255,109,3,215,255,53,146,44,1,63,47,179,0,194,216,3,254,14,84,136,0,136,177,13,255,72,243,186,255,117,17,125,255,211,58,211,255,93,79,223,0,90,88,245,255,139,209,111,255,70,222,47,0,10,246,79,255,198,217,178,0,227,225,11,1,78,126,179,255,62,43,126,0,103,148,35,0,129,8,165,254,245,240,148,0,61,51,142,0,81,208,134,0,15,137,115,255,211,119,236,255,159,245,248,255,2,134,136,255,230,139,58,1,160,164,254,0,114,85,141,255,49,166,182,255,144,70,84,1,85,182,7,0,46,53,93,0,9,166,161,255,55,162,178,255,45,184,188,0,146,28,44,254,169,90,49,0,120,178,241,1,14,123,127,255,7,241,199,1,189,66,50,255,198,143,101,254,189,243,135,255,141,24,24,254,75,97,87,0,118,251,154,1,237,54,156,0,171,146,207,255,131,196,246,255,136,64,113,1,151,232,57,0,240,218,115,0,49,61,27,255,64,129,73,1,252,169,27,255,40,132,10,1,90,201,193,255,252,121,240,1,186,206,41,0,43,198,97,0,145,100,183,0,204,216,80,254,172,150,65,0,249,229,196,254,104,123,73,255,77,104,96,254,130,180,8,0,104,123,57,0,220,202,229,255,102,249,211,0,86,14,232,255,182,78,209,0,239,225,164,0,106,13,32,255,120,73,17,255,134,67,233,0,83,254,181,0,183,236,112,1,48,64,131,255,241,216,243,255,65,193,226,0,206,241,100,254,100,134,166,255,237,202,197,0,55,13,81,0,32,124,102,255,40,228,177,0,118,181,31,1,231,160,134,255,119,187,202,0,0,142,60,255,128,38,189,255,166,201,150,0,207,120,26,1,54,184,172,0,12,242,204,254,133,66,230,0,34,38,31,1,184,112,80,0,32,51,165,254,191,243,55,0,58,73,146,254,155,167,205,255,100,104,152,255,197,254,207,255,173,19,247,0,238,10,202,0,239,151,242,0,94,59,39,255,240,29,102,255,10,92,154,255,229,84,219,255,161,129,80,0,208,90,204,1,240,219,174,255,158,102,145,1,53,178,76,255,52,108,168,1,83,222,107,0,211,36,109,0,118,58,56,0,8,29,22,0,237,160,199,0,170,209,157,0,137,71,47,0,143,86,32,0,198,242,2,0,212,48,136,1,92,172,186,0,230,151,105,1,96,191,229,0,138,80,191,254,240,216,130,255,98,43,6,254,168,196,49,0,253,18,91,1,144,73,121,0,61,146,39,1,63,104,24,255,184,165,112,254,126,235,98,0,80,213,98,255,123,60,87,255,82,140,245,1,223,120,173,255,15,198,134,1,206,60,239,0,231,234,92,255,33,238,19,255,165,113,142,1,176,119,38,0,160,43,166,254,239,91,105,0,107,61,194,1,25,4,68,0,15,139,51,0,164,132,106,255,34,116,46,254,168,95,197,0,137,212,23,0,72,156,58,0,137,112,69,254,150,105,154,255,236,201,157,0,23,212,154,255,136,82,227,254,226,59,221,255,95,149,192,0,81,118,52,255,33,43,215,1,14,147,75,255,89,156,121,254,14,18,79,0,147,208,139,1,151,218,62,255,156,88,8,1,210,184,98,255,20,175,123,255,102,83,229,0,220,65,116,1,150,250,4,255,92,142,220,255,34,247,66,255,204,225,179,254,151,81,151,0,71,40,236,255,138,63,62,0,6,79,240,255,183,185,181,0,118,50,27,0,63,227,192,0,123,99,58,1,50,224,155,255,17,225,223,254,220,224,77,255,14,44,123,1,141,128,175,0,248,212,200,0,150,59,183,255,147,97,29,0,150,204,181,0,253,37,71,0,145,85,119,0,154,200,186,0,2,128,249,255,83,24,124,0,14,87,143,0,168,51,245,1,124,151,231,255,208,240,197,1,124,190,185,0,48,58,246,0,20,233,232,0,125,18,98,255,13,254,31,255,245,177,130,255,108,142,35,0,171,125,242,254,140,12,34,255,165,161,162,0,206,205,101,0,247,25,34,1,100,145,57,0,39,70,57,0,118,204,203,255,242,0,162,0,165,244,30,0,198,116,226,0,128,111,153,255,140,54,182,1,60,122,15,255,155,58,57,1,54,50,198,0,171,211,29,255,107,138,167,255,173,107,199,255,109,161,193,0,89,72,242,255,206,115,89,255,250,254,142,254,177,202,94,255,81,89,50,0,7,105,66,255,25,254,255,254,203,64,23,255,79,222,108,255,39,249,75,0,241,124,50,0,239,152,133,0,221,241,105,0,147,151,98,0,213,161,121,254,242,49,137,0,233,37,249,254,42,183,27,0,184,119,230,255,217,32,163,255,208,251,228,1,137,62,131,255,79,64,9,254,94,48,113,0,17,138,50,254,193,255,22,0,247,18,197,1,67,55,104,0,16,205,95,255,48,37,66,0,55,156,63,1,64,82,74,255,200,53,71,254,239,67,125,0,26,224,222,0,223,137,93,255,30,224,202,255,9,220,132,0,198,38,235,1,102,141,86,0,60,43,81,1,136,28,26,0,233,36,8,254,207,242,148,0,164,162,63,0,51,46,224,255,114,48,79,255,9,175,226,0,222,3,193,255,47,160,232,255,255,93,105,254,14,42,230,0,26,138,82,1,208,43,244,0,27,39,38,255,98,208,127,255,64,149,182,255,5,250,209,0,187,60,28,254,49,25,218,255,169,116,205,255,119,18,120,0,156,116,147,255,132,53,109,255,13,10,202,0,110,83,167,0,157,219,137,255,6,3,130,255,50,167,30,255,60,159,47,255,129,128,157,254,94,3,189,0,3,166,68,0,83,223,215,0,150,90,194,1,15,168,65,0,227,83,51,255,205,171,66,255,54,187,60,1,152,102,45,255,119,154,225,0,240,247,136,0,100,197,178,255,139,71,223,255,204,82,16,1,41,206,42,255,156,192,221,255,216,123,244,255,218,218,185,255,187,186,239,255,252,172,160,255,195,52,22,0,144,174,181,254,187,100,115,255,211,78,176,255,27,7,193,0,147,213,104,255,90,201,10,255,80,123,66,1,22,33,186,0,1,7,99,254,30,206,10,0,229,234,5,0,53,30,210,0,138,8,220,254,71,55,167,0,72,225,86,1,118,190,188,0,254,193,101,1,171,249,172,255,94,158,183,254,93,2,108,255,176,93,76,255,73,99,79,255,74,64,129,254,246,46,65,0,99,241,127,254,246,151,102,255,44,53,208,254,59,102,234,0,154,175,164,255,88,242,32,0,111,38,1,0,255,182,190,255,115,176,15,254,169,60,129,0,122,237,241,0,90,76,63,0,62,74,120,255,122,195,110,0,119,4,178,0,222,242,210,0,130,33,46,254,156,40,41,0,167,146,112,1,49,163,111,255,121,176,235,0,76,207,14,255,3,25,198,1,41,235,213,0,85,36,214,1,49,92,109,255,200,24,30,254,168,236,195,0,145,39,124,1,236,195,149,0,90,36,184,255,67,85,170,255,38,35,26,254,131,124,68,255,239,155,35,255,54,201,164,0,196,22,117,255,49,15,205,0,24,224,29,1,126,113,144,0,117,21,182,0,203,159,141,0,223,135,77,0,176,230,176,255,190,229,215,255,99,37,181,255,51,21,138,255,25,189,89,255,49,48,165,254,152,45,247,0,170,108,222,0,80,202,5,0,27,69,103,254,204,22,129,255,180,252,62,254,210,1,91,255,146,110,254,255,219,162,28,0,223,252,213,1,59,8,33,0,206,16,244,0,129,211,48,0,107,160,208,0,112,59,209,0,109,77,216,254,34,21,185,255,246,99,56,255,179,139,19,255,185,29,50,255,84,89,19,0,74,250,98,255,225,42,200,255,192,217,205,255,210,16,167,0,99,132,95,1,43,230,57,0,254,11,203,255,99,188,63,255,119,193,251,254,80,105,54,0,232,181,189,1,183,69,112,255,208,171,165,255,47,109,180,255,123,83,165,0,146,162,52,255,154,11,4,255,151,227,90,255,146,137,97,254,61,233,41,255,94,42,55,255,108,164,236,0,152,68,254,0,10,140,131,255,10,106,79,254,243,158,137,0,67,178,66,254,177,123,198,255,15,62,34,0,197,88,42,255,149,95,177,255,152,0,198,255,149,254,113,255,225,90,163,255,125,217,247,0,18,17,224,0,128,66,120,254,192,25,9,255,50,221,205,0,49,212,70,0,233,255,164,0,2,209,9,0,221,52,219,254,172,224,244,255,94,56,206,1,242,179,2,255,31,91,164,1,230,46,138,255,189,230,220,0,57,47,61,255,111,11,157,0,177,91,152,0,28,230,98,0,97,87,126,0,198,89,145,255,167,79,107,0,249,77,160,1,29,233,230,255,150,21,86,254,60,11,193,0,151,37,36,254,185,150,243,255,228,212,83,1,172,151,180,0,201,169,155,0,244,60,234,0,142,235,4,1,67,218,60,0,192,113,75,1,116,243,207,255,65,172,155,0,81,30,156,255,80,72,33,254,18,231,109,255,142,107,21,254,125,26,132,255,176,16,59,255,150,201,58,0,206,169,201,0,208,121,226,0,40,172,14,255,150,61,94,255,56,57,156,255,141,60,145,255,45,108,149,255,238,145,155,255,209,85,31,254,192,12,210,0,99,98,93,254,152,16,151,0,225,185,220,0,141,235,44,255,160,172,21,254,71,26,31,255,13,64,93,254,28,56,198,0,177,62,248,1,182,8,241,0,166,101,148,255,78,81,133,255,129,222,215,1,188,169,129,255,232,7,97,0,49,112,60,255,217,229,251,0,119,108,138,0,39,19,123,254,131,49,235,0,132,84,145,0,130,230,148,255,25,74,187,0,5,245,54,255,185,219,241,1,18,194,228,255,241,202,102,0,105,113,202,0,155,235,79,0,21,9,178,255,156,1,239,0,200,148,61,0,115,247,210,255,49,221,135,0,58,189,8,1,35,46,9,0,81,65,5,255,52,158,185,255,125,116,46,255,74,140,13,255,210,92,172,254,147,23,71,0,217,224,253,254,115,108,180,255,145,58,48,254,219,177,24,255,156,255,60,1,154,147,242,0,253,134,87,0,53,75,229,0,48,195,222,255,31,175,50,255,156,210,120,255,208,35,222,255,18,248,179,1,2,10,101,255,157,194,248,255,158,204,101,255,104,254,197,255,79,62,4,0,178,172,101,1,96,146,251,255,65,10,156,0,2,137,165,255,116,4,231,0,242,215,1,0,19,35,29,255,43,161,79,0,59,149,246,1,251,66,176,0,200,33,3,255,80,110,142,255,195,161,17,1,228,56,66,255,123,47,145,254,132,4,164,0,67,174,172,0,25,253,114,0,87,97,87,1,250,220,84,0,96,91,200,255,37,125,59,0,19,65,118,0,161,52,241,255,237,172,6,255,176,191,255,255,1,65,130,254,223,190,230,0,101,253,231,255,146,35,109,0,250,29,77,1,49,0,19,0,123,90,155,1,22,86,32,255,218,213,65,0,111,93,127,0,60,93,169,255,8,127,182,0,17,186,14,254,253,137,246,255,213,25,48,254,76,238,0,255,248,92,70,255,99,224,139,0,184,9,255,1,7,164,208,0,205,131,198,1,87,214,199,0,130,214,95,0,221,149,222,0,23,38,171,254,197,110,213,0,43,115,140,254,215,177,118,0,96,52,66,1,117,158,237,0,14,64,182,255,46,63,174,255,158,95,190,255,225,205,177,255,43,5,142,255,172,99,212,255,244,187,147,0,29,51,153,255,228,116,24,254,30,101,207,0,19,246,150,255,134,231,5,0,125,134,226,1,77,65,98,0,236,130,33,255,5,110,62,0,69,108,127,255,7,113,22,0,145,20,83,254,194,161,231,255,131,181,60,0,217,209,177,255,229,148,212,254,3,131,184,0,117,177,187,1,28,14,31,255,176,102,80,0,50,84,151,255,125,31,54,255,21,157,133,255,19,179,139,1,224,232,26,0,34,117,170,255,167,252,171,255,73,141,206,254,129,250,35,0,72,79,236,1,220,229,20,255,41,202,173,255,99,76,238,255,198,22,224,255,108,198,195,255,36,141,96,1,236,158,59,255,106,100,87,0,110,226,2,0,227,234,222,0,154,93,119,255,74,112,164,255,67,91,2,255,21,145,33,255,102,214,137,255,175,230,103,254,163,246,166,0,93,247,116,254,167,224,28,255,220,2,57,1,171,206,84,0,123,228,17,255,27,120,119,0,119,11,147,1,180,47,225,255,104,200,185,254,165,2,114,0,77,78,212,0,45,154,177,255,24,196,121,254,82,157,182,0,90,16,190,1,12,147,197,0,95,239,152,255,11,235,71,0,86,146,119,255,172,134,214,0,60,131,196,0,161,225,129,0,31,130,120,254,95,200,51,0,105,231,210,255,58,9,148,255,43,168,221,255,124,237,142,0,198,211,50,254,46,245,103,0,164,248,84,0,152,70,208,255,180,117,177,0,70,79,185,0,243,74,32,0,149,156,207,0,197,196,161,1,245,53,239,0,15,93,246,254,139,240,49,255,196,88,36,255,162,38,123,0,128,200,157,1,174,76,103,255,173,169,34,254,216,1,171,255,114,51,17,0,136,228,194,0,110,150,56,254,106,246,159,0,19,184,79,255,150,77,240,255,155,80,162,0,0,53,169,255,29,151,86,0,68,94,16,0,92,7,110,254,98,117,149,255,249,77,230,255,253,10,140,0,214,124,92,254,35,118,235,0,89,48,57,1,22,53,166,0,184,144,61,255,179,255,194,0,214,248,61,254,59,110,246,0,121,21,81,254,166,3,228,0,106,64,26,255,69,232,134,255,242,220,53,254,46,220,85,0,113,149,247,255,97,179,103,255,190,127,11,0,135,209,182,0,95,52,129,1,170,144,206,255,122,200,204,255,168,100,146,0,60,144,149,254,70,60,40,0,122,52,177,255,246,211,101,255,174,237,8,0,7,51,120,0,19,31,173,0,126,239,156,255,143,189,203,0,196,128,88,255,233,133,226,255,30,125,173,255,201,108,50,0,123,100,59,255,254,163,3,1,221,148,181,255,214,136,57,254,222,180,137,255,207,88,54,255,28,33,251,255,67,214,52,1,210,208,100,0,81,170,94,0,145,40,53,0,224,111,231,254,35,28,244,255,226,199,195,254,238,17,230,0,217,217,164,254,169,157,221,0,218,46,162,1,199,207,163,255,108,115,162,1,14,96,187,255,118,60,76,0,184,159,152,0,209,231,71,254,42,164,186,255,186,153,51,254,221,171,182,255,162,142,173,0,235,47,193,0,7,139,16,1,95,164,64,255,16,221,166,0,219,197,16,0,132,29,44,255,100,69,117,255,60,235,88,254,40,81,173,0,71,190,61,255,187,88,157,0,231,11,23,0,237,117,164,0,225,168,223,255,154,114,116,255,163,152,242,1,24,32,170,0,125,98,113,254,168,19,76,0,17,157,220,254,155,52,5,0,19,111,161,255,71,90,252,255,173,110,240,0,10,198,121,255,253,255,240,255,66,123,210,0,221,194,215,254,121,163,17,255,225,7,99,0,190,49,182,0,115,9,133,1,232,26,138,255,213,68,132,0,44,119,122,255,179,98,51,0,149,90,106,0,71,50,230,255,10,153,118,255,177,70,25,0,165,87,205,0,55,138,234,0,238,30,97,0,113,155,207,0,98,153,127,0,34,107,219,254,117,114,172,255,76,180,255,254,242,57,179,255,221,34,172,254,56,162,49,255,83,3,255,255,113,221,189,255,188,25,228,254,16,88,89,255,71,28,198,254,22,17,149,255,243,121,254,255,107,202,99,255,9,206,14,1,220,47,153,0,107,137,39,1,97,49,194,255,149,51,197,254,186,58,11,255,107,43,232,1,200,6,14,255,181,133,65,254,221,228,171,255,123,62,231,1,227,234,179,255,34,189,212,254,244,187,249,0,190,13,80,1,130,89,1,0,223,133,173,0,9,222,198,255,66,127,74,0,167,216,93,255,155,168,198,1,66,145,0,0,68,102,46,1,172,90,154,0,216,128,75,255,160,40,51,0,158,17,27,1,124,240,49,0,236,202,176,255,151,124,192,255,38,193,190,0,95,182,61,0,163,147,124,255,255,165,51,255,28,40,17,254,215,96,78,0,86,145,218,254,31,36,202,255,86,9,5,0,111,41,200,255,237,108,97,0,57,62,44,0,117,184,15,1,45,241,116,0,152,1,220,255,157,165,188,0,250,15,131,1,60,44,125,255,65,220,251,255,75,50,184,0,53,90,128,255,231,80,194,255,136,129,127,1,21,18,187,255,45,58,161,255,71,147,34,0,174,249,11,254,35,141,29,0,239,68,177,255,115,110,58,0,238,190,177,1,87,245,166,255,190,49,247,255,146,83,184,255,173,14,39,255,146,215,104,0,142,223,120,0,149,200,155,255,212,207,145,1,16,181,217,0,173,32,87,255,255,35,181,0,119,223,161,1,200,223,94,255,70,6,186,255,192,67,85,255,50,169,152,0,144,26,123,255,56,243,179,254,20,68,136,0,39,140,188,254,253,208,5,255,200,115,135,1,43,172,229,255,156,104,187,0,151,251,167,0,52,135,23,0,151,153,72,0,147,197,107,254,148,158,5,255,238,143,206,0,126,153,137,255,88,152,197,254,7,68,167,0,252,159,165,255,239,78,54,255,24,63,55,255,38,222,94,0,237,183,12,255,206,204,210,0,19,39,246,254,30,74,231,0,135,108,29,1,179,115,0,0,117,118,116,1,132,6,252,255,145,129,161,1,105,67,141,0,82,37,226,255,238,226,228,255,204,214,129,254,162,123,100,255,185,121,234,0,45,108,231,0,66,8,56,255,132,136,128,0,172,224,66,254,175,157,188,0,230,223,226,254,242,219,69,0,184,14,119,1,82,162,56,0,114,123,20,0,162,103,85,255,49,239,99,254,156,135,215,0,111,255,167,254,39,196,214,0,144,38,79,1,249,168,125,0,155,97,156,255,23,52,219,255,150,22,144,0,44,149,165,255,40,127,183,0,196,77,233,255,118,129,210,255,170,135,230,255,214,119,198,0,233,240,35,0,253,52,7,255,117,102,48,255,21,204,154,255,179,136,177,255,23,2,3,1,149,130,89,255,252,17,159,1,70,60,26,0,144,107,17,0,180,190,60,255,56,182,59,255,110,71,54,255,198,18,129,255,149,224,87,255,223,21,152,255,138,22,182,255,250,156,205,0,236,45,208,255,79,148,242,1,101,70,209,0,103,78,174,0,101,144,172,255,152,136,237,1,191,194,136,0,113,80,125,1,152,4,141,0,155,150,53,255,196,116,245,0,239,114,73,254,19,82,17,255,124,125,234,255,40,52,191,0,42,210,158,255,155,132,165,0,178,5,42,1,64,92,40,255,36,85,77,255,178,228,118,0,137,66,96,254,115,226,66,0,110,240,69,254,151,111,80,0,167,174,236,255,227,108,107,255,188,242,65,255,183,81,255,0,57,206,181,255,47,34,181,255,213,240,158,1,71,75,95,0,156,40,24,255,102,210,81,0,171,199,228,255,154,34,41,0,227,175,75,0,21,239,195,0,138,229,95,1,76,192,49,0,117,123,87,1,227,225,130,0,125,62,63,255,2,198,171,0,254,36,13,254,145,186,206,0,148,255,244,255,35,0,166,0,30,150,219,1,92,228,212,0,92,198,60,254,62,133,200,255,201,41,59,0,125,238,109,255,180,163,238,1,140,122,82,0,9,22,88,255,197,157,47,255,153,94,57,0,88,30,182,0,84,161,85,0,178,146,124,0,166,166,7,255,21,208,223,0,156,182,242,0,155,121,185,0,83,156,174,254,154,16,118,255,186,83,232,1,223,58,121,255,29,23,88,0,35,125,127,255,170,5,149,254,164,12,130,255,155,196,29,0,161,96,136,0,7,35,29,1,162,37,251,0,3,46,242,255,0,217,188,0,57,174,226,1,206,233,2,0,57,187,136,254,123,189,9,255,201,117,127,255,186,36,204,0,231,25,216,0,80,78,105,0,19,134,129,255,148,203,68,0,141,81,125,254,248,165,200,255,214,144,135,0,151,55,166,255,38,235,91,0,21,46,154,0,223,254,150,255,35,153,180,255,125,176,29,1,43,98,30,255,216,122,230,255,233,160,12,0,57,185,12,254,240,113,7,255,5,9,16,254,26,91,108,0,109,198,203,0,8,147,40,0,129,134,228,255,124,186,40,255,114,98,132,254,166,132,23,0,99,69,44,0,9,242,238,255,184,53,59,0,132,129,102,255,52,32,243,254,147,223,200,255,123,83,179,254,135,144,201,255,141,37,56,1,151,60,227,255,90,73,156,1,203,172,187,0,80,151,47,255,94,137,231,255,36,191,59,255,225,209,181,255,74,215,213,254,6,118,179,255,153,54,193,1,50,0,231,0,104,157,72,1,140,227,154,255,182,226,16,254,96,225,92,255,115,20,170,254,6,250,78,0,248,75,173,255,53,89,6,255,0,180,118,0,72,173,1,0,64,8,206,1,174,133,223,0,185,62,133,255,214,11,98,0,197,31,208,0,171,167,244,255,22,231,181,1,150,218,185,0,247,169,97,1,165,139,247,255,47,120,149,1,103,248,51,0,60,69,28,254,25,179,196,0,124,7,218,254,58,107,81,0,184,233,156,255,252,74,36,0,118,188,67,0,141,95,53,255,222,94,165,254,46,61,53,0,206,59,115,255,47,236,250,255,74,5,32,1,129,154,238,255,106,32,226,0,121,187,61,255,3,166,241,254,67,170,172,255,29,216,178,255,23,201,252,0,253,110,243,0,200,125,57,0,109,192,96,255,52,115,238,0,38,121,243,255,201,56,33,0,194,118,130,0,75,96,25,255,170,30,230,254,39,63,253,0,36,45,250,255,251,1,239,0,160,212,92,1,45,209,237,0,243,33,87,254,237,84,201,255,212,18,157,254,212,99,127,255,217,98,16,254,139,172,239,0,168,201,130,255,143,193,169,255,238,151,193,1,215,104,41,0,239,61,165,254,2,3,242,0,22,203,177,254,177,204,22,0,149,129,213,254,31,11,41,255,0,159,121,254,160,25,114,255,162,80,200,0,157,151,11,0,154,134,78,1,216,54,252,0,48,103,133,0,105,220,197,0,253,168,77,254,53,179,23,0,24,121,240,1,255,46,96,255,107,60,135,254,98,205,249,255,63,249,119,255,120,59,211,255,114,180,55,254,91,85,237,0,149,212,77,1,56,73,49,0,86,198,150,0,93,209,160,0,69,205,182,255,244,90,43,0,20,36,176,0,122,116,221,0,51,167,39,1,231,1,63,255,13,197,134,0,3,209,34,255,135,59,202,0,167,100,78,0,47,223,76,0,185,60,62,0,178,166,123,1,132,12,161,255,61,174,43,0,195,69,144,0,127,47,191,1,34,44,78,0,57,234,52,1,255,22,40,255,246,94,146,0,83,228,128,0,60,78,224,255,0,96,210,255,153,175,236,0,159,21,73,0,180,115,196,254,131,225,106,0,255,167,134,0,159,8,112,255,120,68,194,255,176,196,198,255,118,48,168,255,93,169,1,0,112,200,102,1,74,24,254,0,19,141,4,254,142,62,63,0,131,179,187,255,77,156,155,255,119,86,164,0,170,208,146,255,208,133,154,255,148,155,58,255,162,120,232,254,252,213,155,0,241,13,42,0,94,50,131,0,179,170,112,0,140,83,151,255,55,119,84,1,140,35,239,255,153,45,67,1,236,175,39,0,54,151,103,255,158,42,65,255,196,239,135,254,86,53,203,0,149,97,47,254,216,35,17,255,70,3,70,1,103,36,90,255,40,26,173,0,184,48,13,0,163,219,217,255,81,6,1,255,221,170,108,254,233,208,93,0,100,201,249,254,86,36,35,255,209,154,30,1,227,201,251,255,2,189,167,254,100,57,3,0,13,128,41,0,197,100,75,0,150,204,235,255,145,174,59,0,120,248,149,255,85,55,225,0,114,210,53,254,199,204,119,0,14,247,74,1,63,251,129,0,67,104,151,1,135,130,80,0,79,89,55,255,117,230,157,255,25,96,143,0,213,145,5,0,69,241,120,1,149,243,95,255,114,42,20,0,131,72,2,0,154,53,20,255,73,62,109,0,196,102,152,0,41,12,204,255,122,38,11,1,250,10,145,0,207,125,148,0,246,244,222,255,41,32,85,1,112,213,126,0,162,249,86,1,71,198,127,255,81,9,21,1,98,39,4,255,204,71,45,1,75,111,137,0,234,59,231,0,32,48,95,255,204,31,114,1,29,196,181,255,51,241,167,254,93,109,142,0,104,144,45,0,235,12,181,255,52,112,164,0,76,254,202,255,174,14,162,0,61,235,147,255,43,64,185,254,233,125,217,0,243,88,167,254,74,49,8,0,156,204,66,0,124,214,123,0,38,221,118,1,146,112,236,0,114,98,177,0,151,89,199,0,87,197,112,0,185,149,161,0,44,96,165,0,248,179,20,255,188,219,216,254,40,62,13,0,243,142,141,0,229,227,206,255,172,202,35,255,117,176,225,255,82,110,38,1,42,245,14,255,20,83,97,0,49,171,10,0,242,119,120,0,25,232,61,0,212,240,147,255,4,115,56,255,145,17,239,254,202,17,251,255,249,18,245,255,99,117,239,0,184,4,179,255,246,237,51,255,37,239,137,255,166,112,166,255,81,188,33,255,185,250,142,255,54,187,173,0,208,112,201,0,246,43,228,1,104,184,88,255,212,52,196,255,51,117,108,255,254,117,155,0,46,91,15,255,87,14,144,255,87,227,204,0,83,26,83,1,159,76,227,0,159,27,213,1,24,151,108,0,117,144,179,254,137,209,82,0,38,159,10,0,115,133,201,0,223,182,156,1,110,196,93,255,57,60,233,0,5,167,105,255,154,197,164,0,96,34,186,255,147,133,37,1,220,99,190,0,1,167,84,255,20,145,171,0,194,197,251,254,95,78,133,255,252,248,243,255,225,93,131,255,187,134,196,255,216,153,170,0,20,118,158,254,140,1,118,0,86,158,15,1,45,211,41,255,147,1,100,254,113,116,76,255,211,127,108,1,103,15,48,0,193,16,102,1,69,51,95,255,107,128,157,0,137,171,233,0,90,124,144,1,106,161,182,0,175,76,236,1,200,141,172,255,163,58,104,0,233,180,52,255,240,253,14,255,162,113,254,255,38,239,138,254,52,46,166,0,241,101,33,254,131,186,156,0,111,208,62,255,124,94,160,255,31,172,254,0,112,174,56,255,188,99,27,255,67,138,251,0,125,58,128,1,156,152,174,255,178,12,247,255,252,84,158,0,82,197,14,254,172,200,83,255,37,39,46,1,106,207,167,0,24,189,34,0,131,178,144,0,206,213,4,0,161,226,210,0,72,51,105,255,97,45,187,255,78,184,223,255,176,29,251,0,79,160,86,255,116,37,178,0,82,77,213,1,82,84,141,255,226,101,212,1,175,88,199,255,245,94,247,1,172,118,109,255,166,185,190,0,131,181,120,0,87,254,93,255,134,240,73,255,32,245,143,255,139,162,103,255,179,98,18,254,217,204,112,0,147,223,120,255,53,10,243,0,166,140,150,0,125,80,200,255,14,109,219,255,91,218,1,255,252,252,47,254,109,156,116,255,115,49,127,1,204,87,211,255,148,202,217,255,26,85,249,255,14,245,134,1,76,89,169,255,242,45,230,0,59,98,172,255,114,73,132,254,78,155,49,255,158,126,84,0,49,175,43,255,16,182,84,255,157,103,35,0,104,193,109,255,67,221,154,0,201,172,1,254,8,162,88,0,165,1,29,255,125,155,229,255,30,154,220,1,103,239,92,0,220,1,109,255,202,198,1,0,94,2,142,1,36,54,44,0,235,226,158,255,170,251,214,255,185,77,9,0,97,74,242,0,219,163,149,255,240,35,118,255,223,114,88,254,192,199,3,0,106,37,24,255,201,161,118,255,97,89,99,1,224,58,103,255,101,199,147,254,222,60,99,0,234,25,59,1,52,135,27,0,102,3,91,254,168,216,235,0,229,232,136,0,104,60,129,0,46,168,238,0,39,191,67,0,75,163,47,0,143,97,98,255,56,216,168,1,168,233,252,255,35,111,22,255,92,84,43,0,26,200,87,1,91,253,152,0,202,56,70,0,142,8,77,0,80,10,175,1,252,199,76,0,22,110,82,255,129,1,194,0,11,128,61,1,87,14,145,255,253,222,190,1,15,72,174,0,85,163,86,254,58,99,44,255,45,24,188,254,26,205,15,0,19,229,210,254,248,67,195,0,99,71,184,0,154,199,37,255,151,243,121,255,38,51,75,255,201,85,130,254,44,65,250,0,57,147,243,254,146,43,59,255,89,28,53,0,33,84,24,255,179,51,18,254,189,70,83,0,11,156,179,1,98,134,119,0,158,111,111,0,119,154,73,255,200,63,140,254,45,13,13,255,154,192,2,254,81,72,42,0,46,160,185,254,44,112,6,0,146,215,149,1,26,176,104,0,68,28,87,1,236,50,153,255,179,128,250,254,206,193,191,255,166,92,137,254,53,40,239,0,210,1,204,254,168,173,35,0,141,243,45,1,36,50,109,255,15,242,194,255,227,159,122,255,176,175,202,254,70,57,72,0,40,223,56,0,208,162,58,255,183,98,93,0,15,111,12,0,30,8,76,255,132,127,246,255,45,242,103,0,69,181,15,255,10,209,30,0,3,179,121,0,241,232,218,1,123,199,88,255,2,210,202,1,188,130,81,255,94,101,208,1,103,36,45,0,76,193,24,1,95,26,241,255,165,162,187,0,36,114,140,0,202,66,5,255,37,56,147,0,152,11,243,1,127,85,232,255,250,135,212,1,185,177,113,0,90,220,75,255,69,248,146,0,50,111,50,0,92,22,80,0,244,36,115,254,163,100,82,255,25,193,6,1,127,61,36,0,253,67,30,254,65,236,170,255,161,17,215,254,63,175,140,0,55,127,4,0,79,112,233,0,109,160,40,0,143,83,7,255,65,26,238,255,217,169,140,255,78,94,189,255,0,147,190,255,147,71,186,254,106,77,127,255,233,157,233,1,135,87,237,255,208,13,236,1,155,109,36,255,180,100,218,0,180,163,18,0,190,110,9,1,17,63,123,255,179,136,180,255,165,123,123,255,144,188,81,254,71,240,108,255,25,112,11,255,227,218,51,255,167,50,234,255,114,79,108,255,31,19,115,255,183,240,99,0,227,87,143,255,72,217,248,255,102,169,95,1,129,149,149,0,238,133,12,1,227,204,35,0,208,115,26,1,102,8,234,0,112,88,143,1,144,249,14,0,240,158,172,254,100,112,119],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+10240);allocate([194,141,153,254,40,56,83,255,121,176,46,0,42,53,76,255,158,191,154,0,91,209,92,0,173,13,16,1,5,72,226,255,204,254,149,0,80,184,207,0,100,9,122,254,118,101,171,255,252,203,0,254,160,207,54,0,56,72,249,1,56,140,13,255,10,64,107,254,91,101,52,255,225,181,248,1,139,255,132,0,230,145,17,0,233,56,23,0,119,1,241,255,213,169,151,255,99,99,9,254,185,15,191,255,173,103,109,1,174,13,251,255,178,88,7,254,27,59,68,255,10,33,2,255,248,97,59,0,26,30,146,1,176,147,10,0,95,121,207,1,188,88,24,0,185,94,254,254,115,55,201,0,24,50,70,0,120,53,6,0,142,66,146,0,228,226,249,255,104,192,222,1,173,68,219,0,162,184,36,255,143,102,137,255,157,11,23,0,125,45,98,0,235,93,225,254,56,112,160,255,70,116,243,1,153,249,55,255,129,39,17,1,241,80,244,0,87,69,21,1,94,228,73,255,78,66,65,255,194,227,231,0,61,146,87,255,173,155,23,255,112,116,219,254,216,38,11,255,131,186,133,0,94,212,187,0,100,47,91,0,204,254,175,255,222,18,215,254,173,68,108,255,227,228,79,255,38,221,213,0,163,227,150,254,31,190,18,0,160,179,11,1,10,90,94,255,220,174,88,0,163,211,229,255,199,136,52,0,130,95,221,255,140,188,231,254,139,113,128,255,117,171,236,254,49,220,20,255,59,20,171,255,228,109,188,0,20,225,32,254,195,16,174,0,227,254,136,1,135,39,105,0,150,77,206,255,210,238,226,0,55,212,132,254,239,57,124,0,170,194,93,255,249,16,247,255,24,151,62,255,10,151,10,0,79,139,178,255,120,242,202,0,26,219,213,0,62,125,35,255,144,2,108,255,230,33,83,255,81,45,216,1,224,62,17,0,214,217,125,0,98,153,153,255,179,176,106,254,131,93,138,255,109,62,36,255,178,121,32,255,120,252,70,0,220,248,37,0,204,88,103,1,128,220,251,255,236,227,7,1,106,49,198,255,60,56,107,0,99,114,238,0,220,204,94,1,73,187,1,0,89,154,34,0,78,217,165,255,14,195,249,255,9,230,253,255,205,135,245,0,26,252,7,255,84,205,27,1,134,2,112,0,37,158,32,0,231,91,237,255,191,170,204,255,152,7,222,0,109,192,49,0,193,166,146,255,232,19,181,255,105,142,52,255,103,16,27,1,253,200,165,0,195,217,4,255,52,189,144,255,123,155,160,254,87,130,54,255,78,120,61,255,14,56,41,0,25,41,125,255,87,168,245,0,214,165,70,0,212,169,6,255,219,211,194,254,72,93,164,255,197,33,103,255,43,142,141,0,131,225,172,0,244,105,28,0,68,68,225,0,136,84,13,255,130,57,40,254,139,77,56,0,84,150,53,0,54,95,157,0,144,13,177,254,95,115,186,0,117,23,118,255,244,166,241,255,11,186,135,0,178,106,203,255,97,218,93,0,43,253,45,0,164,152,4,0,139,118,239,0,96,1,24,254,235,153,211,255,168,110,20,255,50,239,176,0,114,41,232,0,193,250,53,0,254,160,111,254,136,122,41,255,97,108,67,0,215,152,23,255,140,209,212,0,42,189,163,0,202,42,50,255,106,106,189,255,190,68,217,255,233,58,117,0,229,220,243,1,197,3,4,0,37,120,54,254,4,156,134,255,36,61,171,254,165,136,100,255,212,232,14,0,90,174,10,0,216,198,65,255,12,3,64,0,116,113,115,255,248,103,8,0,231,125,18,255,160,28,197,0,30,184,35,1,223,73,249,255,123,20,46,254,135,56,37,255,173,13,229,1,119,161,34,255,245,61,73,0,205,125,112,0,137,104,134,0,217,246,30,255,237,142,143,0,65,159,102,255,108,164,190,0,219,117,173,255,34,37,120,254,200,69,80,0,31,124,218,254,74,27,160,255,186,154,199,255,71,199,252,0,104,81,159,1,17,200,39,0,211,61,192,1,26,238,91,0,148,217,12,0,59,91,213,255,11,81,183,255,129,230,122,255,114,203,145,1,119,180,66,255,72,138,180,0,224,149,106,0,119,82,104,255,208,140,43,0,98,9,182,255,205,101,134,255,18,101,38,0,95,197,166,255,203,241,147,0,62,208,145,255,133,246,251,0,2,169,14,0,13,247,184,0,142,7,254,0,36,200,23,255,88,205,223,0,91,129,52,255,21,186,30,0,143,228,210,1,247,234,248,255,230,69,31,254,176,186,135,255,238,205,52,1,139,79,43,0,17,176,217,254,32,243,67,0,242,111,233,0,44,35,9,255,227,114,81,1,4,71,12,255,38,105,191,0,7,117,50,255,81,79,16,0,63,68,65,255,157,36,110,255,77,241,3,255,226,45,251,1,142,25,206,0,120,123,209,1,28,254,238,255,5,128,126,255,91,222,215,255,162,15,191,0,86,240,73,0,135,185,81,254,44,241,163,0,212,219,210,255,112,162,155,0,207,101,118,0,168,72,56,255,196,5,52,0,72,172,242,255,126,22,157,255,146,96,59,255,162,121,152,254,140,16,95,0,195,254,200,254,82,150,162,0,119,43,145,254,204,172,78,255,166,224,159,0,104,19,237,255,245,126,208,255,226,59,213,0,117,217,197,0,152,72,237,0,220,31,23,254,14,90,231,255,188,212,64,1,60,101,246,255,85,24,86,0,1,177,109,0,146,83,32,1,75,182,192,0,119,241,224,0,185,237,27,255,184,101,82,1,235,37,77,255,253,134,19,0,232,246,122,0,60,106,179,0,195,11,12,0,109,66,235,1,125,113,59,0,61,40,164,0,175,104,240,0,2,47,187,255,50,12,141,0,194,139,181,255,135,250,104,0,97,92,222,255,217,149,201,255,203,241,118,255,79,151,67,0,122,142,218,255,149,245,239,0,138,42,200,254,80,37,97,255,124,112,167,255,36,138,87,255,130,29,147,255,241,87,78,255,204,97,19,1,177,209,22,255,247,227,127,254,99,119,83,255,212,25,198,1,16,179,179,0,145,77,172,254,89,153,14,255,218,189,167,0,107,233,59,255,35,33,243,254,44,112,112,255,161,127,79,1,204,175,10,0,40,21,138,254,104,116,228,0,199,95,137,255,133,190,168,255,146,165,234,1,183,99,39,0,183,220,54,254,255,222,133,0,162,219,121,254,63,239,6,0,225,102,54,255,251,18,246,0,4,34,129,1,135,36,131,0,206,50,59,1,15,97,183,0,171,216,135,255,101,152,43,255,150,251,91,0,38,145,95,0,34,204,38,254,178,140,83,255,25,129,243,255,76,144,37,0,106,36,26,254,118,144,172,255,68,186,229,255,107,161,213,255,46,163,68,255,149,170,253,0,187,17,15,0,218,160,165,255,171,35,246,1,96,13,19,0,165,203,117,0,214,107,192,255,244,123,177,1,100,3,104,0,178,242,97,255,251,76,130,255,211,77,42,1,250,79,70,255,63,244,80,1,105,101,246,0,61,136,58,1,238,91,213,0,14,59,98,255,167,84,77,0,17,132,46,254,57,175,197,255,185,62,184,0,76,64,207,0,172,175,208,254,175,74,37,0,138,27,211,254,148,125,194,0,10,89,81,0,168,203,101,255,43,213,209,1,235,245,54,0,30,35,226,255,9,126,70,0,226,125,94,254,156,117,20,255,57,248,112,1,230,48,64,255,164,92,166,1,224,214,230,255,36,120,143,0,55,8,43,255,251,1,245,1,106,98,165,0,74,107,106,254,53,4,54,255,90,178,150,1,3,120,123,255,244,5,89,1,114,250,61,255,254,153,82,1,77,15,17,0,57,238,90,1,95,223,230,0,236,52,47,254,103,148,164,255,121,207,36,1,18,16,185,255,75,20,74,0,187,11,101,0,46,48,129,255,22,239,210,255,77,236,129,255,111,77,204,255,61,72,97,255,199,217,251,255,42,215,204,0,133,145,201,255,57,230,146,1,235,100,198,0,146,73,35,254,108,198,20,255,182,79,210,255,82,103,136,0,246,108,176,0,34,17,60,255,19,74,114,254,168,170,78,255,157,239,20,255,149,41,168,0,58,121,28,0,79,179,134,255,231,121,135,255,174,209,98,255,243,122,190,0,171,166,205,0,212,116,48,0,29,108,66,255,162,222,182,1,14,119,21,0,213,39,249,255,254,223,228,255,183,165,198,0,133,190,48,0,124,208,109,255,119,175,85,255,9,209,121,1,48,171,189,255,195,71,134,1,136,219,51,255,182,91,141,254,49,159,72,0,35,118,245,255,112,186,227,255,59,137,31,0,137,44,163,0,114,103,60,254,8,213,150,0,162,10,113,255,194,104,72,0,220,131,116,255,178,79,92,0,203,250,213,254,93,193,189,255,130,255,34,254,212,188,151,0,136,17,20,255,20,101,83,255,212,206,166,0,229,238,73,255,151,74,3,255,168,87,215,0,155,188,133,255,166,129,73,0,240,79,133,255,178,211,81,255,203,72,163,254,193,168,165,0,14,164,199,254,30,255,204,0,65,72,91,1,166,74,102,255,200,42,0,255,194,113,227,255,66,23,208,0,229,216,100,255,24,239,26,0,10,233,62,255,123,10,178,1,26,36,174,255,119,219,199,1,45,163,190,0,16,168,42,0,166,57,198,255,28,26,26,0,126,165,231,0,251,108,100,255,61,229,121,255,58,118,138,0,76,207,17,0,13,34,112,254,89,16,168,0,37,208,105,255,35,201,215,255,40,106,101,254,6,239,114,0,40,103,226,254,246,127,110,255,63,167,58,0,132,240,142,0,5,158,88,255,129,73,158,255,94,89,146,0,230,54,146,0,8,45,173,0,79,169,1,0,115,186,247,0,84,64,131,0,67,224,253,255,207,189,64,0,154,28,81,1,45,184,54,255,87,212,224,255,0,96,73,255,129,33,235,1,52,66,80,255,251,174,155,255,4,179,37,0,234,164,93,254,93,175,253,0,198,69,87,255,224,106,46,0,99,29,210,0,62,188,114,255,44,234,8,0,169,175,247,255,23,109,137,255,229,182,39,0,192,165,94,254,245,101,217,0,191,88,96,0,196,94,99,255,106,238,11,254,53,126,243,0,94,1,101,255,46,147,2,0,201,124,124,255,141,12,218,0,13,166,157,1,48,251,237,255,155,250,124,255,106,148,146,255,182,13,202,0,28,61,167,0,217,152,8,254,220,130,45,255,200,230,255,1,55,65,87,255,93,191,97,254,114,251,14,0,32,105,92,1,26,207,141,0,24,207,13,254,21,50,48,255,186,148,116,255,211,43,225,0,37,34,162,254,164,210,42,255,68,23,96,255,182,214,8,255,245,117,137,255,66,195,50,0,75,12,83,254,80,140,164,0,9,165,36,1,228,110,227,0,241,17,90,1,25,52,212,0,6,223,12,255,139,243,57,0,12,113,75,1,246,183,191,255,213,191,69,255,230,15,142,0,1,195,196,255,138,171,47,255,64,63,106,1,16,169,214,255,207,174,56,1,88,73,133,255,182,133,140,0,177,14,25,255,147,184,53,255,10,227,161,255,120,216,244,255,73,77,233,0,157,238,139,1,59,65,233,0,70,251,216,1,41,184,153,255,32,203,112,0,146,147,253,0,87,101,109,1,44,82,133,255,244,150,53,255,94,152,232,255,59,93,39,255,88,147,220,255,78,81,13,1,32,47,252,255,160,19,114,255,93,107,39,255,118,16,211,1,185,119,209,255,227,219,127,254,88,105,236,255,162,110,23,255,36,166,110,255,91,236,221,255,66,234,116,0,111,19,244,254,10,233,26,0,32,183,6,254,2,191,242,0,218,156,53,254,41,60,70,255,168,236,111,0,121,185,126,255,238,142,207,255,55,126,52,0,220,129,208,254,80,204,164,255,67,23,144,254,218,40,108,255,127,202,164,0,203,33,3,255,2,158,0,0,37,96,188,255,192,49,74,0,109,4,0,0,111,167,10,254,91,218,135,255,203,66,173,255,150,194,226,0,201,253,6,255,174,102,121,0,205,191,110,0,53,194,4,0,81,40,45,254,35,102,143,255,12,108,198,255,16,27,232,255,252,71,186,1,176,110,114,0,142,3,117,1,113,77,142,0,19,156,197,1,92,47,252,0,53,232,22,1,54,18,235,0,46,35,189,255,236,212,129,0,2,96,208,254,200,238,199,255,59,175,164,255,146,43,231,0,194,217,52,255,3,223,12,0,138,54,178,254,85,235,207,0,232,207,34,0,49,52,50,255,166,113,89,255,10,45,216,255,62,173,28,0,111,165,246,0,118,115,91,255,128,84,60,0,167,144,203,0,87,13,243,0,22,30,228,1,177,113,146,255,129,170,230,254,252,153,129,255,145,225,43,0,70,231,5,255,122,105,126,254,86,246,148,255,110,37,154,254,209,3,91,0,68,145,62,0,228,16,165,255,55,221,249,254,178,210,91,0,83,146,226,254,69,146,186,0,93,210,104,254,16,25,173,0,231,186,38,0,189,122,140,255,251,13,112,255,105,110,93,0,251,72,170,0,192,23,223,255,24,3,202,1,225,93,228,0,153,147,199,254,109,170,22,0,248,101,246,255,178,124,12,255,178,254,102,254,55,4,65,0,125,214,180,0,183,96,147,0,45,117,23,254,132,191,249,0,143,176,203,254,136,183,54,255,146,234,177,0,146,101,86,255,44,123,143,1,33,209,152,0,192,90,41,254,83,15,125,255,213,172,82,0,215,169,144,0,16,13,34,0,32,209,100,255,84,18,249,1,197,17,236,255,217,186,230,0,49,160,176,255,111,118,97,255,237,104,235,0,79,59,92,254,69,249,11,255,35,172,74,1,19,118,68,0,222,124,165,255,180,66,35,255,86,174,246,0,43,74,111,255,126,144,86,255,228,234,91,0,242,213,24,254,69,44,235,255,220,180,35,0,8,248,7,255,102,47,92,255,240,205,102,255,113,230,171,1,31,185,201,255,194,246,70,255,122,17,187,0,134,70,199,255,149,3,150,255,117,63,103,0,65,104,123,255,212,54,19,1,6,141,88,0,83,134,243,255,136,53,103,0,169,27,180,0,177,49,24,0,111,54,167,0,195,61,215,255,31,1,108,1,60,42,70,0,185,3,162,255,194,149,40,255,246,127,38,254,190,119,38,255,61,119,8,1,96,161,219,255,42,203,221,1,177,242,164,255,245,159,10,0,116,196,0,0,5,93,205,254,128,127,179,0,125,237,246,255,149,162,217,255,87,37,20,254,140,238,192,0,9,9,193,0,97,1,226,0,29,38,10,0,0,136,63,255,229,72,210,254,38,134,92,255,78,218,208,1,104,36,84,255,12,5,193,255,242,175,61,255,191,169,46,1,179,147,147,255,113,190,139,254,125,172,31,0,3,75,252,254,215,36,15,0,193,27,24,1,255,69,149,255,110,129,118,0,203,93,249,0,138,137,64,254,38,70,6,0,153,116,222,0,161,74,123,0,193,99,79,255,118,59,94,255,61,12,43,1,146,177,157,0,46,147,191,0,16,255,38,0,11,51,31,1,60,58,98,255,111,194,77,1,154,91,244,0,140,40,144,1,173,10,251,0,203,209,50,254,108,130,78,0,228,180,90,0,174,7,250,0,31,174,60,0,41,171,30,0,116,99,82,255,118,193,139,255,187,173,198,254,218,111,56,0,185,123,216,0,249,158,52,0,52,180,93,255,201,9,91,255,56,45,166,254,132,155,203,255,58,232,110,0,52,211,89,255,253,0,162,1,9,87,183,0,145,136,44,1,94,122,245,0,85,188,171,1,147,92,198,0,0,8,104,0,30,95,174,0,221,230,52,1,247,247,235,255,137,174,53,255,35,21,204,255,71,227,214,1,232,82,194,0,11,48,227,255,170,73,184,255,198,251,252,254,44,112,34,0,131,101,131,255,72,168,187,0,132,135,125,255,138,104,97,255,238,184,168,255,243,104,84,255,135,216,226,255,139,144,237,0,188,137,150,1,80,56,140,255,86,169,167,255,194,78,25,255,220,17,180,255,17,13,193,0,117,137,212,255,141,224,151,0,49,244,175,0,193,99,175,255,19,99,154,1,255,65,62,255,156,210,55,255,242,244,3,255,250,14,149,0,158,88,217,255,157,207,134,254,251,232,28,0,46,156,251,255,171,56,184,255,239,51,234,0,142,138,131,255,25,254,243,1,10,201,194,0,63,97,75,0,210,239,162,0,192,200,31,1,117,214,243,0,24,71,222,254,54,40,232,255,76,183,111,254,144,14,87,255,214,79,136,255,216,196,212,0,132,27,140,254,131,5,253,0,124,108,19,255,28,215,75,0,76,222,55,254,233,182,63,0,68,171,191,254,52,111,222,255,10,105,77,255,80,170,235,0,143,24,88,255,45,231,121,0,148,129,224,1,61,246,84,0,253,46,219,255,239,76,33,0,49,148,18,254,230,37,69,0,67,134,22,254,142,155,94,0,31,157,211,254,213,42,30,255,4,228,247,254,252,176,13,255,39,0,31,254,241,244,255,255,170,45,10,254,253,222,249,0,222,114,132,0,255,47,6,255,180,163,179,1,84,94,151,255,89,209,82,254,229,52,169,255,213,236,0,1,214,56,228,255,135,119,151,255,112,201,193,0,83,160,53,254,6,151,66,0,18,162,17,0,233,97,91,0,131,5,78,1,181,120,53,255,117,95,63,255,237,117,185,0,191,126,136,255,144,119,233,0,183,57,97,1,47,201,187,255,167,165,119,1,45,100,126,0,21,98,6,254,145,150,95,255,120,54,152,0,209,98,104,0,143,111,30,254,184,148,249,0,235,216,46,0,248,202,148,255,57,95,22,0,242,225,163,0,233,247,232,255,71,171,19,255,103,244,49,255,84,103,93,255,68,121,244,1,82,224,13,0,41,79,43,255,249,206,167,255,215,52,21,254,192,32,22,255,247,111,60,0,101,74,38,255,22,91,84,254,29,28,13,255,198,231,215,254,244,154,200,0,223,137,237,0,211,132,14,0,95,64,206,255,17,62,247,255,233,131,121,1,93,23,77,0,205,204,52,254,81,189,136,0,180,219,138,1,143,18,94,0,204,43,140,254,188,175,219,0,111,98,143,255,151,63,162,255,211,50,71,254,19,146,53,0,146,45,83,254,178,82,238,255,16,133,84,255,226,198,93,255,201,97,20,255,120,118,35,255,114,50,231,255,162,229,156,255,211,26,12,0,114,39,115,255,206,212,134,0,197,217,160,255,116,129,94,254,199,215,219,255,75,223,249,1,253,116,181,255,232,215,104,255,228,130,246,255,185,117,86,0,14,5,8,0,239,29,61,1,237,87,133,255,125,146,137,254,204,168,223,0,46,168,245,0,154,105,22,0,220,212,161,255,107,69,24,255,137,218,181,255,241,84,198,255,130,122,211,255,141,8,153,255,190,177,118,0,96,89,178,0,255,16,48,254,122,96,105,255,117,54,232,255,34,126,105,255,204,67,166,0,232,52,138,255,211,147,12,0,25,54,7,0,44,15,215,254,51,236,45,0,190,68,129,1,106,147,225,0,28,93,45,254,236,141,15,255,17,61,161,0,220,115,192,0,236,145,24,254,111,168,169,0,224,58,63,255,127,164,188,0,82,234,75,1,224,158,134,0,209,68,110,1,217,166,217,0,70,225,166,1,187,193,143,255,16,7,88,255,10,205,140,0,117,192,156,1,17,56,38,0,27,124,108,1,171,215,55,255,95,253,212,0,155,135,168,255,246,178,153,254,154,68,74,0,232,61,96,254,105,132,59,0,33,76,199,1,189,176,130,255,9,104,25,254,75,198,102,255,233,1,112,0,108,220,20,255,114,230,70,0,140,194,133,255,57,158,164,254,146,6,80,255,169,196,97,1,85,183,130,0,70,158,222,1,59,237,234,255,96,25,26,255,232,175,97,255,11,121,248,254,88,35,194,0,219,180,252,254,74,8,227,0,195,227,73,1,184,110,161,255,49,233,164,1,128,53,47,0,82,14,121,255,193,190,58,0,48,174,117,255,132,23,32,0,40,10,134,1,22,51,25,255,240,11,176,255,110,57,146,0,117,143,239,1,157,101,118,255,54,84,76,0,205,184,18,255,47,4,72,255,78,112,85,255,193,50,66,1,93,16,52,255,8,105,134,0,12,109,72,255,58,156,251,0,144,35,204,0,44,160,117,254,50,107,194,0,1,68,165,255,111,110,162,0,158,83,40,254,76,214,234,0,58,216,205,255,171,96,147,255,40,227,114,1,176,227,241,0,70,249,183,1,136,84,139,255,60,122,247,254,143,9,117,255,177,174,137,254,73,247,143,0,236,185,126,255,62,25,247,255,45,64,56,255,161,244,6,0,34,57,56,1,105,202,83,0,128,147,208,0,6,103,10,255,74,138,65,255,97,80,100,255,214,174,33,255,50,134,74,255,110,151,130,254,111,84,172,0,84,199,75,254,248,59,112,255,8,216,178,1,9,183,95,0,238,27,8,254,170,205,220,0,195,229,135,0,98,76,237,255,226,91,26,1,82,219,39,255,225,190,199,1,217,200,121,255,81,179,8,255,140,65,206,0,178,207,87,254,250,252,46,255,104,89,110,1,253,189,158,255,144,214,158,255,160,245,54,255,53,183,92,1,21,200,194,255,146,33,113,1,209,1,255,0,235,106,43,255,167,52,232,0,157,229,221,0,51,30,25,0,250,221,27,1,65,147,87,255,79,123,196,0,65,196,223,255,76,44,17,1,85,241,68,0,202,183,249,255,65,212,212,255,9,33,154,1,71,59,80,0,175,194,59,255,141,72,9,0,100,160,244,0,230,208,56,0,59,25,75,254,80,194,194,0,18,3,200,254,160,159,115,0,132,143,247,1,111,93,57,255,58,237,11,1,134,222,135,255,122,163,108,1,123,43,190,255,251,189,206,254,80,182,72,255,208,246,224,1,17,60,9,0,161,207,38,0,141,109,91,0,216,15,211,255,136,78,110,0,98,163,104,255,21,80,121,255,173,178,183,1,127,143,4,0,104,60,82,254,214,16,13,255,96,238,33,1,158,148,230,255,127,129,62,255,51,255,210,255,62,141,236,254,157,55,224,255,114,39,244,0,192,188,250,255,228,76,53,0,98,84,81,255,173,203,61,254,147,50,55,255,204,235,191,0,52,197,244,0,88,43,211,254,27,191,119,0,188,231,154,0,66,81,161,0,92,193,160,1,250,227,120,0,123,55,226,0,184,17,72,0,133,168,10,254,22,135,156,255,41,25,103,255,48,202,58,0,186,149,81,255,188,134,239,0,235,181,189,254,217,139,188,255,74,48,82,0,46,218,229,0,189,253,251,0,50,229,12,255,211,141,191,1,128,244,25,255,169,231,122,254,86,47,189,255,132,183,23,255,37,178,150,255,51,137,253,0,200,78,31,0,22,105,50,0,130,60,0,0,132,163,91,254,23,231,187,0,192,79,239,0,157,102,164,255,192,82,20,1,24,181,103,255,240,9,234,0,1,123,164,255,133,233,0,255,202,242,242,0,60,186,245,0,241,16,199,255,224,116,158,254,191,125,91,255,224,86,207,0,121,37,231,255,227,9,198,255,15,153,239,255,121,232,217,254,75,112,82,0,95,12,57,254,51,214,105,255,148,220,97,1,199,98,36,0,156,209,12,254,10,212,52,0,217,180,55,254,212,170,232,255,216,20,84,255,157,250,135,0,157,99,127,254,1,206,41,0,149,36,70,1,54,196,201,255,87,116,0,254,235,171,150,0,27,163,234,0,202,135,180,0,208,95,0,254,123,156,93,0,183,62,75,0,137,235,182,0,204,225,255,255,214,139,210,255,2,115,8,255,29,12,111,0,52,156,1,0,253,21,251,255,37,165,31,254,12,130,211,0,106,18,53,254,42,99,154,0,14,217,61,254,216,11,92,255,200,197,112,254,147,38,199,0,36,252,120,254,107,169,77,0,1,123,159,255,207,75,102,0,163,175,196,0,44,1,240,0,120,186,176,254,13,98,76,255,237,124,241,255,232,146,188,255,200,96,224,0,204,31,41,0,208,200,13,0,21,225,96,255,175,156,196,0,247,208,126,0,62,184,244,254,2,171,81,0,85,115,158,0,54,64,45,255,19,138,114,0,135,71,205,0,227,47,147,1,218,231,66,0,253,209,28,0,244,15,173,255,6,15,118,254,16,150,208,255,185,22,50,255,86,112,207,255,75,113,215,1,63,146,43,255,4,225,19,254,227,23,62,255,14,255,214,254,45,8,205,255,87,197,151,254,210,82,215,255,245,248,247,255,128,248,70,0,225,247,87,0,90,120,70,0,213,245,92,0,13,133,226,0,47,181,5,1,92,163,105,255,6,30,133,254,232,178,61,255,230,149,24,255,18,49,158,0,228,100,61,254,116,243,251,255,77,75,92,1,81,219,147,255,76,163,254,254,141,213,246,0,232,37,152,254,97,44,100,0,201,37,50,1,212,244,57,0,174,171,183,255,249,74,112,0,166,156,30,0,222,221,97,255,243,93,73,254,251,101,100,255,216,217,93,255,254,138,187,255,142,190,52,255,59,203,177,255,200,94,52,0,115,114,158,255,165,152,104,1,126,99,226,255,118,157,244,1,107,200,16,0,193,90,229,0,121,6,88,0,156,32,93,254,125,241,211,255,14,237,157,255,165,154,21,255,184,224,22,255,250,24,152,255,113,77,31,0,247,171,23,255,237,177,204,255,52,137,145,255,194,182,114,0,224,234,149,0,10,111,103,1,201,129,4,0,238,142,78,0,52,6,40,255,110,213,165,254,60,207,253,0,62,215,69,0,96,97,0,255,49,45,202,0,120,121,22,255,235,139,48,1,198,45,34,255,182,50,27,1,131,210,91,255,46,54,128,0,175,123,105,255,198,141,78,254,67,244,239,255,245,54,103,254,78,38,242,255,2,92,249,254,251,174,87,255,139,63,144,0,24,108,27,255,34,102,18,1,34,22,152,0,66,229,118,254,50,143,99,0,144,169,149,1,118,30,152,0,178,8,121,1,8,159,18,0,90,101,230,255,129,29,119,0,68,36,11,1,232,183,55,0,23,255,96,255,161,41,193,255,63,139,222,0,15,179,243,0,255,100,15,255,82,53,135,0,137,57,149,1,99,240,170,255,22,230,228,254,49,180,82,255,61,82,43,0,110,245,217,0,199,125,61,0,46,253,52,0,141,197,219,0,211,159,193,0,55,121,105,254,183,20,129,0,169,119,170,255,203,178,139,255,135,40,182,255,172,13,202,255,65,178,148,0,8,207,43,0,122,53,127,1,74,161,48,0,227,214,128,254,86,11,243,255,100,86,7,1,245,68,134,255,61,43,21,1,152,84,94,255,190,60,250,254,239,118,232,255,214,136,37,1,113,76,107,255,93,104,100,1,144,206,23,255,110,150,154,1,228,103,185,0,218,49,50,254,135,77,139,255,185,1,78,0,0,161,148,255,97,29,233,255,207,148,149,255,160,168,0,0,91,128,171,255,6,28,19,254,11,111,247,0,39,187,150,255,138,232,149,0,117,62,68,255,63,216,188,255,235,234,32,254,29,57,160,255,25,12,241,1,169,60,191,0,32,131,141,255,237,159,123,255,94,197,94,254,116,254,3,255,92,179,97,254,121,97,92,255,170,112,14,0,21,149,248,0,248,227,3,0,80,96,109,0,75,192,74,1,12,90,226,255,161,106,68,1,208,114,127,255,114,42,255,254,74,26,74,255,247,179,150,254,121,140,60,0,147,70,200,255,214,40,161,255,161,188,201,255,141,65,135,255,242,115,252,0,62,47,202,0,180,149,255,254,130,55,237,0,165,17,186,255,10,169,194,0,156,109,218,255,112,140,123,255,104,128,223,254,177,142,108,255,121,37,219,255,128,77,18,255,111,108,23,1,91,192,75,0,174,245,22,255,4,236,62,255,43,64,153,1,227,173,254,0,237,122,132,1,127,89,186,255,142,82,128,254,252,84,174,0,90,179,177,1,243,214,87,255,103,60,162,255,208,130,14,255,11,130,139,0,206,129,219,255,94,217,157,255,239,230,230,255,116,115,159,254,164,107,95,0,51,218,2,1,216,125,198,255,140,202,128,254,11,95,68,255,55,9,93,254,174,153,6,255,204,172,96,0,69,160,110,0,213,38,49,254,27,80,213,0,118,125,114,0,70,70,67,255,15,142,73,255,131,122,185,255,243,20,50,254,130,237,40,0,210,159,140,1,197,151,65,255,84,153,66,0,195,126,90,0,16,238,236,1,118,187,102,255,3,24,133,255,187,69,230,0,56,197,92,1,213,69,94,255,80,138,229,1,206,7,230,0,222,111,230,1,91,233,119,255,9,89,7,1,2,98,1,0,148,74,133,255,51,246,180,255,228,177,112,1,58,189,108,255,194,203,237,254,21,209,195,0,147,10,35,1,86,157,226,0,31,163,139,254,56,7,75,255,62,90,116,0,181,60,169,0,138,162,212,254,81,167,31,0,205,90,112,255,33,112,227,0,83,151,117,1,177,224,73,255,174,144,217,255,230,204,79,255,22,77,232,255,114,78,234,0,224,57,126,254,9,49,141,0,242,147,165,1,104,182,140,255,167,132,12,1,123,68,127,0,225,87,39,1,251,108,8,0,198,193,143,1,121,135,207,255,172,22,70,0,50,68,116,255,101,175,40,255,248,105,233,0,166,203,7,0,110,197,218,0,215,254,26,254,168,226,253,0,31,143,96,0,11,103,41,0,183,129,203,254,100,247,74,255,213,126,132,0,210,147,44,0,199,234,27,1,148,47,181,0,155,91,158,1,54,105,175,255,2,78,145,254,102,154,95,0,128,207,127,254,52,124,236,255,130,84,71,0,221,243,211,0,152,170,207,0,222,106,199,0,183,84,94,254,92,200,56,255,138,182,115,1,142,96,146,0,133,136,228,0,97,18,150,0,55,251,66,0,140,102,4,0,202,103,151,0,30,19,248,255,51,184,207,0,202,198,89,0,55,197,225,254,169,95,249,255,66,65,68,255,188,234,126,0,166,223,100,1,112,239,244,0,144,23,194,0,58,39,182,0,244,44,24,254,175,68,179,255,152,118,154,1,176,162,130,0,217,114,204,254,173,126,78,255,33,222,30,255,36,2,91,255,2,143,243,0,9,235,215,0,3,171,151,1,24,215,245,255,168,47,164,254,241,146,207,0,69,129,180,0,68,243,113,0,144,53,72,254,251,45,14,0,23,110,168,0,68,68,79,255,110,70,95,254,174,91,144,255,33,206,95,255,137,41,7,255,19,187,153,254,35,255,112,255,9,145,185,254,50,157,37,0,11,112,49,1,102,8,190,255,234,243,169,1,60,85,23,0,74,39,189,0,116,49,239,0,173,213,210,0,46,161,108,255,159,150,37,0,196,120,185,255,34,98,6,255,153,195,62,255,97,230,71,255,102,61,76,0,26,212,236,255,164,97,16,0,198,59,146,0,163,23,196,0,56,24,61,0,181,98,193,0,251,147,229,255,98,189,24,255,46,54,206,255,234,82,246,0,183,103,38,1,109,62,204,0,10,240,224,0,146,22,117,255,142,154,120,0,69,212,35,0,208,99,118,1,121,255,3,255,72,6,194,0,117,17,197,255,125,15,23,0,154,79,153,0,214,94,197,255,185,55,147,255,62,254,78,254,127,82,153,0,110,102,63,255,108,82,161,255,105,187,212,1,80,138,39,0,60,255,93,255,72,12,186,0,210,251,31,1,190,167,144,255,228,44,19,254,128,67,232,0,214,249,107,254,136,145,86,255,132,46,176,0,189,187,227,255,208,22,140,0,217,211,116,0,50,81,186,254,139,250,31,0,30,64,198,1,135,155,100,0,160,206,23,254,187,162,211,255,16,188,63,0,254,208,49,0,85,84,191,0,241,192,242,255,153,126,145,1,234,162,162,255,230,97,216,1,64,135,126,0,190,148,223,1,52,0,43,255,28,39,189,1,64,136,238,0,175,196,185,0,98,226,213,255,127,159,244,1,226,175,60,0,160,233,142,1,180,243,207,255,69,152,89,1,31,101,21,0,144,25,164,254,139,191,209,0,91,25,121,0,32,147,5,0,39,186,123,255,63,115,230,255,93,167,198,255,143,213,220,255,179,156,19,255,25,66,122,0,214,160,217,255,2,45,62,255,106,79,146,254,51,137,99,255,87,100,231,255,175,145,232,255,101,184,1,255,174,9,125,0,82,37,161,1,36,114,141,255,48,222,142,255,245,186,154,0,5,174,221,254,63,114,155,255,135,55,160,1,80,31,135,0,126,250,179,1,236,218,45,0,20,28,145,1,16,147,73,0,249,189,132,1,17,189,192,255,223,142,198,255,72,20,15,255,250,53,237,254,15,11,18,0,27,211,113,254,213,107,56,255,174,147,146,255,96,126,48,0,23,193,109,1,37,162,94,0,199,157,249,254,24,128,187,255,205,49,178,254,93,164,42,255,43,119,235,1,88,183,237,255,218,210,1,255,107,254,42,0,230,10,99,255,162,0,226,0,219,237,91,0,129,178,203,0,208,50,95,254,206,208,95,255,247,191,89,254,110,234,79,255,165,61,243,0,20,122,112,255,246,246,185,254,103,4,123,0,233,99,230,1,219,91,252,255,199,222,22,255,179,245,233,255,211,241,234,0,111,250,192,255,85,84,136,0,101,58,50,255,131,173,156,254,119,45,51,255,118,233,16,254,242,90,214,0,94,159,219,1,3,3,234,255,98,76,92,254,80,54,230,0,5,228,231,254,53,24,223,255,113,56,118,1,20,132,1,255,171,210,236,0,56,241,158,255,186,115,19,255,8,229,174,0,48,44,0,1,114,114,166,255,6,73,226,255,205,89,244,0,137,227,75,1,248,173,56,0,74,120,246,254,119,3,11,255,81,120,198,255,136,122,98,255,146,241,221,1,109,194,78,255,223,241,70,1,214,200,169,255,97,190,47,255,47,103,174,255,99,92,72,254,118,233,180,255,193,35,233,254,26,229,32,255,222,252,198,0,204,43,71,255,199,84,172,0,134,102,190,0,111,238,97,254,230,40,230,0,227,205,64,254,200,12,225,0,166,25,222,0,113,69,51,255,143,159,24,0,167,184,74,0,29,224,116,254,158,208,233,0,193,116,126,255,212,11,133,255,22,58,140,1,204,36,51,255,232,30,43,0,235,70,181,255,64,56,146,254,169,18,84,255,226,1,13,255,200,50,176,255,52,213,245,254,168,209,97,0,191,71,55,0,34,78,156,0,232,144,58,1,185,74,189,0,186,142,149,254,64,69,127,255,161,203,147,255,176,151,191,0,136,231,203,254,163,182,137,0,161,126,251,254,233,32,66,0,68,207,66,0,30,28,37,0,93,114,96,1,254,92,247,255,44,171,69,0,202,119,11,255,188,118,50,1,255,83,136,255,71,82,26,0,70,227,2,0,32,235,121,1,181,41,154,0,71,134,229,254,202,255,36,0,41,152,5,0,154,63,73,255,34,182,124,0,121,221,150,255,26,204,213,1,41,172,87,0,90,157,146,255,109,130,20,0,71,107,200,255,243,102,189,0,1,195,145,254,46,88,117,0,8,206,227,0,191,110,253,255,109,128,20,254,134,85,51,255,137,177,112,1,216,34,22,255,131,16,208,255,121,149,170,0,114,19,23,1,166,80,31,255,113,240,122,0,232,179,250,0,68,110,180,254,210,170,119,0,223,108,164,255,207,79,233,255,27,229,226,254,209,98,81,255,79,68,7,0,131,185,100,0,170,29,162,255,17,162,107,255,57,21,11,1,100,200,181,255,127,65,166,1,165,134,204,0,104,167,168,0,1,164,79,0,146,135,59,1,70,50,128,255,102,119,13,254,227,6,135,0,162,142,179,255,160,100,222,0,27,224,219,1,158,93,195,255,234,141,137,0,16,24,125,255,238,206,47,255,97,17,98,255,116,110,12,255,96,115,77,0,91,227,232,255,248,254,79,255,92,229,6,254,88,198,139,0,206,75,129,0,250,77,206,255,141,244,123,1,138,69,220,0,32,151,6,1,131,167,22,255,237,68,167,254,199,189,150,0,163,171,138,255,51,188,6,255,95,29,137,254,148,226,179,0,181,107,208,255,134,31,82,255,151,101,45,255,129,202,225,0,224,72,147,0,48,138,151,255,195,64,206,254,237,218,158,0,106,29,137,254,253,189,233,255,103,15,17,255,194,97,255,0,178,45,169,254,198,225,155,0,39,48,117,255,135,106,115,0,97,38,181,0,150,47,65,255,83,130,229,254,246,38,129,0,92,239,154,254,91,99,127,0,161,111,33,255,238,217,242,255,131,185,195,255,213,191,158,255,41,150,218,0,132,169,131,0,89,84,252,1,171,70,128,255,163,248,203,254,1,50,180,255,124,76,85,1,251,111,80,0,99,66,239,255,154,237,182,255,221,126,133,254,74,204,99,255,65,147,119,255,99,56,167,255,79,248,149,255,116,155,228,255,237,43,14,254,69,137,11,255,22,250,241,1,91,122,143,255,205,249,243,0,212,26,60,255,48,182,176,1,48,23,191,255,203,121,152,254,45,74,213,255,62,90,18,254,245,163,230,255,185,106,116,255,83,35,159,0,12,33,2,255,80,34,62,0,16,87,174,255,173,101,85,0,202,36,81,254,160,69,204,255,64,225,187,0,58,206,94,0,86,144,47,0,229,86,245,0,63,145,190,1,37,5,39,0,109,251,26,0,137,147,234,0,162,121,145,255,144,116,206,255,197,232,185,255,183,190,140,255,73,12,254,255,139,20,242,255,170,90,239,255,97,66,187,255,245,181,135,254,222,136,52,0,245,5,51,254,203,47,78,0,152,101,216,0,73,23,125,0,254,96,33,1,235,210,73,255,43,209,88,1,7,129,109,0,122,104,228,254,170,242,203,0,242,204,135,255,202,28,233,255,65,6,127,0,159,144,71,0,100,140,95,0,78,150,13,0,251,107,118,1,182,58,125,255,1,38,108,255,141,189,209,255,8,155,125,1,113,163,91,255,121,79,190,255,134,239,108,255,76,47,248,0,163,228,239,0,17,111,10,0,88,149,75,255,215,235,239,0,167,159,24,255,47,151,108,255,107,209,188,0,233,231,99,254,28,202,148,255,174,35,138,255,110,24,68,255,2,69,181,0,107,102,82,0,102,237,7,0,92,36,237,255,221,162,83,1,55,202,6,255,135,234,135,255,24,250,222,0,65,94,168,254,245,248,210,255,167,108,201,254,255,161,111,0,205,8,254,0,136,13,116,0,100,176,132,255,43,215,126,255,177,133,130,255,158,79,148,0,67,224,37,1,12,206,21,255,62,34,110,1,237,104,175,255,80,132,111,255,142,174,72,0,84,229,180,254,105,179,140,0,64,248,15,255,233,138,16,0,245,67,123,254,218,121,212,255,63,95,218,1,213,133,137,255,143,182,82,255,48,28,11,0,244,114,141,1,209,175,76,255,157,181,150,255,186,229,3,255,164,157,111,1,231,189,139,0,119,202,190,255,218,106,64,255,68,235,63,254,96,26,172,255,187,47,11,1,215,18,251,255,81,84,89,0,68,58,128,0,94,113,5,1,92,129,208,255,97,15,83,254,9,28,188,0,239,9,164,0,60,205,152,0,192,163,98,255,184,18,60,0,217,182,139,0,109,59,120,255,4,192,251,0,169,210,240,255,37,172,92,254,148,211,245,255,179,65,52,0,253,13,115,0,185,174,206,1,114,188,149,255,237,90,173,0,43,199,192,255,88,108,113,0,52,35,76,0,66,25,148,255,221,4,7,255,151,241,114,255,190,209,232,0,98,50,199,0,151,150,213,255,18,74,36,1,53,40,7,0,19,135,65,255,26,172,69,0,174,237,85,0,99,95,41,0,3,56,16,0,39,160,177,255,200,106,218,254,185,68,84,255,91,186,61,254,67,143,141,255,13,244,166,255,99,114,198,0,199,110,163,255,193,18,186,0,124,239,246,1,110,68,22,0,2,235,46,1,212,60,107,0,105,42,105,1,14,230,152,0,7,5,131,0,141,104,154,255,213,3,6,0,131,228,162,255,179,100,28,1,231,123,85,255,206,14,223,1,253,96,230,0,38,152,149,1,98,137,122,0,214,205,3,255,226,152,179,255,6,133,137,0,158,69,140,255,113,162,154,255,180,243,172,255,27,189,115,255,143,46,220,255,213,134,225,255,126,29,69,0,188,43,137,1,242,70,9,0,90,204,255,255,231,170,147,0,23,56,19,254,56,125,157,255,48,179,218,255,79,182,253,255,38,212,191,1,41,235,124,0,96,151,28,0,135,148,190,0,205,249,39,254,52,96,136,255,212,44,136,255,67,209,131,255,252,130,23,255,219,128,20,255,198,129,118,0,108,101,11,0,178,5,146,1,62,7,100,255,181,236,94,254,28,26,164,0,76,22,112,255,120,102,79,0,202,192,229,1,200,176,215,0,41,64,244,255,206,184,78,0,167,45,63,1,160,35,0,255,59,12,142,255,204,9,144,255,219,94,229,1,122,27,112,0,189,105,109,255,64,208,74,255,251,127,55,1,2,226,198,0,44,76,209,0,151,152,77,255,210,23,46,1,201,171,69,255,44,211,231,0,190,37,224,255,245,196,62,255,169,181,222,255,34,211,17,0,119,241,197,255,229,35,152,1,21,69,40,255,178,226,161,0,148,179,193,0,219,194,254,1,40,206,51,255,231,92,250,1,67,153,170,0,21,148,241,0,170,69,82,255,121,18,231,255,92,114,3,0,184,62,230,0,225,201,87,255,146,96,162,255,181,242,220,0,173,187,221,1,226,62,170,255,56,126,217,1,117,13,227,255,179,44,239,0,157,141,155,255,144,221,83,0,235,209,208,0,42,17,165,1,251,81,133,0,124,245,201,254,97,211,24,255,83,214,166,0,154,36,9,255,248,47,127,0,90,219,140,255,161,217,38,254,212,147,63,255,66,84,148,1,207,3,1,0,230,134,89,1,127,78,122,255,224,155,1,255,82,136,74,0,178,156,208,255,186,25,49,255,222,3,210,1,229,150,190,255,85,162,52,255,41,84,141,255,73,123,84,254,93,17,150,0,119,19,28,1,32,22,215,255,28,23,204,255,142,241,52,255,228,52,125,0,29,76,207,0,215,167,250,254,175,164,230,0,55,207,105,1,109,187,245,255,161,44,220,1,41,101,128,255,167,16,94,0,93,214,107,255,118,72,0,254,80,61,234,255,121,175,125,0,139,169,251,0,97,39,147,254,250,196,49,255,165,179,110,254,223,70,187,255,22,142,125,1,154,179,138,255,118,176,42,1,10,174,153,0,156,92,102,0,168,13,161,255,143,16,32,0,250,197,180,255,203,163,44,1,87,32,36,0,161,153,20,255,123,252,15,0,25,227,80,0,60,88,142,0,17,22,201,1,154,205,77,255,39,63,47,0,8,122,141,0,128,23,182,254,204,39,19,255,4,112,29,255,23,36,140,255,210,234,116,254,53,50,63,255,121,171,104,255,160,219,94,0,87,82,14,254,231,42,5,0,165,139,127,254,86,78,38,0,130,60,66,254,203,30,45,255,46,196,122,1,249,53,162,255,136,143,103,254,215,210,114,0,231,7,160,254,169,152,42,255,111,45,246,0,142,131,135,255,131,71,204,255,36,226,11,0,0,28,242,255,225,138,213,255,247,46,216,254,245,3,183,0,108,252,74,1,206,26,48,255,205,54,246,255,211,198,36,255,121,35,50,0,52,216,202,255,38,139,129,254,242,73,148,0,67,231,141,255,42,47,204,0,78,116,25,1,4,225,191,255,6,147,228,0,58,88,177,0,122,165,229,255,252,83,201,255,224,167,96,1,177,184,158,255,242,105,179,1,248,198,240,0,133,66,203,1,254,36,47,0,45,24,115,255,119,62,254,0,196,225,186,254,123,141,172,0,26,85,41,255,226,111,183,0,213,231,151,0,4,59,7,255,238,138,148,0,66,147,33,255,31,246,141,255,209,141,116,255,104,112,31,0,88,161,172,0,83,215,230,254,47,111,151,0,45,38,52,1,132,45,204,0,138,128,109,254,233,117,134,255,243,190,173,254,241,236,240,0,82,127,236,254,40,223,161,255,110,182,225,255,123,174,239,0,135,242,145,1,51,209,154,0,150,3,115,254,217,164,252,255,55,156,69,1,84,94,255,255,232,73,45,1,20,19,212,255,96,197,59,254,96,251,33,0,38,199,73,1,64,172,247,255,117,116,56,255,228,17,18,0,62,138,103,1,246,229,164,255,244,118,201,254,86,32,159,255,109,34,137,1,85,211,186,0,10,193,193,254,122,194,177,0,122,238,102,255,162,218,171,0,108,217,161,1,158,170,34,0,176,47,155,1,181,228,11,255,8,156,0,0,16,75,93,0,206,98,255,1,58,154,35,0,12,243,184,254,67,117,66,255,230,229,123,0,201,42,110,0,134,228,178,254,186,108,118,255,58,19,154,255,82,169,62,255,114,143,115,1,239,196,50,255,173,48,193,255,147,2,84,255,150,134,147,254,95,232,73,0,109,227,52,254,191,137,10,0,40,204,30,254,76,52,97,255,164,235,126,0,254,124,188,0,74,182,21,1,121,29,35,255,241,30,7,254,85,218,214,255,7,84,150,254,81,27,117,255,160,159,152,254,66,24,221,255,227,10,60,1,141,135,102,0,208,189,150,1,117,179,92,0,132,22,136,255,120,199,28,0,21,129,79,254,182,9,65,0,218,163,169,0,246,147,198,255,107,38,144,1,78,175,205,255,214,5,250,254,47,88,29,255,164,47,204,255,43,55,6,255,131,134,207,254,116,100,214,0,96,140,75,1,106,220,144,0,195,32,28,1,172,81,5,255,199,179,52,255,37,84,203,0,170,112,174,0,11,4,91,0,69,244,27,1,117,131,92,0,33,152,175,255,140,153,107,255,251,135,43,254,87,138,4,255,198,234,147,254,121,152,84,255,205,101,155,1,157,9,25,0,72,106,17,254,108,153,0,255],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+20480);allocate([189,229,186,0,193,8,176,255,174,149,209,0,238,130,29,0,233,214,126,1,61,226,102,0,57,163,4,1,198,111,51,255,45,79,78,1,115,210,10,255,218,9,25,255,158,139,198,255,211,82,187,254,80,133,83,0,157,129,230,1,243,133,134,255,40,136,16,0,77,107,79,255,183,85,92,1,177,204,202,0,163,71,147,255,152,69,190,0,172,51,188,1,250,210,172,255,211,242,113,1,89,89,26,255,64,66,111,254,116,152,42,0,161,39,27,255,54,80,254,0,106,209,115,1,103,124,97,0,221,230,98,255,31,231,6,0,178,192,120,254,15,217,203,255,124,158,79,0,112,145,247,0,92,250,48,1,163,181,193,255,37,47,142,254,144,189,165,255,46,146,240,0,6,75,128,0,41,157,200,254,87,121,213,0,1,113,236,0,5,45,250,0,144,12,82,0,31,108,231,0,225,239,119,255,167,7,189,255,187,228,132,255,110,189,34,0,94,44,204,1,162,52,197,0,78,188,241,254,57,20,141,0,244,146,47,1,206,100,51,0,125,107,148,254,27,195,77,0,152,253,90,1,7,143,144,255,51,37,31,0,34,119,38,255,7,197,118,0,153,188,211,0,151,20,116,254,245,65,52,255,180,253,110,1,47,177,209,0,161,99,17,255,118,222,202,0,125,179,252,1,123,54,126,255,145,57,191,0,55,186,121,0,10,243,138,0,205,211,229,255,125,156,241,254,148,156,185,255,227,19,188,255,124,41,32,255,31,34,206,254,17,57,83,0,204,22,37,255,42,96,98,0,119,102,184,1,3,190,28,0,110,82,218,255,200,204,192,255,201,145,118,0,117,204,146,0,132,32,98,1,192,194,121,0,106,161,248,1,237,88,124,0,23,212,26,0,205,171,90,255,248,48,216,1,141,37,230,255,124,203,0,254,158,168,30,255,214,248,21,0,112,187,7,255,75,133,239,255,74,227,243,255,250,147,70,0,214,120,162,0,167,9,179,255,22,158,18,0,218,77,209,1,97,109,81,255,244,33,179,255,57,52,57,255,65,172,210,255,249,71,209,255,142,169,238,0,158,189,153,255,174,254,103,254,98,33,14,0,141,76,230,255,113,139,52,255,15,58,212,0,168,215,201,255,248,204,215,1,223,68,160,255,57,154,183,254,47,231,121,0,106,166,137,0,81,136,138,0,165,43,51,0,231,139,61,0,57,95,59,254,118,98,25,255,151,63,236,1,94,190,250,255,169,185,114,1,5,250,58,255,75,105,97,1,215,223,134,0,113,99,163,1,128,62,112,0,99,106,147,0,163,195,10,0,33,205,182,0,214,14,174,255,129,38,231,255,53,182,223,0,98,42,159,255,247,13,40,0,188,210,177,1,6,21,0,255,255,61,148,254,137,45,129,255,89,26,116,254,126,38,114,0,251,50,242,254,121,134,128,255,204,249,167,254,165,235,215,0,202,177,243,0,133,141,62,0,240,130,190,1,110,175,255,0,0,20,146,1,37,210,121,255,7,39,130,0,142,250,84,255,141,200,207,0,9,95,104,255,11,244,174,0,134,232,126,0,167,1,123,254,16,193,149,255,232,233,239,1,213,70,112,255,252,116,160,254,242,222,220,255,205,85,227,0,7,185,58,0,118,247,63,1,116,77,177,255,62,245,200,254,63,18,37,255,107,53,232,254,50,221,211,0,162,219,7,254,2,94,43,0,182,62,182,254,160,78,200,255,135,140,170,0,235,184,228,0,175,53,138,254,80,58,77,255,152,201,2,1,63,196,34,0,5,30,184,0,171,176,154,0,121,59,206,0,38,99,39,0,172,80,77,254,0,134,151,0,186,33,241,254,94,253,223,255,44,114,252,0,108,126,57,255,201,40,13,255,39,229,27,255,39,239,23,1,151,121,51,255,153,150,248,0,10,234,174,255,118,246,4,254,200,245,38,0,69,161,242,1,16,178,150,0,113,56,130,0,171,31,105,0,26,88,108,255,49,42,106,0,251,169,66,0,69,93,149,0,20,57,254,0,164,25,111,0,90,188,90,255,204,4,197,0,40,213,50,1,212,96,132,255,88,138,180,254,228,146,124,255,184,246,247,0,65,117,86,255,253,102,210,254,254,121,36,0,137,115,3,255,60,24,216,0,134,18,29,0,59,226,97,0,176,142,71,0,7,209,161,0,189,84,51,254,155,250,72,0,213,84,235,255,45,222,224,0,238,148,143,255,170,42,53,255,78,167,117,0,186,0,40,255,125,177,103,255,69,225,66,0,227,7,88,1,75,172,6,0,169,45,227,1,16,36,70,255,50,2,9,255,139,193,22,0,143,183,231,254,218,69,50,0,236,56,161,1,213,131,42,0,138,145,44,254,136,229,40,255,49,63,35,255,61,145,245,255,101,192,2,254,232,167,113,0,152,104,38,1,121,185,218,0,121,139,211,254,119,240,35,0,65,189,217,254,187,179,162,255,160,187,230,0,62,248,14,255,60,78,97,0,255,247,163,255,225,59,91,255,107,71,58,255,241,47,33,1,50,117,236,0,219,177,63,254,244,90,179,0,35,194,215,255,189,67,50,255,23,135,129,0,104,189,37,255,185,57,194,0,35,62,231,255,220,248,108,0,12,231,178,0,143,80,91,1,131,93,101,255,144,39,2,1,255,250,178,0,5,17,236,254,139,32,46,0,204,188,38,254,245,115,52,255,191,113,73,254,191,108,69,255,22,69,245,1,23,203,178,0,170,99,170,0,65,248,111,0,37,108,153,255,64,37,69,0,0,88,62,254,89,148,144,255,191,68,224,1,241,39,53,0,41,203,237,255,145,126,194,255,221,42,253,255,25,99,151,0,97,253,223,1,74,115,49,255,6,175,72,255,59,176,203,0,124,183,249,1,228,228,99,0,129,12,207,254,168,192,195,255,204,176,16,254,152,234,171,0,77,37,85,255,33,120,135,255,142,194,227,1,31,214,58,0,213,187,125,255,232,46,60,255,190,116,42,254,151,178,19,255,51,62,237,254,204,236,193,0,194,232,60,0,172,34,157,255,189,16,184,254,103,3,95,255,141,233,36,254,41,25,11,255,21,195,166,0,118,245,45,0,67,213,149,255,159,12,18,255,187,164,227,1,160,25,5,0,12,78,195,1,43,197,225,0,48,142,41,254,196,155,60,255,223,199,18,1,145,136,156,0,252,117,169,254,145,226,238,0,239,23,107,0,109,181,188,255,230,112,49,254,73,170,237,255,231,183,227,255,80,220,20,0,194,107,127,1,127,205,101,0,46,52,197,1,210,171,36,255,88,3,90,255,56,151,141,0,96,187,255,255,42,78,200,0,254,70,70,1,244,125,168,0,204,68,138,1,124,215,70,0,102,66,200,254,17,52,228,0,117,220,143,254,203,248,123,0,56,18,174,255,186,151,164,255,51,232,208,1,160,228,43,255,249,29,25,1,68,190,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,98,108,97,107,101,50,98,0,83,45,62,98,117,102,108,101,110,32,60,61,32,66,76,65,75,69,50,66,95,66,76,79,67,75,66,89,84,69,83,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,47,98,108,97,107,101,50,47,114,101,102,47,98,108,97,107,101,50,98,45,114,101,102,46,99,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,95,95,102,105,110,97,108,0,111,117,116,108,101,110,32,60,61,32,85,73,78,84,56,95,77,65,88,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,47,98,108,97,107,101,50,47,114,101,102,47,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,46,99,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,0,107,101,121,108,101,110,32,60,61,32,85,73,78,84,56,95,77,65,88,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,95,105,110,105,116,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,95,102,105,110,97,108,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,40,41,59,32,125,0,123,32,105,102,32,40,77,111,100,117,108,101,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,32,61,61,61,32,117,110,100,101,102,105,110,101,100,41,32,123,32,116,114,121,32,123,32,118,97,114,32,119,105,110,100,111,119,95,32,61,32,34,111,98,106,101,99,116,34,32,61,61,61,32,116,121,112,101,111,102,32,119,105,110,100,111,119,32,63,32,119,105,110,100,111,119,32,58,32,115,101,108,102,44,32,99,114,121,112,116,111,95,32,61,32,116,121,112,101,111,102,32,119,105,110,100,111,119,95,46,99,114,121,112,116,111,32,33,61,61,32,34,117,110,100,101,102,105,110,101,100,34,32,63,32,119,105,110,100,111,119,95,46,99,114,121,112,116,111,32,58,32,119,105,110,100,111,119,95,46,109,115,67,114,121,112,116,111,44,32,114,97,110,100,111,109,86,97,108,117,101,115,83,116,97,110,100,97,114,100,32,61,32,102,117,110,99,116,105,111,110,40,41,32,123,32,118,97,114,32,98,117,102,32,61,32,110,101,119,32,85,105,110,116,51,50,65,114,114,97,121,40,49,41,59,32,99,114,121,112,116,111,95,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,115,40,98,117,102,41,59,32,114,101,116,117,114,110,32,98,117,102,91,48,93,32,62,62,62,32,48,59,32,125,59,32,114,97,110,100,111,109,86,97,108,117,101,115,83,116,97,110,100,97,114,100,40,41,59,32,77,111,100,117,108,101,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,32,61,32,114,97,110,100,111,109,86,97,108,117,101,115,83,116,97,110,100,97,114,100,59,32,125,32,99,97,116,99,104,32,40,101,41,32,123,32,116,114,121,32,123,32,118,97,114,32,99,114,121,112,116,111,32,61,32,114,101,113,117,105,114,101,40,39,99,114,121,112,116,111,39,41,44,32,114,97,110,100,111,109,86,97,108,117,101,78,111,100,101,74,83,32,61,32,102,117,110,99,116,105,111,110,40,41,32,123,32,118,97,114,32,98,117,102,32,61,32,99,114,121,112,116,111,46,114,97,110,100,111,109,66,121,116,101,115,40,52,41,59,32,114,101,116,117,114,110,32,40,98,117,102,91,48,93,32,60,60,32,50,52,32,124,32,98,117,102,91,49,93,32,60,60,32,49,54,32,124,32,98,117,102,91,50,93,32,60,60,32,56,32,124,32,98,117,102,91,51,93,41,32,62,62,62,32,48,59,32,125,59,32,114,97,110,100,111,109,86,97,108,117,101,78,111,100,101,74,83,40,41,59,32,77,111,100,117,108,101,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,32,61,32,114,97,110,100,111,109,86,97,108,117,101,78,111,100,101,74,83,59,32,125,32,99,97,116,99,104,32,40,101,41,32,123,32,116,104,114,111,119,32,39,78,111,32,115,101,99,117,114,101,32,114,97,110,100,111,109,32,110,117,109,98,101,114,32,103,101,110,101,114,97,116,111,114,32,102,111,117,110,100,39,59,32,125,32,125,32,125,32,125,0,98,117,102,95,108,101,110,32,60,61,32,83,73,90,69,95,77,65,88,0,114,97,110,100,111,109,98,121,116,101,115,47,114,97,110,100,111,109,98,121,116,101,115,46,99,0,114,97,110,100,111,109,98,121,116,101,115,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,49,46,48,46,49,49,0],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+30720);var tempDoublePtr=Runtime.alignMemory(allocate(12,"i8",ALLOC_STATIC),8);assert(tempDoublePtr%8==0);function copyTempFloat(ptr){HEAP8[tempDoublePtr]=HEAP8[ptr];HEAP8[tempDoublePtr+1]=HEAP8[ptr+1];HEAP8[tempDoublePtr+2]=HEAP8[ptr+2];HEAP8[tempDoublePtr+3]=HEAP8[ptr+3]}function copyTempDouble(ptr){HEAP8[tempDoublePtr]=HEAP8[ptr];HEAP8[tempDoublePtr+1]=HEAP8[ptr+1];HEAP8[tempDoublePtr+2]=HEAP8[ptr+2];HEAP8[tempDoublePtr+3]=HEAP8[ptr+3];HEAP8[tempDoublePtr+4]=HEAP8[ptr+4];HEAP8[tempDoublePtr+5]=HEAP8[ptr+5];HEAP8[tempDoublePtr+6]=HEAP8[ptr+6];HEAP8[tempDoublePtr+7]=HEAP8[ptr+7]}Module["_bitshift64Ashr"]=_bitshift64Ashr;Module["_i64Subtract"]=_i64Subtract;Module["_i64Add"]=_i64Add;Module["_memset"]=_memset;Module["_bitshift64Lshr"]=_bitshift64Lshr;Module["_bitshift64Shl"]=_bitshift64Shl;function _abort(){Module["abort"]()}function ___assert_fail(condition,filename,line,func){ABORT=true;throw"Assertion failed: "+Pointer_stringify(condition)+", at: "+[filename?Pointer_stringify(filename):"unknown filename",line,func?Pointer_stringify(func):"unknown function"]+" at "+stackTrace()}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest}Module["_memcpy"]=_memcpy;var _emscripten_asm_const=true;function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function _sysconf(name){switch(name){case 30:return PAGE_SIZE;case 85:return totalMemory/PAGE_SIZE;case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 80:case 81:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:case 95:case 52:case 51:case 46:return 200809;case 79:return 0;case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:return-1;case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;case 74:case 60:case 69:case 70:case 4:return 1024;case 31:case 42:case 72:return 32;case 87:case 26:case 33:return 2147483647;case 34:case 1:return 47839;case 38:case 36:return 99;case 43:case 37:return 2048;case 0:return 2097152;case 3:return 65536;case 28:return 32768;case 44:return 32767;case 75:return 16384;case 39:return 1e3;case 89:return 700;case 71:return 256;case 40:return 255;case 2:return 100;case 180:return 64;case 25:return 20;case 5:return 16;case 6:return 6;case 73:return 4;case 84:{if(typeof navigator==="object")return navigator["hardwareConcurrency"]||1;return 1}}___setErrNo(ERRNO_CODES.EINVAL);return-1}function _sbrk(bytes){var self=_sbrk;if(!self.called){DYNAMICTOP=alignMemoryPage(DYNAMICTOP);self.called=true;assert(Runtime.dynamicAlloc);self.alloc=Runtime.dynamicAlloc;Runtime.dynamicAlloc=(function(){abort("cannot dynamically allocate, sbrk now has control")})}var ret=DYNAMICTOP;if(bytes!=0){var success=self.alloc(bytes);if(!success)return-1>>>0}return ret}Module["_memmove"]=_memmove;var _emscripten_asm_const_int=true;var PATH=undefined;function _emscripten_set_main_loop_timing(mode,value){Browser.mainLoop.timingMode=mode;Browser.mainLoop.timingValue=value;if(!Browser.mainLoop.func){return 1}if(mode==0){Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_setTimeout(){setTimeout(Browser.mainLoop.runner,value)};Browser.mainLoop.method="timeout"}else if(mode==1){Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_rAF(){Browser.requestAnimationFrame(Browser.mainLoop.runner)};Browser.mainLoop.method="rAF"}else if(mode==2){if(!window["setImmediate"]){var setImmediates=[];var emscriptenMainLoopMessageId="__emcc";function Browser_setImmediate_messageHandler(event){if(event.source===window&&event.data===emscriptenMainLoopMessageId){event.stopPropagation();setImmediates.shift()()}}window.addEventListener("message",Browser_setImmediate_messageHandler,true);window["setImmediate"]=function Browser_emulated_setImmediate(func){setImmediates.push(func);window.postMessage(emscriptenMainLoopMessageId,"*")}}Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_setImmediate(){window["setImmediate"](Browser.mainLoop.runner)};Browser.mainLoop.method="immediate"}return 0}function _emscripten_set_main_loop(func,fps,simulateInfiniteLoop,arg,noSetTiming){Module["noExitRuntime"]=true;assert(!Browser.mainLoop.func,"emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");Browser.mainLoop.func=func;Browser.mainLoop.arg=arg;var thisMainLoopId=Browser.mainLoop.currentlyRunningMainloop;Browser.mainLoop.runner=function Browser_mainLoop_runner(){if(ABORT)return;if(Browser.mainLoop.queue.length>0){var start=Date.now();var blocker=Browser.mainLoop.queue.shift();blocker.func(blocker.arg);if(Browser.mainLoop.remainingBlockers){var remaining=Browser.mainLoop.remainingBlockers;var next=remaining%1==0?remaining-1:Math.floor(remaining);if(blocker.counted){Browser.mainLoop.remainingBlockers=next}else{next=next+.5;Browser.mainLoop.remainingBlockers=(8*remaining+next)/9}}console.log('main loop blocker "'+blocker.name+'" took '+(Date.now()-start)+" ms");Browser.mainLoop.updateStatus();setTimeout(Browser.mainLoop.runner,0);return}if(thisMainLoopId<Browser.mainLoop.currentlyRunningMainloop)return;Browser.mainLoop.currentFrameNumber=Browser.mainLoop.currentFrameNumber+1|0;if(Browser.mainLoop.timingMode==1&&Browser.mainLoop.timingValue>1&&Browser.mainLoop.currentFrameNumber%Browser.mainLoop.timingValue!=0){Browser.mainLoop.scheduler();return}if(Browser.mainLoop.method==="timeout"&&Module.ctx){Module.printErr("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!");Browser.mainLoop.method=""}Browser.mainLoop.runIter((function(){if(typeof arg!=="undefined"){Runtime.dynCall("vi",func,[arg])}else{Runtime.dynCall("v",func)}}));if(thisMainLoopId<Browser.mainLoop.currentlyRunningMainloop)return;if(typeof SDL==="object"&&SDL.audio&&SDL.audio.queueNewAudioData)SDL.audio.queueNewAudioData();Browser.mainLoop.scheduler()};if(!noSetTiming){if(fps&&fps>0)_emscripten_set_main_loop_timing(0,1e3/fps);else _emscripten_set_main_loop_timing(1,1);Browser.mainLoop.scheduler()}if(simulateInfiniteLoop){throw"SimulateInfiniteLoop"}}var Browser={mainLoop:{scheduler:null,method:"",currentlyRunningMainloop:0,func:null,arg:0,timingMode:0,timingValue:0,currentFrameNumber:0,queue:[],pause:(function(){Browser.mainLoop.scheduler=null;Browser.mainLoop.currentlyRunningMainloop++}),resume:(function(){Browser.mainLoop.currentlyRunningMainloop++;var timingMode=Browser.mainLoop.timingMode;var timingValue=Browser.mainLoop.timingValue;var func=Browser.mainLoop.func;Browser.mainLoop.func=null;_emscripten_set_main_loop(func,0,false,Browser.mainLoop.arg,true);_emscripten_set_main_loop_timing(timingMode,timingValue);Browser.mainLoop.scheduler()}),updateStatus:(function(){if(Module["setStatus"]){var message=Module["statusMessage"]||"Please wait...";var remaining=Browser.mainLoop.remainingBlockers;var expected=Browser.mainLoop.expectedBlockers;if(remaining){if(remaining<expected){Module["setStatus"](message+" ("+(expected-remaining)+"/"+expected+")")}else{Module["setStatus"](message)}}else{Module["setStatus"]("")}}}),runIter:(function(func){if(ABORT)return;if(Module["preMainLoop"]){var preRet=Module["preMainLoop"]();if(preRet===false){return}}try{func()}catch(e){if(e instanceof ExitStatus){return}else{if(e&&typeof e==="object"&&e.stack)Module.printErr("exception thrown: "+[e,e.stack]);throw e}}if(Module["postMainLoop"])Module["postMainLoop"]()})},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:(function(){if(!Module["preloadPlugins"])Module["preloadPlugins"]=[];if(Browser.initted)return;Browser.initted=true;try{new Blob;Browser.hasBlobConstructor=true}catch(e){Browser.hasBlobConstructor=false;console.log("warning: no blob constructor, cannot create blobs with mimetypes")}Browser.BlobBuilder=typeof MozBlobBuilder!="undefined"?MozBlobBuilder:typeof WebKitBlobBuilder!="undefined"?WebKitBlobBuilder:!Browser.hasBlobConstructor?console.log("warning: no BlobBuilder"):null;Browser.URLObject=typeof window!="undefined"?window.URL?window.URL:window.webkitURL:undefined;if(!Module.noImageDecoding&&typeof Browser.URLObject==="undefined"){console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");Module.noImageDecoding=true}var imagePlugin={};imagePlugin["canHandle"]=function imagePlugin_canHandle(name){return!Module.noImageDecoding&&/\.(jpg|jpeg|png|bmp)$/i.test(name)};imagePlugin["handle"]=function imagePlugin_handle(byteArray,name,onload,onerror){var b=null;if(Browser.hasBlobConstructor){try{b=new Blob([byteArray],{type:Browser.getMimetype(name)});if(b.size!==byteArray.length){b=new Blob([(new Uint8Array(byteArray)).buffer],{type:Browser.getMimetype(name)})}}catch(e){Runtime.warnOnce("Blob constructor present but fails: "+e+"; falling back to blob builder")}}if(!b){var bb=new Browser.BlobBuilder;bb.append((new Uint8Array(byteArray)).buffer);b=bb.getBlob()}var url=Browser.URLObject.createObjectURL(b);var img=new Image;img.onload=function img_onload(){assert(img.complete,"Image "+name+" could not be decoded");var canvas=document.createElement("canvas");canvas.width=img.width;canvas.height=img.height;var ctx=canvas.getContext("2d");ctx.drawImage(img,0,0);Module["preloadedImages"][name]=canvas;Browser.URLObject.revokeObjectURL(url);if(onload)onload(byteArray)};img.onerror=function img_onerror(event){console.log("Image "+url+" could not be decoded");if(onerror)onerror()};img.src=url};Module["preloadPlugins"].push(imagePlugin);var audioPlugin={};audioPlugin["canHandle"]=function audioPlugin_canHandle(name){return!Module.noAudioDecoding&&name.substr(-4)in{".ogg":1,".wav":1,".mp3":1}};audioPlugin["handle"]=function audioPlugin_handle(byteArray,name,onload,onerror){var done=false;function finish(audio){if(done)return;done=true;Module["preloadedAudios"][name]=audio;if(onload)onload(byteArray)}function fail(){if(done)return;done=true;Module["preloadedAudios"][name]=new Audio;if(onerror)onerror()}if(Browser.hasBlobConstructor){try{var b=new Blob([byteArray],{type:Browser.getMimetype(name)})}catch(e){return fail()}var url=Browser.URLObject.createObjectURL(b);var audio=new Audio;audio.addEventListener("canplaythrough",(function(){finish(audio)}),false);audio.onerror=function audio_onerror(event){if(done)return;console.log("warning: browser could not fully decode audio "+name+", trying slower base64 approach");function encode64(data){var BASE="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var PAD="=";var ret="";var leftchar=0;var leftbits=0;for(var i=0;i<data.length;i++){leftchar=leftchar<<8|data[i];leftbits+=8;while(leftbits>=6){var curr=leftchar>>leftbits-6&63;leftbits-=6;ret+=BASE[curr]}}if(leftbits==2){ret+=BASE[(leftchar&3)<<4];ret+=PAD+PAD}else if(leftbits==4){ret+=BASE[(leftchar&15)<<2];ret+=PAD}return ret}audio.src="data:audio/x-"+name.substr(-3)+";base64,"+encode64(byteArray);finish(audio)};audio.src=url;Browser.safeSetTimeout((function(){finish(audio)}),1e4)}else{return fail()}};Module["preloadPlugins"].push(audioPlugin);var canvas=Module["canvas"];function pointerLockChange(){Browser.pointerLock=document["pointerLockElement"]===canvas||document["mozPointerLockElement"]===canvas||document["webkitPointerLockElement"]===canvas||document["msPointerLockElement"]===canvas}if(canvas){canvas.requestPointerLock=canvas["requestPointerLock"]||canvas["mozRequestPointerLock"]||canvas["webkitRequestPointerLock"]||canvas["msRequestPointerLock"]||(function(){});canvas.exitPointerLock=document["exitPointerLock"]||document["mozExitPointerLock"]||document["webkitExitPointerLock"]||document["msExitPointerLock"]||(function(){});canvas.exitPointerLock=canvas.exitPointerLock.bind(document);document.addEventListener("pointerlockchange",pointerLockChange,false);document.addEventListener("mozpointerlockchange",pointerLockChange,false);document.addEventListener("webkitpointerlockchange",pointerLockChange,false);document.addEventListener("mspointerlockchange",pointerLockChange,false);if(Module["elementPointerLock"]){canvas.addEventListener("click",(function(ev){if(!Browser.pointerLock&&canvas.requestPointerLock){canvas.requestPointerLock();ev.preventDefault()}}),false)}}}),createContext:(function(canvas,useWebGL,setInModule,webGLContextAttributes){if(useWebGL&&Module.ctx&&canvas==Module.canvas)return Module.ctx;var ctx;var contextHandle;if(useWebGL){var contextAttributes={antialias:false,alpha:false};if(webGLContextAttributes){for(var attribute in webGLContextAttributes){contextAttributes[attribute]=webGLContextAttributes[attribute]}}contextHandle=GL.createContext(canvas,contextAttributes);if(contextHandle){ctx=GL.getContext(contextHandle).GLctx}canvas.style.backgroundColor="black"}else{ctx=canvas.getContext("2d")}if(!ctx)return null;if(setInModule){if(!useWebGL)assert(typeof GLctx==="undefined","cannot set in module if GLctx is used, but we are a non-GL context that would replace it");Module.ctx=ctx;if(useWebGL)GL.makeContextCurrent(contextHandle);Module.useWebGL=useWebGL;Browser.moduleContextCreatedCallbacks.forEach((function(callback){callback()}));Browser.init()}return ctx}),destroyContext:(function(canvas,useWebGL,setInModule){}),fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:(function(lockPointer,resizeCanvas,vrDevice){Browser.lockPointer=lockPointer;Browser.resizeCanvas=resizeCanvas;Browser.vrDevice=vrDevice;if(typeof Browser.lockPointer==="undefined")Browser.lockPointer=true;if(typeof Browser.resizeCanvas==="undefined")Browser.resizeCanvas=false;if(typeof Browser.vrDevice==="undefined")Browser.vrDevice=null;var canvas=Module["canvas"];function fullScreenChange(){Browser.isFullScreen=false;var canvasContainer=canvas.parentNode;if((document["webkitFullScreenElement"]||document["webkitFullscreenElement"]||document["mozFullScreenElement"]||document["mozFullscreenElement"]||document["fullScreenElement"]||document["fullscreenElement"]||document["msFullScreenElement"]||document["msFullscreenElement"]||document["webkitCurrentFullScreenElement"])===canvasContainer){canvas.cancelFullScreen=document["cancelFullScreen"]||document["mozCancelFullScreen"]||document["webkitCancelFullScreen"]||document["msExitFullscreen"]||document["exitFullscreen"]||(function(){});canvas.cancelFullScreen=canvas.cancelFullScreen.bind(document);if(Browser.lockPointer)canvas.requestPointerLock();Browser.isFullScreen=true;if(Browser.resizeCanvas)Browser.setFullScreenCanvasSize()}else{canvasContainer.parentNode.insertBefore(canvas,canvasContainer);canvasContainer.parentNode.removeChild(canvasContainer);if(Browser.resizeCanvas)Browser.setWindowedCanvasSize()}if(Module["onFullScreen"])Module["onFullScreen"](Browser.isFullScreen);Browser.updateCanvasDimensions(canvas)}if(!Browser.fullScreenHandlersInstalled){Browser.fullScreenHandlersInstalled=true;document.addEventListener("fullscreenchange",fullScreenChange,false);document.addEventListener("mozfullscreenchange",fullScreenChange,false);document.addEventListener("webkitfullscreenchange",fullScreenChange,false);document.addEventListener("MSFullscreenChange",fullScreenChange,false)}var canvasContainer=document.createElement("div");canvas.parentNode.insertBefore(canvasContainer,canvas);canvasContainer.appendChild(canvas);canvasContainer.requestFullScreen=canvasContainer["requestFullScreen"]||canvasContainer["mozRequestFullScreen"]||canvasContainer["msRequestFullscreen"]||(canvasContainer["webkitRequestFullScreen"]?(function(){canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"])}):null);if(vrDevice){canvasContainer.requestFullScreen({vrDisplay:vrDevice})}else{canvasContainer.requestFullScreen()}}),nextRAF:0,fakeRequestAnimationFrame:(function(func){var now=Date.now();if(Browser.nextRAF===0){Browser.nextRAF=now+1e3/60}else{while(now+2>=Browser.nextRAF){Browser.nextRAF+=1e3/60}}var delay=Math.max(Browser.nextRAF-now,0);setTimeout(func,delay)}),requestAnimationFrame:function requestAnimationFrame(func){if(typeof window==="undefined"){Browser.fakeRequestAnimationFrame(func)}else{if(!window.requestAnimationFrame){window.requestAnimationFrame=window["requestAnimationFrame"]||window["mozRequestAnimationFrame"]||window["webkitRequestAnimationFrame"]||window["msRequestAnimationFrame"]||window["oRequestAnimationFrame"]||Browser.fakeRequestAnimationFrame}window.requestAnimationFrame(func)}},safeCallback:(function(func){return(function(){if(!ABORT)return func.apply(null,arguments)})}),allowAsyncCallbacks:true,queuedAsyncCallbacks:[],pauseAsyncCallbacks:(function(){Browser.allowAsyncCallbacks=false}),resumeAsyncCallbacks:(function(){Browser.allowAsyncCallbacks=true;if(Browser.queuedAsyncCallbacks.length>0){var callbacks=Browser.queuedAsyncCallbacks;Browser.queuedAsyncCallbacks=[];callbacks.forEach((function(func){func()}))}}),safeRequestAnimationFrame:(function(func){return Browser.requestAnimationFrame((function(){if(ABORT)return;if(Browser.allowAsyncCallbacks){func()}else{Browser.queuedAsyncCallbacks.push(func)}}))}),safeSetTimeout:(function(func,timeout){Module["noExitRuntime"]=true;return setTimeout((function(){if(ABORT)return;if(Browser.allowAsyncCallbacks){func()}else{Browser.queuedAsyncCallbacks.push(func)}}),timeout)}),safeSetInterval:(function(func,timeout){Module["noExitRuntime"]=true;return setInterval((function(){if(ABORT)return;if(Browser.allowAsyncCallbacks){func()}}),timeout)}),getMimetype:(function(name){return{"jpg":"image/jpeg","jpeg":"image/jpeg","png":"image/png","bmp":"image/bmp","ogg":"audio/ogg","wav":"audio/wav","mp3":"audio/mpeg"}[name.substr(name.lastIndexOf(".")+1)]}),getUserMedia:(function(func){if(!window.getUserMedia){window.getUserMedia=navigator["getUserMedia"]||navigator["mozGetUserMedia"]}window.getUserMedia(func)}),getMovementX:(function(event){return event["movementX"]||event["mozMovementX"]||event["webkitMovementX"]||0}),getMovementY:(function(event){return event["movementY"]||event["mozMovementY"]||event["webkitMovementY"]||0}),getMouseWheelDelta:(function(event){var delta=0;switch(event.type){case"DOMMouseScroll":delta=event.detail;break;case"mousewheel":delta=event.wheelDelta;break;case"wheel":delta=event["deltaY"];break;default:throw"unrecognized mouse wheel event: "+event.type}return delta}),mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,touches:{},lastTouches:{},calculateMouseEvent:(function(event){if(Browser.pointerLock){if(event.type!="mousemove"&&"mozMovementX"in event){Browser.mouseMovementX=Browser.mouseMovementY=0}else{Browser.mouseMovementX=Browser.getMovementX(event);Browser.mouseMovementY=Browser.getMovementY(event)}if(typeof SDL!="undefined"){Browser.mouseX=SDL.mouseX+Browser.mouseMovementX;Browser.mouseY=SDL.mouseY+Browser.mouseMovementY}else{Browser.mouseX+=Browser.mouseMovementX;Browser.mouseY+=Browser.mouseMovementY}}else{var rect=Module["canvas"].getBoundingClientRect();var cw=Module["canvas"].width;var ch=Module["canvas"].height;var scrollX=typeof window.scrollX!=="undefined"?window.scrollX:window.pageXOffset;var scrollY=typeof window.scrollY!=="undefined"?window.scrollY:window.pageYOffset;if(event.type==="touchstart"||event.type==="touchend"||event.type==="touchmove"){var touch=event.touch;if(touch===undefined){return}var adjustedX=touch.pageX-(scrollX+rect.left);var adjustedY=touch.pageY-(scrollY+rect.top);adjustedX=adjustedX*(cw/rect.width);adjustedY=adjustedY*(ch/rect.height);var coords={x:adjustedX,y:adjustedY};if(event.type==="touchstart"){Browser.lastTouches[touch.identifier]=coords;Browser.touches[touch.identifier]=coords}else if(event.type==="touchend"||event.type==="touchmove"){var last=Browser.touches[touch.identifier];if(!last)last=coords;Browser.lastTouches[touch.identifier]=last;Browser.touches[touch.identifier]=coords}return}var x=event.pageX-(scrollX+rect.left);var y=event.pageY-(scrollY+rect.top);x=x*(cw/rect.width);y=y*(ch/rect.height);Browser.mouseMovementX=x-Browser.mouseX;Browser.mouseMovementY=y-Browser.mouseY;Browser.mouseX=x;Browser.mouseY=y}}),xhrLoad:(function(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response)}else{onerror()}};xhr.onerror=onerror;xhr.send(null)}),asyncLoad:(function(url,onload,onerror,noRunDep){Browser.xhrLoad(url,(function(arrayBuffer){assert(arrayBuffer,'Loading data file "'+url+'" failed (no arrayBuffer).');onload(new Uint8Array(arrayBuffer));if(!noRunDep)removeRunDependency("al "+url)}),(function(event){if(onerror){onerror()}else{throw'Loading data file "'+url+'" failed.'}}));if(!noRunDep)addRunDependency("al "+url)}),resizeListeners:[],updateResizeListeners:(function(){var canvas=Module["canvas"];Browser.resizeListeners.forEach((function(listener){listener(canvas.width,canvas.height)}))}),setCanvasSize:(function(width,height,noUpdates){var canvas=Module["canvas"];Browser.updateCanvasDimensions(canvas,width,height);if(!noUpdates)Browser.updateResizeListeners()}),windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:(function(){if(typeof SDL!="undefined"){var flags=HEAPU32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2];flags=flags|8388608;HEAP32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2]=flags}Browser.updateResizeListeners()}),setWindowedCanvasSize:(function(){if(typeof SDL!="undefined"){var flags=HEAPU32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2];flags=flags&~8388608;HEAP32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2]=flags}Browser.updateResizeListeners()}),updateCanvasDimensions:(function(canvas,wNative,hNative){if(wNative&&hNative){canvas.widthNative=wNative;canvas.heightNative=hNative}else{wNative=canvas.widthNative;hNative=canvas.heightNative}var w=wNative;var h=hNative;if(Module["forcedAspectRatio"]&&Module["forcedAspectRatio"]>0){if(w/h<Module["forcedAspectRatio"]){w=Math.round(h*Module["forcedAspectRatio"])}else{h=Math.round(w/Module["forcedAspectRatio"])}}if((document["webkitFullScreenElement"]||document["webkitFullscreenElement"]||document["mozFullScreenElement"]||document["mozFullscreenElement"]||document["fullScreenElement"]||document["fullscreenElement"]||document["msFullScreenElement"]||document["msFullscreenElement"]||document["webkitCurrentFullScreenElement"])===canvas.parentNode&&typeof screen!="undefined"){var factor=Math.min(screen.width/w,screen.height/h);w=Math.round(w*factor);h=Math.round(h*factor)}if(Browser.resizeCanvas){if(canvas.width!=w)canvas.width=w;if(canvas.height!=h)canvas.height=h;if(typeof canvas.style!="undefined"){canvas.style.removeProperty("width");canvas.style.removeProperty("height")}}else{if(canvas.width!=wNative)canvas.width=wNative;if(canvas.height!=hNative)canvas.height=hNative;if(typeof canvas.style!="undefined"){if(w!=wNative||h!=hNative){canvas.style.setProperty("width",w+"px","important");canvas.style.setProperty("height",h+"px","important")}else{canvas.style.removeProperty("width");canvas.style.removeProperty("height")}}}}),wgetRequests:{},nextWgetRequestHandle:0,getNextWgetRequestHandle:(function(){var handle=Browser.nextWgetRequestHandle;Browser.nextWgetRequestHandle++;return handle})};function _time(ptr){var ret=Date.now()/1e3|0;if(ptr){HEAP32[ptr>>2]=ret}return ret}function _pthread_self(){return 0}Module["requestFullScreen"]=function Module_requestFullScreen(lockPointer,resizeCanvas,vrDevice){Browser.requestFullScreen(lockPointer,resizeCanvas,vrDevice)};Module["requestAnimationFrame"]=function Module_requestAnimationFrame(func){Browser.requestAnimationFrame(func)};Module["setCanvasSize"]=function Module_setCanvasSize(width,height,noUpdates){Browser.setCanvasSize(width,height,noUpdates)};Module["pauseMainLoop"]=function Module_pauseMainLoop(){Browser.mainLoop.pause()};Module["resumeMainLoop"]=function Module_resumeMainLoop(){Browser.mainLoop.resume()};Module["getUserMedia"]=function Module_getUserMedia(){Browser.getUserMedia()};Module["createContext"]=function Module_createContext(canvas,useWebGL,setInModule,webGLContextAttributes){return Browser.createContext(canvas,useWebGL,setInModule,webGLContextAttributes)};STACK_BASE=STACKTOP=Runtime.alignMemory(STATICTOP);staticSealed=true;STACK_MAX=STACK_BASE+TOTAL_STACK;DYNAMIC_BASE=DYNAMICTOP=Runtime.alignMemory(STACK_MAX);assert(DYNAMIC_BASE<TOTAL_MEMORY,"TOTAL_MEMORY not big enough for stack");var cttz_i8=allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0],"i8",ALLOC_DYNAMIC);Module.asmGlobalArg={"Math":Math,"Int8Array":Int8Array,"Int16Array":Int16Array,"Int32Array":Int32Array,"Uint8Array":Uint8Array,"Uint16Array":Uint16Array,"Uint32Array":Uint32Array,"Float32Array":Float32Array,"Float64Array":Float64Array,"NaN":NaN,"Infinity":Infinity};Module.asmLibraryArg={"abort":abort,"assert":assert,"___assert_fail":___assert_fail,"_pthread_self":_pthread_self,"_abort":_abort,"___setErrNo":___setErrNo,"_sysconf":_sysconf,"_sbrk":_sbrk,"_time":_time,"_emscripten_set_main_loop_timing":_emscripten_set_main_loop_timing,"_emscripten_memcpy_big":_emscripten_memcpy_big,"_emscripten_set_main_loop":_emscripten_set_main_loop,"_emscripten_asm_const_0":_emscripten_asm_const_0,"STACKTOP":STACKTOP,"STACK_MAX":STACK_MAX,"tempDoublePtr":tempDoublePtr,"ABORT":ABORT,"cttz_i8":cttz_i8};// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer) {
"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env.cttz_i8|0;var n=0;var o=0;var p=0;var q=0;var r=global.NaN,s=global.Infinity;var t=0,u=0,v=0,w=0,x=0.0,y=0,z=0,A=0,B=0.0;var C=0;var D=0;var E=0;var F=0;var G=0;var H=0;var I=0;var J=0;var K=0;var L=0;var M=global.Math.floor;var N=global.Math.abs;var O=global.Math.sqrt;var P=global.Math.pow;var Q=global.Math.cos;var R=global.Math.sin;var S=global.Math.tan;var T=global.Math.acos;var U=global.Math.asin;var V=global.Math.atan;var W=global.Math.atan2;var X=global.Math.exp;var Y=global.Math.log;var Z=global.Math.ceil;var _=global.Math.imul;var $=global.Math.min;var aa=global.Math.clz32;var ba=env.abort;var ca=env.assert;var da=env.___assert_fail;var ea=env._pthread_self;var fa=env._abort;var ga=env.___setErrNo;var ha=env._sysconf;var ia=env._sbrk;var ja=env._time;var ka=env._emscripten_set_main_loop_timing;var la=env._emscripten_memcpy_big;var ma=env._emscripten_set_main_loop;var na=env._emscripten_asm_const_0;var oa=0.0;
// EMSCRIPTEN_START_FUNCS
function pa(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+15&-16;return b|0}function qa(){return i|0}function ra(a){a=a|0;i=a}function sa(a,b){a=a|0;b=b|0;i=a;j=b}function ta(a,b){a=a|0;b=b|0;if(!n){n=a;o=b}}function ua(b){b=b|0;a[k>>0]=a[b>>0];a[k+1>>0]=a[b+1>>0];a[k+2>>0]=a[b+2>>0];a[k+3>>0]=a[b+3>>0]}function va(b){b=b|0;a[k>>0]=a[b>>0];a[k+1>>0]=a[b+1>>0];a[k+2>>0]=a[b+2>>0];a[k+3>>0]=a[b+3>>0];a[k+4>>0]=a[b+4>>0];a[k+5>>0]=a[b+5>>0];a[k+6>>0]=a[b+6>>0];a[k+7>>0]=a[b+7>>0]}function wa(a){a=a|0;C=a}function xa(){return C|0}function ya(a,b,d,e,f,g,h,j,k,l,m,n){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;l=i;i=i+336|0;yd(l+264|0,m,n);Gc(l,l+264|0);Rd(l+264|0,64);Hc(l,h,j,k);c[l+256>>2]=j;c[l+256+4>>2]=k;Hc(l,l+256|0,8,0);Ad(a,e,f,g,m,n);Hc(l,a,f,g);c[l+256>>2]=f;c[l+256+4>>2]=g;Hc(l,l+256|0,8,0);Ic(l,b);Rd(l,256);if(d){c[d>>2]=16;c[d+4>>2]=0}i=l;return 0}function za(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(f>>>0>4294967295|(f|0)==-1&e>>>0>4294967279)fa();ya(a,a+e|0,0,d,e,f,g,h,i,0,k,l)|0;if(b){j=le(e|0,f|0,16,0)|0;c[b>>2]=j;c[b+4>>2]=C}return 0}function Aa(a,b,d,e,f,g,h,j,k,l,m,n){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;l=i;i=i+336|0;zd(l+264|0,m,n);Gc(l,l+264|0);Rd(l+264|0,64);Hc(l,h,j,k);h=ke(0,0,j|0,k|0)|0;Hc(l,32816,h&15,0);Bd(a,e,f,g,m,n);Hc(l,a,f,g);m=ke(0,0,f|0,g|0)|0;Hc(l,32816,m&15,0);c[l+256>>2]=j;c[l+256+4>>2]=k;Hc(l,l+256|0,8,0);c[l+256>>2]=f;c[l+256+4>>2]=g;Hc(l,l+256|0,8,0);Ic(l,b);Rd(l,256);if(d){c[d>>2]=16;c[d+4>>2]=0}i=l;return 0}function Ba(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(f>>>0>4294967295|(f|0)==-1&e>>>0>4294967279)fa();Aa(a,a+e|0,0,d,e,f,g,h,i,0,k,l)|0;if(b){j=le(e|0,f|0,16,0)|0;c[b>>2]=j;c[b+4>>2]=C}return 0}function Ca(a,b,d,e,f,g,h,j,k,l,m){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0;n=i;i=i+352|0;yd(n+280|0,l,m);Gc(n,n+280|0);Rd(n+280|0,64);Hc(n,h,j,k);c[n+256>>2]=j;c[n+256+4>>2]=k;Hc(n,n+256|0,8,0);Hc(n,d,e,f);c[n+256>>2]=e;c[n+256+4>>2]=f;Hc(n,n+256|0,8,0);Ic(n,n+264|0);Rd(n,256);b=Id(n+264|0,g)|0;Rd(n+264|0,16);do if(a)if(!b){Ad(a,d,e,f,l,m);b=0;break}else{me(a|0,0,e|0)|0;b=-1;break}while(0);i=n;return b|0}function Da(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(g>>>0>0|(g|0)==0&f>>>0>15){d=le(f|0,g|0,-16,-1)|0;i=Ca(a,0,e,d,C,e+(f+-16)|0,h,i,j,k,l)|0}else i=-1;if(b){d=(i|0)==0;g=le(f|0,g|0,-16,-1)|0;c[b>>2]=d?g:0;c[b+4>>2]=d?C:0}return i|0}function Ea(a,b,d,e,f,g,h,j,k,l,m){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0;n=i;i=i+352|0;zd(n+280|0,l,m);Gc(n,n+280|0);Rd(n+280|0,64);Hc(n,h,j,k);b=ke(0,0,j|0,k|0)|0;Hc(n,32816,b&15,0);Hc(n,d,e,f);b=ke(0,0,e|0,f|0)|0;Hc(n,32816,b&15,0);c[n+256>>2]=j;c[n+256+4>>2]=k;Hc(n,n+256|0,8,0);c[n+256>>2]=e;c[n+256+4>>2]=f;Hc(n,n+256|0,8,0);Ic(n,n+264|0);Rd(n,256);b=Id(n+264|0,g)|0;Rd(n+264|0,16);do if(a)if(!b){Bd(a,d,e,f,l,m);b=0;break}else{me(a|0,0,e|0)|0;b=-1;break}while(0);i=n;return b|0}function Fa(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(g>>>0>0|(g|0)==0&f>>>0>15){d=le(f|0,g|0,-16,-1)|0;i=Ea(a,0,e,d,C,e+(f+-16)|0,h,i,j,k,l)|0}else i=-1;if(b){d=(i|0)==0;g=le(f|0,g|0,-16,-1)|0;c[b>>2]=d?g:0;c[b+4>>2]=d?C:0}return i|0}function Ga(){return 32}function Ha(){return 12}function Ia(){return 0}function Ja(){return 16}function Ka(){return 32}function La(){return 8}function Ma(){return 0}function Na(){return 16}function Oa(){return 32}function Pa(){return 32}function Qa(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Va(a,b,c,d,e);return 0}function Ra(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Wa(a,b,c,d,e)|0}function Sa(b,c){b=b|0;c=c|0;var d=0,e=0,f=0;f=i;i=i+192|0;zc(b);d=f+64|0;e=d+128|0;do{a[d>>0]=54;d=d+1|0}while((d|0)<(e|0));a[f+64>>0]=a[c>>0]^54;d=1;do{e=f+64+d|0;a[e>>0]=a[e>>0]^a[c+d>>0];d=d+1|0}while((d|0)!=32);Ac(b,f+64|0,128,0);zc(b+208|0);d=f+64|0;e=d+128|0;do{a[d>>0]=92;d=d+1|0}while((d|0)<(e|0));a[f+64>>0]=a[c>>0]^92;d=1;do{e=f+64+d|0;a[e>>0]=a[e>>0]^a[c+d>>0];d=d+1|0}while((d|0)!=32);Ac(b+208|0,f+64|0,128,0);Rd(f+64|0,128);Rd(f,64);i=f;return}function Ta(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Ac(a,b,c,d);return}function Ua(a,b){a=a|0;b=b|0;var c=0;c=i;i=i+64|0;Bc(a,c);Ac(a+208|0,c,64,0);Bc(a+208|0,b);Rd(c,64);i=c;return}function Va(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0;g=i;i=i+480|0;Sa(g,f);Ta(g,c,d,e);Ua(g,g+416|0);d=g+416|0;e=b+32|0;do{a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0}while((b|0)<(e|0));i=g;return}function Wa(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=i;i=i+32|0;Va(f,b,c,d,e);e=Jd(a,f)|0;e=((f|0)==(a|0)?-1:e)|(Sd(f,a)|0);i=f;return e|0}function Xa(){return 32}function Ya(){return 32}function Za(){return 32}function _a(){return 32}function $a(){return 24}function ab(){return 16}function bb(a,b,c){a=a|0;b=b|0;c=c|0;return rb(a,b,c)|0}function cb(a,b){a=a|0;b=b|0;return sb(a,b)|0}function db(a,b,c){a=a|0;b=b|0;c=c|0;return qb(a,b,c)|0}function eb(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;_c(a,b,c,d,e,f,g)|0;return 0}function fb(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0;j=i;i=i+32|0;if(!(db(j,g,h)|0)){_c(a,b,c,d,e,f,j)|0;Rd(j,32);d=0}else d=-1;i=j;return d|0}function gb(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if(d>>>0>0|(d|0)==0&c>>>0>4294967279)c=-1;else{_c(a+16|0,a,b,c,d,e,f)|0;c=0}return c|0}function hb(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;if(d>>>0>0|(d|0)==0&c>>>0>4294967279)c=-1;else c=fb(a+16|0,a,b,c,d,e,f,g)|0;return c|0}function ib(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return ad(a,b,c,d,e,f,g)|0}function jb(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0;j=i;i=i+32|0;if(!(db(j,g,h)|0)){d=ad(a,b,c,d,e,f,j)|0;Rd(j,32)}else d=-1;i=j;return d|0}function kb(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if(d>>>0<0|(d|0)==0&c>>>0<16)c=-1;else{c=le(c|0,d|0,-16,-1)|0;c=ad(a,b+16|0,b,c,C,e,f)|0}return c|0}function lb(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;if(d>>>0<0|(d|0)==0&c>>>0<16)c=-1;else{c=le(c|0,d|0,-16,-1)|0;c=jb(a,b+16|0,b,c,C,e,f,g)|0}return c|0}function mb(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0;k=i;i=i+96|0;if(!(cb(k+32|0,k)|0)){g=b;h=k+32|0;j=g+32|0;do{a[g>>0]=a[h>>0]|0;g=g+1|0;h=h+1|0}while((g|0)<(j|0));pb(k+64|0,k+32|0,f);d=hb(b+32|0,c,d,e,k+64|0,f,k)|0;Rd(k,32);Rd(k+32|0,32);Rd(k+64|0,24)}else d=-1;i=k;return d|0}function nb(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0;g=i;i=i+32|0;if(d>>>0<0|(d|0)==0&c>>>0<48)c=-1;else{pb(g,b,e);c=le(c|0,d|0,-32,-1)|0;c=lb(a,b+32|0,c,C,g,b,f)|0}i=g;return c|0}function ob(){return 48}function pb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=i=i+63&-64;i=i+368|0;jc(e,0,0,24)|0;kc(e,b,32,0)|0;kc(e,c,32,0)|0;lc(e,a,24)|0;i=d;return}function qb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=i;d=i=i+63&-64;i=i+32|0;if(!(Vc(d,c,b)|0)){_b(a,32832,d);a=0}else a=-1;i=e;return a|0}function rb(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;g=i;h=i=i+63&-64;i=i+64|0;Cc(h,d,32,0);d=c;e=h;f=d+32|0;do{a[d>>0]=a[e>>0]|0;d=d+1|0;e=e+1|0}while((d|0)<(f|0));Rd(h,64);h=Wc(b,c)|0;i=g;return h|0}function sb(a,b){a=a|0;b=b|0;Nd(b,32);return Wc(a,b)|0}function tb(a){a=a|0;var b=0;b=a+40|0;do{c[a>>2]=0;a=a+4|0}while((a|0)<(b|0));return}function ub(a){a=a|0;var b=0;c[a>>2]=1;a=a+4|0;b=a+36|0;do{c[a>>2]=0;a=a+4|0}while((a|0)<(b|0));return}function vb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;m=(c[d+4>>2]|0)+(c[b+4>>2]|0)|0;l=(c[d+8>>2]|0)+(c[b+8>>2]|0)|0;k=(c[d+12>>2]|0)+(c[b+12>>2]|0)|0;j=(c[d+16>>2]|0)+(c[b+16>>2]|0)|0;i=(c[d+20>>2]|0)+(c[b+20>>2]|0)|0;h=(c[d+24>>2]|0)+(c[b+24>>2]|0)|0;g=(c[d+28>>2]|0)+(c[b+28>>2]|0)|0;f=(c[d+32>>2]|0)+(c[b+32>>2]|0)|0;e=(c[d+36>>2]|0)+(c[b+36>>2]|0)|0;c[a>>2]=(c[d>>2]|0)+(c[b>>2]|0);c[a+4>>2]=m;c[a+8>>2]=l;c[a+12>>2]=k;c[a+16>>2]=j;c[a+20>>2]=i;c[a+24>>2]=h;c[a+28>>2]=g;c[a+32>>2]=f;c[a+36>>2]=e;return}function wb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;w=c[a>>2]|0;u=c[a+4>>2]|0;s=c[a+8>>2]|0;q=c[a+12>>2]|0;o=c[a+16>>2]|0;m=c[a+20>>2]|0;k=c[a+24>>2]|0;i=c[a+28>>2]|0;g=c[a+32>>2]|0;e=c[a+36>>2]|0;v=(c[b+4>>2]^u)&0-d;t=(c[b+8>>2]^s)&0-d;r=(c[b+12>>2]^q)&0-d;p=(c[b+16>>2]^o)&0-d;n=(c[b+20>>2]^m)&0-d;l=(c[b+24>>2]^k)&0-d;j=(c[b+28>>2]^i)&0-d;h=(c[b+32>>2]^g)&0-d;f=(c[b+36>>2]^e)&0-d;c[a>>2]=(c[b>>2]^w)&0-d^w;c[a+4>>2]=v^u;c[a+8>>2]=t^s;c[a+12>>2]=r^q;c[a+16>>2]=p^o;c[a+20>>2]=n^m;c[a+24>>2]=l^k;c[a+28>>2]=j^i;c[a+32>>2]=h^g;c[a+36>>2]=f^e;return}function xb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;l=c[b+4>>2]|0;k=c[b+8>>2]|0;j=c[b+12>>2]|0;i=c[b+16>>2]|0;h=c[b+20>>2]|0;g=c[b+24>>2]|0;f=c[b+28>>2]|0;e=c[b+32>>2]|0;d=c[b+36>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=l;c[a+8>>2]=k;c[a+12>>2]=j;c[a+16>>2]=i;c[a+20>>2]=h;c[a+24>>2]=g;c[a+28>>2]=f;c[a+32>>2]=e;c[a+36>>2]=d;return}function yb(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;J=d[b>>0]|0;h=oe(d[b+1>>0]|0|0,0,8)|0;k=C;F=oe(d[b+2>>0]|0|0,0,16)|0;k=k|C;E=oe(d[b+3>>0]|0|0,0,24)|0;k=k|C;B=d[b+4>>0]|0;D=oe(d[b+5>>0]|0|0,0,8)|0;j=C;l=oe(d[b+6>>0]|0|0,0,16)|0;j=oe(D|B|l|0,j|C|0,6)|0;l=C;B=d[b+7>>0]|0;D=oe(d[b+8>>0]|0|0,0,8)|0;w=C;i=oe(d[b+9>>0]|0|0,0,16)|0;w=oe(D|B|i|0,w|C|0,5)|0;i=C;B=d[b+10>>0]|0;D=oe(d[b+11>>0]|0|0,0,8)|0;H=C;G=oe(d[b+12>>0]|0|0,0,16)|0;H=oe(D|B|G|0,H|C|0,3)|0;G=C;B=d[b+13>>0]|0;D=oe(d[b+14>>0]|0|0,0,8)|0;s=C;g=oe(d[b+15>>0]|0|0,0,16)|0;s=oe(D|B|g|0,s|C|0,2)|0;g=C;B=d[b+16>>0]|0;D=oe(d[b+17>>0]|0|0,0,8)|0;y=C;A=oe(d[b+18>>0]|0|0,0,16)|0;y=y|C;z=oe(d[b+19>>0]|0|0,0,24)|0;y=y|C;q=d[b+20>>0]|0;x=oe(d[b+21>>0]|0|0,0,8)|0;p=C;e=oe(d[b+22>>0]|0|0,0,16)|0;p=oe(x|q|e|0,p|C|0,7)|0;e=C;q=d[b+23>>0]|0;x=oe(d[b+24>>0]|0|0,0,8)|0;v=C;u=oe(d[b+25>>0]|0|0,0,16)|0;v=oe(x|q|u|0,v|C|0,5)|0;u=C;q=d[b+26>>0]|0;x=oe(d[b+27>>0]|0|0,0,8)|0;n=C;o=oe(d[b+28>>0]|0|0,0,16)|0;n=oe(x|q|o|0,n|C|0,4)|0;o=C;q=d[b+29>>0]|0;x=oe(d[b+30>>0]|0|0,0,8)|0;r=C;b=oe(d[b+31>>0]|0|0,0,16)|0;r=oe(x|q|b|0,r|C|0,2)|0;b=le(r&33554428|0,0,16777216,0)|0;b=ne(b|0,C|0,25)|0;q=C;x=ke(0,0,b|0,q|0)|0;k=le(x&19|0,0,h|J|F|E|0,k|0)|0;E=C;q=oe(b|0,q|0,25)|0;b=C;F=le(j|0,l|0,16777216,0)|0;F=ne(F|0,C|0,25)|0;J=C;i=le(w|0,i|0,F|0,J|0)|0;w=C;J=oe(F|0,J|0,25)|0;J=ke(j|0,l|0,J|0,C|0)|0;l=C;j=le(H|0,G|0,16777216,0)|0;j=ne(j|0,C|0,25)|0;F=C;g=le(s|0,g|0,j|0,F|0)|0;s=C;F=oe(j|0,F|0,25)|0;j=C;h=le(D|B|A|z|0,y|0,16777216,0)|0;h=ne(h|0,C|0,25)|0;x=C;e=le(p|0,e|0,h|0,x|0)|0;p=C;x=oe(h|0,x|0,25)|0;h=C;f=le(v|0,u|0,16777216,0)|0;f=ne(f|0,C|0,25)|0;t=C;o=le(n|0,o|0,f|0,t|0)|0;n=C;t=oe(f|0,t|0,25)|0;f=C;I=le(k|0,E|0,33554432,0)|0;I=je(I|0,C|0,26)|0;m=C;l=le(J|0,l|0,I|0,m|0)|0;m=oe(I|0,m|0,26)|0;m=ke(k|0,E|0,m|0,C|0)|0;E=le(i|0,w|0,33554432,0)|0;E=je(E|0,C|0,26)|0;k=C;G=le(E|0,k|0,H|0,G|0)|0;j=ke(G|0,C|0,F|0,j|0)|0;k=oe(E|0,k|0,26)|0;k=ke(i|0,w|0,k|0,C|0)|0;w=le(g|0,s|0,33554432,0)|0;w=je(w|0,C|0,26)|0;i=C;y=le(w|0,i|0,D|B|A|z|0,y|0)|0;h=ke(y|0,C|0,x|0,h|0)|0;i=oe(w|0,i|0,26)|0;i=ke(g|0,s|0,i|0,C|0)|0;s=le(e|0,p|0,33554432,0)|0;s=je(s|0,C|0,26)|0;g=C;u=le(s|0,g|0,v|0,u|0)|0;f=ke(u|0,C|0,t|0,f|0)|0;g=oe(s|0,g|0,26)|0;g=ke(e|0,p|0,g|0,C|0)|0;p=le(o|0,n|0,33554432,0)|0;p=je(p|0,C|0,26)|0;e=C;r=le(r&33554428|0,0,p|0,e|0)|0;b=ke(r|0,C|0,q|0,b|0)|0;e=oe(p|0,e|0,26)|0;e=ke(o|0,n|0,e|0,C|0)|0;c[a>>2]=m;c[a+4>>2]=l;c[a+8>>2]=k;c[a+12>>2]=j;c[a+16>>2]=i;c[a+20>>2]=h;c[a+24>>2]=g;c[a+28>>2]=f;c[a+32>>2]=e;c[a+36>>2]=b;return}function zb(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;m=c[d>>2]|0;h=c[d+4>>2]|0;i=c[d+8>>2]|0;j=c[d+12>>2]|0;p=c[d+16>>2]|0;f=c[d+20>>2]|0;g=c[d+24>>2]|0;n=c[d+28>>2]|0;e=c[d+32>>2]|0;d=c[d+36>>2]|0;o=((((((((((((((d*19|0)+16777216|0)>>>25)+m>>26)+h>>25)+i>>26)+j>>25)+p>>26)+f>>25)+g>>26)+n>>25)+e>>26)+d>>25)*19|0)+m>>26;m=((((((((((((((d*19|0)+16777216|0)>>>25)+m>>26)+h>>25)+i>>26)+j>>25)+p>>26)+f>>25)+g>>26)+n>>25)+e>>26)+d>>25)*19|0)+m-(o<<26)|0;l=o+h-(o+h>>25<<25)|0;k=(o+h>>25)+i-((o+h>>25)+i>>26<<26)|0;q=((o+h>>25)+i>>26)+j>>25;j=((o+h>>25)+i>>26)+j-(q<<25)|0;i=q+p-(q+p>>26<<26)|0;h=(q+p>>26)+f-((q+p>>26)+f>>25<<25)|0;o=((q+p>>26)+f>>25)+g>>26;g=((q+p>>26)+f>>25)+g-(o<<26)|0;f=o+n-(o+n>>25<<25)|0;d=((o+n>>25)+e>>26)+d|0;e=(o+n>>25)+e-((o+n>>25)+e>>26<<26)|0;a[b>>0]=m;a[b+1>>0]=m>>>8;a[b+2>>0]=m>>>16;a[b+3>>0]=l<<2|m>>>24;a[b+4>>0]=l>>>6;a[b+5>>0]=l>>>14;a[b+6>>0]=k<<3|l>>>22;a[b+7>>0]=k>>>5;a[b+8>>0]=k>>>13;a[b+9>>0]=j<<5|k>>>21;a[b+10>>0]=j>>>3;a[b+11>>0]=j>>>11;a[b+12>>0]=i<<6|j>>>19;a[b+13>>0]=i>>>2;a[b+14>>0]=i>>>10;a[b+15>>0]=i>>>18;a[b+16>>0]=h;a[b+17>>0]=h>>>8;a[b+18>>0]=h>>>16;a[b+19>>0]=g<<1|h>>>24;a[b+20>>0]=g>>>7;a[b+21>>0]=g>>>15;a[b+22>>0]=f<<3|g>>>23;a[b+23>>0]=f>>>5;a[b+24>>0]=f>>>13;a[b+25>>0]=e<<4|f>>>21;a[b+26>>0]=e>>>4;a[b+27>>0]=e>>>12;a[b+28>>0]=e>>>20|(d&33554431)<<6;a[b+29>>0]=d>>>2;a[b+30>>0]=d>>>10;a[b+31>>0]=(d&33554431)>>>18;return}function Ab(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,_b=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,ic=0,jc=0,kc=0,lc=0,mc=0,nc=0,oc=0,pc=0,qc=0,rc=0,sc=0,tc=0,uc=0,vc=0,wc=0,xc=0,yc=0,zc=0,Ac=0,Bc=0,Cc=0,Dc=0,Ec=0,Fc=0,Gc=0,Hc=0,Ic=0,Jc=0,Kc=0,Lc=0,Mc=0,Nc=0,Oc=0,Pc=0;o=c[b>>2]|0;n=c[b+4>>2]|0;k=c[b+8>>2]|0;fa=c[b+12>>2]|0;N=c[b+16>>2]|0;M=c[b+20>>2]|0;g=c[b+24>>2]|0;ea=c[b+28>>2]|0;L=c[b+32>>2]|0;q=c[b+36>>2]|0;I=c[d>>2]|0;Oc=c[d+4>>2]|0;cc=c[d+8>>2]|0;sb=c[d+12>>2]|0;Ia=c[d+16>>2]|0;jc=c[d+20>>2]|0;Db=c[d+24>>2]|0;Ta=c[d+28>>2]|0;ga=c[d+32>>2]|0;Pc=c[d+36>>2]|0;Mc=ve(I|0,((I|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;Lc=C;wc=ve(Oc|0,((Oc|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;vc=C;ub=ve(cc|0,((cc|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;tb=C;Ka=ve(sb|0,((sb|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;Ja=C;mc=ve(Ia|0,((Ia|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;lc=C;Gb=ve(jc|0,((jc|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;Fb=C;Wa=ve(Db|0,((Db|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;Va=C;ja=ve(Ta|0,((Ta|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;ia=C;P=ve(ga|0,((ga|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;O=C;o=ve(Pc|0,((Pc|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;l=C;dc=ve(I|0,((I|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;ec=C;yb=ve(Oc|0,((Oc|0)<0)<<31>>31|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;xb=C;Ma=ve(cc|0,((cc|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;La=C;oc=ve(sb|0,((sb|0)<0)<<31>>31|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;nc=C;Ib=ve(Ia|0,((Ia|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;Hb=C;Ya=ve(jc|0,((jc|0)<0)<<31>>31|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;Xa=C;la=ve(Db|0,((Db|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;ka=C;R=ve(Ta|0,((Ta|0)<0)<<31>>31|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;Q=C;t=ve(ga|0,((ga|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;s=C;d=((Pc*19|0)<0)<<31>>31;n=ve(Pc*19|0,d|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;p=C;wb=ve(I|0,((I|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;vb=C;Qa=ve(Oc|0,((Oc|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;Pa=C;qc=ve(cc|0,((cc|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;pc=C;Kb=ve(sb|0,((sb|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;Jb=C;_a=ve(Ia|0,((Ia|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;Za=C;na=ve(jc|0,((jc|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;ma=C;T=ve(Db|0,((Db|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;S=C;v=ve(Ta|0,((Ta|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;u=C;ha=((ga*19|0)<0)<<31>>31;yc=ve(ga*19|0,ha|0,k|0,((k|0)<0)<<31>>31|0)|0;xc=C;k=ve(Pc*19|0,d|0,k|0,((k|0)<0)<<31>>31|0)|0;j=C;Oa=ve(I|0,((I|0)<0)<<31>>31|0,fa|0,((fa|0)<0)<<31>>31|0)|0;Na=C;uc=ve(Oc|0,((Oc|0)<0)<<31>>31|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;tc=C;Mb=ve(cc|0,((cc|0)<0)<<31>>31|0,fa|0,((fa|0)<0)<<31>>31|0)|0;Lb=C;ab=ve(sb|0,((sb|0)<0)<<31>>31|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;$a=C;pa=ve(Ia|0,((Ia|0)<0)<<31>>31|0,fa|0,((fa|0)<0)<<31>>31|0)|0;oa=C;V=ve(jc|0,((jc|0)<0)<<31>>31|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;U=C;x=ve(Db|0,((Db|0)<0)<<31>>31|0,fa|0,((fa|0)<0)<<31>>31|0)|0;w=C;Ua=((Ta*19|0)<0)<<31>>31;Ac=ve(Ta*19|0,Ua|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;zc=C;Sb=ve(ga*19|0,ha|0,fa|0,((fa|0)<0)<<31>>31|0)|0;Rb=C;fa=ve(Pc*19|0,d|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;f=C;sc=ve(I|0,((I|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;rc=C;Qb=ve(Oc|0,((Oc|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;Pb=C;cb=ve(cc|0,((cc|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;bb=C;ra=ve(sb|0,((sb|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;qa=C;X=ve(Ia|0,((Ia|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;W=C;z=ve(jc|0,((jc|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;y=C;Eb=((Db*19|0)<0)<<31>>31;Cc=ve(Db*19|0,Eb|0,N|0,((N|0)<0)<<31>>31|0)|0;Bc=C;Ub=ve(Ta*19|0,Ua|0,N|0,((N|0)<0)<<31>>31|0)|0;Tb=C;ib=ve(ga*19|0,ha|0,N|0,((N|0)<0)<<31>>31|0)|0;hb=C;N=ve(Pc*19|0,d|0,N|0,((N|0)<0)<<31>>31|0)|0;e=C;Ob=ve(I|0,((I|0)<0)<<31>>31|0,M|0,((M|0)<0)<<31>>31|0)|0;Nb=C;gb=ve(Oc|0,((Oc|0)<0)<<31>>31|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;fb=C;ta=ve(cc|0,((cc|0)<0)<<31>>31|0,M|0,((M|0)<0)<<31>>31|0)|0;sa=C;Z=ve(sb|0,((sb|0)<0)<<31>>31|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;Y=C;B=ve(Ia|0,((Ia|0)<0)<<31>>31|0,M|0,((M|0)<0)<<31>>31|0)|0;A=C;kc=((jc*19|0)<0)<<31>>31;Ec=ve(jc*19|0,kc|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;Dc=C;Wb=ve(Db*19|0,Eb|0,M|0,((M|0)<0)<<31>>31|0)|0;Vb=C;kb=ve(Ta*19|0,Ua|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;jb=C;Aa=ve(ga*19|0,ha|0,M|0,((M|0)<0)<<31>>31|0)|0;za=C;b=ve(Pc*19|0,d|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;M=C;eb=ve(I|0,((I|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;db=C;xa=ve(Oc|0,((Oc|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;wa=C;$=ve(cc|0,((cc|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;_=C;E=ve(sb|0,((sb|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;D=C;Gc=ve(Ia*19|0,((Ia*19|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;Fc=C;Yb=ve(jc*19|0,kc|0,g|0,((g|0)<0)<<31>>31|0)|0;Xb=C;mb=ve(Db*19|0,Eb|0,g|0,((g|0)<0)<<31>>31|0)|0;lb=C;Ca=ve(Ta*19|0,Ua|0,g|0,((g|0)<0)<<31>>31|0)|0;Ba=C;m=ve(ga*19|0,ha|0,g|0,((g|0)<0)<<31>>31|0)|0;r=C;g=ve(Pc*19|0,d|0,g|0,((g|0)<0)<<31>>31|0)|0;ya=C;va=ve(I|0,((I|0)<0)<<31>>31|0,ea|0,((ea|0)<0)<<31>>31|0)|0;ua=C;da=ve(Oc|0,((Oc|0)<0)<<31>>31|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;ca=C;G=ve(cc|0,((cc|0)<0)<<31>>31|0,ea|0,((ea|0)<0)<<31>>31|0)|0;F=C;Ic=ve(sb*19|0,((sb*19|0)<0)<<31>>31|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;Hc=C;_b=ve(Ia*19|0,((Ia*19|0)<0)<<31>>31|0,ea|0,((ea|0)<0)<<31>>31|0)|0;Zb=C;ob=ve(jc*19|0,kc|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;nb=C;Ea=ve(Db*19|0,Eb|0,ea|0,((ea|0)<0)<<31>>31|0)|0;Da=C;gc=ve(Ta*19|0,Ua|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;fc=C;Ab=ve(ga*19|0,ha|0,ea|0,((ea|0)<0)<<31>>31|0)|0;zb=C;ea=ve(Pc*19|0,d|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;i=C;ba=ve(I|0,((I|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;aa=C;K=ve(Oc|0,((Oc|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;J=C;Kc=ve(cc*19|0,((cc*19|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;Jc=C;ac=ve(sb*19|0,((sb*19|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;$b=C;qb=ve(Ia*19|0,((Ia*19|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;pb=C;Ga=ve(jc*19|0,kc|0,L|0,((L|0)<0)<<31>>31|0)|0;Fa=C;ic=ve(Db*19|0,Eb|0,L|0,((L|0)<0)<<31>>31|0)|0;hc=C;Cb=ve(Ta*19|0,Ua|0,L|0,((L|0)<0)<<31>>31|0)|0;Bb=C;Sa=ve(ga*19|0,ha|0,L|0,((L|0)<0)<<31>>31|0)|0;Ra=C;L=ve(Pc*19|0,d|0,L|0,((L|0)<0)<<31>>31|0)|0;h=C;I=ve(I|0,((I|0)<0)<<31>>31|0,q|0,((q|0)<0)<<31>>31|0)|0;H=C;Oc=ve(Oc*19|0,((Oc*19|0)<0)<<31>>31|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;Nc=C;cc=ve(cc*19|0,((cc*19|0)<0)<<31>>31|0,q|0,((q|0)<0)<<31>>31|0)|0;bc=C;sb=ve(sb*19|0,((sb*19|0)<0)<<31>>31|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;rb=C;Ia=ve(Ia*19|0,((Ia*19|0)<0)<<31>>31|0,q|0,((q|0)<0)<<31>>31|0)|0;Ha=C;kc=ve(jc*19|0,kc|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;jc=C;Eb=ve(Db*19|0,Eb|0,q|0,((q|0)<0)<<31>>31|0)|0;Db=C;Ua=ve(Ta*19|0,Ua|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;Ta=C;ha=ve(ga*19|0,ha|0,q|0,((q|0)<0)<<31>>31|0)|0;ga=C;q=ve(Pc*19|0,d|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;d=C;Lc=le(Oc|0,Nc|0,Mc|0,Lc|0)|0;Jc=le(Lc|0,C|0,Kc|0,Jc|0)|0;Hc=le(Jc|0,C|0,Ic|0,Hc|0)|0;Fc=le(Hc|0,C|0,Gc|0,Fc|0)|0;Dc=le(Fc|0,C|0,Ec|0,Dc|0)|0;Bc=le(Dc|0,C|0,Cc|0,Bc|0)|0;zc=le(Bc|0,C|0,Ac|0,zc|0)|0;xc=le(zc|0,C|0,yc|0,xc|0)|0;p=le(xc|0,C|0,n|0,p|0)|0;n=C;ec=le(wc|0,vc|0,dc|0,ec|0)|0;dc=C;rc=le(uc|0,tc|0,sc|0,rc|0)|0;pc=le(rc|0,C|0,qc|0,pc|0)|0;nc=le(pc|0,C|0,oc|0,nc|0)|0;lc=le(nc|0,C|0,mc|0,lc|0)|0;jc=le(lc|0,C|0,kc|0,jc|0)|0;hc=le(jc|0,C|0,ic|0,hc|0)|0;fc=le(hc|0,C|0,gc|0,fc|0)|0;r=le(fc|0,C|0,m|0,r|0)|0;M=le(r|0,C|0,b|0,M|0)|0;b=C;r=le(p|0,n|0,33554432,0)|0;r=je(r|0,C|0,26)|0;m=C;bc=le(ec|0,dc|0,cc|0,bc|0)|0;$b=le(bc|0,C|0,ac|0,$b|0)|0;Zb=le($b|0,C|0,_b|0,Zb|0)|0;Xb=le(Zb|0,C|0,Yb|0,Xb|0)|0;Vb=le(Xb|0,C|0,Wb|0,Vb|0)|0;Tb=le(Vb|0,C|0,Ub|0,Tb|0)|0;Rb=le(Tb|0,C|0,Sb|0,Rb|0)|0;j=le(Rb|0,C|0,k|0,j|0)|0;j=le(j|0,C|0,r|0,m|0)|0;k=C;m=oe(r|0,m|0,26)|0;m=ke(p|0,n|0,m|0,C|0)|0;n=C;p=le(M|0,b|0,33554432,0)|0;p=je(p|0,C|0,26)|0;r=C;Nb=le(Qb|0,Pb|0,Ob|0,Nb|0)|0;Lb=le(Nb|0,C|0,Mb|0,Lb|0)|0;Jb=le(Lb|0,C|0,Kb|0,Jb|0)|0;Hb=le(Jb|0,C|0,Ib|0,Hb|0)|0;Fb=le(Hb|0,C|0,Gb|0,Fb|0)|0;Db=le(Fb|0,C|0,Eb|0,Db|0)|0;Bb=le(Db|0,C|0,Cb|0,Bb|0)|0;zb=le(Bb|0,C|0,Ab|0,zb|0)|0;ya=le(zb|0,C|0,g|0,ya|0)|0;ya=le(ya|0,C|0,p|0,r|0)|0;g=C;r=oe(p|0,r|0,26)|0;r=ke(M|0,b|0,r|0,C|0)|0;b=C;M=le(j|0,k|0,16777216,0)|0;M=je(M|0,C|0,25)|0;p=C;vb=le(yb|0,xb|0,wb|0,vb|0)|0;tb=le(vb|0,C|0,ub|0,tb|0)|0;rb=le(tb|0,C|0,sb|0,rb|0)|0;pb=le(rb|0,C|0,qb|0,pb|0)|0;nb=le(pb|0,C|0,ob|0,nb|0)|0;lb=le(nb|0,C|0,mb|0,lb|0)|0;jb=le(lb|0,C|0,kb|0,jb|0)|0;hb=le(jb|0,C|0,ib|0,hb|0)|0;f=le(hb|0,C|0,fa|0,f|0)|0;f=le(f|0,C|0,M|0,p|0)|0;fa=C;p=oe(M|0,p|0,25)|0;p=ke(j|0,k|0,p|0,C|0)|0;k=C;j=le(ya|0,g|0,16777216,0)|0;j=je(j|0,C|0,25)|0;M=C;db=le(gb|0,fb|0,eb|0,db|0)|0;bb=le(db|0,C|0,cb|0,bb|0)|0;$a=le(bb|0,C|0,ab|0,$a|0)|0;Za=le($a|0,C|0,_a|0,Za|0)|0;Xa=le(Za|0,C|0,Ya|0,Xa|0)|0;Va=le(Xa|0,C|0,Wa|0,Va|0)|0;Ta=le(Va|0,C|0,Ua|0,Ta|0)|0;Ra=le(Ta|0,C|0,Sa|0,Ra|0)|0;i=le(Ra|0,C|0,ea|0,i|0)|0;i=le(i|0,C|0,j|0,M|0)|0;ea=C;M=oe(j|0,M|0,25)|0;M=ke(ya|0,g|0,M|0,C|0)|0;g=C;ya=le(f|0,fa|0,33554432,0)|0;ya=je(ya|0,C|0,26)|0;j=C;Na=le(Qa|0,Pa|0,Oa|0,Na|0)|0;La=le(Na|0,C|0,Ma|0,La|0)|0;Ja=le(La|0,C|0,Ka|0,Ja|0)|0;Ha=le(Ja|0,C|0,Ia|0,Ha|0)|0;Fa=le(Ha|0,C|0,Ga|0,Fa|0)|0;Da=le(Fa|0,C|0,Ea|0,Da|0)|0;Ba=le(Da|0,C|0,Ca|0,Ba|0)|0;za=le(Ba|0,C|0,Aa|0,za|0)|0;e=le(za|0,C|0,N|0,e|0)|0;e=le(e|0,C|0,ya|0,j|0)|0;N=C;j=oe(ya|0,j|0,26)|0;j=ke(f|0,fa|0,j|0,C|0)|0;fa=le(i|0,ea|0,33554432,0)|0;fa=je(fa|0,C|0,26)|0;f=C;ua=le(xa|0,wa|0,va|0,ua|0)|0;sa=le(ua|0,C|0,ta|0,sa|0)|0;qa=le(sa|0,C|0,ra|0,qa|0)|0;oa=le(qa|0,C|0,pa|0,oa|0)|0;ma=le(oa|0,C|0,na|0,ma|0)|0;ka=le(ma|0,C|0,la|0,ka|0)|0;ia=le(ka|0,C|0,ja|0,ia|0)|0;ga=le(ia|0,C|0,ha|0,ga|0)|0;h=le(ga|0,C|0,L|0,h|0)|0;h=le(h|0,C|0,fa|0,f|0)|0;L=C;f=oe(fa|0,f|0,26)|0;f=ke(i|0,ea|0,f|0,C|0)|0;ea=le(e|0,N|0,16777216,0)|0;ea=je(ea|0,C|0,25)|0;i=C;b=le(ea|0,i|0,r|0,b|0)|0;r=C;i=oe(ea|0,i|0,25)|0;i=ke(e|0,N|0,i|0,C|0)|0;N=le(h|0,L|0,16777216,0)|0;N=je(N|0,C|0,25)|0;e=C;aa=le(da|0,ca|0,ba|0,aa|0)|0;_=le(aa|0,C|0,$|0,_|0)|0;Y=le(_|0,C|0,Z|0,Y|0)|0;W=le(Y|0,C|0,X|0,W|0)|0;U=le(W|0,C|0,V|0,U|0)|0;S=le(U|0,C|0,T|0,S|0)|0;Q=le(S|0,C|0,R|0,Q|0)|0;O=le(Q|0,C|0,P|0,O|0)|0;d=le(O|0,C|0,q|0,d|0)|0;d=le(d|0,C|0,N|0,e|0)|0;q=C;e=oe(N|0,e|0,25)|0;e=ke(h|0,L|0,e|0,C|0)|0;L=le(b|0,r|0,33554432,0)|0;L=je(L|0,C|0,26)|0;h=C;g=le(M|0,g|0,L|0,h|0)|0;h=oe(L|0,h|0,26)|0;h=ke(b|0,r|0,h|0,C|0)|0;r=le(d|0,q|0,33554432,0)|0;r=je(r|0,C|0,26)|0;b=C;H=le(K|0,J|0,I|0,H|0)|0;F=le(H|0,C|0,G|0,F|0)|0;D=le(F|0,C|0,E|0,D|0)|0;A=le(D|0,C|0,B|0,A|0)|0;y=le(A|0,C|0,z|0,y|0)|0;w=le(y|0,C|0,x|0,w|0)|0;u=le(w|0,C|0,v|0,u|0)|0;s=le(u|0,C|0,t|0,s|0)|0;l=le(s|0,C|0,o|0,l|0)|0;l=le(l|0,C|0,r|0,b|0)|0;o=C;b=oe(r|0,b|0,26)|0;b=ke(d|0,q|0,b|0,C|0)|0;q=le(l|0,o|0,16777216,0)|0;q=je(q|0,C|0,25)|0;d=C;r=ve(q|0,d|0,19,0)|0;n=le(r|0,C|0,m|0,n|0)|0;m=C;d=oe(q|0,d|0,25)|0;d=ke(l|0,o|0,d|0,C|0)|0;o=le(n|0,m|0,33554432,0)|0;o=je(o|0,C|0,26)|0;l=C;k=le(p|0,k|0,o|0,l|0)|0;l=oe(o|0,l|0,26)|0;l=ke(n|0,m|0,l|0,C|0)|0;c[a>>2]=l;c[a+4>>2]=k;c[a+8>>2]=j;c[a+12>>2]=i;c[a+16>>2]=h;c[a+20>>2]=g;c[a+24>>2]=f;c[a+28>>2]=e;c[a+32>>2]=b;c[a+36>>2]=d;return}function Bb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;l=0-(c[b+4>>2]|0)|0;k=0-(c[b+8>>2]|0)|0;j=0-(c[b+12>>2]|0)|0;i=0-(c[b+16>>2]|0)|0;h=0-(c[b+20>>2]|0)|0;g=0-(c[b+24>>2]|0)|0;f=0-(c[b+28>>2]|0)|0;e=0-(c[b+32>>2]|0)|0;d=0-(c[b+36>>2]|0)|0;c[a>>2]=0-(c[b>>2]|0);c[a+4>>2]=l;c[a+8>>2]=k;c[a+12>>2]=j;c[a+16>>2]=i;c[a+20>>2]=h;c[a+24>>2]=g;c[a+28>>2]=f;c[a+32>>2]=e;c[a+36>>2]=d;return}function Cb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0;l=c[b>>2]|0;p=c[b+4>>2]|0;k=c[b+8>>2]|0;f=c[b+12>>2]|0;D=c[b+16>>2]|0;d=c[b+20>>2]|0;g=c[b+24>>2]|0;O=c[b+28>>2]|0;A=c[b+32>>2]|0;q=c[b+36>>2]|0;cb=ve(l|0,((l|0)<0)<<31>>31|0,l|0,((l|0)<0)<<31>>31|0)|0;bb=C;o=((l<<1|0)<0)<<31>>31;Ia=ve(l<<1|0,o|0,p|0,((p|0)<0)<<31>>31|0)|0;Ha=C;Wa=ve(k|0,((k|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Va=C;Ua=ve(f|0,((f|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Ta=C;Oa=ve(D|0,((D|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Na=C;ya=ve(d|0,((d|0)<0)<<31>>31|0,l<<1|0,o|0)|0;xa=C;ga=ve(g|0,((g|0)<0)<<31>>31|0,l<<1|0,o|0)|0;fa=C;R=ve(O|0,((O|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Q=C;F=ve(A|0,((A|0)<0)<<31>>31|0,l<<1|0,o|0)|0;E=C;o=ve(q|0,((q|0)<0)<<31>>31|0,l<<1|0,o|0)|0;l=C;n=((p<<1|0)<0)<<31>>31;ta=ve(p<<1|0,n|0,p|0,((p|0)<0)<<31>>31|0)|0;ua=C;ba=ve(p<<1|0,n|0,k|0,((k|0)<0)<<31>>31|0)|0;ca=C;P=((f<<1|0)<0)<<31>>31;Sa=ve(f<<1|0,P|0,p<<1|0,n|0)|0;Ra=C;Ca=ve(D|0,((D|0)<0)<<31>>31|0,p<<1|0,n|0)|0;Ba=C;ia=ve(d<<1|0,((d<<1|0)<0)<<31>>31|0,p<<1|0,n|0)|0;ha=C;T=ve(g|0,((g|0)<0)<<31>>31|0,p<<1|0,n|0)|0;S=C;H=ve(O<<1|0,((O<<1|0)<0)<<31>>31|0,p<<1|0,n|0)|0;G=C;t=ve(A|0,((A|0)<0)<<31>>31|0,p<<1|0,n|0)|0;s=C;b=((q*38|0)<0)<<31>>31;n=ve(q*38|0,b|0,p<<1|0,n|0)|0;p=C;Qa=ve(k|0,((k|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;Pa=C;Aa=ve(k<<1|0,((k<<1|0)<0)<<31>>31|0,f|0,((f|0)<0)<<31>>31|0)|0;za=C;ka=ve(D|0,((D|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;ja=C;X=ve(d|0,((d|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;W=C;N=ve(g|0,((g|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;M=C;v=ve(O|0,((O|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;u=C;ea=((A*19|0)<0)<<31>>31;Ya=ve(A*19|0,ea|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;Xa=C;k=ve(q*38|0,b|0,k|0,((k|0)<0)<<31>>31|0)|0;j=C;ma=ve(f<<1|0,P|0,f|0,((f|0)<0)<<31>>31|0)|0;la=C;V=ve(f<<1|0,P|0,D|0,((D|0)<0)<<31>>31|0)|0;U=C;J=ve(d<<1|0,((d<<1|0)<0)<<31>>31|0,f<<1|0,P|0)|0;I=C;z=ve(g|0,((g|0)<0)<<31>>31|0,f<<1|0,P|0)|0;y=C;Ma=((O*38|0)<0)<<31>>31;_a=ve(O*38|0,Ma|0,f<<1|0,P|0)|0;Za=C;Ea=ve(A*19|0,ea|0,f<<1|0,P|0)|0;Da=C;P=ve(q*38|0,b|0,f<<1|0,P|0)|0;f=C;L=ve(D|0,((D|0)<0)<<31>>31|0,D|0,((D|0)<0)<<31>>31|0)|0;K=C;x=ve(D<<1|0,((D<<1|0)<0)<<31>>31|0,d|0,((d|0)<0)<<31>>31|0)|0;w=C;ab=ve(g*19|0,((g*19|0)<0)<<31>>31|0,D<<1|0,((D<<1|0)<0)<<31>>31|0)|0;$a=C;Ga=ve(O*38|0,Ma|0,D|0,((D|0)<0)<<31>>31|0)|0;Fa=C;oa=ve(A*19|0,ea|0,D<<1|0,((D<<1|0)<0)<<31>>31|0)|0;na=C;D=ve(q*38|0,b|0,D|0,((D|0)<0)<<31>>31|0)|0;e=C;eb=ve(d*38|0,((d*38|0)<0)<<31>>31|0,d|0,((d|0)<0)<<31>>31|0)|0;db=C;Ka=ve(g*19|0,((g*19|0)<0)<<31>>31|0,d<<1|0,((d<<1|0)<0)<<31>>31|0)|0;Ja=C;qa=ve(O*38|0,Ma|0,d<<1|0,((d<<1|0)<0)<<31>>31|0)|0;pa=C;_=ve(A*19|0,ea|0,d<<1|0,((d<<1|0)<0)<<31>>31|0)|0;Z=C;d=ve(q*38|0,b|0,d<<1|0,((d<<1|0)<0)<<31>>31|0)|0;B=C;sa=ve(g*19|0,((g*19|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;ra=C;aa=ve(O*38|0,Ma|0,g|0,((g|0)<0)<<31>>31|0)|0;$=C;m=ve(A*19|0,ea|0,g<<1|0,((g<<1|0)<0)<<31>>31|0)|0;r=C;g=ve(q*38|0,b|0,g|0,((g|0)<0)<<31>>31|0)|0;Y=C;Ma=ve(O*38|0,Ma|0,O|0,((O|0)<0)<<31>>31|0)|0;La=C;wa=ve(A*19|0,ea|0,O<<1|0,((O<<1|0)<0)<<31>>31|0)|0;va=C;O=ve(q*38|0,b|0,O<<1|0,((O<<1|0)<0)<<31>>31|0)|0;i=C;ea=ve(A*19|0,ea|0,A|0,((A|0)<0)<<31>>31|0)|0;da=C;A=ve(q*38|0,b|0,A|0,((A|0)<0)<<31>>31|0)|0;h=C;q=ve(q*38|0,b|0,q|0,((q|0)<0)<<31>>31|0)|0;b=C;bb=le(eb|0,db|0,cb|0,bb|0)|0;$a=le(bb|0,C|0,ab|0,$a|0)|0;Za=le($a|0,C|0,_a|0,Za|0)|0;Xa=le(Za|0,C|0,Ya|0,Xa|0)|0;p=le(Xa|0,C|0,n|0,p|0)|0;n=C;ua=le(Wa|0,Va|0,ta|0,ua|0)|0;ta=C;ca=le(Ua|0,Ta|0,ba|0,ca|0)|0;ba=C;Pa=le(Sa|0,Ra|0,Qa|0,Pa|0)|0;Na=le(Pa|0,C|0,Oa|0,Na|0)|0;La=le(Na|0,C|0,Ma|0,La|0)|0;r=le(La|0,C|0,m|0,r|0)|0;B=le(r|0,C|0,d|0,B|0)|0;d=C;r=le(p|0,n|0,33554432,0)|0;r=je(r|0,C|0,26)|0;m=C;Ha=le(Ka|0,Ja|0,Ia|0,Ha|0)|0;Fa=le(Ha|0,C|0,Ga|0,Fa|0)|0;Da=le(Fa|0,C|0,Ea|0,Da|0)|0;j=le(Da|0,C|0,k|0,j|0)|0;j=le(j|0,C|0,r|0,m|0)|0;k=C;m=oe(r|0,m|0,26)|0;m=ke(p|0,n|0,m|0,C|0)|0;n=C;p=le(B|0,d|0,33554432,0)|0;p=je(p|0,C|0,26)|0;r=C;za=le(Ca|0,Ba|0,Aa|0,za|0)|0;xa=le(za|0,C|0,ya|0,xa|0)|0;va=le(xa|0,C|0,wa|0,va|0)|0;Y=le(va|0,C|0,g|0,Y|0)|0;Y=le(Y|0,C|0,p|0,r|0)|0;g=C;r=oe(p|0,r|0,26)|0;r=ke(B|0,d|0,r|0,C|0)|0;d=C;B=le(j|0,k|0,16777216,0)|0;B=je(B|0,C|0,25)|0;p=C;ra=le(ua|0,ta|0,sa|0,ra|0)|0;pa=le(ra|0,C|0,qa|0,pa|0)|0;na=le(pa|0,C|0,oa|0,na|0)|0;f=le(na|0,C|0,P|0,f|0)|0;f=le(f|0,C|0,B|0,p|0)|0;P=C;p=oe(B|0,p|0,25)|0;p=ke(j|0,k|0,p|0,C|0)|0;k=C;j=le(Y|0,g|0,16777216,0)|0;j=je(j|0,C|0,25)|0;B=C;ja=le(ma|0,la|0,ka|0,ja|0)|0;ha=le(ja|0,C|0,ia|0,ha|0)|0;fa=le(ha|0,C|0,ga|0,fa|0)|0;da=le(fa|0,C|0,ea|0,da|0)|0;i=le(da|0,C|0,O|0,i|0)|0;i=le(i|0,C|0,j|0,B|0)|0;O=C;B=oe(j|0,B|0,25)|0;B=ke(Y|0,g|0,B|0,C|0)|0;g=C;Y=le(f|0,P|0,33554432,0)|0;Y=je(Y|0,C|0,26)|0;j=C;$=le(ca|0,ba|0,aa|0,$|0)|0;Z=le($|0,C|0,_|0,Z|0)|0;e=le(Z|0,C|0,D|0,e|0)|0;e=le(e|0,C|0,Y|0,j|0)|0;D=C;j=oe(Y|0,j|0,26)|0;j=ke(f|0,P|0,j|0,C|0)|0;P=le(i|0,O|0,33554432,0)|0;P=je(P|0,C|0,26)|0;f=C;U=le(X|0,W|0,V|0,U|0)|0;S=le(U|0,C|0,T|0,S|0)|0;Q=le(S|0,C|0,R|0,Q|0)|0;h=le(Q|0,C|0,A|0,h|0)|0;h=le(h|0,C|0,P|0,f|0)|0;A=C;f=oe(P|0,f|0,26)|0;f=ke(i|0,O|0,f|0,C|0)|0;O=le(e|0,D|0,16777216,0)|0;O=je(O|0,C|0,25)|0;i=C;d=le(O|0,i|0,r|0,d|0)|0;r=C;i=oe(O|0,i|0,25)|0;i=ke(e|0,D|0,i|0,C|0)|0;D=le(h|0,A|0,16777216,0)|0;D=je(D|0,C|0,25)|0;e=C;K=le(N|0,M|0,L|0,K|0)|0;I=le(K|0,C|0,J|0,I|0)|0;G=le(I|0,C|0,H|0,G|0)|0;E=le(G|0,C|0,F|0,E|0)|0;b=le(E|0,C|0,q|0,b|0)|0;b=le(b|0,C|0,D|0,e|0)|0;q=C;e=oe(D|0,e|0,25)|0;e=ke(h|0,A|0,e|0,C|0)|0;A=le(d|0,r|0,33554432,0)|0;A=je(A|0,C|0,26)|0;h=C;g=le(B|0,g|0,A|0,h|0)|0;h=oe(A|0,h|0,26)|0;h=ke(d|0,r|0,h|0,C|0)|0;r=le(b|0,q|0,33554432,0)|0;r=je(r|0,C|0,26)|0;d=C;w=le(z|0,y|0,x|0,w|0)|0;u=le(w|0,C|0,v|0,u|0)|0;s=le(u|0,C|0,t|0,s|0)|0;l=le(s|0,C|0,o|0,l|0)|0;l=le(l|0,C|0,r|0,d|0)|0;o=C;d=oe(r|0,d|0,26)|0;d=ke(b|0,q|0,d|0,C|0)|0;q=le(l|0,o|0,16777216,0)|0;q=je(q|0,C|0,25)|0;b=C;r=ve(q|0,b|0,19,0)|0;n=le(r|0,C|0,m|0,n|0)|0;m=C;b=oe(q|0,b|0,25)|0;b=ke(l|0,o|0,b|0,C|0)|0;o=le(n|0,m|0,33554432,0)|0;o=je(o|0,C|0,26)|0;l=C;k=le(p|0,k|0,o|0,l|0)|0;l=oe(o|0,l|0,26)|0;l=ke(n|0,m|0,l|0,C|0)|0;c[a>>2]=l;c[a+4>>2]=k;c[a+8>>2]=j;c[a+12>>2]=i;c[a+16>>2]=h;c[a+20>>2]=g;c[a+24>>2]=f;c[a+28>>2]=e;c[a+32>>2]=d;c[a+36>>2]=b;return}function Db(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0;l=c[b>>2]|0;n=c[b+4>>2]|0;k=c[b+8>>2]|0;f=c[b+12>>2]|0;u=c[b+16>>2]|0;t=c[b+20>>2]|0;g=c[b+24>>2]|0;v=c[b+28>>2]|0;s=c[b+32>>2]|0;q=c[b+36>>2]|0;cb=ve(l|0,((l|0)<0)<<31>>31|0,l|0,((l|0)<0)<<31>>31|0)|0;bb=C;o=((l<<1|0)<0)<<31>>31;Ua=ve(l<<1|0,o|0,n|0,((n|0)<0)<<31>>31|0)|0;Ta=C;Oa=ve(k|0,((k|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Na=C;Ea=ve(f|0,((f|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Da=C;sa=ve(u|0,((u|0)<0)<<31>>31|0,l<<1|0,o|0)|0;ra=C;ia=ve(t|0,((t|0)<0)<<31>>31|0,l<<1|0,o|0)|0;ha=C;_=ve(g|0,((g|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Z=C;Q=ve(v|0,((v|0)<0)<<31>>31|0,l<<1|0,o|0)|0;P=C;G=ve(s|0,((s|0)<0)<<31>>31|0,l<<1|0,o|0)|0;F=C;o=ve(q|0,((q|0)<0)<<31>>31|0,l<<1|0,o|0)|0;l=C;p=((n<<1|0)<0)<<31>>31;Ma=ve(n<<1|0,p|0,n|0,((n|0)<0)<<31>>31|0)|0;La=C;Ca=ve(n<<1|0,p|0,k|0,((k|0)<0)<<31>>31|0)|0;Ba=C;w=((f<<1|0)<0)<<31>>31;wa=ve(f<<1|0,w|0,n<<1|0,p|0)|0;va=C;ma=ve(u|0,((u|0)<0)<<31>>31|0,n<<1|0,p|0)|0;la=C;aa=ve(t<<1|0,((t<<1|0)<0)<<31>>31|0,n<<1|0,p|0)|0;$=C;S=ve(g|0,((g|0)<0)<<31>>31|0,n<<1|0,p|0)|0;R=C;I=ve(v<<1|0,((v<<1|0)<0)<<31>>31|0,n<<1|0,p|0)|0;H=C;m=ve(s|0,((s|0)<0)<<31>>31|0,n<<1|0,p|0)|0;r=C;b=((q*38|0)<0)<<31>>31;p=ve(q*38|0,b|0,n<<1|0,p|0)|0;n=C;ua=ve(k|0,((k|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;ta=C;ka=ve(k<<1|0,((k<<1|0)<0)<<31>>31|0,f|0,((f|0)<0)<<31>>31|0)|0;ja=C;ca=ve(u|0,((u|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;ba=C;W=ve(t|0,((t|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;V=C;O=ve(g|0,((g|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;N=C;z=ve(v|0,((v|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;y=C;Y=((s*19|0)<0)<<31>>31;Ya=ve(s*19|0,Y|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;Xa=C;k=ve(q*38|0,b|0,k|0,((k|0)<0)<<31>>31|0)|0;j=C;ea=ve(f<<1|0,w|0,f|0,((f|0)<0)<<31>>31|0)|0;da=C;U=ve(f<<1|0,w|0,u|0,((u|0)<0)<<31>>31|0)|0;T=C;K=ve(t<<1|0,((t<<1|0)<0)<<31>>31|0,f<<1|0,w|0)|0;J=C;E=ve(g|0,((g|0)<0)<<31>>31|0,f<<1|0,w|0)|0;D=C;qa=((v*38|0)<0)<<31>>31;_a=ve(v*38|0,qa|0,f<<1|0,w|0)|0;Za=C;Qa=ve(s*19|0,Y|0,f<<1|0,w|0)|0;Pa=C;w=ve(q*38|0,b|0,f<<1|0,w|0)|0;f=C;M=ve(u|0,((u|0)<0)<<31>>31|0,u|0,((u|0)<0)<<31>>31|0)|0;L=C;B=ve(u<<1|0,((u<<1|0)<0)<<31>>31|0,t|0,((t|0)<0)<<31>>31|0)|0;A=C;ab=ve(g*19|0,((g*19|0)<0)<<31>>31|0,u<<1|0,((u<<1|0)<0)<<31>>31|0)|0;$a=C;Sa=ve(v*38|0,qa|0,u|0,((u|0)<0)<<31>>31|0)|0;Ra=C;Ga=ve(s*19|0,Y|0,u<<1|0,((u<<1|0)<0)<<31>>31|0)|0;Fa=C;u=ve(q*38|0,b|0,u|0,((u|0)<0)<<31>>31|0)|0;e=C;eb=ve(t*38|0,((t*38|0)<0)<<31>>31|0,t|0,((t|0)<0)<<31>>31|0)|0;db=C;Wa=ve(g*19|0,((g*19|0)<0)<<31>>31|0,t<<1|0,((t<<1|0)<0)<<31>>31|0)|0;Va=C;Ia=ve(v*38|0,qa|0,t<<1|0,((t<<1|0)<0)<<31>>31|0)|0;Ha=C;ya=ve(s*19|0,Y|0,t<<1|0,((t<<1|0)<0)<<31>>31|0)|0;xa=C;t=ve(q*38|0,b|0,t<<1|0,((t<<1|0)<0)<<31>>31|0)|0;d=C;Ka=ve(g*19|0,((g*19|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;Ja=C;Aa=ve(v*38|0,qa|0,g|0,((g|0)<0)<<31>>31|0)|0;za=C;oa=ve(s*19|0,Y|0,g<<1|0,((g<<1|0)<0)<<31>>31|0)|0;na=C;g=ve(q*38|0,b|0,g|0,((g|0)<0)<<31>>31|0)|0;x=C;qa=ve(v*38|0,qa|0,v|0,((v|0)<0)<<31>>31|0)|0;pa=C;ga=ve(s*19|0,Y|0,v<<1|0,((v<<1|0)<0)<<31>>31|0)|0;fa=C;v=ve(q*38|0,b|0,v<<1|0,((v<<1|0)<0)<<31>>31|0)|0;i=C;Y=ve(s*19|0,Y|0,s|0,((s|0)<0)<<31>>31|0)|0;X=C;s=ve(q*38|0,b|0,s|0,((s|0)<0)<<31>>31|0)|0;h=C;q=ve(q*38|0,b|0,q|0,((q|0)<0)<<31>>31|0)|0;b=C;bb=le(eb|0,db|0,cb|0,bb|0)|0;$a=le(bb|0,C|0,ab|0,$a|0)|0;Za=le($a|0,C|0,_a|0,Za|0)|0;Xa=le(Za|0,C|0,Ya|0,Xa|0)|0;n=le(Xa|0,C|0,p|0,n|0)|0;p=C;Ta=le(Wa|0,Va|0,Ua|0,Ta|0)|0;Ra=le(Ta|0,C|0,Sa|0,Ra|0)|0;Pa=le(Ra|0,C|0,Qa|0,Pa|0)|0;j=le(Pa|0,C|0,k|0,j|0)|0;k=C;La=le(Oa|0,Na|0,Ma|0,La|0)|0;Ja=le(La|0,C|0,Ka|0,Ja|0)|0;Ha=le(Ja|0,C|0,Ia|0,Ha|0)|0;Fa=le(Ha|0,C|0,Ga|0,Fa|0)|0;f=le(Fa|0,C|0,w|0,f|0)|0;w=C;Ba=le(Ea|0,Da|0,Ca|0,Ba|0)|0;za=le(Ba|0,C|0,Aa|0,za|0)|0;xa=le(za|0,C|0,ya|0,xa|0)|0;e=le(xa|0,C|0,u|0,e|0)|0;u=C;ta=le(wa|0,va|0,ua|0,ta|0)|0;ra=le(ta|0,C|0,sa|0,ra|0)|0;pa=le(ra|0,C|0,qa|0,pa|0)|0;na=le(pa|0,C|0,oa|0,na|0)|0;d=le(na|0,C|0,t|0,d|0)|0;t=C;ja=le(ma|0,la|0,ka|0,ja|0)|0;ha=le(ja|0,C|0,ia|0,ha|0)|0;fa=le(ha|0,C|0,ga|0,fa|0)|0;x=le(fa|0,C|0,g|0,x|0)|0;g=C;ba=le(ea|0,da|0,ca|0,ba|0)|0;$=le(ba|0,C|0,aa|0,$|0)|0;Z=le($|0,C|0,_|0,Z|0)|0;X=le(Z|0,C|0,Y|0,X|0)|0;i=le(X|0,C|0,v|0,i|0)|0;v=C;T=le(W|0,V|0,U|0,T|0)|0;R=le(T|0,C|0,S|0,R|0)|0;P=le(R|0,C|0,Q|0,P|0)|0;h=le(P|0,C|0,s|0,h|0)|0;s=C;L=le(O|0,N|0,M|0,L|0)|0;J=le(L|0,C|0,K|0,J|0)|0;H=le(J|0,C|0,I|0,H|0)|0;F=le(H|0,C|0,G|0,F|0)|0;b=le(F|0,C|0,q|0,b|0)|0;q=C;A=le(E|0,D|0,B|0,A|0)|0;y=le(A|0,C|0,z|0,y|0)|0;r=le(y|0,C|0,m|0,r|0)|0;l=le(r|0,C|0,o|0,l|0)|0;o=C;p=oe(n|0,p|0,1)|0;n=C;k=oe(j|0,k|0,1)|0;j=C;w=oe(f|0,w|0,1)|0;f=C;u=oe(e|0,u|0,1)|0;e=C;t=oe(d|0,t|0,1)|0;d=C;g=oe(x|0,g|0,1)|0;x=C;v=oe(i|0,v|0,1)|0;i=C;s=oe(h|0,s|0,1)|0;h=C;q=oe(b|0,q|0,1)|0;b=C;o=oe(l|0,o|0,1)|0;l=C;r=le(p|0,n|0,33554432,0)|0;r=je(r|0,C|0,26)|0;m=C;j=le(r|0,m|0,k|0,j|0)|0;k=C;m=oe(r|0,m|0,26)|0;m=ke(p|0,n|0,m|0,C|0)|0;n=C;p=le(t|0,d|0,33554432,0)|0;p=je(p|0,C|0,26)|0;r=C;x=le(p|0,r|0,g|0,x|0)|0;g=C;r=oe(p|0,r|0,26)|0;r=ke(t|0,d|0,r|0,C|0)|0;d=C;t=le(j|0,k|0,16777216,0)|0;t=je(t|0,C|0,25)|0;p=C;f=le(t|0,p|0,w|0,f|0)|0;w=C;p=oe(t|0,p|0,25)|0;p=ke(j|0,k|0,p|0,C|0)|0;k=C;j=le(x|0,g|0,16777216,0)|0;j=je(j|0,C|0,25)|0;t=C;i=le(j|0,t|0,v|0,i|0)|0;v=C;t=oe(j|0,t|0,25)|0;t=ke(x|0,g|0,t|0,C|0)|0;g=C;x=le(f|0,w|0,33554432,0)|0;x=je(x|0,C|0,26)|0;j=C;e=le(x|0,j|0,u|0,e|0)|0;u=C;j=oe(x|0,j|0,26)|0;j=ke(f|0,w|0,j|0,C|0)|0;w=le(i|0,v|0,33554432,0)|0;w=je(w|0,C|0,26)|0;f=C;h=le(w|0,f|0,s|0,h|0)|0;s=C;f=oe(w|0,f|0,26)|0;f=ke(i|0,v|0,f|0,C|0)|0;v=le(e|0,u|0,16777216,0)|0;v=je(v|0,C|0,25)|0;i=C;d=le(v|0,i|0,r|0,d|0)|0;r=C;i=oe(v|0,i|0,25)|0;i=ke(e|0,u|0,i|0,C|0)|0;u=le(h|0,s|0,16777216,0)|0;u=je(u|0,C|0,25)|0;e=C;b=le(u|0,e|0,q|0,b|0)|0;q=C;e=oe(u|0,e|0,25)|0;e=ke(h|0,s|0,e|0,C|0)|0;s=le(d|0,r|0,33554432,0)|0;s=je(s|0,C|0,26)|0;h=C;g=le(t|0,g|0,s|0,h|0)|0;h=oe(s|0,h|0,26)|0;h=ke(d|0,r|0,h|0,C|0)|0;r=le(b|0,q|0,33554432,0)|0;r=je(r|0,C|0,26)|0;d=C;l=le(r|0,d|0,o|0,l|0)|0;o=C;d=oe(r|0,d|0,26)|0;d=ke(b|0,q|0,d|0,C|0)|0;q=le(l|0,o|0,16777216,0)|0;q=je(q|0,C|0,25)|0;b=C;r=ve(q|0,b|0,19,0)|0;n=le(r|0,C|0,m|0,n|0)|0;m=C;b=oe(q|0,b|0,25)|0;b=ke(l|0,o|0,b|0,C|0)|0;o=le(n|0,m|0,33554432,0)|0;o=je(o|0,C|0,26)|0;l=C;k=le(p|0,k|0,o|0,l|0)|0;l=oe(o|0,l|0,26)|0;l=ke(n|0,m|0,l|0,C|0)|0;c[a>>2]=l;c[a+4>>2]=k;c[a+8>>2]=j;c[a+12>>2]=i;c[a+16>>2]=h;c[a+20>>2]=g;c[a+24>>2]=f;c[a+28>>2]=e;c[a+32>>2]=d;c[a+36>>2]=b;return}function Eb(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;d=i=i+63&-64;i=i+160|0;Cb(d+120|0,b);Cb(d+80|0,d+120|0);Cb(d+80|0,d+80|0);Ab(d+80|0,b,d+80|0);Ab(d+120|0,d+120|0,d+80|0);Cb(d+40|0,d+120|0);Ab(d+80|0,d+80|0,d+40|0);Cb(d+40|0,d+80|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Ab(d+80|0,d+40|0,d+80|0);Cb(d+40|0,d+80|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Ab(d+40|0,d+40|0,d+80|0);Cb(d,d+40|0);b=1;do{Cb(d,d);b=b+1|0}while((b|0)!=20);Ab(d+40|0,d,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Cb(d+40|0,d+40|0);Ab(d+80|0,d+40|0,d+80|0);Cb(d+40|0,d+80|0);b=1;do{Cb(d+40|0,d+40|0);b=b+1|0}while((b|0)!=50);Ab(d+40|0,d+40|0,d+80|0);Cb(d,d+40|0);b=1;do{Cb(d,d);b=b+1|0}while((b|0)!=100);Ab(d+40|0,d,d+40|0);Cb(d+40|0,d+40|0);b=1;do{Cb(d+40|0,d+40|0);b=b+1|0}while((b|0)!=50);Ab(d+80|0,d+40|0,d+80|0);Cb(d+80|0,d+80|0);Cb(d+80|0,d+80|0);Cb(d+80|0,d+80|0);Cb(d+80|0,d+80|0);Cb(d+80|0,d+80|0);Ab(a,d+80|0,d+120|0);i=c;return}function Fb(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;d=i;e=i=i+63&-64;i=i+128|0;Cb(e+80|0,b);Cb(e+40|0,e+80|0);Cb(e+40|0,e+40|0);Ab(e+40|0,b,e+40|0);Ab(e+80|0,e+80|0,e+40|0);Cb(e+80|0,e+80|0);Ab(e+80|0,e+40|0,e+80|0);Cb(e+40|0,e+80|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Ab(e+80|0,e+40|0,e+80|0);Cb(e+40|0,e+80|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Ab(e+40|0,e+40|0,e+80|0);Cb(e,e+40|0);c=1;do{Cb(e,e);c=c+1|0}while((c|0)!=20);Ab(e+40|0,e,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Cb(e+40|0,e+40|0);Ab(e+80|0,e+40|0,e+80|0);Cb(e+40|0,e+80|0);c=1;do{Cb(e+40|0,e+40|0);c=c+1|0}while((c|0)!=50);Ab(e+40|0,e+40|0,e+80|0);Cb(e,e+40|0);c=1;do{Cb(e,e);c=c+1|0}while((c|0)!=100);Ab(e+40|0,e,e+40|0);Cb(e+40|0,e+40|0);c=1;do{Cb(e+40|0,e+40|0);c=c+1|0}while((c|0)!=50);Ab(e+80|0,e+40|0,e+80|0);Cb(e+80|0,e+80|0);Cb(e+80|0,e+80|0);Ab(a,e+80|0,b);i=d;return}function Gb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;m=(c[b+4>>2]|0)-(c[d+4>>2]|0)|0;l=(c[b+8>>2]|0)-(c[d+8>>2]|0)|0;k=(c[b+12>>2]|0)-(c[d+12>>2]|0)|0;j=(c[b+16>>2]|0)-(c[d+16>>2]|0)|0;i=(c[b+20>>2]|0)-(c[d+20>>2]|0)|0;h=(c[b+24>>2]|0)-(c[d+24>>2]|0)|0;g=(c[b+28>>2]|0)-(c[d+28>>2]|0)|0;f=(c[b+32>>2]|0)-(c[d+32>>2]|0)|0;e=(c[b+36>>2]|0)-(c[d+36>>2]|0)|0;c[a>>2]=(c[b>>2]|0)-(c[d>>2]|0);c[a+4>>2]=m;c[a+8>>2]=l;c[a+12>>2]=k;c[a+16>>2]=j;c[a+20>>2]=i;c[a+24>>2]=h;c[a+28>>2]=g;c[a+32>>2]=f;c[a+36>>2]=e;return}function Hb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=i=i+63&-64;i=i+48|0;vb(a,b+40|0,b);Gb(a+40|0,b+40|0,b);Ab(a+80|0,a,c);Ab(a+40|0,a+40|0,c+40|0);Ab(a+120|0,c+120|0,b+120|0);Ab(a,b+80|0,c+80|0);vb(e,a,a);Gb(a,a+80|0,a+40|0);vb(a+40|0,a+80|0,a+40|0);vb(a+80|0,e,a+120|0);Gb(a+120|0,e,a+120|0);i=d;return}function Ib(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0;r=i;p=i=i+63&-64;i=i+240|0;yb(a+40|0,b);c[a+80>>2]=1;e=a+84|0;f=e+36|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(f|0));Cb(p+160|0,a+40|0);Ab(p+120|0,p+160|0,464);o=c[a+80>>2]|0;n=c[a+84>>2]|0;m=c[a+88>>2]|0;l=c[a+92>>2]|0;k=c[a+96>>2]|0;j=c[a+100>>2]|0;h=c[a+104>>2]|0;g=c[a+108>>2]|0;f=c[a+112>>2]|0;e=c[a+116>>2]|0;B=(c[p+160>>2]|0)-o|0;A=(c[p+160+4>>2]|0)-n|0;z=(c[p+160+8>>2]|0)-m|0;y=(c[p+160+12>>2]|0)-l|0;x=(c[p+160+16>>2]|0)-k|0;w=(c[p+160+20>>2]|0)-j|0;v=(c[p+160+24>>2]|0)-h|0;u=(c[p+160+28>>2]|0)-g|0;t=(c[p+160+32>>2]|0)-f|0;s=(c[p+160+36>>2]|0)-e|0;c[p+160>>2]=B;c[p+160+4>>2]=A;c[p+160+8>>2]=z;c[p+160+12>>2]=y;c[p+160+16>>2]=x;c[p+160+20>>2]=w;c[p+160+24>>2]=v;c[p+160+28>>2]=u;c[p+160+32>>2]=t;c[p+160+36>>2]=s;n=n+(c[p+120+4>>2]|0)|0;m=m+(c[p+120+8>>2]|0)|0;l=l+(c[p+120+12>>2]|0)|0;k=k+(c[p+120+16>>2]|0)|0;j=j+(c[p+120+20>>2]|0)|0;h=h+(c[p+120+24>>2]|0)|0;g=g+(c[p+120+28>>2]|0)|0;f=f+(c[p+120+32>>2]|0)|0;e=e+(c[p+120+36>>2]|0)|0;c[p+120>>2]=o+(c[p+120>>2]|0);c[p+120+4>>2]=n;c[p+120+8>>2]=m;c[p+120+12>>2]=l;c[p+120+16>>2]=k;c[p+120+20>>2]=j;c[p+120+24>>2]=h;c[p+120+28>>2]=g;c[p+120+32>>2]=f;c[p+120+36>>2]=e;Cb(p+80|0,p+120|0);Ab(p+80|0,p+80|0,p+120|0);Cb(a,p+80|0);Ab(a,a,p+120|0);Ab(a,a,p+160|0);Fb(a,a);Ab(a,a,p+80|0);Ab(a,a,p+160|0);Cb(p+40|0,a);Ab(p+40|0,p+40|0,p+120|0);e=c[p+40>>2]|0;f=c[p+40+4>>2]|0;g=c[p+40+8>>2]|0;h=c[p+40+12>>2]|0;j=c[p+40+16>>2]|0;k=c[p+40+20>>2]|0;l=c[p+40+24>>2]|0;m=c[p+40+28>>2]|0;n=c[p+40+32>>2]|0;o=c[p+40+36>>2]|0;c[p>>2]=e-B;c[p+4>>2]=f-A;c[p+8>>2]=g-z;c[p+12>>2]=h-y;c[p+16>>2]=j-x;c[p+20>>2]=k-w;c[p+24>>2]=l-v;c[p+28>>2]=m-u;c[p+32>>2]=n-t;c[p+36>>2]=o-s;zb(p+200|0,p);if(Jd(p+200|0,32848)|0){t=(c[p+160+4>>2]|0)+f|0;u=(c[p+160+8>>2]|0)+g|0;v=(c[p+160+12>>2]|0)+h|0;w=(c[p+160+16>>2]|0)+j|0;x=(c[p+160+20>>2]|0)+k|0;y=(c[p+160+24>>2]|0)+l|0;z=(c[p+160+28>>2]|0)+m|0;A=(c[p+160+32>>2]|0)+n|0;B=(c[p+160+36>>2]|0)+o|0;c[p>>2]=(c[p+160>>2]|0)+e;c[p+4>>2]=t;c[p+8>>2]=u;c[p+12>>2]=v;c[p+16>>2]=w;c[p+20>>2]=x;c[p+24>>2]=y;c[p+28>>2]=z;c[p+32>>2]=A;c[p+36>>2]=B;zb(p+200|0,p);if(!(Jd(p+200|0,32848)|0)){Ab(a,a,504);q=4}else e=-1}else q=4;if((q|0)==4){zb(p+200|0,a);if(((d[p+200>>0]|0)&1|0)==((d[b+31>>0]|0)>>>7|0))Bb(a,a);Ab(a+120|0,a,a+40|0);e=0}i=r;return e|0}function Jb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=i=i+63&-64;i=i+48|0;vb(a,b+40|0,b);Gb(a+40|0,b+40|0,b);Ab(a+80|0,a,c);Ab(a+40|0,a+40|0,c+40|0);Ab(a+120|0,c+80|0,b+120|0);vb(e,b+80|0,b+80|0);Gb(a,a+80|0,a+40|0);vb(a+40|0,a+80|0,a+40|0);vb(a+80|0,e,a+120|0);Gb(a+120|0,e,a+120|0);i=d;return}function Kb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=i=i+63&-64;i=i+48|0;vb(a,b+40|0,b);Gb(a+40|0,b+40|0,b);Ab(a+80|0,a,c+40|0);Ab(a+40|0,a+40|0,c);Ab(a+120|0,c+80|0,b+120|0);vb(e,b+80|0,b+80|0);Gb(a,a+80|0,a+40|0);vb(a+40|0,a+80|0,a+40|0);Gb(a+80|0,e,a+120|0);vb(a+120|0,e,a+120|0);i=d;return}function Lb(a,b){a=a|0;b=b|0;Ab(a,b,b+120|0);Ab(a+40|0,b+40|0,b+80|0);Ab(a+80|0,b+80|0,b+120|0);return}function Mb(a,b){a=a|0;b=b|0;Ab(a,b,b+120|0);Ab(a+40|0,b+40|0,b+80|0);Ab(a+80|0,b+80|0,b+120|0);Ab(a+120|0,b,b+40|0);return}function Nb(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;d=i=i+63&-64;i=i+48|0;Cb(a,b);Cb(a+80|0,b+40|0);Db(a+120|0,b+80|0);vb(a+40|0,b,b+40|0);Cb(d,a+40|0);vb(a+40|0,a+80|0,a);Gb(a+80|0,a+80|0,a);Gb(a,d,a+40|0);Gb(a+120|0,a+120|0,a+80|0);i=c;return}function Ob(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;vb(a,b+40|0,b);Gb(a+40|0,b+40|0,b);l=c[b+84>>2]|0;k=c[b+88>>2]|0;j=c[b+92>>2]|0;i=c[b+96>>2]|0;h=c[b+100>>2]|0;g=c[b+104>>2]|0;f=c[b+108>>2]|0;e=c[b+112>>2]|0;d=c[b+116>>2]|0;c[a+80>>2]=c[b+80>>2];c[a+84>>2]=l;c[a+88>>2]=k;c[a+92>>2]=j;c[a+96>>2]=i;c[a+100>>2]=h;c[a+104>>2]=g;c[a+108>>2]=f;c[a+112>>2]=e;c[a+116>>2]=d;Ab(a+120|0,b+120|0,544);return}function Pb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;l=c[b+4>>2]|0;k=c[b+8>>2]|0;j=c[b+12>>2]|0;i=c[b+16>>2]|0;h=c[b+20>>2]|0;g=c[b+24>>2]|0;f=c[b+28>>2]|0;e=c[b+32>>2]|0;d=c[b+36>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=l;c[a+8>>2]=k;c[a+12>>2]=j;c[a+16>>2]=i;c[a+20>>2]=h;c[a+24>>2]=g;c[a+28>>2]=f;c[a+32>>2]=e;c[a+36>>2]=d;d=c[b+44>>2]|0;e=c[b+48>>2]|0;f=c[b+52>>2]|0;g=c[b+56>>2]|0;h=c[b+60>>2]|0;i=c[b+64>>2]|0;j=c[b+68>>2]|0;k=c[b+72>>2]|0;l=c[b+76>>2]|0;c[a+40>>2]=c[b+40>>2];c[a+44>>2]=d;c[a+48>>2]=e;c[a+52>>2]=f;c[a+56>>2]=g;c[a+60>>2]=h;c[a+64>>2]=i;c[a+68>>2]=j;c[a+72>>2]=k;c[a+76>>2]=l;l=c[b+84>>2]|0;k=c[b+88>>2]|0;j=c[b+92>>2]|0;i=c[b+96>>2]|0;h=c[b+100>>2]|0;g=c[b+104>>2]|0;f=c[b+108>>2]|0;e=c[b+112>>2]|0;d=c[b+116>>2]|0;c[a+80>>2]=c[b+80>>2];c[a+84>>2]=l;c[a+88>>2]=k;c[a+92>>2]=j;c[a+96>>2]=i;c[a+100>>2]=h;c[a+104>>2]=g;c[a+108>>2]=f;c[a+112>>2]=e;c[a+116>>2]=d;return}function Qb(b,c){b=b|0;c=c|0;var e=0,f=0;e=i;f=i=i+63&-64;i=i+160|0;Eb(f+80|0,c+80|0);Ab(f+40|0,c,f+80|0);Ab(f,c+40|0,f+80|0);zb(b,f);zb(f+120|0,f+40|0);a[b+31>>0]=(d[b+31>>0]|0)^(d[f+120>>0]|0)<<7;i=e;return}function Rb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=i=i+63&-64;i=i+48|0;vb(a,b+40|0,b);Gb(a+40|0,b+40|0,b);Ab(a+80|0,a,c+40|0);Ab(a+40|0,a+40|0,c);Ab(a+120|0,c+120|0,b+120|0);Ab(a,b+80|0,c+80|0);vb(e,a,a);Gb(a,a+80|0,a+40|0);vb(a+40|0,a+80|0,a+40|0);Gb(a+80|0,e,a+120|0);vb(a+120|0,e,a+120|0);i=d;return}function Sb(b,c){b=b|0;c=c|0;var e=0,f=0;e=i;f=i=i+63&-64;i=i+160|0;Eb(f+80|0,c+80|0);Ab(f+40|0,c,f+80|0);Ab(f,c+40|0,f+80|0);zb(b,f);zb(f+120|0,f+40|0);a[b+31>>0]=(d[b+31>>0]|0)^(d[f+120>>0]|0)<<7;i=e;return}function Tb(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;h=i=i+63&-64;i=i+2400|0;Xb(h+2136|0,d);Xb(h+1880|0,f);Ob(h+480|0,e);Pb(h+1760|0,e);Nb(h+320|0,h+1760|0);Mb(h,h+320|0);Hb(h+320|0,h,h+480|0);Mb(h+160|0,h+320|0);Ob(h+480+160|0,h+160|0);Hb(h+320|0,h,h+480+160|0);Mb(h+160|0,h+320|0);Ob(h+480+320|0,h+160|0);Hb(h+320|0,h,h+480+320|0);Mb(h+160|0,h+320|0);Ob(h+480+480|0,h+160|0);Hb(h+320|0,h,h+480+480|0);Mb(h+160|0,h+320|0);Ob(h+480+640|0,h+160|0);Hb(h+320|0,h,h+480+640|0);Mb(h+160|0,h+320|0);Ob(h+480+800|0,h+160|0);Hb(h+320|0,h,h+480+800|0);Mb(h+160|0,h+320|0);Ob(h+480+960|0,h+160|0);Hb(h+320|0,h,h+480+960|0);Mb(h+160|0,h+320|0);Ob(h+480+1120|0,h+160|0);e=b;d=e+40|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(d|0));c[b+40>>2]=1;e=b+44|0;d=e+36|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(d|0));c[b+80>>2]=1;e=b+84|0;d=e+36|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(d|0));d=255;while(1){if(a[h+2136+d>>0]|0){e=d;break}if(a[h+1880+d>>0]|0){e=d;break}e=d+-1|0;if((d|0)>0)d=e;else break}if((e|0)>-1)while(1){Nb(h+320|0,b);d=a[h+2136+e>>0]|0;if(d<<24>>24<=0){if(d<<24>>24<0){Mb(h+160|0,h+320|0);Rb(h+320|0,h+160|0,h+480+(((d<<24>>24|0)/-2|0)*160|0)|0)}}else{Mb(h+160|0,h+320|0);Hb(h+320|0,h+160|0,h+480+(((d<<24>>24|0)/2|0)*160|0)|0)}d=a[h+1880+e>>0]|0;if(d<<24>>24<=0){if(d<<24>>24<0){Mb(h+160|0,h+320|0);Kb(h+320|0,h+160|0,584+(((d<<24>>24|0)/-2|0)*120|0)|0)}}else{Mb(h+160|0,h+320|0);Jb(h+320|0,h+160|0,584+(((d<<24>>24|0)/2|0)*120|0)|0)}Lb(b,h+320|0);if((e|0)>0)e=e+-1|0;else break}i=g;return}function Ub(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;g=i;h=i=i+63&-64;i=i+592|0;f=0;do{k=a[e+f>>0]|0;j=f<<1;a[h+520+j>>0]=k&15;a[h+520+(j|1)>>0]=(k&255)>>>4;f=f+1|0}while((f|0)!=32);e=0;f=0;do{k=h+520+f|0;j=(d[k>>0]|0)+e|0;e=(j<<24)+134217728>>28;a[k>>0]=j-(e<<4);f=f+1|0}while((f|0)!=63);a[h+520+63>>0]=(d[h+520+63>>0]|0)+e;e=b;f=e+40|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(f|0));c[b+40>>2]=1;e=b+44|0;f=e+36|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(f|0));c[b+80>>2]=1;e=b+84|0;f=e+76|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(f|0));e=1;do{Yb(h,(e|0)/2|0,a[h+520+e>>0]|0);Jb(h+240|0,b,h);Mb(b,h+240|0);e=e+2|0}while((e|0)<64);Pb(h+400|0,b);Nb(h+240|0,h+400|0);Lb(h+120|0,h+240|0);Nb(h+240|0,h+120|0);Lb(h+120|0,h+240|0);Nb(h+240|0,h+120|0);Lb(h+120|0,h+240|0);Nb(h+240|0,h+120|0);Mb(b,h+240|0);e=0;do{Yb(h,(e|0)/2|0,a[h+520+e>>0]|0);Jb(h+240|0,b,h);Mb(b,h+240|0);e=e+2|0}while((e|0)<64);i=g;return}function Vb(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,_b=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,ic=0,jc=0,kc=0,lc=0,mc=0,nc=0,oc=0,pc=0,qc=0,rc=0,sc=0,tc=0,uc=0,vc=0,wc=0,xc=0,yc=0,zc=0;bb=d[c>>0]|0;ab=oe(d[c+1>>0]|0|0,0,8)|0;$a=C;_=d[c+2>>0]|0;_a=oe(_|0,0,16)|0;z=oe(d[c+3>>0]|0|0,0,8)|0;da=C;M=oe(d[c+4>>0]|0|0,0,16)|0;da=da|C;fa=d[c+5>>0]|0;ha=oe(fa|0,0,24)|0;da=ne(z|_|M|ha|0,da|C|0,5)|0;ha=oe(d[c+6>>0]|0|0,0,8)|0;M=C;_=d[c+7>>0]|0;z=oe(_|0,0,16)|0;M=ne(ha|fa|z|0,M|C|0,2)|0;z=oe(d[c+8>>0]|0|0,0,8)|0;fa=C;ha=oe(d[c+9>>0]|0|0,0,16)|0;fa=fa|C;l=d[c+10>>0]|0;o=oe(l|0,0,24)|0;fa=ne(z|_|ha|o|0,fa|C|0,7)|0;o=oe(d[c+11>>0]|0|0,0,8)|0;ha=C;_=oe(d[c+12>>0]|0|0,0,16)|0;ha=ha|C;z=d[c+13>>0]|0;y=oe(z|0,0,24)|0;ha=ne(o|l|_|y|0,ha|C|0,4)|0;y=oe(d[c+14>>0]|0|0,0,8)|0;_=C;l=d[c+15>>0]|0;o=oe(l|0,0,16)|0;_=ne(y|z|o|0,_|C|0,1)|0;o=oe(d[c+16>>0]|0|0,0,8)|0;z=C;y=oe(d[c+17>>0]|0|0,0,16)|0;z=z|C;N=d[c+18>>0]|0;B=oe(N|0,0,24)|0;z=ne(o|l|y|B|0,z|C|0,6)|0;B=oe(d[c+19>>0]|0|0,0,8)|0;y=C;l=oe(d[c+20>>0]|0|0,0,16)|0;y=ne(B|N|l|0,y|C|0,3)|0;l=C;N=d[c+21>>0]|0;B=oe(d[c+22>>0]|0|0,0,8)|0;o=C;Ja=d[c+23>>0]|0;na=oe(Ja|0,0,16)|0;tb=oe(d[c+24>>0]|0|0,0,8)|0;r=C;sc=oe(d[c+25>>0]|0|0,0,16)|0;r=r|C;ga=d[c+26>>0]|0;R=oe(ga|0,0,24)|0;r=ne(tb|Ja|sc|R|0,r|C|0,5)|0;R=oe(d[c+27>>0]|0|0,0,8)|0;sc=C;Ja=d[c+28>>0]|0;tb=oe(Ja|0,0,16)|0;sc=ne(R|ga|tb|0,sc|C|0,2)|0;tb=oe(d[c+29>>0]|0|0,0,8)|0;ga=C;R=oe(d[c+30>>0]|0|0,0,16)|0;ga=ga|C;u=oe(d[c+31>>0]|0|0,0,24)|0;ga=ne(tb|Ja|R|u|0,ga|C|0,7)|0;u=C;R=d[e>>0]|0;Ja=oe(d[e+1>>0]|0|0,0,8)|0;tb=C;sa=d[e+2>>0]|0;sb=oe(sa|0,0,16)|0;ra=oe(d[e+3>>0]|0|0,0,8)|0;Ya=C;Xa=oe(d[e+4>>0]|0|0,0,16)|0;Ya=Ya|C;Ga=d[e+5>>0]|0;Fa=oe(Ga|0,0,24)|0;Ya=ne(ra|sa|Xa|Fa|0,Ya|C|0,5)|0;Fa=oe(d[e+6>>0]|0|0,0,8)|0;Xa=C;sa=d[e+7>>0]|0;ra=oe(sa|0,0,16)|0;Xa=ne(Fa|Ga|ra|0,Xa|C|0,2)|0;ra=oe(d[e+8>>0]|0|0,0,8)|0;Ga=C;Fa=oe(d[e+9>>0]|0|0,0,16)|0;Ga=Ga|C;wc=d[e+10>>0]|0;t=oe(wc|0,0,24)|0;Ga=ne(ra|sa|Fa|t|0,Ga|C|0,7)|0;t=oe(d[e+11>>0]|0|0,0,8)|0;Fa=C;sa=oe(d[e+12>>0]|0|0,0,16)|0;Fa=Fa|C;ra=d[e+13>>0]|0;zc=oe(ra|0,0,24)|0;Fa=ne(t|wc|sa|zc|0,Fa|C|0,4)|0;zc=oe(d[e+14>>0]|0|0,0,8)|0;sa=C;wc=d[e+15>>0]|0;t=oe(wc|0,0,16)|0;sa=ne(zc|ra|t|0,sa|C|0,1)|0;t=oe(d[e+16>>0]|0|0,0,8)|0;ra=C;zc=oe(d[e+17>>0]|0|0,0,16)|0;ra=ra|C;la=d[e+18>>0]|0;uc=oe(la|0,0,24)|0;ra=ne(t|wc|zc|uc|0,ra|C|0,6)|0;uc=oe(d[e+19>>0]|0|0,0,8)|0;zc=C;wc=oe(d[e+20>>0]|0|0,0,16)|0;zc=ne(uc|la|wc|0,zc|C|0,3)|0;wc=C;la=d[e+21>>0]|0;uc=oe(d[e+22>>0]|0|0,0,8)|0;t=C;pc=d[e+23>>0]|0;i=oe(pc|0,0,16)|0;O=oe(d[e+24>>0]|0|0,0,8)|0;ma=C;F=oe(d[e+25>>0]|0|0,0,16)|0;ma=ma|C;x=d[e+26>>0]|0;qc=oe(x|0,0,24)|0;ma=ne(O|pc|F|qc|0,ma|C|0,5)|0;qc=oe(d[e+27>>0]|0|0,0,8)|0;F=C;pc=d[e+28>>0]|0;O=oe(pc|0,0,16)|0;F=ne(qc|x|O|0,F|C|0,2)|0;O=oe(d[e+29>>0]|0|0,0,8)|0;x=C;qc=oe(d[e+30>>0]|0|0,0,16)|0;x=x|C;n=oe(d[e+31>>0]|0|0,0,24)|0;x=ne(O|pc|qc|n|0,x|C|0,7)|0;n=C;qc=d[f>>0]|0;pc=oe(d[f+1>>0]|0|0,0,8)|0;O=C;ba=d[f+2>>0]|0;rc=oe(ba|0,0,16)|0;Y=oe(d[f+3>>0]|0|0,0,8)|0;ca=C;m=oe(d[f+4>>0]|0|0,0,16)|0;ca=ca|C;ia=d[f+5>>0]|0;G=oe(ia|0,0,24)|0;ca=ne(Y|ba|m|G|0,ca|C|0,5)|0;G=oe(d[f+6>>0]|0|0,0,8)|0;m=C;ba=d[f+7>>0]|0;Y=oe(ba|0,0,16)|0;m=ne(G|ia|Y|0,m|C|0,2)|0;Y=oe(d[f+8>>0]|0|0,0,8)|0;ia=C;G=oe(d[f+9>>0]|0|0,0,16)|0;ia=ia|C;S=d[f+10>>0]|0;$=oe(S|0,0,24)|0;ia=ne(Y|ba|G|$|0,ia|C|0,7)|0;$=oe(d[f+11>>0]|0|0,0,8)|0;G=C;ba=oe(d[f+12>>0]|0|0,0,16)|0;G=G|C;Y=d[f+13>>0]|0;T=oe(Y|0,0,24)|0;G=ne($|S|ba|T|0,G|C|0,4)|0;T=oe(d[f+14>>0]|0|0,0,8)|0;ba=C;S=d[f+15>>0]|0;$=oe(S|0,0,16)|0;ba=ne(T|Y|$|0,ba|C|0,1)|0;$=oe(d[f+16>>0]|0|0,0,8)|0;Y=C;T=oe(d[f+17>>0]|0|0,0,16)|0;Y=Y|C;X=d[f+18>>0]|0;c=oe(X|0,0,24)|0;Y=ne($|S|T|c|0,Y|C|0,6)|0;c=oe(d[f+19>>0]|0|0,0,8)|0;T=C;S=oe(d[f+20>>0]|0|0,0,16)|0;T=ne(c|X|S|0,T|C|0,3)|0;S=C;X=d[f+21>>0]|0;c=oe(d[f+22>>0]|0|0,0,8)|0;$=C;g=d[f+23>>0]|0;P=oe(g|0,0,16)|0;Q=oe(d[f+24>>0]|0|0,0,8)|0;W=C;V=oe(d[f+25>>0]|0|0,0,16)|0;W=W|C;h=d[f+26>>0]|0;p=oe(h|0,0,24)|0;W=ne(Q|g|V|p|0,W|C|0,5)|0;p=oe(d[f+27>>0]|0|0,0,8)|0;V=C;g=d[f+28>>0]|0;Q=oe(g|0,0,16)|0;V=ne(p|h|Q|0,V|C|0,2)|0;Q=oe(d[f+29>>0]|0|0,0,8)|0;h=C;p=oe(d[f+30>>0]|0|0,0,16)|0;h=h|C;e=oe(d[f+31>>0]|0|0,0,24)|0;h=ne(Q|g|p|e|0,h|C|0,7)|0;e=C;p=ve(Ja|R|sb&2031616|0,tb|0,ab|bb|_a&2031616|0,$a|0)|0;p=le(pc|qc|rc&2031616|0,O|0,p|0,C|0)|0;O=C;rc=ve(Ya&2097151|0,0,ab|bb|_a&2031616|0,$a|0)|0;qc=C;pc=ve(Ja|R|sb&2031616|0,tb|0,da&2097151|0,0)|0;g=C;Q=ve(Xa&2097151|0,0,ab|bb|_a&2031616|0,$a|0)|0;D=C;K=ve(Ya&2097151|0,0,da&2097151|0,0)|0;kc=C;j=ve(Ja|R|sb&2031616|0,tb|0,M&2097151|0,0)|0;j=le(K|0,kc|0,j|0,C|0)|0;D=le(j|0,C|0,Q|0,D|0)|0;m=le(D|0,C|0,m&2097151|0,0)|0;D=C;Q=ve(Ga&2097151|0,0,ab|bb|_a&2031616|0,$a|0)|0;j=C;kc=ve(Xa&2097151|0,0,da&2097151|0,0)|0;K=C;oc=ve(Ya&2097151|0,0,M&2097151|0,0)|0;nc=C;mc=ve(Ja|R|sb&2031616|0,tb|0,fa&2097151|0,0)|0;lc=C;$b=ve(Fa&2097151|0,0,ab|bb|_a&2031616|0,$a|0)|0;E=C;bc=ve(Ga&2097151|0,0,da&2097151|0,0)|0;J=C;dc=ve(Xa&2097151|0,0,M&2097151|0,0)|0;ac=C;ec=ve(Ya&2097151|0,0,fa&2097151|0,0)|0;fc=C;cc=ve(Ja|R|sb&2031616|0,tb|0,ha&2097151|0,0)|0;cc=le(ec|0,fc|0,cc|0,C|0)|0;ac=le(cc|0,C|0,dc|0,ac|0)|0;J=le(ac|0,C|0,bc|0,J|0)|0;E=le(J|0,C|0,$b|0,E|0)|0;G=le(E|0,C|0,G&2097151|0,0)|0;E=C;$b=ve(sa&2097151|0,0,ab|bb|_a&2031616|0,$a|0)|0;J=C;bc=ve(Fa&2097151|0,0,da&2097151|0,0)|0;ac=C;dc=ve(Ga&2097151|0,0,M&2097151|0,0)|0;cc=C;fc=ve(Xa&2097151|0,0,fa&2097151|0,0)|0;ec=C;jc=ve(Ya&2097151|0,0,ha&2097151|0,0)|0;ic=C;hc=ve(Ja|R|sb&2031616|0,tb|0,_&2097151|0,0)|0;gc=C;q=ve(ra&2097151|0,0,ab|bb|_a&2031616|0,$a|0)|0;Z=C;Ob=ve(sa&2097151|0,0,da&2097151|0,0)|0;k=C;Qb=ve(Fa&2097151|0,0,M&2097151|0,0)|0;Nb=C;Sb=ve(Ga&2097151|0,0,fa&2097151|0,0)|0;Pb=C;Ub=ve(Xa&2097151|0,0,ha&2097151|0,0)|0;Rb=C;Vb=ve(Ya&2097151|0,0,_&2097151|0,0)|0;Wb=C;Tb=ve(Ja|R|sb&2031616|0,tb|0,z&2097151|0,0)|0;Tb=le(Vb|0,Wb|0,Tb|0,C|0)|0;Rb=le(Tb|0,C|0,Ub|0,Rb|0)|0;Pb=le(Rb|0,C|0,Sb|0,Pb|0)|0;Nb=le(Pb|0,C|0,Qb|0,Nb|0)|0;k=le(Nb|0,C|0,Ob|0,k|0)|0;Z=le(k|0,C|0,q|0,Z|0)|0;Y=le(Z|0,C|0,Y&2097151|0,0)|0;Z=C;q=ve(zc|0,wc|0,ab|bb|_a&2031616|0,$a|0)|0;k=C;Ob=ve(ra&2097151|0,0,da&2097151|0,0)|0;Nb=C;Qb=ve(sa&2097151|0,0,M&2097151|0,0)|0;Pb=C;Sb=ve(Fa&2097151|0,0,fa&2097151|0,0)|0;Rb=C;Ub=ve(Ga&2097151|0,0,ha&2097151|0,0)|0;Tb=C;Wb=ve(Xa&2097151|0,0,_&2097151|0,0)|0;Vb=C;_b=ve(Ya&2097151|0,0,z&2097151|0,0)|0;Zb=C;Yb=ve(Ja|R|sb&2031616|0,tb|0,y|0,l|0)|0;Xb=C;ka=ve(uc|la|i&2031616|0,t|0,ab|bb|_a&2031616|0,$a|0)|0;wb=C;xb=ve(zc|0,wc|0,da&2097151|0,0)|0;yb=C;zb=ve(ra&2097151|0,0,M&2097151|0,0)|0;Ab=C;Bb=ve(sa&2097151|0,0,fa&2097151|0,0)|0;Cb=C;Db=ve(Fa&2097151|0,0,ha&2097151|0,0)|0;Eb=C;Fb=ve(Ga&2097151|0,0,_&2097151|0,0)|0;Gb=C;Hb=ve(Xa&2097151|0,0,z&2097151|0,0)|0;Ib=C;Kb=ve(Ya&2097151|0,0,y|0,l|0)|0;Lb=C;Mb=ve(Ja|R|sb&2031616|0,tb|0,B|N|na&2031616|0,o|0)|0;Mb=le(Kb|0,Lb|0,Mb|0,C|0)|0;Ib=le(Mb|0,C|0,Hb|0,Ib|0)|0;Gb=le(Ib|0,C|0,Fb|0,Gb|0)|0;Eb=le(Gb|0,C|0,Db|0,Eb|0)|0;Cb=le(Eb|0,C|0,Bb|0,Cb|0)|0;Ab=le(Cb|0,C|0,zb|0,Ab|0)|0;yb=le(Ab|0,C|0,xb|0,yb|0)|0;wb=le(yb|0,C|0,ka|0,wb|0)|0;$=le(wb|0,C|0,c|X|P&2031616|0,$|0)|0;P=C;X=ve(ma&2097151|0,0,ab|bb|_a&2031616|0,$a|0)|0;c=C;wb=ve(uc|la|i&2031616|0,t|0,da&2097151|0,0)|0;ka=C;yb=ve(zc|0,wc|0,M&2097151|0,0)|0;xb=C;Ab=ve(ra&2097151|0,0,fa&2097151|0,0)|0;zb=C;Cb=ve(sa&2097151|0,0,ha&2097151|0,0)|0;Bb=C;Eb=ve(Fa&2097151|0,0,_&2097151|0,0)|0;Db=C;Gb=ve(Ga&2097151|0,0,z&2097151|0,0)|0;Fb=C;Ib=ve(Xa&2097151|0,0,y|0,l|0)|0;Hb=C;Mb=ve(Ya&2097151|0,0,B|N|na&2031616|0,o|0)|0;Lb=C;Kb=ve(Ja|R|sb&2031616|0,tb|0,r&2097151|0,0)|0;Jb=C;db=ve(F&2097151|0,0,ab|bb|_a&2031616|0,$a|0)|0;L=C;fb=ve(ma&2097151|0,0,da&2097151|0,0)|0;cb=C;hb=ve(uc|la|i&2031616|0,t|0,M&2097151|0,0)|0;eb=C;jb=ve(zc|0,wc|0,fa&2097151|0,0)|0;gb=C;lb=ve(ra&2097151|0,0,ha&2097151|0,0)|0;ib=C;nb=ve(sa&2097151|0,0,_&2097151|0,0)|0;kb=C;pb=ve(Fa&2097151|0,0,z&2097151|0,0)|0;mb=C;rb=ve(Ga&2097151|0,0,y|0,l|0)|0;ob=C;vb=ve(Xa&2097151|0,0,B|N|na&2031616|0,o|0)|0;qb=C;La=ve(Ya&2097151|0,0,r&2097151|0,0)|0;H=C;ub=ve(Ja|R|sb&2031616|0,tb|0,sc&2097151|0,0)|0;ub=le(La|0,H|0,ub|0,C|0)|0;qb=le(ub|0,C|0,vb|0,qb|0)|0;ob=le(qb|0,C|0,rb|0,ob|0)|0;mb=le(ob|0,C|0,pb|0,mb|0)|0;kb=le(mb|0,C|0,nb|0,kb|0)|0;ib=le(kb|0,C|0,lb|0,ib|0)|0;gb=le(ib|0,C|0,jb|0,gb|0)|0;eb=le(gb|0,C|0,hb|0,eb|0)|0;cb=le(eb|0,C|0,fb|0,cb|0)|0;L=le(cb|0,C|0,db|0,L|0)|0;V=le(L|0,C|0,V&2097151|0,0)|0;L=C;$a=ve(x|0,n|0,ab|bb|_a&2031616|0,$a|0)|0;_a=C;bb=ve(F&2097151|0,0,da&2097151|0,0)|0;ab=C;db=ve(ma&2097151|0,0,M&2097151|0,0)|0;cb=C;fb=ve(uc|la|i&2031616|0,t|0,fa&2097151|0,0)|0;eb=C;hb=ve(zc|0,wc|0,ha&2097151|0,0)|0;gb=C;jb=ve(ra&2097151|0,0,_&2097151|0,0)|0;ib=C;lb=ve(sa&2097151|0,0,z&2097151|0,0)|0;kb=C;nb=ve(Fa&2097151|0,0,y|0,l|0)|0;mb=C;pb=ve(Ga&2097151|0,0,B|N|na&2031616|0,o|0)|0;ob=C;rb=ve(Xa&2097151|0,0,r&2097151|0,0)|0;qb=C;vb=ve(Ya&2097151|0,0,sc&2097151|0,0)|0;ub=C;tb=ve(Ja|R|sb&2031616|0,tb|0,ga|0,u|0)|0;sb=C;da=ve(x|0,n|0,da&2097151|0,0)|0;R=C;Ja=ve(F&2097151|0,0,M&2097151|0,0)|0;H=C;La=ve(ma&2097151|0,0,fa&2097151|0,0)|0;Ia=C;Na=ve(uc|la|i&2031616|0,t|0,ha&2097151|0,0)|0;Ka=C;Pa=ve(zc|0,wc|0,_&2097151|0,0)|0;Ma=C;Ra=ve(ra&2097151|0,0,z&2097151|0,0)|0;Oa=C;Ta=ve(sa&2097151|0,0,y|0,l|0)|0;Qa=C;Va=ve(Fa&2097151|0,0,B|N|na&2031616|0,o|0)|0;Sa=C;Za=ve(Ga&2097151|0,0,r&2097151|0,0)|0;Ua=C;s=ve(Xa&2097151|0,0,sc&2097151|0,0)|0;Wa=C;Ya=ve(Ya&2097151|0,0,ga|0,u|0)|0;Ya=le(s|0,Wa|0,Ya|0,C|0)|0;Ua=le(Ya|0,C|0,Za|0,Ua|0)|0;Sa=le(Ua|0,C|0,Va|0,Sa|0)|0;Qa=le(Sa|0,C|0,Ta|0,Qa|0)|0;Oa=le(Qa|0,C|0,Ra|0,Oa|0)|0;Ma=le(Oa|0,C|0,Pa|0,Ma|0)|0;Ka=le(Ma|0,C|0,Na|0,Ka|0)|0;Ia=le(Ka|0,C|0,La|0,Ia|0)|0;H=le(Ia|0,C|0,Ja|0,H|0)|0;R=le(H|0,C|0,da|0,R|0)|0;da=C;M=ve(x|0,n|0,M&2097151|0,0)|0;H=C;Ja=ve(F&2097151|0,0,fa&2097151|0,0)|0;Ia=C;La=ve(ma&2097151|0,0,ha&2097151|0,0)|0;Ka=C;Na=ve(uc|la|i&2031616|0,t|0,_&2097151|0,0)|0;Ma=C;Pa=ve(zc|0,wc|0,z&2097151|0,0)|0;Oa=C;Ra=ve(ra&2097151|0,0,y|0,l|0)|0;Qa=C;Ta=ve(sa&2097151|0,0,B|N|na&2031616|0,o|0)|0;Sa=C;Va=ve(Fa&2097151|0,0,r&2097151|0,0)|0;Ua=C;Za=ve(Ga&2097151|0,0,sc&2097151|0,0)|0;Ya=C;Xa=ve(Xa&2097151|0,0,ga|0,u|0)|0;Wa=C;fa=ve(x|0,n|0,fa&2097151|0,0)|0;s=C;va=ve(F&2097151|0,0,ha&2097151|0,0)|0;ja=C;xa=ve(ma&2097151|0,0,_&2097151|0,0)|0;ua=C;za=ve(uc|la|i&2031616|0,t|0,z&2097151|0,0)|0;wa=C;Ba=ve(zc|0,wc|0,y|0,l|0)|0;ya=C;Da=ve(ra&2097151|0,0,B|N|na&2031616|0,o|0)|0;Aa=C;Ha=ve(sa&2097151|0,0,r&2097151|0,0)|0;Ca=C;A=ve(Fa&2097151|0,0,sc&2097151|0,0)|0;Ea=C;Ga=ve(Ga&2097151|0,0,ga|0,u|0)|0;Ga=le(A|0,Ea|0,Ga|0,C|0)|0;Ca=le(Ga|0,C|0,Ha|0,Ca|0)|0;Aa=le(Ca|0,C|0,Da|0,Aa|0)|0;ya=le(Aa|0,C|0,Ba|0,ya|0)|0;wa=le(ya|0,C|0,za|0,wa|0)|0;ua=le(wa|0,C|0,xa|0,ua|0)|0;ja=le(ua|0,C|0,va|0,ja|0)|0;s=le(ja|0,C|0,fa|0,s|0)|0;fa=C;ha=ve(x|0,n|0,ha&2097151|0,0)|0;ja=C;va=ve(F&2097151|0,0,_&2097151|0,0)|0;ua=C;xa=ve(ma&2097151|0,0,z&2097151|0,0)|0;wa=C;za=ve(uc|la|i&2031616|0,t|0,y|0,l|0)|0;ya=C;Ba=ve(zc|0,wc|0,B|N|na&2031616|0,o|0)|0;Aa=C;Da=ve(ra&2097151|0,0,r&2097151|0,0)|0;Ca=C;Ha=ve(sa&2097151|0,0,sc&2097151|0,0)|0;Ga=C;Fa=ve(Fa&2097151|0,0,ga|0,u|0)|0;Ea=C;_=ve(x|0,n|0,_&2097151|0,0)|0;A=C;w=ve(F&2097151|0,0,z&2097151|0,0)|0;ea=C;I=ve(ma&2097151|0,0,y|0,l|0)|0;U=C;pa=ve(uc|la|i&2031616|0,t|0,B|N|na&2031616|0,o|0)|0;v=C;ta=ve(zc|0,wc|0,r&2097151|0,0)|0;oa=C;f=ve(ra&2097151|0,0,sc&2097151|0,0)|0;qa=C;sa=ve(sa&2097151|0,0,ga|0,u|0)|0;sa=le(f|0,qa|0,sa|0,C|0)|0;oa=le(sa|0,C|0,ta|0,oa|0)|0;v=le(oa|0,C|0,pa|0,v|0)|0;U=le(v|0,C|0,I|0,U|0)|0;ea=le(U|0,C|0,w|0,ea|0)|0;A=le(ea|0,C|0,_|0,A|0)|0;_=C;z=ve(x|0,n|0,z&2097151|0,0)|0;ea=C;w=ve(F&2097151|0,0,y|0,l|0)|0;U=C;I=ve(ma&2097151|0,0,B|N|na&2031616|0,o|0)|0;v=C;pa=ve(uc|la|i&2031616|0,t|0,r&2097151|0,0)|0;oa=C;ta=ve(zc|0,wc|0,sc&2097151|0,0)|0;sa=C;ra=ve(ra&2097151|0,0,ga|0,u|0)|0;qa=C;l=ve(x|0,n|0,y|0,l|0)|0;y=C;f=ve(F&2097151|0,0,B|N|na&2031616|0,o|0)|0;aa=C;vc=ve(ma&2097151|0,0,r&2097151|0,0)|0;tc=C;yc=ve(uc|la|i&2031616|0,t|0,sc&2097151|0,0)|0;xc=C;wc=ve(zc|0,wc|0,ga|0,u|0)|0;wc=le(yc|0,xc|0,wc|0,C|0)|0;tc=le(wc|0,C|0,vc|0,tc|0)|0;aa=le(tc|0,C|0,f|0,aa|0)|0;y=le(aa|0,C|0,l|0,y|0)|0;l=C;o=ve(x|0,n|0,B|N|na&2031616|0,o|0)|0;na=C;N=ve(F&2097151|0,0,r&2097151|0,0)|0;B=C;aa=ve(ma&2097151|0,0,sc&2097151|0,0)|0;f=C;t=ve(uc|la|i&2031616|0,t|0,ga|0,u|0)|0;i=C;r=ve(x|0,n|0,r&2097151|0,0)|0;la=C;uc=ve(F&2097151|0,0,sc&2097151|0,0)|0;tc=C;ma=ve(ma&2097151|0,0,ga|0,u|0)|0;ma=le(uc|0,tc|0,ma|0,C|0)|0;la=le(ma|0,C|0,r|0,la|0)|0;r=C;sc=ve(x|0,n|0,sc&2097151|0,0)|0;ma=C;F=ve(F&2097151|0,0,ga|0,u|0)|0;F=le(sc|0,ma|0,F|0,C|0)|0;ma=C;u=ve(x|0,n|0,ga|0,u|0)|0;ga=C;n=le(p|0,O|0,1048576,0)|0;n=ne(n|0,C|0,21)|0;x=C;g=le(rc|0,qc|0,pc|0,g|0)|0;g=le(g|0,C|0,n|0,x|0)|0;ca=le(g|0,C|0,ca&2097151|0,0)|0;g=C;x=oe(n|0,x|0,21)|0;x=ke(p|0,O|0,x|0,C|0)|0;O=C;p=le(m|0,D|0,1048576,0)|0;p=ne(p|0,C|0,21)|0;n=C;lc=le(oc|0,nc|0,mc|0,lc|0)|0;K=le(lc|0,C|0,kc|0,K|0)|0;j=le(K|0,C|0,Q|0,j|0)|0;ia=le(j|0,C|0,ia&2097151|0,0)|0;ia=le(ia|0,C|0,p|0,n|0)|0;j=C;n=oe(p|0,n|0,21)|0;p=C;Q=le(G|0,E|0,1048576,0)|0;Q=je(Q|0,C|0,21)|0;K=C;gc=le(jc|0,ic|0,hc|0,gc|0)|0;ec=le(gc|0,C|0,fc|0,ec|0)|0;cc=le(ec|0,C|0,dc|0,cc|0)|0;ac=le(cc|0,C|0,bc|0,ac|0)|0;J=le(ac|0,C|0,$b|0,J|0)|0;ba=le(J|0,C|0,ba&2097151|0,0)|0;ba=le(ba|0,C|0,Q|0,K|0)|0;J=C;K=oe(Q|0,K|0,21)|0;K=ke(G|0,E|0,K|0,C|0)|0;E=C;G=le(Y|0,Z|0,1048576,0)|0;G=je(G|0,C|0,21)|0;Q=C;Xb=le(_b|0,Zb|0,Yb|0,Xb|0)|0;Vb=le(Xb|0,C|0,Wb|0,Vb|0)|0;Tb=le(Vb|0,C|0,Ub|0,Tb|0)|0;Rb=le(Tb|0,C|0,Sb|0,Rb|0)|0;Pb=le(Rb|0,C|0,Qb|0,Pb|0)|0;Nb=le(Pb|0,C|0,Ob|0,Nb|0)|0;k=le(Nb|0,C|0,q|0,k|0)|0;S=le(k|0,C|0,T|0,S|0)|0;S=le(S|0,C|0,G|0,Q|0)|0;T=C;Q=oe(G|0,Q|0,21)|0;G=C;k=le($|0,P|0,1048576,0)|0;k=je(k|0,C|0,21)|0;q=C;Jb=le(Mb|0,Lb|0,Kb|0,Jb|0)|0;Hb=le(Jb|0,C|0,Ib|0,Hb|0)|0;Fb=le(Hb|0,C|0,Gb|0,Fb|0)|0;Db=le(Fb|0,C|0,Eb|0,Db|0)|0;Bb=le(Db|0,C|0,Cb|0,Bb|0)|0;zb=le(Bb|0,C|0,Ab|0,zb|0)|0;xb=le(zb|0,C|0,yb|0,xb|0)|0;ka=le(xb|0,C|0,wb|0,ka|0)|0;c=le(ka|0,C|0,X|0,c|0)|0;W=le(c|0,C|0,W&2097151|0,0)|0;W=le(W|0,C|0,k|0,q|0)|0;c=C;q=oe(k|0,q|0,21)|0;k=C;X=le(V|0,L|0,1048576,0)|0;X=je(X|0,C|0,21)|0;ka=C;sb=le(vb|0,ub|0,tb|0,sb|0)|0;qb=le(sb|0,C|0,rb|0,qb|0)|0;ob=le(qb|0,C|0,pb|0,ob|0)|0;mb=le(ob|0,C|0,nb|0,mb|0)|0;kb=le(mb|0,C|0,lb|0,kb|0)|0;ib=le(kb|0,C|0,jb|0,ib|0)|0;gb=le(ib|0,C|0,hb|0,gb|0)|0;eb=le(gb|0,C|0,fb|0,eb|0)|0;cb=le(eb|0,C|0,db|0,cb|0)|0;ab=le(cb|0,C|0,bb|0,ab|0)|0;_a=le(ab|0,C|0,$a|0,_a|0)|0;e=le(_a|0,C|0,h|0,e|0)|0;e=le(e|0,C|0,X|0,ka|0)|0;h=C;ka=oe(X|0,ka|0,21)|0;ka=ke(V|0,L|0,ka|0,C|0)|0;L=C;V=le(R|0,da|0,1048576,0)|0;V=je(V|0,C|0,21)|0;X=C;Wa=le(Za|0,Ya|0,Xa|0,Wa|0)|0;Ua=le(Wa|0,C|0,Va|0,Ua|0)|0;Sa=le(Ua|0,C|0,Ta|0,Sa|0)|0;Qa=le(Sa|0,C|0,Ra|0,Qa|0)|0;Oa=le(Qa|0,C|0,Pa|0,Oa|0)|0;Ma=le(Oa|0,C|0,Na|0,Ma|0)|0;Ka=le(Ma|0,C|0,La|0,Ka|0)|0;Ia=le(Ka|0,C|0,Ja|0,Ia|0)|0;H=le(Ia|0,C|0,M|0,H|0)|0;H=le(H|0,C|0,V|0,X|0)|0;M=C;X=oe(V|0,X|0,21)|0;X=ke(R|0,da|0,X|0,C|0)|0;da=C;R=le(s|0,fa|0,1048576,0)|0;R=je(R|0,C|0,21)|0;V=C;Ea=le(Ha|0,Ga|0,Fa|0,Ea|0)|0;Ca=le(Ea|0,C|0,Da|0,Ca|0)|0;Aa=le(Ca|0,C|0,Ba|0,Aa|0)|0;ya=le(Aa|0,C|0,za|0,ya|0)|0;wa=le(ya|0,C|0,xa|0,wa|0)|0;ua=le(wa|0,C|0,va|0,ua|0)|0;ja=le(ua|0,C|0,ha|0,ja|0)|0;ja=le(ja|0,C|0,R|0,V|0)|0;ha=C;V=oe(R|0,V|0,21)|0;V=ke(s|0,fa|0,V|0,C|0)|0;fa=C;s=le(A|0,_|0,1048576,0)|0;s=je(s|0,C|0,21)|0;R=C;qa=le(ta|0,sa|0,ra|0,qa|0)|0;oa=le(qa|0,C|0,pa|0,oa|0)|0;v=le(oa|0,C|0,I|0,v|0)|0;U=le(v|0,C|0,w|0,U|0)|0;ea=le(U|0,C|0,z|0,ea|0)|0;ea=le(ea|0,C|0,s|0,R|0)|0;z=C;R=oe(s|0,R|0,21)|0;R=ke(A|0,_|0,R|0,C|0)|0;_=C;A=le(y|0,l|0,1048576,0)|0;A=je(A|0,C|0,21)|0;s=C;i=le(aa|0,f|0,t|0,i|0)|0;B=le(i|0,C|0,N|0,B|0)|0;na=le(B|0,C|0,o|0,na|0)|0;na=le(na|0,C|0,A|0,s|0)|0;o=C;s=oe(A|0,s|0,21)|0;s=ke(y|0,l|0,s|0,C|0)|0;l=C;y=le(la|0,r|0,1048576,0)|0;y=je(y|0,C|0,21)|0;A=C;ma=le(F|0,ma|0,y|0,A|0)|0;F=C;A=oe(y|0,A|0,21)|0;A=ke(la|0,r|0,A|0,C|0)|0;r=C;la=le(u|0,ga|0,1048576,0)|0;la=je(la|0,C|0,21)|0;y=C;B=oe(la|0,y|0,21)|0;B=ke(u|0,ga|0,B|0,C|0)|0;ga=C;u=le(ca|0,g|0,1048576,0)|0;u=ne(u|0,C|0,21)|0;N=C;i=oe(u|0,N|0,21)|0;i=ke(ca|0,g|0,i|0,C|0)|0;g=C;ca=le(ia|0,j|0,1048576,0)|0;ca=je(ca|0,C|0,21)|0;t=C;E=le(ca|0,t|0,K|0,E|0)|0;K=C;t=oe(ca|0,t|0,21)|0;t=ke(ia|0,j|0,t|0,C|0)|0;j=C;ia=le(ba|0,J|0,1048576,0)|0;ia=je(ia|0,C|0,21)|0;ca=C;f=oe(ia|0,ca|0,21)|0;f=ke(ba|0,J|0,f|0,C|0)|0;J=C;ba=le(S|0,T|0,1048576,0)|0;ba=je(ba|0,C|0,21)|0;aa=C;U=oe(ba|0,aa|0,21)|0;w=C;v=le(W|0,c|0,1048576,0)|0;v=je(v|0,C|0,21)|0;I=C;L=le(v|0,I|0,ka|0,L|0)|0;ka=C;I=oe(v|0,I|0,21)|0;I=ke(W|0,c|0,I|0,C|0)|0;c=C;W=le(e|0,h|0,1048576,0)|0;W=je(W|0,C|0,21)|0;v=C;da=le(X|0,da|0,W|0,v|0)|0;X=C;v=oe(W|0,v|0,21)|0;v=ke(e|0,h|0,v|0,C|0)|0;h=C;e=le(H|0,M|0,1048576,0)|0;e=je(e|0,C|0,21)|0;W=C;fa=le(V|0,fa|0,e|0,W|0)|0;V=C;W=oe(e|0,W|0,21)|0;W=ke(H|0,M|0,W|0,C|0)|0;M=C;H=le(ja|0,ha|0,1048576,0)|0;H=je(H|0,C|0,21)|0;e=C;_=le(R|0,_|0,H|0,e|0)|0;R=C;e=oe(H|0,e|0,21)|0;e=ke(ja|0,ha|0,e|0,C|0)|0;ha=C;ja=le(ea|0,z|0,1048576,0)|0;ja=je(ja|0,C|0,21)|0;H=C;l=le(ja|0,H|0,s|0,l|0)|0;s=C;H=oe(ja|0,H|0,21)|0;H=ke(ea|0,z|0,H|0,C|0)|0;z=C;ea=le(na|0,o|0,1048576,0)|0;ea=je(ea|0,C|0,21)|0;ja=C;r=le(ea|0,ja|0,A|0,r|0)|0;A=C;ja=oe(ea|0,ja|0,21)|0;ja=ke(na|0,o|0,ja|0,C|0)|0;o=C;na=le(ma|0,F|0,1048576,0)|0;na=je(na|0,C|0,21)|0;ea=C;ga=le(na|0,ea|0,B|0,ga|0)|0;B=C;ea=oe(na|0,ea|0,21)|0;ea=ke(ma|0,F|0,ea|0,C|0)|0;F=C;ma=ve(la|0,y|0,666643,0)|0;h=le(ma|0,C|0,v|0,h|0)|0;v=C;ma=ve(la|0,y|0,470296,0)|0;X=le(ma|0,C|0,da|0,X|0)|0;da=C;ma=ve(la|0,y|0,654183,0)|0;M=le(ma|0,C|0,W|0,M|0)|0;W=C;ma=ve(la|0,y|0,-997805,-1)|0;V=le(ma|0,C|0,fa|0,V|0)|0;fa=C;ma=ve(la|0,y|0,136657,0)|0;ha=le(ma|0,C|0,e|0,ha|0)|0;e=C;y=ve(la|0,y|0,-683901,-1)|0;y=le(_|0,R|0,y|0,C|0)|0;R=C;_=ve(ga|0,B|0,666643,0)|0;ka=le(_|0,C|0,L|0,ka|0)|0;L=C;_=ve(ga|0,B|0,470296,0)|0;v=le(_|0,C|0,h|0,v|0)|0;h=C;_=ve(ga|0,B|0,654183,0)|0;da=le(_|0,C|0,X|0,da|0)|0;X=C;_=ve(ga|0,B|0,-997805,-1)|0;W=le(_|0,C|0,M|0,W|0)|0;M=C;_=ve(ga|0,B|0,136657,0)|0;fa=le(_|0,C|0,V|0,fa|0)|0;V=C;B=ve(ga|0,B|0,-683901,-1)|0;B=le(ha|0,e|0,B|0,C|0)|0;e=C;ha=ve(ea|0,F|0,666643,0)|0;c=le(ha|0,C|0,I|0,c|0)|0;I=C;ha=ve(ea|0,F|0,470296,0)|0;L=le(ha|0,C|0,ka|0,L|0)|0;ka=C;ha=ve(ea|0,F|0,654183,0)|0;h=le(ha|0,C|0,v|0,h|0)|0;v=C;ha=ve(ea|0,F|0,-997805,-1)|0;X=le(ha|0,C|0,da|0,X|0)|0;da=C;ha=ve(ea|0,F|0,136657,0)|0;M=le(ha|0,C|0,W|0,M|0)|0;W=C;F=ve(ea|0,F|0,-683901,-1)|0;F=le(fa|0,V|0,F|0,C|0)|0;V=C;fa=ve(r|0,A|0,666643,0)|0;ea=C;ha=ve(r|0,A|0,470296,0)|0;I=le(ha|0,C|0,c|0,I|0)|0;c=C;ha=ve(r|0,A|0,654183,0)|0;ka=le(ha|0,C|0,L|0,ka|0)|0;L=C;ha=ve(r|0,A|0,-997805,-1)|0;v=le(ha|0,C|0,h|0,v|0)|0;h=C;ha=ve(r|0,A|0,136657,0)|0;da=le(ha|0,C|0,X|0,da|0)|0;X=C;A=ve(r|0,A|0,-683901,-1)|0;A=le(M|0,W|0,A|0,C|0)|0;W=C;M=ve(ja|0,o|0,666643,0)|0;r=C;ha=ve(ja|0,o|0,470296,0)|0;ga=C;_=ve(ja|0,o|0,654183,0)|0;c=le(_|0,C|0,I|0,c|0)|0;I=C;_=ve(ja|0,o|0,-997805,-1)|0;_=le(ka|0,L|0,_|0,C|0)|0;L=C;ka=ve(ja|0,o|0,136657,0)|0;h=le(ka|0,C|0,v|0,h|0)|0;v=C;o=ve(ja|0,o|0,-683901,-1)|0;o=le(da|0,X|0,o|0,C|0)|0;X=C;da=ve(l|0,s|0,666643,0)|0;da=le(ia|0,ca|0,da|0,C|0)|0;Z=le(da|0,C|0,Y|0,Z|0)|0;G=ke(Z|0,C|0,Q|0,G|0)|0;Q=C;Z=ve(l|0,s|0,470296,0)|0;Y=C;da=ve(l|0,s|0,654183,0)|0;ca=C;ea=le(ha|0,ga|0,fa|0,ea|0)|0;ca=le(ea|0,C|0,da|0,ca|0)|0;aa=le(ca|0,C|0,ba|0,aa|0)|0;P=le(aa|0,C|0,$|0,P|0)|0;k=ke(P|0,C|0,q|0,k|0)|0;q=C;P=ve(l|0,s|0,-997805,-1)|0;P=le(c|0,I|0,P|0,C|0)|0;I=C;c=ve(l|0,s|0,136657,0)|0;c=le(_|0,L|0,c|0,C|0)|0;L=C;s=ve(l|0,s|0,-683901,-1)|0;s=le(h|0,v|0,s|0,C|0)|0;v=C;h=le(G|0,Q|0,1048576,0)|0;h=je(h|0,C|0,21)|0;l=C;r=le(Z|0,Y|0,M|0,r|0)|0;T=le(r|0,C|0,S|0,T|0)|0;w=ke(T|0,C|0,U|0,w|0)|0;w=le(w|0,C|0,h|0,l|0)|0;U=C;l=oe(h|0,l|0,21)|0;l=ke(G|0,Q|0,l|0,C|0)|0;Q=C;G=le(k|0,q|0,1048576,0)|0;G=je(G|0,C|0,21)|0;h=C;I=le(P|0,I|0,G|0,h|0)|0;P=C;h=oe(G|0,h|0,21)|0;h=ke(k|0,q|0,h|0,C|0)|0;q=C;k=le(c|0,L|0,1048576,0)|0;k=je(k|0,C|0,21)|0;G=C;v=le(s|0,v|0,k|0,G|0)|0;s=C;G=oe(k|0,G|0,21)|0;G=ke(c|0,L|0,G|0,C|0)|0;L=C;c=le(o|0,X|0,1048576,0)|0;c=je(c|0,C|0,21)|0;k=C;W=le(c|0,k|0,A|0,W|0)|0;A=C;k=oe(c|0,k|0,21)|0;k=ke(o|0,X|0,k|0,C|0)|0;X=C;o=le(F|0,V|0,1048576,0)|0;o=je(o|0,C|0,21)|0;c=C;e=le(o|0,c|0,B|0,e|0)|0;B=C;c=oe(o|0,c|0,21)|0;c=ke(F|0,V|0,c|0,C|0)|0;V=C;F=le(y|0,R|0,1048576,0)|0;F=je(F|0,C|0,21)|0;o=C;z=le(F|0,o|0,H|0,z|0)|0;H=C;o=oe(F|0,o|0,21)|0;o=ke(y|0,R|0,o|0,C|0)|0;R=C;y=le(w|0,U|0,1048576,0)|0;y=je(y|0,C|0,21)|0;F=C;q=le(y|0,F|0,h|0,q|0)|0;h=C;F=oe(y|0,F|0,21)|0;F=ke(w|0,U|0,F|0,C|0)|0;U=C;w=le(I|0,P|0,1048576,0)|0;w=je(w|0,C|0,21)|0;y=C;L=le(w|0,y|0,G|0,L|0)|0;G=C;y=oe(w|0,y|0,21)|0;y=ke(I|0,P|0,y|0,C|0)|0;P=C;I=le(v|0,s|0,1048576,0)|0;I=je(I|0,C|0,21)|0;w=C;X=le(I|0,w|0,k|0,X|0)|0;k=C;w=oe(I|0,w|0,21)|0;w=ke(v|0,s|0,w|0,C|0)|0;s=C;v=le(W|0,A|0,1048576,0)|0;v=je(v|0,C|0,21)|0;I=C;V=le(v|0,I|0,c|0,V|0)|0;c=C;I=oe(v|0,I|0,21)|0;I=ke(W|0,A|0,I|0,C|0)|0;A=C;W=le(e|0,B|0,1048576,0)|0;W=je(W|0,C|0,21)|0;v=C;R=le(W|0,v|0,o|0,R|0)|0;o=C;v=oe(W|0,v|0,21)|0;v=ke(e|0,B|0,v|0,C|0)|0;B=C;e=ve(z|0,H|0,666643,0)|0;J=le(e|0,C|0,f|0,J|0)|0;f=C;e=ve(z|0,H|0,470296,0)|0;Q=le(e|0,C|0,l|0,Q|0)|0;l=C;e=ve(z|0,H|0,654183,0)|0;U=le(e|0,C|0,F|0,U|0)|0;F=C;e=ve(z|0,H|0,-997805,-1)|0;h=le(e|0,C|0,q|0,h|0)|0;q=C;e=ve(z|0,H|0,136657,0)|0;P=le(e|0,C|0,y|0,P|0)|0;y=C;H=ve(z|0,H|0,-683901,-1)|0;H=le(L|0,G|0,H|0,C|0)|0;G=C;L=ve(R|0,o|0,666643,0)|0;K=le(L|0,C|0,E|0,K|0)|0;E=C;L=ve(R|0,o|0,470296,0)|0;f=le(L|0,C|0,J|0,f|0)|0;J=C;L=ve(R|0,o|0,654183,0)|0;l=le(L|0,C|0,Q|0,l|0)|0;Q=C;L=ve(R|0,o|0,-997805,-1)|0;F=le(L|0,C|0,U|0,F|0)|0;U=C;L=ve(R|0,o|0,136657,0)|0;q=le(L|0,C|0,h|0,q|0)|0;h=C;o=ve(R|0,o|0,-683901,-1)|0;o=le(P|0,y|0,o|0,C|0)|0;y=C;P=ve(v|0,B|0,666643,0)|0;P=le(t|0,j|0,P|0,C|0)|0;j=C;t=ve(v|0,B|0,470296,0)|0;E=le(t|0,C|0,K|0,E|0)|0;K=C;t=ve(v|0,B|0,654183,0)|0;J=le(t|0,C|0,f|0,J|0)|0;f=C;t=ve(v|0,B|0,-997805,-1)|0;Q=le(t|0,C|0,l|0,Q|0)|0;l=C;t=ve(v|0,B|0,136657,0)|0;U=le(t|0,C|0,F|0,U|0)|0;F=C;B=ve(v|0,B|0,-683901,-1)|0;B=le(q|0,h|0,B|0,C|0)|0;h=C;q=ve(V|0,c|0,666643,0)|0;v=C;t=ve(V|0,c|0,470296,0)|0;t=le(P|0,j|0,t|0,C|0)|0;j=C;P=ve(V|0,c|0,654183,0)|0;P=le(E|0,K|0,P|0,C|0)|0;K=C;E=ve(V|0,c|0,-997805,-1)|0;E=le(J|0,f|0,E|0,C|0)|0;f=C;J=ve(V|0,c|0,136657,0)|0;J=le(Q|0,l|0,J|0,C|0)|0;l=C;c=ve(V|0,c|0,-683901,-1)|0;c=le(U|0,F|0,c|0,C|0)|0;F=C;U=ve(I|0,A|0,666643,0)|0;V=C;Q=ve(I|0,A|0,470296,0)|0;R=C;L=ve(I|0,A|0,654183,0)|0;L=le(t|0,j|0,L|0,C|0)|0;j=C;t=ve(I|0,A|0,-997805,-1)|0;t=le(P|0,K|0,t|0,C|0)|0;K=C;P=ve(I|0,A|0,136657,0)|0;P=le(E|0,f|0,P|0,C|0)|0;f=C;A=ve(I|0,A|0,-683901,-1)|0;A=le(J|0,l|0,A|0,C|0)|0;l=C;J=ve(X|0,k|0,666643,0)|0;O=le(J|0,C|0,x|0,O|0)|0;x=C;J=ve(X|0,k|0,470296,0)|0;I=C;E=ve(X|0,k|0,654183,0)|0;z=C;N=le(m|0,D|0,u|0,N|0)|0;p=ke(N|0,C|0,n|0,p|0)|0;v=le(p|0,C|0,q|0,v|0)|0;z=le(v|0,C|0,E|0,z|0)|0;R=le(z|0,C|0,Q|0,R|0)|0;Q=C;z=ve(X|0,k|0,-997805,-1)|0;z=le(L|0,j|0,z|0,C|0)|0;j=C;L=ve(X|0,k|0,136657,0)|0;L=le(t|0,K|0,L|0,C|0)|0;K=C;k=ve(X|0,k|0,-683901,-1)|0;k=le(P|0,f|0,k|0,C|0)|0;f=C;P=le(O|0,x|0,1048576,0)|0;P=je(P|0,C|0,21)|0;X=C;I=le(i|0,g|0,J|0,I|0)|0;V=le(I|0,C|0,U|0,V|0)|0;V=le(V|0,C|0,P|0,X|0)|0;U=C;X=oe(P|0,X|0,21)|0;X=ke(O|0,x|0,X|0,C|0)|0;x=C;O=le(R|0,Q|0,1048576,0)|0;O=je(O|0,C|0,21)|0;P=C;j=le(O|0,P|0,z|0,j|0)|0;z=C;P=oe(O|0,P|0,21)|0;O=C;I=le(L|0,K|0,1048576,0)|0;I=je(I|0,C|0,21)|0;J=C;f=le(I|0,J|0,k|0,f|0)|0;k=C;J=oe(I|0,J|0,21)|0;I=C;g=le(A|0,l|0,1048576,0)|0;g=je(g|0,C|0,21)|0;i=C;F=le(g|0,i|0,c|0,F|0)|0;c=C;i=oe(g|0,i|0,21)|0;i=ke(A|0,l|0,i|0,C|0)|0;l=C;A=le(B|0,h|0,1048576,0)|0;A=je(A|0,C|0,21)|0;g=C;y=le(o|0,y|0,A|0,g|0)|0;o=C;g=oe(A|0,g|0,21)|0;g=ke(B|0,h|0,g|0,C|0)|0;h=C;B=le(H|0,G|0,1048576,0)|0;B=je(B|0,C|0,21)|0;A=C;s=le(w|0,s|0,B|0,A|0)|0;w=C;A=oe(B|0,A|0,21)|0;B=C;t=le(V|0,U|0,1048576,0)|0;t=je(t|0,C|0,21)|0;E=C;v=oe(t|0,E|0,21)|0;q=C;p=le(j|0,z|0,1048576,0)|0;p=je(p|0,C|0,21)|0;n=C;N=oe(p|0,n|0,21)|0;N=ke(j|0,z|0,N|0,C|0)|0;z=C;j=le(f|0,k|0,1048576,0)|0;j=je(j|0,C|0,21)|0;u=C;l=le(i|0,l|0,j|0,u|0)|0;i=C;u=oe(j|0,u|0,21)|0;u=ke(f|0,k|0,u|0,C|0)|0;k=C;f=le(F|0,c|0,1048576,0)|0;f=je(f|0,C|0,21)|0;j=C;h=le(g|0,h|0,f|0,j|0)|0;g=C;j=oe(f|0,j|0,21)|0;j=ke(F|0,c|0,j|0,C|0)|0;c=C;F=le(y|0,o|0,1048576,0)|0;F=je(F|0,C|0,21)|0;f=C;D=oe(F|0,f|0,21)|0;D=ke(y|0,o|0,D|0,C|0)|0;o=C;y=le(s|0,w|0,1048576,0)|0;y=je(y|0,C|0,21)|0;m=C;e=oe(y|0,m|0,21)|0;e=ke(s|0,w|0,e|0,C|0)|0;w=C;s=ve(y|0,m|0,666643,0)|0;s=le(X|0,x|0,s|0,C|0)|0;x=C;X=ve(y|0,m|0,470296,0)|0;W=C;T=ve(y|0,m|0,654183,0)|0;S=C;r=ve(y|0,m|0,-997805,-1)|0;r=le(N|0,z|0,r|0,C|0)|0;z=C;N=ve(y|0,m|0,136657,0)|0;M=C;m=ve(y|0,m|0,-683901,-1)|0;m=le(u|0,k|0,m|0,C|0)|0;k=C;u=je(s|0,x|0,21)|0;y=C;U=le(X|0,W|0,V|0,U|0)|0;q=ke(U|0,C|0,v|0,q|0)|0;q=le(q|0,C|0,u|0,y|0)|0;v=C;y=oe(u|0,y|0,21)|0;y=ke(s|0,x|0,y|0,C|0)|0;x=C;s=je(q|0,v|0,21)|0;u=C;Q=le(T|0,S|0,R|0,Q|0)|0;O=ke(Q|0,C|0,P|0,O|0)|0;E=le(O|0,C|0,t|0,E|0)|0;E=le(E|0,C|0,s|0,u|0)|0;t=C;u=oe(s|0,u|0,21)|0;u=ke(q|0,v|0,u|0,C|0)|0;v=C;q=je(E|0,t|0,21)|0;s=C;z=le(q|0,s|0,r|0,z|0)|0;r=C;s=oe(q|0,s|0,21)|0;s=ke(E|0,t|0,s|0,C|0)|0;t=C;E=je(z|0,r|0,21)|0;q=C;K=le(N|0,M|0,L|0,K|0)|0;I=ke(K|0,C|0,J|0,I|0)|0;n=le(I|0,C|0,p|0,n|0)|0;n=le(n|0,C|0,E|0,q|0)|0;p=C;q=oe(E|0,q|0,21)|0;q=ke(z|0,r|0,q|0,C|0)|0;r=C;z=je(n|0,p|0,21)|0;E=C;k=le(z|0,E|0,m|0,k|0)|0;m=C;E=oe(z|0,E|0,21)|0;E=ke(n|0,p|0,E|0,C|0)|0;p=C;n=je(k|0,m|0,21)|0;z=C;i=le(l|0,i|0,n|0,z|0)|0;l=C;z=oe(n|0,z|0,21)|0;z=ke(k|0,m|0,z|0,C|0)|0;m=C;k=je(i|0,l|0,21)|0;n=C;c=le(k|0,n|0,j|0,c|0)|0;j=C;n=oe(k|0,n|0,21)|0;n=ke(i|0,l|0,n|0,C|0)|0;l=C;i=je(c|0,j|0,21)|0;k=C;g=le(h|0,g|0,i|0,k|0)|0;h=C;k=oe(i|0,k|0,21)|0;k=ke(c|0,j|0,k|0,C|0)|0;j=C;c=je(g|0,h|0,21)|0;i=C;o=le(c|0,i|0,D|0,o|0)|0;D=C;i=oe(c|0,i|0,21)|0;i=ke(g|0,h|0,i|0,C|0)|0;h=C;g=je(o|0,D|0,21)|0;c=C;f=le(H|0,G|0,F|0,f|0)|0;B=ke(f|0,C|0,A|0,B|0)|0;B=le(B|0,C|0,g|0,c|0)|0;A=C;c=oe(g|0,c|0,21)|0;c=ke(o|0,D|0,c|0,C|0)|0;D=C;o=je(B|0,A|0,21)|0;g=C;w=le(o|0,g|0,e|0,w|0)|0;e=C;g=oe(o|0,g|0,21)|0;g=ke(B|0,A|0,g|0,C|0)|0;A=C;B=je(w|0,e|0,21)|0;o=C;f=oe(B|0,o|0,21)|0;f=ke(w|0,e|0,f|0,C|0)|0;e=C;w=ve(B|0,o|0,666643,0)|0;x=le(w|0,C|0,y|0,x|0)|0;y=C;w=ve(B|0,o|0,470296,0)|0;w=le(u|0,v|0,w|0,C|0)|0;v=C;u=ve(B|0,o|0,654183,0)|0;u=le(s|0,t|0,u|0,C|0)|0;t=C;s=ve(B|0,o|0,-997805,-1)|0;s=le(q|0,r|0,s|0,C|0)|0;r=C;q=ve(B|0,o|0,136657,0)|0;q=le(E|0,p|0,q|0,C|0)|0;p=C;o=ve(B|0,o|0,-683901,-1)|0;o=le(z|0,m|0,o|0,C|0)|0;m=C;z=je(x|0,y|0,21)|0;B=C;v=le(w|0,v|0,z|0,B|0)|0;w=C;B=oe(z|0,B|0,21)|0;B=ke(x|0,y|0,B|0,C|0)|0;y=C;x=je(v|0,w|0,21)|0;z=C;t=le(u|0,t|0,x|0,z|0)|0;u=C;z=oe(x|0,z|0,21)|0;z=ke(v|0,w|0,z|0,C|0)|0;w=C;v=je(t|0,u|0,21)|0;x=C;r=le(v|0,x|0,s|0,r|0)|0;s=C;x=oe(v|0,x|0,21)|0;x=ke(t|0,u|0,x|0,C|0)|0;u=C;t=je(r|0,s|0,21)|0;v=C;p=le(q|0,p|0,t|0,v|0)|0;q=C;v=oe(t|0,v|0,21)|0;v=ke(r|0,s|0,v|0,C|0)|0;s=C;r=je(p|0,q|0,21)|0;t=C;m=le(r|0,t|0,o|0,m|0)|0;o=C;t=oe(r|0,t|0,21)|0;t=ke(p|0,q|0,t|0,C|0)|0;q=C;p=je(m|0,o|0,21)|0;r=C;l=le(p|0,r|0,n|0,l|0)|0;n=C;r=oe(p|0,r|0,21)|0;r=ke(m|0,o|0,r|0,C|0)|0;o=C;m=je(l|0,n|0,21)|0;p=C;j=le(m|0,p|0,k|0,j|0)|0;k=C;p=oe(m|0,p|0,21)|0;p=ke(l|0,n|0,p|0,C|0)|0;n=C;l=je(j|0,k|0,21)|0;m=C;h=le(l|0,m|0,i|0,h|0)|0;i=C;m=oe(l|0,m|0,21)|0;m=ke(j|0,k|0,m|0,C|0)|0;k=C;j=je(h|0,i|0,21)|0;l=C;D=le(j|0,l|0,c|0,D|0)|0;c=C;l=oe(j|0,l|0,21)|0;l=ke(h|0,i|0,l|0,C|0)|0;i=C;h=je(D|0,c|0,21)|0;j=C;A=le(h|0,j|0,g|0,A|0)|0;g=C;j=oe(h|0,j|0,21)|0;j=ke(D|0,c|0,j|0,C|0)|0;c=C;D=je(A|0,g|0,21)|0;h=C;e=le(D|0,h|0,f|0,e|0)|0;f=C;h=oe(D|0,h|0,21)|0;h=ke(A|0,g|0,h|0,C|0)|0;g=C;a[b>>0]=B;A=ne(B|0,y|0,8)|0;a[b+1>>0]=A;y=ne(B|0,y|0,16)|0;B=C;A=oe(z|0,w|0,5)|0;a[b+2>>0]=A|y;y=ne(z|0,w|0,3)|0;a[b+3>>0]=y;y=ne(z|0,w|0,11)|0;a[b+4>>0]=y;w=ne(z|0,w|0,19)|0;z=C;y=oe(x|0,u|0,2)|0;a[b+5>>0]=y|w;w=ne(x|0,u|0,6)|0;a[b+6>>0]=w;u=ne(x|0,u|0,14)|0;x=C;w=oe(v|0,s|0,7)|0;a[b+7>>0]=w|u;u=ne(v|0,s|0,1)|0;a[b+8>>0]=u;u=ne(v|0,s|0,9)|0;a[b+9>>0]=u;s=ne(v|0,s|0,17)|0;v=C;u=oe(t|0,q|0,4)|0;a[b+10>>0]=u|s;s=ne(t|0,q|0,4)|0;a[b+11>>0]=s;s=ne(t|0,q|0,12)|0;a[b+12>>0]=s;q=ne(t|0,q|0,20)|0;t=C;s=oe(r|0,o|0,1)|0;a[b+13>>0]=s|q;q=ne(r|0,o|0,7)|0;a[b+14>>0]=q;o=ne(r|0,o|0,15)|0;r=C;q=oe(p|0,n|0,6)|0;a[b+15>>0]=q|o;o=ne(p|0,n|0,2)|0;a[b+16>>0]=o;o=ne(p|0,n|0,10)|0;a[b+17>>0]=o;n=ne(p|0,n|0,18)|0;p=C;o=oe(m|0,k|0,3)|0;a[b+18>>0]=o|n;n=ne(m|0,k|0,5)|0;a[b+19>>0]=n;k=ne(m|0,k|0,13)|0;a[b+20>>0]=k;a[b+21>>0]=l;k=ne(l|0,i|0,8)|0;a[b+22>>0]=k;i=ne(l|0,i|0,16)|0;l=C;k=oe(j|0,c|0,5)|0;a[b+23>>0]=k|i;i=ne(j|0,c|0,3)|0;a[b+24>>0]=i;i=ne(j|0,c|0,11)|0;a[b+25>>0]=i;c=ne(j|0,c|0,19)|0;j=C;i=oe(h|0,g|0,2)|0;a[b+26>>0]=i|c;c=ne(h|0,g|0,6)|0;a[b+27>>0]=c;g=ne(h|0,g|0,14)|0;h=C;c=oe(e|0,f|0,7)|0;a[b+28>>0]=g|c;c=ne(e|0,f|0,1)|0;a[b+29>>0]=c;c=ne(e|0,f|0,9)|0;a[b+30>>0]=c;f=ne(e|0,f|0,17)|0;a[b+31>>0]=f;return}function Wb(b){b=b|0;var c=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0;g=d[b>>0]|0;F=oe(d[b+1>>0]|0|0,0,8)|0;K=C;D=d[b+2>>0]|0;x=oe(D|0,0,16)|0;A=oe(d[b+3>>0]|0|0,0,8)|0;c=C;q=oe(d[b+4>>0]|0|0,0,16)|0;c=c|C;j=d[b+5>>0]|0;G=oe(j|0,0,24)|0;c=ne(A|D|q|G|0,c|C|0,5)|0;G=oe(d[b+6>>0]|0|0,0,8)|0;q=C;D=d[b+7>>0]|0;A=oe(D|0,0,16)|0;q=ne(G|j|A|0,q|C|0,2)|0;A=oe(d[b+8>>0]|0|0,0,8)|0;j=C;G=oe(d[b+9>>0]|0|0,0,16)|0;j=j|C;t=d[b+10>>0]|0;O=oe(t|0,0,24)|0;j=ne(A|D|G|O|0,j|C|0,7)|0;O=oe(d[b+11>>0]|0|0,0,8)|0;G=C;D=oe(d[b+12>>0]|0|0,0,16)|0;G=G|C;A=d[b+13>>0]|0;u=oe(A|0,0,24)|0;G=ne(O|t|D|u|0,G|C|0,4)|0;u=oe(d[b+14>>0]|0|0,0,8)|0;D=C;t=d[b+15>>0]|0;O=oe(t|0,0,16)|0;D=ne(u|A|O|0,D|C|0,1)|0;O=oe(d[b+16>>0]|0|0,0,8)|0;A=C;u=oe(d[b+17>>0]|0|0,0,16)|0;A=A|C;I=d[b+18>>0]|0;U=oe(I|0,0,24)|0;A=ne(O|t|u|U|0,A|C|0,6)|0;U=oe(d[b+19>>0]|0|0,0,8)|0;u=C;t=oe(d[b+20>>0]|0|0,0,16)|0;u=ne(U|I|t|0,u|C|0,3)|0;t=C;I=d[b+21>>0]|0;U=oe(d[b+22>>0]|0|0,0,8)|0;O=C;i=d[b+23>>0]|0;r=oe(i|0,0,16)|0;L=oe(d[b+24>>0]|0|0,0,8)|0;n=C;p=oe(d[b+25>>0]|0|0,0,16)|0;n=n|C;z=d[b+26>>0]|0;l=oe(z|0,0,24)|0;n=ne(L|i|p|l|0,n|C|0,5)|0;l=oe(d[b+27>>0]|0|0,0,8)|0;p=C;i=d[b+28>>0]|0;L=oe(i|0,0,16)|0;p=ne(l|z|L|0,p|C|0,2)|0;L=oe(d[b+29>>0]|0|0,0,8)|0;z=C;l=oe(d[b+30>>0]|0|0,0,16)|0;z=z|C;S=d[b+31>>0]|0;J=oe(S|0,0,24)|0;z=ne(L|i|l|J|0,z|C|0,7)|0;J=oe(d[b+32>>0]|0|0,0,8)|0;l=C;i=oe(d[b+33>>0]|0|0,0,16)|0;l=l|C;L=d[b+34>>0]|0;y=oe(L|0,0,24)|0;l=ne(J|S|i|y|0,l|C|0,4)|0;y=oe(d[b+35>>0]|0|0,0,8)|0;i=C;S=d[b+36>>0]|0;J=oe(S|0,0,16)|0;i=ne(y|L|J|0,i|C|0,1)|0;J=oe(d[b+37>>0]|0|0,0,8)|0;L=C;y=oe(d[b+38>>0]|0|0,0,16)|0;L=L|C;k=d[b+39>>0]|0;w=oe(k|0,0,24)|0;L=ne(J|S|y|w|0,L|C|0,6)|0;w=oe(d[b+40>>0]|0|0,0,8)|0;y=C;S=oe(d[b+41>>0]|0|0,0,16)|0;y=ne(w|k|S|0,y|C|0,3)|0;S=C;k=d[b+42>>0]|0;w=oe(d[b+43>>0]|0|0,0,8)|0;J=C;N=d[b+44>>0]|0;Q=oe(N|0,0,16)|0;E=oe(d[b+45>>0]|0|0,0,8)|0;M=C;s=oe(d[b+46>>0]|0|0,0,16)|0;M=M|C;o=d[b+47>>0]|0;B=oe(o|0,0,24)|0;M=ne(E|N|s|B|0,M|C|0,5)|0;B=oe(d[b+48>>0]|0|0,0,8)|0;s=C;N=d[b+49>>0]|0;E=oe(N|0,0,16)|0;s=ne(B|o|E|0,s|C|0,2)|0;E=oe(d[b+50>>0]|0|0,0,8)|0;o=C;B=oe(d[b+51>>0]|0|0,0,16)|0;o=o|C;h=d[b+52>>0]|0;H=oe(h|0,0,24)|0;o=ne(E|N|B|H|0,o|C|0,7)|0;H=oe(d[b+53>>0]|0|0,0,8)|0;B=C;N=oe(d[b+54>>0]|0|0,0,16)|0;B=B|C;E=d[b+55>>0]|0;P=oe(E|0,0,24)|0;B=ne(H|h|N|P|0,B|C|0,4)|0;P=oe(d[b+56>>0]|0|0,0,8)|0;N=C;h=d[b+57>>0]|0;H=oe(h|0,0,16)|0;N=ne(P|E|H|0,N|C|0,1)|0;H=oe(d[b+58>>0]|0|0,0,8)|0;E=C;P=oe(d[b+59>>0]|0|0,0,16)|0;E=E|C;R=d[b+60>>0]|0;m=oe(R|0,0,24)|0;E=ne(H|h|P|m|0,E|C|0,6)|0;m=oe(d[b+61>>0]|0|0,0,8)|0;P=C;h=oe(d[b+62>>0]|0|0,0,16)|0;P=P|C;H=oe(d[b+63>>0]|0|0,0,24)|0;P=ne(m|R|h|H|0,P|C|0,3)|0;H=C;h=ve(P|0,H|0,666643,0)|0;h=le(z&2097151|0,0,h|0,C|0)|0;z=C;R=ve(P|0,H|0,470296,0)|0;R=le(l&2097151|0,0,R|0,C|0)|0;l=C;m=ve(P|0,H|0,654183,0)|0;m=le(i&2097151|0,0,m|0,C|0)|0;i=C;T=ve(P|0,H|0,-997805,-1)|0;T=le(L&2097151|0,0,T|0,C|0)|0;L=C;f=ve(P|0,H|0,136657,0)|0;f=le(y|0,S|0,f|0,C|0)|0;S=C;H=ve(P|0,H|0,-683901,-1)|0;H=le(w|k|Q&2031616|0,J|0,H|0,C|0)|0;J=C;Q=ve(E&2097151|0,0,666643,0)|0;Q=le(p&2097151|0,0,Q|0,C|0)|0;p=C;k=ve(E&2097151|0,0,470296,0)|0;z=le(k|0,C|0,h|0,z|0)|0;h=C;k=ve(E&2097151|0,0,654183,0)|0;l=le(k|0,C|0,R|0,l|0)|0;R=C;k=ve(E&2097151|0,0,-997805,-1)|0;i=le(k|0,C|0,m|0,i|0)|0;m=C;k=ve(E&2097151|0,0,136657,0)|0;L=le(k|0,C|0,T|0,L|0)|0;T=C;E=ve(E&2097151|0,0,-683901,-1)|0;E=le(f|0,S|0,E|0,C|0)|0;S=C;f=ve(N&2097151|0,0,666643,0)|0;f=le(n&2097151|0,0,f|0,C|0)|0;n=C;k=ve(N&2097151|0,0,470296,0)|0;p=le(k|0,C|0,Q|0,p|0)|0;Q=C;k=ve(N&2097151|0,0,654183,0)|0;h=le(k|0,C|0,z|0,h|0)|0;z=C;k=ve(N&2097151|0,0,-997805,-1)|0;R=le(k|0,C|0,l|0,R|0)|0;l=C;k=ve(N&2097151|0,0,136657,0)|0;m=le(k|0,C|0,i|0,m|0)|0;i=C;N=ve(N&2097151|0,0,-683901,-1)|0;N=le(L|0,T|0,N|0,C|0)|0;T=C;L=ve(B&2097151|0,0,666643,0)|0;k=C;w=ve(B&2097151|0,0,470296,0)|0;n=le(w|0,C|0,f|0,n|0)|0;f=C;w=ve(B&2097151|0,0,654183,0)|0;Q=le(w|0,C|0,p|0,Q|0)|0;p=C;w=ve(B&2097151|0,0,-997805,-1)|0;z=le(w|0,C|0,h|0,z|0)|0;h=C;w=ve(B&2097151|0,0,136657,0)|0;l=le(w|0,C|0,R|0,l|0)|0;R=C;B=ve(B&2097151|0,0,-683901,-1)|0;B=le(m|0,i|0,B|0,C|0)|0;i=C;m=ve(o&2097151|0,0,666643,0)|0;w=C;P=ve(o&2097151|0,0,470296,0)|0;y=C;v=ve(o&2097151|0,0,654183,0)|0;f=le(v|0,C|0,n|0,f|0)|0;n=C;v=ve(o&2097151|0,0,-997805,-1)|0;v=le(Q|0,p|0,v|0,C|0)|0;p=C;Q=ve(o&2097151|0,0,136657,0)|0;h=le(Q|0,C|0,z|0,h|0)|0;z=C;o=ve(o&2097151|0,0,-683901,-1)|0;o=le(l|0,R|0,o|0,C|0)|0;R=C;l=ve(s&2097151|0,0,666643,0)|0;A=le(l|0,C|0,A&2097151|0,0)|0;l=C;Q=ve(s&2097151|0,0,470296,0)|0;e=C;V=ve(s&2097151|0,0,654183,0)|0;O=le(V|0,C|0,U|I|r&2031616|0,O|0)|0;y=le(O|0,C|0,P|0,y|0)|0;k=le(y|0,C|0,L|0,k|0)|0;L=C;y=ve(s&2097151|0,0,-997805,-1)|0;y=le(f|0,n|0,y|0,C|0)|0;n=C;f=ve(s&2097151|0,0,136657,0)|0;f=le(v|0,p|0,f|0,C|0)|0;p=C;s=ve(s&2097151|0,0,-683901,-1)|0;s=le(h|0,z|0,s|0,C|0)|0;z=C;h=le(A|0,l|0,1048576,0)|0;h=ne(h|0,C|0,21)|0;v=C;t=le(Q|0,e|0,u|0,t|0)|0;t=le(t|0,C|0,h|0,v|0)|0;w=le(t|0,C|0,m|0,w|0)|0;m=C;v=oe(h|0,v|0,21)|0;v=ke(A|0,l|0,v|0,C|0)|0;l=C;A=le(k|0,L|0,1048576,0)|0;A=ne(A|0,C|0,21)|0;h=C;n=le(y|0,n|0,A|0,h|0)|0;y=C;h=oe(A|0,h|0,21)|0;h=ke(k|0,L|0,h|0,C|0)|0;L=C;k=le(f|0,p|0,1048576,0)|0;k=je(k|0,C|0,21)|0;A=C;z=le(s|0,z|0,k|0,A|0)|0;s=C;A=oe(k|0,A|0,21)|0;A=ke(f|0,p|0,A|0,C|0)|0;p=C;f=le(o|0,R|0,1048576,0)|0;f=je(f|0,C|0,21)|0;k=C;i=le(f|0,k|0,B|0,i|0)|0;B=C;k=oe(f|0,k|0,21)|0;k=ke(o|0,R|0,k|0,C|0)|0;R=C;o=le(N|0,T|0,1048576,0)|0;o=je(o|0,C|0,21)|0;f=C;S=le(o|0,f|0,E|0,S|0)|0;E=C;f=oe(o|0,f|0,21)|0;f=ke(N|0,T|0,f|0,C|0)|0;T=C;N=le(H|0,J|0,1048576,0)|0;N=je(N|0,C|0,21)|0;o=C;M=le(N|0,o|0,M&2097151|0,0)|0;t=C;o=oe(N|0,o|0,21)|0;o=ke(H|0,J|0,o|0,C|0)|0;J=C;H=le(w|0,m|0,1048576,0)|0;H=ne(H|0,C|0,21)|0;N=C;L=le(H|0,N|0,h|0,L|0)|0;h=C;N=oe(H|0,N|0,21)|0;N=ke(w|0,m|0,N|0,C|0)|0;m=C;w=le(n|0,y|0,1048576,0)|0;w=je(w|0,C|0,21)|0;H=C;p=le(w|0,H|0,A|0,p|0)|0;A=C;H=oe(w|0,H|0,21)|0;H=ke(n|0,y|0,H|0,C|0)|0;y=C;n=le(z|0,s|0,1048576,0)|0;n=je(n|0,C|0,21)|0;w=C;R=le(k|0,R|0,n|0,w|0)|0;k=C;w=oe(n|0,w|0,21)|0;w=ke(z|0,s|0,w|0,C|0)|0;s=C;z=le(i|0,B|0,1048576,0)|0;z=je(z|0,C|0,21)|0;n=C;T=le(z|0,n|0,f|0,T|0)|0;f=C;n=oe(z|0,n|0,21)|0;n=ke(i|0,B|0,n|0,C|0)|0;B=C;i=le(S|0,E|0,1048576,0)|0;i=je(i|0,C|0,21)|0;z=C;J=le(i|0,z|0,o|0,J|0)|0;o=C;z=oe(i|0,z|0,21)|0;z=ke(S|0,E|0,z|0,C|0)|0;E=C;S=ve(M|0,t|0,666643,0)|0;S=le(D&2097151|0,0,S|0,C|0)|0;D=C;i=ve(M|0,t|0,470296,0)|0;i=le(v|0,l|0,i|0,C|0)|0;l=C;v=ve(M|0,t|0,654183,0)|0;v=le(N|0,m|0,v|0,C|0)|0;m=C;N=ve(M|0,t|0,-997805,-1)|0;N=le(L|0,h|0,N|0,C|0)|0;h=C;L=ve(M|0,t|0,136657,0)|0;L=le(H|0,y|0,L|0,C|0)|0;y=C;t=ve(M|0,t|0,-683901,-1)|0;t=le(p|0,A|0,t|0,C|0)|0;A=C;p=ve(J|0,o|0,666643,0)|0;p=le(G&2097151|0,0,p|0,C|0)|0;G=C;M=ve(J|0,o|0,470296,0)|0;M=le(S|0,D|0,M|0,C|0)|0;D=C;S=ve(J|0,o|0,654183,0)|0;S=le(i|0,l|0,S|0,C|0)|0;l=C;i=ve(J|0,o|0,-997805,-1)|0;i=le(v|0,m|0,i|0,C|0)|0;m=C;v=ve(J|0,o|0,136657,0)|0;v=le(N|0,h|0,v|0,C|0)|0;h=C;o=ve(J|0,o|0,-683901,-1)|0;o=le(L|0,y|0,o|0,C|0)|0;y=C;L=ve(z|0,E|0,666643,0)|0;L=le(j&2097151|0,0,L|0,C|0)|0;j=C;J=ve(z|0,E|0,470296,0)|0;J=le(p|0,G|0,J|0,C|0)|0;G=C;p=ve(z|0,E|0,654183,0)|0;p=le(M|0,D|0,p|0,C|0)|0;D=C;M=ve(z|0,E|0,-997805,-1)|0;M=le(S|0,l|0,M|0,C|0)|0;l=C;S=ve(z|0,E|0,136657,0)|0;S=le(i|0,m|0,S|0,C|0)|0;m=C;E=ve(z|0,E|0,-683901,-1)|0;E=le(v|0,h|0,E|0,C|0)|0;h=C;v=ve(T|0,f|0,666643,0)|0;z=C;i=ve(T|0,f|0,470296,0)|0;i=le(L|0,j|0,i|0,C|0)|0;j=C;L=ve(T|0,f|0,654183,0)|0;L=le(J|0,G|0,L|0,C|0)|0;G=C;J=ve(T|0,f|0,-997805,-1)|0;J=le(p|0,D|0,J|0,C|0)|0;D=C;p=ve(T|0,f|0,136657,0)|0;p=le(M|0,l|0,p|0,C|0)|0;l=C;f=ve(T|0,f|0,-683901,-1)|0;f=le(S|0,m|0,f|0,C|0)|0;m=C;S=ve(n|0,B|0,666643,0)|0;T=C;M=ve(n|0,B|0,470296,0)|0;N=C;H=ve(n|0,B|0,654183,0)|0;H=le(i|0,j|0,H|0,C|0)|0;j=C;i=ve(n|0,B|0,-997805,-1)|0;i=le(L|0,G|0,i|0,C|0)|0;G=C;L=ve(n|0,B|0,136657,0)|0;L=le(J|0,D|0,L|0,C|0)|0;D=C;B=ve(n|0,B|0,-683901,-1)|0;B=le(p|0,l|0,B|0,C|0)|0;l=C;p=ve(R|0,k|0,666643,0)|0;K=le(p|0,C|0,F|g|x&2031616|0,K|0)|0;x=C;g=ve(R|0,k|0,470296,0)|0;F=C;p=ve(R|0,k|0,654183,0)|0;q=le(p|0,C|0,q&2097151|0,0)|0;z=le(q|0,C|0,v|0,z|0)|0;N=le(z|0,C|0,M|0,N|0)|0;M=C;z=ve(R|0,k|0,-997805,-1)|0;z=le(H|0,j|0,z|0,C|0)|0;j=C;H=ve(R|0,k|0,136657,0)|0;H=le(i|0,G|0,H|0,C|0)|0;G=C;k=ve(R|0,k|0,-683901,-1)|0;k=le(L|0,D|0,k|0,C|0)|0;D=C;L=le(K|0,x|0,1048576,0)|0;L=je(L|0,C|0,21)|0;R=C;c=le(g|0,F|0,c&2097151|0,0)|0;T=le(c|0,C|0,S|0,T|0)|0;T=le(T|0,C|0,L|0,R|0)|0;S=C;R=oe(L|0,R|0,21)|0;R=ke(K|0,x|0,R|0,C|0)|0;x=C;K=le(N|0,M|0,1048576,0)|0;K=je(K|0,C|0,21)|0;L=C;j=le(K|0,L|0,z|0,j|0)|0;z=C;L=oe(K|0,L|0,21)|0;K=C;c=le(H|0,G|0,1048576,0)|0;c=je(c|0,C|0,21)|0;F=C;D=le(c|0,F|0,k|0,D|0)|0;k=C;F=oe(c|0,F|0,21)|0;c=C;g=le(B|0,l|0,1048576,0)|0;g=je(g|0,C|0,21)|0;i=C;m=le(g|0,i|0,f|0,m|0)|0;f=C;i=oe(g|0,i|0,21)|0;i=ke(B|0,l|0,i|0,C|0)|0;l=C;B=le(E|0,h|0,1048576,0)|0;B=je(B|0,C|0,21)|0;g=C;y=le(B|0,g|0,o|0,y|0)|0;o=C;g=oe(B|0,g|0,21)|0;g=ke(E|0,h|0,g|0,C|0)|0;h=C;E=le(t|0,A|0,1048576,0)|0;E=je(E|0,C|0,21)|0;B=C;s=le(w|0,s|0,E|0,B|0)|0;w=C;B=oe(E|0,B|0,21)|0;B=ke(t|0,A|0,B|0,C|0)|0;A=C;t=le(T|0,S|0,1048576,0)|0;t=je(t|0,C|0,21)|0;E=C;v=oe(t|0,E|0,21)|0;q=C;p=le(j|0,z|0,1048576,0)|0;p=je(p|0,C|0,21)|0;n=C;J=oe(p|0,n|0,21)|0;J=ke(j|0,z|0,J|0,C|0)|0;z=C;j=le(D|0,k|0,1048576,0)|0;j=je(j|0,C|0,21)|0;u=C;l=le(i|0,l|0,j|0,u|0)|0;i=C;u=oe(j|0,u|0,21)|0;u=ke(D|0,k|0,u|0,C|0)|0;k=C;D=le(m|0,f|0,1048576,0)|0;D=je(D|0,C|0,21)|0;j=C;h=le(g|0,h|0,D|0,j|0)|0;g=C;j=oe(D|0,j|0,21)|0;j=ke(m|0,f|0,j|0,C|0)|0;f=C;m=le(y|0,o|0,1048576,0)|0;m=je(m|0,C|0,21)|0;D=C;A=le(B|0,A|0,m|0,D|0)|0;B=C;D=oe(m|0,D|0,21)|0;D=ke(y|0,o|0,D|0,C|0)|0;o=C;y=le(s|0,w|0,1048576,0)|0;y=je(y|0,C|0,21)|0;m=C;e=oe(y|0,m|0,21)|0;e=ke(s|0,w|0,e|0,C|0)|0;w=C;s=ve(y|0,m|0,666643,0)|0;s=le(R|0,x|0,s|0,C|0)|0;x=C;R=ve(y|0,m|0,470296,0)|0;Q=C;P=ve(y|0,m|0,654183,0)|0;O=C;r=ve(y|0,m|0,-997805,-1)|0;r=le(J|0,z|0,r|0,C|0)|0;z=C;J=ve(y|0,m|0,136657,0)|0;I=C;m=ve(y|0,m|0,-683901,-1)|0;m=le(u|0,k|0,m|0,C|0)|0;k=C;u=je(s|0,x|0,21)|0;y=C;Q=le(T|0,S|0,R|0,Q|0)|0;Q=le(Q|0,C|0,u|0,y|0)|0;q=ke(Q|0,C|0,v|0,q|0)|0;v=C;y=oe(u|0,y|0,21)|0;y=ke(s|0,x|0,y|0,C|0)|0;x=C;s=je(q|0,v|0,21)|0;u=C;M=le(P|0,O|0,N|0,M|0)|0;K=ke(M|0,C|0,L|0,K|0)|0;E=le(K|0,C|0,t|0,E|0)|0;E=le(E|0,C|0,s|0,u|0)|0;t=C;u=oe(s|0,u|0,21)|0;u=ke(q|0,v|0,u|0,C|0)|0;v=C;q=je(E|0,t|0,21)|0;s=C;z=le(q|0,s|0,r|0,z|0)|0;r=C;s=oe(q|0,s|0,21)|0;s=ke(E|0,t|0,s|0,C|0)|0;t=C;E=je(z|0,r|0,21)|0;q=C;G=le(J|0,I|0,H|0,G|0)|0;c=ke(G|0,C|0,F|0,c|0)|0;n=le(c|0,C|0,p|0,n|0)|0;n=le(n|0,C|0,E|0,q|0)|0;p=C;q=oe(E|0,q|0,21)|0;q=ke(z|0,r|0,q|0,C|0)|0;r=C;z=je(n|0,p|0,21)|0;E=C;k=le(z|0,E|0,m|0,k|0)|0;m=C;E=oe(z|0,E|0,21)|0;E=ke(n|0,p|0,E|0,C|0)|0;p=C;n=je(k|0,m|0,21)|0;z=C;i=le(l|0,i|0,n|0,z|0)|0;l=C;z=oe(n|0,z|0,21)|0;z=ke(k|0,m|0,z|0,C|0)|0;m=C;k=je(i|0,l|0,21)|0;n=C;f=le(k|0,n|0,j|0,f|0)|0;j=C;n=oe(k|0,n|0,21)|0;n=ke(i|0,l|0,n|0,C|0)|0;l=C;i=je(f|0,j|0,21)|0;k=C;g=le(h|0,g|0,i|0,k|0)|0;h=C;k=oe(i|0,k|0,21)|0;k=ke(f|0,j|0,k|0,C|0)|0;j=C;f=je(g|0,h|0,21)|0;i=C;o=le(f|0,i|0,D|0,o|0)|0;D=C;i=oe(f|0,i|0,21)|0;i=ke(g|0,h|0,i|0,C|0)|0;h=C;g=je(o|0,D|0,21)|0;f=C;B=le(A|0,B|0,g|0,f|0)|0;A=C;f=oe(g|0,f|0,21)|0;f=ke(o|0,D|0,f|0,C|0)|0;D=C;o=je(B|0,A|0,21)|0;g=C;w=le(o|0,g|0,e|0,w|0)|0;e=C;g=oe(o|0,g|0,21)|0;g=ke(B|0,A|0,g|0,C|0)|0;A=C;B=je(w|0,e|0,21)|0;o=C;c=oe(B|0,o|0,21)|0;c=ke(w|0,e|0,c|0,C|0)|0;e=C;w=ve(B|0,o|0,666643,0)|0;x=le(w|0,C|0,y|0,x|0)|0;y=C;w=ve(B|0,o|0,470296,0)|0;w=le(u|0,v|0,w|0,C|0)|0;v=C;u=ve(B|0,o|0,654183,0)|0;u=le(s|0,t|0,u|0,C|0)|0;t=C;s=ve(B|0,o|0,-997805,-1)|0;s=le(q|0,r|0,s|0,C|0)|0;r=C;q=ve(B|0,o|0,136657,0)|0;q=le(E|0,p|0,q|0,C|0)|0;p=C;o=ve(B|0,o|0,-683901,-1)|0;o=le(z|0,m|0,o|0,C|0)|0;m=C;z=je(x|0,y|0,21)|0;B=C;v=le(w|0,v|0,z|0,B|0)|0;w=C;B=oe(z|0,B|0,21)|0;B=ke(x|0,y|0,B|0,C|0)|0;y=C;x=je(v|0,w|0,21)|0;z=C;t=le(u|0,t|0,x|0,z|0)|0;u=C;z=oe(x|0,z|0,21)|0;z=ke(v|0,w|0,z|0,C|0)|0;w=C;v=je(t|0,u|0,21)|0;x=C;r=le(v|0,x|0,s|0,r|0)|0;s=C;x=oe(v|0,x|0,21)|0;x=ke(t|0,u|0,x|0,C|0)|0;u=C;t=je(r|0,s|0,21)|0;v=C;p=le(q|0,p|0,t|0,v|0)|0;q=C;v=oe(t|0,v|0,21)|0;v=ke(r|0,s|0,v|0,C|0)|0;s=C;r=je(p|0,q|0,21)|0;t=C;m=le(r|0,t|0,o|0,m|0)|0;o=C;t=oe(r|0,t|0,21)|0;t=ke(p|0,q|0,t|0,C|0)|0;q=C;p=je(m|0,o|0,21)|0;r=C;l=le(p|0,r|0,n|0,l|0)|0;n=C;r=oe(p|0,r|0,21)|0;r=ke(m|0,o|0,r|0,C|0)|0;o=C;m=je(l|0,n|0,21)|0;p=C;j=le(m|0,p|0,k|0,j|0)|0;k=C;p=oe(m|0,p|0,21)|0;p=ke(l|0,n|0,p|0,C|0)|0;n=C;l=je(j|0,k|0,21)|0;m=C;h=le(l|0,m|0,i|0,h|0)|0;i=C;m=oe(l|0,m|0,21)|0;m=ke(j|0,k|0,m|0,C|0)|0;k=C;j=je(h|0,i|0,21)|0;l=C;D=le(j|0,l|0,f|0,D|0)|0;f=C;l=oe(j|0,l|0,21)|0;l=ke(h|0,i|0,l|0,C|0)|0;i=C;h=je(D|0,f|0,21)|0;j=C;A=le(h|0,j|0,g|0,A|0)|0;g=C;j=oe(h|0,j|0,21)|0;j=ke(D|0,f|0,j|0,C|0)|0;f=C;D=je(A|0,g|0,21)|0;h=C;e=le(D|0,h|0,c|0,e|0)|0;c=C;h=oe(D|0,h|0,21)|0;h=ke(A|0,g|0,h|0,C|0)|0;g=C;a[b>>0]=B;A=ne(B|0,y|0,8)|0;a[b+1>>0]=A;y=ne(B|0,y|0,16)|0;B=C;A=oe(z|0,w|0,5)|0;a[b+2>>0]=A|y;y=ne(z|0,w|0,3)|0;a[b+3>>0]=y;y=ne(z|0,w|0,11)|0;a[b+4>>0]=y;w=ne(z|0,w|0,19)|0;z=C;y=oe(x|0,u|0,2)|0;a[b+5>>0]=y|w;w=ne(x|0,u|0,6)|0;a[b+6>>0]=w;u=ne(x|0,u|0,14)|0;x=C;w=oe(v|0,s|0,7)|0;a[b+7>>0]=w|u;u=ne(v|0,s|0,1)|0;a[b+8>>0]=u;u=ne(v|0,s|0,9)|0;a[b+9>>0]=u;s=ne(v|0,s|0,17)|0;v=C;u=oe(t|0,q|0,4)|0;a[b+10>>0]=u|s;s=ne(t|0,q|0,4)|0;a[b+11>>0]=s;s=ne(t|0,q|0,12)|0;a[b+12>>0]=s;q=ne(t|0,q|0,20)|0;t=C;s=oe(r|0,o|0,1)|0;a[b+13>>0]=s|q;q=ne(r|0,o|0,7)|0;a[b+14>>0]=q;o=ne(r|0,o|0,15)|0;r=C;q=oe(p|0,n|0,6)|0;a[b+15>>0]=q|o;o=ne(p|0,n|0,2)|0;a[b+16>>0]=o;o=ne(p|0,n|0,10)|0;a[b+17>>0]=o;n=ne(p|0,n|0,18)|0;p=C;o=oe(m|0,k|0,3)|0;a[b+18>>0]=o|n;n=ne(m|0,k|0,5)|0;a[b+19>>0]=n;k=ne(m|0,k|0,13)|0;a[b+20>>0]=k;a[b+21>>0]=l;k=ne(l|0,i|0,8)|0;a[b+22>>0]=k;i=ne(l|0,i|0,16)|0;l=C;k=oe(j|0,f|0,5)|0;a[b+23>>0]=k|i;i=ne(j|0,f|0,3)|0;a[b+24>>0]=i;i=ne(j|0,f|0,11)|0;a[b+25>>0]=i;f=ne(j|0,f|0,19)|0;j=C;i=oe(h|0,g|0,2)|0;a[b+26>>0]=i|f;f=ne(h|0,g|0,6)|0;a[b+27>>0]=f;g=ne(h|0,g|0,14)|0;h=C;f=oe(e|0,c|0,7)|0;a[b+28>>0]=g|f;f=ne(e|0,c|0,1)|0;a[b+29>>0]=f;f=ne(e|0,c|0,9)|0;a[b+30>>0]=f;c=ne(e|0,c|0,17)|0;a[b+31>>0]=c;return}function Xb(b,c){b=b|0;c=c|0;var e=0,f=0,g=0,h=0,i=0;e=0;do{a[b+e>>0]=(d[c+(e>>3)>>0]|0)>>>(e&7)&1;e=e+1|0}while((e|0)!=256);i=0;do{g=b+i|0;a:do if(a[g>>0]|0){h=1;do{e=h+i|0;if((e|0)>=256)break a;c=a[b+e>>0]|0;b:do if(c<<24>>24){f=a[g>>0]|0;c=c<<24>>24<<h;if((f+c|0)<16){a[g>>0]=f+c;a[b+e>>0]=0;break}if((f-c|0)<=-16)break a;a[g>>0]=f-c;while(1){c=b+e|0;if(!(a[c>>0]|0))break;a[c>>0]=0;e=e+1|0;if((e|0)>=256)break b}a[c>>0]=1}while(0);h=h+1|0}while((h|0)<7)}while(0);i=i+1|0}while((i|0)!=256);return}function Yb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;h=i=i+63&-64;i=i+128|0;e=ne(d<<24>>24|0,((d<<24>>24|0)<0)<<31>>31|0,63)|0;c[a>>2]=1;f=a+4|0;j=f+36|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(j|0));c[a+40>>2]=1;f=a+44|0;j=f+76|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(j|0));o=(d<<24>>24)-((d<<24>>24&0-e)<<1)&255;Zb(a,1544+(b*960|0)|0,((o^1)+-1|0)>>>31&255);Zb(a,1544+(b*960|0)+120|0,((o^2)+-1|0)>>>31&255);Zb(a,1544+(b*960|0)+240|0,((o^3)+-1|0)>>>31&255);Zb(a,1544+(b*960|0)+360|0,((o^4)+-1|0)>>>31&255);Zb(a,1544+(b*960|0)+480|0,((o^5)+-1|0)>>>31&255);Zb(a,1544+(b*960|0)+600|0,((o^6)+-1|0)>>>31&255);Zb(a,1544+(b*960|0)+720|0,((o^7)+-1|0)>>>31&255);Zb(a,1544+(b*960|0)+840|0,((o^8)+-1|0)>>>31&255);o=c[a+44>>2]|0;n=c[a+48>>2]|0;m=c[a+52>>2]|0;l=c[a+56>>2]|0;k=c[a+60>>2]|0;d=c[a+64>>2]|0;b=c[a+68>>2]|0;f=c[a+72>>2]|0;j=c[a+76>>2]|0;c[h>>2]=c[a+40>>2];c[h+4>>2]=o;c[h+8>>2]=n;c[h+12>>2]=m;c[h+16>>2]=l;c[h+20>>2]=k;c[h+24>>2]=d;c[h+28>>2]=b;c[h+32>>2]=f;c[h+36>>2]=j;j=c[a+4>>2]|0;f=c[a+8>>2]|0;b=c[a+12>>2]|0;d=c[a+16>>2]|0;k=c[a+20>>2]|0;l=c[a+24>>2]|0;m=c[a+28>>2]|0;n=c[a+32>>2]|0;o=c[a+36>>2]|0;c[h+40>>2]=c[a>>2];c[h+44>>2]=j;c[h+48>>2]=f;c[h+52>>2]=b;c[h+56>>2]=d;c[h+60>>2]=k;c[h+64>>2]=l;c[h+68>>2]=m;c[h+72>>2]=n;c[h+76>>2]=o;o=0-(c[a+84>>2]|0)|0;n=0-(c[a+88>>2]|0)|0;m=0-(c[a+92>>2]|0)|0;l=0-(c[a+96>>2]|0)|0;k=0-(c[a+100>>2]|0)|0;d=0-(c[a+104>>2]|0)|0;b=0-(c[a+108>>2]|0)|0;f=0-(c[a+112>>2]|0)|0;j=0-(c[a+116>>2]|0)|0;c[h+80>>2]=0-(c[a+80>>2]|0);c[h+84>>2]=o;c[h+88>>2]=n;c[h+92>>2]=m;c[h+96>>2]=l;c[h+100>>2]=k;c[h+104>>2]=d;c[h+108>>2]=b;c[h+112>>2]=f;c[h+116>>2]=j;Zb(a,h,e&255);i=g;return}function Zb(a,b,c){a=a|0;b=b|0;c=c|0;wb(a,b,c&255);wb(a+40|0,b+40|0,c&255);wb(a+80|0,b+80|0,c&255);return}function _b(b,c,e){b=b|0;c=c|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;k=20;l=1634760805;m=d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24;n=2036477234;o=d[e+16>>0]|d[e+16+1>>0]<<8|d[e+16+2>>0]<<16|d[e+16+3>>0]<<24;p=d[e+20>>0]|d[e+20+1>>0]<<8|d[e+20+2>>0]<<16|d[e+20+3>>0]<<24;q=d[e+24>>0]|d[e+24+1>>0]<<8|d[e+24+2>>0]<<16|d[e+24+3>>0]<<24;r=d[e+28>>0]|d[e+28+1>>0]<<8|d[e+28+2>>0]<<16|d[e+28+3>>0]<<24;s=1797285236;t=d[e+4>>0]|d[e+4+1>>0]<<8|d[e+4+2>>0]<<16|d[e+4+3>>0]<<24;u=d[e+8>>0]|d[e+8+1>>0]<<8|d[e+8+2>>0]<<16|d[e+8+3>>0]<<24;f=d[e+12>>0]|d[e+12+1>>0]<<8|d[e+12+2>>0]<<16|d[e+12+3>>0]<<24;g=857760878;h=d[c>>0]|d[c+1>>0]<<8|d[c+2>>0]<<16|d[c+3>>0]<<24;i=d[c+4>>0]|d[c+4+1>>0]<<8|d[c+4+2>>0]<<16|d[c+4+3>>0]<<24;j=d[c+8>>0]|d[c+8+1>>0]<<8|d[c+8+2>>0]<<16|d[c+8+3>>0]<<24;e=d[c+12>>0]|d[c+12+1>>0]<<8|d[c+12+2>>0]<<16|d[c+12+3>>0]<<24;while(1){D=p+l|0;D=(D>>>25|D<<7)^f;A=D+l|0;A=(A>>>23|A<<9)^j;x=((A+D|0)>>>19|A+D<<13)^p;G=((x+A|0)>>>14|x+A<<18)^l;z=g+m|0;z=e^(z>>>25|z<<7);w=z+g|0;w=q^(w>>>23|w<<9);J=((w+z|0)>>>19|w+z<<13)^m;C=((J+w|0)>>>14|J+w<<18)^g;v=n+h|0;v=r^(v>>>25|v<<7);I=v+n|0;I=(I>>>23|I<<9)^t;F=((I+v|0)>>>19|I+v<<13)^h;y=((F+I|0)>>>14|F+I<<18)^n;H=s+o|0;H=(H>>>25|H<<7)^u;E=H+s|0;E=(E>>>23|E<<9)^i;B=((E+H|0)>>>19|E+H<<13)^o;c=((B+E|0)>>>14|B+E<<18)^s;m=((G+H|0)>>>25|G+H<<7)^J;J=m+G|0;t=(J>>>23|J<<9)^I;I=t+m|0;u=(I>>>19|I<<13)^H;H=u+t|0;l=(H>>>14|H<<18)^G;h=((C+D|0)>>>25|C+D<<7)^F;F=h+C|0;i=(F>>>23|F<<9)^E;E=i+h|0;f=(E>>>19|E<<13)^D;D=f+i|0;g=(D>>>14|D<<18)^C;o=((y+z|0)>>>25|y+z<<7)^B;B=o+y|0;j=(B>>>23|B<<9)^A;A=j+o|0;e=(A>>>19|A<<13)^z;z=e+j|0;n=(z>>>14|z<<18)^y;p=((c+v|0)>>>25|c+v<<7)^x;x=p+c|0;q=(x>>>23|x<<9)^w;w=q+p|0;r=(w>>>19|w<<13)^v;v=r+q|0;s=(v>>>14|v<<18)^c;if((k|0)<=2)break;else k=k+-2|0}a[b>>0]=l;a[b+1>>0]=l>>8;a[b+2>>0]=l>>16;a[b+3>>0]=l>>24;a[b+4>>0]=g;a[b+4+1>>0]=g>>8;a[b+4+2>>0]=g>>16;a[b+4+3>>0]=g>>24;a[b+8>>0]=n;a[b+8+1>>0]=n>>8;a[b+8+2>>0]=n>>16;a[b+8+3>>0]=n>>24;a[b+12>>0]=s;a[b+12+1>>0]=s>>8;a[b+12+2>>0]=s>>16;a[b+12+3>>0]=s>>24;a[b+16>>0]=h;a[b+16+1>>0]=h>>8;a[b+16+2>>0]=h>>16;a[b+16+3>>0]=h>>24;a[b+20>>0]=i;a[b+20+1>>0]=i>>8;a[b+20+2>>0]=i>>16;a[b+20+3>>0]=i>>24;a[b+24>>0]=j;a[b+24+1>>0]=j>>8;a[b+24+2>>0]=j>>16;a[b+24+3>>0]=j>>24;a[b+28>>0]=e;a[b+28+1>>0]=e>>8;a[b+28+2>>0]=e>>16;a[b+28+3>>0]=e>>24;return}function $b(b,c,e){b=b|0;c=c|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0;z=d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24;B=d[e+4>>0]|d[e+4+1>>0]<<8|d[e+4+2>>0]<<16|d[e+4+3>>0]<<24;C=d[e+8>>0]|d[e+8+1>>0]<<8|d[e+8+2>>0]<<16|d[e+8+3>>0]<<24;D=d[e+12>>0]|d[e+12+1>>0]<<8|d[e+12+2>>0]<<16|d[e+12+3>>0]<<24;E=d[c>>0]|d[c+1>>0]<<8|d[c+2>>0]<<16|d[c+3>>0]<<24;F=d[c+4>>0]|d[c+4+1>>0]<<8|d[c+4+2>>0]<<16|d[c+4+3>>0]<<24;A=d[c+8>>0]|d[c+8+1>>0]<<8|d[c+8+2>>0]<<16|d[c+8+3>>0]<<24;v=d[c+12>>0]|d[c+12+1>>0]<<8|d[c+12+2>>0]<<16|d[c+12+3>>0]<<24;w=d[e+16>>0]|d[e+16+1>>0]<<8|d[e+16+2>>0]<<16|d[e+16+3>>0]<<24;x=d[e+20>>0]|d[e+20+1>>0]<<8|d[e+20+2>>0]<<16|d[e+20+3>>0]<<24;y=d[e+24>>0]|d[e+24+1>>0]<<8|d[e+24+2>>0]<<16|d[e+24+3>>0]<<24;c=d[e+28>>0]|d[e+28+1>>0]<<8|d[e+28+2>>0]<<16|d[e+28+3>>0]<<24;e=20;f=1634760805;g=z;h=2036477234;i=w;j=x;k=y;l=c;m=1797285236;n=B;o=C;p=D;q=857760878;r=E;s=F;t=A;u=v;while(1){P=f+j|0;P=(P>>>25|P<<7)^p;M=P+f|0;M=(M>>>23|M<<9)^t;J=((M+P|0)>>>19|M+P<<13)^j;S=((J+M|0)>>>14|J+M<<18)^f;L=g+q|0;L=(L>>>25|L<<7)^u;I=L+q|0;I=(I>>>23|I<<9)^k;V=((I+L|0)>>>19|I+L<<13)^g;O=((V+I|0)>>>14|V+I<<18)^q;H=r+h|0;H=(H>>>25|H<<7)^l;U=H+h|0;U=(U>>>23|U<<9)^n;R=((U+H|0)>>>19|U+H<<13)^r;K=((R+U|0)>>>14|R+U<<18)^h;T=i+m|0;T=o^(T>>>25|T<<7);Q=T+m|0;Q=(Q>>>23|Q<<9)^s;N=((Q+T|0)>>>19|Q+T<<13)^i;G=((N+Q|0)>>>14|N+Q<<18)^m;g=((S+T|0)>>>25|S+T<<7)^V;V=g+S|0;n=(V>>>23|V<<9)^U;U=n+g|0;o=(U>>>19|U<<13)^T;T=o+n|0;f=(T>>>14|T<<18)^S;r=((O+P|0)>>>25|O+P<<7)^R;R=r+O|0;s=(R>>>23|R<<9)^Q;Q=s+r|0;p=(Q>>>19|Q<<13)^P;P=p+s|0;q=(P>>>14|P<<18)^O;i=((K+L|0)>>>25|K+L<<7)^N;N=i+K|0;t=(N>>>23|N<<9)^M;M=t+i|0;u=(M>>>19|M<<13)^L;L=u+t|0;h=(L>>>14|L<<18)^K;j=((G+H|0)>>>25|G+H<<7)^J;J=j+G|0;k=(J>>>23|J<<9)^I;I=k+j|0;l=(I>>>19|I<<13)^H;H=l+k|0;m=(H>>>14|H<<18)^G;if((e|0)<=2)break;else e=e+-2|0}G=f+1634760805|0;H=g+z|0;I=n+B|0;J=o+C|0;K=p+D|0;L=q+857760878|0;M=r+E|0;N=s+F|0;O=t+A|0;P=u+v|0;Q=h+2036477234|0;R=i+w|0;S=j+x|0;T=k+y|0;U=l+c|0;V=m+1797285236|0;a[b>>0]=G;a[b+1>>0]=G>>8;a[b+2>>0]=G>>16;a[b+3>>0]=G>>24;a[b+4>>0]=H;a[b+4+1>>0]=H>>8;a[b+4+2>>0]=H>>16;a[b+4+3>>0]=H>>24;a[b+8>>0]=I;a[b+8+1>>0]=I>>8;a[b+8+2>>0]=I>>16;a[b+8+3>>0]=I>>24;a[b+12>>0]=J;a[b+12+1>>0]=J>>8;a[b+12+2>>0]=J>>16;a[b+12+3>>0]=J>>24;a[b+16>>0]=K;a[b+16+1>>0]=K>>8;a[b+16+2>>0]=K>>16;a[b+16+3>>0]=K>>24;a[b+20>>0]=L;a[b+20+1>>0]=L>>8;a[b+20+2>>0]=L>>16;a[b+20+3>>0]=L>>24;a[b+24>>0]=M;a[b+24+1>>0]=M>>8;a[b+24+2>>0]=M>>16;a[b+24+3>>0]=M>>24;a[b+28>>0]=N;a[b+28+1>>0]=N>>8;a[b+28+2>>0]=N>>16;a[b+28+3>>0]=N>>24;a[b+32>>0]=O;a[b+32+1>>0]=O>>8;a[b+32+2>>0]=O>>16;a[b+32+3>>0]=O>>24;a[b+36>>0]=P;a[b+36+1>>0]=P>>8;a[b+36+2>>0]=P>>16;a[b+36+3>>0]=P>>24;a[b+40>>0]=Q;a[b+40+1>>0]=Q>>8;a[b+40+2>>0]=Q>>16;a[b+40+3>>0]=Q>>24;a[b+44>>0]=R;a[b+44+1>>0]=R>>8;a[b+44+2>>0]=R>>16;a[b+44+3>>0]=R>>24;a[b+48>>0]=S;a[b+48+1>>0]=S>>8;a[b+48+2>>0]=S>>16;a[b+48+3>>0]=S>>24;a[b+52>>0]=T;a[b+52+1>>0]=T>>8;a[b+52+2>>0]=T>>16;a[b+52+3>>0]=T>>24;a[b+56>>0]=U;a[b+56+1>>0]=U>>8;a[b+56+2>>0]=U>>16;a[b+56+3>>0]=U>>24;a[b+60>>0]=V;a[b+60+1>>0]=V>>8;a[b+60+2>>0]=V>>16;a[b+60+3>>0]=V>>24;return}function ac(){return 16}function bc(){return 64}function cc(){return 32}function dc(){return 16}function ec(){return 64}function fc(){return 32}function gc(){return 32880}function hc(){return 384}function ic(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return tc(a,b,c,d,e,f,g)|0}function jc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return uc(a,b,c,d)|0}function kc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;vc(a,b,c,d);return 0}function lc(a,b,c){a=a|0;b=b|0;c=c|0;return wc(a,b,c)|0}
function Dc(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;g=i;h=i=i+63&-64;i=i+720|0;e=0;do{k=e<<3;p=d[b+(k|7)>>0]|0;q=oe(d[b+(k|6)>>0]|0|0,0,8)|0;j=C;o=oe(d[b+(k|5)>>0]|0|0,0,16)|0;j=j|C;n=oe(d[b+(k|4)>>0]|0|0,0,24)|0;j=j|C|(d[b+(k|3)>>0]|0);m=oe(d[b+(k|2)>>0]|0|0,0,40)|0;j=j|C;l=oe(d[b+(k|1)>>0]|0|0,0,48)|0;j=j|C;k=oe(d[b+k>>0]|0|0,0,56)|0;f=h+80+(e<<3)|0;c[f>>2]=q|p|o|n|m|l|k;c[f+4>>2]=j|C;e=e+1|0}while((e|0)!=16);b=c[h+80>>2]|0;e=c[h+80+4>>2]|0;f=16;do{s=h+80+(f+-2<<3)|0;w=c[s>>2]|0;s=c[s+4>>2]|0;r=ne(w|0,s|0,19)|0;k=C;j=oe(w|0,s|0,45)|0;k=k|C;u=ne(w|0,s|0,61)|0;v=C;t=oe(w|0,s|0,3)|0;v=v|C;s=ne(w|0,s|0,6)|0;k=v^C^k;v=h+80+(f+-7<<3)|0;w=c[v>>2]|0;v=c[v+4>>2]|0;o=h+80+(f+-15<<3)|0;y=b;b=c[o>>2]|0;x=e;e=c[o+4>>2]|0;o=ne(b|0,e|0,1)|0;p=C;q=oe(b|0,e|0,63)|0;p=p|C;l=ne(b|0,e|0,8)|0;z=C;m=oe(b|0,e|0,56)|0;z=z|C;n=ne(b|0,e|0,7)|0;p=z^C^p;v=le(y|0,x|0,w|0,v|0)|0;k=le(v|0,C|0,(u|t)^s^(r|j)|0,k|0)|0;p=le(k|0,C|0,(l|m)^n^(o|q)|0,p|0)|0;q=h+80+(f<<3)|0;c[q>>2]=p;c[q+4>>2]=C;f=f+1|0}while((f|0)!=80);b=h+16|0;e=a;f=b+64|0;do{c[b>>2]=c[e>>2];b=b+4|0;e=e+4|0}while((b|0)<(f|0));f=h+16+56|0;b=c[f>>2]|0;l=c[f+4>>2]|0;w=h+16+32|0;u=c[w>>2]|0;I=c[w+4>>2]|0;G=ne(u|0,I|0,14)|0;y=C;D=oe(u|0,I|0,50)|0;y=y|C;H=ne(u|0,I|0,18)|0;k=C;o=oe(u|0,I|0,46)|0;k=y^(k|C);y=ne(u|0,I|0,41)|0;K=C;z=oe(u|0,I|0,23)|0;K=k^(K|C);k=h+16+40|0;M=c[k>>2]|0;J=c[k+4>>2]|0;B=h+16+48|0;L=c[B>>2]|0;q=c[B+4>>2]|0;s=c[h+80>>2]|0;j=c[h+80+4>>2]|0;l=le(b|0,l|0,-685199838,1116352408)|0;j=le(l|0,C|0,s|0,j|0)|0;K=le(j|0,C|0,(G|D)^(H|o)^(y|z)|0,K|0)|0;K=le(K|0,C|0,(L^M)&u^L|0,(q^J)&I^q|0)|0;z=C;y=c[h+16>>2]|0;o=c[h+16+4>>2]|0;H=ne(y|0,o|0,28)|0;D=C;G=oe(y|0,o|0,36)|0;D=D|C;j=ne(y|0,o|0,34)|0;s=C;l=oe(y|0,o|0,30)|0;s=D^(s|C);D=ne(y|0,o|0,39)|0;b=C;m=oe(y|0,o|0,25)|0;A=h+16+8|0;n=c[A>>2]|0;e=c[A+4>>2]|0;x=h+16+16|0;r=c[x>>2]|0;E=c[x+4>>2]|0;b=le((r|n)&y|r&n|0,(E|e)&o|E&e|0,(H|G)^(j|l)^(D|m)|0,s^(b|C)|0)|0;s=C;m=h+16+24|0;D=le(c[m>>2]|0,c[m+4>>2]|0,K|0,z|0)|0;l=C;c[m>>2]=D;c[m+4>>2]=l;z=le(b|0,s|0,K|0,z|0)|0;K=C;c[f>>2]=z;c[f+4>>2]=K;s=ne(D|0,l|0,14)|0;b=C;j=oe(D|0,l|0,50)|0;b=b|C;G=ne(D|0,l|0,18)|0;H=C;t=oe(D|0,l|0,46)|0;H=b^(H|C);b=ne(D|0,l|0,41)|0;F=C;v=oe(D|0,l|0,23)|0;F=H^(F|C);H=c[h+80+8>>2]|0;p=c[h+80+8+4>>2]|0;q=le(L|0,q|0,602891725,1899447441)|0;p=le(q|0,C|0,H|0,p|0)|0;F=le(p|0,C|0,(s|j)^(G|t)^(b|v)|0,F|0)|0;I=le(F|0,C|0,(M^u)&D^M|0,(J^I)&l^J|0)|0;u=C;F=ne(z|0,K|0,28)|0;v=C;b=oe(z|0,K|0,36)|0;v=v|C;t=ne(z|0,K|0,34)|0;G=C;j=oe(z|0,K|0,30)|0;G=v^(G|C);v=ne(z|0,K|0,39)|0;s=C;p=oe(z|0,K|0,25)|0;s=le((n|y)&z|n&y|0,(e|o)&K|e&o|0,(F|b)^(t|j)^(v|p)|0,G^(s|C)|0)|0;G=C;E=le(r|0,E|0,I|0,u|0)|0;r=C;c[x>>2]=E;c[x+4>>2]=r;u=le(s|0,G|0,I|0,u|0)|0;I=C;c[B>>2]=u;c[B+4>>2]=I;G=ne(E|0,r|0,14)|0;s=C;p=oe(E|0,r|0,50)|0;s=s|C;v=ne(E|0,r|0,18)|0;j=C;t=oe(E|0,r|0,46)|0;j=s^(j|C);s=ne(E|0,r|0,41)|0;b=C;F=oe(E|0,r|0,23)|0;b=j^(b|C);j=c[w>>2]|0;H=c[w+4>>2]|0;q=c[h+80+16>>2]|0;L=c[h+80+16+4>>2]|0;J=le(M|0,J|0,-330482897,-1245643825)|0;L=le(J|0,C|0,q|0,L|0)|0;b=le(L|0,C|0,(G|p)^(v|t)^(s|F)|0,b|0)|0;b=le(b|0,C|0,(j^D)&E^j|0,(H^l)&r^H|0)|0;F=C;s=ne(u|0,I|0,28)|0;t=C;v=oe(u|0,I|0,36)|0;t=t|C;p=ne(u|0,I|0,34)|0;G=C;L=oe(u|0,I|0,30)|0;G=t^(G|C);t=ne(u|0,I|0,39)|0;q=C;J=oe(u|0,I|0,25)|0;q=le((y|z)&u|y&z|0,(o|K)&I|o&K|0,(s|v)^(p|L)^(t|J)|0,G^(q|C)|0)|0;G=C;e=le(n|0,e|0,b|0,F|0)|0;n=C;c[A>>2]=e;c[A+4>>2]=n;F=le(q|0,G|0,b|0,F|0)|0;b=C;c[k>>2]=F;c[k+4>>2]=b;G=ne(e|0,n|0,14)|0;q=C;J=oe(e|0,n|0,50)|0;q=q|C;t=ne(e|0,n|0,18)|0;L=C;p=oe(e|0,n|0,46)|0;L=q^(L|C);q=ne(e|0,n|0,41)|0;v=C;s=oe(e|0,n|0,23)|0;v=L^(v|C);L=c[h+80+24>>2]|0;K=c[h+80+24+4>>2]|0;H=le(j|0,H|0,-2121671748,-373957723)|0;K=le(H|0,C|0,L|0,K|0)|0;v=le(K|0,C|0,(G|J)^(t|p)^(q|s)|0,v|0)|0;v=le(v|0,C|0,(D^E)&e^D|0,(l^r)&n^l|0)|0;s=C;q=ne(F|0,b|0,28)|0;p=C;t=oe(F|0,b|0,36)|0;p=p|C;J=ne(F|0,b|0,34)|0;G=C;K=oe(F|0,b|0,30)|0;G=p^(G|C);p=ne(F|0,b|0,39)|0;L=C;H=oe(F|0,b|0,25)|0;j=c[f>>2]|0;z=c[f+4>>2]|0;L=le((j|u)&F|j&u|0,(z|I)&b|z&I|0,(q|t)^(J|K)^(p|H)|0,G^(L|C)|0)|0;G=C;o=le(y|0,o|0,v|0,s|0)|0;y=C;c[h+16>>2]=o;c[h+16+4>>2]=y;s=le(L|0,G|0,v|0,s|0)|0;v=C;c[w>>2]=s;c[w+4>>2]=v;G=ne(o|0,y|0,14)|0;L=C;H=oe(o|0,y|0,50)|0;L=L|C;p=ne(o|0,y|0,18)|0;K=C;J=oe(o|0,y|0,46)|0;K=L^(K|C);L=ne(o|0,y|0,41)|0;t=C;q=oe(o|0,y|0,23)|0;t=K^(t|C);K=c[h+80+32>>2]|0;I=c[h+80+32+4>>2]|0;l=le(D|0,l|0,-213338824,961987163)|0;I=le(l|0,C|0,K|0,I|0)|0;t=le(I|0,C|0,(G|H)^(p|J)^(L|q)|0,t|0)|0;t=le(t|0,C|0,(E^e)&o^E|0,(r^n)&y^r|0)|0;q=C;L=ne(s|0,v|0,28)|0;J=C;p=oe(s|0,v|0,36)|0;J=J|C;H=ne(s|0,v|0,34)|0;G=C;I=oe(s|0,v|0,30)|0;G=J^(G|C);J=ne(s|0,v|0,39)|0;K=C;l=oe(s|0,v|0,25)|0;D=c[B>>2]|0;u=c[B+4>>2]|0;K=le((D|F)&s|D&F|0,(u|b)&v|u&b|0,(L|p)^(H|I)^(J|l)|0,G^(K|C)|0)|0;G=C;z=le(j|0,z|0,t|0,q|0)|0;j=C;c[f>>2]=z;c[f+4>>2]=j;q=le(K|0,G|0,t|0,q|0)|0;t=C;c[m>>2]=q;c[m+4>>2]=t;G=ne(z|0,j|0,14)|0;K=C;l=oe(z|0,j|0,50)|0;K=K|C;J=ne(z|0,j|0,18)|0;I=C;H=oe(z|0,j|0,46)|0;I=K^(I|C);K=ne(z|0,j|0,41)|0;p=C;L=oe(z|0,j|0,23)|0;p=I^(p|C);I=c[h+80+40>>2]|0;b=c[h+80+40+4>>2]|0;r=le(E|0,r|0,-1241133031,1508970993)|0;b=le(r|0,C|0,I|0,b|0)|0;p=le(b|0,C|0,(G|l)^(J|H)^(K|L)|0,p|0)|0;p=le(p|0,C|0,(e^o)&z^e|0,(n^y)&j^n|0)|0;L=C;K=ne(q|0,t|0,28)|0;H=C;J=oe(q|0,t|0,36)|0;H=H|C;l=ne(q|0,t|0,34)|0;G=C;b=oe(q|0,t|0,30)|0;G=H^(G|C);H=ne(q|0,t|0,39)|0;I=C;r=oe(q|0,t|0,25)|0;E=c[k>>2]|0;F=c[k+4>>2]|0;I=le((E|s)&q|E&s|0,(F|v)&t|F&v|0,(K|J)^(l|b)^(H|r)|0,G^(I|C)|0)|0;G=C;u=le(D|0,u|0,p|0,L|0)|0;D=C;c[B>>2]=u;c[B+4>>2]=D;L=le(I|0,G|0,p|0,L|0)|0;p=C;c[x>>2]=L;c[x+4>>2]=p;G=ne(u|0,D|0,14)|0;I=C;r=oe(u|0,D|0,50)|0;I=I|C;H=ne(u|0,D|0,18)|0;b=C;l=oe(u|0,D|0,46)|0;b=I^(b|C);I=ne(u|0,D|0,41)|0;J=C;K=oe(u|0,D|0,23)|0;J=b^(J|C);b=c[h+80+48>>2]|0;v=c[h+80+48+4>>2]|0;n=le(e|0,n|0,-1357295717,-1841331548)|0;v=le(n|0,C|0,b|0,v|0)|0;J=le(v|0,C|0,(G|r)^(H|l)^(I|K)|0,J|0)|0;J=le(J|0,C|0,(o^z)&u^o|0,(y^j)&D^y|0)|0;K=C;I=ne(L|0,p|0,28)|0;l=C;H=oe(L|0,p|0,36)|0;l=l|C;r=ne(L|0,p|0,34)|0;G=C;v=oe(L|0,p|0,30)|0;G=l^(G|C);l=ne(L|0,p|0,39)|0;b=C;n=oe(L|0,p|0,25)|0;e=c[w>>2]|0;s=c[w+4>>2]|0;b=le((e|q)&L|e&q|0,(s|t)&p|s&t|0,(I|H)^(r|v)^(l|n)|0,G^(b|C)|0)|0;G=C;F=le(E|0,F|0,J|0,K|0)|0;E=C;c[k>>2]=F;c[k+4>>2]=E;K=le(b|0,G|0,J|0,K|0)|0;J=C;c[A>>2]=K;c[A+4>>2]=J;G=ne(F|0,E|0,14)|0;b=C;n=oe(F|0,E|0,50)|0;b=b|C;l=ne(F|0,E|0,18)|0;v=C;r=oe(F|0,E|0,46)|0;v=b^(v|C);b=ne(F|0,E|0,41)|0;H=C;I=oe(F|0,E|0,23)|0;H=v^(H|C);v=c[h+80+56>>2]|0;t=c[h+80+56+4>>2]|0;y=le(o|0,y|0,-630357736,-1424204075)|0;t=le(y|0,C|0,v|0,t|0)|0;H=le(t|0,C|0,(G|n)^(l|r)^(b|I)|0,H|0)|0;H=le(H|0,C|0,(z^u)&F^z|0,(j^D)&E^j|0)|0;I=C;b=ne(K|0,J|0,28)|0;r=C;l=oe(K|0,J|0,36)|0;r=r|C;n=ne(K|0,J|0,34)|0;G=C;t=oe(K|0,J|0,30)|0;G=r^(G|C);r=ne(K|0,J|0,39)|0;v=C;y=oe(K|0,J|0,25)|0;o=c[m>>2]|0;q=c[m+4>>2]|0;v=le((o|L)&K|o&L|0,(q|p)&J|q&p|0,(b|l)^(n|t)^(r|y)|0,G^(v|C)|0)|0;G=C;s=le(e|0,s|0,H|0,I|0)|0;e=C;c[w>>2]=s;c[w+4>>2]=e;I=le(v|0,G|0,H|0,I|0)|0;H=C;c[h+16>>2]=I;c[h+16+4>>2]=H;G=ne(s|0,e|0,14)|0;v=C;y=oe(s|0,e|0,50)|0;v=v|C;r=ne(s|0,e|0,18)|0;t=C;n=oe(s|0,e|0,46)|0;t=v^(t|C);v=ne(s|0,e|0,41)|0;l=C;b=oe(s|0,e|0,23)|0;l=t^(l|C);t=c[h+80+64>>2]|0;p=c[h+80+64+4>>2]|0;j=le(z|0,j|0,-1560083902,-670586216)|0;p=le(j|0,C|0,t|0,p|0)|0;l=le(p|0,C|0,(G|y)^(r|n)^(v|b)|0,l|0)|0;l=le(l|0,C|0,(u^F)&s^u|0,(D^E)&e^D|0)|0;b=C;v=ne(I|0,H|0,28)|0;n=C;r=oe(I|0,H|0,36)|0;n=n|C;y=ne(I|0,H|0,34)|0;G=C;p=oe(I|0,H|0,30)|0;G=n^(G|C);n=ne(I|0,H|0,39)|0;t=C;j=oe(I|0,H|0,25)|0;z=c[x>>2]|0;L=c[x+4>>2]|0;t=le((z|K)&I|z&K|0,(L|J)&H|L&J|0,(v|r)^(y|p)^(n|j)|0,G^(t|C)|0)|0;G=C;q=le(o|0,q|0,l|0,b|0)|0;o=C;c[m>>2]=q;c[m+4>>2]=o;b=le(t|0,G|0,l|0,b|0)|0;l=C;c[f>>2]=b;c[f+4>>2]=l;G=ne(q|0,o|0,14)|0;t=C;j=oe(q|0,o|0,50)|0;t=t|C;n=ne(q|0,o|0,18)|0;p=C;y=oe(q|0,o|0,46)|0;p=t^(p|C);t=ne(q|0,o|0,41)|0;r=C;v=oe(q|0,o|0,23)|0;r=p^(r|C);p=c[h+80+72>>2]|0;J=c[h+80+72+4>>2]|0;D=le(u|0,D|0,1164996542,310598401)|0;J=le(D|0,C|0,p|0,J|0)|0;r=le(J|0,C|0,(G|j)^(n|y)^(t|v)|0,r|0)|0;r=le(r|0,C|0,(F^s)&q^F|0,(E^e)&o^E|0)|0;v=C;t=ne(b|0,l|0,28)|0;y=C;n=oe(b|0,l|0,36)|0;y=y|C;j=ne(b|0,l|0,34)|0;G=C;J=oe(b|0,l|0,30)|0;G=y^(G|C);y=ne(b|0,l|0,39)|0;p=C;D=oe(b|0,l|0,25)|0;u=c[A>>2]|0;K=c[A+4>>2]|0;p=le((u|I)&b|u&I|0,(K|H)&l|K&H|0,(t|n)^(j|J)^(y|D)|0,G^(p|C)|0)|0;G=C;L=le(z|0,L|0,r|0,v|0)|0;z=C;c[x>>2]=L;c[x+4>>2]=z;v=le(p|0,G|0,r|0,v|0)|0;r=C;c[B>>2]=v;c[B+4>>2]=r;G=ne(L|0,z|0,14)|0;p=C;D=oe(L|0,z|0,50)|0;p=p|C;y=ne(L|0,z|0,18)|0;J=C;j=oe(L|0,z|0,46)|0;J=p^(J|C);p=ne(L|0,z|0,41)|0;n=C;t=oe(L|0,z|0,23)|0;n=J^(n|C);J=c[h+80+80>>2]|0;H=c[h+80+80+4>>2]|0;E=le(F|0,E|0,1323610764,607225278)|0;H=le(E|0,C|0,J|0,H|0)|0;n=le(H|0,C|0,(G|D)^(y|j)^(p|t)|0,n|0)|0;n=le(n|0,C|0,(s^q)&L^s|0,(e^o)&z^e|0)|0;t=C;p=ne(v|0,r|0,28)|0;j=C;y=oe(v|0,r|0,36)|0;j=j|C;D=ne(v|0,r|0,34)|0;G=C;H=oe(v|0,r|0,30)|0;G=j^(G|C);j=ne(v|0,r|0,39)|0;J=C;E=oe(v|0,r|0,25)|0;F=c[h+16>>2]|0;I=c[h+16+4>>2]|0;J=le((F|b)&v|F&b|0,(I|l)&r|I&l|0,(p|y)^(D|H)^(j|E)|0,G^(J|C)|0)|0;G=C;K=le(u|0,K|0,n|0,t|0)|0;u=C;c[A>>2]=K;c[A+4>>2]=u;t=le(J|0,G|0,n|0,t|0)|0;n=C;c[k>>2]=t;c[k+4>>2]=n;G=ne(K|0,u|0,14)|0;J=C;E=oe(K|0,u|0,50)|0;J=J|C;j=ne(K|0,u|0,18)|0;H=C;D=oe(K|0,u|0,46)|0;H=J^(H|C);J=ne(K|0,u|0,41)|0;y=C;p=oe(K|0,u|0,23)|0;y=H^(y|C);H=c[h+80+88>>2]|0;l=c[h+80+88+4>>2]|0;e=le(s|0,e|0,-704662302,1426881987)|0;l=le(e|0,C|0,H|0,l|0)|0;y=le(l|0,C|0,(G|E)^(j|D)^(J|p)|0,y|0)|0;y=le(y|0,C|0,(q^L)&K^q|0,(o^z)&u^o|0)|0;p=C;J=ne(t|0,n|0,28)|0;D=C;j=oe(t|0,n|0,36)|0;D=D|C;E=ne(t|0,n|0,34)|0;G=C;l=oe(t|0,n|0,30)|0;G=D^(G|C);D=ne(t|0,n|0,39)|0;H=C;e=oe(t|0,n|0,25)|0;s=c[f>>2]|0;b=c[f+4>>2]|0;H=le((s|v)&t|s&v|0,(b|r)&n|b&r|0,(J|j)^(E|l)^(D|e)|0,G^(H|C)|0)|0;G=C;I=le(F|0,I|0,y|0,p|0)|0;F=C;c[h+16>>2]=I;c[h+16+4>>2]=F;p=le(H|0,G|0,y|0,p|0)|0;y=C;c[w>>2]=p;c[w+4>>2]=y;G=ne(I|0,F|0,14)|0;H=C;e=oe(I|0,F|0,50)|0;H=H|C;D=ne(I|0,F|0,18)|0;l=C;E=oe(I|0,F|0,46)|0;l=H^(l|C);H=ne(I|0,F|0,41)|0;j=C;J=oe(I|0,F|0,23)|0;j=l^(j|C);l=c[h+80+96>>2]|0;r=c[h+80+96+4>>2]|0;o=le(q|0,o|0,-226784913,1925078388)|0;r=le(o|0,C|0,l|0,r|0)|0;j=le(r|0,C|0,(G|e)^(D|E)^(H|J)|0,j|0)|0;j=le(j|0,C|0,(L^K)&I^L|0,(z^u)&F^z|0)|0;J=C;H=ne(p|0,y|0,28)|0;E=C;D=oe(p|0,y|0,36)|0;E=E|C;e=ne(p|0,y|0,34)|0;G=C;r=oe(p|0,y|0,30)|0;G=E^(G|C);E=ne(p|0,y|0,39)|0;l=C;o=oe(p|0,y|0,25)|0;q=c[B>>2]|0;v=c[B+4>>2]|0;l=le((q|t)&p|q&t|0,(v|n)&y|v&n|0,(H|D)^(e|r)^(E|o)|0,G^(l|C)|0)|0;G=C;b=le(s|0,b|0,j|0,J|0)|0;s=C;c[f>>2]=b;c[f+4>>2]=s;J=le(l|0,G|0,j|0,J|0)|0;j=C;c[m>>2]=J;c[m+4>>2]=j;G=ne(b|0,s|0,14)|0;l=C;o=oe(b|0,s|0,50)|0;l=l|C;E=ne(b|0,s|0,18)|0;r=C;e=oe(b|0,s|0,46)|0;r=l^(r|C);l=ne(b|0,s|0,41)|0;D=C;H=oe(b|0,s|0,23)|0;D=r^(D|C);r=c[h+80+104>>2]|0;n=c[h+80+104+4>>2]|0;z=le(L|0,z|0,991336113,-2132889090)|0;n=le(z|0,C|0,r|0,n|0)|0;D=le(n|0,C|0,(G|o)^(E|e)^(l|H)|0,D|0)|0;D=le(D|0,C|0,(K^I)&b^K|0,(u^F)&s^u|0)|0;H=C;l=ne(J|0,j|0,28)|0;e=C;E=oe(J|0,j|0,36)|0;e=e|C;o=ne(J|0,j|0,34)|0;G=C;n=oe(J|0,j|0,30)|0;G=e^(G|C);e=ne(J|0,j|0,39)|0;r=C;z=oe(J|0,j|0,25)|0;L=c[k>>2]|0;t=c[k+4>>2]|0;r=le((L|p)&J|L&p|0,(t|y)&j|t&y|0,(l|E)^(o|n)^(e|z)|0,G^(r|C)|0)|0;G=C;v=le(q|0,v|0,D|0,H|0)|0;q=C;c[B>>2]=v;c[B+4>>2]=q;H=le(r|0,G|0,D|0,H|0)|0;D=C;c[x>>2]=H;c[x+4>>2]=D;G=ne(v|0,q|0,14)|0;r=C;z=oe(v|0,q|0,50)|0;r=r|C;e=ne(v|0,q|0,18)|0;n=C;o=oe(v|0,q|0,46)|0;n=r^(n|C);r=ne(v|0,q|0,41)|0;E=C;l=oe(v|0,q|0,23)|0;E=n^(E|C);n=c[h+80+112>>2]|0;y=c[h+80+112+4>>2]|0;u=le(K|0,u|0,633803317,-1680079193)|0;y=le(u|0,C|0,n|0,y|0)|0;E=le(y|0,C|0,(G|z)^(e|o)^(r|l)|0,E|0)|0;E=le(E|0,C|0,(I^b)&v^I|0,(F^s)&q^F|0)|0;l=C;r=ne(H|0,D|0,28)|0;o=C;e=oe(H|0,D|0,36)|0;o=o|C;z=ne(H|0,D|0,34)|0;G=C;y=oe(H|0,D|0,30)|0;G=o^(G|C);o=ne(H|0,D|0,39)|0;n=C;u=oe(H|0,D|0,25)|0;K=c[w>>2]|0;p=c[w+4>>2]|0;n=le((K|J)&H|K&J|0,(p|j)&D|p&j|0,(r|e)^(z|y)^(o|u)|0,G^(n|C)|0)|0;G=C;t=le(L|0,t|0,E|0,l|0)|0;L=C;c[k>>2]=t;c[k+4>>2]=L;l=le(n|0,G|0,E|0,l|0)|0;E=C;c[A>>2]=l;c[A+4>>2]=E;G=ne(t|0,L|0,14)|0;n=C;u=oe(t|0,L|0,50)|0;n=n|C;o=ne(t|0,L|0,18)|0;y=C;z=oe(t|0,L|0,46)|0;y=n^(y|C);n=ne(t|0,L|0,41)|0;e=C;r=oe(t|0,L|0,23)|0;e=y^(e|C);y=c[h+80+120>>2]|0;j=c[h+80+120+4>>2]|0;F=le(I|0,F|0,-815192428,-1046744716)|0;j=le(F|0,C|0,y|0,j|0)|0;e=le(j|0,C|0,(G|u)^(o|z)^(n|r)|0,e|0)|0;e=le(e|0,C|0,(b^v)&t^b|0,(s^q)&L^s|0)|0;r=C;n=ne(l|0,E|0,28)|0;z=C;o=oe(l|0,E|0,36)|0;z=z|C;u=ne(l|0,E|0,34)|0;G=C;j=oe(l|0,E|0,30)|0;G=z^(G|C);z=ne(l|0,E|0,39)|0;y=C;F=oe(l|0,E|0,25)|0;I=c[m>>2]|0;J=c[m+4>>2]|0;y=le((I|H)&l|I&H|0,(J|D)&E|J&D|0,(n|o)^(u|j)^(z|F)|0,G^(y|C)|0)|0;G=C;p=le(K|0,p|0,e|0,r|0)|0;K=C;c[w>>2]=p;c[w+4>>2]=K;r=le(y|0,G|0,e|0,r|0)|0;e=C;c[h+16>>2]=r;c[h+16+4>>2]=e;G=ne(p|0,K|0,14)|0;y=C;F=oe(p|0,K|0,50)|0;y=y|C;z=ne(p|0,K|0,18)|0;j=C;u=oe(p|0,K|0,46)|0;j=y^(j|C);y=ne(p|0,K|0,41)|0;o=C;n=oe(p|0,K|0,23)|0;o=j^(o|C);j=c[h+80+128>>2]|0;D=c[h+80+128+4>>2]|0;s=le(b|0,s|0,-1628353838,-459576895)|0;D=le(s|0,C|0,j|0,D|0)|0;o=le(D|0,C|0,(G|F)^(z|u)^(y|n)|0,o|0)|0;o=le(o|0,C|0,(v^t)&p^v|0,(q^L)&K^q|0)|0;n=C;y=ne(r|0,e|0,28)|0;u=C;z=oe(r|0,e|0,36)|0;u=u|C;F=ne(r|0,e|0,34)|0;G=C;D=oe(r|0,e|0,30)|0;G=u^(G|C);u=ne(r|0,e|0,39)|0;j=C;s=oe(r|0,e|0,25)|0;b=c[x>>2]|0;H=c[x+4>>2]|0;j=le((b|l)&r|b&l|0,(H|E)&e|H&E|0,(y|z)^(F|D)^(u|s)|0,G^(j|C)|0)|0;G=C;J=le(I|0,J|0,o|0,n|0)|0;I=C;c[m>>2]=J;c[m+4>>2]=I;n=le(j|0,G|0,o|0,n|0)|0;o=C;c[f>>2]=n;c[f+4>>2]=o;G=ne(J|0,I|0,14)|0;j=C;s=oe(J|0,I|0,50)|0;j=j|C;u=ne(J|0,I|0,18)|0;D=C;F=oe(J|0,I|0,46)|0;D=j^(D|C);j=ne(J|0,I|0,41)|0;z=C;y=oe(J|0,I|0,23)|0;z=D^(z|C);D=c[h+80+136>>2]|0;E=c[h+80+136+4>>2]|0;q=le(v|0,q|0,944711139,-272742522)|0;E=le(q|0,C|0,D|0,E|0)|0;z=le(E|0,C|0,(G|s)^(u|F)^(j|y)|0,z|0)|0;z=le(z|0,C|0,(t^p)&J^t|0,(L^K)&I^L|0)|0;y=C;j=ne(n|0,o|0,28)|0;F=C;u=oe(n|0,o|0,36)|0;F=F|C;s=ne(n|0,o|0,34)|0;G=C;E=oe(n|0,o|0,30)|0;G=F^(G|C);F=ne(n|0,o|0,39)|0;D=C;q=oe(n|0,o|0,25)|0;v=c[A>>2]|0;l=c[A+4>>2]|0;D=le((v|r)&n|v&r|0,(l|e)&o|l&e|0,(j|u)^(s|E)^(F|q)|0,G^(D|C)|0)|0;G=C;H=le(b|0,H|0,z|0,y|0)|0;b=C;c[x>>2]=H;c[x+4>>2]=b;y=le(D|0,G|0,z|0,y|0)|0;z=C;c[B>>2]=y;c[B+4>>2]=z;G=ne(H|0,b|0,14)|0;D=C;q=oe(H|0,b|0,50)|0;D=D|C;F=ne(H|0,b|0,18)|0;E=C;s=oe(H|0,b|0,46)|0;E=D^(E|C);D=ne(H|0,b|0,41)|0;u=C;j=oe(H|0,b|0,23)|0;u=E^(u|C);E=c[h+80+144>>2]|0;e=c[h+80+144+4>>2]|0;L=le(t|0,L|0,-1953704523,264347078)|0;e=le(L|0,C|0,E|0,e|0)|0;u=le(e|0,C|0,(G|q)^(F|s)^(D|j)|0,u|0)|0;u=le(u|0,C|0,(p^J)&H^p|0,(K^I)&b^K|0)|0;j=C;D=ne(y|0,z|0,28)|0;s=C;F=oe(y|0,z|0,36)|0;s=s|C;q=ne(y|0,z|0,34)|0;G=C;e=oe(y|0,z|0,30)|0;G=s^(G|C);s=ne(y|0,z|0,39)|0;E=C;L=oe(y|0,z|0,25)|0;t=c[h+16>>2]|0;r=c[h+16+4>>2]|0;E=le((t|n)&y|t&n|0,(r|o)&z|r&o|0,(D|F)^(q|e)^(s|L)|0,G^(E|C)|0)|0;G=C;l=le(v|0,l|0,u|0,j|0)|0;v=C;c[A>>2]=l;c[A+4>>2]=v;j=le(E|0,G|0,u|0,j|0)|0;u=C;c[k>>2]=j;c[k+4>>2]=u;G=ne(l|0,v|0,14)|0;E=C;L=oe(l|0,v|0,50)|0;E=E|C;s=ne(l|0,v|0,18)|0;e=C;q=oe(l|0,v|0,46)|0;e=E^(e|C);E=ne(l|0,v|0,41)|0;F=C;D=oe(l|0,v|0,23)|0;F=e^(F|C);e=c[h+80+152>>2]|0;o=c[h+80+152+4>>2]|0;K=le(p|0,K|0,2007800933,604807628)|0;o=le(K|0,C|0,e|0,o|0)|0;F=le(o|0,C|0,(G|L)^(s|q)^(E|D)|0,F|0)|0;F=le(F|0,C|0,(J^H)&l^J|0,(I^b)&v^I|0)|0;D=C;E=ne(j|0,u|0,28)|0;q=C;s=oe(j|0,u|0,36)|0;q=q|C;L=ne(j|0,u|0,34)|0;G=C;o=oe(j|0,u|0,30)|0;G=q^(G|C);q=ne(j|0,u|0,39)|0;e=C;K=oe(j|0,u|0,25)|0;p=c[f>>2]|0;n=c[f+4>>2]|0;e=le((p|y)&j|p&y|0,(n|z)&u|n&z|0,(E|s)^(L|o)^(q|K)|0,G^(e|C)|0)|0;G=C;r=le(t|0,r|0,F|0,D|0)|0;t=C;c[h+16>>2]=r;c[h+16+4>>2]=t;D=le(e|0,G|0,F|0,D|0)|0;F=C;c[w>>2]=D;c[w+4>>2]=F;G=ne(r|0,t|0,14)|0;e=C;K=oe(r|0,t|0,50)|0;e=e|C;q=ne(r|0,t|0,18)|0;o=C;L=oe(r|0,t|0,46)|0;o=e^(o|C);e=ne(r|0,t|0,41)|0;s=C;E=oe(r|0,t|0,23)|0;s=o^(s|C);o=c[h+80+160>>2]|0;z=c[h+80+160+4>>2]|0;I=le(J|0,I|0,1495990901,770255983)|0;z=le(I|0,C|0,o|0,z|0)|0;s=le(z|0,C|0,(G|K)^(q|L)^(e|E)|0,s|0)|0;s=le(s|0,C|0,(H^l)&r^H|0,(b^v)&t^b|0)|0;E=C;e=ne(D|0,F|0,28)|0;L=C;q=oe(D|0,F|0,36)|0;L=L|C;K=ne(D|0,F|0,34)|0;G=C;z=oe(D|0,F|0,30)|0;G=L^(G|C);L=ne(D|0,F|0,39)|0;o=C;I=oe(D|0,F|0,25)|0;J=c[B>>2]|0;y=c[B+4>>2]|0;o=le((J|j)&D|J&j|0,(y|u)&F|y&u|0,(e|q)^(K|z)^(L|I)|0,G^(o|C)|0)|0;G=C;n=le(p|0,n|0,s|0,E|0)|0;p=C;c[f>>2]=n;c[f+4>>2]=p;E=le(o|0,G|0,s|0,E|0)|0;s=C;c[m>>2]=E;c[m+4>>2]=s;G=ne(n|0,p|0,14)|0;o=C;I=oe(n|0,p|0,50)|0;o=o|C;L=ne(n|0,p|0,18)|0;z=C;K=oe(n|0,p|0,46)|0;z=o^(z|C);o=ne(n|0,p|0,41)|0;q=C;e=oe(n|0,p|0,23)|0;q=z^(q|C);z=c[h+80+168>>2]|0;u=c[h+80+168+4>>2]|0;b=le(H|0,b|0,1856431235,1249150122)|0;u=le(b|0,C|0,z|0,u|0)|0;q=le(u|0,C|0,(G|I)^(L|K)^(o|e)|0,q|0)|0;q=le(q|0,C|0,(l^r)&n^l|0,(v^t)&p^v|0)|0;e=C;o=ne(E|0,s|0,28)|0;K=C;L=oe(E|0,s|0,36)|0;K=K|C;I=ne(E|0,s|0,34)|0;G=C;u=oe(E|0,s|0,30)|0;G=K^(G|C);K=ne(E|0,s|0,39)|0;z=C;b=oe(E|0,s|0,25)|0;H=c[k>>2]|0;j=c[k+4>>2]|0;z=le((H|D)&E|H&D|0,(j|F)&s|j&F|0,(o|L)^(I|u)^(K|b)|0,G^(z|C)|0)|0;G=C;y=le(J|0,y|0,q|0,e|0)|0;J=C;c[B>>2]=y;c[B+4>>2]=J;e=le(z|0,G|0,q|0,e|0)|0;q=C;c[x>>2]=e;c[x+4>>2]=q;G=ne(y|0,J|0,14)|0;z=C;b=oe(y|0,J|0,50)|0;z=z|C;K=ne(y|0,J|0,18)|0;u=C;I=oe(y|0,J|0,46)|0;u=z^(u|C);z=ne(y|0,J|0,41)|0;L=C;o=oe(y|0,J|0,23)|0;L=u^(L|C);u=c[h+80+176>>2]|0;F=c[h+80+176+4>>2]|0;v=le(l|0,v|0,-1119749164,1555081692)|0;F=le(v|0,C|0,u|0,F|0)|0;L=le(F|0,C|0,(G|b)^(K|I)^(z|o)|0,L|0)|0;L=le(L|0,C|0,(r^n)&y^r|0,(t^p)&J^t|0)|0;o=C;z=ne(e|0,q|0,28)|0;I=C;K=oe(e|0,q|0,36)|0;I=I|C;b=ne(e|0,q|0,34)|0;G=C;F=oe(e|0,q|0,30)|0;G=I^(G|C);I=ne(e|0,q|0,39)|0;u=C;v=oe(e|0,q|0,25)|0;l=c[w>>2]|0;D=c[w+4>>2]|0;u=le((l|E)&e|l&E|0,(D|s)&q|D&s|0,(z|K)^(b|F)^(I|v)|0,G^(u|C)|0)|0;G=C;j=le(H|0,j|0,L|0,o|0)|0;H=C;c[k>>2]=j;c[k+4>>2]=H;o=le(u|0,G|0,L|0,o|0)|0;L=C;c[A>>2]=o;c[A+4>>2]=L;G=ne(j|0,H|0,14)|0;u=C;v=oe(j|0,H|0,50)|0;u=u|C;I=ne(j|0,H|0,18)|0;F=C;b=oe(j|0,H|0,46)|0;F=u^(F|C);u=ne(j|0,H|0,41)|0;K=C;z=oe(j|0,H|0,23)|0;K=F^(K|C);F=c[h+80+184>>2]|0;s=c[h+80+184+4>>2]|0;t=le(r|0,t|0,-2096016459,1996064986)|0;s=le(t|0,C|0,F|0,s|0)|0;K=le(s|0,C|0,(G|v)^(I|b)^(u|z)|0,K|0)|0;K=le(K|0,C|0,(n^y)&j^n|0,(p^J)&H^p|0)|0;z=C;u=ne(o|0,L|0,28)|0;b=C;I=oe(o|0,L|0,36)|0;b=b|C;v=ne(o|0,L|0,34)|0;G=C;s=oe(o|0,L|0,30)|0;G=b^(G|C);b=ne(o|0,L|0,39)|0;F=C;t=oe(o|0,L|0,25)|0;r=c[m>>2]|0;E=c[m+4>>2]|0;F=le((r|e)&o|r&e|0,(E|q)&L|E&q|0,(u|I)^(v|s)^(b|t)|0,G^(F|C)|0)|0;G=C;D=le(l|0,D|0,K|0,z|0)|0;l=C;c[w>>2]=D;c[w+4>>2]=l;z=le(F|0,G|0,K|0,z|0)|0;K=C;c[h+16>>2]=z;c[h+16+4>>2]=K;G=ne(D|0,l|0,14)|0;F=C;t=oe(D|0,l|0,50)|0;F=F|C;b=ne(D|0,l|0,18)|0;s=C;v=oe(D|0,l|0,46)|0;s=F^(s|C);F=ne(D|0,l|0,41)|0;I=C;u=oe(D|0,l|0,23)|0;I=s^(I|C);s=c[h+80+192>>2]|0;q=c[h+80+192+4>>2]|0;p=le(n|0,p|0,-295247957,-1740746414)|0;q=le(p|0,C|0,s|0,q|0)|0;I=le(q|0,C|0,(G|t)^(b|v)^(F|u)|0,I|0)|0;I=le(I|0,C|0,(y^j)&D^y|0,(J^H)&l^J|0)|0;u=C;F=ne(z|0,K|0,28)|0;v=C;b=oe(z|0,K|0,36)|0;v=v|C;t=ne(z|0,K|0,34)|0;G=C;q=oe(z|0,K|0,30)|0;G=v^(G|C);v=ne(z|0,K|0,39)|0;s=C;p=oe(z|0,K|0,25)|0;n=c[x>>2]|0;e=c[x+4>>2]|0;s=le((n|o)&z|n&o|0,(e|L)&K|e&L|0,(F|b)^(t|q)^(v|p)|0,G^(s|C)|0)|0;G=C;E=le(r|0,E|0,I|0,u|0)|0;r=C;c[m>>2]=E;c[m+4>>2]=r;u=le(s|0,G|0,I|0,u|0)|0;I=C;c[f>>2]=u;c[f+4>>2]=I;G=ne(E|0,r|0,14)|0;s=C;p=oe(E|0,r|0,50)|0;s=s|C;v=ne(E|0,r|0,18)|0;q=C;t=oe(E|0,r|0,46)|0;q=s^(q|C);s=ne(E|0,r|0,41)|0;b=C;F=oe(E|0,r|0,23)|0;b=q^(b|C);q=c[h+80+200>>2]|0;L=c[h+80+200+4>>2]|0;J=le(y|0,J|0,766784016,-1473132947)|0;L=le(J|0,C|0,q|0,L|0)|0;b=le(L|0,C|0,(G|p)^(v|t)^(s|F)|0,b|0)|0;b=le(b|0,C|0,(j^D)&E^j|0,(H^l)&r^H|0)|0;F=C;s=ne(u|0,I|0,28)|0;t=C;v=oe(u|0,I|0,36)|0;t=t|C;p=ne(u|0,I|0,34)|0;G=C;L=oe(u|0,I|0,30)|0;G=t^(G|C);t=ne(u|0,I|0,39)|0;q=C;J=oe(u|0,I|0,25)|0;y=c[A>>2]|0;o=c[A+4>>2]|0;q=le((y|z)&u|y&z|0,(o|K)&I|o&K|0,(s|v)^(p|L)^(t|J)|0,G^(q|C)|0)|0;G=C;e=le(n|0,e|0,b|0,F|0)|0;n=C;c[x>>2]=e;c[x+4>>2]=n;F=le(q|0,G|0,b|0,F|0)|0;b=C;c[B>>2]=F;c[B+4>>2]=b;G=ne(e|0,n|0,14)|0;q=C;J=oe(e|0,n|0,50)|0;q=q|C;t=ne(e|0,n|0,18)|0;L=C;p=oe(e|0,n|0,46)|0;L=q^(L|C);q=ne(e|0,n|0,41)|0;v=C;s=oe(e|0,n|0,23)|0;v=L^(v|C);L=c[h+80+208>>2]|0;K=c[h+80+208+4>>2]|0;H=le(j|0,H|0,-1728372417,-1341970488)|0;K=le(H|0,C|0,L|0,K|0)|0;v=le(K|0,C|0,(G|J)^(t|p)^(q|s)|0,v|0)|0;v=le(v|0,C|0,(D^E)&e^D|0,(l^r)&n^l|0)|0;s=C;q=ne(F|0,b|0,28)|0;p=C;t=oe(F|0,b|0,36)|0;p=p|C;J=ne(F|0,b|0,34)|0;G=C;K=oe(F|0,b|0,30)|0;G=p^(G|C);p=ne(F|0,b|0,39)|0;L=C;H=oe(F|0,b|0,25)|0;j=c[h+16>>2]|0;z=c[h+16+4>>2]|0;L=le((j|u)&F|j&u|0,(z|I)&b|z&I|0,(q|t)^(J|K)^(p|H)|0,G^(L|C)|0)|0;G=C;o=le(y|0,o|0,v|0,s|0)|0;y=C;c[A>>2]=o;c[A+4>>2]=y;s=le(L|0,G|0,v|0,s|0)|0;v=C;c[k>>2]=s;c[k+4>>2]=v;G=ne(o|0,y|0,14)|0;L=C;H=oe(o|0,y|0,50)|0;L=L|C;p=ne(o|0,y|0,18)|0;K=C;J=oe(o|0,y|0,46)|0;K=L^(K|C);L=ne(o|0,y|0,41)|0;t=C;q=oe(o|0,y|0,23)|0;t=K^(t|C);K=c[h+80+216>>2]|0;I=c[h+80+216+4>>2]|0;l=le(D|0,l|0,-1091629340,-1084653625)|0;I=le(l|0,C|0,K|0,I|0)|0;t=le(I|0,C|0,(G|H)^(p|J)^(L|q)|0,t|0)|0;t=le(t|0,C|0,(E^e)&o^E|0,(r^n)&y^r|0)|0;q=C;L=ne(s|0,v|0,28)|0;J=C;p=oe(s|0,v|0,36)|0;J=J|C;H=ne(s|0,v|0,34)|0;G=C;I=oe(s|0,v|0,30)|0;G=J^(G|C);J=ne(s|0,v|0,39)|0;K=C;l=oe(s|0,v|0,25)|0;D=c[f>>2]|0;u=c[f+4>>2]|0;K=le((D|F)&s|D&F|0,(u|b)&v|u&b|0,(L|p)^(H|I)^(J|l)|0,G^(K|C)|0)|0;G=C;z=le(j|0,z|0,t|0,q|0)|0;j=C;c[h+16>>2]=z;c[h+16+4>>2]=j;q=le(K|0,G|0,t|0,q|0)|0;t=C;c[w>>2]=q;c[w+4>>2]=t;G=ne(z|0,j|0,14)|0;K=C;l=oe(z|0,j|0,50)|0;K=K|C;J=ne(z|0,j|0,18)|0;I=C;H=oe(z|0,j|0,46)|0;I=K^(I|C);K=ne(z|0,j|0,41)|0;p=C;L=oe(z|0,j|0,23)|0;p=I^(p|C);I=c[h+80+224>>2]|0;b=c[h+80+224+4>>2]|0;r=le(E|0,r|0,1034457026,-958395405)|0;b=le(r|0,C|0,I|0,b|0)|0;p=le(b|0,C|0,(G|l)^(J|H)^(K|L)|0,p|0)|0;p=le(p|0,C|0,(e^o)&z^e|0,(n^y)&j^n|0)|0;L=C;K=ne(q|0,t|0,28)|0;H=C;J=oe(q|0,t|0,36)|0;H=H|C;l=ne(q|0,t|0,34)|0;G=C;b=oe(q|0,t|0,30)|0;G=H^(G|C);H=ne(q|0,t|0,39)|0;I=C;r=oe(q|0,t|0,25)|0;E=c[B>>2]|0;F=c[B+4>>2]|0;I=le((E|s)&q|E&s|0,(F|v)&t|F&v|0,(K|J)^(l|b)^(H|r)|0,G^(I|C)|0)|0;G=C;u=le(D|0,u|0,p|0,L|0)|0;D=C;c[f>>2]=u;c[f+4>>2]=D;L=le(I|0,G|0,p|0,L|0)|0;p=C;c[m>>2]=L;c[m+4>>2]=p;G=ne(u|0,D|0,14)|0;I=C;r=oe(u|0,D|0,50)|0;I=I|C;H=ne(u|0,D|0,18)|0;b=C;l=oe(u|0,D|0,46)|0;b=I^(b|C);I=ne(u|0,D|0,41)|0;J=C;K=oe(u|0,D|0,23)|0;J=b^(J|C);b=c[h+80+232>>2]|0;v=c[h+80+232+4>>2]|0;n=le(e|0,n|0,-1828018395,-710438585)|0;v=le(n|0,C|0,b|0,v|0)|0;J=le(v|0,C|0,(G|r)^(H|l)^(I|K)|0,J|0)|0;J=le(J|0,C|0,(o^z)&u^o|0,(y^j)&D^y|0)|0;K=C;I=ne(L|0,p|0,28)|0;l=C;H=oe(L|0,p|0,36)|0;l=l|C;r=ne(L|0,p|0,34)|0;G=C;v=oe(L|0,p|0,30)|0;G=l^(G|C);l=ne(L|0,p|0,39)|0;b=C;n=oe(L|0,p|0,25)|0;e=c[k>>2]|0;s=c[k+4>>2]|0;b=le((e|q)&L|e&q|0,(s|t)&p|s&t|0,(I|H)^(r|v)^(l|n)|0,G^(b|C)|0)|0;G=C;F=le(E|0,F|0,J|0,K|0)|0;E=C;c[B>>2]=F;c[B+4>>2]=E;K=le(b|0,G|0,J|0,K|0)|0;J=C;c[x>>2]=K;c[x+4>>2]=J;G=ne(F|0,E|0,14)|0;b=C;n=oe(F|0,E|0,50)|0;b=b|C;l=ne(F|0,E|0,18)|0;v=C;r=oe(F|0,E|0,46)|0;v=b^(v|C);b=ne(F|0,E|0,41)|0;H=C;I=oe(F|0,E|0,23)|0;H=v^(H|C);v=c[h+80+240>>2]|0;t=c[h+80+240+4>>2]|0;y=le(o|0,y|0,-536640913,113926993)|0;t=le(y|0,C|0,v|0,t|0)|0;H=le(t|0,C|0,(G|n)^(l|r)^(b|I)|0,H|0)|0;H=le(H|0,C|0,(z^u)&F^z|0,(j^D)&E^j|0)|0;I=C;b=ne(K|0,J|0,28)|0;r=C;l=oe(K|0,J|0,36)|0;r=r|C;n=ne(K|0,J|0,34)|0;G=C;t=oe(K|0,J|0,30)|0;G=r^(G|C);r=ne(K|0,J|0,39)|0;v=C;y=oe(K|0,J|0,25)|0;o=c[w>>2]|0;q=c[w+4>>2]|0;v=le((o|L)&K|o&L|0,(q|p)&J|q&p|0,(b|l)^(n|t)^(r|y)|0,G^(v|C)|0)|0;G=C;s=le(e|0,s|0,H|0,I|0)|0;e=C;c[k>>2]=s;c[k+4>>2]=e;I=le(v|0,G|0,H|0,I|0)|0;H=C;c[A>>2]=I;c[A+4>>2]=H;G=ne(s|0,e|0,14)|0;v=C;y=oe(s|0,e|0,50)|0;v=v|C;r=ne(s|0,e|0,18)|0;t=C;n=oe(s|0,e|0,46)|0;t=v^(t|C);v=ne(s|0,e|0,41)|0;l=C;b=oe(s|0,e|0,23)|0;l=t^(l|C);t=c[h+80+248>>2]|0;p=c[h+80+248+4>>2]|0;j=le(z|0,j|0,168717936,338241895)|0;p=le(j|0,C|0,t|0,p|0)|0;l=le(p|0,C|0,(G|y)^(r|n)^(v|b)|0,l|0)|0;l=le(l|0,C|0,(u^F)&s^u|0,(D^E)&e^D|0)|0;b=C;v=ne(I|0,H|0,28)|0;n=C;r=oe(I|0,H|0,36)|0;n=n|C;y=ne(I|0,H|0,34)|0;G=C;p=oe(I|0,H|0,30)|0;G=n^(G|C);n=ne(I|0,H|0,39)|0;t=C;j=oe(I|0,H|0,25)|0;z=c[m>>2]|0;L=c[m+4>>2]|0;t=le((z|K)&I|z&K|0,(L|J)&H|L&J|0,(v|r)^(y|p)^(n|j)|0,G^(t|C)|0)|0;G=C;q=le(o|0,q|0,l|0,b|0)|0;o=C;c[w>>2]=q;c[w+4>>2]=o;b=le(t|0,G|0,l|0,b|0)|0;l=C;c[h+16>>2]=b;c[h+16+4>>2]=l;G=ne(q|0,o|0,14)|0;t=C;j=oe(q|0,o|0,50)|0;t=t|C;n=ne(q|0,o|0,18)|0;p=C;y=oe(q|0,o|0,46)|0;p=t^(p|C);t=ne(q|0,o|0,41)|0;r=C;v=oe(q|0,o|0,23)|0;r=p^(r|C);p=c[h+80+256>>2]|0;J=c[h+80+256+4>>2]|0;D=le(u|0,D|0,1188179964,666307205)|0;J=le(D|0,C|0,p|0,J|0)|0;r=le(J|0,C|0,(G|j)^(n|y)^(t|v)|0,r|0)|0;r=le(r|0,C|0,(F^s)&q^F|0,(E^e)&o^E|0)|0;v=C;t=ne(b|0,l|0,28)|0;y=C;n=oe(b|0,l|0,36)|0;y=y|C;j=ne(b|0,l|0,34)|0;G=C;J=oe(b|0,l|0,30)|0;G=y^(G|C);y=ne(b|0,l|0,39)|0;p=C;D=oe(b|0,l|0,25)|0;u=c[x>>2]|0;K=c[x+4>>2]|0;p=le((u|I)&b|u&I|0,(K|H)&l|K&H|0,(t|n)^(j|J)^(y|D)|0,G^(p|C)|0)|0;G=C;L=le(z|0,L|0,r|0,v|0)|0;z=C;c[m>>2]=L;c[m+4>>2]=z;v=le(p|0,G|0,r|0,v|0)|0;r=C;c[f>>2]=v;c[f+4>>2]=r;G=ne(L|0,z|0,14)|0;p=C;D=oe(L|0,z|0,50)|0;p=p|C;y=ne(L|0,z|0,18)|0;J=C;j=oe(L|0,z|0,46)|0;J=p^(J|C);p=ne(L|0,z|0,41)|0;n=C;t=oe(L|0,z|0,23)|0;n=J^(n|C);J=c[h+80+264>>2]|0;H=c[h+80+264+4>>2]|0;E=le(F|0,E|0,1546045734,773529912)|0;H=le(E|0,C|0,J|0,H|0)|0;n=le(H|0,C|0,(G|D)^(y|j)^(p|t)|0,n|0)|0;n=le(n|0,C|0,(s^q)&L^s|0,(e^o)&z^e|0)|0;t=C;p=ne(v|0,r|0,28)|0;j=C;y=oe(v|0,r|0,36)|0;j=j|C;D=ne(v|0,r|0,34)|0;G=C;H=oe(v|0,r|0,30)|0;G=j^(G|C);j=ne(v|0,r|0,39)|0;J=C;E=oe(v|0,r|0,25)|0;F=c[A>>2]|0;I=c[A+4>>2]|0;J=le((F|b)&v|F&b|0,(I|l)&r|I&l|0,(p|y)^(D|H)^(j|E)|0,G^(J|C)|0)|0;G=C;K=le(u|0,K|0,n|0,t|0)|0;u=C;c[x>>2]=K;c[x+4>>2]=u;t=le(J|0,G|0,n|0,t|0)|0;n=C;c[B>>2]=t;c[B+4>>2]=n;G=ne(K|0,u|0,14)|0;J=C;E=oe(K|0,u|0,50)|0;J=J|C;j=ne(K|0,u|0,18)|0;H=C;D=oe(K|0,u|0,46)|0;H=J^(H|C);J=ne(K|0,u|0,41)|0;y=C;p=oe(K|0,u|0,23)|0;y=H^(y|C);H=c[h+80+272>>2]|0;l=c[h+80+272+4>>2]|0;e=le(s|0,e|0,1522805485,1294757372)|0;l=le(e|0,C|0,H|0,l|0)|0;y=le(l|0,C|0,(G|E)^(j|D)^(J|p)|0,y|0)|0;y=le(y|0,C|0,(q^L)&K^q|0,(o^z)&u^o|0)|0;p=C;J=ne(t|0,n|0,28)|0;D=C;j=oe(t|0,n|0,36)|0;D=D|C;E=ne(t|0,n|0,34)|0;G=C;l=oe(t|0,n|0,30)|0;G=D^(G|C);D=ne(t|0,n|0,39)|0;H=C;e=oe(t|0,n|0,25)|0;s=c[h+16>>2]|0;b=c[h+16+4>>2]|0;H=le((s|v)&t|s&v|0,(b|r)&n|b&r|0,(J|j)^(E|l)^(D|e)|0,G^(H|C)|0)|0;G=C;I=le(F|0,I|0,y|0,p|0)|0;F=C;c[A>>2]=I;c[A+4>>2]=F;p=le(H|0,G|0,y|0,p|0)|0;y=C;c[k>>2]=p;c[k+4>>2]=y;G=ne(I|0,F|0,14)|0;H=C;e=oe(I|0,F|0,50)|0;H=H|C;D=ne(I|0,F|0,18)|0;l=C;E=oe(I|0,F|0,46)|0;l=H^(l|C);H=ne(I|0,F|0,41)|0;j=C;J=oe(I|0,F|0,23)|0;j=l^(j|C);l=c[h+80+280>>2]|0;r=c[h+80+280+4>>2]|0;o=le(q|0,o|0,-1651133473,1396182291)|0;r=le(o|0,C|0,l|0,r|0)|0;j=le(r|0,C|0,(G|e)^(D|E)^(H|J)|0,j|0)|0;j=le(j|0,C|0,(L^K)&I^L|0,(z^u)&F^z|0)|0;J=C;H=ne(p|0,y|0,28)|0;E=C;D=oe(p|0,y|0,36)|0;E=E|C;e=ne(p|0,y|0,34)|0;G=C;r=oe(p|0,y|0,30)|0;G=E^(G|C);E=ne(p|0,y|0,39)|0;l=C;o=oe(p|0,y|0,25)|0;q=c[f>>2]|0;v=c[f+4>>2]|0;l=le((q|t)&p|q&t|0,(v|n)&y|v&n|0,(H|D)^(e|r)^(E|o)|0,G^(l|C)|0)|0;G=C;b=le(s|0,b|0,j|0,J|0)|0;s=C;c[h+16>>2]=b;c[h+16+4>>2]=s;J=le(l|0,G|0,j|0,J|0)|0;j=C;c[w>>2]=J;c[w+4>>2]=j;G=ne(b|0,s|0,14)|0;l=C;o=oe(b|0,s|0,50)|0;l=l|C;E=ne(b|0,s|0,18)|0;r=C;e=oe(b|0,s|0,46)|0;r=l^(r|C);l=ne(b|0,s|0,41)|0;D=C;H=oe(b|0,s|0,23)|0;D=r^(D|C);r=c[h+80+288>>2]|0;n=c[h+80+288+4>>2]|0;z=le(L|0,z|0,-1951439906,1695183700)|0;n=le(z|0,C|0,r|0,n|0)|0;D=le(n|0,C|0,(G|o)^(E|e)^(l|H)|0,D|0)|0;D=le(D|0,C|0,(K^I)&b^K|0,(u^F)&s^u|0)|0;H=C;l=ne(J|0,j|0,28)|0;e=C;E=oe(J|0,j|0,36)|0;e=e|C;o=ne(J|0,j|0,34)|0;G=C;n=oe(J|0,j|0,30)|0;G=e^(G|C);e=ne(J|0,j|0,39)|0;r=C;z=oe(J|0,j|0,25)|0;L=c[B>>2]|0;t=c[B+4>>2]|0;r=le((L|p)&J|L&p|0,(t|y)&j|t&y|0,(l|E)^(o|n)^(e|z)|0,G^(r|C)|0)|0;G=C;v=le(q|0,v|0,D|0,H|0)|0;q=C;c[f>>2]=v;c[f+4>>2]=q;H=le(r|0,G|0,D|0,H|0)|0;D=C;c[m>>2]=H;c[m+4>>2]=D;G=ne(v|0,q|0,14)|0;r=C;z=oe(v|0,q|0,50)|0;r=r|C;e=ne(v|0,q|0,18)|0;n=C;o=oe(v|0,q|0,46)|0;n=r^(n|C);r=ne(v|0,q|0,41)|0;E=C;l=oe(v|0,q|0,23)|0;E=n^(E|C);n=c[h+80+296>>2]|0;y=c[h+80+296+4>>2]|0;u=le(K|0,u|0,1014477480,1986661051)|0;y=le(u|0,C|0,n|0,y|0)|0;E=le(y|0,C|0,(G|z)^(e|o)^(r|l)|0,E|0)|0;E=le(E|0,C|0,(I^b)&v^I|0,(F^s)&q^F|0)|0;l=C;r=ne(H|0,D|0,28)|0;o=C;e=oe(H|0,D|0,36)|0;o=o|C;z=ne(H|0,D|0,34)|0;G=C;y=oe(H|0,D|0,30)|0;G=o^(G|C);o=ne(H|0,D|0,39)|0;n=C;u=oe(H|0,D|0,25)|0;K=c[k>>2]|0;p=c[k+4>>2]|0;n=le((K|J)&H|K&J|0,(p|j)&D|p&j|0,(r|e)^(z|y)^(o|u)|0,G^(n|C)|0)|0;G=C;t=le(L|0,t|0,E|0,l|0)|0;L=C;c[B>>2]=t;c[B+4>>2]=L;l=le(n|0,G|0,E|0,l|0)|0;E=C;c[x>>2]=l;c[x+4>>2]=E;G=ne(t|0,L|0,14)|0;n=C;u=oe(t|0,L|0,50)|0;n=n|C;o=ne(t|0,L|0,18)|0;y=C;z=oe(t|0,L|0,46)|0;y=n^(y|C);n=ne(t|0,L|0,41)|0;e=C;r=oe(t|0,L|0,23)|0;e=y^(e|C);y=c[h+80+304>>2]|0;j=c[h+80+304+4>>2]|0;F=le(I|0,F|0,1206759142,-2117940946)|0;j=le(F|0,C|0,y|0,j|0)|0;e=le(j|0,C|0,(G|u)^(o|z)^(n|r)|0,e|0)|0;e=le(e|0,C|0,(b^v)&t^b|0,(s^q)&L^s|0)|0;r=C;n=ne(l|0,E|0,28)|0;z=C;o=oe(l|0,E|0,36)|0;z=z|C;u=ne(l|0,E|0,34)|0;G=C;j=oe(l|0,E|0,30)|0;G=z^(G|C);z=ne(l|0,E|0,39)|0;y=C;F=oe(l|0,E|0,25)|0;I=c[w>>2]|0;J=c[w+4>>2]|0;y=le((I|H)&l|I&H|0,(J|D)&E|J&D|0,(n|o)^(u|j)^(z|F)|0,G^(y|C)|0)|0;G=C;p=le(K|0,p|0,e|0,r|0)|0;K=C;c[k>>2]=p;c[k+4>>2]=K;r=le(y|0,G|0,e|0,r|0)|0;e=C;c[A>>2]=r;c[A+4>>2]=e;G=ne(p|0,K|0,14)|0;y=C;F=oe(p|0,K|0,50)|0;y=y|C;z=ne(p|0,K|0,18)|0;j=C;u=oe(p|0,K|0,46)|0;j=y^(j|C);y=ne(p|0,K|0,41)|0;o=C;n=oe(p|0,K|0,23)|0;o=j^(o|C);j=c[h+80+312>>2]|0;D=c[h+80+312+4>>2]|0;s=le(b|0,s|0,344077627,-1838011259)|0;D=le(s|0,C|0,j|0,D|0)|0;o=le(D|0,C|0,(G|F)^(z|u)^(y|n)|0,o|0)|0;o=le(o|0,C|0,(v^t)&p^v|0,(q^L)&K^q|0)|0;n=C;y=ne(r|0,e|0,28)|0;u=C;z=oe(r|0,e|0,36)|0;u=u|C;F=ne(r|0,e|0,34)|0;G=C;D=oe(r|0,e|0,30)|0;G=u^(G|C);u=ne(r|0,e|0,39)|0;j=C;s=oe(r|0,e|0,25)|0;b=c[m>>2]|0;H=c[m+4>>2]|0;j=le((b|l)&r|b&l|0,(H|E)&e|H&E|0,(y|z)^(F|D)^(u|s)|0,G^(j|C)|0)|0;G=C;J=le(I|0,J|0,o|0,n|0)|0;I=C;c[w>>2]=J;c[w+4>>2]=I;n=le(j|0,G|0,o|0,n|0)|0;o=C;c[h+16>>2]=n;c[h+16+4>>2]=o;G=ne(J|0,I|0,14)|0;j=C;s=oe(J|0,I|0,50)|0;j=j|C;u=ne(J|0,I|0,18)|0;D=C;F=oe(J|0,I|0,46)|0;D=j^(D|C);j=ne(J|0,I|0,41)|0;z=C;y=oe(J|0,I|0,23)|0;z=D^(z|C);D=c[h+80+320>>2]|0;E=c[h+80+320+4>>2]|0;q=le(v|0,q|0,1290863460,-1564481375)|0;E=le(q|0,C|0,D|0,E|0)|0;z=le(E|0,C|0,(G|s)^(u|F)^(j|y)|0,z|0)|0;z=le(z|0,C|0,(t^p)&J^t|0,(L^K)&I^L|0)|0;y=C;j=ne(n|0,o|0,28)|0;F=C;u=oe(n|0,o|0,36)|0;F=F|C;s=ne(n|0,o|0,34)|0;G=C;E=oe(n|0,o|0,30)|0;G=F^(G|C);F=ne(n|0,o|0,39)|0;D=C;q=oe(n|0,o|0,25)|0;v=c[x>>2]|0;l=c[x+4>>2]|0;D=le((v|r)&n|v&r|0,(l|e)&o|l&e|0,(j|u)^(s|E)^(F|q)|0,G^(D|C)|0)|0;G=C;H=le(b|0,H|0,z|0,y|0)|0;b=C;c[m>>2]=H;c[m+4>>2]=b;y=le(D|0,G|0,z|0,y|0)|0;z=C;c[f>>2]=y;c[f+4>>2]=z;G=ne(H|0,b|0,14)|0;D=C;q=oe(H|0,b|0,50)|0;D=D|C;F=ne(H|0,b|0,18)|0;E=C;s=oe(H|0,b|0,46)|0;E=D^(E|C);D=ne(H|0,b|0,41)|0;u=C;j=oe(H|0,b|0,23)|0;u=E^(u|C);E=c[h+80+328>>2]|0;e=c[h+80+328+4>>2]|0;L=le(t|0,L|0,-1136513023,-1474664885)|0;e=le(L|0,C|0,E|0,e|0)|0;u=le(e|0,C|0,(G|q)^(F|s)^(D|j)|0,u|0)|0;u=le(u|0,C|0,(p^J)&H^p|0,(K^I)&b^K|0)|0;j=C;D=ne(y|0,z|0,28)|0;s=C;F=oe(y|0,z|0,36)|0;s=s|C;q=ne(y|0,z|0,34)|0;G=C;e=oe(y|0,z|0,30)|0;G=s^(G|C);s=ne(y|0,z|0,39)|0;E=C;L=oe(y|0,z|0,25)|0;t=c[A>>2]|0;r=c[A+4>>2]|0;E=le((t|n)&y|t&n|0,(r|o)&z|r&o|0,(D|F)^(q|e)^(s|L)|0,G^(E|C)|0)|0;G=C;l=le(v|0,l|0,u|0,j|0)|0;v=C;c[x>>2]=l;c[x+4>>2]=v;j=le(E|0,G|0,u|0,j|0)|0;u=C;c[B>>2]=j;c[B+4>>2]=u;G=ne(l|0,v|0,14)|0;E=C;L=oe(l|0,v|0,50)|0;E=E|C;s=ne(l|0,v|0,18)|0;e=C;q=oe(l|0,v|0,46)|0;e=E^(e|C);E=ne(l|0,v|0,41)|0;F=C;D=oe(l|0,v|0,23)|0;F=e^(F|C);e=c[h+80+336>>2]|0;o=c[h+80+336+4>>2]|0;K=le(p|0,K|0,-789014639,-1035236496)|0;o=le(K|0,C|0,e|0,o|0)|0;F=le(o|0,C|0,(G|L)^(s|q)^(E|D)|0,F|0)|0;F=le(F|0,C|0,(J^H)&l^J|0,(I^b)&v^I|0)|0;D=C;E=ne(j|0,u|0,28)|0;q=C;s=oe(j|0,u|0,36)|0;q=q|C;L=ne(j|0,u|0,34)|0;G=C;o=oe(j|0,u|0,30)|0;G=q^(G|C);q=ne(j|0,u|0,39)|0;e=C;K=oe(j|0,u|0,25)|0;p=c[h+16>>2]|0;n=c[h+16+4>>2]|0;e=le((p|y)&j|p&y|0,(n|z)&u|n&z|0,(E|s)^(L|o)^(q|K)|0,G^(e|C)|0)|0;G=C;r=le(t|0,r|0,F|0,D|0)|0;t=C;c[A>>2]=r;c[A+4>>2]=t;D=le(e|0,G|0,F|0,D|0)|0;F=C;c[k>>2]=D;c[k+4>>2]=F;G=ne(r|0,t|0,14)|0;e=C;K=oe(r|0,t|0,50)|0;e=e|C;q=ne(r|0,t|0,18)|0;o=C;L=oe(r|0,t|0,46)|0;o=e^(o|C);e=ne(r|0,t|0,41)|0;s=C;E=oe(r|0,t|0,23)|0;s=o^(s|C);o=c[h+80+344>>2]|0;z=c[h+80+344+4>>2]|0;I=le(J|0,I|0,106217008,-949202525)|0;z=le(I|0,C|0,o|0,z|0)|0;s=le(z|0,C|0,(G|K)^(q|L)^(e|E)|0,s|0)|0;s=le(s|0,C|0,(H^l)&r^H|0,(b^v)&t^b|0)|0;E=C;e=ne(D|0,F|0,28)|0;L=C;q=oe(D|0,F|0,36)|0;L=L|C;K=ne(D|0,F|0,34)|0;G=C;z=oe(D|0,F|0,30)|0;G=L^(G|C);L=ne(D|0,F|0,39)|0;o=C;I=oe(D|0,F|0,25)|0;J=c[f>>2]|0;y=c[f+4>>2]|0;o=le((J|j)&D|J&j|0,(y|u)&F|y&u|0,(e|q)^(K|z)^(L|I)|0,G^(o|C)|0)|0;G=C;n=le(p|0,n|0,s|0,E|0)|0;p=C;c[h+16>>2]=n;c[h+16+4>>2]=p;E=le(o|0,G|0,s|0,E|0)|0;s=C;c[w>>2]=E;c[w+4>>2]=s;G=ne(n|0,p|0,14)|0;o=C;I=oe(n|0,p|0,50)|0;o=o|C;L=ne(n|0,p|0,18)|0;z=C;K=oe(n|0,p|0,46)|0;z=o^(z|C);o=ne(n|0,p|0,41)|0;q=C;e=oe(n|0,p|0,23)|0;q=z^(q|C);z=c[h+80+352>>2]|0;u=c[h+80+352+4>>2]|0;b=le(H|0,b|0,-688958952,-778901479)|0;u=le(b|0,C|0,z|0,u|0)|0;q=le(u|0,C|0,(G|I)^(L|K)^(o|e)|0,q|0)|0;q=le(q|0,C|0,(l^r)&n^l|0,(v^t)&p^v|0)|0;e=C;o=ne(E|0,s|0,28)|0;K=C;L=oe(E|0,s|0,36)|0;K=K|C;I=ne(E|0,s|0,34)|0;G=C;u=oe(E|0,s|0,30)|0;G=K^(G|C);K=ne(E|0,s|0,39)|0;z=C;b=oe(E|0,s|0,25)|0;H=c[B>>2]|0;j=c[B+4>>2]|0;z=le((H|D)&E|H&D|0,(j|F)&s|j&F|0,(o|L)^(I|u)^(K|b)|0,G^(z|C)|0)|0;G=C;y=le(J|0,y|0,q|0,e|0)|0;J=C;c[f>>2]=y;c[f+4>>2]=J;e=le(z|0,G|0,q|0,e|0)|0;q=C;c[m>>2]=e;c[m+4>>2]=q;G=ne(y|0,J|0,14)|0;z=C;b=oe(y|0,J|0,50)|0;z=z|C;K=ne(y|0,J|0,18)|0;u=C;I=oe(y|0,J|0,46)|0;u=z^(u|C);z=ne(y|0,J|0,41)|0;L=C;o=oe(y|0,J|0,23)|0;L=u^(L|C);u=c[h+80+360>>2]|0;F=c[h+80+360+4>>2]|0;v=le(l|0,v|0,1432725776,-694614492)|0;F=le(v|0,C|0,u|0,F|0)|0;L=le(F|0,C|0,(G|b)^(K|I)^(z|o)|0,L|0)|0;L=le(L|0,C|0,(r^n)&y^r|0,(t^p)&J^t|0)|0;o=C;z=ne(e|0,q|0,28)|0;I=C;K=oe(e|0,q|0,36)|0;I=I|C;b=ne(e|0,q|0,34)|0;G=C;F=oe(e|0,q|0,30)|0;G=I^(G|C);I=ne(e|0,q|0,39)|0;u=C;v=oe(e|0,q|0,25)|0;l=c[k>>2]|0;D=c[k+4>>2]|0;u=le((l|E)&e|l&E|0,(D|s)&q|D&s|0,(z|K)^(b|F)^(I|v)|0,G^(u|C)|0)|0;G=C;j=le(H|0,j|0,L|0,o|0)|0;H=C;c[B>>2]=j;c[B+4>>2]=H;o=le(u|0,G|0,L|0,o|0)|0;L=C;c[x>>2]=o;c[x+4>>2]=L;G=ne(j|0,H|0,14)|0;u=C;v=oe(j|0,H|0,50)|0;u=u|C;I=ne(j|0,H|0,18)|0;F=C;b=oe(j|0,H|0,46)|0;F=u^(F|C);u=ne(j|0,H|0,41)|0;K=C;z=oe(j|0,H|0,23)|0;K=F^(K|C);F=c[h+80+368>>2]|0;s=c[h+80+368+4>>2]|0;t=le(r|0,t|0,1467031594,-200395387)|0;s=le(t|0,C|0,F|0,s|0)|0;K=le(s|0,C|0,(G|v)^(I|b)^(u|z)|0,K|0)|0;K=le(K|0,C|0,(n^y)&j^n|0,(p^J)&H^p|0)|0;z=C;u=ne(o|0,L|0,28)|0;b=C;I=oe(o|0,L|0,36)|0;b=b|C;v=ne(o|0,L|0,34)|0;G=C;s=oe(o|0,L|0,30)|0;G=b^(G|C);b=ne(o|0,L|0,39)|0;F=C;t=oe(o|0,L|0,25)|0;r=c[w>>2]|0;E=c[w+4>>2]|0;F=le((r|e)&o|r&e|0,(E|q)&L|E&q|0,(u|I)^(v|s)^(b|t)|0,G^(F|C)|0)|0;G=C;D=le(l|0,D|0,K|0,z|0)|0;l=C;c[k>>2]=D;c[k+4>>2]=l;z=le(F|0,G|0,K|0,z|0)|0;K=C;c[A>>2]=z;c[A+4>>2]=K;G=ne(D|0,l|0,14)|0;F=C;t=oe(D|0,l|0,50)|0;F=F|C;b=ne(D|0,l|0,18)|0;s=C;v=oe(D|0,l|0,46)|0;s=F^(s|C);F=ne(D|0,l|0,41)|0;I=C;u=oe(D|0,l|0,23)|0;I=s^(I|C);s=c[h+80+376>>2]|0;q=c[h+80+376+4>>2]|0;p=le(n|0,p|0,851169720,275423344)|0;q=le(p|0,C|0,s|0,q|0)|0;I=le(q|0,C|0,(G|t)^(b|v)^(F|u)|0,I|0)|0;I=le(I|0,C|0,(y^j)&D^y|0,(J^H)&l^J|0)|0;u=C;F=ne(z|0,K|0,28)|0;v=C;b=oe(z|0,K|0,36)|0;v=v|C;t=ne(z|0,K|0,34)|0;G=C;q=oe(z|0,K|0,30)|0;G=v^(G|C);v=ne(z|0,K|0,39)|0;s=C;p=oe(z|0,K|0,25)|0;n=c[m>>2]|0;e=c[m+4>>2]|0;s=le((n|o)&z|n&o|0,(e|L)&K|e&L|0,(F|b)^(t|q)^(v|p)|0,G^(s|C)|0)|0;G=C;E=le(r|0,E|0,I|0,u|0)|0;r=C;c[w>>2]=E;c[w+4>>2]=r;u=le(s|0,G|0,I|0,u|0)|0;I=C;c[h+16>>2]=u;c[h+16+4>>2]=I;G=ne(E|0,r|0,14)|0;s=C;p=oe(E|0,r|0,50)|0;s=s|C;v=ne(E|0,r|0,18)|0;q=C;t=oe(E|0,r|0,46)|0;q=s^(q|C);s=ne(E|0,r|0,41)|0;b=C;F=oe(E|0,r|0,23)|0;b=q^(b|C);q=c[h+80+384>>2]|0;L=c[h+80+384+4>>2]|0;J=le(y|0,J|0,-1194143544,430227734)|0;L=le(J|0,C|0,q|0,L|0)|0;b=le(L|0,C|0,(G|p)^(v|t)^(s|F)|0,b|0)|0;b=le(b|0,C|0,(j^D)&E^j|0,(H^l)&r^H|0)|0;F=C;s=ne(u|0,I|0,28)|0;t=C;v=oe(u|0,I|0,36)|0;t=t|C;p=ne(u|0,I|0,34)|0;G=C;L=oe(u|0,I|0,30)|0;G=t^(G|C);t=ne(u|0,I|0,39)|0;q=C;J=oe(u|0,I|0,25)|0;y=c[x>>2]|0;o=c[x+4>>2]|0;q=le((y|z)&u|y&z|0,(o|K)&I|o&K|0,(s|v)^(p|L)^(t|J)|0,G^(q|C)|0)|0;G=C;e=le(n|0,e|0,b|0,F|0)|0;n=C;c[m>>2]=e;c[m+4>>2]=n;F=le(q|0,G|0,b|0,F|0)|0;b=C;c[f>>2]=F;c[f+4>>2]=b;G=ne(e|0,n|0,14)|0;q=C;J=oe(e|0,n|0,50)|0;q=q|C;t=ne(e|0,n|0,18)|0;L=C;p=oe(e|0,n|0,46)|0;L=q^(L|C);q=ne(e|0,n|0,41)|0;v=C;s=oe(e|0,n|0,23)|0;v=L^(v|C);L=c[h+80+392>>2]|0;K=c[h+80+392+4>>2]|0;H=le(j|0,H|0,1363258195,506948616)|0;K=le(H|0,C|0,L|0,K|0)|0;v=le(K|0,C|0,(G|J)^(t|p)^(q|s)|0,v|0)|0;v=le(v|0,C|0,(D^E)&e^D|0,(l^r)&n^l|0)|0;s=C;q=ne(F|0,b|0,28)|0;p=C;t=oe(F|0,b|0,36)|0;p=p|C;J=ne(F|0,b|0,34)|0;G=C;K=oe(F|0,b|0,30)|0;G=p^(G|C);p=ne(F|0,b|0,39)|0;L=C;H=oe(F|0,b|0,25)|0;j=c[A>>2]|0;z=c[A+4>>2]|0;L=le((j|u)&F|j&u|0,(z|I)&b|z&I|0,(q|t)^(J|K)^(p|H)|0,G^(L|C)|0)|0;G=C;o=le(y|0,o|0,v|0,s|0)|0;y=C;c[x>>2]=o;c[x+4>>2]=y;s=le(L|0,G|0,v|0,s|0)|0;v=C;c[B>>2]=s;c[B+4>>2]=v;G=ne(o|0,y|0,14)|0;L=C;H=oe(o|0,y|0,50)|0;L=L|C;p=ne(o|0,y|0,18)|0;K=C;J=oe(o|0,y|0,46)|0;K=L^(K|C);L=ne(o|0,y|0,41)|0;t=C;q=oe(o|0,y|0,23)|0;t=K^(t|C);K=c[h+80+400>>2]|0;I=c[h+80+400+4>>2]|0;l=le(D|0,l|0,-544281703,659060556)|0;I=le(l|0,C|0,K|0,I|0)|0;t=le(I|0,C|0,(G|H)^(p|J)^(L|q)|0,t|0)|0;t=le(t|0,C|0,(E^e)&o^E|0,(r^n)&y^r|0)|0;q=C;L=ne(s|0,v|0,28)|0;J=C;p=oe(s|0,v|0,36)|0;J=J|C;H=ne(s|0,v|0,34)|0;G=C;I=oe(s|0,v|0,30)|0;G=J^(G|C);J=ne(s|0,v|0,39)|0;K=C;l=oe(s|0,v|0,25)|0;D=c[h+16>>2]|0;u=c[h+16+4>>2]|0;K=le((D|F)&s|D&F|0,(u|b)&v|u&b|0,(L|p)^(H|I)^(J|l)|0,G^(K|C)|0)|0;G=C;z=le(j|0,z|0,t|0,q|0)|0;j=C;c[A>>2]=z;c[A+4>>2]=j;q=le(K|0,G|0,t|0,q|0)|0;t=C;c[k>>2]=q;c[k+4>>2]=t;G=ne(z|0,j|0,14)|0;K=C;l=oe(z|0,j|0,50)|0;K=K|C;J=ne(z|0,j|0,18)|0;I=C;H=oe(z|0,j|0,46)|0;I=K^(I|C);K=ne(z|0,j|0,41)|0;p=C;L=oe(z|0,j|0,23)|0;p=I^(p|C);I=c[h+80+408>>2]|0;b=c[h+80+408+4>>2]|0;r=le(E|0,r|0,-509917016,883997877)|0;b=le(r|0,C|0,I|0,b|0)|0;p=le(b|0,C|0,(G|l)^(J|H)^(K|L)|0,p|0)|0;p=le(p|0,C|0,(e^o)&z^e|0,(n^y)&j^n|0)|0;L=C;K=ne(q|0,t|0,28)|0;H=C;J=oe(q|0,t|0,36)|0;H=H|C;l=ne(q|0,t|0,34)|0;G=C;b=oe(q|0,t|0,30)|0;G=H^(G|C);H=ne(q|0,t|0,39)|0;I=C;r=oe(q|0,t|0,25)|0;E=c[f>>2]|0;F=c[f+4>>2]|0;I=le((E|s)&q|E&s|0,(F|v)&t|F&v|0,(K|J)^(l|b)^(H|r)|0,G^(I|C)|0)|0;G=C;u=le(D|0,u|0,p|0,L|0)|0;D=C;c[h+16>>2]=u;c[h+16+4>>2]=D;L=le(I|0,G|0,p|0,L|0)|0;p=C;c[w>>2]=L;c[w+4>>2]=p;G=ne(u|0,D|0,14)|0;I=C;r=oe(u|0,D|0,50)|0;I=I|C;H=ne(u|0,D|0,18)|0;b=C;l=oe(u|0,D|0,46)|0;b=I^(b|C);I=ne(u|0,D|0,41)|0;J=C;K=oe(u|0,D|0,23)|0;J=b^(J|C);b=c[h+80+416>>2]|0;v=c[h+80+416+4>>2]|0;n=le(e|0,n|0,-976659869,958139571)|0;v=le(n|0,C|0,b|0,v|0)|0;J=le(v|0,C|0,(G|r)^(H|l)^(I|K)|0,J|0)|0;J=le(J|0,C|0,(o^z)&u^o|0,(y^j)&D^y|0)|0;K=C;I=ne(L|0,p|0,28)|0;l=C;H=oe(L|0,p|0,36)|0;l=l|C;r=ne(L|0,p|0,34)|0;G=C;v=oe(L|0,p|0,30)|0;G=l^(G|C);l=ne(L|0,p|0,39)|0;b=C;n=oe(L|0,p|0,25)|0;e=c[B>>2]|0;s=c[B+4>>2]|0;b=le((e|q)&L|e&q|0,(s|t)&p|s&t|0,(I|H)^(r|v)^(l|n)|0,G^(b|C)|0)|0;G=C;F=le(E|0,F|0,J|0,K|0)|0;E=C;c[f>>2]=F;c[f+4>>2]=E;K=le(b|0,G|0,J|0,K|0)|0;J=C;c[m>>2]=K;c[m+4>>2]=J;G=ne(F|0,E|0,14)|0;b=C;n=oe(F|0,E|0,50)|0;b=b|C;l=ne(F|0,E|0,18)|0;v=C;r=oe(F|0,E|0,46)|0;v=b^(v|C);b=ne(F|0,E|0,41)|0;H=C;I=oe(F|0,E|0,23)|0;H=v^(H|C);v=c[h+80+424>>2]|0;t=c[h+80+424+4>>2]|0;y=le(o|0,y|0,-482243893,1322822218)|0;t=le(y|0,C|0,v|0,t|0)|0;H=le(t|0,C|0,(G|n)^(l|r)^(b|I)|0,H|0)|0;H=le(H|0,C|0,(z^u)&F^z|0,(j^D)&E^j|0)|0;I=C;b=ne(K|0,J|0,28)|0;r=C;l=oe(K|0,J|0,36)|0;r=r|C;n=ne(K|0,J|0,34)|0;G=C;t=oe(K|0,J|0,30)|0;G=r^(G|C);r=ne(K|0,J|0,39)|0;v=C;y=oe(K|0,J|0,25)|0;o=c[k>>2]|0;q=c[k+4>>2]|0;v=le((o|L)&K|o&L|0,(q|p)&J|q&p|0,(b|l)^(n|t)^(r|y)|0,G^(v|C)|0)|0;G=C;s=le(e|0,s|0,H|0,I|0)|0;e=C;c[B>>2]=s;c[B+4>>2]=e;I=le(v|0,G|0,H|0,I|0)|0;H=C;c[x>>2]=I;c[x+4>>2]=H;G=ne(s|0,e|0,14)|0;v=C;y=oe(s|0,e|0,50)|0;v=v|C;r=ne(s|0,e|0,18)|0;t=C;n=oe(s|0,e|0,46)|0;t=v^(t|C);v=ne(s|0,e|0,41)|0;l=C;b=oe(s|0,e|0,23)|0;l=t^(l|C);t=c[h+80+432>>2]|0;p=c[h+80+432+4>>2]|0;j=le(z|0,j|0,2003034995,1537002063)|0;p=le(j|0,C|0,t|0,p|0)|0;l=le(p|0,C|0,(G|y)^(r|n)^(v|b)|0,l|0)|0;l=le(l|0,C|0,(u^F)&s^u|0,(D^E)&e^D|0)|0;b=C;v=ne(I|0,H|0,28)|0;n=C;r=oe(I|0,H|0,36)|0;n=n|C;y=ne(I|0,H|0,34)|0;G=C;p=oe(I|0,H|0,30)|0;G=n^(G|C);n=ne(I|0,H|0,39)|0;t=C;j=oe(I|0,H|0,25)|0;z=c[w>>2]|0;L=c[w+4>>2]|0;t=le((z|K)&I|z&K|0,(L|J)&H|L&J|0,(v|r)^(y|p)^(n|j)|0,G^(t|C)|0)|0;G=C;q=le(o|0,q|0,l|0,b|0)|0;o=C;c[k>>2]=q;c[k+4>>2]=o;b=le(t|0,G|0,l|0,b|0)|0;l=C;c[A>>2]=b;c[A+4>>2]=l;G=ne(q|0,o|0,14)|0;t=C;j=oe(q|0,o|0,50)|0;t=t|C;n=ne(q|0,o|0,18)|0;p=C;y=oe(q|0,o|0,46)|0;p=t^(p|C);t=ne(q|0,o|0,41)|0;r=C;v=oe(q|0,o|0,23)|0;r=p^(r|C);p=c[h+80+440>>2]|0;J=c[h+80+440+4>>2]|0;D=le(u|0,D|0,-692930397,1747873779)|0;J=le(D|0,C|0,p|0,J|0)|0;r=le(J|0,C|0,(G|j)^(n|y)^(t|v)|0,r|0)|0;r=le(r|0,C|0,(F^s)&q^F|0,(E^e)&o^E|0)|0;v=C;t=ne(b|0,l|0,28)|0;y=C;n=oe(b|0,l|0,36)|0;y=y|C;j=ne(b|0,l|0,34)|0;G=C;J=oe(b|0,l|0,30)|0;G=y^(G|C);y=ne(b|0,l|0,39)|0;p=C;D=oe(b|0,l|0,25)|0;u=c[m>>2]|0;K=c[m+4>>2]|0;p=le((u|I)&b|u&I|0,(K|H)&l|K&H|0,(t|n)^(j|J)^(y|D)|0,G^(p|C)|0)|0;G=C;L=le(z|0,L|0,r|0,v|0)|0;z=C;c[w>>2]=L;c[w+4>>2]=z;v=le(p|0,G|0,r|0,v|0)|0;r=C;c[h+16>>2]=v;c[h+16+4>>2]=r;G=ne(L|0,z|0,14)|0;p=C;D=oe(L|0,z|0,50)|0;p=p|C;y=ne(L|0,z|0,18)|0;J=C;j=oe(L|0,z|0,46)|0;J=p^(J|C);p=ne(L|0,z|0,41)|0;n=C;t=oe(L|0,z|0,23)|0;n=J^(n|C);J=c[h+80+448>>2]|0;H=c[h+80+448+4>>2]|0;E=le(F|0,E|0,1575990012,1955562222)|0;H=le(E|0,C|0,J|0,H|0)|0;n=le(H|0,C|0,(G|D)^(y|j)^(p|t)|0,n|0)|0;n=le(n|0,C|0,(s^q)&L^s|0,(e^o)&z^e|0)|0;t=C;p=ne(v|0,r|0,28)|0;j=C;y=oe(v|0,r|0,36)|0;j=j|C;D=ne(v|0,r|0,34)|0;G=C;H=oe(v|0,r|0,30)|0;G=j^(G|C);j=ne(v|0,r|0,39)|0;J=C;E=oe(v|0,r|0,25)|0;F=c[x>>2]|0;I=c[x+4>>2]|0;J=le((F|b)&v|F&b|0,(I|l)&r|I&l|0,(p|y)^(D|H)^(j|E)|0,G^(J|C)|0)|0;G=C;K=le(u|0,K|0,n|0,t|0)|0;u=C;c[m>>2]=K;c[m+4>>2]=u;t=le(J|0,G|0,n|0,t|0)|0;n=C;c[f>>2]=t;c[f+4>>2]=n;G=ne(K|0,u|0,14)|0;J=C;E=oe(K|0,u|0,50)|0;J=J|C;j=ne(K|0,u|0,18)|0;H=C;D=oe(K|0,u|0,46)|0;H=J^(H|C);J=ne(K|0,u|0,41)|0;y=C;p=oe(K|0,u|0,23)|0;y=H^(y|C);H=c[h+80+456>>2]|0;l=c[h+80+456+4>>2]|0;e=le(s|0,e|0,1125592928,2024104815)|0;l=le(e|0,C|0,H|0,l|0)|0;y=le(l|0,C|0,(G|E)^(j|D)^(J|p)|0,y|0)|0;y=le(y|0,C|0,(q^L)&K^q|0,(o^z)&u^o|0)|0;p=C;J=ne(t|0,n|0,28)|0;D=C;j=oe(t|0,n|0,36)|0;D=D|C;E=ne(t|0,n|0,34)|0;G=C;l=oe(t|0,n|0,30)|0;G=D^(G|C);D=ne(t|0,n|0,39)|0;H=C;e=oe(t|0,n|0,25)|0;s=c[A>>2]|0;b=c[A+4>>2]|0;H=le((s|v)&t|s&v|0,(b|r)&n|b&r|0,(J|j)^(E|l)^(D|e)|0,G^(H|C)|0)|0;G=C;I=le(F|0,I|0,y|0,p|0)|0;F=C;c[x>>2]=I;c[x+4>>2]=F;p=le(H|0,G|0,y|0,p|0)|0;y=C;c[B>>2]=p;c[B+4>>2]=y;G=ne(I|0,F|0,14)|0;H=C;e=oe(I|0,F|0,50)|0;H=H|C;D=ne(I|0,F|0,18)|0;l=C;E=oe(I|0,F|0,46)|0;l=H^(l|C);H=ne(I|0,F|0,41)|0;j=C;J=oe(I|0,F|0,23)|0;j=l^(j|C);l=c[h+80+464>>2]|0;r=c[h+80+464+4>>2]|0;o=le(q|0,o|0,-1578062990,-2067236844)|0;r=le(o|0,C|0,l|0,r|0)|0;j=le(r|0,C|0,(G|e)^(D|E)^(H|J)|0,j|0)|0;j=le(j|0,C|0,(L^K)&I^L|0,(z^u)&F^z|0)|0;J=C;H=ne(p|0,y|0,28)|0;E=C;D=oe(p|0,y|0,36)|0;E=E|C;e=ne(p|0,y|0,34)|0;G=C;r=oe(p|0,y|0,30)|0;G=E^(G|C);E=ne(p|0,y|0,39)|0;l=C;o=oe(p|0,y|0,25)|0;q=c[h+16>>2]|0;v=c[h+16+4>>2]|0;l=le((q|t)&p|q&t|0,(v|n)&y|v&n|0,(H|D)^(e|r)^(E|o)|0,G^(l|C)|0)|0;G=C;b=le(s|0,b|0,j|0,J|0)|0;s=C;c[A>>2]=b;c[A+4>>2]=s;J=le(l|0,G|0,j|0,J|0)|0;j=C;c[k>>2]=J;c[k+4>>2]=j;G=ne(b|0,s|0,14)|0;l=C;o=oe(b|0,s|0,50)|0;l=l|C;E=ne(b|0,s|0,18)|0;r=C;e=oe(b|0,s|0,46)|0;r=l^(r|C);l=ne(b|0,s|0,41)|0;D=C;H=oe(b|0,s|0,23)|0;D=r^(D|C);r=c[h+80+472>>2]|0;n=c[h+80+472+4>>2]|0;z=le(L|0,z|0,442776044,-1933114872)|0;n=le(z|0,C|0,r|0,n|0)|0;D=le(n|0,C|0,(G|o)^(E|e)^(l|H)|0,D|0)|0;D=le(D|0,C|0,(K^I)&b^K|0,(u^F)&s^u|0)|0;H=C;l=ne(J|0,j|0,28)|0;e=C;E=oe(J|0,j|0,36)|0;e=e|C;o=ne(J|0,j|0,34)|0;G=C;n=oe(J|0,j|0,30)|0;G=e^(G|C);e=ne(J|0,j|0,39)|0;r=C;z=oe(J|0,j|0,25)|0;L=c[f>>2]|0;t=c[f+4>>2]|0;r=le((L|p)&J|L&p|0,(t|y)&j|t&y|0,(l|E)^(o|n)^(e|z)|0,G^(r|C)|0)|0;G=C;v=le(q|0,v|0,D|0,H|0)|0;q=C;c[h+16>>2]=v;c[h+16+4>>2]=q;H=le(r|0,G|0,D|0,H|0)|0;D=C;c[w>>2]=H;c[w+4>>2]=D;G=ne(v|0,q|0,14)|0;r=C;z=oe(v|0,q|0,50)|0;r=r|C;e=ne(v|0,q|0,18)|0;n=C;o=oe(v|0,q|0,46)|0;n=r^(n|C);r=ne(v|0,q|0,41)|0;E=C;l=oe(v|0,q|0,23)|0;E=n^(E|C);n=c[h+80+480>>2]|0;y=c[h+80+480+4>>2]|0;u=le(K|0,u|0,593698344,-1866530822)|0;y=le(u|0,C|0,n|0,y|0)|0;E=le(y|0,C|0,(G|z)^(e|o)^(r|l)|0,E|0)|0;E=le(E|0,C|0,(I^b)&v^I|0,(F^s)&q^F|0)|0;l=C;r=ne(H|0,D|0,28)|0;o=C;e=oe(H|0,D|0,36)|0;o=o|C;z=ne(H|0,D|0,34)|0;G=C;y=oe(H|0,D|0,30)|0;G=o^(G|C);o=ne(H|0,D|0,39)|0;n=C;u=oe(H|0,D|0,25)|0;K=c[B>>2]|0;p=c[B+4>>2]|0;n=le((K|J)&H|K&J|0,(p|j)&D|p&j|0,(r|e)^(z|y)^(o|u)|0,G^(n|C)|0)|0;G=C;t=le(L|0,t|0,E|0,l|0)|0;L=C;c[f>>2]=t;c[f+4>>2]=L;l=le(n|0,G|0,E|0,l|0)|0;E=C;c[m>>2]=l;c[m+4>>2]=E;G=ne(t|0,L|0,14)|0;n=C;u=oe(t|0,L|0,50)|0;n=n|C;o=ne(t|0,L|0,18)|0;y=C;z=oe(t|0,L|0,46)|0;y=n^(y|C);n=ne(t|0,L|0,41)|0;e=C;r=oe(t|0,L|0,23)|0;e=y^(e|C);y=c[h+80+488>>2]|0;j=c[h+80+488+4>>2]|0;F=le(I|0,F|0,-561857047,-1538233109)|0;j=le(F|0,C|0,y|0,j|0)|0;e=le(j|0,C|0,(G|u)^(o|z)^(n|r)|0,e|0)|0;e=le(e|0,C|0,(b^v)&t^b|0,(s^q)&L^s|0)|0;r=C;n=ne(l|0,E|0,28)|0;z=C;o=oe(l|0,E|0,36)|0;z=z|C;u=ne(l|0,E|0,34)|0;G=C;j=oe(l|0,E|0,30)|0;G=z^(G|C);z=ne(l|0,E|0,39)|0;y=C;F=oe(l|0,E|0,25)|0;I=c[k>>2]|0;J=c[k+4>>2]|0;y=le((I|H)&l|I&H|0,(J|D)&E|J&D|0,(n|o)^(u|j)^(z|F)|0,G^(y|C)|0)|0;G=C;p=le(K|0,p|0,e|0,r|0)|0;K=C;c[B>>2]=p;c[B+4>>2]=K;r=le(y|0,G|0,e|0,r|0)|0;e=C;c[x>>2]=r;c[x+4>>2]=e;G=ne(p|0,K|0,14)|0;y=C;F=oe(p|0,K|0,50)|0;y=y|C;z=ne(p|0,K|0,18)|0;j=C;u=oe(p|0,K|0,46)|0;j=y^(j|C);y=ne(p|0,K|0,41)|0;o=C;n=oe(p|0,K|0,23)|0;o=j^(o|C);j=c[h+80+496>>2]|0;D=c[h+80+496+4>>2]|0;s=le(b|0,s|0,-1295615723,-1090935817)|0;D=le(s|0,C|0,j|0,D|0)|0;o=le(D|0,C|0,(G|F)^(z|u)^(y|n)|0,o|0)|0;o=le(o|0,C|0,(v^t)&p^v|0,(q^L)&K^q|0)|0;n=C;y=ne(r|0,e|0,28)|0;u=C;z=oe(r|0,e|0,36)|0;u=u|C;F=ne(r|0,e|0,34)|0;G=C;D=oe(r|0,e|0,30)|0;G=u^(G|C);u=ne(r|0,e|0,39)|0;j=C;s=oe(r|0,e|0,25)|0;b=c[w>>2]|0;H=c[w+4>>2]|0;j=le((b|l)&r|b&l|0,(H|E)&e|H&E|0,(y|z)^(F|D)^(u|s)|0,G^(j|C)|0)|0;G=C;J=le(I|0,J|0,o|0,n|0)|0;I=C;c[k>>2]=J;c[k+4>>2]=I;n=le(j|0,G|0,o|0,n|0)|0;o=C;c[A>>2]=n;c[A+4>>2]=o;G=ne(J|0,I|0,14)|0;j=C;s=oe(J|0,I|0,50)|0;j=j|C;u=ne(J|0,I|0,18)|0;D=C;F=oe(J|0,I|0,46)|0;D=j^(D|C);j=ne(J|0,I|0,41)|0;z=C;y=oe(J|0,I|0,23)|0;z=D^(z|C);D=c[h+80+504>>2]|0;E=c[h+80+504+4>>2]|0;q=le(v|0,q|0,-479046869,-965641998)|0;E=le(q|0,C|0,D|0,E|0)|0;z=le(E|0,C|0,(G|s)^(u|F)^(j|y)|0,z|0)|0;z=le(z|0,C|0,(t^p)&J^t|0,(L^K)&I^L|0)|0;y=C;j=ne(n|0,o|0,28)|0;F=C;u=oe(n|0,o|0,36)|0;F=F|C;s=ne(n|0,o|0,34)|0;G=C;E=oe(n|0,o|0,30)|0;G=F^(G|C);F=ne(n|0,o|0,39)|0;D=C;q=oe(n|0,o|0,25)|0;v=c[m>>2]|0;l=c[m+4>>2]|0;D=le((v|r)&n|v&r|0,(l|e)&o|l&e|0,(j|u)^(s|E)^(F|q)|0,G^(D|C)|0)|0;G=C;H=le(b|0,H|0,z|0,y|0)|0;b=C;c[w>>2]=H;c[w+4>>2]=b;y=le(D|0,G|0,z|0,y|0)|0;z=C;c[h+16>>2]=y;c[h+16+4>>2]=z;G=ne(H|0,b|0,14)|0;D=C;q=oe(H|0,b|0,50)|0;D=D|C;F=ne(H|0,b|0,18)|0;E=C;s=oe(H|0,b|0,46)|0;E=D^(E|C);D=ne(H|0,b|0,41)|0;u=C;j=oe(H|0,b|0,23)|0;u=E^(u|C);E=c[h+80+512>>2]|0;e=c[h+80+512+4>>2]|0;L=le(t|0,L|0,-366583396,-903397682)|0;e=le(L|0,C|0,E|0,e|0)|0;u=le(e|0,C|0,(G|q)^(F|s)^(D|j)|0,u|0)|0;u=le(u|0,C|0,(p^J)&H^p|0,(K^I)&b^K|0)|0;j=C;D=ne(y|0,z|0,28)|0;s=C;F=oe(y|0,z|0,36)|0;s=s|C;q=ne(y|0,z|0,34)|0;G=C;e=oe(y|0,z|0,30)|0;G=s^(G|C);s=ne(y|0,z|0,39)|0;E=C;L=oe(y|0,z|0,25)|0;t=c[x>>2]|0;r=c[x+4>>2]|0;E=le((t|n)&y|t&n|0,(r|o)&z|r&o|0,(D|F)^(q|e)^(s|L)|0,G^(E|C)|0)|0;G=C;l=le(v|0,l|0,u|0,j|0)|0;v=C;c[m>>2]=l;c[m+4>>2]=v;j=le(E|0,G|0,u|0,j|0)|0;u=C;c[f>>2]=j;c[f+4>>2]=u;G=ne(l|0,v|0,14)|0;E=C;L=oe(l|0,v|0,50)|0;E=E|C;s=ne(l|0,v|0,18)|0;e=C;q=oe(l|0,v|0,46)|0;e=E^(e|C);E=ne(l|0,v|0,41)|0;F=C;D=oe(l|0,v|0,23)|0;F=e^(F|C);e=c[h+80+520>>2]|0;o=c[h+80+520+4>>2]|0;K=le(p|0,K|0,566280711,-779700025)|0;o=le(K|0,C|0,e|0,o|0)|0;F=le(o|0,C|0,(G|L)^(s|q)^(E|D)|0,F|0)|0;F=le(F|0,C|0,(J^H)&l^J|0,(I^b)&v^I|0)|0;D=C;E=ne(j|0,u|0,28)|0;q=C;s=oe(j|0,u|0,36)|0;q=q|C;L=ne(j|0,u|0,34)|0;G=C;o=oe(j|0,u|0,30)|0;G=q^(G|C);q=ne(j|0,u|0,39)|0;e=C;K=oe(j|0,u|0,25)|0;p=c[A>>2]|0;n=c[A+4>>2]|0;e=le((p|y)&j|p&y|0,(n|z)&u|n&z|0,(E|s)^(L|o)^(q|K)|0,G^(e|C)|0)|0;G=C;r=le(t|0,r|0,F|0,D|0)|0;t=C;c[x>>2]=r;c[x+4>>2]=t;D=le(e|0,G|0,F|0,D|0)|0;F=C;c[B>>2]=D;c[B+4>>2]=F;G=ne(r|0,t|0,14)|0;e=C;K=oe(r|0,t|0,50)|0;e=e|C;q=ne(r|0,t|0,18)|0;o=C;L=oe(r|0,t|0,46)|0;o=e^(o|C);e=ne(r|0,t|0,41)|0;s=C;E=oe(r|0,t|0,23)|0;s=o^(s|C);o=c[h+80+528>>2]|0;z=c[h+80+528+4>>2]|0;I=le(J|0,I|0,-840897762,-354779690)|0;z=le(I|0,C|0,o|0,z|0)|0;s=le(z|0,C|0,(G|K)^(q|L)^(e|E)|0,s|0)|0;s=le(s|0,C|0,(H^l)&r^H|0,(b^v)&t^b|0)|0;E=C;e=ne(D|0,F|0,28)|0;L=C;q=oe(D|0,F|0,36)|0;L=L|C;K=ne(D|0,F|0,34)|0;G=C;z=oe(D|0,F|0,30)|0;G=L^(G|C);L=ne(D|0,F|0,39)|0;o=C;I=oe(D|0,F|0,25)|0;J=c[h+16>>2]|0;y=c[h+16+4>>2]|0;o=le((J|j)&D|J&j|0,(y|u)&F|y&u|0,(e|q)^(K|z)^(L|I)|0,G^(o|C)|0)|0;G=C;n=le(p|0,n|0,s|0,E|0)|0;p=C;c[A>>2]=n;c[A+4>>2]=p;E=le(o|0,G|0,s|0,E|0)|0;s=C;c[k>>2]=E;c[k+4>>2]=s;G=ne(n|0,p|0,14)|0;o=C;I=oe(n|0,p|0,50)|0;o=o|C;L=ne(n|0,p|0,18)|0;z=C;K=oe(n|0,p|0,46)|0;z=o^(z|C);o=ne(n|0,p|0,41)|0;q=C;e=oe(n|0,p|0,23)|0;q=z^(q|C);z=c[h+80+536>>2]|0;u=c[h+80+536+4>>2]|0;b=le(H|0,b|0,-294727304,-176337025)|0;u=le(b|0,C|0,z|0,u|0)|0;q=le(u|0,C|0,(G|I)^(L|K)^(o|e)|0,q|0)|0;q=le(q|0,C|0,(l^r)&n^l|0,(v^t)&p^v|0)|0;e=C;o=ne(E|0,s|0,28)|0;K=C;L=oe(E|0,s|0,36)|0;K=K|C;I=ne(E|0,s|0,34)|0;G=C;u=oe(E|0,s|0,30)|0;G=K^(G|C);K=ne(E|0,s|0,39)|0;z=C;b=oe(E|0,s|0,25)|0;H=c[f>>2]|0;j=c[f+4>>2]|0;z=le((H|D)&E|H&D|0,(j|F)&s|j&F|0,(o|L)^(I|u)^(K|b)|0,G^(z|C)|0)|0;G=C;y=le(J|0,y|0,q|0,e|0)|0;J=C;c[h+16>>2]=y;c[h+16+4>>2]=J;e=le(z|0,G|0,q|0,e|0)|0;q=C;c[w>>2]=e;c[w+4>>2]=q;G=ne(y|0,J|0,14)|0;z=C;b=oe(y|0,J|0,50)|0;z=z|C;K=ne(y|0,J|0,18)|0;u=C;I=oe(y|0,J|0,46)|0;u=z^(u|C);z=ne(y|0,J|0,41)|0;L=C;o=oe(y|0,J|0,23)|0;L=u^(L|C);u=c[h+80+544>>2]|0;F=c[h+80+544+4>>2]|0;v=le(l|0,v|0,1914138554,116418474)|0;F=le(v|0,C|0,u|0,F|0)|0;L=le(F|0,C|0,(G|b)^(K|I)^(z|o)|0,L|0)|0;L=le(L|0,C|0,(r^n)&y^r|0,(t^p)&J^t|0)|0;o=C;z=ne(e|0,q|0,28)|0;I=C;K=oe(e|0,q|0,36)|0;I=I|C;b=ne(e|0,q|0,34)|0;G=C;F=oe(e|0,q|0,30)|0;G=I^(G|C);I=ne(e|0,q|0,39)|0;u=C;v=oe(e|0,q|0,25)|0;l=c[B>>2]|0;D=c[B+4>>2]|0;u=le((l|E)&e|l&E|0,(D|s)&q|D&s|0,(z|K)^(b|F)^(I|v)|0,G^(u|C)|0)|0;G=C;j=le(H|0,j|0,L|0,o|0)|0;H=C;c[f>>2]=j;c[f+4>>2]=H;o=le(u|0,G|0,L|0,o|0)|0;L=C;c[m>>2]=o;c[m+4>>2]=L;G=ne(j|0,H|0,14)|0;u=C;v=oe(j|0,H|0,50)|0;u=u|C;I=ne(j|0,H|0,18)|0;F=C;b=oe(j|0,H|0,46)|0;F=u^(F|C);u=ne(j|0,H|0,41)|0;K=C;z=oe(j|0,H|0,23)|0;K=F^(K|C);F=c[h+80+552>>2]|0;s=c[h+80+552+4>>2]|0;t=le(r|0,t|0,-1563912026,174292421)|0;s=le(t|0,C|0,F|0,s|0)|0;K=le(s|0,C|0,(G|v)^(I|b)^(u|z)|0,K|0)|0;K=le(K|0,C|0,(n^y)&j^n|0,(p^J)&H^p|0)|0;z=C;u=ne(o|0,L|0,28)|0;b=C;I=oe(o|0,L|0,36)|0;b=b|C;v=ne(o|0,L|0,34)|0;G=C;s=oe(o|0,L|0,30)|0;G=b^(G|C);b=ne(o|0,L|0,39)|0;F=C;t=oe(o|0,L|0,25)|0;r=c[k>>2]|0;E=c[k+4>>2]|0;F=le((r|e)&o|r&e|0,(E|q)&L|E&q|0,(u|I)^(v|s)^(b|t)|0,G^(F|C)|0)|0;G=C;D=le(l|0,D|0,K|0,z|0)|0;l=C;c[B>>2]=D;c[B+4>>2]=l;z=le(F|0,G|0,K|0,z|0)|0;K=C;c[x>>2]=z;c[x+4>>2]=K;G=ne(D|0,l|0,14)|0;F=C;t=oe(D|0,l|0,50)|0;F=F|C;b=ne(D|0,l|0,18)|0;s=C;v=oe(D|0,l|0,46)|0;s=F^(s|C);F=ne(D|0,l|0,41)|0;I=C;u=oe(D|0,l|0,23)|0;I=s^(I|C);s=c[h+80+560>>2]|0;q=c[h+80+560+4>>2]|0;p=le(n|0,p|0,-1090974290,289380356)|0;q=le(p|0,C|0,s|0,q|0)|0;I=le(q|0,C|0,(G|t)^(b|v)^(F|u)|0,I|0)|0;I=le(I|0,C|0,(y^j)&D^y|0,(J^H)&l^J|0)|0;u=C;F=ne(z|0,K|0,28)|0;v=C;b=oe(z|0,K|0,36)|0;v=v|C;t=ne(z|0,K|0,34)|0;G=C;q=oe(z|0,K|0,30)|0;G=v^(G|C);v=ne(z|0,K|0,39)|0;s=C;p=oe(z|0,K|0,25)|0;n=c[w>>2]|0;e=c[w+4>>2]|0;s=le((n|o)&z|n&o|0,(e|L)&K|e&L|0,(F|b)^(t|q)^(v|p)|0,G^(s|C)|0)|0;G=C;E=le(r|0,E|0,I|0,u|0)|0;r=C;c[k>>2]=E;c[k+4>>2]=r;u=le(s|0,G|0,I|0,u|0)|0;I=C;c[A>>2]=u;c[A+4>>2]=I;G=ne(E|0,r|0,14)|0;s=C;p=oe(E|0,r|0,50)|0;s=s|C;v=ne(E|0,r|0,18)|0;q=C;t=oe(E|0,r|0,46)|0;q=s^(q|C);s=ne(E|0,r|0,41)|0;b=C;F=oe(E|0,r|0,23)|0;b=q^(b|C);q=c[h+80+568>>2]|0;L=c[h+80+568+4>>2]|0;J=le(y|0,J|0,320620315,460393269)|0;L=le(J|0,C|0,q|0,L|0)|0;b=le(L|0,C|0,(G|p)^(v|t)^(s|F)|0,b|0)|0;b=le(b|0,C|0,(j^D)&E^j|0,(H^l)&r^H|0)|0;F=C;s=ne(u|0,I|0,28)|0;t=C;v=oe(u|0,I|0,36)|0;t=t|C;p=ne(u|0,I|0,34)|0;G=C;L=oe(u|0,I|0,30)|0;G=t^(G|C);t=ne(u|0,I|0,39)|0;q=C;J=oe(u|0,I|0,25)|0;y=c[m>>2]|0;o=c[m+4>>2]|0;q=le((y|z)&u|y&z|0,(o|K)&I|o&K|0,(s|v)^(p|L)^(t|J)|0,G^(q|C)|0)|0;G=C;e=le(n|0,e|0,b|0,F|0)|0;n=C;c[w>>2]=e;c[w+4>>2]=n;F=le(q|0,G|0,b|0,F|0)|0;b=C;c[h+16>>2]=F;c[h+16+4>>2]=b;G=ne(e|0,n|0,14)|0;q=C;J=oe(e|0,n|0,50)|0;q=q|C;t=ne(e|0,n|0,18)|0;L=C;p=oe(e|0,n|0,46)|0;L=q^(L|C);q=ne(e|0,n|0,41)|0;v=C;s=oe(e|0,n|0,23)|0;v=L^(v|C);L=c[h+80+576>>2]|0;K=c[h+80+576+4>>2]|0;H=le(j|0,H|0,587496836,685471733)|0;K=le(H|0,C|0,L|0,K|0)|0;v=le(K|0,C|0,(G|J)^(t|p)^(q|s)|0,v|0)|0;v=le(v|0,C|0,(D^E)&e^D|0,(l^r)&n^l|0)|0;s=C;q=ne(F|0,b|0,28)|0;p=C;t=oe(F|0,b|0,36)|0;p=p|C;J=ne(F|0,b|0,34)|0;G=C;K=oe(F|0,b|0,30)|0;G=p^(G|C);p=ne(F|0,b|0,39)|0;L=C;H=oe(F|0,b|0,25)|0;j=c[x>>2]|0;z=c[x+4>>2]|0;L=le((j|u)&F|j&u|0,(z|I)&b|z&I|0,(q|t)^(J|K)^(p|H)|0,G^(L|C)|0)|0;G=C;o=le(y|0,o|0,v|0,s|0)|0;y=C;c[m>>2]=o;c[m+4>>2]=y;s=le(L|0,G|0,v|0,s|0)|0;v=C;c[f>>2]=s;c[f+4>>2]=v;G=ne(o|0,y|0,14)|0;L=C;H=oe(o|0,y|0,50)|0;L=L|C;p=ne(o|0,y|0,18)|0;K=C;J=oe(o|0,y|0,46)|0;K=L^(K|C);L=ne(o|0,y|0,41)|0;t=C;q=oe(o|0,y|0,23)|0;t=K^(t|C);K=c[h+80+584>>2]|0;I=c[h+80+584+4>>2]|0;l=le(D|0,l|0,1086792851,852142971)|0;I=le(l|0,C|0,K|0,I|0)|0;t=le(I|0,C|0,(G|H)^(p|J)^(L|q)|0,t|0)|0;t=le(t|0,C|0,(E^e)&o^E|0,(r^n)&y^r|0)|0;q=C;L=ne(s|0,v|0,28)|0;J=C;p=oe(s|0,v|0,36)|0;J=J|C;H=ne(s|0,v|0,34)|0;G=C;I=oe(s|0,v|0,30)|0;G=J^(G|C);J=ne(s|0,v|0,39)|0;K=C;l=oe(s|0,v|0,25)|0;D=c[A>>2]|0;u=c[A+4>>2]|0;K=le((D|F)&s|D&F|0,(u|b)&v|u&b|0,(L|p)^(H|I)^(J|l)|0,G^(K|C)|0)|0;G=C;z=le(j|0,z|0,t|0,q|0)|0;j=C;c[x>>2]=z;c[x+4>>2]=j;q=le(K|0,G|0,t|0,q|0)|0;t=C;c[B>>2]=q;c[B+4>>2]=t;G=ne(z|0,j|0,14)|0;K=C;l=oe(z|0,j|0,50)|0;K=K|C;J=ne(z|0,j|0,18)|0;I=C;H=oe(z|0,j|0,46)|0;I=K^(I|C);K=ne(z|0,j|0,41)|0;p=C;L=oe(z|0,j|0,23)|0;p=I^(p|C);I=c[h+80+592>>2]|0;b=c[h+80+592+4>>2]|0;r=le(E|0,r|0,365543100,1017036298)|0;b=le(r|0,C|0,I|0,b|0)|0;p=le(b|0,C|0,(G|l)^(J|H)^(K|L)|0,p|0)|0;p=le(p|0,C|0,(e^o)&z^e|0,(n^y)&j^n|0)|0;L=C;K=ne(q|0,t|0,28)|0;H=C;J=oe(q|0,t|0,36)|0;H=H|C;l=ne(q|0,t|0,34)|0;G=C;b=oe(q|0,t|0,30)|0;G=H^(G|C);H=ne(q|0,t|0,39)|0;I=C;r=oe(q|0,t|0,25)|0;E=c[h+16>>2]|0;F=c[h+16+4>>2]|0;I=le((E|s)&q|E&s|0,(F|v)&t|F&v|0,(K|J)^(l|b)^(H|r)|0,G^(I|C)|0)|0;G=C;u=le(D|0,u|0,p|0,L|0)|0;D=C;c[A>>2]=u;c[A+4>>2]=D;L=le(I|0,G|0,p|0,L|0)|0;p=C;c[k>>2]=L;c[k+4>>2]=p;G=ne(u|0,D|0,14)|0;I=C;r=oe(u|0,D|0,50)|0;I=I|C;H=ne(u|0,D|0,18)|0;b=C;l=oe(u|0,D|0,46)|0;b=I^(b|C);I=ne(u|0,D|0,41)|0;J=C;K=oe(u|0,D|0,23)|0;J=b^(J|C);b=c[h+80+600>>2]|0;v=c[h+80+600+4>>2]|0;n=le(e|0,n|0,-1676669620,1126000580)|0;v=le(n|0,C|0,b|0,v|0)|0;J=le(v|0,C|0,(G|r)^(H|l)^(I|K)|0,J|0)|0;J=le(J|0,C|0,(o^z)&u^o|0,(y^j)&D^y|0)|0;K=C;I=ne(L|0,p|0,28)|0;l=C;H=oe(L|0,p|0,36)|0;l=l|C;r=ne(L|0,p|0,34)|0;G=C;v=oe(L|0,p|0,30)|0;G=l^(G|C);l=ne(L|0,p|0,39)|0;b=C;n=oe(L|0,p|0,25)|0;e=c[f>>2]|0;s=c[f+4>>2]|0;b=le((e|q)&L|e&q|0,(s|t)&p|s&t|0,(I|H)^(r|v)^(l|n)|0,G^(b|C)|0)|0;G=C;F=le(E|0,F|0,J|0,K|0)|0;E=C;c[h+16>>2]=F;c[h+16+4>>2]=E;K=le(b|0,G|0,J|0,K|0)|0;J=C;c[w>>2]=K;c[w+4>>2]=J;G=ne(F|0,E|0,14)|0;b=C;n=oe(F|0,E|0,50)|0;b=b|C;l=ne(F|0,E|0,18)|0;v=C;r=oe(F|0,E|0,46)|0;v=b^(v|C);b=ne(F|0,E|0,41)|0;H=C;I=oe(F|0,E|0,23)|0;H=v^(H|C);v=c[h+80+608>>2]|0;t=c[h+80+608+4>>2]|0;y=le(o|0,y|0,-885112138,1288033470)|0;t=le(y|0,C|0,v|0,t|0)|0;H=le(t|0,C|0,(G|n)^(l|r)^(b|I)|0,H|0)|0;H=le(H|0,C|0,(z^u)&F^z|0,(j^D)&E^j|0)|0;I=C;b=ne(K|0,J|0,28)|0;r=C;l=oe(K|0,J|0,36)|0;r=r|C;n=ne(K|0,J|0,34)|0;G=C;t=oe(K|0,J|0,30)|0;G=r^(G|C);r=ne(K|0,J|0,39)|0;v=C;y=oe(K|0,J|0,25)|0;o=c[B>>2]|0;q=c[B+4>>2]|0;v=le((o|L)&K|o&L|0,(q|p)&J|q&p|0,(b|l)^(n|t)^(r|y)|0,G^(v|C)|0)|0;G=C;s=le(e|0,s|0,H|0,I|0)|0;e=C;c[f>>2]=s;c[f+4>>2]=e;I=le(v|0,G|0,H|0,I|0)|0;H=C;c[m>>2]=I;c[m+4>>2]=H;G=ne(s|0,e|0,14)|0;v=C;f=oe(s|0,e|0,50)|0;v=v|C;y=ne(s|0,e|0,18)|0;r=C;t=oe(s|0,e|0,46)|0;r=v^(r|C);v=ne(s|0,e|0,41)|0;n=C;l=oe(s|0,e|0,23)|0;n=r^(n|C);r=c[h+80+616>>2]|0;b=c[h+80+616+4>>2]|0;j=le(z|0,j|0,-60457430,1501505948)|0;b=le(j|0,C|0,r|0,b|0)|0;n=le(b|0,C|0,(G|f)^(y|t)^(v|l)|0,n|0)|0;n=le(n|0,C|0,(u^F)&s^u|0,(D^E)&e^D|0)|0;l=C;v=ne(I|0,H|0,28)|0;t=C;y=oe(I|0,H|0,36)|0;t=t|C;f=ne(I|0,H|0,34)|0;G=C;b=oe(I|0,H|0,30)|0;G=t^(G|C);t=ne(I|0,H|0,39)|0;r=C;j=oe(I|0,H|0,25)|0;z=c[k>>2]|0;p=c[k+4>>2]|0;r=le((z|K)&I|z&K|0,(p|J)&H|p&J|0,(v|y)^(f|b)^(t|j)|0,G^(r|C)|0)|0;G=C;q=le(o|0,q|0,n|0,l|0)|0;o=C;c[B>>2]=q;c[B+4>>2]=o;l=le(r|0,G|0,n|0,l|0)|0;n=C;c[x>>2]=l;c[x+4>>2]=n;x=ne(q|0,o|0,14)|0;G=C;r=oe(q|0,o|0,50)|0;G=G|C;B=ne(q|0,o|0,18)|0;j=C;t=oe(q|0,o|0,46)|0;j=G^(j|C);G=ne(q|0,o|0,41)|0;b=C;f=oe(q|0,o|0,23)|0;b=j^(b|C);j=c[h+80+624>>2]|0;y=c[h+80+624+4>>2]|0;D=le(u|0,D|0,987167468,1607167915)|0;y=le(D|0,C|0,j|0,y|0)|0;b=le(y|0,C|0,(x|r)^(B|t)^(G|f)|0,b|0)|0;b=le(b|0,C|0,(F^s)&q^F|0,(E^e)&o^E|0)|0;f=C;G=ne(l|0,n|0,28)|0;t=C;B=oe(l|0,n|0,36)|0;t=t|C;r=ne(l|0,n|0,34)|0;x=C;y=oe(l|0,n|0,30)|0;x=t^(x|C);t=ne(l|0,n|0,39)|0;j=C;D=oe(l|0,n|0,25)|0;u=c[w>>2]|0;v=c[w+4>>2]|0;j=le((u|I)&l|u&I|0,(v|H)&n|v&H|0,(G|B)^(r|y)^(t|D)|0,x^(j|C)|0)|0;x=C;p=le(z|0,p|0,b|0,f|0)|0;z=C;c[k>>2]=p;c[k+4>>2]=z;f=le(j|0,x|0,b|0,f|0)|0;b=C;c[A>>2]=f;c[A+4>>2]=b;A=ne(p|0,z|0,14)|0;x=C;j=oe(p|0,z|0,50)|0;x=x|C;k=ne(p|0,z|0,18)|0;D=C;t=oe(p|0,z|0,46)|0;D=x^(D|C);x=ne(p|0,z|0,41)|0;y=C;r=oe(p|0,z|0,23)|0;y=D^(y|C);D=c[h+80+632>>2]|0;B=c[h+80+632+4>>2]|0;E=le(F|0,E|0,1246189591,1816402316)|0;B=le(E|0,C|0,D|0,B|0)|0;y=le(B|0,C|0,(A|j)^(k|t)^(x|r)|0,y|0)|0;e=le(y|0,C|0,(s^q)&p^s|0,(e^o)&z^e|0)|0;z=C;c[h+8>>2]=e;c[h+8+4>>2]=z;o=ne(f|0,b|0,28)|0;s=C;p=oe(f|0,b|0,36)|0;s=s|C;q=ne(f|0,b|0,34)|0;y=C;r=oe(f|0,b|0,30)|0;y=s^(y|C);s=ne(f|0,b|0,39)|0;x=C;t=oe(f|0,b|0,25)|0;k=c[m>>2]|0;m=c[m+4>>2]|0;x=le((k|l)&f|k&l|0,(m|n)&b|m&n|0,(o|p)^(q|r)^(s|t)|0,y^(x|C)|0)|0;y=C;c[h>>2]=x;c[h+4>>2]=y;v=le(u|0,v|0,e|0,z|0)|0;c[w>>2]=v;c[w+4>>2]=C;z=le(x|0,y|0,e|0,z|0)|0;e=C;c[h+16>>2]=z;c[h+16+4>>2]=e;e=le(c[a>>2]|0,c[a+4>>2]|0,z|0,e|0)|0;c[a>>2]=e;c[a+4>>2]=C;e=1;while(1){M=a+(e<<3)|0;b=le(c[M>>2]|0,c[M+4>>2]|0,f|0,b|0)|0;c[M>>2]=b;c[M+4>>2]=C;b=e+1|0;if((b|0)==8)break;e=b;f=c[h+16+(b<<3)>>2]|0;b=c[h+16+(b<<3)+4>>2]|0}Rd(h+80|0,640);Rd(h+16|0,64);Rd(h+8|0,8);Rd(h,8);i=g;return}function Ec(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;if(e>>>3){f=0;do{g=f<<3;h=d+(f<<3)|0;i=c[h>>2]|0;h=c[h+4>>2]|0;a[b+(g|7)>>0]=i;j=ne(i|0,h|0,8)|0;a[b+(g|6)>>0]=j;j=ne(i|0,h|0,16)|0;a[b+(g|5)>>0]=j;j=ne(i|0,h|0,24)|0;a[b+(g|4)>>0]=j;a[b+(g|3)>>0]=h;j=ne(i|0,h|0,40)|0;a[b+(g|2)>>0]=j;j=ne(i|0,h|0,48)|0;a[b+(g|1)>>0]=j;h=ne(i|0,h|0,56)|0;a[b+g>>0]=h;f=f+1|0}while((f|0)!=(e>>>3|0))}return}function Fc(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Kc(a,b,c,d,e)|0}function Gc(a,b){a=a|0;b=b|0;Lc(a,b);return}function Hc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Mc(a,b,c,d);return}function Ic(a,b){a=a|0;b=b|0;Nc(a,b);return}function Jc(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;j=i;k=i=i+63&-64;i=i+96|0;c[k>>2]=(d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24)&67108863;c[k+4>>2]=(d[h+3>>0]|d[h+3+1>>0]<<8|d[h+3+2>>0]<<16|d[h+3+3>>0]<<24)>>>2&67108611;c[k+8>>2]=(d[h+6>>0]|d[h+6+1>>0]<<8|d[h+6+2>>0]<<16|d[h+6+3>>0]<<24)>>>4&67092735;c[k+12>>2]=(d[h+9>>0]|d[h+9+1>>0]<<8|d[h+9+2>>0]<<16|d[h+9+3>>0]<<24)>>>6&66076671;c[k+16>>2]=(d[h+12>>0]|d[h+12+1>>0]<<8|d[h+12+2>>0]<<16|d[h+12+3>>0]<<24)>>>8&1048575;c[k+20>>2]=0;c[k+20+4>>2]=0;c[k+20+8>>2]=0;c[k+20+12>>2]=0;c[k+20+16>>2]=0;c[k+40>>2]=d[h+16>>0]|d[h+16+1>>0]<<8|d[h+16+2>>0]<<16|d[h+16+3>>0]<<24;c[k+44>>2]=d[h+20>>0]|d[h+20+1>>0]<<8|d[h+20+2>>0]<<16|d[h+20+3>>0]<<24;c[k+48>>2]=d[h+24>>0]|d[h+24+1>>0]<<8|d[h+24+2>>0]<<16|d[h+24+3>>0]<<24;c[k+52>>2]=d[h+28>>0]|d[h+28+1>>0]<<8|d[h+28+2>>0]<<16|d[h+28+3>>0]<<24;c[k+56>>2]=0;c[k+56+4>>2]=0;a[k+80>>0]=0;Qc(k,e,f,g);Oc(k,b);i=j;return}function Kc(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=i;g=i=i+63&-64;i=i+16|0;Jc(g,b,c,d,e);e=Id(a,g)|0;i=f;return e|0}function Lc(b,e){b=b|0;e=e|0;c[b>>2]=(d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24)&67108863;c[b+4>>2]=(d[e+3>>0]|d[e+3+1>>0]<<8|d[e+3+2>>0]<<16|d[e+3+3>>0]<<24)>>>2&67108611;c[b+8>>2]=(d[e+6>>0]|d[e+6+1>>0]<<8|d[e+6+2>>0]<<16|d[e+6+3>>0]<<24)>>>4&67092735;c[b+12>>2]=(d[e+9>>0]|d[e+9+1>>0]<<8|d[e+9+2>>0]<<16|d[e+9+3>>0]<<24)>>>6&66076671;c[b+16>>2]=(d[e+12>>0]|d[e+12+1>>0]<<8|d[e+12+2>>0]<<16|d[e+12+3>>0]<<24)>>>8&1048575;c[b+20>>2]=0;c[b+20+4>>2]=0;c[b+20+8>>2]=0;c[b+20+12>>2]=0;c[b+20+16>>2]=0;c[b+40>>2]=d[e+16>>0]|d[e+16+1>>0]<<8|d[e+16+2>>0]<<16|d[e+16+3>>0]<<24;c[b+44>>2]=d[e+20>>0]|d[e+20+1>>0]<<8|d[e+20+2>>0]<<16|d[e+20+3>>0]<<24;c[b+48>>2]=d[e+24>>0]|d[e+24+1>>0]<<8|d[e+24+2>>0]<<16|d[e+24+3>>0]<<24;c[b+52>>2]=d[e+28>>0]|d[e+28+1>>0]<<8|d[e+28+2>>0]<<16|d[e+28+3>>0]<<24;c[b+56>>2]=0;c[b+56+4>>2]=0;a[b+80>>0]=0;return}function Mc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Qc(a,b,c,d);return}function Nc(a,b){a=a|0;b=b|0;Oc(a,b);return}function Oc(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;f=c[b+56>>2]|0;g=c[b+56+4>>2]|0;if(!((f|0)==0&(g|0)==0)){a[b+64+f>>0]=1;e=le(f|0,g|0,1,0)|0;h=C;if(h>>>0<0|(h|0)==0&e>>>0<16){h=ke(14,0,f|0,g|0)|0;me(b+64+e|0,0,h+1|0)|0}a[b+80>>0]=1;Pc(b,b+64|0,16,0)}g=c[b+24>>2]|0;h=(c[b+28>>2]|0)+(g>>>26)|0;k=(h>>>26)+(c[b+32>>2]|0)|0;i=(k>>>26)+(c[b+36>>2]|0)|0;e=((i>>>26)*5|0)+(c[b+20>>2]|0)|0;l=((((e&67108863)+5|0)>>>26)+((e>>>26)+(g&67108863))|0)>>>26;j=(i|-67108864)+((((l+(h&67108863)|0)>>>26)+(k&67108863)|0)>>>26)|0;g=(((e&67108863)+5|0)>>>26)+((e>>>26)+(g&67108863))&67108863&(j>>>31)+-1|j>>31&(e>>>26)+(g&67108863);k=((l+(h&67108863)|0)>>>26)+k&67108863&(j>>>31)+-1|j>>31&(k&67108863);e=le(e+5&67108863&(j>>>31)+-1|j>>31&(e&67108863)|g<<26|0,0,c[b+40>>2]|0,0)|0;f=C;g=le(g>>>6|(l+h&67108863&(j>>>31)+-1|j>>31&(h&67108863))<<20|0,0,c[b+44>>2]|0,0)|0;f=le(g|0,C|0,f|0,0)|0;g=C;h=le((l+h&67108863&(j>>>31)+-1|j>>31&(h&67108863))>>>12|k<<14|0,0,c[b+48>>2]|0,0)|0;g=le(h|0,C|0,g|0,0)|0;h=C;i=le(k>>>18|((j>>>31)+-1&j|j>>31&i)<<8|0,0,c[b+52>>2]|0,0)|0;h=le(i|0,C|0,h|0,0)|0;a[d>>0]=e;a[d+1>>0]=e>>8;a[d+2>>0]=e>>16;a[d+3>>0]=e>>24;a[d+4>>0]=f;a[d+4+1>>0]=f>>8;a[d+4+2>>0]=f>>16;a[d+4+3>>0]=f>>24;a[d+8>>0]=g;a[d+8+1>>0]=g>>8;a[d+8+2>>0]=g>>16;a[d+8+3>>0]=g>>24;a[d+12>>0]=h;a[d+12+1>>0]=h>>8;a[d+12+2>>0]=h>>16;a[d+12+3>>0]=h>>24;Rd(b,88);return}function Pc(b,e,f,g){b=b|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;s=(a[b+80>>0]|0)!=0?0:16777216;t=c[b+4>>2]|0;u=c[b+8>>2]|0;p=c[b+12>>2]|0;q=c[b+16>>2]|0;l=c[b+20>>2]|0;k=c[b+24>>2]|0;j=c[b+28>>2]|0;i=c[b+32>>2]|0;h=c[b+36>>2]|0;if(g>>>0>0|(g|0)==0&f>>>0>15){r=c[b>>2]|0;while(1){z=((d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24)&67108863)+l|0;A=e+3|0;A=((d[A>>0]|d[A+1>>0]<<8|d[A+2>>0]<<16|d[A+3>>0]<<24)>>>2&67108863)+k|0;y=e+6|0;y=((d[y>>0]|d[y+1>>0]<<8|d[y+2>>0]<<16|d[y+3>>0]<<24)>>>4&67108863)+j|0;x=e+9|0;x=((d[x>>0]|d[x+1>>0]<<8|d[x+2>>0]<<16|d[x+3>>0]<<24)>>>6)+i|0;l=e+12|0;l=((d[l>>0]|d[l+1>>0]<<8|d[l+2>>0]<<16|d[l+3>>0]<<24)>>>8|s)+h|0;h=ve(z|0,0,r|0,0)|0;m=C;j=ve(A|0,0,q*5|0,0)|0;m=le(j|0,C|0,h|0,m|0)|0;h=C;j=ve(y|0,0,p*5|0,0)|0;j=le(m|0,h|0,j|0,C|0)|0;h=C;m=ve(x|0,0,u*5|0,0)|0;m=le(j|0,h|0,m|0,C|0)|0;h=C;j=ve(l|0,0,t*5|0,0)|0;j=le(m|0,h|0,j|0,C|0)|0;h=C;m=ve(z|0,0,t|0,0)|0;n=C;w=ve(A|0,0,r|0,0)|0;n=le(w|0,C|0,m|0,n|0)|0;m=C;w=ve(y|0,0,q*5|0,0)|0;w=le(n|0,m|0,w|0,C|0)|0;m=C;n=ve(x|0,0,p*5|0,0)|0;n=le(w|0,m|0,n|0,C|0)|0;m=C;w=ve(l|0,0,u*5|0,0)|0;w=le(n|0,m|0,w|0,C|0)|0;m=C;n=ve(z|0,0,u|0,0)|0;o=C;v=ve(A|0,0,t|0,0)|0;o=le(v|0,C|0,n|0,o|0)|0;n=C;v=ve(y|0,0,r|0,0)|0;v=le(o|0,n|0,v|0,C|0)|0;n=C;o=ve(x|0,0,q*5|0,0)|0;o=le(v|0,n|0,o|0,C|0)|0;n=C;v=ve(l|0,0,p*5|0,0)|0;v=le(o|0,n|0,v|0,C|0)|0;n=C;o=ve(z|0,0,p|0,0)|0;i=C;k=ve(A|0,0,u|0,0)|0;i=le(k|0,C|0,o|0,i|0)|0;o=C;k=ve(y|0,0,t|0,0)|0;k=le(i|0,o|0,k|0,C|0)|0;o=C;i=ve(x|0,0,r|0,0)|0;i=le(k|0,o|0,i|0,C|0)|0;o=C;k=ve(l|0,0,q*5|0,0)|0;k=le(i|0,o|0,k|0,C|0)|0;o=C;i=ve(z|0,0,q|0,0)|0;z=C;A=ve(A|0,0,p|0,0)|0;z=le(A|0,C|0,i|0,z|0)|0;i=C;y=ve(y|0,0,u|0,0)|0;y=le(z|0,i|0,y|0,C|0)|0;i=C;x=ve(x|0,0,t|0,0)|0;x=le(y|0,i|0,x|0,C|0)|0;i=C;l=ve(l|0,0,r|0,0)|0;l=le(x|0,i|0,l|0,C|0)|0;i=C;h=ne(j|0,h|0,26)|0;h=le(w|0,m|0,h|0,0)|0;m=ne(h|0,C|0,26)|0;m=le(v|0,n|0,m|0,0)|0;n=ne(m|0,C|0,26)|0;n=le(k|0,o|0,n|0,0)|0;o=ne(n|0,C|0,26)|0;o=le(l|0,i|0,o|0,0)|0;i=ne(o|0,C|0,26)|0;f=le(f|0,g|0,-16,-1)|0;g=C;if(!(g>>>0>0|(g|0)==0&f>>>0>15)){e=(i*5|0)+j&67108863;k=(((i*5|0)+(j&67108863)|0)>>>26)+(h&67108863)|0;j=m&67108863;i=n&67108863;h=o&67108863;break}else{e=e+16|0;l=(i*5|0)+j&67108863;k=(((i*5|0)+(j&67108863)|0)>>>26)+(h&67108863)|0;j=m&67108863;i=n&67108863;h=o&67108863}}}else e=l;c[b+20>>2]=e;c[b+24>>2]=k;c[b+28>>2]=j;c[b+32>>2]=i;c[b+36>>2]=h;return}function Qc(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;h=c[b+56>>2]|0;g=c[b+56+4>>2]|0;if(!((h|0)==0&(g|0)==0)){j=ke(16,0,h|0,g|0)|0;l=C;k=l>>>0>f>>>0|(l|0)==(f|0)&j>>>0>e>>>0?e:j;l=l>>>0>f>>>0|(l|0)==(f|0)&j>>>0>e>>>0?f:l;if(!((k|0)==0&(l|0)==0)){j=0;i=0;do{n=a[d+j>>0]|0;h=le(h|0,g|0,j|0,i|0)|0;a[b+64+h>>0]=n;j=le(j|0,i|0,1,0)|0;i=C;h=c[b+56>>2]|0;g=c[b+56+4>>2]|0}while(i>>>0<l>>>0|(i|0)==(l|0)&j>>>0<k>>>0)}n=le(h|0,g|0,k|0,l|0)|0;j=C;c[b+56>>2]=n;c[b+56+4>>2]=j;if(!(j>>>0<0|(j|0)==0&n>>>0<16)){e=ke(e|0,f|0,k|0,l|0)|0;f=C;Pc(b,b+64|0,16,0);c[b+56>>2]=0;c[b+56+4>>2]=0;d=d+k|0;m=6}}else m=6;if((m|0)==6){if(f>>>0>0|(f|0)==0&e>>>0>15){h=e&-16;Pc(b,d,h,f);e=ke(e|0,f|0,h|0,f|0)|0;h=d+h|0;f=C}else h=d;if(!((e|0)==0&(f|0)==0)){d=0;g=0;do{m=a[h+d>>0]|0;n=le(c[b+56>>2]|0,c[b+56+4>>2]|0,d|0,g|0)|0;a[b+64+n>>0]=m;d=le(d|0,g|0,1,0)|0;g=C}while(g>>>0<f>>>0|(g|0)==(f|0)&d>>>0<e>>>0);n=le(c[b+56>>2]|0,c[b+56+4>>2]|0,e|0,f|0)|0;c[b+56>>2]=n;c[b+56+4>>2]=C}}return}function Rc(a,b){a=a|0;b=b|0;return Wc(a,b)|0}function Sc(a,b,c){a=a|0;b=b|0;c=c|0;return Vc(a,b,c)|0}function Tc(){return 32}function Uc(){return 32}function Vc(b,c,d){b=b|0;c=c|0;d=d|0;if(!(Zd(b,c,d)|0)){c=0;d=0;do{c=a[b+d>>0]|c;d=d+1|0}while((d|0)!=32);c=0-(((c&255)+511|0)>>>8&1)|0}else c=-1;return c|0}function Wc(a,b){a=a|0;b=b|0;return _d(a,b)|0}function Xc(){return 32}function Yc(){return 24}function Zc(){return 16}function _c(b,c,d,e,f,g,h){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;l=i;m=i=i+63&-64;i=i+352|0;_b(m+256|0,g,h);if(b>>>0>=d>>>0?0<f>>>0|0==(f|0)&(b-d|0)>>>0<e>>>0:0)j=5;else if(d>>>0>=b>>>0?0<f>>>0|0==(f|0)&(d-b|0)>>>0<e>>>0:0)j=5;else k=d;if((j|0)==5){qe(b|0,d|0,e|0)|0;k=b}h=m+288|0;d=h+32|0;do{a[h>>0]=0;h=h+1|0}while((h|0)<(d|0));h=f>>>0>0|(f|0)==0&e>>>0>32?32:e;d=f>>>0>0|(f|0)==0&e>>>0>32?0:f;if(!((h|0)==0&(d|0)==0)){j=le(e|0,f|0,-1,0)|0;pe(m+288+32|0,k|0,(~f>>>0>4294967295|(~f|0)==-1&(e^-32)>>>0>4294967263?j+1|0:32)|0)|0}j=le(h|0,d|0,32,0)|0;Hd(m+288|0,m+288|0,j,C,g+16|0,m+256|0);Gc(m,m+288|0);if(!((h|0)==0&(d|0)==0)){j=le(e|0,f|0,-1,0)|0;pe(b|0,m+288+32|0,(~f>>>0>4294967295|(~f|0)==-1&(e^-32)>>>0>4294967263?j+1|0:32)|0)|0}Rd(m+288|0,64);if(f>>>0>0|(f|0)==0&e>>>0>32){j=ke(e|0,f|0,h|0,d|0)|0;be(b+h|0,k+h|0,j,C,g+16|0,1,0,m+256|0)}Rd(m+256|0,32);Hc(m,b,e,f);Ic(m,c);Rd(m,256);i=l;return 0}function $c(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if(d>>>0>0|(d|0)==0&c>>>0>4294967279)c=-1;else{_c(a+16|0,a,b,c,d,e,f)|0;c=0}return c|0}function ad(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0;k=i;j=i=i+63&-64;i=i+96|0;_b(j,f,g);ae(j+32|0,f+16|0,j);if(!(Fc(c,b,d,e,j+32|0)|0))if(!a)g=0;else{if(b>>>0>=a>>>0?0<e>>>0|0==(e|0)&(b-a|0)>>>0<d>>>0:0)h=8;else if(a>>>0>=b>>>0?0<e>>>0|0==(e|0)&(a-b|0)>>>0<d>>>0:0)h=8;if((h|0)==8){qe(a|0,b|0,d|0)|0;b=a}g=e>>>0>0|(e|0)==0&d>>>0>32?32:d;c=e>>>0>0|(e|0)==0&d>>>0>32?0:e;if((g|0)==0&(c|0)==0)Hd(j+32|0,j+32|0,32,0,f+16|0,j);else{h=le(d|0,e|0,-1,0)|0;h=~e>>>0>4294967295|(~e|0)==-1&(d^-32)>>>0>4294967263?h+1|0:32;pe(j+32+32|0,b|0,h|0)|0;l=le(g|0,c|0,32,0)|0;Hd(j+32|0,j+32|0,l,C,f+16|0,j);pe(a|0,j+32+32|0,h|0)|0}if(e>>>0>0|(e|0)==0&d>>>0>32){l=ke(d|0,e|0,g|0,c|0)|0;be(a+g|0,b+g|0,l,C,f+16|0,1,0,j)}Rd(j,32);g=0}else{Rd(j,32);g=-1}i=k;return g|0}function bd(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if(d>>>0<0|(d|0)==0&c>>>0<16)c=-1;else{c=le(c|0,d|0,-16,-1)|0;c=ad(a,b+16|0,b,c,C,e,f)|0}return c|0}function cd(){return 8}function dd(){return 16}function ed(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;fd(a,b,c,d,e);return 0}function fd(b,c,e,f,g){b=b|0;c=c|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;n=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;p=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;h=d[g+8>>0]|d[g+8+1>>0]<<8|d[g+8+2>>0]<<16|d[g+8+3>>0]<<24;i=d[g+8+4>>0]|d[g+8+4+1>>0]<<8|d[g+8+4+2>>0]<<16|d[g+8+4+3>>0]<<24;f=oe(e|0,f|0,56)|0;g=C;if((c+(e-(e&7))|0)==(c|0)){o=h^2037671283;l=i^1952801890;m=n^1886610805;k=p^1936682341;j=h^1852075885;s=i^1685025377;i=n^1852142177;h=p^1819895653}else{u=c;r=h^2037671283;l=i^1952801890;o=n^1886610805;m=p^1936682341;k=h^1852075885;j=i^1685025377;i=n^1852142177;h=p^1819895653;while(1){v=u;t=d[v>>0]|d[v+1>>0]<<8|d[v+2>>0]<<16|d[v+3>>0]<<24;v=d[v+4>>0]|d[v+4+1>>0]<<8|d[v+4+2>>0]<<16|d[v+4+3>>0]<<24;p=t^r;r=v^l;m=le(o|0,m|0,k|0,j|0)|0;n=C;q=oe(k|0,j|0,13)|0;s=C;x=ne(k|0,j|0,51)|0;s=(s|C)^n;h=le(p|0,r|0,i|0,h|0)|0;i=C;o=oe(p|0,r|0,16)|0;j=C;k=ne(p|0,r|0,48)|0;j=(j|C)^i;n=le((o|k)^h|0,j|0,n|0,m|0)|0;r=C;l=oe((o|k)^h|0,j|0,21)|0;p=C;j=ne((o|k)^h|0,j|0,43)|0;p=(p|C)^r;i=le(h|0,i|0,(q|x)^m|0,s|0)|0;h=C;k=oe((q|x)^m|0,s|0,17)|0;o=C;s=ne((q|x)^m|0,s|0,47)|0;o=h^(o|C);r=le(n|0,r|0,i^(k|s)|0,o|0)|0;m=C;x=oe(i^(k|s)|0,o|0,13)|0;q=C;o=ne(i^(k|s)|0,o|0,51)|0;q=(q|C)^m;i=le((l|j)^n|0,p|0,h|0,i|0)|0;h=C;s=oe((l|j)^n|0,p|0,16)|0;k=C;p=ne((l|j)^n|0,p|0,48)|0;k=(k|C)^h;m=le((s|p)^i|0,k|0,m|0,r|0)|0;n=C;j=oe((s|p)^i|0,k|0,21)|0;l=C;k=ne((s|p)^i|0,k|0,43)|0;l=(l|C)^n;h=le(i|0,h|0,(x|o)^r|0,q|0)|0;i=C;p=oe((x|o)^r|0,q|0,17)|0;s=C;q=ne((x|o)^r|0,q|0,47)|0;s=(s|C)^i;u=u+8|0;if((u|0)==(c+(e-(e&7))|0)){c=c+(e-(e&7))|0;o=(j|k)^m;m=m^t;k=n^v;j=(p|q)^h;break}else{r=(j|k)^m;o=m^t;m=n^v;k=(p|q)^h;j=s}}}switch(e&7|0){case 7:{f=oe(d[c+6>>0]|0|0,0,48)|0|f;g=C|g;w=5;break}case 6:{w=5;break}case 5:{w=6;break}case 4:{w=7;break}case 3:{w=8;break}case 2:{w=9;break}case 1:{w=10;break}default:{}}if((w|0)==5){x=oe(d[c+5>>0]|0|0,0,40)|0;g=C|g;f=x|f;w=6}if((w|0)==6){g=d[c+4>>0]|0|g;w=7}if((w|0)==7){x=oe(d[c+3>>0]|0|0,0,24)|0;f=x|f;g=C|g;w=8}if((w|0)==8){x=oe(d[c+2>>0]|0|0,0,16)|0;f=x|f;g=C|g;w=9}if((w|0)==9){x=oe(d[c+1>>0]|0|0,0,8)|0;f=x|f;g=C|g;w=10}if((w|0)==10)f=d[c>>0]|0|f;u=f^o;n=g^l;e=le(m|0,k|0,j|0,s|0)|0;q=C;m=oe(j|0,s|0,13)|0;r=C;p=ne(j|0,s|0,51)|0;r=(r|C)^q;v=le(u|0,n|0,i|0,h|0)|0;c=C;w=oe(u|0,n|0,16)|0;x=C;n=ne(u|0,n|0,48)|0;x=(x|C)^c;q=le((w|n)^v|0,x|0,q|0,e|0)|0;u=C;o=oe((w|n)^v|0,x|0,21)|0;t=C;x=ne((w|n)^v|0,x|0,43)|0;t=(t|C)^u;c=le(v|0,c|0,(m|p)^e|0,r|0)|0;v=C;n=oe((m|p)^e|0,r|0,17)|0;w=C;r=ne((m|p)^e|0,r|0,47)|0;w=v^(w|C);u=le(q|0,u|0,c^(n|r)|0,w|0)|0;e=C;p=oe(c^(n|r)|0,w|0,13)|0;s=C;w=ne(c^(n|r)|0,w|0,51)|0;s=(s|C)^e;c=le((o|x)^q|0,t|0,v|0,c|0)|0;v=C;r=oe((o|x)^q|0,t|0,16)|0;n=C;t=ne((o|x)^q|0,t|0,48)|0;n=(n|C)^v;e=le((r|t)^c|0,n|0,e|0,u|0)|0;q=C;x=oe((r|t)^c|0,n|0,21)|0;o=C;n=ne((r|t)^c|0,n|0,43)|0;o=(o|C)^q;v=le(c|0,v|0,(p|w)^u|0,s|0)|0;c=C;t=oe((p|w)^u|0,s|0,17)|0;r=C;s=ne((p|w)^u|0,s|0,47)|0;r=(r|C)^c;q=le(e^f|0,q^g|0,(t|s)^v|0,r|0)|0;u=C;w=oe((t|s)^v|0,r|0,13)|0;p=C;r=ne((t|s)^v|0,r|0,51)|0;p=u^(p|C);v=le((x|n)^e|0,o|0,c^255|0,v|0)|0;c=C;s=oe((x|n)^e|0,o|0,16)|0;t=C;o=ne((x|n)^e|0,o|0,48)|0;t=(t|C)^c;u=le((s|o)^v|0,t|0,u|0,q|0)|0;e=C;n=oe((s|o)^v|0,t|0,21)|0;x=C;t=ne((s|o)^v|0,t|0,43)|0;x=(x|C)^e;c=le(v|0,c|0,q^(w|r)|0,p|0)|0;v=C;o=oe(q^(w|r)|0,p|0,17)|0;s=C;p=ne(q^(w|r)|0,p|0,47)|0;s=(s|C)^v;e=le(u|0,e|0,(o|p)^c|0,s|0)|0;r=C;w=oe((o|p)^c|0,s|0,13)|0;q=C;s=ne((o|p)^c|0,s|0,51)|0;q=(q|C)^r;c=le((n|t)^u|0,x|0,v|0,c|0)|0;v=C;p=oe((n|t)^u|0,x|0,16)|0;o=C;x=ne((n|t)^u|0,x|0,48)|0;o=(o|C)^v;r=le((p|x)^c|0,o|0,r|0,e|0)|0;u=C;t=oe((p|x)^c|0,o|0,21)|0;n=C;o=ne((p|x)^c|0,o|0,43)|0;n=(n|C)^u;v=le(c|0,v|0,(w|s)^e|0,q|0)|0;c=C;x=oe((w|s)^e|0,q|0,17)|0;p=C;q=ne((w|s)^e|0,q|0,47)|0;p=(p|C)^c;u=le(r|0,u|0,(x|q)^v|0,p|0)|0;e=C;s=oe((x|q)^v|0,p|0,13)|0;w=C;p=ne((x|q)^v|0,p|0,51)|0;w=(w|C)^e;v=le((t|o)^r|0,n|0,c|0,v|0)|0;c=C;q=oe((t|o)^r|0,n|0,16)|0;x=C;n=ne((t|o)^r|0,n|0,48)|0;x=(x|C)^c;e=le((q|n)^v|0,x|0,e|0,u|0)|0;r=C;o=oe((q|n)^v|0,x|0,21)|0;t=C;x=ne((q|n)^v|0,x|0,43)|0;t=(t|C)^r;c=le(v|0,c|0,(s|p)^u|0,w|0)|0;v=C;n=oe((s|p)^u|0,w|0,17)|0;q=C;w=ne((s|p)^u|0,w|0,47)|0;q=(q|C)^v;r=le(e|0,r|0,(n|w)^c|0,q|0)|0;u=C;p=oe((n|w)^c|0,q|0,13)|0;s=C;q=ne((n|w)^c|0,q|0,51)|0;u=(s|C)^u;c=le((o|x)^e|0,t|0,v|0,c|0)|0;v=C;s=oe((o|x)^e|0,t|0,16)|0;w=C;t=ne((o|x)^e|0,t|0,48)|0;w=(w|C)^v;e=oe((s|t)^c|0,w|0,21)|0;x=C;w=ne((s|t)^c|0,w|0,43)|0;x=x|C;v=le(c|0,v|0,(p|q)^r|0,u|0)|0;c=C;t=oe((p|q)^r|0,u|0,17)|0;s=C;u=ne((p|q)^r|0,u|0,47)|0;x=(s|C)^c^v^x;a[b>>0]=(t|u)^v^c^(e|w);a[b+1>>0]=((t|u)^v^c^(e|w))>>8;a[b+2>>0]=((t|u)^v^c^(e|w))>>16;a[b+3>>0]=((t|u)^v^c^(e|w))>>24;a[b+4>>0]=x;a[b+4+1>>0]=x>>8;a[b+4+2>>0]=x>>16;a[b+4+3>>0]=x>>24;return}function gd(){return 64}function hd(){return 32}function id(){return 32}function jd(){return 64}function kd(a,b,c){a=a|0;b=b|0;c=c|0;qd(a,b,c);return 0}function ld(a,b){a=a|0;b=b|0;rd(a,b);return 0}function md(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return xd(a,b,c,d,e,f)|0}function nd(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return vd(a,b,c,d,e,f)|0}function od(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;wd(a,b,c,d,e,f);return 0}function pd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return ud(a,b,c,d,e)|0}function qd(b,c,e){b=b|0;c=c|0;e=e|0;var f=0,g=0;f=i;g=i=i+63&-64;i=i+160|0;Cc(c,e,32,0);a[c>>0]=(d[c>>0]|0)&248;a[c+31>>0]=(d[c+31>>0]|0)&63|64;Ub(g,c);Qb(b,g);qe(c|0,e|0,32)|0;qe(c+32|0,b|0,32)|0;i=f;return}function rd(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;d=i=i+63&-64;i=i+32|0;Nd(d,32);qd(a,b,d);Rd(d,32);i=c;return}function sd(a,b){a=a|0;b=b|0;var c=0,d=0;d=i;c=i=i+63&-64;i=i+240|0;if(!(Ib(c+80|0,b)|0)){ub(c);Gb(c,c,c+80+40|0);Eb(c,c);ub(c+40|0);vb(c+40|0,c+40|0,c+80+40|0);Ab(c+40|0,c+40|0,c);zb(a,c+40|0);a=0}else a=-1;i=d;return a|0}function td(b,c){b=b|0;c=c|0;var e=0,f=0,g=0;f=i;g=i=i+63&-64;i=i+64|0;Cc(g,c,32,0);a[g>>0]=(d[g>>0]|0)&248;a[g+31>>0]=(d[g+31>>0]|0)&63|64;c=g;e=b+32|0;do{a[b>>0]=a[c>>0]|0;b=b+1|0;c=c+1|0}while((b|0)<(e|0));Rd(g,64);i=f;return 0}function ud(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;n=i;m=i=i+63&-64;i=i+592|0;k=0;l=32;g=1;while(1){h=a[b+(l+31)>>0]|0;l=l+-1|0;j=a[33310+l>>0]|0;g=g&255;k=((h&255)-(j&255)|0)>>>8&g|k&255;if(!l)break;else g=(((j^h)&255)+65535|0)>>>8&g}a:do if(k){h=0;do{g=0;j=0;do{g=a[16+(h<<5)+j>>0]^a[b+j>>0]|g;j=j+1|0}while((j|0)!=32);h=h+1|0;if(!(g<<24>>24)){g=-1;break a}}while(h>>>0<12);if(!(Ib(m+328|0,f)|0)){g=0;h=0;do{g=a[f+h>>0]|g;h=h+1|0}while((h|0)!=32);if(g<<24>>24){zc(m);Ac(m,b,32,0);Ac(m,f,32,0);Ac(m,c,d,e);Bc(m,m+520|0);Wb(m+520|0);Tb(m+208|0,m+520|0,m+328|0,b+32|0);Sb(m+488|0,m+208|0);g=Jd(m+488|0,b)|0;g=((m+488|0)==(b|0)?-1:g)|(Sd(b,m+488|0)|0)}else g=-1}else g=-1}else g=-1;while(0);i=n;return g|0}function vd(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;e=le(e|0,f|0,-64,-1)|0;f=C;do if(f>>>0>0|(f|0)==0&e>>>0>4294967231)h=7;else{if(ud(d,d+64|0,e,f,g)|0){me(a|0,0,e|0)|0;h=7;break}if(b){c[b>>2]=e;c[b+4>>2]=f}qe(a|0,d+64|0,e|0)|0;e=0}while(0);if((h|0)==7)if(!b)e=-1;else{c[b>>2]=0;c[b+4>>2]=0;e=-1}return e|0}function wd(b,e,f,g,h,j){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;k=i;l=i=i+63&-64;i=i+560|0;Cc(l+496|0,j,32,0);a[l+496>>0]=(d[l+496>>0]|0)&248;a[l+496+31>>0]=(d[l+496+31>>0]|0)&63|64;zc(l);Ac(l,l+496+32|0,32,0);Ac(l,f,g,h);Bc(l,l+432|0);qe(b+32|0,j+32|0,32)|0;Wb(l+432|0);Ub(l+208|0,l+432|0);Qb(b,l+208|0);zc(l);Ac(l,b,64,0);Ac(l,f,g,h);Bc(l,l+368|0);Wb(l+368|0);Vb(b+32|0,l+368|0,l+496|0,l+432|0);Rd(l+496|0,64);if(e){c[e>>2]=64;c[e+4>>2]=0}i=k;return}function xd(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;h=i;j=i=i+63&-64;i=i+16|0;qe(a+64|0,d|0,e|0)|0;wd(a,j,a+64|0,e,f,g);if((c[j>>2]|0)==64&(c[j+4>>2]|0)==0)if(b){e=le(e|0,f|0,64,0)|0;c[b>>2]=e;c[b+4>>2]=C;e=0}else e=0;else{if(b){c[b>>2]=0;c[b+4>>2]=0}e=le(e|0,f|0,64,0)|0;me(a|0,0,e|0)|0;e=-1}i=h;return e|0}function yd(a,b,c){a=a|0;b=b|0;c=c|0;Cd(a,64,0,b,c);return}function zd(a,b,c){a=a|0;b=b|0;c=c|0;Dd(a,64,0,b,c);return}function Ad(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;Ed(a,b,c,d,e,1,0,f);return}function Bd(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;Fd(a,b,c,d,e,1,f);return}function Cd(a,b,e,f,g){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;h=i;j=i=i+63&-64;i=i+64|0;if(!((b|0)==0&(e|0)==0)){c[j>>2]=1634760805;c[j+4>>2]=857760878;c[j+8>>2]=2036477234;c[j+12>>2]=1797285236;c[j+16>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[j+20>>2]=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;c[j+24>>2]=d[g+8>>0]|d[g+8+1>>0]<<8|d[g+8+2>>0]<<16|d[g+8+3>>0]<<24;c[j+28>>2]=d[g+12>>0]|d[g+12+1>>0]<<8|d[g+12+2>>0]<<16|d[g+12+3>>0]<<24;c[j+32>>2]=d[g+16>>0]|d[g+16+1>>0]<<8|d[g+16+2>>0]<<16|d[g+16+3>>0]<<24;c[j+36>>2]=d[g+20>>0]|d[g+20+1>>0]<<8|d[g+20+2>>0]<<16|d[g+20+3>>0]<<24;c[j+40>>2]=d[g+24>>0]|d[g+24+1>>0]<<8|d[g+24+2>>0]<<16|d[g+24+3>>0]<<24;c[j+44>>2]=d[g+28>>0]|d[g+28+1>>0]<<8|d[g+28+2>>0]<<16|d[g+28+3>>0]<<24;c[j+48>>2]=0;c[j+52>>2]=0;c[j+56>>2]=d[f>>0]|d[f+1>>0]<<8|d[f+2>>0]<<16|d[f+3>>0]<<24;c[j+60>>2]=d[f+4>>0]|d[f+4+1>>0]<<8|d[f+4+2>>0]<<16|d[f+4+3>>0]<<24;me(a|0,0,b|0)|0;Gd(j,a,a,b,e);Rd(j,64)}i=h;return}function Dd(a,b,e,f,g){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;h=i;j=i=i+63&-64;i=i+64|0;if(!((b|0)==0&(e|0)==0)){c[j>>2]=1634760805;c[j+4>>2]=857760878;c[j+8>>2]=2036477234;c[j+12>>2]=1797285236;c[j+16>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[j+20>>2]=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;c[j+24>>2]=d[g+8>>0]|d[g+8+1>>0]<<8|d[g+8+2>>0]<<16|d[g+8+3>>0]<<24;c[j+28>>2]=d[g+12>>0]|d[g+12+1>>0]<<8|d[g+12+2>>0]<<16|d[g+12+3>>0]<<24;c[j+32>>2]=d[g+16>>0]|d[g+16+1>>0]<<8|d[g+16+2>>0]<<16|d[g+16+3>>0]<<24;c[j+36>>2]=d[g+20>>0]|d[g+20+1>>0]<<8|d[g+20+2>>0]<<16|d[g+20+3>>0]<<24;c[j+40>>2]=d[g+24>>0]|d[g+24+1>>0]<<8|d[g+24+2>>0]<<16|d[g+24+3>>0]<<24;c[j+44>>2]=d[g+28>>0]|d[g+28+1>>0]<<8|d[g+28+2>>0]<<16|d[g+28+3>>0]<<24;c[j+48>>2]=0;c[j+52>>2]=d[f>>0]|d[f+1>>0]<<8|d[f+2>>0]<<16|d[f+3>>0]<<24;c[j+56>>2]=d[f+4>>0]|d[f+4+1>>0]<<8|d[f+4+2>>0]<<16|d[f+4+3>>0]<<24;c[j+60>>2]=d[f+8>>0]|d[f+8+1>>0]<<8|d[f+8+2>>0]<<16|d[f+8+3>>0]<<24;me(a|0,0,b|0)|0;Gd(j,a,a,b,e);Rd(j,64)}i=h;return}function Ed(a,b,e,f,g,h,j,k){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0;l=i;m=i=i+63&-64;i=i+64|0;if(!((e|0)==0&(f|0)==0)){c[m>>2]=1634760805;c[m+4>>2]=857760878;c[m+8>>2]=2036477234;c[m+12>>2]=1797285236;c[m+16>>2]=d[k>>0]|d[k+1>>0]<<8|d[k+2>>0]<<16|d[k+3>>0]<<24;c[m+20>>2]=d[k+4>>0]|d[k+4+1>>0]<<8|d[k+4+2>>0]<<16|d[k+4+3>>0]<<24;c[m+24>>2]=d[k+8>>0]|d[k+8+1>>0]<<8|d[k+8+2>>0]<<16|d[k+8+3>>0]<<24;c[m+28>>2]=d[k+12>>0]|d[k+12+1>>0]<<8|d[k+12+2>>0]<<16|d[k+12+3>>0]<<24;c[m+32>>2]=d[k+16>>0]|d[k+16+1>>0]<<8|d[k+16+2>>0]<<16|d[k+16+3>>0]<<24;c[m+36>>2]=d[k+20>>0]|d[k+20+1>>0]<<8|d[k+20+2>>0]<<16|d[k+20+3>>0]<<24;c[m+40>>2]=d[k+24>>0]|d[k+24+1>>0]<<8|d[k+24+2>>0]<<16|d[k+24+3>>0]<<24;c[m+44>>2]=d[k+28>>0]|d[k+28+1>>0]<<8|d[k+28+2>>0]<<16|d[k+28+3>>0]<<24;c[m+48>>2]=h;c[m+52>>2]=j;c[m+56>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[m+60>>2]=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;Gd(m,b,a,e,f);Rd(m,64)}i=l;return}function Fd(a,b,e,f,g,h,j){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;k=i;l=i=i+63&-64;i=i+64|0;if(!((e|0)==0&(f|0)==0)){c[l>>2]=1634760805;c[l+4>>2]=857760878;c[l+8>>2]=2036477234;c[l+12>>2]=1797285236;c[l+16>>2]=d[j>>0]|d[j+1>>0]<<8|d[j+2>>0]<<16|d[j+3>>0]<<24;c[l+20>>2]=d[j+4>>0]|d[j+4+1>>0]<<8|d[j+4+2>>0]<<16|d[j+4+3>>0]<<24;c[l+24>>2]=d[j+8>>0]|d[j+8+1>>0]<<8|d[j+8+2>>0]<<16|d[j+8+3>>0]<<24;c[l+28>>2]=d[j+12>>0]|d[j+12+1>>0]<<8|d[j+12+2>>0]<<16|d[j+12+3>>0]<<24;c[l+32>>2]=d[j+16>>0]|d[j+16+1>>0]<<8|d[j+16+2>>0]<<16|d[j+16+3>>0]<<24;c[l+36>>2]=d[j+20>>0]|d[j+20+1>>0]<<8|d[j+20+2>>0]<<16|d[j+20+3>>0]<<24;c[l+40>>2]=d[j+24>>0]|d[j+24+1>>0]<<8|d[j+24+2>>0]<<16|d[j+24+3>>0]<<24;c[l+44>>2]=d[j+28>>0]|d[j+28+1>>0]<<8|d[j+28+2>>0]<<16|d[j+28+3>>0]<<24;c[l+48>>2]=h;c[l+52>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[l+56>>2]=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;c[l+60>>2]=d[g+8>>0]|d[g+8+1>>0]<<8|d[g+8+2>>0]<<16|d[g+8+3>>0]<<24;Gd(l,b,a,e,f);Rd(l,64)}i=k;return}function Gd(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0;U=i;T=i=i+63&-64;i=i+64|0;if(!((g|0)==0&(h|0)==0)){if(h>>>0>63|(h|0)==63&g>>>0>4294967232)fa();F=c[b>>2]|0;G=c[b+4>>2]|0;H=c[b+8>>2]|0;I=c[b+12>>2]|0;J=c[b+16>>2]|0;K=c[b+20>>2]|0;L=c[b+24>>2]|0;M=c[b+28>>2]|0;N=c[b+32>>2]|0;O=c[b+36>>2]|0;P=c[b+40>>2]|0;Q=c[b+44>>2]|0;R=c[b+56>>2]|0;S=c[b+60>>2]|0;j=0;l=c[b+48>>2]|0;D=c[b+52>>2]|0;while(1){E=h>>>0<0|(h|0)==0&g>>>0<64;if(E){j=T;k=j+64|0;do{a[j>>0]=0;j=j+1|0}while((j|0)<(k|0));j=0;do{a[T+j>>0]=a[e+j>>0]|0;j=j+1|0}while(0<h>>>0|0==(h|0)&j>>>0<g>>>0);e=T;B=T;j=f}else B=f;f=20;k=F;m=G;n=P;o=Q;p=l;q=D;r=R;s=S;t=H;u=I;v=J;w=K;x=L;y=M;z=N;A=O;do{na=k+v|0;ba=na^p;aa=(ba<<16|ba>>>16)+z|0;ma=aa^v;ba=(ma<<12|ma>>>20)+na^(ba<<16|ba>>>16);V=(ba<<8|ba>>>24)+aa^(ma<<12|ma>>>20);ja=m+w|0;X=ja^q;W=(X<<16|X>>>16)+A|0;ia=W^w;X=(ia<<12|ia>>>20)+ja^(X<<16|X>>>16);ka=(X<<8|X>>>24)+W^(ia<<12|ia>>>20);da=t+x|0;Y=da^r;la=(Y<<16|Y>>>16)+n|0;ca=la^x;Y=(ca<<12|ca>>>20)+da^(Y<<16|Y>>>16);ea=(Y<<8|Y>>>24)+la^(ca<<12|ca>>>20);Z=u+y|0;ha=Z^s;ga=(ha<<16|ha>>>16)+o|0;_=ga^y;ha=(_<<12|_>>>20)+Z^(ha<<16|ha>>>16);$=(ha<<8|ha>>>24)+ga^(_<<12|_>>>20);na=(ka<<7|ka>>>25)+((ma<<12|ma>>>20)+na)|0;ma=(na^(ha<<8|ha>>>24))<<16|(na^(ha<<8|ha>>>24))>>>16;ka=ma+((Y<<8|Y>>>24)+la)^(ka<<7|ka>>>25);k=(ka<<12|ka>>>20)+na|0;na=k^ma;s=na<<8|na>>>24;n=s+(ma+((Y<<8|Y>>>24)+la))|0;ka=n^(ka<<12|ka>>>20);w=ka<<7|ka>>>25;ja=(ea<<7|ea>>>25)+((ia<<12|ia>>>20)+ja)|0;ia=(ja^(ba<<8|ba>>>24))<<16|(ja^(ba<<8|ba>>>24))>>>16;ea=ia+((ha<<8|ha>>>24)+ga)^(ea<<7|ea>>>25);m=(ea<<12|ea>>>20)+ja|0;ja=m^ia;p=ja<<8|ja>>>24;o=p+(ia+((ha<<8|ha>>>24)+ga))|0;ea=o^(ea<<12|ea>>>20);x=ea<<7|ea>>>25;da=($<<7|$>>>25)+((ca<<12|ca>>>20)+da)|0;ca=(da^(X<<8|X>>>24))<<16|(da^(X<<8|X>>>24))>>>16;$=ca+((ba<<8|ba>>>24)+aa)^($<<7|$>>>25);t=($<<12|$>>>20)+da|0;da=t^ca;q=da<<8|da>>>24;z=q+(ca+((ba<<8|ba>>>24)+aa))|0;$=z^($<<12|$>>>20);y=$<<7|$>>>25;Z=(V<<7|V>>>25)+((_<<12|_>>>20)+Z)|0;Y=(Z^(Y<<8|Y>>>24))<<16|(Z^(Y<<8|Y>>>24))>>>16;V=Y+((X<<8|X>>>24)+W)^(V<<7|V>>>25);u=(V<<12|V>>>20)+Z|0;Z=u^Y;r=Z<<8|Z>>>24;A=r+(Y+((X<<8|X>>>24)+W))|0;V=A^(V<<12|V>>>20);v=V<<7|V>>>25;f=f+-2|0}while((f|0)!=0);f=(d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24)^k+F;Z=e+4|0;Z=(d[Z>>0]|d[Z+1>>0]<<8|d[Z+2>>0]<<16|d[Z+3>>0]<<24)^m+G;_=e+8|0;_=(d[_>>0]|d[_+1>>0]<<8|d[_+2>>0]<<16|d[_+3>>0]<<24)^t+H;$=e+12|0;$=(d[$>>0]|d[$+1>>0]<<8|d[$+2>>0]<<16|d[$+3>>0]<<24)^u+I;aa=e+16|0;aa=(d[aa>>0]|d[aa+1>>0]<<8|d[aa+2>>0]<<16|d[aa+3>>0]<<24)^v+J;ba=e+20|0;ba=(d[ba>>0]|d[ba+1>>0]<<8|d[ba+2>>0]<<16|d[ba+3>>0]<<24)^w+K;ca=e+24|0;ca=(d[ca>>0]|d[ca+1>>0]<<8|d[ca+2>>0]<<16|d[ca+3>>0]<<24)^x+L;da=e+28|0;da=(d[da>>0]|d[da+1>>0]<<8|d[da+2>>0]<<16|d[da+3>>0]<<24)^y+M;ea=e+32|0;ea=(d[ea>>0]|d[ea+1>>0]<<8|d[ea+2>>0]<<16|d[ea+3>>0]<<24)^z+N;ga=e+36|0;ga=(d[ga>>0]|d[ga+1>>0]<<8|d[ga+2>>0]<<16|d[ga+3>>0]<<24)^A+O;ha=e+40|0;ha=(d[ha>>0]|d[ha+1>>0]<<8|d[ha+2>>0]<<16|d[ha+3>>0]<<24)^n+P;ia=e+44|0;ia=(d[ia>>0]|d[ia+1>>0]<<8|d[ia+2>>0]<<16|d[ia+3>>0]<<24)^o+Q;ja=e+48|0;ja=(d[ja>>0]|d[ja+1>>0]<<8|d[ja+2>>0]<<16|d[ja+3>>0]<<24)^p+l;ka=e+52|0;ka=(d[ka>>0]|d[ka+1>>0]<<8|d[ka+2>>0]<<16|d[ka+3>>0]<<24)^q+D;la=e+56|0;la=(d[la>>0]|d[la+1>>0]<<8|d[la+2>>0]<<16|d[la+3>>0]<<24)^r+R;ma=e+60|0;ma=(d[ma>>0]|d[ma+1>>0]<<8|d[ma+2>>0]<<16|d[ma+3>>0]<<24)^s+S;l=l+1|0;k=((l|0)==0&1)+D|0;a[B>>0]=f;a[B+1>>0]=f>>8;a[B+2>>0]=f>>16;a[B+3>>0]=f>>24;na=B+4|0;a[na>>0]=Z;a[na+1>>0]=Z>>8;a[na+2>>0]=Z>>16;a[na+3>>0]=Z>>24;na=B+8|0;a[na>>0]=_;a[na+1>>0]=_>>8;a[na+2>>0]=_>>16;a[na+3>>0]=_>>24;na=B+12|0;a[na>>0]=$;a[na+1>>0]=$>>8;a[na+2>>0]=$>>16;a[na+3>>0]=$>>24;na=B+16|0;a[na>>0]=aa;a[na+1>>0]=aa>>8;a[na+2>>0]=aa>>16;a[na+3>>0]=aa>>24;na=B+20|0;a[na>>0]=ba;a[na+1>>0]=ba>>8;a[na+2>>0]=ba>>16;a[na+3>>0]=ba>>24;na=B+24|0;a[na>>0]=ca;a[na+1>>0]=ca>>8;a[na+2>>0]=ca>>16;a[na+3>>0]=ca>>24;na=B+28|0;a[na>>0]=da;a[na+1>>0]=da>>8;a[na+2>>0]=da>>16;a[na+3>>0]=da>>24;na=B+32|0;a[na>>0]=ea;a[na+1>>0]=ea>>8;a[na+2>>0]=ea>>16;a[na+3>>0]=ea>>24;na=B+36|0;a[na>>0]=ga;a[na+1>>0]=ga>>8;a[na+2>>0]=ga>>16;a[na+3>>0]=ga>>24;na=B+40|0;a[na>>0]=ha;a[na+1>>0]=ha>>8;a[na+2>>0]=ha>>16;a[na+3>>0]=ha>>24;na=B+44|0;a[na>>0]=ia;a[na+1>>0]=ia>>8;a[na+2>>0]=ia>>16;a[na+3>>0]=ia>>24;na=B+48|0;a[na>>0]=ja;a[na+1>>0]=ja>>8;a[na+2>>0]=ja>>16;a[na+3>>0]=ja>>24;na=B+52|0;a[na>>0]=ka;a[na+1>>0]=ka>>8;a[na+2>>0]=ka>>16;a[na+3>>0]=ka>>24;na=B+56|0;a[na>>0]=la;a[na+1>>0]=la>>8;a[na+2>>0]=la>>16;a[na+3>>0]=la>>24;na=B+60|0;a[na>>0]=ma;a[na+1>>0]=ma>>8;a[na+2>>0]=ma>>16;a[na+3>>0]=ma>>24;if(h>>>0<0|(h|0)==0&g>>>0<65)break;D=le(g|0,h|0,-64,-1)|0;e=e+64|0;f=B+64|0;h=C;g=D;D=k}if((E?(g|0)!=0:0)?(a[j>>0]=f,(g|0)!=1):0){e=1;do{a[j+e>>0]=a[B+e>>0]|0;e=e+1|0}while((e|0)!=(g|0))}c[b+48>>2]=l;c[b+52>>2]=k}i=U;return}function Hd(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;be(a,b,c,d,e,0,0,f);return}function Id(b,c){b=b|0;c=c|0;var d=0,e=0;d=0;e=0;do{d=(a[c+e>>0]^a[b+e>>0])&255|d;e=e+1|0}while((e|0)!=16);return ((d+511|0)>>>8&1)+-1|0}function Jd(b,c){b=b|0;c=c|0;var d=0,e=0;d=0;e=0;do{d=(a[c+e>>0]^a[b+e>>0])&255|d;e=e+1|0}while((e|0)!=32);return ((d+511|0)>>>8&1)+-1|0}function Kd(){return na(0)|0}function Ld(){na(1);return}function Md(a){a=a|0;var b=0;if(a>>>0<2)b=0;else{do b=na(0)|0;while(b>>>0<(((0-a|0)>>>0)%(a>>>0)|0)>>>0);b=(b>>>0)%(a>>>0)|0}return b|0}function Nd(b,c){b=b|0;c=c|0;var d=0;if(c){d=0;do{a[b+d>>0]=na(0)|0;d=d+1|0}while((d|0)!=(c|0))}return}function Od(){return 0}function Pd(b,c,d){b=b|0;c=c|0;d=d|0;if(!(d>>>0<1|(d|0)==1&c>>>0<0))da(34085,34105,172,34131);if(c){d=0;do{a[b+d>>0]=na(0)|0;d=d+1|0}while((d|0)!=(c|0))}return}function Qd(){var a=0;if(!(c[8066]|0)){Ld();Vd();c[8066]=1;a=0}else a=1;return a|0}function Rd(b,d){b=b|0;d=d|0;var e=0,f=0;e=i;f=i=i+63&-64;i=i+16|0;c[f>>2]=b;if(d){b=0;do{a[(c[f>>2]|0)+b>>0]=0;b=b+1|0}while((b|0)!=(d|0))}i=e;return}function Sd(b,d){b=b|0;d=d|0;var e=0,f=0;e=i;f=i=i+63&-64;i=i+16|0;c[f+4>>2]=b;c[f>>2]=d;b=0;d=0;do{b=a[(c[f>>2]|0)+d>>0]^a[(c[f+4>>2]|0)+d>>0]|b;d=d+1|0}while((d|0)!=32);i=e;return (((b&255)+511|0)>>>8&1)+-1|0}function Td(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0;if(!(f>>>0<2147483647&f<<1>>>0<c>>>0))fa();if(!f)c=0;else{c=0;do{h=d[e+c>>0]|0;g=c<<1;a[b+g>>0]=(h>>>4)+87+(((h>>>4)+65526|0)>>>8&217);a[b+(g|1)>>0]=(((h&15)<<8)+22272+((h&15)+65526&55552)|0)>>>8;c=c+1|0}while((c|0)!=(f|0));c=f<<1}a[b+c>>0]=0;return b|0}function Ud(b,e,f,g,h,i,j){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0;a:do if(!g){n=0;l=0;m=0;k=0}else{n=0;q=0;l=0;k=0;while(1){p=k<<24>>24==0;while(1){o=d[f+l>>0]|0;m=(((o&223)+201&255)+65526^((o&223)+201&255)+65520)>>>8;if((m|((o^48)+65526|0)>>>8)&255)break;if(!((h|0)!=0&p)){m=0;break a}if(!(de(h,o)|0)){m=0;k=0;break a}l=l+1|0;if(l>>>0>=g>>>0){m=0;k=0;break a}}m=m&(o&223)+201|((o^48)+65526|0)>>>8&(o^48);if(n>>>0>=e>>>0)break;if(p)m=m<<4&255;else{a[b+n>>0]=m|q&255;n=n+1|0;m=q}k=(k&255^255)&255;l=l+1|0;if(l>>>0<g>>>0)q=m;else{m=0;break a}}c[(ce()|0)>>2]=34;m=-1}while(0);if(j)c[j>>2]=f+(((k<<24>>24!=0)<<31>>31)+l);if(i)c[i>>2]=n;return m|0}function Vd(){var a=0;a=ha(30)|0;if((a|0)>0)c[8067]=a;else a=c[8067]|0;if(a>>>0<16)fa();else{Nd(34143,16);return}}function Wd(){return 34159}function Xd(){return 9}function Yd(){return 3}function Zd(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0;j=i;k=i=i+63&-64;i=i+320|0;h=k+280|0;g=h+32|0;do{a[h>>0]=a[e>>0]|0;h=h+1|0;e=e+1|0}while((h|0)<(g|0));a[k+280>>0]=(d[k+280>>0]|0)&248;a[k+280+31>>0]=(d[k+280+31>>0]|0)&63|64;yb(k+240|0,f);ub(k+200|0);tb(k+160|0);xb(k+120|0,k+240|0);ub(k+80|0);e=254;g=0;while(1){B=g;g=(d[k+280+((e|0)/8|0)>>0]|0)>>>(e&7)&1;B=g^B;$d(k+200|0,k+120|0,B);$d(k+160|0,k+80|0,B);Gb(k+40|0,k+120|0,k+80|0);Gb(k,k+200|0,k+160|0);vb(k+200|0,k+200|0,k+160|0);vb(k+160|0,k+120|0,k+80|0);Ab(k+80|0,k+40|0,k+200|0);Ab(k+160|0,k+160|0,k);Cb(k+40|0,k);Cb(k,k+200|0);vb(k+120|0,k+80|0,k+160|0);Gb(k+160|0,k+80|0,k+160|0);Ab(k+200|0,k,k+40|0);Gb(k,k,k+40|0);Cb(k+160|0,k+160|0);B=c[k>>2]|0;A=c[k+4>>2]|0;z=c[k+8>>2]|0;y=c[k+12>>2]|0;x=c[k+16>>2]|0;s=c[k+20>>2]|0;v=c[k+24>>2]|0;E=c[k+28>>2]|0;t=c[k+32>>2]|0;D=c[k+36>>2]|0;B=ve(B|0,((B|0)<0)<<31>>31|0,121666,0)|0;q=C;A=ve(A|0,((A|0)<0)<<31>>31|0,121666,0)|0;r=C;z=ve(z|0,((z|0)<0)<<31>>31|0,121666,0)|0;o=C;y=ve(y|0,((y|0)<0)<<31>>31|0,121666,0)|0;p=C;x=ve(x|0,((x|0)<0)<<31>>31|0,121666,0)|0;m=C;s=ve(s|0,((s|0)<0)<<31>>31|0,121666,0)|0;n=C;v=ve(v|0,((v|0)<0)<<31>>31|0,121666,0)|0;f=C;E=ve(E|0,((E|0)<0)<<31>>31|0,121666,0)|0;l=C;t=ve(t|0,((t|0)<0)<<31>>31|0,121666,0)|0;u=C;D=ve(D|0,((D|0)<0)<<31>>31|0,121666,0)|0;h=C;F=le(D|0,h|0,16777216,0)|0;F=je(F|0,C|0,25)|0;w=C;G=ve(F|0,w|0,19,0)|0;q=le(G|0,C|0,B|0,q|0)|0;B=C;w=oe(F|0,w|0,25)|0;w=ke(D|0,h|0,w|0,C|0)|0;h=C;D=le(A|0,r|0,16777216,0)|0;D=je(D|0,C|0,25)|0;F=C;o=le(D|0,F|0,z|0,o|0)|0;z=C;F=oe(D|0,F|0,25)|0;F=ke(A|0,r|0,F|0,C|0)|0;r=C;A=le(y|0,p|0,16777216,0)|0;A=je(A|0,C|0,25)|0;D=C;m=le(A|0,D|0,x|0,m|0)|0;x=C;D=oe(A|0,D|0,25)|0;D=ke(y|0,p|0,D|0,C|0)|0;p=C;y=le(s|0,n|0,16777216,0)|0;y=je(y|0,C|0,25)|0;A=C;f=le(y|0,A|0,v|0,f|0)|0;v=C;A=oe(y|0,A|0,25)|0;A=ke(s|0,n|0,A|0,C|0)|0;n=C;s=le(E|0,l|0,16777216,0)|0;s=je(s|0,C|0,25)|0;y=C;u=le(s|0,y|0,t|0,u|0)|0;t=C;y=oe(s|0,y|0,25)|0;y=ke(E|0,l|0,y|0,C|0)|0;l=C;E=le(q|0,B|0,33554432,0)|0;E=je(E|0,C|0,26)|0;s=C;r=le(F|0,r|0,E|0,s|0)|0;s=oe(E|0,s|0,26)|0;s=ke(q|0,B|0,s|0,C|0)|0;B=le(o|0,z|0,33554432,0)|0;B=je(B|0,C|0,26)|0;q=C;p=le(D|0,p|0,B|0,q|0)|0;q=oe(B|0,q|0,26)|0;q=ke(o|0,z|0,q|0,C|0)|0;z=le(m|0,x|0,33554432,0)|0;z=je(z|0,C|0,26)|0;o=C;n=le(A|0,n|0,z|0,o|0)|0;o=oe(z|0,o|0,26)|0;o=ke(m|0,x|0,o|0,C|0)|0;x=le(f|0,v|0,33554432,0)|0;x=je(x|0,C|0,26)|0;m=C;l=le(y|0,l|0,x|0,m|0)|0;m=oe(x|0,m|0,26)|0;m=ke(f|0,v|0,m|0,C|0)|0;v=le(u|0,t|0,33554432,0)|0;v=je(v|0,C|0,26)|0;f=C;h=le(w|0,h|0,v|0,f|0)|0;f=oe(v|0,f|0,26)|0;f=ke(u|0,t|0,f|0,C|0)|0;c[k+80>>2]=s;c[k+80+4>>2]=r;c[k+80+8>>2]=q;c[k+80+12>>2]=p;c[k+80+16>>2]=o;c[k+80+20>>2]=n;c[k+80+24>>2]=m;c[k+80+28>>2]=l;c[k+80+32>>2]=f;c[k+80+36>>2]=h;Cb(k+120|0,k+120|0);vb(k+40|0,k+40|0,k+80|0);Ab(k+80|0,k+240|0,k+160|0);Ab(k+160|0,k,k+40|0);if((e|0)<=0)break;else e=e+-1|0}$d(k+200|0,k+120|0,g);$d(k+160|0,k+80|0,g);Eb(k+160|0,k+160|0);Ab(k+200|0,k+200|0,k+160|0);zb(b,k+200|0);i=j;return 0}function _d(b,c){b=b|0;c=c|0;var e=0,f=0,g=0,h=0;g=i;h=i=i+63&-64;i=i+320|0;f=h+280|0;e=f+32|0;do{a[f>>0]=a[c>>0]|0;f=f+1|0;c=c+1|0}while((f|0)<(e|0));a[h+280>>0]=(d[h+280>>0]|0)&248;a[h+280+31>>0]=(d[h+280+31>>0]|0)&63|64;Ub(h+40|0,h+280|0);vb(h+240|0,h+40+80|0,h+40+40|0);Gb(h+200|0,h+40+80|0,h+40+40|0);Eb(h+200|0,h+200|0);Ab(h,h+240|0,h+200|0);zb(b,h);i=g;return 0}function $d(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;x=c[a>>2]|0;v=c[a+4>>2]|0;t=c[a+8>>2]|0;r=c[a+12>>2]|0;p=c[a+16>>2]|0;n=c[a+20>>2]|0;l=c[a+24>>2]|0;j=c[a+28>>2]|0;h=c[a+32>>2]|0;f=c[a+36>>2]|0;w=c[b>>2]|0;u=c[b+4>>2]|0;s=c[b+8>>2]|0;q=c[b+12>>2]|0;o=c[b+16>>2]|0;m=c[b+20>>2]|0;k=c[b+24>>2]|0;i=c[b+28>>2]|0;g=c[b+32>>2]|0;e=c[b+36>>2]|0;c[a>>2]=(w^x)&0-d^x;c[a+4>>2]=(u^v)&0-d^v;c[a+8>>2]=(s^t)&0-d^t;c[a+12>>2]=(q^r)&0-d^r;c[a+16>>2]=(o^p)&0-d^p;c[a+20>>2]=(m^n)&0-d^n;c[a+24>>2]=(k^l)&0-d^l;c[a+28>>2]=(i^j)&0-d^j;c[a+32>>2]=(g^h)&0-d^h;c[a+36>>2]=(e^f)&0-d^f;c[b>>2]=(w^x)&0-d^w;c[b+4>>2]=(u^v)&0-d^u;c[b+8>>2]=(s^t)&0-d^s;c[b+12>>2]=(q^r)&0-d^q;c[b+16>>2]=(o^p)&0-d^o;c[b+20>>2]=(m^n)&0-d^m;c[b+24>>2]=(k^l)&0-d^k;c[b+28>>2]=(i^j)&0-d^i;c[b+32>>2]=(g^h)&0-d^g;c[b+36>>2]=(e^f)&0-d^e;return}function ae(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0;j=i;k=i=i+63&-64;i=i+112|0;h=k+16|0;g=h+32|0;do{a[h>>0]=a[f>>0]|0;h=h+1|0;f=f+1|0}while((h|0)<(g|0));f=d[e+4>>0]|d[e+4+1>>0]<<8|d[e+4+2>>0]<<16|d[e+4+3>>0]<<24;c[k>>2]=d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24;c[k+4>>2]=f;c[k+8>>2]=0;c[k+8+4>>2]=0;$b(k+48|0,k,k+16|0);f=0;do{a[b+f>>0]=a[k+48+f>>0]|0;f=f+1|0}while((f|0)!=32);Rd(k+48|0,64);Rd(k+16|0,32);i=j;return}function be(b,e,f,g,h,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0;p=i;q=i=i+63&-64;i=i+112|0;if(!((f|0)==0&(g|0)==0)){n=q+16|0;m=n+32|0;do{a[n>>0]=a[l>>0]|0;n=n+1|0;l=l+1|0}while((n|0)<(m|0));n=d[h+4>>0]|d[h+4+1>>0]<<8|d[h+4+2>>0]<<16|d[h+4+3>>0]<<24;c[q>>2]=d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24;c[q+4>>2]=n;a[q+8>>0]=j;n=ne(j|0,k|0,8)|0;a[q+9>>0]=n;n=ne(j|0,k|0,16)|0;a[q+10>>0]=n;n=ne(j|0,k|0,24)|0;a[q+11>>0]=n;a[q+12>>0]=k;n=ne(j|0,k|0,40)|0;a[q+13>>0]=n;n=ne(j|0,k|0,48)|0;a[q+14>>0]=n;n=ne(j|0,k|0,56)|0;a[q+15>>0]=n;if(g>>>0>0|(g|0)==0&f>>>0>63){n=le(f|0,g|0,-64,-1)|0;k=b;h=e;j=g;while(1){$b(q+48|0,q,q+16|0);l=0;do{a[k+l>>0]=a[q+48+l>>0]^a[h+l>>0];l=l+1|0}while((l|0)!=64);m=8;l=1;while(1){g=q+m|0;l=(d[g>>0]|0)+l|0;a[g>>0]=l;m=m+1|0;if((m|0)==16)break;else l=l>>>8}f=le(f|0,j|0,-64,-1)|0;j=C;if(!(j>>>0>0|(j|0)==0&f>>>0>63))break;else{k=k+64|0;h=h+64|0}}if(!((n&63|0)==0&0==0)?($b(q+48|0,q,q+16|0),(n&63|0)!=0):0){b=b+(n+64&-64)|0;f=n&63;e=e+(n+64&-64)|0;o=11}}else{$b(q+48|0,q,q+16|0);o=11}if((o|0)==11){l=0;do{a[b+l>>0]=a[q+48+l>>0]^a[e+l>>0];l=l+1|0}while((l|0)!=(f|0))}Rd(q+48|0,64);Rd(q+16|0,32)}i=p;return}function ce(){var a=0;if(!(c[8068]|0))a=32316;else a=c[(ea()|0)+60>>2]|0;return a|0}function de(b,c){b=b|0;c=c|0;b=ee(b,c)|0;return ((a[b>>0]|0)==(c&255)<<24>>24?b:0)|0}function ee(b,d){b=b|0;d=d|0;var e=0,f=0;a:do if(!(d&255))b=b+(fe(b)|0)|0;else{if(b&3)do{f=a[b>>0]|0;if(f<<24>>24==0?1:f<<24>>24==(d&255)<<24>>24)break a;b=b+1|0}while((b&3|0)!=0);f=_(d&255,16843009)|0;e=c[b>>2]|0;b:do if(!((e&-2139062144^-2139062144)&e+-16843009))do{e=e^f;if((e&-2139062144^-2139062144)&e+-16843009)break b;b=b+4|0;e=c[b>>2]|0}while(((e&-2139062144^-2139062144)&e+-16843009|0)==0);while(0);while(1){f=a[b>>0]|0;if(f<<24>>24==0?1:f<<24>>24==(d&255)<<24>>24)break;else b=b+1|0}}while(0);return b|0}function fe(b){b=b|0;var d=0,e=0,f=0;a:do if(!(b&3)){d=b;f=4}else{e=b;d=b;while(1){if(!(a[e>>0]|0))break a;e=e+1|0;d=e;if(!(d&3)){d=e;f=4;break}}}while(0);if((f|0)==4){while(1){e=c[d>>2]|0;if(!((e&-2139062144^-2139062144)&e+-16843009))d=d+4|0;else break}if((e&255)<<24>>24)do d=d+1|0;while((a[d>>0]|0)!=0)}return d-b|0}
function mc(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0;P=i;Q=i=i+63&-64;i=i+128|0;p=d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24;y=d[e+4>>0]|d[e+4+1>>0]<<8|d[e+4+2>>0]<<16|d[e+4+3>>0]<<24;M=d[e+8>>0]|d[e+8+1>>0]<<8|d[e+8+2>>0]<<16|d[e+8+3>>0]<<24;m=d[e+8+4>>0]|d[e+8+4+1>>0]<<8|d[e+8+4+2>>0]<<16|d[e+8+4+3>>0]<<24;n=d[e+16>>0]|d[e+16+1>>0]<<8|d[e+16+2>>0]<<16|d[e+16+3>>0]<<24;o=d[e+16+4>>0]|d[e+16+4+1>>0]<<8|d[e+16+4+2>>0]<<16|d[e+16+4+3>>0]<<24;q=d[e+24>>0]|d[e+24+1>>0]<<8|d[e+24+2>>0]<<16|d[e+24+3>>0]<<24;r=d[e+24+4>>0]|d[e+24+4+1>>0]<<8|d[e+24+4+2>>0]<<16|d[e+24+4+3>>0]<<24;s=d[e+32>>0]|d[e+32+1>>0]<<8|d[e+32+2>>0]<<16|d[e+32+3>>0]<<24;t=d[e+32+4>>0]|d[e+32+4+1>>0]<<8|d[e+32+4+2>>0]<<16|d[e+32+4+3>>0]<<24;u=d[e+40>>0]|d[e+40+1>>0]<<8|d[e+40+2>>0]<<16|d[e+40+3>>0]<<24;v=d[e+40+4>>0]|d[e+40+4+1>>0]<<8|d[e+40+4+2>>0]<<16|d[e+40+4+3>>0]<<24;w=d[e+48>>0]|d[e+48+1>>0]<<8|d[e+48+2>>0]<<16|d[e+48+3>>0]<<24;x=d[e+48+4>>0]|d[e+48+4+1>>0]<<8|d[e+48+4+2>>0]<<16|d[e+48+4+3>>0]<<24;z=d[e+56>>0]|d[e+56+1>>0]<<8|d[e+56+2>>0]<<16|d[e+56+3>>0]<<24;A=d[e+56+4>>0]|d[e+56+4+1>>0]<<8|d[e+56+4+2>>0]<<16|d[e+56+4+3>>0]<<24;B=d[e+64>>0]|d[e+64+1>>0]<<8|d[e+64+2>>0]<<16|d[e+64+3>>0]<<24;D=d[e+64+4>>0]|d[e+64+4+1>>0]<<8|d[e+64+4+2>>0]<<16|d[e+64+4+3>>0]<<24;E=d[e+72>>0]|d[e+72+1>>0]<<8|d[e+72+2>>0]<<16|d[e+72+3>>0]<<24;F=d[e+72+4>>0]|d[e+72+4+1>>0]<<8|d[e+72+4+2>>0]<<16|d[e+72+4+3>>0]<<24;G=d[e+80>>0]|d[e+80+1>>0]<<8|d[e+80+2>>0]<<16|d[e+80+3>>0]<<24;H=d[e+80+4>>0]|d[e+80+4+1>>0]<<8|d[e+80+4+2>>0]<<16|d[e+80+4+3>>0]<<24;I=d[e+88>>0]|d[e+88+1>>0]<<8|d[e+88+2>>0]<<16|d[e+88+3>>0]<<24;J=d[e+88+4>>0]|d[e+88+4+1>>0]<<8|d[e+88+4+2>>0]<<16|d[e+88+4+3>>0]<<24;K=d[e+96>>0]|d[e+96+1>>0]<<8|d[e+96+2>>0]<<16|d[e+96+3>>0]<<24;L=d[e+96+4>>0]|d[e+96+4+1>>0]<<8|d[e+96+4+2>>0]<<16|d[e+96+4+3>>0]<<24;N=d[e+104>>0]|d[e+104+1>>0]<<8|d[e+104+2>>0]<<16|d[e+104+3>>0]<<24;O=d[e+104+4>>0]|d[e+104+4+1>>0]<<8|d[e+104+4+2>>0]<<16|d[e+104+4+3>>0]<<24;j=d[e+112>>0]|d[e+112+1>>0]<<8|d[e+112+2>>0]<<16|d[e+112+3>>0]<<24;k=d[e+112+4>>0]|d[e+112+4+1>>0]<<8|d[e+112+4+2>>0]<<16|d[e+112+4+3>>0]<<24;l=d[e+120>>0]|d[e+120+1>>0]<<8|d[e+120+2>>0]<<16|d[e+120+3>>0]<<24;e=d[e+120+4>>0]|d[e+120+4+1>>0]<<8|d[e+120+4+2>>0]<<16|d[e+120+4+3>>0]<<24;f=Q;g=b;h=f+64|0;do{a[f>>0]=a[g>>0]|0;f=f+1|0;g=g+1|0}while((f|0)<(h|0));c[Q+80>>2]=-23791573;c[Q+80+4>>2]=1013904242;c[Q+88>>2]=1595750129;c[Q+88+4>>2]=-1521486534;h=(d[b+64>>0]|d[b+64+1>>0]<<8|d[b+64+2>>0]<<16|d[b+64+3>>0]<<24)^-1377402159;ma=(d[b+64+4>>0]|d[b+64+4+1>>0]<<8|d[b+64+4+2>>0]<<16|d[b+64+4+3>>0]<<24)^1359893119;ba=(d[b+72>>0]|d[b+72+1>>0]<<8|d[b+72+2>>0]<<16|d[b+72+3>>0]<<24)^725511199;ga=(d[b+72+4>>0]|d[b+72+4+1>>0]<<8|d[b+72+4+2>>0]<<16|d[b+72+4+3>>0]<<24)^-1694144372;X=(d[b+80>>0]|d[b+80+1>>0]<<8|d[b+80+2>>0]<<16|d[b+80+3>>0]<<24)^-79577749;aa=(d[b+80+4>>0]|d[b+80+4+1>>0]<<8|d[b+80+4+2>>0]<<16|d[b+80+4+3>>0]<<24)^528734635;ia=(d[b+88>>0]|d[b+88+1>>0]<<8|d[b+88+2>>0]<<16|d[b+88+3>>0]<<24)^327033209;na=(d[b+88+4>>0]|d[b+88+4+1>>0]<<8|d[b+88+4+2>>0]<<16|d[b+88+4+3>>0]<<24)^1541459225;c[Q+120>>2]=ia;c[Q+120+4>>2]=na;da=c[Q+32>>2]|0;U=c[Q+32+4>>2]|0;g=le(da|0,U|0,c[Q>>2]|0,c[Q+4>>2]|0)|0;g=le(g|0,C|0,p|0,y|0)|0;$=C;Y=le(ma^$|0,h^g|0,-205731576,1779033703)|0;_=C;V=ne(Y^da|0,_^U|0,24)|0;ha=C;U=oe(Y^da|0,_^U|0,40)|0;ha=C|ha;da=le(M|0,m|0,g|0,$|0)|0;da=le(da|0,C|0,U|V|0,ha|0)|0;R=C;c[Q>>2]=da;c[Q+4>>2]=R;ja=ne(da^(ma^$)|0,R^(h^g)|0,16)|0;Z=C;g=oe(da^(ma^$)|0,R^(h^g)|0,48)|0;Z=C|Z;c[Q+96>>2]=g|ja;c[Q+96+4>>2]=Z;_=le(g|ja|0,Z|0,Y|0,_|0)|0;Y=C;c[Q+64>>2]=_;c[Q+64+4>>2]=Y;Z=ne(_^(U|V)|0,Y^ha|0,63)|0;ja=C;ha=oe(_^(U|V)|0,Y^ha|0,1)|0;c[Q+32>>2]=ha|Z;c[Q+32+4>>2]=C|ja;ja=c[Q+40>>2]|0;Z=c[Q+40+4>>2]|0;ha=le(ja|0,Z|0,c[Q+8>>2]|0,c[Q+8+4>>2]|0)|0;ha=le(ha|0,C|0,n|0,o|0)|0;Y=C;V=le(ga^Y|0,ba^ha|0,-2067093701,-1150833019)|0;U=C;_=ne(V^ja|0,U^Z|0,24)|0;g=C;Z=oe(V^ja|0,U^Z|0,40)|0;g=C|g;ja=le(q|0,r|0,ha|0,Y|0)|0;ja=le(ja|0,C|0,Z|_|0,g|0)|0;h=C;c[Q+8>>2]=ja;c[Q+8+4>>2]=h;$=ne(ja^(ga^Y)|0,h^(ba^ha)|0,16)|0;ma=C;ha=oe(ja^(ga^Y)|0,h^(ba^ha)|0,48)|0;ma=C|ma;c[Q+104>>2]=ha|$;c[Q+104+4>>2]=ma;U=le(ha|$|0,ma|0,V|0,U|0)|0;V=C;c[Q+72>>2]=U;c[Q+72+4>>2]=V;ma=ne(U^(Z|_)|0,V^g|0,63)|0;$=C;g=oe(U^(Z|_)|0,V^g|0,1)|0;$=C|$;V=c[Q+48>>2]|0;_=c[Q+48+4>>2]|0;Z=le(V|0,_|0,c[Q+16>>2]|0,c[Q+16+4>>2]|0)|0;Z=le(Z|0,C|0,s|0,t|0)|0;U=C;ha=le(aa^U|0,X^Z|0,-23791573,1013904242)|0;ba=C;Y=ne(ha^V|0,ba^_|0,24)|0;ga=C;_=oe(ha^V|0,ba^_|0,40)|0;ga=C|ga;V=le(u|0,v|0,Z|0,U|0)|0;V=le(V|0,C|0,_|Y|0,ga|0)|0;ka=C;c[Q+16>>2]=V;c[Q+16+4>>2]=ka;la=ne(V^(aa^U)|0,ka^(X^Z)|0,16)|0;fa=C;Z=oe(V^(aa^U)|0,ka^(X^Z)|0,48)|0;fa=C|fa;c[Q+112>>2]=Z|la;c[Q+112+4>>2]=fa;ba=le(Z|la|0,fa|0,ha|0,ba|0)|0;ha=C;fa=ne(ba^(_|Y)|0,ha^ga|0,63)|0;la=C;ga=oe(ba^(_|Y)|0,ha^ga|0,1)|0;la=C|la;Y=c[Q+56>>2]|0;_=c[Q+56+4>>2]|0;Z=le(Y|0,_|0,c[Q+24>>2]|0,c[Q+24+4>>2]|0)|0;Z=le(Z|0,C|0,w|0,x|0)|0;X=C;U=le(na^X|0,ia^Z|0,c[Q+88>>2]|0,c[Q+88+4>>2]|0)|0;aa=C;S=ne(U^Y|0,aa^_|0,24)|0;ca=C;_=oe(U^Y|0,aa^_|0,40)|0;ca=C|ca;Y=le(z|0,A|0,Z|0,X|0)|0;Y=le(Y|0,C|0,_|S|0,ca|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;ea=ne(Y^(na^X)|0,T^(ia^Z)|0,16)|0;f=C;Z=oe(Y^(na^X)|0,T^(ia^Z)|0,48)|0;f=C|f;aa=le(Z|ea|0,f|0,U|0,aa|0)|0;U=C;ia=ne(aa^(_|S)|0,U^ca|0,63)|0;X=C;ca=oe(aa^(_|S)|0,U^ca|0,1)|0;X=C|X;R=le(g|ma|0,$|0,da|0,R|0)|0;R=le(R|0,C|0,B|0,D|0)|0;da=C;ha=le(f^da|0,(Z|ea)^R|0,ba|0,ha|0)|0;ba=C;S=ne(ha^(g|ma)|0,ba^$|0,24)|0;_=C;$=oe(ha^(g|ma)|0,ba^$|0,40)|0;_=C|_;ma=le(E|0,F|0,R|0,da|0)|0;ma=le(ma|0,C|0,$|S|0,_|0)|0;g=C;c[Q>>2]=ma;c[Q+4>>2]=g;na=ne(ma^(f^da)|0,g^((Z|ea)^R)|0,16)|0;W=C;R=oe(ma^(f^da)|0,g^((Z|ea)^R)|0,48)|0;W=C|W;c[Q+120>>2]=R|na;c[Q+120+4>>2]=W;ba=le(R|na|0,W|0,ha|0,ba|0)|0;ha=C;c[Q+80>>2]=ba;c[Q+80+4>>2]=ha;W=ne(ba^($|S)|0,ha^_|0,63)|0;na=C;_=oe(ba^($|S)|0,ha^_|0,1)|0;c[Q+40>>2]=_|W;c[Q+40+4>>2]=C|na;h=le(ga|fa|0,la|0,ja|0,h|0)|0;h=le(h|0,C|0,G|0,H|0)|0;ja=C;na=c[Q+96>>2]^h;W=c[Q+96+4>>2]^ja;U=le(W|0,na|0,aa|0,U|0)|0;aa=C;_=ne(U^(ga|fa)|0,aa^la|0,24)|0;ha=C;la=oe(U^(ga|fa)|0,aa^la|0,40)|0;ha=C|ha;ja=le(I|0,J|0,h|0,ja|0)|0;ja=le(ja|0,C|0,la|_|0,ha|0)|0;h=C;c[Q+8>>2]=ja;c[Q+8+4>>2]=h;fa=ne(ja^W|0,h^na|0,16)|0;ga=C;na=oe(ja^W|0,h^na|0,48)|0;ga=C|ga;aa=le(na|fa|0,ga|0,U|0,aa|0)|0;U=C;c[Q+88>>2]=aa;c[Q+88+4>>2]=U;W=ne(aa^(la|_)|0,U^ha|0,63)|0;S=C;ha=oe(aa^(la|_)|0,U^ha|0,1)|0;c[Q+48>>2]=ha|W;c[Q+48+4>>2]=C|S;ka=le(ca|ia|0,X|0,V|0,ka|0)|0;ka=le(ka|0,C|0,K|0,L|0)|0;V=C;S=c[Q+104>>2]^ka;W=c[Q+104+4>>2]^V;ha=le(W|0,S|0,c[Q+64>>2]|0,c[Q+64+4>>2]|0)|0;U=C;_=ne(ha^(ca|ia)|0,U^X|0,24)|0;la=C;X=oe(ha^(ca|ia)|0,U^X|0,40)|0;la=C|la;V=le(N|0,O|0,ka|0,V|0)|0;V=le(V|0,C|0,X|_|0,la|0)|0;ka=C;c[Q+16>>2]=V;c[Q+16+4>>2]=ka;ia=ne(V^W|0,ka^S|0,16)|0;ca=C;S=oe(V^W|0,ka^S|0,48)|0;ca=C|ca;U=le(S|ia|0,ca|0,ha|0,U|0)|0;ha=C;W=ne(U^(X|_)|0,ha^la|0,63)|0;aa=C;la=oe(U^(X|_)|0,ha^la|0,1)|0;c[Q+56>>2]=la|W;c[Q+56+4>>2]=C|aa;aa=c[Q+32>>2]|0;W=c[Q+32+4>>2]|0;T=le(aa|0,W|0,Y|0,T|0)|0;T=le(T|0,C|0,j|0,k|0)|0;Y=C;la=c[Q+112>>2]^T;_=c[Q+112+4>>2]^Y;X=le(_|0,la|0,c[Q+72>>2]|0,c[Q+72+4>>2]|0)|0;$=C;ba=ne(X^aa|0,$^W|0,24)|0;R=C;W=oe(X^aa|0,$^W|0,40)|0;R=C|R;Y=le(l|0,e|0,T|0,Y|0)|0;Y=le(Y|0,C|0,W|ba|0,R|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;aa=ne(Y^_|0,T^la|0,16)|0;ea=C;la=oe(Y^_|0,T^la|0,48)|0;ea=C|ea;$=le(la|aa|0,ea|0,X|0,$|0)|0;X=C;_=ne($^(W|ba)|0,X^R|0,63)|0;Z=C;R=oe($^(W|ba)|0,X^R|0,1)|0;Z=C|Z;g=le(j|0,k|0,ma|0,g|0)|0;g=le(g|0,C|0,R|_|0,Z|0)|0;ma=C;ha=le(ma^ga|0,g^(na|fa)|0,U|0,ha|0)|0;U=C;ba=ne(ha^(R|_)|0,U^Z|0,24)|0;W=C;Z=oe(ha^(R|_)|0,U^Z|0,40)|0;W=C|W;_=le(G|0,H|0,g|0,ma|0)|0;_=le(_|0,C|0,Z|ba|0,W|0)|0;R=C;c[Q>>2]=_;c[Q+4>>2]=R;da=ne(_^(ma^ga)|0,R^(g^(na|fa))|0,16)|0;f=C;fa=oe(_^(ma^ga)|0,R^(g^(na|fa))|0,48)|0;f=C|f;c[Q+96>>2]=fa|da;c[Q+96+4>>2]=f;U=le(fa|da|0,f|0,ha|0,U|0)|0;ha=C;c[Q+64>>2]=U;c[Q+64+4>>2]=ha;f=ne(U^(Z|ba)|0,ha^W|0,63)|0;da=C;W=oe(U^(Z|ba)|0,ha^W|0,1)|0;c[Q+32>>2]=W|f;c[Q+32+4>>2]=C|da;da=c[Q+40>>2]|0;f=c[Q+40+4>>2]|0;h=le(da|0,f|0,ja|0,h|0)|0;h=le(h|0,C|0,s|0,t|0)|0;ja=C;X=le(ca^ja|0,(S|ia)^h|0,$|0,X|0)|0;$=C;W=ne(X^da|0,$^f|0,24)|0;ha=C;f=oe(X^da|0,$^f|0,40)|0;ha=C|ha;da=le(B|0,D|0,h|0,ja|0)|0;da=le(da|0,C|0,f|W|0,ha|0)|0;ba=C;c[Q+8>>2]=da;c[Q+8+4>>2]=ba;Z=ne(da^(ca^ja)|0,ba^((S|ia)^h)|0,16)|0;U=C;h=oe(da^(ca^ja)|0,ba^((S|ia)^h)|0,48)|0;U=C|U;c[Q+104>>2]=h|Z;c[Q+104+4>>2]=U;$=le(h|Z|0,U|0,X|0,$|0)|0;X=C;c[Q+72>>2]=$;c[Q+72+4>>2]=X;U=ne($^(f|W)|0,X^ha|0,63)|0;Z=C;ha=oe($^(f|W)|0,X^ha|0,1)|0;Z=C|Z;X=c[Q+48>>2]|0;W=c[Q+48+4>>2]|0;ka=le(X|0,W|0,V|0,ka|0)|0;ka=le(ka|0,C|0,E|0,F|0)|0;V=C;f=le(ea^V|0,(la|aa)^ka|0,c[Q+80>>2]|0,c[Q+80+4>>2]|0)|0;$=C;h=ne(f^X|0,$^W|0,24)|0;ia=C;W=oe(f^X|0,$^W|0,40)|0;ia=C|ia;X=le(l|0,e|0,ka|0,V|0)|0;X=le(X|0,C|0,W|h|0,ia|0)|0;S=C;c[Q+16>>2]=X;c[Q+16+4>>2]=S;ja=ne(X^(ea^V)|0,S^((la|aa)^ka)|0,16)|0;ca=C;ka=oe(X^(ea^V)|0,S^((la|aa)^ka)|0,48)|0;ca=C|ca;c[Q+112>>2]=ka|ja;c[Q+112+4>>2]=ca;$=le(ka|ja|0,ca|0,f|0,$|0)|0;f=C;ca=ne($^(W|h)|0,f^ia|0,63)|0;ja=C;ia=oe($^(W|h)|0,f^ia|0,1)|0;ja=C|ja;h=c[Q+56>>2]|0;W=c[Q+56+4>>2]|0;T=le(h|0,W|0,Y|0,T|0)|0;T=le(T|0,C|0,N|0,O|0)|0;Y=C;ka=c[Q+120>>2]^T;aa=c[Q+120+4>>2]^Y;la=le(aa|0,ka|0,c[Q+88>>2]|0,c[Q+88+4>>2]|0)|0;V=C;ea=ne(la^h|0,V^W|0,24)|0;fa=C;W=oe(la^h|0,V^W|0,40)|0;fa=C|fa;Y=le(w|0,x|0,T|0,Y|0)|0;Y=le(Y|0,C|0,W|ea|0,fa|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;h=ne(Y^aa|0,T^ka|0,16)|0;na=C;ka=oe(Y^aa|0,T^ka|0,48)|0;na=C|na;V=le(ka|h|0,na|0,la|0,V|0)|0;la=C;aa=ne(V^(W|ea)|0,la^fa|0,63)|0;g=C;fa=oe(V^(W|ea)|0,la^fa|0,1)|0;g=C|g;R=le(ha|U|0,Z|0,_|0,R|0)|0;R=le(R|0,C|0,M|0,m|0)|0;_=C;f=le(na^_|0,(ka|h)^R|0,$|0,f|0)|0;$=C;ea=ne(f^(ha|U)|0,$^Z|0,24)|0;W=C;Z=oe(f^(ha|U)|0,$^Z|0,40)|0;W=C|W;U=le(K|0,L|0,R|0,_|0)|0;U=le(U|0,C|0,Z|ea|0,W|0)|0;ha=C;c[Q>>2]=U;c[Q+4>>2]=ha;ga=ne(U^(na^_)|0,ha^((ka|h)^R)|0,16)|0;ma=C;R=oe(U^(na^_)|0,ha^((ka|h)^R)|0,48)|0;ma=C|ma;c[Q+120>>2]=R|ga;c[Q+120+4>>2]=ma;$=le(R|ga|0,ma|0,f|0,$|0)|0;f=C;c[Q+80>>2]=$;c[Q+80+4>>2]=f;ma=ne($^(Z|ea)|0,f^W|0,63)|0;ga=C;W=oe($^(Z|ea)|0,f^W|0,1)|0;c[Q+40>>2]=W|ma;c[Q+40+4>>2]=C|ga;ba=le(ia|ca|0,ja|0,da|0,ba|0)|0;ba=le(ba|0,C|0,p|0,y|0)|0;da=C;ga=c[Q+96>>2]^ba;ma=c[Q+96+4>>2]^da;la=le(ma|0,ga|0,V|0,la|0)|0;V=C;W=ne(la^(ia|ca)|0,V^ja|0,24)|0;f=C;ja=oe(la^(ia|ca)|0,V^ja|0,40)|0;f=C|f;da=le(n|0,o|0,ba|0,da|0)|0;da=le(da|0,C|0,ja|W|0,f|0)|0;ba=C;c[Q+8>>2]=da;c[Q+8+4>>2]=ba;ca=ne(da^ma|0,ba^ga|0,16)|0;ia=C;ga=oe(da^ma|0,ba^ga|0,48)|0;ia=C|ia;V=le(ga|ca|0,ia|0,la|0,V|0)|0;la=C;c[Q+88>>2]=V;c[Q+88+4>>2]=la;ma=ne(V^(ja|W)|0,la^f|0,63)|0;ea=C;f=oe(V^(ja|W)|0,la^f|0,1)|0;c[Q+48>>2]=f|ma;c[Q+48+4>>2]=C|ea;S=le(fa|aa|0,g|0,X|0,S|0)|0;S=le(S|0,C|0,I|0,J|0)|0;X=C;ea=c[Q+104>>2]^S;ma=c[Q+104+4>>2]^X;f=le(ma|0,ea|0,c[Q+64>>2]|0,c[Q+64+4>>2]|0)|0;la=C;W=ne(f^(fa|aa)|0,la^g|0,24)|0;ja=C;g=oe(f^(fa|aa)|0,la^g|0,40)|0;ja=C|ja;X=le(z|0,A|0,S|0,X|0)|0;X=le(X|0,C|0,g|W|0,ja|0)|0;S=C;c[Q+16>>2]=X;c[Q+16+4>>2]=S;aa=ne(X^ma|0,S^ea|0,16)|0;fa=C;ea=oe(X^ma|0,S^ea|0,48)|0;fa=C|fa;la=le(ea|aa|0,fa|0,f|0,la|0)|0;f=C;ma=ne(la^(g|W)|0,f^ja|0,63)|0;V=C;ja=oe(la^(g|W)|0,f^ja|0,1)|0;c[Q+56>>2]=ja|ma;c[Q+56+4>>2]=C|V;V=c[Q+32>>2]|0;ma=c[Q+32+4>>2]|0;T=le(V|0,ma|0,Y|0,T|0)|0;T=le(T|0,C|0,u|0,v|0)|0;Y=C;ja=c[Q+112>>2]^T;W=c[Q+112+4>>2]^Y;g=le(W|0,ja|0,c[Q+72>>2]|0,c[Q+72+4>>2]|0)|0;Z=C;$=ne(g^V|0,Z^ma|0,24)|0;R=C;ma=oe(g^V|0,Z^ma|0,40)|0;R=C|R;Y=le(q|0,r|0,T|0,Y|0)|0;Y=le(Y|0,C|0,ma|$|0,R|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;V=ne(Y^W|0,T^ja|0,16)|0;h=C;ja=oe(Y^W|0,T^ja|0,48)|0;h=C|h;Z=le(ja|V|0,h|0,g|0,Z|0)|0;g=C;W=ne(Z^(ma|$)|0,g^R|0,63)|0;ka=C;R=oe(Z^(ma|$)|0,g^R|0,1)|0;ka=C|ka;ha=le(I|0,J|0,U|0,ha|0)|0;ha=le(ha|0,C|0,R|W|0,ka|0)|0;U=C;f=le(U^ia|0,ha^(ga|ca)|0,la|0,f|0)|0;la=C;$=ne(f^(R|W)|0,la^ka|0,24)|0;ma=C;ka=oe(f^(R|W)|0,la^ka|0,40)|0;ma=C|ma;W=le(B|0,D|0,ha|0,U|0)|0;W=le(W|0,C|0,ka|$|0,ma|0)|0;R=C;c[Q>>2]=W;c[Q+4>>2]=R;_=ne(W^(U^ia)|0,R^(ha^(ga|ca))|0,16)|0;na=C;ca=oe(W^(U^ia)|0,R^(ha^(ga|ca))|0,48)|0;na=C|na;c[Q+96>>2]=ca|_;c[Q+96+4>>2]=na;la=le(ca|_|0,na|0,f|0,la|0)|0;f=C;c[Q+64>>2]=la;c[Q+64+4>>2]=f;na=ne(la^(ka|$)|0,f^ma|0,63)|0;_=C;ma=oe(la^(ka|$)|0,f^ma|0,1)|0;c[Q+32>>2]=ma|na;c[Q+32+4>>2]=C|_;_=c[Q+40>>2]|0;na=c[Q+40+4>>2]|0;ba=le(_|0,na|0,da|0,ba|0)|0;ba=le(ba|0,C|0,K|0,L|0)|0;da=C;g=le(fa^da|0,(ea|aa)^ba|0,Z|0,g|0)|0;Z=C;ma=ne(g^_|0,Z^na|0,24)|0;f=C;na=oe(g^_|0,Z^na|0,40)|0;f=C|f;_=le(p|0,y|0,ba|0,da|0)|0;_=le(_|0,C|0,na|ma|0,f|0)|0;$=C;c[Q+8>>2]=_;c[Q+8+4>>2]=$;ka=ne(_^(fa^da)|0,$^((ea|aa)^ba)|0,16)|0;la=C;ba=oe(_^(fa^da)|0,$^((ea|aa)^ba)|0,48)|0;la=C|la;c[Q+104>>2]=ba|ka;c[Q+104+4>>2]=la;Z=le(ba|ka|0,la|0,g|0,Z|0)|0;g=C;c[Q+72>>2]=Z;c[Q+72+4>>2]=g;la=ne(Z^(na|ma)|0,g^f|0,63)|0;ka=C;f=oe(Z^(na|ma)|0,g^f|0,1)|0;ka=C|ka;g=c[Q+48>>2]|0;ma=c[Q+48+4>>2]|0;S=le(g|0,ma|0,X|0,S|0)|0;S=le(S|0,C|0,u|0,v|0)|0;X=C;na=le(h^X|0,(ja|V)^S|0,c[Q+80>>2]|0,c[Q+80+4>>2]|0)|0;Z=C;ba=ne(na^g|0,Z^ma|0,24)|0;aa=C;ma=oe(na^g|0,Z^ma|0,40)|0;aa=C|aa;g=le(n|0,o|0,S|0,X|0)|0;g=le(g|0,C|0,ma|ba|0,aa|0)|0;ea=C;c[Q+16>>2]=g;c[Q+16+4>>2]=ea;da=ne(g^(h^X)|0,ea^((ja|V)^S)|0,16)|0;fa=C;S=oe(g^(h^X)|0,ea^((ja|V)^S)|0,48)|0;fa=C|fa;c[Q+112>>2]=S|da;c[Q+112+4>>2]=fa;Z=le(S|da|0,fa|0,na|0,Z|0)|0;na=C;fa=ne(Z^(ma|ba)|0,na^aa|0,63)|0;da=C;aa=oe(Z^(ma|ba)|0,na^aa|0,1)|0;da=C|da;ba=c[Q+56>>2]|0;ma=c[Q+56+4>>2]|0;T=le(ba|0,ma|0,Y|0,T|0)|0;T=le(T|0,C|0,l|0,e|0)|0;Y=C;S=c[Q+120>>2]^T;V=c[Q+120+4>>2]^Y;ja=le(V|0,S|0,c[Q+88>>2]|0,c[Q+88+4>>2]|0)|0;X=C;h=ne(ja^ba|0,X^ma|0,24)|0;ca=C;ma=oe(ja^ba|0,X^ma|0,40)|0;ca=C|ca;Y=le(N|0,O|0,T|0,Y|0)|0;Y=le(Y|0,C|0,ma|h|0,ca|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;ba=ne(Y^V|0,T^S|0,16)|0;ga=C;S=oe(Y^V|0,T^S|0,48)|0;ga=C|ga;X=le(S|ba|0,ga|0,ja|0,X|0)|0;ja=C;V=ne(X^(ma|h)|0,ja^ca|0,63)|0;ha=C;ca=oe(X^(ma|h)|0,ja^ca|0,1)|0;ha=C|ha;R=le(f|la|0,ka|0,W|0,R|0)|0;R=le(R|0,C|0,G|0,H|0)|0;W=C;na=le(ga^W|0,(S|ba)^R|0,Z|0,na|0)|0;Z=C;h=ne(na^(f|la)|0,Z^ka|0,24)|0;ma=C;ka=oe(na^(f|la)|0,Z^ka|0,40)|0;ma=C|ma;la=le(j|0,k|0,R|0,W|0)|0;la=le(la|0,C|0,ka|h|0,ma|0)|0;f=C;c[Q>>2]=la;c[Q+4>>2]=f;ia=ne(la^(ga^W)|0,f^((S|ba)^R)|0,16)|0;U=C;R=oe(la^(ga^W)|0,f^((S|ba)^R)|0,48)|0;U=C|U;c[Q+120>>2]=R|ia;c[Q+120+4>>2]=U;Z=le(R|ia|0,U|0,na|0,Z|0)|0;na=C;c[Q+80>>2]=Z;c[Q+80+4>>2]=na;U=ne(Z^(ka|h)|0,na^ma|0,63)|0;ia=C;ma=oe(Z^(ka|h)|0,na^ma|0,1)|0;c[Q+40>>2]=ma|U;c[Q+40+4>>2]=C|ia;$=le(aa|fa|0,da|0,_|0,$|0)|0;$=le($|0,C|0,q|0,r|0)|0;_=C;ia=c[Q+96>>2]^$;U=c[Q+96+4>>2]^_;ja=le(U|0,ia|0,X|0,ja|0)|0;X=C;ma=ne(ja^(aa|fa)|0,X^da|0,24)|0;na=C;da=oe(ja^(aa|fa)|0,X^da|0,40)|0;na=C|na;_=le(w|0,x|0,$|0,_|0)|0;_=le(_|0,C|0,da|ma|0,na|0)|0;$=C;c[Q+8>>2]=_;c[Q+8+4>>2]=$;fa=ne(_^U|0,$^ia|0,16)|0;aa=C;ia=oe(_^U|0,$^ia|0,48)|0;aa=C|aa;X=le(ia|fa|0,aa|0,ja|0,X|0)|0;ja=C;c[Q+88>>2]=X;c[Q+88+4>>2]=ja;U=ne(X^(da|ma)|0,ja^na|0,63)|0;h=C;na=oe(X^(da|ma)|0,ja^na|0,1)|0;c[Q+48>>2]=na|U;c[Q+48+4>>2]=C|h;ea=le(ca|V|0,ha|0,g|0,ea|0)|0;ea=le(ea|0,C|0,z|0,A|0)|0;g=C;h=c[Q+104>>2]^ea;U=c[Q+104+4>>2]^g;na=le(U|0,h|0,c[Q+64>>2]|0,c[Q+64+4>>2]|0)|0;ja=C;ma=ne(na^(ca|V)|0,ja^ha|0,24)|0;da=C;ha=oe(na^(ca|V)|0,ja^ha|0,40)|0;da=C|da;g=le(M|0,m|0,ea|0,g|0)|0;g=le(g|0,C|0,ha|ma|0,da|0)|0;ea=C;c[Q+16>>2]=g;c[Q+16+4>>2]=ea;V=ne(g^U|0,ea^h|0,16)|0;ca=C;h=oe(g^U|0,ea^h|0,48)|0;ca=C|ca;ja=le(h|V|0,ca|0,na|0,ja|0)|0;na=C;U=ne(ja^(ha|ma)|0,na^da|0,63)|0;X=C;da=oe(ja^(ha|ma)|0,na^da|0,1)|0;c[Q+56>>2]=da|U;c[Q+56+4>>2]=C|X;X=c[Q+32>>2]|0;U=c[Q+32+4>>2]|0;T=le(X|0,U|0,Y|0,T|0)|0;T=le(T|0,C|0,E|0,F|0)|0;Y=C;da=c[Q+112>>2]^T;ma=c[Q+112+4>>2]^Y;ha=le(ma|0,da|0,c[Q+72>>2]|0,c[Q+72+4>>2]|0)|0;ka=C;Z=ne(ha^X|0,ka^U|0,24)|0;R=C;U=oe(ha^X|0,ka^U|0,40)|0;R=C|R;Y=le(s|0,t|0,T|0,Y|0)|0;Y=le(Y|0,C|0,U|Z|0,R|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;X=ne(Y^ma|0,T^da|0,16)|0;ba=C;da=oe(Y^ma|0,T^da|0,48)|0;ba=C|ba;ka=le(da|X|0,ba|0,ha|0,ka|0)|0;ha=C;ma=ne(ka^(U|Z)|0,ha^R|0,63)|0;S=C;R=oe(ka^(U|Z)|0,ha^R|0,1)|0;S=C|S;f=le(z|0,A|0,la|0,f|0)|0;f=le(f|0,C|0,R|ma|0,S|0)|0;la=C;na=le(la^aa|0,f^(ia|fa)|0,ja|0,na|0)|0;ja=C;Z=ne(na^(R|ma)|0,ja^S|0,24)|0;U=C;S=oe(na^(R|ma)|0,ja^S|0,40)|0;U=C|U;ma=le(E|0,F|0,f|0,la|0)|0;ma=le(ma|0,C|0,S|Z|0,U|0)|0;R=C;c[Q>>2]=ma;c[Q+4>>2]=R;W=ne(ma^(la^aa)|0,R^(f^(ia|fa))|0,16)|0;ga=C;fa=oe(ma^(la^aa)|0,R^(f^(ia|fa))|0,48)|0;ga=C|ga;c[Q+96>>2]=fa|W;c[Q+96+4>>2]=ga;ja=le(fa|W|0,ga|0,na|0,ja|0)|0;na=C;c[Q+64>>2]=ja;c[Q+64+4>>2]=na;ga=ne(ja^(S|Z)|0,na^U|0,63)|0;W=C;U=oe(ja^(S|Z)|0,na^U|0,1)|0;c[Q+32>>2]=U|ga;c[Q+32+4>>2]=C|W;W=c[Q+40>>2]|0;ga=c[Q+40+4>>2]|0;$=le(W|0,ga|0,_|0,$|0)|0;$=le($|0,C|0,q|0,r|0)|0;_=C;ha=le(ca^_|0,(h|V)^$|0,ka|0,ha|0)|0;ka=C;U=ne(ha^W|0,ka^ga|0,24)|0;na=C;ga=oe(ha^W|0,ka^ga|0,40)|0;na=C|na;W=le(M|0,m|0,$|0,_|0)|0;W=le(W|0,C|0,ga|U|0,na|0)|0;Z=C;c[Q+8>>2]=W;c[Q+8+4>>2]=Z;S=ne(W^(ca^_)|0,Z^((h|V)^$)|0,16)|0;ja=C;$=oe(W^(ca^_)|0,Z^((h|V)^$)|0,48)|0;ja=C|ja;c[Q+104>>2]=$|S;c[Q+104+4>>2]=ja;ka=le($|S|0,ja|0,ha|0,ka|0)|0;ha=C;c[Q+72>>2]=ka;c[Q+72+4>>2]=ha;ja=ne(ka^(ga|U)|0,ha^na|0,63)|0;S=C;na=oe(ka^(ga|U)|0,ha^na|0,1)|0;S=C|S;ha=c[Q+48>>2]|0;U=c[Q+48+4>>2]|0;ea=le(ha|0,U|0,g|0,ea|0)|0;ea=le(ea|0,C|0,N|0,O|0)|0;g=C;ga=le(ba^g|0,(da|X)^ea|0,c[Q+80>>2]|0,c[Q+80+4>>2]|0)|0;ka=C;$=ne(ga^ha|0,ka^U|0,24)|0;V=C;U=oe(ga^ha|0,ka^U|0,40)|0;V=C|V;ha=le(K|0,L|0,ea|0,g|0)|0;ha=le(ha|0,C|0,U|$|0,V|0)|0;h=C;c[Q+16>>2]=ha;c[Q+16+4>>2]=h;_=ne(ha^(ba^g)|0,h^((da|X)^ea)|0,16)|0;ca=C;ea=oe(ha^(ba^g)|0,h^((da|X)^ea)|0,48)|0;ca=C|ca;c[Q+112>>2]=ea|_;c[Q+112+4>>2]=ca;ka=le(ea|_|0,ca|0,ga|0,ka|0)|0;ga=C;ca=ne(ka^(U|$)|0,ga^V|0,63)|0;_=C;V=oe(ka^(U|$)|0,ga^V|0,1)|0;_=C|_;$=c[Q+56>>2]|0;U=c[Q+56+4>>2]|0;T=le($|0,U|0,Y|0,T|0)|0;T=le(T|0,C|0,I|0,J|0)|0;Y=C;ea=c[Q+120>>2]^T;X=c[Q+120+4>>2]^Y;da=le(X|0,ea|0,c[Q+88>>2]|0,c[Q+88+4>>2]|0)|0;g=C;ba=ne(da^$|0,g^U|0,24)|0;fa=C;U=oe(da^$|0,g^U|0,40)|0;fa=C|fa;Y=le(j|0,k|0,T|0,Y|0)|0;Y=le(Y|0,C|0,U|ba|0,fa|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;$=ne(Y^X|0,T^ea|0,16)|0;ia=C;ea=oe(Y^X|0,T^ea|0,48)|0;ia=C|ia;g=le(ea|$|0,ia|0,da|0,g|0)|0;da=C;X=ne(g^(U|ba)|0,da^fa|0,63)|0;f=C;fa=oe(g^(U|ba)|0,da^fa|0,1)|0;f=C|f;R=le(na|ja|0,S|0,ma|0,R|0)|0;R=le(R|0,C|0,n|0,o|0)|0;ma=C;ga=le(ia^ma|0,(ea|$)^R|0,ka|0,ga|0)|0;ka=C;ba=ne(ga^(na|ja)|0,ka^S|0,24)|0;U=C;S=oe(ga^(na|ja)|0,ka^S|0,40)|0;U=C|U;ja=le(w|0,x|0,R|0,ma|0)|0;ja=le(ja|0,C|0,S|ba|0,U|0)|0;na=C;c[Q>>2]=ja;c[Q+4>>2]=na;aa=ne(ja^(ia^ma)|0,na^((ea|$)^R)|0,16)|0;la=C;R=oe(ja^(ia^ma)|0,na^((ea|$)^R)|0,48)|0;la=C|la;c[Q+120>>2]=R|aa;c[Q+120+4>>2]=la;ka=le(R|aa|0,la|0,ga|0,ka|0)|0;ga=C;c[Q+80>>2]=ka;c[Q+80+4>>2]=ga;la=ne(ka^(S|ba)|0,ga^U|0,63)|0;aa=C;U=oe(ka^(S|ba)|0,ga^U|0,1)|0;c[Q+40>>2]=U|la;c[Q+40+4>>2]=C|aa;Z=le(V|ca|0,_|0,W|0,Z|0)|0;Z=le(Z|0,C|0,u|0,v|0)|0;W=C;aa=c[Q+96>>2]^Z;la=c[Q+96+4>>2]^W;da=le(la|0,aa|0,g|0,da|0)|0;g=C;U=ne(da^(V|ca)|0,g^_|0,24)|0;ga=C;_=oe(da^(V|ca)|0,g^_|0,40)|0;ga=C|ga;W=le(G|0,H|0,Z|0,W|0)|0;W=le(W|0,C|0,_|U|0,ga|0)|0;Z=C;c[Q+8>>2]=W;c[Q+8+4>>2]=Z;ca=ne(W^la|0,Z^aa|0,16)|0;V=C;aa=oe(W^la|0,Z^aa|0,48)|0;V=C|V;g=le(aa|ca|0,V|0,da|0,g|0)|0;da=C;c[Q+88>>2]=g;c[Q+88+4>>2]=da;la=ne(g^(_|U)|0,da^ga|0,63)|0;ba=C;ga=oe(g^(_|U)|0,da^ga|0,1)|0;c[Q+48>>2]=ga|la;c[Q+48+4>>2]=C|ba;h=le(fa|X|0,f|0,ha|0,h|0)|0;h=le(h|0,C|0,s|0,t|0)|0;ha=C;ba=c[Q+104>>2]^h;la=c[Q+104+4>>2]^ha;ga=le(la|0,ba|0,c[Q+64>>2]|0,c[Q+64+4>>2]|0)|0;da=C;U=ne(ga^(fa|X)|0,da^f|0,24)|0;_=C;f=oe(ga^(fa|X)|0,da^f|0,40)|0;_=C|_;ha=le(p|0,y|0,h|0,ha|0)|0;ha=le(ha|0,C|0,f|U|0,_|0)|0;h=C;c[Q+16>>2]=ha;c[Q+16+4>>2]=h;X=ne(ha^la|0,h^ba|0,16)|0;fa=C;ba=oe(ha^la|0,h^ba|0,48)|0;fa=C|fa;da=le(ba|X|0,fa|0,ga|0,da|0)|0;ga=C;la=ne(da^(f|U)|0,ga^_|0,63)|0;g=C;_=oe(da^(f|U)|0,ga^_|0,1)|0;c[Q+56>>2]=_|la;c[Q+56+4>>2]=C|g;g=c[Q+32>>2]|0;la=c[Q+32+4>>2]|0;T=le(g|0,la|0,Y|0,T|0)|0;T=le(T|0,C|0,l|0,e|0)|0;Y=C;_=c[Q+112>>2]^T;U=c[Q+112+4>>2]^Y;f=le(U|0,_|0,c[Q+72>>2]|0,c[Q+72+4>>2]|0)|0;S=C;ka=ne(f^g|0,S^la|0,24)|0;R=C;la=oe(f^g|0,S^la|0,40)|0;R=C|R;Y=le(B|0,D|0,T|0,Y|0)|0;Y=le(Y|0,C|0,la|ka|0,R|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;g=ne(Y^U|0,T^_|0,16)|0;$=C;_=oe(Y^U|0,T^_|0,48)|0;$=C|$;S=le(_|g|0,$|0,f|0,S|0)|0;f=C;U=ne(S^(la|ka)|0,f^R|0,63)|0;ea=C;R=oe(S^(la|ka)|0,f^R|0,1)|0;ea=C|ea;na=le(E|0,F|0,ja|0,na|0)|0;na=le(na|0,C|0,R|U|0,ea|0)|0;ja=C;ga=le(ja^V|0,na^(aa|ca)|0,da|0,ga|0)|0;da=C;ka=ne(ga^(R|U)|0,da^ea|0,24)|0;la=C;ea=oe(ga^(R|U)|0,da^ea|0,40)|0;la=C|la;U=le(p|0,y|0,na|0,ja|0)|0;U=le(U|0,C|0,ea|ka|0,la|0)|0;R=C;c[Q>>2]=U;c[Q+4>>2]=R;ma=ne(U^(ja^V)|0,R^(na^(aa|ca))|0,16)|0;ia=C;ca=oe(U^(ja^V)|0,R^(na^(aa|ca))|0,48)|0;ia=C|ia;c[Q+96>>2]=ca|ma;c[Q+96+4>>2]=ia;da=le(ca|ma|0,ia|0,ga|0,da|0)|0;ga=C;c[Q+64>>2]=da;c[Q+64+4>>2]=ga;ia=ne(da^(ea|ka)|0,ga^la|0,63)|0;ma=C;la=oe(da^(ea|ka)|0,ga^la|0,1)|0;c[Q+32>>2]=la|ia;c[Q+32+4>>2]=C|ma;ma=c[Q+40>>2]|0;ia=c[Q+40+4>>2]|0;Z=le(ma|0,ia|0,W|0,Z|0)|0;Z=le(Z|0,C|0,u|0,v|0)|0;W=C;f=le(fa^W|0,(ba|X)^Z|0,S|0,f|0)|0;S=C;la=ne(f^ma|0,S^ia|0,24)|0;ga=C;ia=oe(f^ma|0,S^ia|0,40)|0;ga=C|ga;ma=le(z|0,A|0,Z|0,W|0)|0;ma=le(ma|0,C|0,ia|la|0,ga|0)|0;ka=C;c[Q+8>>2]=ma;c[Q+8+4>>2]=ka;ea=ne(ma^(fa^W)|0,ka^((ba|X)^Z)|0,16)|0;da=C;Z=oe(ma^(fa^W)|0,ka^((ba|X)^Z)|0,48)|0;da=C|da;c[Q+104>>2]=Z|ea;c[Q+104+4>>2]=da;S=le(Z|ea|0,da|0,f|0,S|0)|0;f=C;c[Q+72>>2]=S;c[Q+72+4>>2]=f;da=ne(S^(ia|la)|0,f^ga|0,63)|0;ea=C;ga=oe(S^(ia|la)|0,f^ga|0,1)|0;ea=C|ea;f=c[Q+48>>2]|0;la=c[Q+48+4>>2]|0;h=le(f|0,la|0,ha|0,h|0)|0;h=le(h|0,C|0,n|0,o|0)|0;ha=C;ia=le($^ha|0,(_|g)^h|0,c[Q+80>>2]|0,c[Q+80+4>>2]|0)|0;S=C;Z=ne(ia^f|0,S^la|0,24)|0;X=C;la=oe(ia^f|0,S^la|0,40)|0;X=C|X;f=le(s|0,t|0,h|0,ha|0)|0;f=le(f|0,C|0,la|Z|0,X|0)|0;ba=C;c[Q+16>>2]=f;c[Q+16+4>>2]=ba;W=ne(f^($^ha)|0,ba^((_|g)^h)|0,16)|0;fa=C;h=oe(f^($^ha)|0,ba^((_|g)^h)|0,48)|0;fa=C|fa;c[Q+112>>2]=h|W;c[Q+112+4>>2]=fa;S=le(h|W|0,fa|0,ia|0,S|0)|0;ia=C;fa=ne(S^(la|Z)|0,ia^X|0,63)|0;W=C;X=oe(S^(la|Z)|0,ia^X|0,1)|0;W=C|W;Z=c[Q+56>>2]|0;la=c[Q+56+4>>2]|0;T=le(Z|0,la|0,Y|0,T|0)|0;T=le(T|0,C|0,G|0,H|0)|0;Y=C;h=c[Q+120>>2]^T;g=c[Q+120+4>>2]^Y;_=le(g|0,h|0,c[Q+88>>2]|0,c[Q+88+4>>2]|0)|0;ha=C;$=ne(_^Z|0,ha^la|0,24)|0;ca=C;la=oe(_^Z|0,ha^la|0,40)|0;ca=C|ca;Y=le(l|0,e|0,T|0,Y|0)|0;Y=le(Y|0,C|0,la|$|0,ca|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;Z=ne(Y^g|0,T^h|0,16)|0;aa=C;h=oe(Y^g|0,T^h|0,48)|0;aa=C|aa;ha=le(h|Z|0,aa|0,_|0,ha|0)|0;_=C;g=ne(ha^(la|$)|0,_^ca|0,63)|0;na=C;ca=oe(ha^(la|$)|0,_^ca|0,1)|0;na=C|na;R=le(ga|da|0,ea|0,U|0,R|0)|0;R=le(R|0,C|0,j|0,k|0)|0;U=C;ia=le(aa^U|0,(h|Z)^R|0,S|0,ia|0)|0;S=C;$=ne(ia^(ga|da)|0,S^ea|0,24)|0;la=C;ea=oe(ia^(ga|da)|0,S^ea|0,40)|0;la=C|la;da=le(M|0,m|0,R|0,U|0)|0;da=le(da|0,C|0,ea|$|0,la|0)|0;ga=C;c[Q>>2]=da;c[Q+4>>2]=ga;V=ne(da^(aa^U)|0,ga^((h|Z)^R)|0,16)|0;ja=C;R=oe(da^(aa^U)|0,ga^((h|Z)^R)|0,48)|0;ja=C|ja;c[Q+120>>2]=R|V;c[Q+120+4>>2]=ja;S=le(R|V|0,ja|0,ia|0,S|0)|0;ia=C;c[Q+80>>2]=S;c[Q+80+4>>2]=ia;ja=ne(S^(ea|$)|0,ia^la|0,63)|0;V=C;la=oe(S^(ea|$)|0,ia^la|0,1)|0;c[Q+40>>2]=la|ja;c[Q+40+4>>2]=C|V;ka=le(X|fa|0,W|0,ma|0,ka|0)|0;ka=le(ka|0,C|0,I|0,J|0)|0;ma=C;V=c[Q+96>>2]^ka;ja=c[Q+96+4>>2]^ma;_=le(ja|0,V|0,ha|0,_|0)|0;ha=C;la=ne(_^(X|fa)|0,ha^W|0,24)|0;ia=C;W=oe(_^(X|fa)|0,ha^W|0,40)|0;ia=C|ia;ma=le(K|0,L|0,ka|0,ma|0)|0;ma=le(ma|0,C|0,W|la|0,ia|0)|0;ka=C;c[Q+8>>2]=ma;c[Q+8+4>>2]=ka;fa=ne(ma^ja|0,ka^V|0,16)|0;X=C;V=oe(ma^ja|0,ka^V|0,48)|0;X=C|X;ha=le(V|fa|0,X|0,_|0,ha|0)|0;_=C;c[Q+88>>2]=ha;c[Q+88+4>>2]=_;ja=ne(ha^(W|la)|0,_^ia|0,63)|0;$=C;ia=oe(ha^(W|la)|0,_^ia|0,1)|0;c[Q+48>>2]=ia|ja;c[Q+48+4>>2]=C|$;ba=le(ca|g|0,na|0,f|0,ba|0)|0;ba=le(ba|0,C|0,w|0,x|0)|0;f=C;$=c[Q+104>>2]^ba;ja=c[Q+104+4>>2]^f;ia=le(ja|0,$|0,c[Q+64>>2]|0,c[Q+64+4>>2]|0)|0;_=C;la=ne(ia^(ca|g)|0,_^na|0,24)|0;W=C;na=oe(ia^(ca|g)|0,_^na|0,40)|0;W=C|W;f=le(B|0,D|0,ba|0,f|0)|0;f=le(f|0,C|0,na|la|0,W|0)|0;ba=C;c[Q+16>>2]=f;c[Q+16+4>>2]=ba;g=ne(f^ja|0,ba^$|0,16)|0;ca=C;$=oe(f^ja|0,ba^$|0,48)|0;ca=C|ca;_=le($|g|0,ca|0,ia|0,_|0)|0;ia=C;ja=ne(_^(na|la)|0,ia^W|0,63)|0;ha=C;W=oe(_^(na|la)|0,ia^W|0,1)|0;c[Q+56>>2]=W|ja;c[Q+56+4>>2]=C|ha;ha=c[Q+32>>2]|0;ja=c[Q+32+4>>2]|0;T=le(ha|0,ja|0,Y|0,T|0)|0;T=le(T|0,C|0,q|0,r|0)|0;Y=C;W=c[Q+112>>2]^T;la=c[Q+112+4>>2]^Y;na=le(la|0,W|0,c[Q+72>>2]|0,c[Q+72+4>>2]|0)|0;ea=C;S=ne(na^ha|0,ea^ja|0,24)|0;R=C;ja=oe(na^ha|0,ea^ja|0,40)|0;R=C|R;Y=le(N|0,O|0,T|0,Y|0)|0;Y=le(Y|0,C|0,ja|S|0,R|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;ha=ne(Y^la|0,T^W|0,16)|0;Z=C;W=oe(Y^la|0,T^W|0,48)|0;Z=C|Z;ea=le(W|ha|0,Z|0,na|0,ea|0)|0;na=C;la=ne(ea^(ja|S)|0,na^R|0,63)|0;h=C;R=oe(ea^(ja|S)|0,na^R|0,1)|0;h=C|h;ga=le(n|0,o|0,da|0,ga|0)|0;ga=le(ga|0,C|0,R|la|0,h|0)|0;da=C;ia=le(da^X|0,ga^(V|fa)|0,_|0,ia|0)|0;_=C;S=ne(ia^(R|la)|0,_^h|0,24)|0;ja=C;h=oe(ia^(R|la)|0,_^h|0,40)|0;ja=C|ja;la=le(K|0,L|0,ga|0,da|0)|0;la=le(la|0,C|0,h|S|0,ja|0)|0;R=C;c[Q>>2]=la;c[Q+4>>2]=R;U=ne(la^(da^X)|0,R^(ga^(V|fa))|0,16)|0;aa=C;fa=oe(la^(da^X)|0,R^(ga^(V|fa))|0,48)|0;aa=C|aa;c[Q+96>>2]=fa|U;c[Q+96+4>>2]=aa;_=le(fa|U|0,aa|0,ia|0,_|0)|0;ia=C;c[Q+64>>2]=_;c[Q+64+4>>2]=ia;aa=ne(_^(h|S)|0,ia^ja|0,63)|0;U=C;ja=oe(_^(h|S)|0,ia^ja|0,1)|0;c[Q+32>>2]=ja|aa;c[Q+32+4>>2]=C|U;U=c[Q+40>>2]|0;aa=c[Q+40+4>>2]|0;ka=le(U|0,aa|0,ma|0,ka|0)|0;ka=le(ka|0,C|0,w|0,x|0)|0;ma=C;na=le(ca^ma|0,($|g)^ka|0,ea|0,na|0)|0;ea=C;ja=ne(na^U|0,ea^aa|0,24)|0;ia=C;aa=oe(na^U|0,ea^aa|0,40)|0;ia=C|ia;U=le(G|0,H|0,ka|0,ma|0)|0;U=le(U|0,C|0,aa|ja|0,ia|0)|0;S=C;c[Q+8>>2]=U;c[Q+8+4>>2]=S;h=ne(U^(ca^ma)|0,S^(($|g)^ka)|0,16)|0;_=C;ka=oe(U^(ca^ma)|0,S^(($|g)^ka)|0,48)|0;_=C|_;c[Q+104>>2]=ka|h;c[Q+104+4>>2]=_;ea=le(ka|h|0,_|0,na|0,ea|0)|0;na=C;c[Q+72>>2]=ea;c[Q+72+4>>2]=na;_=ne(ea^(aa|ja)|0,na^ia|0,63)|0;h=C;ia=oe(ea^(aa|ja)|0,na^ia|0,1)|0;h=C|h;na=c[Q+48>>2]|0;ja=c[Q+48+4>>2]|0;ba=le(na|0,ja|0,f|0,ba|0)|0;ba=le(ba|0,C|0,p|0,y|0)|0;f=C;aa=le(Z^f|0,(W|ha)^ba|0,c[Q+80>>2]|0,c[Q+80+4>>2]|0)|0;ea=C;ka=ne(aa^na|0,ea^ja|0,24)|0;g=C;ja=oe(aa^na|0,ea^ja|0,40)|0;g=C|g;na=le(I|0,J|0,ba|0,f|0)|0;na=le(na|0,C|0,ja|ka|0,g|0)|0;$=C;c[Q+16>>2]=na;c[Q+16+4>>2]=$;ma=ne(na^(Z^f)|0,$^((W|ha)^ba)|0,16)|0;ca=C;ba=oe(na^(Z^f)|0,$^((W|ha)^ba)|0,48)|0;ca=C|ca;c[Q+112>>2]=ba|ma;c[Q+112+4>>2]=ca;ea=le(ba|ma|0,ca|0,aa|0,ea|0)|0;aa=C;ca=ne(ea^(ja|ka)|0,aa^g|0,63)|0;ma=C;g=oe(ea^(ja|ka)|0,aa^g|0,1)|0;ma=C|ma;ka=c[Q+56>>2]|0;ja=c[Q+56+4>>2]|0;T=le(ka|0,ja|0,Y|0,T|0)|0;T=le(T|0,C|0,B|0,D|0)|0;Y=C;ba=c[Q+120>>2]^T;ha=c[Q+120+4>>2]^Y;W=le(ha|0,ba|0,c[Q+88>>2]|0,c[Q+88+4>>2]|0)|0;f=C;Z=ne(W^ka|0,f^ja|0,24)|0;fa=C;ja=oe(W^ka|0,f^ja|0,40)|0;fa=C|fa;Y=le(q|0,r|0,T|0,Y|0)|0;Y=le(Y|0,C|0,ja|Z|0,fa|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;ka=ne(Y^ha|0,T^ba|0,16)|0;V=C;ba=oe(Y^ha|0,T^ba|0,48)|0;V=C|V;f=le(ba|ka|0,V|0,W|0,f|0)|0;W=C;ha=ne(f^(ja|Z)|0,W^fa|0,63)|0;ga=C;fa=oe(f^(ja|Z)|0,W^fa|0,1)|0;ga=C|ga;R=le(ia|_|0,h|0,la|0,R|0)|0;R=le(R|0,C|0,s|0,t|0)|0;la=C;aa=le(V^la|0,(ba|ka)^R|0,ea|0,aa|0)|0;ea=C;Z=ne(aa^(ia|_)|0,ea^h|0,24)|0;ja=C;h=oe(aa^(ia|_)|0,ea^h|0,40)|0;ja=C|ja;_=le(N|0,O|0,R|0,la|0)|0;_=le(_|0,C|0,h|Z|0,ja|0)|0;ia=C;c[Q>>2]=_;c[Q+4>>2]=ia;X=ne(_^(V^la)|0,ia^((ba|ka)^R)|0,16)|0;da=C;R=oe(_^(V^la)|0,ia^((ba|ka)^R)|0,48)|0;da=C|da;c[Q+120>>2]=R|X;c[Q+120+4>>2]=da;ea=le(R|X|0,da|0,aa|0,ea|0)|0;aa=C;c[Q+80>>2]=ea;c[Q+80+4>>2]=aa;da=ne(ea^(h|Z)|0,aa^ja|0,63)|0;X=C;ja=oe(ea^(h|Z)|0,aa^ja|0,1)|0;c[Q+40>>2]=ja|da;c[Q+40+4>>2]=C|X;S=le(g|ca|0,ma|0,U|0,S|0)|0;S=le(S|0,C|0,z|0,A|0)|0;U=C;X=c[Q+96>>2]^S;da=c[Q+96+4>>2]^U;W=le(da|0,X|0,f|0,W|0)|0;f=C;ja=ne(W^(g|ca)|0,f^ma|0,24)|0;aa=C;ma=oe(W^(g|ca)|0,f^ma|0,40)|0;aa=C|aa;U=le(u|0,v|0,S|0,U|0)|0;U=le(U|0,C|0,ma|ja|0,aa|0)|0;S=C;c[Q+8>>2]=U;c[Q+8+4>>2]=S;ca=ne(U^da|0,S^X|0,16)|0;g=C;X=oe(U^da|0,S^X|0,48)|0;g=C|g;f=le(X|ca|0,g|0,W|0,f|0)|0;W=C;c[Q+88>>2]=f;c[Q+88+4>>2]=W;da=ne(f^(ma|ja)|0,W^aa|0,63)|0;Z=C;aa=oe(f^(ma|ja)|0,W^aa|0,1)|0;c[Q+48>>2]=aa|da;c[Q+48+4>>2]=C|Z;$=le(fa|ha|0,ga|0,na|0,$|0)|0;$=le($|0,C|0,l|0,e|0)|0;na=C;Z=c[Q+104>>2]^$;da=c[Q+104+4>>2]^na;aa=le(da|0,Z|0,c[Q+64>>2]|0,c[Q+64+4>>2]|0)|0;W=C;ja=ne(aa^(fa|ha)|0,W^ga|0,24)|0;ma=C;ga=oe(aa^(fa|ha)|0,W^ga|0,40)|0;ma=C|ma;na=le(j|0,k|0,$|0,na|0)|0;na=le(na|0,C|0,ga|ja|0,ma|0)|0;$=C;c[Q+16>>2]=na;c[Q+16+4>>2]=$;ha=ne(na^da|0,$^Z|0,16)|0;fa=C;Z=oe(na^da|0,$^Z|0,48)|0;fa=C|fa;W=le(Z|ha|0,fa|0,aa|0,W|0)|0;aa=C;da=ne(W^(ga|ja)|0,aa^ma|0,63)|0;f=C;ma=oe(W^(ga|ja)|0,aa^ma|0,1)|0;c[Q+56>>2]=ma|da;c[Q+56+4>>2]=C|f;f=c[Q+32>>2]|0;da=c[Q+32+4>>2]|0;T=le(f|0,da|0,Y|0,T|0)|0;T=le(T|0,C|0,M|0,m|0)|0;Y=C;ma=c[Q+112>>2]^T;ja=c[Q+112+4>>2]^Y;ga=le(ja|0,ma|0,c[Q+72>>2]|0,c[Q+72+4>>2]|0)|0;h=C;ea=ne(ga^f|0,h^da|0,24)|0;R=C;da=oe(ga^f|0,h^da|0,40)|0;R=C|R;Y=le(E|0,F|0,T|0,Y|0)|0;Y=le(Y|0,C|0,da|ea|0,R|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;f=ne(Y^ja|0,T^ma|0,16)|0;ka=C;ma=oe(Y^ja|0,T^ma|0,48)|0;ka=C|ka;h=le(ma|f|0,ka|0,ga|0,h|0)|0;ga=C;ja=ne(h^(da|ea)|0,ga^R|0,63)|0;ba=C;R=oe(h^(da|ea)|0,ga^R|0,1)|0;ba=C|ba;ia=le(K|0,L|0,_|0,ia|0)|0;ia=le(ia|0,C|0,R|ja|0,ba|0)|0;_=C;aa=le(_^g|0,ia^(X|ca)|0,W|0,aa|0)|0;W=C;ea=ne(aa^(R|ja)|0,W^ba|0,24)|0;da=C;ba=oe(aa^(R|ja)|0,W^ba|0,40)|0;da=C|da;ja=le(u|0,v|0,ia|0,_|0)|0;ja=le(ja|0,C|0,ba|ea|0,da|0)|0;R=C;c[Q>>2]=ja;c[Q+4>>2]=R;la=ne(ja^(_^g)|0,R^(ia^(X|ca))|0,16)|0;V=C;ca=oe(ja^(_^g)|0,R^(ia^(X|ca))|0,48)|0;V=C|V;c[Q+96>>2]=ca|la;c[Q+96+4>>2]=V;W=le(ca|la|0,V|0,aa|0,W|0)|0;aa=C;c[Q+64>>2]=W;c[Q+64+4>>2]=aa;V=ne(W^(ba|ea)|0,aa^da|0,63)|0;la=C;da=oe(W^(ba|ea)|0,aa^da|0,1)|0;c[Q+32>>2]=da|V;c[Q+32+4>>2]=C|la;la=c[Q+40>>2]|0;V=c[Q+40+4>>2]|0;S=le(la|0,V|0,U|0,S|0)|0;S=le(S|0,C|0,M|0,m|0)|0;U=C;ga=le(fa^U|0,(Z|ha)^S|0,h|0,ga|0)|0;h=C;da=ne(ga^la|0,h^V|0,24)|0;aa=C;V=oe(ga^la|0,h^V|0,40)|0;aa=C|aa;la=le(l|0,e|0,S|0,U|0)|0;la=le(la|0,C|0,V|da|0,aa|0)|0;ea=C;c[Q+8>>2]=la;c[Q+8+4>>2]=ea;ba=ne(la^(fa^U)|0,ea^((Z|ha)^S)|0,16)|0;W=C;S=oe(la^(fa^U)|0,ea^((Z|ha)^S)|0,48)|0;W=C|W;c[Q+104>>2]=S|ba;c[Q+104+4>>2]=W;h=le(S|ba|0,W|0,ga|0,h|0)|0;ga=C;c[Q+72>>2]=h;c[Q+72+4>>2]=ga;W=ne(h^(V|da)|0,ga^aa|0,63)|0;ba=C;aa=oe(h^(V|da)|0,ga^aa|0,1)|0;ba=C|ba;ga=c[Q+48>>2]|0;da=c[Q+48+4>>2]|0;$=le(ga|0,da|0,na|0,$|0)|0;$=le($|0,C|0,j|0,k|0)|0;na=C;V=le(ka^na|0,(ma|f)^$|0,c[Q+80>>2]|0,c[Q+80+4>>2]|0)|0;h=C;S=ne(V^ga|0,h^da|0,24)|0;ha=C;da=oe(V^ga|0,h^da|0,40)|0;ha=C|ha;ga=le(N|0,O|0,$|0,na|0)|0;ga=le(ga|0,C|0,da|S|0,ha|0)|0;Z=C;c[Q+16>>2]=ga;c[Q+16+4>>2]=Z;U=ne(ga^(ka^na)|0,Z^((ma|f)^$)|0,16)|0;fa=C;$=oe(ga^(ka^na)|0,Z^((ma|f)^$)|0,48)|0;fa=C|fa;c[Q+112>>2]=$|U;c[Q+112+4>>2]=fa;h=le($|U|0,fa|0,V|0,h|0)|0;V=C;fa=ne(h^(da|S)|0,V^ha|0,63)|0;U=C;ha=oe(h^(da|S)|0,V^ha|0,1)|0;U=C|U;S=c[Q+56>>2]|0;da=c[Q+56+4>>2]|0;T=le(S|0,da|0,Y|0,T|0)|0;T=le(T|0,C|0,s|0,t|0)|0;Y=C;$=c[Q+120>>2]^T;f=c[Q+120+4>>2]^Y;ma=le(f|0,$|0,c[Q+88>>2]|0,c[Q+88+4>>2]|0)|0;na=C;ka=ne(ma^S|0,na^da|0,24)|0;ca=C;da=oe(ma^S|0,na^da|0,40)|0;ca=C|ca;Y=le(G|0,H|0,T|0,Y|0)|0;Y=le(Y|0,C|0,da|ka|0,ca|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;S=ne(Y^f|0,T^$|0,16)|0;X=C;$=oe(Y^f|0,T^$|0,48)|0;X=C|X;na=le($|S|0,X|0,ma|0,na|0)|0;ma=C;f=ne(na^(da|ka)|0,ma^ca|0,63)|0;ia=C;ca=oe(na^(da|ka)|0,ma^ca|0,1)|0;ia=C|ia;R=le(aa|W|0,ba|0,ja|0,R|0)|0;R=le(R|0,C|0,p|0,y|0)|0;ja=C;V=le(X^ja|0,($|S)^R|0,h|0,V|0)|0;h=C;ka=ne(V^(aa|W)|0,h^ba|0,24)|0;da=C;ba=oe(V^(aa|W)|0,h^ba|0,40)|0;da=C|da;W=le(z|0,A|0,R|0,ja|0)|0;W=le(W|0,C|0,ba|ka|0,da|0)|0;aa=C;c[Q>>2]=W;c[Q+4>>2]=aa;g=ne(W^(X^ja)|0,aa^(($|S)^R)|0,16)|0;_=C;R=oe(W^(X^ja)|0,aa^(($|S)^R)|0,48)|0;_=C|_;c[Q+120>>2]=R|g;c[Q+120+4>>2]=_;h=le(R|g|0,_|0,V|0,h|0)|0;V=C;c[Q+80>>2]=h;c[Q+80+4>>2]=V;_=ne(h^(ba|ka)|0,V^da|0,63)|0;g=C;da=oe(h^(ba|ka)|0,V^da|0,1)|0;c[Q+40>>2]=da|_;c[Q+40+4>>2]=C|g;ea=le(ha|fa|0,U|0,la|0,ea|0)|0;ea=le(ea|0,C|0,w|0,x|0)|0;la=C;g=c[Q+96>>2]^ea;_=c[Q+96+4>>2]^la;ma=le(_|0,g|0,na|0,ma|0)|0;na=C;da=ne(ma^(ha|fa)|0,na^U|0,24)|0;V=C;U=oe(ma^(ha|fa)|0,na^U|0,40)|0;V=C|V;la=le(q|0,r|0,ea|0,la|0)|0;la=le(la|0,C|0,U|da|0,V|0)|0;ea=C;c[Q+8>>2]=la;c[Q+8+4>>2]=ea;fa=ne(la^_|0,ea^g|0,16)|0;ha=C;g=oe(la^_|0,ea^g|0,48)|0;ha=C|ha;na=le(g|fa|0,ha|0,ma|0,na|0)|0;ma=C;c[Q+88>>2]=na;c[Q+88+4>>2]=ma;_=ne(na^(U|da)|0,ma^V|0,63)|0;ka=C;V=oe(na^(U|da)|0,ma^V|0,1)|0;c[Q+48>>2]=V|_;c[Q+48+4>>2]=C|ka;Z=le(ca|f|0,ia|0,ga|0,Z|0)|0;Z=le(Z|0,C|0,E|0,F|0)|0;ga=C;ka=c[Q+104>>2]^Z;_=c[Q+104+4>>2]^ga;V=le(_|0,ka|0,c[Q+64>>2]|0,c[Q+64+4>>2]|0)|0;ma=C;da=ne(V^(ca|f)|0,ma^ia|0,24)|0;U=C;ia=oe(V^(ca|f)|0,ma^ia|0,40)|0;U=C|U;ga=le(n|0,o|0,Z|0,ga|0)|0;ga=le(ga|0,C|0,ia|da|0,U|0)|0;Z=C;c[Q+16>>2]=ga;c[Q+16+4>>2]=Z;f=ne(ga^_|0,Z^ka|0,16)|0;ca=C;ka=oe(ga^_|0,Z^ka|0,48)|0;ca=C|ca;ma=le(ka|f|0,ca|0,V|0,ma|0)|0;V=C;_=ne(ma^(ia|da)|0,V^U|0,63)|0;na=C;U=oe(ma^(ia|da)|0,V^U|0,1)|0;c[Q+56>>2]=U|_;c[Q+56+4>>2]=C|na;na=c[Q+32>>2]|0;_=c[Q+32+4>>2]|0;T=le(na|0,_|0,Y|0,T|0)|0;T=le(T|0,C|0,B|0,D|0)|0;Y=C;U=c[Q+112>>2]^T;da=c[Q+112+4>>2]^Y;ia=le(da|0,U|0,c[Q+72>>2]|0,c[Q+72+4>>2]|0)|0;ba=C;h=ne(ia^na|0,ba^_|0,24)|0;R=C;_=oe(ia^na|0,ba^_|0,40)|0;R=C|R;Y=le(I|0,J|0,T|0,Y|0)|0;Y=le(Y|0,C|0,_|h|0,R|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;na=ne(Y^da|0,T^U|0,16)|0;S=C;U=oe(Y^da|0,T^U|0,48)|0;S=C|S;ba=le(U|na|0,S|0,ia|0,ba|0)|0;ia=C;da=ne(ba^(_|h)|0,ia^R|0,63)|0;$=C;R=oe(ba^(_|h)|0,ia^R|0,1)|0;$=C|$;aa=le(N|0,O|0,W|0,aa|0)|0;aa=le(aa|0,C|0,R|da|0,$|0)|0;W=C;V=le(W^ha|0,aa^(g|fa)|0,ma|0,V|0)|0;ma=C;h=ne(V^(R|da)|0,ma^$|0,24)|0;_=C;$=oe(V^(R|da)|0,ma^$|0,40)|0;_=C|_;da=le(I|0,J|0,aa|0,W|0)|0;da=le(da|0,C|0,$|h|0,_|0)|0;R=C;c[Q>>2]=da;c[Q+4>>2]=R;ja=ne(da^(W^ha)|0,R^(aa^(g|fa))|0,16)|0;X=C;fa=oe(da^(W^ha)|0,R^(aa^(g|fa))|0,48)|0;X=C|X;c[Q+96>>2]=fa|ja;c[Q+96+4>>2]=X;ma=le(fa|ja|0,X|0,V|0,ma|0)|0;V=C;c[Q+64>>2]=ma;c[Q+64+4>>2]=V;X=ne(ma^($|h)|0,V^_|0,63)|0;ja=C;_=oe(ma^($|h)|0,V^_|0,1)|0;c[Q+32>>2]=_|X;c[Q+32+4>>2]=C|ja;ja=c[Q+40>>2]|0;X=c[Q+40+4>>2]|0;ea=le(ja|0,X|0,la|0,ea|0)|0;ea=le(ea|0,C|0,z|0,A|0)|0;la=C;ia=le(ca^la|0,(ka|f)^ea|0,ba|0,ia|0)|0;ba=C;_=ne(ia^ja|0,ba^X|0,24)|0;V=C;X=oe(ia^ja|0,ba^X|0,40)|0;V=C|V;ja=le(j|0,k|0,ea|0,la|0)|0;ja=le(ja|0,C|0,X|_|0,V|0)|0;h=C;c[Q+8>>2]=ja;c[Q+8+4>>2]=h;$=ne(ja^(ca^la)|0,h^((ka|f)^ea)|0,16)|0;ma=C;ea=oe(ja^(ca^la)|0,h^((ka|f)^ea)|0,48)|0;ma=C|ma;c[Q+104>>2]=ea|$;c[Q+104+4>>2]=ma;ba=le(ea|$|0,ma|0,ia|0,ba|0)|0;ia=C;c[Q+72>>2]=ba;c[Q+72+4>>2]=ia;ma=ne(ba^(X|_)|0,ia^V|0,63)|0;$=C;V=oe(ba^(X|_)|0,ia^V|0,1)|0;$=C|$;ia=c[Q+48>>2]|0;_=c[Q+48+4>>2]|0;Z=le(ia|0,_|0,ga|0,Z|0)|0;Z=le(Z|0,C|0,K|0,L|0)|0;ga=C;X=le(S^ga|0,(U|na)^Z|0,c[Q+80>>2]|0,c[Q+80+4>>2]|0)|0;ba=C;ea=ne(X^ia|0,ba^_|0,24)|0;f=C;_=oe(X^ia|0,ba^_|0,40)|0;f=C|f;ia=le(M|0,m|0,Z|0,ga|0)|0;ia=le(ia|0,C|0,_|ea|0,f|0)|0;ka=C;c[Q+16>>2]=ia;c[Q+16+4>>2]=ka;la=ne(ia^(S^ga)|0,ka^((U|na)^Z)|0,16)|0;ca=C;Z=oe(ia^(S^ga)|0,ka^((U|na)^Z)|0,48)|0;ca=C|ca;c[Q+112>>2]=Z|la;c[Q+112+4>>2]=ca;ba=le(Z|la|0,ca|0,X|0,ba|0)|0;X=C;ca=ne(ba^(_|ea)|0,X^f|0,63)|0;la=C;f=oe(ba^(_|ea)|0,X^f|0,1)|0;la=C|la;ea=c[Q+56>>2]|0;_=c[Q+56+4>>2]|0;T=le(ea|0,_|0,Y|0,T|0)|0;T=le(T|0,C|0,q|0,r|0)|0;Y=C;Z=c[Q+120>>2]^T;na=c[Q+120+4>>2]^Y;U=le(na|0,Z|0,c[Q+88>>2]|0,c[Q+88+4>>2]|0)|0;ga=C;S=ne(U^ea|0,ga^_|0,24)|0;fa=C;_=oe(U^ea|0,ga^_|0,40)|0;fa=C|fa;Y=le(E|0,F|0,T|0,Y|0)|0;Y=le(Y|0,C|0,_|S|0,fa|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;ea=ne(Y^na|0,T^Z|0,16)|0;g=C;Z=oe(Y^na|0,T^Z|0,48)|0;g=C|g;ga=le(Z|ea|0,g|0,U|0,ga|0)|0;U=C;na=ne(ga^(_|S)|0,U^fa|0,63)|0;aa=C;fa=oe(ga^(_|S)|0,U^fa|0,1)|0;aa=C|aa;R=le(V|ma|0,$|0,da|0,R|0)|0;R=le(R|0,C|0,u|0,v|0)|0;da=C;X=le(g^da|0,(Z|ea)^R|0,ba|0,X|0)|0;ba=C;S=ne(X^(V|ma)|0,ba^$|0,24)|0;_=C;$=oe(X^(V|ma)|0,ba^$|0,40)|0;_=C|_;ma=le(p|0,y|0,R|0,da|0)|0;ma=le(ma|0,C|0,$|S|0,_|0)|0;V=C;c[Q>>2]=ma;c[Q+4>>2]=V;ha=ne(ma^(g^da)|0,V^((Z|ea)^R)|0,16)|0;W=C;R=oe(ma^(g^da)|0,V^((Z|ea)^R)|0,48)|0;W=C|W;c[Q+120>>2]=R|ha;c[Q+120+4>>2]=W;ba=le(R|ha|0,W|0,X|0,ba|0)|0;X=C;c[Q+80>>2]=ba;c[Q+80+4>>2]=X;W=ne(ba^($|S)|0,X^_|0,63)|0;ha=C;_=oe(ba^($|S)|0,X^_|0,1)|0;c[Q+40>>2]=_|W;c[Q+40+4>>2]=C|ha;h=le(f|ca|0,la|0,ja|0,h|0)|0;h=le(h|0,C|0,l|0,e|0)|0;ja=C;ha=c[Q+96>>2]^h;W=c[Q+96+4>>2]^ja;U=le(W|0,ha|0,ga|0,U|0)|0;ga=C;_=ne(U^(f|ca)|0,ga^la|0,24)|0;X=C;la=oe(U^(f|ca)|0,ga^la|0,40)|0;X=C|X;ja=le(s|0,t|0,h|0,ja|0)|0;ja=le(ja|0,C|0,la|_|0,X|0)|0;h=C;c[Q+8>>2]=ja;c[Q+8+4>>2]=h;ca=ne(ja^W|0,h^ha|0,16)|0;f=C;ha=oe(ja^W|0,h^ha|0,48)|0;f=C|f;ga=le(ha|ca|0,f|0,U|0,ga|0)|0;U=C;c[Q+88>>2]=ga;c[Q+88+4>>2]=U;W=ne(ga^(la|_)|0,U^X|0,63)|0;S=C;X=oe(ga^(la|_)|0,U^X|0,1)|0;c[Q+48>>2]=X|W;c[Q+48+4>>2]=C|S;ka=le(fa|na|0,aa|0,ia|0,ka|0)|0;ka=le(ka|0,C|0,B|0,D|0)|0;ia=C;S=c[Q+104>>2]^ka;W=c[Q+104+4>>2]^ia;X=le(W|0,S|0,c[Q+64>>2]|0,c[Q+64+4>>2]|0)|0;U=C;_=ne(X^(fa|na)|0,U^aa|0,24)|0;la=C;aa=oe(X^(fa|na)|0,U^aa|0,40)|0;la=C|la;ia=le(w|0,x|0,ka|0,ia|0)|0;ia=le(ia|0,C|0,aa|_|0,la|0)|0;ka=C;c[Q+16>>2]=ia;c[Q+16+4>>2]=ka;na=ne(ia^W|0,ka^S|0,16)|0;fa=C;S=oe(ia^W|0,ka^S|0,48)|0;fa=C|fa;U=le(S|na|0,fa|0,X|0,U|0)|0;X=C;W=ne(U^(aa|_)|0,X^la|0,63)|0;ga=C;la=oe(U^(aa|_)|0,X^la|0,1)|0;c[Q+56>>2]=la|W;c[Q+56+4>>2]=C|ga;ga=c[Q+32>>2]|0;W=c[Q+32+4>>2]|0;T=le(ga|0,W|0,Y|0,T|0)|0;T=le(T|0,C|0,n|0,o|0)|0;Y=C;la=c[Q+112>>2]^T;_=c[Q+112+4>>2]^Y;aa=le(_|0,la|0,c[Q+72>>2]|0,c[Q+72+4>>2]|0)|0;$=C;ba=ne(aa^ga|0,$^W|0,24)|0;R=C;W=oe(aa^ga|0,$^W|0,40)|0;R=C|R;Y=le(G|0,H|0,T|0,Y|0)|0;Y=le(Y|0,C|0,W|ba|0,R|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;ga=ne(Y^_|0,T^la|0,16)|0;ea=C;la=oe(Y^_|0,T^la|0,48)|0;ea=C|ea;$=le(la|ga|0,ea|0,aa|0,$|0)|0;aa=C;_=ne($^(W|ba)|0,aa^R|0,63)|0;Z=C;R=oe($^(W|ba)|0,aa^R|0,1)|0;Z=C|Z;V=le(w|0,x|0,ma|0,V|0)|0;V=le(V|0,C|0,R|_|0,Z|0)|0;ma=C;X=le(ma^f|0,V^(ha|ca)|0,U|0,X|0)|0;U=C;ba=ne(X^(R|_)|0,U^Z|0,24)|0;W=C;Z=oe(X^(R|_)|0,U^Z|0,40)|0;W=C|W;_=le(l|0,e|0,V|0,ma|0)|0;_=le(_|0,C|0,Z|ba|0,W|0)|0;R=C;c[Q>>2]=_;c[Q+4>>2]=R;da=ne(_^(ma^f)|0,R^(V^(ha|ca))|0,16)|0;g=C;ca=oe(_^(ma^f)|0,R^(V^(ha|ca))|0,48)|0;g=C|g;c[Q+96>>2]=ca|da;c[Q+96+4>>2]=g;U=le(ca|da|0,g|0,X|0,U|0)|0;X=C;c[Q+64>>2]=U;c[Q+64+4>>2]=X;g=ne(U^(Z|ba)|0,X^W|0,63)|0;da=C;W=oe(U^(Z|ba)|0,X^W|0,1)|0;c[Q+32>>2]=W|g;c[Q+32+4>>2]=C|da;da=c[Q+40>>2]|0;g=c[Q+40+4>>2]|0;h=le(da|0,g|0,ja|0,h|0)|0;h=le(h|0,C|0,j|0,k|0)|0;ja=C;aa=le(fa^ja|0,(S|na)^h|0,$|0,aa|0)|0;$=C;W=ne(aa^da|0,$^g|0,24)|0;X=C;g=oe(aa^da|0,$^g|0,40)|0;X=C|X;da=le(E|0,F|0,h|0,ja|0)|0;da=le(da|0,C|0,g|W|0,X|0)|0;ba=C;c[Q+8>>2]=da;c[Q+8+4>>2]=ba;Z=ne(da^(fa^ja)|0,ba^((S|na)^h)|0,16)|0;U=C;h=oe(da^(fa^ja)|0,ba^((S|na)^h)|0,48)|0;U=C|U;c[Q+104>>2]=h|Z;c[Q+104+4>>2]=U;$=le(h|Z|0,U|0,aa|0,$|0)|0;aa=C;c[Q+72>>2]=$;c[Q+72+4>>2]=aa;U=ne($^(g|W)|0,aa^X|0,63)|0;Z=C;X=oe($^(g|W)|0,aa^X|0,1)|0;Z=C|Z;aa=c[Q+48>>2]|0;W=c[Q+48+4>>2]|0;ka=le(aa|0,W|0,ia|0,ka|0)|0;ka=le(ka|0,C|0,I|0,J|0)|0;ia=C;g=le(ea^ia|0,(la|ga)^ka|0,c[Q+80>>2]|0,c[Q+80+4>>2]|0)|0;$=C;h=ne(g^aa|0,$^W|0,24)|0;na=C;W=oe(g^aa|0,$^W|0,40)|0;na=C|na;aa=le(q|0,r|0,ka|0,ia|0)|0;aa=le(aa|0,C|0,W|h|0,na|0)|0;S=C;c[Q+16>>2]=aa;c[Q+16+4>>2]=S;ja=ne(aa^(ea^ia)|0,S^((la|ga)^ka)|0,16)|0;fa=C;ka=oe(aa^(ea^ia)|0,S^((la|ga)^ka)|0,48)|0;fa=C|fa;c[Q+112>>2]=ka|ja;c[Q+112+4>>2]=fa;$=le(ka|ja|0,fa|0,g|0,$|0)|0;g=C;fa=ne($^(W|h)|0,g^na|0,63)|0;ja=C;na=oe($^(W|h)|0,g^na|0,1)|0;ja=C|ja;h=c[Q+56>>2]|0;W=c[Q+56+4>>2]|0;T=le(h|0,W|0,Y|0,T|0)|0;T=le(T|0,C|0,p|0,y|0)|0;Y=C;ka=c[Q+120>>2]^T;ga=c[Q+120+4>>2]^Y;la=le(ga|0,ka|0,c[Q+88>>2]|0,c[Q+88+4>>2]|0)|0;ia=C;ea=ne(la^h|0,ia^W|0,24)|0;ca=C;W=oe(la^h|0,ia^W|0,40)|0;ca=C|ca;Y=le(B|0,D|0,T|0,Y|0)|0;Y=le(Y|0,C|0,W|ea|0,ca|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;h=ne(Y^ga|0,T^ka|0,16)|0;ha=C;ka=oe(Y^ga|0,T^ka|0,48)|0;ha=C|ha;ia=le(ka|h|0,ha|0,la|0,ia|0)|0;la=C;ga=ne(ia^(W|ea)|0,la^ca|0,63)|0;V=C;ca=oe(ia^(W|ea)|0,la^ca|0,1)|0;V=C|V;R=le(X|U|0,Z|0,_|0,R|0)|0;R=le(R|0,C|0,K|0,L|0)|0;_=C;g=le(ha^_|0,(ka|h)^R|0,$|0,g|0)|0;$=C;ea=ne(g^(X|U)|0,$^Z|0,24)|0;W=C;Z=oe(g^(X|U)|0,$^Z|0,40)|0;W=C|W;U=le(n|0,o|0,R|0,_|0)|0;U=le(U|0,C|0,Z|ea|0,W|0)|0;X=C;c[Q>>2]=U;c[Q+4>>2]=X;f=ne(U^(ha^_)|0,X^((ka|h)^R)|0,16)|0;ma=C;R=oe(U^(ha^_)|0,X^((ka|h)^R)|0,48)|0;ma=C|ma;c[Q+120>>2]=R|f;c[Q+120+4>>2]=ma;$=le(R|f|0,ma|0,g|0,$|0)|0;g=C;c[Q+80>>2]=$;c[Q+80+4>>2]=g;ma=ne($^(Z|ea)|0,g^W|0,63)|0;f=C;W=oe($^(Z|ea)|0,g^W|0,1)|0;c[Q+40>>2]=W|ma;c[Q+40+4>>2]=C|f;ba=le(na|fa|0,ja|0,da|0,ba|0)|0;ba=le(ba|0,C|0,N|0,O|0)|0;da=C;f=c[Q+96>>2]^ba;ma=c[Q+96+4>>2]^da;la=le(ma|0,f|0,ia|0,la|0)|0;ia=C;W=ne(la^(na|fa)|0,ia^ja|0,24)|0;g=C;ja=oe(la^(na|fa)|0,ia^ja|0,40)|0;g=C|g;da=le(z|0,A|0,ba|0,da|0)|0;da=le(da|0,C|0,ja|W|0,g|0)|0;ba=C;c[Q+8>>2]=da;c[Q+8+4>>2]=ba;fa=ne(da^ma|0,ba^f|0,16)|0;na=C;f=oe(da^ma|0,ba^f|0,48)|0;na=C|na;ia=le(f|fa|0,na|0,la|0,ia|0)|0;la=C;c[Q+88>>2]=ia;c[Q+88+4>>2]=la;ma=ne(ia^(ja|W)|0,la^g|0,63)|0;ea=C;g=oe(ia^(ja|W)|0,la^g|0,1)|0;c[Q+48>>2]=g|ma;c[Q+48+4>>2]=C|ea;S=le(ca|ga|0,V|0,aa|0,S|0)|0;S=le(S|0,C|0,M|0,m|0)|0;aa=C;ea=c[Q+104>>2]^S;ma=c[Q+104+4>>2]^aa;g=le(ma|0,ea|0,c[Q+64>>2]|0,c[Q+64+4>>2]|0)|0;la=C;W=ne(g^(ca|ga)|0,la^V|0,24)|0;ja=C;V=oe(g^(ca|ga)|0,la^V|0,40)|0;ja=C|ja;aa=le(s|0,t|0,S|0,aa|0)|0;aa=le(aa|0,C|0,V|W|0,ja|0)|0;S=C;c[Q+16>>2]=aa;c[Q+16+4>>2]=S;ga=ne(aa^ma|0,S^ea|0,16)|0;ca=C;ea=oe(aa^ma|0,S^ea|0,48)|0;ca=C|ca;la=le(ea|ga|0,ca|0,g|0,la|0)|0;g=C;ma=ne(la^(V|W)|0,g^ja|0,63)|0;ia=C;ja=oe(la^(V|W)|0,g^ja|0,1)|0;c[Q+56>>2]=ja|ma;c[Q+56+4>>2]=C|ia;ia=c[Q+32>>2]|0;ma=c[Q+32+4>>2]|0;T=le(ia|0,ma|0,Y|0,T|0)|0;T=le(T|0,C|0,G|0,H|0)|0;Y=C;ja=c[Q+112>>2]^T;W=c[Q+112+4>>2]^Y;V=le(W|0,ja|0,c[Q+72>>2]|0,c[Q+72+4>>2]|0)|0;Z=C;$=ne(V^ia|0,Z^ma|0,24)|0;R=C;ma=oe(V^ia|0,Z^ma|0,40)|0;R=C|R;Y=le(u|0,v|0,T|0,Y|0)|0;Y=le(Y|0,C|0,ma|$|0,R|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;ia=ne(Y^W|0,T^ja|0,16)|0;h=C;ja=oe(Y^W|0,T^ja|0,48)|0;h=C|h;Z=le(ja|ia|0,h|0,V|0,Z|0)|0;V=C;W=ne(Z^(ma|$)|0,V^R|0,63)|0;ka=C;R=oe(Z^(ma|$)|0,V^R|0,1)|0;ka=C|ka;X=le(G|0,H|0,U|0,X|0)|0;X=le(X|0,C|0,R|W|0,ka|0)|0;U=C;g=le(U^na|0,X^(f|fa)|0,la|0,g|0)|0;la=C;$=ne(g^(R|W)|0,la^ka|0,24)|0;ma=C;ka=oe(g^(R|W)|0,la^ka|0,40)|0;ma=C|ma;W=le(n|0,o|0,X|0,U|0)|0;W=le(W|0,C|0,ka|$|0,ma|0)|0;R=C;c[Q>>2]=W;c[Q+4>>2]=R;_=ne(W^(U^na)|0,R^(X^(f|fa))|0,16)|0;ha=C;fa=oe(W^(U^na)|0,R^(X^(f|fa))|0,48)|0;ha=C|ha;c[Q+96>>2]=fa|_;c[Q+96+4>>2]=ha;la=le(fa|_|0,ha|0,g|0,la|0)|0;g=C;c[Q+64>>2]=la;c[Q+64+4>>2]=g;ha=ne(la^(ka|$)|0,g^ma|0,63)|0;_=C;ma=oe(la^(ka|$)|0,g^ma|0,1)|0;c[Q+32>>2]=ma|ha;c[Q+32+4>>2]=C|_;_=c[Q+40>>2]|0;ha=c[Q+40+4>>2]|0;ba=le(_|0,ha|0,da|0,ba|0)|0;ba=le(ba|0,C|0,B|0,D|0)|0;da=C;V=le(ca^da|0,(ea|ga)^ba|0,Z|0,V|0)|0;Z=C;ma=ne(V^_|0,Z^ha|0,24)|0;g=C;ha=oe(V^_|0,Z^ha|0,40)|0;g=C|g;_=le(s|0,t|0,ba|0,da|0)|0;_=le(_|0,C|0,ha|ma|0,g|0)|0;$=C;c[Q+8>>2]=_;c[Q+8+4>>2]=$;ka=ne(_^(ca^da)|0,$^((ea|ga)^ba)|0,16)|0;la=C;ba=oe(_^(ca^da)|0,$^((ea|ga)^ba)|0,48)|0;la=C|la;c[Q+104>>2]=ba|ka;c[Q+104+4>>2]=la;Z=le(ba|ka|0,la|0,V|0,Z|0)|0;V=C;c[Q+72>>2]=Z;c[Q+72+4>>2]=V;la=ne(Z^(ha|ma)|0,V^g|0,63)|0;ka=C;g=oe(Z^(ha|ma)|0,V^g|0,1)|0;ka=C|ka;V=c[Q+48>>2]|0;ma=c[Q+48+4>>2]|0;S=le(V|0,ma|0,aa|0,S|0)|0;S=le(S|0,C|0,z|0,A|0)|0;aa=C;ha=le(h^aa|0,(ja|ia)^S|0,c[Q+80>>2]|0,c[Q+80+4>>2]|0)|0;Z=C;ba=ne(ha^V|0,Z^ma|0,24)|0;ga=C;ma=oe(ha^V|0,Z^ma|0,40)|0;ga=C|ga;V=le(w|0,x|0,S|0,aa|0)|0;V=le(V|0,C|0,ma|ba|0,ga|0)|0;ea=C;c[Q+16>>2]=V;c[Q+16+4>>2]=ea;da=ne(V^(h^aa)|0,ea^((ja|ia)^S)|0,16)|0;ca=C;S=oe(V^(h^aa)|0,ea^((ja|ia)^S)|0,48)|0;ca=C|ca;c[Q+112>>2]=S|da;c[Q+112+4>>2]=ca;Z=le(S|da|0,ca|0,ha|0,Z|0)|0;ha=C;ca=ne(Z^(ma|ba)|0,ha^ga|0,63)|0;da=C;ga=oe(Z^(ma|ba)|0,ha^ga|0,1)|0;da=C|da;ba=c[Q+56>>2]|0;ma=c[Q+56+4>>2]|0;T=le(ba|0,ma|0,Y|0,T|0)|0;T=le(T|0,C|0,M|0,m|0)|0;Y=C;S=c[Q+120>>2]^T;ia=c[Q+120+4>>2]^Y;ja=le(ia|0,S|0,c[Q+88>>2]|0,c[Q+88+4>>2]|0)|0;aa=C;h=ne(ja^ba|0,aa^ma|0,24)|0;fa=C;ma=oe(ja^ba|0,aa^ma|0,40)|0;fa=C|fa;Y=le(u|0,v|0,T|0,Y|0)|0;Y=le(Y|0,C|0,ma|h|0,fa|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;ba=ne(Y^ia|0,T^S|0,16)|0;f=C;S=oe(Y^ia|0,T^S|0,48)|0;f=C|f;aa=le(S|ba|0,f|0,ja|0,aa|0)|0;ja=C;ia=ne(aa^(ma|h)|0,ja^fa|0,63)|0;X=C;fa=oe(aa^(ma|h)|0,ja^fa|0,1)|0;X=C|X;R=le(g|la|0,ka|0,W|0,R|0)|0;R=le(R|0,C|0,l|0,e|0)|0;W=C;ha=le(f^W|0,(S|ba)^R|0,Z|0,ha|0)|0;Z=C;h=ne(ha^(g|la)|0,Z^ka|0,24)|0;ma=C;ka=oe(ha^(g|la)|0,Z^ka|0,40)|0;ma=C|ma;la=le(I|0,J|0,R|0,W|0)|0;la=le(la|0,C|0,ka|h|0,ma|0)|0;g=C;c[Q>>2]=la;c[Q+4>>2]=g;na=ne(la^(f^W)|0,g^((S|ba)^R)|0,16)|0;U=C;R=oe(la^(f^W)|0,g^((S|ba)^R)|0,48)|0;U=C|U;c[Q+120>>2]=R|na;c[Q+120+4>>2]=U;Z=le(R|na|0,U|0,ha|0,Z|0)|0;ha=C;c[Q+80>>2]=Z;c[Q+80+4>>2]=ha;U=ne(Z^(ka|h)|0,ha^ma|0,63)|0;na=C;ma=oe(Z^(ka|h)|0,ha^ma|0,1)|0;c[Q+40>>2]=ma|U;c[Q+40+4>>2]=C|na;$=le(ga|ca|0,da|0,_|0,$|0)|0;$=le($|0,C|0,E|0,F|0)|0;_=C;na=c[Q+96>>2]^$;U=c[Q+96+4>>2]^_;ja=le(U|0,na|0,aa|0,ja|0)|0;aa=C;ma=ne(ja^(ga|ca)|0,aa^da|0,24)|0;ha=C;da=oe(ja^(ga|ca)|0,aa^da|0,40)|0;ha=C|ha;_=le(j|0,k|0,$|0,_|0)|0;_=le(_|0,C|0,da|ma|0,ha|0)|0;$=C;c[Q+8>>2]=_;c[Q+8+4>>2]=$;ca=ne(_^U|0,$^na|0,16)|0;ga=C;na=oe(_^U|0,$^na|0,48)|0;ga=C|ga;aa=le(na|ca|0,ga|0,ja|0,aa|0)|0;ja=C;c[Q+88>>2]=aa;c[Q+88+4>>2]=ja;U=ne(aa^(da|ma)|0,ja^ha|0,63)|0;h=C;ha=oe(aa^(da|ma)|0,ja^ha|0,1)|0;c[Q+48>>2]=ha|U;c[Q+48+4>>2]=C|h;ea=le(fa|ia|0,X|0,V|0,ea|0)|0;ea=le(ea|0,C|0,q|0,r|0)|0;V=C;h=c[Q+104>>2]^ea;U=c[Q+104+4>>2]^V;ha=le(U|0,h|0,c[Q+64>>2]|0,c[Q+64+4>>2]|0)|0;ja=C;ma=ne(ha^(fa|ia)|0,ja^X|0,24)|0;da=C;X=oe(ha^(fa|ia)|0,ja^X|0,40)|0;da=C|da;V=le(K|0,L|0,ea|0,V|0)|0;V=le(V|0,C|0,X|ma|0,da|0)|0;ea=C;c[Q+16>>2]=V;c[Q+16+4>>2]=ea;ia=ne(V^U|0,ea^h|0,16)|0;fa=C;h=oe(V^U|0,ea^h|0,48)|0;fa=C|fa;ja=le(h|ia|0,fa|0,ha|0,ja|0)|0;ha=C;U=ne(ja^(X|ma)|0,ha^da|0,63)|0;aa=C;da=oe(ja^(X|ma)|0,ha^da|0,1)|0;c[Q+56>>2]=da|U;c[Q+56+4>>2]=C|aa;aa=c[Q+32>>2]|0;U=c[Q+32+4>>2]|0;T=le(aa|0,U|0,Y|0,T|0)|0;T=le(T|0,C|0,N|0,O|0)|0;Y=C;da=c[Q+112>>2]^T;ma=c[Q+112+4>>2]^Y;X=le(ma|0,da|0,c[Q+72>>2]|0,c[Q+72+4>>2]|0)|0;ka=C;Z=ne(X^aa|0,ka^U|0,24)|0;R=C;U=oe(X^aa|0,ka^U|0,40)|0;R=C|R;Y=le(p|0,y|0,T|0,Y|0)|0;Y=le(Y|0,C|0,U|Z|0,R|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;aa=ne(Y^ma|0,T^da|0,16)|0;ba=C;da=oe(Y^ma|0,T^da|0,48)|0;ba=C|ba;ka=le(da|aa|0,ba|0,X|0,ka|0)|0;X=C;ma=ne(ka^(U|Z)|0,X^R|0,63)|0;S=C;R=oe(ka^(U|Z)|0,X^R|0,1)|0;S=C|S;g=le(p|0,y|0,la|0,g|0)|0;g=le(g|0,C|0,R|ma|0,S|0)|0;la=C;ha=le(la^ga|0,g^(na|ca)|0,ja|0,ha|0)|0;ja=C;Z=ne(ha^(R|ma)|0,ja^S|0,24)|0;U=C;S=oe(ha^(R|ma)|0,ja^S|0,40)|0;U=C|U;ma=le(M|0,m|0,g|0,la|0)|0;ma=le(ma|0,C|0,S|Z|0,U|0)|0;R=C;c[Q>>2]=ma;c[Q+4>>2]=R;W=ne(ma^(la^ga)|0,R^(g^(na|ca))|0,16)|0;f=C;ca=oe(ma^(la^ga)|0,R^(g^(na|ca))|0,48)|0;f=C|f;c[Q+96>>2]=ca|W;c[Q+96+4>>2]=f;ja=le(ca|W|0,f|0,ha|0,ja|0)|0;ha=C;c[Q+64>>2]=ja;c[Q+64+4>>2]=ha;f=ne(ja^(S|Z)|0,ha^U|0,63)|0;W=C;U=oe(ja^(S|Z)|0,ha^U|0,1)|0;c[Q+32>>2]=U|f;c[Q+32+4>>2]=C|W;W=c[Q+40>>2]|0;f=c[Q+40+4>>2]|0;$=le(W|0,f|0,_|0,$|0)|0;$=le($|0,C|0,n|0,o|0)|0;_=C;X=le(fa^_|0,(h|ia)^$|0,ka|0,X|0)|0;ka=C;U=ne(X^W|0,ka^f|0,24)|0;ha=C;f=oe(X^W|0,ka^f|0,40)|0;ha=C|ha;W=le(q|0,r|0,$|0,_|0)|0;W=le(W|0,C|0,f|U|0,ha|0)|0;Z=C;c[Q+8>>2]=W;c[Q+8+4>>2]=Z;S=ne(W^(fa^_)|0,Z^((h|ia)^$)|0,16)|0;ja=C;$=oe(W^(fa^_)|0,Z^((h|ia)^$)|0,48)|0;ja=C|ja;c[Q+104>>2]=$|S;c[Q+104+4>>2]=ja;ka=le($|S|0,ja|0,X|0,ka|0)|0;X=C;c[Q+72>>2]=ka;c[Q+72+4>>2]=X;ja=ne(ka^(f|U)|0,X^ha|0,63)|0;S=C;ha=oe(ka^(f|U)|0,X^ha|0,1)|0;S=C|S;X=c[Q+48>>2]|0;U=c[Q+48+4>>2]|0;ea=le(X|0,U|0,V|0,ea|0)|0;ea=le(ea|0,C|0,s|0,t|0)|0;V=C;f=le(ba^V|0,(da|aa)^ea|0,c[Q+80>>2]|0,c[Q+80+4>>2]|0)|0;ka=C;$=ne(f^X|0,ka^U|0,24)|0;ia=C;U=oe(f^X|0,ka^U|0,40)|0;ia=C|ia;X=le(u|0,v|0,ea|0,V|0)|0;X=le(X|0,C|0,U|$|0,ia|0)|0;h=C;c[Q+16>>2]=X;c[Q+16+4>>2]=h;_=ne(X^(ba^V)|0,h^((da|aa)^ea)|0,16)|0;fa=C;ea=oe(X^(ba^V)|0,h^((da|aa)^ea)|0,48)|0;fa=C|fa;c[Q+112>>2]=ea|_;c[Q+112+4>>2]=fa;ka=le(ea|_|0,fa|0,f|0,ka|0)|0;f=C;fa=ne(ka^(U|$)|0,f^ia|0,63)|0;_=C;ia=oe(ka^(U|$)|0,f^ia|0,1)|0;_=C|_;$=c[Q+56>>2]|0;U=c[Q+56+4>>2]|0;T=le($|0,U|0,Y|0,T|0)|0;T=le(T|0,C|0,w|0,x|0)|0;Y=C;ea=c[Q+120>>2]^T;aa=c[Q+120+4>>2]^Y;da=le(aa|0,ea|0,c[Q+88>>2]|0,c[Q+88+4>>2]|0)|0;V=C;ba=ne(da^$|0,V^U|0,24)|0;ca=C;U=oe(da^$|0,V^U|0,40)|0;ca=C|ca;Y=le(z|0,A|0,T|0,Y|0)|0;Y=le(Y|0,C|0,U|ba|0,ca|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;$=ne(Y^aa|0,T^ea|0,16)|0;na=C;ea=oe(Y^aa|0,T^ea|0,48)|0;na=C|na;V=le(ea|$|0,na|0,da|0,V|0)|0;da=C;aa=ne(V^(U|ba)|0,da^ca|0,63)|0;g=C;ca=oe(V^(U|ba)|0,da^ca|0,1)|0;g=C|g;R=le(ha|ja|0,S|0,ma|0,R|0)|0;R=le(R|0,C|0,B|0,D|0)|0;ma=C;f=le(na^ma|0,(ea|$)^R|0,ka|0,f|0)|0;ka=C;ba=ne(f^(ha|ja)|0,ka^S|0,24)|0;U=C;S=oe(f^(ha|ja)|0,ka^S|0,40)|0;U=C|U;ja=le(E|0,F|0,R|0,ma|0)|0;ja=le(ja|0,C|0,S|ba|0,U|0)|0;ha=C;c[Q>>2]=ja;c[Q+4>>2]=ha;ga=ne(ja^(na^ma)|0,ha^((ea|$)^R)|0,16)|0;la=C;R=oe(ja^(na^ma)|0,ha^((ea|$)^R)|0,48)|0;la=C|la;c[Q+120>>2]=R|ga;c[Q+120+4>>2]=la;ka=le(R|ga|0,la|0,f|0,ka|0)|0;f=C;c[Q+80>>2]=ka;c[Q+80+4>>2]=f;la=ne(ka^(S|ba)|0,f^U|0,63)|0;ga=C;U=oe(ka^(S|ba)|0,f^U|0,1)|0;c[Q+40>>2]=U|la;c[Q+40+4>>2]=C|ga;Z=le(ia|fa|0,_|0,W|0,Z|0)|0;Z=le(Z|0,C|0,G|0,H|0)|0;W=C;ga=c[Q+96>>2]^Z;la=c[Q+96+4>>2]^W;da=le(la|0,ga|0,V|0,da|0)|0;V=C;U=ne(da^(ia|fa)|0,V^_|0,24)|0;f=C;_=oe(da^(ia|fa)|0,V^_|0,40)|0;f=C|f;W=le(I|0,J|0,Z|0,W|0)|0;W=le(W|0,C|0,_|U|0,f|0)|0;Z=C;c[Q+8>>2]=W;c[Q+8+4>>2]=Z;fa=ne(W^la|0,Z^ga|0,16)|0;ia=C;ga=oe(W^la|0,Z^ga|0,48)|0;ia=C|ia;V=le(ga|fa|0,ia|0,da|0,V|0)|0;da=C;c[Q+88>>2]=V;c[Q+88+4>>2]=da;la=ne(V^(_|U)|0,da^f|0,63)|0;ba=C;f=oe(V^(_|U)|0,da^f|0,1)|0;c[Q+48>>2]=f|la;c[Q+48+4>>2]=C|ba;h=le(ca|aa|0,g|0,X|0,h|0)|0;h=le(h|0,C|0,K|0,L|0)|0;X=C;ba=c[Q+104>>2]^h;la=c[Q+104+4>>2]^X;f=le(la|0,ba|0,c[Q+64>>2]|0,c[Q+64+4>>2]|0)|0;da=C;U=ne(f^(ca|aa)|0,da^g|0,24)|0;_=C;g=oe(f^(ca|aa)|0,da^g|0,40)|0;_=C|_;X=le(N|0,O|0,h|0,X|0)|0;X=le(X|0,C|0,g|U|0,_|0)|0;h=C;c[Q+16>>2]=X;c[Q+16+4>>2]=h;aa=ne(X^la|0,h^ba|0,16)|0;ca=C;ba=oe(X^la|0,h^ba|0,48)|0;ca=C|ca;da=le(ba|aa|0,ca|0,f|0,da|0)|0;f=C;la=ne(da^(g|U)|0,f^_|0,63)|0;V=C;_=oe(da^(g|U)|0,f^_|0,1)|0;c[Q+56>>2]=_|la;c[Q+56+4>>2]=C|V;V=c[Q+32>>2]|0;la=c[Q+32+4>>2]|0;T=le(V|0,la|0,Y|0,T|0)|0;T=le(T|0,C|0,j|0,k|0)|0;Y=C;_=c[Q+112>>2]^T;U=c[Q+112+4>>2]^Y;g=le(U|0,_|0,c[Q+72>>2]|0,c[Q+72+4>>2]|0)|0;S=C;ka=ne(g^V|0,S^la|0,24)|0;R=C;la=oe(g^V|0,S^la|0,40)|0;R=C|R;Y=le(l|0,e|0,T|0,Y|0)|0;Y=le(Y|0,C|0,la|ka|0,R|0)|0;T=C;c[Q+24>>2]=Y;c[Q+24+4>>2]=T;V=ne(Y^U|0,T^_|0,16)|0;$=C;_=oe(Y^U|0,T^_|0,48)|0;$=C|$;S=le(_|V|0,$|0,g|0,S|0)|0;g=C;U=ne(S^(la|ka)|0,g^R|0,63)|0;ea=C;R=oe(S^(la|ka)|0,g^R|0,1)|0;ea=C|ea;ha=le(j|0,k|0,ja|0,ha|0)|0;ha=le(ha|0,C|0,R|U|0,ea|0)|0;ja=C;f=le(ja^ia|0,ha^(ga|fa)|0,da|0,f|0)|0;k=C;da=ne(f^(R|U)|0,k^ea|0,24)|0;j=C;ea=oe(f^(R|U)|0,k^ea|0,40)|0;j=C|j;U=le(G|0,H|0,ha|0,ja|0)|0;U=le(U|0,C|0,ea|da|0,j|0)|0;R=C;c[Q>>2]=U;c[Q+4>>2]=R;H=ne(U^(ja^ia)|0,R^(ha^(ga|fa))|0,16)|0;G=C;fa=oe(U^(ja^ia)|0,R^(ha^(ga|fa))|0,48)|0;G=C|G;c[Q+96>>2]=fa|H;c[Q+96+4>>2]=G;G=le(fa|H|0,G|0,f|0,k|0)|0;k=C;c[Q+64>>2]=G;c[Q+64+4>>2]=k;H=ne(G^(ea|da)|0,k^j|0,63)|0;f=C;j=oe(G^(ea|da)|0,k^j|0,1)|0;c[Q+32>>2]=j|H;c[Q+32+4>>2]=C|f;f=c[Q+40>>2]|0;H=c[Q+40+4>>2]|0;j=le(f|0,H|0,W|0,Z|0)|0;j=le(j|0,C|0,s|0,t|0)|0;k=C;g=le(ca^k|0,(ba|aa)^j|0,S|0,g|0)|0;S=C;Z=ne(g^f|0,S^H|0,24)|0;W=C;H=oe(g^f|0,S^H|0,40)|0;W=C|W;s=le(B|0,D|0,j|0,k|0)|0;s=le(s|0,C|0,H|Z|0,W|0)|0;t=C;c[Q+8>>2]=s;c[Q+8+4>>2]=t;f=ne(s^(ca^k)|0,t^((ba|aa)^j)|0,16)|0;D=C;j=oe(s^(ca^k)|0,t^((ba|aa)^j)|0,48)|0;D=C|D;c[Q+104>>2]=j|f;c[Q+104+4>>2]=D;S=le(j|f|0,D|0,g|0,S|0)|0;D=C;c[Q+72>>2]=S;c[Q+72+4>>2]=D;g=ne(S^(H|Z)|0,D^W|0,63)|0;f=C;W=oe(S^(H|Z)|0,D^W|0,1)|0;f=C|f;D=c[Q+48>>2]|0;Z=c[Q+48+4>>2]|0;H=le(D|0,Z|0,X|0,h|0)|0;H=le(H|0,C|0,E|0,F|0)|0;F=C;h=le($^F|0,(_|V)^H|0,c[Q+80>>2]|0,c[Q+80+4>>2]|0)|0;X=C;S=ne(h^D|0,X^Z|0,24)|0;j=C;Z=oe(h^D|0,X^Z|0,40)|0;j=C|j;E=le(l|0,e|0,H|0,F|0)|0;E=le(E|0,C|0,Z|S|0,j|0)|0;D=C;c[Q+16>>2]=E;c[Q+16+4>>2]=D;l=ne(E^($^F)|0,D^((_|V)^H)|0,16)|0;k=C;H=oe(E^($^F)|0,D^((_|V)^H)|0,48)|0;k=C|k;c[Q+112>>2]=H|l;c[Q+112+4>>2]=k;X=le(H|l|0,k|0,h|0,X|0)|0;h=C;k=ne(X^(Z|S)|0,h^j|0,63)|0;l=C;j=oe(X^(Z|S)|0,h^j|0,1)|0;l=C|l;S=c[Q+56>>2]|0;Z=c[Q+56+4>>2]|0;H=le(S|0,Z|0,Y|0,T|0)|0;H=le(H|0,C|0,N|0,O|0)|0;F=C;T=c[Q+120>>2]^H;B=c[Q+120+4>>2]^F;G=le(B|0,T|0,c[Q+88>>2]|0,c[Q+88+4>>2]|0)|0;O=C;Y=ne(G^S|0,O^Z|0,24)|0;N=C;Z=oe(G^S|0,O^Z|0,40)|0;N=C|N;F=le(w|0,x|0,H|0,F|0)|0;F=le(F|0,C|0,Z|Y|0,N|0)|0;H=C;c[Q+24>>2]=F;c[Q+24+4>>2]=H;S=ne(F^B|0,H^T|0,16)|0;V=C;T=oe(F^B|0,H^T|0,48)|0;V=C|V;O=le(T|S|0,V|0,G|0,O|0)|0;G=C;B=ne(O^(Z|Y)|0,G^N|0,63)|0;e=C;x=oe(O^(Z|Y)|0,G^N|0,1)|0;e=C|e;R=le(W|g|0,f|0,U|0,R|0)|0;R=le(R|0,C|0,M|0,m|0)|0;U=C;w=le(V^U|0,(T|S)^R|0,X|0,h|0)|0;h=C;N=ne(w^(W|g)|0,h^f|0,24)|0;M=C;m=oe(w^(W|g)|0,h^f|0,40)|0;M=C|M;f=le(K|0,L|0,R|0,U|0)|0;f=le(f|0,C|0,m|N|0,M|0)|0;g=C;c[Q>>2]=f;c[Q+4>>2]=g;L=ne(f^(V^U)|0,g^((T|S)^R)|0,16)|0;K=C;R=oe(f^(V^U)|0,g^((T|S)^R)|0,48)|0;K=C|K;c[Q+120>>2]=R|L;c[Q+120+4>>2]=K;h=le(R|L|0,K|0,w|0,h|0)|0;K=C;c[Q+80>>2]=h;c[Q+80+4>>2]=K;L=ne(h^(m|N)|0,K^M|0,63)|0;w=C;M=oe(h^(m|N)|0,K^M|0,1)|0;c[Q+40>>2]=M|L;c[Q+40+4>>2]=C|w;t=le(j|k|0,l|0,s|0,t|0)|0;t=le(t|0,C|0,p|0,y|0)|0;p=C;w=c[Q+96>>2]^t;s=c[Q+96+4>>2]^p;L=le(s|0,w|0,O|0,G|0)|0;y=C;M=ne(L^(j|k)|0,y^l|0,24)|0;G=C;K=oe(L^(j|k)|0,y^l|0,40)|0;G=C|G;p=le(n|0,o|0,t|0,p|0)|0;p=le(p|0,C|0,K|M|0,G|0)|0;t=C;c[Q+8>>2]=p;c[Q+8+4>>2]=t;O=ne(p^s|0,t^w|0,16)|0;N=C;w=oe(p^s|0,t^w|0,48)|0;N=C|N;c[Q+96>>2]=w|O;c[Q+96+4>>2]=N;y=le(w|O|0,N|0,L|0,y|0)|0;L=C;c[Q+88>>2]=y;c[Q+88+4>>2]=L;N=ne(y^(K|M)|0,L^G|0,63)|0;O=C;G=oe(y^(K|M)|0,L^G|0,1)|0;c[Q+48>>2]=G|N;c[Q+48+4>>2]=C|O;O=le(x|B|0,e|0,E|0,D|0)|0;O=le(O|0,C|0,I|0,J|0)|0;D=C;N=c[Q+104>>2]^O;E=c[Q+104+4>>2]^D;G=le(E|0,N|0,c[Q+64>>2]|0,c[Q+64+4>>2]|0)|0;L=C;M=ne(G^(x|B)|0,L^e|0,24)|0;I=C;J=oe(G^(x|B)|0,L^e|0,40)|0;I=C|I;D=le(z|0,A|0,O|0,D|0)|0;D=le(D|0,C|0,J|M|0,I|0)|0;O=C;c[Q+16>>2]=D;c[Q+16+4>>2]=O;e=ne(D^E|0,O^N|0,16)|0;K=C;N=oe(D^E|0,O^N|0,48)|0;K=C|K;c[Q+104>>2]=N|e;c[Q+104+4>>2]=K;L=le(N|e|0,K|0,G|0,L|0)|0;G=C;c[Q+64>>2]=L;c[Q+64+4>>2]=G;K=ne(L^(J|M)|0,G^I|0,63)|0;e=C;I=oe(L^(J|M)|0,G^I|0,1)|0;c[Q+56>>2]=I|K;c[Q+56+4>>2]=C|e;e=c[Q+32>>2]|0;K=c[Q+32+4>>2]|0;H=le(e|0,K|0,F|0,H|0)|0;H=le(H|0,C|0,u|0,v|0)|0;F=C;I=c[Q+112>>2]^H;G=c[Q+112+4>>2]^F;M=le(G|0,I|0,c[Q+72>>2]|0,c[Q+72+4>>2]|0)|0;J=C;L=ne(M^e|0,J^K|0,24)|0;N=C;K=oe(M^e|0,J^K|0,40)|0;N=C|N;F=le(q|0,r|0,H|0,F|0)|0;F=le(F|0,C|0,K|L|0,N|0)|0;H=C;c[Q+24>>2]=F;c[Q+24+4>>2]=H;e=ne(F^G|0,H^I|0,16)|0;O=C;I=oe(F^G|0,H^I|0,48)|0;O=C|O;c[Q+112>>2]=I|e;c[Q+112+4>>2]=O;J=le(I|e|0,O|0,M|0,J|0)|0;M=C;c[Q+72>>2]=J;c[Q+72+4>>2]=M;O=ne(J^(K|L)|0,M^N|0,63)|0;e=C;N=oe(J^(K|L)|0,M^N|0,1)|0;c[Q+32>>2]=N|O;c[Q+32+4>>2]=C|e;e=0;while(1){na=b+(e<<3)|0;ma=Q+(e+8<<3)|0;la=f^(d[na>>0]|d[na+1>>0]<<8|d[na+2>>0]<<16|d[na+3>>0]<<24)^c[ma>>2];ma=g^(d[na+4>>0]|d[na+4+1>>0]<<8|d[na+4+2>>0]<<16|d[na+4+3>>0]<<24)^c[ma+4>>2];a[na>>0]=la;a[na+1>>0]=la>>8;a[na+2>>0]=la>>16;a[na+3>>0]=la>>24;a[na+4>>0]=ma;a[na+4+1>>0]=ma>>8;a[na+4+2>>0]=ma>>16;a[na+4+3>>0]=ma>>24;e=e+1|0;if((e|0)==8)break;f=c[Q+(e<<3)>>2]|0;g=c[Q+(e<<3)+4>>2]|0}i=P;return}function nc(b,c){b=b|0;c=c|0;var e=0,f=0,g=0,h=0,i=0;me(b|0,0,357)|0;a[b>>0]=-205731576;a[b+1>>0]=-205731576>>8;a[b+2>>0]=-205731576>>16;a[b+3>>0]=-205731576>>24;a[b+4>>0]=103;a[b+4+1>>0]=230;a[b+4+2>>0]=9;a[b+4+3>>0]=106;a[b+8>>0]=-2067093701;a[b+8+1>>0]=-2067093701>>8;a[b+8+2>>0]=-2067093701>>16;a[b+8+3>>0]=-2067093701>>24;a[b+8+4>>0]=-1150833019;a[b+8+4+1>>0]=-1150833019>>8;a[b+8+4+2>>0]=-1150833019>>16;a[b+8+4+3>>0]=-1150833019>>24;a[b+16>>0]=-23791573;a[b+16+1>>0]=-23791573>>8;a[b+16+2>>0]=-23791573>>16;a[b+16+3>>0]=-23791573>>24;a[b+16+4>>0]=114;a[b+16+4+1>>0]=243;a[b+16+4+2>>0]=110;a[b+16+4+3>>0]=60;a[b+24>>0]=241;a[b+24+1>>0]=54;a[b+24+2>>0]=29;a[b+24+3>>0]=95;a[b+24+4>>0]=-1521486534;a[b+24+4+1>>0]=-1521486534>>8;a[b+24+4+2>>0]=-1521486534>>16;a[b+24+4+3>>0]=-1521486534>>24;a[b+32>>0]=-1377402159;a[b+32+1>>0]=-1377402159>>8;a[b+32+2>>0]=-1377402159>>16;a[b+32+3>>0]=-1377402159>>24;a[b+32+4>>0]=127;a[b+32+4+1>>0]=82;a[b+32+4+2>>0]=14;a[b+32+4+3>>0]=81;a[b+40>>0]=31;a[b+40+1>>0]=108;a[b+40+2>>0]=62;a[b+40+3>>0]=43;a[b+40+4>>0]=-1694144372;a[b+40+4+1>>0]=-1694144372>>8;a[b+40+4+2>>0]=-1694144372>>16;a[b+40+4+3>>0]=-1694144372>>24;a[b+48>>0]=-79577749;a[b+48+1>>0]=-79577749>>8;a[b+48+2>>0]=-79577749>>16;a[b+48+3>>0]=-79577749>>24;a[b+48+4>>0]=171;a[b+48+4+1>>0]=217;a[b+48+4+2>>0]=131;a[b+48+4+3>>0]=31;a[b+56>>0]=121;a[b+56+1>>0]=33;a[b+56+2>>0]=126;a[b+56+3>>0]=19;a[b+56+4>>0]=25;a[b+56+4+1>>0]=205;a[b+56+4+2>>0]=224;a[b+56+4+3>>0]=91;f=(d[c>>0]|d[c+1>>0]<<8|d[c+2>>0]<<16|d[c+3>>0]<<24)^-205731576;e=(d[c+4>>0]|d[c+4+1>>0]<<8|d[c+4+2>>0]<<16|d[c+4+3>>0]<<24)^1779033703;a[b>>0]=f;a[b+1>>0]=f>>8;a[b+2>>0]=f>>16;a[b+3>>0]=f>>24;a[b+4>>0]=e;a[b+4+1>>0]=e>>8;a[b+4+2>>0]=e>>16;a[b+4+3>>0]=e>>24;e=1;f=-2067093701;g=-1150833019;while(1){i=c+(e<<3)|0;h=f^(d[i>>0]|d[i+1>>0]<<8|d[i+2>>0]<<16|d[i+3>>0]<<24);f=g^(d[i+4>>0]|d[i+4+1>>0]<<8|d[i+4+2>>0]<<16|d[i+4+3>>0]<<24);g=b+(e<<3)|0;a[g>>0]=h;a[g+1>>0]=h>>8;a[g+2>>0]=h>>16;a[g+3>>0]=h>>24;a[g+4>>0]=f;a[g+4+1>>0]=f>>8;a[g+4+2>>0]=f>>16;a[g+4+3>>0]=f>>24;e=e+1|0;if((e|0)==8)break;f=b+(e<<3)|0;g=b+(e<<3)+4|0;f=d[f>>0]|d[f+1>>0]<<8|d[f+2>>0]<<16|d[f+3>>0]<<24;g=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24}return}function oc(b,c){b=b|0;c=c|0;var d=0,e=0,f=0;e=i;f=i=i+63&-64;i=i+64|0;if((c+-1&255)>63)fa();else{a[f>>0]=c;a[f+1>>0]=0;a[f+2>>0]=1;a[f+3>>0]=1;c=f+4|0;d=c+60|0;do{a[c>>0]=0;c=c+1|0}while((c|0)<(d|0));nc(b,f);i=e;return}}function pc(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0;g=i;h=i=i+63&-64;i=i+192|0;if((c+-1&255)>63)fa();if((e+-1&255)>63|(d|0)==0)fa();else{a[h+128>>0]=c;a[h+128+1>>0]=e;a[h+128+2>>0]=1;a[h+128+3>>0]=1;c=h+128+4|0;f=c+60|0;do{a[c>>0]=0;c=c+1|0}while((c|0)<(f|0));nc(b,h+128|0);c=h;f=c+128|0;do{a[c>>0]=0;c=c+1|0}while((c|0)<(f|0));pe(h|0,d|0,e&255|0)|0;qc(b,h,128,0);Rd(h,128);i=g;return}}function qc(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;a:do if(!((e|0)==0&(f|0)==0)){g=d[b+352>>0]|d[b+352+1>>0]<<8|d[b+352+2>>0]<<16|d[b+352+3>>0]<<24;j=e;while(1){i=256-g|0;e=b+96+g|0;if(!(f>>>0>0|(f|0)==0&j>>>0>i>>>0))break;pe(e|0,c|0,i|0)|0;g=(d[b+352>>0]|d[b+352+1>>0]<<8|d[b+352+2>>0]<<16|d[b+352+3>>0]<<24)+i|0;a[b+352>>0]=g;a[b+352+1>>0]=g>>8;a[b+352+2>>0]=g>>16;a[b+352+3>>0]=g>>24;g=d[b+64>>0]|d[b+64+1>>0]<<8|d[b+64+2>>0]<<16|d[b+64+3>>0]<<24;e=d[b+64+4>>0]|d[b+64+4+1>>0]<<8|d[b+64+4+2>>0]<<16|d[b+64+4+3>>0]<<24;k=le(g|0,e|0,128,0)|0;h=C;a[b+64>>0]=k;a[b+64+1>>0]=k>>8;a[b+64+2>>0]=k>>16;a[b+64+3>>0]=k>>24;a[b+64+4>>0]=h;a[b+64+4+1>>0]=h>>8;a[b+64+4+2>>0]=h>>16;a[b+64+4+3>>0]=h>>24;g=le((e>>>0>4294967295|(e|0)==-1&g>>>0>4294967167)&1|0,0,d[b+72>>0]|d[b+72+1>>0]<<8|d[b+72+2>>0]<<16|d[b+72+3>>0]<<24|0,d[b+72+4>>0]|d[b+72+4+1>>0]<<8|d[b+72+4+2>>0]<<16|d[b+72+4+3>>0]<<24|0)|0;e=C;a[b+72>>0]=g;a[b+72+1>>0]=g>>8;a[b+72+2>>0]=g>>16;a[b+72+3>>0]=g>>24;a[b+72+4>>0]=e;a[b+72+4+1>>0]=e>>8;a[b+72+4+2>>0]=e>>16;a[b+72+4+3>>0]=e>>24;mc(b,b+96|0);e=b+96|0;g=b+224|0;h=e+128|0;do{a[e>>0]=a[g>>0]|0;e=e+1|0;g=g+1|0}while((e|0)<(h|0));g=(d[b+352>>0]|d[b+352+1>>0]<<8|d[b+352+2>>0]<<16|d[b+352+3>>0]<<24)+-128|0;a[b+352>>0]=g;a[b+352+1>>0]=g>>8;a[b+352+2>>0]=g>>16;a[b+352+3>>0]=g>>24;e=ke(j|0,f|0,i|0,0)|0;if((j|0)==(i|0)&(f|0)==0)break a;else{c=c+i|0;f=C;j=e}}pe(e|0,c|0,j|0)|0;k=le(d[b+352>>0]|d[b+352+1>>0]<<8|d[b+352+2>>0]<<16|d[b+352+3>>0]<<24|0,0,j|0,f|0)|0;a[b+352>>0]=k;a[b+352+1>>0]=k>>8;a[b+352+2>>0]=k>>16;a[b+352+3>>0]=k>>24}while(0);return}function rc(b,c,e){b=b|0;c=c|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;if(e<<24>>24!=0?(e&255)<=64:0){if((d[b+80>>0]|d[b+80+1>>0]<<8|d[b+80+2>>0]<<16|d[b+80+3>>0]<<24|0)==0?(d[b+80+4>>0]|d[b+80+4+1>>0]<<8|d[b+80+4+2>>0]<<16|d[b+80+4+3>>0]<<24|0)==0:0){f=d[b+352>>0]|d[b+352+1>>0]<<8|d[b+352+2>>0]<<16|d[b+352+3>>0]<<24;do if(f>>>0>128){i=d[b+64>>0]|d[b+64+1>>0]<<8|d[b+64+2>>0]<<16|d[b+64+3>>0]<<24;f=d[b+64+4>>0]|d[b+64+4+1>>0]<<8|d[b+64+4+2>>0]<<16|d[b+64+4+3>>0]<<24;k=le(i|0,f|0,128,0)|0;j=C;a[b+64>>0]=k;a[b+64+1>>0]=k>>8;a[b+64+2>>0]=k>>16;a[b+64+3>>0]=k>>24;a[b+64+4>>0]=j;a[b+64+4+1>>0]=j>>8;a[b+64+4+2>>0]=j>>16;a[b+64+4+3>>0]=j>>24;i=le((f>>>0>4294967295|(f|0)==-1&i>>>0>4294967167)&1|0,0,d[b+72>>0]|d[b+72+1>>0]<<8|d[b+72+2>>0]<<16|d[b+72+3>>0]<<24|0,d[b+72+4>>0]|d[b+72+4+1>>0]<<8|d[b+72+4+2>>0]<<16|d[b+72+4+3>>0]<<24|0)|0;f=C;a[b+72>>0]=i;a[b+72+1>>0]=i>>8;a[b+72+2>>0]=i>>16;a[b+72+3>>0]=i>>24;a[b+72+4>>0]=f;a[b+72+4+1>>0]=f>>8;a[b+72+4+2>>0]=f>>16;a[b+72+4+3>>0]=f>>24;mc(b,b+96|0);f=(d[b+352>>0]|d[b+352+1>>0]<<8|d[b+352+2>>0]<<16|d[b+352+3>>0]<<24)+-128|0;a[b+352>>0]=f;a[b+352+1>>0]=f>>8;a[b+352+2>>0]=f>>16;a[b+352+3>>0]=f>>24;if(f>>>0<129){pe(b+96|0,b+224|0,f|0)|0;g=b+72|0;h=d[b+352>>0]|d[b+352+1>>0]<<8|d[b+352+2>>0]<<16|d[b+352+3>>0]<<24;break}else da(32888,32920,343,32964)}else{g=b+72|0;h=f}while(0);j=le(d[b+64>>0]|d[b+64+1>>0]<<8|d[b+64+2>>0]<<16|d[b+64+3>>0]<<24|0,d[b+64+4>>0]|d[b+64+4+1>>0]<<8|d[b+64+4+2>>0]<<16|d[b+64+4+3>>0]<<24|0,h|0,0)|0;k=C;a[b+64>>0]=j;a[b+64+1>>0]=j>>8;a[b+64+2>>0]=j>>16;a[b+64+3>>0]=j>>24;a[b+64+4>>0]=k;a[b+64+4+1>>0]=k>>8;a[b+64+4+2>>0]=k>>16;a[b+64+4+3>>0]=k>>24;i=g;i=le((k>>>0<0|(k|0)==0&j>>>0<h>>>0)&1|0,0,d[i>>0]|d[i+1>>0]<<8|d[i+2>>0]<<16|d[i+3>>0]<<24|0,d[i+4>>0]|d[i+4+1>>0]<<8|d[i+4+2>>0]<<16|d[i+4+3>>0]<<24|0)|0;j=C;k=g;a[k>>0]=i;a[k+1>>0]=i>>8;a[k+2>>0]=i>>16;a[k+3>>0]=i>>24;a[k+4>>0]=j;a[k+4+1>>0]=j>>8;a[k+4+2>>0]=j>>16;a[k+4+3>>0]=j>>24;if(a[b+356>>0]|0){a[b+88>>0]=-1;a[b+88+1>>0]=-1>>8;a[b+88+2>>0]=-1>>16;a[b+88+3>>0]=-1>>24;a[b+88+4>>0]=-1;a[b+88+4+1>>0]=-1>>8;a[b+88+4+2>>0]=-1>>16;a[b+88+4+3>>0]=-1>>24}a[b+80>>0]=-1;a[b+80+1>>0]=-1>>8;a[b+80+2>>0]=-1>>16;a[b+80+3>>0]=-1>>24;a[b+80+4>>0]=-1;a[b+80+4+1>>0]=-1>>8;a[b+80+4+2>>0]=-1>>16;a[b+80+4+3>>0]=-1>>24;me(b+96+h|0,0,256-h|0)|0;mc(b,b+96|0);pe(c|0,b|0,e&255|0)|0;f=0}else f=-1;return f|0}fa();return 0}function sc(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;h=i;j=i=i+63&-64;i=i+368|0;if((b|0)==0&((e|0)!=0|(f|0)!=0))fa();if(!a)fa();if((d+-1&255)>63)fa();if(!((c|0)!=0|g<<24>>24==0))fa();if((g&255)>64)fa();if(!(g<<24>>24))oc(j,d);else pc(j,d,c,g);qc(j,b,e,f);rc(j,a,d)|0;i=h;return}function tc(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;do if(!((b+-1|0)>>>0>63|g>>>0>64)){if(b>>>0>=256)da(32998,33018,18,33070);if(g>>>0<256){sc(a,c,f,b&255,d,e,g&255);h=0;break}else da(33097,33018,19,33070)}else h=-1;while(0);return h|0}function uc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;do if(!(c>>>0>64|(d+-1|0)>>>0>63)){if(d>>>0>=256)da(32998,33018,53,33117);if(c>>>0>=256)da(33097,33018,54,33117);if((b|0)==0|(c|0)==0){oc(a,d&255);b=0;break}else{pc(a,d&255,b,c&255);b=0;break}}else b=-1;while(0);return b|0}function vc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;qc(a,b,c,d);return}function wc(a,b,c){a=a|0;b=b|0;c=c|0;if(c>>>0<256)return rc(a,b,c&255)|0;else da(32998,33018,106,33149);return 0}function xc(){return 64}function yc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Cc(a,b,c,d);return 0}function zc(a){a=a|0;var b=0,d=0;c[a+64>>2]=0;c[a+64+4>>2]=0;c[a+64+8>>2]=0;c[a+64+12>>2]=0;b=400;d=a+64|0;do{c[a>>2]=c[b>>2];a=a+4|0;b=b+4|0}while((a|0)<(d|0));return}function Ac(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=c[b+72>>2]|0;m=c[b+72+4>>2]|0;k=ne(o|0,m|0,3)|0;l=oe(e|0,f|0,3)|0;n=C;i=ne(e|0,f|0,61)|0;j=C;m=le(o|0,m|0,l|0,n|0)|0;o=C;c[b+72>>2]=m;c[b+72+4>>2]=o;g=c[b+64>>2]|0;h=c[b+64+4>>2]|0;if(o>>>0<n>>>0|(o|0)==(n|0)&m>>>0<l>>>0){g=le(g|0,h|0,1,0)|0;h=C;c[b+64>>2]=g;c[b+64+4>>2]=h}j=le(g|0,h|0,i|0,j|0)|0;c[b+64>>2]=j;c[b+64+4>>2]=C;j=ke(128,0,k&127|0,0)|0;g=C;if(g>>>0>f>>>0|(g|0)==(f|0)&j>>>0>e>>>0){if(!((e|0)==0&(f|0)==0)){g=0;h=0;do{n=a[d+g>>0]|0;o=le(g|0,h|0,k&127|0,0)|0;a[b+80+o>>0]=n;g=le(g|0,h|0,1,0)|0;h=C}while(h>>>0<f>>>0|(h|0)==(f|0)&g>>>0<e>>>0)}}else{if(!((j|0)==0&(g|0)==0)){h=0;i=0;do{n=a[d+h>>0]|0;o=le(h|0,i|0,k&127|0,0)|0;a[b+80+o>>0]=n;h=le(h|0,i|0,1,0)|0;i=C}while(i>>>0<g>>>0|(i|0)==(g|0)&h>>>0<j>>>0)}Dc(b,b+80|0);h=ke(e|0,f|0,j|0,g|0)|0;g=C;if(g>>>0>0|(g|0)==0&h>>>0>127){e=le(k&127|0,0,e|0,f|0)|0;e=le(e|0,C|0,-256,-1)|0;i=d+j|0;while(1){Dc(b,i);h=le(h|0,g|0,-128,-1)|0;g=C;if(!(g>>>0>0|(g|0)==0&h>>>0>127))break;else i=i+128|0}g=e&127;j=(e+256&-128)-(k&127)|0}else g=h;g=g&127;if(!((g|0)==0&0==0)){h=0;i=0;do{a[b+80+h>>0]=a[d+(j+h)>>0]|0;h=le(h|0,i|0,1,0)|0;i=C}while(i>>>0<0|(i|0)==0&h>>>0<g>>>0)}}return}function Bc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=i;e=i=i+63&-64;i=i+16|0;Ec(e,a+64|0,16);f=ne(c[a+72>>2]|0,c[a+72+4>>2]|0,3)|0;f=ke((0<0|0==0&(f&127)>>>0<112?112:240)|0,(0<0|0==0&(f&127)>>>0<112?0:0)|0,f&127|0,0)|0;Ac(a,33182,f,C);Ac(a,e,16,0);Ec(b,a,64);Rd(a,208);i=d;return}function Cc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;g=i;h=i=i+63&-64;i=i+208|0;c[h+64>>2]=0;c[h+64+4>>2]=0;c[h+64+8>>2]=0;c[h+64+12>>2]=0;f=h;j=400;k=f+64|0;do{c[f>>2]=c[j>>2];f=f+4|0;j=j+4|0}while((f|0)<(k|0));Ac(h,b,d,e);Bc(h,a);i=g;return}
function ge(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;do if(a>>>0<245){n=a>>>0<11?16:a+11&-8;g=c[8080]|0;if(g>>>(n>>>3)&3){a=(g>>>(n>>>3)&1^1)+(n>>>3)<<1;b=c[32360+(a+2<<2)>>2]|0;d=c[b+8>>2]|0;do if((32360+(a<<2)|0)!=(d|0)){if(d>>>0<(c[8084]|0)>>>0)fa();if((c[d+12>>2]|0)==(b|0)){c[d+12>>2]=32360+(a<<2);c[32360+(a+2<<2)>>2]=d;break}else fa()}else c[8080]=g&~(1<<(g>>>(n>>>3)&1^1)+(n>>>3));while(0);F=(g>>>(n>>>3)&1^1)+(n>>>3)<<3;c[b+4>>2]=F|3;c[b+(F|4)>>2]=c[b+(F|4)>>2]|1;F=b+8|0;return F|0}b=c[8082]|0;if(n>>>0>b>>>0){if(g>>>(n>>>3)){a=g>>>(n>>>3)<<(n>>>3)&(2<<(n>>>3)|0-(2<<(n>>>3)));f=((a&0-a)+-1|0)>>>(((a&0-a)+-1|0)>>>12&16);e=f>>>(f>>>5&8)>>>(f>>>(f>>>5&8)>>>2&4);e=(f>>>5&8|((a&0-a)+-1|0)>>>12&16|f>>>(f>>>5&8)>>>2&4|e>>>1&2|e>>>(e>>>1&2)>>>1&1)+(e>>>(e>>>1&2)>>>(e>>>(e>>>1&2)>>>1&1))|0;f=c[32360+((e<<1)+2<<2)>>2]|0;a=c[f+8>>2]|0;do if((32360+(e<<1<<2)|0)!=(a|0)){if(a>>>0<(c[8084]|0)>>>0)fa();if((c[a+12>>2]|0)==(f|0)){c[a+12>>2]=32360+(e<<1<<2);c[32360+((e<<1)+2<<2)>>2]=a;h=c[8082]|0;break}else fa()}else{c[8080]=g&~(1<<e);h=b}while(0);c[f+4>>2]=n|3;c[f+(n|4)>>2]=(e<<3)-n|1;c[f+(e<<3)>>2]=(e<<3)-n;if(h){d=c[8085]|0;b=h>>>3;a=c[8080]|0;if(a&1<<b){a=c[32360+((b<<1)+2<<2)>>2]|0;if(a>>>0<(c[8084]|0)>>>0)fa();else{i=32360+((b<<1)+2<<2)|0;j=a}}else{c[8080]=a|1<<b;i=32360+((b<<1)+2<<2)|0;j=32360+(b<<1<<2)|0}c[i>>2]=d;c[j+12>>2]=d;c[d+8>>2]=j;c[d+12>>2]=32360+(b<<1<<2)}c[8082]=(e<<3)-n;c[8085]=f+n;F=f+8|0;return F|0}a=c[8081]|0;if(a){i=((a&0-a)+-1|0)>>>(((a&0-a)+-1|0)>>>12&16);j=i>>>(i>>>5&8)>>>(i>>>(i>>>5&8)>>>2&4);j=c[32624+((i>>>5&8|((a&0-a)+-1|0)>>>12&16|i>>>(i>>>5&8)>>>2&4|j>>>1&2|j>>>(j>>>1&2)>>>1&1)+(j>>>(j>>>1&2)>>>(j>>>(j>>>1&2)>>>1&1))<<2)>>2]|0;i=(c[j+4>>2]&-8)-n|0;b=j;while(1){a=c[b+16>>2]|0;if(!a){a=c[b+20>>2]|0;if(!a)break}b=(c[a+4>>2]&-8)-n|0;F=b>>>0<i>>>0;i=F?b:i;b=a;j=F?a:j}f=c[8084]|0;if(j>>>0<f>>>0)fa();h=j+n|0;if(j>>>0>=h>>>0)fa();g=c[j+24>>2]|0;a=c[j+12>>2]|0;do if((a|0)==(j|0)){b=j+20|0;a=c[b>>2]|0;if(!a){b=j+16|0;a=c[b>>2]|0;if(!a){k=0;break}}while(1){d=a+20|0;e=c[d>>2]|0;if(e){a=e;b=d;continue}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;b=d}}if(b>>>0<f>>>0)fa();else{c[b>>2]=0;k=a;break}}else{b=c[j+8>>2]|0;if(b>>>0<f>>>0)fa();if((c[b+12>>2]|0)!=(j|0))fa();if((c[a+8>>2]|0)==(j|0)){c[b+12>>2]=a;c[a+8>>2]=b;k=a;break}else fa()}while(0);do if(g){a=c[j+28>>2]|0;if((j|0)==(c[32624+(a<<2)>>2]|0)){c[32624+(a<<2)>>2]=k;if(!k){c[8081]=c[8081]&~(1<<a);break}}else{if(g>>>0<(c[8084]|0)>>>0)fa();if((c[g+16>>2]|0)==(j|0))c[g+16>>2]=k;else c[g+20>>2]=k;if(!k)break}b=c[8084]|0;if(k>>>0<b>>>0)fa();c[k+24>>2]=g;a=c[j+16>>2]|0;do if(a)if(a>>>0<b>>>0)fa();else{c[k+16>>2]=a;c[a+24>>2]=k;break}while(0);a=c[j+20>>2]|0;if(a)if(a>>>0<(c[8084]|0)>>>0)fa();else{c[k+20>>2]=a;c[a+24>>2]=k;break}}while(0);if(i>>>0<16){F=i+n|0;c[j+4>>2]=F|3;F=j+(F+4)|0;c[F>>2]=c[F>>2]|1}else{c[j+4>>2]=n|3;c[j+(n|4)>>2]=i|1;c[j+(i+n)>>2]=i;b=c[8082]|0;if(b){d=c[8085]|0;a=c[8080]|0;if(a&1<<(b>>>3)){a=c[32360+((b>>>3<<1)+2<<2)>>2]|0;if(a>>>0<(c[8084]|0)>>>0)fa();else{l=32360+((b>>>3<<1)+2<<2)|0;m=a}}else{c[8080]=a|1<<(b>>>3);l=32360+((b>>>3<<1)+2<<2)|0;m=32360+(b>>>3<<1<<2)|0}c[l>>2]=d;c[m+12>>2]=d;c[d+8>>2]=m;c[d+12>>2]=32360+(b>>>3<<1<<2)}c[8082]=i;c[8085]=h}F=j+8|0;return F|0}else i=n}else i=n}else if(a>>>0<=4294967231){k=a+11&-8;i=c[8081]|0;if(i){if((a+11|0)>>>8)if(k>>>0>16777215)h=31;else{h=(a+11|0)>>>8<<((((a+11|0)>>>8)+1048320|0)>>>16&8);h=14-((h+520192|0)>>>16&4|(((a+11|0)>>>8)+1048320|0)>>>16&8|((h<<((h+520192|0)>>>16&4))+245760|0)>>>16&2)+(h<<((h+520192|0)>>>16&4)<<(((h<<((h+520192|0)>>>16&4))+245760|0)>>>16&2)>>>15)|0;h=k>>>(h+7|0)&1|h<<1}else h=0;a=c[32624+(h<<2)>>2]|0;a:do if(!a){b=0-k|0;d=0;a=0;w=86}else{b=0-k|0;d=0;f=k<<((h|0)==31?0:25-(h>>>1)|0);g=a;a=0;while(1){e=c[g+4>>2]&-8;if((e-k|0)>>>0<b>>>0)if((e|0)==(k|0)){b=e-k|0;e=g;a=g;w=90;break a}else{b=e-k|0;a=g}w=c[g+20>>2]|0;g=c[g+16+(f>>>31<<2)>>2]|0;d=(w|0)==0|(w|0)==(g|0)?d:w;if(!g){w=86;break}else f=f<<1}}while(0);if((w|0)==86){if((d|0)==0&(a|0)==0){a=2<<h;if(!(i&(a|0-a))){i=k;break}m=(i&(a|0-a)&0-(i&(a|0-a)))+-1|0;a=m>>>(m>>>12&16)>>>(m>>>(m>>>12&16)>>>5&8);d=a>>>(a>>>2&4)>>>(a>>>(a>>>2&4)>>>1&2);d=c[32624+((m>>>(m>>>12&16)>>>5&8|m>>>12&16|a>>>2&4|a>>>(a>>>2&4)>>>1&2|d>>>1&1)+(d>>>(d>>>1&1))<<2)>>2]|0;a=0}if(!d){i=b;j=a}else{e=d;w=90}}if((w|0)==90)while(1){w=0;m=(c[e+4>>2]&-8)-k|0;d=m>>>0<b>>>0;b=d?m:b;a=d?e:a;d=c[e+16>>2]|0;if(d){e=d;w=90;continue}e=c[e+20>>2]|0;if(!e){i=b;j=a;break}else w=90}if((j|0)!=0?i>>>0<((c[8082]|0)-k|0)>>>0:0){f=c[8084]|0;if(j>>>0<f>>>0)fa();h=j+k|0;if(j>>>0>=h>>>0)fa();g=c[j+24>>2]|0;a=c[j+12>>2]|0;do if((a|0)==(j|0)){b=j+20|0;a=c[b>>2]|0;if(!a){b=j+16|0;a=c[b>>2]|0;if(!a){n=0;break}}while(1){d=a+20|0;e=c[d>>2]|0;if(e){a=e;b=d;continue}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;b=d}}if(b>>>0<f>>>0)fa();else{c[b>>2]=0;n=a;break}}else{b=c[j+8>>2]|0;if(b>>>0<f>>>0)fa();if((c[b+12>>2]|0)!=(j|0))fa();if((c[a+8>>2]|0)==(j|0)){c[b+12>>2]=a;c[a+8>>2]=b;n=a;break}else fa()}while(0);do if(g){a=c[j+28>>2]|0;if((j|0)==(c[32624+(a<<2)>>2]|0)){c[32624+(a<<2)>>2]=n;if(!n){c[8081]=c[8081]&~(1<<a);break}}else{if(g>>>0<(c[8084]|0)>>>0)fa();if((c[g+16>>2]|0)==(j|0))c[g+16>>2]=n;else c[g+20>>2]=n;if(!n)break}b=c[8084]|0;if(n>>>0<b>>>0)fa();c[n+24>>2]=g;a=c[j+16>>2]|0;do if(a)if(a>>>0<b>>>0)fa();else{c[n+16>>2]=a;c[a+24>>2]=n;break}while(0);a=c[j+20>>2]|0;if(a)if(a>>>0<(c[8084]|0)>>>0)fa();else{c[n+20>>2]=a;c[a+24>>2]=n;break}}while(0);b:do if(i>>>0>=16){c[j+4>>2]=k|3;c[j+(k|4)>>2]=i|1;c[j+(i+k)>>2]=i;b=i>>>3;if(i>>>0<256){a=c[8080]|0;if(a&1<<b){a=c[32360+((b<<1)+2<<2)>>2]|0;if(a>>>0<(c[8084]|0)>>>0)fa();else{p=32360+((b<<1)+2<<2)|0;q=a}}else{c[8080]=a|1<<b;p=32360+((b<<1)+2<<2)|0;q=32360+(b<<1<<2)|0}c[p>>2]=h;c[q+12>>2]=h;c[j+(k+8)>>2]=q;c[j+(k+12)>>2]=32360+(b<<1<<2);break}a=i>>>8;if(a)if(i>>>0>16777215)e=31;else{e=a<<((a+1048320|0)>>>16&8)<<(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4);e=14-(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4|(a+1048320|0)>>>16&8|(e+245760|0)>>>16&2)+(e<<((e+245760|0)>>>16&2)>>>15)|0;e=i>>>(e+7|0)&1|e<<1}else e=0;a=32624+(e<<2)|0;c[j+(k+28)>>2]=e;c[j+(k+20)>>2]=0;c[j+(k+16)>>2]=0;b=c[8081]|0;d=1<<e;if(!(b&d)){c[8081]=b|d;c[a>>2]=h;c[j+(k+24)>>2]=a;c[j+(k+12)>>2]=h;c[j+(k+8)>>2]=h;break}a=c[a>>2]|0;c:do if((c[a+4>>2]&-8|0)!=(i|0)){e=i<<((e|0)==31?0:25-(e>>>1)|0);while(1){d=a+16+(e>>>31<<2)|0;b=c[d>>2]|0;if(!b)break;if((c[b+4>>2]&-8|0)==(i|0)){s=b;break c}else{e=e<<1;a=b}}if(d>>>0<(c[8084]|0)>>>0)fa();else{c[d>>2]=h;c[j+(k+24)>>2]=a;c[j+(k+12)>>2]=h;c[j+(k+8)>>2]=h;break b}}else s=a;while(0);a=s+8|0;b=c[a>>2]|0;F=c[8084]|0;if(b>>>0>=F>>>0&s>>>0>=F>>>0){c[b+12>>2]=h;c[a>>2]=h;c[j+(k+8)>>2]=b;c[j+(k+12)>>2]=s;c[j+(k+24)>>2]=0;break}else fa()}else{F=i+k|0;c[j+4>>2]=F|3;F=j+(F+4)|0;c[F>>2]=c[F>>2]|1}while(0);F=j+8|0;return F|0}else i=k}else i=k}else i=-1;while(0);d=c[8082]|0;if(d>>>0>=i>>>0){a=d-i|0;b=c[8085]|0;if(a>>>0>15){c[8085]=b+i;c[8082]=a;c[b+(i+4)>>2]=a|1;c[b+d>>2]=a;c[b+4>>2]=i|3}else{c[8082]=0;c[8085]=0;c[b+4>>2]=d|3;c[b+(d+4)>>2]=c[b+(d+4)>>2]|1}F=b+8|0;return F|0}a=c[8083]|0;if(a>>>0>i>>>0){E=a-i|0;c[8083]=E;F=c[8086]|0;c[8086]=F+i;c[F+(i+4)>>2]=E|1;c[F+4>>2]=i|3;F=F+8|0;return F|0}do if(!(c[8198]|0)){a=ha(30)|0;if(!(a+-1&a)){c[8200]=a;c[8199]=a;c[8201]=-1;c[8202]=-1;c[8203]=0;c[8191]=0;c[8198]=(ja(0)|0)&-16^1431655768;break}else fa()}while(0);f=i+48|0;e=c[8200]|0;g=i+47|0;h=e+g&0-e;if(h>>>0<=i>>>0){F=0;return F|0}a=c[8190]|0;if((a|0)!=0?(s=c[8188]|0,(s+h|0)>>>0<=s>>>0|(s+h|0)>>>0>a>>>0):0){F=0;return F|0}d:do if(!(c[8191]&4)){d=c[8086]|0;e:do if(d){a=32768;while(1){b=c[a>>2]|0;if(b>>>0<=d>>>0?(o=a+4|0,(b+(c[o>>2]|0)|0)>>>0>d>>>0):0)break;a=c[a+8>>2]|0;if(!a){w=174;break e}}b=e+g-(c[8083]|0)&0-e;if(b>>>0<2147483647){d=ia(b|0)|0;s=(d|0)==((c[a>>2]|0)+(c[o>>2]|0)|0);a=s?b:0;if(s){if((d|0)!=(-1|0)){q=d;p=a;w=194;break d}}else w=184}else a=0}else w=174;while(0);do if((w|0)==174){e=ia(0)|0;if((e|0)!=(-1|0)){a=c[8199]|0;if(!(a+-1&e))b=h;else b=h-e+(a+-1+e&0-a)|0;a=c[8188]|0;d=a+b|0;if(b>>>0>i>>>0&b>>>0<2147483647){s=c[8190]|0;if((s|0)!=0?d>>>0<=a>>>0|d>>>0>s>>>0:0){a=0;break}d=ia(b|0)|0;a=(d|0)==(e|0)?b:0;if((d|0)==(e|0)){q=e;p=a;w=194;break d}else w=184}else a=0}else a=0}while(0);f:do if((w|0)==184){e=0-b|0;do if(f>>>0>b>>>0&(b>>>0<2147483647&(d|0)!=(-1|0))?(r=c[8200]|0,r=g-b+r&0-r,r>>>0<2147483647):0)if((ia(r|0)|0)==(-1|0)){ia(e|0)|0;break f}else{b=r+b|0;break}while(0);if((d|0)!=(-1|0)){q=d;p=b;w=194;break d}}while(0);c[8191]=c[8191]|4;w=191}else{a=0;w=191}while(0);if((((w|0)==191?h>>>0<2147483647:0)?(t=ia(h|0)|0,u=ia(0)|0,t>>>0<u>>>0&((t|0)!=(-1|0)&(u|0)!=(-1|0))):0)?(v=(u-t|0)>>>0>(i+40|0)>>>0,v):0){q=t;p=v?u-t|0:a;w=194}if((w|0)==194){a=(c[8188]|0)+p|0;c[8188]=a;if(a>>>0>(c[8189]|0)>>>0)c[8189]=a;g=c[8086]|0;g:do if(g){f=32768;while(1){a=c[f>>2]|0;b=f+4|0;d=c[b>>2]|0;if((q|0)==(a+d|0)){w=204;break}e=c[f+8>>2]|0;if(!e)break;else f=e}if(((w|0)==204?(c[f+12>>2]&8|0)==0:0)?g>>>0<q>>>0&g>>>0>=a>>>0:0){c[b>>2]=d+p;F=(c[8083]|0)+p|0;E=(g+8&7|0)==0?0:0-(g+8)&7;c[8086]=g+E;c[8083]=F-E;c[g+(E+4)>>2]=F-E|1;c[g+(F+4)>>2]=40;c[8087]=c[8202];break}a=c[8084]|0;if(q>>>0<a>>>0){c[8084]=q;l=q}else l=a;b=q+p|0;a=32768;while(1){if((c[a>>2]|0)==(b|0)){w=212;break}a=c[a+8>>2]|0;if(!a){a=32768;break}}if((w|0)==212)if(!(c[a+12>>2]&8)){c[a>>2]=q;n=a+4|0;c[n>>2]=(c[n>>2]|0)+p;n=q+8|0;n=(n&7|0)==0?0:0-n&7;j=q+(p+8)|0;j=(j&7|0)==0?0:0-j&7;a=q+(j+p)|0;m=n+i|0;o=q+m|0;k=a-(q+n)-i|0;c[q+(n+4)>>2]=i|3;h:do if((a|0)!=(g|0)){if((a|0)==(c[8085]|0)){F=(c[8082]|0)+k|0;c[8082]=F;c[8085]=o;c[q+(m+4)>>2]=F|1;c[q+(F+m)>>2]=F;break}h=p+4|0;i=c[q+(h+j)>>2]|0;if((i&3|0)==1){i:do if(i>>>0>=256){g=c[q+((j|24)+p)>>2]|0;b=c[q+(p+12+j)>>2]|0;do if((b|0)==(a|0)){d=q+(h+(j|16))|0;b=c[d>>2]|0;if(!b){d=q+((j|16)+p)|0;b=c[d>>2]|0;if(!b){C=0;break}}while(1){e=b+20|0;f=c[e>>2]|0;if(f){b=f;d=e;continue}e=b+16|0;f=c[e>>2]|0;if(!f)break;else{b=f;d=e}}if(d>>>0<l>>>0)fa();else{c[d>>2]=0;C=b;break}}else{d=c[q+((j|8)+p)>>2]|0;if(d>>>0<l>>>0)fa();if((c[d+12>>2]|0)!=(a|0))fa();if((c[b+8>>2]|0)==(a|0)){c[d+12>>2]=b;c[b+8>>2]=d;C=b;break}else fa()}while(0);if(!g)break;b=c[q+(p+28+j)>>2]|0;do if((a|0)!=(c[32624+(b<<2)>>2]|0)){if(g>>>0<(c[8084]|0)>>>0)fa();if((c[g+16>>2]|0)==(a|0))c[g+16>>2]=C;else c[g+20>>2]=C;if(!C)break i}else{c[32624+(b<<2)>>2]=C;if(C)break;c[8081]=c[8081]&~(1<<b);break i}while(0);b=c[8084]|0;if(C>>>0<b>>>0)fa();c[C+24>>2]=g;a=c[q+((j|16)+p)>>2]|0;do if(a)if(a>>>0<b>>>0)fa();else{c[C+16>>2]=a;c[a+24>>2]=C;break}while(0);a=c[q+(h+(j|16))>>2]|0;if(!a)break;if(a>>>0<(c[8084]|0)>>>0)fa();else{c[C+20>>2]=a;c[a+24>>2]=C;break}}else{b=c[q+((j|8)+p)>>2]|0;d=c[q+(p+12+j)>>2]|0;do if((b|0)!=(32360+(i>>>3<<1<<2)|0)){if(b>>>0<l>>>0)fa();if((c[b+12>>2]|0)==(a|0))break;fa()}while(0);if((d|0)==(b|0)){c[8080]=c[8080]&~(1<<(i>>>3));break}do if((d|0)==(32360+(i>>>3<<1<<2)|0))A=d+8|0;else{if(d>>>0<l>>>0)fa();if((c[d+8>>2]|0)==(a|0)){A=d+8|0;break}fa()}while(0);c[b+12>>2]=d;c[A>>2]=b}while(0);a=q+((i&-8|j)+p)|0;f=(i&-8)+k|0}else f=k;b=a+4|0;c[b>>2]=c[b>>2]&-2;c[q+(m+4)>>2]=f|1;c[q+(f+m)>>2]=f;b=f>>>3;if(f>>>0<256){a=c[8080]|0;do if(!(a&1<<b)){c[8080]=a|1<<b;D=32360+((b<<1)+2<<2)|0;E=32360+(b<<1<<2)|0}else{a=c[32360+((b<<1)+2<<2)>>2]|0;if(a>>>0>=(c[8084]|0)>>>0){D=32360+((b<<1)+2<<2)|0;E=a;break}fa()}while(0);c[D>>2]=o;c[E+12>>2]=o;c[q+(m+8)>>2]=E;c[q+(m+12)>>2]=32360+(b<<1<<2);break}a=f>>>8;do if(!a)e=0;else{if(f>>>0>16777215){e=31;break}e=a<<((a+1048320|0)>>>16&8)<<(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4);e=14-(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4|(a+1048320|0)>>>16&8|(e+245760|0)>>>16&2)+(e<<((e+245760|0)>>>16&2)>>>15)|0;e=f>>>(e+7|0)&1|e<<1}while(0);a=32624+(e<<2)|0;c[q+(m+28)>>2]=e;c[q+(m+20)>>2]=0;c[q+(m+16)>>2]=0;b=c[8081]|0;d=1<<e;if(!(b&d)){c[8081]=b|d;c[a>>2]=o;c[q+(m+24)>>2]=a;c[q+(m+12)>>2]=o;c[q+(m+8)>>2]=o;break}a=c[a>>2]|0;j:do if((c[a+4>>2]&-8|0)!=(f|0)){e=f<<((e|0)==31?0:25-(e>>>1)|0);while(1){d=a+16+(e>>>31<<2)|0;b=c[d>>2]|0;if(!b)break;if((c[b+4>>2]&-8|0)==(f|0)){F=b;break j}else{e=e<<1;a=b}}if(d>>>0<(c[8084]|0)>>>0)fa();else{c[d>>2]=o;c[q+(m+24)>>2]=a;c[q+(m+12)>>2]=o;c[q+(m+8)>>2]=o;break h}}else F=a;while(0);a=F+8|0;b=c[a>>2]|0;E=c[8084]|0;if(b>>>0>=E>>>0&F>>>0>=E>>>0){c[b+12>>2]=o;c[a>>2]=o;c[q+(m+8)>>2]=b;c[q+(m+12)>>2]=F;c[q+(m+24)>>2]=0;break}else fa()}else{F=(c[8083]|0)+k|0;c[8083]=F;c[8086]=o;c[q+(m+4)>>2]=F|1}while(0);F=q+(n|8)|0;return F|0}else a=32768;while(1){b=c[a>>2]|0;if(b>>>0<=g>>>0?(x=c[a+4>>2]|0,(b+x|0)>>>0>g>>>0):0)break;a=c[a+8>>2]|0}f=b+(x+-47+((b+(x+-39)&7|0)==0?0:0-(b+(x+-39))&7))|0;f=f>>>0<(g+16|0)>>>0?g:f;F=q+8|0;F=(F&7|0)==0?0:0-F&7;E=p+-40-F|0;c[8086]=q+F;c[8083]=E;c[q+(F+4)>>2]=E|1;c[q+(p+-36)>>2]=40;c[8087]=c[8202];c[f+4>>2]=27;c[f+8>>2]=c[8192];c[f+8+4>>2]=c[8193];c[f+8+8>>2]=c[8194];c[f+8+12>>2]=c[8195];c[8192]=q;c[8193]=p;c[8195]=0;c[8194]=f+8;c[f+28>>2]=7;if((f+32|0)>>>0<(b+x|0)>>>0){a=f+28|0;do{F=a;a=a+4|0;c[a>>2]=7}while((F+8|0)>>>0<(b+x|0)>>>0)}if((f|0)!=(g|0)){c[f+4>>2]=c[f+4>>2]&-2;c[g+4>>2]=f-g|1;c[f>>2]=f-g;if((f-g|0)>>>0<256){a=c[8080]|0;if(a&1<<((f-g|0)>>>3)){a=c[32360+(((f-g|0)>>>3<<1)+2<<2)>>2]|0;if(a>>>0<(c[8084]|0)>>>0)fa();else{y=32360+(((f-g|0)>>>3<<1)+2<<2)|0;z=a}}else{c[8080]=a|1<<((f-g|0)>>>3);y=32360+(((f-g|0)>>>3<<1)+2<<2)|0;z=32360+((f-g|0)>>>3<<1<<2)|0}c[y>>2]=g;c[z+12>>2]=g;c[g+8>>2]=z;c[g+12>>2]=32360+((f-g|0)>>>3<<1<<2);break}if((f-g|0)>>>8)if((f-g|0)>>>0>16777215)e=31;else{e=(f-g|0)>>>8<<((((f-g|0)>>>8)+1048320|0)>>>16&8);e=14-((e+520192|0)>>>16&4|(((f-g|0)>>>8)+1048320|0)>>>16&8|((e<<((e+520192|0)>>>16&4))+245760|0)>>>16&2)+(e<<((e+520192|0)>>>16&4)<<(((e<<((e+520192|0)>>>16&4))+245760|0)>>>16&2)>>>15)|0;e=(f-g|0)>>>(e+7|0)&1|e<<1}else e=0;a=32624+(e<<2)|0;c[g+28>>2]=e;c[g+20>>2]=0;c[g+16>>2]=0;b=c[8081]|0;d=1<<e;if(!(b&d)){c[8081]=b|d;c[a>>2]=g;c[g+24>>2]=a;c[g+12>>2]=g;c[g+8>>2]=g;break}a=c[a>>2]|0;k:do if((c[a+4>>2]&-8|0)!=(f-g|0)){e=f-g<<((e|0)==31?0:25-(e>>>1)|0);while(1){d=a+16+(e>>>31<<2)|0;b=c[d>>2]|0;if(!b)break;if((c[b+4>>2]&-8|0)==(f-g|0)){B=b;break k}else{e=e<<1;a=b}}if(d>>>0<(c[8084]|0)>>>0)fa();else{c[d>>2]=g;c[g+24>>2]=a;c[g+12>>2]=g;c[g+8>>2]=g;break g}}else B=a;while(0);a=B+8|0;b=c[a>>2]|0;F=c[8084]|0;if(b>>>0>=F>>>0&B>>>0>=F>>>0){c[b+12>>2]=g;c[a>>2]=g;c[g+8>>2]=b;c[g+12>>2]=B;c[g+24>>2]=0;break}else fa()}}else{F=c[8084]|0;if((F|0)==0|q>>>0<F>>>0)c[8084]=q;c[8192]=q;c[8193]=p;c[8195]=0;c[8089]=c[8198];c[8088]=-1;a=0;do{F=a<<1;c[32360+(F+3<<2)>>2]=32360+(F<<2);c[32360+(F+2<<2)>>2]=32360+(F<<2);a=a+1|0}while((a|0)!=32);F=q+8|0;F=(F&7|0)==0?0:0-F&7;E=p+-40-F|0;c[8086]=q+F;c[8083]=E;c[q+(F+4)>>2]=E|1;c[q+(p+-36)>>2]=40;c[8087]=c[8202]}while(0);a=c[8083]|0;if(a>>>0>i>>>0){E=a-i|0;c[8083]=E;F=c[8086]|0;c[8086]=F+i;c[F+(i+4)>>2]=E|1;c[F+4>>2]=i|3;F=F+8|0;return F|0}}c[(ce()|0)>>2]=12;F=0;return F|0}function he(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;if(!a)return;i=c[8084]|0;if((a+-8|0)>>>0<i>>>0)fa();p=c[a+-4>>2]|0;if((p&3|0)==1)fa();o=a+((p&-8)+-8)|0;do if(!(p&1)){k=c[a+-8>>2]|0;if(!(p&3))return;l=a+(-8-k)|0;m=k+(p&-8)|0;if(l>>>0<i>>>0)fa();if((l|0)==(c[8085]|0)){b=c[a+((p&-8)+-4)>>2]|0;if((b&3|0)!=3){t=l;g=m;break}c[8082]=m;c[a+((p&-8)+-4)>>2]=b&-2;c[a+(-8-k+4)>>2]=m|1;c[o>>2]=m;return}if(k>>>0<256){b=c[a+(-8-k+8)>>2]|0;d=c[a+(-8-k+12)>>2]|0;if((b|0)!=(32360+(k>>>3<<1<<2)|0)){if(b>>>0<i>>>0)fa();if((c[b+12>>2]|0)!=(l|0))fa()}if((d|0)==(b|0)){c[8080]=c[8080]&~(1<<(k>>>3));t=l;g=m;break}if((d|0)!=(32360+(k>>>3<<1<<2)|0)){if(d>>>0<i>>>0)fa();if((c[d+8>>2]|0)!=(l|0))fa();else e=d+8|0}else e=d+8|0;c[b+12>>2]=d;c[e>>2]=b;t=l;g=m;break}h=c[a+(-8-k+24)>>2]|0;b=c[a+(-8-k+12)>>2]|0;do if((b|0)==(l|0)){b=c[a+(-8-k+20)>>2]|0;if(!b){b=c[a+(-8-k+16)>>2]|0;if(!b){j=0;break}else f=a+(-8-k+16)|0}else f=a+(-8-k+20)|0;while(1){d=b+20|0;e=c[d>>2]|0;if(e){b=e;f=d;continue}d=b+16|0;e=c[d>>2]|0;if(!e)break;else{b=e;f=d}}if(f>>>0<i>>>0)fa();else{c[f>>2]=0;j=b;break}}else{d=c[a+(-8-k+8)>>2]|0;if(d>>>0<i>>>0)fa();if((c[d+12>>2]|0)!=(l|0))fa();if((c[b+8>>2]|0)==(l|0)){c[d+12>>2]=b;c[b+8>>2]=d;j=b;break}else fa()}while(0);if(h){b=c[a+(-8-k+28)>>2]|0;if((l|0)==(c[32624+(b<<2)>>2]|0)){c[32624+(b<<2)>>2]=j;if(!j){c[8081]=c[8081]&~(1<<b);t=l;g=m;break}}else{if(h>>>0<(c[8084]|0)>>>0)fa();if((c[h+16>>2]|0)==(l|0))c[h+16>>2]=j;else c[h+20>>2]=j;if(!j){t=l;g=m;break}}d=c[8084]|0;if(j>>>0<d>>>0)fa();c[j+24>>2]=h;b=c[a+(-8-k+16)>>2]|0;do if(b)if(b>>>0<d>>>0)fa();else{c[j+16>>2]=b;c[b+24>>2]=j;break}while(0);b=c[a+(-8-k+20)>>2]|0;if(b)if(b>>>0<(c[8084]|0)>>>0)fa();else{c[j+20>>2]=b;c[b+24>>2]=j;t=l;g=m;break}else{t=l;g=m}}else{t=l;g=m}}else{t=a+-8|0;g=p&-8}while(0);if(t>>>0>=o>>>0)fa();e=c[a+((p&-8)+-4)>>2]|0;if(!(e&1))fa();if(!(e&2)){if((o|0)==(c[8086]|0)){u=(c[8083]|0)+g|0;c[8083]=u;c[8086]=t;c[t+4>>2]=u|1;if((t|0)!=(c[8085]|0))return;c[8085]=0;c[8082]=0;return}if((o|0)==(c[8085]|0)){u=(c[8082]|0)+g|0;c[8082]=u;c[8085]=t;c[t+4>>2]=u|1;c[t+u>>2]=u;return}g=(e&-8)+g|0;do if(e>>>0>=256){h=c[a+((p&-8)+16)>>2]|0;b=c[a+(p&-8|4)>>2]|0;do if((b|0)==(o|0)){b=c[a+((p&-8)+12)>>2]|0;if(!b){b=c[a+((p&-8)+8)>>2]|0;if(!b){q=0;break}else f=a+((p&-8)+8)|0}else f=a+((p&-8)+12)|0;while(1){d=b+20|0;e=c[d>>2]|0;if(e){b=e;f=d;continue}d=b+16|0;e=c[d>>2]|0;if(!e)break;else{b=e;f=d}}if(f>>>0<(c[8084]|0)>>>0)fa();else{c[f>>2]=0;q=b;break}}else{d=c[a+(p&-8)>>2]|0;if(d>>>0<(c[8084]|0)>>>0)fa();if((c[d+12>>2]|0)!=(o|0))fa();if((c[b+8>>2]|0)==(o|0)){c[d+12>>2]=b;c[b+8>>2]=d;q=b;break}else fa()}while(0);if(h){b=c[a+((p&-8)+20)>>2]|0;if((o|0)==(c[32624+(b<<2)>>2]|0)){c[32624+(b<<2)>>2]=q;if(!q){c[8081]=c[8081]&~(1<<b);break}}else{if(h>>>0<(c[8084]|0)>>>0)fa();if((c[h+16>>2]|0)==(o|0))c[h+16>>2]=q;else c[h+20>>2]=q;if(!q)break}d=c[8084]|0;if(q>>>0<d>>>0)fa();c[q+24>>2]=h;b=c[a+((p&-8)+8)>>2]|0;do if(b)if(b>>>0<d>>>0)fa();else{c[q+16>>2]=b;c[b+24>>2]=q;break}while(0);b=c[a+((p&-8)+12)>>2]|0;if(b)if(b>>>0<(c[8084]|0)>>>0)fa();else{c[q+20>>2]=b;c[b+24>>2]=q;break}}}else{d=c[a+(p&-8)>>2]|0;b=c[a+(p&-8|4)>>2]|0;if((d|0)!=(32360+(e>>>3<<1<<2)|0)){if(d>>>0<(c[8084]|0)>>>0)fa();if((c[d+12>>2]|0)!=(o|0))fa()}if((b|0)==(d|0)){c[8080]=c[8080]&~(1<<(e>>>3));break}if((b|0)!=(32360+(e>>>3<<1<<2)|0)){if(b>>>0<(c[8084]|0)>>>0)fa();if((c[b+8>>2]|0)!=(o|0))fa();else n=b+8|0}else n=b+8|0;c[d+12>>2]=b;c[n>>2]=d}while(0);c[t+4>>2]=g|1;c[t+g>>2]=g;if((t|0)==(c[8085]|0)){c[8082]=g;return}}else{c[a+((p&-8)+-4)>>2]=e&-2;c[t+4>>2]=g|1;c[t+g>>2]=g}d=g>>>3;if(g>>>0<256){b=c[8080]|0;if(b&1<<d){b=c[32360+((d<<1)+2<<2)>>2]|0;if(b>>>0<(c[8084]|0)>>>0)fa();else{r=32360+((d<<1)+2<<2)|0;s=b}}else{c[8080]=b|1<<d;r=32360+((d<<1)+2<<2)|0;s=32360+(d<<1<<2)|0}c[r>>2]=t;c[s+12>>2]=t;c[t+8>>2]=s;c[t+12>>2]=32360+(d<<1<<2);return}b=g>>>8;if(b)if(g>>>0>16777215)f=31;else{f=b<<((b+1048320|0)>>>16&8)<<(((b<<((b+1048320|0)>>>16&8))+520192|0)>>>16&4);f=14-(((b<<((b+1048320|0)>>>16&8))+520192|0)>>>16&4|(b+1048320|0)>>>16&8|(f+245760|0)>>>16&2)+(f<<((f+245760|0)>>>16&2)>>>15)|0;f=g>>>(f+7|0)&1|f<<1}else f=0;b=32624+(f<<2)|0;c[t+28>>2]=f;c[t+20>>2]=0;c[t+16>>2]=0;d=c[8081]|0;e=1<<f;a:do if(d&e){b=c[b>>2]|0;b:do if((c[b+4>>2]&-8|0)!=(g|0)){f=g<<((f|0)==31?0:25-(f>>>1)|0);while(1){e=b+16+(f>>>31<<2)|0;d=c[e>>2]|0;if(!d)break;if((c[d+4>>2]&-8|0)==(g|0)){u=d;break b}else{f=f<<1;b=d}}if(e>>>0<(c[8084]|0)>>>0)fa();else{c[e>>2]=t;c[t+24>>2]=b;c[t+12>>2]=t;c[t+8>>2]=t;break a}}else u=b;while(0);b=u+8|0;d=c[b>>2]|0;s=c[8084]|0;if(d>>>0>=s>>>0&u>>>0>=s>>>0){c[d+12>>2]=t;c[b>>2]=t;c[t+8>>2]=d;c[t+12>>2]=u;c[t+24>>2]=0;break}else fa()}else{c[8081]=d|e;c[b>>2]=t;c[t+24>>2]=b;c[t+12>>2]=t;c[t+8>>2]=t}while(0);u=(c[8088]|0)+-1|0;c[8088]=u;if(!u)b=32776;else return;while(1){b=c[b>>2]|0;if(!b)break;else b=b+8|0}c[8088]=-1;return}function ie(){}function je(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){C=b>>c;return a>>>c|(b&(1<<c)-1)<<32-c}C=(b|0)<0?-1:0;return b>>c-32|0}function ke(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=b-d-(c>>>0>a>>>0|0)>>>0;return (C=d,a-c>>>0|0)|0}function le(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return (C=b+d+(a+c>>>0>>>0<a>>>0|0)>>>0,a+c>>>0|0)|0}function me(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=b+e|0;if((e|0)>=20){d=d&255;g=b&3;h=d|d<<8|d<<16|d<<24;if(g){g=b+4-g|0;while((b|0)<(g|0)){a[b>>0]=d;b=b+1|0}}while((b|0)<(f&~3|0)){c[b>>2]=h;b=b+4|0}}while((b|0)<(f|0)){a[b>>0]=d;b=b+1|0}return b-e|0}function ne(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){C=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}C=0;return b>>>c-32|0}function oe(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){C=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}C=a<<c-32;return 0}function pe(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((e|0)>=4096)return la(b|0,d|0,e|0)|0;f=b|0;if((b&3)==(d&3)){while(b&3){if(!e)return f|0;a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function qe(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;if((c|0)<(b|0)&(b|0)<(c+d|0)){e=b;c=c+d|0;b=b+d|0;while((d|0)>0){b=b-1|0;c=c-1|0;d=d-1|0;a[b>>0]=a[c>>0]|0}b=e}else pe(b,c,d)|0;return b|0}function re(b){b=b|0;var c=0;c=a[m+(b&255)>>0]|0;if((c|0)<8)return c|0;c=a[m+(b>>8&255)>>0]|0;if((c|0)<8)return c+8|0;c=a[m+(b>>16&255)>>0]|0;if((c|0)<8)return c+16|0;return (a[m+(b>>>24)>>0]|0)+24|0}function se(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=_(b&65535,a&65535)|0;e=(c>>>16)+(_(b&65535,a>>>16)|0)|0;d=_(b>>>16,a&65535)|0;return (C=(e>>>16)+(_(b>>>16,a>>>16)|0)+(((e&65535)+d|0)>>>16)|0,e+d<<16|c&65535|0)|0}function te(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;g=b>>31|((b|0)<0?-1:0)<<1;e=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;h=d>>31|((d|0)<0?-1:0)<<1;f=((d|0)<0?-1:0)>>31|((d|0)<0?-1:0)<<1;a=ke(g^a,e^b,g,e)|0;b=C;return ke((ye(a,b,ke(h^c,f^d,h,f)|0,C,0)|0)^(h^g),C^(f^e),h^g,f^e)|0}function ue(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;i=i+16|0;h=b>>31|((b|0)<0?-1:0)<<1;g=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;k=e>>31|((e|0)<0?-1:0)<<1;j=((e|0)<0?-1:0)>>31|((e|0)<0?-1:0)<<1;a=ke(h^a,g^b,h,g)|0;b=C;ye(a,b,ke(k^d,j^e,k,j)|0,C,f|0)|0;e=ke(c[f>>2]^h,c[f+4>>2]^g,h,g)|0;d=C;i=f;return (C=d,e)|0}function ve(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=se(a,c)|0;f=C;return (C=(_(b,c)|0)+(_(d,a)|0)+f|f&0,e|0|0)|0}function we(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return ye(a,b,c,d,0)|0}function xe(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=i;i=i+16|0;ye(a,b,d,e,f|0)|0;i=f;return (C=c[f+4>>2]|0,c[f>>2]|0)|0}function ye(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;if(!b)if(!e){if(f){c[f>>2]=(a>>>0)%(d>>>0);c[f+4>>2]=0}e=0;f=(a>>>0)/(d>>>0)>>>0;return (C=e,f)|0}else{if(!f){e=0;f=0;return (C=e,f)|0}c[f>>2]=a|0;c[f+4>>2]=b&0;e=0;f=0;return (C=e,f)|0}do if(d){if(e){h=(aa(e|0)|0)-(aa(b|0)|0)|0;if(h>>>0<=31){n=h+1|0;i=a>>>((h+1|0)>>>0)&h-31>>31|b<<31-h;m=b>>>((h+1|0)>>>0)&h-31>>31;g=0;h=a<<31-h;break}if(!f){e=0;f=0;return (C=e,f)|0}c[f>>2]=a|0;c[f+4>>2]=b|b&0;e=0;f=0;return (C=e,f)|0}if(d-1&d){h=(aa(d|0)|0)+33-(aa(b|0)|0)|0;n=h;i=32-h-1>>31&b>>>((h-32|0)>>>0)|(b<<32-h|a>>>(h>>>0))&h-32>>31;m=h-32>>31&b>>>(h>>>0);g=a<<64-h&32-h>>31;h=(b<<64-h|a>>>((h-32|0)>>>0))&32-h>>31|a<<32-h&h-33>>31;break}if(f){c[f>>2]=d-1&a;c[f+4>>2]=0}if((d|0)==1){e=b|b&0;f=a|0|0;return (C=e,f)|0}else{f=re(d|0)|0;e=b>>>(f>>>0)|0;f=b<<32-f|a>>>(f>>>0)|0;return (C=e,f)|0}}else{if(!e){if(f){c[f>>2]=(b>>>0)%(d>>>0);c[f+4>>2]=0}e=0;f=(b>>>0)/(d>>>0)>>>0;return (C=e,f)|0}if(!a){if(f){c[f>>2]=0;c[f+4>>2]=(b>>>0)%(e>>>0)}d=0;f=(b>>>0)/(e>>>0)>>>0;return (C=d,f)|0}if(!(e-1&e)){if(f){c[f>>2]=a|0;c[f+4>>2]=e-1&b|b&0}d=0;f=b>>>((re(e|0)|0)>>>0);return (C=d,f)|0}h=(aa(e|0)|0)-(aa(b|0)|0)|0;if(h>>>0<=30){n=h+1|0;i=b<<31-h|a>>>((h+1|0)>>>0);m=b>>>((h+1|0)>>>0);g=0;h=a<<31-h;break}if(!f){e=0;f=0;return (C=e,f)|0}c[f>>2]=a|0;c[f+4>>2]=b|b&0;e=0;f=0;return (C=e,f)|0}while(0);if(!n){j=h;b=m;a=0;h=0}else{k=le(d|0|0,e|e&0|0,-1,-1)|0;l=C;j=h;b=m;a=n;h=0;do{p=j;j=g>>>31|j<<1;g=h|g<<1;p=i<<1|p>>>31|0;o=i>>>31|b<<1|0;ke(k,l,p,o)|0;n=C;m=n>>31|((n|0)<0?-1:0)<<1;h=m&1;i=ke(p,o,m&(d|0),(((n|0)<0?-1:0)>>31|((n|0)<0?-1:0)<<1)&(e|e&0))|0;b=C;a=a-1|0}while((a|0)!=0);a=0}if(f){c[f>>2]=i;c[f+4>>2]=b}o=(g|0)>>>31|j<<1|(0<<1|g>>>31)&0|a;p=(g<<1|0>>>31)&-2|h;return (C=o,p)|0}

// EMSCRIPTEN_END_FUNCS
return{_sodium_library_version_minor:Yd,_sodium_hex2bin:Ud,_bitshift64Lshr:ne,_crypto_box_noncebytes:$a,_crypto_aead_chacha20poly1305_ietf_keybytes:Ga,_crypto_aead_chacha20poly1305_ietf_encrypt_detached:Aa,_crypto_scalarmult_base:Rc,_crypto_aead_chacha20poly1305_abytes:Na,_crypto_auth_bytes:Oa,_crypto_sign_open:nd,_crypto_aead_chacha20poly1305_decrypt_detached:Ca,_memcpy:pe,_crypto_box_seed_keypair:bb,_crypto_box_open_easy_afternm:kb,_crypto_sign_ed25519_sk_to_curve25519:td,_crypto_aead_chacha20poly1305_keybytes:Ka,_crypto_box_seal:mb,_free:he,_crypto_shorthash:ed,_crypto_auth_keybytes:Pa,_crypto_aead_chacha20poly1305_npubbytes:La,_crypto_sign_seedbytes:hd,_crypto_box_detached_afternm:eb,_crypto_auth:Qa,_randombytes_random:Kd,_crypto_sign_keypair:ld,_crypto_shorthash_keybytes:dd,_crypto_generichash_statebytes:hc,_crypto_aead_chacha20poly1305_encrypt_detached:ya,_sodium_library_version_major:Xd,_i64Add:le,_sodium_version_string:Wd,_crypto_generichash_keybytes_max:ec,_crypto_sign_ed25519_pk_to_curve25519:sd,_crypto_sign_publickeybytes:id,_crypto_box_beforenmbytes:_a,_crypto_generichash:ic,_crypto_aead_chacha20poly1305_ietf_nsecbytes:Ia,_randombytes_stir:Ld,_crypto_aead_chacha20poly1305_ietf_encrypt:Ba,_crypto_box_beforenm:db,_crypto_aead_chacha20poly1305_ietf_decrypt:Fa,_randombytes_close:Od,_crypto_shorthash_bytes:cd,_crypto_box_secretkeybytes:Za,_crypto_aead_chacha20poly1305_encrypt:za,_crypto_box_detached:fb,_randombytes_buf:Nd,_sodium_bin2hex:Td,_bitshift64Ashr:je,_crypto_box_open_detached:jb,_crypto_scalarmult_bytes:Tc,_crypto_auth_verify:Ra,_crypto_box_seal_open:nb,_crypto_secretbox_detached:_c,_crypto_secretbox_easy:$c,_memset:me,_crypto_box_open_detached_afternm:ib,_crypto_box_sealbytes:ob,_i64Subtract:ke,_crypto_box_seedbytes:Xa,_crypto_hash:yc,_crypto_box_easy_afternm:gb,_crypto_box_macbytes:ab,_crypto_box_publickeybytes:Ya,_crypto_generichash_primitive:gc,_crypto_sign_secretkeybytes:jd,_crypto_scalarmult_scalarbytes:Uc,_crypto_generichash_keybytes_min:dc,_malloc:ge,_crypto_aead_chacha20poly1305_decrypt:Da,_memmove:qe,_crypto_aead_chacha20poly1305_ietf_decrypt_detached:Ea,_crypto_sign:md,_crypto_secretbox_noncebytes:Yc,_crypto_box_keypair:cb,_crypto_generichash_keybytes:fc,_crypto_generichash_bytes_min:ac,_sodium_init:Qd,_crypto_secretbox_macbytes:Zc,_crypto_secretbox_keybytes:Xc,_randombytes:Pd,_crypto_hash_bytes:xc,_crypto_generichash_bytes:cc,_crypto_generichash_bytes_max:bc,_crypto_secretbox_open_detached:ad,_bitshift64Shl:oe,_crypto_sign_verify_detached:pd,_crypto_box_open_easy:lb,_crypto_generichash_init:jc,_crypto_aead_chacha20poly1305_nsecbytes:Ma,_crypto_sign_bytes:gd,_crypto_generichash_update:kc,_crypto_scalarmult:Sc,_crypto_aead_chacha20poly1305_ietf_abytes:Ja,_crypto_sign_detached:od,_crypto_box_easy:hb,_crypto_secretbox_open_easy:bd,_crypto_generichash_final:lc,_randombytes_uniform:Md,_crypto_sign_seed_keypair:kd,_crypto_aead_chacha20poly1305_ietf_npubbytes:Ha,runPostSets:ie,stackAlloc:pa,stackSave:qa,stackRestore:ra,establishStackSpace:sa,setThrew:ta,setTempRet0:wa,getTempRet0:xa}})


// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg,Module.asmLibraryArg,buffer);var _sodium_library_version_minor=Module["_sodium_library_version_minor"]=asm["_sodium_library_version_minor"];var _bitshift64Lshr=Module["_bitshift64Lshr"]=asm["_bitshift64Lshr"];var _crypto_box_noncebytes=Module["_crypto_box_noncebytes"]=asm["_crypto_box_noncebytes"];var _crypto_aead_chacha20poly1305_ietf_keybytes=Module["_crypto_aead_chacha20poly1305_ietf_keybytes"]=asm["_crypto_aead_chacha20poly1305_ietf_keybytes"];var _crypto_aead_chacha20poly1305_ietf_encrypt_detached=Module["_crypto_aead_chacha20poly1305_ietf_encrypt_detached"]=asm["_crypto_aead_chacha20poly1305_ietf_encrypt_detached"];var _crypto_scalarmult_base=Module["_crypto_scalarmult_base"]=asm["_crypto_scalarmult_base"];var _crypto_aead_chacha20poly1305_abytes=Module["_crypto_aead_chacha20poly1305_abytes"]=asm["_crypto_aead_chacha20poly1305_abytes"];var _crypto_auth_bytes=Module["_crypto_auth_bytes"]=asm["_crypto_auth_bytes"];var _crypto_sign_open=Module["_crypto_sign_open"]=asm["_crypto_sign_open"];var _crypto_aead_chacha20poly1305_decrypt_detached=Module["_crypto_aead_chacha20poly1305_decrypt_detached"]=asm["_crypto_aead_chacha20poly1305_decrypt_detached"];var _memcpy=Module["_memcpy"]=asm["_memcpy"];var _crypto_box_seed_keypair=Module["_crypto_box_seed_keypair"]=asm["_crypto_box_seed_keypair"];var _crypto_box_open_easy_afternm=Module["_crypto_box_open_easy_afternm"]=asm["_crypto_box_open_easy_afternm"];var _crypto_sign_ed25519_sk_to_curve25519=Module["_crypto_sign_ed25519_sk_to_curve25519"]=asm["_crypto_sign_ed25519_sk_to_curve25519"];var _crypto_aead_chacha20poly1305_keybytes=Module["_crypto_aead_chacha20poly1305_keybytes"]=asm["_crypto_aead_chacha20poly1305_keybytes"];var _crypto_box_seal=Module["_crypto_box_seal"]=asm["_crypto_box_seal"];var _free=Module["_free"]=asm["_free"];var runPostSets=Module["runPostSets"]=asm["runPostSets"];var _crypto_shorthash=Module["_crypto_shorthash"]=asm["_crypto_shorthash"];var _crypto_auth_keybytes=Module["_crypto_auth_keybytes"]=asm["_crypto_auth_keybytes"];var _crypto_aead_chacha20poly1305_npubbytes=Module["_crypto_aead_chacha20poly1305_npubbytes"]=asm["_crypto_aead_chacha20poly1305_npubbytes"];var _crypto_sign_seedbytes=Module["_crypto_sign_seedbytes"]=asm["_crypto_sign_seedbytes"];var _crypto_box_detached_afternm=Module["_crypto_box_detached_afternm"]=asm["_crypto_box_detached_afternm"];var _crypto_auth=Module["_crypto_auth"]=asm["_crypto_auth"];var _randombytes_random=Module["_randombytes_random"]=asm["_randombytes_random"];var _crypto_sign_keypair=Module["_crypto_sign_keypair"]=asm["_crypto_sign_keypair"];var _crypto_generichash_keybytes_min=Module["_crypto_generichash_keybytes_min"]=asm["_crypto_generichash_keybytes_min"];var _crypto_generichash_statebytes=Module["_crypto_generichash_statebytes"]=asm["_crypto_generichash_statebytes"];var _crypto_aead_chacha20poly1305_encrypt_detached=Module["_crypto_aead_chacha20poly1305_encrypt_detached"]=asm["_crypto_aead_chacha20poly1305_encrypt_detached"];var _sodium_library_version_major=Module["_sodium_library_version_major"]=asm["_sodium_library_version_major"];var _sodium_version_string=Module["_sodium_version_string"]=asm["_sodium_version_string"];var _crypto_generichash_keybytes_max=Module["_crypto_generichash_keybytes_max"]=asm["_crypto_generichash_keybytes_max"];var _crypto_sign_ed25519_pk_to_curve25519=Module["_crypto_sign_ed25519_pk_to_curve25519"]=asm["_crypto_sign_ed25519_pk_to_curve25519"];var _crypto_aead_chacha20poly1305_nsecbytes=Module["_crypto_aead_chacha20poly1305_nsecbytes"]=asm["_crypto_aead_chacha20poly1305_nsecbytes"];var _crypto_box_beforenmbytes=Module["_crypto_box_beforenmbytes"]=asm["_crypto_box_beforenmbytes"];var _crypto_generichash=Module["_crypto_generichash"]=asm["_crypto_generichash"];var _crypto_aead_chacha20poly1305_ietf_nsecbytes=Module["_crypto_aead_chacha20poly1305_ietf_nsecbytes"]=asm["_crypto_aead_chacha20poly1305_ietf_nsecbytes"];var _randombytes_stir=Module["_randombytes_stir"]=asm["_randombytes_stir"];var _crypto_aead_chacha20poly1305_ietf_encrypt=Module["_crypto_aead_chacha20poly1305_ietf_encrypt"]=asm["_crypto_aead_chacha20poly1305_ietf_encrypt"];var _crypto_box_beforenm=Module["_crypto_box_beforenm"]=asm["_crypto_box_beforenm"];var _crypto_shorthash_keybytes=Module["_crypto_shorthash_keybytes"]=asm["_crypto_shorthash_keybytes"];var _crypto_aead_chacha20poly1305_ietf_decrypt=Module["_crypto_aead_chacha20poly1305_ietf_decrypt"]=asm["_crypto_aead_chacha20poly1305_ietf_decrypt"];var _randombytes_close=Module["_randombytes_close"]=asm["_randombytes_close"];var _crypto_shorthash_bytes=Module["_crypto_shorthash_bytes"]=asm["_crypto_shorthash_bytes"];var _crypto_box_secretkeybytes=Module["_crypto_box_secretkeybytes"]=asm["_crypto_box_secretkeybytes"];var _crypto_aead_chacha20poly1305_encrypt=Module["_crypto_aead_chacha20poly1305_encrypt"]=asm["_crypto_aead_chacha20poly1305_encrypt"];var _crypto_box_detached=Module["_crypto_box_detached"]=asm["_crypto_box_detached"];var _randombytes_buf=Module["_randombytes_buf"]=asm["_randombytes_buf"];var _sodium_bin2hex=Module["_sodium_bin2hex"]=asm["_sodium_bin2hex"];var _bitshift64Ashr=Module["_bitshift64Ashr"]=asm["_bitshift64Ashr"];var _crypto_generichash_init=Module["_crypto_generichash_init"]=asm["_crypto_generichash_init"];var _crypto_box_open_detached=Module["_crypto_box_open_detached"]=asm["_crypto_box_open_detached"];var _crypto_scalarmult_bytes=Module["_crypto_scalarmult_bytes"]=asm["_crypto_scalarmult_bytes"];var _crypto_auth_verify=Module["_crypto_auth_verify"]=asm["_crypto_auth_verify"];var _crypto_sign_detached=Module["_crypto_sign_detached"]=asm["_crypto_sign_detached"];var _crypto_secretbox_detached=Module["_crypto_secretbox_detached"]=asm["_crypto_secretbox_detached"];var _crypto_secretbox_easy=Module["_crypto_secretbox_easy"]=asm["_crypto_secretbox_easy"];var _memset=Module["_memset"]=asm["_memset"];var _crypto_box_open_detached_afternm=Module["_crypto_box_open_detached_afternm"]=asm["_crypto_box_open_detached_afternm"];var _crypto_box_sealbytes=Module["_crypto_box_sealbytes"]=asm["_crypto_box_sealbytes"];var _i64Subtract=Module["_i64Subtract"]=asm["_i64Subtract"];var _crypto_box_seedbytes=Module["_crypto_box_seedbytes"]=asm["_crypto_box_seedbytes"];var _crypto_hash=Module["_crypto_hash"]=asm["_crypto_hash"];var _crypto_box_easy_afternm=Module["_crypto_box_easy_afternm"]=asm["_crypto_box_easy_afternm"];var _crypto_box_macbytes=Module["_crypto_box_macbytes"]=asm["_crypto_box_macbytes"];var _crypto_box_publickeybytes=Module["_crypto_box_publickeybytes"]=asm["_crypto_box_publickeybytes"];var _crypto_generichash_primitive=Module["_crypto_generichash_primitive"]=asm["_crypto_generichash_primitive"];var _crypto_sign_secretkeybytes=Module["_crypto_sign_secretkeybytes"]=asm["_crypto_sign_secretkeybytes"];var _crypto_scalarmult_scalarbytes=Module["_crypto_scalarmult_scalarbytes"]=asm["_crypto_scalarmult_scalarbytes"];var _crypto_generichash_bytes_min=Module["_crypto_generichash_bytes_min"]=asm["_crypto_generichash_bytes_min"];var _malloc=Module["_malloc"]=asm["_malloc"];var _crypto_aead_chacha20poly1305_decrypt=Module["_crypto_aead_chacha20poly1305_decrypt"]=asm["_crypto_aead_chacha20poly1305_decrypt"];var _crypto_secretbox_open_easy=Module["_crypto_secretbox_open_easy"]=asm["_crypto_secretbox_open_easy"];var _crypto_aead_chacha20poly1305_ietf_decrypt_detached=Module["_crypto_aead_chacha20poly1305_ietf_decrypt_detached"]=asm["_crypto_aead_chacha20poly1305_ietf_decrypt_detached"];var _crypto_sign=Module["_crypto_sign"]=asm["_crypto_sign"];var _crypto_secretbox_noncebytes=Module["_crypto_secretbox_noncebytes"]=asm["_crypto_secretbox_noncebytes"];var _crypto_box_keypair=Module["_crypto_box_keypair"]=asm["_crypto_box_keypair"];var _crypto_generichash_keybytes=Module["_crypto_generichash_keybytes"]=asm["_crypto_generichash_keybytes"];var _sodium_hex2bin=Module["_sodium_hex2bin"]=asm["_sodium_hex2bin"];var _sodium_init=Module["_sodium_init"]=asm["_sodium_init"];var _crypto_secretbox_macbytes=Module["_crypto_secretbox_macbytes"]=asm["_crypto_secretbox_macbytes"];var _crypto_secretbox_keybytes=Module["_crypto_secretbox_keybytes"]=asm["_crypto_secretbox_keybytes"];var _randombytes=Module["_randombytes"]=asm["_randombytes"];var _crypto_hash_bytes=Module["_crypto_hash_bytes"]=asm["_crypto_hash_bytes"];var _crypto_generichash_bytes=Module["_crypto_generichash_bytes"]=asm["_crypto_generichash_bytes"];var _crypto_generichash_bytes_max=Module["_crypto_generichash_bytes_max"]=asm["_crypto_generichash_bytes_max"];var _crypto_secretbox_open_detached=Module["_crypto_secretbox_open_detached"]=asm["_crypto_secretbox_open_detached"];var _bitshift64Shl=Module["_bitshift64Shl"]=asm["_bitshift64Shl"];var _crypto_sign_verify_detached=Module["_crypto_sign_verify_detached"]=asm["_crypto_sign_verify_detached"];var _crypto_box_open_easy=Module["_crypto_box_open_easy"]=asm["_crypto_box_open_easy"];var _crypto_sign_publickeybytes=Module["_crypto_sign_publickeybytes"]=asm["_crypto_sign_publickeybytes"];var _i64Add=Module["_i64Add"]=asm["_i64Add"];var _crypto_sign_bytes=Module["_crypto_sign_bytes"]=asm["_crypto_sign_bytes"];var _crypto_generichash_update=Module["_crypto_generichash_update"]=asm["_crypto_generichash_update"];var _crypto_scalarmult=Module["_crypto_scalarmult"]=asm["_crypto_scalarmult"];var _crypto_aead_chacha20poly1305_ietf_abytes=Module["_crypto_aead_chacha20poly1305_ietf_abytes"]=asm["_crypto_aead_chacha20poly1305_ietf_abytes"];var _crypto_box_seal_open=Module["_crypto_box_seal_open"]=asm["_crypto_box_seal_open"];var _crypto_box_easy=Module["_crypto_box_easy"]=asm["_crypto_box_easy"];var _memmove=Module["_memmove"]=asm["_memmove"];var _crypto_generichash_final=Module["_crypto_generichash_final"]=asm["_crypto_generichash_final"];var _randombytes_uniform=Module["_randombytes_uniform"]=asm["_randombytes_uniform"];var _crypto_sign_seed_keypair=Module["_crypto_sign_seed_keypair"]=asm["_crypto_sign_seed_keypair"];var _crypto_aead_chacha20poly1305_ietf_npubbytes=Module["_crypto_aead_chacha20poly1305_ietf_npubbytes"]=asm["_crypto_aead_chacha20poly1305_ietf_npubbytes"];Runtime.stackAlloc=asm["stackAlloc"];Runtime.stackSave=asm["stackSave"];Runtime.stackRestore=asm["stackRestore"];Runtime.establishStackSpace=asm["establishStackSpace"];Runtime.setTempRet0=asm["setTempRet0"];Runtime.getTempRet0=asm["getTempRet0"];function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;var initialStackTop;var preloadStartTime=null;var calledMain=false;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller};Module["callMain"]=Module.callMain=function callMain(args){assert(runDependencies==0,"cannot call main when async dependencies remain! (listen on __ATMAIN__)");assert(__ATPRERUN__.length==0,"cannot call main when preRun functions remain to be called");args=args||[];ensureInitRuntime();var argc=args.length+1;function pad(){for(var i=0;i<4-1;i++){argv.push(0)}}var argv=[allocate(intArrayFromString(Module["thisProgram"]),"i8",ALLOC_NORMAL)];pad();for(var i=0;i<argc-1;i=i+1){argv.push(allocate(intArrayFromString(args[i]),"i8",ALLOC_NORMAL));pad()}argv.push(0);argv=allocate(argv,"i32",ALLOC_NORMAL);try{var ret=Module["_main"](argc,argv,0);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="SimulateInfiniteLoop"){Module["noExitRuntime"]=true;return}else{if(e&&typeof e==="object"&&e.stack)Module.printErr("exception thrown: "+[e,e.stack]);throw e}}finally{calledMain=true}};function run(args){args=args||Module["arguments"];if(preloadStartTime===null)preloadStartTime=Date.now();if(runDependencies>0){return}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(Module["_main"]&&shouldRunNow)Module["callMain"](args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout((function(){setTimeout((function(){Module["setStatus"]("")}),1);doRun()}),1)}else{doRun()}}Module["run"]=Module.run=run;function exit(status,implicit){if(implicit&&Module["noExitRuntime"]){return}if(Module["noExitRuntime"]){}else{ABORT=true;EXITSTATUS=status;STACKTOP=initialStackTop;exitRuntime();if(Module["onExit"])Module["onExit"](status)}if(ENVIRONMENT_IS_NODE){process["stdout"]["once"]("drain",(function(){process["exit"](status)}));console.log(" ");setTimeout((function(){process["exit"](status)}),500)}else if(ENVIRONMENT_IS_SHELL&&typeof quit==="function"){quit(status)}throw new ExitStatus(status)}Module["exit"]=Module.exit=exit;var abortDecorators=[];function abort(what){if(what!==undefined){Module.print(what);Module.printErr(what);what=JSON.stringify(what)}else{what=""}ABORT=true;EXITSTATUS=1;var extra="\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";var output="abort("+what+") at "+stackTrace()+extra;if(abortDecorators){abortDecorators.forEach((function(decorator){output=decorator(output,what)}))}throw output}Module["abort"]=Module.abort=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"]){shouldRunNow=false}run()




    ENVIRONMENT_IS_NODE && !process.removeAllListeners("uncaughtException");
    return Module;
});
(function (root, factory) {
    if (typeof process === "object" && typeof process.stdout === "undefined") {
        process.stderr = process.stdout = { write: function() { } };
    }
    if (typeof define === "function" && define.amd) {
        define(["exports", "libsodium"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("libsodium"));
    } else {
        var cb = root.sodium && root.sodium.onload;
        factory((root.sodium = {}), root.libsodium);
        if (typeof cb === "function") {
            cb(root.sodium);
        }
    }
}(this, function (exports, libsodium) {
    "use strict";

    var output_format = "uint8array";

    libsodium._sodium_init();

    // List of functions and constants defined in the wrapped libsodium
    function symbols() {
        return Object.keys(exports).sort();
    }

    function increment(bytes) {
        if (! bytes instanceof Uint8Array) {
            throw new TypeError("Only Uint8Array instances can be incremented");
        }
        var c = 1 << 8;
        for (var i = 0 | 0, j = bytes.length; i < j; i++) {
            c >>= 8;
            c += bytes[i];
            bytes[i] = c & 0xff;
        }
    }

    function add(a, b) {
        if (! a instanceof Uint8Array || ! b instanceof Uint8Array) {
            throw new TypeError("Only Uint8Array instances can added");
        }
        var j = a.length, c = 0 | 0, i = 0 | 0;
        if (b.length != a.length) {
            throw new TypeError("Arguments must have the same length");
        }
        for (i = 0; i < j; i++) {
            c >>= 8;
            c += (a[i] + b[j]);
            a[i] = c & 0xff;
        }
    }

    function is_zero(bytes) {
        if (! bytes instanceof Uint8Array) {
            throw new TypeError("Only Uint8Array instances can be checked");
        }
        var d = 0 | 0;
        for (var i = 0 | 0, j = bytes.length; i < j; i++) {
            d |= bytes[i];
        }
        return d === 0;
    }

    function memzero(bytes) {
        if (! bytes instanceof Uint8Array) {
            throw new TypeError("Only Uint8Array instances can be wiped");
        }
        for (var i = 0 | 0, j = bytes.length; i < j; i++) {
            bytes[i] = 0;
        }
    }

    function memcmp(b1, b2) {
        if (!(b1 instanceof Uint8Array && b2 instanceof Uint8Array)) {
            throw new TypeError("Only Uint8Array instances can be compared");
        }
        if (b1.length !== b2.length) {
            throw new TypeError("Only instances of identical length can be compared");
        }
        for (var d = 0 | 0, i = 0 | 0, j = b1.length; i < j; i++) {
            d |= b1[i] ^ b2[i];
        }
        return d === 0;
    }

    function compare(b1, b2) {
        if (!(b1 instanceof Uint8Array && b2 instanceof Uint8Array)) {
            throw new TypeError("Only Uint8Array instances can be compared");
        }
        if (b1.length !== b2.length) {
            throw new TypeError("Only instances of identical length can be compared");
        }
        for (var gt = 0 | 0, eq = 1 | 1, i = b1.length; i-- > 0;) {
            gt |= ((b2[i] - b1[i]) >> 8) & eq;
            eq &= ((b2[i] ^ b1[i]) - 1) >> 8;
        }
        return (gt + gt + eq) - 1;
    }

    //---------------------------------------------------------------------------
    // Codecs
    //
    function from_string(str) {
        if (typeof TextEncoder === "function") {
            return new TextEncoder("utf-8").encode(str);
        }
        str = unescape(encodeURIComponent(str));
        var bytes = new Uint8Array(str.length);
        for (var i = 0; i < str.length; i++) {
            bytes[i] = str.charCodeAt(i);
        }
        return bytes;
    }

    function to_string(bytes) {
        if (typeof TextDecoder === "function") {
            return new TextDecoder("utf-8", {fatal: true}).decode(bytes);
        }

        var toStringChunkSize = 8192,
            numChunks = Math.ceil(bytes.length / toStringChunkSize);
        if (numChunks <= 1) {
            try {
                return decodeURIComponent(escape(String.fromCharCode.apply(null, bytes)));
            }
            catch (_) {
                throw new TypeError("The encoded data was not valid.");
            }
        }
        var totalString = '';
        var sequenceReadOffset = 0;
        for (var i = 0; i < numChunks; i++) {
            var currentChunk =
                Array.prototype.slice.call(bytes,
                                           i * toStringChunkSize + sequenceReadOffset,
                                           (i + 1) * toStringChunkSize + sequenceReadOffset);
            //Depending on how much we have shifted
            if (currentChunk.length == 0) {
                continue;
            }

            //Checking that we didn't cut the buffer in the middle of a UTF8 sequence.
            //If we did, remove the bytes of the "cut" sequence and
            //decrement sequenceReadOffset for each removed byte
            var sequenceDetectionComplete,
                sequenceIndex = currentChunk.length,
                sequenceLength = 0;

            //This loop will read the chunk from its end, looking for sequence start bytes
            do {
                sequenceIndex--;
                var currentByte = currentChunk[sequenceIndex];

                if (currentByte >= 240) { //Beginning of a 4-byte UTF-8 sequence
                    sequenceLength = 4;
                    sequenceDetectionComplete = true;
                } else if (currentByte >= 224) { //Beginning of a 3-byte UTF-8 sequence
                    sequenceLength = 3;
                    sequenceDetectionComplete = true;
                } else if (currentByte >= 192) { //Beginning of a 2-byte UTF-8 sequence
                    sequenceLength = 2;
                    sequenceDetectionComplete = true;
                } else if (currentByte < 128) { //A one byte UTF-8 char
                    sequenceLength = 1;
                    sequenceDetectionComplete = true;
                }
                //The values between [128, 192[ are part of a UTF-8 sequence.
                //The loop will not exit in that case, and will iterate one byte backwards instead
            } while (!sequenceDetectionComplete);

            var extraBytes = sequenceLength - (currentChunk.length - sequenceIndex);
            for (var j = 0; j < extraBytes; j++) {
                sequenceReadOffset--;
                currentChunk.pop();
            }

            totalString += to_string(currentChunk);
        }
        return totalString;
    }

    /* not constant-time */
    function from_hex(str) {
        if (!is_hex(str)) {
            throw new TypeError("The provided string doesn't look like hex data");
        }
        var result = new Uint8Array(str.length / 2);
        for (var i = 0; i < str.length; i += 2) {
            result[i >>> 1] = parseInt(str.substr(i, 2), 16);
        }
        return result;
    }

    function to_hex(bytes) {
        var str = "", b, c, x;
        for (var i = 0; i < bytes.length; i++) {
            c = bytes[i] & 0xf;
            b = bytes[i] >>> 4;
            x = (87 + c + (((c - 10) >> 8) & ~38)) << 8 |
                (87 + b + (((b - 10) >> 8) & ~38));
            str += String.fromCharCode(x & 0xff) + String.fromCharCode(x >>> 8);
        }
        return str;
    }

    function is_hex(str) {
        return (typeof str === "string" && /^[0-9a-f]+$/i.test(str) && str.length % 2 === 0);
    }

    function from_base64(sBase64, nBlocksSize) {
        function _b64ToUint6(nChr) {
            return nChr > 64 && nChr < 91 ?
                nChr - 65 : nChr > 96 && nChr < 123 ?
                nChr - 71 : nChr > 47 && nChr < 58 ?
                nChr + 4 : nChr === 43 ?
                62 : nChr === 47 ?
                63 :
                0;
        }

        var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""),
            nInLen = sB64Enc.length,
            nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2,
            taBytes = new Uint8Array(nOutLen);

        for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
            nMod4 = nInIdx & 3;
            nUint24 |= _b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
            if (nMod4 === 3 || nInLen - nInIdx === 1) {
                for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                    taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
                }
                nUint24 = 0;
            }
        }
        return taBytes;
    }

    function to_base64(aBytes, noNewLine) {
        if (typeof noNewLine === "undefined") {
            noNewLine = true;
        }
        function _uint6ToB64(nUint6) {
            return nUint6 < 26 ?
                nUint6 + 65 : nUint6 < 52 ?
                nUint6 + 71 : nUint6 < 62 ?
                nUint6 - 4 : nUint6 === 62 ?
                43 : nUint6 === 63 ?
                47 :
                65;
        }
        if (typeof aBytes === "string") {
            throw new Error("input has to be an array");
        }
        var nMod3 = 2,
            sB64Enc = "";
        for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
            nMod3 = nIdx % 3;
            if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0 && !noNewLine) {
                sB64Enc += "\r\n";
            }
            nUint24 |= aBytes[nIdx] << (16 >>> nMod3 & 24);
            if (nMod3 === 2 || aBytes.length - nIdx === 1) {
                sB64Enc += String.fromCharCode(_uint6ToB64(nUint24 >>> 18 & 63),
                                               _uint6ToB64(nUint24 >>> 12 & 63),
                                               _uint6ToB64(nUint24 >>> 6 & 63),
                                               _uint6ToB64(nUint24 & 63));
                nUint24 = 0;
            }
        }
        return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) +
            (nMod3 === 2 ? "" : nMod3 === 1 ? "=" : "==");
    }

    function output_formats() {
        return ["uint8array", "text", "hex", "base64"];
    }

    function _format_output(output, optionalOutputFormat) {
        var selectedOutputFormat = optionalOutputFormat || output_format;
        if (!_is_output_format(selectedOutputFormat)) {
            throw new Error(selectedOutputFormat + " output format is not available");
        }
        if (output instanceof AllocatedBuf) {
            if (selectedOutputFormat === "uint8array") {
                return output.to_Uint8Array();
            } else if (selectedOutputFormat === "text") {
                return to_string(output.to_Uint8Array());
            } else if (selectedOutputFormat === "hex") {
                return to_hex(output.to_Uint8Array());
            } else if (selectedOutputFormat === "base64") {
                return to_base64(output.to_Uint8Array());
            } else {
                throw new Error("What is output format \"" + selectedOutputFormat + "\"?");
            }
        } else if (typeof output === "object") { //Composed output. Example : key pairs
            var props = Object.keys(output);
            var formattedOutput = {};
            for (var i = 0; i < props.length; i++) {
                formattedOutput[props[i]] = _format_output(output[props[i]], selectedOutputFormat);
            }
            return formattedOutput;
        } else if (typeof output === "string") {
            return output;
        } else {
            throw new TypeError("Cannot format output");
        }
    }

    function _is_output_format(format) {
        var formats = output_formats();
        for (var i = 0; i < formats.length; i++) {
            if (formats[i] === format) {
                return true;
            }
        }
        return false;
    }

    function _check_output_format(format) {
        if (!format) {
            return;
        } else if (typeof format !== "string") {
            throw new TypeError("When defined, the output format must be a string");
        } else if (!_is_output_format(format)) {
            throw new Error(format + " is not a supported output format");
        }
    }

    //---------------------------------------------------------------------------
    // Memory management
    //
    // AllocatedBuf: address allocated using _malloc() + length
    function AllocatedBuf(length) {
        this.length = length;
        this.address = _malloc(length);
    }

    // Copy the content of a AllocatedBuf (_malloc()'d memory) into a Uint8Array
    AllocatedBuf.prototype.to_Uint8Array = function () {
        var result = new Uint8Array(this.length);
        result.set(libsodium.HEAPU8.subarray(this.address, this.address + this.length));
        return result;
    };

    // _malloc() a region and initialize it with the content of a Uint8Array
    function _to_allocated_buf_address(bytes) {
        var address = _malloc(bytes.length);
        libsodium.HEAPU8.set(bytes, address);
        return address;
    }

    function _malloc(length) {
        var result = libsodium._malloc(length);
        if (result === 0) {
            throw {
                message: "_malloc() failed",
                length: length
            };
        }
        return result;
    }

    function _free(address) {
        libsodium._free(address);
    }

    function _free_all(addresses) {
        for (var i = 0; i < addresses.length; i++) {
            _free(addresses[i]);
        }
    }

    function _free_and_throw_error(address_pool, err) {
        _free_all(address_pool);
        throw new Error(err);
    }

    function _free_and_throw_type_error(address_pool, err) {
        _free_all(address_pool);
        throw new TypeError(err);
    }

    function _require_defined(address_pool, varValue, varName) {
        if (varValue == undefined) {
            _free_and_throw_type_error(address_pool, varName + " cannot be null or undefined");
        }
    }

    function _any_to_Uint8Array(address_pool, varValue, varName) {
        _require_defined(address_pool, varValue, varName);
        if (varValue instanceof Uint8Array) {
            return varValue;
        } else if (typeof varValue === "string") {
            return from_string(varValue);
        }
        _free_and_throw_type_error(address_pool, "unsupported input type for " + varName);
    }

    
	function crypto_aead_chacha20poly1305_decrypt(secret_nonce, ciphertext, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length - libsodium._crypto_aead_chacha20poly1305_abytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_decrypt(message_address, null, secret_nonce_address, ciphertext_address, ciphertext_length, 0, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_decrypt_detached(secret_nonce, ciphertext, mac, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_decrypt_detached(message_address, secret_nonce_address, ciphertext_address, ciphertext_length, 0, mac_address, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_encrypt(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_aead_chacha20poly1305_abytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_encrypt(ciphertext_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_encrypt_detached(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_aead_chacha20poly1305_abytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_encrypt_detached(ciphertext_address, mac_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_decrypt(secret_nonce, ciphertext, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length - libsodium._crypto_aead_chacha20poly1305_ietf_abytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_ietf_decrypt(message_address, null, secret_nonce_address, ciphertext_address, ciphertext_length, 0, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_decrypt_detached(secret_nonce, ciphertext, mac, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_ietf_decrypt_detached(message_address, secret_nonce_address, ciphertext_address, ciphertext_length, 0, mac_address, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_encrypt(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_aead_chacha20poly1305_ietf_abytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_ietf_encrypt(ciphertext_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_encrypt_detached(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_aead_chacha20poly1305_ietf_abytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_ietf_encrypt_detached(ciphertext_address, mac_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_auth(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output tag (buf)
		
		var tag_length = (libsodium._crypto_auth_bytes()) | 0,
		    tag = new AllocatedBuf(tag_length),
		    tag_address = tag.address;
		
		address_pool.push(tag_address);
		
		if ((libsodium._crypto_auth(tag_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(tag, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_auth_hmacsha256(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_hmacsha256_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_auth_hmacsha256_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_auth_hmacsha256(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_auth_hmacsha256_verify(tag, message, key) {
		var address_pool = [];

		// ---------- input: tag (buf)
		
		tag = _any_to_Uint8Array(address_pool, tag, "tag");
		var tag_address, tag_length = (libsodium._crypto_auth_hmacsha256_bytes()) | 0;
		if (tag.length !== tag_length) {
		        _free_and_throw_type_error(address_pool, "invalid tag length");
		}
		tag_address = _to_allocated_buf_address(tag);
		address_pool.push(tag_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_hmacsha256_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		var result = libsodium._crypto_auth_hmacsha256_verify(tag_address, message_address, message_length, 0, key_address) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_auth_hmacsha512(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_hmacsha512_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_auth_hmacsha512_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_auth_hmacsha512(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_auth_hmacsha512_verify(tag, message, key) {
		var address_pool = [];

		// ---------- input: tag (buf)
		
		tag = _any_to_Uint8Array(address_pool, tag, "tag");
		var tag_address, tag_length = (libsodium._crypto_auth_hmacsha512_bytes()) | 0;
		if (tag.length !== tag_length) {
		        _free_and_throw_type_error(address_pool, "invalid tag length");
		}
		tag_address = _to_allocated_buf_address(tag);
		address_pool.push(tag_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_hmacsha512_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		var result = libsodium._crypto_auth_hmacsha512_verify(tag_address, message_address, message_length, 0, key_address) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_auth_verify(tag, message, key) {
		var address_pool = [];

		// ---------- input: tag (buf)
		
		tag = _any_to_Uint8Array(address_pool, tag, "tag");
		var tag_address, tag_length = (libsodium._crypto_auth_bytes()) | 0;
		if (tag.length !== tag_length) {
		        _free_and_throw_type_error(address_pool, "invalid tag length");
		}
		tag_address = _to_allocated_buf_address(tag);
		address_pool.push(tag_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		var result = libsodium._crypto_auth_verify(tag_address, message_address, message_length, 0, key_address) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_box_beforenm(publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output sharedKey (buf)
		
		var sharedKey_length = (libsodium._crypto_box_beforenmbytes()) | 0,
		    sharedKey = new AllocatedBuf(sharedKey_length),
		    sharedKey_address = sharedKey.address;
		
		address_pool.push(sharedKey_address);
		
		if ((libsodium._crypto_box_beforenm(sharedKey_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(sharedKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_detached(message, nonce, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_box_macbytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_box_detached(ciphertext_address, mac_address, message_address, message_length, 0, nonce_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_easy(message, nonce, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_box_macbytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_box_easy(ciphertext_address, message_address, message_length, 0, nonce_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_easy_afternm(message, nonce, sharedKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: sharedKey (buf)
		
		sharedKey = _any_to_Uint8Array(address_pool, sharedKey, "sharedKey");
		var sharedKey_address, sharedKey_length = (libsodium._crypto_box_beforenmbytes()) | 0;
		if (sharedKey.length !== sharedKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid sharedKey length");
		}
		sharedKey_address = _to_allocated_buf_address(sharedKey);
		address_pool.push(sharedKey_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_box_macbytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_box_easy_afternm(ciphertext_address, message_address, message_length, 0, nonce_address, sharedKey_address) | 0) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_keypair(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output secretKey (buf)
		
		var secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0,
		    secretKey = new AllocatedBuf(secretKey_length),
		    secretKey_address = secretKey.address;
		
		address_pool.push(secretKey_address);
		
		if ((libsodium._crypto_box_keypair(publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: secretKey, keyType: "curve25519"}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_open_detached(ciphertext, mac, nonce, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output plaintext (buf)
		
		var plaintext_length = (ciphertext_length) | 0,
		    plaintext = new AllocatedBuf(plaintext_length),
		    plaintext_address = plaintext.address;
		
		address_pool.push(plaintext_address);
		
		if ((libsodium._crypto_box_open_detached(plaintext_address, ciphertext_address, mac_address, ciphertext_length, 0, nonce_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(plaintext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_open_easy(ciphertext, nonce, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output plaintext (buf)
		
		var plaintext_length = (ciphertext_length - libsodium._crypto_box_macbytes()) | 0,
		    plaintext = new AllocatedBuf(plaintext_length),
		    plaintext_address = plaintext.address;
		
		address_pool.push(plaintext_address);
		
		if ((libsodium._crypto_box_open_easy(plaintext_address, ciphertext_address, ciphertext_length, 0, nonce_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(plaintext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_open_easy_afternm(ciphertext, nonce, sharedKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: sharedKey (buf)
		
		sharedKey = _any_to_Uint8Array(address_pool, sharedKey, "sharedKey");
		var sharedKey_address, sharedKey_length = (libsodium._crypto_box_beforenmbytes()) | 0;
		if (sharedKey.length !== sharedKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid sharedKey length");
		}
		sharedKey_address = _to_allocated_buf_address(sharedKey);
		address_pool.push(sharedKey_address);
		
		// ---------- output plaintext (buf)
		
		var plaintext_length = (ciphertext_length - libsodium._crypto_box_macbytes()) | 0,
		    plaintext = new AllocatedBuf(plaintext_length),
		    plaintext_address = plaintext.address;
		
		address_pool.push(plaintext_address);
		
		if ((libsodium._crypto_box_open_easy_afternm(plaintext_address, ciphertext_address, ciphertext_length, 0, nonce_address, sharedKey_address) | 0) === 0) {
			var ret = _format_output(plaintext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_seal(message, publicKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_box_sealbytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_box_seal(ciphertext_address, message_address, message_length, 0, publicKey_address) | 0) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_seal_open(ciphertext, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output plaintext (buf)
		
		var plaintext_length = (ciphertext_length - libsodium._crypto_box_sealbytes()) | 0,
		    plaintext = new AllocatedBuf(plaintext_length),
		    plaintext_address = plaintext.address;
		
		address_pool.push(plaintext_address);
		
		if ((libsodium._crypto_box_seal_open(plaintext_address, ciphertext_address, ciphertext_length, 0, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(plaintext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_seed_keypair(seed, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: seed (buf)
		
		seed = _any_to_Uint8Array(address_pool, seed, "seed");
		var seed_address, seed_length = (libsodium._crypto_box_seedbytes()) | 0;
		if (seed.length !== seed_length) {
		        _free_and_throw_type_error(address_pool, "invalid seed length");
		}
		seed_address = _to_allocated_buf_address(seed);
		address_pool.push(seed_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output privateKey (buf)
		
		var privateKey_length = (libsodium._crypto_box_secretkeybytes()) | 0,
		    privateKey = new AllocatedBuf(privateKey_length),
		    privateKey_address = privateKey.address;
		
		address_pool.push(privateKey_address);
		
		if ((libsodium._crypto_box_seed_keypair(publicKey_address, privateKey_address, seed_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: privateKey}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_generichash(hash_length, message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: hash_length (uint)
		
		_require_defined(address_pool, hash_length, "hash_length");
		
		if (!(typeof hash_length === "number" && (hash_length | 0) === hash_length) && (hash_length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "hash_length must be an unsigned integer");
		}
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (unsized_buf_optional)
		
		var key_address = null, key_length = 0;
		if (key != undefined) {
		        key = _any_to_Uint8Array(address_pool, key, "key");
		        key_address = _to_allocated_buf_address(key);
		        key_length = key.length;
		        address_pool.push(key_address);
		}
		
		// ---------- output hash (buf)
		
		var hash_length = (hash_length) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_generichash(hash_address, hash_length, message_address, message_length, 0, key_address, key_length) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_generichash_final(state_address, hash_length, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (generichash_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- input: hash_length (uint)
		
		_require_defined(address_pool, hash_length, "hash_length");
		
		if (!(typeof hash_length === "number" && (hash_length | 0) === hash_length) && (hash_length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "hash_length must be an unsigned integer");
		}
		
		// ---------- output hash (buf)
		
		var hash_length = (hash_length) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_generichash_final(state_address, hash_address, hash_length) | 0) === 0) {
			var ret = (libsodium._free(state_address), _format_output(hash, outputFormat));
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_generichash_init(key, hash_length, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: key (unsized_buf_optional)
		
		var key_address = null, key_length = 0;
		if (key != undefined) {
		        key = _any_to_Uint8Array(address_pool, key, "key");
		        key_address = _to_allocated_buf_address(key);
		        key_length = key.length;
		        address_pool.push(key_address);
		}
		
		// ---------- input: hash_length (uint)
		
		_require_defined(address_pool, hash_length, "hash_length");
		
		if (!(typeof hash_length === "number" && (hash_length | 0) === hash_length) && (hash_length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "hash_length must be an unsigned integer");
		}
		
		// ---------- output state (generichash_state)
		
		var state_address = new AllocatedBuf(357).address;
		
		if ((libsodium._crypto_generichash_init(state_address, key_address, key_length, hash_length) | 0) === 0) {
			var ret = state_address;
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_generichash_update(state_address, message_chunk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (generichash_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- input: message_chunk (unsized_buf)
		
		message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
		var message_chunk_address = _to_allocated_buf_address(message_chunk),
		    message_chunk_length = message_chunk.length;
		address_pool.push(message_chunk_address);
		
		if ((libsodium._crypto_generichash_update(state_address, message_chunk_address, message_chunk_length) | 0) === 0) {
			_free_all(address_pool);
			return;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_hash(message, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_hash_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_hash(hash_address, message_address, message_length, 0) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_hash_sha256(message, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_hash_sha256_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_hash_sha256(hash_address, message_address, message_length, 0) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_hash_sha512(message, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_hash_sha512_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_hash_sha512(hash_address, message_address, message_length, 0) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_onetimeauth_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_onetimeauth_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_onetimeauth(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth_final(state_address, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (onetimeauth_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_onetimeauth_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_onetimeauth_final(state_address, hash_address) | 0) === 0) {
			var ret = (libsodium._free(state_address), _format_output(hash, outputFormat));
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth_init(key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: key (unsized_buf_optional)
		
		var key_address = null, key_length = 0;
		if (key != undefined) {
		        key = _any_to_Uint8Array(address_pool, key, "key");
		        key_address = _to_allocated_buf_address(key);
		        key_length = key.length;
		        address_pool.push(key_address);
		}
		
		// ---------- output state (onetimeauth_state)
		
		var state_address = new AllocatedBuf(144).address;
		
		if ((libsodium._crypto_onetimeauth_init(state_address, key_address) | 0) === 0) {
			var ret = state_address;
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth_update(state_address, message_chunk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (onetimeauth_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- input: message_chunk (unsized_buf)
		
		message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
		var message_chunk_address = _to_allocated_buf_address(message_chunk),
		    message_chunk_length = message_chunk.length;
		address_pool.push(message_chunk_address);
		
		if ((libsodium._crypto_onetimeauth_update(state_address, message_chunk_address, message_chunk_length) | 0) === 0) {
			_free_all(address_pool);
			return;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth_verify(hash, message, key) {
		var address_pool = [];

		// ---------- input: hash (buf)
		
		hash = _any_to_Uint8Array(address_pool, hash, "hash");
		var hash_address, hash_length = (libsodium._crypto_onetimeauth_bytes()) | 0;
		if (hash.length !== hash_length) {
		        _free_and_throw_type_error(address_pool, "invalid hash length");
		}
		hash_address = _to_allocated_buf_address(hash);
		address_pool.push(hash_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_onetimeauth_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		var result = libsodium._crypto_onetimeauth_verify(hash_address, message_address, message_length, 0, key_address) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_pwhash(keyLength, password, salt, opsLimit, memLimit, algorithm, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: keyLength (uint)
		
		_require_defined(address_pool, keyLength, "keyLength");
		
		if (!(typeof keyLength === "number" && (keyLength | 0) === keyLength) && (keyLength | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "keyLength must be an unsigned integer");
		}
		
		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: salt (buf)
		
		salt = _any_to_Uint8Array(address_pool, salt, "salt");
		var salt_address, salt_length = (libsodium._crypto_pwhash_saltbytes()) | 0;
		if (salt.length !== salt_length) {
		        _free_and_throw_type_error(address_pool, "invalid salt length");
		}
		salt_address = _to_allocated_buf_address(salt);
		address_pool.push(salt_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: memLimit (uint)
		
		_require_defined(address_pool, memLimit, "memLimit");
		
		if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) && (memLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
		}
		
		// ---------- input: algorithm (uint)
		
		_require_defined(address_pool, algorithm, "algorithm");
		
		if (!(typeof algorithm === "number" && (algorithm | 0) === algorithm) && (algorithm | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "algorithm must be an unsigned integer");
		}
		
		// ---------- output derivedKey (buf)
		
		var derivedKey_length = (keyLength) | 0,
		    derivedKey = new AllocatedBuf(derivedKey_length),
		    derivedKey_address = derivedKey.address;
		
		address_pool.push(derivedKey_address);
		
		if ((libsodium._crypto_pwhash(derivedKey_address, keyLength, 0, password_address, password_length, 0, salt_address, opsLimit, 0, memLimit, algorithm) | 0) === 0) {
			var ret = _format_output(derivedKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_scryptsalsa208sha256(keyLength, password, salt, opsLimit, memLimit, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: keyLength (uint)
		
		_require_defined(address_pool, keyLength, "keyLength");
		
		if (!(typeof keyLength === "number" && (keyLength | 0) === keyLength) && (keyLength | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "keyLength must be an unsigned integer");
		}
		
		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: salt (buf)
		
		salt = _any_to_Uint8Array(address_pool, salt, "salt");
		var salt_address, salt_length = (libsodium._crypto_pwhash_scryptsalsa208sha256_saltbytes()) | 0;
		if (salt.length !== salt_length) {
		        _free_and_throw_type_error(address_pool, "invalid salt length");
		}
		salt_address = _to_allocated_buf_address(salt);
		address_pool.push(salt_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: memLimit (uint)
		
		_require_defined(address_pool, memLimit, "memLimit");
		
		if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) && (memLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
		}
		
		// ---------- output derivedKey (buf)
		
		var derivedKey_length = (keyLength) | 0,
		    derivedKey = new AllocatedBuf(derivedKey_length),
		    derivedKey_address = derivedKey.address;
		
		address_pool.push(derivedKey_address);
		
		if ((libsodium._crypto_pwhash_scryptsalsa208sha256(derivedKey_address, keyLength, 0, password_address, password_length, 0, salt_address, opsLimit, 0, memLimit) | 0) === 0) {
			var ret = _format_output(derivedKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_scryptsalsa208sha256_ll(password, salt, opsLimit, r, p, keyLength, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: salt (unsized_buf)
		
		salt = _any_to_Uint8Array(address_pool, salt, "salt");
		var salt_address = _to_allocated_buf_address(salt),
		    salt_length = salt.length;
		address_pool.push(salt_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: r (uint)
		
		_require_defined(address_pool, r, "r");
		
		if (!(typeof r === "number" && (r | 0) === r) && (r | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "r must be an unsigned integer");
		}
		
		// ---------- input: p (uint)
		
		_require_defined(address_pool, p, "p");
		
		if (!(typeof p === "number" && (p | 0) === p) && (p | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "p must be an unsigned integer");
		}
		
		// ---------- input: keyLength (uint)
		
		_require_defined(address_pool, keyLength, "keyLength");
		
		if (!(typeof keyLength === "number" && (keyLength | 0) === keyLength) && (keyLength | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "keyLength must be an unsigned integer");
		}
		
		// ---------- output derivedKey (buf)
		
		var derivedKey_length = (keyLength) | 0,
		    derivedKey = new AllocatedBuf(derivedKey_length),
		    derivedKey_address = derivedKey.address;
		
		address_pool.push(derivedKey_address);
		
		if ((libsodium._crypto_pwhash_scryptsalsa208sha256_ll(password_address, password_length, salt_address, salt_length, opsLimit, 0, r, p, derivedKey_address, keyLength) | 0) === 0) {
			var ret = _format_output(derivedKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_scryptsalsa208sha256_str(password, opsLimit, memLimit, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: memLimit (uint)
		
		_require_defined(address_pool, memLimit, "memLimit");
		
		if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) && (memLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
		}
		
		// ---------- output hashed_password (buf)
		
		var hashed_password_length = (libsodium._crypto_pwhash_scryptsalsa208sha256_strbytes()) | 0,
		    hashed_password = new AllocatedBuf(hashed_password_length),
		    hashed_password_address = hashed_password.address;
		
		address_pool.push(hashed_password_address);
		
		if ((libsodium._crypto_pwhash_scryptsalsa208sha256_str(hashed_password_address, password_address, password_length, 0, opsLimit, 0, memLimit) | 0) === 0) {
			var ret = libsodium.Pointer_stringify(hashed_password_address);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_scryptsalsa208sha256_str_verify(hashed_password, password, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: hashed_password (string)
		
		hashed_password = from_string(hashed_password + "\0");
		var hashed_password_address = _to_allocated_buf_address(hashed_password),
		    hashed_password_length = hashed_password.length - 1;
		address_pool.push(hashed_password_address);
		
		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		var result = libsodium._crypto_pwhash_scryptsalsa208sha256_str_verify(hashed_password_address, password_address, password_length, 0) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_pwhash_str(password, opsLimit, memLimit, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: memLimit (uint)
		
		_require_defined(address_pool, memLimit, "memLimit");
		
		if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) && (memLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
		}
		
		// ---------- output hashed_password (buf)
		
		var hashed_password_length = (libsodium._crypto_pwhash_strbytes()) | 0,
		    hashed_password = new AllocatedBuf(hashed_password_length),
		    hashed_password_address = hashed_password.address;
		
		address_pool.push(hashed_password_address);
		
		if ((libsodium._crypto_pwhash_str(hashed_password_address, password_address, password_length, 0, opsLimit, 0, memLimit) | 0) === 0) {
			var ret = libsodium.Pointer_stringify(hashed_password_address);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_str_verify(hashed_password, password, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: hashed_password (string)
		
		hashed_password = from_string(hashed_password + "\0");
		var hashed_password_address = _to_allocated_buf_address(hashed_password),
		    hashed_password_length = hashed_password.length - 1;
		address_pool.push(hashed_password_address);
		
		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		var result = libsodium._crypto_pwhash_str_verify(hashed_password_address, password_address, password_length, 0) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_scalarmult(privateKey, publicKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- output sharedSecret (buf)
		
		var sharedSecret_length = (libsodium._crypto_scalarmult_bytes()) | 0,
		    sharedSecret = new AllocatedBuf(sharedSecret_length),
		    sharedSecret_address = sharedSecret.address;
		
		address_pool.push(sharedSecret_address);
		
		if ((libsodium._crypto_scalarmult(sharedSecret_address, privateKey_address, publicKey_address) | 0) === 0) {
			var ret = _format_output(sharedSecret, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_scalarmult_base(privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		if ((libsodium._crypto_scalarmult_base(publicKey_address, privateKey_address) | 0) === 0) {
			var ret = _format_output(publicKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_secretbox_detached(message, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output cipher (buf)
		
		var cipher_length = (message_length) | 0,
		    cipher = new AllocatedBuf(cipher_length),
		    cipher_address = cipher.address;
		
		address_pool.push(cipher_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_secretbox_macbytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_secretbox_detached(cipher_address, mac_address, message_address, message_length, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output({mac: mac, cipher: cipher}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_secretbox_easy(message, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output cipher (buf)
		
		var cipher_length = (message_length + libsodium._crypto_secretbox_macbytes()) | 0,
		    cipher = new AllocatedBuf(cipher_length),
		    cipher_address = cipher.address;
		
		address_pool.push(cipher_address);
		
		if ((libsodium._crypto_secretbox_easy(cipher_address, message_address, message_length, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output(cipher, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_secretbox_open_detached(ciphertext, mac, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_secretbox_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_secretbox_open_detached(message_address, ciphertext_address, mac_address, ciphertext_length, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_secretbox_open_easy(ciphertext, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length - libsodium._crypto_secretbox_macbytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_secretbox_open_easy(message_address, ciphertext_address, ciphertext_length, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_shorthash(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_shorthash_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_shorthash_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_shorthash(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign(message, privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output signature (buf)
		
		var signature_length = (message.length + libsodium._crypto_sign_bytes()) | 0,
		    signature = new AllocatedBuf(signature_length),
		    signature_address = signature.address;
		
		address_pool.push(signature_address);
		
		if ((libsodium._crypto_sign(signature_address, null, message_address, message_length, 0, privateKey_address) | 0) === 0) {
			var ret = _format_output(signature, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_detached(message, privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output signature (buf)
		
		var signature_length = (libsodium._crypto_sign_bytes()) | 0,
		    signature = new AllocatedBuf(signature_length),
		    signature_address = signature.address;
		
		address_pool.push(signature_address);
		
		if ((libsodium._crypto_sign_detached(signature_address, null, message_address, message_length, 0, privateKey_address) | 0) === 0) {
			var ret = _format_output(signature, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_ed25519_pk_to_curve25519(edPk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: edPk (buf)
		
		edPk = _any_to_Uint8Array(address_pool, edPk, "edPk");
		var edPk_address, edPk_length = (libsodium._crypto_sign_publickeybytes()) | 0;
		if (edPk.length !== edPk_length) {
		        _free_and_throw_type_error(address_pool, "invalid edPk length");
		}
		edPk_address = _to_allocated_buf_address(edPk);
		address_pool.push(edPk_address);
		
		// ---------- output cPk (buf)
		
		var cPk_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0,
		    cPk = new AllocatedBuf(cPk_length),
		    cPk_address = cPk.address;
		
		address_pool.push(cPk_address);
		
		if ((libsodium._crypto_sign_ed25519_pk_to_curve25519(cPk_address, edPk_address) | 0) === 0) {
			var ret = _format_output(cPk, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_ed25519_sk_to_curve25519(edSk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: edSk (buf)
		
		edSk = _any_to_Uint8Array(address_pool, edSk, "edSk");
		var edSk_address, edSk_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (edSk.length !== edSk_length) {
		        _free_and_throw_type_error(address_pool, "invalid edSk length");
		}
		edSk_address = _to_allocated_buf_address(edSk);
		address_pool.push(edSk_address);
		
		// ---------- output cSk (buf)
		
		var cSk_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0,
		    cSk = new AllocatedBuf(cSk_length),
		    cSk_address = cSk.address;
		
		address_pool.push(cSk_address);
		
		if ((libsodium._crypto_sign_ed25519_sk_to_curve25519(cSk_address, edSk_address) | 0) === 0) {
			var ret = _format_output(cSk, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_ed25519_sk_to_pk(privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		if ((libsodium._crypto_sign_ed25519_sk_to_pk(publicKey_address, privateKey_address) | 0) === 0) {
			var ret = _format_output(publicKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_ed25519_sk_to_seed(privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output seed (buf)
		
		var seed_length = (libsodium._crypto_sign_seedbytes()) | 0,
		    seed = new AllocatedBuf(seed_length),
		    seed_address = seed.address;
		
		address_pool.push(seed_address);
		
		if ((libsodium._crypto_sign_ed25519_sk_to_seed(seed_address, privateKey_address) | 0) === 0) {
			var ret = _format_output(seed, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_keypair(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output privateKey (buf)
		
		var privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0,
		    privateKey = new AllocatedBuf(privateKey_length),
		    privateKey_address = privateKey.address;
		
		address_pool.push(privateKey_address);
		
		if ((libsodium._crypto_sign_keypair(publicKey_address, privateKey_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: privateKey, keyType: 'ed25519'}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_open(signedMessage, publicKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: signedMessage (unsized_buf)
		
		signedMessage = _any_to_Uint8Array(address_pool, signedMessage, "signedMessage");
		var signedMessage_address = _to_allocated_buf_address(signedMessage),
		    signedMessage_length = signedMessage.length;
		address_pool.push(signedMessage_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- output message (buf)
		
		var message_length = (signedMessage_length - libsodium._crypto_sign_bytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_sign_open(message_address, null, signedMessage_address, signedMessage_length, 0, publicKey_address) | 0) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_seed_keypair(seed, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: seed (buf)
		
		seed = _any_to_Uint8Array(address_pool, seed, "seed");
		var seed_address, seed_length = (libsodium._crypto_sign_seedbytes()) | 0;
		if (seed.length !== seed_length) {
		        _free_and_throw_type_error(address_pool, "invalid seed length");
		}
		seed_address = _to_allocated_buf_address(seed);
		address_pool.push(seed_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output privateKey (buf)
		
		var privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0,
		    privateKey = new AllocatedBuf(privateKey_length),
		    privateKey_address = privateKey.address;
		
		address_pool.push(privateKey_address);
		
		if ((libsodium._crypto_sign_seed_keypair(publicKey_address, privateKey_address, seed_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: privateKey, keyType: "ed25519"}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_verify_detached(signature, message, publicKey) {
		var address_pool = [];

		// ---------- input: signature (buf)
		
		signature = _any_to_Uint8Array(address_pool, signature, "signature");
		var signature_address, signature_length = (libsodium._crypto_sign_bytes()) | 0;
		if (signature.length !== signature_length) {
		        _free_and_throw_type_error(address_pool, "invalid signature length");
		}
		signature_address = _to_allocated_buf_address(signature);
		address_pool.push(signature_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		var verificationResult = libsodium._crypto_sign_verify_detached(signature_address, message_address, message_length, 0, publicKey_address) | 0;
		var ret = (verificationResult === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_stream_chacha20(outLength, key, nonce, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: outLength (uint)
		
		_require_defined(address_pool, outLength, "outLength");
		
		if (!(typeof outLength === "number" && (outLength | 0) === outLength) && (outLength | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "outLength must be an unsigned integer");
		}
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_stream_chacha20_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_stream_chacha20_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- output out (buf)
		
		var out_length = (outLength) | 0,
		    out = new AllocatedBuf(out_length),
		    out_address = out.address;
		
		address_pool.push(out_address);
		
		if ((libsodium._crypto_stream_chacha20(out_address, outLength, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output(out, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function randombytes_buf(length, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: length (uint)
		
		_require_defined(address_pool, length, "length");
		
		if (!(typeof length === "number" && (length | 0) === length) && (length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "length must be an unsigned integer");
		}
		
		// ---------- output output (buf)
		
		var output_length = (length) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._randombytes_buf(output_address, length);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function randombytes_close(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		libsodium._randombytes_close();
		
	}

	function randombytes_random(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		var random_value = libsodium._randombytes_random() >>> 0;
		var ret = (random_value);
		_free_all(address_pool);
		return ret;
		
	}

	function randombytes_set_implementation(implementation, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: implementation (randombytes_implementation)
		
		var implementation_address = libsodium._malloc(6 * 4);
		for (var i = 0; i < 6; i++) {
		        libsodium.setValue(implementation_address + i * 4,
		            libsodium.Runtime.addFunction(implementation
		            [["implementation_name", "random", "stir", "uniform", "buf", "close"][i]]),
		            "i32");
		}
		
		if ((libsodium._randombytes_set_implementation(implementation_address) | 0) === 0) {
			_free_all(address_pool);
			return;
		}
		_free_and_throw_error(address_pool);
		
	}

	function randombytes_stir(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		libsodium._randombytes_stir();
		
	}

	function randombytes_uniform(upper_bound, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: upper_bound (uint)
		
		_require_defined(address_pool, upper_bound, "upper_bound");
		
		if (!(typeof upper_bound === "number" && (upper_bound | 0) === upper_bound) && (upper_bound | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "upper_bound must be an unsigned integer");
		}
		
		var random_value = libsodium._randombytes_uniform(upper_bound) >>> 0;
		var ret = (random_value);
		_free_all(address_pool);
		return ret;
		
	}

	function sodium_version_string() {
		var address_pool = [];

		var version = libsodium._sodium_version_string();
		var ret = (libsodium.Pointer_stringify(version));
		_free_all(address_pool);
		return ret;
		
	}


    exports.add = add;
    exports.compare = compare;
    exports.from_base64 = from_base64;
    exports.from_hex = from_hex;
    exports.from_string = from_string;
    exports.increment = increment;
    exports.is_zero = is_zero;
    exports.libsodium = libsodium;
    exports.memcmp = memcmp;
    exports.memzero = memzero;
    exports.output_formats = output_formats;
    exports.symbols = symbols;
    exports.to_base64 = to_base64;
    exports.to_hex = to_hex;
    exports.to_string = to_string;

    
	var exported_functions = ["crypto_aead_chacha20poly1305_decrypt", "crypto_aead_chacha20poly1305_decrypt_detached", "crypto_aead_chacha20poly1305_encrypt", "crypto_aead_chacha20poly1305_encrypt_detached", "crypto_aead_chacha20poly1305_ietf_decrypt", "crypto_aead_chacha20poly1305_ietf_decrypt_detached", "crypto_aead_chacha20poly1305_ietf_encrypt", "crypto_aead_chacha20poly1305_ietf_encrypt_detached", "crypto_auth", "crypto_auth_hmacsha256", "crypto_auth_hmacsha256_verify", "crypto_auth_hmacsha512", "crypto_auth_hmacsha512_verify", "crypto_auth_verify", "crypto_box_beforenm", "crypto_box_detached", "crypto_box_easy", "crypto_box_easy_afternm", "crypto_box_keypair", "crypto_box_open_detached", "crypto_box_open_easy", "crypto_box_open_easy_afternm", "crypto_box_seal", "crypto_box_seal_open", "crypto_box_seed_keypair", "crypto_generichash", "crypto_generichash_final", "crypto_generichash_init", "crypto_generichash_update", "crypto_hash", "crypto_hash_sha256", "crypto_hash_sha512", "crypto_onetimeauth", "crypto_onetimeauth_final", "crypto_onetimeauth_init", "crypto_onetimeauth_update", "crypto_onetimeauth_verify", "crypto_pwhash", "crypto_pwhash_scryptsalsa208sha256", "crypto_pwhash_scryptsalsa208sha256_ll", "crypto_pwhash_scryptsalsa208sha256_str", "crypto_pwhash_scryptsalsa208sha256_str_verify", "crypto_pwhash_str", "crypto_pwhash_str_verify", "crypto_scalarmult", "crypto_scalarmult_base", "crypto_secretbox_detached", "crypto_secretbox_easy", "crypto_secretbox_open_detached", "crypto_secretbox_open_easy", "crypto_shorthash", "crypto_sign", "crypto_sign_detached", "crypto_sign_ed25519_pk_to_curve25519", "crypto_sign_ed25519_sk_to_curve25519", "crypto_sign_ed25519_sk_to_pk", "crypto_sign_ed25519_sk_to_seed", "crypto_sign_keypair", "crypto_sign_open", "crypto_sign_seed_keypair", "crypto_sign_verify_detached", "crypto_stream_chacha20", "randombytes_buf", "randombytes_close", "randombytes_random", "randombytes_set_implementation", "randombytes_stir", "randombytes_uniform", "sodium_version_string"],
	      functions = [crypto_aead_chacha20poly1305_decrypt, crypto_aead_chacha20poly1305_decrypt_detached, crypto_aead_chacha20poly1305_encrypt, crypto_aead_chacha20poly1305_encrypt_detached, crypto_aead_chacha20poly1305_ietf_decrypt, crypto_aead_chacha20poly1305_ietf_decrypt_detached, crypto_aead_chacha20poly1305_ietf_encrypt, crypto_aead_chacha20poly1305_ietf_encrypt_detached, crypto_auth, crypto_auth_hmacsha256, crypto_auth_hmacsha256_verify, crypto_auth_hmacsha512, crypto_auth_hmacsha512_verify, crypto_auth_verify, crypto_box_beforenm, crypto_box_detached, crypto_box_easy, crypto_box_easy_afternm, crypto_box_keypair, crypto_box_open_detached, crypto_box_open_easy, crypto_box_open_easy_afternm, crypto_box_seal, crypto_box_seal_open, crypto_box_seed_keypair, crypto_generichash, crypto_generichash_final, crypto_generichash_init, crypto_generichash_update, crypto_hash, crypto_hash_sha256, crypto_hash_sha512, crypto_onetimeauth, crypto_onetimeauth_final, crypto_onetimeauth_init, crypto_onetimeauth_update, crypto_onetimeauth_verify, crypto_pwhash, crypto_pwhash_scryptsalsa208sha256, crypto_pwhash_scryptsalsa208sha256_ll, crypto_pwhash_scryptsalsa208sha256_str, crypto_pwhash_scryptsalsa208sha256_str_verify, crypto_pwhash_str, crypto_pwhash_str_verify, crypto_scalarmult, crypto_scalarmult_base, crypto_secretbox_detached, crypto_secretbox_easy, crypto_secretbox_open_detached, crypto_secretbox_open_easy, crypto_shorthash, crypto_sign, crypto_sign_detached, crypto_sign_ed25519_pk_to_curve25519, crypto_sign_ed25519_sk_to_curve25519, crypto_sign_ed25519_sk_to_pk, crypto_sign_ed25519_sk_to_seed, crypto_sign_keypair, crypto_sign_open, crypto_sign_seed_keypair, crypto_sign_verify_detached, crypto_stream_chacha20, randombytes_buf, randombytes_close, randombytes_random, randombytes_set_implementation, randombytes_stir, randombytes_uniform, sodium_version_string];
	for (var i = 0; i < functions.length; i++) {
		if (typeof libsodium["_" + exported_functions[i]] === "function") {
			exports[exported_functions[i]] = functions[i];
		}
	}
	var constants = ["SODIUM_LIBRARY_VERSION_MAJOR", "SODIUM_LIBRARY_VERSION_MINOR", "crypto_aead_chacha20poly1305_ABYTES", "crypto_aead_chacha20poly1305_KEYBYTES", "crypto_aead_chacha20poly1305_NPUBBYTES", "crypto_aead_chacha20poly1305_NSECBYTES", "crypto_aead_chacha20poly1305_ietf_ABYTES", "crypto_aead_chacha20poly1305_ietf_KEYBYTES", "crypto_aead_chacha20poly1305_ietf_NPUBBYTES", "crypto_aead_chacha20poly1305_ietf_NSECBYTES", "crypto_auth_BYTES", "crypto_auth_KEYBYTES", "crypto_auth_hmacsha256_BYTES", "crypto_auth_hmacsha256_KEYBYTES", "crypto_auth_hmacsha512_BYTES", "crypto_auth_hmacsha512_KEYBYTES", "crypto_box_BEFORENMBYTES", "crypto_box_MACBYTES", "crypto_box_NONCEBYTES", "crypto_box_PUBLICKEYBYTES", "crypto_box_SEALBYTES", "crypto_box_SECRETKEYBYTES", "crypto_box_SEEDBYTES", "crypto_generichash_BYTES", "crypto_generichash_BYTES_MAX", "crypto_generichash_BYTES_MIN", "crypto_generichash_KEYBYTES", "crypto_generichash_KEYBYTES_MAX", "crypto_generichash_KEYBYTES_MIN", "crypto_hash_BYTES", "crypto_onetimeauth_BYTES", "crypto_onetimeauth_KEYBYTES", "crypto_pwhash_ALG_ARGON2I13", "crypto_pwhash_ALG_DEFAULT", "crypto_pwhash_MEMLIMIT_INTERACTIVE", "crypto_pwhash_MEMLIMIT_MODERATE", "crypto_pwhash_MEMLIMIT_SENSITIVE", "crypto_pwhash_OPSLIMIT_INTERACTIVE", "crypto_pwhash_OPSLIMIT_MODERATE", "crypto_pwhash_OPSLIMIT_SENSITIVE", "crypto_pwhash_SALTBYTES", "crypto_pwhash_STRBYTES", "crypto_pwhash_STR_VERIFY", "crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_INTERACTIVE", "crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_SENSITIVE", "crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_INTERACTIVE", "crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_SENSITIVE", "crypto_pwhash_scryptsalsa208sha256_SALTBYTES", "crypto_pwhash_scryptsalsa208sha256_STRBYTES", "crypto_pwhash_scryptsalsa208sha256_STR_VERIFY", "crypto_scalarmult_BYTES", "crypto_scalarmult_SCALARBYTES", "crypto_secretbox_KEYBYTES", "crypto_secretbox_MACBYTES", "crypto_secretbox_NONCEBYTES", "crypto_shorthash_BYTES", "crypto_shorthash_KEYBYTES", "crypto_sign_BYTES", "crypto_sign_PUBLICKEYBYTES", "crypto_sign_SECRETKEYBYTES", "crypto_sign_SEEDBYTES"];
	for (var i = 0; i < constants.length; i++) {
		var raw = libsodium["_" + constants[i].toLowerCase()];
		if (typeof raw === "function") exports[constants[i]] = raw()|0;
	}
	var constants_str = ["SODIUM_VERSION_STRING", "crypto_pwhash_STRPREFIX", "crypto_pwhash_scryptsalsa208sha256_STRPREFIX"];
	for (var i = 0; i < constants_str.length; i++) {
		var raw = libsodium["_" + constants_str[i].toLowerCase()];
		if (typeof raw === "function") exports[constants_str[i]] = libsodium.Pointer_stringify(raw());
	}

    return exports;
}));
