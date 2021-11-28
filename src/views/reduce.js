let filters = [
  ['size', 20],
  ['color', 'blue'],
  ['size', 40],
  ['color', 'red'],
];
// console.log("filters ",filters)

let reducedFilters = {};
if (filters.length === 1) {
  reducedFilters[filters[0][0]] = [filters[0][1]];
} else {
  filters.reduce((prev, curr, index) => {
    // Initial setup
    if (index === 1) {
      reducedFilters[prev[0]] = [prev[1]];
      if (filters.length === 1) {
        return reducedFilters;
      }
    }
    // If same key, push value to existing key
    if (Object.keys(reducedFilters).includes(curr[0])) {
      reducedFilters[curr[0]].push(curr[1]);
      return reducedFilters;
      //Different keys
    } else {
      reducedFilters[curr[0]] = [curr[1]];
      return reducedFilters;
    }
  });
}

console.log('reducedFilters', reducedFilters);
