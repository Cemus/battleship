import isSunk from "./isSunk";

test.skip("Not sunk 0 hits", () => {
  const hits = 0;
  const length = 2;
  expect(isSunk(hits, length)).toBeFalsy();
});

test.skip("Not sunk 1 hits", () => {
  const hits = 1;
  const length = 2;
  expect(isSunk(hits, length)).toBeFalsy();
});

test.skip("Sunk", () => {
  const hits = 2;
  const length = 2;
  expect(isSunk(hits, length)).toBe(true);
});
