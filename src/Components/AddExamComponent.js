import {Button, TextField} from "@material-ui/core";
import {useState} from "react";
import ErrorString from "./ErrorString";

const AddExamComponent = (props) => {
    const [nameText, setNameText] = useState('')
    const [token, setToken] = useState('')
    const [error, setError] = useState('')


    const url = 'https://localhost:7242/api/exam';

    const data = {
        Name : nameText,
        token : token
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const handleSetNameText = (event) => {
        setNameText(event.target.value)
    }

    const handleSetToken = (event) => {
        setToken(event.target.value)
    }

    const handleBackButton = () => {
        props.handleCheckToken(props.checkToken)
        props.SetCheckAddExam(props.checkAddExam)
    }

    const registerNewExam = async () => {
        console.log(url + "/" + token)
        let dataAnswer
        await fetch(url + "/" + token)
            .then(async response => {
                dataAnswer = await response.json();
            })
            .catch((exception) => {
                dataAnswer = undefined
            })
            .then( () => {
                if (dataAnswer !== undefined){
                    setError("проект с таким токеном уже существует")
                    return
                }
                fetch(url, options)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                    })
                    .then(data => {
                        console.log('Response:', data);
                    })
                    .catch(error => {
                        console.log(data)
                        console.error('Error:', error);
                    });
                props.setToken(token)
                props.SetCheckAddExam(true)
            })


    }

    return (<div className={"container"}>
        <div>
            <div><TextField fullWidth={true}
                            label={"введите название"}
                            value={nameText}
                            onChange={handleSetNameText}/></div>
            <div><TextField fullWidth={true}
                            label={"введите токен"}
                            value={token}
                            onChange={handleSetToken}/></div>
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
            { error !== '' ? (
                <ErrorString string={error}></ErrorString>
            ) : (<div></div>) }
        </div>
    </div>)
}

export default AddExamComponent