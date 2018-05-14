import React from 'react';
import ReuseButton from "../Widget/reuse-button";
import SectionDescriptionTitle from './section-description-title'
import SectionDescriptionBody from './section-description-body'

export default class SectionDescriptionCompatible extends React.PureComponent{
    constructor(){
        super()
        this.handleClick=this.handleClick.bind(this)
        this.state={
            showCaption:true
        }
    }

    handleClick(){
        this.setState(prevState=>({
            showCaption:!prevState.showCaption
        }))
    }
    render(){
        const {title,gfsm,czsm,cclj,tbzy,smallScreen}=this.props;
        const {showCaption} = this.state;
        return(
            smallScreen ?
                <React.Fragment>
                   <SectionDescriptionTitle title={title}/>
                    <SectionDescriptionBody  gfsm={gfsm} czsm={czsm} cclj={cclj} tbzy={tbzy} />
                </React.Fragment>
                        :
                <React.Fragment>
                    <SectionDescriptionTitle title={title}>
                        <ReuseButton text={showCaption ? "less" : "more"} className={"toggle-title-button"} handleClick={this.handleClick}/>
                    </SectionDescriptionTitle>
                    {
                        showCaption ?
                            <SectionDescriptionBody  gfsm={gfsm} czsm={czsm} cclj={cclj} tbzy={tbzy} />
                             :
                            null
                    }
                </React.Fragment>
        )
    }
}
