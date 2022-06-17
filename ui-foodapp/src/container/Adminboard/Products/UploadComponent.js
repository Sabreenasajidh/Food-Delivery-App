import React from 'react'
import { useDropzone } from "react-dropzone";

function UploadComponent(props) {
    const { setFieldValue } = props;
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: "image/*",
      onDrop: acceptedFiles => {
        setFieldValue("files", acceptedFiles);
      }
    });
    console.log(props);
    return (
      <div>
        {/* {}
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div> */}
      </div>
    );
}

export default UploadComponent

// const UploadComponent = props => {
    
//   };