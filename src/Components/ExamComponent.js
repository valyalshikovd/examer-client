import React, {useEffect, useState} from "react";
import AbbreviatedTaskComponent from "./AbbreviatedTaskComponent";
import TaskComponent from "./TaskComponent";
import {Button} from "@material-ui/core";
import AddExamComponent from "./AddExamComponent";
import AddTaskComponent from "./AddTaskComponent";


const ProjectComponent = (props) => {

    const [tasks, setTasks] = useState([])
    const [clicked, setClicked] = useState(undefined)
    const [clickedAddButton, setClickedAddButton] = useState(false)


    useEffect(() => {
        showTasks().then((dataAnswer) => {
            setTasks(dataAnswer)
        })
    }, []);

    const handleSetClicked = (item) => {
        setClicked(item)
    }

    const handleDeleteClicked = () => {
        setClicked(undefined)
    }

    const handleClickedAddButton = () => {
        setClickedAddButton(!clicked)
    }

    const handleClickedAddButtonForComponents = (clicked) => {
        setClickedAddButton(clicked)
        console.log("метод выполняется")
    }
    const showTasks = async () => {
        const url = 'https://localhost:7242/api/task/all';
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
                                        <AddTaskComponent token={props.token} count={tasks.length} changeClicked = {handleClickedAddButtonForComponents} clicked={clickedAddButton}  ></AddTaskComponent>
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

export default ProjectComponent