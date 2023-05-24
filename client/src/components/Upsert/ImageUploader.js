import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';

const ImageUploader = ({ setImages, currentImages }) => {
    const [files, setFiles] = useState([]);
    const [uploads, setUploads] = useState([]);
    const [img, setImg] = useState([])

    const handleAcceptedFiles = (files) => {
        setImg([])
        files.map((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(prev => [...prev, reader.result])
            };
            reader.readAsDataURL(file);
            Object.assign(file, {
                preview:
                    file['type'].split('/')[0] === 'image'
                        ? URL.createObjectURL(file)
                        : null,
                formattedSize: file.size,
            })
        });
        setUploads(files);
    };

    useEffect(() => {
        setImages(img)
    }, [img]);

    useEffect(() => {
        handleAcceptedFiles(files);
    }, [files]);

    return (
        <div class='upload-container'>
            <Dropzone
                accept='image/*'
                minSize={0}
                maxFiles={5}
                onDrop={(acceptedFiles) => {
                    setFiles(acceptedFiles);
                }}>
                {({ getRootProps, getInputProps }) => (
                    <div>
                        <div className='dropzone'>
                            <div className='dz-message py-2 needsclick' {...getRootProps()}>
                                <input {...getInputProps()} />
                                <h3>Click to upload upto 5 images</h3>
                                <i class='far fa-cloud-upload-alt'></i>
                            </div>
                        </div>
                        {
                            uploads.length > 0 ? uploads.length > 0 &&
                                uploads.map((upload) => {
                                    return <img src={upload.preview} alt='' />;
                                }) : currentImages && currentImages.length > 0 &&
                            currentImages.map((img) => {
                                return <img src={img} alt='' />;
                            })
                        }

                    </div>
                )}
            </Dropzone>
        </div>
    );
};

export default ImageUploader;
