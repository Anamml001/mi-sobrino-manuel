import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/project'

if (!MONGODB_URI) {
    throw new Error(
        'Por favor define la variable de entorno MONGODB_URI dentro de tu archivo .env.local'
    );
}

let cachedClient = null;
let cachedDb = null;

if (!cachedClient) {
    cachedClient = await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    cachedDb = cachedClient.connection.db;
}

export { cachedDb };