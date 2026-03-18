import express from "express";
import http from "http";
import { text } from "stream/consumers";
import { WebSocketServer } from "ws";
//create server
const app = express();

const server = http.createServer(app);

const wss = new WebSocketServer({ server });
console.log("WebSocket running on ws://localhost:3000");

const users = new Map();
wss.on("connection", (ws) => {
  ws.send(
    JSON.stringify({
      type: "start",
      value: "welcome from server",
    }),
  );

  //default username
  let username = "Anonymous";

  ws.on("message", (data) => {
    const msg = JSON.parse(data.toString());

    if (msg.type === "join") {
      username = msg.username;
      //save the user in the map
      users.set(username, ws);

      console.log(username + " joined ");

      //send online users to all client when they joined
      let online_users_list = Get_online_users();
      wss.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            type: "online users",
            users: online_users_list,
          }),
        );
      });

      return;
    }
    let fullMsg;
    if (msg.type === "message") {
      fullMsg = `${username}: ${msg.text}`;

      let senderName = "Unknown";
      for (let [name, socket] of users.entries()) {
        if (socket === ws) {
          senderName = name;
          break;
        }
      }

      wss.clients.forEach((client) => {
        if (client.readyState === 1 && client != ws) {
          client.send(
            JSON.stringify({
              type: "message",
              text: msg.text,
              sender: senderName,
            }),
          );
        }
      });
    }

    if (msg.type === "private") {
      const Targeted_user = users.get(msg.to);
      console.log(msg.to);
      if (Targeted_user && Targeted_user.readyState === 1) {
        Targeted_user.send(msg.text);
      }
    }
  });
});

app.get("/", (req, res) => {
  res.send("http and websocket both server are running ");
});

function Get_online_users() {
  const list = [];
  users.forEach((value, key) => {
    list.push(key);
  });
  return list;
}

server.listen(3000, () => {
  console.log("Listening. . .");
});
