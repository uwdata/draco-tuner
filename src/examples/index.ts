export const SCATTER: string = `% ====== Data definitions ======
data("cars.json").
num_rows(142).

fieldtype(horsepower,number).
cardinality(horsepower,94).

fieldtype(acceleration,number).
cardinality(acceleration,96).

% ====== Query constraints ======
encoding(e0).
:- not field(e0,acceleration).

encoding(e1).
:- not field(e1,horsepower).
`;

export const VL_HISTOGRAM: string = `{
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
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
