import {Button} from "@material-ui/core";
import {useEffect, useState} from "react";
import TaskEdit from "./TaskEdit";

const TaskComponent = (props) => {
    const [imageSrc, setImageSrc] = useState('')
    const [updateCheck, setUpdateCheck] = useState(false)
    const [imageId, setImageId] = useState(null)
    const [item, setItem] = useState(props.item)
    const handleUpd = () => {
        setUpdateCheck(!updateCheck)
    }
    const updateItem = (item) => {
        setItem(item)
    }


    useEffect(() => {

        //код осуществляющий получение индексов фотографий и взвращает эти самые фотографии

        let url = "http://127.0.0.1:8080/api/v1/images/indicies/" + props.item.id
        let imageId

        fetch(url).then(
            async (response) => {
                imageId = await response.text()
            }
        ).then(
            () => {
                url = "http://127.0.0.1:8080/api/v1/images/" + imageId[1]
                setImageId(imageId)
                fetch(url).then(
                    (response) => {
                        return response.blob();
                    }
                ).then(
                    blob => {
                        const url = URL.createObjectURL(blob)
                        setImageSrc(url)
                    }
                )
            }
        )
    }, [item])

    return (
        <div>
            {
                updateCheck ? (
                    <div>
                        <TaskEdit handleBack={handleUpd}
                                  item={item}
                                  imageId={imageId}
                                  upd={props.forceUpdate}
                                  updateItem={updateItem}
                        ></TaskEdit>
                    </div>
                ) : (
                    <div>
                        <div><Button fullWidth={true} onClick={props.handleDeleteClicked}>назад</Button></div>
                        <div><Button fullWidth={true} onClick={handleUpd}>редактор</Button></div>
                        <div>
                            {item.num}
                            {item.question}
                            {item.description}
                            {item.answer}
                            <img src={imageSrc} alt={"бля"}/>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default TaskComponent
