import { mappingToTs } from "./typeMapping";

export class BoilerPlateParser {
  problemName: string = "";
  functionName: string = "";
  Inputs: { type: string; name: string }[] = [];
  Outputs: { type: string; name: string }[] = [];
  parse(structure: string) {

    
    console.log(structure);
    const lines = structure.split("\n").map((line) => line.trim());

    let currentSection: string | null = null;

    lines.forEach((line) => {
      if (line.startsWith("Problem Name:")) {
        this.problemName = this.extractName(line);
      } else if (line.startsWith("Function Name:")) {
        this.functionName = this.extractFunction(line);
      } else if (line.startsWith("Input Structure:")) {
        currentSection = "Input";
      } else if (line.startsWith("Output Structure:")) {
        currentSection = "Output";
      } else if (line.startsWith("Field:")) {
        if (currentSection == "Input") {
          const field = this.extractField(line);
          if (field) this.Inputs.push(field);
        } else if (currentSection == "Output") {
          const field = this.extractField(line);
          console.log(field);
          if (field) this.Outputs.push(field);
        }
      }
    });
  }
  extractName(line: string): string {
    const match = line.match(/: "(.*)"$/);
    return match ? match[1] : "";
  }
  extractFunction(line: string): string {
    const match = line.match(/: (\w+)$/);
    return match ? match[1] : "";
  }
  extractField(line: string) {
    const match = line.match(/Field: (\w+(?:<\w+>)?) (\w+)$/);
    return match ? { type: match[1], name: match[2] } : null;
  }
  generateCpp() {
    const inputs = this.Inputs.map(
      (input) => `${input.type} ${input.name}`
    ).join(",");
    return `${this.Outputs[0].type} ${this.functionName}(${inputs}) {
      // write From Here\n}`;
  }
  generateJs() {
    const inputs = this.Inputs.map((input) => `${input.name}`).join(",");
    return `function ${this.functionName}(${inputs}) { \n // start writing code here\n}`;
  }
  generateTs() {
    const inputs = this.Inputs.map(
      (input) => `${input.name} : ${mappingToTs(input.type)}`
    ).join(",");
    return `function ${this.functionName}(${inputs}) : ${mappingToTs(this.Outputs[0].type)} { \n // start writing from here \n}`;
  }
}
