import { useState } from 'react'
import LandingPage from './components/LandingPage'
import PartyList from './components/PartyList'
import PartyDetail from './components/PartyDetail'

function App() {
  const [currentPage, setCurrentPage] = useState('landing') // 'landing', 'partyList', 'partyDetail'
  const [selectedParty, setSelectedParty] = useState(null)

  const handleLandingContinue = () => {
    setCurrentPage('partyList')
  }

  const handlePartyClick = (party) => {
    setSelectedParty(party)
    setCurrentPage('partyDetail')
  }

  const handleBackToList = () => {
    setSelectedParty(null)
    setCurrentPage('partyList')
  }

  if (currentPage === 'landing') {
    return <LandingPage onContinue={handleLandingContinue} />
  }

  if (currentPage === 'partyDetail') {
    return <PartyDetail party={selectedParty} onBack={handleBackToList} />
  }

  return <PartyList onPartyClick={handlePartyClick} />
}

export default App
