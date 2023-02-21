const process = require('process');
const commands = require('./commands/index.js');

let print = (output) => {
	process.stdout.write(output);
	process.stdout.write('\nprompt > ');
};

let bash = () => {
	process.stdout.write('prompt > ');

	process.stdin.on('data', (data) => {
		let args = data.toString().trim().split(' ');

		let cmd = args.shift();

		commands[cmd]
			? commands[cmd](print, args.join(' '))
			: print(`command not found: ${cmd}`);
	});
};

bash();
module.exports = {
	print,
	bash,
};
