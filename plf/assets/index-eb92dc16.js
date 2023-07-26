const index$1 = "";
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$c = Object.prototype;
var hasOwnProperty$a = objectProto$c.hasOwnProperty;
var nativeObjectToString$1 = objectProto$c.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$a.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$b = Object.prototype;
var nativeObjectToString = objectProto$b.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var symbolTag$2 = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$2;
}
var isArray = Array.isArray;
const isArray$1 = isArray;
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index2 = string.length;
  while (index2-- && reWhitespace.test(string.charAt(index2))) {
  }
  return index2;
}
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
const coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$a = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$9 = objectProto$a.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$9).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key2) {
  return object == null ? void 0 : object[key2];
}
function getNative(object, key2) {
  var value = getValue(object, key2);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap = getNative(root$1, "WeakMap");
const WeakMap$1 = WeakMap;
var objectCreate = Object.create;
var baseCreate = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
const baseCreate$1 = baseCreate;
function copyArray(source, array) {
  var index2 = -1, length = source.length;
  array || (array = Array(length));
  while (++index2 < length) {
    array[index2] = source[index2];
  }
  return array;
}
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
const defineProperty$1 = defineProperty;
function arrayEach(array, iteratee) {
  var index2 = -1, length = array == null ? 0 : array.length;
  while (++index2 < length) {
    if (iteratee(array[index2], index2, array) === false) {
      break;
    }
  }
  return array;
}
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key2, value) {
  if (key2 == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key2, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key2] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$9 = Object.prototype;
var hasOwnProperty$8 = objectProto$9.hasOwnProperty;
function assignValue(object, key2, value) {
  var objValue = object[key2];
  if (!(hasOwnProperty$8.call(object, key2) && eq(objValue, value)) || value === void 0 && !(key2 in object)) {
    baseAssignValue(object, key2, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index2 = -1, length = props.length;
  while (++index2 < length) {
    var key2 = props[index2];
    var newValue = customizer ? customizer(object[key2], source[key2], key2, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key2];
    }
    if (isNew) {
      baseAssignValue(object, key2, newValue);
    } else {
      assignValue(object, key2, newValue);
    }
  }
  return object;
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
var objectProto$8 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$8;
  return value === proto;
}
function baseTimes(n, iteratee) {
  var index2 = -1, result = Array(n);
  while (++index2 < n) {
    result[index2] = iteratee(index2);
  }
  return result;
}
var argsTag$2 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
var objectProto$7 = Object.prototype;
var hasOwnProperty$7 = objectProto$7.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$7.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
const isArguments$1 = isArguments;
function stubFalse() {
  return false;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", funcTag$1 = "[object Function]", mapTag$4 = "[object Map]", numberTag$2 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$2 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
const nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$1 = isTypedArray;
var objectProto$6 = Object.prototype;
var hasOwnProperty$6 = objectProto$6.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key2 in value) {
    if ((inherited || hasOwnProperty$6.call(value, key2)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key2 == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key2 == "offset" || key2 == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key2 == "buffer" || key2 == "byteLength" || key2 == "byteOffset") || // Skip index properties.
    isIndex(key2, length)))) {
      result.push(key2);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
const nativeKeys$1 = nativeKeys;
var objectProto$5 = Object.prototype;
var hasOwnProperty$5 = objectProto$5.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key2 in Object(object)) {
    if (hasOwnProperty$5.call(object, key2) && key2 != "constructor") {
      result.push(key2);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key2 in Object(object)) {
      result.push(key2);
    }
  }
  return result;
}
var objectProto$4 = Object.prototype;
var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key2 in object) {
    if (!(key2 == "constructor" && (isProto || !hasOwnProperty$4.call(object, key2)))) {
      result.push(key2);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var nativeCreate = getNative(Object, "create");
const nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}
function hashDelete(key2) {
  var result = this.has(key2) && delete this.__data__[key2];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$3 = Object.prototype;
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
function hashGet(key2) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key2];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$3.call(data, key2) ? data[key2] : void 0;
}
var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
function hashHas(key2) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key2] !== void 0 : hasOwnProperty$2.call(data, key2);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key2, value) {
  var data = this.__data__;
  this.size += this.has(key2) ? 0 : 1;
  data[key2] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
function Hash(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array, key2) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key2)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key2) {
  var data = this.__data__, index2 = assocIndexOf(data, key2);
  if (index2 < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index2 == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index2, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key2) {
  var data = this.__data__, index2 = assocIndexOf(data, key2);
  return index2 < 0 ? void 0 : data[index2][1];
}
function listCacheHas(key2) {
  return assocIndexOf(this.__data__, key2) > -1;
}
function listCacheSet(key2, value) {
  var data = this.__data__, index2 = assocIndexOf(data, key2);
  if (index2 < 0) {
    ++this.size;
    data.push([key2, value]);
  } else {
    data[index2][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map = getNative(root$1, "Map");
const Map$1 = Map;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key2) {
  var data = map.__data__;
  return isKeyable(key2) ? data[typeof key2 == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key2) {
  var result = getMapData(this, key2)["delete"](key2);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key2) {
  return getMapData(this, key2).get(key2);
}
function mapCacheHas(key2) {
  return getMapData(this, key2).has(key2);
}
function mapCacheSet(key2, value) {
  var data = getMapData(this, key2), size = data.size;
  data.set(key2, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
function arrayPush(array, values) {
  var index2 = -1, length = values.length, offset = array.length;
  while (++index2 < length) {
    array[offset + index2] = values[index2];
  }
  return array;
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
const getPrototype$1 = getPrototype;
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key2) {
  var data = this.__data__, result = data["delete"](key2);
  this.size = data.size;
  return result;
}
function stackGet(key2) {
  return this.__data__.get(key2);
}
function stackHas(key2) {
  return this.__data__.has(key2);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(key2, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key2, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key2, value);
  this.size = data.size;
  return this;
}
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
function arrayFilter(array, predicate) {
  var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index2 < length) {
    var value = array[index2];
    if (predicate(value, index2, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$1 = Object.prototype;
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
const getSymbols$1 = getSymbols;
function copySymbols(source, object) {
  return copyObject(source, getSymbols$1(source), object);
}
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};
const getSymbolsIn$1 = getSymbolsIn;
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn$1);
}
var DataView = getNative(root$1, "DataView");
const DataView$1 = DataView;
var Promise$1 = getNative(root$1, "Promise");
const Promise$2 = Promise$1;
var Set = getNative(root$1, "Set");
const Set$1 = Set;
var mapTag$3 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$2 || Map$1 && getTag(new Map$1()) != mapTag$3 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$3 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag$1) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$3;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
const getTag$1 = getTag;
var objectProto = Object.prototype;
var hasOwnProperty$1 = objectProto.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty$1.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var Uint8Array = root$1.Uint8Array;
const Uint8Array$1 = Uint8Array;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);
    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);
    case dataViewTag$1:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$2:
      return new Ctor();
    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);
    case regexpTag$1:
      return cloneRegExp(object);
    case setTag$2:
      return new Ctor();
    case symbolTag$1:
      return cloneSymbol(object);
  }
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate$1(getPrototype$1(object)) : {};
}
var mapTag$1 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$1;
}
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
const isMap$1 = isMap;
var setTag$1 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
const isSet$1 = isSet;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key2, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key2, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray$1(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$1(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet$1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap$1(value)) {
    value.forEach(function(subValue, key3) {
      result.set(key3, baseClone(subValue, bitmask, customizer, key3, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key3) {
    if (props) {
      key3 = subValue;
      subValue = value[key3];
    }
    assignValue(result, key3, baseClone(subValue, bitmask, customizer, key3, value, stack));
  });
  return result;
}
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
var now = function() {
  return root$1.Date.now();
};
const now$1 = now;
var FUNC_ERROR_TEXT$1 = "Expected a function";
var nativeMax = Math.max, nativeMin = Math.min;
function debounce(func, wait, options2) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options2)) {
    leading = !!options2.leading;
    maxing = "maxWait" in options2;
    maxWait = maxing ? nativeMax(toNumber(options2.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options2 ? !!options2.trailing : trailing;
  }
  function invokeFunc(time2) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time2;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time2) {
    lastInvokeTime = time2;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time2) : result;
  }
  function remainingWait(time2) {
    var timeSinceLastCall = time2 - lastCallTime, timeSinceLastInvoke = time2 - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time2) {
    var timeSinceLastCall = time2 - lastCallTime, timeSinceLastInvoke = time2 - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time2 = now$1();
    if (shouldInvoke(time2)) {
      return trailingEdge(time2);
    }
    timerId = setTimeout(timerExpired, remainingWait(time2));
  }
  function trailingEdge(time2) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time2);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now$1());
  }
  function debounced() {
    var time2 = now$1(), isInvoking = shouldInvoke(time2);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time2;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
var FUNC_ERROR_TEXT = "Expected a function";
function throttle(func, wait, options2) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options2)) {
    leading = "leading" in options2 ? !!options2.leading : leading;
    trailing = "trailing" in options2 ? !!options2.trailing : trailing;
  }
  return debounce(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
const scriptRel = function detectScriptRel() {
  const relList = typeof document !== "undefined" && document.createElement("link").relList;
  return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
}();
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  const links = document.getElementsByTagName("link");
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep, importerUrl);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    const isBaseRelative = !!importerUrl;
    if (isBaseRelative) {
      for (let i2 = links.length - 1; i2 >= 0; i2--) {
        const link3 = links[i2];
        if (link3.href === dep && (!isCss || link3.rel === "stylesheet")) {
          return;
        }
      }
    } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link2 = document.createElement("link");
    link2.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link2.as = "script";
      link2.crossOrigin = "";
    }
    link2.href = dep;
    document.head.appendChild(link2);
    if (isCss) {
      return new Promise((res, rej) => {
        link2.addEventListener("load", res);
        link2.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule()).catch((err) => {
    const e = new Event("vite:preloadError", { cancelable: true });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  });
};
await Promise.all([window.__OSL.import("vue-router")]);
const { createRouter, createWebHashHistory } = window.__OSL.getModule("vue-router");
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    name: "xhome",
    path: "/home",
    component: () => __vitePreload(() => import("./Home-7bd66827.js"), true ? ["./Home-7bd66827.js","./package-f758376c.js","./Home-a04523aa.css"] : void 0, import.meta.url)
  },
  {
    name: "xabout",
    path: "/about",
    component: () => __vitePreload(() => import("./About-6df74c50.js"), true ? ["./About-6df74c50.js","./package-f758376c.js","./About-424effc0.css"] : void 0, import.meta.url)
  },
  {
    name: "xnopermission",
    path: "/nopermission",
    component: () => __vitePreload(() => import("./NoPermission-0a080d72.js"), true ? [] : void 0, import.meta.url)
  }
];
const push = (url) => {
  router.push(url);
};
const addRoute = (rs) => {
  for (let item of rs) {
    router.addRoute(item);
  }
};
const router = createRouter({
  history: createWebHashHistory(),
  // hash路由模式
  // history: createWebHistory(),  // history路由模式
  routes
});
await Promise.all([window.__OSL.import("nprogress")]);
const NProgress = window.__OSL.getModule("nprogress");
NProgress.configure({ showSpinner: false });
const permission = () => {
  const npStart = debounce(
    () => {
      console.log("x npStart");
      NProgress.start();
    },
    200,
    {
      leading: true,
      trailing: false
    }
  );
  const npDone = debounce(() => {
    console.log("x npDone");
    NProgress.done();
  }, 200);
  function setFromPageScrollTop(url) {
  }
  function setScrollTop(url) {
  }
  router.beforeEach((to, from, next) => {
    npStart();
    console.log("x beforeEach from", from);
    console.log("x beforeEach to ", to);
    setFromPageScrollTop(from.fullPath);
    next();
  });
  router.afterEach((to, from) => {
    console.log("x afterEach to", to);
    console.log("x afterEach from", from);
    setScrollTop(to.fullPath);
    npDone();
  });
};
const zh_CN$1 = {
  starter_title: "Vite3+Vue3 微前端 portal"
};
const en_US$1 = {
  starter_title: "Vite3+Vue3  Micro frontends portal"
};
const messages = {
  zh_CN: zh_CN$1,
  en_US: en_US$1
};
await Promise.all([window.__OSL.import("vue-i18n")]);
const { createI18n } = window.__OSL.getModule("vue-i18n");
const i18n = createI18n({
  //   fallbackLocale: "ch",
  //   globalInjection: true,
  legacy: false,
  // you must specify 'legacy: false' option
  locale: "",
  messages
});
const MenuDrawer_vue_vue_type_style_index_0_lang = "";
await Promise.all([window.__OSL.import("xdp/ui/dynamic"), window.__OSL.import("xdp/ui/drawer"), window.__OSL.import("vue")]);
const { Dynamic: Dynamic$1 } = window.__OSL.getModule("xdp/ui/dynamic");
const { Drawer } = window.__OSL.getModule("xdp/ui/drawer");
const { computed: computed$2, ref: ref$4 } = window.__OSL.getModule("vue");
const { unref: _unref$5, createVNode: _createVNode$5, resolveComponent: _resolveComponent$4, normalizeStyle: _normalizeStyle$1, withCtx: _withCtx$6, openBlock: _openBlock$8, createBlock: _createBlock$6 } = window.__OSL.getModule("vue");
const __default__$4 = {
  components: {
    XDrawer: Drawer
  }
};
const _sfc_main$8 = /* @__PURE__ */ Object.assign(__default__$4, {
  __name: "MenuDrawer",
  props: {
    modelValue: Boolean,
    top: {
      type: Number,
      default: 0
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const AppMenu = () => __vitePreload(() => import("./AppMenu-1fc63d2c.js"), true ? ["./AppMenu-1fc63d2c.js","./AppMenu-b7a59dba.css"] : void 0, import.meta.url);
    const visible = computed$2({
      get: () => {
        return props.modelValue;
      },
      set: (val) => {
        emit("update:modelValue", val);
      }
    });
    const style = computed$2(() => {
      return {
        top: `${props.top}px`,
        height: `calc(100% - ${props.top}px)`
      };
    });
    return (_ctx, _cache) => {
      const _component_x_drawer = _resolveComponent$4("x-drawer");
      return _openBlock$8(), _createBlock$6(_component_x_drawer, {
        destroyOnClose: "",
        attach: "body",
        class: "app-menu-drawer",
        style: _normalizeStyle$1(style.value),
        size: "100%",
        visible: visible.value,
        "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => visible.value = $event),
        placement: "top",
        header: false,
        footer: false,
        showOverlay: false
      }, {
        default: _withCtx$6(() => [
          _createVNode$5(_unref$5(Dynamic$1), { is: AppMenu })
        ]),
        _: 1
      }, 8, ["style", "visible"]);
    };
  }
});
await Promise.all([window.__OSL.import("xdp/ui/locale/lang/zh-cn"), window.__OSL.import("xdp/ui/locale/lang/en-us")]);
const zh_CN = window.__OSL.getModule("xdp/ui/locale/lang/zh-cn");
const en_US = window.__OSL.getModule("xdp/ui/locale/lang/en-us");
const uiI18n = {
  zh_CN,
  en_US
};
await Promise.all([window.__OSL.import("axios")]);
const srcAxios = window.__OSL.getModule("axios");
const instance = srcAxios.create({
  baseURL: "",
  timeout: 3e3,
  headers: {}
});
instance.defaults.headers.post["Content-Type"] = "application/json";
function setToken(token2) {
  instance.defaults.headers.common["Authorization"] = token2;
}
const interceptorsRequest = [];
const interceptorsResponse = [];
function addInterceptorsRequest(fn1, fn2) {
  interceptorsRequest.push([fn1, fn2]);
}
function addInterceptorsResponse(fn1, fn2) {
  interceptorsResponse.push([fn1, fn2]);
}
let reqIdIndex = (/* @__PURE__ */ new Date()).getTime();
function getReqId() {
  reqIdIndex++;
  return `r-${reqIdIndex}`;
}
let sendReqCount = 0;
const REQ_MAX = 5;
const reqList = [];
const reqMap = {};
function createReq(args) {
  const req = {
    id: getReqId(),
    args,
    state: 0
  };
  return req;
}
async function send() {
  if (sendReqCount >= REQ_MAX) {
    console.log(`send sendReqCount[${sendReqCount}] >= REQ_MAX[${REQ_MAX}]`);
    return;
  }
  let reqId = reqList.shift();
  if (reqId === void 0) {
    return;
  }
  const req = reqMap[reqId];
  if (!req) {
    console.log("send req is empty");
    return;
  }
  sendReqCount++;
  req.state = 1;
  send();
  let error = null;
  console.log("send args", req.args);
  const res = await instance(req.args).catch((err) => {
    error = err;
  });
  req.state = 2;
  sendReqCount--;
  if (error) {
    req.cb({ state: false, data: error });
  } else {
    req.cb({ state: true, data: res });
  }
  delete reqMap[req.id];
  send();
}
function request(args) {
  return new Promise((resolve, reject) => {
    const config = {};
    interceptorsRequest.forEach((fns) => {
      Object.assign(config, fns[0](args));
    });
    const req = {
      ...createReq(config),
      cb: ({ state, data }) => {
        if (state) {
          console.log("res", data);
          interceptorsResponse.forEach((fns) => {
            const fnResData = fns[0](data);
            if (fnResData)
              data = fnResData;
          });
          resolve(data);
        } else {
          console.error("data error ", data);
          interceptorsResponse.forEach((fns) => {
            Object.assign(data, fns[1](data));
          });
          reject(data);
        }
      }
    };
    reqMap[req.id] = req;
    reqList.push(req.id);
    send();
  });
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var colorString$1 = { exports: {} };
var colorName = {
  "aliceblue": [240, 248, 255],
  "antiquewhite": [250, 235, 215],
  "aqua": [0, 255, 255],
  "aquamarine": [127, 255, 212],
  "azure": [240, 255, 255],
  "beige": [245, 245, 220],
  "bisque": [255, 228, 196],
  "black": [0, 0, 0],
  "blanchedalmond": [255, 235, 205],
  "blue": [0, 0, 255],
  "blueviolet": [138, 43, 226],
  "brown": [165, 42, 42],
  "burlywood": [222, 184, 135],
  "cadetblue": [95, 158, 160],
  "chartreuse": [127, 255, 0],
  "chocolate": [210, 105, 30],
  "coral": [255, 127, 80],
  "cornflowerblue": [100, 149, 237],
  "cornsilk": [255, 248, 220],
  "crimson": [220, 20, 60],
  "cyan": [0, 255, 255],
  "darkblue": [0, 0, 139],
  "darkcyan": [0, 139, 139],
  "darkgoldenrod": [184, 134, 11],
  "darkgray": [169, 169, 169],
  "darkgreen": [0, 100, 0],
  "darkgrey": [169, 169, 169],
  "darkkhaki": [189, 183, 107],
  "darkmagenta": [139, 0, 139],
  "darkolivegreen": [85, 107, 47],
  "darkorange": [255, 140, 0],
  "darkorchid": [153, 50, 204],
  "darkred": [139, 0, 0],
  "darksalmon": [233, 150, 122],
  "darkseagreen": [143, 188, 143],
  "darkslateblue": [72, 61, 139],
  "darkslategray": [47, 79, 79],
  "darkslategrey": [47, 79, 79],
  "darkturquoise": [0, 206, 209],
  "darkviolet": [148, 0, 211],
  "deeppink": [255, 20, 147],
  "deepskyblue": [0, 191, 255],
  "dimgray": [105, 105, 105],
  "dimgrey": [105, 105, 105],
  "dodgerblue": [30, 144, 255],
  "firebrick": [178, 34, 34],
  "floralwhite": [255, 250, 240],
  "forestgreen": [34, 139, 34],
  "fuchsia": [255, 0, 255],
  "gainsboro": [220, 220, 220],
  "ghostwhite": [248, 248, 255],
  "gold": [255, 215, 0],
  "goldenrod": [218, 165, 32],
  "gray": [128, 128, 128],
  "green": [0, 128, 0],
  "greenyellow": [173, 255, 47],
  "grey": [128, 128, 128],
  "honeydew": [240, 255, 240],
  "hotpink": [255, 105, 180],
  "indianred": [205, 92, 92],
  "indigo": [75, 0, 130],
  "ivory": [255, 255, 240],
  "khaki": [240, 230, 140],
  "lavender": [230, 230, 250],
  "lavenderblush": [255, 240, 245],
  "lawngreen": [124, 252, 0],
  "lemonchiffon": [255, 250, 205],
  "lightblue": [173, 216, 230],
  "lightcoral": [240, 128, 128],
  "lightcyan": [224, 255, 255],
  "lightgoldenrodyellow": [250, 250, 210],
  "lightgray": [211, 211, 211],
  "lightgreen": [144, 238, 144],
  "lightgrey": [211, 211, 211],
  "lightpink": [255, 182, 193],
  "lightsalmon": [255, 160, 122],
  "lightseagreen": [32, 178, 170],
  "lightskyblue": [135, 206, 250],
  "lightslategray": [119, 136, 153],
  "lightslategrey": [119, 136, 153],
  "lightsteelblue": [176, 196, 222],
  "lightyellow": [255, 255, 224],
  "lime": [0, 255, 0],
  "limegreen": [50, 205, 50],
  "linen": [250, 240, 230],
  "magenta": [255, 0, 255],
  "maroon": [128, 0, 0],
  "mediumaquamarine": [102, 205, 170],
  "mediumblue": [0, 0, 205],
  "mediumorchid": [186, 85, 211],
  "mediumpurple": [147, 112, 219],
  "mediumseagreen": [60, 179, 113],
  "mediumslateblue": [123, 104, 238],
  "mediumspringgreen": [0, 250, 154],
  "mediumturquoise": [72, 209, 204],
  "mediumvioletred": [199, 21, 133],
  "midnightblue": [25, 25, 112],
  "mintcream": [245, 255, 250],
  "mistyrose": [255, 228, 225],
  "moccasin": [255, 228, 181],
  "navajowhite": [255, 222, 173],
  "navy": [0, 0, 128],
  "oldlace": [253, 245, 230],
  "olive": [128, 128, 0],
  "olivedrab": [107, 142, 35],
  "orange": [255, 165, 0],
  "orangered": [255, 69, 0],
  "orchid": [218, 112, 214],
  "palegoldenrod": [238, 232, 170],
  "palegreen": [152, 251, 152],
  "paleturquoise": [175, 238, 238],
  "palevioletred": [219, 112, 147],
  "papayawhip": [255, 239, 213],
  "peachpuff": [255, 218, 185],
  "peru": [205, 133, 63],
  "pink": [255, 192, 203],
  "plum": [221, 160, 221],
  "powderblue": [176, 224, 230],
  "purple": [128, 0, 128],
  "rebeccapurple": [102, 51, 153],
  "red": [255, 0, 0],
  "rosybrown": [188, 143, 143],
  "royalblue": [65, 105, 225],
  "saddlebrown": [139, 69, 19],
  "salmon": [250, 128, 114],
  "sandybrown": [244, 164, 96],
  "seagreen": [46, 139, 87],
  "seashell": [255, 245, 238],
  "sienna": [160, 82, 45],
  "silver": [192, 192, 192],
  "skyblue": [135, 206, 235],
  "slateblue": [106, 90, 205],
  "slategray": [112, 128, 144],
  "slategrey": [112, 128, 144],
  "snow": [255, 250, 250],
  "springgreen": [0, 255, 127],
  "steelblue": [70, 130, 180],
  "tan": [210, 180, 140],
  "teal": [0, 128, 128],
  "thistle": [216, 191, 216],
  "tomato": [255, 99, 71],
  "turquoise": [64, 224, 208],
  "violet": [238, 130, 238],
  "wheat": [245, 222, 179],
  "white": [255, 255, 255],
  "whitesmoke": [245, 245, 245],
  "yellow": [255, 255, 0],
  "yellowgreen": [154, 205, 50]
};
var simpleSwizzle = { exports: {} };
var isArrayish$1 = function isArrayish2(obj2) {
  if (!obj2 || typeof obj2 === "string") {
    return false;
  }
  return obj2 instanceof Array || Array.isArray(obj2) || obj2.length >= 0 && (obj2.splice instanceof Function || Object.getOwnPropertyDescriptor(obj2, obj2.length - 1) && obj2.constructor.name !== "String");
};
var isArrayish = isArrayish$1;
var concat = Array.prototype.concat;
var slice = Array.prototype.slice;
var swizzle$1 = simpleSwizzle.exports = function swizzle2(args) {
  var results = [];
  for (var i2 = 0, len = args.length; i2 < len; i2++) {
    var arg = args[i2];
    if (isArrayish(arg)) {
      results = concat.call(results, slice.call(arg));
    } else {
      results.push(arg);
    }
  }
  return results;
};
swizzle$1.wrap = function(fn) {
  return function() {
    return fn(swizzle$1(arguments));
  };
};
var simpleSwizzleExports = simpleSwizzle.exports;
var colorNames = colorName;
var swizzle = simpleSwizzleExports;
var hasOwnProperty = Object.hasOwnProperty;
var reverseNames = /* @__PURE__ */ Object.create(null);
for (var name in colorNames) {
  if (hasOwnProperty.call(colorNames, name)) {
    reverseNames[colorNames[name]] = name;
  }
}
var cs = colorString$1.exports = {
  to: {},
  get: {}
};
cs.get = function(string) {
  var prefix = string.substring(0, 3).toLowerCase();
  var val;
  var model;
  switch (prefix) {
    case "hsl":
      val = cs.get.hsl(string);
      model = "hsl";
      break;
    case "hwb":
      val = cs.get.hwb(string);
      model = "hwb";
      break;
    default:
      val = cs.get.rgb(string);
      model = "rgb";
      break;
  }
  if (!val) {
    return null;
  }
  return { model, value: val };
};
cs.get.rgb = function(string) {
  if (!string) {
    return null;
  }
  var abbr = /^#([a-f0-9]{3,4})$/i;
  var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
  var rgba = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
  var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
  var keyword = /^(\w+)$/;
  var rgb = [0, 0, 0, 1];
  var match;
  var i2;
  var hexAlpha;
  if (match = string.match(hex)) {
    hexAlpha = match[2];
    match = match[1];
    for (i2 = 0; i2 < 3; i2++) {
      var i22 = i2 * 2;
      rgb[i2] = parseInt(match.slice(i22, i22 + 2), 16);
    }
    if (hexAlpha) {
      rgb[3] = parseInt(hexAlpha, 16) / 255;
    }
  } else if (match = string.match(abbr)) {
    match = match[1];
    hexAlpha = match[3];
    for (i2 = 0; i2 < 3; i2++) {
      rgb[i2] = parseInt(match[i2] + match[i2], 16);
    }
    if (hexAlpha) {
      rgb[3] = parseInt(hexAlpha + hexAlpha, 16) / 255;
    }
  } else if (match = string.match(rgba)) {
    for (i2 = 0; i2 < 3; i2++) {
      rgb[i2] = parseInt(match[i2 + 1], 0);
    }
    if (match[4]) {
      if (match[5]) {
        rgb[3] = parseFloat(match[4]) * 0.01;
      } else {
        rgb[3] = parseFloat(match[4]);
      }
    }
  } else if (match = string.match(per)) {
    for (i2 = 0; i2 < 3; i2++) {
      rgb[i2] = Math.round(parseFloat(match[i2 + 1]) * 2.55);
    }
    if (match[4]) {
      if (match[5]) {
        rgb[3] = parseFloat(match[4]) * 0.01;
      } else {
        rgb[3] = parseFloat(match[4]);
      }
    }
  } else if (match = string.match(keyword)) {
    if (match[1] === "transparent") {
      return [0, 0, 0, 0];
    }
    if (!hasOwnProperty.call(colorNames, match[1])) {
      return null;
    }
    rgb = colorNames[match[1]];
    rgb[3] = 1;
    return rgb;
  } else {
    return null;
  }
  for (i2 = 0; i2 < 3; i2++) {
    rgb[i2] = clamp(rgb[i2], 0, 255);
  }
  rgb[3] = clamp(rgb[3], 0, 1);
  return rgb;
};
cs.get.hsl = function(string) {
  if (!string) {
    return null;
  }
  var hsl = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
  var match = string.match(hsl);
  if (match) {
    var alpha = parseFloat(match[4]);
    var h = (parseFloat(match[1]) % 360 + 360) % 360;
    var s = clamp(parseFloat(match[2]), 0, 100);
    var l = clamp(parseFloat(match[3]), 0, 100);
    var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
    return [h, s, l, a];
  }
  return null;
};
cs.get.hwb = function(string) {
  if (!string) {
    return null;
  }
  var hwb = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
  var match = string.match(hwb);
  if (match) {
    var alpha = parseFloat(match[4]);
    var h = (parseFloat(match[1]) % 360 + 360) % 360;
    var w = clamp(parseFloat(match[2]), 0, 100);
    var b = clamp(parseFloat(match[3]), 0, 100);
    var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
    return [h, w, b, a];
  }
  return null;
};
cs.to.hex = function() {
  var rgba = swizzle(arguments);
  return "#" + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : "");
};
cs.to.rgb = function() {
  var rgba = swizzle(arguments);
  return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ")" : "rgba(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ", " + rgba[3] + ")";
};
cs.to.rgb.percent = function() {
  var rgba = swizzle(arguments);
  var r = Math.round(rgba[0] / 255 * 100);
  var g = Math.round(rgba[1] / 255 * 100);
  var b = Math.round(rgba[2] / 255 * 100);
  return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + r + "%, " + g + "%, " + b + "%)" : "rgba(" + r + "%, " + g + "%, " + b + "%, " + rgba[3] + ")";
};
cs.to.hsl = function() {
  var hsla = swizzle(arguments);
  return hsla.length < 4 || hsla[3] === 1 ? "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)" : "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + hsla[3] + ")";
};
cs.to.hwb = function() {
  var hwba = swizzle(arguments);
  var a = "";
  if (hwba.length >= 4 && hwba[3] !== 1) {
    a = ", " + hwba[3];
  }
  return "hwb(" + hwba[0] + ", " + hwba[1] + "%, " + hwba[2] + "%" + a + ")";
};
cs.to.keyword = function(rgb) {
  return reverseNames[rgb.slice(0, 3)];
};
function clamp(num, min, max) {
  return Math.min(Math.max(min, num), max);
}
function hexDouble(num) {
  var str = Math.round(num).toString(16).toUpperCase();
  return str.length < 2 ? "0" + str : str;
}
var colorStringExports = colorString$1.exports;
const cssKeywords = colorName;
const reverseKeywords = {};
for (const key2 of Object.keys(cssKeywords)) {
  reverseKeywords[cssKeywords[key2]] = key2;
}
const convert$2 = {
  rgb: { channels: 3, labels: "rgb" },
  hsl: { channels: 3, labels: "hsl" },
  hsv: { channels: 3, labels: "hsv" },
  hwb: { channels: 3, labels: "hwb" },
  cmyk: { channels: 4, labels: "cmyk" },
  xyz: { channels: 3, labels: "xyz" },
  lab: { channels: 3, labels: "lab" },
  lch: { channels: 3, labels: "lch" },
  hex: { channels: 1, labels: ["hex"] },
  keyword: { channels: 1, labels: ["keyword"] },
  ansi16: { channels: 1, labels: ["ansi16"] },
  ansi256: { channels: 1, labels: ["ansi256"] },
  hcg: { channels: 3, labels: ["h", "c", "g"] },
  apple: { channels: 3, labels: ["r16", "g16", "b16"] },
  gray: { channels: 1, labels: ["gray"] }
};
var conversions$2 = convert$2;
for (const model of Object.keys(convert$2)) {
  if (!("channels" in convert$2[model])) {
    throw new Error("missing channels property: " + model);
  }
  if (!("labels" in convert$2[model])) {
    throw new Error("missing channel labels property: " + model);
  }
  if (convert$2[model].labels.length !== convert$2[model].channels) {
    throw new Error("channel and label counts mismatch: " + model);
  }
  const { channels, labels } = convert$2[model];
  delete convert$2[model].channels;
  delete convert$2[model].labels;
  Object.defineProperty(convert$2[model], "channels", { value: channels });
  Object.defineProperty(convert$2[model], "labels", { value: labels });
}
convert$2.rgb.hsl = function(rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h;
  let s;
  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }
  h = Math.min(h * 60, 360);
  if (h < 0) {
    h += 360;
  }
  const l = (min + max) / 2;
  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }
  return [h, s * 100, l * 100];
};
convert$2.rgb.hsv = function(rgb) {
  let rdif;
  let gdif;
  let bdif;
  let h;
  let s;
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const v = Math.max(r, g, b);
  const diff = v - Math.min(r, g, b);
  const diffc = function(c) {
    return (v - c) / 6 / diff + 1 / 2;
  };
  if (diff === 0) {
    h = 0;
    s = 0;
  } else {
    s = diff / v;
    rdif = diffc(r);
    gdif = diffc(g);
    bdif = diffc(b);
    if (r === v) {
      h = bdif - gdif;
    } else if (g === v) {
      h = 1 / 3 + rdif - bdif;
    } else if (b === v) {
      h = 2 / 3 + gdif - rdif;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return [
    h * 360,
    s * 100,
    v * 100
  ];
};
convert$2.rgb.hwb = function(rgb) {
  const r = rgb[0];
  const g = rgb[1];
  let b = rgb[2];
  const h = convert$2.rgb.hsl(rgb)[0];
  const w = 1 / 255 * Math.min(r, Math.min(g, b));
  b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
  return [h, w * 100, b * 100];
};
convert$2.rgb.cmyk = function(rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const k = Math.min(1 - r, 1 - g, 1 - b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
};
function comparativeDistance(x, y) {
  return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
}
convert$2.rgb.keyword = function(rgb) {
  const reversed = reverseKeywords[rgb];
  if (reversed) {
    return reversed;
  }
  let currentClosestDistance = Infinity;
  let currentClosestKeyword;
  for (const keyword of Object.keys(cssKeywords)) {
    const value = cssKeywords[keyword];
    const distance = comparativeDistance(rgb, value);
    if (distance < currentClosestDistance) {
      currentClosestDistance = distance;
      currentClosestKeyword = keyword;
    }
  }
  return currentClosestKeyword;
};
convert$2.keyword.rgb = function(keyword) {
  return cssKeywords[keyword];
};
convert$2.rgb.xyz = function(rgb) {
  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255;
  r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
  g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
  b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
  return [x * 100, y * 100, z * 100];
};
convert$2.rgb.lab = function(rgb) {
  const xyz = convert$2.rgb.xyz(rgb);
  let x = xyz[0];
  let y = xyz[1];
  let z = xyz[2];
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
  y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
  z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);
  return [l, a, b];
};
convert$2.hsl.rgb = function(hsl) {
  const h = hsl[0] / 360;
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  let t2;
  let t3;
  let val;
  if (s === 0) {
    val = l * 255;
    return [val, val, val];
  }
  if (l < 0.5) {
    t2 = l * (1 + s);
  } else {
    t2 = l + s - l * s;
  }
  const t1 = 2 * l - t2;
  const rgb = [0, 0, 0];
  for (let i2 = 0; i2 < 3; i2++) {
    t3 = h + 1 / 3 * -(i2 - 1);
    if (t3 < 0) {
      t3++;
    }
    if (t3 > 1) {
      t3--;
    }
    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }
    rgb[i2] = val * 255;
  }
  return rgb;
};
convert$2.hsl.hsv = function(hsl) {
  const h = hsl[0];
  let s = hsl[1] / 100;
  let l = hsl[2] / 100;
  let smin = s;
  const lmin = Math.max(l, 0.01);
  l *= 2;
  s *= l <= 1 ? l : 2 - l;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  const v = (l + s) / 2;
  const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
  return [h, sv * 100, v * 100];
};
convert$2.hsv.rgb = function(hsv) {
  const h = hsv[0] / 60;
  const s = hsv[1] / 100;
  let v = hsv[2] / 100;
  const hi = Math.floor(h) % 6;
  const f = h - Math.floor(h);
  const p = 255 * v * (1 - s);
  const q = 255 * v * (1 - s * f);
  const t = 255 * v * (1 - s * (1 - f));
  v *= 255;
  switch (hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
};
convert$2.hsv.hsl = function(hsv) {
  const h = hsv[0];
  const s = hsv[1] / 100;
  const v = hsv[2] / 100;
  const vmin = Math.max(v, 0.01);
  let sl;
  let l;
  l = (2 - s) * v;
  const lmin = (2 - s) * vmin;
  sl = s * vmin;
  sl /= lmin <= 1 ? lmin : 2 - lmin;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
};
convert$2.hwb.rgb = function(hwb) {
  const h = hwb[0] / 360;
  let wh = hwb[1] / 100;
  let bl = hwb[2] / 100;
  const ratio = wh + bl;
  let f;
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }
  const i2 = Math.floor(6 * h);
  const v = 1 - bl;
  f = 6 * h - i2;
  if ((i2 & 1) !== 0) {
    f = 1 - f;
  }
  const n = wh + f * (v - wh);
  let r;
  let g;
  let b;
  switch (i2) {
    default:
    case 6:
    case 0:
      r = v;
      g = n;
      b = wh;
      break;
    case 1:
      r = n;
      g = v;
      b = wh;
      break;
    case 2:
      r = wh;
      g = v;
      b = n;
      break;
    case 3:
      r = wh;
      g = n;
      b = v;
      break;
    case 4:
      r = n;
      g = wh;
      b = v;
      break;
    case 5:
      r = v;
      g = wh;
      b = n;
      break;
  }
  return [r * 255, g * 255, b * 255];
};
convert$2.cmyk.rgb = function(cmyk) {
  const c = cmyk[0] / 100;
  const m = cmyk[1] / 100;
  const y = cmyk[2] / 100;
  const k = cmyk[3] / 100;
  const r = 1 - Math.min(1, c * (1 - k) + k);
  const g = 1 - Math.min(1, m * (1 - k) + k);
  const b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
};
convert$2.xyz.rgb = function(xyz) {
  const x = xyz[0] / 100;
  const y = xyz[1] / 100;
  const z = xyz[2] / 100;
  let r;
  let g;
  let b;
  r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  b = x * 0.0557 + y * -0.204 + z * 1.057;
  r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
  g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
  b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);
  return [r * 255, g * 255, b * 255];
};
convert$2.xyz.lab = function(xyz) {
  let x = xyz[0];
  let y = xyz[1];
  let z = xyz[2];
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
  y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
  z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);
  return [l, a, b];
};
convert$2.lab.xyz = function(lab) {
  const l = lab[0];
  const a = lab[1];
  const b = lab[2];
  let x;
  let y;
  let z;
  y = (l + 16) / 116;
  x = a / 500 + y;
  z = y - b / 200;
  const y2 = y ** 3;
  const x2 = x ** 3;
  const z2 = z ** 3;
  y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
  x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
  z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
  x *= 95.047;
  y *= 100;
  z *= 108.883;
  return [x, y, z];
};
convert$2.lab.lch = function(lab) {
  const l = lab[0];
  const a = lab[1];
  const b = lab[2];
  let h;
  const hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;
  if (h < 0) {
    h += 360;
  }
  const c = Math.sqrt(a * a + b * b);
  return [l, c, h];
};
convert$2.lch.lab = function(lch) {
  const l = lch[0];
  const c = lch[1];
  const h = lch[2];
  const hr = h / 360 * 2 * Math.PI;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);
  return [l, a, b];
};
convert$2.rgb.ansi16 = function(args, saturation = null) {
  const [r, g, b] = args;
  let value = saturation === null ? convert$2.rgb.hsv(args)[2] : saturation;
  value = Math.round(value / 50);
  if (value === 0) {
    return 30;
  }
  let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
  if (value === 2) {
    ansi += 60;
  }
  return ansi;
};
convert$2.hsv.ansi16 = function(args) {
  return convert$2.rgb.ansi16(convert$2.hsv.rgb(args), args[2]);
};
convert$2.rgb.ansi256 = function(args) {
  const r = args[0];
  const g = args[1];
  const b = args[2];
  if (r === g && g === b) {
    if (r < 8) {
      return 16;
    }
    if (r > 248) {
      return 231;
    }
    return Math.round((r - 8) / 247 * 24) + 232;
  }
  const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
  return ansi;
};
convert$2.ansi16.rgb = function(args) {
  let color2 = args % 10;
  if (color2 === 0 || color2 === 7) {
    if (args > 50) {
      color2 += 3.5;
    }
    color2 = color2 / 10.5 * 255;
    return [color2, color2, color2];
  }
  const mult = (~~(args > 50) + 1) * 0.5;
  const r = (color2 & 1) * mult * 255;
  const g = (color2 >> 1 & 1) * mult * 255;
  const b = (color2 >> 2 & 1) * mult * 255;
  return [r, g, b];
};
convert$2.ansi256.rgb = function(args) {
  if (args >= 232) {
    const c = (args - 232) * 10 + 8;
    return [c, c, c];
  }
  args -= 16;
  let rem;
  const r = Math.floor(args / 36) / 5 * 255;
  const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
  const b = rem % 6 / 5 * 255;
  return [r, g, b];
};
convert$2.rgb.hex = function(args) {
  const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
  const string = integer.toString(16).toUpperCase();
  return "000000".substring(string.length) + string;
};
convert$2.hex.rgb = function(args) {
  const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!match) {
    return [0, 0, 0];
  }
  let colorString2 = match[0];
  if (match[0].length === 3) {
    colorString2 = colorString2.split("").map((char) => {
      return char + char;
    }).join("");
  }
  const integer = parseInt(colorString2, 16);
  const r = integer >> 16 & 255;
  const g = integer >> 8 & 255;
  const b = integer & 255;
  return [r, g, b];
};
convert$2.rgb.hcg = function(rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const max = Math.max(Math.max(r, g), b);
  const min = Math.min(Math.min(r, g), b);
  const chroma = max - min;
  let grayscale;
  let hue;
  if (chroma < 1) {
    grayscale = min / (1 - chroma);
  } else {
    grayscale = 0;
  }
  if (chroma <= 0) {
    hue = 0;
  } else if (max === r) {
    hue = (g - b) / chroma % 6;
  } else if (max === g) {
    hue = 2 + (b - r) / chroma;
  } else {
    hue = 4 + (r - g) / chroma;
  }
  hue /= 6;
  hue %= 1;
  return [hue * 360, chroma * 100, grayscale * 100];
};
convert$2.hsl.hcg = function(hsl) {
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
  let f = 0;
  if (c < 1) {
    f = (l - 0.5 * c) / (1 - c);
  }
  return [hsl[0], c * 100, f * 100];
};
convert$2.hsv.hcg = function(hsv) {
  const s = hsv[1] / 100;
  const v = hsv[2] / 100;
  const c = s * v;
  let f = 0;
  if (c < 1) {
    f = (v - c) / (1 - c);
  }
  return [hsv[0], c * 100, f * 100];
};
convert$2.hcg.rgb = function(hcg) {
  const h = hcg[0] / 360;
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  if (c === 0) {
    return [g * 255, g * 255, g * 255];
  }
  const pure = [0, 0, 0];
  const hi = h % 1 * 6;
  const v = hi % 1;
  const w = 1 - v;
  let mg = 0;
  switch (Math.floor(hi)) {
    case 0:
      pure[0] = 1;
      pure[1] = v;
      pure[2] = 0;
      break;
    case 1:
      pure[0] = w;
      pure[1] = 1;
      pure[2] = 0;
      break;
    case 2:
      pure[0] = 0;
      pure[1] = 1;
      pure[2] = v;
      break;
    case 3:
      pure[0] = 0;
      pure[1] = w;
      pure[2] = 1;
      break;
    case 4:
      pure[0] = v;
      pure[1] = 0;
      pure[2] = 1;
      break;
    default:
      pure[0] = 1;
      pure[1] = 0;
      pure[2] = w;
  }
  mg = (1 - c) * g;
  return [
    (c * pure[0] + mg) * 255,
    (c * pure[1] + mg) * 255,
    (c * pure[2] + mg) * 255
  ];
};
convert$2.hcg.hsv = function(hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  const v = c + g * (1 - c);
  let f = 0;
  if (v > 0) {
    f = c / v;
  }
  return [hcg[0], f * 100, v * 100];
};
convert$2.hcg.hsl = function(hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  const l = g * (1 - c) + 0.5 * c;
  let s = 0;
  if (l > 0 && l < 0.5) {
    s = c / (2 * l);
  } else if (l >= 0.5 && l < 1) {
    s = c / (2 * (1 - l));
  }
  return [hcg[0], s * 100, l * 100];
};
convert$2.hcg.hwb = function(hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  const v = c + g * (1 - c);
  return [hcg[0], (v - c) * 100, (1 - v) * 100];
};
convert$2.hwb.hcg = function(hwb) {
  const w = hwb[1] / 100;
  const b = hwb[2] / 100;
  const v = 1 - b;
  const c = v - w;
  let g = 0;
  if (c < 1) {
    g = (v - c) / (1 - c);
  }
  return [hwb[0], c * 100, g * 100];
};
convert$2.apple.rgb = function(apple) {
  return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
};
convert$2.rgb.apple = function(rgb) {
  return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
};
convert$2.gray.rgb = function(args) {
  return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};
convert$2.gray.hsl = function(args) {
  return [0, 0, args[0]];
};
convert$2.gray.hsv = convert$2.gray.hsl;
convert$2.gray.hwb = function(gray) {
  return [0, 100, gray[0]];
};
convert$2.gray.cmyk = function(gray) {
  return [0, 0, 0, gray[0]];
};
convert$2.gray.lab = function(gray) {
  return [gray[0], 0, 0];
};
convert$2.gray.hex = function(gray) {
  const val = Math.round(gray[0] / 100 * 255) & 255;
  const integer = (val << 16) + (val << 8) + val;
  const string = integer.toString(16).toUpperCase();
  return "000000".substring(string.length) + string;
};
convert$2.rgb.gray = function(rgb) {
  const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
  return [val / 255 * 100];
};
const conversions$1 = conversions$2;
function buildGraph() {
  const graph = {};
  const models2 = Object.keys(conversions$1);
  for (let len = models2.length, i2 = 0; i2 < len; i2++) {
    graph[models2[i2]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  }
  return graph;
}
function deriveBFS(fromModel) {
  const graph = buildGraph();
  const queue = [fromModel];
  graph[fromModel].distance = 0;
  while (queue.length) {
    const current = queue.pop();
    const adjacents = Object.keys(conversions$1[current]);
    for (let len = adjacents.length, i2 = 0; i2 < len; i2++) {
      const adjacent = adjacents[i2];
      const node = graph[adjacent];
      if (node.distance === -1) {
        node.distance = graph[current].distance + 1;
        node.parent = current;
        queue.unshift(adjacent);
      }
    }
  }
  return graph;
}
function link(from, to) {
  return function(args) {
    return to(from(args));
  };
}
function wrapConversion(toModel, graph) {
  const path = [graph[toModel].parent, toModel];
  let fn = conversions$1[graph[toModel].parent][toModel];
  let cur = graph[toModel].parent;
  while (graph[cur].parent) {
    path.unshift(graph[cur].parent);
    fn = link(conversions$1[graph[cur].parent][cur], fn);
    cur = graph[cur].parent;
  }
  fn.conversion = path;
  return fn;
}
var route$1 = function(fromModel) {
  const graph = deriveBFS(fromModel);
  const conversion = {};
  const models2 = Object.keys(graph);
  for (let len = models2.length, i2 = 0; i2 < len; i2++) {
    const toModel = models2[i2];
    const node = graph[toModel];
    if (node.parent === null) {
      continue;
    }
    conversion[toModel] = wrapConversion(toModel, graph);
  }
  return conversion;
};
const conversions = conversions$2;
const route = route$1;
const convert$1 = {};
const models = Object.keys(conversions);
function wrapRaw(fn) {
  const wrappedFn = function(...args) {
    const arg0 = args[0];
    if (arg0 === void 0 || arg0 === null) {
      return arg0;
    }
    if (arg0.length > 1) {
      args = arg0;
    }
    return fn(args);
  };
  if ("conversion" in fn) {
    wrappedFn.conversion = fn.conversion;
  }
  return wrappedFn;
}
function wrapRounded(fn) {
  const wrappedFn = function(...args) {
    const arg0 = args[0];
    if (arg0 === void 0 || arg0 === null) {
      return arg0;
    }
    if (arg0.length > 1) {
      args = arg0;
    }
    const result = fn(args);
    if (typeof result === "object") {
      for (let len = result.length, i2 = 0; i2 < len; i2++) {
        result[i2] = Math.round(result[i2]);
      }
    }
    return result;
  };
  if ("conversion" in fn) {
    wrappedFn.conversion = fn.conversion;
  }
  return wrappedFn;
}
models.forEach((fromModel) => {
  convert$1[fromModel] = {};
  Object.defineProperty(convert$1[fromModel], "channels", { value: conversions[fromModel].channels });
  Object.defineProperty(convert$1[fromModel], "labels", { value: conversions[fromModel].labels });
  const routes2 = route(fromModel);
  const routeModels = Object.keys(routes2);
  routeModels.forEach((toModel) => {
    const fn = routes2[toModel];
    convert$1[fromModel][toModel] = wrapRounded(fn);
    convert$1[fromModel][toModel].raw = wrapRaw(fn);
  });
});
var colorConvert = convert$1;
const colorString = colorStringExports;
const convert = colorConvert;
const skippedModels = [
  // To be honest, I don't really feel like keyword belongs in color convert, but eh.
  "keyword",
  // Gray conflicts with some method names, and has its own method defined.
  "gray",
  // Shouldn't really be in color-convert either...
  "hex"
];
const hashedModelKeys = {};
for (const model of Object.keys(convert)) {
  hashedModelKeys[[...convert[model].labels].sort().join("")] = model;
}
const limiters = {};
function Color(object, model) {
  if (!(this instanceof Color)) {
    return new Color(object, model);
  }
  if (model && model in skippedModels) {
    model = null;
  }
  if (model && !(model in convert)) {
    throw new Error("Unknown model: " + model);
  }
  let i2;
  let channels;
  if (object == null) {
    this.model = "rgb";
    this.color = [0, 0, 0];
    this.valpha = 1;
  } else if (object instanceof Color) {
    this.model = object.model;
    this.color = [...object.color];
    this.valpha = object.valpha;
  } else if (typeof object === "string") {
    const result = colorString.get(object);
    if (result === null) {
      throw new Error("Unable to parse color from string: " + object);
    }
    this.model = result.model;
    channels = convert[this.model].channels;
    this.color = result.value.slice(0, channels);
    this.valpha = typeof result.value[channels] === "number" ? result.value[channels] : 1;
  } else if (object.length > 0) {
    this.model = model || "rgb";
    channels = convert[this.model].channels;
    const newArray = Array.prototype.slice.call(object, 0, channels);
    this.color = zeroArray(newArray, channels);
    this.valpha = typeof object[channels] === "number" ? object[channels] : 1;
  } else if (typeof object === "number") {
    this.model = "rgb";
    this.color = [
      object >> 16 & 255,
      object >> 8 & 255,
      object & 255
    ];
    this.valpha = 1;
  } else {
    this.valpha = 1;
    const keys2 = Object.keys(object);
    if ("alpha" in object) {
      keys2.splice(keys2.indexOf("alpha"), 1);
      this.valpha = typeof object.alpha === "number" ? object.alpha : 0;
    }
    const hashedKeys = keys2.sort().join("");
    if (!(hashedKeys in hashedModelKeys)) {
      throw new Error("Unable to parse color from object: " + JSON.stringify(object));
    }
    this.model = hashedModelKeys[hashedKeys];
    const { labels } = convert[this.model];
    const color2 = [];
    for (i2 = 0; i2 < labels.length; i2++) {
      color2.push(object[labels[i2]]);
    }
    this.color = zeroArray(color2);
  }
  if (limiters[this.model]) {
    channels = convert[this.model].channels;
    for (i2 = 0; i2 < channels; i2++) {
      const limit = limiters[this.model][i2];
      if (limit) {
        this.color[i2] = limit(this.color[i2]);
      }
    }
  }
  this.valpha = Math.max(0, Math.min(1, this.valpha));
  if (Object.freeze) {
    Object.freeze(this);
  }
}
Color.prototype = {
  toString() {
    return this.string();
  },
  toJSON() {
    return this[this.model]();
  },
  string(places) {
    let self2 = this.model in colorString.to ? this : this.rgb();
    self2 = self2.round(typeof places === "number" ? places : 1);
    const args = self2.valpha === 1 ? self2.color : [...self2.color, this.valpha];
    return colorString.to[self2.model](args);
  },
  percentString(places) {
    const self2 = this.rgb().round(typeof places === "number" ? places : 1);
    const args = self2.valpha === 1 ? self2.color : [...self2.color, this.valpha];
    return colorString.to.rgb.percent(args);
  },
  array() {
    return this.valpha === 1 ? [...this.color] : [...this.color, this.valpha];
  },
  object() {
    const result = {};
    const { channels } = convert[this.model];
    const { labels } = convert[this.model];
    for (let i2 = 0; i2 < channels; i2++) {
      result[labels[i2]] = this.color[i2];
    }
    if (this.valpha !== 1) {
      result.alpha = this.valpha;
    }
    return result;
  },
  unitArray() {
    const rgb = this.rgb().color;
    rgb[0] /= 255;
    rgb[1] /= 255;
    rgb[2] /= 255;
    if (this.valpha !== 1) {
      rgb.push(this.valpha);
    }
    return rgb;
  },
  unitObject() {
    const rgb = this.rgb().object();
    rgb.r /= 255;
    rgb.g /= 255;
    rgb.b /= 255;
    if (this.valpha !== 1) {
      rgb.alpha = this.valpha;
    }
    return rgb;
  },
  round(places) {
    places = Math.max(places || 0, 0);
    return new Color([...this.color.map(roundToPlace(places)), this.valpha], this.model);
  },
  alpha(value) {
    if (value !== void 0) {
      return new Color([...this.color, Math.max(0, Math.min(1, value))], this.model);
    }
    return this.valpha;
  },
  // Rgb
  red: getset("rgb", 0, maxfn(255)),
  green: getset("rgb", 1, maxfn(255)),
  blue: getset("rgb", 2, maxfn(255)),
  hue: getset(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, (value) => (value % 360 + 360) % 360),
  saturationl: getset("hsl", 1, maxfn(100)),
  lightness: getset("hsl", 2, maxfn(100)),
  saturationv: getset("hsv", 1, maxfn(100)),
  value: getset("hsv", 2, maxfn(100)),
  chroma: getset("hcg", 1, maxfn(100)),
  gray: getset("hcg", 2, maxfn(100)),
  white: getset("hwb", 1, maxfn(100)),
  wblack: getset("hwb", 2, maxfn(100)),
  cyan: getset("cmyk", 0, maxfn(100)),
  magenta: getset("cmyk", 1, maxfn(100)),
  yellow: getset("cmyk", 2, maxfn(100)),
  black: getset("cmyk", 3, maxfn(100)),
  x: getset("xyz", 0, maxfn(95.047)),
  y: getset("xyz", 1, maxfn(100)),
  z: getset("xyz", 2, maxfn(108.833)),
  l: getset("lab", 0, maxfn(100)),
  a: getset("lab", 1),
  b: getset("lab", 2),
  keyword(value) {
    if (value !== void 0) {
      return new Color(value);
    }
    return convert[this.model].keyword(this.color);
  },
  hex(value) {
    if (value !== void 0) {
      return new Color(value);
    }
    return colorString.to.hex(this.rgb().round().color);
  },
  hexa(value) {
    if (value !== void 0) {
      return new Color(value);
    }
    const rgbArray = this.rgb().round().color;
    let alphaHex = Math.round(this.valpha * 255).toString(16).toUpperCase();
    if (alphaHex.length === 1) {
      alphaHex = "0" + alphaHex;
    }
    return colorString.to.hex(rgbArray) + alphaHex;
  },
  rgbNumber() {
    const rgb = this.rgb().color;
    return (rgb[0] & 255) << 16 | (rgb[1] & 255) << 8 | rgb[2] & 255;
  },
  luminosity() {
    const rgb = this.rgb().color;
    const lum = [];
    for (const [i2, element] of rgb.entries()) {
      const chan = element / 255;
      lum[i2] = chan <= 0.04045 ? chan / 12.92 : ((chan + 0.055) / 1.055) ** 2.4;
    }
    return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
  },
  contrast(color2) {
    const lum1 = this.luminosity();
    const lum2 = color2.luminosity();
    if (lum1 > lum2) {
      return (lum1 + 0.05) / (lum2 + 0.05);
    }
    return (lum2 + 0.05) / (lum1 + 0.05);
  },
  level(color2) {
    const contrastRatio = this.contrast(color2);
    if (contrastRatio >= 7) {
      return "AAA";
    }
    return contrastRatio >= 4.5 ? "AA" : "";
  },
  isDark() {
    const rgb = this.rgb().color;
    const yiq = (rgb[0] * 2126 + rgb[1] * 7152 + rgb[2] * 722) / 1e4;
    return yiq < 128;
  },
  isLight() {
    return !this.isDark();
  },
  negate() {
    const rgb = this.rgb();
    for (let i2 = 0; i2 < 3; i2++) {
      rgb.color[i2] = 255 - rgb.color[i2];
    }
    return rgb;
  },
  lighten(ratio) {
    const hsl = this.hsl();
    hsl.color[2] += hsl.color[2] * ratio;
    return hsl;
  },
  darken(ratio) {
    const hsl = this.hsl();
    hsl.color[2] -= hsl.color[2] * ratio;
    return hsl;
  },
  saturate(ratio) {
    const hsl = this.hsl();
    hsl.color[1] += hsl.color[1] * ratio;
    return hsl;
  },
  desaturate(ratio) {
    const hsl = this.hsl();
    hsl.color[1] -= hsl.color[1] * ratio;
    return hsl;
  },
  whiten(ratio) {
    const hwb = this.hwb();
    hwb.color[1] += hwb.color[1] * ratio;
    return hwb;
  },
  blacken(ratio) {
    const hwb = this.hwb();
    hwb.color[2] += hwb.color[2] * ratio;
    return hwb;
  },
  grayscale() {
    const rgb = this.rgb().color;
    const value = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
    return Color.rgb(value, value, value);
  },
  fade(ratio) {
    return this.alpha(this.valpha - this.valpha * ratio);
  },
  opaquer(ratio) {
    return this.alpha(this.valpha + this.valpha * ratio);
  },
  rotate(degrees) {
    const hsl = this.hsl();
    let hue = hsl.color[0];
    hue = (hue + degrees) % 360;
    hue = hue < 0 ? 360 + hue : hue;
    hsl.color[0] = hue;
    return hsl;
  },
  mix(mixinColor, weight) {
    if (!mixinColor || !mixinColor.rgb) {
      throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
    }
    const color1 = mixinColor.rgb();
    const color2 = this.rgb();
    const p = weight === void 0 ? 0.5 : weight;
    const w = 2 * p - 1;
    const a = color1.alpha() - color2.alpha();
    const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
    const w2 = 1 - w1;
    return Color.rgb(
      w1 * color1.red() + w2 * color2.red(),
      w1 * color1.green() + w2 * color2.green(),
      w1 * color1.blue() + w2 * color2.blue(),
      color1.alpha() * p + color2.alpha() * (1 - p)
    );
  }
};
for (const model of Object.keys(convert)) {
  if (skippedModels.includes(model)) {
    continue;
  }
  const { channels } = convert[model];
  Color.prototype[model] = function(...args) {
    if (this.model === model) {
      return new Color(this);
    }
    if (args.length > 0) {
      return new Color(args, model);
    }
    return new Color([...assertArray(convert[this.model][model].raw(this.color)), this.valpha], model);
  };
  Color[model] = function(...args) {
    let color2 = args[0];
    if (typeof color2 === "number") {
      color2 = zeroArray(args, channels);
    }
    return new Color(color2, model);
  };
}
function roundTo(number, places) {
  return Number(number.toFixed(places));
}
function roundToPlace(places) {
  return function(number) {
    return roundTo(number, places);
  };
}
function getset(model, channel, modifier) {
  model = Array.isArray(model) ? model : [model];
  for (const m of model) {
    (limiters[m] || (limiters[m] = []))[channel] = modifier;
  }
  model = model[0];
  return function(value) {
    let result;
    if (value !== void 0) {
      if (modifier) {
        value = modifier(value);
      }
      result = this[model]();
      result.color[channel] = value;
      return result;
    }
    result = this[model]().color[channel];
    if (modifier) {
      result = modifier(result);
    }
    return result;
  };
}
function maxfn(max) {
  return function(v) {
    return Math.max(0, Math.min(max, v));
  };
}
function assertArray(value) {
  return Array.isArray(value) ? value : [value];
}
function zeroArray(array, length) {
  for (let i2 = 0; i2 < length; i2++) {
    if (typeof array[i2] !== "number") {
      array[i2] = 0;
    }
  }
  return array;
}
var color = Color;
const Color$1 = /* @__PURE__ */ getDefaultExportFromCjs(color);
const formats = ["hex", "rgb", "hsl"];
function getFormat(format) {
  if (!format || formats.indexOf(format) < 0) {
    return "hex";
  }
  return format;
}
const getColorString = function(color2, format) {
  const innerFormat = getFormat(format);
  if (innerFormat === "hex") {
    return color2[innerFormat]();
  }
  return color2[innerFormat]().round().string();
};
function colorPalette(originColor, i2, format) {
  const color2 = Color$1(originColor);
  const h = color2.hue();
  const s = color2.saturationv();
  const v = color2.value();
  const hueStep = 2;
  const maxSaturationStep = 100;
  const minSaturationStep = 9;
  const maxValue = 100;
  const minValue = 30;
  function getNewHue(isLight2, i3) {
    let hue;
    if (h >= 60 && h <= 240) {
      hue = isLight2 ? h - hueStep * i3 : h + hueStep * i3;
    } else {
      hue = isLight2 ? h + hueStep * i3 : h - hueStep * i3;
    }
    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }
    return Math.round(hue);
  }
  function getNewSaturation(isLight2, i3) {
    let newSaturation;
    if (isLight2) {
      newSaturation = s <= minSaturationStep ? s : s - (s - minSaturationStep) / 5 * i3;
    } else {
      newSaturation = s + (maxSaturationStep - s) / 4 * i3;
    }
    return newSaturation;
  }
  function getNewValue(isLight2, i3) {
    return isLight2 ? v + (maxValue - v) / 5 * i3 : v <= minValue ? v : v - (v - minValue) / 4 * i3;
  }
  const isLight = i2 < 6;
  const index2 = isLight ? 6 - i2 : i2 - 6;
  const retColor = i2 === 6 ? color2 : Color$1({
    h: getNewHue(isLight, index2),
    s: getNewSaturation(isLight, index2),
    v: getNewValue(isLight, index2)
  });
  return getColorString(retColor, format);
}
function colorPaletteDark(originColor, i2, format) {
  const lightColor = Color$1(colorPalette(originColor, 10 - i2 + 1));
  const originBaseColor = Color$1(originColor);
  const originBaseHue = originBaseColor.hue();
  const originBaseSaturation = originBaseColor.saturationv();
  const baseColor = Color$1({
    h: originBaseColor.hue(),
    s: getNewSaturation(6),
    v: originBaseColor.value()
  });
  const baseSaturation = baseColor.saturationv();
  const step = Math.ceil((baseSaturation - 9) / 4);
  const step1to5 = Math.ceil((100 - baseSaturation) / 5);
  function getNewSaturation(_index) {
    if (_index < 6) {
      return baseSaturation + (6 - _index) * step1to5;
    }
    if (_index === 6) {
      if (originBaseHue >= 0 && originBaseHue < 50) {
        return originBaseSaturation - 15;
      }
      if (originBaseHue >= 50 && originBaseHue < 191) {
        return originBaseSaturation - 20;
      }
      if (originBaseHue >= 191 && originBaseHue <= 360) {
        return originBaseSaturation - 15;
      }
    }
    return baseSaturation - step * (_index - 6);
  }
  const retColor = Color$1({
    h: lightColor.hue(),
    s: getNewSaturation(i2),
    v: lightColor.value()
  });
  return getColorString(retColor, format);
}
function generate(color2, options2 = {}) {
  const { dark, list, index: index2 = 6, format = "hex" } = options2;
  if (list) {
    const list2 = [];
    const func = dark ? colorPaletteDark : colorPalette;
    for (let i2 = 1; i2 <= 10; i2++) {
      list2.push(func(color2, i2, format));
    }
    return list2;
  }
  return dark ? colorPaletteDark(color2, index2, format) : colorPalette(color2, index2, format);
}
function setThemeColor(color2, name2 = "primary") {
  setTheme({
    color: color2,
    name: name2,
    dark: true
  });
  setTheme({
    color: color2,
    name: name2,
    dark: false
  });
}
function setTheme({ color: color2, dark, name: name2 }) {
  const str = [];
  const idPre = dark ? `__dark` : `__light`;
  const id = `${idPre}_${name2}_theme`;
  const themeStyle = document.createElement("style");
  themeStyle.setAttribute("id", id);
  const arr = generate(color2, {
    dark,
    list: true,
    // 'hex' | 'rgb' | 'hsl'
    format: "rgb"
  });
  for (let i2 = 0; i2 < arr.length; i2++) {
    const item = arr[i2];
    const cur = item.replace("rgb(", "").replace(")", "");
    str.push(`--${name2}-${i2 + 1}: ${cur};`);
  }
  const themeCss = dark ? `body[arco-theme='dark']` : "body";
  themeStyle.innerHTML = `${themeCss}{
 ${str.join("\n")} 
}`;
  const el = document.querySelector(`#${id}`);
  if (el)
    el.parentElement.removeChild(el);
  document.body.appendChild(themeStyle);
}
const isDev = false;
console.log("x isDev:", isDev);
const time = 60 * 60 * 1e3 * 24;
function setSessionData(key2, str) {
  sessionStorage.setItem(key2, str, time);
}
function sleep(time2 = 4) {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove();
    }, time2);
  });
}
function addJs(url, jsId) {
  return addElToHead(url, jsId);
}
const addElToHead = (url, jsId) => {
  return new Promise((reslove, reject) => {
    let ele = null;
    if (url.indexOf(".js") > 0) {
      ele = document.createElement("script");
      ele.type = "module";
      if (jsId)
        ele.id = jsId;
    } else if (url.indexOf(".css") > 0) {
      ele = document.createElement("link");
      ele.type = "text/css";
      ele.rel = "stylesheet";
    }
    if (!ele) {
      reject(`url [${url}] type error`);
      return;
    }
    ele.onload = function() {
      ele.onload = null;
      ele.onerror = null;
      reslove("");
    };
    ele.onerror = function() {
      ele.onload = null;
      ele.onerror = null;
      reject(`url:[${url}] loadjs error`);
    };
    if (url.indexOf(".js") > 0) {
      ele.src = url;
    } else {
      ele.href = url;
    }
    document.head.appendChild(ele);
  });
};
function login(data) {
  return request({
    url: `/api/user/login`,
    method: "post",
    data
  });
}
function getUserInfo() {
  return request({
    url: `/api/user/getUserInfo`,
    method: "post"
  });
}
function changeLang(data) {
  return request({
    url: `/api/user/changeLang`,
    method: "post",
    data
  });
}
function changeTheme(data) {
  return request({
    url: `/api/user/changeTheme`,
    method: "post",
    data
  });
}
await Promise.all([window.__OSL.import("pinia"), window.__OSL.import("vue-i18n"), window.__OSL.import("vue")]);
const { defineStore: defineStore$1 } = window.__OSL.getModule("pinia");
const { useI18n: useI18n$1 } = window.__OSL.getModule("vue-i18n");
const { watchEffect, watch: watch$2 } = window.__OSL.getModule("vue");
function addCss(url) {
  const ele = document.createElement("link");
  ele.type = "text/css";
  ele.rel = "stylesheet";
  ele.href = url;
  document.head.appendChild(ele);
}
function getAppNameByUrl() {
  const arr = location.hash.split("/");
  const appName = arr[1] ?? "";
  if (!appName)
    return "";
  return appName;
}
let hostMap = {};
function loadHostMap() {
  try {
    let str = localStorage.getItem("hostMap");
    if (str) {
      hostMap = JSON.parse(str);
    }
  } catch (error) {
  }
}
loadHostMap();
const useLoadApp = defineStore$1("loadAppStore", () => {
  const appScript = {};
  console.log("xx loadAppStore init ");
  const { mergeLocaleMessage, locale } = useI18n$1();
  async function loadApp(name2) {
    if (appScript[name2])
      return;
    let host = hostMap[name2] ?? "";
    let entry = "";
    if (host) {
      entry = host;
      let subAppJsUrl = `${host}/src/index.js`;
      const subRes = await __vitePreload(() => import(
        /* @vite-ignore */
        subAppJsUrl
      ), true ? [] : void 0, import.meta.url);
      const subApp = await subRes.default();
      appScript[name2] = subApp;
      initApp(subApp);
    } else {
      if (window.__XDP_DEV_TYPE === "app") {
        host = window.__XDP_DEV_SOL_HOST;
      } else {
        host = "";
      }
      entry = `${host}/v3/app/${name2}`;
      const res = await fetch(`${entry}/manifest.json?t=${(/* @__PURE__ */ new Date()).getTime()}`).catch((error) => {
        console.log(`subapp [${name2}] not find`, error);
      });
      if (!res)
        return;
      console.log("x fetch entry ", res);
      const manifest = await res.json();
      console.log("x fetch manifest ", manifest);
      let subEntry = null;
      for (const key2 in manifest) {
        const item = manifest[key2];
        if (item.isEntry) {
          subEntry = item;
          break;
        }
      }
      if (!subEntry)
        return;
      const subAppJsUrl = `${entry}/${subEntry.file}`;
      if (subEntry.css) {
        for (const css of subEntry.css) {
          const cssUrl = `${entry}/${css}`;
          addCss(cssUrl);
        }
      }
      const subRes = await __vitePreload(() => import(
        /* @vite-ignore */
        subAppJsUrl
      ), true ? [] : void 0, import.meta.url);
      const subApp = await subRes.default();
      appScript[name2] = subApp;
      initApp(subApp);
    }
  }
  function initApp(subApp) {
    addRoute(subApp.routes);
    push("");
    const appI18n = subApp.i18n;
    if (typeof appI18n === "function") {
      const lang = locale.value;
      if (lang) {
        appI18n(lang).then((i18n2) => {
          mergeLocaleMessage(lang, i18n2);
        });
      }
    } else {
      for (let lang in appI18n) {
        mergeLocaleMessage(lang, appI18n[lang]);
      }
    }
  }
  watchEffect(() => {
    const lang = locale.value;
    if (!lang)
      return;
    for (let key2 in appScript) {
      const subApp = appScript[key2];
      const appI18n = subApp.i18n;
      if (typeof appI18n === "function") {
        appI18n(lang).then((i18n2) => {
          mergeLocaleMessage(lang, i18n2);
        });
      }
    }
  });
  const hashChange = debounce(function() {
    const appName = getAppNameByUrl();
    console.log("x urlChange appName:", appName);
    if (!appName) {
      router.push("/home");
      return;
    }
    if (["about", "home"].includes(appName))
      return;
    loadApp(appName);
  }, 20);
  watch$2(
    () => router.currentRoute.value.fullPath,
    (url) => {
      if (!url)
        return;
      console.log("x urlChange currentRoute:", url);
      hashChange();
    }
  );
});
await Promise.all([window.__OSL.import("pinia"), window.__OSL.import("vue-i18n"), window.__OSL.import("xdp/ui/message"), window.__OSL.import("vue")]);
const { defineStore } = window.__OSL.getModule("pinia");
const { useI18n } = window.__OSL.getModule("vue-i18n");
const { Message: Message$1 } = window.__OSL.getModule("xdp/ui/message");
const { reactive: reactive$2, watchPostEffect: watchPostEffect$2, watch: watch$1 } = window.__OSL.getModule("vue");
let allRequestClose = null;
function hideAjaxLoading() {
  if (allRequestClose) {
    allRequestClose.close();
    allRequestClose = null;
  }
}
function showAjaxLoading() {
  if (!allRequestClose) {
    allRequestClose = Message$1.loading({ content: `loading 加载中`, duration: 0, closable: true });
  }
}
function setUserToken(token2) {
  setSessionData("token", token2);
  setToken(token2);
}
function addAllRequestFn() {
  if (sessionStorage.getItem("token")) {
    setToken(sessionStorage.getItem("token"));
  }
  addInterceptorsRequest(
    function(config) {
      console.log("x-ajax-request config", config);
      showAjaxLoading();
      return config;
    },
    function(error) {
      console.log("x-ajax-request error", error);
      return Promise.reject(error);
    }
  );
  addInterceptorsResponse(
    function(response) {
      console.log("x-ajax-response ", response);
      hideAjaxLoading();
      const { config, data } = response;
      const { code, msg } = data;
      if (code !== 200) {
        Message$1.error(msg);
        return;
      }
      if (config.url === "/api/user/login") {
        setUserToken(data.token);
      }
      return data.data;
    },
    function(error) {
      console.log("x-ajax-response error", error);
      hideAjaxLoading();
      Message$1.error({ content: error.message, duration: 2e3, closable: true });
    }
  );
}
addAllRequestFn();
const useSystem = defineStore("systemStore", () => {
  console.log("xx useSystemStore init ");
  const state = reactive$2({
    xdpLoading: false,
    showLoginWin: false,
    lang: "",
    theme: "",
    primaryColor: "#165DFF",
    //蓝色 #165DFF  绿色 #18a058
    leftMenuCollapsed: false,
    uiLang: {},
    langList: [],
    // 用户信息
    userInfo: {
      _id: "",
      account: "",
      avatar: "",
      theme: "",
      name: "",
      lang: "",
      roles: [],
      // 角色
      permissionList: []
      // 权限点
    },
    menuId: "10302001",
    menus: []
  });
  watchPostEffect$2(() => {
    if (state.primaryColor) {
      setThemeColor(state.primaryColor);
    }
  });
  watch$1(
    () => state.menuId,
    (id) => {
      if (!id)
        return;
      let item = state.menus.find((r) => r.id === id);
      console.log("onItemClick item", item);
      if (!item)
        return;
      push(`${item.path}`);
    }
  );
  const { locale } = useI18n();
  function showLoading() {
    state.xdpLoading = true;
  }
  function hideLoading() {
    state.xdpLoading = false;
  }
  function setLangList(arr) {
    state.langList = arr;
  }
  async function clearToken() {
    setToken("");
    state.token = "";
    state.userInfo = {
      _id: "",
      account: "",
      avatar: "",
      theme: "",
      name: "",
      lang: "",
      roles: [],
      // 角色
      permissionList: []
      // 权限点
    };
    state.showLoginWin = true;
  }
  async function initUser() {
    await sleep(0);
    const token2 = sessionStorage.getItem("token");
    if (!token2) {
      clearToken();
      return;
    }
    const res = await getUserInfo().catch((err) => {
      console.error("getUserInfo", err);
    });
    if (!res) {
      clearToken();
      return;
    }
    console.log("x initUser res ", res);
    setUserInfo(res);
  }
  function setMenus(menus) {
    console.log("x setMenus menus ", menus);
    for (let item of menus) {
      if (!item.icon)
        item.icon = "xp-menu1";
    }
    state.menus = menus;
  }
  function setUserInfo(data) {
    state.theme = data.theme || "light";
    state.lang = data.lang || "zh_CN";
    state.userInfo = data;
    changeTheme$1(state.userInfo.theme);
    changeLang$1(state.userInfo.lang);
    setMenus(cloneDeep(state.userInfo.menus));
  }
  async function login$1({ account, password }) {
    const res = await login({ account, password });
    if (!res)
      return;
    setUserInfo(res);
    return res;
  }
  function logout() {
    setUserToken("");
    clearToken();
  }
  function changeLang$1(rlang) {
    let lang = rlang;
    if (!lang)
      return;
    if (locale.value === lang)
      return;
    if (!state.langList.find((r) => r.id === lang)) {
      lang = state.langList[0].id;
    }
    state.uiLang = uiI18n[lang];
    locale.value = lang;
    state.lang = lang;
    if (state.userInfo.lang === lang)
      return;
    state.userInfo.lang = lang;
    changeLang({ lang });
  }
  function changeTheme$1(theme) {
    if (!theme)
      return;
    if (state.userInfo.theme === theme)
      return;
    state.theme = theme;
    state.userInfo.theme = theme;
    changeTheme({ theme });
  }
  setLangList([
    { id: "zh_CN", value: "中文" },
    { id: "en_US", value: "English" }
  ]);
  useLoadApp();
  initUser();
  return { state, showLoading, hideLoading, login: login$1, logout, changeLang: changeLang$1, changeTheme: changeTheme$1, setLangList };
});
const dfaUrl = "" + new URL("df-avatar-b9a54527.png", import.meta.url).href;
const index_vue_vue_type_style_index_0_lang$1 = "";
await Promise.all([window.__OSL.import("xdp/ui/theme-button"), window.__OSL.import("xdp/ui/avatar"), window.__OSL.import("xdp/ui/dropdown"), window.__OSL.import("vue")]);
const { ThemeButton } = window.__OSL.getModule("xdp/ui/theme-button");
const { Avatar } = window.__OSL.getModule("xdp/ui/avatar");
const { Doption } = window.__OSL.getModule("xdp/ui/dropdown");
const { Dropdown } = window.__OSL.getModule("xdp/ui/dropdown");
const { computed: computed$1, ref: ref$3, reactive: reactive$1 } = window.__OSL.getModule("vue");
const { resolveComponent: _resolveComponent$3, createVNode: _createVNode$4, createElementVNode: _createElementVNode$3, toDisplayString: _toDisplayString$2, createTextVNode: _createTextVNode$2, renderList: _renderList$2, Fragment: _Fragment$2, openBlock: _openBlock$7, createElementBlock: _createElementBlock$4, withCtx: _withCtx$5, createBlock: _createBlock$5, unref: _unref$4, createCommentVNode: _createCommentVNode$1 } = window.__OSL.getModule("vue");
const _hoisted_1$4 = { class: "logo" };
const _hoisted_2$1 = { class: "title" };
const _hoisted_3$1 = { class: "right-box" };
const _hoisted_4 = { class: "x-dropdown-btn" };
const _hoisted_5 = { class: "x-dropdown-btn" };
const _hoisted_6 = { class: "x-dropdown-btn" };
const _hoisted_7 = ["src"];
const _hoisted_8 = ["src"];
const __default__$3 = {
  components: {
    XDropdown: Dropdown,
    XDoption: Doption,
    XThemeButton: ThemeButton,
    XAvatar: Avatar
  }
};
const _sfc_main$7 = /* @__PURE__ */ Object.assign(__default__$3, {
  __name: "index",
  setup(__props) {
    console.log("x dfaUrl", dfaUrl);
    const langVisible = ref$3(false);
    const { state: systemState, logout, changeTheme: changeTheme2, changeLang: changeLang2 } = useSystem();
    const refMain = ref$3(null);
    const data = reactive$1({
      appMenuVisible: false,
      headerHeight: 0,
      menuId: "",
      meunList: [
        { id: 1, link: "/home", value: "portal home" },
        { id: 2, link: "/about", value: "portal about" },
        { id: 11, link: "/xdp-t1", value: "xt1 home" },
        { id: 12, link: "/xdp-t1/about", value: "xt1 about" },
        { id: 21, link: "/xdp-t2", value: "xt2 home" },
        { id: 22, link: "/xdp-t2/about", value: "xt2 about" },
        { id: 31, link: "/xdp-t3", value: "xt3 home" },
        { id: 32, link: "/xdp-t3/about", value: "xt3 about" }
      ],
      userMeunList: [
        {
          id: "logout",
          icon: "x-logout",
          value: "退出"
        }
      ]
    });
    const theme = computed$1({
      get: () => {
        return systemState.theme;
      },
      set: (val) => {
        changeTheme2(val);
      }
    });
    const lang = computed$1({
      get: () => {
        return systemState.lang;
      },
      set: (val) => {
        changeLang2(val);
      }
    });
    const userAvatarUrl = computed$1({
      get: () => {
        return systemState?.userInfo?.avatar ?? "";
      }
    });
    function changeAppMenuVisible() {
      const visible = data.appMenuVisible;
      if (visible) {
        data.appMenuVisible = false;
        return;
      }
      data.headerHeight = refMain.value.offsetHeight;
      data.appMenuVisible = true;
    }
    function langCommand(id) {
      if (lang.value === id)
        return;
      lang.value = id;
    }
    function userCommand(id) {
      console.log(" userCommand ", id);
      switch (id) {
        case "logout":
          logout();
          break;
      }
    }
    function menuCommand(id) {
      const item = data.meunList.find((r) => r.id === id);
      if (!item)
        return;
      data.menuId = id;
      push(item.link);
    }
    return (_ctx, _cache) => {
      const _component_icon = _resolveComponent$3("icon");
      const _component_x_doption = _resolveComponent$3("x-doption");
      const _component_x_dropdown = _resolveComponent$3("x-dropdown");
      const _component_x_theme_button = _resolveComponent$3("x-theme-button");
      const _component_x_avatar = _resolveComponent$3("x-avatar");
      return _openBlock$7(), _createElementBlock$4("div", {
        class: "portal-header",
        ref_key: "refMain",
        ref: refMain
      }, [
        _createElementVNode$3("div", _hoisted_1$4, [
          _createElementVNode$3("div", {
            class: "menu-btn",
            onClick: changeAppMenuVisible
          }, [
            _createVNode$4(_component_icon, {
              name: data.appMenuVisible ? "xp-close" : "xp-menu"
            }, null, 8, ["name"])
          ]),
          _createElementVNode$3("div", _hoisted_2$1, _toDisplayString$2(_ctx.$t("starter_title")), 1)
        ]),
        _createElementVNode$3("div", _hoisted_3$1, [
          _createVNode$4(_component_x_dropdown, { onSelect: menuCommand }, {
            content: _withCtx$5(() => [
              (_openBlock$7(true), _createElementBlock$4(_Fragment$2, null, _renderList$2(data.meunList, (item) => {
                return _openBlock$7(), _createBlock$5(_component_x_doption, {
                  key: item.id,
                  value: item.id
                }, {
                  default: _withCtx$5(() => [
                    _createTextVNode$2(_toDisplayString$2(item.value), 1)
                  ]),
                  _: 2
                }, 1032, ["value"]);
              }), 128))
            ]),
            default: _withCtx$5(() => [
              _createElementVNode$3("span", _hoisted_4, [
                _createTextVNode$2(" 跳转菜单 "),
                _createVNode$4(_component_icon, { name: "xp-arrow_down" })
              ])
            ]),
            _: 1
          }),
          _createVNode$4(_component_x_dropdown, {
            "popup-visible": langVisible.value,
            "onUpdate:popupVisible": _cache[0] || (_cache[0] = ($event) => langVisible.value = $event),
            onSelect: langCommand
          }, {
            content: _withCtx$5(() => [
              (_openBlock$7(true), _createElementBlock$4(_Fragment$2, null, _renderList$2(_unref$4(systemState).langList, (item) => {
                return _openBlock$7(), _createBlock$5(_component_x_doption, {
                  key: item.id,
                  value: item.id,
                  active: item.id === lang.value
                }, {
                  default: _withCtx$5(() => [
                    _createTextVNode$2(_toDisplayString$2(item.value), 1)
                  ]),
                  _: 2
                }, 1032, ["value", "active"]);
              }), 128))
            ]),
            default: _withCtx$5(() => [
              _createElementVNode$3("span", _hoisted_5, [
                _createVNode$4(_component_icon, { name: "xp-i18n" }),
                _createTextVNode$2(),
                _createVNode$4(_component_icon, {
                  name: langVisible.value ? "xp-arrow_up" : "xp-arrow_down"
                }, null, 8, ["name"])
              ])
            ]),
            _: 1
          }, 8, ["popup-visible"]),
          _createVNode$4(_component_x_theme_button, {
            modelValue: theme.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => theme.value = $event)
          }, null, 8, ["modelValue"]),
          _createVNode$4(_component_x_dropdown, { onSelect: userCommand }, {
            content: _withCtx$5(() => [
              (_openBlock$7(true), _createElementBlock$4(_Fragment$2, null, _renderList$2(data.userMeunList, (item) => {
                return _openBlock$7(), _createBlock$5(_component_x_doption, {
                  key: item.id,
                  value: item.id,
                  active: item.id === lang.value
                }, {
                  default: _withCtx$5(() => [
                    _createTextVNode$2(_toDisplayString$2(item.value), 1)
                  ]),
                  _: 2
                }, 1032, ["value", "active"]);
              }), 128))
            ]),
            default: _withCtx$5(() => [
              _createElementVNode$3("span", _hoisted_6, [
                _createVNode$4(_component_x_avatar, { class: "user-avatar" }, {
                  default: _withCtx$5(() => [
                    userAvatarUrl.value ? (_openBlock$7(), _createElementBlock$4("img", {
                      key: 0,
                      src: userAvatarUrl.value,
                      alt: ""
                    }, null, 8, _hoisted_7)) : (_openBlock$7(), _createElementBlock$4("img", {
                      key: 1,
                      src: _unref$4(dfaUrl),
                      alt: ""
                    }, null, 8, _hoisted_8))
                  ]),
                  _: 1
                }),
                _createVNode$4(_component_icon, { name: "xp-arrow_down" })
              ])
            ]),
            _: 1
          })
        ]),
        _createVNode$4(_sfc_main$8, {
          top: data.headerHeight,
          modelValue: data.appMenuVisible,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => data.appMenuVisible = $event)
        }, null, 8, ["top", "modelValue"])
      ], 512);
    };
  }
});
await Promise.all([window.__OSL.import("xdp/ui/menu"), window.__OSL.import("vue")]);
const { MenuItem } = window.__OSL.getModule("xdp/ui/menu");
const { SubMenu } = window.__OSL.getModule("xdp/ui/menu");
const { computed } = window.__OSL.getModule("vue");
const { renderList: _renderList$1, Fragment: _Fragment$1, openBlock: _openBlock$6, createElementBlock: _createElementBlock$3, resolveComponent: _resolveComponent$2, mergeProps: _mergeProps, createBlock: _createBlock$4, createCommentVNode: _createCommentVNode, toDisplayString: _toDisplayString$1, createTextVNode: _createTextVNode$1, withCtx: _withCtx$4 } = window.__OSL.getModule("vue");
const __default__$2 = {
  components: {
    XSubMenu: SubMenu,
    XMenuItem: MenuItem
  }
};
const _sfc_main$6 = /* @__PURE__ */ Object.assign(__default__$2, {
  name: "MenuTree",
  inheritAttrs: false
}, {
  __name: "MenuTree",
  props: {
    rootId: {
      type: String,
      default: "0"
    },
    id: {
      type: String,
      default: "0"
    },
    pid: {
      type: String,
      default: "0"
    },
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    show: {
      type: Boolean,
      default: false
    },
    treeData: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const childData = computed(() => {
      return props.treeData.filter((r) => r.pid === props.id);
    });
    return (_ctx, _cache) => {
      const _component_MenuTree = _resolveComponent$2("MenuTree", true);
      const _component_icon = _resolveComponent$2("icon");
      const _component_x_sub_menu = _resolveComponent$2("x-sub-menu");
      const _component_x_menu_item = _resolveComponent$2("x-menu-item");
      return childData.value.length > 0 ? (_openBlock$6(), _createElementBlock$3(_Fragment$1, { key: 0 }, [
        __props.id === __props.rootId ? (_openBlock$6(true), _createElementBlock$3(_Fragment$1, { key: 0 }, _renderList$1(childData.value, (item) => {
          return _openBlock$6(), _createBlock$4(_component_MenuTree, _mergeProps({
            key: item.id
          }, {
            id: item.id,
            pid: item.pid,
            title: item.title,
            icon: item.icon,
            show: item.show,
            rootId: __props.rootId,
            treeData: __props.treeData
          }), null, 16);
        }), 128)) : (_openBlock$6(), _createBlock$4(_component_x_sub_menu, { key: __props.id }, {
          icon: _withCtx$4(() => [
            __props.icon ? (_openBlock$6(), _createBlock$4(_component_icon, {
              key: 0,
              name: __props.icon
            }, null, 8, ["name"])) : _createCommentVNode("", true)
          ]),
          title: _withCtx$4(() => [
            _createTextVNode$1(_toDisplayString$1(__props.title), 1)
          ]),
          default: _withCtx$4(() => [
            (_openBlock$6(true), _createElementBlock$3(_Fragment$1, null, _renderList$1(childData.value, (item) => {
              return _openBlock$6(), _createBlock$4(_component_MenuTree, _mergeProps({
                key: item.id
              }, {
                id: item.id,
                pid: item.pid,
                title: item.title,
                icon: item.icon,
                show: item.show,
                rootId: __props.rootId,
                treeData: __props.treeData
              }), null, 16);
            }), 128))
          ]),
          _: 1
        }))
      ], 64)) : (_openBlock$6(), _createBlock$4(_component_x_menu_item, { key: __props.id }, {
        icon: _withCtx$4(() => [
          __props.icon ? (_openBlock$6(), _createBlock$4(_component_icon, {
            key: 0,
            name: __props.icon
          }, null, 8, ["name"])) : _createCommentVNode("", true)
        ]),
        default: _withCtx$4(() => [
          _createTextVNode$1(" " + _toDisplayString$1(__props.title), 1)
        ]),
        _: 1
      }));
    };
  }
});
await Promise.all([window.__OSL.import("vue")]);
const { watchPostEffect: watchPostEffect$1 } = window.__OSL.getModule("vue");
const { normalizeProps: _normalizeProps$1, guardReactiveProps: _guardReactiveProps$1, openBlock: _openBlock$5, createBlock: _createBlock$3 } = window.__OSL.getModule("vue");
const __default__$1 = {
  inheritAttrs: false
};
const _sfc_main$5 = /* @__PURE__ */ Object.assign(__default__$1, {
  __name: "index",
  props: {
    rootId: {
      type: String,
      default: "0"
    },
    menus: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    watchPostEffect$1(() => {
      console.log("ccc    props.menus   ", props.menus);
    });
    return (_ctx, _cache) => {
      return _openBlock$5(), _createBlock$3(_sfc_main$6, _normalizeProps$1(_guardReactiveProps$1({
        id: __props.rootId,
        rootId: __props.rootId,
        treeData: __props.menus
      })), null, 16);
    };
  }
});
const LeftMenu_vue_vue_type_style_index_0_scoped_faa90751_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key2, val] of props) {
    target[key2] = val;
  }
  return target;
};
await Promise.all([window.__OSL.import("xdp/ui/menu"), window.__OSL.import("vue")]);
const { Menu } = window.__OSL.getModule("xdp/ui/menu");
const { ref: ref$2, watchPostEffect } = window.__OSL.getModule("vue");
const { unref: _unref$3, normalizeProps: _normalizeProps, guardReactiveProps: _guardReactiveProps, createVNode: _createVNode$3, resolveComponent: _resolveComponent$1, withCtx: _withCtx$3, openBlock: _openBlock$4, createElementBlock: _createElementBlock$2, pushScopeId: _pushScopeId, popScopeId: _popScopeId } = window.__OSL.getModule("vue");
const _hoisted_1$3 = {
  class: "portal-aside",
  ref: "refMain"
};
const __default__ = {
  components: {
    XMenu: Menu
  }
};
const _sfc_main$4 = /* @__PURE__ */ Object.assign(__default__, {
  __name: "LeftMenu",
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const { state } = useSystem();
    const rootId = ref$2("0");
    const collapsed = ref$2(false);
    const selectedKeys = ref$2([]);
    const openKeys = ref$2([]);
    watchPostEffect(() => {
      let id = state.menuId;
      if (!id)
        return;
      let item = state.menus?.find((r) => r.id === id);
      if (!item)
        return;
      const opens = [item.pid];
      if (item.pid !== rootId.value) {
        item = state.menus?.find((r) => r.id === item.pid);
        if (item.pid !== rootId.value) {
          opens.push(item.pid);
        }
      }
      console.log("xx selected", id);
      openKeys.value = opens;
      selectedKeys.value = [id];
    });
    function onSubClick(id) {
      console.log("onSubClick key", id);
    }
    function onItemClick(id) {
      console.log("onItemClick key", id);
      if (id === state.menuId)
        return;
      state.menuId = id;
    }
    return (_ctx, _cache) => {
      const _component_x_menu = _resolveComponent$1("x-menu");
      return _openBlock$4(), _createElementBlock$2("div", _hoisted_1$3, [
        _createVNode$3(_component_x_menu, {
          style: { width: "200px" },
          "show-collapse-button": "",
          theme: _unref$3(state).theme,
          "auto-scroll-into-view": "",
          collapsed: collapsed.value,
          "onUpdate:collapsed": _cache[0] || (_cache[0] = ($event) => collapsed.value = $event),
          "selected-keys": selectedKeys.value,
          "onUpdate:selectedKeys": _cache[1] || (_cache[1] = ($event) => selectedKeys.value = $event),
          "open-keys": openKeys.value,
          "onUpdate:openKeys": _cache[2] || (_cache[2] = ($event) => openKeys.value = $event),
          onMenuItemClick: onItemClick,
          onSubMenuClick: onSubClick
        }, {
          default: _withCtx$3(() => [
            _createVNode$3(_unref$3(_sfc_main$5), _normalizeProps(_guardReactiveProps({ id: rootId.value, rootId: rootId.value, menus: _unref$3(state).menus })), null, 16)
          ]),
          _: 1
        }, 8, ["theme", "collapsed", "selected-keys", "open-keys"])
      ], 512);
    };
  }
});
const LeftMenu = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-faa90751"]]);
const MainTabs_vue_vue_type_style_index_0_lang = "";
await Promise.all([window.__OSL.import("xdp/ui/tabs"), window.__OSL.import("vue")]);
const { TabPane } = window.__OSL.getModule("xdp/ui/tabs");
const { Tabs } = window.__OSL.getModule("xdp/ui/tabs");
const { reactive, watch, ref: ref$1 } = window.__OSL.getModule("vue");
const { renderList: _renderList, Fragment: _Fragment, openBlock: _openBlock$3, createElementBlock: _createElementBlock$1, normalizeClass: _normalizeClass$1, createElementVNode: _createElementVNode$2, toDisplayString: _toDisplayString, createTextVNode: _createTextVNode, unref: _unref$2, withCtx: _withCtx$2, createBlock: _createBlock$2, createVNode: _createVNode$2 } = window.__OSL.getModule("vue");
const _hoisted_1$2 = { class: "main-tabs" };
const _sfc_main$3 = {
  __name: "MainTabs",
  setup(__props) {
    const data = reactive({
      curTab: "k1",
      routerList: [
        { id: "k1", title: "home", path: "", icon: "" },
        { id: "k2", title: "home", path: "" },
        { id: "k3", title: "home", path: "" },
        { id: "k4", title: "home", path: "" }
      ]
    });
    const routeChange = debounce(function() {
      const currentRoute = router.currentRoute.value;
      console.log("currentRoute", currentRoute);
    }, 100);
    watch(
      () => router.currentRoute.value.fullPath,
      (url) => {
        if (!url)
          return;
        routeChange();
      }
    );
    return (_ctx, _cache) => {
      return _openBlock$3(), _createElementBlock$1("div", _hoisted_1$2, [
        _createVNode$2(_unref$2(Tabs), {
          "active-key": data.curTab,
          "onUpdate:activeKey": _cache[0] || (_cache[0] = ($event) => data.curTab = $event)
        }, {
          default: _withCtx$2(() => [
            (_openBlock$3(true), _createElementBlock$1(_Fragment, null, _renderList(data.routerList, (item) => {
              return _openBlock$3(), _createBlock$2(_unref$2(TabPane), {
                key: item.id,
                value: item.id
              }, {
                label: _withCtx$2(() => [
                  _createElementVNode$2("span", {
                    class: _normalizeClass$1(["x-icon", item.icon ?? ""])
                  }, null, 2),
                  _createTextVNode(" " + _toDisplayString(item.title), 1)
                ]),
                _: 2
              }, 1032, ["value"]);
            }), 128))
          ]),
          _: 1
        }, 8, ["active-key"])
      ]);
    };
  }
};
const index_vue_vue_type_style_index_0_lang = "";
await Promise.all([window.__OSL.import("xdp/ui/dynamic"), window.__OSL.import("xdp/ui/message"), window.__OSL.import("xdp/ui/modal"), window.__OSL.import("vue")]);
const { Dynamic } = window.__OSL.getModule("xdp/ui/dynamic");
const { Message } = window.__OSL.getModule("xdp/ui/message");
const { Modal } = window.__OSL.getModule("xdp/ui/modal");
const { ref } = window.__OSL.getModule("vue");
const { unref: _unref$1, createVNode: _createVNode$1, normalizeStyle: _normalizeStyle, withCtx: _withCtx$1, openBlock: _openBlock$2, createBlock: _createBlock$1 } = window.__OSL.getModule("vue");
const { useModel: _useModel } = window.__OSL.getModule("vue");
const _sfc_main$2 = {
  __name: "index",
  props: {
    "modelValue": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const { login: login2 } = useSystem();
    const loading = ref(false);
    const visible = _useModel(__props, "modelValue");
    const LoginForm = () => __vitePreload(() => import("./LoginForm-206817d1.js"), true ? ["./LoginForm-206817d1.js","./LoginForm-bdb6c3e5.css"] : void 0, import.meta.url);
    async function submit({ account, password }) {
      loading.value = true;
      try {
        let res = await login2({ account, password });
        console.log("x onSubmit login ", res);
        if (!res)
          return;
        Message.success(`登录成功 - ${account}`);
        visible.value = false;
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _cache) => {
      return _openBlock$2(), _createBlock$1(_unref$1(Modal), {
        title: "登录",
        "title-align": "left",
        visible: visible.value,
        "onUpdate:visible": _cache[1] || (_cache[1] = ($event) => visible.value = $event),
        style: _normalizeStyle(_ctx.style),
        class: "app-login",
        closable: false,
        footer: false,
        "mask-closable": false,
        width: "400px",
        draggable: ""
      }, {
        default: _withCtx$1(() => [
          _createVNode$1(_unref$1(Dynamic), {
            is: LoginForm,
            onSubmit: submit,
            onClose: _cache[0] || (_cache[0] = ($event) => visible.value = false),
            loading: loading.value
          }, null, 8, ["loading"])
        ]),
        _: 1
      }, 8, ["visible", "style"]);
    };
  }
};
const App_vue_vue_type_style_index_0_lang = "";
await Promise.all([window.__OSL.import("xdp/ui/config-provider"), window.__OSL.import("vue")]);
const { ConfigProvider } = window.__OSL.getModule("xdp/ui/config-provider");
const { unref: _unref, createVNode: _createVNode, resolveComponent: _resolveComponent, createElementVNode: _createElementVNode$1, withCtx: _withCtx, openBlock: _openBlock$1, createBlock: _createBlock } = window.__OSL.getModule("vue");
const _hoisted_1$1 = { class: "portal-content" };
const _hoisted_2 = { class: "portal-content-main" };
const _hoisted_3 = /* @__PURE__ */ _createElementVNode$1("div", { class: "portal-footer" }, null, -1);
const _sfc_main$1 = {
  __name: "App",
  setup(__props) {
    const { state } = useSystem();
    return (_ctx, _cache) => {
      const _component_router_view = _resolveComponent("router-view");
      return _openBlock$1(), _createBlock(_unref(ConfigProvider), {
        locale: _unref(state).uiLang
      }, {
        default: _withCtx(() => [
          _createVNode(_sfc_main$7, { class: "portal-header" }),
          _createElementVNode$1("div", _hoisted_1$1, [
            _createVNode(LeftMenu),
            _createElementVNode$1("div", _hoisted_2, [
              _createVNode(_sfc_main$3),
              _createVNode(_component_router_view, { class: "portal-app-view" })
            ])
          ]),
          _hoisted_3,
          _createVNode(_sfc_main$2, {
            modelValue: _unref(state).showLoginWin,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _unref(state).showLoginWin = $event)
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["locale"]);
    };
  }
};
const MIN_PX = 5;
const xdragContext = "@@xdragContext";
const xdrag = {
  name: "xdrag",
  mounted: function(el, binding) {
    const style = getComputedStyle(el);
    if (style.position === "static")
      el.style.position = "relative";
    const dom = document.createElement("div");
    dom.className = "x-drag-ctr";
    dom.style.position = "absolute";
    dom.style.pointerEvents = "all";
    dom.style.cursor = "move";
    dom.style.zIndex = 2;
    dom.style.background = "transparent";
    dom.style.width = `100%`;
    dom.style.height = `100%`;
    dom.style.left = `0px`;
    dom.style.top = `0px`;
    dom.setAttribute("draggable", true);
    const attrs = el.attributes;
    for (let i2 = 0; i2 < attrs.length; i2++) {
      const item = attrs[i2];
      const name2 = item.name;
      if (name2.startsWith("data-")) {
        const key2 = name2.substring("data-".length);
        if (!key2.startsWith("v-")) {
          dom.setAttribute(`data-${key2}`, item.value);
        }
      }
    }
    el.appendChild(dom);
    if (!el[xdragContext])
      el[xdragContext] = {};
    el[xdragContext].dragstart = (e) => {
      const startX = e.pageX;
      const startY = e.pageY;
      el[xdragContext].startX = startX;
      el[xdragContext].startY = startY;
      el[xdragContext].lastX = startX;
      el[xdragContext].lastY = startY;
      el[xdragContext].xdraging = true;
      const pos = {
        startX,
        startY
      };
      const start = binding.value && binding.value.start;
      start && start(e, pos);
    };
    el[xdragContext].drag = throttle(function(moveEvent) {
      if (!el[xdragContext].xdraging)
        return;
      const moveX = moveEvent.pageX;
      const moveY = moveEvent.pageY;
      if (Math.abs(moveY - el[xdragContext].lastY) > MIN_PX || Math.abs(moveX - el[xdragContext].lastX) > MIN_PX) {
        el[xdragContext].lastX = moveX;
        el[xdragContext].lastY = moveY;
        const pos = {
          startX: el[xdragContext].startX,
          startY: el[xdragContext].startY,
          moveX,
          moveY,
          width: moveX - el[xdragContext].startX,
          height: moveY - el[xdragContext].startY
        };
        const move = binding.value && binding.value.move;
        move && move(moveEvent, pos);
      }
    }, 100);
    el[xdragContext].dragend = (e) => {
      el[xdragContext].xdraging = false;
      const end = binding.value && binding.value.end;
      end && end(e);
    };
    dom.addEventListener("dragstart", el[xdragContext].dragstart);
    dom.addEventListener("drag", el[xdragContext].drag);
    dom.addEventListener("dragend", el[xdragContext].dragend);
    el[xdragContext].dragCtrDom = dom;
  },
  beforeUnmount(el) {
    const dom = el[xdragContext].dragCtrDom;
    dom.removeEventListener("dragstart", el[xdragContext].dragstart);
    dom.removeEventListener("drag", el[xdragContext].drag);
    dom.removeEventListener("dragend", el[xdragContext].dragend);
    el[xdragContext].drag.cancel && el[xdragContext].drag.cancel();
    el.removeChild(el[xdragContext].dragCtrDom);
    delete el[xdragContext];
  }
};
const xContext = "@@xresizeContext";
const xresize = {
  name: "xresize",
  mounted: function(el, binding) {
    if (!el[xContext])
      el[xContext] = {};
    const rect = el.getBoundingClientRect();
    el[xContext].size = {
      width: rect.width,
      height: rect.height
    };
    el[xContext].change = debounce(function() {
      const rect2 = el.getBoundingClientRect();
      if (el[xContext].size.height !== rect2.height || el[xContext].size.width !== rect2.width) {
        el[xContext].size = {
          width: rect2.width,
          height: rect2.height
        };
        binding.value();
      }
    }, Number(binding.arg) || 50);
    el[xContext].ro = new window.ResizeObserver(el[xContext].change);
    el[xContext].ro.observe(el);
  },
  beforeUnmount(el) {
    el[xContext].ro.disconnect();
    el[xContext].change = null;
    el[xContext].ro = null;
    el[xContext].size = null;
    delete el[xContext];
  }
};
const directives = [xdrag, xresize];
const registerDirectives = (app2) => {
  for (const item of directives) {
    app2.directive(item.name, item);
  }
};
await Promise.all([window.__OSL.import("vue")]);
const { createElementVNode: _createElementVNode, normalizeClass: _normalizeClass, openBlock: _openBlock, createElementBlock: _createElementBlock } = window.__OSL.getModule("vue");
const _hoisted_1 = ["xlink:href"];
const _sfc_main = {
  __name: "index",
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("svg", {
        class: _normalizeClass(["svg-icon", __props.name]),
        "aria-hidden": "true"
      }, [
        _createElementVNode("use", {
          "xlink:href": `#${__props.name}`
        }, null, 8, _hoisted_1)
      ], 2);
    };
  }
};
const Icon = Object.assign(_sfc_main, {
  install: (app2) => {
    app2.component("icon", _sfc_main);
  }
});
var mock = { exports: {} };
(function(module, exports) {
  (function webpackUniversalModuleDefinition(root2, factory) {
    module.exports = factory();
  })(commonjsGlobal, function() {
    return (
      /******/
      function(modules) {
        var installedModules = {};
        function __webpack_require__2(moduleId) {
          if (installedModules[moduleId])
            return installedModules[moduleId].exports;
          var module2 = installedModules[moduleId] = {
            /******/
            exports: {},
            /******/
            id: moduleId,
            /******/
            loaded: false
            /******/
          };
          modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__2);
          module2.loaded = true;
          return module2.exports;
        }
        __webpack_require__2.m = modules;
        __webpack_require__2.c = installedModules;
        __webpack_require__2.p = "";
        return __webpack_require__2(0);
      }([
        /* 0 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Handler2 = __webpack_require__2(1);
          var Util2 = __webpack_require__2(3);
          var Random2 = __webpack_require__2(5);
          var RE2 = __webpack_require__2(20);
          var toJSONSchema = __webpack_require__2(23);
          var valid = __webpack_require__2(25);
          var XHR;
          if (typeof window !== "undefined")
            XHR = __webpack_require__2(27);
          /*!
              Mock - 模拟请求 & 模拟数据
              https://github.com/nuysoft/Mock
              墨智 mozhi.gyy@taobao.com nuysoft@gmail.com
          */
          var Mock2 = {
            Handler: Handler2,
            Random: Random2,
            Util: Util2,
            XHR,
            RE: RE2,
            toJSONSchema,
            valid,
            heredoc: Util2.heredoc,
            setup: function(settings) {
              return XHR.setup(settings);
            },
            _mocked: {}
          };
          Mock2.version = "1.0.1-beta3";
          if (XHR)
            XHR.Mock = Mock2;
          Mock2.mock = function(rurl, rtype, template) {
            if (arguments.length === 1) {
              return Handler2.gen(rurl);
            }
            if (arguments.length === 2) {
              template = rtype;
              rtype = void 0;
            }
            if (XHR)
              window.XMLHttpRequest = XHR;
            Mock2._mocked[rurl + (rtype || "")] = {
              rurl,
              rtype,
              template
            };
            return Mock2;
          };
          module2.exports = Mock2;
        },
        /* 1 */
        /***/
        function(module, exports, __webpack_require__) {
          var Constant = __webpack_require__(2);
          var Util = __webpack_require__(3);
          var Parser = __webpack_require__(4);
          var Random = __webpack_require__(5);
          var RE = __webpack_require__(20);
          var Handler = {
            extend: Util.extend
          };
          Handler.gen = function(template, name2, context) {
            name2 = name2 == void 0 ? "" : name2 + "";
            context = context || {};
            context = {
              // 当前访问路径，只有属性名，不包括生成规则
              path: context.path || [Constant.GUID],
              templatePath: context.templatePath || [Constant.GUID++],
              // 最终属性值的上下文
              currentContext: context.currentContext,
              // 属性值模板的上下文
              templateCurrentContext: context.templateCurrentContext || template,
              // 最终值的根
              root: context.root || context.currentContext,
              // 模板的根
              templateRoot: context.templateRoot || context.templateCurrentContext || template
            };
            var rule = Parser.parse(name2);
            var type = Util.type(template);
            var data;
            if (Handler[type]) {
              data = Handler[type]({
                // 属性值类型
                type,
                // 属性值模板
                template,
                // 属性名 + 生成规则
                name: name2,
                // 属性名
                parsedName: name2 ? name2.replace(Constant.RE_KEY, "$1") : name2,
                // 解析后的生成规则
                rule,
                // 相关上下文
                context
              });
              if (!context.root)
                context.root = data;
              return data;
            }
            return template;
          };
          Handler.extend({
            array: function(options2) {
              var result = [], i2, ii;
              if (options2.template.length === 0)
                return result;
              if (!options2.rule.parameters) {
                for (i2 = 0; i2 < options2.template.length; i2++) {
                  options2.context.path.push(i2);
                  options2.context.templatePath.push(i2);
                  result.push(
                    Handler.gen(options2.template[i2], i2, {
                      path: options2.context.path,
                      templatePath: options2.context.templatePath,
                      currentContext: result,
                      templateCurrentContext: options2.template,
                      root: options2.context.root || result,
                      templateRoot: options2.context.templateRoot || options2.template
                    })
                  );
                  options2.context.path.pop();
                  options2.context.templatePath.pop();
                }
              } else {
                if (options2.rule.min === 1 && options2.rule.max === void 0) {
                  options2.context.path.push(options2.name);
                  options2.context.templatePath.push(options2.name);
                  result = Random.pick(
                    Handler.gen(options2.template, void 0, {
                      path: options2.context.path,
                      templatePath: options2.context.templatePath,
                      currentContext: result,
                      templateCurrentContext: options2.template,
                      root: options2.context.root || result,
                      templateRoot: options2.context.templateRoot || options2.template
                    })
                  );
                  options2.context.path.pop();
                  options2.context.templatePath.pop();
                } else {
                  if (options2.rule.parameters[2]) {
                    options2.template.__order_index = options2.template.__order_index || 0;
                    options2.context.path.push(options2.name);
                    options2.context.templatePath.push(options2.name);
                    result = Handler.gen(options2.template, void 0, {
                      path: options2.context.path,
                      templatePath: options2.context.templatePath,
                      currentContext: result,
                      templateCurrentContext: options2.template,
                      root: options2.context.root || result,
                      templateRoot: options2.context.templateRoot || options2.template
                    })[options2.template.__order_index % options2.template.length];
                    options2.template.__order_index += +options2.rule.parameters[2];
                    options2.context.path.pop();
                    options2.context.templatePath.pop();
                  } else {
                    for (i2 = 0; i2 < options2.rule.count; i2++) {
                      for (ii = 0; ii < options2.template.length; ii++) {
                        options2.context.path.push(result.length);
                        options2.context.templatePath.push(ii);
                        result.push(
                          Handler.gen(options2.template[ii], result.length, {
                            path: options2.context.path,
                            templatePath: options2.context.templatePath,
                            currentContext: result,
                            templateCurrentContext: options2.template,
                            root: options2.context.root || result,
                            templateRoot: options2.context.templateRoot || options2.template
                          })
                        );
                        options2.context.path.pop();
                        options2.context.templatePath.pop();
                      }
                    }
                  }
                }
              }
              return result;
            },
            object: function(options2) {
              var result = {}, keys2, fnKeys, key2, parsedKey, inc, i2;
              if (options2.rule.min != void 0) {
                keys2 = Util.keys(options2.template);
                keys2 = Random.shuffle(keys2);
                keys2 = keys2.slice(0, options2.rule.count);
                for (i2 = 0; i2 < keys2.length; i2++) {
                  key2 = keys2[i2];
                  parsedKey = key2.replace(Constant.RE_KEY, "$1");
                  options2.context.path.push(parsedKey);
                  options2.context.templatePath.push(key2);
                  result[parsedKey] = Handler.gen(options2.template[key2], key2, {
                    path: options2.context.path,
                    templatePath: options2.context.templatePath,
                    currentContext: result,
                    templateCurrentContext: options2.template,
                    root: options2.context.root || result,
                    templateRoot: options2.context.templateRoot || options2.template
                  });
                  options2.context.path.pop();
                  options2.context.templatePath.pop();
                }
              } else {
                keys2 = [];
                fnKeys = [];
                for (key2 in options2.template) {
                  (typeof options2.template[key2] === "function" ? fnKeys : keys2).push(key2);
                }
                keys2 = keys2.concat(fnKeys);
                for (i2 = 0; i2 < keys2.length; i2++) {
                  key2 = keys2[i2];
                  parsedKey = key2.replace(Constant.RE_KEY, "$1");
                  options2.context.path.push(parsedKey);
                  options2.context.templatePath.push(key2);
                  result[parsedKey] = Handler.gen(options2.template[key2], key2, {
                    path: options2.context.path,
                    templatePath: options2.context.templatePath,
                    currentContext: result,
                    templateCurrentContext: options2.template,
                    root: options2.context.root || result,
                    templateRoot: options2.context.templateRoot || options2.template
                  });
                  options2.context.path.pop();
                  options2.context.templatePath.pop();
                  inc = key2.match(Constant.RE_KEY);
                  if (inc && inc[2] && Util.type(options2.template[key2]) === "number") {
                    options2.template[key2] += parseInt(inc[2], 10);
                  }
                }
              }
              return result;
            },
            number: function(options2) {
              var result, parts2;
              if (options2.rule.decimal) {
                options2.template += "";
                parts2 = options2.template.split(".");
                parts2[0] = options2.rule.range ? options2.rule.count : parts2[0];
                parts2[1] = (parts2[1] || "").slice(0, options2.rule.dcount);
                while (parts2[1].length < options2.rule.dcount) {
                  parts2[1] += // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
                  parts2[1].length < options2.rule.dcount - 1 ? Random.character("number") : Random.character("123456789");
                }
                result = parseFloat(parts2.join("."), 10);
              } else {
                result = options2.rule.range && !options2.rule.parameters[2] ? options2.rule.count : options2.template;
              }
              return result;
            },
            boolean: function(options2) {
              var result;
              result = options2.rule.parameters ? Random.bool(options2.rule.min, options2.rule.max, options2.template) : options2.template;
              return result;
            },
            string: function(options2) {
              var result = "", i2, placeholders, ph, phed;
              if (options2.template.length) {
                if (options2.rule.count == void 0) {
                  result += options2.template;
                }
                for (i2 = 0; i2 < options2.rule.count; i2++) {
                  result += options2.template;
                }
                placeholders = result.match(Constant.RE_PLACEHOLDER) || [];
                for (i2 = 0; i2 < placeholders.length; i2++) {
                  ph = placeholders[i2];
                  if (/^\\/.test(ph)) {
                    placeholders.splice(i2--, 1);
                    continue;
                  }
                  phed = Handler.placeholder(ph, options2.context.currentContext, options2.context.templateCurrentContext, options2);
                  if (placeholders.length === 1 && ph === result && typeof phed !== typeof result) {
                    result = phed;
                    break;
                  }
                  result = result.replace(ph, phed);
                }
              } else {
                result = options2.rule.range ? Random.string(options2.rule.count) : options2.template;
              }
              return result;
            },
            "function": function(options2) {
              return options2.template.call(options2.context.currentContext, options2);
            },
            "regexp": function(options2) {
              var source = "";
              if (options2.rule.count == void 0) {
                source += options2.template.source;
              }
              for (var i2 = 0; i2 < options2.rule.count; i2++) {
                source += options2.template.source;
              }
              return RE.Handler.gen(
                RE.Parser.parse(
                  source
                )
              );
            }
          });
          Handler.extend({
            _all: function() {
              var re2 = {};
              for (var key2 in Random)
                re2[key2.toLowerCase()] = key2;
              return re2;
            },
            // 处理占位符，转换为最终值
            placeholder: function(placeholder, obj, templateContext, options) {
              Constant.RE_PLACEHOLDER.exec("");
              var parts = Constant.RE_PLACEHOLDER.exec(placeholder), key = parts && parts[1], lkey = key && key.toLowerCase(), okey = this._all()[lkey], params = parts && parts[2] || "";
              var pathParts = this.splitPathToArray(key);
              try {
                params = eval("(function(){ return [].splice.call(arguments, 0 ) })(" + params + ")");
              } catch (error) {
                params = parts[2].split(/,\s*/);
              }
              if (obj && key in obj)
                return obj[key];
              if (key.charAt(0) === "/" || pathParts.length > 1)
                return this.getValueByKeyPath(key, options);
              if (templateContext && typeof templateContext === "object" && key in templateContext && placeholder !== templateContext[key]) {
                templateContext[key] = Handler.gen(templateContext[key], key, {
                  currentContext: obj,
                  templateCurrentContext: templateContext
                });
                return templateContext[key];
              }
              if (!(key in Random) && !(lkey in Random) && !(okey in Random))
                return placeholder;
              for (var i = 0; i < params.length; i++) {
                Constant.RE_PLACEHOLDER.exec("");
                if (Constant.RE_PLACEHOLDER.test(params[i])) {
                  params[i] = Handler.placeholder(params[i], obj, templateContext, options);
                }
              }
              var handle = Random[key] || Random[lkey] || Random[okey];
              switch (Util.type(handle)) {
                case "array":
                  return Random.pick(handle);
                case "function":
                  handle.options = options;
                  var re = handle.apply(Random, params);
                  if (re === void 0)
                    re = "";
                  delete handle.options;
                  return re;
              }
            },
            getValueByKeyPath: function(key2, options2) {
              var originalKey = key2;
              var keyPathParts = this.splitPathToArray(key2);
              var absolutePathParts = [];
              if (key2.charAt(0) === "/") {
                absolutePathParts = [options2.context.path[0]].concat(
                  this.normalizePath(keyPathParts)
                );
              } else {
                if (keyPathParts.length > 1) {
                  absolutePathParts = options2.context.path.slice(0);
                  absolutePathParts.pop();
                  absolutePathParts = this.normalizePath(
                    absolutePathParts.concat(keyPathParts)
                  );
                }
              }
              try {
                key2 = keyPathParts[keyPathParts.length - 1];
                var currentContext = options2.context.root;
                var templateCurrentContext = options2.context.templateRoot;
                for (var i2 = 1; i2 < absolutePathParts.length - 1; i2++) {
                  currentContext = currentContext[absolutePathParts[i2]];
                  templateCurrentContext = templateCurrentContext[absolutePathParts[i2]];
                }
                if (currentContext && key2 in currentContext)
                  return currentContext[key2];
                if (templateCurrentContext && typeof templateCurrentContext === "object" && key2 in templateCurrentContext && originalKey !== templateCurrentContext[key2]) {
                  templateCurrentContext[key2] = Handler.gen(templateCurrentContext[key2], key2, {
                    currentContext,
                    templateCurrentContext
                  });
                  return templateCurrentContext[key2];
                }
              } catch (err) {
              }
              return "@" + keyPathParts.join("/");
            },
            // https://github.com/kissyteam/kissy/blob/master/src/path/src/path.js
            normalizePath: function(pathParts2) {
              var newPathParts = [];
              for (var i2 = 0; i2 < pathParts2.length; i2++) {
                switch (pathParts2[i2]) {
                  case "..":
                    newPathParts.pop();
                    break;
                  case ".":
                    break;
                  default:
                    newPathParts.push(pathParts2[i2]);
                }
              }
              return newPathParts;
            },
            splitPathToArray: function(path) {
              var parts2 = path.split(/\/+/);
              if (!parts2[parts2.length - 1])
                parts2 = parts2.slice(0, -1);
              if (!parts2[0])
                parts2 = parts2.slice(1);
              return parts2;
            }
          });
          module.exports = Handler;
        },
        /* 2 */
        /***/
        function(module2, exports2) {
          module2.exports = {
            GUID: 1,
            RE_KEY: /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/,
            RE_RANGE: /([\+\-]?\d+)-?([\+\-]?\d+)?/,
            RE_PLACEHOLDER: /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/g
            // /\\*@([^@#%&()\?\s\/\.]+)(?:\((.*?)\))?/g
            // RE_INDEX: /^index$/,
            // RE_KEY: /^key$/
          };
        },
        /* 3 */
        /***/
        function(module2, exports2) {
          var Util2 = {};
          Util2.extend = function extend() {
            var target = arguments[0] || {}, i2 = 1, length = arguments.length, options2, name2, src, copy, clone;
            if (length === 1) {
              target = this;
              i2 = 0;
            }
            for (; i2 < length; i2++) {
              options2 = arguments[i2];
              if (!options2)
                continue;
              for (name2 in options2) {
                src = target[name2];
                copy = options2[name2];
                if (target === copy)
                  continue;
                if (copy === void 0)
                  continue;
                if (Util2.isArray(copy) || Util2.isObject(copy)) {
                  if (Util2.isArray(copy))
                    clone = src && Util2.isArray(src) ? src : [];
                  if (Util2.isObject(copy))
                    clone = src && Util2.isObject(src) ? src : {};
                  target[name2] = Util2.extend(clone, copy);
                } else {
                  target[name2] = copy;
                }
              }
            }
            return target;
          };
          Util2.each = function each(obj2, iterator, context) {
            var i2, key2;
            if (this.type(obj2) === "number") {
              for (i2 = 0; i2 < obj2; i2++) {
                iterator(i2, i2);
              }
            } else if (obj2.length === +obj2.length) {
              for (i2 = 0; i2 < obj2.length; i2++) {
                if (iterator.call(context, obj2[i2], i2, obj2) === false)
                  break;
              }
            } else {
              for (key2 in obj2) {
                if (iterator.call(context, obj2[key2], key2, obj2) === false)
                  break;
              }
            }
          };
          Util2.type = function type(obj2) {
            return obj2 === null || obj2 === void 0 ? String(obj2) : Object.prototype.toString.call(obj2).match(/\[object (\w+)\]/)[1].toLowerCase();
          };
          Util2.each("String Object Array RegExp Function".split(" "), function(value) {
            Util2["is" + value] = function(obj2) {
              return Util2.type(obj2) === value.toLowerCase();
            };
          });
          Util2.isObjectOrArray = function(value) {
            return Util2.isObject(value) || Util2.isArray(value);
          };
          Util2.isNumeric = function(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
          };
          Util2.keys = function(obj2) {
            var keys2 = [];
            for (var key2 in obj2) {
              if (obj2.hasOwnProperty(key2))
                keys2.push(key2);
            }
            return keys2;
          };
          Util2.values = function(obj2) {
            var values = [];
            for (var key2 in obj2) {
              if (obj2.hasOwnProperty(key2))
                values.push(obj2[key2]);
            }
            return values;
          };
          Util2.heredoc = function heredoc(fn) {
            return fn.toString().replace(/^[^\/]+\/\*!?/, "").replace(/\*\/[^\/]+$/, "").replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "");
          };
          Util2.noop = function() {
          };
          module2.exports = Util2;
        },
        /* 4 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Constant2 = __webpack_require__2(2);
          var Random2 = __webpack_require__2(5);
          module2.exports = {
            parse: function(name2) {
              name2 = name2 == void 0 ? "" : name2 + "";
              var parameters = (name2 || "").match(Constant2.RE_KEY);
              var range = parameters && parameters[3] && parameters[3].match(Constant2.RE_RANGE);
              var min = range && range[1] && parseInt(range[1], 10);
              var max = range && range[2] && parseInt(range[2], 10);
              var count = range ? !range[2] ? parseInt(range[1], 10) : Random2.integer(min, max) : void 0;
              var decimal = parameters && parameters[4] && parameters[4].match(Constant2.RE_RANGE);
              var dmin = decimal && decimal[1] && parseInt(decimal[1], 10);
              var dmax = decimal && decimal[2] && parseInt(decimal[2], 10);
              var dcount = decimal ? !decimal[2] && parseInt(decimal[1], 10) || Random2.integer(dmin, dmax) : void 0;
              var result = {
                // 1 name, 2 inc, 3 range, 4 decimal
                parameters,
                // 1 min, 2 max
                range,
                min,
                max,
                // min-max
                count,
                // 是否有 decimal
                decimal,
                dmin,
                dmax,
                // dmin-dimax
                dcount
              };
              for (var r in result) {
                if (result[r] != void 0)
                  return result;
              }
              return {};
            }
          };
        },
        /* 5 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Util2 = __webpack_require__2(3);
          var Random2 = {
            extend: Util2.extend
          };
          Random2.extend(__webpack_require__2(6));
          Random2.extend(__webpack_require__2(7));
          Random2.extend(__webpack_require__2(8));
          Random2.extend(__webpack_require__2(10));
          Random2.extend(__webpack_require__2(13));
          Random2.extend(__webpack_require__2(15));
          Random2.extend(__webpack_require__2(16));
          Random2.extend(__webpack_require__2(17));
          Random2.extend(__webpack_require__2(14));
          Random2.extend(__webpack_require__2(19));
          module2.exports = Random2;
        },
        /* 6 */
        /***/
        function(module2, exports2) {
          module2.exports = {
            // 返回一个随机的布尔值。
            boolean: function(min, max, cur) {
              if (cur !== void 0) {
                min = typeof min !== "undefined" && !isNaN(min) ? parseInt(min, 10) : 1;
                max = typeof max !== "undefined" && !isNaN(max) ? parseInt(max, 10) : 1;
                return Math.random() > 1 / (min + max) * min ? !cur : cur;
              }
              return Math.random() >= 0.5;
            },
            bool: function(min, max, cur) {
              return this.boolean(min, max, cur);
            },
            // 返回一个随机的自然数（大于等于 0 的整数）。
            natural: function(min, max) {
              min = typeof min !== "undefined" ? parseInt(min, 10) : 0;
              max = typeof max !== "undefined" ? parseInt(max, 10) : 9007199254740992;
              return Math.round(Math.random() * (max - min)) + min;
            },
            // 返回一个随机的整数。
            integer: function(min, max) {
              min = typeof min !== "undefined" ? parseInt(min, 10) : -9007199254740992;
              max = typeof max !== "undefined" ? parseInt(max, 10) : 9007199254740992;
              return Math.round(Math.random() * (max - min)) + min;
            },
            int: function(min, max) {
              return this.integer(min, max);
            },
            // 返回一个随机的浮点数。
            float: function(min, max, dmin, dmax) {
              dmin = dmin === void 0 ? 0 : dmin;
              dmin = Math.max(Math.min(dmin, 17), 0);
              dmax = dmax === void 0 ? 17 : dmax;
              dmax = Math.max(Math.min(dmax, 17), 0);
              var ret = this.integer(min, max) + ".";
              for (var i2 = 0, dcount = this.natural(dmin, dmax); i2 < dcount; i2++) {
                ret += // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
                i2 < dcount - 1 ? this.character("number") : this.character("123456789");
              }
              return parseFloat(ret, 10);
            },
            // 返回一个随机字符。
            character: function(pool) {
              var pools = {
                lower: "abcdefghijklmnopqrstuvwxyz",
                upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                number: "0123456789",
                symbol: "!@#$%^&*()[]"
              };
              pools.alpha = pools.lower + pools.upper;
              pools["undefined"] = pools.lower + pools.upper + pools.number + pools.symbol;
              pool = pools[("" + pool).toLowerCase()] || pool;
              return pool.charAt(this.natural(0, pool.length - 1));
            },
            char: function(pool) {
              return this.character(pool);
            },
            // 返回一个随机字符串。
            string: function(pool, min, max) {
              var len;
              switch (arguments.length) {
                case 0:
                  len = this.natural(3, 7);
                  break;
                case 1:
                  len = pool;
                  pool = void 0;
                  break;
                case 2:
                  if (typeof arguments[0] === "string") {
                    len = min;
                  } else {
                    len = this.natural(pool, min);
                    pool = void 0;
                  }
                  break;
                case 3:
                  len = this.natural(min, max);
                  break;
              }
              var text = "";
              for (var i2 = 0; i2 < len; i2++) {
                text += this.character(pool);
              }
              return text;
            },
            str: function() {
              return this.string.apply(this, arguments);
            },
            // 返回一个整型数组。
            range: function(start, stop, step) {
              if (arguments.length <= 1) {
                stop = start || 0;
                start = 0;
              }
              step = arguments[2] || 1;
              start = +start;
              stop = +stop;
              step = +step;
              var len = Math.max(Math.ceil((stop - start) / step), 0);
              var idx = 0;
              var range = new Array(len);
              while (idx < len) {
                range[idx++] = start;
                start += step;
              }
              return range;
            }
          };
        },
        /* 7 */
        /***/
        function(module2, exports2) {
          var patternLetters = {
            yyyy: "getFullYear",
            yy: function(date) {
              return ("" + date.getFullYear()).slice(2);
            },
            y: "yy",
            MM: function(date) {
              var m = date.getMonth() + 1;
              return m < 10 ? "0" + m : m;
            },
            M: function(date) {
              return date.getMonth() + 1;
            },
            dd: function(date) {
              var d = date.getDate();
              return d < 10 ? "0" + d : d;
            },
            d: "getDate",
            HH: function(date) {
              var h = date.getHours();
              return h < 10 ? "0" + h : h;
            },
            H: "getHours",
            hh: function(date) {
              var h = date.getHours() % 12;
              return h < 10 ? "0" + h : h;
            },
            h: function(date) {
              return date.getHours() % 12;
            },
            mm: function(date) {
              var m = date.getMinutes();
              return m < 10 ? "0" + m : m;
            },
            m: "getMinutes",
            ss: function(date) {
              var s = date.getSeconds();
              return s < 10 ? "0" + s : s;
            },
            s: "getSeconds",
            SS: function(date) {
              var ms = date.getMilliseconds();
              return ms < 10 && "00" + ms || ms < 100 && "0" + ms || ms;
            },
            S: "getMilliseconds",
            A: function(date) {
              return date.getHours() < 12 ? "AM" : "PM";
            },
            a: function(date) {
              return date.getHours() < 12 ? "am" : "pm";
            },
            T: "getTime"
          };
          module2.exports = {
            // 日期占位符集合。
            _patternLetters: patternLetters,
            // 日期占位符正则。
            _rformat: new RegExp(function() {
              var re2 = [];
              for (var i2 in patternLetters)
                re2.push(i2);
              return "(" + re2.join("|") + ")";
            }(), "g"),
            // 格式化日期。
            _formatDate: function(date, format) {
              return format.replace(this._rformat, function creatNewSubString($0, flag) {
                return typeof patternLetters[flag] === "function" ? patternLetters[flag](date) : patternLetters[flag] in patternLetters ? creatNewSubString($0, patternLetters[flag]) : date[patternLetters[flag]]();
              });
            },
            // 生成一个随机的 Date 对象。
            _randomDate: function(min, max) {
              min = min === void 0 ? /* @__PURE__ */ new Date(0) : min;
              max = max === void 0 ? /* @__PURE__ */ new Date() : max;
              return new Date(Math.random() * (max.getTime() - min.getTime()));
            },
            // 返回一个随机的日期字符串。
            date: function(format) {
              format = format || "yyyy-MM-dd";
              return this._formatDate(this._randomDate(), format);
            },
            // 返回一个随机的时间字符串。
            time: function(format) {
              format = format || "HH:mm:ss";
              return this._formatDate(this._randomDate(), format);
            },
            // 返回一个随机的日期和时间字符串。
            datetime: function(format) {
              format = format || "yyyy-MM-dd HH:mm:ss";
              return this._formatDate(this._randomDate(), format);
            },
            // 返回当前的日期和时间字符串。
            now: function(unit, format) {
              if (arguments.length === 1) {
                if (!/year|month|day|hour|minute|second|week/.test(unit)) {
                  format = unit;
                  unit = "";
                }
              }
              unit = (unit || "").toLowerCase();
              format = format || "yyyy-MM-dd HH:mm:ss";
              var date = /* @__PURE__ */ new Date();
              switch (unit) {
                case "year":
                  date.setMonth(0);
                case "month":
                  date.setDate(1);
                case "week":
                case "day":
                  date.setHours(0);
                case "hour":
                  date.setMinutes(0);
                case "minute":
                  date.setSeconds(0);
                case "second":
                  date.setMilliseconds(0);
              }
              switch (unit) {
                case "week":
                  date.setDate(date.getDate() - date.getDay());
              }
              return this._formatDate(date, format);
            }
          };
        },
        /* 8 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          (function(module3) {
            module3.exports = {
              // 常见的广告宽高
              _adSize: [
                "300x250",
                "250x250",
                "240x400",
                "336x280",
                "180x150",
                "720x300",
                "468x60",
                "234x60",
                "88x31",
                "120x90",
                "120x60",
                "120x240",
                "125x125",
                "728x90",
                "160x600",
                "120x600",
                "300x600"
              ],
              // 常见的屏幕宽高
              _screenSize: [
                "320x200",
                "320x240",
                "640x480",
                "800x480",
                "800x480",
                "1024x600",
                "1024x768",
                "1280x800",
                "1440x900",
                "1920x1200",
                "2560x1600"
              ],
              // 常见的视频宽高
              _videoSize: ["720x480", "768x576", "1280x720", "1920x1080"],
              /*
              		        生成一个随机的图片地址。
              
              		        替代图片源
              		            http://fpoimg.com/
              		        参考自 
              		            http://rensanning.iteye.com/blog/1933310
              		            http://code.tutsplus.com/articles/the-top-8-placeholders-for-web-designers--net-19485
              		    */
              image: function(size, background, foreground, format, text) {
                if (arguments.length === 4) {
                  text = format;
                  format = void 0;
                }
                if (arguments.length === 3) {
                  text = foreground;
                  foreground = void 0;
                }
                if (!size)
                  size = this.pick(this._adSize);
                if (background && ~background.indexOf("#"))
                  background = background.slice(1);
                if (foreground && ~foreground.indexOf("#"))
                  foreground = foreground.slice(1);
                return "http://dummyimage.com/" + size + (background ? "/" + background : "") + (foreground ? "/" + foreground : "") + (format ? "." + format : "") + (text ? "&text=" + text : "");
              },
              img: function() {
                return this.image.apply(this, arguments);
              },
              /*
              		        BrandColors
              		        http://brandcolors.net/
              		        A collection of major brand color codes curated by Galen Gidman.
              		        大牌公司的颜色集合
              
              		        // 获取品牌和颜色
              		        $('h2').each(function(index, item){
              		            item = $(item)
              		            console.log('\'' + item.text() + '\'', ':', '\'' + item.next().text() + '\'', ',')
              		        })
              		    */
              _brandColors: {
                "4ormat": "#fb0a2a",
                "500px": "#02adea",
                "About.me (blue)": "#00405d",
                "About.me (yellow)": "#ffcc33",
                "Addvocate": "#ff6138",
                "Adobe": "#ff0000",
                "Aim": "#fcd20b",
                "Amazon": "#e47911",
                "Android": "#a4c639",
                "Angie's List": "#7fbb00",
                "AOL": "#0060a3",
                "Atlassian": "#003366",
                "Behance": "#053eff",
                "Big Cartel": "#97b538",
                "bitly": "#ee6123",
                "Blogger": "#fc4f08",
                "Boeing": "#0039a6",
                "Booking.com": "#003580",
                "Carbonmade": "#613854",
                "Cheddar": "#ff7243",
                "Code School": "#3d4944",
                "Delicious": "#205cc0",
                "Dell": "#3287c1",
                "Designmoo": "#e54a4f",
                "Deviantart": "#4e6252",
                "Designer News": "#2d72da",
                "Devour": "#fd0001",
                "DEWALT": "#febd17",
                "Disqus (blue)": "#59a3fc",
                "Disqus (orange)": "#db7132",
                "Dribbble": "#ea4c89",
                "Dropbox": "#3d9ae8",
                "Drupal": "#0c76ab",
                "Dunked": "#2a323a",
                "eBay": "#89c507",
                "Ember": "#f05e1b",
                "Engadget": "#00bdf6",
                "Envato": "#528036",
                "Etsy": "#eb6d20",
                "Evernote": "#5ba525",
                "Fab.com": "#dd0017",
                "Facebook": "#3b5998",
                "Firefox": "#e66000",
                "Flickr (blue)": "#0063dc",
                "Flickr (pink)": "#ff0084",
                "Forrst": "#5b9a68",
                "Foursquare": "#25a0ca",
                "Garmin": "#007cc3",
                "GetGlue": "#2d75a2",
                "Gimmebar": "#f70078",
                "GitHub": "#171515",
                "Google Blue": "#0140ca",
                "Google Green": "#16a61e",
                "Google Red": "#dd1812",
                "Google Yellow": "#fcca03",
                "Google+": "#dd4b39",
                "Grooveshark": "#f77f00",
                "Groupon": "#82b548",
                "Hacker News": "#ff6600",
                "HelloWallet": "#0085ca",
                "Heroku (light)": "#c7c5e6",
                "Heroku (dark)": "#6567a5",
                "HootSuite": "#003366",
                "Houzz": "#73ba37",
                "HTML5": "#ec6231",
                "IKEA": "#ffcc33",
                "IMDb": "#f3ce13",
                "Instagram": "#3f729b",
                "Intel": "#0071c5",
                "Intuit": "#365ebf",
                "Kickstarter": "#76cc1e",
                "kippt": "#e03500",
                "Kodery": "#00af81",
                "LastFM": "#c3000d",
                "LinkedIn": "#0e76a8",
                "Livestream": "#cf0005",
                "Lumo": "#576396",
                "Mixpanel": "#a086d3",
                "Meetup": "#e51937",
                "Nokia": "#183693",
                "NVIDIA": "#76b900",
                "Opera": "#cc0f16",
                "Path": "#e41f11",
                "PayPal (dark)": "#1e477a",
                "PayPal (light)": "#3b7bbf",
                "Pinboard": "#0000e6",
                "Pinterest": "#c8232c",
                "PlayStation": "#665cbe",
                "Pocket": "#ee4056",
                "Prezi": "#318bff",
                "Pusha": "#0f71b4",
                "Quora": "#a82400",
                "QUOTE.fm": "#66ceff",
                "Rdio": "#008fd5",
                "Readability": "#9c0000",
                "Red Hat": "#cc0000",
                "Resource": "#7eb400",
                "Rockpack": "#0ba6ab",
                "Roon": "#62b0d9",
                "RSS": "#ee802f",
                "Salesforce": "#1798c1",
                "Samsung": "#0c4da2",
                "Shopify": "#96bf48",
                "Skype": "#00aff0",
                "Snagajob": "#f47a20",
                "Softonic": "#008ace",
                "SoundCloud": "#ff7700",
                "Space Box": "#f86960",
                "Spotify": "#81b71a",
                "Sprint": "#fee100",
                "Squarespace": "#121212",
                "StackOverflow": "#ef8236",
                "Staples": "#cc0000",
                "Status Chart": "#d7584f",
                "Stripe": "#008cdd",
                "StudyBlue": "#00afe1",
                "StumbleUpon": "#f74425",
                "T-Mobile": "#ea0a8e",
                "Technorati": "#40a800",
                "The Next Web": "#ef4423",
                "Treehouse": "#5cb868",
                "Trulia": "#5eab1f",
                "Tumblr": "#34526f",
                "Twitch.tv": "#6441a5",
                "Twitter": "#00acee",
                "TYPO3": "#ff8700",
                "Ubuntu": "#dd4814",
                "Ustream": "#3388ff",
                "Verizon": "#ef1d1d",
                "Vimeo": "#86c9ef",
                "Vine": "#00a478",
                "Virb": "#06afd8",
                "Virgin Media": "#cc0000",
                "Wooga": "#5b009c",
                "WordPress (blue)": "#21759b",
                "WordPress (orange)": "#d54e21",
                "WordPress (grey)": "#464646",
                "Wunderlist": "#2b88d9",
                "XBOX": "#9bc848",
                "XING": "#126567",
                "Yahoo!": "#720e9e",
                "Yandex": "#ffcc00",
                "Yelp": "#c41200",
                "YouTube": "#c4302b",
                "Zalongo": "#5498dc",
                "Zendesk": "#78a300",
                "Zerply": "#9dcc7a",
                "Zootool": "#5e8b1d"
              },
              _brandNames: function() {
                var brands = [];
                for (var b in this._brandColors) {
                  brands.push(b);
                }
                return brands;
              },
              /*
              		        生成一段随机的 Base64 图片编码。
              
              		        https://github.com/imsky/holder
              		        Holder renders image placeholders entirely on the client side.
              
              		        dataImageHolder: function(size) {
              		            return 'holder.js/' + size
              		        },
              		    */
              dataImage: function(size, text) {
                var canvas;
                if (typeof document !== "undefined") {
                  canvas = document.createElement("canvas");
                } else {
                  var Canvas = module3.require("canvas");
                  canvas = new Canvas();
                }
                var ctx = canvas && canvas.getContext && canvas.getContext("2d");
                if (!canvas || !ctx)
                  return "";
                if (!size)
                  size = this.pick(this._adSize);
                text = text !== void 0 ? text : size;
                size = size.split("x");
                var width = parseInt(size[0], 10), height = parseInt(size[1], 10), background = this._brandColors[this.pick(this._brandNames())], foreground = "#FFF", text_height = 14, font = "sans-serif";
                canvas.width = width;
                canvas.height = height;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = background;
                ctx.fillRect(0, 0, width, height);
                ctx.fillStyle = foreground;
                ctx.font = "bold " + text_height + "px " + font;
                ctx.fillText(text, width / 2, height / 2, width);
                return canvas.toDataURL("image/png");
              }
            };
          }).call(exports2, __webpack_require__2(9)(module2));
        },
        /* 9 */
        /***/
        function(module2, exports2) {
          module2.exports = function(module3) {
            if (!module3.webpackPolyfill) {
              module3.deprecate = function() {
              };
              module3.paths = [];
              module3.children = [];
              module3.webpackPolyfill = 1;
            }
            return module3;
          };
        },
        /* 10 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Convert = __webpack_require__2(11);
          var DICT = __webpack_require__2(12);
          module2.exports = {
            // 随机生成一个有吸引力的颜色，格式为 '#RRGGBB'。
            color: function(name2) {
              if (name2 || DICT[name2])
                return DICT[name2].nicer;
              return this.hex();
            },
            // #DAC0DE
            hex: function() {
              var hsv = this._goldenRatioColor();
              var rgb = Convert.hsv2rgb(hsv);
              var hex = Convert.rgb2hex(rgb[0], rgb[1], rgb[2]);
              return hex;
            },
            // rgb(128,255,255)
            rgb: function() {
              var hsv = this._goldenRatioColor();
              var rgb = Convert.hsv2rgb(hsv);
              return "rgb(" + parseInt(rgb[0], 10) + ", " + parseInt(rgb[1], 10) + ", " + parseInt(rgb[2], 10) + ")";
            },
            // rgba(128,255,255,0.3)
            rgba: function() {
              var hsv = this._goldenRatioColor();
              var rgb = Convert.hsv2rgb(hsv);
              return "rgba(" + parseInt(rgb[0], 10) + ", " + parseInt(rgb[1], 10) + ", " + parseInt(rgb[2], 10) + ", " + Math.random().toFixed(2) + ")";
            },
            // hsl(300,80%,90%)
            hsl: function() {
              var hsv = this._goldenRatioColor();
              var hsl = Convert.hsv2hsl(hsv);
              return "hsl(" + parseInt(hsl[0], 10) + ", " + parseInt(hsl[1], 10) + ", " + parseInt(hsl[2], 10) + ")";
            },
            // http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
            // https://github.com/devongovett/color-generator/blob/master/index.js
            // 随机生成一个有吸引力的颜色。
            _goldenRatioColor: function(saturation, value) {
              this._goldenRatio = 0.618033988749895;
              this._hue = this._hue || Math.random();
              this._hue += this._goldenRatio;
              this._hue %= 1;
              if (typeof saturation !== "number")
                saturation = 0.5;
              if (typeof value !== "number")
                value = 0.95;
              return [
                this._hue * 360,
                saturation * 100,
                value * 100
              ];
            }
          };
        },
        /* 11 */
        /***/
        function(module2, exports2) {
          module2.exports = {
            rgb2hsl: function rgb2hsl(rgb) {
              var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min, h, s, l;
              if (max == min)
                h = 0;
              else if (r == max)
                h = (g - b) / delta;
              else if (g == max)
                h = 2 + (b - r) / delta;
              else if (b == max)
                h = 4 + (r - g) / delta;
              h = Math.min(h * 60, 360);
              if (h < 0)
                h += 360;
              l = (min + max) / 2;
              if (max == min)
                s = 0;
              else if (l <= 0.5)
                s = delta / (max + min);
              else
                s = delta / (2 - max - min);
              return [h, s * 100, l * 100];
            },
            rgb2hsv: function rgb2hsv(rgb) {
              var r = rgb[0], g = rgb[1], b = rgb[2], min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min, h, s, v;
              if (max === 0)
                s = 0;
              else
                s = delta / max * 1e3 / 10;
              if (max == min)
                h = 0;
              else if (r == max)
                h = (g - b) / delta;
              else if (g == max)
                h = 2 + (b - r) / delta;
              else if (b == max)
                h = 4 + (r - g) / delta;
              h = Math.min(h * 60, 360);
              if (h < 0)
                h += 360;
              v = max / 255 * 1e3 / 10;
              return [h, s, v];
            },
            hsl2rgb: function hsl2rgb(hsl) {
              var h = hsl[0] / 360, s = hsl[1] / 100, l = hsl[2] / 100, t1, t2, t3, rgb, val;
              if (s === 0) {
                val = l * 255;
                return [val, val, val];
              }
              if (l < 0.5)
                t2 = l * (1 + s);
              else
                t2 = l + s - l * s;
              t1 = 2 * l - t2;
              rgb = [0, 0, 0];
              for (var i2 = 0; i2 < 3; i2++) {
                t3 = h + 1 / 3 * -(i2 - 1);
                if (t3 < 0)
                  t3++;
                if (t3 > 1)
                  t3--;
                if (6 * t3 < 1)
                  val = t1 + (t2 - t1) * 6 * t3;
                else if (2 * t3 < 1)
                  val = t2;
                else if (3 * t3 < 2)
                  val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
                else
                  val = t1;
                rgb[i2] = val * 255;
              }
              return rgb;
            },
            hsl2hsv: function hsl2hsv(hsl) {
              var h = hsl[0], s = hsl[1] / 100, l = hsl[2] / 100, sv, v;
              l *= 2;
              s *= l <= 1 ? l : 2 - l;
              v = (l + s) / 2;
              sv = 2 * s / (l + s);
              return [h, sv * 100, v * 100];
            },
            hsv2rgb: function hsv2rgb(hsv) {
              var h = hsv[0] / 60;
              var s = hsv[1] / 100;
              var v = hsv[2] / 100;
              var hi = Math.floor(h) % 6;
              var f = h - Math.floor(h);
              var p = 255 * v * (1 - s);
              var q = 255 * v * (1 - s * f);
              var t = 255 * v * (1 - s * (1 - f));
              v = 255 * v;
              switch (hi) {
                case 0:
                  return [v, t, p];
                case 1:
                  return [q, v, p];
                case 2:
                  return [p, v, t];
                case 3:
                  return [p, q, v];
                case 4:
                  return [t, p, v];
                case 5:
                  return [v, p, q];
              }
            },
            hsv2hsl: function hsv2hsl(hsv) {
              var h = hsv[0], s = hsv[1] / 100, v = hsv[2] / 100, sl, l;
              l = (2 - s) * v;
              sl = s * v;
              sl /= l <= 1 ? l : 2 - l;
              l /= 2;
              return [h, sl * 100, l * 100];
            },
            // http://www.140byt.es/keywords/color
            rgb2hex: function(a, b, c) {
              return "#" + ((256 + a << 8 | b) << 8 | c).toString(16).slice(1);
            },
            hex2rgb: function(a) {
              a = "0x" + a.slice(1).replace(a.length > 4 ? a : /./g, "$&$&") | 0;
              return [a >> 16, a >> 8 & 255, a & 255];
            }
          };
        },
        /* 12 */
        /***/
        function(module2, exports2) {
          module2.exports = {
            // name value nicer
            navy: {
              value: "#000080",
              nicer: "#001F3F"
            },
            blue: {
              value: "#0000ff",
              nicer: "#0074D9"
            },
            aqua: {
              value: "#00ffff",
              nicer: "#7FDBFF"
            },
            teal: {
              value: "#008080",
              nicer: "#39CCCC"
            },
            olive: {
              value: "#008000",
              nicer: "#3D9970"
            },
            green: {
              value: "#008000",
              nicer: "#2ECC40"
            },
            lime: {
              value: "#00ff00",
              nicer: "#01FF70"
            },
            yellow: {
              value: "#ffff00",
              nicer: "#FFDC00"
            },
            orange: {
              value: "#ffa500",
              nicer: "#FF851B"
            },
            red: {
              value: "#ff0000",
              nicer: "#FF4136"
            },
            maroon: {
              value: "#800000",
              nicer: "#85144B"
            },
            fuchsia: {
              value: "#ff00ff",
              nicer: "#F012BE"
            },
            purple: {
              value: "#800080",
              nicer: "#B10DC9"
            },
            silver: {
              value: "#c0c0c0",
              nicer: "#DDDDDD"
            },
            gray: {
              value: "#808080",
              nicer: "#AAAAAA"
            },
            black: {
              value: "#000000",
              nicer: "#111111"
            },
            white: {
              value: "#FFFFFF",
              nicer: "#FFFFFF"
            }
          };
        },
        /* 13 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Basic = __webpack_require__2(6);
          var Helper = __webpack_require__2(14);
          function range(defaultMin, defaultMax, min, max) {
            return min === void 0 ? Basic.natural(defaultMin, defaultMax) : (
              // ()
              max === void 0 ? min : (
                // ( len )
                Basic.natural(parseInt(min, 10), parseInt(max, 10))
              )
            );
          }
          module2.exports = {
            // 随机生成一段文本。
            paragraph: function(min, max) {
              var len = range(3, 7, min, max);
              var result = [];
              for (var i2 = 0; i2 < len; i2++) {
                result.push(this.sentence());
              }
              return result.join(" ");
            },
            // 
            cparagraph: function(min, max) {
              var len = range(3, 7, min, max);
              var result = [];
              for (var i2 = 0; i2 < len; i2++) {
                result.push(this.csentence());
              }
              return result.join("");
            },
            // 随机生成一个句子，第一个单词的首字母大写。
            sentence: function(min, max) {
              var len = range(12, 18, min, max);
              var result = [];
              for (var i2 = 0; i2 < len; i2++) {
                result.push(this.word());
              }
              return Helper.capitalize(result.join(" ")) + ".";
            },
            // 随机生成一个中文句子。
            csentence: function(min, max) {
              var len = range(12, 18, min, max);
              var result = [];
              for (var i2 = 0; i2 < len; i2++) {
                result.push(this.cword());
              }
              return result.join("") + "。";
            },
            // 随机生成一个单词。
            word: function(min, max) {
              var len = range(3, 10, min, max);
              var result = "";
              for (var i2 = 0; i2 < len; i2++) {
                result += Basic.character("lower");
              }
              return result;
            },
            // 随机生成一个或多个汉字。
            cword: function(pool, min, max) {
              var DICT_KANZI = "的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞";
              var len;
              switch (arguments.length) {
                case 0:
                  pool = DICT_KANZI;
                  len = 1;
                  break;
                case 1:
                  if (typeof arguments[0] === "string") {
                    len = 1;
                  } else {
                    len = pool;
                    pool = DICT_KANZI;
                  }
                  break;
                case 2:
                  if (typeof arguments[0] === "string") {
                    len = min;
                  } else {
                    len = this.natural(pool, min);
                    pool = DICT_KANZI;
                  }
                  break;
                case 3:
                  len = this.natural(min, max);
                  break;
              }
              var result = "";
              for (var i2 = 0; i2 < len; i2++) {
                result += pool.charAt(this.natural(0, pool.length - 1));
              }
              return result;
            },
            // 随机生成一句标题，其中每个单词的首字母大写。
            title: function(min, max) {
              var len = range(3, 7, min, max);
              var result = [];
              for (var i2 = 0; i2 < len; i2++) {
                result.push(this.capitalize(this.word()));
              }
              return result.join(" ");
            },
            // 随机生成一句中文标题。
            ctitle: function(min, max) {
              var len = range(3, 7, min, max);
              var result = [];
              for (var i2 = 0; i2 < len; i2++) {
                result.push(this.cword());
              }
              return result.join("");
            }
          };
        },
        /* 14 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Util2 = __webpack_require__2(3);
          module2.exports = {
            // 把字符串的第一个字母转换为大写。
            capitalize: function(word) {
              return (word + "").charAt(0).toUpperCase() + (word + "").substr(1);
            },
            // 把字符串转换为大写。
            upper: function(str) {
              return (str + "").toUpperCase();
            },
            // 把字符串转换为小写。
            lower: function(str) {
              return (str + "").toLowerCase();
            },
            // 从数组中随机选取一个元素，并返回。
            pick: function pick(arr, min, max) {
              if (!Util2.isArray(arr)) {
                arr = [].slice.call(arguments);
                min = 1;
                max = 1;
              } else {
                if (min === void 0)
                  min = 1;
                if (max === void 0)
                  max = min;
              }
              if (min === 1 && max === 1)
                return arr[this.natural(0, arr.length - 1)];
              return this.shuffle(arr, min, max);
            },
            /*
            			    打乱数组中元素的顺序，并返回。
            			    Given an array, scramble the order and return it.
            
            			    其他的实现思路：
            			        // https://code.google.com/p/jslibs/wiki/JavascriptTips
            			        result = result.sort(function() {
            			            return Math.random() - 0.5
            			        })
            			*/
            shuffle: function shuffle(arr, min, max) {
              arr = arr || [];
              var old = arr.slice(0), result = [], index2 = 0, length = old.length;
              for (var i2 = 0; i2 < length; i2++) {
                index2 = this.natural(0, old.length - 1);
                result.push(old[index2]);
                old.splice(index2, 1);
              }
              switch (arguments.length) {
                case 0:
                case 1:
                  return result;
                case 2:
                  max = min;
                case 3:
                  min = parseInt(min, 10);
                  max = parseInt(max, 10);
                  return result.slice(0, this.natural(min, max));
              }
            },
            /*
            			    * Random.order(item, item)
            			    * Random.order([item, item ...])
            
            			    顺序获取数组中的元素
            
            			    [JSON导入数组支持数组数据录入](https://github.com/thx/RAP/issues/22)
            
            			    不支持单独调用！
            			*/
            order: function order(array) {
              order.cache = order.cache || {};
              if (arguments.length > 1)
                array = [].slice.call(arguments, 0);
              var options2 = order.options;
              var templatePath = options2.context.templatePath.join(".");
              var cache = order.cache[templatePath] = order.cache[templatePath] || {
                index: 0,
                array
              };
              return cache.array[cache.index++ % cache.array.length];
            }
          };
        },
        /* 15 */
        /***/
        function(module2, exports2) {
          module2.exports = {
            // 随机生成一个常见的英文名。
            first: function() {
              var names = [
                // male
                "James",
                "John",
                "Robert",
                "Michael",
                "William",
                "David",
                "Richard",
                "Charles",
                "Joseph",
                "Thomas",
                "Christopher",
                "Daniel",
                "Paul",
                "Mark",
                "Donald",
                "George",
                "Kenneth",
                "Steven",
                "Edward",
                "Brian",
                "Ronald",
                "Anthony",
                "Kevin",
                "Jason",
                "Matthew",
                "Gary",
                "Timothy",
                "Jose",
                "Larry",
                "Jeffrey",
                "Frank",
                "Scott",
                "Eric"
              ].concat([
                // female
                "Mary",
                "Patricia",
                "Linda",
                "Barbara",
                "Elizabeth",
                "Jennifer",
                "Maria",
                "Susan",
                "Margaret",
                "Dorothy",
                "Lisa",
                "Nancy",
                "Karen",
                "Betty",
                "Helen",
                "Sandra",
                "Donna",
                "Carol",
                "Ruth",
                "Sharon",
                "Michelle",
                "Laura",
                "Sarah",
                "Kimberly",
                "Deborah",
                "Jessica",
                "Shirley",
                "Cynthia",
                "Angela",
                "Melissa",
                "Brenda",
                "Amy",
                "Anna"
              ]);
              return this.pick(names);
            },
            // 随机生成一个常见的英文姓。
            last: function() {
              var names = [
                "Smith",
                "Johnson",
                "Williams",
                "Brown",
                "Jones",
                "Miller",
                "Davis",
                "Garcia",
                "Rodriguez",
                "Wilson",
                "Martinez",
                "Anderson",
                "Taylor",
                "Thomas",
                "Hernandez",
                "Moore",
                "Martin",
                "Jackson",
                "Thompson",
                "White",
                "Lopez",
                "Lee",
                "Gonzalez",
                "Harris",
                "Clark",
                "Lewis",
                "Robinson",
                "Walker",
                "Perez",
                "Hall",
                "Young",
                "Allen"
              ];
              return this.pick(names);
            },
            // 随机生成一个常见的英文姓名。
            name: function(middle) {
              return this.first() + " " + (middle ? this.first() + " " : "") + this.last();
            },
            /*
                随机生成一个常见的中文姓。
                [世界常用姓氏排行](http://baike.baidu.com/view/1719115.htm)
                [玄派网 - 网络小说创作辅助平台](http://xuanpai.sinaapp.com/)
             */
            cfirst: function() {
              var names = "王 李 张 刘 陈 杨 赵 黄 周 吴 徐 孙 胡 朱 高 林 何 郭 马 罗 梁 宋 郑 谢 韩 唐 冯 于 董 萧 程 曹 袁 邓 许 傅 沈 曾 彭 吕 苏 卢 蒋 蔡 贾 丁 魏 薛 叶 阎 余 潘 杜 戴 夏 锺 汪 田 任 姜 范 方 石 姚 谭 廖 邹 熊 金 陆 郝 孔 白 崔 康 毛 邱 秦 江 史 顾 侯 邵 孟 龙 万 段 雷 钱 汤 尹 黎 易 常 武 乔 贺 赖 龚 文".split(" ");
              return this.pick(names);
            },
            /*
                随机生成一个常见的中文名。
                [中国最常见名字前50名_三九算命网](http://www.name999.net/xingming/xingshi/20131004/48.html)
             */
            clast: function() {
              var names = "伟 芳 娜 秀英 敏 静 丽 强 磊 军 洋 勇 艳 杰 娟 涛 明 超 秀兰 霞 平 刚 桂英".split(" ");
              return this.pick(names);
            },
            // 随机生成一个常见的中文姓名。
            cname: function() {
              return this.cfirst() + this.clast();
            }
          };
        },
        /* 16 */
        /***/
        function(module2, exports2) {
          module2.exports = {
            /*
            		        随机生成一个 URL。
            
            		        [URL 规范](http://www.w3.org/Addressing/URL/url-spec.txt)
            		            http                    Hypertext Transfer Protocol 
            		            ftp                     File Transfer protocol 
            		            gopher                  The Gopher protocol 
            		            mailto                  Electronic mail address 
            		            mid                     Message identifiers for electronic mail 
            		            cid                     Content identifiers for MIME body part 
            		            news                    Usenet news 
            		            nntp                    Usenet news for local NNTP access only 
            		            prospero                Access using the prospero protocols 
            		            telnet rlogin tn3270    Reference to interactive sessions
            		            wais                    Wide Area Information Servers 
            		    */
            url: function(protocol, host) {
              return (protocol || this.protocol()) + "://" + // protocol?
              (host || this.domain()) + // host?
              "/" + this.word();
            },
            // 随机生成一个 URL 协议。
            protocol: function() {
              return this.pick(
                // 协议簇
                "http ftp gopher mailto mid cid news nntp prospero telnet rlogin tn3270 wais".split(" ")
              );
            },
            // 随机生成一个域名。
            domain: function(tld) {
              return this.word() + "." + (tld || this.tld());
            },
            /*
                随机生成一个顶级域名。
                国际顶级域名 international top-level domain-names, iTLDs
                国家顶级域名 national top-level domainnames, nTLDs
                [域名后缀大全](http://www.163ns.com/zixun/post/4417.html)
            */
            tld: function() {
              return this.pick(
                // 域名后缀
                "com net org edu gov int mil cn com.cn net.cn gov.cn org.cn 中国 中国互联.公司 中国互联.网络 tel biz cc tv info name hk mobi asia cd travel pro museum coop aero ad ae af ag ai al am an ao aq ar as at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cf cg ch ci ck cl cm cn co cq cr cu cv cx cy cz de dj dk dm do dz ec ee eg eh es et ev fi fj fk fm fo fr ga gb gd ge gf gh gi gl gm gn gp gr gt gu gw gy hk hm hn hr ht hu id ie il in io iq ir is it jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh ml mm mn mo mp mq mr ms mt mv mw mx my mz na nc ne nf ng ni nl no np nr nt nu nz om qa pa pe pf pg ph pk pl pm pn pr pt pw py re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sy sz tc td tf tg th tj tk tm tn to tp tr tt tv tw tz ua ug uk us uy va vc ve vg vn vu wf ws ye yu za zm zr zw".split(" ")
              );
            },
            // 随机生成一个邮件地址。
            email: function(domain) {
              return this.character("lower") + "." + this.word() + "@" + (domain || this.word() + "." + this.tld());
            },
            // 随机生成一个 IP 地址。
            ip: function() {
              return this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255);
            }
          };
        },
        /* 17 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var DICT = __webpack_require__2(18);
          var REGION = ["东北", "华北", "华东", "华中", "华南", "西南", "西北"];
          module2.exports = {
            // 随机生成一个大区。
            region: function() {
              return this.pick(REGION);
            },
            // 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
            province: function() {
              return this.pick(DICT).name;
            },
            // 随机生成一个（中国）市。
            city: function(prefix) {
              var province = this.pick(DICT);
              var city = this.pick(province.children);
              return prefix ? [province.name, city.name].join(" ") : city.name;
            },
            // 随机生成一个（中国）县。
            county: function(prefix) {
              var province = this.pick(DICT);
              var city = this.pick(province.children);
              var county = this.pick(city.children) || {
                name: "-"
              };
              return prefix ? [province.name, city.name, county.name].join(" ") : county.name;
            },
            // 随机生成一个邮政编码（六位数字）。
            zip: function(len) {
              var zip = "";
              for (var i2 = 0; i2 < (len || 6); i2++)
                zip += this.natural(0, 9);
              return zip;
            }
            // address: function() {},
            // phone: function() {},
            // areacode: function() {},
            // street: function() {},
            // street_suffixes: function() {},
            // street_suffix: function() {},
            // states: function() {},
            // state: function() {},
          };
        },
        /* 18 */
        /***/
        function(module2, exports2) {
          var DICT = {
            "110000": "北京",
            "110100": "北京市",
            "110101": "东城区",
            "110102": "西城区",
            "110105": "朝阳区",
            "110106": "丰台区",
            "110107": "石景山区",
            "110108": "海淀区",
            "110109": "门头沟区",
            "110111": "房山区",
            "110112": "通州区",
            "110113": "顺义区",
            "110114": "昌平区",
            "110115": "大兴区",
            "110116": "怀柔区",
            "110117": "平谷区",
            "110228": "密云县",
            "110229": "延庆县",
            "110230": "其它区",
            "120000": "天津",
            "120100": "天津市",
            "120101": "和平区",
            "120102": "河东区",
            "120103": "河西区",
            "120104": "南开区",
            "120105": "河北区",
            "120106": "红桥区",
            "120110": "东丽区",
            "120111": "西青区",
            "120112": "津南区",
            "120113": "北辰区",
            "120114": "武清区",
            "120115": "宝坻区",
            "120116": "滨海新区",
            "120221": "宁河县",
            "120223": "静海县",
            "120225": "蓟县",
            "120226": "其它区",
            "130000": "河北省",
            "130100": "石家庄市",
            "130102": "长安区",
            "130103": "桥东区",
            "130104": "桥西区",
            "130105": "新华区",
            "130107": "井陉矿区",
            "130108": "裕华区",
            "130121": "井陉县",
            "130123": "正定县",
            "130124": "栾城县",
            "130125": "行唐县",
            "130126": "灵寿县",
            "130127": "高邑县",
            "130128": "深泽县",
            "130129": "赞皇县",
            "130130": "无极县",
            "130131": "平山县",
            "130132": "元氏县",
            "130133": "赵县",
            "130181": "辛集市",
            "130182": "藁城市",
            "130183": "晋州市",
            "130184": "新乐市",
            "130185": "鹿泉市",
            "130186": "其它区",
            "130200": "唐山市",
            "130202": "路南区",
            "130203": "路北区",
            "130204": "古冶区",
            "130205": "开平区",
            "130207": "丰南区",
            "130208": "丰润区",
            "130223": "滦县",
            "130224": "滦南县",
            "130225": "乐亭县",
            "130227": "迁西县",
            "130229": "玉田县",
            "130230": "曹妃甸区",
            "130281": "遵化市",
            "130283": "迁安市",
            "130284": "其它区",
            "130300": "秦皇岛市",
            "130302": "海港区",
            "130303": "山海关区",
            "130304": "北戴河区",
            "130321": "青龙满族自治县",
            "130322": "昌黎县",
            "130323": "抚宁县",
            "130324": "卢龙县",
            "130398": "其它区",
            "130400": "邯郸市",
            "130402": "邯山区",
            "130403": "丛台区",
            "130404": "复兴区",
            "130406": "峰峰矿区",
            "130421": "邯郸县",
            "130423": "临漳县",
            "130424": "成安县",
            "130425": "大名县",
            "130426": "涉县",
            "130427": "磁县",
            "130428": "肥乡县",
            "130429": "永年县",
            "130430": "邱县",
            "130431": "鸡泽县",
            "130432": "广平县",
            "130433": "馆陶县",
            "130434": "魏县",
            "130435": "曲周县",
            "130481": "武安市",
            "130482": "其它区",
            "130500": "邢台市",
            "130502": "桥东区",
            "130503": "桥西区",
            "130521": "邢台县",
            "130522": "临城县",
            "130523": "内丘县",
            "130524": "柏乡县",
            "130525": "隆尧县",
            "130526": "任县",
            "130527": "南和县",
            "130528": "宁晋县",
            "130529": "巨鹿县",
            "130530": "新河县",
            "130531": "广宗县",
            "130532": "平乡县",
            "130533": "威县",
            "130534": "清河县",
            "130535": "临西县",
            "130581": "南宫市",
            "130582": "沙河市",
            "130583": "其它区",
            "130600": "保定市",
            "130602": "新市区",
            "130603": "北市区",
            "130604": "南市区",
            "130621": "满城县",
            "130622": "清苑县",
            "130623": "涞水县",
            "130624": "阜平县",
            "130625": "徐水县",
            "130626": "定兴县",
            "130627": "唐县",
            "130628": "高阳县",
            "130629": "容城县",
            "130630": "涞源县",
            "130631": "望都县",
            "130632": "安新县",
            "130633": "易县",
            "130634": "曲阳县",
            "130635": "蠡县",
            "130636": "顺平县",
            "130637": "博野县",
            "130638": "雄县",
            "130681": "涿州市",
            "130682": "定州市",
            "130683": "安国市",
            "130684": "高碑店市",
            "130699": "其它区",
            "130700": "张家口市",
            "130702": "桥东区",
            "130703": "桥西区",
            "130705": "宣化区",
            "130706": "下花园区",
            "130721": "宣化县",
            "130722": "张北县",
            "130723": "康保县",
            "130724": "沽源县",
            "130725": "尚义县",
            "130726": "蔚县",
            "130727": "阳原县",
            "130728": "怀安县",
            "130729": "万全县",
            "130730": "怀来县",
            "130731": "涿鹿县",
            "130732": "赤城县",
            "130733": "崇礼县",
            "130734": "其它区",
            "130800": "承德市",
            "130802": "双桥区",
            "130803": "双滦区",
            "130804": "鹰手营子矿区",
            "130821": "承德县",
            "130822": "兴隆县",
            "130823": "平泉县",
            "130824": "滦平县",
            "130825": "隆化县",
            "130826": "丰宁满族自治县",
            "130827": "宽城满族自治县",
            "130828": "围场满族蒙古族自治县",
            "130829": "其它区",
            "130900": "沧州市",
            "130902": "新华区",
            "130903": "运河区",
            "130921": "沧县",
            "130922": "青县",
            "130923": "东光县",
            "130924": "海兴县",
            "130925": "盐山县",
            "130926": "肃宁县",
            "130927": "南皮县",
            "130928": "吴桥县",
            "130929": "献县",
            "130930": "孟村回族自治县",
            "130981": "泊头市",
            "130982": "任丘市",
            "130983": "黄骅市",
            "130984": "河间市",
            "130985": "其它区",
            "131000": "廊坊市",
            "131002": "安次区",
            "131003": "广阳区",
            "131022": "固安县",
            "131023": "永清县",
            "131024": "香河县",
            "131025": "大城县",
            "131026": "文安县",
            "131028": "大厂回族自治县",
            "131081": "霸州市",
            "131082": "三河市",
            "131083": "其它区",
            "131100": "衡水市",
            "131102": "桃城区",
            "131121": "枣强县",
            "131122": "武邑县",
            "131123": "武强县",
            "131124": "饶阳县",
            "131125": "安平县",
            "131126": "故城县",
            "131127": "景县",
            "131128": "阜城县",
            "131181": "冀州市",
            "131182": "深州市",
            "131183": "其它区",
            "140000": "山西省",
            "140100": "太原市",
            "140105": "小店区",
            "140106": "迎泽区",
            "140107": "杏花岭区",
            "140108": "尖草坪区",
            "140109": "万柏林区",
            "140110": "晋源区",
            "140121": "清徐县",
            "140122": "阳曲县",
            "140123": "娄烦县",
            "140181": "古交市",
            "140182": "其它区",
            "140200": "大同市",
            "140202": "城区",
            "140203": "矿区",
            "140211": "南郊区",
            "140212": "新荣区",
            "140221": "阳高县",
            "140222": "天镇县",
            "140223": "广灵县",
            "140224": "灵丘县",
            "140225": "浑源县",
            "140226": "左云县",
            "140227": "大同县",
            "140228": "其它区",
            "140300": "阳泉市",
            "140302": "城区",
            "140303": "矿区",
            "140311": "郊区",
            "140321": "平定县",
            "140322": "盂县",
            "140323": "其它区",
            "140400": "长治市",
            "140421": "长治县",
            "140423": "襄垣县",
            "140424": "屯留县",
            "140425": "平顺县",
            "140426": "黎城县",
            "140427": "壶关县",
            "140428": "长子县",
            "140429": "武乡县",
            "140430": "沁县",
            "140431": "沁源县",
            "140481": "潞城市",
            "140482": "城区",
            "140483": "郊区",
            "140485": "其它区",
            "140500": "晋城市",
            "140502": "城区",
            "140521": "沁水县",
            "140522": "阳城县",
            "140524": "陵川县",
            "140525": "泽州县",
            "140581": "高平市",
            "140582": "其它区",
            "140600": "朔州市",
            "140602": "朔城区",
            "140603": "平鲁区",
            "140621": "山阴县",
            "140622": "应县",
            "140623": "右玉县",
            "140624": "怀仁县",
            "140625": "其它区",
            "140700": "晋中市",
            "140702": "榆次区",
            "140721": "榆社县",
            "140722": "左权县",
            "140723": "和顺县",
            "140724": "昔阳县",
            "140725": "寿阳县",
            "140726": "太谷县",
            "140727": "祁县",
            "140728": "平遥县",
            "140729": "灵石县",
            "140781": "介休市",
            "140782": "其它区",
            "140800": "运城市",
            "140802": "盐湖区",
            "140821": "临猗县",
            "140822": "万荣县",
            "140823": "闻喜县",
            "140824": "稷山县",
            "140825": "新绛县",
            "140826": "绛县",
            "140827": "垣曲县",
            "140828": "夏县",
            "140829": "平陆县",
            "140830": "芮城县",
            "140881": "永济市",
            "140882": "河津市",
            "140883": "其它区",
            "140900": "忻州市",
            "140902": "忻府区",
            "140921": "定襄县",
            "140922": "五台县",
            "140923": "代县",
            "140924": "繁峙县",
            "140925": "宁武县",
            "140926": "静乐县",
            "140927": "神池县",
            "140928": "五寨县",
            "140929": "岢岚县",
            "140930": "河曲县",
            "140931": "保德县",
            "140932": "偏关县",
            "140981": "原平市",
            "140982": "其它区",
            "141000": "临汾市",
            "141002": "尧都区",
            "141021": "曲沃县",
            "141022": "翼城县",
            "141023": "襄汾县",
            "141024": "洪洞县",
            "141025": "古县",
            "141026": "安泽县",
            "141027": "浮山县",
            "141028": "吉县",
            "141029": "乡宁县",
            "141030": "大宁县",
            "141031": "隰县",
            "141032": "永和县",
            "141033": "蒲县",
            "141034": "汾西县",
            "141081": "侯马市",
            "141082": "霍州市",
            "141083": "其它区",
            "141100": "吕梁市",
            "141102": "离石区",
            "141121": "文水县",
            "141122": "交城县",
            "141123": "兴县",
            "141124": "临县",
            "141125": "柳林县",
            "141126": "石楼县",
            "141127": "岚县",
            "141128": "方山县",
            "141129": "中阳县",
            "141130": "交口县",
            "141181": "孝义市",
            "141182": "汾阳市",
            "141183": "其它区",
            "150000": "内蒙古自治区",
            "150100": "呼和浩特市",
            "150102": "新城区",
            "150103": "回民区",
            "150104": "玉泉区",
            "150105": "赛罕区",
            "150121": "土默特左旗",
            "150122": "托克托县",
            "150123": "和林格尔县",
            "150124": "清水河县",
            "150125": "武川县",
            "150126": "其它区",
            "150200": "包头市",
            "150202": "东河区",
            "150203": "昆都仑区",
            "150204": "青山区",
            "150205": "石拐区",
            "150206": "白云鄂博矿区",
            "150207": "九原区",
            "150221": "土默特右旗",
            "150222": "固阳县",
            "150223": "达尔罕茂明安联合旗",
            "150224": "其它区",
            "150300": "乌海市",
            "150302": "海勃湾区",
            "150303": "海南区",
            "150304": "乌达区",
            "150305": "其它区",
            "150400": "赤峰市",
            "150402": "红山区",
            "150403": "元宝山区",
            "150404": "松山区",
            "150421": "阿鲁科尔沁旗",
            "150422": "巴林左旗",
            "150423": "巴林右旗",
            "150424": "林西县",
            "150425": "克什克腾旗",
            "150426": "翁牛特旗",
            "150428": "喀喇沁旗",
            "150429": "宁城县",
            "150430": "敖汉旗",
            "150431": "其它区",
            "150500": "通辽市",
            "150502": "科尔沁区",
            "150521": "科尔沁左翼中旗",
            "150522": "科尔沁左翼后旗",
            "150523": "开鲁县",
            "150524": "库伦旗",
            "150525": "奈曼旗",
            "150526": "扎鲁特旗",
            "150581": "霍林郭勒市",
            "150582": "其它区",
            "150600": "鄂尔多斯市",
            "150602": "东胜区",
            "150621": "达拉特旗",
            "150622": "准格尔旗",
            "150623": "鄂托克前旗",
            "150624": "鄂托克旗",
            "150625": "杭锦旗",
            "150626": "乌审旗",
            "150627": "伊金霍洛旗",
            "150628": "其它区",
            "150700": "呼伦贝尔市",
            "150702": "海拉尔区",
            "150703": "扎赉诺尔区",
            "150721": "阿荣旗",
            "150722": "莫力达瓦达斡尔族自治旗",
            "150723": "鄂伦春自治旗",
            "150724": "鄂温克族自治旗",
            "150725": "陈巴尔虎旗",
            "150726": "新巴尔虎左旗",
            "150727": "新巴尔虎右旗",
            "150781": "满洲里市",
            "150782": "牙克石市",
            "150783": "扎兰屯市",
            "150784": "额尔古纳市",
            "150785": "根河市",
            "150786": "其它区",
            "150800": "巴彦淖尔市",
            "150802": "临河区",
            "150821": "五原县",
            "150822": "磴口县",
            "150823": "乌拉特前旗",
            "150824": "乌拉特中旗",
            "150825": "乌拉特后旗",
            "150826": "杭锦后旗",
            "150827": "其它区",
            "150900": "乌兰察布市",
            "150902": "集宁区",
            "150921": "卓资县",
            "150922": "化德县",
            "150923": "商都县",
            "150924": "兴和县",
            "150925": "凉城县",
            "150926": "察哈尔右翼前旗",
            "150927": "察哈尔右翼中旗",
            "150928": "察哈尔右翼后旗",
            "150929": "四子王旗",
            "150981": "丰镇市",
            "150982": "其它区",
            "152200": "兴安盟",
            "152201": "乌兰浩特市",
            "152202": "阿尔山市",
            "152221": "科尔沁右翼前旗",
            "152222": "科尔沁右翼中旗",
            "152223": "扎赉特旗",
            "152224": "突泉县",
            "152225": "其它区",
            "152500": "锡林郭勒盟",
            "152501": "二连浩特市",
            "152502": "锡林浩特市",
            "152522": "阿巴嘎旗",
            "152523": "苏尼特左旗",
            "152524": "苏尼特右旗",
            "152525": "东乌珠穆沁旗",
            "152526": "西乌珠穆沁旗",
            "152527": "太仆寺旗",
            "152528": "镶黄旗",
            "152529": "正镶白旗",
            "152530": "正蓝旗",
            "152531": "多伦县",
            "152532": "其它区",
            "152900": "阿拉善盟",
            "152921": "阿拉善左旗",
            "152922": "阿拉善右旗",
            "152923": "额济纳旗",
            "152924": "其它区",
            "210000": "辽宁省",
            "210100": "沈阳市",
            "210102": "和平区",
            "210103": "沈河区",
            "210104": "大东区",
            "210105": "皇姑区",
            "210106": "铁西区",
            "210111": "苏家屯区",
            "210112": "东陵区",
            "210113": "新城子区",
            "210114": "于洪区",
            "210122": "辽中县",
            "210123": "康平县",
            "210124": "法库县",
            "210181": "新民市",
            "210184": "沈北新区",
            "210185": "其它区",
            "210200": "大连市",
            "210202": "中山区",
            "210203": "西岗区",
            "210204": "沙河口区",
            "210211": "甘井子区",
            "210212": "旅顺口区",
            "210213": "金州区",
            "210224": "长海县",
            "210281": "瓦房店市",
            "210282": "普兰店市",
            "210283": "庄河市",
            "210298": "其它区",
            "210300": "鞍山市",
            "210302": "铁东区",
            "210303": "铁西区",
            "210304": "立山区",
            "210311": "千山区",
            "210321": "台安县",
            "210323": "岫岩满族自治县",
            "210381": "海城市",
            "210382": "其它区",
            "210400": "抚顺市",
            "210402": "新抚区",
            "210403": "东洲区",
            "210404": "望花区",
            "210411": "顺城区",
            "210421": "抚顺县",
            "210422": "新宾满族自治县",
            "210423": "清原满族自治县",
            "210424": "其它区",
            "210500": "本溪市",
            "210502": "平山区",
            "210503": "溪湖区",
            "210504": "明山区",
            "210505": "南芬区",
            "210521": "本溪满族自治县",
            "210522": "桓仁满族自治县",
            "210523": "其它区",
            "210600": "丹东市",
            "210602": "元宝区",
            "210603": "振兴区",
            "210604": "振安区",
            "210624": "宽甸满族自治县",
            "210681": "东港市",
            "210682": "凤城市",
            "210683": "其它区",
            "210700": "锦州市",
            "210702": "古塔区",
            "210703": "凌河区",
            "210711": "太和区",
            "210726": "黑山县",
            "210727": "义县",
            "210781": "凌海市",
            "210782": "北镇市",
            "210783": "其它区",
            "210800": "营口市",
            "210802": "站前区",
            "210803": "西市区",
            "210804": "鲅鱼圈区",
            "210811": "老边区",
            "210881": "盖州市",
            "210882": "大石桥市",
            "210883": "其它区",
            "210900": "阜新市",
            "210902": "海州区",
            "210903": "新邱区",
            "210904": "太平区",
            "210905": "清河门区",
            "210911": "细河区",
            "210921": "阜新蒙古族自治县",
            "210922": "彰武县",
            "210923": "其它区",
            "211000": "辽阳市",
            "211002": "白塔区",
            "211003": "文圣区",
            "211004": "宏伟区",
            "211005": "弓长岭区",
            "211011": "太子河区",
            "211021": "辽阳县",
            "211081": "灯塔市",
            "211082": "其它区",
            "211100": "盘锦市",
            "211102": "双台子区",
            "211103": "兴隆台区",
            "211121": "大洼县",
            "211122": "盘山县",
            "211123": "其它区",
            "211200": "铁岭市",
            "211202": "银州区",
            "211204": "清河区",
            "211221": "铁岭县",
            "211223": "西丰县",
            "211224": "昌图县",
            "211281": "调兵山市",
            "211282": "开原市",
            "211283": "其它区",
            "211300": "朝阳市",
            "211302": "双塔区",
            "211303": "龙城区",
            "211321": "朝阳县",
            "211322": "建平县",
            "211324": "喀喇沁左翼蒙古族自治县",
            "211381": "北票市",
            "211382": "凌源市",
            "211383": "其它区",
            "211400": "葫芦岛市",
            "211402": "连山区",
            "211403": "龙港区",
            "211404": "南票区",
            "211421": "绥中县",
            "211422": "建昌县",
            "211481": "兴城市",
            "211482": "其它区",
            "220000": "吉林省",
            "220100": "长春市",
            "220102": "南关区",
            "220103": "宽城区",
            "220104": "朝阳区",
            "220105": "二道区",
            "220106": "绿园区",
            "220112": "双阳区",
            "220122": "农安县",
            "220181": "九台市",
            "220182": "榆树市",
            "220183": "德惠市",
            "220188": "其它区",
            "220200": "吉林市",
            "220202": "昌邑区",
            "220203": "龙潭区",
            "220204": "船营区",
            "220211": "丰满区",
            "220221": "永吉县",
            "220281": "蛟河市",
            "220282": "桦甸市",
            "220283": "舒兰市",
            "220284": "磐石市",
            "220285": "其它区",
            "220300": "四平市",
            "220302": "铁西区",
            "220303": "铁东区",
            "220322": "梨树县",
            "220323": "伊通满族自治县",
            "220381": "公主岭市",
            "220382": "双辽市",
            "220383": "其它区",
            "220400": "辽源市",
            "220402": "龙山区",
            "220403": "西安区",
            "220421": "东丰县",
            "220422": "东辽县",
            "220423": "其它区",
            "220500": "通化市",
            "220502": "东昌区",
            "220503": "二道江区",
            "220521": "通化县",
            "220523": "辉南县",
            "220524": "柳河县",
            "220581": "梅河口市",
            "220582": "集安市",
            "220583": "其它区",
            "220600": "白山市",
            "220602": "浑江区",
            "220621": "抚松县",
            "220622": "靖宇县",
            "220623": "长白朝鲜族自治县",
            "220625": "江源区",
            "220681": "临江市",
            "220682": "其它区",
            "220700": "松原市",
            "220702": "宁江区",
            "220721": "前郭尔罗斯蒙古族自治县",
            "220722": "长岭县",
            "220723": "乾安县",
            "220724": "扶余市",
            "220725": "其它区",
            "220800": "白城市",
            "220802": "洮北区",
            "220821": "镇赉县",
            "220822": "通榆县",
            "220881": "洮南市",
            "220882": "大安市",
            "220883": "其它区",
            "222400": "延边朝鲜族自治州",
            "222401": "延吉市",
            "222402": "图们市",
            "222403": "敦化市",
            "222404": "珲春市",
            "222405": "龙井市",
            "222406": "和龙市",
            "222424": "汪清县",
            "222426": "安图县",
            "222427": "其它区",
            "230000": "黑龙江省",
            "230100": "哈尔滨市",
            "230102": "道里区",
            "230103": "南岗区",
            "230104": "道外区",
            "230106": "香坊区",
            "230108": "平房区",
            "230109": "松北区",
            "230111": "呼兰区",
            "230123": "依兰县",
            "230124": "方正县",
            "230125": "宾县",
            "230126": "巴彦县",
            "230127": "木兰县",
            "230128": "通河县",
            "230129": "延寿县",
            "230181": "阿城区",
            "230182": "双城市",
            "230183": "尚志市",
            "230184": "五常市",
            "230186": "其它区",
            "230200": "齐齐哈尔市",
            "230202": "龙沙区",
            "230203": "建华区",
            "230204": "铁锋区",
            "230205": "昂昂溪区",
            "230206": "富拉尔基区",
            "230207": "碾子山区",
            "230208": "梅里斯达斡尔族区",
            "230221": "龙江县",
            "230223": "依安县",
            "230224": "泰来县",
            "230225": "甘南县",
            "230227": "富裕县",
            "230229": "克山县",
            "230230": "克东县",
            "230231": "拜泉县",
            "230281": "讷河市",
            "230282": "其它区",
            "230300": "鸡西市",
            "230302": "鸡冠区",
            "230303": "恒山区",
            "230304": "滴道区",
            "230305": "梨树区",
            "230306": "城子河区",
            "230307": "麻山区",
            "230321": "鸡东县",
            "230381": "虎林市",
            "230382": "密山市",
            "230383": "其它区",
            "230400": "鹤岗市",
            "230402": "向阳区",
            "230403": "工农区",
            "230404": "南山区",
            "230405": "兴安区",
            "230406": "东山区",
            "230407": "兴山区",
            "230421": "萝北县",
            "230422": "绥滨县",
            "230423": "其它区",
            "230500": "双鸭山市",
            "230502": "尖山区",
            "230503": "岭东区",
            "230505": "四方台区",
            "230506": "宝山区",
            "230521": "集贤县",
            "230522": "友谊县",
            "230523": "宝清县",
            "230524": "饶河县",
            "230525": "其它区",
            "230600": "大庆市",
            "230602": "萨尔图区",
            "230603": "龙凤区",
            "230604": "让胡路区",
            "230605": "红岗区",
            "230606": "大同区",
            "230621": "肇州县",
            "230622": "肇源县",
            "230623": "林甸县",
            "230624": "杜尔伯特蒙古族自治县",
            "230625": "其它区",
            "230700": "伊春市",
            "230702": "伊春区",
            "230703": "南岔区",
            "230704": "友好区",
            "230705": "西林区",
            "230706": "翠峦区",
            "230707": "新青区",
            "230708": "美溪区",
            "230709": "金山屯区",
            "230710": "五营区",
            "230711": "乌马河区",
            "230712": "汤旺河区",
            "230713": "带岭区",
            "230714": "乌伊岭区",
            "230715": "红星区",
            "230716": "上甘岭区",
            "230722": "嘉荫县",
            "230781": "铁力市",
            "230782": "其它区",
            "230800": "佳木斯市",
            "230803": "向阳区",
            "230804": "前进区",
            "230805": "东风区",
            "230811": "郊区",
            "230822": "桦南县",
            "230826": "桦川县",
            "230828": "汤原县",
            "230833": "抚远县",
            "230881": "同江市",
            "230882": "富锦市",
            "230883": "其它区",
            "230900": "七台河市",
            "230902": "新兴区",
            "230903": "桃山区",
            "230904": "茄子河区",
            "230921": "勃利县",
            "230922": "其它区",
            "231000": "牡丹江市",
            "231002": "东安区",
            "231003": "阳明区",
            "231004": "爱民区",
            "231005": "西安区",
            "231024": "东宁县",
            "231025": "林口县",
            "231081": "绥芬河市",
            "231083": "海林市",
            "231084": "宁安市",
            "231085": "穆棱市",
            "231086": "其它区",
            "231100": "黑河市",
            "231102": "爱辉区",
            "231121": "嫩江县",
            "231123": "逊克县",
            "231124": "孙吴县",
            "231181": "北安市",
            "231182": "五大连池市",
            "231183": "其它区",
            "231200": "绥化市",
            "231202": "北林区",
            "231221": "望奎县",
            "231222": "兰西县",
            "231223": "青冈县",
            "231224": "庆安县",
            "231225": "明水县",
            "231226": "绥棱县",
            "231281": "安达市",
            "231282": "肇东市",
            "231283": "海伦市",
            "231284": "其它区",
            "232700": "大兴安岭地区",
            "232702": "松岭区",
            "232703": "新林区",
            "232704": "呼中区",
            "232721": "呼玛县",
            "232722": "塔河县",
            "232723": "漠河县",
            "232724": "加格达奇区",
            "232725": "其它区",
            "310000": "上海",
            "310100": "上海市",
            "310101": "黄浦区",
            "310104": "徐汇区",
            "310105": "长宁区",
            "310106": "静安区",
            "310107": "普陀区",
            "310108": "闸北区",
            "310109": "虹口区",
            "310110": "杨浦区",
            "310112": "闵行区",
            "310113": "宝山区",
            "310114": "嘉定区",
            "310115": "浦东新区",
            "310116": "金山区",
            "310117": "松江区",
            "310118": "青浦区",
            "310120": "奉贤区",
            "310230": "崇明县",
            "310231": "其它区",
            "320000": "江苏省",
            "320100": "南京市",
            "320102": "玄武区",
            "320104": "秦淮区",
            "320105": "建邺区",
            "320106": "鼓楼区",
            "320111": "浦口区",
            "320113": "栖霞区",
            "320114": "雨花台区",
            "320115": "江宁区",
            "320116": "六合区",
            "320124": "溧水区",
            "320125": "高淳区",
            "320126": "其它区",
            "320200": "无锡市",
            "320202": "崇安区",
            "320203": "南长区",
            "320204": "北塘区",
            "320205": "锡山区",
            "320206": "惠山区",
            "320211": "滨湖区",
            "320281": "江阴市",
            "320282": "宜兴市",
            "320297": "其它区",
            "320300": "徐州市",
            "320302": "鼓楼区",
            "320303": "云龙区",
            "320305": "贾汪区",
            "320311": "泉山区",
            "320321": "丰县",
            "320322": "沛县",
            "320323": "铜山区",
            "320324": "睢宁县",
            "320381": "新沂市",
            "320382": "邳州市",
            "320383": "其它区",
            "320400": "常州市",
            "320402": "天宁区",
            "320404": "钟楼区",
            "320405": "戚墅堰区",
            "320411": "新北区",
            "320412": "武进区",
            "320481": "溧阳市",
            "320482": "金坛市",
            "320483": "其它区",
            "320500": "苏州市",
            "320505": "虎丘区",
            "320506": "吴中区",
            "320507": "相城区",
            "320508": "姑苏区",
            "320581": "常熟市",
            "320582": "张家港市",
            "320583": "昆山市",
            "320584": "吴江区",
            "320585": "太仓市",
            "320596": "其它区",
            "320600": "南通市",
            "320602": "崇川区",
            "320611": "港闸区",
            "320612": "通州区",
            "320621": "海安县",
            "320623": "如东县",
            "320681": "启东市",
            "320682": "如皋市",
            "320684": "海门市",
            "320694": "其它区",
            "320700": "连云港市",
            "320703": "连云区",
            "320705": "新浦区",
            "320706": "海州区",
            "320721": "赣榆县",
            "320722": "东海县",
            "320723": "灌云县",
            "320724": "灌南县",
            "320725": "其它区",
            "320800": "淮安市",
            "320802": "清河区",
            "320803": "淮安区",
            "320804": "淮阴区",
            "320811": "清浦区",
            "320826": "涟水县",
            "320829": "洪泽县",
            "320830": "盱眙县",
            "320831": "金湖县",
            "320832": "其它区",
            "320900": "盐城市",
            "320902": "亭湖区",
            "320903": "盐都区",
            "320921": "响水县",
            "320922": "滨海县",
            "320923": "阜宁县",
            "320924": "射阳县",
            "320925": "建湖县",
            "320981": "东台市",
            "320982": "大丰市",
            "320983": "其它区",
            "321000": "扬州市",
            "321002": "广陵区",
            "321003": "邗江区",
            "321023": "宝应县",
            "321081": "仪征市",
            "321084": "高邮市",
            "321088": "江都区",
            "321093": "其它区",
            "321100": "镇江市",
            "321102": "京口区",
            "321111": "润州区",
            "321112": "丹徒区",
            "321181": "丹阳市",
            "321182": "扬中市",
            "321183": "句容市",
            "321184": "其它区",
            "321200": "泰州市",
            "321202": "海陵区",
            "321203": "高港区",
            "321281": "兴化市",
            "321282": "靖江市",
            "321283": "泰兴市",
            "321284": "姜堰区",
            "321285": "其它区",
            "321300": "宿迁市",
            "321302": "宿城区",
            "321311": "宿豫区",
            "321322": "沭阳县",
            "321323": "泗阳县",
            "321324": "泗洪县",
            "321325": "其它区",
            "330000": "浙江省",
            "330100": "杭州市",
            "330102": "上城区",
            "330103": "下城区",
            "330104": "江干区",
            "330105": "拱墅区",
            "330106": "西湖区",
            "330108": "滨江区",
            "330109": "萧山区",
            "330110": "余杭区",
            "330122": "桐庐县",
            "330127": "淳安县",
            "330182": "建德市",
            "330183": "富阳市",
            "330185": "临安市",
            "330186": "其它区",
            "330200": "宁波市",
            "330203": "海曙区",
            "330204": "江东区",
            "330205": "江北区",
            "330206": "北仑区",
            "330211": "镇海区",
            "330212": "鄞州区",
            "330225": "象山县",
            "330226": "宁海县",
            "330281": "余姚市",
            "330282": "慈溪市",
            "330283": "奉化市",
            "330284": "其它区",
            "330300": "温州市",
            "330302": "鹿城区",
            "330303": "龙湾区",
            "330304": "瓯海区",
            "330322": "洞头县",
            "330324": "永嘉县",
            "330326": "平阳县",
            "330327": "苍南县",
            "330328": "文成县",
            "330329": "泰顺县",
            "330381": "瑞安市",
            "330382": "乐清市",
            "330383": "其它区",
            "330400": "嘉兴市",
            "330402": "南湖区",
            "330411": "秀洲区",
            "330421": "嘉善县",
            "330424": "海盐县",
            "330481": "海宁市",
            "330482": "平湖市",
            "330483": "桐乡市",
            "330484": "其它区",
            "330500": "湖州市",
            "330502": "吴兴区",
            "330503": "南浔区",
            "330521": "德清县",
            "330522": "长兴县",
            "330523": "安吉县",
            "330524": "其它区",
            "330600": "绍兴市",
            "330602": "越城区",
            "330621": "绍兴县",
            "330624": "新昌县",
            "330681": "诸暨市",
            "330682": "上虞市",
            "330683": "嵊州市",
            "330684": "其它区",
            "330700": "金华市",
            "330702": "婺城区",
            "330703": "金东区",
            "330723": "武义县",
            "330726": "浦江县",
            "330727": "磐安县",
            "330781": "兰溪市",
            "330782": "义乌市",
            "330783": "东阳市",
            "330784": "永康市",
            "330785": "其它区",
            "330800": "衢州市",
            "330802": "柯城区",
            "330803": "衢江区",
            "330822": "常山县",
            "330824": "开化县",
            "330825": "龙游县",
            "330881": "江山市",
            "330882": "其它区",
            "330900": "舟山市",
            "330902": "定海区",
            "330903": "普陀区",
            "330921": "岱山县",
            "330922": "嵊泗县",
            "330923": "其它区",
            "331000": "台州市",
            "331002": "椒江区",
            "331003": "黄岩区",
            "331004": "路桥区",
            "331021": "玉环县",
            "331022": "三门县",
            "331023": "天台县",
            "331024": "仙居县",
            "331081": "温岭市",
            "331082": "临海市",
            "331083": "其它区",
            "331100": "丽水市",
            "331102": "莲都区",
            "331121": "青田县",
            "331122": "缙云县",
            "331123": "遂昌县",
            "331124": "松阳县",
            "331125": "云和县",
            "331126": "庆元县",
            "331127": "景宁畲族自治县",
            "331181": "龙泉市",
            "331182": "其它区",
            "340000": "安徽省",
            "340100": "合肥市",
            "340102": "瑶海区",
            "340103": "庐阳区",
            "340104": "蜀山区",
            "340111": "包河区",
            "340121": "长丰县",
            "340122": "肥东县",
            "340123": "肥西县",
            "340192": "其它区",
            "340200": "芜湖市",
            "340202": "镜湖区",
            "340203": "弋江区",
            "340207": "鸠江区",
            "340208": "三山区",
            "340221": "芜湖县",
            "340222": "繁昌县",
            "340223": "南陵县",
            "340224": "其它区",
            "340300": "蚌埠市",
            "340302": "龙子湖区",
            "340303": "蚌山区",
            "340304": "禹会区",
            "340311": "淮上区",
            "340321": "怀远县",
            "340322": "五河县",
            "340323": "固镇县",
            "340324": "其它区",
            "340400": "淮南市",
            "340402": "大通区",
            "340403": "田家庵区",
            "340404": "谢家集区",
            "340405": "八公山区",
            "340406": "潘集区",
            "340421": "凤台县",
            "340422": "其它区",
            "340500": "马鞍山市",
            "340503": "花山区",
            "340504": "雨山区",
            "340506": "博望区",
            "340521": "当涂县",
            "340522": "其它区",
            "340600": "淮北市",
            "340602": "杜集区",
            "340603": "相山区",
            "340604": "烈山区",
            "340621": "濉溪县",
            "340622": "其它区",
            "340700": "铜陵市",
            "340702": "铜官山区",
            "340703": "狮子山区",
            "340711": "郊区",
            "340721": "铜陵县",
            "340722": "其它区",
            "340800": "安庆市",
            "340802": "迎江区",
            "340803": "大观区",
            "340811": "宜秀区",
            "340822": "怀宁县",
            "340823": "枞阳县",
            "340824": "潜山县",
            "340825": "太湖县",
            "340826": "宿松县",
            "340827": "望江县",
            "340828": "岳西县",
            "340881": "桐城市",
            "340882": "其它区",
            "341000": "黄山市",
            "341002": "屯溪区",
            "341003": "黄山区",
            "341004": "徽州区",
            "341021": "歙县",
            "341022": "休宁县",
            "341023": "黟县",
            "341024": "祁门县",
            "341025": "其它区",
            "341100": "滁州市",
            "341102": "琅琊区",
            "341103": "南谯区",
            "341122": "来安县",
            "341124": "全椒县",
            "341125": "定远县",
            "341126": "凤阳县",
            "341181": "天长市",
            "341182": "明光市",
            "341183": "其它区",
            "341200": "阜阳市",
            "341202": "颍州区",
            "341203": "颍东区",
            "341204": "颍泉区",
            "341221": "临泉县",
            "341222": "太和县",
            "341225": "阜南县",
            "341226": "颍上县",
            "341282": "界首市",
            "341283": "其它区",
            "341300": "宿州市",
            "341302": "埇桥区",
            "341321": "砀山县",
            "341322": "萧县",
            "341323": "灵璧县",
            "341324": "泗县",
            "341325": "其它区",
            "341400": "巢湖市",
            "341421": "庐江县",
            "341422": "无为县",
            "341423": "含山县",
            "341424": "和县",
            "341500": "六安市",
            "341502": "金安区",
            "341503": "裕安区",
            "341521": "寿县",
            "341522": "霍邱县",
            "341523": "舒城县",
            "341524": "金寨县",
            "341525": "霍山县",
            "341526": "其它区",
            "341600": "亳州市",
            "341602": "谯城区",
            "341621": "涡阳县",
            "341622": "蒙城县",
            "341623": "利辛县",
            "341624": "其它区",
            "341700": "池州市",
            "341702": "贵池区",
            "341721": "东至县",
            "341722": "石台县",
            "341723": "青阳县",
            "341724": "其它区",
            "341800": "宣城市",
            "341802": "宣州区",
            "341821": "郎溪县",
            "341822": "广德县",
            "341823": "泾县",
            "341824": "绩溪县",
            "341825": "旌德县",
            "341881": "宁国市",
            "341882": "其它区",
            "350000": "福建省",
            "350100": "福州市",
            "350102": "鼓楼区",
            "350103": "台江区",
            "350104": "仓山区",
            "350105": "马尾区",
            "350111": "晋安区",
            "350121": "闽侯县",
            "350122": "连江县",
            "350123": "罗源县",
            "350124": "闽清县",
            "350125": "永泰县",
            "350128": "平潭县",
            "350181": "福清市",
            "350182": "长乐市",
            "350183": "其它区",
            "350200": "厦门市",
            "350203": "思明区",
            "350205": "海沧区",
            "350206": "湖里区",
            "350211": "集美区",
            "350212": "同安区",
            "350213": "翔安区",
            "350214": "其它区",
            "350300": "莆田市",
            "350302": "城厢区",
            "350303": "涵江区",
            "350304": "荔城区",
            "350305": "秀屿区",
            "350322": "仙游县",
            "350323": "其它区",
            "350400": "三明市",
            "350402": "梅列区",
            "350403": "三元区",
            "350421": "明溪县",
            "350423": "清流县",
            "350424": "宁化县",
            "350425": "大田县",
            "350426": "尤溪县",
            "350427": "沙县",
            "350428": "将乐县",
            "350429": "泰宁县",
            "350430": "建宁县",
            "350481": "永安市",
            "350482": "其它区",
            "350500": "泉州市",
            "350502": "鲤城区",
            "350503": "丰泽区",
            "350504": "洛江区",
            "350505": "泉港区",
            "350521": "惠安县",
            "350524": "安溪县",
            "350525": "永春县",
            "350526": "德化县",
            "350527": "金门县",
            "350581": "石狮市",
            "350582": "晋江市",
            "350583": "南安市",
            "350584": "其它区",
            "350600": "漳州市",
            "350602": "芗城区",
            "350603": "龙文区",
            "350622": "云霄县",
            "350623": "漳浦县",
            "350624": "诏安县",
            "350625": "长泰县",
            "350626": "东山县",
            "350627": "南靖县",
            "350628": "平和县",
            "350629": "华安县",
            "350681": "龙海市",
            "350682": "其它区",
            "350700": "南平市",
            "350702": "延平区",
            "350721": "顺昌县",
            "350722": "浦城县",
            "350723": "光泽县",
            "350724": "松溪县",
            "350725": "政和县",
            "350781": "邵武市",
            "350782": "武夷山市",
            "350783": "建瓯市",
            "350784": "建阳市",
            "350785": "其它区",
            "350800": "龙岩市",
            "350802": "新罗区",
            "350821": "长汀县",
            "350822": "永定县",
            "350823": "上杭县",
            "350824": "武平县",
            "350825": "连城县",
            "350881": "漳平市",
            "350882": "其它区",
            "350900": "宁德市",
            "350902": "蕉城区",
            "350921": "霞浦县",
            "350922": "古田县",
            "350923": "屏南县",
            "350924": "寿宁县",
            "350925": "周宁县",
            "350926": "柘荣县",
            "350981": "福安市",
            "350982": "福鼎市",
            "350983": "其它区",
            "360000": "江西省",
            "360100": "南昌市",
            "360102": "东湖区",
            "360103": "西湖区",
            "360104": "青云谱区",
            "360105": "湾里区",
            "360111": "青山湖区",
            "360121": "南昌县",
            "360122": "新建县",
            "360123": "安义县",
            "360124": "进贤县",
            "360128": "其它区",
            "360200": "景德镇市",
            "360202": "昌江区",
            "360203": "珠山区",
            "360222": "浮梁县",
            "360281": "乐平市",
            "360282": "其它区",
            "360300": "萍乡市",
            "360302": "安源区",
            "360313": "湘东区",
            "360321": "莲花县",
            "360322": "上栗县",
            "360323": "芦溪县",
            "360324": "其它区",
            "360400": "九江市",
            "360402": "庐山区",
            "360403": "浔阳区",
            "360421": "九江县",
            "360423": "武宁县",
            "360424": "修水县",
            "360425": "永修县",
            "360426": "德安县",
            "360427": "星子县",
            "360428": "都昌县",
            "360429": "湖口县",
            "360430": "彭泽县",
            "360481": "瑞昌市",
            "360482": "其它区",
            "360483": "共青城市",
            "360500": "新余市",
            "360502": "渝水区",
            "360521": "分宜县",
            "360522": "其它区",
            "360600": "鹰潭市",
            "360602": "月湖区",
            "360622": "余江县",
            "360681": "贵溪市",
            "360682": "其它区",
            "360700": "赣州市",
            "360702": "章贡区",
            "360721": "赣县",
            "360722": "信丰县",
            "360723": "大余县",
            "360724": "上犹县",
            "360725": "崇义县",
            "360726": "安远县",
            "360727": "龙南县",
            "360728": "定南县",
            "360729": "全南县",
            "360730": "宁都县",
            "360731": "于都县",
            "360732": "兴国县",
            "360733": "会昌县",
            "360734": "寻乌县",
            "360735": "石城县",
            "360781": "瑞金市",
            "360782": "南康市",
            "360783": "其它区",
            "360800": "吉安市",
            "360802": "吉州区",
            "360803": "青原区",
            "360821": "吉安县",
            "360822": "吉水县",
            "360823": "峡江县",
            "360824": "新干县",
            "360825": "永丰县",
            "360826": "泰和县",
            "360827": "遂川县",
            "360828": "万安县",
            "360829": "安福县",
            "360830": "永新县",
            "360881": "井冈山市",
            "360882": "其它区",
            "360900": "宜春市",
            "360902": "袁州区",
            "360921": "奉新县",
            "360922": "万载县",
            "360923": "上高县",
            "360924": "宜丰县",
            "360925": "靖安县",
            "360926": "铜鼓县",
            "360981": "丰城市",
            "360982": "樟树市",
            "360983": "高安市",
            "360984": "其它区",
            "361000": "抚州市",
            "361002": "临川区",
            "361021": "南城县",
            "361022": "黎川县",
            "361023": "南丰县",
            "361024": "崇仁县",
            "361025": "乐安县",
            "361026": "宜黄县",
            "361027": "金溪县",
            "361028": "资溪县",
            "361029": "东乡县",
            "361030": "广昌县",
            "361031": "其它区",
            "361100": "上饶市",
            "361102": "信州区",
            "361121": "上饶县",
            "361122": "广丰县",
            "361123": "玉山县",
            "361124": "铅山县",
            "361125": "横峰县",
            "361126": "弋阳县",
            "361127": "余干县",
            "361128": "鄱阳县",
            "361129": "万年县",
            "361130": "婺源县",
            "361181": "德兴市",
            "361182": "其它区",
            "370000": "山东省",
            "370100": "济南市",
            "370102": "历下区",
            "370103": "市中区",
            "370104": "槐荫区",
            "370105": "天桥区",
            "370112": "历城区",
            "370113": "长清区",
            "370124": "平阴县",
            "370125": "济阳县",
            "370126": "商河县",
            "370181": "章丘市",
            "370182": "其它区",
            "370200": "青岛市",
            "370202": "市南区",
            "370203": "市北区",
            "370211": "黄岛区",
            "370212": "崂山区",
            "370213": "李沧区",
            "370214": "城阳区",
            "370281": "胶州市",
            "370282": "即墨市",
            "370283": "平度市",
            "370285": "莱西市",
            "370286": "其它区",
            "370300": "淄博市",
            "370302": "淄川区",
            "370303": "张店区",
            "370304": "博山区",
            "370305": "临淄区",
            "370306": "周村区",
            "370321": "桓台县",
            "370322": "高青县",
            "370323": "沂源县",
            "370324": "其它区",
            "370400": "枣庄市",
            "370402": "市中区",
            "370403": "薛城区",
            "370404": "峄城区",
            "370405": "台儿庄区",
            "370406": "山亭区",
            "370481": "滕州市",
            "370482": "其它区",
            "370500": "东营市",
            "370502": "东营区",
            "370503": "河口区",
            "370521": "垦利县",
            "370522": "利津县",
            "370523": "广饶县",
            "370591": "其它区",
            "370600": "烟台市",
            "370602": "芝罘区",
            "370611": "福山区",
            "370612": "牟平区",
            "370613": "莱山区",
            "370634": "长岛县",
            "370681": "龙口市",
            "370682": "莱阳市",
            "370683": "莱州市",
            "370684": "蓬莱市",
            "370685": "招远市",
            "370686": "栖霞市",
            "370687": "海阳市",
            "370688": "其它区",
            "370700": "潍坊市",
            "370702": "潍城区",
            "370703": "寒亭区",
            "370704": "坊子区",
            "370705": "奎文区",
            "370724": "临朐县",
            "370725": "昌乐县",
            "370781": "青州市",
            "370782": "诸城市",
            "370783": "寿光市",
            "370784": "安丘市",
            "370785": "高密市",
            "370786": "昌邑市",
            "370787": "其它区",
            "370800": "济宁市",
            "370802": "市中区",
            "370811": "任城区",
            "370826": "微山县",
            "370827": "鱼台县",
            "370828": "金乡县",
            "370829": "嘉祥县",
            "370830": "汶上县",
            "370831": "泗水县",
            "370832": "梁山县",
            "370881": "曲阜市",
            "370882": "兖州市",
            "370883": "邹城市",
            "370884": "其它区",
            "370900": "泰安市",
            "370902": "泰山区",
            "370903": "岱岳区",
            "370921": "宁阳县",
            "370923": "东平县",
            "370982": "新泰市",
            "370983": "肥城市",
            "370984": "其它区",
            "371000": "威海市",
            "371002": "环翠区",
            "371081": "文登市",
            "371082": "荣成市",
            "371083": "乳山市",
            "371084": "其它区",
            "371100": "日照市",
            "371102": "东港区",
            "371103": "岚山区",
            "371121": "五莲县",
            "371122": "莒县",
            "371123": "其它区",
            "371200": "莱芜市",
            "371202": "莱城区",
            "371203": "钢城区",
            "371204": "其它区",
            "371300": "临沂市",
            "371302": "兰山区",
            "371311": "罗庄区",
            "371312": "河东区",
            "371321": "沂南县",
            "371322": "郯城县",
            "371323": "沂水县",
            "371324": "苍山县",
            "371325": "费县",
            "371326": "平邑县",
            "371327": "莒南县",
            "371328": "蒙阴县",
            "371329": "临沭县",
            "371330": "其它区",
            "371400": "德州市",
            "371402": "德城区",
            "371421": "陵县",
            "371422": "宁津县",
            "371423": "庆云县",
            "371424": "临邑县",
            "371425": "齐河县",
            "371426": "平原县",
            "371427": "夏津县",
            "371428": "武城县",
            "371481": "乐陵市",
            "371482": "禹城市",
            "371483": "其它区",
            "371500": "聊城市",
            "371502": "东昌府区",
            "371521": "阳谷县",
            "371522": "莘县",
            "371523": "茌平县",
            "371524": "东阿县",
            "371525": "冠县",
            "371526": "高唐县",
            "371581": "临清市",
            "371582": "其它区",
            "371600": "滨州市",
            "371602": "滨城区",
            "371621": "惠民县",
            "371622": "阳信县",
            "371623": "无棣县",
            "371624": "沾化县",
            "371625": "博兴县",
            "371626": "邹平县",
            "371627": "其它区",
            "371700": "菏泽市",
            "371702": "牡丹区",
            "371721": "曹县",
            "371722": "单县",
            "371723": "成武县",
            "371724": "巨野县",
            "371725": "郓城县",
            "371726": "鄄城县",
            "371727": "定陶县",
            "371728": "东明县",
            "371729": "其它区",
            "410000": "河南省",
            "410100": "郑州市",
            "410102": "中原区",
            "410103": "二七区",
            "410104": "管城回族区",
            "410105": "金水区",
            "410106": "上街区",
            "410108": "惠济区",
            "410122": "中牟县",
            "410181": "巩义市",
            "410182": "荥阳市",
            "410183": "新密市",
            "410184": "新郑市",
            "410185": "登封市",
            "410188": "其它区",
            "410200": "开封市",
            "410202": "龙亭区",
            "410203": "顺河回族区",
            "410204": "鼓楼区",
            "410205": "禹王台区",
            "410211": "金明区",
            "410221": "杞县",
            "410222": "通许县",
            "410223": "尉氏县",
            "410224": "开封县",
            "410225": "兰考县",
            "410226": "其它区",
            "410300": "洛阳市",
            "410302": "老城区",
            "410303": "西工区",
            "410304": "瀍河回族区",
            "410305": "涧西区",
            "410306": "吉利区",
            "410307": "洛龙区",
            "410322": "孟津县",
            "410323": "新安县",
            "410324": "栾川县",
            "410325": "嵩县",
            "410326": "汝阳县",
            "410327": "宜阳县",
            "410328": "洛宁县",
            "410329": "伊川县",
            "410381": "偃师市",
            "410400": "平顶山市",
            "410402": "新华区",
            "410403": "卫东区",
            "410404": "石龙区",
            "410411": "湛河区",
            "410421": "宝丰县",
            "410422": "叶县",
            "410423": "鲁山县",
            "410425": "郏县",
            "410481": "舞钢市",
            "410482": "汝州市",
            "410483": "其它区",
            "410500": "安阳市",
            "410502": "文峰区",
            "410503": "北关区",
            "410505": "殷都区",
            "410506": "龙安区",
            "410522": "安阳县",
            "410523": "汤阴县",
            "410526": "滑县",
            "410527": "内黄县",
            "410581": "林州市",
            "410582": "其它区",
            "410600": "鹤壁市",
            "410602": "鹤山区",
            "410603": "山城区",
            "410611": "淇滨区",
            "410621": "浚县",
            "410622": "淇县",
            "410623": "其它区",
            "410700": "新乡市",
            "410702": "红旗区",
            "410703": "卫滨区",
            "410704": "凤泉区",
            "410711": "牧野区",
            "410721": "新乡县",
            "410724": "获嘉县",
            "410725": "原阳县",
            "410726": "延津县",
            "410727": "封丘县",
            "410728": "长垣县",
            "410781": "卫辉市",
            "410782": "辉县市",
            "410783": "其它区",
            "410800": "焦作市",
            "410802": "解放区",
            "410803": "中站区",
            "410804": "马村区",
            "410811": "山阳区",
            "410821": "修武县",
            "410822": "博爱县",
            "410823": "武陟县",
            "410825": "温县",
            "410881": "济源市",
            "410882": "沁阳市",
            "410883": "孟州市",
            "410884": "其它区",
            "410900": "濮阳市",
            "410902": "华龙区",
            "410922": "清丰县",
            "410923": "南乐县",
            "410926": "范县",
            "410927": "台前县",
            "410928": "濮阳县",
            "410929": "其它区",
            "411000": "许昌市",
            "411002": "魏都区",
            "411023": "许昌县",
            "411024": "鄢陵县",
            "411025": "襄城县",
            "411081": "禹州市",
            "411082": "长葛市",
            "411083": "其它区",
            "411100": "漯河市",
            "411102": "源汇区",
            "411103": "郾城区",
            "411104": "召陵区",
            "411121": "舞阳县",
            "411122": "临颍县",
            "411123": "其它区",
            "411200": "三门峡市",
            "411202": "湖滨区",
            "411221": "渑池县",
            "411222": "陕县",
            "411224": "卢氏县",
            "411281": "义马市",
            "411282": "灵宝市",
            "411283": "其它区",
            "411300": "南阳市",
            "411302": "宛城区",
            "411303": "卧龙区",
            "411321": "南召县",
            "411322": "方城县",
            "411323": "西峡县",
            "411324": "镇平县",
            "411325": "内乡县",
            "411326": "淅川县",
            "411327": "社旗县",
            "411328": "唐河县",
            "411329": "新野县",
            "411330": "桐柏县",
            "411381": "邓州市",
            "411382": "其它区",
            "411400": "商丘市",
            "411402": "梁园区",
            "411403": "睢阳区",
            "411421": "民权县",
            "411422": "睢县",
            "411423": "宁陵县",
            "411424": "柘城县",
            "411425": "虞城县",
            "411426": "夏邑县",
            "411481": "永城市",
            "411482": "其它区",
            "411500": "信阳市",
            "411502": "浉河区",
            "411503": "平桥区",
            "411521": "罗山县",
            "411522": "光山县",
            "411523": "新县",
            "411524": "商城县",
            "411525": "固始县",
            "411526": "潢川县",
            "411527": "淮滨县",
            "411528": "息县",
            "411529": "其它区",
            "411600": "周口市",
            "411602": "川汇区",
            "411621": "扶沟县",
            "411622": "西华县",
            "411623": "商水县",
            "411624": "沈丘县",
            "411625": "郸城县",
            "411626": "淮阳县",
            "411627": "太康县",
            "411628": "鹿邑县",
            "411681": "项城市",
            "411682": "其它区",
            "411700": "驻马店市",
            "411702": "驿城区",
            "411721": "西平县",
            "411722": "上蔡县",
            "411723": "平舆县",
            "411724": "正阳县",
            "411725": "确山县",
            "411726": "泌阳县",
            "411727": "汝南县",
            "411728": "遂平县",
            "411729": "新蔡县",
            "411730": "其它区",
            "420000": "湖北省",
            "420100": "武汉市",
            "420102": "江岸区",
            "420103": "江汉区",
            "420104": "硚口区",
            "420105": "汉阳区",
            "420106": "武昌区",
            "420107": "青山区",
            "420111": "洪山区",
            "420112": "东西湖区",
            "420113": "汉南区",
            "420114": "蔡甸区",
            "420115": "江夏区",
            "420116": "黄陂区",
            "420117": "新洲区",
            "420118": "其它区",
            "420200": "黄石市",
            "420202": "黄石港区",
            "420203": "西塞山区",
            "420204": "下陆区",
            "420205": "铁山区",
            "420222": "阳新县",
            "420281": "大冶市",
            "420282": "其它区",
            "420300": "十堰市",
            "420302": "茅箭区",
            "420303": "张湾区",
            "420321": "郧县",
            "420322": "郧西县",
            "420323": "竹山县",
            "420324": "竹溪县",
            "420325": "房县",
            "420381": "丹江口市",
            "420383": "其它区",
            "420500": "宜昌市",
            "420502": "西陵区",
            "420503": "伍家岗区",
            "420504": "点军区",
            "420505": "猇亭区",
            "420506": "夷陵区",
            "420525": "远安县",
            "420526": "兴山县",
            "420527": "秭归县",
            "420528": "长阳土家族自治县",
            "420529": "五峰土家族自治县",
            "420581": "宜都市",
            "420582": "当阳市",
            "420583": "枝江市",
            "420584": "其它区",
            "420600": "襄阳市",
            "420602": "襄城区",
            "420606": "樊城区",
            "420607": "襄州区",
            "420624": "南漳县",
            "420625": "谷城县",
            "420626": "保康县",
            "420682": "老河口市",
            "420683": "枣阳市",
            "420684": "宜城市",
            "420685": "其它区",
            "420700": "鄂州市",
            "420702": "梁子湖区",
            "420703": "华容区",
            "420704": "鄂城区",
            "420705": "其它区",
            "420800": "荆门市",
            "420802": "东宝区",
            "420804": "掇刀区",
            "420821": "京山县",
            "420822": "沙洋县",
            "420881": "钟祥市",
            "420882": "其它区",
            "420900": "孝感市",
            "420902": "孝南区",
            "420921": "孝昌县",
            "420922": "大悟县",
            "420923": "云梦县",
            "420981": "应城市",
            "420982": "安陆市",
            "420984": "汉川市",
            "420985": "其它区",
            "421000": "荆州市",
            "421002": "沙市区",
            "421003": "荆州区",
            "421022": "公安县",
            "421023": "监利县",
            "421024": "江陵县",
            "421081": "石首市",
            "421083": "洪湖市",
            "421087": "松滋市",
            "421088": "其它区",
            "421100": "黄冈市",
            "421102": "黄州区",
            "421121": "团风县",
            "421122": "红安县",
            "421123": "罗田县",
            "421124": "英山县",
            "421125": "浠水县",
            "421126": "蕲春县",
            "421127": "黄梅县",
            "421181": "麻城市",
            "421182": "武穴市",
            "421183": "其它区",
            "421200": "咸宁市",
            "421202": "咸安区",
            "421221": "嘉鱼县",
            "421222": "通城县",
            "421223": "崇阳县",
            "421224": "通山县",
            "421281": "赤壁市",
            "421283": "其它区",
            "421300": "随州市",
            "421302": "曾都区",
            "421321": "随县",
            "421381": "广水市",
            "421382": "其它区",
            "422800": "恩施土家族苗族自治州",
            "422801": "恩施市",
            "422802": "利川市",
            "422822": "建始县",
            "422823": "巴东县",
            "422825": "宣恩县",
            "422826": "咸丰县",
            "422827": "来凤县",
            "422828": "鹤峰县",
            "422829": "其它区",
            "429004": "仙桃市",
            "429005": "潜江市",
            "429006": "天门市",
            "429021": "神农架林区",
            "430000": "湖南省",
            "430100": "长沙市",
            "430102": "芙蓉区",
            "430103": "天心区",
            "430104": "岳麓区",
            "430105": "开福区",
            "430111": "雨花区",
            "430121": "长沙县",
            "430122": "望城区",
            "430124": "宁乡县",
            "430181": "浏阳市",
            "430182": "其它区",
            "430200": "株洲市",
            "430202": "荷塘区",
            "430203": "芦淞区",
            "430204": "石峰区",
            "430211": "天元区",
            "430221": "株洲县",
            "430223": "攸县",
            "430224": "茶陵县",
            "430225": "炎陵县",
            "430281": "醴陵市",
            "430282": "其它区",
            "430300": "湘潭市",
            "430302": "雨湖区",
            "430304": "岳塘区",
            "430321": "湘潭县",
            "430381": "湘乡市",
            "430382": "韶山市",
            "430383": "其它区",
            "430400": "衡阳市",
            "430405": "珠晖区",
            "430406": "雁峰区",
            "430407": "石鼓区",
            "430408": "蒸湘区",
            "430412": "南岳区",
            "430421": "衡阳县",
            "430422": "衡南县",
            "430423": "衡山县",
            "430424": "衡东县",
            "430426": "祁东县",
            "430481": "耒阳市",
            "430482": "常宁市",
            "430483": "其它区",
            "430500": "邵阳市",
            "430502": "双清区",
            "430503": "大祥区",
            "430511": "北塔区",
            "430521": "邵东县",
            "430522": "新邵县",
            "430523": "邵阳县",
            "430524": "隆回县",
            "430525": "洞口县",
            "430527": "绥宁县",
            "430528": "新宁县",
            "430529": "城步苗族自治县",
            "430581": "武冈市",
            "430582": "其它区",
            "430600": "岳阳市",
            "430602": "岳阳楼区",
            "430603": "云溪区",
            "430611": "君山区",
            "430621": "岳阳县",
            "430623": "华容县",
            "430624": "湘阴县",
            "430626": "平江县",
            "430681": "汨罗市",
            "430682": "临湘市",
            "430683": "其它区",
            "430700": "常德市",
            "430702": "武陵区",
            "430703": "鼎城区",
            "430721": "安乡县",
            "430722": "汉寿县",
            "430723": "澧县",
            "430724": "临澧县",
            "430725": "桃源县",
            "430726": "石门县",
            "430781": "津市市",
            "430782": "其它区",
            "430800": "张家界市",
            "430802": "永定区",
            "430811": "武陵源区",
            "430821": "慈利县",
            "430822": "桑植县",
            "430823": "其它区",
            "430900": "益阳市",
            "430902": "资阳区",
            "430903": "赫山区",
            "430921": "南县",
            "430922": "桃江县",
            "430923": "安化县",
            "430981": "沅江市",
            "430982": "其它区",
            "431000": "郴州市",
            "431002": "北湖区",
            "431003": "苏仙区",
            "431021": "桂阳县",
            "431022": "宜章县",
            "431023": "永兴县",
            "431024": "嘉禾县",
            "431025": "临武县",
            "431026": "汝城县",
            "431027": "桂东县",
            "431028": "安仁县",
            "431081": "资兴市",
            "431082": "其它区",
            "431100": "永州市",
            "431102": "零陵区",
            "431103": "冷水滩区",
            "431121": "祁阳县",
            "431122": "东安县",
            "431123": "双牌县",
            "431124": "道县",
            "431125": "江永县",
            "431126": "宁远县",
            "431127": "蓝山县",
            "431128": "新田县",
            "431129": "江华瑶族自治县",
            "431130": "其它区",
            "431200": "怀化市",
            "431202": "鹤城区",
            "431221": "中方县",
            "431222": "沅陵县",
            "431223": "辰溪县",
            "431224": "溆浦县",
            "431225": "会同县",
            "431226": "麻阳苗族自治县",
            "431227": "新晃侗族自治县",
            "431228": "芷江侗族自治县",
            "431229": "靖州苗族侗族自治县",
            "431230": "通道侗族自治县",
            "431281": "洪江市",
            "431282": "其它区",
            "431300": "娄底市",
            "431302": "娄星区",
            "431321": "双峰县",
            "431322": "新化县",
            "431381": "冷水江市",
            "431382": "涟源市",
            "431383": "其它区",
            "433100": "湘西土家族苗族自治州",
            "433101": "吉首市",
            "433122": "泸溪县",
            "433123": "凤凰县",
            "433124": "花垣县",
            "433125": "保靖县",
            "433126": "古丈县",
            "433127": "永顺县",
            "433130": "龙山县",
            "433131": "其它区",
            "440000": "广东省",
            "440100": "广州市",
            "440103": "荔湾区",
            "440104": "越秀区",
            "440105": "海珠区",
            "440106": "天河区",
            "440111": "白云区",
            "440112": "黄埔区",
            "440113": "番禺区",
            "440114": "花都区",
            "440115": "南沙区",
            "440116": "萝岗区",
            "440183": "增城市",
            "440184": "从化市",
            "440189": "其它区",
            "440200": "韶关市",
            "440203": "武江区",
            "440204": "浈江区",
            "440205": "曲江区",
            "440222": "始兴县",
            "440224": "仁化县",
            "440229": "翁源县",
            "440232": "乳源瑶族自治县",
            "440233": "新丰县",
            "440281": "乐昌市",
            "440282": "南雄市",
            "440283": "其它区",
            "440300": "深圳市",
            "440303": "罗湖区",
            "440304": "福田区",
            "440305": "南山区",
            "440306": "宝安区",
            "440307": "龙岗区",
            "440308": "盐田区",
            "440309": "其它区",
            "440320": "光明新区",
            "440321": "坪山新区",
            "440322": "大鹏新区",
            "440323": "龙华新区",
            "440400": "珠海市",
            "440402": "香洲区",
            "440403": "斗门区",
            "440404": "金湾区",
            "440488": "其它区",
            "440500": "汕头市",
            "440507": "龙湖区",
            "440511": "金平区",
            "440512": "濠江区",
            "440513": "潮阳区",
            "440514": "潮南区",
            "440515": "澄海区",
            "440523": "南澳县",
            "440524": "其它区",
            "440600": "佛山市",
            "440604": "禅城区",
            "440605": "南海区",
            "440606": "顺德区",
            "440607": "三水区",
            "440608": "高明区",
            "440609": "其它区",
            "440700": "江门市",
            "440703": "蓬江区",
            "440704": "江海区",
            "440705": "新会区",
            "440781": "台山市",
            "440783": "开平市",
            "440784": "鹤山市",
            "440785": "恩平市",
            "440786": "其它区",
            "440800": "湛江市",
            "440802": "赤坎区",
            "440803": "霞山区",
            "440804": "坡头区",
            "440811": "麻章区",
            "440823": "遂溪县",
            "440825": "徐闻县",
            "440881": "廉江市",
            "440882": "雷州市",
            "440883": "吴川市",
            "440884": "其它区",
            "440900": "茂名市",
            "440902": "茂南区",
            "440903": "茂港区",
            "440923": "电白县",
            "440981": "高州市",
            "440982": "化州市",
            "440983": "信宜市",
            "440984": "其它区",
            "441200": "肇庆市",
            "441202": "端州区",
            "441203": "鼎湖区",
            "441223": "广宁县",
            "441224": "怀集县",
            "441225": "封开县",
            "441226": "德庆县",
            "441283": "高要市",
            "441284": "四会市",
            "441285": "其它区",
            "441300": "惠州市",
            "441302": "惠城区",
            "441303": "惠阳区",
            "441322": "博罗县",
            "441323": "惠东县",
            "441324": "龙门县",
            "441325": "其它区",
            "441400": "梅州市",
            "441402": "梅江区",
            "441421": "梅县",
            "441422": "大埔县",
            "441423": "丰顺县",
            "441424": "五华县",
            "441426": "平远县",
            "441427": "蕉岭县",
            "441481": "兴宁市",
            "441482": "其它区",
            "441500": "汕尾市",
            "441502": "城区",
            "441521": "海丰县",
            "441523": "陆河县",
            "441581": "陆丰市",
            "441582": "其它区",
            "441600": "河源市",
            "441602": "源城区",
            "441621": "紫金县",
            "441622": "龙川县",
            "441623": "连平县",
            "441624": "和平县",
            "441625": "东源县",
            "441626": "其它区",
            "441700": "阳江市",
            "441702": "江城区",
            "441721": "阳西县",
            "441723": "阳东县",
            "441781": "阳春市",
            "441782": "其它区",
            "441800": "清远市",
            "441802": "清城区",
            "441821": "佛冈县",
            "441823": "阳山县",
            "441825": "连山壮族瑶族自治县",
            "441826": "连南瑶族自治县",
            "441827": "清新区",
            "441881": "英德市",
            "441882": "连州市",
            "441883": "其它区",
            "441900": "东莞市",
            "442000": "中山市",
            "442101": "东沙群岛",
            "445100": "潮州市",
            "445102": "湘桥区",
            "445121": "潮安区",
            "445122": "饶平县",
            "445186": "其它区",
            "445200": "揭阳市",
            "445202": "榕城区",
            "445221": "揭东区",
            "445222": "揭西县",
            "445224": "惠来县",
            "445281": "普宁市",
            "445285": "其它区",
            "445300": "云浮市",
            "445302": "云城区",
            "445321": "新兴县",
            "445322": "郁南县",
            "445323": "云安县",
            "445381": "罗定市",
            "445382": "其它区",
            "450000": "广西壮族自治区",
            "450100": "南宁市",
            "450102": "兴宁区",
            "450103": "青秀区",
            "450105": "江南区",
            "450107": "西乡塘区",
            "450108": "良庆区",
            "450109": "邕宁区",
            "450122": "武鸣县",
            "450123": "隆安县",
            "450124": "马山县",
            "450125": "上林县",
            "450126": "宾阳县",
            "450127": "横县",
            "450128": "其它区",
            "450200": "柳州市",
            "450202": "城中区",
            "450203": "鱼峰区",
            "450204": "柳南区",
            "450205": "柳北区",
            "450221": "柳江县",
            "450222": "柳城县",
            "450223": "鹿寨县",
            "450224": "融安县",
            "450225": "融水苗族自治县",
            "450226": "三江侗族自治县",
            "450227": "其它区",
            "450300": "桂林市",
            "450302": "秀峰区",
            "450303": "叠彩区",
            "450304": "象山区",
            "450305": "七星区",
            "450311": "雁山区",
            "450321": "阳朔县",
            "450322": "临桂区",
            "450323": "灵川县",
            "450324": "全州县",
            "450325": "兴安县",
            "450326": "永福县",
            "450327": "灌阳县",
            "450328": "龙胜各族自治县",
            "450329": "资源县",
            "450330": "平乐县",
            "450331": "荔浦县",
            "450332": "恭城瑶族自治县",
            "450333": "其它区",
            "450400": "梧州市",
            "450403": "万秀区",
            "450405": "长洲区",
            "450406": "龙圩区",
            "450421": "苍梧县",
            "450422": "藤县",
            "450423": "蒙山县",
            "450481": "岑溪市",
            "450482": "其它区",
            "450500": "北海市",
            "450502": "海城区",
            "450503": "银海区",
            "450512": "铁山港区",
            "450521": "合浦县",
            "450522": "其它区",
            "450600": "防城港市",
            "450602": "港口区",
            "450603": "防城区",
            "450621": "上思县",
            "450681": "东兴市",
            "450682": "其它区",
            "450700": "钦州市",
            "450702": "钦南区",
            "450703": "钦北区",
            "450721": "灵山县",
            "450722": "浦北县",
            "450723": "其它区",
            "450800": "贵港市",
            "450802": "港北区",
            "450803": "港南区",
            "450804": "覃塘区",
            "450821": "平南县",
            "450881": "桂平市",
            "450882": "其它区",
            "450900": "玉林市",
            "450902": "玉州区",
            "450903": "福绵区",
            "450921": "容县",
            "450922": "陆川县",
            "450923": "博白县",
            "450924": "兴业县",
            "450981": "北流市",
            "450982": "其它区",
            "451000": "百色市",
            "451002": "右江区",
            "451021": "田阳县",
            "451022": "田东县",
            "451023": "平果县",
            "451024": "德保县",
            "451025": "靖西县",
            "451026": "那坡县",
            "451027": "凌云县",
            "451028": "乐业县",
            "451029": "田林县",
            "451030": "西林县",
            "451031": "隆林各族自治县",
            "451032": "其它区",
            "451100": "贺州市",
            "451102": "八步区",
            "451119": "平桂管理区",
            "451121": "昭平县",
            "451122": "钟山县",
            "451123": "富川瑶族自治县",
            "451124": "其它区",
            "451200": "河池市",
            "451202": "金城江区",
            "451221": "南丹县",
            "451222": "天峨县",
            "451223": "凤山县",
            "451224": "东兰县",
            "451225": "罗城仫佬族自治县",
            "451226": "环江毛南族自治县",
            "451227": "巴马瑶族自治县",
            "451228": "都安瑶族自治县",
            "451229": "大化瑶族自治县",
            "451281": "宜州市",
            "451282": "其它区",
            "451300": "来宾市",
            "451302": "兴宾区",
            "451321": "忻城县",
            "451322": "象州县",
            "451323": "武宣县",
            "451324": "金秀瑶族自治县",
            "451381": "合山市",
            "451382": "其它区",
            "451400": "崇左市",
            "451402": "江州区",
            "451421": "扶绥县",
            "451422": "宁明县",
            "451423": "龙州县",
            "451424": "大新县",
            "451425": "天等县",
            "451481": "凭祥市",
            "451482": "其它区",
            "460000": "海南省",
            "460100": "海口市",
            "460105": "秀英区",
            "460106": "龙华区",
            "460107": "琼山区",
            "460108": "美兰区",
            "460109": "其它区",
            "460200": "三亚市",
            "460300": "三沙市",
            "460321": "西沙群岛",
            "460322": "南沙群岛",
            "460323": "中沙群岛的岛礁及其海域",
            "469001": "五指山市",
            "469002": "琼海市",
            "469003": "儋州市",
            "469005": "文昌市",
            "469006": "万宁市",
            "469007": "东方市",
            "469025": "定安县",
            "469026": "屯昌县",
            "469027": "澄迈县",
            "469028": "临高县",
            "469030": "白沙黎族自治县",
            "469031": "昌江黎族自治县",
            "469033": "乐东黎族自治县",
            "469034": "陵水黎族自治县",
            "469035": "保亭黎族苗族自治县",
            "469036": "琼中黎族苗族自治县",
            "471005": "其它区",
            "500000": "重庆",
            "500100": "重庆市",
            "500101": "万州区",
            "500102": "涪陵区",
            "500103": "渝中区",
            "500104": "大渡口区",
            "500105": "江北区",
            "500106": "沙坪坝区",
            "500107": "九龙坡区",
            "500108": "南岸区",
            "500109": "北碚区",
            "500110": "万盛区",
            "500111": "双桥区",
            "500112": "渝北区",
            "500113": "巴南区",
            "500114": "黔江区",
            "500115": "长寿区",
            "500222": "綦江区",
            "500223": "潼南县",
            "500224": "铜梁县",
            "500225": "大足区",
            "500226": "荣昌县",
            "500227": "璧山县",
            "500228": "梁平县",
            "500229": "城口县",
            "500230": "丰都县",
            "500231": "垫江县",
            "500232": "武隆县",
            "500233": "忠县",
            "500234": "开县",
            "500235": "云阳县",
            "500236": "奉节县",
            "500237": "巫山县",
            "500238": "巫溪县",
            "500240": "石柱土家族自治县",
            "500241": "秀山土家族苗族自治县",
            "500242": "酉阳土家族苗族自治县",
            "500243": "彭水苗族土家族自治县",
            "500381": "江津区",
            "500382": "合川区",
            "500383": "永川区",
            "500384": "南川区",
            "500385": "其它区",
            "510000": "四川省",
            "510100": "成都市",
            "510104": "锦江区",
            "510105": "青羊区",
            "510106": "金牛区",
            "510107": "武侯区",
            "510108": "成华区",
            "510112": "龙泉驿区",
            "510113": "青白江区",
            "510114": "新都区",
            "510115": "温江区",
            "510121": "金堂县",
            "510122": "双流县",
            "510124": "郫县",
            "510129": "大邑县",
            "510131": "蒲江县",
            "510132": "新津县",
            "510181": "都江堰市",
            "510182": "彭州市",
            "510183": "邛崃市",
            "510184": "崇州市",
            "510185": "其它区",
            "510300": "自贡市",
            "510302": "自流井区",
            "510303": "贡井区",
            "510304": "大安区",
            "510311": "沿滩区",
            "510321": "荣县",
            "510322": "富顺县",
            "510323": "其它区",
            "510400": "攀枝花市",
            "510402": "东区",
            "510403": "西区",
            "510411": "仁和区",
            "510421": "米易县",
            "510422": "盐边县",
            "510423": "其它区",
            "510500": "泸州市",
            "510502": "江阳区",
            "510503": "纳溪区",
            "510504": "龙马潭区",
            "510521": "泸县",
            "510522": "合江县",
            "510524": "叙永县",
            "510525": "古蔺县",
            "510526": "其它区",
            "510600": "德阳市",
            "510603": "旌阳区",
            "510623": "中江县",
            "510626": "罗江县",
            "510681": "广汉市",
            "510682": "什邡市",
            "510683": "绵竹市",
            "510684": "其它区",
            "510700": "绵阳市",
            "510703": "涪城区",
            "510704": "游仙区",
            "510722": "三台县",
            "510723": "盐亭县",
            "510724": "安县",
            "510725": "梓潼县",
            "510726": "北川羌族自治县",
            "510727": "平武县",
            "510781": "江油市",
            "510782": "其它区",
            "510800": "广元市",
            "510802": "利州区",
            "510811": "昭化区",
            "510812": "朝天区",
            "510821": "旺苍县",
            "510822": "青川县",
            "510823": "剑阁县",
            "510824": "苍溪县",
            "510825": "其它区",
            "510900": "遂宁市",
            "510903": "船山区",
            "510904": "安居区",
            "510921": "蓬溪县",
            "510922": "射洪县",
            "510923": "大英县",
            "510924": "其它区",
            "511000": "内江市",
            "511002": "市中区",
            "511011": "东兴区",
            "511024": "威远县",
            "511025": "资中县",
            "511028": "隆昌县",
            "511029": "其它区",
            "511100": "乐山市",
            "511102": "市中区",
            "511111": "沙湾区",
            "511112": "五通桥区",
            "511113": "金口河区",
            "511123": "犍为县",
            "511124": "井研县",
            "511126": "夹江县",
            "511129": "沐川县",
            "511132": "峨边彝族自治县",
            "511133": "马边彝族自治县",
            "511181": "峨眉山市",
            "511182": "其它区",
            "511300": "南充市",
            "511302": "顺庆区",
            "511303": "高坪区",
            "511304": "嘉陵区",
            "511321": "南部县",
            "511322": "营山县",
            "511323": "蓬安县",
            "511324": "仪陇县",
            "511325": "西充县",
            "511381": "阆中市",
            "511382": "其它区",
            "511400": "眉山市",
            "511402": "东坡区",
            "511421": "仁寿县",
            "511422": "彭山县",
            "511423": "洪雅县",
            "511424": "丹棱县",
            "511425": "青神县",
            "511426": "其它区",
            "511500": "宜宾市",
            "511502": "翠屏区",
            "511521": "宜宾县",
            "511522": "南溪区",
            "511523": "江安县",
            "511524": "长宁县",
            "511525": "高县",
            "511526": "珙县",
            "511527": "筠连县",
            "511528": "兴文县",
            "511529": "屏山县",
            "511530": "其它区",
            "511600": "广安市",
            "511602": "广安区",
            "511603": "前锋区",
            "511621": "岳池县",
            "511622": "武胜县",
            "511623": "邻水县",
            "511681": "华蓥市",
            "511683": "其它区",
            "511700": "达州市",
            "511702": "通川区",
            "511721": "达川区",
            "511722": "宣汉县",
            "511723": "开江县",
            "511724": "大竹县",
            "511725": "渠县",
            "511781": "万源市",
            "511782": "其它区",
            "511800": "雅安市",
            "511802": "雨城区",
            "511821": "名山区",
            "511822": "荥经县",
            "511823": "汉源县",
            "511824": "石棉县",
            "511825": "天全县",
            "511826": "芦山县",
            "511827": "宝兴县",
            "511828": "其它区",
            "511900": "巴中市",
            "511902": "巴州区",
            "511903": "恩阳区",
            "511921": "通江县",
            "511922": "南江县",
            "511923": "平昌县",
            "511924": "其它区",
            "512000": "资阳市",
            "512002": "雁江区",
            "512021": "安岳县",
            "512022": "乐至县",
            "512081": "简阳市",
            "512082": "其它区",
            "513200": "阿坝藏族羌族自治州",
            "513221": "汶川县",
            "513222": "理县",
            "513223": "茂县",
            "513224": "松潘县",
            "513225": "九寨沟县",
            "513226": "金川县",
            "513227": "小金县",
            "513228": "黑水县",
            "513229": "马尔康县",
            "513230": "壤塘县",
            "513231": "阿坝县",
            "513232": "若尔盖县",
            "513233": "红原县",
            "513234": "其它区",
            "513300": "甘孜藏族自治州",
            "513321": "康定县",
            "513322": "泸定县",
            "513323": "丹巴县",
            "513324": "九龙县",
            "513325": "雅江县",
            "513326": "道孚县",
            "513327": "炉霍县",
            "513328": "甘孜县",
            "513329": "新龙县",
            "513330": "德格县",
            "513331": "白玉县",
            "513332": "石渠县",
            "513333": "色达县",
            "513334": "理塘县",
            "513335": "巴塘县",
            "513336": "乡城县",
            "513337": "稻城县",
            "513338": "得荣县",
            "513339": "其它区",
            "513400": "凉山彝族自治州",
            "513401": "西昌市",
            "513422": "木里藏族自治县",
            "513423": "盐源县",
            "513424": "德昌县",
            "513425": "会理县",
            "513426": "会东县",
            "513427": "宁南县",
            "513428": "普格县",
            "513429": "布拖县",
            "513430": "金阳县",
            "513431": "昭觉县",
            "513432": "喜德县",
            "513433": "冕宁县",
            "513434": "越西县",
            "513435": "甘洛县",
            "513436": "美姑县",
            "513437": "雷波县",
            "513438": "其它区",
            "520000": "贵州省",
            "520100": "贵阳市",
            "520102": "南明区",
            "520103": "云岩区",
            "520111": "花溪区",
            "520112": "乌当区",
            "520113": "白云区",
            "520121": "开阳县",
            "520122": "息烽县",
            "520123": "修文县",
            "520151": "观山湖区",
            "520181": "清镇市",
            "520182": "其它区",
            "520200": "六盘水市",
            "520201": "钟山区",
            "520203": "六枝特区",
            "520221": "水城县",
            "520222": "盘县",
            "520223": "其它区",
            "520300": "遵义市",
            "520302": "红花岗区",
            "520303": "汇川区",
            "520321": "遵义县",
            "520322": "桐梓县",
            "520323": "绥阳县",
            "520324": "正安县",
            "520325": "道真仡佬族苗族自治县",
            "520326": "务川仡佬族苗族自治县",
            "520327": "凤冈县",
            "520328": "湄潭县",
            "520329": "余庆县",
            "520330": "习水县",
            "520381": "赤水市",
            "520382": "仁怀市",
            "520383": "其它区",
            "520400": "安顺市",
            "520402": "西秀区",
            "520421": "平坝县",
            "520422": "普定县",
            "520423": "镇宁布依族苗族自治县",
            "520424": "关岭布依族苗族自治县",
            "520425": "紫云苗族布依族自治县",
            "520426": "其它区",
            "522200": "铜仁市",
            "522201": "碧江区",
            "522222": "江口县",
            "522223": "玉屏侗族自治县",
            "522224": "石阡县",
            "522225": "思南县",
            "522226": "印江土家族苗族自治县",
            "522227": "德江县",
            "522228": "沿河土家族自治县",
            "522229": "松桃苗族自治县",
            "522230": "万山区",
            "522231": "其它区",
            "522300": "黔西南布依族苗族自治州",
            "522301": "兴义市",
            "522322": "兴仁县",
            "522323": "普安县",
            "522324": "晴隆县",
            "522325": "贞丰县",
            "522326": "望谟县",
            "522327": "册亨县",
            "522328": "安龙县",
            "522329": "其它区",
            "522400": "毕节市",
            "522401": "七星关区",
            "522422": "大方县",
            "522423": "黔西县",
            "522424": "金沙县",
            "522425": "织金县",
            "522426": "纳雍县",
            "522427": "威宁彝族回族苗族自治县",
            "522428": "赫章县",
            "522429": "其它区",
            "522600": "黔东南苗族侗族自治州",
            "522601": "凯里市",
            "522622": "黄平县",
            "522623": "施秉县",
            "522624": "三穗县",
            "522625": "镇远县",
            "522626": "岑巩县",
            "522627": "天柱县",
            "522628": "锦屏县",
            "522629": "剑河县",
            "522630": "台江县",
            "522631": "黎平县",
            "522632": "榕江县",
            "522633": "从江县",
            "522634": "雷山县",
            "522635": "麻江县",
            "522636": "丹寨县",
            "522637": "其它区",
            "522700": "黔南布依族苗族自治州",
            "522701": "都匀市",
            "522702": "福泉市",
            "522722": "荔波县",
            "522723": "贵定县",
            "522725": "瓮安县",
            "522726": "独山县",
            "522727": "平塘县",
            "522728": "罗甸县",
            "522729": "长顺县",
            "522730": "龙里县",
            "522731": "惠水县",
            "522732": "三都水族自治县",
            "522733": "其它区",
            "530000": "云南省",
            "530100": "昆明市",
            "530102": "五华区",
            "530103": "盘龙区",
            "530111": "官渡区",
            "530112": "西山区",
            "530113": "东川区",
            "530121": "呈贡区",
            "530122": "晋宁县",
            "530124": "富民县",
            "530125": "宜良县",
            "530126": "石林彝族自治县",
            "530127": "嵩明县",
            "530128": "禄劝彝族苗族自治县",
            "530129": "寻甸回族彝族自治县",
            "530181": "安宁市",
            "530182": "其它区",
            "530300": "曲靖市",
            "530302": "麒麟区",
            "530321": "马龙县",
            "530322": "陆良县",
            "530323": "师宗县",
            "530324": "罗平县",
            "530325": "富源县",
            "530326": "会泽县",
            "530328": "沾益县",
            "530381": "宣威市",
            "530382": "其它区",
            "530400": "玉溪市",
            "530402": "红塔区",
            "530421": "江川县",
            "530422": "澄江县",
            "530423": "通海县",
            "530424": "华宁县",
            "530425": "易门县",
            "530426": "峨山彝族自治县",
            "530427": "新平彝族傣族自治县",
            "530428": "元江哈尼族彝族傣族自治县",
            "530429": "其它区",
            "530500": "保山市",
            "530502": "隆阳区",
            "530521": "施甸县",
            "530522": "腾冲县",
            "530523": "龙陵县",
            "530524": "昌宁县",
            "530525": "其它区",
            "530600": "昭通市",
            "530602": "昭阳区",
            "530621": "鲁甸县",
            "530622": "巧家县",
            "530623": "盐津县",
            "530624": "大关县",
            "530625": "永善县",
            "530626": "绥江县",
            "530627": "镇雄县",
            "530628": "彝良县",
            "530629": "威信县",
            "530630": "水富县",
            "530631": "其它区",
            "530700": "丽江市",
            "530702": "古城区",
            "530721": "玉龙纳西族自治县",
            "530722": "永胜县",
            "530723": "华坪县",
            "530724": "宁蒗彝族自治县",
            "530725": "其它区",
            "530800": "普洱市",
            "530802": "思茅区",
            "530821": "宁洱哈尼族彝族自治县",
            "530822": "墨江哈尼族自治县",
            "530823": "景东彝族自治县",
            "530824": "景谷傣族彝族自治县",
            "530825": "镇沅彝族哈尼族拉祜族自治县",
            "530826": "江城哈尼族彝族自治县",
            "530827": "孟连傣族拉祜族佤族自治县",
            "530828": "澜沧拉祜族自治县",
            "530829": "西盟佤族自治县",
            "530830": "其它区",
            "530900": "临沧市",
            "530902": "临翔区",
            "530921": "凤庆县",
            "530922": "云县",
            "530923": "永德县",
            "530924": "镇康县",
            "530925": "双江拉祜族佤族布朗族傣族自治县",
            "530926": "耿马傣族佤族自治县",
            "530927": "沧源佤族自治县",
            "530928": "其它区",
            "532300": "楚雄彝族自治州",
            "532301": "楚雄市",
            "532322": "双柏县",
            "532323": "牟定县",
            "532324": "南华县",
            "532325": "姚安县",
            "532326": "大姚县",
            "532327": "永仁县",
            "532328": "元谋县",
            "532329": "武定县",
            "532331": "禄丰县",
            "532332": "其它区",
            "532500": "红河哈尼族彝族自治州",
            "532501": "个旧市",
            "532502": "开远市",
            "532522": "蒙自市",
            "532523": "屏边苗族自治县",
            "532524": "建水县",
            "532525": "石屏县",
            "532526": "弥勒市",
            "532527": "泸西县",
            "532528": "元阳县",
            "532529": "红河县",
            "532530": "金平苗族瑶族傣族自治县",
            "532531": "绿春县",
            "532532": "河口瑶族自治县",
            "532533": "其它区",
            "532600": "文山壮族苗族自治州",
            "532621": "文山市",
            "532622": "砚山县",
            "532623": "西畴县",
            "532624": "麻栗坡县",
            "532625": "马关县",
            "532626": "丘北县",
            "532627": "广南县",
            "532628": "富宁县",
            "532629": "其它区",
            "532800": "西双版纳傣族自治州",
            "532801": "景洪市",
            "532822": "勐海县",
            "532823": "勐腊县",
            "532824": "其它区",
            "532900": "大理白族自治州",
            "532901": "大理市",
            "532922": "漾濞彝族自治县",
            "532923": "祥云县",
            "532924": "宾川县",
            "532925": "弥渡县",
            "532926": "南涧彝族自治县",
            "532927": "巍山彝族回族自治县",
            "532928": "永平县",
            "532929": "云龙县",
            "532930": "洱源县",
            "532931": "剑川县",
            "532932": "鹤庆县",
            "532933": "其它区",
            "533100": "德宏傣族景颇族自治州",
            "533102": "瑞丽市",
            "533103": "芒市",
            "533122": "梁河县",
            "533123": "盈江县",
            "533124": "陇川县",
            "533125": "其它区",
            "533300": "怒江傈僳族自治州",
            "533321": "泸水县",
            "533323": "福贡县",
            "533324": "贡山独龙族怒族自治县",
            "533325": "兰坪白族普米族自治县",
            "533326": "其它区",
            "533400": "迪庆藏族自治州",
            "533421": "香格里拉县",
            "533422": "德钦县",
            "533423": "维西傈僳族自治县",
            "533424": "其它区",
            "540000": "西藏自治区",
            "540100": "拉萨市",
            "540102": "城关区",
            "540121": "林周县",
            "540122": "当雄县",
            "540123": "尼木县",
            "540124": "曲水县",
            "540125": "堆龙德庆县",
            "540126": "达孜县",
            "540127": "墨竹工卡县",
            "540128": "其它区",
            "542100": "昌都地区",
            "542121": "昌都县",
            "542122": "江达县",
            "542123": "贡觉县",
            "542124": "类乌齐县",
            "542125": "丁青县",
            "542126": "察雅县",
            "542127": "八宿县",
            "542128": "左贡县",
            "542129": "芒康县",
            "542132": "洛隆县",
            "542133": "边坝县",
            "542134": "其它区",
            "542200": "山南地区",
            "542221": "乃东县",
            "542222": "扎囊县",
            "542223": "贡嘎县",
            "542224": "桑日县",
            "542225": "琼结县",
            "542226": "曲松县",
            "542227": "措美县",
            "542228": "洛扎县",
            "542229": "加查县",
            "542231": "隆子县",
            "542232": "错那县",
            "542233": "浪卡子县",
            "542234": "其它区",
            "542300": "日喀则地区",
            "542301": "日喀则市",
            "542322": "南木林县",
            "542323": "江孜县",
            "542324": "定日县",
            "542325": "萨迦县",
            "542326": "拉孜县",
            "542327": "昂仁县",
            "542328": "谢通门县",
            "542329": "白朗县",
            "542330": "仁布县",
            "542331": "康马县",
            "542332": "定结县",
            "542333": "仲巴县",
            "542334": "亚东县",
            "542335": "吉隆县",
            "542336": "聂拉木县",
            "542337": "萨嘎县",
            "542338": "岗巴县",
            "542339": "其它区",
            "542400": "那曲地区",
            "542421": "那曲县",
            "542422": "嘉黎县",
            "542423": "比如县",
            "542424": "聂荣县",
            "542425": "安多县",
            "542426": "申扎县",
            "542427": "索县",
            "542428": "班戈县",
            "542429": "巴青县",
            "542430": "尼玛县",
            "542431": "其它区",
            "542432": "双湖县",
            "542500": "阿里地区",
            "542521": "普兰县",
            "542522": "札达县",
            "542523": "噶尔县",
            "542524": "日土县",
            "542525": "革吉县",
            "542526": "改则县",
            "542527": "措勤县",
            "542528": "其它区",
            "542600": "林芝地区",
            "542621": "林芝县",
            "542622": "工布江达县",
            "542623": "米林县",
            "542624": "墨脱县",
            "542625": "波密县",
            "542626": "察隅县",
            "542627": "朗县",
            "542628": "其它区",
            "610000": "陕西省",
            "610100": "西安市",
            "610102": "新城区",
            "610103": "碑林区",
            "610104": "莲湖区",
            "610111": "灞桥区",
            "610112": "未央区",
            "610113": "雁塔区",
            "610114": "阎良区",
            "610115": "临潼区",
            "610116": "长安区",
            "610122": "蓝田县",
            "610124": "周至县",
            "610125": "户县",
            "610126": "高陵县",
            "610127": "其它区",
            "610200": "铜川市",
            "610202": "王益区",
            "610203": "印台区",
            "610204": "耀州区",
            "610222": "宜君县",
            "610223": "其它区",
            "610300": "宝鸡市",
            "610302": "渭滨区",
            "610303": "金台区",
            "610304": "陈仓区",
            "610322": "凤翔县",
            "610323": "岐山县",
            "610324": "扶风县",
            "610326": "眉县",
            "610327": "陇县",
            "610328": "千阳县",
            "610329": "麟游县",
            "610330": "凤县",
            "610331": "太白县",
            "610332": "其它区",
            "610400": "咸阳市",
            "610402": "秦都区",
            "610403": "杨陵区",
            "610404": "渭城区",
            "610422": "三原县",
            "610423": "泾阳县",
            "610424": "乾县",
            "610425": "礼泉县",
            "610426": "永寿县",
            "610427": "彬县",
            "610428": "长武县",
            "610429": "旬邑县",
            "610430": "淳化县",
            "610431": "武功县",
            "610481": "兴平市",
            "610482": "其它区",
            "610500": "渭南市",
            "610502": "临渭区",
            "610521": "华县",
            "610522": "潼关县",
            "610523": "大荔县",
            "610524": "合阳县",
            "610525": "澄城县",
            "610526": "蒲城县",
            "610527": "白水县",
            "610528": "富平县",
            "610581": "韩城市",
            "610582": "华阴市",
            "610583": "其它区",
            "610600": "延安市",
            "610602": "宝塔区",
            "610621": "延长县",
            "610622": "延川县",
            "610623": "子长县",
            "610624": "安塞县",
            "610625": "志丹县",
            "610626": "吴起县",
            "610627": "甘泉县",
            "610628": "富县",
            "610629": "洛川县",
            "610630": "宜川县",
            "610631": "黄龙县",
            "610632": "黄陵县",
            "610633": "其它区",
            "610700": "汉中市",
            "610702": "汉台区",
            "610721": "南郑县",
            "610722": "城固县",
            "610723": "洋县",
            "610724": "西乡县",
            "610725": "勉县",
            "610726": "宁强县",
            "610727": "略阳县",
            "610728": "镇巴县",
            "610729": "留坝县",
            "610730": "佛坪县",
            "610731": "其它区",
            "610800": "榆林市",
            "610802": "榆阳区",
            "610821": "神木县",
            "610822": "府谷县",
            "610823": "横山县",
            "610824": "靖边县",
            "610825": "定边县",
            "610826": "绥德县",
            "610827": "米脂县",
            "610828": "佳县",
            "610829": "吴堡县",
            "610830": "清涧县",
            "610831": "子洲县",
            "610832": "其它区",
            "610900": "安康市",
            "610902": "汉滨区",
            "610921": "汉阴县",
            "610922": "石泉县",
            "610923": "宁陕县",
            "610924": "紫阳县",
            "610925": "岚皋县",
            "610926": "平利县",
            "610927": "镇坪县",
            "610928": "旬阳县",
            "610929": "白河县",
            "610930": "其它区",
            "611000": "商洛市",
            "611002": "商州区",
            "611021": "洛南县",
            "611022": "丹凤县",
            "611023": "商南县",
            "611024": "山阳县",
            "611025": "镇安县",
            "611026": "柞水县",
            "611027": "其它区",
            "620000": "甘肃省",
            "620100": "兰州市",
            "620102": "城关区",
            "620103": "七里河区",
            "620104": "西固区",
            "620105": "安宁区",
            "620111": "红古区",
            "620121": "永登县",
            "620122": "皋兰县",
            "620123": "榆中县",
            "620124": "其它区",
            "620200": "嘉峪关市",
            "620300": "金昌市",
            "620302": "金川区",
            "620321": "永昌县",
            "620322": "其它区",
            "620400": "白银市",
            "620402": "白银区",
            "620403": "平川区",
            "620421": "靖远县",
            "620422": "会宁县",
            "620423": "景泰县",
            "620424": "其它区",
            "620500": "天水市",
            "620502": "秦州区",
            "620503": "麦积区",
            "620521": "清水县",
            "620522": "秦安县",
            "620523": "甘谷县",
            "620524": "武山县",
            "620525": "张家川回族自治县",
            "620526": "其它区",
            "620600": "武威市",
            "620602": "凉州区",
            "620621": "民勤县",
            "620622": "古浪县",
            "620623": "天祝藏族自治县",
            "620624": "其它区",
            "620700": "张掖市",
            "620702": "甘州区",
            "620721": "肃南裕固族自治县",
            "620722": "民乐县",
            "620723": "临泽县",
            "620724": "高台县",
            "620725": "山丹县",
            "620726": "其它区",
            "620800": "平凉市",
            "620802": "崆峒区",
            "620821": "泾川县",
            "620822": "灵台县",
            "620823": "崇信县",
            "620824": "华亭县",
            "620825": "庄浪县",
            "620826": "静宁县",
            "620827": "其它区",
            "620900": "酒泉市",
            "620902": "肃州区",
            "620921": "金塔县",
            "620922": "瓜州县",
            "620923": "肃北蒙古族自治县",
            "620924": "阿克塞哈萨克族自治县",
            "620981": "玉门市",
            "620982": "敦煌市",
            "620983": "其它区",
            "621000": "庆阳市",
            "621002": "西峰区",
            "621021": "庆城县",
            "621022": "环县",
            "621023": "华池县",
            "621024": "合水县",
            "621025": "正宁县",
            "621026": "宁县",
            "621027": "镇原县",
            "621028": "其它区",
            "621100": "定西市",
            "621102": "安定区",
            "621121": "通渭县",
            "621122": "陇西县",
            "621123": "渭源县",
            "621124": "临洮县",
            "621125": "漳县",
            "621126": "岷县",
            "621127": "其它区",
            "621200": "陇南市",
            "621202": "武都区",
            "621221": "成县",
            "621222": "文县",
            "621223": "宕昌县",
            "621224": "康县",
            "621225": "西和县",
            "621226": "礼县",
            "621227": "徽县",
            "621228": "两当县",
            "621229": "其它区",
            "622900": "临夏回族自治州",
            "622901": "临夏市",
            "622921": "临夏县",
            "622922": "康乐县",
            "622923": "永靖县",
            "622924": "广河县",
            "622925": "和政县",
            "622926": "东乡族自治县",
            "622927": "积石山保安族东乡族撒拉族自治县",
            "622928": "其它区",
            "623000": "甘南藏族自治州",
            "623001": "合作市",
            "623021": "临潭县",
            "623022": "卓尼县",
            "623023": "舟曲县",
            "623024": "迭部县",
            "623025": "玛曲县",
            "623026": "碌曲县",
            "623027": "夏河县",
            "623028": "其它区",
            "630000": "青海省",
            "630100": "西宁市",
            "630102": "城东区",
            "630103": "城中区",
            "630104": "城西区",
            "630105": "城北区",
            "630121": "大通回族土族自治县",
            "630122": "湟中县",
            "630123": "湟源县",
            "630124": "其它区",
            "632100": "海东市",
            "632121": "平安县",
            "632122": "民和回族土族自治县",
            "632123": "乐都区",
            "632126": "互助土族自治县",
            "632127": "化隆回族自治县",
            "632128": "循化撒拉族自治县",
            "632129": "其它区",
            "632200": "海北藏族自治州",
            "632221": "门源回族自治县",
            "632222": "祁连县",
            "632223": "海晏县",
            "632224": "刚察县",
            "632225": "其它区",
            "632300": "黄南藏族自治州",
            "632321": "同仁县",
            "632322": "尖扎县",
            "632323": "泽库县",
            "632324": "河南蒙古族自治县",
            "632325": "其它区",
            "632500": "海南藏族自治州",
            "632521": "共和县",
            "632522": "同德县",
            "632523": "贵德县",
            "632524": "兴海县",
            "632525": "贵南县",
            "632526": "其它区",
            "632600": "果洛藏族自治州",
            "632621": "玛沁县",
            "632622": "班玛县",
            "632623": "甘德县",
            "632624": "达日县",
            "632625": "久治县",
            "632626": "玛多县",
            "632627": "其它区",
            "632700": "玉树藏族自治州",
            "632721": "玉树市",
            "632722": "杂多县",
            "632723": "称多县",
            "632724": "治多县",
            "632725": "囊谦县",
            "632726": "曲麻莱县",
            "632727": "其它区",
            "632800": "海西蒙古族藏族自治州",
            "632801": "格尔木市",
            "632802": "德令哈市",
            "632821": "乌兰县",
            "632822": "都兰县",
            "632823": "天峻县",
            "632824": "其它区",
            "640000": "宁夏回族自治区",
            "640100": "银川市",
            "640104": "兴庆区",
            "640105": "西夏区",
            "640106": "金凤区",
            "640121": "永宁县",
            "640122": "贺兰县",
            "640181": "灵武市",
            "640182": "其它区",
            "640200": "石嘴山市",
            "640202": "大武口区",
            "640205": "惠农区",
            "640221": "平罗县",
            "640222": "其它区",
            "640300": "吴忠市",
            "640302": "利通区",
            "640303": "红寺堡区",
            "640323": "盐池县",
            "640324": "同心县",
            "640381": "青铜峡市",
            "640382": "其它区",
            "640400": "固原市",
            "640402": "原州区",
            "640422": "西吉县",
            "640423": "隆德县",
            "640424": "泾源县",
            "640425": "彭阳县",
            "640426": "其它区",
            "640500": "中卫市",
            "640502": "沙坡头区",
            "640521": "中宁县",
            "640522": "海原县",
            "640523": "其它区",
            "650000": "新疆维吾尔自治区",
            "650100": "乌鲁木齐市",
            "650102": "天山区",
            "650103": "沙依巴克区",
            "650104": "新市区",
            "650105": "水磨沟区",
            "650106": "头屯河区",
            "650107": "达坂城区",
            "650109": "米东区",
            "650121": "乌鲁木齐县",
            "650122": "其它区",
            "650200": "克拉玛依市",
            "650202": "独山子区",
            "650203": "克拉玛依区",
            "650204": "白碱滩区",
            "650205": "乌尔禾区",
            "650206": "其它区",
            "652100": "吐鲁番地区",
            "652101": "吐鲁番市",
            "652122": "鄯善县",
            "652123": "托克逊县",
            "652124": "其它区",
            "652200": "哈密地区",
            "652201": "哈密市",
            "652222": "巴里坤哈萨克自治县",
            "652223": "伊吾县",
            "652224": "其它区",
            "652300": "昌吉回族自治州",
            "652301": "昌吉市",
            "652302": "阜康市",
            "652323": "呼图壁县",
            "652324": "玛纳斯县",
            "652325": "奇台县",
            "652327": "吉木萨尔县",
            "652328": "木垒哈萨克自治县",
            "652329": "其它区",
            "652700": "博尔塔拉蒙古自治州",
            "652701": "博乐市",
            "652702": "阿拉山口市",
            "652722": "精河县",
            "652723": "温泉县",
            "652724": "其它区",
            "652800": "巴音郭楞蒙古自治州",
            "652801": "库尔勒市",
            "652822": "轮台县",
            "652823": "尉犁县",
            "652824": "若羌县",
            "652825": "且末县",
            "652826": "焉耆回族自治县",
            "652827": "和静县",
            "652828": "和硕县",
            "652829": "博湖县",
            "652830": "其它区",
            "652900": "阿克苏地区",
            "652901": "阿克苏市",
            "652922": "温宿县",
            "652923": "库车县",
            "652924": "沙雅县",
            "652925": "新和县",
            "652926": "拜城县",
            "652927": "乌什县",
            "652928": "阿瓦提县",
            "652929": "柯坪县",
            "652930": "其它区",
            "653000": "克孜勒苏柯尔克孜自治州",
            "653001": "阿图什市",
            "653022": "阿克陶县",
            "653023": "阿合奇县",
            "653024": "乌恰县",
            "653025": "其它区",
            "653100": "喀什地区",
            "653101": "喀什市",
            "653121": "疏附县",
            "653122": "疏勒县",
            "653123": "英吉沙县",
            "653124": "泽普县",
            "653125": "莎车县",
            "653126": "叶城县",
            "653127": "麦盖提县",
            "653128": "岳普湖县",
            "653129": "伽师县",
            "653130": "巴楚县",
            "653131": "塔什库尔干塔吉克自治县",
            "653132": "其它区",
            "653200": "和田地区",
            "653201": "和田市",
            "653221": "和田县",
            "653222": "墨玉县",
            "653223": "皮山县",
            "653224": "洛浦县",
            "653225": "策勒县",
            "653226": "于田县",
            "653227": "民丰县",
            "653228": "其它区",
            "654000": "伊犁哈萨克自治州",
            "654002": "伊宁市",
            "654003": "奎屯市",
            "654021": "伊宁县",
            "654022": "察布查尔锡伯自治县",
            "654023": "霍城县",
            "654024": "巩留县",
            "654025": "新源县",
            "654026": "昭苏县",
            "654027": "特克斯县",
            "654028": "尼勒克县",
            "654029": "其它区",
            "654200": "塔城地区",
            "654201": "塔城市",
            "654202": "乌苏市",
            "654221": "额敏县",
            "654223": "沙湾县",
            "654224": "托里县",
            "654225": "裕民县",
            "654226": "和布克赛尔蒙古自治县",
            "654227": "其它区",
            "654300": "阿勒泰地区",
            "654301": "阿勒泰市",
            "654321": "布尔津县",
            "654322": "富蕴县",
            "654323": "福海县",
            "654324": "哈巴河县",
            "654325": "青河县",
            "654326": "吉木乃县",
            "654327": "其它区",
            "659001": "石河子市",
            "659002": "阿拉尔市",
            "659003": "图木舒克市",
            "659004": "五家渠市",
            "710000": "台湾",
            "710100": "台北市",
            "710101": "中正区",
            "710102": "大同区",
            "710103": "中山区",
            "710104": "松山区",
            "710105": "大安区",
            "710106": "万华区",
            "710107": "信义区",
            "710108": "士林区",
            "710109": "北投区",
            "710110": "内湖区",
            "710111": "南港区",
            "710112": "文山区",
            "710113": "其它区",
            "710200": "高雄市",
            "710201": "新兴区",
            "710202": "前金区",
            "710203": "芩雅区",
            "710204": "盐埕区",
            "710205": "鼓山区",
            "710206": "旗津区",
            "710207": "前镇区",
            "710208": "三民区",
            "710209": "左营区",
            "710210": "楠梓区",
            "710211": "小港区",
            "710212": "其它区",
            "710241": "苓雅区",
            "710242": "仁武区",
            "710243": "大社区",
            "710244": "冈山区",
            "710245": "路竹区",
            "710246": "阿莲区",
            "710247": "田寮区",
            "710248": "燕巢区",
            "710249": "桥头区",
            "710250": "梓官区",
            "710251": "弥陀区",
            "710252": "永安区",
            "710253": "湖内区",
            "710254": "凤山区",
            "710255": "大寮区",
            "710256": "林园区",
            "710257": "鸟松区",
            "710258": "大树区",
            "710259": "旗山区",
            "710260": "美浓区",
            "710261": "六龟区",
            "710262": "内门区",
            "710263": "杉林区",
            "710264": "甲仙区",
            "710265": "桃源区",
            "710266": "那玛夏区",
            "710267": "茂林区",
            "710268": "茄萣区",
            "710300": "台南市",
            "710301": "中西区",
            "710302": "东区",
            "710303": "南区",
            "710304": "北区",
            "710305": "安平区",
            "710306": "安南区",
            "710307": "其它区",
            "710339": "永康区",
            "710340": "归仁区",
            "710341": "新化区",
            "710342": "左镇区",
            "710343": "玉井区",
            "710344": "楠西区",
            "710345": "南化区",
            "710346": "仁德区",
            "710347": "关庙区",
            "710348": "龙崎区",
            "710349": "官田区",
            "710350": "麻豆区",
            "710351": "佳里区",
            "710352": "西港区",
            "710353": "七股区",
            "710354": "将军区",
            "710355": "学甲区",
            "710356": "北门区",
            "710357": "新营区",
            "710358": "后壁区",
            "710359": "白河区",
            "710360": "东山区",
            "710361": "六甲区",
            "710362": "下营区",
            "710363": "柳营区",
            "710364": "盐水区",
            "710365": "善化区",
            "710366": "大内区",
            "710367": "山上区",
            "710368": "新市区",
            "710369": "安定区",
            "710400": "台中市",
            "710401": "中区",
            "710402": "东区",
            "710403": "南区",
            "710404": "西区",
            "710405": "北区",
            "710406": "北屯区",
            "710407": "西屯区",
            "710408": "南屯区",
            "710409": "其它区",
            "710431": "太平区",
            "710432": "大里区",
            "710433": "雾峰区",
            "710434": "乌日区",
            "710435": "丰原区",
            "710436": "后里区",
            "710437": "石冈区",
            "710438": "东势区",
            "710439": "和平区",
            "710440": "新社区",
            "710441": "潭子区",
            "710442": "大雅区",
            "710443": "神冈区",
            "710444": "大肚区",
            "710445": "沙鹿区",
            "710446": "龙井区",
            "710447": "梧栖区",
            "710448": "清水区",
            "710449": "大甲区",
            "710450": "外埔区",
            "710451": "大安区",
            "710500": "金门县",
            "710507": "金沙镇",
            "710508": "金湖镇",
            "710509": "金宁乡",
            "710510": "金城镇",
            "710511": "烈屿乡",
            "710512": "乌坵乡",
            "710600": "南投县",
            "710614": "南投市",
            "710615": "中寮乡",
            "710616": "草屯镇",
            "710617": "国姓乡",
            "710618": "埔里镇",
            "710619": "仁爱乡",
            "710620": "名间乡",
            "710621": "集集镇",
            "710622": "水里乡",
            "710623": "鱼池乡",
            "710624": "信义乡",
            "710625": "竹山镇",
            "710626": "鹿谷乡",
            "710700": "基隆市",
            "710701": "仁爱区",
            "710702": "信义区",
            "710703": "中正区",
            "710704": "中山区",
            "710705": "安乐区",
            "710706": "暖暖区",
            "710707": "七堵区",
            "710708": "其它区",
            "710800": "新竹市",
            "710801": "东区",
            "710802": "北区",
            "710803": "香山区",
            "710804": "其它区",
            "710900": "嘉义市",
            "710901": "东区",
            "710902": "西区",
            "710903": "其它区",
            "711100": "新北市",
            "711130": "万里区",
            "711131": "金山区",
            "711132": "板桥区",
            "711133": "汐止区",
            "711134": "深坑区",
            "711135": "石碇区",
            "711136": "瑞芳区",
            "711137": "平溪区",
            "711138": "双溪区",
            "711139": "贡寮区",
            "711140": "新店区",
            "711141": "坪林区",
            "711142": "乌来区",
            "711143": "永和区",
            "711144": "中和区",
            "711145": "土城区",
            "711146": "三峡区",
            "711147": "树林区",
            "711148": "莺歌区",
            "711149": "三重区",
            "711150": "新庄区",
            "711151": "泰山区",
            "711152": "林口区",
            "711153": "芦洲区",
            "711154": "五股区",
            "711155": "八里区",
            "711156": "淡水区",
            "711157": "三芝区",
            "711158": "石门区",
            "711200": "宜兰县",
            "711214": "宜兰市",
            "711215": "头城镇",
            "711216": "礁溪乡",
            "711217": "壮围乡",
            "711218": "员山乡",
            "711219": "罗东镇",
            "711220": "三星乡",
            "711221": "大同乡",
            "711222": "五结乡",
            "711223": "冬山乡",
            "711224": "苏澳镇",
            "711225": "南澳乡",
            "711226": "钓鱼台",
            "711300": "新竹县",
            "711314": "竹北市",
            "711315": "湖口乡",
            "711316": "新丰乡",
            "711317": "新埔镇",
            "711318": "关西镇",
            "711319": "芎林乡",
            "711320": "宝山乡",
            "711321": "竹东镇",
            "711322": "五峰乡",
            "711323": "横山乡",
            "711324": "尖石乡",
            "711325": "北埔乡",
            "711326": "峨眉乡",
            "711400": "桃园县",
            "711414": "中坜市",
            "711415": "平镇市",
            "711416": "龙潭乡",
            "711417": "杨梅市",
            "711418": "新屋乡",
            "711419": "观音乡",
            "711420": "桃园市",
            "711421": "龟山乡",
            "711422": "八德市",
            "711423": "大溪镇",
            "711424": "复兴乡",
            "711425": "大园乡",
            "711426": "芦竹乡",
            "711500": "苗栗县",
            "711519": "竹南镇",
            "711520": "头份镇",
            "711521": "三湾乡",
            "711522": "南庄乡",
            "711523": "狮潭乡",
            "711524": "后龙镇",
            "711525": "通霄镇",
            "711526": "苑里镇",
            "711527": "苗栗市",
            "711528": "造桥乡",
            "711529": "头屋乡",
            "711530": "公馆乡",
            "711531": "大湖乡",
            "711532": "泰安乡",
            "711533": "铜锣乡",
            "711534": "三义乡",
            "711535": "西湖乡",
            "711536": "卓兰镇",
            "711700": "彰化县",
            "711727": "彰化市",
            "711728": "芬园乡",
            "711729": "花坛乡",
            "711730": "秀水乡",
            "711731": "鹿港镇",
            "711732": "福兴乡",
            "711733": "线西乡",
            "711734": "和美镇",
            "711735": "伸港乡",
            "711736": "员林镇",
            "711737": "社头乡",
            "711738": "永靖乡",
            "711739": "埔心乡",
            "711740": "溪湖镇",
            "711741": "大村乡",
            "711742": "埔盐乡",
            "711743": "田中镇",
            "711744": "北斗镇",
            "711745": "田尾乡",
            "711746": "埤头乡",
            "711747": "溪州乡",
            "711748": "竹塘乡",
            "711749": "二林镇",
            "711750": "大城乡",
            "711751": "芳苑乡",
            "711752": "二水乡",
            "711900": "嘉义县",
            "711919": "番路乡",
            "711920": "梅山乡",
            "711921": "竹崎乡",
            "711922": "阿里山乡",
            "711923": "中埔乡",
            "711924": "大埔乡",
            "711925": "水上乡",
            "711926": "鹿草乡",
            "711927": "太保市",
            "711928": "朴子市",
            "711929": "东石乡",
            "711930": "六脚乡",
            "711931": "新港乡",
            "711932": "民雄乡",
            "711933": "大林镇",
            "711934": "溪口乡",
            "711935": "义竹乡",
            "711936": "布袋镇",
            "712100": "云林县",
            "712121": "斗南镇",
            "712122": "大埤乡",
            "712123": "虎尾镇",
            "712124": "土库镇",
            "712125": "褒忠乡",
            "712126": "东势乡",
            "712127": "台西乡",
            "712128": "仑背乡",
            "712129": "麦寮乡",
            "712130": "斗六市",
            "712131": "林内乡",
            "712132": "古坑乡",
            "712133": "莿桐乡",
            "712134": "西螺镇",
            "712135": "二仑乡",
            "712136": "北港镇",
            "712137": "水林乡",
            "712138": "口湖乡",
            "712139": "四湖乡",
            "712140": "元长乡",
            "712400": "屏东县",
            "712434": "屏东市",
            "712435": "三地门乡",
            "712436": "雾台乡",
            "712437": "玛家乡",
            "712438": "九如乡",
            "712439": "里港乡",
            "712440": "高树乡",
            "712441": "盐埔乡",
            "712442": "长治乡",
            "712443": "麟洛乡",
            "712444": "竹田乡",
            "712445": "内埔乡",
            "712446": "万丹乡",
            "712447": "潮州镇",
            "712448": "泰武乡",
            "712449": "来义乡",
            "712450": "万峦乡",
            "712451": "崁顶乡",
            "712452": "新埤乡",
            "712453": "南州乡",
            "712454": "林边乡",
            "712455": "东港镇",
            "712456": "琉球乡",
            "712457": "佳冬乡",
            "712458": "新园乡",
            "712459": "枋寮乡",
            "712460": "枋山乡",
            "712461": "春日乡",
            "712462": "狮子乡",
            "712463": "车城乡",
            "712464": "牡丹乡",
            "712465": "恒春镇",
            "712466": "满州乡",
            "712500": "台东县",
            "712517": "台东市",
            "712518": "绿岛乡",
            "712519": "兰屿乡",
            "712520": "延平乡",
            "712521": "卑南乡",
            "712522": "鹿野乡",
            "712523": "关山镇",
            "712524": "海端乡",
            "712525": "池上乡",
            "712526": "东河乡",
            "712527": "成功镇",
            "712528": "长滨乡",
            "712529": "金峰乡",
            "712530": "大武乡",
            "712531": "达仁乡",
            "712532": "太麻里乡",
            "712600": "花莲县",
            "712615": "花莲市",
            "712616": "新城乡",
            "712617": "太鲁阁",
            "712618": "秀林乡",
            "712619": "吉安乡",
            "712620": "寿丰乡",
            "712621": "凤林镇",
            "712622": "光复乡",
            "712623": "丰滨乡",
            "712624": "瑞穗乡",
            "712625": "万荣乡",
            "712626": "玉里镇",
            "712627": "卓溪乡",
            "712628": "富里乡",
            "712700": "澎湖县",
            "712707": "马公市",
            "712708": "西屿乡",
            "712709": "望安乡",
            "712710": "七美乡",
            "712711": "白沙乡",
            "712712": "湖西乡",
            "712800": "连江县",
            "712805": "南竿乡",
            "712806": "北竿乡",
            "712807": "莒光乡",
            "712808": "东引乡",
            "810000": "香港特别行政区",
            "810100": "香港岛",
            "810101": "中西区",
            "810102": "湾仔",
            "810103": "东区",
            "810104": "南区",
            "810200": "九龙",
            "810201": "九龙城区",
            "810202": "油尖旺区",
            "810203": "深水埗区",
            "810204": "黄大仙区",
            "810205": "观塘区",
            "810300": "新界",
            "810301": "北区",
            "810302": "大埔区",
            "810303": "沙田区",
            "810304": "西贡区",
            "810305": "元朗区",
            "810306": "屯门区",
            "810307": "荃湾区",
            "810308": "葵青区",
            "810309": "离岛区",
            "820000": "澳门特别行政区",
            "820100": "澳门半岛",
            "820200": "离岛",
            "990000": "海外",
            "990100": "海外"
          };
          function tree(list) {
            var mapped = {};
            for (var i2 = 0, item; i2 < list.length; i2++) {
              item = list[i2];
              if (!item || !item.id)
                continue;
              mapped[item.id] = item;
            }
            var result = [];
            for (var ii = 0; ii < list.length; ii++) {
              item = list[ii];
              if (!item)
                continue;
              if (item.pid == void 0 && item.parentId == void 0) {
                result.push(item);
                continue;
              }
              var parent = mapped[item.pid] || mapped[item.parentId];
              if (!parent)
                continue;
              if (!parent.children)
                parent.children = [];
              parent.children.push(item);
            }
            return result;
          }
          var DICT_FIXED = function() {
            var fixed = [];
            for (var id in DICT) {
              var pid = id.slice(2, 6) === "0000" ? void 0 : id.slice(4, 6) == "00" ? id.slice(0, 2) + "0000" : id.slice(0, 4) + "00";
              fixed.push({
                id,
                pid,
                name: DICT[id]
              });
            }
            return tree(fixed);
          }();
          module2.exports = DICT_FIXED;
        },
        /* 19 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var DICT = __webpack_require__2(18);
          module2.exports = {
            // Dice
            d4: function() {
              return this.natural(1, 4);
            },
            d6: function() {
              return this.natural(1, 6);
            },
            d8: function() {
              return this.natural(1, 8);
            },
            d12: function() {
              return this.natural(1, 12);
            },
            d20: function() {
              return this.natural(1, 20);
            },
            d100: function() {
              return this.natural(1, 100);
            },
            /*
            			    随机生成一个 GUID。
            
            			    http://www.broofa.com/2008/09/javascript-uuid-function/
            			    [UUID 规范](http://www.ietf.org/rfc/rfc4122.txt)
            			        UUIDs (Universally Unique IDentifier)
            			        GUIDs (Globally Unique IDentifier)
            			        The formal definition of the UUID string representation is provided by the following ABNF [7]:
            			            UUID                   = time-low "-" time-mid "-"
            			                                   time-high-and-version "-"
            			                                   clock-seq-and-reserved
            			                                   clock-seq-low "-" node
            			            time-low               = 4hexOctet
            			            time-mid               = 2hexOctet
            			            time-high-and-version  = 2hexOctet
            			            clock-seq-and-reserved = hexOctet
            			            clock-seq-low          = hexOctet
            			            node                   = 6hexOctet
            			            hexOctet               = hexDigit hexDigit
            			            hexDigit =
            			                "0" / "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9" /
            			                "a" / "b" / "c" / "d" / "e" / "f" /
            			                "A" / "B" / "C" / "D" / "E" / "F"
            			    
            			    https://github.com/victorquinn/chancejs/blob/develop/chance.js#L1349
            			*/
            guid: function() {
              var pool = "abcdefABCDEF1234567890", guid = this.string(pool, 8) + "-" + this.string(pool, 4) + "-" + this.string(pool, 4) + "-" + this.string(pool, 4) + "-" + this.string(pool, 12);
              return guid;
            },
            uuid: function() {
              return this.guid();
            },
            /*
            			    随机生成一个 18 位身份证。
            
            			    [身份证](http://baike.baidu.com/view/1697.htm#4)
            			        地址码 6 + 出生日期码 8 + 顺序码 3 + 校验码 1
            			    [《中华人民共和国行政区划代码》国家标准(GB/T2260)](http://zhidao.baidu.com/question/1954561.html)
            			*/
            id: function() {
              var id, sum = 0, rank = [
                "7",
                "9",
                "10",
                "5",
                "8",
                "4",
                "2",
                "1",
                "6",
                "3",
                "7",
                "9",
                "10",
                "5",
                "8",
                "4",
                "2"
              ], last = [
                "1",
                "0",
                "X",
                "9",
                "8",
                "7",
                "6",
                "5",
                "4",
                "3",
                "2"
              ];
              id = this.pick(DICT).id + this.date("yyyyMMdd") + this.string("number", 3);
              for (var i2 = 0; i2 < id.length; i2++) {
                sum += id[i2] * rank[i2];
              }
              id += last[sum % 11];
              return id;
            },
            /*
                生成一个全局的自增整数。
                类似自增主键（auto increment primary key）。
            */
            increment: function() {
              var key2 = 0;
              return function(step) {
                return key2 += +step || 1;
              };
            }(),
            inc: function(step) {
              return this.increment(step);
            }
          };
        },
        /* 20 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Parser2 = __webpack_require__2(21);
          var Handler2 = __webpack_require__2(22);
          module2.exports = {
            Parser: Parser2,
            Handler: Handler2
          };
        },
        /* 21 */
        /***/
        function(module2, exports2) {
          function Token(n) {
            this.type = n, this.offset = Token.offset(), this.text = Token.text();
          }
          function Alternate(n, l) {
            Token.call(this, "alternate"), this.left = n, this.right = l;
          }
          function Match(n) {
            Token.call(this, "match"), this.body = n.filter(Boolean);
          }
          function Group(n, l) {
            Token.call(this, n), this.body = l;
          }
          function CaptureGroup(n) {
            Group.call(this, "capture-group"), this.index = cgs[this.offset] || (cgs[this.offset] = index2++), this.body = n;
          }
          function Quantified(n, l) {
            Token.call(this, "quantified"), this.body = n, this.quantifier = l;
          }
          function Quantifier(n, l) {
            Token.call(this, "quantifier"), this.min = n, this.max = l, this.greedy = true;
          }
          function CharSet(n, l) {
            Token.call(this, "charset"), this.invert = n, this.body = l;
          }
          function CharacterRange(n, l) {
            Token.call(this, "range"), this.start = n, this.end = l;
          }
          function Literal(n) {
            Token.call(this, "literal"), this.body = n, this.escaped = this.body != this.text;
          }
          function Unicode(n) {
            Token.call(this, "unicode"), this.code = n.toUpperCase();
          }
          function Hex(n) {
            Token.call(this, "hex"), this.code = n.toUpperCase();
          }
          function Octal(n) {
            Token.call(this, "octal"), this.code = n.toUpperCase();
          }
          function BackReference(n) {
            Token.call(this, "back-reference"), this.code = n.toUpperCase();
          }
          function ControlCharacter(n) {
            Token.call(this, "control-character"), this.code = n.toUpperCase();
          }
          var parser = function() {
            function n(n2, l2) {
              function u2() {
                this.constructor = n2;
              }
              u2.prototype = l2.prototype, n2.prototype = new u2();
            }
            function l(n2, l2, u2, t, r) {
              function e(n3, l3) {
                function u3(n4) {
                  function l4(n5) {
                    return n5.charCodeAt(0).toString(16).toUpperCase();
                  }
                  return n4.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(n5) {
                    return "\\x0" + l4(n5);
                  }).replace(/[\x10-\x1F\x80-\xFF]/g, function(n5) {
                    return "\\x" + l4(n5);
                  }).replace(/[\u0180-\u0FFF]/g, function(n5) {
                    return "\\u0" + l4(n5);
                  }).replace(/[\u1080-\uFFFF]/g, function(n5) {
                    return "\\u" + l4(n5);
                  });
                }
                var t2, r2;
                switch (n3.length) {
                  case 0:
                    t2 = "end of input";
                    break;
                  case 1:
                    t2 = n3[0];
                    break;
                  default:
                    t2 = n3.slice(0, -1).join(", ") + " or " + n3[n3.length - 1];
                }
                return r2 = l3 ? '"' + u3(l3) + '"' : "end of input", "Expected " + t2 + " but " + r2 + " found.";
              }
              this.expected = n2, this.found = l2, this.offset = u2, this.line = t, this.column = r, this.name = "SyntaxError", this.message = e(n2, l2);
            }
            function u(n2) {
              function u2() {
                return n2.substring(Lt, qt);
              }
              function t() {
                return Lt;
              }
              function r(l2) {
                function u3(l3, u4, t2) {
                  var r2, e2;
                  for (r2 = u4; t2 > r2; r2++)
                    e2 = n2.charAt(r2), "\n" === e2 ? (l3.seenCR || l3.line++, l3.column = 1, l3.seenCR = false) : "\r" === e2 || "\u2028" === e2 || "\u2029" === e2 ? (l3.line++, l3.column = 1, l3.seenCR = true) : (l3.column++, l3.seenCR = false);
                }
                return Mt !== l2 && (Mt > l2 && (Mt = 0, Dt = {
                  line: 1,
                  column: 1,
                  seenCR: false
                }), u3(Dt, Mt, l2), Mt = l2), Dt;
              }
              function e(n3) {
                Ht > qt || (qt > Ht && (Ht = qt, Ot = []), Ot.push(n3));
              }
              function o(n3) {
                var l2 = 0;
                for (n3.sort(); l2 < n3.length; )
                  n3[l2 - 1] === n3[l2] ? n3.splice(l2, 1) : l2++;
              }
              function c() {
                var l2, u3, t2, r2, o2;
                return l2 = qt, u3 = i2(), null !== u3 ? (t2 = qt, 124 === n2.charCodeAt(qt) ? (r2 = fl, qt++) : (r2 = null, 0 === Wt && e(sl)), null !== r2 ? (o2 = c(), null !== o2 ? (r2 = [r2, o2], t2 = r2) : (qt = t2, t2 = il)) : (qt = t2, t2 = il), null === t2 && (t2 = al), null !== t2 ? (Lt = l2, u3 = hl(u3, t2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function i2() {
                var n3, l2, u3, t2, r2;
                if (n3 = qt, l2 = f(), null === l2 && (l2 = al), null !== l2)
                  if (u3 = qt, Wt++, t2 = d(), Wt--, null === t2 ? u3 = al : (qt = u3, u3 = il), null !== u3) {
                    for (t2 = [], r2 = h(), null === r2 && (r2 = a()); null !== r2; )
                      t2.push(r2), r2 = h(), null === r2 && (r2 = a());
                    null !== t2 ? (r2 = s(), null === r2 && (r2 = al), null !== r2 ? (Lt = n3, l2 = dl(l2, t2, r2), null === l2 ? (qt = n3, n3 = l2) : n3 = l2) : (qt = n3, n3 = il)) : (qt = n3, n3 = il);
                  } else
                    qt = n3, n3 = il;
                else
                  qt = n3, n3 = il;
                return n3;
              }
              function a() {
                var n3;
                return n3 = x(), null === n3 && (n3 = Q(), null === n3 && (n3 = B())), n3;
              }
              function f() {
                var l2, u3;
                return l2 = qt, 94 === n2.charCodeAt(qt) ? (u3 = pl, qt++) : (u3 = null, 0 === Wt && e(vl)), null !== u3 && (Lt = l2, u3 = wl()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function s() {
                var l2, u3;
                return l2 = qt, 36 === n2.charCodeAt(qt) ? (u3 = Al, qt++) : (u3 = null, 0 === Wt && e(Cl)), null !== u3 && (Lt = l2, u3 = gl()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function h() {
                var n3, l2, u3;
                return n3 = qt, l2 = a(), null !== l2 ? (u3 = d(), null !== u3 ? (Lt = n3, l2 = bl(l2, u3), null === l2 ? (qt = n3, n3 = l2) : n3 = l2) : (qt = n3, n3 = il)) : (qt = n3, n3 = il), n3;
              }
              function d() {
                var n3, l2, u3;
                return Wt++, n3 = qt, l2 = p(), null !== l2 ? (u3 = k(), null === u3 && (u3 = al), null !== u3 ? (Lt = n3, l2 = Tl(l2, u3), null === l2 ? (qt = n3, n3 = l2) : n3 = l2) : (qt = n3, n3 = il)) : (qt = n3, n3 = il), Wt--, null === n3 && (l2 = null, 0 === Wt && e(kl)), n3;
              }
              function p() {
                var n3;
                return n3 = v(), null === n3 && (n3 = w(), null === n3 && (n3 = A(), null === n3 && (n3 = C(), null === n3 && (n3 = g(), null === n3 && (n3 = b()))))), n3;
              }
              function v() {
                var l2, u3, t2, r2, o2, c2;
                return l2 = qt, 123 === n2.charCodeAt(qt) ? (u3 = xl, qt++) : (u3 = null, 0 === Wt && e(yl)), null !== u3 ? (t2 = T(), null !== t2 ? (44 === n2.charCodeAt(qt) ? (r2 = ml, qt++) : (r2 = null, 0 === Wt && e(Rl)), null !== r2 ? (o2 = T(), null !== o2 ? (125 === n2.charCodeAt(qt) ? (c2 = Fl, qt++) : (c2 = null, 0 === Wt && e(Ql)), null !== c2 ? (Lt = l2, u3 = Sl(t2, o2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function w() {
                var l2, u3, t2, r2;
                return l2 = qt, 123 === n2.charCodeAt(qt) ? (u3 = xl, qt++) : (u3 = null, 0 === Wt && e(yl)), null !== u3 ? (t2 = T(), null !== t2 ? (n2.substr(qt, 2) === Ul ? (r2 = Ul, qt += 2) : (r2 = null, 0 === Wt && e(El)), null !== r2 ? (Lt = l2, u3 = Gl(t2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function A() {
                var l2, u3, t2, r2;
                return l2 = qt, 123 === n2.charCodeAt(qt) ? (u3 = xl, qt++) : (u3 = null, 0 === Wt && e(yl)), null !== u3 ? (t2 = T(), null !== t2 ? (125 === n2.charCodeAt(qt) ? (r2 = Fl, qt++) : (r2 = null, 0 === Wt && e(Ql)), null !== r2 ? (Lt = l2, u3 = Bl(t2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function C() {
                var l2, u3;
                return l2 = qt, 43 === n2.charCodeAt(qt) ? (u3 = jl, qt++) : (u3 = null, 0 === Wt && e($l)), null !== u3 && (Lt = l2, u3 = ql()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function g() {
                var l2, u3;
                return l2 = qt, 42 === n2.charCodeAt(qt) ? (u3 = Ll, qt++) : (u3 = null, 0 === Wt && e(Ml)), null !== u3 && (Lt = l2, u3 = Dl()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function b() {
                var l2, u3;
                return l2 = qt, 63 === n2.charCodeAt(qt) ? (u3 = Hl, qt++) : (u3 = null, 0 === Wt && e(Ol)), null !== u3 && (Lt = l2, u3 = Wl()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function k() {
                var l2;
                return 63 === n2.charCodeAt(qt) ? (l2 = Hl, qt++) : (l2 = null, 0 === Wt && e(Ol)), l2;
              }
              function T() {
                var l2, u3, t2;
                if (l2 = qt, u3 = [], zl.test(n2.charAt(qt)) ? (t2 = n2.charAt(qt), qt++) : (t2 = null, 0 === Wt && e(Il)), null !== t2)
                  for (; null !== t2; )
                    u3.push(t2), zl.test(n2.charAt(qt)) ? (t2 = n2.charAt(qt), qt++) : (t2 = null, 0 === Wt && e(Il));
                else
                  u3 = il;
                return null !== u3 && (Lt = l2, u3 = Jl(u3)), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function x() {
                var l2, u3, t2, r2;
                return l2 = qt, 40 === n2.charCodeAt(qt) ? (u3 = Kl, qt++) : (u3 = null, 0 === Wt && e(Nl)), null !== u3 ? (t2 = R(), null === t2 && (t2 = F(), null === t2 && (t2 = m(), null === t2 && (t2 = y()))), null !== t2 ? (41 === n2.charCodeAt(qt) ? (r2 = Pl, qt++) : (r2 = null, 0 === Wt && e(Vl)), null !== r2 ? (Lt = l2, u3 = Xl(t2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function y() {
                var n3, l2;
                return n3 = qt, l2 = c(), null !== l2 && (Lt = n3, l2 = Yl(l2)), null === l2 ? (qt = n3, n3 = l2) : n3 = l2, n3;
              }
              function m() {
                var l2, u3, t2;
                return l2 = qt, n2.substr(qt, 2) === Zl ? (u3 = Zl, qt += 2) : (u3 = null, 0 === Wt && e(_l)), null !== u3 ? (t2 = c(), null !== t2 ? (Lt = l2, u3 = nu(t2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function R() {
                var l2, u3, t2;
                return l2 = qt, n2.substr(qt, 2) === lu ? (u3 = lu, qt += 2) : (u3 = null, 0 === Wt && e(uu)), null !== u3 ? (t2 = c(), null !== t2 ? (Lt = l2, u3 = tu(t2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function F() {
                var l2, u3, t2;
                return l2 = qt, n2.substr(qt, 2) === ru ? (u3 = ru, qt += 2) : (u3 = null, 0 === Wt && e(eu)), null !== u3 ? (t2 = c(), null !== t2 ? (Lt = l2, u3 = ou(t2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function Q() {
                var l2, u3, t2, r2, o2;
                if (Wt++, l2 = qt, 91 === n2.charCodeAt(qt) ? (u3 = iu, qt++) : (u3 = null, 0 === Wt && e(au)), null !== u3)
                  if (94 === n2.charCodeAt(qt) ? (t2 = pl, qt++) : (t2 = null, 0 === Wt && e(vl)), null === t2 && (t2 = al), null !== t2) {
                    for (r2 = [], o2 = S(), null === o2 && (o2 = U()); null !== o2; )
                      r2.push(o2), o2 = S(), null === o2 && (o2 = U());
                    null !== r2 ? (93 === n2.charCodeAt(qt) ? (o2 = fu, qt++) : (o2 = null, 0 === Wt && e(su)), null !== o2 ? (Lt = l2, u3 = hu(t2, r2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il);
                  } else
                    qt = l2, l2 = il;
                else
                  qt = l2, l2 = il;
                return Wt--, null === l2 && (u3 = null, 0 === Wt && e(cu)), l2;
              }
              function S() {
                var l2, u3, t2, r2;
                return Wt++, l2 = qt, u3 = U(), null !== u3 ? (45 === n2.charCodeAt(qt) ? (t2 = pu, qt++) : (t2 = null, 0 === Wt && e(vu)), null !== t2 ? (r2 = U(), null !== r2 ? (Lt = l2, u3 = wu(u3, r2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), Wt--, null === l2 && (u3 = null, 0 === Wt && e(du)), l2;
              }
              function U() {
                var n3;
                return Wt++, n3 = G(), null === n3 && (n3 = E()), Wt--, null === n3 && (0 === Wt && e(Au)), n3;
              }
              function E() {
                var l2, u3;
                return l2 = qt, Cu.test(n2.charAt(qt)) ? (u3 = n2.charAt(qt), qt++) : (u3 = null, 0 === Wt && e(gu)), null !== u3 && (Lt = l2, u3 = bu(u3)), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function G() {
                var n3;
                return n3 = L(), null === n3 && (n3 = Y(), null === n3 && (n3 = H(), null === n3 && (n3 = O(), null === n3 && (n3 = W(), null === n3 && (n3 = z(), null === n3 && (n3 = I(), null === n3 && (n3 = J(), null === n3 && (n3 = K(), null === n3 && (n3 = N(), null === n3 && (n3 = P(), null === n3 && (n3 = V(), null === n3 && (n3 = X(), null === n3 && (n3 = _(), null === n3 && (n3 = nl(), null === n3 && (n3 = ll(), null === n3 && (n3 = ul(), null === n3 && (n3 = tl()))))))))))))))))), n3;
              }
              function B() {
                var n3;
                return n3 = j(), null === n3 && (n3 = q(), null === n3 && (n3 = $())), n3;
              }
              function j() {
                var l2, u3;
                return l2 = qt, 46 === n2.charCodeAt(qt) ? (u3 = ku, qt++) : (u3 = null, 0 === Wt && e(Tu)), null !== u3 && (Lt = l2, u3 = xu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function $() {
                var l2, u3;
                return Wt++, l2 = qt, mu.test(n2.charAt(qt)) ? (u3 = n2.charAt(qt), qt++) : (u3 = null, 0 === Wt && e(Ru)), null !== u3 && (Lt = l2, u3 = bu(u3)), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, Wt--, null === l2 && (u3 = null, 0 === Wt && e(yu)), l2;
              }
              function q() {
                var n3;
                return n3 = M(), null === n3 && (n3 = D(), null === n3 && (n3 = Y(), null === n3 && (n3 = H(), null === n3 && (n3 = O(), null === n3 && (n3 = W(), null === n3 && (n3 = z(), null === n3 && (n3 = I(), null === n3 && (n3 = J(), null === n3 && (n3 = K(), null === n3 && (n3 = N(), null === n3 && (n3 = P(), null === n3 && (n3 = V(), null === n3 && (n3 = X(), null === n3 && (n3 = Z(), null === n3 && (n3 = _(), null === n3 && (n3 = nl(), null === n3 && (n3 = ll(), null === n3 && (n3 = ul(), null === n3 && (n3 = tl()))))))))))))))))))), n3;
              }
              function L() {
                var l2, u3;
                return l2 = qt, n2.substr(qt, 2) === Fu ? (u3 = Fu, qt += 2) : (u3 = null, 0 === Wt && e(Qu)), null !== u3 && (Lt = l2, u3 = Su()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function M() {
                var l2, u3;
                return l2 = qt, n2.substr(qt, 2) === Fu ? (u3 = Fu, qt += 2) : (u3 = null, 0 === Wt && e(Qu)), null !== u3 && (Lt = l2, u3 = Uu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function D() {
                var l2, u3;
                return l2 = qt, n2.substr(qt, 2) === Eu ? (u3 = Eu, qt += 2) : (u3 = null, 0 === Wt && e(Gu)), null !== u3 && (Lt = l2, u3 = Bu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function H() {
                var l2, u3;
                return l2 = qt, n2.substr(qt, 2) === ju ? (u3 = ju, qt += 2) : (u3 = null, 0 === Wt && e($u)), null !== u3 && (Lt = l2, u3 = qu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function O() {
                var l2, u3;
                return l2 = qt, n2.substr(qt, 2) === Lu ? (u3 = Lu, qt += 2) : (u3 = null, 0 === Wt && e(Mu)), null !== u3 && (Lt = l2, u3 = Du()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function W() {
                var l2, u3;
                return l2 = qt, n2.substr(qt, 2) === Hu ? (u3 = Hu, qt += 2) : (u3 = null, 0 === Wt && e(Ou)), null !== u3 && (Lt = l2, u3 = Wu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function z() {
                var l2, u3;
                return l2 = qt, n2.substr(qt, 2) === zu ? (u3 = zu, qt += 2) : (u3 = null, 0 === Wt && e(Iu)), null !== u3 && (Lt = l2, u3 = Ju()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function I() {
                var l2, u3;
                return l2 = qt, n2.substr(qt, 2) === Ku ? (u3 = Ku, qt += 2) : (u3 = null, 0 === Wt && e(Nu)), null !== u3 && (Lt = l2, u3 = Pu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function J() {
                var l2, u3;
                return l2 = qt, n2.substr(qt, 2) === Vu ? (u3 = Vu, qt += 2) : (u3 = null, 0 === Wt && e(Xu)), null !== u3 && (Lt = l2, u3 = Yu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function K() {
                var l2, u3;
                return l2 = qt, n2.substr(qt, 2) === Zu ? (u3 = Zu, qt += 2) : (u3 = null, 0 === Wt && e(_u)), null !== u3 && (Lt = l2, u3 = nt()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function N() {
                var l2, u3;
                return l2 = qt, n2.substr(qt, 2) === lt ? (u3 = lt, qt += 2) : (u3 = null, 0 === Wt && e(ut)), null !== u3 && (Lt = l2, u3 = tt()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function P() {
                var l2, u3;
                return l2 = qt, n2.substr(qt, 2) === rt ? (u3 = rt, qt += 2) : (u3 = null, 0 === Wt && e(et)), null !== u3 && (Lt = l2, u3 = ot()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function V() {
                var l2, u3;
                return l2 = qt, n2.substr(qt, 2) === ct ? (u3 = ct, qt += 2) : (u3 = null, 0 === Wt && e(it)), null !== u3 && (Lt = l2, u3 = at()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function X() {
                var l2, u3;
                return l2 = qt, n2.substr(qt, 2) === ft ? (u3 = ft, qt += 2) : (u3 = null, 0 === Wt && e(st)), null !== u3 && (Lt = l2, u3 = ht()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function Y() {
                var l2, u3, t2;
                return l2 = qt, n2.substr(qt, 2) === dt ? (u3 = dt, qt += 2) : (u3 = null, 0 === Wt && e(pt)), null !== u3 ? (n2.length > qt ? (t2 = n2.charAt(qt), qt++) : (t2 = null, 0 === Wt && e(vt)), null !== t2 ? (Lt = l2, u3 = wt(t2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function Z() {
                var l2, u3, t2;
                return l2 = qt, 92 === n2.charCodeAt(qt) ? (u3 = At, qt++) : (u3 = null, 0 === Wt && e(Ct)), null !== u3 ? (gt.test(n2.charAt(qt)) ? (t2 = n2.charAt(qt), qt++) : (t2 = null, 0 === Wt && e(bt)), null !== t2 ? (Lt = l2, u3 = kt(t2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function _() {
                var l2, u3, t2, r2;
                if (l2 = qt, n2.substr(qt, 2) === Tt ? (u3 = Tt, qt += 2) : (u3 = null, 0 === Wt && e(xt)), null !== u3) {
                  if (t2 = [], yt.test(n2.charAt(qt)) ? (r2 = n2.charAt(qt), qt++) : (r2 = null, 0 === Wt && e(mt)), null !== r2)
                    for (; null !== r2; )
                      t2.push(r2), yt.test(n2.charAt(qt)) ? (r2 = n2.charAt(qt), qt++) : (r2 = null, 0 === Wt && e(mt));
                  else
                    t2 = il;
                  null !== t2 ? (Lt = l2, u3 = Rt(t2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il);
                } else
                  qt = l2, l2 = il;
                return l2;
              }
              function nl() {
                var l2, u3, t2, r2;
                if (l2 = qt, n2.substr(qt, 2) === Ft ? (u3 = Ft, qt += 2) : (u3 = null, 0 === Wt && e(Qt)), null !== u3) {
                  if (t2 = [], St.test(n2.charAt(qt)) ? (r2 = n2.charAt(qt), qt++) : (r2 = null, 0 === Wt && e(Ut)), null !== r2)
                    for (; null !== r2; )
                      t2.push(r2), St.test(n2.charAt(qt)) ? (r2 = n2.charAt(qt), qt++) : (r2 = null, 0 === Wt && e(Ut));
                  else
                    t2 = il;
                  null !== t2 ? (Lt = l2, u3 = Et(t2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il);
                } else
                  qt = l2, l2 = il;
                return l2;
              }
              function ll() {
                var l2, u3, t2, r2;
                if (l2 = qt, n2.substr(qt, 2) === Gt ? (u3 = Gt, qt += 2) : (u3 = null, 0 === Wt && e(Bt)), null !== u3) {
                  if (t2 = [], St.test(n2.charAt(qt)) ? (r2 = n2.charAt(qt), qt++) : (r2 = null, 0 === Wt && e(Ut)), null !== r2)
                    for (; null !== r2; )
                      t2.push(r2), St.test(n2.charAt(qt)) ? (r2 = n2.charAt(qt), qt++) : (r2 = null, 0 === Wt && e(Ut));
                  else
                    t2 = il;
                  null !== t2 ? (Lt = l2, u3 = jt(t2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il);
                } else
                  qt = l2, l2 = il;
                return l2;
              }
              function ul() {
                var l2, u3;
                return l2 = qt, n2.substr(qt, 2) === Tt ? (u3 = Tt, qt += 2) : (u3 = null, 0 === Wt && e(xt)), null !== u3 && (Lt = l2, u3 = $t()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function tl() {
                var l2, u3, t2;
                return l2 = qt, 92 === n2.charCodeAt(qt) ? (u3 = At, qt++) : (u3 = null, 0 === Wt && e(Ct)), null !== u3 ? (n2.length > qt ? (t2 = n2.charAt(qt), qt++) : (t2 = null, 0 === Wt && e(vt)), null !== t2 ? (Lt = l2, u3 = bu(t2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              var rl, el = arguments.length > 1 ? arguments[1] : {}, ol = {
                regexp: c
              }, cl = c, il = null, al = "", fl = "|", sl = '"|"', hl = function(n3, l2) {
                return l2 ? new Alternate(n3, l2[1]) : n3;
              }, dl = function(n3, l2, u3) {
                return new Match([n3].concat(l2).concat([u3]));
              }, pl = "^", vl = '"^"', wl = function() {
                return new Token("start");
              }, Al = "$", Cl = '"$"', gl = function() {
                return new Token("end");
              }, bl = function(n3, l2) {
                return new Quantified(n3, l2);
              }, kl = "Quantifier", Tl = function(n3, l2) {
                return l2 && (n3.greedy = false), n3;
              }, xl = "{", yl = '"{"', ml = ",", Rl = '","', Fl = "}", Ql = '"}"', Sl = function(n3, l2) {
                return new Quantifier(n3, l2);
              }, Ul = ",}", El = '",}"', Gl = function(n3) {
                return new Quantifier(n3, 1 / 0);
              }, Bl = function(n3) {
                return new Quantifier(n3, n3);
              }, jl = "+", $l = '"+"', ql = function() {
                return new Quantifier(1, 1 / 0);
              }, Ll = "*", Ml = '"*"', Dl = function() {
                return new Quantifier(0, 1 / 0);
              }, Hl = "?", Ol = '"?"', Wl = function() {
                return new Quantifier(0, 1);
              }, zl = /^[0-9]/, Il = "[0-9]", Jl = function(n3) {
                return +n3.join("");
              }, Kl = "(", Nl = '"("', Pl = ")", Vl = '")"', Xl = function(n3) {
                return n3;
              }, Yl = function(n3) {
                return new CaptureGroup(n3);
              }, Zl = "?:", _l = '"?:"', nu = function(n3) {
                return new Group("non-capture-group", n3);
              }, lu = "?=", uu = '"?="', tu = function(n3) {
                return new Group("positive-lookahead", n3);
              }, ru = "?!", eu = '"?!"', ou = function(n3) {
                return new Group("negative-lookahead", n3);
              }, cu = "CharacterSet", iu = "[", au = '"["', fu = "]", su = '"]"', hu = function(n3, l2) {
                return new CharSet(!!n3, l2);
              }, du = "CharacterRange", pu = "-", vu = '"-"', wu = function(n3, l2) {
                return new CharacterRange(n3, l2);
              }, Au = "Character", Cu = /^[^\\\]]/, gu = "[^\\\\\\]]", bu = function(n3) {
                return new Literal(n3);
              }, ku = ".", Tu = '"."', xu = function() {
                return new Token("any-character");
              }, yu = "Literal", mu = /^[^|\\\/.[()?+*$\^]/, Ru = "[^|\\\\\\/.[()?+*$\\^]", Fu = "\\b", Qu = '"\\\\b"', Su = function() {
                return new Token("backspace");
              }, Uu = function() {
                return new Token("word-boundary");
              }, Eu = "\\B", Gu = '"\\\\B"', Bu = function() {
                return new Token("non-word-boundary");
              }, ju = "\\d", $u = '"\\\\d"', qu = function() {
                return new Token("digit");
              }, Lu = "\\D", Mu = '"\\\\D"', Du = function() {
                return new Token("non-digit");
              }, Hu = "\\f", Ou = '"\\\\f"', Wu = function() {
                return new Token("form-feed");
              }, zu = "\\n", Iu = '"\\\\n"', Ju = function() {
                return new Token("line-feed");
              }, Ku = "\\r", Nu = '"\\\\r"', Pu = function() {
                return new Token("carriage-return");
              }, Vu = "\\s", Xu = '"\\\\s"', Yu = function() {
                return new Token("white-space");
              }, Zu = "\\S", _u = '"\\\\S"', nt = function() {
                return new Token("non-white-space");
              }, lt = "\\t", ut = '"\\\\t"', tt = function() {
                return new Token("tab");
              }, rt = "\\v", et = '"\\\\v"', ot = function() {
                return new Token("vertical-tab");
              }, ct = "\\w", it = '"\\\\w"', at = function() {
                return new Token("word");
              }, ft = "\\W", st = '"\\\\W"', ht = function() {
                return new Token("non-word");
              }, dt = "\\c", pt = '"\\\\c"', vt = "any character", wt = function(n3) {
                return new ControlCharacter(n3);
              }, At = "\\", Ct = '"\\\\"', gt = /^[1-9]/, bt = "[1-9]", kt = function(n3) {
                return new BackReference(n3);
              }, Tt = "\\0", xt = '"\\\\0"', yt = /^[0-7]/, mt = "[0-7]", Rt = function(n3) {
                return new Octal(n3.join(""));
              }, Ft = "\\x", Qt = '"\\\\x"', St = /^[0-9a-fA-F]/, Ut = "[0-9a-fA-F]", Et = function(n3) {
                return new Hex(n3.join(""));
              }, Gt = "\\u", Bt = '"\\\\u"', jt = function(n3) {
                return new Unicode(n3.join(""));
              }, $t = function() {
                return new Token("null-character");
              }, qt = 0, Lt = 0, Mt = 0, Dt = {
                line: 1,
                column: 1,
                seenCR: false
              }, Ht = 0, Ot = [], Wt = 0;
              if ("startRule" in el) {
                if (!(el.startRule in ol))
                  throw new Error(`Can't start parsing from rule "` + el.startRule + '".');
                cl = ol[el.startRule];
              }
              if (Token.offset = t, Token.text = u2, rl = cl(), null !== rl && qt === n2.length)
                return rl;
              throw o(Ot), Lt = Math.max(qt, Ht), new l(Ot, Lt < n2.length ? n2.charAt(Lt) : null, Lt, r(Lt).line, r(Lt).column);
            }
            return n(l, Error), {
              SyntaxError: l,
              parse: u
            };
          }(), index2 = 1, cgs = {};
          module2.exports = parser;
        },
        /* 22 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Util2 = __webpack_require__2(3);
          var Random2 = __webpack_require__2(5);
          var Handler2 = {
            extend: Util2.extend
          };
          var LOWER = ascii(97, 122);
          var UPPER = ascii(65, 90);
          var NUMBER = ascii(48, 57);
          var OTHER = ascii(32, 47) + ascii(58, 64) + ascii(91, 96) + ascii(123, 126);
          var PRINTABLE = ascii(32, 126);
          var SPACE = " \f\n\r	\v \u2028\u2029";
          var CHARACTER_CLASSES = {
            "\\w": LOWER + UPPER + NUMBER + "_",
            // ascii(95, 95)
            "\\W": OTHER.replace("_", ""),
            "\\s": SPACE,
            "\\S": function() {
              var result = PRINTABLE;
              for (var i2 = 0; i2 < SPACE.length; i2++) {
                result = result.replace(SPACE[i2], "");
              }
              return result;
            }(),
            "\\d": NUMBER,
            "\\D": LOWER + UPPER + OTHER
          };
          function ascii(from, to) {
            var result = "";
            for (var i2 = from; i2 <= to; i2++) {
              result += String.fromCharCode(i2);
            }
            return result;
          }
          Handler2.gen = function(node, result, cache) {
            cache = cache || {
              guid: 1
            };
            return Handler2[node.type] ? Handler2[node.type](node, result, cache) : Handler2.token(node, result, cache);
          };
          Handler2.extend({
            /* jshint unused:false */
            token: function(node, result, cache) {
              switch (node.type) {
                case "start":
                case "end":
                  return "";
                case "any-character":
                  return Random2.character();
                case "backspace":
                  return "";
                case "word-boundary":
                  return "";
                case "non-word-boundary":
                  break;
                case "digit":
                  return Random2.pick(
                    NUMBER.split("")
                  );
                case "non-digit":
                  return Random2.pick(
                    (LOWER + UPPER + OTHER).split("")
                  );
                case "form-feed":
                  break;
                case "line-feed":
                  return node.body || node.text;
                case "carriage-return":
                  break;
                case "white-space":
                  return Random2.pick(
                    SPACE.split("")
                  );
                case "non-white-space":
                  return Random2.pick(
                    (LOWER + UPPER + NUMBER).split("")
                  );
                case "tab":
                  break;
                case "vertical-tab":
                  break;
                case "word":
                  return Random2.pick(
                    (LOWER + UPPER + NUMBER).split("")
                  );
                case "non-word":
                  return Random2.pick(
                    OTHER.replace("_", "").split("")
                  );
              }
              return node.body || node.text;
            },
            /*
                {
                    type: 'alternate',
                    offset: 0,
                    text: '',
                    left: {
                        boyd: []
                    },
                    right: {
                        boyd: []
                    }
                }
            */
            alternate: function(node, result, cache) {
              return this.gen(
                Random2.boolean() ? node.left : node.right,
                result,
                cache
              );
            },
            /*
                {
                    type: 'match',
                    offset: 0,
                    text: '',
                    body: []
                }
            */
            match: function(node, result, cache) {
              result = "";
              for (var i2 = 0; i2 < node.body.length; i2++) {
                result += this.gen(node.body[i2], result, cache);
              }
              return result;
            },
            // ()
            "capture-group": function(node, result, cache) {
              result = this.gen(node.body, result, cache);
              cache[cache.guid++] = result;
              return result;
            },
            // (?:...)
            "non-capture-group": function(node, result, cache) {
              return this.gen(node.body, result, cache);
            },
            // (?=p)
            "positive-lookahead": function(node, result, cache) {
              return this.gen(node.body, result, cache);
            },
            // (?!p)
            "negative-lookahead": function(node, result, cache) {
              return "";
            },
            /*
                {
                    type: 'quantified',
                    offset: 3,
                    text: 'c*',
                    body: {
                        type: 'literal',
                        offset: 3,
                        text: 'c',
                        body: 'c',
                        escaped: false
                    },
                    quantifier: {
                        type: 'quantifier',
                        offset: 4,
                        text: '*',
                        min: 0,
                        max: Infinity,
                        greedy: true
                    }
                }
            */
            quantified: function(node, result, cache) {
              result = "";
              var count = this.quantifier(node.quantifier);
              for (var i2 = 0; i2 < count; i2++) {
                result += this.gen(node.body, result, cache);
              }
              return result;
            },
            /*
                quantifier: {
                    type: 'quantifier',
                    offset: 4,
                    text: '*',
                    min: 0,
                    max: Infinity,
                    greedy: true
                }
            */
            quantifier: function(node, result, cache) {
              var min = Math.max(node.min, 0);
              var max = isFinite(node.max) ? node.max : min + Random2.integer(3, 7);
              return Random2.integer(min, max);
            },
            /*
                
            */
            charset: function(node, result, cache) {
              if (node.invert)
                return this["invert-charset"](node, result, cache);
              var literal = Random2.pick(node.body);
              return this.gen(literal, result, cache);
            },
            "invert-charset": function(node, result, cache) {
              var pool = PRINTABLE;
              for (var i2 = 0, item; i2 < node.body.length; i2++) {
                item = node.body[i2];
                switch (item.type) {
                  case "literal":
                    pool = pool.replace(item.body, "");
                    break;
                  case "range":
                    var min = this.gen(item.start, result, cache).charCodeAt();
                    var max = this.gen(item.end, result, cache).charCodeAt();
                    for (var ii = min; ii <= max; ii++) {
                      pool = pool.replace(String.fromCharCode(ii), "");
                    }
                  default:
                    var characters = CHARACTER_CLASSES[item.text];
                    if (characters) {
                      for (var iii = 0; iii <= characters.length; iii++) {
                        pool = pool.replace(characters[iii], "");
                      }
                    }
                }
              }
              return Random2.pick(pool.split(""));
            },
            range: function(node, result, cache) {
              var min = this.gen(node.start, result, cache).charCodeAt();
              var max = this.gen(node.end, result, cache).charCodeAt();
              return String.fromCharCode(
                Random2.integer(min, max)
              );
            },
            literal: function(node, result, cache) {
              return node.escaped ? node.body : node.text;
            },
            // Unicode \u
            unicode: function(node, result, cache) {
              return String.fromCharCode(
                parseInt(node.code, 16)
              );
            },
            // 十六进制 \xFF
            hex: function(node, result, cache) {
              return String.fromCharCode(
                parseInt(node.code, 16)
              );
            },
            // 八进制 \0
            octal: function(node, result, cache) {
              return String.fromCharCode(
                parseInt(node.code, 8)
              );
            },
            // 反向引用
            "back-reference": function(node, result, cache) {
              return cache[node.code] || "";
            },
            /*
                http://en.wikipedia.org/wiki/C0_and_C1_control_codes
            */
            CONTROL_CHARACTER_MAP: function() {
              var CONTROL_CHARACTER = "@ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _".split(" ");
              var CONTROL_CHARACTER_UNICODE = "\0       \x07 \b 	 \n \v \f \r              \x1B    ".split(" ");
              var map = {};
              for (var i2 = 0; i2 < CONTROL_CHARACTER.length; i2++) {
                map[CONTROL_CHARACTER[i2]] = CONTROL_CHARACTER_UNICODE[i2];
              }
              return map;
            }(),
            "control-character": function(node, result, cache) {
              return this.CONTROL_CHARACTER_MAP[node.code];
            }
          });
          module2.exports = Handler2;
        },
        /* 23 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          module2.exports = __webpack_require__2(24);
        },
        /* 24 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Constant2 = __webpack_require__2(2);
          var Util2 = __webpack_require__2(3);
          var Parser2 = __webpack_require__2(4);
          function toJSONSchema(template, name2, path) {
            path = path || [];
            var result = {
              name: typeof name2 === "string" ? name2.replace(Constant2.RE_KEY, "$1") : name2,
              template,
              type: Util2.type(template),
              // 可能不准确，例如 { 'name|1': [{}, {} ...] }
              rule: Parser2.parse(name2)
            };
            result.path = path.slice(0);
            result.path.push(name2 === void 0 ? "ROOT" : result.name);
            switch (result.type) {
              case "array":
                result.items = [];
                Util2.each(template, function(value, index2) {
                  result.items.push(
                    toJSONSchema(value, index2, result.path)
                  );
                });
                break;
              case "object":
                result.properties = [];
                Util2.each(template, function(value, name3) {
                  result.properties.push(
                    toJSONSchema(value, name3, result.path)
                  );
                });
                break;
            }
            return result;
          }
          module2.exports = toJSONSchema;
        },
        /* 25 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          module2.exports = __webpack_require__2(26);
        },
        /* 26 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Constant2 = __webpack_require__2(2);
          var Util2 = __webpack_require__2(3);
          var toJSONSchema = __webpack_require__2(23);
          function valid(template, data) {
            var schema = toJSONSchema(template);
            var result = Diff.diff(schema, data);
            for (var i2 = 0; i2 < result.length; i2++) {
            }
            return result;
          }
          var Diff = {
            diff: function diff(schema, data, name2) {
              var result = [];
              if (this.name(schema, data, name2, result) && this.type(schema, data, name2, result)) {
                this.value(schema, data, name2, result);
                this.properties(schema, data, name2, result);
                this.items(schema, data, name2, result);
              }
              return result;
            },
            /* jshint unused:false */
            name: function(schema, data, name2, result) {
              var length = result.length;
              Assert.equal("name", schema.path, name2 + "", schema.name + "", result);
              return result.length === length;
            },
            type: function(schema, data, name2, result) {
              var length = result.length;
              switch (schema.type) {
                case "string":
                  if (schema.template.match(Constant2.RE_PLACEHOLDER))
                    return true;
                  break;
                case "array":
                  if (schema.rule.parameters) {
                    if (schema.rule.min !== void 0 && schema.rule.max === void 0) {
                      if (schema.rule.count === 1)
                        return true;
                    }
                    if (schema.rule.parameters[2])
                      return true;
                  }
                  break;
                case "function":
                  return true;
              }
              Assert.equal("type", schema.path, Util2.type(data), schema.type, result);
              return result.length === length;
            },
            value: function(schema, data, name2, result) {
              var length = result.length;
              var rule = schema.rule;
              var templateType = schema.type;
              if (templateType === "object" || templateType === "array" || templateType === "function")
                return true;
              if (!rule.parameters) {
                switch (templateType) {
                  case "regexp":
                    Assert.match("value", schema.path, data, schema.template, result);
                    return result.length === length;
                  case "string":
                    if (schema.template.match(Constant2.RE_PLACEHOLDER))
                      return result.length === length;
                    break;
                }
                Assert.equal("value", schema.path, data, schema.template, result);
                return result.length === length;
              }
              var actualRepeatCount;
              switch (templateType) {
                case "number":
                  var parts2 = (data + "").split(".");
                  parts2[0] = +parts2[0];
                  if (rule.min !== void 0 && rule.max !== void 0) {
                    Assert.greaterThanOrEqualTo("value", schema.path, parts2[0], Math.min(rule.min, rule.max), result);
                    Assert.lessThanOrEqualTo("value", schema.path, parts2[0], Math.max(rule.min, rule.max), result);
                  }
                  if (rule.min !== void 0 && rule.max === void 0) {
                    Assert.equal("value", schema.path, parts2[0], rule.min, result, "[value] " + name2);
                  }
                  if (rule.decimal) {
                    if (rule.dmin !== void 0 && rule.dmax !== void 0) {
                      Assert.greaterThanOrEqualTo("value", schema.path, parts2[1].length, rule.dmin, result);
                      Assert.lessThanOrEqualTo("value", schema.path, parts2[1].length, rule.dmax, result);
                    }
                    if (rule.dmin !== void 0 && rule.dmax === void 0) {
                      Assert.equal("value", schema.path, parts2[1].length, rule.dmin, result);
                    }
                  }
                  break;
                case "boolean":
                  break;
                case "string":
                  actualRepeatCount = data.match(new RegExp(schema.template, "g"));
                  actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0;
                  if (rule.min !== void 0 && rule.max !== void 0) {
                    Assert.greaterThanOrEqualTo("repeat count", schema.path, actualRepeatCount, rule.min, result);
                    Assert.lessThanOrEqualTo("repeat count", schema.path, actualRepeatCount, rule.max, result);
                  }
                  if (rule.min !== void 0 && rule.max === void 0) {
                    Assert.equal("repeat count", schema.path, actualRepeatCount, rule.min, result);
                  }
                  break;
                case "regexp":
                  actualRepeatCount = data.match(new RegExp(schema.template.source.replace(/^\^|\$$/g, ""), "g"));
                  actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0;
                  if (rule.min !== void 0 && rule.max !== void 0) {
                    Assert.greaterThanOrEqualTo("repeat count", schema.path, actualRepeatCount, rule.min, result);
                    Assert.lessThanOrEqualTo("repeat count", schema.path, actualRepeatCount, rule.max, result);
                  }
                  if (rule.min !== void 0 && rule.max === void 0) {
                    Assert.equal("repeat count", schema.path, actualRepeatCount, rule.min, result);
                  }
                  break;
              }
              return result.length === length;
            },
            properties: function(schema, data, name2, result) {
              var length = result.length;
              var rule = schema.rule;
              var keys2 = Util2.keys(data);
              if (!schema.properties)
                return;
              if (!schema.rule.parameters) {
                Assert.equal("properties length", schema.path, keys2.length, schema.properties.length, result);
              } else {
                if (rule.min !== void 0 && rule.max !== void 0) {
                  Assert.greaterThanOrEqualTo("properties length", schema.path, keys2.length, Math.min(rule.min, rule.max), result);
                  Assert.lessThanOrEqualTo("properties length", schema.path, keys2.length, Math.max(rule.min, rule.max), result);
                }
                if (rule.min !== void 0 && rule.max === void 0) {
                  if (rule.count !== 1)
                    Assert.equal("properties length", schema.path, keys2.length, rule.min, result);
                }
              }
              if (result.length !== length)
                return false;
              for (var i2 = 0; i2 < keys2.length; i2++) {
                result.push.apply(
                  result,
                  this.diff(
                    function() {
                      var property;
                      Util2.each(schema.properties, function(item) {
                        if (item.name === keys2[i2])
                          property = item;
                      });
                      return property || schema.properties[i2];
                    }(),
                    data[keys2[i2]],
                    keys2[i2]
                  )
                );
              }
              return result.length === length;
            },
            items: function(schema, data, name2, result) {
              var length = result.length;
              if (!schema.items)
                return;
              var rule = schema.rule;
              if (!schema.rule.parameters) {
                Assert.equal("items length", schema.path, data.length, schema.items.length, result);
              } else {
                if (rule.min !== void 0 && rule.max !== void 0) {
                  Assert.greaterThanOrEqualTo(
                    "items",
                    schema.path,
                    data.length,
                    Math.min(rule.min, rule.max) * schema.items.length,
                    result,
                    "[{utype}] array is too short: {path} must have at least {expected} elements but instance has {actual} elements"
                  );
                  Assert.lessThanOrEqualTo(
                    "items",
                    schema.path,
                    data.length,
                    Math.max(rule.min, rule.max) * schema.items.length,
                    result,
                    "[{utype}] array is too long: {path} must have at most {expected} elements but instance has {actual} elements"
                  );
                }
                if (rule.min !== void 0 && rule.max === void 0) {
                  if (rule.count === 1)
                    return result.length === length;
                  else
                    Assert.equal("items length", schema.path, data.length, rule.min * schema.items.length, result);
                }
                if (rule.parameters[2])
                  return result.length === length;
              }
              if (result.length !== length)
                return false;
              for (var i2 = 0; i2 < data.length; i2++) {
                result.push.apply(
                  result,
                  this.diff(
                    schema.items[i2 % schema.items.length],
                    data[i2],
                    i2 % schema.items.length
                  )
                );
              }
              return result.length === length;
            }
          };
          var Assert = {
            message: function(item) {
              return (item.message || "[{utype}] Expect {path}'{ltype} {action} {expected}, but is {actual}").replace("{utype}", item.type.toUpperCase()).replace("{ltype}", item.type.toLowerCase()).replace("{path}", Util2.isArray(item.path) && item.path.join(".") || item.path).replace("{action}", item.action).replace("{expected}", item.expected).replace("{actual}", item.actual);
            },
            equal: function(type, path, actual, expected, result, message) {
              if (actual === expected)
                return true;
              switch (type) {
                case "type":
                  if (expected === "regexp" && actual === "string")
                    return true;
                  break;
              }
              var item = {
                path,
                type,
                actual,
                expected,
                action: "is equal to",
                message
              };
              item.message = Assert.message(item);
              result.push(item);
              return false;
            },
            // actual matches expected
            match: function(type, path, actual, expected, result, message) {
              if (expected.test(actual))
                return true;
              var item = {
                path,
                type,
                actual,
                expected,
                action: "matches",
                message
              };
              item.message = Assert.message(item);
              result.push(item);
              return false;
            },
            notEqual: function(type, path, actual, expected, result, message) {
              if (actual !== expected)
                return true;
              var item = {
                path,
                type,
                actual,
                expected,
                action: "is not equal to",
                message
              };
              item.message = Assert.message(item);
              result.push(item);
              return false;
            },
            greaterThan: function(type, path, actual, expected, result, message) {
              if (actual > expected)
                return true;
              var item = {
                path,
                type,
                actual,
                expected,
                action: "is greater than",
                message
              };
              item.message = Assert.message(item);
              result.push(item);
              return false;
            },
            lessThan: function(type, path, actual, expected, result, message) {
              if (actual < expected)
                return true;
              var item = {
                path,
                type,
                actual,
                expected,
                action: "is less to",
                message
              };
              item.message = Assert.message(item);
              result.push(item);
              return false;
            },
            greaterThanOrEqualTo: function(type, path, actual, expected, result, message) {
              if (actual >= expected)
                return true;
              var item = {
                path,
                type,
                actual,
                expected,
                action: "is greater than or equal to",
                message
              };
              item.message = Assert.message(item);
              result.push(item);
              return false;
            },
            lessThanOrEqualTo: function(type, path, actual, expected, result, message) {
              if (actual <= expected)
                return true;
              var item = {
                path,
                type,
                actual,
                expected,
                action: "is less than or equal to",
                message
              };
              item.message = Assert.message(item);
              result.push(item);
              return false;
            }
          };
          valid.Diff = Diff;
          valid.Assert = Assert;
          module2.exports = valid;
        },
        /* 27 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          module2.exports = __webpack_require__2(28);
        },
        /* 28 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Util2 = __webpack_require__2(3);
          window._XMLHttpRequest = window.XMLHttpRequest;
          window._ActiveXObject = window.ActiveXObject;
          try {
            new window.Event("custom");
          } catch (exception) {
            window.Event = function(type, bubbles, cancelable, detail) {
              var event = document.createEvent("CustomEvent");
              event.initCustomEvent(type, bubbles, cancelable, detail);
              return event;
            };
          }
          var XHR_STATES = {
            // The object has been constructed.
            UNSENT: 0,
            // The open() method has been successfully invoked.
            OPENED: 1,
            // All redirects (if any) have been followed and all HTTP headers of the response have been received.
            HEADERS_RECEIVED: 2,
            // The response's body is being received.
            LOADING: 3,
            // The data transfer has been completed or something went wrong during the transfer (e.g. infinite redirects).
            DONE: 4
          };
          var XHR_EVENTS = "readystatechange loadstart progress abort error load timeout loadend".split(" ");
          var XHR_REQUEST_PROPERTIES = "timeout withCredentials".split(" ");
          var XHR_RESPONSE_PROPERTIES = "readyState responseURL status statusText responseType response responseText responseXML".split(" ");
          var HTTP_STATUS_CODES = {
            100: "Continue",
            101: "Switching Protocols",
            200: "OK",
            201: "Created",
            202: "Accepted",
            203: "Non-Authoritative Information",
            204: "No Content",
            205: "Reset Content",
            206: "Partial Content",
            300: "Multiple Choice",
            301: "Moved Permanently",
            302: "Found",
            303: "See Other",
            304: "Not Modified",
            305: "Use Proxy",
            307: "Temporary Redirect",
            400: "Bad Request",
            401: "Unauthorized",
            402: "Payment Required",
            403: "Forbidden",
            404: "Not Found",
            405: "Method Not Allowed",
            406: "Not Acceptable",
            407: "Proxy Authentication Required",
            408: "Request Timeout",
            409: "Conflict",
            410: "Gone",
            411: "Length Required",
            412: "Precondition Failed",
            413: "Request Entity Too Large",
            414: "Request-URI Too Long",
            415: "Unsupported Media Type",
            416: "Requested Range Not Satisfiable",
            417: "Expectation Failed",
            422: "Unprocessable Entity",
            500: "Internal Server Error",
            501: "Not Implemented",
            502: "Bad Gateway",
            503: "Service Unavailable",
            504: "Gateway Timeout",
            505: "HTTP Version Not Supported"
          };
          function MockXMLHttpRequest() {
            this.custom = {
              events: {},
              requestHeaders: {},
              responseHeaders: {}
            };
          }
          MockXMLHttpRequest._settings = {
            timeout: "10-100"
            /*
                timeout: 50,
                timeout: '10-100',
             */
          };
          MockXMLHttpRequest.setup = function(settings) {
            Util2.extend(MockXMLHttpRequest._settings, settings);
            return MockXMLHttpRequest._settings;
          };
          Util2.extend(MockXMLHttpRequest, XHR_STATES);
          Util2.extend(MockXMLHttpRequest.prototype, XHR_STATES);
          MockXMLHttpRequest.prototype.mock = true;
          MockXMLHttpRequest.prototype.match = false;
          Util2.extend(MockXMLHttpRequest.prototype, {
            // https://xhr.spec.whatwg.org/#the-open()-method
            // Sets the request method, request URL, and synchronous flag.
            open: function(method, url, async, username, password) {
              var that = this;
              Util2.extend(this.custom, {
                method,
                url,
                async: typeof async === "boolean" ? async : true,
                username,
                password,
                options: {
                  url,
                  type: method
                }
              });
              this.custom.timeout = function(timeout) {
                if (typeof timeout === "number")
                  return timeout;
                if (typeof timeout === "string" && !~timeout.indexOf("-"))
                  return parseInt(timeout, 10);
                if (typeof timeout === "string" && ~timeout.indexOf("-")) {
                  var tmp = timeout.split("-");
                  var min = parseInt(tmp[0], 10);
                  var max = parseInt(tmp[1], 10);
                  return Math.round(Math.random() * (max - min)) + min;
                }
              }(MockXMLHttpRequest._settings.timeout);
              var item = find(this.custom.options);
              function handle2(event) {
                for (var i3 = 0; i3 < XHR_RESPONSE_PROPERTIES.length; i3++) {
                  try {
                    that[XHR_RESPONSE_PROPERTIES[i3]] = xhr[XHR_RESPONSE_PROPERTIES[i3]];
                  } catch (e) {
                  }
                }
                that.dispatchEvent(new Event(
                  event.type
                  /*, false, false, that*/
                ));
              }
              if (!item) {
                var xhr = createNativeXMLHttpRequest();
                this.custom.xhr = xhr;
                for (var i2 = 0; i2 < XHR_EVENTS.length; i2++) {
                  xhr.addEventListener(XHR_EVENTS[i2], handle2);
                }
                if (username)
                  xhr.open(method, url, async, username, password);
                else
                  xhr.open(method, url, async);
                for (var j = 0; j < XHR_REQUEST_PROPERTIES.length; j++) {
                  try {
                    xhr[XHR_REQUEST_PROPERTIES[j]] = that[XHR_REQUEST_PROPERTIES[j]];
                  } catch (e) {
                  }
                }
                return;
              }
              this.match = true;
              this.custom.template = item;
              this.readyState = MockXMLHttpRequest.OPENED;
              this.dispatchEvent(new Event(
                "readystatechange"
                /*, false, false, this*/
              ));
            },
            // https://xhr.spec.whatwg.org/#the-setrequestheader()-method
            // Combines a header in author request headers.
            setRequestHeader: function(name2, value) {
              if (!this.match) {
                this.custom.xhr.setRequestHeader(name2, value);
                return;
              }
              var requestHeaders = this.custom.requestHeaders;
              if (requestHeaders[name2])
                requestHeaders[name2] += "," + value;
              else
                requestHeaders[name2] = value;
            },
            timeout: 0,
            withCredentials: false,
            upload: {},
            // https://xhr.spec.whatwg.org/#the-send()-method
            // Initiates the request.
            send: function send2(data) {
              var that = this;
              this.custom.options.body = data;
              if (!this.match) {
                this.custom.xhr.send(data);
                return;
              }
              this.setRequestHeader("X-Requested-With", "MockXMLHttpRequest");
              this.dispatchEvent(new Event(
                "loadstart"
                /*, false, false, this*/
              ));
              if (this.custom.async)
                setTimeout(done, this.custom.timeout);
              else
                done();
              function done() {
                that.readyState = MockXMLHttpRequest.HEADERS_RECEIVED;
                that.dispatchEvent(new Event(
                  "readystatechange"
                  /*, false, false, that*/
                ));
                that.readyState = MockXMLHttpRequest.LOADING;
                that.dispatchEvent(new Event(
                  "readystatechange"
                  /*, false, false, that*/
                ));
                that.status = 200;
                that.statusText = HTTP_STATUS_CODES[200];
                that.response = that.responseText = JSON.stringify(
                  convert2(that.custom.template, that.custom.options),
                  null,
                  4
                );
                that.readyState = MockXMLHttpRequest.DONE;
                that.dispatchEvent(new Event(
                  "readystatechange"
                  /*, false, false, that*/
                ));
                that.dispatchEvent(new Event(
                  "load"
                  /*, false, false, that*/
                ));
                that.dispatchEvent(new Event(
                  "loadend"
                  /*, false, false, that*/
                ));
              }
            },
            // https://xhr.spec.whatwg.org/#the-abort()-method
            // Cancels any network activity.
            abort: function abort() {
              if (!this.match) {
                this.custom.xhr.abort();
                return;
              }
              this.readyState = MockXMLHttpRequest.UNSENT;
              this.dispatchEvent(new Event("abort", false, false, this));
              this.dispatchEvent(new Event("error", false, false, this));
            }
          });
          Util2.extend(MockXMLHttpRequest.prototype, {
            responseURL: "",
            status: MockXMLHttpRequest.UNSENT,
            statusText: "",
            // https://xhr.spec.whatwg.org/#the-getresponseheader()-method
            getResponseHeader: function(name2) {
              if (!this.match) {
                return this.custom.xhr.getResponseHeader(name2);
              }
              return this.custom.responseHeaders[name2.toLowerCase()];
            },
            // https://xhr.spec.whatwg.org/#the-getallresponseheaders()-method
            // http://www.utf8-chartable.de/
            getAllResponseHeaders: function() {
              if (!this.match) {
                return this.custom.xhr.getAllResponseHeaders();
              }
              var responseHeaders = this.custom.responseHeaders;
              var headers = "";
              for (var h in responseHeaders) {
                if (!responseHeaders.hasOwnProperty(h))
                  continue;
                headers += h + ": " + responseHeaders[h] + "\r\n";
              }
              return headers;
            },
            overrideMimeType: function() {
            },
            responseType: "",
            // '', 'text', 'arraybuffer', 'blob', 'document', 'json'
            response: null,
            responseText: "",
            responseXML: null
          });
          Util2.extend(MockXMLHttpRequest.prototype, {
            addEventListener: function addEventListener(type, handle2) {
              var events = this.custom.events;
              if (!events[type])
                events[type] = [];
              events[type].push(handle2);
            },
            removeEventListener: function removeEventListener(type, handle2) {
              var handles = this.custom.events[type] || [];
              for (var i2 = 0; i2 < handles.length; i2++) {
                if (handles[i2] === handle2) {
                  handles.splice(i2--, 1);
                }
              }
            },
            dispatchEvent: function dispatchEvent(event) {
              var handles = this.custom.events[event.type] || [];
              for (var i2 = 0; i2 < handles.length; i2++) {
                handles[i2].call(this, event);
              }
              var ontype = "on" + event.type;
              if (this[ontype])
                this[ontype](event);
            }
          });
          function createNativeXMLHttpRequest() {
            var isLocal = function() {
              var rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/;
              var rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;
              var ajaxLocation = location.href;
              var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
              return rlocalProtocol.test(ajaxLocParts[1]);
            }();
            return window.ActiveXObject ? !isLocal && createStandardXHR() || createActiveXHR() : createStandardXHR();
            function createStandardXHR() {
              try {
                return new window._XMLHttpRequest();
              } catch (e) {
              }
            }
            function createActiveXHR() {
              try {
                return new window._ActiveXObject("Microsoft.XMLHTTP");
              } catch (e) {
              }
            }
          }
          function find(options2) {
            for (var sUrlType in MockXMLHttpRequest.Mock._mocked) {
              var item = MockXMLHttpRequest.Mock._mocked[sUrlType];
              if ((!item.rurl || match(item.rurl, options2.url)) && (!item.rtype || match(item.rtype, options2.type.toLowerCase()))) {
                return item;
              }
            }
            function match(expected, actual) {
              if (Util2.type(expected) === "string") {
                return expected === actual;
              }
              if (Util2.type(expected) === "regexp") {
                return expected.test(actual);
              }
            }
          }
          function convert2(item, options2) {
            return Util2.isFunction(item.template) ? item.template(options2) : MockXMLHttpRequest.Mock.mock(item.template);
          }
          module2.exports = MockXMLHttpRequest;
        }
        /******/
      ])
    );
  });
})(mock);
var mockExports = mock.exports;
const mockJs = /* @__PURE__ */ getDefaultExportFromCjs(mockExports);
function lexer(str) {
  var tokens = [];
  var i2 = 0;
  while (i2 < str.length) {
    var char = str[i2];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i2, value: str[i2++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i2++, value: str[i2++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i2, value: str[i2++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i2, value: str[i2++] });
      continue;
    }
    if (char === ":") {
      var name2 = "";
      var j = i2 + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name2 += str[j++];
          continue;
        }
        break;
      }
      if (!name2)
        throw new TypeError("Missing parameter name at ".concat(i2));
      tokens.push({ type: "NAME", index: i2, value: name2 });
      i2 = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i2 + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i2));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i2));
      tokens.push({ type: "PATTERN", index: i2, value: pattern });
      i2 = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i2, value: str[i2++] });
  }
  tokens.push({ type: "END", index: i2, value: "" });
  return tokens;
}
function parse(str, options2) {
  if (options2 === void 0) {
    options2 = {};
  }
  var tokens = lexer(str);
  var _a = options2.prefixes, prefixes = _a === void 0 ? "./" : _a;
  var defaultPattern = "[^".concat(escapeString(options2.delimiter || "/#?"), "]+?");
  var result = [];
  var key2 = 0;
  var i2 = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i2 < tokens.length && tokens[i2].type === type)
      return tokens[i2++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i2], nextType = _a2.type, index2 = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index2, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  while (i2 < tokens.length) {
    var char = tryConsume("CHAR");
    var name2 = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name2 || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name2 || key2++,
        prefix,
        suffix: "",
        pattern: pattern || defaultPattern,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key2++ : ""),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options2) {
  return options2 && options2.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys2) {
  if (!keys2)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index2 = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys2.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index2++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
function arrayToRegexp(paths, keys2, options2) {
  var parts2 = paths.map(function(path) {
    return pathToRegexp(path, keys2, options2).source;
  });
  return new RegExp("(?:".concat(parts2.join("|"), ")"), flags(options2));
}
function stringToRegexp(path, keys2, options2) {
  return tokensToRegexp(parse(path, options2), keys2, options2);
}
function tokensToRegexp(tokens, keys2, options2) {
  if (options2 === void 0) {
    options2 = {};
  }
  var _a = options2.strict, strict = _a === void 0 ? false : _a, _b = options2.start, start = _b === void 0 ? true : _b, _c = options2.end, end = _c === void 0 ? true : _c, _d = options2.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options2.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options2.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route2 = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token2 = tokens_1[_i];
    if (typeof token2 === "string") {
      route2 += escapeString(encode(token2));
    } else {
      var prefix = escapeString(encode(token2.prefix));
      var suffix = escapeString(encode(token2.suffix));
      if (token2.pattern) {
        if (keys2)
          keys2.push(token2);
        if (prefix || suffix) {
          if (token2.modifier === "+" || token2.modifier === "*") {
            var mod = token2.modifier === "*" ? "?" : "";
            route2 += "(?:".concat(prefix, "((?:").concat(token2.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token2.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route2 += "(?:".concat(prefix, "(").concat(token2.pattern, ")").concat(suffix, ")").concat(token2.modifier);
          }
        } else {
          if (token2.modifier === "+" || token2.modifier === "*") {
            route2 += "((?:".concat(token2.pattern, ")").concat(token2.modifier, ")");
          } else {
            route2 += "(".concat(token2.pattern, ")").concat(token2.modifier);
          }
        }
      } else {
        route2 += "(?:".concat(prefix).concat(suffix, ")").concat(token2.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route2 += "".concat(delimiterRe, "?");
    route2 += !options2.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route2 += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route2 += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route2, flags(options2));
}
function pathToRegexp(path, keys2, options2) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys2);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys2, options2);
  return stringToRegexp(path, keys2, options2);
}
const Mock = mockJs;
function createProdMockServer(mockList) {
  Mock.XHR.prototype.__send = Mock.XHR.prototype.send;
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false;
      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType;
      }
    }
    if (this.custom.requestHeaders) {
      const headers = {};
      for (let k in this.custom.requestHeaders) {
        headers[k.toString().toLowerCase()] = this.custom.requestHeaders[k];
      }
      this.custom.options = Object.assign({}, this.custom.options, { headers });
    }
    this.__send.apply(this, arguments);
  };
  Mock.XHR.prototype.proxy_open = Mock.XHR.prototype.open;
  Mock.XHR.prototype.open = function() {
    let responseType = this.responseType;
    this.proxy_open(...arguments);
    if (this.custom.xhr) {
      if (responseType) {
        this.custom.xhr.responseType = responseType;
      }
    }
  };
  for (const { url, method, response, timeout } of mockList) {
    __setupMock__(timeout);
    Mock.mock(pathToRegexp(url, void 0, { end: false }), method || "get", __XHR2ExpressReqWrapper__(response));
  }
}
function __param2Obj__(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, " ") + '"}');
}
function __XHR2ExpressReqWrapper__(handle2) {
  return function(options2) {
    let result = null;
    if (typeof handle2 === "function") {
      const { body, type, url, headers } = options2;
      let b = body;
      try {
        b = JSON.parse(body);
      } catch {
      }
      result = handle2({
        method: type,
        body: b,
        query: __param2Obj__(url),
        headers
      });
    } else {
      result = handle2;
    }
    return Mock.mock(result);
  };
}
function __setupMock__(timeout = 0) {
  timeout && Mock.setup({
    timeout
  });
}
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNhYjRhNjc1NWY4YzQyOGMxNDJlMzciLCJuYW1lIjoi6LaF57qn566h55CG5ZGYIiwiYWNjb3VudCI6InhhZG1pbiIsImlhdCI6MTY4ODk1NTg3NiwiZXhwIjoxNjg5MTI4Njc2fQ.dpV8b4u2r0zi-yLP9NVFUwAoyChS0vHiZ17vR6Bi1PQ";
const user = {
  _id: "633ab4a6755f8c428c142e37",
  account: "xadmin",
  name: "超级管理员",
  roles: [],
  // 角色
  // fns 功能点
  fns: [],
  theme: "light",
  lang: "zh_CN",
  avatar: "",
  menus: [
    { id: "90", pid: "0", title: "首页", name: "home", path: "/home", host: "" },
    { id: "91", pid: "0", title: "关于我们", name: "about", path: "/about", host: "" },
    { id: "101", pid: "0", title: "系统管理", name: "xdp-sys", host: "" },
    { id: "10101", pid: "101", title: "用户管理", path: "/xdp-sys/a1", target: "_black" },
    { id: "10102", pid: "101", title: "角色管理", path: "/xdp-sys/a2" },
    { id: "10103", pid: "101", title: "功能管理", path: "/xdp-sys/a3" },
    { id: "10104", pid: "101", title: "菜单管理", path: "/xdp-sys/a4" },
    { id: "102", pid: "0", title: "t1管理", name: "xdp-t1", host: "" },
    { id: "10201", pid: "102", title: "t1-home", path: "/xdp-t1/home", target: "_black" },
    { id: "10202", pid: "102", title: "t1-about", path: "/xdp-t1/about", target: "_black" },
    { id: "103", pid: "0", title: "t2管理", name: "xdp-t2", host: "" },
    { id: "10301", pid: "103", title: "t2-home", path: "/xdp-t2/home", target: "_black" },
    { id: "10302", pid: "103", title: "t2-about", path: "/xdp-t2/about", target: "_black" }
  ]
};
const index = [
  {
    url: "/api/user/getUserInfo",
    method: "post",
    response: () => {
      return {
        code: 200,
        data: user,
        token
      };
    }
  },
  {
    url: "/api/user/login",
    method: "post",
    response: () => {
      return {
        code: 200,
        data: user,
        token
      };
    }
  },
  {
    url: "/api/user/changeLang",
    method: "post",
    response: () => {
      return {
        code: 200,
        data: {},
        msg: "操作成功"
      };
    }
  },
  {
    url: "/api/user/changeTheme",
    method: "post",
    response: () => {
      return {
        code: 200,
        data: {},
        msg: "操作成功"
      };
    }
  }
];
function setupProdMockServer() {
  createProdMockServer([...index]);
}
await Promise.all([window.__OSL.import("pinia"), window.__OSL.import("vue")]);
const { createPinia } = window.__OSL.getModule("pinia");
const { createApp } = window.__OSL.getModule("vue");
const app = createApp(_sfc_main$1);
registerDirectives(app);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(Icon);
app.mount(document.querySelector("#xdp-portal"));
permission();
setTimeout(() => {
  const url = new URL("" + new URL("../font/iconfont.js?_v=20230713", import.meta.url).href, self.location).href;
  addJs(url);
}, 200);
setupProdMockServer();
export {
  _export_sfc as _,
  useSystem as u
};
