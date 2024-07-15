import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/project';

const connection = {}

async function dbConnect() {
    if (connection.isConnected) {
        return
    }

    const db = await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    connection.isConnected = db.connections[0].readyState

    console.log(connection.isConnected)

}

export default dbConnect