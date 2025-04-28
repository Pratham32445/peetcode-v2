import fs from "fs";
import path from "path";

export function createRootDir(rootPath: string) {
  if (!fs.existsSync(rootPath)) {
    fs.mkdirSync(rootPath, { recursive: true });
  }
  return rootPath;
}

export const createDir = (dirPath: string) => {
  try {
    if (fs.existsSync(dirPath)) return;
    fs.mkdirSync(dirPath);
  } catch (error) {
    console.log(error);
  }
};

export const generateFile = (filePath: string, fileContent: string) => {
  try {
    if (!fs.existsSync(path.dirname(filePath))) return;
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) return false;
      return true;
    });
  } catch (error) {
    console.log(error);
  }
};
