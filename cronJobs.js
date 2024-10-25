const cron = require('node-cron');
const { Task, User } = require('./models');
const { sendNotification } = require('./utils');

const setupCronJobs = (io) => {
  cron.schedule('0 * * * *', async () => { // Every hour
    const now = new Date();
    const overdueTasks = await Task.find({ dueDate: { $lt: now }, status: 'incomplete' });
    
    for (const task of overdueTasks) {
      const user = await User.findById(task.collaborators[0]); // Assume the first collaborator
      await sendNotification(user, `Task ${task.title} is overdue!`);
      
      io.emit('taskNotification', { taskId: task._id, message: 'Task is overdue' });
    }
  });
};

module.exports = { setupCronJobs };
