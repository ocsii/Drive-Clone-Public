import { Devices as DevicesIcon } from "@mui/icons-material";
import { PeopleAltOutlined as PeopleAltOutlinedIcon } from "@mui/icons-material";
import { QueryBuilderOutlined as QueryBuilderOutlinedIcon } from "@mui/icons-material";
import { StarBorderOutlined as StarBorderOutlinedIcon } from "@mui/icons-material";
import { DeleteOutlineOutlined as DeleteOutlineOutlinedIcon } from "@mui/icons-material";
import { CloudQueue as CloudQueueIcon } from "@mui/icons-material";
import { HomeRounded as HomeIcon } from "@mui/icons-material";
import { ReportOutlined as ReportOutlinedIcon } from "@mui/icons-material";
import { Add as PlusIcon } from "@mui/icons-material";
import { Modal } from '@mui/material';

import styled from "styled-components";
import { useState } from "react";

import { storage, db, serverTimestamp } from '../firebase';  // 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { doc, setDoc } from 'firebase/firestore'; 




const SidebarContainer = styled.div`

`

const SidebarButton = styled.div`
    button {
        display: flex;
        align-items: center;
        // background: transparent;
        background-color: white;
        border: 1px solid #f8f9fa;
        border-radius: 15px;
        padding:  15px 10px 15px 15px;
        margin: 10px 25px 8px 25px;
        box-shadow: 1px 1px 1px 1.5px rgb(32 33 36 / 28%);
        cursor: pointer;
        span {
            font-size: 14px;
            font-weight: 500;
            color: rgb(31, 31, 31);
            margin: auto 20px auto 10px;            
        }
    }
`

const SidebarOptions = styled.div`
    margin-top: 10px;

    .progress-bar {
        padding: 0px 20px;
            margin: 0px 20px;

    }

    .progress-bar span {
        display: block;
        color: #333;
        font-size: 13px;
`

const SidebarOption = styled.div`
    display: flex;
    align-items: center;
    padding: 6px 20px;
    margin: 0px 20px;

    border-radius: 100px;

    &:hover {
        background-color: rgb(194,231,255);
        cursor: pointer;
    }

    svg.MuiSvgIcon-root {
        color: rgb(31, 31, 31);
    }
    
    span {
        font-family: 'Google Sans',Roboto,Arial,sans-serif;
        margin-left: 15px;
        color: rgb(31, 31, 31);
        font-size: 14px;
        font-weight: 400;    
}
    
`

const ModalPopup = styled.div`
    top: 50%;
    background-color: #fff;
    width: 500px;
    margin: 0px auto;
    position: relative;
    transform: translateY(-50%);
    padding: 10px;
    border-radius: 10px;
`

const ModalHeading = styled.div`
    text-align: center;
    border-bottom: 1px solid lightgray;
    height: 40px;
`

const ModalBody = styled.div`
    input.modal__submit {
        width: 100%;
        background: darkmagenta;
        padding: 10px 20px;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 5px;
        font-size: 16px;
        border: 0;
        outline: 0;
        border-radius: 5px;
        cursor: pointer;
        margin-top:20px
    }
    input.modal__file {
        background: whitesmoke;
        padding: 20px;
        color: #000;
        display: block;
        margin-top:20px
    }
`

const UploadingPara = styled.p`
    background: green;
    color: #fff;
    margin: 20px;
    text-align: center;
    padding: 10px;
    letter-spacing: 1px;
`

// ...existing code...






const Sidebar = () => {

    const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [file, setFile] = useState(null);
    const handleFile = e => {
        if (e.target.files[0]) setFile(e.target.files[0]);
    }



const handleUpload = async (e) => {
  e.preventDefault();

  if (!file) {
    alert("No file selected!");
    return;
  }

  setUploading(true);

  // Create a reference to the file in Firebase Storage
  const fileRef = ref(storage, `files/${file.name}`);

  try {
    // Upload the file
    const snapshot = await uploadBytes(fileRef, file);
    console.log("Uploaded file:", snapshot);

    // Get the download URL
    const url = await getDownloadURL(fileRef);

    await setDoc(doc(db, "myfiles", file.name), {
        timestamp: serverTimestamp(),
        filename: file.name,
        fileURL: url,
        size: snapshot.metadata.size, // Use snapshot.metadata for file size
    });

    // // Save the file metadata to Firestore
    // await db.collection("myfiles").add({
    //   timestamp: serverTimestamp(),
    //   filename: file.name,
    //   fileURL: url,
    //   size: snapshot.metadata.size, // Use snapshot.metadata for file size
    // });

    alert("File uploaded successfully!");
  } catch (error) {
    console.error("Error uploading file:", error);
    alert(error);
  } finally {
    setUploading(false);
    setFile(null);
    setOpen(false);
  }
};



 

    
    
  return (
    <>
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalPopup>
                <form>
                    <ModalHeading>
                        <h3> Select file to upload </h3>
                    </ModalHeading>
                    <ModalBody>
                        {uploading ? <UploadingPara> Uploading... </UploadingPara> :
                            (
                                <>
                                    <input type="file" className="modal__file" onChange={handleFile} />
                                    <input type="submit" value="Upload" className="modal__submit" onClick={handleUpload} />
                                </>
                            )
                        }
                    </ModalBody>
                </form>
            </ModalPopup>
        </Modal>


        <SidebarContainer>
            <SidebarButton>
                <button onClick={() => setOpen(true)}>

                    <PlusIcon />
                    <span> New </span>
    {/* 
                    <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E"/> */}
                    {/* <span>New</span> */}
                </button>
            </SidebarButton>

            <SidebarOptions>
                

                <SidebarOption class="option" option-active>
                    <HomeIcon /><span>Home</span>
                </SidebarOption>

                <SidebarOption class="option">
                    <DevicesIcon /><span>Computers</span>
                </SidebarOption>

            </SidebarOptions>


            <br/>

            <SidebarOptions>


                <SidebarOption class="option">
                    <PeopleAltOutlinedIcon /><span>Shared with me</span>
                </SidebarOption>

                <SidebarOption class="option">
                    <QueryBuilderOutlinedIcon /><span>Recent</span>
                </SidebarOption>

                <SidebarOption class="option">
                    <StarBorderOutlinedIcon /><span>Starred</span>
                </SidebarOption>
            
            </SidebarOptions>


            <br/>

            <SidebarOptions>

            
                <SidebarOption class="option">
                    <DeleteOutlineOutlinedIcon /><span>Trash</span>
                </SidebarOption>

                <SidebarOption class="option">
                    <ReportOutlinedIcon /><span>Spam</span>
                </SidebarOption>
                
                <SidebarOption>
                        <CloudQueueIcon />
                        <span>Storage</span>
                </SidebarOption>

                <div className="progress-bar">
                        <progress value="2" max="100"/>
                        <span> 2.2 GB of 100 GB used</span>
                </div>

            </SidebarOptions>

        </SidebarContainer>

    </>
  )
}

export default Sidebar
