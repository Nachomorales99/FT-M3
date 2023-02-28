//Express
const express = require('express');

//"Base de datos"
let publications = [];

//Servidor
const server = express();

//Middleware
server.use(express.json());

let index = 1;

//Controllers

let createPublications = (author, title, contents) => {
	if (!author || !title || !contents)
		throw Error(
			'No se recibieron los parámetros necesarios para crear la publicación',
		);

	let newPublication = {
		id: index++,
		author,
		title,
		contents,
	};

	publications.push(newPublication);

	return newPublication;
};

//Routes

server.post('/posts', (req, res) => {
	let { author, title, contents } = req.body;

	try {
		let newPublication = createPublications(author, title, contents);

		res.status(200).json(newPublication);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

server.get('/posts/:author', (req, res) => {
	let { author } = req.params;

	if (author) {
		let authorFiltered = publications.filter(
			(writer) => writer.author === author,
		);

		authorFiltered.length
			? res.status(200).json(authorFiltered)
			: res
					.status(400)
					.json({ error: 'No existe ninguna publicación del autor indicado' });
	} else {
		return res.status(400).json({ error: 'No se brindo un author' });
	}
});

server.get('/posts', (req, res) => {
	let { author, title } = req.query;

	if (author && title) {
		let publicationFiltered = publications.filter(
			(publication) =>
				publication.author === author && publication.title === title,
		);

		publicationFiltered.length
			? res.status(200).json(publicationFiltered)
			: res.status(400).json({
					error:
						'No existe ninguna publicación con dicho título y autor indicado',
			  });
	}
	return res.status(400).json({
		error: 'No existe ninguna publicacion con dicho titulo y autor indicado',
	});
});

server.put('/posts/:id', (req, res) => {
	let { id } = req.params;
	let { title, contents } = req.body;

	if (id && title && contents) {
		let publicationId = publications.find(
			(publication) => publication.id === Number(id),
		);

		if (!publicationId) {
			res.status(400).json({
				error:
					'No se recibió el id correcto necesario para modificar la publicación',
			});
		} else {
			publicationId = { ...publicationId, title, contents };
			return res.status(200).json(publicationId);
		}
	}
});

server.delete('/posts/:id', (req, res) => {
	let { id } = req.params;

	if (!id) {
		return res
			.status(400)
			.json({ error: 'No se recibió el id de la publicación a eliminar' });
	} else {
		let publicationDelete = publications.filter(
			(publication) => publication.id !== Number(id),
		);

		if (publications.length === publicationDelete.length) {
			res.status(400).json({
				error:
					'No se recibió el id correcto necesario para eliminar la publicación',
			});
		}

		publications = publicationDelete;

		res.status(200).json({ succes: true });
	}
});

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
