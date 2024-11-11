const router = require("express").Router()
const SocialPerformanceRecordController = require("../controllers/social_performance_records_controller")
const { socialPerformanceRecordValidationSchema } = require("../model/validationModels/SocialPerformanceRecordValidation");


const validateSocialPerformanceRecord = (req, res, next) => {
    const { error } = socialPerformanceRecordValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

router.get("/", SocialPerformanceRecordController.getAllSocialPerformanceRecords)
router.get("/:id", SocialPerformanceRecordController.getSocialPerformanceRecordById)
router.put("/:id", validateSocialPerformanceRecord, SocialPerformanceRecordController.updateSocialPerformanceRecord)
router.delete("/:id", SocialPerformanceRecordController.deleteSocialPerformanceRecord)

module.exports = router