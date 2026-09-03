import CollectionView from './CollectionView.jsx'

export default function Workouts() {
  return <CollectionView resource="workouts" title="Workouts" description="Training ideas matched to your next goal." renderItem={(workout) => <article className="data-card" key={workout._id}><span className="card-index">{workout.category}</span><h2>{workout.title}</h2><p>{workout.durationMinutes} minutes · {workout.difficulty}</p><strong>{workout.exercises?.length ?? 0} exercises</strong></article>} />
}