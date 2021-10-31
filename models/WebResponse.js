const mongoose = require('mongoose');
const Schema =  mongoose.Schema;


const WebResponseSchema = new Schema({
    url: String,
    response : Object,
    timestamps: Number
},{
    versionKey: false,  // no version needed
});

const WebResponse = mongoose.model('WebResponse', WebResponseSchema, 'webresponse');


module.exports = WebResponse;