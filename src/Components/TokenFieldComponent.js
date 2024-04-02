import  Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "../TokenField.css"
import {useState} from "react";
import ErrorString from "./ErrorString";
import backend_url from "../index";
const TokenFieldComponent = (props) => {

    const [inputText, SetInputText] = useState('')
    const [error, setError] = useState('')
    const handleInputChange = (event) => {
        SetInputText(event.target.value)
    }


    const handleCheckAddExamButton = () => {
        props.handleCheckToken(props.checkToken)
        props.SetCheckAddExam(props.checkAddExam)
    }

    const checkToken = async () => {
        const url = backend_url + 'exam';
        let dataAnswer
        await fetch(url + "/" + inputText)
            .then(async response => {
                dataAnswer = await response.json();
            })
            .catch((exception) => {
                dataAnswer = undefined
            })
            .then(() => {
                if (dataAnswer === undefined) {
                    setError("проект с таким токеном не существует")
                    return
                }
                props.SetCheckAddExam(true)
                props.handleCheckToken(false)
                props.setToken(inputText)
            })
    }


    return (
        <div className={"container"}>
            <div>
                <div><TextField fullWidth={true} label={"введите токен"} value={inputText}
                                onChange={handleInputChange}/></div>
                <div><Button fullWidth={true} onClick={checkToken}>открыть</Button></div>
                <div><Button fullWidth={true} onClick={handleCheckAddExamButton}>создать</Button></div>
                { error !== '' ? (
                    <ErrorString string={error}></ErrorString>
                ) : (<div></div>) }
            </div>
        </div>
    )
}

export default TokenFieldComponent;