import React from 'react';
import {Route,Switch}  from 'react-router-dom'
import Overview from '../Components/overview'
import Page404 from '../Components/page404'
import {deepEqual} from '../tools'
import {LazySortedNavPage,LazyOperatorsCoreContainer} from '../LazyComponents'


export default class Routes extends React.Component{

    shouldComponentUpdate(nextProps){
        return !deepEqual(this.props,nextProps)
    }

    render(){
        //console.log('Routes')
        const {shallowList}=this.props
        return(
            <Switch>
                <Route exact={true} path="/" component={Overview} />
                {shallowList.map((e,i)=>(
                    <Route exact={true} key={i} path={`/${e.pathname}`} component={LazySortedNavPage}/>
                ))}
                <Route path='/operators/:section+' component={LazyOperatorsCoreContainer}/>
                <Route component={Page404} />
            </Switch>
        )
    }
}

