import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { Business } from "../models/business.model.js";


export const createNewBusiness = async (req, res) => {
    const { title, category, city, phone, whatsapp, description, address, pin, rating } = req.body

    console.log("calling APi")

    if (!title || !category || !city || !phone || !description || !address || !pin || !rating) {
        return res.json({
            statusCode: 400,
            message: "all fields are required"
        })
    }

    const ImagesLocalPaths = req.files?.images || [];

    const imageUrls = [];

    for (const file of ImagesLocalPaths) {
        const uploaded = await uploadOnCloudinary(file.path);
        console.log("uploading file")
        if (uploaded?.url) {
            imageUrls.push(uploaded.url);
            console.log(uploaded.url);
        }
    }

    const newBusiness = await Business.create(
        {
            title,
            category,
            city,
            phone,
            whatsapp: whatsapp || "",
            description,
            address,
            pin,
            rating,
            imageBusiness1: imageUrls[0] || "",
            imageBusiness2: imageUrls[1] || "",
        }
    )

    return res.json(
        {
            statusCode: 201,
            message: "Business listed successfully"
        }
    )
}