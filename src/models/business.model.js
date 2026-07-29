import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const businessSchema = new Schema(
    {
        ownerName: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        whatsapp: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        imageBusiness1: {
            type: String,
            required: true
        },
        imageBusiness2: {
            type: String,
            required: true
        },
        pin: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            default: 0
        },
    },
    {
        timestamps: true
    }
)


//it is a middleware used to encrypts the pin just before saving it in db
businessSchema.pre("save", async function () {
    if (!this.isModified("pin")) return;

    this.pin = await bcrypt.hash(this.pin, 10);
});

businessSchema.methods.ispinCorrect = async function (pin) {
    return await bcrypt.compare(pin, this.pin)
}


export const Business = mongoose.model("Business", businessSchema)