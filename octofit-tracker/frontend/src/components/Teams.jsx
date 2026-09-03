import CollectionView from './CollectionView.jsx'

export default function Teams() {
  return <CollectionView resource="teams" title="Teams" description="Find your pace in good company." renderItem={(team) => <article className="data-card" key={team._id}><span className="card-index">TEAM</span><h2>{team.name}</h2><p>{team.description}</p><strong>{team.members?.length ?? 0} members</strong></article>} />
}