import analyzeArray from "./cellCreation";

test.skip("test one array", () => {
  const arrayTested = [1, 8, 3, 4, 2, 6];
  const object = analyzeArray(arrayTested);
  console.log(object);
  expect(object).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});
