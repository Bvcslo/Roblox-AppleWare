import React, { Component } from 'react';
// import logo from './logo.svg';
import template from './images/shirt-template.png';
import './App.css';
import { toJpeg } from 'html-to-image';
import download from 'downloadjs';
import SelectionArea from './components/SelectionArea';
import Sidebar from './components/Sidebar';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSection: null,
      showTemplate: true,
      imgUrls: {}
    }
  }

  selectArea = (ev) => {
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

  uploadImage = (imgUrl) => {
    let imgUrls = this.state.imgUrls;
    const {selectedSection} = this.state
    const selectedId = selectedSection && selectedSection.id

    imgUrls[selectedId] = imgUrl
    console.log('2', imgUrls)
    
    this.setState({
      imgUrls: imgUrls
    })
  }

  render() {
    const {selectedSection, showTemplate} = this.state
    const selectedId = selectedSection && selectedSection.id
    let areas = []
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
    for(let i = 0; i < 8; i++) {
      let offset = i > 3 ? 44 : 19; 
      let name = areaNames[i]
      areas.push(<SelectionArea imgUrl={this.state.imgUrls[name]} key={name} selected={selectedId === name} id={name} onClick={this.selectArea} left={66*i+offset} top={355} width={64} height={128} />)
    }

    areas = areas.concat([
      <SelectionArea key='DOWN' imgUrl={this.state.imgUrls['DOWN']} selected={selectedId === "DOWN"} id="DOWN" onClick={this.selectArea} left={231} top={204} width={128} height={64} />,
      <SelectionArea key='UP' imgUrl={this.state.imgUrls['UP']} selected={selectedId === "UP"} id="UP" onClick={this.selectArea} left={231} top={8} width={128} height={64} />,
          
      <SelectionArea key='FRONT' imgUrl={this.state.imgUrls['FRONT']} selected={selectedId === "FRONT"} id="FRONT" onClick={this.selectArea} left={231} top={74} width={128} height={128} />,
      <SelectionArea key='BACK' imgUrl={this.state.imgUrls['BACK']} selected={selectedId === "BACK"} id="BACK" onClick={this.selectArea} left={427} top={74} width={128} height={128} />,
          
      <SelectionArea key='R' imgUrl={this.state.imgUrls['R']} selected={selectedId === "R"} id="R" onClick={this.selectArea} left={165} top={74} width={64} height={128} />,
      <SelectionArea key='L' imgUrl={this.state.imgUrls['L']} selected={selectedId === "L"} id="L" onClick={this.selectArea} left={361} top={74} width={64} height={128} />
    ])


    return (
      <div className="App">
        <Sidebar onUploadImage={this.uploadImage} downloadImage={this.downloadImage} selectedArea={selectedId} />
        <div className="image-container">
          <img src={template} alt="" id="templateImage" onClick={this.clearSelection} className={!showTemplate ? 'hidden' : ''} />
          {areas}
        </div>

        
        
      </div>
    );
  }
}


export default App;
