
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useState} from "react";
import ErrorString from "./ErrorString";
import backend_url from "../index";
const AddExamComponent = (props) => {
    const [nameText, setNameText] = useState('')
    const [token, setToken] = useState('')
    const [error, setError] = useState('')


    const url = backend_url +'exam';


    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: nameText
    };

    const handleSetNameText = (event) => {
        setNameText(event.target.value)
    }


    const handleBackButton = () => {
        props.handleCheckToken(props.checkToken)
        props.SetCheckAddExam(props.checkAddExam)
    }

    const registerNewExam = async () => {
        let dataAnswer
        await fetch(url + "/" + token)
            .then(async response => {
                dataAnswer = await response.json();
            })
            .catch((exception) => {
                dataAnswer = undefined
                console.log(exception)
            })
            .then(() => {
                    if (dataAnswer !== undefined) {
                        setError("проект с таким токеном уже существует")
                        return
                    }
                    fetch(url, options)
                        .then(async response => {
                           await response.text().then(
                                (data) => {
                                    props.setToken(data)
                                    props.SetCheckAddExam(true)
                                }
                            );
                        })
                }
            );


    }

    return (<div className={"container"}>
        <div>
            <div><TextField fullWidth={true}
                            label={"введите название"}
                            value={nameText}
                            onChange={handleSetNameText}/></div>
            <div><Button
                fullWidth={true}
                onClick={registerNewExam}>
                Создать
            </Button></div>
            <div><Button
                fullWidth={true}
                onClick={handleBackButton}>
                назад
            </Button></div>
            {error !== '' ? (
                <ErrorString string={error}></ErrorString>
            ) : (<div></div>)}
        </div>
    </div>)
}

export default AddExamComponent