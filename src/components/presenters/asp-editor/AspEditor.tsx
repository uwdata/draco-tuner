import { AspProgramsType } from '../../../model/asp-program';
import BaseEditor, { BaseDispatchProps, BaseEditorState, BaseStoreProps } from '../base-editor/BaseEditor';
import { ASP_FORMAT, ASP_THEME } from './asp';

export interface AspEditorStoreProps extends BaseStoreProps {
  code: string;
}

export interface AspEditorDispatchProps extends BaseDispatchProps {}

export interface AspEditorOwnProps {
  programType: AspProgramsType;
}

export interface AspEditorProps extends AspEditorStoreProps, AspEditorDispatchProps, AspEditorOwnProps {}

export interface AspEditorState extends BaseEditorState {}

export default class AspEditor extends BaseEditor<AspEditorProps, AspEditorState> {
  language: string = 'asp';

  constructor(props: AspEditorProps) {
    super(props);

    this.state = {
      code: '',
    };
  }

  defineEditor(monaco: any) {
    monaco.languages.register({ id: 'asp' });
    monaco.languages.setMonarchTokensProvider('asp', ASP_FORMAT);
    monaco.editor.defineTheme('draco-light', ASP_THEME);
  }

  onEditorMount() {}
}
