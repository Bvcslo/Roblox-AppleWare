import React, { Component } from 'react';

class SelectionArea extends Component {
    constructor(props) {
      super(props)
    }
   
  
    render() {
      const {left, top, width, height, onClick, id, selected, imgUrl} = this.props
        console.log('imgUrls is', imgUrl)
      return (
        <div className={`shirt-section ${selected ? 'selected' : ''}`} id={id} onClick={onClick} style={{
          left,
          top,
          width,
          height
        }}>
              
          {imgUrl ? <img id="image" alt="" src={imgUrl} style={{maxWidth:'100%'}} /> : null}
            
        </div>
      )
    }
  }

  export default SelectionArea