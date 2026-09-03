import CollectionView from './CollectionView.jsx'

export default function Leaderboard() {
  return <CollectionView resource="leaderboard" title="Leaderboard" description="A little friendly pressure goes a long way." renderItem={(entry) => <article className="data-card rank-card" key={entry._id}><span className="card-index">RANK {entry.rank}</span><h2>{entry.points} points</h2><p>Week {entry.week}</p></article>} />
}