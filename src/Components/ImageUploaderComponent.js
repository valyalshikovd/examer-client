import {useState} from "react";


const ImageUploaderComponent = (props) => {
    const [image, setImage] = useState(null)

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result.split(',')[1]; // Получаем строку Base64, удаляя "data:image/jpeg;base64,"
            console.log(reader.result)
            setImage(reader.result); // Устанавливаем строку Base64 как изображение

            // Вызываем функцию handleSetImage и передаем ей строку Base64
            props.handleSetImage(base64String);
        };

        reader.readAsDataURL(file);
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

        </div>
    )
}


export default ImageUploaderComponent