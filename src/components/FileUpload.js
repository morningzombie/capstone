import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import qs from 'qs';
import { BrowserRouter as Router, Link } from 'react-router-dom';
// let uploads = require.context("./uploads", true);
// import Jazzi from "../../public/uploads/Jazzi.jpg";

const FileUpload = ({ auth, params }) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        // const res = await axios.post("http://localhost:3090/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        },
      });
      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      console.log('filePath', filePath);
      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        console.log('PROBLEM WITH SERVER');
        setMessage('There was a problem with the server');
      } else {
        console.log('PROBLEM HERE', err.response.data.msg);

        setMessage(err.response.data.msg);
      }
    }
  };
  console.log('file', { uploadedFile });

  // let myimg = uploads(`../../public/uploads/Jazzi.JPG`);
  // let myimg = `/uploads/${file.name}`;
  // console.log(myimg);
  console.log('HERE', uploadedFile.filePath);

  return (
    <Fragment>
      <div className="container">
        <h4 className="display-4 text-center mb-4">Welcome!</h4>
        <h5 className="display-6 text-center mb-4">
          Add a photo so people know who you are
        </h5>
        {message ? <Message msg={message} /> : null}
        <form onSubmit={onSubmit}>
          <div className="custom-file mb-4">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={onChange}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {filename}
            </label>
          </div>

          <Progress percentage={uploadPercentage} />

          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block mt-4"
          />
        </form>

        {uploadedFile ? (
          <div className="row mt-5">
            <div className="col-md-6 m-auto">
              <h3 className="text-center">{uploadedFile.fileName}</h3>
              <img
                style={{ width: '100%' }}
                src={uploadedFile.filePath}
                alt=""
              />
            </div>
            {/* <img
              // src="http://localhost:3090/public/uploads/Jazzi.jpg"
              src="../../uploads/Jazzi.jpg"
              // src={Jazzi}
              style={{ width: "100%" }}
              // className="App-logo"
              alt="logo"
            /> */}
          </div>
        ) : null}
        <div className="nav-item">
          <Link className="nav-link" to="/userinfo">
            Skip This Step
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default FileUpload;
