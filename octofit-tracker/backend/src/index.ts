import express from 'express';
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

app.use('/api/users', createCollectionRouter('users'));
app.use('/api/teams', createCollectionRouter('teams'));
app.use('/api/activities', createCollectionRouter('activities'));
app.use('/api/leaderboard', createCollectionRouter('leaderboard'));
app.use('/api/workouts', createCollectionRouter('workouts'));

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});