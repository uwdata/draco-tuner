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

export const PAIR: string = `transform('swap', 'encoding.x', 'encoding.y');

modification('encoding.x.zero', true);

basespec({
    mark: 'point',
    encoding: { x: q1, y: q2 }
});
basespec({
    mark: 'bar',
    encoding: {
        x: { ...q1, bin: true }, y: q2
    }
});
basespec({
    mark: 'bar',
    encoding: {
        x: o1, y: { q1, aggregate: 'mean' }
    }
});
basespec({
    mark: 'bar',
    encoding: {
        x: n1, y: { q1, aggregate: 'mean' }
    }
});
basespec({
    mark: 'point',
    encoding: {
        x: o1, y: { q1, bin: true }
    }
});
basespec({
    mark: 'point',
    encoding: {
        x: n1, y: o1
    }
});`;
