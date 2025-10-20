const mongoose = require('mongoose');

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}

module.export = {connectDB};