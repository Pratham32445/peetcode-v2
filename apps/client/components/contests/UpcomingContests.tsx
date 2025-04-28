import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Users } from "lucide-react";

const upcomingContests = [
  {
    id: 1,
    title: "Weekly Contest 343",
    date: "2023-05-28",
    time: "09:30 AM UTC",
    duration: "1 hour 30 minutes",
    participants: 12500,
  },
  {
    id: 2,
    title: "Biweekly Contest 105",
    date: "2023-06-03",
    time: "02:30 PM UTC",
    duration: "1 hour 30 minutes",
    participants: 8700,
  },
  {
    id: 3,
    title: "Monthly Premium Contest 6",
    date: "2023-06-10",
    time: "10:00 AM UTC",
    duration: "2 hours",
    participants: 5200,
  },
];

export default function UpcomingContests() {
  return (
    <div className="space-y-6">
      {upcomingContests.map((contest) => (
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
                <Clock className="w-5 h-5 text-gray-500" />
                <span>{contest.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span>{contest.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-500" />
                <span>{contest.participants} participants</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Register Now</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
