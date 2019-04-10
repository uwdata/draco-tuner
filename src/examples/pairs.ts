import { PairsDictionary } from "../reducers/pair-collection-reducer";

export const EXAMPLE_PAIRS: PairsDictionary = {
  "0": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 0,
    "comparator": "<"
  },
  "1": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "line",
        "encoding": {
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 1,
    "comparator": "<"
  },
  "2": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "bar",
        "encoding": {
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 2,
    "comparator": "<"
  },
  "3": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "area",
        "encoding": {
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 3,
    "comparator": "<"
  },
  "4": {
    "left": {
      "vlSpec": {
        "mark": "line",
        "encoding": {
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
        "encoding": {
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 4,
    "comparator": "<"
  },
  "5": {
    "left": {
      "vlSpec": {
        "mark": "bar",
        "encoding": {
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
        "encoding": {
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 5,
    "comparator": "<"
  },
  "6": {
    "left": {
      "vlSpec": {
        "mark": "area",
        "encoding": {
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
        "encoding": {
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 6,
    "comparator": "<"
  },
  "7": {
    "left": {
      "vlSpec": {
        "mark": "bar",
        "encoding": {
          "y": {
            "field": "origin",
            "type": "nominal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "field": "origin",
            "type": "nominal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 7,
    "comparator": "<"
  },
  "8": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "field": "origin",
            "type": "nominal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "y": {
            "field": "origin",
            "type": "nominal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 8,
    "comparator": "<"
  },
  "9": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "y": {
            "field": "origin",
            "type": "nominal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "line",
        "encoding": {
          "y": {
            "field": "origin",
            "type": "nominal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 9,
    "comparator": "<"
  },
  "10": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "y": {
            "field": "origin",
            "type": "nominal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "area",
        "encoding": {
          "y": {
            "field": "origin",
            "type": "nominal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 10,
    "comparator": "<"
  },
  "11": {
    "left": {
      "vlSpec": {
        "mark": "line",
        "encoding": {
          "y": {
            "field": "origin",
            "type": "nominal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
        "encoding": {
          "y": {
            "field": "origin",
            "type": "nominal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 11,
    "comparator": "<"
  },
  "12": {
    "left": {
      "vlSpec": {
        "mark": "area",
        "encoding": {
          "y": {
            "field": "origin",
            "type": "nominal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
        "encoding": {
          "y": {
            "field": "origin",
            "type": "nominal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 12,
    "comparator": "<"
  },
  "13": {
    "left": {
      "vlSpec": {
        "mark": "bar",
        "encoding": {
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 13,
    "comparator": "<"
  },
  "14": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 14,
    "comparator": "<"
  },
  "15": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "line",
        "encoding": {
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 15,
    "comparator": "<"
  },
  "16": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "area",
        "encoding": {
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 16,
    "comparator": "<"
  },
  "17": {
    "left": {
      "vlSpec": {
        "mark": "line",
        "encoding": {
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
        "encoding": {
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 17,
    "comparator": "<"
  },
  "18": {
    "left": {
      "vlSpec": {
        "mark": "area",
        "encoding": {
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
        "encoding": {
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          },
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 18,
    "comparator": "<"
  },
  "19": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 19,
    "comparator": "<"
  },
  "20": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "line",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 20,
    "comparator": "<"
  },
  "21": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "bar",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 21,
    "comparator": "<"
  },
  "22": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "area",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 22,
    "comparator": "<"
  },
  "23": {
    "left": {
      "vlSpec": {
        "mark": "line",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 23,
    "comparator": "<"
  },
  "24": {
    "left": {
      "vlSpec": {
        "mark": "bar",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 24,
    "comparator": "<"
  },
  "25": {
    "left": {
      "vlSpec": {
        "mark": "area",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 25,
    "comparator": "<"
  },
  "26": {
    "left": {
      "vlSpec": {
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
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
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
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 26,
    "comparator": "<"
  },
  "27": {
    "left": {
      "vlSpec": {
        "mark": "point",
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
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "tick",
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
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 27,
    "comparator": "<"
  },
  "28": {
    "left": {
      "vlSpec": {
        "mark": "tick",
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
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "line",
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
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 28,
    "comparator": "<"
  },
  "29": {
    "left": {
      "vlSpec": {
        "mark": "tick",
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
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "area",
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
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 29,
    "comparator": "<"
  },
  "30": {
    "left": {
      "vlSpec": {
        "mark": "line",
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
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
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
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 30,
    "comparator": "<"
  },
  "31": {
    "left": {
      "vlSpec": {
        "mark": "area",
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
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
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
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 31,
    "comparator": "<"
  },
  "32": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 32,
    "comparator": "<"
  },
  "33": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "line",
        "encoding": {
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 33,
    "comparator": "<"
  },
  "34": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "bar",
        "encoding": {
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 34,
    "comparator": "<"
  },
  "35": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "area",
        "encoding": {
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 35,
    "comparator": "<"
  },
  "36": {
    "left": {
      "vlSpec": {
        "mark": "line",
        "encoding": {
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
        "encoding": {
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 36,
    "comparator": "<"
  },
  "37": {
    "left": {
      "vlSpec": {
        "mark": "bar",
        "encoding": {
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
        "encoding": {
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 37,
    "comparator": "<"
  },
  "38": {
    "left": {
      "vlSpec": {
        "mark": "area",
        "encoding": {
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
        "encoding": {
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 38,
    "comparator": "<"
  },
  "39": {
    "left": {
      "vlSpec": {
        "mark": "line",
        "encoding": {
          "x": {
            "timeUnit": "month",
            "field": "year",
            "type": "temporal"
          },
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "area",
        "encoding": {
          "x": {
            "timeUnit": "month",
            "field": "year",
            "type": "temporal"
          },
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 39,
    "comparator": "<"
  },
  "40": {
    "left": {
      "vlSpec": {
        "mark": "area",
        "encoding": {
          "x": {
            "timeUnit": "month",
            "field": "year",
            "type": "temporal"
          },
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "bar",
        "encoding": {
          "x": {
            "timeUnit": "month",
            "field": "year",
            "type": "temporal"
          },
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 40,
    "comparator": "<"
  },
  "41": {
    "left": {
      "vlSpec": {
        "mark": "bar",
        "encoding": {
          "x": {
            "timeUnit": "month",
            "field": "year",
            "type": "temporal"
          },
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "timeUnit": "month",
            "field": "year",
            "type": "temporal"
          },
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 41,
    "comparator": "<"
  },
  "42": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "timeUnit": "month",
            "field": "year",
            "type": "temporal"
          },
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "timeUnit": "month",
            "field": "year",
            "type": "temporal"
          },
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 42,
    "comparator": "<"
  },
  "43": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "timeUnit": "month",
            "field": "year",
            "type": "temporal"
          },
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
        "encoding": {
          "x": {
            "timeUnit": "month",
            "field": "year",
            "type": "temporal"
          },
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 43,
    "comparator": "<"
  },
  "44": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "origin",
            "type": "nominal"
          },
          "y": {
            "field": "cylinders",
            "type": "nominal"
          },
          "size": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "bar",
        "encoding": {
          "x": {
            "field": "origin",
            "type": "nominal"
          },
          "color": {
            "field": "cylinders",
            "type": "nominal"
          },
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 44,
    "comparator": "<"
  },
  "45": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 45,
    "comparator": "<"
  },
  "46": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "square",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 46,
    "comparator": "<"
  },
  "47": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "circle",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 47,
    "comparator": "<"
  },
  "48": {
    "left": {
      "vlSpec": {
        "mark": "bar",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 48,
    "comparator": "<"
  },
  "49": {
    "left": {
      "vlSpec": {
        "mark": "bar",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "square",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 49,
    "comparator": "<"
  },
  "50": {
    "left": {
      "vlSpec": {
        "mark": "bar",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "circle",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 50,
    "comparator": "<"
  },
  "51": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 51,
    "comparator": "<"
  },
  "52": {
    "left": {
      "vlSpec": {
        "mark": "square",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 52,
    "comparator": "<"
  },
  "53": {
    "left": {
      "vlSpec": {
        "mark": "circle",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 53,
    "comparator": "<"
  },
  "54": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "line",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 54,
    "comparator": "<"
  },
  "55": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "area",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 55,
    "comparator": "<"
  },
  "56": {
    "left": {
      "vlSpec": {
        "mark": "line",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 56,
    "comparator": "<"
  },
  "57": {
    "left": {
      "vlSpec": {
        "mark": "area",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "rule",
        "encoding": {
          "x": {
            "aggregate": "mean",
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 57,
    "comparator": "<"
  },
  "58": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "color": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "row": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 58,
    "comparator": "<"
  },
  "59": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "color": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "column": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 59,
    "comparator": "<"
  },
  "60": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "row": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "color": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 60,
    "comparator": "<"
  },
  "61": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "column": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "color": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 61,
    "comparator": "<"
  },
  "62": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "color": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "color": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 62,
    "comparator": "<"
  },
  "63": {
    "left": {
      "vlSpec": {
        "mark": "tick",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "color": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "color": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 63,
    "comparator": "<"
  },
  "64": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "color": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "row": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 64,
    "comparator": "<"
  },
  "65": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "color": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "column": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 65,
    "comparator": "<"
  },
  "66": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "row": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "size": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 66,
    "comparator": "<"
  },
  "67": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "column": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "size": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 67,
    "comparator": "<"
  },
  "68": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 68,
    "comparator": "<"
  },
  "69": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 69,
    "comparator": "<"
  },
  "70": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 70,
    "comparator": "<"
  },
  "71": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "bin": true,
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "bin": true,
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 71,
    "comparator": "<"
  },
  "72": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 72,
    "comparator": "<"
  },
  "73": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 73,
    "comparator": "<"
  },
  "74": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 74,
    "comparator": "<"
  },
  "75": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "bin": true,
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "bin": true,
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 75,
    "comparator": "<"
  },
  "76": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 76,
    "comparator": "<"
  },
  "77": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 77,
    "comparator": "<"
  },
  "78": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 78,
    "comparator": "<"
  },
  "79": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "bin": true,
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "bin": true,
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 79,
    "comparator": "<"
  },
  "80": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 80,
    "comparator": "<"
  },
  "81": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 81,
    "comparator": "<"
  },
  "82": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 82,
    "comparator": "<"
  },
  "83": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "bin": true,
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "bin": true,
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 83,
    "comparator": "<"
  },
  "84": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 84,
    "comparator": "<"
  },
  "85": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "field": "cylinders",
            "type": "ordinal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 85,
    "comparator": "<"
  },
  "86": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "field": "year",
            "type": "temporal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 86,
    "comparator": "<"
  },
  "87": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "y": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "x": {
            "bin": true,
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "aggregate": "count",
            "type": "quantitative"
          },
          "y": {
            "bin": true,
            "field": "horsepower",
            "type": "quantitative"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 87,
    "comparator": "<"
  },
  "88": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "row": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "column": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 88,
    "comparator": "<"
  },
  "89": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "row": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "column": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 89,
    "comparator": "<"
  },
  "90": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "row": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "column": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 90,
    "comparator": "<"
  },
  "91": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "row": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "column": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 91,
    "comparator": "<"
  },
  "92": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "row": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "column": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 92,
    "comparator": "<"
  },
  "93": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "row": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "column": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 93,
    "comparator": "<"
  },
  "94": {
    "left": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "row": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "right": {
      "vlSpec": {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "horsepower",
            "type": "quantitative"
          },
          "y": {
            "field": "acceleration",
            "type": "quantitative"
          },
          "column": {
            "field": "origin",
            "type": "nominal"
          }
        },
        "config": {
          "line": {
            "point": true
          },
          "scale": {
            "useUnaggregatedDomain": true
          }
        },
        "data": {
          "url": "cars.json"
        }
      }
    },
    "id": 94,
    "comparator": "<"
  }
}
