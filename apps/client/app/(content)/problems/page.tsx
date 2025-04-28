import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookOpenCheck, CircleCheckBig } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { Difficulty } from "@/types";
import SolvedProblem from "./SolvedProblem";

interface Problem {
  Id: string;
  title: string;
  difficulty: string;
  acceptancerate: string | null;
}

export const dynamic = "force-dynamic";

const getProblems = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/problem`);
    return data.problems || [];
  } catch (error) {
    console.error("Error fetching problems:", error);
    return [];
  }
};

const Problems = async () => {
  const problems = await getProblems();
  return (
    <div className="w-full min-h-full p-5 flex">
      <div className="w-3/4 px-10 py-4">
        <Table className="w-full overflow-hidden">
          <TableHeader className="pb-5">
            <TableRow>
              <TableHead className="w-[100px] text-lg">Status</TableHead>
              <TableHead className="w-[200px] text-lg">Title</TableHead>
              <TableHead className="w-[100px] text-lg">Solution</TableHead>
              <TableHead className="w-[100px] text-lg">Acceptance</TableHead>
              <TableHead className="w-[100px] text-lg">Difficulty</TableHead>
              <TableHead className="w-[100px] text-lg">Frequency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems &&
              problems.map((problem: Problem) => (
                <TableRow key={problem.Id} className="cursor-pointer">
                  <TableCell className="font-medium">
                    <CircleCheckBig className="text-bgSucess" />
                  </TableCell>
                  <TableCell>
                    <Link href={`/problem/${problem.Id}`}>
                      <p className="capitalize hover:text-blue-800">
                        {problem.title.length < 30
                          ? problem.title
                          : problem.title.slice(0, 30) + "..."}
                      </p>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <BookOpenCheck />
                  </TableCell>
                  <TableCell>
                    <p className="capitalize">
                      {problem.acceptancerate ? problem.acceptancerate : "100%"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p
                      className="capitalize"
                      style={{
                        color:
                          Difficulty[
                            problem.difficulty as keyof typeof Difficulty
                          ],
                      }}
                    >
                      {problem.difficulty}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="capitalize">{problem.acceptancerate}</p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </div>
      <div>
        <SolvedProblem />
      </div>
    </div>
  );
};

export default Problems;
