export interface Problem {
  Id: string;
  acceptancerate: string;
  companies: string[];
  constraints: string[];
  desc: string;
  difficulty: string;
  dislikes: number;
  example: string[];
  likes: number;
  problemdiscussionId: string;
  title: string;
  Submissions: any[];
}

export const Difficulty = {
  MEDIUM: "#FFA116",
  EASY: "#117B6F",
  HARD: "#CC3352",
};
