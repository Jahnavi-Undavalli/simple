const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['Owner', 'Admin', 'Member'], default: 'Member' },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
});

// Team Schema
const teamSchema = new mongoose.Schema({
  name: String,
  members: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, role: String }],
});


const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    priority: String,
    dueDate: Date,
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }, // Ensure this is set to ObjectId
    dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

const Task = mongoose.model('Task', TaskSchema);


const User = mongoose.model('User', userSchema);
const Team = mongoose.model('Team', teamSchema);


module.exports = { User, Team, Task };
