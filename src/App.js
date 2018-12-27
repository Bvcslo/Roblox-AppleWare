import React, { Component } from 'react';
// import logo from './logo.svg';
import template from './images/shirt-template.png';
import logo from './images/logo.svg';
import './App.css';
import { toJpeg } from 'html-to-image';
import download from 'downloadjs';
import SelectionArea from './components/SelectionArea';
import Sidebar from './components/Sidebar';

class App extends Component {
  constructor(props) {
    super(props)

    let areaNames = [
      'right-arm-L',
      'right-arm-B',
      'right-arm-R',
      'right-arm-F',
      'left-arm-L',
      'left-arm-B',
      'left-arm-R',
      'left-arm-F',
    ]
    let areas = [];

    for(let i = 0; i < areaNames.length; i++) {
      let offset = i > 3 ? 44 : 19; 
      let name = areaNames[i]
      areas.push({
        name:name,
        left: 66*i+offset, 
        top: 355, 
        width:64, 
        height:128
      })
    }
    
    areas = areas.concat([
      {
        name: 'DOWN',
        left:231,
        top:204, 
        width:128, 
        height:64
      },
      {
        name: 'UP',
        left:231,
        top:8, 
        width:128, 
        height:64
      },
      {
        name: 'FRONT',
        left:231,
        top:74, 
        width:128, 
        height:128
      },
      {
        name: 'BACK',
        left:427,
        top:74, 
        width:128, 
        height:128
      },
      {
        name: 'R',
        left:165,
        top:74, 
        width:64, 
        height:128
      },
      {
        name: 'L',
        left:361,
        top:74, 
        width:64, 
        height:128
      }
    ])

    this.state = {
      selectedArea: null,
      showTemplate: true,
      areas: areas
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
        
        <div className="header">
         
          <ul className="flex">
            <li className="logo">
              <a className="logo" href="#">
                <img src={logo} alt="" />
              </a>
              <div className="logo" />
            </li>
            <li>
                <a href="/">Shirt Creator</a>
            </li>
            <li>
                <a href="/about">About</a>
            </li>
            <li>
                <a href="/donate">Donate</a>
            </li>
          </ul>
        </div>

        <div className="content">
        
          <div className="flex">
            <Sidebar 
              onUploadImage={this.uploadImage} 
              onColorSelected={this.colorSelected} 
              downloadImage={this.downloadImage} 
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
