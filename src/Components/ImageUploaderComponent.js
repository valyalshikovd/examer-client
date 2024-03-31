import {useEffect, useState} from "react";


const ImageUploaderComponent = (props) => {
    const [image, setImage] = useState(null)

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
        <div
            style={{border: '2px dashed #ccc', padding: '20px', textAlign: 'center'}}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            {
                image ? (
                    <img src={image} style={{maxWidth: '100%', maxHeight: '300px'}} alt={"загружено"}/>
                ) : (
                    <div>
                        перетяните изображение сюда
                    </div>)
            }
            <div
                style={{
                    border: '2px dashed #ccc',
                    padding: '20px',
                    textAlign: 'center',
                    width: '100vw', // ширина равна ширине экрана
                    height: '100vh', // высота равна высоте экрана
                    position: 'fixed', // позиционируем абсолютно
                    top: 0, // вверху экрана
                    left: 0 // слева экрана
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}>
            </div>
        </div>
    )
}


export default ImageUploaderComponent