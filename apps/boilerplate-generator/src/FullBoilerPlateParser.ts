export class FullBoilerPlateParser {
  problemName: string = "";
  functionName: string = "";
  Inputs: { type: string; name: string }[] = [];
  Outputs: { type: string; name: string }[] = [];
  parse(structure: string) {
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
  generateCpp(): string {
    // Declare input variables with correct types
    const inputsDeclaration = this.Inputs.map(
      (field) => `    ${field.type} ${field.name};`
    ).join("\n");

    // Generate input reading logic for each field
    const inputReads = this.Inputs.map((field) => {
      if (field.type.startsWith("vector<")) {
        const elementType = field.type.match(/vector<(\w+)>/)?.[1] || "int";
        return `
      int size_${field.name};
      cin >> size_${field.name};
      ${field.type} ${field.name}(size_${field.name});
      for (int i = 0; i < size_${field.name}; ++i) {
          cin >> ${field.name}[i];
      }
        `.trim();
      } else {
        return `cin >> ${field.name};`.trim();
      }
    }).join("\n\n");

    // Determine output type
    const outputType = this.Outputs[0]?.type || "void";
    const functionCall = `${outputType} result = ${this.functionName}(${this.Inputs.map((input) => input.name).join(", ")});`;

    // Output result to console
    const outputWrite = `cout << result << endl;`;

    return `  
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>  // For algorithms like sort(), etc.
#include <cmath>      // For mathematical functions like sqrt(), pow(), etc.
#include <limits>     // For numeric limits like INT_MAX, etc.
using namespace std;

   ## CODE_HERE ##
  
  int main() {
      // Declare input variables
  ${inputsDeclaration}
  
      // Read inputs
  ${inputReads}
  
      // Call the function
  ${functionCall}
  
      // Output the result
  ${outputWrite}
  
      return 0;
  }
    `.trim();
  }
}
