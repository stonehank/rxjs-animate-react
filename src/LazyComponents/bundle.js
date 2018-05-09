import React from 'react'
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import {deepEqual} from '../tools'

export default class Bundle extends React.Component{
    constructor(props){
        super(props)
        this.loadMod=this.loadMod.bind(this)
        this.state={
            mod:null,
            err:null,
            loadMod:this.loadMod,
            name:null
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        return !deepEqual(nextProps,this.props) ||!deepEqual(nextState,this.state)
    }

    static getDerivedStateFromProps(nextProps,prevState){

        if(prevState.name!==nextProps.name){
            prevState.loadMod(nextProps.component)
        }
        return null
    }

    componentWillUnmount(){
         this.lazyLoad$.unsubscribe();
    }

    loadMod(prop){
        this.setState({
            mod:null,
            err:null
        });
        this.lazyLoad$=Observable.fromPromise(prop()).subscribe((mod)=>{
            this.setState({
                mod:mod.default?mod.default:mod
            })
        },(err)=>{
            this.setState({
                err:err
            })
        })
    }
    render(){
        const {mod,err}=this.state
        return(
            this.props.children(mod?mod:err?['Error',err.message]:null)
        )
    }
}
