import shipCoordinates from "./shipCoordinates";

test.skip("Test coordinate attribution, size one", () => {
  const freeCells = [1, 2, 3, 4];
  const size = 1;
  expect(shipCoordinates().coordinator(size, freeCells)).toEqual(size);
});

test.skip("Test coordinate, size one, unordered", () => {
  const freeCells = [2, 4, 3, 1];
  const size = 1;
  expect(shipCoordinates().coordinator(size, freeCells)).toEqual(size);
});

test("Test coordinate attribution, size two", () => {
  const freeCells = [1, 2, 3, 4];
  const size = 2;
  expect(shipCoordinates().coordinator(size, freeCells)).toEqual(size);
});

test("Test coordinate attribution, size four", () => {
  const freeCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const size = 4;
  expect(shipCoordinates().coordinator(size, freeCells)).toEqual(size);
});
