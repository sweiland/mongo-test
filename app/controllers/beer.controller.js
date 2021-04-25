const Beer = require('../models/beer.model.js');

// Create and Save a new beer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.style) {
        return res.status(400).send({
            message: "Beers need a name and style"
        });
    }

    // Create a beer
    const beer = new Beer({
        name: req.body.name,
        abv: req.body.abv || 5.0,
        content: req.body.content || 500,
        style: req.body.style
    });

    // Save beer in the database
    beer.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the beer."
        });
    });
};

// Retrieve and return all beers from the database.
exports.findAll = (req, res) => {
    Beer.find()
        .then(beers => {
            res.send(beers);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving beers."
        });
    });
};

// Find a single beer by id
exports.findOne = (req, res) => {
    Beer.findById(req.params.id)
        .then(beer => {
            if (!beer) {
                return res.status(404).send({
                    message: `Beer with id ${req.params.id} not found`
                });
            }
            res.send(beer);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Beer with id ${req.params.id} not found`
            });
        }
        return res.status(500).send({
            message: `Retrieval of beer with id ${req.params.id} resulted in an error`
        });
    });
};

// Update a beer identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name || !req.body.style) {
        return res.status(400).send({
            message: "Beers need a name and style"
        });
    }

    // Find beer and update it with the request body
    Beer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        abv: req.body.abv || 5.0,
        content: req.body.content || 500,
        style: req.body.style
    }, {new: true})
        .then(beer => {
            if (!beer) {
                return res.status(404).send({
                    message: `Beer with id ${req.params.id} not found`
                });
            }
            res.send(beer);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Beer with id ${req.params.id} not found`
            });
        }
        return res.status(500).send({
            message: `Update of beer with id ${req.params.id} resulted in an error`
        });
    });
};

// Delete a beer with the specified id in the request
exports.delete = (req, res) => {
    Beer.findByIdAndRemove(req.params.id)
        .then(beer => {
            if (!beer) {
                return res.status(404).send({
                    message: `Beer with id ${req.params.id} not found`
                });
            }
            res.send({message: "Beer deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: `Beer with id ${req.params.id} not found`
            });
        }
        return res.status(500).send({
            message: `Deletion of beer with id ${req.params.id} resulted in an error`
        });
    });
};
