import React from 'react';
import {Consumer} from '../index'
import OperatorsCoreContainerCompatible from "./operator-core-container-compatible";
let WithSmallScreenHoc;

 function _HOC(props){
    return function(Component){
        return(
            <Consumer>
                {({smallScreen})=>{
                    return (
                        <Component smallScreen={smallScreen} operatorName={props.match.params.section}/>
                    )
                }}
            </Consumer>
        )
    }
}


export default  WithSmallScreenHoc=(props)=>{
   return _HOC(props)(OperatorsCoreContainerCompatible)
}
