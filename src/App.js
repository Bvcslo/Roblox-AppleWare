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
            
        {imgUrl ? <img id="image" src={imgUrl} style={{maxWidth:'100%'}} /> : null}
          
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
    let areas = []
    for(let i = 0; i < 8; i++) {
      let offset = i > 3 ? 44 : 19; 
      areas.push(<ShirtSection key={`section_${i}`} selected={selectedId === `SECTION_${i}`} id={`SECTION_${i}`} onClick={this.selectArea} left={66*i+offset} top={355} width={64} height={128} />
      )
    }

    areas = areas.concat([
      <ShirtSection selected={selectedId === "DOWN"} id="DOWN" onClick={this.selectArea} left={231} top={204} width={128} height={64} />,
      <ShirtSection selected={selectedId === "UP"} id="UP" onClick={this.selectArea} left={231} top={8} width={128} height={64} />,
          
      <ShirtSection selected={selectedId === "FRONT"} id="FRONT" onClick={this.selectArea} left={231} top={74} width={128} height={128} />,
      <ShirtSection selected={selectedId === "BACK"} id="BACK" onClick={this.selectArea} left={427} top={74} width={128} height={128} />,
          
      <ShirtSection selected={selectedId === "R"} id="R" onClick={this.selectArea} left={165} top={74} width={64} height={128} />,
      <ShirtSection selected={selectedId === "L"} id="L" onClick={this.selectArea} left={361} top={74} width={64} height={128} />
    ])


    return (
      <div className="App">
        <div className="image-container">
          <img src={template} id="templateImage" onClick={this.clearSelection} className={!showTemplate ? 'hidden' : ''} />
          {areas}
        </div>

        <button className="hide-show" onClick={this.downloadImage}>Download Image</button>
        
      </div>
    );
  }
}


export default App;
