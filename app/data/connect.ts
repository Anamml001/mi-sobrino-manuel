import mongoose from 'mongoose';

const connection: { isConnected: boolean } = { isConnected: false }

async function connect() {
    if (connection.isConnected) return

    const db = await mongoose.connect(process.env.MONGODB_URL!)

    connection.isConnected = !!db.connections[0].readyState
}

export default connect