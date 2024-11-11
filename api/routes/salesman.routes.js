const router = require("express").Router()
const { salesManValidationSchema } = require("../model/validationModels/SalesManValidation");
const { socialPerformanceRecordValidationSchema } = require("../model/validationModels/SocialPerformanceRecordValidation");
const SalesManController = require("../controllers/salesman_controller")

const validateSalesManInput = (req, res, next) => {
    const { error } = salesManValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


const validateSocialPerformanceRecord = (req, res, next) => {
    const { error } = socialPerformanceRecordValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

router.get("/", SalesManController.getAllSalesmen)
router.get("/:id", SalesManController.getSalesmanById)
router.post("/", validateSalesManInput, SalesManController.createSalesman)
router.put("/:id", validateSalesManInput, SalesManController.updateSalesman)
router.post("/:id/social_performance", validateSocialPerformanceRecord, SalesManController.createSocialPerformanceToSalesman)
router.delete("/:id", SalesManController.deleteSalesman)



module.exports = router