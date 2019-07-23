const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthTBSchema = new Schema({
    Username : {type: String, require: [true,"Username cannot be Blank"]},
    Password : {type: String, require: [true, "Password cannot be Blank"]}
});

const AuthTBModel = mongoose.model('users', AuthTBSchema);

module.exports = AuthTBModel;
