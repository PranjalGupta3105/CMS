const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthTBSchema = new Schema({
    Username : {type: String, require: [true,"Username cannot be Blank"]},
    Password : {type: String, require: [true, "Password cannot be Blank"]},
    Email : {type: String, require: [true, "Email cannot be left Blank"]},
    Phone : {type: String, require: [true, "Phone no. cannot be left Blank"]}
});

const AuthTBModel = mongoose.model('users', AuthTBSchema);

module.exports = AuthTBModel;
