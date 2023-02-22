const process = require('process');
const commands = require('./commands/index.js');

let print = (output) => {
	process.stdout.write(output); //Mostrar algo
	process.stdout.write('\nprompt > '); //Vuelve a pedir el prompt
	//stdout ===> para sacar datos de Node
};

let bash = () => {
	process.stdout.write('prompt > ');

	process.stdin.on('data', (data) => {
		//stdin ===> ingresar datos en Node
		let args = data.toString().trim().split(' ');

		let cmd = args.shift();

		commands[cmd]
			? commands[cmd](print, args)
			: print(`command not found: ${cmd}`);

		// Tambien se puede con hasOwnProperty()
	});
};

bash();
module.exports = {
	print,
	bash,
};
