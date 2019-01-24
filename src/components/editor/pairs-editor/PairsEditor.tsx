import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootAction } from '../../../actions';
import { updateEditorPairs, updatePairsEditorCode } from '../../../actions/editor-actions';
import { RootState } from '../../../reducers';
import BaseEditor, { BaseDispatchProps, BaseStateProps } from '../base-editor/BaseEditor';

interface StateProps extends BaseStateProps {
  code: string;
}

interface DispatchProps extends BaseDispatchProps {
}

export interface PairsEditorProps extends StateProps, DispatchProps {}

interface State {}

class PairsEditor
    extends BaseEditor<PairsEditorProps, State> {
  onEditorCodeChange: any;
  language: string = 'javascript';

  constructor(props: PairsEditorProps) {
    super(props);
  }

  defineEditor(monaco: any) {
  }

  onEditorMount() {
    this.props.onEditorCodeChange(this.props.code, null);
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    code: state.editor.code.pairs,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    onEditorCodeChange: (code: string, opt?: any) => {
      dispatch(updatePairsEditorCode(code));
      clearOpt(options);
      try {
        eval(code);
      } catch (err) {

      }
      const pairs = generatePairs(options);
      dispatch(updateEditorPairs(pairs));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PairsEditor);

class FlexObj {
  _dict: any;

  constructor(obj: any = {}) {
    this._dict = clone(obj);
  }

  get(key: string): any {
    return (
      key
        .split('.')
        .reduce((obj, k) => {
          obj = obj[k];
          return obj;
        }, this._dict)
    );
  }

  set(key: string, value: any) {
    const subkeys = key.split('.');

    subkeys
      .reduce((obj, k, i) => {
        if (i == subkeys.length - 1) {
          obj[k] = value;
        } else {
          obj = obj[k]
        }
        return obj;
      }, this._dict);
  }

  getObj() {
    return this._dict;
  }
}

function generatePairs(opt: PairOpt) {
  const result = [];

  for (const baseSpec of opt.baseSpecs) {
    const pair = createPair(baseSpec, opt);
    result.push(pair);
  }

  console.log(result);
  return result;
}

function createPair(baseSpec: any, opt: PairOpt) {
  const one = fillSpec(baseSpec, opt);
  const two = fillSpec(baseSpec, opt);

  for (const transform of opt.transformations) {
    switch (transform.type) {
      case 'swap':
        swap(two, transform.akey, transform.bkey);
        break;
      case 'add':
        add(two, transform.key, transform.value);
        break;
    }
  }

  return [one.getObj(), two.getObj()];
}

function add(spec: FlexObj, key: string, value: any) {
  spec.set(key, value);
}

function swap(spec: FlexObj, akey: string, bkey: string) {
  const avalue = spec.get(akey);
  const bvalue = spec.get(bkey);

  spec.set(akey, bvalue);
  spec.set(bkey, avalue);
}

function clone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

function fillSpec(baseSpec: any, opt: PairOpt) {
  baseSpec.data = { url : 'cars.json' };
  const flexSpec = new FlexObj(baseSpec);

  for (const modif of opt.modifications) {
    flexSpec.set(modif.key, modif.value);
  }

  return flexSpec;
}

interface PairOpt {
  autoSpec?: AutoSpecType;
  baseSpecs?: any[];
  transformations: Transformation[];
  modifications: Modification[];
}

type AutoSpecType = 'data';

type Transformation = SwapTransformation | AddTransformation;

interface AddTransformation {
  type: 'add';
  key: string;
  value: any;
}

interface SwapTransformation {
  type: 'swap';
  akey: string;
  bkey: string;
}

type TransformType = 'swap' | 'add';

interface Modification {
  key: string;
  value: any;
}

const options: PairOpt = {
  baseSpecs: [
    {
      data: { url : 'cars.json' },
      mark: 'point',
      encoding: {
        x: {
          field: 'horsepower',
          type: 'quantitative',
        },
        y: {
          field: 'acceleration',
          type: 'quantitative',
        },
      },
    }
  ],
  transformations: [
    {
      type: 'swap',
      akey: 'encoding.x',
      bkey: 'encoding.y',
    }
  ],
  modifications: [
    {
      key: 'encoding.x.zero',
      value: true,
    }
  ]
}

function clearOpt(opt: PairOpt) {
  opt.autoSpec = undefined;
  opt.baseSpecs = [];
  opt.transformations = [];
  opt.modifications = [];
}

function transform(type: TransformType, a: any, b: any) {
  switch (type) {
    case 'swap':
      options.transformations.push({
        type,
        akey: a,
        bkey: b
      });
      break;
    case 'add':
      options.transformations.push({
        type,
        key: a,
        value: b
      });
      break;
  }
 
}

function modification(key: string, value: any) {
  options.modifications.push({
    key,
    value,
  });
}

function autoSpec(type: AutoSpecType) {
  options.autoSpec = type;
}

const q1 = { field: 'horsepower', type: 'quantitative' };
const q2 = { field: 'acceleration', type: 'quantitative' };
const o1 = { field: 'cylinders', type: 'ordinal' };
const n1 = { field: 'origin', type: 'nominal' };

function basespec(spec: any) {
  options.baseSpecs.push(spec);
}
