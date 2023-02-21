const fs = require('fs');
const utils = require('../utils/request');
const process = require('process');

let pwd = (print) => {
	print(process.cwd());
};

let date = (print) => {
	print(Date());
};

let echo = (print, args) => {
	print(args);
};

let ls = (print) => {
	fs.readdir('.', (error, files) => {
		if (error) throw Error(error);
		print(files.join(' '));
	});
};

let cat = (print, args) => {
	fs.readFile(args, 'utf-8', (error, data) => {
		if (error) throw Error(error);
		print(data);
	});
};

let head = (print, args) => {
	fs.readFile(args, 'utf-8', (error, data) => {
		if (error) throw Error(error);
		print(data.split('\n').at(0));
	});
};

let tail = (print, args) => {
	fs.readFile(args, 'utf-8', (error, data) => {
		if (error) throw Error(error);
		print(data.split('\n').at(-1).trim());
	});
};

let curl = (print, args) => {
	utils.request(args, (error, response) => {
		if (error) print(error.toString());
		else print(response.toString());
	});
};

module.exports = {
	pwd,
	date,
	echo,
	ls,
	cat,
	head,
	tail,
	curl,
};
