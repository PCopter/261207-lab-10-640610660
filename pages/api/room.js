import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  const rooms = readDB();

  /*
  for (const room of rooms) {
    result.push({
      roomId: room.roomId,
      roomName: room.roomName,
    });
  }
  */

  const result = rooms.map((x) => ({
    roomId: x.roomId,
    roomName: x.roomName,
  }));

  if (req.method === "GET") {
    return res.json({
      ok: true,
      rooms: result,
    });
  } else if (req.method === "POST") {
  } else if (req.method === "DELETE") {
  }
}
