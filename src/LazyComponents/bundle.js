import React from 'react'

export default class Bundle extends React.PureComponent{
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

    static getDerivedStateFromProps(nextProps,prevState){

        if(prevState.name!==nextProps.name){
            prevState.loadMod(nextProps.component)
        }
        return null
    }

    loadMod(prop){
        this.setState({
            mod:null,
            err:null
        });
        prop().then((mod)=>{
            this.setState({
                mod:mod.default?mod.default:mod
            })
        },(err)=>{
            this.setState({
                err:err
            })
        }).catch(err=>alert(err))
    }
    render(){
        const {mod,err}=this.state
        return(
            this.props.children(mod?mod:err?['Error',err.message]:null)
        )
    }
}
