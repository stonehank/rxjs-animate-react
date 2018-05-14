import React from 'react';
import createSectionLazy from './create-section-lazy'



export default class LazyCodeEditable extends React.PureComponent{
    render(){
        const lazyPath=()=>import('../Section/code-editable')
        const codeStr=this.props.codeStr;
        const code=this.props.code;
        return createSectionLazy(lazyPath, 'code-editable', {...this.props})
    }
}
