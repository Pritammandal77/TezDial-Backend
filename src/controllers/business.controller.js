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


export const fetchAllBusinesses = async (req, res) => {
    try {
        const { category, city, search } = req.query;

        const query = {};

        if (category?.trim()) {
            query.category = category.trim();
        }

        if (city?.trim()) {
            query.city = { $regex: city.trim(), $options: "i" };
        }

        if (search?.trim()) {
            const searchRegex = { $regex: search.trim(), $options: "i" };
            query.$or = [
                { title: searchRegex },
                { description: searchRegex },
                { category: searchRegex }
            ];
        }

        const businesses = await Business.find(query).sort({ createdAt: -1 });

        return res.status(200).json({
            statusCode: 200,
            count: businesses.length,
            businesses
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Failed to fetch businesses",
            error: error.message
        });
    }
};

export const fetchBusinessById = async (req, res) => {
    try {
        // 1. Destructure the ID from params
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                statusCode: 400,
                message: "Business ID is required in URL parameters"
            });
        }

        // 2. Pass ID directly to findById
        const business = await Business.findById(id);

        if (!business) {
            return res.status(404).json({
                statusCode: 404,
                message: "Business not found"
            });
        }

        return res.status(200).json({
            statusCode: 200,
            business,
            message: "Business data fetched successfully"
        });

    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Failed to fetch business details",
            error: error.message
        });
    }
};