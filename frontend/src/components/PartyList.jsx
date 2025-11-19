import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockParties, getPartyStats } from '@/data/mockData'

export default function PartyList() {
  const navigate = useNavigate()

  // Sort parties by date (newest first)
  const sortedParties = useMemo(() => {
    return [...mockParties].sort((a, b) => {
      const dateA = new Date(a.date || `${a.year}-01-01`)
      const dateB = new Date(b.date || `${b.year}-01-01`)
      return dateB - dateA // Newest first
    })
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-gray-500 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Party Lists</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedParties.map((party) => {
            const stats = getPartyStats(party)
            return (
              <Card
                key={party.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/parties/${party.id}`)}
              >
                <CardHeader>
                  <CardTitle>{party.name}</CardTitle>
                  <CardDescription>{formatDate(party.date)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Guests:</span>
                      <span className="font-semibold">{stats.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Male:</span>
                      <span className="font-semibold">{stats.male}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Female:</span>
                      <span className="font-semibold">{stats.female}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-sm text-muted-foreground">Ratio (M:F):</span>
                      <span className="font-semibold">{stats.ratio}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

