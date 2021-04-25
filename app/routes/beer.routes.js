module.exports = (app) => {
    const beerCtrl = require('../controllers/beer.controller.js');

    // Create a new beer
    app.post('/beer', beerCtrl.create);

    // Retrieve all beers
    app.get('/beer', beerCtrl.findAll);

    // Retrieve a single beer by id
    app.get('/beer/:id', beerCtrl.findOne);

    // Update a beer by id
    app.put('/beer/:id', beerCtrl.update);

    // Delete a beer by id
    app.delete('/beer/:id', beerCtrl.delete);
}
