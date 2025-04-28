import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingContests from "@/components/contests/UpcomingContests";
import PastContests from "@/components/contests/PastContests";
import ContestStats from "@/components/contests/ContestStats";

export default function ContestsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Peetcode Contests</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Contests</TabsTrigger>
              <TabsTrigger value="past">Past Contests</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <UpcomingContests />
            </TabsContent>
            <TabsContent value="past">
              <PastContests />
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <ContestStats />
        </div>
      </div>
    </div>
  );
}
