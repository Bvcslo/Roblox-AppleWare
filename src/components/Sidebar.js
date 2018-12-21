import React, { Component } from 'react';

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

    render() {
        const {selectedArea} = this.props;

        let contents = <div>Click on a shirt area to edit</div>
        if(selectedArea) {
            contents = (<div className="sidebar-main"> 
                    <div className="sidebar-area">
                        <h3>Image</h3>
                        <input type="file" id="files" onChange={this.fileSelected} />
                    </div>

                    <div className="sidebar-area">
                        <h3>Background</h3>
                       <select>
                           <option>White</option>
                           <option>Black</option>
                           <option>Gray</option>
                       </select>
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
                    {selectedArea ? `Editing ${selectedArea}` : 'Roblox Shirt Creator'}
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