import {Button} from "@material-ui/core";
import {useEffect, useState} from "react";
import TaskEdit from "./TaskEdit";
import "../TaskComponent.css"

const TaskComponent = (props) => {
    const [imageSrc, setImageSrc] = useState('')
    const [updateCheck, setUpdateCheck] = useState(false)
    const [imageId, setImageId] = useState(null)
    const [item, setItem] = useState(props.item)
    const [answerView, setAnswerView] = useState(false)
    const handleUpd = () => {
        setUpdateCheck(!updateCheck)
    }
    const updateItem = (item) => {
        setItem(item)
    }


    useEffect(() => {

        setImageSrc('')

        setAnswerView(false)
        //код осуществляющий получение индексов фотографий и взвращает эти самые фотографии

        let url = "http://127.0.0.1:8080/api/v1/images/indicies/" + props.item.id
        let imageId

        fetch(url).then(
            async (response) => {
                imageId = await response.text()
            }
        ).then(
            () => {
                if (imageId[1] === "]")
                    return
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
    }, [item, props.item, updateCheck])

    return (
        <div className={"container"}>
            {
                updateCheck ? (
                    <div>
                        <TaskEdit handleBack={handleUpd}
                                  item={item}
                                  imageId={imageId}
                                  upd={props.forceUpdate}
                                  updateItem={updateItem}
                                  updateList = {props.updateTaskList}
                        ></TaskEdit>
                    </div>
                ) : (
                    <div style={{overflow : "auto"}}>
                        <div className={"button-wrapper-right"}>
                            <div><Button fullWidth={true} onClick={props.handleDeleteClicked}>назад</Button></div>
                        </div>
                        <div className={"button-wrapper-left"}>
                            <div><Button fullWidth={true} onClick={handleUpd}>редактор</Button></div>
                        </div>
                        <div className={"component"}>
                            <div className={"question"}>
                                #{props.item.num + 1} {props.item.question}
                            </div>
                            {
                                answerView ? (<div >
                                    <div className={"answer"}>
                                        <p>{props.item.description}</p>
                                        <p>{props.item.answer}</p>
                                    </div>
                                    {
                                        imageSrc !== '' ? (<img className={"image"} src={imageSrc}/>) : (<div></div>)
                                    }
                                </div>) : (
                                    <div onClick={() => {
                                        setAnswerView(!answerView)
                                    }}>
                                        <div className={"hidden-answer"}>
                                            Ответ скрыт. Показать?
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default TaskComponent
