import ImageUploaderComponent from "./ImageUploaderComponent";
import {Button, TextField} from "@material-ui/core";
import {useEffect, useState} from "react";


const TaskEdit = (props) => {

    const [name, setName] = useState(props.name)
    const [text, setText] = useState(props.question)
    const [description, setDescription] = useState(props.description)
    const [answer, setAnswer] = useState(props.answer)
    const [image, setImage] = useState(null)


    useEffect(() => {
        console.log(props)
    }, []);
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
        props.handleBack()
    }


    const saveTask = () => {

        const url = "http://127.0.0.1:8080/api/v1/task"
        let data = JSON.stringify({
            examId: props.item.examId,
            num: props.item.num,
            question: text,
            description: description,
            answer: answer,
            imageList:  props.imageId
        })

        console.log(props)
        console.log(data)

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        };


        console.log(data)
        fetch(url, options)
            .then(async (response) => {
                let taskId = await response.json()
                console.log(taskId)

                if(image === null)
                    return

                saveImage(taskId.id)

                handleBack()
            })


    }

    const saveImage = (taskId) => {


    }


    return (
        <div className={"container"}>
            <div><Button fullWidth={true} onClick={props.handleBack}>назад</Button></div>
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