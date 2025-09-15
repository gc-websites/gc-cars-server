'use strict';

/**
 * protected-page router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::protected-page.protected-page');
