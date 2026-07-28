import { createNewBusiness } from "../controllers/business.controller"

const businessRouter = Router()

businessRouter.route("/new").post(createNewBusiness)

export default businessRouter