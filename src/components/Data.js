import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import { List as ListIcon } from '@mui/icons-material';
import { InfoOutlined as InfoOutlinedIcon } from '@mui/icons-material';
import { InsertDriveFile as InsertDriveFileIcon } from '@mui/icons-material';
import { ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import { useState, useEffect } from 'react';

import styled from 'styled-components';

import { deleteDoc, doc, collection, onSnapshot } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { storage, db } from '../firebase'; 

const DataContainer = styled.div`
    flex: 1 1;
    padding: 10px 50px 0px 20px;
    background-color: white;
    border-radius: 20px;
`

const DataHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border-bottom: 1px solid lightgray;
    height: 40px;
    .headerLeft {
        display: flex;
        align-items: center;
    }
    .headerRight svg {
        margin:0px 10px;
    }
`

const DataGrid = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
`

const DataFile = styled.div`
    text-align: center;
    border: 1px solid rgb(204 204 204 / 46%);
    margin: 10px;
    min-width: 200px;
    padding: 10px 0px 0px 0px;
    border-radius: 5px;
    svg {
        font-size: 60px;
        color:gray
    }
    p {
        border-top: 1px solid #ccc;
        margin-top: 5px;
        font-size: 12px;
        background: whitesmoke;
        padding: 10px 0px;
    }
`

const DataListRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    p {
        display: flex;
        align-items: center;
        font-size: 13px;
        
        b {
            display: flex;
            align-items: center;
        }
        svg {
            font-size: 22px;
            margin:10px
        }
    }
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red; // Change color as needed

  &:hover {
    color: darkred; // Change color as needed
  }
`


const handleDelete = async (fileName) => {
  if (!fileName) {
    alert("No file selected for deletion!");
    return;
  }

  const fileRef = ref(storage, `files/${fileName}`);

  try {
    await deleteObject(fileRef);
    console.log("Deleted file from storage:", fileName);

    await deleteDoc(doc(db, "myfiles", fileName));
    console.log("Deleted file metadata from Firestore:", fileName);

    alert("File deleted successfully!");
  } catch (error) {
    console.error("Error deleting file:", error);
    alert(error);
  }
};


const Data = ( {user} ) => {

    const [files, setFiles] = useState([]);

    useEffect(() => {

        const filesCollection = collection(db, 'myfiles');
        const unsubscribe = onSnapshot(filesCollection, (snapshot) => {
            setFiles(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        });

        return () => unsubscribe();
    }, [])

    const changesToMb = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }


  return (
    <DataContainer>
        <DataHeader>
            <div className="headerLeft">
                <p> My Drive </p>
                <ArrowDropDownIcon/>
                
            </div>
            <div className="headerRight">
                
                <ListIcon/>
                <InfoOutlinedIcon/>
            </div>


        </DataHeader>

        <div>
            <DataGrid>

                {files.map(file => (
                    <DataFile key={file.id}>
                        <InsertDriveFileIcon/> 
                        <p> {file.item.filename} </p>
                    </DataFile>
                ))}

            </DataGrid>

            <div>
                <DataListRow>
                    <p><b>Name <ArrowDownwardIcon /> </b></p>
                    <p><b>Owner</b></p>
                    <p><b>Last Modified</b></p>
                    <p><b>File Size</b></p>
                    <p><b>Delete</b></p>
                </DataListRow>

                {files.map(file => (
                    <DataListRow key={file.id}>
                        <a href={file.item.fileURL} target="_blank" style={{ width: '10%'}}>
                            <p><InsertDriveFileIcon/> {file.item.filename} </p>
                        </a>
                        <p>{user?.displayName || "Unknown Owner"}</p>
                        <p> {new Date(file.item.timestamp?.seconds*1000).toUTCString()} </p>
                        <p> {changesToMb(file.item.size)} </p>
                        <DeleteButton onClick={() => handleDelete(file.item.filename)}>
                            <DeleteIcon />
                        </DeleteButton>
                    </DataListRow>
                ))}
            </div>

        </div>
        
    </DataContainer>
  )
}

export default Data
