import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowBigUp, MessageSquare } from "lucide-react"

const discussions = [
  {
    id: 1,
    title: "Efficient solution for Two Sum problem",
    author: "coder123",
    votes: 42,
    comments: 15,
    tags: ["Array", "Hash Table", "Easy"],
  },
  {
    id: 2,
    title: "Understanding Dynamic Programming: Fibonacci Sequence",
    author: "dpmaster",
    votes: 78,
    comments: 23,
    tags: ["Dynamic Programming", "Medium"],
  },
  {
    id: 3,
    title: "Optimizing Binary Search Tree traversal",
    author: "treeexpert",
    votes: 31,
    comments: 9,
    tags: ["Binary Tree", "DFS", "Medium"],
  },
]

export default function DiscussionList() {
  return (
    <div className="space-y-4">
      {discussions.map((discussion) => (
        <Card key={discussion.id}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{discussion.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <ArrowBigUp className="w-4 h-4 text-gray-500" />
                  <span>{discussion.votes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span>{discussion.comments}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                {discussion.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Posted by {discussion.author}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

