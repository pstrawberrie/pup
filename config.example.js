/**
 * Config
 */

const config = {
  development: {
    isProd: false,
    webPort: 3000,
    dbFile: './db.json',
  },
  production: {
    isProd: true,
    webPort: 3000,
    dbFile: './db.json',
  },
}

const env = process.env.NODE_ENV;
function getConfig() {
  if (env == undefined || env.toLowerCase() === 'development') {
    return config.development
  } else if (env.toLowerCase() === 'production') {
    return config.production
  } else {
    return config.development
  }
}

module.exports = getConfig();
