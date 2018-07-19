const path = require('path');
const exphbs = require('express-handlebars');

const handlebar = {
    handlebarInit : (app) => {
        app.engine('.hbs', exphbs({
            defaultLayout: 'main',
            extname: '.hbs',
            layoutsDir: path.join(__dirname, 'views/layouts')
        }));
        
        app.set('view engine', '.hbs');
        app.set('views', path.join(__dirname, 'views'));
    }
}

module.exports = handlebar;