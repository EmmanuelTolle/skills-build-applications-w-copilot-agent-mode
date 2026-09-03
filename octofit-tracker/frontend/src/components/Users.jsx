import CollectionView from './CollectionView.jsx'

export default function Users() {
  return <CollectionView resource="users" endpoint="/api/users/" title="Users" description="The people powering every session." renderItem={(user) => <article className="data-card" key={user._id}><span className="card-index">ATHLETE</span><h2>{user.name}</h2><p>{user.email}</p><strong>{user.points ?? 0} pts</strong></article>} />
}