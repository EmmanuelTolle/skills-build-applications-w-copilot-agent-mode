import CollectionView from './CollectionView.jsx'

export default function Activities() {
  return <CollectionView resource="activities" endpoint="/api/activities/" title="Activities" description="A clear record of the work you put in." renderItem={(activity) => <article className="data-card" key={activity._id}><span className="card-index">SESSION</span><h2>{activity.type}</h2><p>{activity.durationMinutes} minutes · {activity.calories} calories</p><strong>{new Date(activity.completedAt).toLocaleDateString()}</strong></article>} />
}