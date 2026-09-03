import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function CollectionView({ resource, title, description, renderItem }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetchCollection(resource)
      .then((data) => {
        if (active) {
          setItems(data)
          setStatus('ready')
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.message)
          setStatus('error')
        }
      })
    return () => { active = false }
  }, [resource])

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">LIVE DATA</p>
          <h1>{title}</h1>
          <p className="section-description">{description}</p>
        </div>
        <span className="count-badge">{status === 'ready' ? items.length : '...'}</span>
      </div>
      {status === 'loading' && <p className="state-message">Loading {resource}...</p>}
      {status === 'error' && <p className="alert alert-warning">{error}</p>}
      {status === 'ready' && items.length === 0 && <p className="state-message">No {resource} found.</p>}
      <div className="collection-grid">{items.map((item) => renderItem(item))}</div>
    </section>
  )
}