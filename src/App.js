import React, { Component } from 'react';
// import logo from './logo.svg';
import template from './images/shirt-template.png';
import evan from './images/evan.jpg';

import './App.css';
import { toJpeg } from 'html-to-image';
import download from 'downloadjs';
import SelectionArea from './components/SelectionArea';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import areaData from './areaData';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
 

class ShirtCreator extends Component {
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

  uploadImage = (imgUrl, imageFileList) => {
    this.setPropOnSelectedArea({
      imgUrl,
      imageFileList
    })
  }

  updateData = (updates) => {
    this.setPropOnSelectedArea(updates)
  }

  onImageSizeChange = (ev) => {
    const imageSize = ev.currentTarget.value;
    this.setPropOnSelectedArea({
      imageSize
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
      <div className="contents">
      <div className="flex">
        <Sidebar 
          updateData={this.updateData}
          onUploadImage={this.uploadImage} 
          downloadImage={this.downloadImage} 
          data={selectedArea} 
        />
        <div className="image-container">
          <img src={template} alt="" id="templateImage" onClick={this.clearSelection} className={!showTemplate ? 'hidden' : ''} />
          {areas}
        </div>
      </div>
      </div>
    );
  }
}
 
const About = () => {
  return (
  <div style={{background:'white', padding:20, height:'100%'}}>
    <div style={{minHeight:600, maxWidth:650}}>
    <h1>About Me</h1>
      
      <img src={evan} style={{width:200, paddingRight: 20}} alt="Evan" className="float-l" />
      <p>
        Hi! My name is Evan Weinberg. I love playing Roblox with my friends. A LOT. 
      </p>
      <p> 
        I got builder's club, so I can make shirts for our group. But the tools to make shirts were hard to use.
        I couldn't find anything that made it easier, so i decided to build my own tool.
      </p>
      <p>
        Roblox Shirt Creator lets you
          upload images and automatically size by shirt area
          set Background color
          add text, with different fonts and colors
          drag images and text around.
      </p>
      <p>
        I hope it's useful for everyone. I'll keep working to make it better. If you're a coder and want to help,
        Roblox Shirt Creator is on github at: 
        <br /><br/>
        <a href="https://github.com/crinjely/roblox-shirt-generator">https://github.com/crinjely/roblox-shirt-generator</a>
      </p>
    </div>
  </div>
    
  
  );
}

const App = () => {
  return (
    <div className="App">
        <Navigation />
        <Router>
          <React.Fragment>
            <Route exact path="/" component={ShirtCreator} />
            <Route exact path="/about" component={About} />
          </React.Fragment>
        </Router>
    </div>
  );
}

export default App;