import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1585006",
  key: "acccfcdd2d2cffc0d24a",
  secret: "05ca05aff273889acaed",
  cluster: "eu",
  useTLS: true,
});

export const clientPusher = new ClientPusher("acccfcdd2d2cffc0d24a", {
  cluster: "eu",
  forceTLS: true,
});
