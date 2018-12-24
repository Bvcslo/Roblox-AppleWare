import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class Sidebar extends Component {
    fileSelected = (ev) => {
        if(!ev.currentTarget.files.length)
            return;

        var reader = new FileReader();
    
        reader.onload = (e) => {
            this.props.onUploadImage(e.target.result)
        };
    
        // read the image file as a data URL.
        reader.readAsDataURL(ev.currentTarget.files[0]);
      }

    handleColorSelected = (color, event) => {
        this.props.onColorSelected(color.hex)
      };

    handleClearColor = () => {
        this.props.onColorSelected(null)
    }

    render() {
        const {data} = this.props;
        
        let contents = <div>Click on a shirt area to edit</div>
        if(data) {
            console.log('bg', data)
            contents = (<div className="sidebar-main"> 
                    <div className="sidebar-area">
                        <h3>Image</h3>
                        <input type="file" id="files" onChange={this.fileSelected} />
                    </div>

                    <div className="sidebar-area">
                        <h3>Background</h3>
                       
                       
                       <SketchPicker 
                        color={ data.backgroundColor || 'transparent' }
                        onChangeComplete={ this.handleColorSelected }
                       />
                       <button onClick={this.handleClearColor}>Clear Color</button>
                    </div>

                    <div className="sidebar-area">
                        <h3>Text</h3>
                        <input type="text" placeholder="Enter text"></input>
                    </div>

                
                </div>)
        }
        
        return (
            <div className="sidebar">
                
                <h2 className="section">
                    {data ? `Editing ${data.name}` : 'Roblox Shirt Creator'}
                </h2>

                
                 {contents}
                

                <div className="flex-end">
                    <button className="primary-button" onClick={this.props.downloadImage}>Download Image</button>
                </div>
            </div>
        )
    }
}

export default Sidebar;