import mongoose, { mongo } from "mongoose";

const notificationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['follow', 'like'] //this is used when we want to give it a value from the limited choices
    },
    read: {
        type: Boolean,
        default: false
    }

},
{
    timestamps: true
}
)

export const Notification = mongoose.model("Notification", notificationSchema)