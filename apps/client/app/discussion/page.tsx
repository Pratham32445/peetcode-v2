import DiscussionList from "@/components/Discussion/DiscussionList";
import FeaturedDiscussions from "@/components/Discussion/FeaturedDiscussion";
import SearchBar from "@/components/Discussion/SearchBar";
import TopicSelector from "@/components/Discussion/TopicSelector";
import { FlameKindling } from "lucide-react";
import Link from "next/link";

export default function DiscussionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-lightBg">
      <Link href="/problems" className="flex-1 flex items-center gap-3">
        <FlameKindling color="#FFA116" />
        <p className="text-white text-2xl">PeetCode Discussion</p>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-[50px]">
        <div className="md:col-span-2">
          <SearchBar />
          <TopicSelector />
          <DiscussionList />
        </div>
        <div>
          <FeaturedDiscussions />
        </div>
      </div>
    </div>
  );
}
