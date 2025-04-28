import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Users, Star, TrendingUp } from "lucide-react"

export default function ContestStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contest Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <div>
            <p className="text-2xl font-bold">342</p>
            <p className="text-sm text-gray-500">Total Contests</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Users className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-2xl font-bold">1,234,567</p>
            <p className="text-sm text-gray-500">Total Participants</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Star className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-2xl font-bold">4.8/5</p>
            <p className="text-sm text-gray-500">Average Rating</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <TrendingUp className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-2xl font-bold">+15%</p>
            <p className="text-sm text-gray-500">Participation Growth</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

