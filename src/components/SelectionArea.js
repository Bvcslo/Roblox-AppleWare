import React, { Component } from 'react';
import Draggable from 'react-draggable';

function getImageStyle(data) {
    if(!data)
        return
    
    let imageSizeStyle = {maxWidth:'100%'}
    switch(data.imageSize) {
        case 'height':
        imageSizeStyle = {maxHeight:'100%'}
            break;
        default :
        imageSizeStyle = {maxWidth:'100%'}
        } 
        
    return Object.assign({}, imageSizeStyle)
}

function getTextStyle(data) {
    if(!data)
        return

    const size = {fontSize: data.fontSize}
    const color = {color: data.textColor}
    const fontFamily = {fontFamily: data.fontFamily}

    return Object.assign({}, size, color, fontFamily)
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

        const imageStyle = getImageStyle(data)
        const textStyle = getTextStyle(data)

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
            {text ? <Draggable><div className="draggable" style={textStyle}>{text}</div></Draggable> : null}
            </div>
        )
        }
  }

  export default SelectionArea