const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/cybersoft_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connect successfully");
    } catch (error) {
        console.log("Failed connect");
    }
}
module.exports = {connect};