'use strict';
var mongoose = require('mongoose');
var Cliente = mongoose.model('Cliente');

exports.insert = (req, res) => {
    (new Cliente(req.body)).save((err, cliente) => {
        if (err)
            res.status(400).send(err);
        res.json(cliente);
    });
};

exports.findAll = (req, res) => {
    Cliente.find({}, (err, cliente) => {
        if (err)
            res.status(400).send(err);
        res.json(cliente);
    });
};

exports.findById = (req, res) => {
    Cliente.findById(req.params.id, (err, cliente) => {
        if (err)
            res.status(400).send(err);
        res.json(cliente);
    });
};

exports.update = (req, res) => {
    Cliente.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        new: true
    }, (err, cliente) => {
        if (err)
            res.status(400).send(err);
        res.json(cliente);
    });
};

exports.delete = (req, res) => {
    Cliente.findOneAndUpdate({
        _id: req.params.id
    }, {
        ativo: false
    }, {
        new: true
    }, (err, cliente) => {
        if (err)
            res.status(400).send(err);
        res.json({
            message: 'Cliente inativado'
        });
    });
};
