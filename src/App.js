import axios from 'axios';
import React, { Component } from 'react';

class App extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
    base64File: ""
  };

  // On file select (from the pop up)
  onFileChange = async event => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });

    const file = event.target.files[0]
    const base64 = await this.convertBase64(file)
    console.log(base64)
    this.setState({ base64File: base64 });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("file_base64", this.state.base64File);
    formData.append("file_name", this.state.selectedFile.name);
    formData.append("name", "prueba axios filename word 2");
    formData.append("city", "1");
    formData.append("address", "direcion");
    formData.append("longitude", "1");
    formData.append("latitude", "2");
    formData.append("client", "1");

    // Details of the uploaded file
    //console.log(this.state.selectedFile);

    const jsonData = {
        "name": "prueba multiple site base64",
        "country": 1,
        "service_manager": 4,
        "sites": [
          {
            "name": "sitebase1",
            "city": "1",
            "address": "string",
            "longitude": "1",
            "latitude": "2",
            "file_base64": this.state.base64File,
            "file_name": this.state.selectedFile.name
          },
          {
            "name": "sitebase2",
            "city": 1,
            "address": "string",
            "longitude": "3",
            "latitude": "4",
            "file_base64": this.state.base64File,
            "file_name": this.state.selectedFile.name
          },
          {
            "name": "sitebase3",
            "city": 1,
            "address": "string",
            "longitude": "5",
            "latitude": "6",
            "file_base64": this.state.base64File,
            "file_name": this.state.selectedFile.name
          }
        ]
    };


    // Request made to the backend api
    // Send formData object
    axios.post("http://localhost:8000/api/clients/", jsonData);
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {

      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  render() {
    return (
      <div>
        <h1>
          GeeksforGeeks
        </h1>
        <h3>
          File Upload using React!
        </h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Upload!
          </button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default App;
