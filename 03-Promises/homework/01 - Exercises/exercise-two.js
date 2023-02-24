'use strict';

const { exec } = require('child_process');
let exerciseUtils = require('./utils');

let args = process.argv.slice(2).map(function (st) {
	return st.toUpperCase();
});

module.exports = {
	problemAx: problemA,
	problemBx: problemB,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
	let problem = module.exports['problem' + arg];
	if (problem) problem();
});

function problemA() {
	// callback version
	exerciseUtils.readFile('poem-two/stanza-01.txt', function (err, stanza) {
		exerciseUtils.blue(stanza);
	});
	exerciseUtils.readFile('poem-two/stanza-02.txt', function (err, stanza) {
		exerciseUtils.blue(stanza);
	});

	// promise version
	// Tu código acá:

	//VERSION NORMAL

	exerciseUtils
		.promisifiedReadFile('poem-two/stanza-01.txt')
		.then((stanza) => exerciseUtils.blue(stanza))
		.catch((err) => exerciseUtils.magenta(new Error(err)));

	exerciseUtils
		.promisifiedReadFile('poem-two/stanza-02.txt')
		.then((stanza2) => exerciseUtils.blue(stanza2))
		.catch((err) => exerciseUtils.magenta(new Error(err)));

	//VERSION PROMISE.ALL()

	Promise.all([
		exerciseUtils
			.promisifiedReadFile('./poem-two/stanza-01.txt')
			.then((stanza) => exerciseUtils.blue(stanza))
			.catch((err) => exerciseUtils.magenta(new Error(err))),
		exerciseUtils
			.promisifiedReadFile('./poem-two/stanza-02.txt')
			.then((stanza2) => exerciseUtils.blue(stanza2))
			.catch((err) => exerciseUtils.magenta(new Error(err))),
	]);
}

function problemB() {
	let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
		return 'poem-two/' + 'stanza-0' + n + '.txt';
	});
	let randIdx = Math.floor(Math.random() * filenames.length);
	filenames[randIdx] = 'wrong-file-name-' + (randIdx + 1) + '.txt';

	// callback version
	filenames.forEach((filename) => {
		exerciseUtils.readFile(filename, function (err, stanza) {
			exerciseUtils.blue(stanza);
			if (err) exerciseUtils.magenta(new Error(err));
		});
	});

	// promise version
	// Tu código acá:

	//VERSION BRUTA

	Promise.all([
		exerciseUtils
			.promisifiedReadFile('./poem-two/stanza-01.txt')
			.then((stanza) => exerciseUtils.blue(stanza))
			.catch((err) => exerciseUtils.magenta(new Error(err))),
		exerciseUtils
			.promisifiedReadFile('./poem-two/stanza-02.txt')
			.then((stanza2) => exerciseUtils.blue(stanza2))
			.catch((err) => exerciseUtils.magenta(new Error(err))),
		exerciseUtils
			.promisifiedReadFile('./poem-two/stanza-03.txt')
			.then((stanza3) => exerciseUtils.blue(stanza3))
			.catch((err) => exerciseUtils.magenta(new Error(err))),
		exerciseUtils
			.promisifiedReadFile('./poem-two/stanza-04.txt')
			.then((stanza4) => exerciseUtils.blue(stanza4))
			.catch((err) => exerciseUtils.magenta(new Error(err))),
		exerciseUtils
			.promisifiedReadFile('./poem-two/stanza-05.txt')
			.then((stanza5) => exerciseUtils.blue(stanza5))
			.catch((err) => exerciseUtils.magenta(new Error(err))),
		exerciseUtils
			.promisifiedReadFile('./poem-two/stanza-06.txt')
			.then((stanza6) => exerciseUtils.blue(stanza6))
			.catch((err) => exerciseUtils.magenta(new Error(err))),
		exerciseUtils
			.promisifiedReadFile('./poem-two/stanza-07.txt')
			.then((stanza7) => exerciseUtils.blue(stanza7))
			.catch((err) => exerciseUtils.magenta(new Error(err))),
		exerciseUtils
			.promisifiedReadFile('./poem-two/stanza-08.txt')
			.then((stanza8) => exerciseUtils.blue(stanza8))
			.catch((err) => exerciseUtils.magenta(new Error(err))),
	]);

	//VERSION DELCIADA
	filenames.forEach((file) =>
		exerciseUtils
			.promisifiedReadFile(file)
			.then((stanza) => exerciseUtils.blue(stanza))
			.catch((err) => exerciseUtils.magenta(new Error(err))),
	);

	//VERSION PROMISE ALL()
	let promises = filenames.map((file) =>
		exerciseUtils.promisifiedReadFile(file),
	);
	Promise.all(promises)
		.then((stanza) => exerciseUtils.blue(stanza))
		.catch((err) => exerciseUtils.magenta(new Error(err)));
}

function problemD() {
	let fs = require('fs');
	function promisifiedWriteFile(filename, str) {
		// tu código acá:

		return new Promise((resolve, reject) => {
			fs.writeFile(filename, str, (err) => {
				err ? reject : resolve;
			});
		});
	}
}
