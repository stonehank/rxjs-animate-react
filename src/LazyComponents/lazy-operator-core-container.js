import React from 'react';
import {Consumer} from '../index'
import createSectionLazy from './create-section-lazy'



export default class LazyOperatorsCoreContainer extends React.Component{
    render(){
        const operatorName=this.props.match.params.section
        const lazyPath=()=>import('../Components/operator-core-container-compatible')
        return(
            <Consumer>
                {({smallScreen,isPhone})=>createSectionLazy(lazyPath, operatorName, {operatorName,smallScreen,isPhone})}
            </Consumer>
        )
    }
}
