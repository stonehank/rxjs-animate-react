import React from 'react';
import {Consumer} from '../index'
import OperatorsCoreContainerCompatible from "./operator-core-container-compatible";
let OperatorCoreContainerHoc;

 function _HOC(props){
    return function(Component){
        return(
            <Consumer>
                {({smallScreen,isPhone})=>{
                    return (
                        <Component smallScreen={smallScreen} isPhone={isPhone} operatorName={props.match.params.section}/>
                    )
                }}
            </Consumer>
        )
    }
}


export default  OperatorCoreContainerHoc=(props)=>{
   return _HOC(props)(OperatorsCoreContainerCompatible)
}
