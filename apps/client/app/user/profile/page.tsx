import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ConsistencyGraph from "./ConsistencyGraph";

// Dummy stats data
const stats = {
  solved: 235,
  easySolved: 100,
  mediumSolved: 100,
  hardSolved: 35,
  contestRating: 1650,
  ranking: 54321,
};

const Profile = async () => {
  const data = await getServerSession(authOptions);
  if (!data || !data.user) return;
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-6xl mx-auto bg-transparent border-none">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Image
            src={data.user.image || "/placeholder.svg"}
            alt={"Profile"}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl font-bold">{data.user.name}</CardTitle>
            <p className="text-muted-foreground">{data.user.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <StatCard title="Problems Solved" value={stats.solved} />
            <StatCard title="Contest Rating" value={stats.contestRating} />
            <StatCard title="Ranking" value={`#${stats.ranking}`} />
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Solved Problems</h3>
            <div className="flex gap-2">
              <Badge variant="secondary">Easy: {stats.easySolved}</Badge>
              <Badge variant="secondary">Medium: {stats.mediumSolved}</Badge>
              <Badge variant="secondary">Hard: {stats.hardSolved}</Badge>
            </div>
          </div>
          <ConsistencyGraph />
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) => (
  <Card className="bg-transparent">
    <CardContent className="text-center p-4">
      <p className="text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </CardContent>
  </Card>
);
