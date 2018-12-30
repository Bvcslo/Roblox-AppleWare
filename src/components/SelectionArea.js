import React, { Component } from 'react';
import Draggable from 'react-draggable';

function getImageSizeStyle(imageSizeProp) {
    switch(imageSizeProp) {
        case 'height':
            return {maxHeight:'100%'}
        default :
            return {maxWidth:'100%'}
        }   
}

class SelectionArea extends Component {
   
    handleClick = (ev) => {
        if(!this.props.selected){
            this.props.onClick(this.props.data.name);
        }
    }
     
    render() {
        const { data }= this.props
        const {left, top, width, height, id, imgUrl, backgroundColor, text} = this.props.data
        const { selected } = this.props;
        const imageSizeStyle = getImageSizeStyle(data.imageSize)
        const imageStyle = Object.assign({}, imageSizeStyle)

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
            
            {imgUrl ? (<Draggable>
                            <img className="draggable" draggable="false" id="image" alt="" src={imgUrl} style={imageStyle} />
                        </Draggable>) : null}
            {text ? <Draggable><div className="draggable">{text}</div></Draggable> : null}
            </div>
        )
        }
  }

  export default SelectionArea