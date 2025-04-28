import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionProblem from "./QuestionProblem";
import QuestionEditorial from "./QuestionEditorial";
import QuestionSubmissions from "./QuestionSubmissions";
import QuestionSolutions from "./QuestionSolutions";
import { FlaskConical } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TabBar = ({ problem }: { problem: any }) => {
  return (
    <div>
      <Tabs defaultValue="problem">
        <TabsList className="w-full justify-evenly">
          <TabsTrigger className="flex-1" value="problem">
            Description
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="editorial">
            Editorial
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="solutions">
            <FlaskConical /> Solutions
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="submissions">
            Submission
          </TabsTrigger>
        </TabsList>
        <TabsContent value="problem">
          <QuestionProblem problem={problem} />
        </TabsContent>
        <TabsContent value="editorial">
          <QuestionEditorial editorial={problem.editorial} />
        </TabsContent>
        <TabsContent value="solutions">
          <QuestionSolutions/>
        </TabsContent>
        <TabsContent value="submissions">
          <QuestionSubmissions Id={problem.Id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabBar;
