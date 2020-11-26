import React, { useCallback, useState } from 'react';
import firebase from '@firebase/app';
import '@firebase/storage';
import { useDropzone } from 'react-dropzone';
import Container from '../../atoms/Container/Container';
import Text from '../../atoms/Text/Text';
import './UploadImage.css';

function UploadImage(props) {
  const [imageUrl, setImageUrl] = useState(null);
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles?.[0];
    if (!file) {
      return;
    }
    try {
      let url = await uploadFromBlobAsync({
        directory: props.directory ? props.directory : '',
        url: URL.createObjectURL(file),
        name: `${file.name}_${Date.now()}`,
      });
      props.onUpload(url);
      setImageUrl(url);
    } catch (e) {}
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Container
      className={'lho_upload_image'}
      style={{
        ...props.style,
        ...{ backgroundImage: 'url(' + imageUrl + ')' },
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} accept={'image/x-png,image/gif,image/jpeg'} />
      {!imageUrl && (
        <React.Fragment>
          {isDragActive ? (
            <Text text={'Drop the image here'} style={{ cursor: 'pointer' }} />
          ) : (
            <Text
              text={'Drop the image here, or click to select a image'}
              style={{ cursor: 'pointer' }}
            />
          )}
        </React.Fragment>
      )}
    </Container>
  );
}
export default UploadImage;
async function uploadFromBlobAsync({ directory, url, name }) {
  if (!url || !name) return null;
  try {
    const blob = await fetch(url).then((r) => r.blob());
    const snapshot = await firebase
      .storage()
      .ref('/' + directory)
      .child(name)
      .put(blob);
    return await snapshot.ref.getDownloadURL();
  } catch (error) {
    throw error;
  }
}
