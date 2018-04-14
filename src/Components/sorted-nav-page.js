import React from 'react';
import {Link}  from 'react-router-dom'
import {getPath} from '../tools'
import {Consumer} from '../index'
import * as Immutable from 'immutable';

const {fromJS,is} =Immutable


export default class SortedNavPage extends React.Component{

    shouldComponentUpdate(nextProps){
        var {location,...curOtherProps}=this.props;
        var {location,...nextOtherProps}=nextProps;
        return !is(fromJS(curOtherProps),fromJS(nextOtherProps))
    }
    render(){
        //console.log('AllSortPages')
        return(
            <Consumer>
                {({sortDeepList})=>{
                    const {match}=this.props,
                        curUrl=match.url,
                        sortType=getPath(curUrl,0)
                    const curSortDeepList=sortDeepList[sortType]
                    return (
                        curSortDeepList.map(e=>(
                            <Link className="firstLiHorWeb" key={e.id} to={`operators/${e.name}`}>
                                {sortType!=='operators'?`${e.name}(${sortType}:${e[sortType]})`:`${e.name}`}
                            </Link>
                        ))
                    )
                }}
            </Consumer>
        )
    }
}