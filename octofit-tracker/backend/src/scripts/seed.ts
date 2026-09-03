import mongoose from 'mongoose';
import { connectionString } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.create([
      { name: 'Summit Striders', description: 'Climb higher together.' },
      { name: 'Urban Pulse', description: 'Consistent movement for busy lives.' },
    ]);

    const users = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@example.com', teamId: teams[0]._id, points: 820 },
      { name: 'Jon Bell', email: 'jon.bell@example.com', teamId: teams[0]._id, points: 690 },
      { name: 'Aisha Khan', email: 'aisha.khan@example.com', teamId: teams[1]._id, points: 760 },
      { name: 'Leo Martin', email: 'leo.martin@example.com', teamId: teams[1]._id, points: 540 },
    ]);

    await Team.bulkWrite(
      teams.map((team, index) => ({
        updateOne: {
          filter: { _id: team._id },
          update: { $set: { members: users.filter((user) => user.teamId?.toString() === team._id.toString()).map((user) => user._id) } },
        },
      })),
    );

    await Activity.create([
      { userId: users[0]._id, type: 'Run', durationMinutes: 42, calories: 410, completedAt: new Date('2026-09-01T07:30:00Z') },
      { userId: users[1]._id, type: 'Strength', durationMinutes: 35, calories: 280, completedAt: new Date('2026-09-01T18:00:00Z') },
      { userId: users[2]._id, type: 'Cycling', durationMinutes: 50, calories: 520, completedAt: new Date('2026-09-02T06:45:00Z') },
      { userId: users[3]._id, type: 'Yoga', durationMinutes: 30, calories: 150, completedAt: new Date('2026-09-02T19:15:00Z') },
    ]);

    await Leaderboard.create(users.map((user, index) => ({
      userId: user._id,
      rank: index + 1,
      points: user.points,
      week: '2026-W36',
    })));

    await Workout.create([
      { title: 'Morning Momentum', category: 'Cardio', difficulty: 'beginner', durationMinutes: 25, exercises: ['Jumping jacks', 'Bodyweight squats', 'Marching high knees'] },
      { title: 'Full Body Builder', category: 'Strength', difficulty: 'intermediate', durationMinutes: 40, exercises: ['Push-ups', 'Reverse lunges', 'Plank shoulder taps'] },
      { title: 'Power Intervals', category: 'HIIT', difficulty: 'advanced', durationMinutes: 30, exercises: ['Burpees', 'Mountain climbers', 'Sprint intervals'] },
    ]);

    console.log('Database seeding complete: 2 teams, 4 users, 4 activities, 4 leaderboard entries, 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
