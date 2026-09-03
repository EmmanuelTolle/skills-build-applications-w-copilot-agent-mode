import express from 'express';
import { connectDatabase } from './config/database.js';
import { Activity } from './models/activity.js';
import { Leaderboard } from './models/leaderboard.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';
import { createCollectionRouter } from './routes/collection.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.use('/api/users', createCollectionRouter('users', User));
app.use('/api/teams', createCollectionRouter('teams', Team));
app.use('/api/activities', createCollectionRouter('activities', Activity));
app.use('/api/leaderboard', createCollectionRouter('leaderboard', Leaderboard));
app.use('/api/workouts', createCollectionRouter('workouts', Workout));

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  });