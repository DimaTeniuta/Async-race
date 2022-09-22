function showRulesInConsole() {
  const rules = <string>(`
  Rules: \n
  1. Two or more cars can take part in the race. (create more cars) \n
  2. Until the end of the race, you're just a spectator. (wait for the end of the race and click a RACE button) \n
  3. During a single race, you can control only the engine. (click a 'B' button, to return the car to the start) \n
  4. When creating a machine without a name, the name and color will be generated automatically. \n
  `);
  console.log(rules);
}

export default showRulesInConsole;
