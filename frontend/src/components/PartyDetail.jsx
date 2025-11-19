import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockParties } from '@/data/mockData'

export default function PartyDetail() {
  const { partyId } = useParams()
  const navigate = useNavigate()
  const [party, setParty] = useState(null)
  const [guests, setGuests] = useState([])
  const [checkedInGuests, setCheckedInGuests] = useState(new Set())
  const [maleName, setMaleName] = useState('')
  const [femaleName, setFemaleName] = useState('')
  const [checkInSearch, setCheckInSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const maleInputRef = useRef(null)
  const femaleInputRef = useRef(null)
  const checkInInputRef = useRef(null)
  const [nextGuestId, setNextGuestId] = useState(1000)

  useEffect(() => {
    const foundParty = mockParties.find((p) => p.id === parseInt(partyId))
    if (foundParty) {
      setParty(foundParty)
      setGuests([...foundParty.guests])
      // Find the highest guest ID to continue from
      const maxId = Math.max(...foundParty.guests.map(g => g.id), 0)
      setNextGuestId(maxId + 1)
    }
  }, [partyId])

  const userName = localStorage.getItem('userName') || 'Unknown'

  // Calculate GCD to reduce fraction
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b)

  const getReducedRatio = () => {
    const male = guests.filter(g => g.gender === 'male').length
    const female = guests.filter(g => g.gender === 'female').length
    if (male === 0 && female === 0) return '0:0'
    if (male === 0) return `0:${female}`
    if (female === 0) return `${male}:0`
    const divisor = gcd(male, female)
    return `${male / divisor}:${female / divisor}`
  }

  const handleAddMale = (e) => {
    e.preventDefault()
    if (maleName.trim()) {
      const newGuest = {
        id: nextGuestId,
        name: maleName.trim(),
        gender: 'male',
        addedBy: userName
      }
      setGuests([...guests, newGuest])
      setMaleName('')
      setNextGuestId(nextGuestId + 1)
      maleInputRef.current?.focus()
    }
  }

  const handleAddFemale = (e) => {
    e.preventDefault()
    if (femaleName.trim()) {
      const newGuest = {
        id: nextGuestId,
        name: femaleName.trim(),
        gender: 'female',
        addedBy: userName
      }
      setGuests([...guests, newGuest])
      setFemaleName('')
      setNextGuestId(nextGuestId + 1)
      femaleInputRef.current?.focus()
    }
  }

  const handleMaleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddMale(e)
    }
  }

  const handleFemaleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddFemale(e)
    }
  }

  // Filter guests for check-in search
  const getMatchingGuests = () => {
    if (!checkInSearch.trim()) return []
    const searchLower = checkInSearch.toLowerCase().trim()
    return guests
      .filter(guest => 
        guest.name.toLowerCase().includes(searchLower) &&
        !checkedInGuests.has(guest.id)
      )
      .slice(0, 5) // Limit to 5 suggestions
  }

  const matchingGuests = getMatchingGuests()

  const handleCheckIn = (guestId) => {
    setCheckedInGuests(new Set([...checkedInGuests, guestId]))
    setCheckInSearch('')
    setShowSuggestions(false)
    checkInInputRef.current?.focus()
  }

  const handleCheckInKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false)
    } else if (e.key === 'Enter' && matchingGuests.length === 1) {
      e.preventDefault()
      handleCheckIn(matchingGuests[0].id)
    }
  }

  const handleExportCSV = () => {
    // Create CSV headers
    const headers = ['#', 'Name', 'Gender', 'Added By', 'Checked In']
    
    // Create CSV rows
    const rows = guests.map((guest, index) => {
      const checkedIn = checkedInGuests.has(guest.id) ? 'Yes' : 'No'
      return [
        index + 1,
        guest.name,
        guest.gender,
        guest.addedBy || 'Unknown',
        checkedIn
      ]
    })
    
    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n')
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${party.name.replace(/[^a-z0-9]/gi, '_')}_guest_list.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!party) {
    return (
      <div className="min-h-screen bg-gray-500 p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Party not found</h1>
          <Button onClick={() => navigate('/parties')} variant="outline">
            ← Back to Party List
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-500 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button onClick={() => navigate('/parties')} variant="outline" className="mb-4">
            ← Back to Party List
          </Button>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl">{party.name}</CardTitle>
                  <CardDescription>
                    Year: {party.year} • {guests.length} Total Guests
                    {checkedInGuests.size > 0 && (
                      <span className="ml-2">
                        • Checked In: {checkedInGuests.size} ({(() => {
                          const checkedIn = guests.filter(g => checkedInGuests.has(g.id))
                          const males = checkedIn.filter(g => g.gender === 'male').length
                          const females = checkedIn.filter(g => g.gender === 'female').length
                          return `${males}M ${females}F`
                        })()})
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={handleExportCSV}
                  >
                    Export to CSV
                  </Button>
                  <Button 
                    onClick={() => navigate(`/parties/${partyId}/dashboard`, { 
                      state: { party, guests, checkedInGuests: Array.from(checkedInGuests) }
                    })}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Guests</CardTitle>
            <CardDescription>Quickly add male and female guests to the party</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form onSubmit={handleAddMale} className="flex gap-2">
                <Input
                  ref={maleInputRef}
                  type="text"
                  placeholder="Enter male guest name"
                  value={maleName}
                  onChange={(e) => setMaleName(e.target.value)}
                  onKeyPress={handleMaleKeyPress}
                  className="flex-1"
                />
                <Button type="submit" disabled={!maleName.trim()}>
                  Add Male
                </Button>
              </form>
              <form onSubmit={handleAddFemale} className="flex gap-2">
                <Input
                  ref={femaleInputRef}
                  type="text"
                  placeholder="Enter female guest name"
                  value={femaleName}
                  onChange={(e) => setFemaleName(e.target.value)}
                  onKeyPress={handleFemaleKeyPress}
                  className="flex-1"
                />
                <Button type="submit" disabled={!femaleName.trim()}>
                  Add Female
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Check In Guests</CardTitle>
            <CardDescription>Search for a guest name to mark them as checked in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Input
                ref={checkInInputRef}
                type="text"
                placeholder="Type guest name to check in..."
                value={checkInSearch}
                onChange={(e) => {
                  setCheckInSearch(e.target.value)
                  setShowSuggestions(true)
                }}
                onKeyDown={handleCheckInKeyDown}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full"
              />
              {showSuggestions && matchingGuests.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                  {matchingGuests.map((guest) => (
                    <button
                      key={guest.id}
                      type="button"
                      onClick={() => handleCheckIn(guest.id)}
                      className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <div className="font-medium">{guest.name}</div>
                      <div className="text-sm text-muted-foreground capitalize">{guest.gender}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Guest List • {getReducedRatio()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Added By</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guests.map((guest, index) => (
                  <TableRow key={guest.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{guest.name}</TableCell>
                    <TableCell className="capitalize">{guest.gender}</TableCell>
                    <TableCell>{guest.addedBy || 'Unknown'}</TableCell>
                    <TableCell>
                      {checkedInGuests.has(guest.id) && (
                        <div className="flex items-center gap-1 text-green-600">
                          <Check className="h-4 w-4" />
                          <span className="text-sm">Checked In</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

