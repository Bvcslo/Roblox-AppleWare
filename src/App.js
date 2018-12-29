import React, { Component } from 'react';
// import logo from './logo.svg';
import template from './images/shirt-template.png';
import './App.css';
import { toJpeg } from 'html-to-image';
import download from 'downloadjs';
import SelectionArea from './components/SelectionArea';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import areaData from './areaData';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedArea: null,
      showTemplate: true,
      areas: areaData
    }
  }

  selectArea = (areaId) => {
    const area = this.state.areas.find((area) => area.name === areaId)
    this.setState({
      selectedArea: area
    })
    // ev.preventDefault();
  }

  clearSelection = (ev) => {
    this.setState({
      selectedArea: null
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

  setPropOnSelectedArea(update) {
    let i = 0
    let newAreas = this.state.areas.map((area, index) => {
      if (area.name !== this.state.selectedArea.name) {
        return area
      }
      i = index;
      return {
        ...area,
        ...update
      }
    })
    this.setState({
      areas: newAreas,
      selectedArea: newAreas[i]
    })
  }

  uploadImage = (imgUrl) => {
    this.setPropOnSelectedArea({imgUrl})
  }

  colorSelected = (backgroundColor) => {
    this.setPropOnSelectedArea({
      backgroundColor
    })
  }

  onTextChange = (text) => {
    console.log(text)
    this.setPropOnSelectedArea({
      text
    })
  }

  render() {
    const {selectedArea, showTemplate} = this.state
    const areas = this.state.areas.map((area) => <SelectionArea 
      data={area}
      key={area.name} 
      selected={selectedArea && selectedArea.name === area.name} 
      onClick={this.selectArea} 
      />)

    return (
      <div className="App">
        <Navigation />
        <div className="content">
          <div className="flex">
            <Sidebar 
              onUploadImage={this.uploadImage} 
              onColorSelected={this.colorSelected} 
              downloadImage={this.downloadImage} 
              onTextChange={this.onTextChange}
              data={selectedArea} 
            />
            <div className="image-container">
              <img src={template} alt="" id="templateImage" onClick={this.clearSelection} className={!showTemplate ? 'hidden' : ''} />
              {areas}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
