import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Trophy, Users } from "lucide-react"

const pastContests = [
  {
    id: 1,
    title: "Weekly Contest 342",
    date: "2023-05-21",
    participants: 15200,
    winner: "codemaster99",
  },
  {
    id: 2,
    title: "Biweekly Contest 104",
    date: "2023-05-27",
    participants: 10800,
    winner: "algoqueen",
  },
  {
    id: 3,
    title: "Monthly Premium Contest 5",
    date: "2023-05-13",
    participants: 6100,
    winner: "leetcodechamp",
  },
]

export default function PastContests() {
  return (
    <div className="space-y-6">
      {pastContests.map((contest) => (
        <Card key={contest.id}>
          <CardHeader>
            <CardTitle>{contest.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span>{contest.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-500" />
                <span>{contest.participants} participants</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-gray-500" />
                <span>Winner: {contest.winner}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View Results</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

