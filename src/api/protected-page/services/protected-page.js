'use strict';

/**
 * protected-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::protected-page.protected-page');
