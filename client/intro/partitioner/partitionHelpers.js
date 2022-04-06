export function findSet(eObj, start) {

    // take a copy of the original array so we don't modify the order when sorting
    const est = eObj.slice(0).sort((a, b) => a.estimate > b.estimate ? 1 : -1)
    console.log(est)
    // const med = median(x);
  
  
    // generate array of indexes to get extract the high low estimates
    // big refers to the bigger proportion (i.e. 15 of 20 group estimates)
    // small the smaller proportion (i.e. 5 of 20)
    const big1 = makeArray(5, (i) => {
      return (i * 2) + 1 + start;
    });
  
    const big2 = makeArray(10, (i) => {
      return (i + start + 10)
    });
  
    const big = big1.concat(big2);
  
    const small = makeArray(5, (i) => {
      return (i * 2) + start;
    });
  
    // split sample into values above/below median
    const below = est.filter((i, index) => index < eObj.length / 2).reverse();
    const above = est.filter((i, index) => index >= eObj.length / 2);
  
    // map the big/small indexes to values from the below/above arrays and join to make low and high phi groups
  
    const low = big.map(i => below[i]).concat(small.map(i => above[i]))
    const high = big.map(i => above[i]).concat(small.map(i => below[i]))

    console.log(low)
    console.log(high)
  
    // map the indexes of the current group to the original list and store in the groupId field
    low.map(x => eObj.find(est => est.playerId === x.playerId).groupId = `low_${start}`)
    high.map(x => eObj.find(est => est.playerId === x.playerId).groupId = `high_${start}`)
  
    console.log(big, small, below, above, low, high)
};


export function makeArray(count, funct) {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(funct(i));
    }
    return result;
};