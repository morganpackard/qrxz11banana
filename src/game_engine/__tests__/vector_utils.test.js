import { diff, distance, normalize } from "../vector_utils";

test("diff", () => {
  const A = { x: 1, y: 2 };
  const B = { x: 3, y: 7 };

  const diffed = diff(A, B);

  expect(diffed).toEqual({ x: -2, y: -5 });
});

test("distance", () => {
  const A = { x: 0, y: 0 };
  const B = { x: 3, y: 4 };

  expect(distance(A, B)).toBe(5);
});
