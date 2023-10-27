import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Icon } from "../../../../components/Component";
import Dropzone from "react-dropzone";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const Home = ({
  data, setData, toggleCreateModal, 
  searchText, setSearchText, toggleUploadModal, 
  toggleScreenLg
}) => {
  const [files, setFiles] = useState([]);
  const [productName, setProductName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [serverResponse, setServerResponse] = useState({});
  const [productDescription, setProductDescription] = useState("");
  
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    console.log("file", files);
  }, [files]);

  const handleDropChange = acceptedFiles => {
    setFiles(
      acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
      }))
    );
    setProductDescription("");
    setProductName("");
  };

  const handleSave = async () => {
    if (files.length > 3 && files.length <= 5) {
      setUploading(true);
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));
      formData.append('name', productName);
      formData.append('description', productDescription);
      
      try {
        const response = await axios.post(
          "http://localhost:8080/api/product/create",
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setServerResponse({...response.data.data});
        setUploading(false);
        setModalOpen(true);
      } catch (error) {
        setUploading(false);
        setServerResponse(error.message);
        setModalOpen(true);
      }
    }
  };

  const truncateFileName = name => {
    return name.length > 10 ? name.substring(0, 10) + "..." : name;
  };

  return (
    <React.Fragment>
      <BlockHead size="sm">
        <BlockBetween className="position-relative">
          <BlockHeadContent>
            <BlockTitle page>Home</BlockTitle>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>

      {uploading ? (
        <div className="uploading-spinner">
          <BeatLoader color={"#123abc"} loading={uploading} size={15} />
        </div>
      ) : (
        <UploadZone 
          files={files}
          productName={productName}
          setProductName={setProductName}
          productDescription={productDescription}
          setProductDescription={setProductDescription}
          handleDropChange={handleDropChange}
          handleSave={handleSave}
          truncateFileName={truncateFileName}
        />
      )}

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
        <ModalHeader toggle={() => setModalOpen(false)}>Server Response</ModalHeader>
        <ModalBody>
          {serverResponse.name}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

const UploadZone = ({ 
  files, productName, setProductName, productDescription,
  setProductDescription, handleDropChange, handleSave, truncateFileName
}) => (
  <Block className="nk-fmg-listing">
    <h5>Please Upload your car images ( 4 - 5 images) </h5>
    <Dropzone maxFiles={5} onDrop={acceptedFiles => handleDropChange(acceptedFiles)}>
      {({ getRootProps, getInputProps }) => (
        <section className="nk-fmg-listing">
          <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
            <input {...getInputProps()} />
            {files.length === 0 && (
              <div className="dz-message" style={{"marginTop":"3rem","marginBottom":"3rem"}}>
                <span className="dz-message-text">Drag and drop file</span>
                <span className="dz-message-or">or</span>
                <Button color="primary">SELECT</Button>
              </div>
            )}
            {files.map(file => (
              <div key={file.name} className="dz-preview dz-processing dz-image-preview dz-error dz-complete">
                <div className="dz-image mb-3">
                  <img src={file.preview} alt="preview" />
                </div>
                <div className="">
                  <b>Name: </b>{truncateFileName(file.name)}
                </div>
                <div className="">
                  <b>Size: </b>{file.size} Mo
                </div>
              </div>
            ))}
          </div>
          {files.length !== 0 && files.length >3 && (
            <div>
              <form>
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name">Group Name</label>
                  <div className="form-control-wrap">
                    <input 
                      className="form-control"
                      type="text"
                      value={productName}
                      onChange={e => setProductName(e.target.value)} 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email-address">Description</label>
                  <div className="form-control-wrap">
                    <input 
                      className="form-control"
                      value={productDescription}
                      onChange={e => setProductDescription(e.target.value)}
                    />
                  </div>
                </div>
              </form>
              <div className="form-group mt-2 d-flex justify-content-end">
                <Button color="primary" size="lg" onClick={handleSave}>
                  Save Informations
                </Button>
              </div>
            </div>
          )}
        </section>
      )}
    </Dropzone>
  </Block>
);

export default Home;
