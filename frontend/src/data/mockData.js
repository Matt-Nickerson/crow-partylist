// Mock data for parties and guests
export const mockParties = [
  {
    id: 1,
    name: "New Year's Eve Bash",
    date: "2024-12-31",
    year: 2024,
    guests: [
      { id: 1, name: "Alice Johnson", gender: "female", addedBy: "System" },
      { id: 2, name: "Bob Smith", gender: "male", addedBy: "System" },
      { id: 3, name: "Charlie Brown", gender: "male", addedBy: "System" },
      { id: 4, name: "Diana Prince", gender: "female", addedBy: "System" },
      { id: 5, name: "Eve Wilson", gender: "female", addedBy: "System" },
      { id: 6, name: "Frank Miller", gender: "male", addedBy: "System" },
    ],
  },
  {
    id: 2,
    name: "Summer Pool Party",
    date: "2024-07-15",
    year: 2024,
    guests: [
      { id: 7, name: "Grace Lee", gender: "female", addedBy: "System" },
      { id: 8, name: "Henry Davis", gender: "male", addedBy: "System" },
      { id: 9, name: "Ivy Chen", gender: "female", addedBy: "System" },
      { id: 10, name: "Jack Taylor", gender: "male", addedBy: "System" },
      { id: 11, name: "Kate Martinez", gender: "female", addedBy: "System" },
      { id: 12, name: "Liam O'Brien", gender: "male", addedBy: "System" },
      { id: 13, name: "Mia Anderson", gender: "female", addedBy: "System" },
      { id: 14, name: "Noah White", gender: "male", addedBy: "System" },
    ],
  },
  {
    id: 3,
    name: "Halloween Costume Party",
    date: "2023-10-31",
    year: 2023,
    guests: [
      { id: 15, name: "Olivia Green", gender: "female", addedBy: "System" },
      { id: 16, name: "Paul Harris", gender: "male", addedBy: "System" },
      { id: 17, name: "Quinn Jackson", gender: "female", addedBy: "System" },
      { id: 18, name: "Ryan Clark", gender: "male", addedBy: "System" },
      { id: 19, name: "Sophia Lewis", gender: "female", addedBy: "System" },
    ],
  },
  {
    id: 4,
    name: "Birthday Celebration",
    date: "2024-05-20",
    year: 2024,
    guests: [
      { id: 20, name: "Thomas Walker", gender: "male", addedBy: "System" },
      { id: 21, name: "Uma Patel", gender: "female", addedBy: "System" },
      { id: 22, name: "Victor Young", gender: "male", addedBy: "System" },
      { id: 23, name: "Wendy King", gender: "female", addedBy: "System" },
      { id: 24, name: "Xavier Wright", gender: "male", addedBy: "System" },
      { id: 25, name: "Yara Lopez", gender: "female", addedBy: "System" },
      { id: 26, name: "Zachary Hill", gender: "male", addedBy: "System" },
      { id: 27, name: "Amy Scott", gender: "female", addedBy: "System" },
      { id: 28, name: "Ben Adams", gender: "male", addedBy: "System" },
    ],
  },
  {
    id: 5,
    name: "Graduation Party",
    date: "2023-06-10",
    year: 2023,
    guests: [
      { id: 29, name: "Carla Baker", gender: "female", addedBy: "System" },
      { id: 30, name: "David Nelson", gender: "male", addedBy: "System" },
      { id: 31, name: "Emma Carter", gender: "female", addedBy: "System" },
      { id: 32, name: "Felix Mitchell", gender: "male", addedBy: "System" },
    ],
  },
  {
    id: 6,
    name: "Anniversary Gala",
    date: "2024-09-22",
    year: 2024,
    guests: [
      { id: 33, name: "Gina Roberts", gender: "female", addedBy: "System" },
      { id: 34, name: "Hugo Turner", gender: "male", addedBy: "System" },
      { id: 35, name: "Isabel Phillips", gender: "female", addedBy: "System" },
      { id: 36, name: "Jake Campbell", gender: "male", addedBy: "System" },
      { id: 37, name: "Kara Parker", gender: "female", addedBy: "System" },
      { id: 38, name: "Leo Evans", gender: "male", addedBy: "System" },
      { id: 39, name: "Maya Collins", gender: "female", addedBy: "System" },
      { id: 40, name: "Nate Edwards", gender: "male", addedBy: "System" },
      { id: 41, name: "Opal Stewart", gender: "female", addedBy: "System" },
      { id: 42, name: "Peter Sanchez", gender: "male", addedBy: "System" },
    ],
  },
]

export function getPartyStats(party) {
  const total = party.guests.length
  const male = party.guests.filter((g) => g.gender === "male").length
  const female = party.guests.filter((g) => g.gender === "female").length
  const ratio = total > 0 ? `${male}:${female}` : "0:0"
  return { total, male, female, ratio }
}

export function getPartyById(id) {
  return mockParties.find((party) => party.id === parseInt(id))
}

