import { BoilerPlateParser } from "./BoilerPlateParser";
import Redis from "ioredis";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { FullBoilerPlateParser } from "./FullBoilerPlateParser";
import { createDir, createRootDir, generateFile } from "./fs";

dotenv.config();

console.log(process.env.REDIS_URL);

const subscriber = new Redis(process.env.REDIS_URL!);

subscriber.on("connect", () => {
  console.log("connected");
});

const Queue_name = "Push_Problems";

const rootPath = createRootDir(path.join(__dirname, "../../", "problems"));

const generateBoilerPlate = (structure: string) => {
  const parser = new BoilerPlateParser();
  parser.parse(structure);

  const CppCode = parser.generateCpp();
  const JsCode = parser.generateJs();
  const TsCode = parser.generateTs();

  return { CppCode, JsCode, TsCode };
};

const generateFullBoilerPlate = (structure: string) => {
  console.log(structure);
  const parser = new FullBoilerPlateParser();
  parser.parse(structure);

  const fullCppCode = parser.generateCpp();

  return { fullCppCode };
};

const getQuestionName = (input: string) => {
  return input.split(" ").join("-");
};

async function main() {
  while (1) {
    const res = await subscriber.brpop(Queue_name, 0);
    if (!res) return;
    const parsedData = JSON.parse(res[1]);
    const { CppCode, JsCode, TsCode } = generateBoilerPlate(
      parsedData.structure
    );
    const { fullCppCode } = generateFullBoilerPlate(parsedData.structure);

    const questionName = getQuestionName(parsedData.title);
    const questionDirPath = path.join(rootPath, questionName);
    if (!fs.existsSync(questionDirPath)) createDir(questionDirPath);

    const partialBoilerPlatePath = path.join(questionDirPath, "boilerplate");
    if (!fs.existsSync(partialBoilerPlatePath))
      createDir(partialBoilerPlatePath);

    // partial cpp code
    generateFile(path.join(partialBoilerPlatePath, "function.cpp"), CppCode);
    generateFile(path.join(partialBoilerPlatePath, "function.js"), JsCode);
    generateFile(path.join(partialBoilerPlatePath, "function.ts"), TsCode);

    // strcture.md file
    const filePath = path.join(questionDirPath, "Structure.md");
    generateFile(filePath, parsedData.structure);

    const fullBoilerPlateCode = path.join(questionDirPath, "boilerplate-full");
    if (!fs.existsSync(fullBoilerPlateCode)) createDir(fullBoilerPlateCode);
    // full cpp code
    generateFile(path.join(fullBoilerPlateCode, "function.cpp"), fullCppCode);  
  }
}

main();
