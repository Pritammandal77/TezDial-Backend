import { Router } from "express"
import { createNewBusiness, deleteBusinessListing, fetchAllBusinesses, fetchBusinessById } from "../controllers/business.controller.js"
import { upload } from "../middlewares/multer.middleware.js"

const businessRouter = Router()

businessRouter.route("/new").post(
    upload.fields([
        { name: "images", maxCount: 2 },
    ]),
    createNewBusiness
)

businessRouter.route("/all").get(fetchAllBusinesses)

businessRouter.route("/:id").get(fetchBusinessById)

businessRouter.route("/delete").delete(deleteBusinessListing)

export default businessRouter