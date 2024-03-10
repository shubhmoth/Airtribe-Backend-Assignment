import Lead from "../models/Lead.js";
import Comment from "../models/Comment.js";


export const getLeads = async (req, res) => {
    const { courseId } = req.params;
    try {
        const leads = await Lead.findAll({
            where: {
                courseId,
            },
        });
        res.status(200).send(leads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting leads' });
    }
};

export const searchLead = async (req, res) => {
    const { courseId } = req.params;
    const { name, email } = req.query;
    try {
        if (name) {
            const leads = await Lead.findAll({
                where: {
                    courseId,
                    name,
                },
            });
            res.status(200).send(leads);
        }
        else if (email) {
            const leads = await Lead.findAll({
                where: {
                    courseId,
                    email,
                },
            });
            res.status(200).send(leads);
        }
        else {
            res.status(400).json({ error: 'Invalid search query' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting leads' });
    }
};

export const updateLeadDetails = async (req, res) => {
    const { courseId, leadId } = req.params;
    try {
        const lead = await Lead.findOne({
            where: {
                courseId,
                leadId,
            },
        });
        if (!lead) {
            res.status(404).json({ error: 'Lead not found' });
        }
        const { status } = req.body;
        const updatedLead = await lead.update({
            status
        });
        res.status(200).send(updatedLead);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating lead' });
    }
}

export const createComment = async (req, res) => {
    const { courseId, leadId,instructorId } = req.params;
    try {
        const lead = await Lead.findOne({
            where: {
                courseId,
                leadId,
            },
        });
        if (!lead) {
            res.status(404).json({ error: 'Lead not found' });
        }
        const { text } = req.body;
        const comment = await Comment.create({
            text,
            leadId,
            instructorId,
        });
        res.status(201).send(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating comment' });
    }
}