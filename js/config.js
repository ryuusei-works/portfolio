export const MUSEUM_SIZE = Object.freeze({ width: 2100, height: 1500 });

export const PLAYER_CONFIG = Object.freeze({
  startX: 1050,
  startY: 1350,
  width: 34,
  height: 42,
  speed: 250,
});

export const EXHIBIT_SIZE = Object.freeze({ width: 290, height: 220 });
export const INTERACTION_DISTANCE = 205;

export const WALLS = Object.freeze([
  // Outer walls
  { x: 0, y: 0, width: 2100, height: 36 },
  { x: 0, y: 1464, width: 2100, height: 36 },
  { x: 0, y: 0, width: 36, height: 1500 },
  { x: 2064, y: 0, width: 36, height: 1500 },

  // Main gallery / lower rooms, with three doorways
  { x: 36, y: 820, width: 290, height: 28 },
  { x: 466, y: 820, width: 504, height: 28 },
  { x: 1130, y: 820, width: 550, height: 28 },
  { x: 1820, y: 820, width: 244, height: 28 },

  // About / entrance divider, with a doorway
  { x: 690, y: 848, width: 28, height: 272 },
  { x: 690, y: 1280, width: 28, height: 184 },

  // Entrance / east wing divider, with a doorway
  { x: 1382, y: 848, width: 28, height: 250 },
  { x: 1382, y: 1240, width: 28, height: 224 },

  // Skills / contact divider, with a doorway
  { x: 1410, y: 1140, width: 300, height: 28 },
  { x: 1840, y: 1140, width: 224, height: 28 },
]);

export const ROOM_TARGETS = Object.freeze({
  entrance: { x: 1050, y: 1340, label: "ENTRANCE" },
  about: { x: 390, y: 1160, label: "ABOUT" },
  works: { x: 1050, y: 520, label: "WORKS" },
  skills: { x: 1700, y: 1010, label: "SKILLS" },
  contact: { x: 1700, y: 1320, label: "CONTACT" },
});

export const getRoomAt = (x, y) => {
  if (y < 834) return "works";
  if (x < 704) return "about";
  if (x < 1396) return "entrance";
  return y < 1154 ? "skills" : "contact";
};
