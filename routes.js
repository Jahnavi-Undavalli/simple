const express = require('express');
const router = express.Router();
const { User, Team, Task } = require('./models');
const { authenticateJWT } = require('./middleware');

//------------------ USER ROUTES ------------------

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

// Get all users
router.get('/users', authenticateJWT, async (req, res) => {
  try {
    const users = await User.find().populate('teams');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
});

// Get a user by ID
router.get('/users/:id', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('teams');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
});

// Update a user
router.put('/users/:id', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
});

// Delete a user
router.delete('/users/:id', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

//------------------ TEAM ROUTES ------------------

// Create a new team
router.post('/teams', authenticateJWT, async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: 'Error creating team', error });
  }
});

// Get all teams
router.get('/teams', authenticateJWT, async (req, res) => {
  try {
    const teams = await Team.find().populate('members.user');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving teams', error });
  }
});

// Get a team by ID
router.get('/teams/:id', authenticateJWT, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members.user');
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving team', error });
  }
});

// Update a team
router.put('/teams/:id', authenticateJWT, async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: 'Error updating team', error });
  }
});

// Delete a team
router.delete('/teams/:id', authenticateJWT, async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json({ message: 'Team deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team', error });
  }
});

//------------------ TASK ROUTES ------------------

// Create a new task
router.post('/tasks', authenticateJWT, async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error });
  }
});

// Get all tasks
router.get('/tasks', authenticateJWT, async (req, res) => {
  try {
    const tasks = await Task.find().populate('collaborators team dependencies');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tasks', error });
  }
});

// Get a task by ID
router.get('/tasks/:id', authenticateJWT, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('collaborators team dependencies');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving task', error });
  }
});

// Update a task
router.put('/tasks/:id', authenticateJWT, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task', error });
  }
});

// Delete a task
router.delete('/tasks/:id', authenticateJWT, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
});

module.exports = router;
