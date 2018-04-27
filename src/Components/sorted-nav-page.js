import React from 'react';
import {getPath} from '../tools'
import {Consumer} from '../index'
import  {fromJS,is}  from 'immutable';
import {ReuseNavLink} from '../Widget'


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
                                    <li className="sortedLi"style={{marginLeft:'1rem'}} key={e.id}>
                                        {showCapital?<p>{firstCapital}</p>:null}
                                        <ReuseNavLink   toPath={`operators/${e.name}`}
                                                        name={sortType!=='operators'?`${e.name}(${sortType}:${e[sortType]})`:`${e.name}`} />


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