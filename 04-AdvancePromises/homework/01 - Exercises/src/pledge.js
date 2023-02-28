'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

// VERSION CLASS
// class $Promise {
// 	constructor(executor) {
// 		if (typeof executor !== 'function')
// 			throw TypeError('Executor must be a function');

// 		this._state = 'pending';
// 		this._value = undefined;
// 		this._handlerGroups = [];

// 		let resolve = (value) => {
// 			this._internalResolve(value);
// 		};

// 		let reject = (reason) => {
// 			this._internalReject(reason);
// 		};

// 		executor(resolve, reject);
// 	}

// 	_internalResolve(value) {
// 		if (this._state !== 'pending') return;
// 		this._state = 'fulfilled';
// 		this._value = value;
// 		this._callHandlers(this._value);
// 	}

// 	_internalReject(reason) {
// 		if (this._state !== 'pending') return;
// 		this._state = 'rejected';
// 		this._value = reason;
// 		this._callHandlers(this._value);
// 	}

// 	then(successCb, errorCb) {
// 		const handlerGroup = {
// 			successCb: typeof successCb === 'function' ? successCb : null,
// 			errorCb: typeof errorCb === 'function' ? errorCb : null,
// 		};

// 		this._handlerGroups.push(handlerGroup);
// 		this._state !== 'pending' && this._callHandlers(this._value);
// 	}

// 	_callHandlers(value) {
// 		while (this._handlerGroups.length) {
// 			let group = this._handlerGroups.shift();

// 			this._state === 'fulfilled' &&
// 				group.successCb &&
// 				group.successCb(value);

// 			this._state === 'rejected' &&
// 				group.errorCb &&
// 				group.errorCb(value);
// 		}
// 	}

// 	catch(errorHandler) {
// 		this.then(null, errorHandler);
// 	}
// }

// VERSION FUNCTION

function $Promise(executor) {
	if (typeof executor !== 'function')
		throw TypeError('The executor must be a function');

	this._state = 'pending';
	this._value = undefined;
	this._handlerGroups = [];

	executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function (value) {
	if (this._state === 'pending') {
		this._state = 'fulfilled';
		this._value = value;
		this._callHandlers();
	}
};

$Promise.prototype._internalReject = function (reason) {
	if (this._state === 'pending') {
		this._state = 'rejected';
		this._value = reason;
		this._callHandlers();
	}
};

$Promise.prototype.then = function (successCb, errorCb) {
	let downstreamPromise = new $Promise(() => {});
	this._handlerGroups.push({
		successCb: typeof successCb === 'function' ? successCb : null,
		errorCb: typeof errorCb === 'function' ? errorCb : null,
		downstreamPromise,
	});

	this._state !== 'pending' && this._callHandlers();

	// Retorna una nueva promesa
	return downstreamPromise;
};

$Promise.prototype._callHandlers = function () {
	while (this._handlerGroups.length) {
		let group = this._handlerGroups.shift();

		if (this._state === 'fulfilled' && group.successCb) {
			group.successCb(this._value);
		}

		if (this._state === 'rejected' && group.errorCb) {
			group.errorCb(this._value);
		}
	}
};

$Promise.prototype.catch = function (errorCb) {
	return this.then(null, errorCb);
};

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
