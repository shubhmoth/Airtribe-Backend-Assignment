import Instructor from "../models/Instructor.js";
import course from "../models/Course.js";

export const getInstructors = async (req, res) => {
    try {
        console.log("getInstructors")
        const instructors = await Instructor.findAll();
        res.status(200).send(instructors);
    }
    catch (error) {
        res.status(400).send(error);
    }
};

export const getInstructorById = async (req, res) => {
    try {
        console.log(req.params.id)
        const instructor = await Instructor.findByPk(req.params.id);
        if (!instructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }
        res.status(200).send(instructor);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

export const createInstructor = async (req, res) => {
    try {
        const instructor = new Instructor(req.body);
        await instructor.save();
        res.status(201).send(instructor);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

export const getInstructorCourses = async (req, res) => {
    try {
        const instructor = await Instructor.findByPk(req.params.instructorId);
        if (!instructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }
        const courses = await course.findAll({
            where: {
                instructorId: req.params.id
            }
        });
        res.status(200).send(courses);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

export const updateCourseDetails = async (req, res) => {
    try {
        const instructor = await Instructor.findByPk(req.params.instructorId);
        if (!instructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }
        const currentCourse = await course.findByPk(req.params.courseId);
        if (!currentCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        const updatedCourse = await currentCourse.update(req.body);
        res.status(200).send(updatedCourse);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
