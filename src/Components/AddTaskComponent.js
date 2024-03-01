import {Button, TextField} from "@material-ui/core";
import {useState} from "react";
import ImageUploaderComponent from "./ImageUploaderComponent";


const AddTaskComponent = (props) => {


    const [name, setName] = useState()
    const [text, setText] = useState()
    const [answer, setAnswer] = useState()
    const [image, setImage] = useState()

    const handleSetImage = (image)=>{
        setImage(image)
    }

    const handleSetName = (e) => {
        setName(e.target.value)
    }
    const handleSetText = (e) => {
        setText(e.target.value)
    }
    const handleSetAnswer = (e) => {
        setAnswer(e.target.value)
    }

    const handleBack = () => {
        props.changeClicked(false)
    }

    const saveTask = () => {


        const url = "https://localhost:7242/api/task/"
        let data = JSON.stringify({
            Name : name,
            Number : props.count,
            token : props.token,
            text : text,
            Answer : answer,
            AnswerPhoto : image
        })

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        };


        console.log(data)
        fetch(url, options)
        .then( () => {
            console.log("успешно")
        })

        handleBack()

    }


    return (
        <div className={"container"}>
            <div>
                <div><TextField fullWidth={true} label={"Введите название"} value={name}
                                onChange={handleSetName}/></div>
                <div><TextField fullWidth={true} label={"Введите вопрос"} value={text}
                                onChange={handleSetText}/></div>
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

export default AddTaskComponent