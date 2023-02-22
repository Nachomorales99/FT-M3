const fs = require('fs'); //Files System
const utils = require('../utils/request');
const process = require('process');

let pwd = (print) => {
	print(process.cwd());
};

let date = (print) => {
	print(Date());
};

let echo = (print, args) => {
	print(args.join(' ')); //No pasa test, pero funciona
};

let ls = (print) => {
	fs.readdir('.', (error, files) => {
		if (error) throw new Error(error);
		// print(files.join(' ')); // Asi pasa el test
		print(files.join('\n')); // Asi es mejor
	});
};

let cat = (print, args) => {
	//Asi funciona, pero no pasa test
	fs.readFile(args.join(' '), 'utf-8', (error, data) => {
		if (error) throw new Error(error);
		print(data);
	});
};

let head = (print, args) => {
	fs.readFile(args.join(' '), 'utf-8', (error, data) => {
		if (error) throw new Error(error);
		// print(data.split('\n').at(0)); // Pasa el test
		print(data.split('\n').slice(0, 8).join('\n')); // Es correcto
	});
};

let tail = (print, args) => {
	//Asi funciona, pero no pasa test
	fs.readFile(args.join(' '), 'utf-8', (error, data) => {
		if (error) throw new Error(error);
		print(data.split('\n').at(-1).trim());
	});
};

let curl = (print, args) => {
	if (args.toString().slice(0, 8) === 'https://') {
		//Asi funciona, pero no pasa test
		utils.request(args.toString(), (error, response) => {
			// if (error) print(error.toString());
			// else print(response.toString()); // Asi pasa el test
			if (error) throw new Error(error);
			print(response.data.toString());
		});
	} else {
		print('Debe ingresar una URL https://');
	}
};

let create = (print, args) => {
	let componentName;
	process.stdout.write('Ingresa el nombre del componente');
	process.stdin.on('data', (data) => {});
	fs.writeFile(
		{ componentName } + '.jsx',
		`
	import React from "react" 
	export default function ${componentName}(props){
		return(
			<div> 
			Soy el componente nuevo 
			</div>
		)
	}
	`,
		(error) => {
			if (error) throw Error(error);
			print('Componente creado satisfactoriamente');
		},
	);
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
	create,
};
