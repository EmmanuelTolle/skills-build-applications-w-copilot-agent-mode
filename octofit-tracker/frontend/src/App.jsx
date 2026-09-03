import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  ['/', 'Dashboard'],
  ['/users', 'Users'],
  ['/teams', 'Teams'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/workouts', 'Workouts'],
]

function Dashboard() {
  return (
    <div className="dashboard-intro">
      <p className="eyebrow">OCTOFIT TRACKER</p>
      <h1>Move with momentum.</h1>
      <p className="lead">One place for your teams, training, and progress.</p>
    </div>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="brand-mark">OCTOFIT</p>
          <span className="brand-subtitle">Performance studio</span>
        </div>
        <nav aria-label="Primary navigation" className="app-nav">
          {navigation.map(([path, label]) => (
            <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
