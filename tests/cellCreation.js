const analyzeArray = (array) => {
  const getAverage = (array) => {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      result = result + element;
    }
    return (result = result / array.length);
  };
  const getMin = (array) => {
    array = array.sort();
    return array[0];
  };
  const getMax = (array) => {
    array = array.sort();
    array = array.reverse();
    return array[0];
  };
  const getLength = (array) => {
    return array.length;
  };
  return {
    average: getAverage(array),
    min: getMin(array),
    max: getMax(array),
    length: getLength(array),
  };
};

export default analyzeArray;
