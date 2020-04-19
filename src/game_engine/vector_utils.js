import Victor from "victor";

export const vectorFrom2Points = (p1, p2) => {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
};

export const magnitude = (point) =>
  Math.sqrt(point.x * point.x + point.y * point.y);
export const normalize = (point) => {
  const normalized = new Victor(point.x, point.y).normalize();
  return { x: normalized.x, y: normalized.y };
};

export const scale = (vec, factor) => ({
  x: vec.x * factor,
  y: vec.y * factor,
});
export const add = (vec1, vec2) => ({ x: vec1.x + vec2.x, y: vec1.y + vec2.y });
export const subtract = (vec1, vec2) => ({
  x: vec1.x - vec2.x,
  y: vec1.y - vec2.y,
});
