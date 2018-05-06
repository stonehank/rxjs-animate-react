import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,withRouter}  from 'react-router-dom'
import Rx from 'rxjs/Rx'
import 'codemirror/lib/codemirror.css'

import './Css/index.css'
import Nav from './Nav'
import Routes from './Routes/routes'
import {checkIsPhone,checkScreen,sortMethod, _fetchNav} from './tools'
import {initSmallScreen} from './mock-data'


// if (process.env.NODE_ENV !== 'production') {
//     const {whyDidYouUpdate} = require('why-did-you-update');
//     whyDidYouUpdate(React);
// }

/**
 * 新API 创建context
 */
export const {Provider,Consumer}=React.createContext()

class App extends React.Component{
    constructor(){
        super()
        this.sortDeepList={};
        this.sortNavDeepList={};
        this.state={isFetchingNav:true,smallScreen:initSmallScreen}
        this.isPhone=checkIsPhone();
        if(!this.isPhone){
            this.resize$=Rx.Observable.fromEvent(window,'resize')
                .debounceTime(500)
                .subscribe(()=>{
                    const {smallScreen}=this.state,
                        curRes=checkScreen()
                    if(curRes!==smallScreen){
                        this.setState({
                            smallScreen:curRes
                        })
                    }
                })
        }
    }
    componentWillUnmount(){
        if(this.resize$){
            this.resize$.unsubscribe()
        }
        this.fetch$.unsubscribe()
    }

    componentDidMount(){
        this.fetch$=Rx.Observable.fromPromise(_fetchNav())
            .subscribe(({deepList,shallowList})=>{
                shallowList.forEach(e=>{
                    let sortedList=sortMethod(e.sort,deepList)
                    this.sortDeepList[e.pathname]=sortedList
                    this.sortNavDeepList[e.pathname]=sortedList.slice(0,10)
                });
                this.shallowList=shallowList;
                this.setState({isFetchingNav:false})
            })

    }
    shouldComponentUpdate(nextProps,nextState){
        const curPathName=this.props.location.pathname,
            nextPathName=nextProps.location.pathname
        return curPathName!==nextPathName || this.state!==nextState
        // return !deepEqual(this.props,nextProps) || !deepEqual(this.state,nextState)
    }
    render(){
        // console.log('app')
        const {isFetchingNav,smallScreen}=this.state
        const {sortDeepList,shallowList,sortNavDeepList,isPhone}=this
        const compatibleShallowList=smallScreen && shallowList?shallowList.slice(0,1):shallowList
        const curPathname=this.props.location.pathname.substr(1)
        const contextProps={sortDeepList,sortNavDeepList,compatibleShallowList,curPathname,smallScreen,isPhone}
        return(
            isFetchingNav
                ?
                <p>loading..</p>
                :
                <Provider value={contextProps}>
                    <Nav type="webNav" orient="horizontal" showChild={true}/>
                    <Routes shallowList={compatibleShallowList} curPathname={curPathname}/>
                </Provider>
        )
    }
}
App=withRouter(App)

ReactDOM.render(
    <Router >
        <App />
    </Router>,
    document.getElementById('root')
)