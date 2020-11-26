import React, { useCallback, useState } from 'react';
import firebase from '@firebase/app';
import '@firebase/storage';
import { useDropzone } from 'react-dropzone';

let containerStyle = {
  background: '#dadada',
  width: 250,
  height: 250,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 50,
  textAlign: 'center',
};
function UploadImage() {
  const [imageUrl, setImageUrl] = useState({});
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles?.[0];
    if (!file) {
      return;
    }
    try {
      let url = await uploadFromBlobAsync({
        blobUrl: URL.createObjectURL(file),
        name: `${file.name}_${Date.now()}`,
      });
      setImageUrl({ backgroundImage: 'url(' + url + ')' });
    } catch (e) {}
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div style={{ ...containerStyle, ...imageUrl }} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
export default UploadImage;
async function uploadFromBlobAsync({ blobUrl, name }) {
  if (!blobUrl || !name) return null;
  try {
    const blob = await fetch(blobUrl).then((r) => r.blob());
    const snapshot = await firebase
      .storage()
      .ref('/avatar')
      .child(name)
      .put(blob);
    return await snapshot.ref.getDownloadURL();
  } catch (error) {
    throw error;
  }
}
