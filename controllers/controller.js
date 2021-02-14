
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const schema = require('../models/model');
const Model = mongoose.model('Model', schema);

exports.login = function(req, res){
    res.render('login', {title: 'Laravel'});
};
exports.loginPost = 
    
    function(req, res){
        const errors = validationResult(req);
        const model = new Model();
        console.log(body);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };
        model.save(function(err){
            if (err) {
                res.status(403).send('error:'+err);
            } else {
                //パスワード認証作業をここでする予定
                res.render('home', {title: 'Laravel', user: req.body.name});
            }
        });
    }
    
    