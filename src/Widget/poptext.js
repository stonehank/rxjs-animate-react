import React from 'react'
import classNames from 'classnames'

export default class PopText extends React.PureComponent{
    render(){
        const {data,top,left,needStringify,className}=this.props
        const newClassName=classNames("pop-data",className?className:null)
        return(
            <div className={newClassName}  style={{top,left}}>
                <p dangerouslySetInnerHTML={{__html: data}} />
                {needStringify
                    ?
                    <p>{`stringify:${JSON.stringify(data)}`}</p>
                    :
                    null}
            </div>
        )
    }
}