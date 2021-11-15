// const mongoosea = require("mongoose");
// const mongoose = require("mongoose");
import mongoose from 'mongoose';

export const TicketSchema = new mongoose.Schema({
    username: {
        type: String, default: null,
        index: false,
        unique: false,
    },
    email: {
        type: String, default: null,
        index: false,
        unique: false,
    },
    ticket: {
        subject: { type: String },
        message: { type: String },
        difficulty: { type: Number },
        id: { type: Number }
    },
    date: { type: Date, default: Date.now}
});

export default mongoose.model("ticket", TicketSchema);