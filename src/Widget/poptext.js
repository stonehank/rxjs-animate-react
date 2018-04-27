import React from 'react'
import classNames from 'classnames'

export default class PopText extends React.PureComponent{
    render(){
        const {data,cssStyle,needStringify,className}=this.props
        const newClassName=classNames("pop-data",className?className:null)
        return(
            <div className={newClassName}  style={cssStyle}>
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