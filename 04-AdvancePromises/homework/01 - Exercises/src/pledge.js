'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

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

$Promise.prototype.catch = function (errorCb) {
	return this.then(null, errorCb);
};

$Promise.prototype._callHandlers = function () {
	while (this._handlerGroups.length) {
		let group = this._handlerGroups.shift();

		if (this._state === 'fulfilled') {
			if (group.successCb) {
				try {
					let result = group.successCb(this._value);

					if (result instanceof $Promise) {
						//Es una promesa
						//Devuelve una promeso con los mismos valores que la anterior
						return result.then(
							(value) => group.downstreamPromise._internalResolve(value),
							(reason) => group.downstreamPromise._internalReject(reason),
						);
					} else {
						//Es un resultado
						//Devuelve la promesa resuelta al resultado
						group.downstreamPromise._internalResolve(result);
					}
				} catch (error) {
					//Es un error
					//Devuelve la promesa resuelta al error
					group.downstreamPromise._internalReject(error);
				}
			} else {
				group.downstreamPromise._internalResolve(this._value);
			}
		} else if (this._state === 'rejected') {
			if (group.errorCb) {
				try {
					let result = group.errorCb(this._value);

					if (result instanceof $Promise) {
						//Es una promesa
						//Devuelve una promeso con los mismos valores que la anterior
						return result.then(
							(value) => group.downstreamPromise._internalResolve(value),
							(reason) => group.downstreamPromise._internalReject(reason),
						);
					} else {
						//Es un resultado
						//Devuelve la promesa resuelta al resultado
						group.downstreamPromise._internalResolve(result);
					}
				} catch (error) {
					//Es un error
					//Devuelve la promesa resuelta al error
					group.downstreamPromise._internalReject(error);
				}
			} else {
				group.downstreamPromise._internalReject(this._value);
			}
		}
	}
};

// VERSION CLASS
class $Promise {
	constructor(executor) {
		if (typeof executor !== 'function')
			throw TypeError('The executor must be a function');

		this._state = 'pending';
		this._value = undefined;
		this._handlerGroups = [];

		executor(this._internalResolve.bind(this), this._internalReject.bind(this));
	}
	_internalResolve(value) {
		if (this._state === 'pending') {
			this._state = 'fulfilled';
			this._value = value;
			this._callHandlers();
		}
	}
	_internalReject(reason) {
		if (this._state === 'pending') {
			this._state = 'rejected';
			this._value = reason;
			this._callHandlers();
		}
	}
	then(successCb, errorCb) {
		let downstreamPromise = new $Promise(() => {});

		this._handlerGroups.push({
			successCb: typeof successCb === 'function' ? successCb : null,
			errorCb: typeof errorCb === 'function' ? errorCb : null,
			downstreamPromise,
		});

		this._state !== 'pending' && this._callHandlers();

		// Retorna una nueva promesa
		return downstreamPromise;
	}
	catch(errorCb) {
		return this.then(null, errorCb);
	}
	_callHandlers() {
		while (this._handlerGroups.length) {
			let group = this._handlerGroups.shift();

			if (this._state === 'fulfilled') {
				if (group.successCb) {
					try {
						let result = group.successCb(this._value);

						if (result instanceof $Promise) {
							//Es una promesa
							//Devuelve una promeso con los mismos valores que la anterior
							return result.then(
								(value) => group.downstreamPromise._internalResolve(value),
								(reason) => group.downstreamPromise._internalReject(reason),
							);
						} else {
							//Es un resultado
							//Devuelve la promesa resuelta al resultado
							group.downstreamPromise._internalResolve(result);
						}
					} catch (error) {
						//Es un error
						//Devuelve la promesa resuelta al error
						group.downstreamPromise._internalReject(error);
					}
				} else {
					group.downstreamPromise._internalResolve(this._value);
				}
			} else if (this._state === 'rejected') {
				if (group.errorCb) {
					try {
						let result = group.errorCb(this._value);

						if (result instanceof $Promise) {
							//Es una promesa
							//Devuelve una promeso con los mismos valores que la anterior
							return result.then(
								(value) => group.downstreamPromise._internalResolve(value),
								(reason) => group.downstreamPromise._internalReject(reason),
							);
						} else {
							//Es un resultado
							//Devuelve la promesa resuelta al resultado
							group.downstreamPromise._internalResolve(result);
						}
					} catch (error) {
						//Es un error
						//Devuelve la promesa resuelta al error
						group.downstreamPromise._internalReject(error);
					}
				} else {
					group.downstreamPromise._internalReject(this._value);
				}
			}
		}
	}
}

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
