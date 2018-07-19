const burgerController = require('./burgerControler');

module.exports = app => {
    
    //home
    app.get('/', (request, response) => {
        response.send('Hello from Express!');
        response.end();
    });

    app.get('/api/v1/burger/:id', burgerController.getById);
    app.get('/api/v1/burger', burgerController.getAll);
    app.post('/api/v1/burger', burgerController.add);
    app.put('/api/v1/burger', burgerController.edit);
    app.delete('/api/v1/burger', burgerController.delete);

    // handle all path that missing!
    app.all('*', (req,res) => {
        res.status(404);
        res.send('404 Not Found!');
        res.end();
    });
    
};