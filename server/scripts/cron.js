// scripts/cron.js

const cron = require('node-cron');
const childProcess = require('child_process');

// Schedule the time slot generation script to run daily at midnight
cron.schedule('0 0 * * *', () => {
  // Execute the time slot generation script using child_process
  childProcess.exec('node generateTimeSlotsScript.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running generateTimeSlotsScript: ${error}`);
      return;
    }
    console.log(`Time slot generation script output: ${stdout}`);
  });
});
