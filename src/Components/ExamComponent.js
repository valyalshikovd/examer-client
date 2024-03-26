import React, {useEffect, useState} from "react";
import AbbreviatedTaskComponent from "./AbbreviatedTaskComponent";
import TaskComponent from "./TaskComponent";
import {Button} from "@material-ui/core";
import AddExamComponent from "./AddExamComponent";
import AddTaskComponent from "./AddTaskComponent";


const ExamComponent = (props) => {

    const [tasks, setTasks] = useState([])
    const [clicked, setClicked] = useState(undefined)
    const [clickedAddButton, setClickedAddButton] = useState(false)
    const [examId, setExamId] = useState(undefined)
    const [examName, setExamName] = useState(false)



    useEffect(() => {
        console.log("гойда")
        showExamId().then((dataAnswer) => {
            setExamId(dataAnswer.id)
            setExamName(dataAnswer.name)
        }).then( () => {
            showTasks().then((dataAnswer) => {
                setTasks(dataAnswer)
            })
        })
    }, [clicked, clickedAddButton]);

    const forseUpd = () => {
        forseUpd()
    }
    const handleSetClicked = (item) => {
        setClicked(item)
    }

    const handleDeleteClicked = () => {
        setClicked(undefined)
    }

    const handleClickedAddButton = () => {
        setClickedAddButton(true)
    }

    const handleClickedAddButtonForComponents = () => {
        console.log(clickedAddButton)
        setClickedAddButton(!clickedAddButton)
        console.log("метод выполняется")
    }
    const showTasks = async () => {
        const url = 'http://127.0.0.1:8080/api/v1/task';
        let dataAnswer
        await fetch(url + "/" + props.token)
            .then(async response => {
                dataAnswer = await response.json();

                console.log(dataAnswer)
            })
            .catch((exception) => {
                dataAnswer = undefined
            })
        return dataAnswer
    }
    const showExamId  = async () => {

        const url = 'http://127.0.0.1:8080/api/v1/exam';
        let dataAnswer
        console.log(props)
        console.log(url + "/" + props.token)
        await fetch(url + "/" + props.token)
            .then(async response => {
                dataAnswer = await response.json();
                console.log(dataAnswer)
            })
            .catch((exception) => {
                console.log(props.token + " токен")
                console.log(exception)
                dataAnswer = undefined
            })
        return dataAnswer
    }


    return (
        <div>

            {
                clicked !== undefined ? (
                        <div>
                            <TaskComponent item={clicked} handleDeleteClicked={handleDeleteClicked}></TaskComponent>
                        </div>)
                    :
                    (
                        <div>
                            {
                                clickedAddButton ? (
                                        <AddTaskComponent token={props.token} count={tasks.length} examId = {examId} changeClicked = {handleClickedAddButtonForComponents} clicked={clickedAddButton} forseUpdate = {forseUpd}  ></AddTaskComponent>
                                    ) :
                                    (<div><Button fullWidth={true} onClick={handleClickedAddButton}>Добавить компонент</Button></div>)
                            }
                            {tasks !== undefined ? (
                                <div>
                                    {tasks.map((item, index) => (
                                            <div><AbbreviatedTaskComponent item={item}
                                                                           handleSetClicked={handleSetClicked}
                                            ></AbbreviatedTaskComponent></div>
                                        )
                                    )}
                                </div>
                            ) : (<div>Задачи отсутствуют</div>)}
                        </div>
                    )
            }

        </div>
    )
}

export default ExamComponent