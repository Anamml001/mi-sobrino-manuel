import mongoose from 'mongoose'

const { MONGODB_URI } = process.env

if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI environment variable')

// @ts-ignore
let cached = global.mongoose

if (!cached)
    // @ts-ignore
    cached = global.mongoose = { conn: null, promise: null }

async function connect() {
    if (cached.conn)
        return cached.conn

    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        }

        cached.promise = mongoose.connect(MONGODB_URI!, opts).
            then(mongoose => {
                console.log('db connected')

                return mongoose
            })
    }

    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}

export default connect