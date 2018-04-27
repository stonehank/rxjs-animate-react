import React from 'react'

export default class MarbleCaption extends React.PureComponent{
    render(){
        //console.log('marblecaption')
        const {i,line,marbleText}=this.props
        return(
            i===line-1 ?
                <span>{marbleText}</span> :
                null
        )
    }
}