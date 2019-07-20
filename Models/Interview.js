const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Structure of the Interview Table in MongoDB
const InterviewTBSchema =  new Schema({
    Company : {type: String, required: [true, "Company Name cannot be left Blank"]},
    Location : {type: String, required:[true, "Company Location cannot be left Blank"]},
    Type: {type: String, required: [false]},
    Offered_Role: {type: String, required: [true, "Role Offered by the Company cannot be left Blank"]},
    Required_Experience: {type: String, required: [true,"Demanded Experience cannot be left Blank"]},
    Notice_Period: {type: Number, require: [false]},
    Pay_Scale: {type: Number, require: [false]},
    Company_Rating: {type: Number, require: [false]},
    Interview_Date: {type: Date, require: [true,"Interview Date cannot be left Blank"]},
    Interview_Venue: {type: String, require: [true,"Interview Venue cannot be left Blank"]},
    Contact_Person: {type: String, require: [false]},
    Contact_Person_Email: {type: String, require: [true,"Contacted Person's Email cannot be left Blank"]},
    Contact_Person_Phone: {type: String, require:[false]}
});

const InterviewTBModel = mongoose.model('interviews',InterviewTBSchema);

module.exports = InterviewTBModel;