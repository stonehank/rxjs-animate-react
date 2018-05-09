import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,withRouter}  from 'react-router-dom'
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/debounceTime'

import {ReuseButton} from './Widget'
import './Css/index.css'
import Nav from './Nav'
import Routes from './Routes/routes'
import {checkIsPhone,checkScreen,sortMethod, _fetchNav,shallowEqual} from './tools'
// import {initSmallScreen} from './mock-data'


if (process.env.NODE_ENV !== 'production') {
    const {whyDidYouUpdate} = require('why-did-you-update');
    whyDidYouUpdate(React);
}

/**
 * 新API 创建context
 */
export const {Provider,Consumer}=React.createContext()

class App extends React.Component{
    constructor(){
        super()
        // this.toggleScreen=this.toggleScreen.bind(this)
        // this.closeWapNav=this.closeWapNav.bind(this)
        // this.changeWapHorNav=this.changeWapHorNav.bind(this)
        this.sortDeepList={};
        this.sortNavDeepList={};
        this.state={
            isFetchingNav:true,
            smallScreen:checkIsPhone(),
            showWapHorNav:false
        }
        // this.isPhone=checkIsPhone();
        // if(!this.isPhone){
            this.resize$=Observable.fromEvent(window,'resize')
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
        // }
    }

    // toggleScreen(){
    //     this.setState(prevState=>({
    //         smallScreen:!prevState.smallScreen
    //     }))
    // }
    // closeWapNav(){
    //     if(this.state.showWapHorNav){
    //          this.changeWapHorNav(false)
    //     }
    // }
    // changeWapHorNav(bool){
    //     this.setState({
    //         showWapHorNav:bool
    //     })
    // }
    componentWillUnmount(){
        if(this.resize$){
            this.resize$.unsubscribe()
        }
        this.fetch$.unsubscribe()
    }

    componentDidMount(){
        this.fetch$=Observable.fromPromise(_fetchNav())
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
        return curPathName!==nextPathName || !shallowEqual(this.state,nextState)
        // return !deepEqual(this.props,nextProps) || !deepEqual(this.state,nextState)
    }
    render(){
        // console.log('app')
        const {isFetchingNav,smallScreen}=this.state
        const {sortDeepList,shallowList,sortNavDeepList}=this
        const compatibleShallowList=smallScreen && shallowList?shallowList.slice(0,1):shallowList
        const curPathname=this.props.location.pathname.substr(1)
        const contextProps={sortDeepList,sortNavDeepList,shallowList,curPathname,smallScreen}
        return(
            isFetchingNav
                ?
                <p>loading..</p>
                :
                <Provider value={contextProps}>
                <div onClick={this.closeWapNav}>
                    <Nav type={smallScreen ? "wapNav" : "webNav"}
                         orient="horizontal" 
                         showChild={smallScreen ? false : true}/>
                    <Routes shallowList={shallowList} curPathname={curPathname}/>
                </div>
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