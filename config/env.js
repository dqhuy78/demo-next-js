const { cleanEnv, url, str } = require('envalid');

module.exports = cleanEnv(process.env, {
    APP_ENV: str({
        devDefault: 'local',
        desc: 'Application enviroment',
    }),

    APP_URL: url({
        default: 'http://localhost:3000',
        desc: 'Application URL',
    }),

    SERVER_URL: str({
        default: '',
        desc: 'API host'
    })
});
