
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useLayoutEffect, useState} from "react";
import ImageUploaderComponent from "./ImageUploaderComponent";
import backend_url from "../index";

const AddTaskComponent = (props) => {


    const [name, setName] = useState()
    const [text, setText] = useState("")
    const [description, setDescription] = useState("")
    const [answer, setAnswer] = useState("")
    const [image, setImage] = useState()

    const handleSetImage = (image) => {
        setImage(image)
        console.log(image)
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
        props.changeClicked()
    }


    const saveTask = () => {


        const url = backend_url +"task"
        let data = JSON.stringify({
            examId: props.examId,
            num: props.count,
            question: text,
            description: description,
            answer: answer,
            imageList: null
        })

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        };

        fetch(url, options)
            .then(async (response) => {
                let taskId = await response.json()
                if(image !== undefined)
                    saveImage(taskId.id)

                handleBack()
            })


    }

    const saveImage = (taskId) => {

        const url = backend_url +"/images/addPhoto/" + taskId
        const formData = new FormData();
        formData.append("file", image)
        const options = {
            method: 'POST',
            body: formData
        };
        fetch(url, options)
    }


    return (
        <div className={"container"}>
            <div>
                <div className={"z-index"}><TextField fullWidth={true} label={"Введите вопрос"}  value={text}
                                onChange={handleSetText}/></div>
                <div className={"z-index"}><TextField fullWidth={true} label={"Введите описание"} value={description}
                                onChange={handleSetDescription}/></div>
                <div className={"z-index"}><TextField fullWidth={true} label={"введите ответ"} value={answer}
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

export default AddTaskComponent