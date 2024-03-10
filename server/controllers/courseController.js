import Course from "../models/Course.js";
import Instructor from "../models/Instructor.js";
import Lead from "../models/Lead.js";

export const getCourses = async (req, res) => {
    try {
        console.log("getCourses")
        const courses = await Course.findAll();
        res.status(200).send(courses);
    }
    catch (error) {
        res.status(400).send(error);
    }
}

export const createCourse = async (req, res) => {
    try {
        const { instructorId } = req.params;
        const currInstructor = await Instructor.findByPk(instructorId);
        if (!currInstructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }
        const instructor = currInstructor.name;
        let startDate = req.body.startDate;
        console.log(startDate);
        startDate = new Date(startDate).toISOString().slice(0, 19).replace('T', ' ');
        const course = new Course({ ...req.body, instructorId, instructor, startDate });
        await course.save();
        res.status(201).send(course);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

export const registerCourse = async (req, res) => {
    const { courseId } = req.params;

    try {
        const lead = await Lead.create({
            courseId,
            ...req.body,
        });
        res.status(201).json({ message: 'Registered for the course successfully', lead });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering for the course' });
    }
};