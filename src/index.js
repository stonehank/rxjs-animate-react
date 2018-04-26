import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,withRouter}  from 'react-router-dom'
import Rx from 'rxjs/Rx'
import 'codemirror/lib/codemirror.css'
import './Css/index.css'
import Nav from './Nav'
import Routes from './Routes/routes'
import {sortMethod,_fetchNav} from './tools'



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
        this.sortDeepList={};
        this.sortNavDeepList={};
        this.state={isFetchingNav:true}
    }
    componentWillUnmount(){
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
    render(){
        //console.log('app')
        const {isFetchingNav}=this.state
        const {sortDeepList,shallowList,sortNavDeepList}=this
        const curPathname=this.props.location.pathname.substr(1)
        const contextProps={sortDeepList,sortNavDeepList,shallowList,curPathname}
        return(
            isFetchingNav
                ?
                <p>loading..</p>
                :
                /*context——Provider*/
                <Provider value={contextProps}>
                    <Nav type="webNav" orient="horizontal" showChild={true}/>
                    <Routes shallowList={shallowList} curPathname={curPathname}/>
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