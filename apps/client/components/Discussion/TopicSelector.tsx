import { Button } from "@/components/ui/button";

const topics = [
  "All",
  "Algorithms",
  "Database",
  "Shell",
  "Concurrency",
  "JavaScript",
  "Python",
  "Java",
  "C++",
];

export default function TopicSelector() {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {topics.map((topic) => (
        <Button key={topic} variant="outline" size="sm">
          {topic}
        </Button>
      ))}
    </div>
  );
}
