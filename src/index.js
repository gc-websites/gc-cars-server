'use strict'

module.exports = {
	/**
	 * An asynchronous register function that runs before
	 * your application is initialized.
	 *
	 * This gives you an opportunity to extend code.
	 */
	register(/*{ strapi }*/) {},

	/**
	 * An asynchronous bootstrap function that runs before
	 * your application gets started.
	 *
	 * This gives you an opportunity to set up your data model,
	 * run jobs, or perform some special logic.
	 */
	bootstrap({ strapi }) {
		const { Server } = require('socket.io')
		const io = new Server(strapi.server.httpServer, {
			cors: { origin: '*' },
		})

		const activeUsers = {} // Об'єкт для збереження активних користувачів на постах
		const userSocketMapping = {} // Об'єкт для збереження підключених сокетів користувачів

		// Коли користувач підключається
		io.on('connection', socket => {
			// Оновити всі статті при підключенні
			socket.emit('updateAllActiveUsers', activeUsers)

			// Користувач приєднується до поста
			socket.on('joinPost', postId => {
				const userId = socket.id

				// Якщо користувач уже підключений до цього поста, не збільшуємо лічильник
				if (userSocketMapping[userId] && userSocketMapping[userId] === postId) {
					return
				}

				// Якщо користувач залишив пост раніше, зменшуємо лічильник на попередньому пості
				if (userSocketMapping[userId]) {
					const previousPostId = userSocketMapping[userId]
					activeUsers[previousPostId]--
					io.emit('updateActiveUsers', {
						postId: previousPostId,
						count: activeUsers[previousPostId],
					})
				}

				// Додаємо нове підключення
				if (!activeUsers[postId]) {
					activeUsers[postId] = 0
				}
				activeUsers[postId]++

				// Оновлюємо відстеження підключеного користувача
				userSocketMapping[userId] = postId

				// Сповіщаємо всіх про оновлену кількість користувачів
				io.emit('updateActiveUsers', { postId, count: activeUsers[postId] })
			})

			// Користувач залишає пост
			socket.on('leavePost', postId => {
				const userId = socket.id

				if (userSocketMapping[userId] === postId) {
					activeUsers[postId]--
					io.emit('updateActiveUsers', { postId, count: activeUsers[postId] })

					// Очищаємо відстеження цього користувача
					delete userSocketMapping[userId]
				}
			})

			// Очищення при відключенні
			socket.on('disconnect', () => {
				const userId = socket.id
				if (userSocketMapping[userId]) {
					const postId = userSocketMapping[userId]
					activeUsers[postId]--
					io.emit('updateActiveUsers', { postId, count: activeUsers[postId] })

					// Видаляємо користувача зі списку
					delete userSocketMapping[userId]
				}
			})
		})
	},
}
