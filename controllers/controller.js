const express = require('express');
const router = express.Router;
const mongoose   = require('mongoose');
//mongDB起動
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ueyama:ueyamamasashi@127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true }, );
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
});
mongoose.connection.once('open', () =>  {
  console.log('DB接続中... You can cancel from ctrl + c')
});

const schema = require('../models/model');
const Model = mongoose.model('Model', schema);

exports.login = function(req, res){
    res.render('login', {title: 'Laravel'});
};
exports.loginPost = function(req, res){
    const model = new Model();
    console.log(model);
    //req.bodyの中にlogin.rjsのフォーム・インプットのデータが入っていることが前提
    model.name = req.body.name;
    model.password= req.body.password;
    model.passwordComfirm = req.body.passwordComfirm;
    console.log(model.password + ':' + model.passwordComfirm);
    console.log(model.name);
    if (model.name !== '' || model.password !== '' || model.passwordComfirm !== '') {
        if (model.password === model.passwordComfirm && model.password.length >= 7) {
            model.save(function(err){
                if (err) {
                    res.send('error:::'+err);
                } else {
                    //パスワード認証作業をここでする
                    res.render('home', {title: 'Laravel', user: model.name});
                }
            });
        } else {
            res.send('パスワードが違うか文字数が７以下です');
        }
    }
}