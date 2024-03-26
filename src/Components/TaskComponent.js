import {Button} from "@material-ui/core";
import {useEffect, useState} from "react";
import TaskEdit from "./TaskEdit";

const TaskComponent = (props) => {
    const [imageSrc, setImageSrc] = useState('')
    const [updateCheck, setUpdateCheck] = useState(false)
    const [imageId, setImageId] = useState(null)

    const handleUpd = () =>{
        setUpdateCheck(!updateCheck)
    }

    useEffect(() => {


        let url = "http://127.0.0.1:8080/api/v1/images/indicies/" + props.item.id

        console.log(props)

        let text

        fetch(url).then(
            async (response) => {
                text = await response.text()
            }
        ).then(
            () => {
                url = "http://127.0.0.1:8080/api/v1/images/" + text[1]
                setImageId(text)

                fetch(url).then(
                    (response) => {
                        return response.blob();
                    }
                ).then(
                    blob => {
                        const url = URL.createObjectURL(blob)
                        setImageSrc(url)
                        console.log("поидее меняется")

                    }
                )

                console.log(url)
            }
        )


    }, [])

    return (
        <div>
            {
                updateCheck ? (
                    <div>
                        <TaskEdit handleBack = {handleUpd}
                                  item = {props.item}
                                  imageId = {imageId}

                        ></TaskEdit>
                    </div>
                ) : (
                    <div>
                        <div><Button fullWidth={true} onClick={props.handleDeleteClicked}>назад</Button></div>
                        <div><Button fullWidth={true} onClick={handleUpd}>редактор</Button></div>
                        <div>
                            {props.item.num}
                            {props.item.question}
                            {props.item.description}
                            {props.item.answer}
                            <img src={imageSrc} alt={"бля"}/>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default TaskComponent
