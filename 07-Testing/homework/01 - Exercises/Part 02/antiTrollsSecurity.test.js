const antiTrollsSecurity = require('./antiTrollsSecurity');

describe('PARTE 02', () => {
	describe('Seguridad Anti Trolls', () => {
		it('Debe devolver el mismo string pero habiendo eliminado todas las vocales', () => {
			expect(antiTrollsSecurity('This website is for losers LOL!')).toBe(
				'Ths wbst s fr lsrs LL!',
			);
			expect(antiTrollsSecurity('What are you, a communist?')).toBe(
				'Wht r y,  cmmnst?',
			);
		});

		it('Debe devolver el mismo string pero habiendo eliminado todas las vocales', () => {
			expect(antiTrollsSecurity('Aguante el grupo 2')).toBe('gnt l grp 2');
		});

		it('Debe devolver el mismo string pero habiendo eliminado todas las vocales', () => {
			expect(antiTrollsSecurity('Chat GPT, naaa Fede GPT')).toBe(
				'Cht GPT, n Fd GPT',
			);
		});
	});
});
