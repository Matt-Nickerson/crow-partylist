// Mock data for parties and guests
export const mockParties = [
  {
    id: 1,
    name: "New Year's Eve Bash",
    year: 2024,
    guests: [
      { id: 1, name: "Alice Johnson", gender: "female" },
      { id: 2, name: "Bob Smith", gender: "male" },
      { id: 3, name: "Charlie Brown", gender: "male" },
      { id: 4, name: "Diana Prince", gender: "female" },
      { id: 5, name: "Eve Wilson", gender: "female" },
      { id: 6, name: "Frank Miller", gender: "male" },
    ],
  },
  {
    id: 2,
    name: "Summer Pool Party",
    year: 2024,
    guests: [
      { id: 7, name: "Grace Lee", gender: "female" },
      { id: 8, name: "Henry Davis", gender: "male" },
      { id: 9, name: "Ivy Chen", gender: "female" },
      { id: 10, name: "Jack Taylor", gender: "male" },
      { id: 11, name: "Kate Martinez", gender: "female" },
      { id: 12, name: "Liam O'Brien", gender: "male" },
      { id: 13, name: "Mia Anderson", gender: "female" },
      { id: 14, name: "Noah White", gender: "male" },
    ],
  },
  {
    id: 3,
    name: "Halloween Costume Party",
    year: 2023,
    guests: [
      { id: 15, name: "Olivia Green", gender: "female" },
      { id: 16, name: "Paul Harris", gender: "male" },
      { id: 17, name: "Quinn Jackson", gender: "female" },
      { id: 18, name: "Ryan Clark", gender: "male" },
      { id: 19, name: "Sophia Lewis", gender: "female" },
    ],
  },
  {
    id: 4,
    name: "Birthday Celebration",
    year: 2024,
    guests: [
      { id: 20, name: "Thomas Walker", gender: "male" },
      { id: 21, name: "Uma Patel", gender: "female" },
      { id: 22, name: "Victor Young", gender: "male" },
      { id: 23, name: "Wendy King", gender: "female" },
      { id: 24, name: "Xavier Wright", gender: "male" },
      { id: 25, name: "Yara Lopez", gender: "female" },
      { id: 26, name: "Zachary Hill", gender: "male" },
      { id: 27, name: "Amy Scott", gender: "female" },
      { id: 28, name: "Ben Adams", gender: "male" },
    ],
  },
  {
    id: 5,
    name: "Graduation Party",
    year: 2023,
    guests: [
      { id: 29, name: "Carla Baker", gender: "female" },
      { id: 30, name: "David Nelson", gender: "male" },
      { id: 31, name: "Emma Carter", gender: "female" },
      { id: 32, name: "Felix Mitchell", gender: "male" },
    ],
  },
  {
    id: 6,
    name: "Anniversary Gala",
    year: 2024,
    guests: [
      { id: 33, name: "Gina Roberts", gender: "female" },
      { id: 34, name: "Hugo Turner", gender: "male" },
      { id: 35, name: "Isabel Phillips", gender: "female" },
      { id: 36, name: "Jake Campbell", gender: "male" },
      { id: 37, name: "Kara Parker", gender: "female" },
      { id: 38, name: "Leo Evans", gender: "male" },
      { id: 39, name: "Maya Collins", gender: "female" },
      { id: 40, name: "Nate Edwards", gender: "male" },
      { id: 41, name: "Opal Stewart", gender: "female" },
      { id: 42, name: "Peter Sanchez", gender: "male" },
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

