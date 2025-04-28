import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const featuredDiscussions = [
  {
    id: 1,
    title: "Weekly Contest 342 Discussion",
    views: 12500,
  },
  {
    id: 2,
    title: "Top Interview Questions",
    views: 45000,
  },
  {
    id: 3,
    title: "System Design Primer",
    views: 32000,
  },
]

export default function FeaturedDiscussions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Featured Discussions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {featuredDiscussions.map((discussion) => (
            <li key={discussion.id} className="flex justify-between items-center">
              <span className="text-sm font-medium">{discussion.title}</span>
              <span className="text-xs text-gray-500">{discussion.views} views</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

