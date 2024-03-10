import express from "express";
import { createCourse, getCourses, registerCourse } from "../controllers/courseController.js";
import { createComment, getLeads, searchLead, updateLeadDetails } from "../controllers/leadController.js";


const router = express.Router();

router.get("/", getCourses);
router.post("/", createCourse);
router.post("/:courseId/register", registerCourse);
router.get("/:courseId/leads", getLeads);
router.put("/:courseId/lead/:leadId", updateLeadDetails);
router.get("/:courseId/searchLead", searchLead);

export default router;