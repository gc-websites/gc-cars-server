const axios = require('axios')
const FormData = require('form-data')

module.exports = {
	async uploadFromUrl(ctx) {
		try {
			const { imageUrl } = ctx.request.body

			if (!imageUrl) {
				return ctx.badRequest('Missing imageUrl')
			}

			const response = await axios.get(imageUrl, {
				responseType: 'arraybuffer',
			})
			const buffer = Buffer.from(response.data, 'binary')
			const mimeType = response.headers['content-type'] || 'image/png'
			const fileName = 'generated-image.png'

			const form = new FormData()
			form.append('files', buffer, {
				filename: fileName,
				contentType: mimeType,
			})

			const baseUrl =
				ctx.request.origin || 'https://vivid-triumph-4386b82e17.strapiapp.com'

			const uploadRes = await axios.post(`${baseUrl}/api/upload`, form, {
				headers: {
					...form.getHeaders(),
					Authorization: ctx.request.header.authorization,
				},
			})

			return ctx.send(uploadRes.data)
		} catch (err) {
			console.error('UPLOAD ERROR:', err)
			return ctx.internalServerError('Failed to upload image')
		}
	},
}
