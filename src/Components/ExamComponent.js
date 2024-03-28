import React, {useEffect, useState} from "react";
import AbbreviatedTaskComponent from "./AbbreviatedTaskComponent";
import TaskComponent from "./TaskComponent";
import {Button} from "@material-ui/core";
import AddExamComponent from "./AddExamComponent";
import AddTaskComponent from "./AddTaskComponent";
import CarouselComponent from "./СarouselComponent";


const ExamComponent = (props) => {

    const [tasks, setTasks] = useState([])
    const [clicked, setClicked] = useState(undefined)
    const [clickedAddButton, setClickedAddButton] = useState(false)
    const [examId, setExamId] = useState(undefined)
    const [examName, setExamName] = useState(false)
    const [upd, setUpd] = useState(false)
    const [carouselMode, setCarouselMode] = useState(false)


    useEffect(() => {
        showExamId().then((dataAnswer) => {
            setExamId(dataAnswer.id)
            setExamName(dataAnswer.name)
        }).then(() => {
            showTasks().then((dataAnswer) => {
                setTasks(dataAnswer)
            })
        })
    }, [clicked, clickedAddButton, upd]);
    const handleUpdate = () => {
        setUpd(!upd)
    }

    const handleCarousel = () => {
        setCarouselMode(!carouselMode)
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
        setClickedAddButton(!clickedAddButton)
    }
    const showTasks = async () => {
        const url = 'http://127.0.0.1:8080/api/v1/task';
        let dataAnswer
        await fetch(url + "/" + props.token)
            .then(async response => {
                dataAnswer = await response.json();
            })
            .catch((exception) => {
                dataAnswer = undefined
            })
        return dataAnswer
    }
    const showExamId = async () => {
        const url = 'http://127.0.0.1:8080/api/v1/exam';
        let dataAnswer
        await fetch(url + "/" + props.token)
            .then(async response => {
                dataAnswer = await response.json();
            })
            .catch((exception) => {
                dataAnswer = undefined
            })
        return dataAnswer
    }


    return (
        <div>
            {carouselMode ? (
                <div>
                    {
                        clicked !== undefined ? (
                                <div>
                                    <TaskComponent item={clicked}
                                                   handleDeleteClicked={handleDeleteClicked}
                                    ></TaskComponent>
                                </div>)
                            :
                            (
                                <div>
                                    {
                                        clickedAddButton ? (
                                                <AddTaskComponent token={props.token}
                                                                  count={tasks.length}
                                                                  examId={examId}
                                                                  changeClicked={handleClickedAddButtonForComponents}
                                                                  clicked={clickedAddButton}
                                                ></AddTaskComponent>
                                            ) :
                                            (<div><Button fullWidth={true} onClick={handleClickedAddButton}>Добавить
                                                компонент</Button></div>)
                                    }
                                    <Button fullWidth={true} onClick={handleCarousel}>Отключить отображения списка</Button>
                                    {tasks !== undefined ? (
                                        <div>
                                            {tasks.map((item, index) => (
                                                    <div><AbbreviatedTaskComponent item={item}
                                                                                   handleUpdate={handleUpdate}
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
            ) : (
                <div>
                    <CarouselComponent
                        tasks={tasks}
                        carouselMode = {handleCarousel}
                    >

                    </CarouselComponent>
                </div>
            )}
        </div>
    )
}

export default ExamComponent