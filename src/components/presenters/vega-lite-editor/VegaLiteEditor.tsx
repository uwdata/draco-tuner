import BaseEditor, { BaseDispatchProps, BaseEditorState, BaseStoreProps } from '../base-editor/BaseEditor';

export interface VegaLiteEditorStoreProps extends BaseStoreProps {
  code: string;
}

export interface VegaLiteEditorDispatchProps extends BaseDispatchProps {}

export interface VegaLiteEditorOwnProps {}

export interface VegaLiteEditorProps
  extends VegaLiteEditorStoreProps,
    VegaLiteEditorDispatchProps,
    VegaLiteEditorOwnProps {}

export interface VegaLiteEditorState extends BaseEditorState {}

export default class VegaLiteEditor extends BaseEditor<VegaLiteEditorProps, VegaLiteEditorState> {
  language: string = 'json';

  constructor(props: VegaLiteEditorProps) {
    super(props);

    this.state = {
      code: '',
    };
  }

  defineEditor(monaco: any) {}

  onEditorMount() {}
}
