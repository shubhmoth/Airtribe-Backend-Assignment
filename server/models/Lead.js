import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Course from './Course.js';

const Lead = sequelize.define('Lead', {
  leadId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  linkedinProfile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Accepted', 'Rejected', 'Waitlisted', 'Pending'),
    defaultValue: 'Pending',
  }, 
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define Associations
Lead.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Lead, { foreignKey: 'courseId' });

export default Lead;