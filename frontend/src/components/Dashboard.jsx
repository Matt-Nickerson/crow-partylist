import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, UserCheck, User, UserX, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const { partyId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get data from navigation state or fallback
  const party = location.state?.party
  const guests = location.state?.guests || []
  const checkedInGuestsIds = new Set(location.state?.checkedInGuests || [])

  if (!party) {
    return (
      <div className="min-h-screen bg-gray-500 p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Party data not found</h1>
          <Button onClick={() => navigate('/parties')} variant="outline">
            ← Back to Party List
          </Button>
        </div>
      </div>
    )
  }

  // Calculate statistics
  const totalGuests = guests.length
  const checkedInCount = checkedInGuestsIds.size
  const notCheckedInCount = totalGuests - checkedInCount
  const checkInRate = totalGuests > 0 ? ((checkedInCount / totalGuests) * 100).toFixed(1) : 0

  // Gender statistics
  const totalMales = guests.filter(g => g.gender === 'male').length
  const totalFemales = guests.filter(g => g.gender === 'female').length
  const checkedInMales = guests.filter(g => checkedInGuestsIds.has(g.id) && g.gender === 'male').length
  const checkedInFemales = guests.filter(g => checkedInGuestsIds.has(g.id) && g.gender === 'female').length
  const notCheckedInMales = totalMales - checkedInMales
  const notCheckedInFemales = totalFemales - checkedInFemales

  // User participation statistics
  const addedByCounts = {}
  guests.forEach(guest => {
    const addedBy = guest.addedBy || 'Unknown'
    addedByCounts[addedBy] = (addedByCounts[addedBy] || 0) + 1
  })
  const userParticipation = Object.entries(addedByCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  // Check-in participation by user
  const checkInByUser = {}
  guests
    .filter(g => checkedInGuestsIds.has(g.id))
    .forEach(guest => {
      const addedBy = guest.addedBy || 'Unknown'
      checkInByUser[addedBy] = (checkInByUser[addedBy] || 0) + 1
    })

  const StatCard = ({ title, value, subtitle, icon: Icon, color = "text-blue-600" }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className={`h-4 w-4 ${color}`} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-500 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Button onClick={() => navigate(`/parties/${partyId}`)} variant="outline" className="mb-4">
            ← Back to Party
          </Button>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{party.name} - Dashboard</CardTitle>
              <CardDescription>
                {party.date ? new Date(party.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : `Year: ${party.year}`}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Overview Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard
            title="Total Guests"
            value={totalGuests}
            subtitle={`${totalMales} male, ${totalFemales} female`}
            icon={Users}
            color="text-blue-600"
          />
          <StatCard
            title="Checked In"
            value={checkedInCount}
            subtitle={`${checkInRate}% check-in rate`}
            icon={UserCheck}
            color="text-green-600"
          />
          <StatCard
            title="Not Checked In"
            value={notCheckedInCount}
            subtitle={`${totalGuests > 0 ? ((notCheckedInCount / totalGuests) * 100).toFixed(1) : 0}% remaining`}
            icon={UserX}
            color="text-orange-600"
          />
          <StatCard
            title="Active Contributors"
            value={userParticipation.length}
            subtitle={`${userParticipation.length} users adding guests`}
            icon={TrendingUp}
            color="text-purple-600"
          />
        </div>

        {/* Check-in Status Breakdown */}
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Check-in Status</CardTitle>
              <CardDescription>Overall attendance tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Checked In</span>
                    <span className="text-sm text-muted-foreground">{checkedInCount} / {totalGuests}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${checkInRate}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Not Checked In</span>
                    <span className="text-sm text-muted-foreground">{notCheckedInCount} / {totalGuests}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full transition-all"
                      style={{ width: `${((notCheckedInCount / totalGuests) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gender Breakdown</CardTitle>
              <CardDescription>Male vs Female statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Males</span>
                    <span className="text-sm text-muted-foreground">{totalMales} total</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${totalGuests > 0 ? (totalMales / totalGuests) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {checkedInMales} checked in, {notCheckedInMales} remaining
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Females</span>
                    <span className="text-sm text-muted-foreground">{totalFemales} total</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-pink-600 h-2 rounded-full transition-all"
                      style={{ width: `${totalGuests > 0 ? (totalFemales / totalGuests) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {checkedInFemales} checked in, {notCheckedInFemales} remaining
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Participation */}
        <Card>
          <CardHeader>
            <CardTitle>User Participation</CardTitle>
            <CardDescription>Who's adding guests and their check-in rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userParticipation.map(({ name, count }) => {
                const checkedIn = checkInByUser[name] || 0
                const checkInRate = count > 0 ? ((checkedIn / count) * 100).toFixed(1) : 0
                return (
                  <div key={name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{name}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {count} guest{count !== 1 ? 's' : ''} added
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {checkedIn} checked in ({checkInRate}%)
                      </div>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${checkInRate}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

