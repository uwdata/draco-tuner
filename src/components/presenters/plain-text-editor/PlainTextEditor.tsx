import BaseEditor, { BaseDispatchProps, BaseEditorState, BaseStoreProps } from '../base-editor/BaseEditor';

export interface PlainTextEditorStoreProps extends BaseStoreProps {
  code: string;
}

export interface PlainTextEditorDispatchProps extends BaseDispatchProps {}

export interface PlainTextEditorOwnProps {
  id: string;
}

export interface PlainTextEditorProps
  extends PlainTextEditorStoreProps,
    PlainTextEditorDispatchProps,
    PlainTextEditorOwnProps {}

export interface PlainTextEditorState extends BaseEditorState {}

export default class PlainTextEditor extends BaseEditor<PlainTextEditorProps, PlainTextEditorState> {
  language: string = '';

  constructor(props: PlainTextEditorProps) {
    super(props);

    this.state = {
      code: '',
    };
  }

  defineEditor(monaco: any) {}

  onEditorMount() {}
}
