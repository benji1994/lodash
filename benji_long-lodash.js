var benji_long = {
	chunk: function (array, size = 1) {
		let newArr = []
		let i = 0
		while(i < array.length) {
			newArr.push(array.slice(i, i + size))
			i += size
		}
		return newArr
	},

	compact: array => array.filter(item => item),
	
	difference: function (array, ...values) {
		let valArr = [].concat(...values)
		return array.filter(x => !valArr.includes(x))
	},

	differenceBy: function (array, values, iteratee = _.identity) {
		let predicate = _.iteratee(iteratee)
		let values2 = values.map(item => predicate(item))

		return array.filter((x) => !values2.includes(predicate(x)))
	},

	differenceWith: (array, values, comparator) => array.filter((item) => !values.some(it => comparator(it, item))),

	drop: (array, n = 1) => array.slice(n),

	dropRight: (array, n = 1) =>  n > array.length ? [] : array.slice(0, array.length - n),

	dropRightWhile: function (array, predicate = _.indentity) {
		predicate = _.iteratee(predicate)

		for (let i = array.length - 1; i >= 0; i--) {
			if (!predicate(array[i])) {
				var pos = i
				break
			}
		}

		return array.slice(0, pos + 1)
	},

	dropWhile: function (array, predicate = _.identity) {
		predicate = _.iteratee(predicate)

		let pos = array.findIndex(item => !predicate(item))
		return array.slice(pos)
	},

	fill: function (array, value, start = 0, end = array.length) {
		let newArr = Array.from(array)
		while(start < end) {
				newArr[start] = value
				start++
			}
		return newArr
	},

	findIndex: function (array, predicate = _.indentity, fromIndex = 0) {
		predicate = _.iteratee(predicate)

		for(let i = fromIndex; i < array.length; i++) {
			if (predicate(array[i])) return i
		}
	},

	findLastIndex: function (array, predicate = _.indentity, fromIndex = array.length - 1) {
		predicate = _.iteratee(predicate)

		for(let i = fromIndex; i >= 0; i--) {
			if (predicate(array[i])) return i
		}
	},

	flatten: function (array) {
		let flattenArr = []
			for(let i = 0; i < array.length; i++) {
				flattenArr = flattenArr.concat(array[i])
			}

			return flattenArr
	},

	flattenDeep: function (array) {
		array[Symbol.iterator] = function * iterTree(tree = this) {
			if (Array.isArray(tree)) {
				for (let i = 0; i < tree.length; i++) {
					yield * iterTree(tree[i])
				}
			} else {
				yield tree
			}
		}

		let flattenDeepArr = []
		for (let x of array) {
			flattenDeepArr.push(x)
		}
		return flattenDeepArr
	},

	flattenDepth: function core(array, depth = 1) {
		if (depth === 0) return array

		return core(array.reduce((pre, curr) => pre.concat(curr), []), --depth)
	},

	fromPairs: function (pairs) {
		let object = {}
		pairs.forEach(([key, value]) => object[key] = value)
		return object
	},

	head: array => array[0] ? array[0] : undefined,

	indexOf: (array, value, fromIndex = 0) => array.indexOf(value, fromIndex),

	initial: array => array.slice(0, array.length - 1),

	intersection: function (...array) {
		let a = new Set(array.shift())
		let b = new Set(this.flatten(array))

		return [...([...a].filter(x => b.has(x)))]
	},

	intersectionBy: function (...array) {
		let predicate = _.iteratee(array.pop())
		let set1 = new Set(array.shift())
		let arr2 = this.flatten(array).map(x => predicate(x))
		let set2 = new Set(arr2)

		return [...([...set1].filter(x => set2.has(predicate(x))))]
	},

	intersectionWith: function (...array) {
		let comparator = array.pop()
		let arr1 = array.shift()
		let arr2 = this.flatten(array)
		return arr1.filter(x => arr2.some(y => comparator(x, y)))
	},

	join: (array, separator = ',') => array.reduce((a, b) => '' + a + separator + b),

	last: array => array[array.length - 1],

	lastIndexOf: (array, value, fromIndex = array.length - 1) => array.lastIndexOf(value, fromIndex),

	nth: (array, n = 0) => n < 0 ? array[array.length + n] : array[n],
 pull: (array, ...values) => benji_long.pullAll(array, benji_long.flatten(values)),

	pullAll: function (array, values) {
		let valSet = new Set(values)
		return array.filter(x => !valSet.has(x))
	},

	pullAllBy: function (array, values, iteratee = _.identity) {
		let predicate = _.iteratee(iteratee)
		let valSet = new Set(values.map(x => predicate(x)))
		return array.filter(x => !valSet.has(predicate(x)))
	},

	pullAllWith: (array, values, comparator) => array.filter(x => !values.some(y => comparator(x, y))),

	reverse: array => array.reverse(),

	sortedIndex: (array, value) => array.findIndex(x => x >= value),

	sortedIndexBy: function (array, value, iteratee = _.identity) {
		let predicate = _.iteratee(iteratee)
		return array.findIndex(x => predicate(x) >= predicate(value))
	},

	sortedIndexOf: function (array, value) {
		if (array[0] > value || array[array.length] < value) return -1
		
		let left = 0, right = array.length - 1
		while(left <= right) {
			let mid = Math.floor((left + right) / 2)
			if (array[mid] === value) {
				while(array[mid] === value) {
					mid--
				}
				return mid + 1
			} else if (array[mid] > value) {
				right = mid - 1
			} else {
				left = mid + 1
			}
		}
		return -1
	},

	sortedLastIndex: (array, value) => array.findIndex(x => x > value),

	sortedLastIndexBy: function (array, value, iteratee = _.identity) {
		let predicate = _.iteratee(iteratee)
		return array.findIndex(x => predicate(x) > predicate(value))
	},

	sortedLastIndexOf: function (array, value) {
		if (array[0] > value || array[array.length] < value) return -1
		
		let left = 0, right = array.length - 1
		while(left <= right) {
			let mid = Math.floor((left + right) / 2)
			if (array[mid] === value) {
				while(array[mid] === value) {
					mid++
				}
				return mid - 1
			} else if (array[mid] > value) {
				right = mid - 1
			} else {
				left = mid + 1
			}
		}
		return -1
	},

	sortedUniq: array => [...new Set(array)].sort((a, b) => a > b),

	sortedUniqBy: function (array, iteratee) {
		let predicate = _.iteratee(iteratee)
		let arrMap = array.map(x => iteratee(x))
		let arrIndex = arrMap.reduce((result, curr) => {
			let index = arrMap.indexOf(curr)
			if (!result.includes(index)) {
				result.push(index)
			}
			return result
		}, [])
		return array.filter((x, index) => arrIndex.includes(index)).sort((a, b) => a > b)
	},

	tail: array => array.slice(1),

	take: (array, n = 1) => array.slice(0, n),

	takeRight: (array, n = 1) => array.length - n < 0 ? array : array.slice(array.length - n),

	takeRightWhile: function (array, predicate = _.identity) {
		predicate = _.iteratee(predicate)
		let len = array.length
		let i = len - 1
		while( i >= 0 && predicate(array[i])) {
			i--
		}
		return this.takeRight(array, len - 1 - i)
	},

	takeWhile: function (array, predicate = _.identity) {
		predicate = _.iteratee(predicate)
		let n = array.findIndex(x => !predicate(x))
		return this.take(array, n)
	},

	union: (...arrays) => [...new Set(benji_long.flatten(arrays))],

	unionBy: function (...array) {
		let predicate = _.iteratee(array.pop())
		let arr = benji_long.flatten(array)
		let set1 = [], set2 = []
		arr.forEach(x => {
			if (!set2.includes(predicate(x))) {
				set1.push(x)
				set2.push(predicate(x))
			}
		})
		return set1
	},

	unionWith: function (...array) {
		let comparator = array.pop()
		let arr = benji_long.flatten(array)
		let set = []
		return arr.filter(x => {
			if (set.some(y =>comparator(x, y))) {
				return false
			}
			set.push(x)
			return true
		})
	},

	uniq: array => [...new Set(array)],

	uniqBy: function (array, iteratee = _.identity) {
		let predicate = _.iteratee(iteratee)
		let set = []
		return array.filter(x => {
			if (set.includes(predicate(x))) {
				return false
			}
			set.push(predicate(x))
			return true
		})
	},

	uniqWith: function (array, comparator) {
		let set = []
		return array.filter(x => {
			if (set.some(y => comparator(x, y))) {
				return false
			}
			set.push(x)
			return true
		})
	},

	unzip: zipped => Array.from(zipped[0]).reduce(unzip => {
			unzip.push(zipped.reduce((regroup, group) => {
				regroup.push(group.shift())
				return regroup
			}, []))
			return unzip
		}, []),

	unzipWith: function (array, iteratee = _.identity) {
		let predicate = _.iteratee(iteratee)
		return Array.from(array[0]).reduce(unzip => {
			unzip.push(array.reduce((regroup, group) => {
				return predicate(regroup.shift(), group.shift())
			}))
			return unzip
		}, [])
	},

	without: (array, ...values) => array.filter(x => !benji_long.flatten(values).includes(x)),

	xor: function (...array) {
		 return array.reduce((result, arr) => {
			let i = array.indexOf(arr) 
			let rest = Array.from(array)
			rest.splice(i, i + 1)
			let restArr = benji_long.flatten(rest)
			result.push(...Array.from(arr).filter(x => !restArr.includes(x)))
			return result
		}, [])
	},

	xorBy: function (...array) {
		let predicate = _.iteratee(array.pop())
		return array.reduce((result, arr) => {
			let i = array.indexOf(arr)
			let rest = Array.from(array)
			rest.splice(i, i + 1)
			let restArr = benji_long.flatten(rest).map(x => predicate(x))
			arr.forEach(x => {
				if (!restArr.includes(predicate(x))) {
					result.push(x)
				}
			})
			return result
		}, [])
	},

	xorWith: function (...array) {
		let comparator = array.pop()
		return array.reduce((result, arr) => {
			let i = array.indexOf(arr)
			let rest = Array.from(array)
			rest.splice(i, i + 1)
			let restArr = benji_long.flatten(rest)
			arr.forEach(x => {
				if (!restArr.some(y => comparator(x, y))) {
					result.push(x)
				}
			})
			return result
		}, [])
	},

	zip: (...arrays) => Array.from(arrays[0]).reduce(zip => {
			zip.push(arrays.reduce((group, arr) => {
				group.push(arr.shift())
				return group
			}, []))
			return zip
		}, []),

	zipObject: function (props = [], values = []) {
		let obj = {}
		for (let i = 0; i < props.length; i++) {
			obj[props[i]] = values[i]
		}
		return obj
	},

	zipWith: function (...arrays) {
		let predicate = _.iteratee(arrays.pop())
		return Array.from(arrays[0]).reduce(zip => {
			let array = arrays.reduce((result, arr) => {
				result.push(arr.shift())
				return result
			}, [])
			zip.push(predicate(...array))
			return zip
		}, [])
	},

	countBy: function (collection, iteratee = _.identity) {
		let predicate = _.iteratee(iteratee)
		let result = {}
		for (let val of collection) {
			val = predicate(val)
			if (val in result) {
				result[val]++
			} else {
				result[val] = 1
			}
		}
		return result
	},

	every: function (collection, predicate = _.identity) {
		predicate = _.iteratee(predicate)
		for (let val of collection) {
			if (!predicate(val)) return false
		}
		return true
	},

	filter: function (collection, predicate = _.identity) {
		predicate = _.iteratee(predicate)
		let result = []
		for (let val of collection) {
			if (predicate(val)) {
				result.push(val)
			}
		}
		return result
	},

	find: function (collection, predicate = _.identity, fromIndex = 0) {
		predicate = _.iteratee(predicate)
		for (let i = fromIndex; i < collection.length; i++) {
			if (predicate(collection[i])) return collection[i]
		}
	},

	findLast: function (collection, predicate = _.identity, fromIndex = collection.length - 1) {
		predicate = _.iteratee(predicate)
		for (let i = fromIndex; i >= 0; i--) {
			if (predicate(collection[i])) return collection[i]
		}
	},

	flatMap: function (collection, iteratee = _.identity) {
		let result = []
		for (let [index, val] of Object.entries(collection)) {
			result.push(...iteratee(val, index, collection))
		}
		return result
	},

	flatMapDeep: function (collection, iteratee = _.identity) {
		let result = []
		for (let [index, val] of Object.entries(collection)) {
			result.push(...benji_long.flattenDeep(iteratee(val, index, collection)))
		}
		return result
	},

	flatMapDepth: function (collection, iteratee = _.identity, depth = 1) {
		let result = []
		for (let [index, val] of Object.entries(collection)) {
			result.push(benji_long.flattenDepth(iteratee(val, index, collection), depth))
		}
		return result
	},

	forEach: function (collection, iteratee = _.identity) {
		for (let [index, val] of Object.entries(collection)) {
			iteratee(val, index, collection)
		}
		return collection
	},

	forEachRight: function (collection, iteratee = _.identity) {
		for (let [index, val] of Object.entries(collection).reverse()) {
			iteratee(val, index, collection)
		}
		return collection
	},

	groupBy: (collection, iteratee = _.identity) => Object.values(collection).reduce((result, item) => {
			let prop = _.iteratee(iteratee)(item)
			prop in result ? result[prop].push(item) : result[prop] = [item]
			return result
		}, {}),

	includes: function (collection, value, fromIndex = 0) {
		if (typeof collection == 'string') {
			let len = value.length
			let length = collection.length
			let i = 0
			while (i < length && (length - i) >= len) {
				let substr = collection.substr(i, len)
				if (substr == value) return true
				i++
			}
		} else {
			let values = Object.values(collection)
			for (let i = fromIndex; i < values.length; i++) {
				if (values[i] === value) return true
			}
		}
		return false
	},

	invokeMap: function (collection, path, args) {
		let fn = (typeof path == 'string') ? collection[0][path] : path
		return Object.values(collection).map((val) => fn.call(val, args))
	},

	keyBy: (collection, iteratee = _.identity) => Object.values(collection).reduce((result, val) => {
			let key = _.iteratee(iteratee)(val)
			result[key] = val
			return result
		}, {}),

	map: function (collection, iteratee = _.identity) {
		let values = Object.values(collection)
		let predicate = _.iteratee(iteratee)
		let result = []
		for (let i = 0; i < values.length; i++) {
			result.push(predicate(values[i], i, values))
		}
		return result
	},

	orderBy: function (collection, iteratee = _.identity, orders) {
		let values = Object.values(collection)
		let predicates = iteratee.map(it => _.iteratee(it)).reverse()
		orders.reverse()

		predicates.forEach((predicate, index) => {
			values.sort((a, b) => compare(predicate(a), predicate(b), orders[index]))
		})

		function compare (a, b, order) {
			if (order == 'asc') {
				if (a < b) return -1
				else if (a > b) return 1
				else return 0
			} else if (order == 'desc') {
				if (a < b) return 1
				else if (a > b) return -1
				else return 0
			}
		}

		return values
	},

	partition: function (collection, iteratee = _.identity) {
		let predicate = _.iteratee(iteratee)
		let result = [[], []]
		Object.values(collection).forEach(val => predicate(val) ? result[0].push(val) : result[1].push(val))
		return result
	},

	reduce: function (collection, iteratee = _.identity, accumulator = 0) {
		let predicate = _.iteratee(iteratee)
		for (let [index, val] of Object.entries(collection)) {
			accumulator = predicate(accumulator, val, index)
		}
		return accumulator
	},

	reduceRight: function (collection, iteratee = _.identity, accumulator = 0) {
		let predicate = _.iteratee(iteratee)
		for (let [index, val] of Object.entries(collection).reverse()) {
			accumulator = predicate(accumulator, val, index)
		}
		return accumulator
	},

	reject: (collection, predicate = _.identity) => Object.values(collection).filter(val => !_.iteratee(predicate)(val)),

	sample: function (collection) {
		let values = Object.values(collection)
		return values[Math.floor(Math.random() * values.length)]
	},

	sampleSize: function (collection, n) {
		let values = Object.values(collection)
		if (n > values.length) n = values.length
		let result = new Array(n).fill(0)
		return result.map(() => values.splice(Math.floor(Math.random() * values.length), 1).pop())
	},

	shuffle: function (collection) {
		let values = Object.values(collection)
		let result = new Array(values.length).fill(0)
		return result.map(() => {
			let randomIndex = Math.floor(Math.random() * values.length)
			return values.splice(randomIndex, 1).pop()
		})
	},

	size: collection => (typeof collection == 'object') ? Object.keys(collection).length : collection.length,

	some: function (collection, predicate = _.identity) {
		predicate = _.iteratee(predicate)
		let values = Object.values(collection)
		for (let val of values) {
			if (predicate(val)) {
				return true
			}
		}
		return false
	},

	sortBy: function (collection, iteratees = _.identity) {
		let predicates = iteratees.map(it => _.iteratee(it)).reverse()
		let values = Object.values(collection)
		predicates.forEach(predicate => {
			values.sort((a, b) => {
				if (predicate(a) < predicate(b)) return -1
				else if (predicate(a) > predicate(b)) return 1
				else return 0
			})
		})
		return values
	},

	defer: (func, ...args) => setTimeout(func, 0, ...args),

	delay: (func, wait, ...args) => setTimeout(func, wait, ...args),

	castArray: (...value) => value.length ? (Array.isArray(value[0]) ? true : [value[0]]) : [],

	conformsTo: function (object, source) {
		let [prop, func] = Object.entries(source)[0]
		return func(object[prop])
	},

	eq: (value, other) => (Number.isNaN(value) && Number.isNaN(other)) ? true : (value === other),

	gt: (value, other) => value > other,

	gte: (value, other) => value >= other,

	isArguments: value => Object.prototype.toString.call(value) === '[object Arguments]',

	isArray: value => Object.prototype.toString.call(value) === '[object Array]',

	isArrayBuffer: value => Object.prototype.toString.call(value) === '[object ArrayBuffer]',

	isArrayLike: value => value.length ? (typeof value.length == 'number' && value.length >= 0 && value.length < 2**32) : false,

	isArrayLikeObject: value => (typeof value == 'object') ? (value.length ? (typeof value.length == 'number' && value.length >= 0 && value.length < Number.MAX_SAFE_INTEGER) : false) : false,

	isBoolean: value => typeof value === 'boolean',

	isDate: value => Object.prototype.toString.call(value) === '[object Date]',

	isElement: value => value instanceof Element,

	isEmpty: value => {
		if (value === null || value === undefined) return true
		if (typeof value === 'object') {
			let type = Object.prototype.toString.call(value).slice(8, -1)
			if (type === 'Set' || type === 'Map') {
				return !Boolean(value.size())
			}
			else {
				return !Boolean(Object.keys(value).length)
			}
		} else {
			return !Boolean(value.length)
		}
	},

	isEqual: (value, other) => benji_long.isEqualWith(value, other),

	isEqualWith: function isEqWith(value, other, customizer) {
		let type1 = Object.prototype.toString.call(value).slice(8, -1)
		let type2 = Object.prototype.toString.call(other).slice(8, -1)
		if (type1 !== type2) return false

		if (Number.isNaN(value) && Number.isNaN(other)) return true
		else if (value === other) return true

		if (type1 === 'String' || type1 === 'Number' || type1 === 'Bool' || type1 === 'Date')  {
			if (customizer && customizer(value.toString(), other.toString())) {
				return true
			} else {
				return value.toString() === other.toString()
			}
		}

		if (type1 === 'Map' || type1 === 'Set') {
			value = Array.from(value)
			other = Array.from(other)
			type = 'Array'
		}

		if (type1 === 'Array' || type1 === 'Object') {
			let keys1 = Object.keys(value)
			let keys2 = Object.keys(other)
			if (keys1.length !== keys2.length) return false
			return keys1.every(key => isEqWith(value[key], other[key], customizer))
		}

	    if (type1 === 'error') {
	      return first.stack === second.stack
	    }

	    if (type1 === 'regexp') {
	      return first.valueOf() === second.valueOf()
	    }

	    // for everything else...
	    return false
	},

	isError: value => value instanceof Error,

	isFinite: value => typeof value === 'number' && value < Infinity && value > -Infinity,

	isFunction: value => value instanceof Function,

	isInteger: value => typeof value === 'number' && /^-?\d+$/.test(value),

	isLength: value => typeof value == 'number' && Number.isInteger(value) && value >= 0 && value < Number.MAX_SAFE_INTEGER,

	isMap: value => Object.prototype.toString.call(value) === '[object Map]',

	isMatch: (object, source) => benji_long.isEqual(object[Object.keys(source)[0]], Object.values(source)[0]),

	isMatchWith: (object, source, customiser) => {
		let [prop, val] = Object.entries(source)[0]
		return Boolean(customiser(object[prop], val))
	},

	isNaN: value => value !== undefined && !(value.valueOf() === value.valueOf()),

	isNative: value => value.toString().includes('[native code]'),

	isNil: value => value === null || value === undefined,

	isNull: value => value === null,

	isNumber: value => value === value && typeof value === 'number',

	isObject: value => value !== null && value !== undefined && Object.prototype.toString.call(value).includes('object'),

	isObjectLike: value => value !== null && typeof value === 'object',

	isPlainObject: value => !value.__proto__ || value.__proto__ === Object.prototype,

	isRegExp: value => Object.prototype.toString.call(value) === '[object RegExp]',

	isSafeInteger: value => typeof value === 'number' && value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER && Number.isInteger(value),

	isSet: value => Object.prototype.toString.call(value) === '[object Set]',

	isString: value => typeof value === 'string',

	isSymbol: value => typeof value === 'symbol',

	isTypedArray: value => /\[object\s.+Array\]/.test(Object.prototype.toString.call(value)),

	isUndefined: value => typeof value === 'undefined',

	isWeakMap: value => Object.prototype.toString.call(value) === '[object WeakMap]',

	isWeakSet: value => Object.prototype.toString.call(value) === '[object WeakSet]',
	
	lt: (value, other) => value < other,

	lte: (value, other) => value <= other,

	toArray: value => (value === null || value === undefined) ? [] : Array.from(Object.values(value)),

	toFinite: value => (Number(value) > Number.MAX_VALUE) ? Number.MAX_VALUE : 
		(Number(value) < Number.MIN_VALUE) ? Number.MIN_VALUE : Number(value),

	toInteger: value => Math.floor(benji_long.toFinite(value)),

	toLength: value => {
		value = benji_long.toInteger(value)
		if (value > 2**32) return 2**32 - 1
		if (value < 0) return 0
		return value
	},

	toNumber: value => Number(value),

	assign: (object, ...sources) => {
		sources.forEach(source => {
			Object.entries(source).forEach(([prop, val]) => {
				object[prop] = val
			})
		})
		return object
	},

	toSafeInteger: value => {
		value = benji_long.toInteger(value)
		if (value > Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER
		if (value < Number.MIN_SAFR_INTEGER) return Number.MIN_SAFR_INTEGER
		return value
	},

	add: (augend, added) => augend + added,

	ceil: (number, precision = 0) => Math.ceil(number * Math.pow(10, precision)) / Math.pow(10, precision),

	divide: (dividend, divisor) => dividend / divisor,

	floor: (number, precision = 0) => Math.floor(number * Math.pow(10, precision)) / Math.pow(10, precision),

	max: array => {
		try  { 
			return array.reduce((a, b) => a < b ? b : a) 
		} catch (e) { 
			return undefined 
		}
	},

	maxBy: (array, iteratee = _.identity) => {
		let predicate = _.iteratee(iteratee)
		try {
			return array.reduce((a, b) => predicate(a) < predicate(b) ? b : a)
		} catch (e) {
			return undefined
		}
	},

	mean: array => array.reduce((sum, a, index, array) => index === array.length - 1 ? (sum + a) / (index + 1) : sum + a),

	meanBy: (array, iteratee = _.identity) => array.reduce((sum, a, index, array) => index === array.length - 1 ? (sum + _.iteratee(iteratee)(a)) / (index + 1) : sum + _.iteratee(iteratee)(a), 0),

	min: array => {
		try {
			return array.reduce((a, b) => a > b ? b : a)
		} catch (e) {
			return undefined
		}
	},

	minBy: (array, iteratee = _.identity) => {
		let predicate = _.iteratee(iteratee)
		try {
			return array.reduce((a, b) => predicate(a) > predicate(b) ? b : a)
		} catch (e) {
			return undefined
		}
	},

	multiply: (multiplier, multiplicand) => multiplier * multiplicand,

	round: (number, precision = 0) => Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision),

	subtract: (minuend, subtrahend) => minuend - subtrahend,

	sum: array => array.reduce((a, b) => a + b),

	sumBy: (array, iteratee = _.identity) => array.reduce((sum, a) => sum + _.iteratee(iteratee)(a), 0),

	clamp: (number, lower, upper) => number > upper ? upper : (number < lower ? lower : number),

	inRange: (number, start = 0, end) => {
		if (!end) {
			end = start
			start = 0
		}
		number = Math.abs(number)
		start = Math.abs(start)
		end = Math.abs(end)
		return number >= start && number < end ? true : false
	},

	random: (lower = 0, upper = 1, floating) => {
		if (upper === 1 && lower !== 0) {
			upper = lower
			lower = 0
		}
		if (!floating) {
			return Math.random() * (upper - lower) + lower
		} else {
			lower = Math.ceil(lower)
			upper = Math.floor(upper)
			return Math.floor(Math.random() * (upper - lower) + lower)
		}
	},

	assignIn: (object, ...sources) => {
		sources.forEach(source => {
			for (let prop in source) {
				object[prop] = source[prop]
			}
		})
		return object
	},

	toPath: value => {
		if (benji_long.isNil(value)) return []
		else if (typeof value === 'string') return value.match(/([\w$]+)/g)
		else if (Array.isArray(value)) return value
		else return [value.toString()]
	},

	get: (object, path, defaultValue) => {
		let pathArr = benji_long.toPath(path)
		try {
			var value = pathArr.reduce((obj, currPath) => obj[currPath], object)
		} catch (e) {
			return defaultValue
		}
		return value ? value : defaultValue
	},

	property: path => obj => benji_long.get(obj, path, null),

	at: (object, paths) => paths.map(path => benji_long.get(object, path, null)),

	defaults: (object, ...sources) => {
		sources.forEach(source => {
			for (let prop in source) {
				if (!object[prop]) {
					object[prop] = source[prop]
				}
			}
		})
		return object
	},

	defaultsDeep: defaultsDeep = (object, sources) => {
		let keys = Object.keys(sources)
		for (let key of keys) {
			if (typeof sources[key] === 'object' && typeof object[key] === 'object') {
				defaultsDeep(object[key], sources[key])
			} else {
				if (!object[key]) {
					object[key] = sources[key]
				}
			}
		}
		return object
	},

	findKey: (object, predicate = _.identity) => {
		predicate = _.iteratee(predicate)
		for (let key in object) {
			if (predicate(object[key])) {
				return key
			}
		}
	},

	findLastKey: (object, predicate = _.identity) => {
		predicate = _.iteratee(predicate)
		let keys = Object.keys(object).reverse()
		for (let key of keys) {
			if (predicate(object[key])) {
				return key
			}
		}
	},

	forIn: (object, iteratee = _.identity) => {
		for (let key in object) {
			iteratee(object[key], key, object)
		}
		return object
	},

	forInRight: (object, iteratee = _.identity) => {
		let arr = []
		for (let key in object) {
			arr.push(key)
		}
		arr.reverse().forEach(key => iteratee(object[key], key, object))
		return object
	},

	forOwn: (object, iteratee = _.identity) => {
		Object.entries(object).forEach(([key, val]) => iteratee(val, key, object))
		return object
	},

	forOwnRight: (object, iteratee = _.identity) => {
		Object.entries(object).reverse().forEach(([key, val]) => iteratee(val, key, object))
		return object
	},

	functions: object => Object.keys(object).filter(key => benji_long.isFunction(object[key])),

	functionsIn: object => {
		let result = []
		for (let key in object) {
			if (benji_long.isFunction(object[key]))
				result.push(key)
		}
		return result
	},

	has: (object, path) => {
		let pathArr = benji_long.toPath(path)
		let val = object
		for (let prop of pathArr) {
			if (!val.hasOwnProperty(prop)) return false
			try {
				val = val[prop]
			} catch (e) {
				return false
			}
		}
		return val ? true : false
	},

	hasIn: (object, path) => benji_long.get(object, path, null) === null ? false : true,

	invert: object => {
		let entries = Object.entries(object)
		return entries.reduce((obj, entry) => {
			obj[entry[1]] = entry[0]
			return obj
		}, {})
	},

	invertBy: (object, iteratee = _.identity) => {
		let entries = Object.entries(object)
		return entries.reduce((obj, entry) => {
			let key = iteratee(entry[1])
			if (!Array.isArray(obj[key])) {
				obj[key] = []
			}
			obj[key].push(entry[0])
			return obj
		}, {})
	},

	invoke: (object, path, ...args) => {
		let toPath = benji_long.toPath(path)
		let func = toPath.pop()
		let value = benji_long.get(object, toPath, null)
		return value[func](...args)
	},

	keys: object => Object.keys(object),

	keysIn: object => {
		let arr = []
		for (let index in object) {
			arr.push(index)
		}
		return arr
	},

	mapKeys: (object, iteratee = _.identity) => {
		let result = {}
		for (let [key, val] of Object.entries(object)) {
			result[iteratee(val, key)] = val
		}
		return result
	},

	mapValues: (object, iteratee = _.identity) => {
		let predicate = _.iteratee(iteratee)
		let result = {}
		for (let [key, val] of Object.entries(object)) {
			result[key] = predicate(val, key, object)
		}
		return result
	},

	merge: (object, ...sources) => {
		return mergeWith (object, ...sources)
	},

	mergeWith: mergeWith = (object, ...sources) => {
		let customizer = sources.pop()
		if (!benji_long.isFunction(customizer)) {
			sources.push(customizer)
			customizer = undefined
		}
		sources.forEach(source => {
			Object.keys(source).forEach(key => {
				let val1 = object[key]
				let val2 = source[key]
				if (customizer && customizer(val1, val2, key, object, source)) {
					object[key] = customizer(val1, val2, key, object, source)
					return
				}
				if (typeof val1 === 'object' && typeof val2 === 'object') {
					return customizer ? mergeWith(val1, val2, customizer) : mergeWith(val1, val2)
				}
				object[key] = source[key]
			})
		})
		return object
	},

	omit: (object, paths) => {
		let result = {}
		for (let path in object) {
			if (!((typeof paths === 'string' && path === paths) || Array.isArray(paths) && paths.includes(path))) {
				result[path] = object[path]
			}
		}
		return result
	},

	omitBy: (object, predicate = _.identity) => {
		let result = {}
		for (let key in object) {
			if (!predicate(object[key])) {
				result[key] = object[key]
			}
		}
		return result
	},

	pick: (object, paths) => {
		let result = {}
		for (let path in object) {
			if ((typeof paths === 'string' && path === paths) || Array.isArray(paths) && paths.includes(path)) {
				result[path] = object[path]
			}
		}
		return result
	},

	pickBy: (object, predicate = _.identity) => {
		let result = {}
		for (let key in object) {
			if (predicate(object[key])) {
				result[key] = object[key]
			}
		}
		return result		
	},

	result: (object, path, defaultValue) => {
		let result = benji_long.get(object, path, defaultValue)
		return benji_long.isFunction(result) ? result.call(this) : result
	},

	set: (object, path, value) => benji_long.setWith(object, path, value, undefined),

	setWith: (object, path, value, customizer) => {
		customizer = typeof customizer === 'function' ? customizer : undefined
		return baseSet(object, path, value, customizer)
		function baseSet (object, path, value, customizer) {
			if (!benji_long.isObject(object)) return object

			let paths = benji_long.toPath(path)
			const length = paths.length
			const lastIndex = length - 1

			let index = -1
			let pos = object
			while (object !== null && ++index < length) {
				const key = paths[index]
				let newValue = value

				if (index !== lastIndex) {
					const objValue = object[key]
					if (customizer) {
						newValue = customizer(objValue, key , object)
					} else {
						newValue = benji_long.isObject(objValue)
							? objValue
							: (isNaN(paths[index + 1]) ? {} : [])
					}
				}
				object[key] = newValue
				object = object[key]
			}
			return pos
		}
	},

	toPairs: (object) => Object.entries(object),

	toPairsIn: (object) => {
		let result = []
		for (let key in object) {
			result.push([key, object[key]])
		}
		return result
	},

	transform: (object, iteratee = _.identity, accumulator) => {
		if (!accumulator) accumulator = Object.creat(object.__proto__)
		for (let [key, value] of Object.entries(object)) {
			if (iteratee(accumulator, value, key, object) === false)
				break
		}
		return accumulator
	},

	unset: (object, path) => {
		let paths = benji_long.toPath(path)
		let pathLast = paths.pop()
		return delete paths.reduce((obj, path) => obj[path], object)
	},

	update: (object, path, updater) => {
		let value = benji_long.get(object, path, null)
		value = value ? updater(value) : updater()
		return benji_long.set(object, path, value)
	},

	updateWith: (object, path, updater, customizer) => {
		let value = benji_long.get(object, path, null)
		value = value ? updater(value) : updater()
		return benji_long.setWith(object, path, value, customizer)
	},

	values: object => Object.values(object),

	valuesIn: object => {
		let result = []
		for (let key in object) {
			result.push(object[key])
		}
		return result
	},

	camelCase: (string = '') => {
		var camelStr = ''
		string.replace(/[a-z]+/ig, (match) => camelStr += benji_long.capitalize(match))
		return benji_long.lowerFirst(camelStr)
	},

	capitalize: (string = '') => string.replace(/\w/g, (match, offset) =>
			offset === 0 ? match.toUpperCase() : match.toLowerCase()),

	endsWith: (string = '', target, position = string.length) => string.endsWith(target, position),

	escape: (string = '') => string.replace(/[&<>"']/g, match => {
		switch (match) {
			case '&': return '&amp;'
			case '<': return '&lt;'
			case '>': return '&gt;'
			case '"': return '&quot;'
			case "'": return '&apos;'
		}
	}),

	escapeRegExp: (string = '') => string.replace(/[\^$\.*+?\(\)\[\]\{\}|]/g, match => '\\' + match),

	baseSplit: (string) => {
		let result = []
		string.replace(/[a-z]+/gi, match => {
			match = match.split(/(?<=[^A-Z])(?=[A-Z]+)/g)
			match.forEach(item => result.push(item))
		})
		return result
	},

	kebabCase: (string = '') => benji_long.baseSplit(string).map(item => item.toLowerCase()).join('-'),

	lowerCase: (string = '') => benji_long.kebabCase(string).replace('-', ' '),

	lowerFirst: (string = '') => string.replace(/\b[a-z]/i, match => match.toLowerCase()),

	pad: (string = '', length = 0, chars = ' ') => string.padStart(Math.floor((length - string.length) / 2) + string.length, chars).padEnd(length, chars),

	padEnd: (string = '', length = 0, chars = ' ') => string.padEnd(length, chars),

	padStart: (string = '', length = 0, chars = ' ') => string.padStart(length, chars),

	parseInt: (string, radix = 10) => {
		let num = Number(string)
		let result = 0
		convert (num, radix, -1)
		return result
		function convert (num, radix, n) {
			n++
			let digit = num % 10
			num = (num - digit) / 10
			if (num > 0) convert(num, radix, n)
			result += digit * Math.pow(radix, n)
		}
	},

	repeat: (string = '', n = 1) => string.repeat(n),

	replace: (string = '', pattern, replacement) => string.replace(pattern, replacement),

	snakeCase: (string = '') => benji_long.kebabCase(string).replace('-', '_'),

	split: (string = '', separator, limit) => {
		let result = []
		let str = ''
		let i = 0
		while (i < string.length && result.length <= limit) {
			if (string[i] !== separator) {
				str += string[i]
			} else {
				result.push(str)
				str = ''
			}
			i++
		}
		return result
	},

	startCase: (string = '') => benji_long.baseSplit(string).map(item => item.replace(/\b[a-z]/i, m => m.toUpperCase())).join(' '),

	startsWith: (string = '', target, position = 0) => string.startsWith(target, position),

	toLower: (string = '') => string.toLowerCase(),

	toUpper: (string = '') => string.toUpperCase(),

	trim: (string = '', chars = ' ') => benji_long.trimStart(benji_long.trimEnd(string, chars), chars),

	trimEnd: (string = '', chars = ' ') => {
		let tmp = chars === ' ' ? '[\\s]*$' : '[' + chars + ']*$'
		let reg = new RegExp(tmp, 'g')
		return string.replace(reg, '')
	},

	trimStart: (string = '', chars = ' ') => {
		let tmp = chars === ' ' ? '^[\\s]*' : '^[' + chars + ']*'
		let reg = new RegExp(tmp, 'g')
		return string.replace(reg, '')
	},

	truncate: (string = '', options = {}) => {
		let length = options.length || 30
		let omission = options.omission || '...'
		let separator = options.separator || undefined
		if (Object.prototype.toString.call(separator) === '[object RegExp]') separator = separator.source
		if (string.length <= length) return string
		if (!separator) return string.slice(0, length - omission.length) + omission
	    const reg = new RegExp(separator, 'g')
		let lastIndex,result
		string = string.slice(0, length - omission.length)
		while((result = reg.exec(string)) !== null) {
			lastIndex = result.index
		}
		return string.slice(0, lastIndex) + omission
	},

	unescape: (string = '') => string.replace(/&amp;|&lt;|&gt;|&quot;|&apos;/g, match => {
		switch (match) {
			case '&amp;': return '&'
			case '&lt;': return '<'
			case '&gt;': return '>'
			case '&quot;': return '"'
			case "&apos;": return "'"
		}
	}),

	upperCase: (string = '') => benji_long.baseSplit(string).map(item => item.toUpperCase()).join(' '),

	upperFirst: (string = '') => string.replace(/\b[a-z]/i, match => match.toUpperCase()),

	words: (string = '', pattern) => pattern ? string.match(pattern) : string.match(/\w+/g),
	
	bindAll: (object, ...methodNames) => {
		methodNames.forEach(method => object[method].bind(object))
		return object
	},
	defaultTo: (value, defaultValue) => value ? value : defaultValue,

	range: (start = 0, end, step = 1) => {
		if (end === undefined) {
			end = start
			start = 0
			if (end < 0) step = -1
		}
		if ((end - start) / step < 0) return []
		let n = step === 0 ? end - start : (end - start) / step
		return benji_long.times(n, i => i * step + start)
	},

	rangeRight: (start = 0, end, step = 1) => benji_long.range(start, end, step).reverse(),

	times: (n, iteratee = _.identity) => {
		let result = []
		for (let i = 0; i < n; i++) {
			result.push(iteratee(i))
		}
		return result
	},

	mixin: (object = _, source, options = {}) => {
		if (source === undefined) {
			source = object
			object = _
		}
		object = benji_long.isFunction(object) ? object.prototype : object
		Object.keys(source).forEach(method => {
			object[method] = source[method]
		})
		if (options.chain) return object
	},

	uniqueId: uniqueId = (prefix = '') => {
		uniqueId.id ? uniqueId.id++ : uniqueId.id = 1
		return prefix + uniqueId.id
	},

	cloneDeep: cloneDeep = value => {
		let result
		if ((!Array.isArray(value) && typeof value !== 'object') || !Object.values(value).length) 
			return value
		result = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value))
		Object.entries(value).forEach(([key, val]) => result[key] = cloneDeep(val))
		return result
	},

	identity: value => value,

	concat: (array, ...values) => {
		array.push(...benji_long.flatten(values))
		return array
	},

	pullAt: (array, ...indexs) => benji_long.flatten(indexs).reduce((result, index, i) => {
			result.push(...array.splice((index - i), 1))
			return result
		}, []),

	matches: source => (item, i, arr) => benji_long.isMatch(item, source),

	ary: (func, n = func.length) => (...arr) => func(...arr.slice(0, n)),

	unary: func => arr => func(arr),

	negate: predicate => (...arr) => !predicate(...arr),

	once: func => {
		let result
		return (...arr) => {
			if (!result) {
				result = func(...arr)
			}
			return result
		}
	},

	spread: (func, start = 0) => arr => func(...arr.slice(0, start + 1), ...arr.slice(start + 1)),

	flip: func => (...arr) => func(...arr.reverse()),

	conforms: source => (obj, i, arr) => Object.entries(source).every(([key, func]) => func(obj[key])),

	constant: value => () => value,

	flow: func => (...arr) => benji_long.flatten(func).reduce((result, f) => Array.isArray(result) ? f(...result) : f(result), arr),

	method: (path, ...args) => (obj, i, arr) => benji_long.get(obj, path)(...args),

	methodOf: (object, ...args) => (path, i, arr) => benji_long.get(object, path)(...args),

	nthArg: (n = 0) => (...args) => n < 0 ? args[args.length + n] : args[n],

	propertyOf: object => path => benji_long.get(object, path, null),

	parseJson: json => {
		var str = json
		var i = 0

		return parseCore()

		function parseCore() {
			while(str[i] === ' ' 
				|| str[i] === ',' 
				||  str[i] === ':') {
				i++
			}

			if(str[i] === '{') {
				return parseObject()
			}
			if(str[i] === '[') {
				return parseArray()
			}
			if(str[i] === '"') {
				return parseString()
			}
			if(str[i] === 't' || str[i] === 'f' || str[i] === 'n') {
				return parseBase()
			}
			if(/^[+-]?\d+(\.\d+)?([eE]\d+)?$/.test(str[i])) {
				return parseNumber()
			}
		}

		function parseObject() {
			var result = {}
			i++
			
			while(str[i] !== '}') {
				var key = parseCore(str[i])
				result[key] = parseCore(str[i]) 
			}

			i++

			return result
		}

		function parseNumber() {
			var result = ''

			while(/^[+-]?\d+(\.\d+)?([eE]\d+)?$/.test(str[i])) {
				result += str[i]
				i++
			}

			return Number(result)
		}

		function parseArray() {
			i++
			
			var result = []
			while(str[i] !== ']') {
				result.push(parseCore())
			}
			
			i++

			return result
		}

		function parseString() {
			i++

			var result = ''
			while(str[i] !== '"') {
				result += str[i]
				i++
			}

			i++

			return result
		}

		function parseBase() {
			if(str[i] === 't' || str[i] === 'n') {
				var value = str.substr(i, 4)
				i += 4
				if(value === 'true')
					return true
				if(value === 'null')
					return null
				else
					throw new Error('Unexpected char at pos: ' + i)
			}
			if(str[i] === 'f') {
				var value = str.substr(i, 5) 
				i += 5
				if(value === 'false')
					return false
				else
					throw new Error('Unexpected char at pos: ' + i)
			}
		}
	}
}