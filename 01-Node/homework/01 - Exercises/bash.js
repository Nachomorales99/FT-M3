const process = require('process');
const commands = require('./commands/index.js');

let bash = () => {
	process.stdout.write('prompt > ');

	process.stdin.on('data', (data) => {
		let args = data.toString().trim().split(' ');

		// for (let i = 0; i < args.length; i++) {
		// 	if (array[i] === ' ') {
		// 		args.shift();
		// 		continue;
		// 	} else if (args[i] === ' ') {
		// 		args.pop();
		// 		continue;
		// 	}
		// }

		let cmd = args.shift();

		commands[cmd]
			? commands[cmd](print, args)
			: print(`command not found: ${cmd}`);

		// if (commands.hasOwnProperty(cmd)) {
		// 	commands[cmd](print, args);
		// } else {
		// 	print(`command not found: ${cmd}`);
		// }
	});
};

let print = (output) => {
	process.stdout.write(output);
	process.stdout.write('\nprompt > ');
};

bash();
module.exports = {
	print,
	bash,
};
