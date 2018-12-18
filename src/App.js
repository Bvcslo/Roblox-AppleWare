import React, { Component } from 'react';
import logo from './logo.svg';
import template from './images/shirt-template.png';
import './App.css';
import { toJpeg } from 'html-to-image';
import download from 'downloadjs';

class ShirtSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgUrl: null
    }
  }
  fileSelected = (ev) => {
    var reader = new FileReader();

    reader.onload = (e) => {
        this.setState({
          imgUrl: e.target.result
        });
    };

    // read the image file as a data URL.
    reader.readAsDataURL(ev.currentTarget.files[0]);
    // console.log()
  }

  handleClick = (ev) => {
    console.log('handled click')
  } 

  render() {
    const {left, top, width, height, onClick, id, selected} = this.props
    const {imgUrl} = this.state

    return (
      <div className={`shirt-section ${selected ? 'selected' : ''}`} id={id} onClick={onClick} style={{
        left,
        top,
        width,
        height
      }}>
        {selected ? <input type="file" id="files" onChange={this.fileSelected} className="upload-button" /> : ''}
            
        {imgUrl ? <img id="image" src={imgUrl} style={{width:width}} /> : null}
          
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSection: null,
      showTemplate: true
    }
  }

  selectArea = (ev) => {
    console.log('selecting area')
    this.setState({
      selectedSection: ev.currentTarget
    })
    // ev.preventDefault();
  }

  clearSelection = (ev) => {
    this.setState({
      selectedSection: null
    })
  }

  downloadImage = (ev) => {
    this.clearSelection()
    
    const node = document.querySelector('.image-container');
    const img = document.getElementById('templateImage');
    img.style = "opacity:0";

    toJpeg(node, { width: 585, height: 559 , backgroundColor: '#ffffff'})
    .then(function (dataUrl) {
      download(dataUrl, 'shirt.jpg');
      img.style = "opacity:1";
    });
  }

  render() {
    const {selectedSection, showTemplate} = this.state
    const selectedId = selectedSection && selectedSection.id 
    return (
      <div className="App">
        <div className="image-container">
          <img src={template} id="templateImage" onClick={this.clearSelection} className={!showTemplate ? 'hidden' : ''} />
          <ShirtSection selected={selectedId === "1"} id="1" onClick={this.selectArea} left={231} top={73} width={128} height={130} />
          <ShirtSection selected={selectedId === "2"} id="2" onClick={this.selectArea} left={231} top={8} width={128} height={65} />
        </div>
        <button className="hide-show" onClick={this.downloadImage}>Download Image</button>
        
      </div>
    );
  }
}


export default App;
