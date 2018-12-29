import React, { Component } from 'react';
import ColorPicker from './ColorPicker';

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
        this.props.onColorSelected(color)
    };


    handleClearColor = () => {
        this.props.onColorSelected(null)
    }

    handleTextChange = (ev) => {
        this.props.onTextChange(ev.currentTarget.value)
    };

    render() {
        const {data} = this.props;
        
        let contents = <div className="h-full">Click on a shirt area to edit</div>
        if(data) {
            contents = (
            
                <div className="sidebar-main h-full"> 
                    <div className="sidebar-area">
                        <h3>Image</h3>
                        <input type="file" id="files" onChange={this.fileSelected} />
                    </div>

                    <div className="sidebar-area">
                        <h3>Background</h3>
                       <ColorPicker 
                        color={ data.backgroundColor || 'transparent' }
                        onChange={ this.handleColorSelected }
                       />
                       <button onClick={this.handleClearColor}>Clear Color</button>
                    </div>

                    <div className="sidebar-area">
                        <h3>Text</h3>
                        <input 
                            type="text" 
                            value={data.text || ''} 
                            onChange={this.handleTextChange} 
                            placeholder="Enter text" 
                        />
                        {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
                    </div>
                </div>
                )
        }
        
        return (
            <div className="sidebar flex-col">
                
                <h3 className="headline">
                    {data ? `Editing ${data.name}` : 'Roblox Shirt Creator'}
                </h3>
                <div className="panel h-full flex-col">
                    {contents}
                    <div className="flex-end center">
                        <button className="primary-button" onClick={this.props.downloadImage}>Download Image</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar;