import { useState } from "react";
import { Ticket } from "../../../models/Ticket";
import "./TicketUpload.scss";

interface props {
  onSubmit: Function;
  tickets: Ticket[];
  isCurrent: boolean;
}

function TicketUpload(props: props): JSX.Element {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const addNewFiles = (event: any, files: FileList | null) => {
    event.preventDefault();
    if (!files) return;
    const newFilesArray: any = [...uploadedFiles];
    for (let i = 0; i < files.length; i++) {
      newFilesArray.push(files[i]);
    }
    setUploadedFiles(newFilesArray);
    const isValid = newFilesArray.length === props.tickets.length;
    props.onSubmit(newFilesArray, isValid);
  };

  const removeFile = (file: File) => {
    const newFilesArray = [...uploadedFiles].filter((f) => f !== file);
    setUploadedFiles(newFilesArray);
    props.onSubmit(newFilesArray, false);
  };

  return (
    <div
      className="sell-ticket-section-wrapper"
      style={{ opacity: props.isCurrent ? 1 : 0 }}
    >
      <div className="TicketUpload">
        <h5 className="sell-ticket-section-header">
          Please upload your ticket
        </h5>
        <div className="input-label-container">
          <h6 className="upload-file-header">Upload File</h6>
          <label
            htmlFor="upload-ticket"
            className="upload-ticket-label"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(e) => addNewFiles(e, e.dataTransfer.files)}
          >
            <i className="fa-solid fa-file-lines"></i>
            {props.tickets.length === uploadedFiles.length ? (
              <span className="done-check-span">Done ✔</span>
            ) : (
              <>
                Drag & Drop <br />
                Or <br />
                <span>Browse</span>
              </>
            )}
          </label>

          <div className="user-files-area">
            {props.tickets.map((t, i) => (
              <div key={i}>
                {!uploadedFiles[i] ? (
                  <div className="ticket-image-bg-holder">{i + 1}</div>
                ) : (
                  <>
                    <label
                      className="remove-btn-holder"
                      onClick={() => removeFile(uploadedFiles[i])}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </label>
                    <img
                      src={URL.createObjectURL(uploadedFiles[i])}
                      alt="file"
                      className="ticket-image"
                    />
                    <span className="image-index">{i + 1}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <input
          type="file"
          id="upload-ticket"
          accept="image/*"
          className="upload-ticket-input"
          onChange={(e) => addNewFiles(e, e.target.files)}
          multiple
          disabled={props.tickets.length === uploadedFiles.length}
          hidden
        />
      </div>
    </div>
  );
}

export default TicketUpload;
