export const SCATTER: string = `data("cars.json").

encoding(e0).
:- not field(e0,"acceleration").

encoding(e1).
:- not field(e1,"horsepower").
`;

export const VL_HISTOGRAM: string = `{
  "data": {"url": "cars.json"},
  "mark": "bar",
  "encoding": {
    "x": {
      "bin": true,
      "field": "horsepower",
      "type": "quantitative"
    },
    "y": {
      "aggregate": "count",
      "type": "quantitative"
    }
  }
}`;
