import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import PartyList from './components/PartyList'
import PartyDetail from './components/PartyDetail'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/parties"
          element={
            <ProtectedRoute>
              <PartyList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parties/:partyId"
          element={
            <ProtectedRoute>
              <PartyDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
