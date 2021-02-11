const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const UserSchema   = new Schema({
    name: String,
    password: String,
    passwordComfirm: String
    
});

// スキーマをモデルとしてコンパイルし、それをモジュールとして扱えるようにする
module.exports = UserSchema; //mongoose.model('test', UserSchema);