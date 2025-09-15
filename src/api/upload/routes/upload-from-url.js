module.exports = {
	routes: [
		{
			method: 'POST',
			path: '/upload-from-url',
			handler: 'upload-from-url.uploadFromUrl',
			config: {
				policies: [],
				middlewares: [],
			},
		},
	],
}
