const express = require('express');
const mongoose = require('mongoose');
const schema = require('../models/model');
const router = express.Router();
const Model = mongoose.model('Model', schema);
const controller = require('../controllers/controller');
const { body, validationResult } = require('express-validator');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', controller.login);
router.post('/', [
    //body('name').isEmail(),
    body('password').isLength({ min: 7 })
    ],
    body('passwordConfirmation').custom((value, req) => {
        //console.log(req.body.password);
        console.log(body.passwordConfirmation);
        if (value !== req.body.password) {
        throw new Error('パスワード確認がパスワードと一致しません');
        }
        return true;
    }),
    controller.loginPost
);

module.exports = router;
