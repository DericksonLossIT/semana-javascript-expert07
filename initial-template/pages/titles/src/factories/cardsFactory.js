import CardsController from "./../controllers/cardsController.js";
import CardsView from "./../views/cardsView.js";
import CardsService from "./../services/cardsService.js";
import path from "node:path";

const cardListWorker = new Worker(
  `${path.resolve(`../workers/cardListWorker.js`)}`,
  {
    type: "module",
  }
);
cardListWorker.onmessage = (msg) => {
  console.log("processo principal", msg);
};
cardListWorker.postMessage("Hey hello!");
const [rootPath] = window.location.href.split("/pages/");
const factory = {
  async initialize() {
    return CardsController.initialize({
      worker: cardListWorker,
      view: new CardsView(),
      service: new CardsService({ dbUrl: `${rootPath}/assets/database.json` }),
    });
  },
};

export default factory;
