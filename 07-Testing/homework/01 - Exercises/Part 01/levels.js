const levelOne = (a, b) => a + b;

const levelTwo = (letras) => {
	if (letras.length < 2) return letras;

	if (letras.length === 2) return letras[0];

	if (letras.length > 2) {
		let result = [];
		for (let i = 0; i < letras.length; i++) {
			if (i % 2 === 0) result.push(letras[i]);
		}
		return result.join('');
	}
};

const levelThree = (a, b) => [...a, ...b].sort();

const levelFour = (num) => {
	let array = num.toString().split('');

	let arrayNum = array.map((str) => Number(str));

	let result = arrayNum.reduce((acc, num) => acc + num);

	let reverse = Number(result.toString().split('').reverse().join(''));

	return result * reverse === num;
};

module.exports = { levelOne, levelTwo, levelThree, levelFour };
