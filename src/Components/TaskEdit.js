import ImageUploaderComponent from "./ImageUploaderComponent";
import {Button, TextField} from "@material-ui/core";
import {useEffect, useState} from "react";
import backend_url from "../index";

const TaskEdit = (props) => {

    const [name, setName] = useState(props.name)
    const [text, setText] = useState(props.item.question)
    const [description, setDescription] = useState(props.item.description)
    const [answer, setAnswer] = useState(props.item.answer)
    const [image, setImage] = useState(null)


    useEffect(() => {
        console.log(props)
    }, []);
    const handleSetImage = (image) => {
        setImage(image)
    }
    const handleSetName = (e) => {
        setName(e.target.value)
    }
    const handleSetText = (e) => {
        setText(e.target.value)
    }

    const handleSetDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleSetAnswer = (e) => {
        setAnswer(e.target.value)
    }

    const handleBack = () => {
        props.handleBack()
    }

    const saveTask = () => {
        const url = backend_url + "task/edit/" + props.item.id
        let data = JSON.stringify({
            examId: props.item.examId,
            num: props.item.num,
            question: text,
            description: description,
            answer: answer,
            imageList:  props.imageId,
            date: props.item.date
        })
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        };

        let item
        fetch(url, options)
            .then(async (response) => {
                item = await response.json()
            }
        ).then( () => {
            if(image === null) {
                props.updateItem(item)
                props.item.question = text
                props.item.description = description
                props.item.answer = answer
                handleBack()
                return
            }
            let imageId = props.imageId
            if(imageId === null)
                imageId = " 0"
            const url = backend_url + "images/" + imageId[1]
            const options = {
                method: 'DELETE'
            };
            fetch(url, options).then(
                (response) => {
                    console.log(response)
                }
            ).then(
                () => {
                    const formData = new FormData();
                    formData.append("file", image)
                    const options = {
                        method: 'POST',
                        body: formData
                    };
                    fetch(backend_url +"images/addPhoto/"+ props.item.id, options).then(
                        (response) => {
                            console.log(response)
                        }
                    ).then(
                        () => {
                            console.log("Вообще доходит ли до этого?")
                            props.item.question = text
                            props.item.description = description
                            props.item.answer = answer
                            handleBack()
                        }
                    )
                }
            )
        })
    }


    return (
        <div >
            <div>
                <div><TextField fullWidth={true} label={"Введите вопрос"} value={text}
                                onChange={handleSetText}/></div>
                <div><TextField fullWidth={true} label={"Введите описание"} value={description}
                                onChange={handleSetDescription}/></div>
                <div><TextField fullWidth={true} label={"введите ответ"} value={answer}
                                onChange={handleSetAnswer}/></div>
                <div><ImageUploaderComponent handleSetImage={handleSetImage}></ImageUploaderComponent></div>
                <div><Button fullWidth={true} onClick={saveTask}>сохранить</Button></div>
                <div><Button fullWidth={true} onClick={handleBack}>назад</Button></div>
                {/*{error !== '' ? (*/}
                {/*    <ErrorString string={error}></ErrorString>*/}
                {/*) : (<div></div>)}*/}
            </div>
        </div>
    )
}

export default TaskEdit