import React, { Component } from 'react';

class SelectionArea extends Component {
   
    handleClick = (ev) => {
        this.props.onClick(this.props.data.name);
    }
     
    render() {
        const {left, top, width, height, id, imgUrl, backgroundColor} = this.props.data
        const { selected } = this.props;
        return (
            <div className={`shirt-section ${selected ? 'selected' : ''}`} 
            id={id} 
            onClick={this.handleClick} 
            style={{
                left,
                top,
                width,
                height,
                backgroundColor
                }}
            >
                
            {imgUrl ? <img id="image" alt="" src={imgUrl} style={{maxWidth:'100%'}} /> : null}
                
            </div>
        )
        }
  }

  export default SelectionArea