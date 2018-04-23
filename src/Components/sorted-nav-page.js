import React from 'react';
import {Link}  from 'react-router-dom'
import {getPath} from '../tools'
import {Consumer} from '../index'
import  {fromJS,is}  from 'immutable';



export default class SortedNavPage extends React.Component{
    constructor(){
        super()
        this.lastCapitalAlpha=''
    }
    shouldComponentUpdate(nextProps){
        var {location,...curOtherProps}=this.props;
        var {location,...nextOtherProps}=nextProps;
        return !is(fromJS(curOtherProps),fromJS(nextOtherProps))
    }
    render(){
        //console.log('AllSortPages')
        return(
            /*context——Consumer*/
            <Consumer>
                {({sortDeepList})=>{
                    const {match}=this.props,
                        curUrl=match.url,
                        sortType=getPath(curUrl,0)
                    const curSortDeepList=sortDeepList[sortType]
                    return (
                        <div>
                            {curSortDeepList.map(e=>{
                                let showCapital=false,
                                    firstCapital=e.firstCapital;
                                if(sortType==='operators'){
                                    if(this.lastCapitalAlpha!==firstCapital){
                                        showCapital=true;
                                        this.lastCapitalAlpha=firstCapital
                                    }
                                }
                                return (
                                    <li style={{marginLeft:'1rem'}} key={e.id}>
                                        {showCapital?<span>{firstCapital}</span>:null}
                                        <Link className="firstLiHorWeb"  to={`operators/${e.name}`}>
                                            {sortType!=='operators'?`${e.name}(${sortType}:${e[sortType]})`:`${e.name}`}
                                        </Link>
                                    </li>
                                )
                            })}
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}