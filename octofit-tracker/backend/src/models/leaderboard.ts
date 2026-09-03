import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    week: { type: String, required: true },
  },
  { timestamps: true },
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);