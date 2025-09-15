'use strict';

/**
 * protected-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::protected-page.protected-page');
