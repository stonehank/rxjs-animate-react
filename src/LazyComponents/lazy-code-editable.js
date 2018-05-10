import React from 'react';
import createSectionLazy from './create-section-lazy'



export default class LazyCodeEditable extends React.PureComponent{
    render(){
        const lazyPath=()=>import('../Section/code-editable')
        return createSectionLazy(lazyPath, 'code-editable', {...this.props})
    }
}
