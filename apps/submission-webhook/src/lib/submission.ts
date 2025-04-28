export const calculateTimeMemory = (testcases: any[]) => {
  let time = 0;
  let memory = 0;
  testcases.forEach((testcase) => {
    time += parseFloat(testcase.time);
    memory += testcase.memory;
  });
  return [time, memory];
};
