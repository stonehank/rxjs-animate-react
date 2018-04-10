import React from 'react'
import {NavLink} from 'react-router-dom'
import {fetchNav} from '../tools'
import ShallowListTitle from './shallowlist-title'
import {shallowList} from '../mock-data'

export default class NavCore extends React.Component {

   constructor(){
       super()
       const len=shallowList.length;
       //this.shallowListClick=this.shallowListClick.bind(this)
       this.shallowListOver=this.shallowListOver.bind(this)
       this.state={
           showDeepList:Array(len).fill(false),
           navArr:[],
           isFetching:true
       }
   }
    componentDidMount(){
        fetchNav().then(deepList=>{
            this.setState({
                deepList:deepList,
                isFetching:false
            })
        })
    }
    //shallowListClick(i){
    //    const {showDeepList}=this.state
    //    const needChangeIndex=showDeepList.findIndex(v=>v===true)
    //    const _state=showDeepList.slice()
    //    if(i!==needChangeIndex){_state[needChangeIndex]=false;}
    //    _state[i]=!_state[i]
    //    this.setState({
    //        showDeepList:_state
    //    })
    //
    //}
    shallowListOver(){

    }

    render() {
        let {css,showChild}=this.props
        let {isFetching,deepList}=this.state
        //console.log('render')
        let {nav,firstLi,secondLi,firstUl,secondUl}=css
        return (
        isFetching
            ?
                <p>fetching...</p>
                :
                    <nav className={nav}>
                        <ul className={firstUl}>
                            {shallowList.map((e, i)=>(
                                <li key={i} className={firstLi}>
                                    {showChild ?
                                        <ShallowListTitle name={e.shallowTitle}
                                                          sort={e.sort}
                                                          deepList={deepList}
                                                          secondLi={secondLi}
                                                          secondUl={secondUl}
                                                          //shallowListClick={this.shallowListClick}
                                                          //shallowListOver={this.shallowListOver}
                                                          showDeepListNav={this.state.showDeepList[i]}
                                                          i={i}/>
                                        :
                                        <NavLink to={`/${e.shallowTitle}`}
                                                 activeStyle={{borderBottom:'3px solid #dadada'}} >{e.shallowTitle}</NavLink>
                                    }
                                </li>
                            ))}
                        </ul>
                    </nav>

        )
    }
}
