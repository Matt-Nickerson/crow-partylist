import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function PartyDetail({ party, onBack }) {
  if (!party) return null

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" className="mb-4">
            ← Back to Party List
          </Button>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{party.name}</CardTitle>
              <CardDescription>Year: {party.year} • {party.guests.length} Total Guests</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Guest List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {party.guests.map((guest, index) => (
                  <TableRow key={guest.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{guest.name}</TableCell>
                    <TableCell className="capitalize">{guest.gender}</TableCell>
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

