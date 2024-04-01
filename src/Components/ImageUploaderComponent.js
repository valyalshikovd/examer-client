import {useEffect, useState} from "react";
import {Button} from "@material-ui/core";
import backend_url from "../index";

const ImageUploaderComponent = (props) => {
    const [image, setImage] = useState(null)
    const [on, setOn] = useState(false)
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const handleOn = () => {
        setOn(!on)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0]
        const reader = new FileReader()

        setImage(file)
        props.handleSetImage(file)

        reader.onload = () => {
            setImage(reader.result)
        }
        reader.readAsDataURL(file)
    };

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            {
                on ? (<div>{

                       (width > 400 && height > 700) ? (
                           <div>
                               {
                               image ? (
                               <img src={image} style={{maxWidth: '100%', maxHeight: '300px'}} alt={"загружено"}/>
                               ) : (
                               <div
                                   style={{
                                       border: '2px dashed #ccc',
                                       padding: '20px',
                                       textAlign: 'center',
                                       width: '100vw', // ширина равна ширине экрана
                                       height: '100vh', // высота равна высоте экрана
                                       position: 'fixed', // позиционируем абсолютно
                                       top: 0, // вверху экрана
                                       left: 0
                                   }}
                                   onDrop={handleDrop}
                                   onDragOver={handleDragOver}>
                                   перетените изображение на экран
                               </div>)
                               }
                           </div>
                    ) : (
                           <div>
                               <div>
                                   <div>
                                       <input type="file" onChange={handleFileChange}/>
                                       {image && <img src={image} alt="Uploaded"/>}
                                   </div>
                                   {image && (
                                       <div>
                                       <p>Selected file: {image.name}</p>
                                           <p>File size: {image.size} bytes</p>
                                       </div>
                                   )}
                               </div>
                           </div>
                       )} </div>) : (<Button fullWidth={true} onClick={handleOn}>прикрепить фотографию</Button>)
            }
        </div>
    )

}


export default ImageUploaderComponent