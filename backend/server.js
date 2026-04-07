// ===== IMPORTS =====
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// ===== APP SETUP =====
const app = express();
app.use(cors());
app.use(express.json());

const uri="mongodb://church_db:church_db@ac-gv6yjei-shard-00-00.1n2sw2k.mongodb.net:27017,ac-gv6yjei-shard-00-01.1n2sw2k.mongodb.net:27017,ac-gv6yjei-shard-00-02.1n2sw2k.mongodb.net:27017/?ssl=true&replicaSet=atlas-11v5l2-shard-0&authSource=admin&appName=Cluster0";
// CONNECT MONGODB
mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// SCHEMA
const MessageSchema = new mongoose.Schema({
  id: Number, // 🔥
  community: String,
  user: Object,
  text: String,
  time: Number,
});

const Message = mongoose.model("Message", MessageSchema);

const ParishRecordSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  familyId: { type: String, default: "" },
  date: { type: String, required: true },
}, {
  timestamps: true,
});

const ParishRecord = mongoose.model("ParishRecord", ParishRecordSchema);

// ROUTES
app.get("/messages/:community", async (req, res) => {
  const msgs = await Message.find({
    community: req.params.community,
  }).sort({ time: 1 });

  res.json(msgs);
});

app.get("/records", async (req, res) => {
  try {
    const records = await ParishRecord.find().sort({ date: 1 });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch parish records" });
  }
});

app.post("/records", async (req, res) => {
  try {
    const record = new ParishRecord(req.body);
    const saved = await record.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to save parish record" });
  }
});

// ===== SOCKET.IO SETUP =====
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// ===== SOCKET EVENTS =====
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("sendMessage", async (data) => {
    try {
      const msg = new Message(data);
      await msg.save();

      io.emit("receiveMessage", data);
    } catch (err) {
      console.log("Error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// ===== START SERVER =====
server.listen(5000, () => {
  console.log("Server running on port 5000");
});