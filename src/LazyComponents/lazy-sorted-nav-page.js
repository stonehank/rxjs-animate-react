import React from "react";
import {getPath} from "../tools";
import {Consumer} from '../index'
import createSectionLazy from './create-section-lazy'


export default class LazySortedNavPage extends React.Component{
    render(){
        const {match}=this.props,
            curUrl=match.url,
            sortType=getPath(curUrl,0)
        const lazyImportFunc=()=>import(`../Components/sorted-nav-page`)
        return(
            <Consumer>
                {({sortDeepList})=>createSectionLazy(lazyImportFunc, sortType, {sortType,sortDeepList})}
            </Consumer>
        )
    }
}