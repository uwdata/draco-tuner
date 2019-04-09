import Draco, { Options } from "draco-vis"; // tslint:disable-line
import { vega } from "vega-embed";

const cars = require("../data/cars.json");
const barley = require("../data/barley.json");

export const datasets = {
  "cars.json": cars,
  "barley.json": barley
};

const ctx: Worker = self as any;

const dracoOptions: Options = {
  models: 7
};

const draco = new Draco(status => {}, "static");
let prevProgram = "";
let dataInfo = {
  url: null,
  data: null
};

const loader = vega.loader();
const originalHttp = loader.http;
loader.http = (url, options) => {
  console.debug("Request for", url);

  if (url in datasets) {
    // @ts-ignore
    return datasets[url];
  }
  return originalHttp.bind(loader)(url, options);
};
