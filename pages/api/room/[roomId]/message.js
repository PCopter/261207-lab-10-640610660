import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const id = req.query.roomId;
    const roomIdx = rooms.findIndex((x) => x.roomId === id);
    if (roomIdx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    }
    return res.json({
      ok: true,
      messages: rooms[roomIdx].messages,
    });
  } else if (req.method === "POST") {
    const rooms = readDB();
    const id = req.query.roomId;
    const roomIdx = rooms.findIndex((x) => x.roomId === id);
    if (roomIdx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    }

    //read request body
    const text = req.body.text;
    if (typeof text !== "string" || text.length === 0) {
      return res.status(400).json({ ok: false, message: "Invalid text input" });
    }

    //create new id
    const newId = uuidv4();
    const message = {
      messageId: newId,
      text: text,
    };
    rooms[roomIdx].messages.push(message);
    writeDB(rooms);
    return res.json({
      ok: true,
      message: message,
    });
  }
}
