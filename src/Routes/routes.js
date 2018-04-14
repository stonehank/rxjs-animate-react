import React from 'react';
import {Route,Switch}  from 'react-router-dom'
import Overview from '../Components/overview'
import SortedNavPage from '../Components/sorted-nav-page'
import OperatorsCoreContainer from '../Components/operators-core-container'
import Page404 from '../Components/page404'

export default class Routes extends React.PureComponent{
    //shouldComponentUpdate(nextProps){
    //
    //    console.log(this.props,nextProps)
    //    return true
    //}

    render(){
        //console.log('Routes')
        const {shallowList}=this.props
        return(
            <Switch>
                <Route exact={true} path="/" component={Overview} />
                {shallowList.map((e,i)=>(
                    <Route exact={true} key={i} path={`/${e.pathname}`} component={SortedNavPage}/>
                ))}
                <Route path='/operators/:section+' component={OperatorsCoreContainer}/>
                <Route component={Page404} />
            </Switch>
        )
    }
}