import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    birthdate: String, // Ajustar el tipo si es necesario
    email: String,
    password: String,
});

export const User = mongoose.model('User', userSchema);