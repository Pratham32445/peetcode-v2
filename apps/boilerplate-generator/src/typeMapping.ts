export const mappingToTs = (type: string): string => {
  switch (type) {
    case "int":
      return "number";
    case "bool":
      return "boolean";
    default:
      return "unknown";
  }
};
