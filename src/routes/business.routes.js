import { Router } from "express"
import { createNewBusiness } from "../controllers/business.controller.js"
import { upload } from "../middlewares/multer.middleware.js"

const businessRouter = Router()

businessRouter.route("/new").post(
    upload.fields([
        { name: "images", maxCount: 2 },
    ]),
    createNewBusiness
)

export default businessRouter