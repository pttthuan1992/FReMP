import { useState } from "react";

export default function Main() {
  let uploadRef = null;
  const [selectedFiles, setSelectedFiles] = useState({});
  
  function UploadVideo(e) {
    const files = e.target.files || e.dataTransfer.files;
    console.log(files)
    setSelectedFiles(files)
  }
  function ReviewFiles(){
    return (
        <div className="review-files">
          {
            Array.from(selectedFiles).map(function(file, index){
              return <div key={file.name}>{file.name}</div>      
            })
          }
        </div>
    )
  }
  return (
    // Todo: onfly format video, Allow to remove single uploaded video, format , show number of selected
    <main>
        <div className="main-introduce">Upload or drop your video</div>
        <input className="hidden" type="file" ref={(ref) => uploadRef = ref} onChange={UploadVideo.bind(this)} multiple></input>
        <div className="main-upload-container" onClick={()=>uploadRef.click()}>
            <i className="fas fa-cloud-upload-alt main-upload-icon"></i>
        </div>
        <ReviewFiles></ReviewFiles>
    </main>
  );
}



