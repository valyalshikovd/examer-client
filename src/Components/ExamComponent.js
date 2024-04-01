import React, {useEffect, useState} from "react";
import AbbreviatedTaskComponent from "./AbbreviatedTaskComponent";
import TaskComponent from "./TaskComponent";
import {Button} from "@material-ui/core";
import AddExamComponent from "./AddExamComponent";
import AddTaskComponent from "./AddTaskComponent";
import CarouselComponent from "./СarouselComponent";
import "../ExamComponent.css"
import backend_url from "../index";
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
    }, [ clickedAddButton, upd]);


    const  handleUpd = () => {
        setUpd(!upd)
    }
    const handleCarousel = () => {
        setCarouselMode(!carouselMode)
    }
    const handleSetClicked = (item) => {
        console.log(clicked)
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
    const updateList = () => {
        console.log("команда на обновление")
        setUpd(!upd)
        setTasks(tasks)
    }
    const showTasks = async () => {
        const url = backend_url +'task';
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
        const url = backend_url +'exam';
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
            {!carouselMode ? (
                <div>

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
                                            (
                                                <div>
                                                    <header>
                                                        <div>{examName}</div>
                                                        <div>Токен {props.token} </div>
                                                    </header>
                                                    <div className={"component-container"}>
                                                        <div className={"button-container"}>
                                                    <div><Button fullWidth={true} onClick={handleClickedAddButton}>Добавить
                                                        таск</Button></div>

                                                    <Button fullWidth={true} onClick={handleCarousel}>Показывать по одному</Button>
                                                        </div>
                                                    {tasks !== undefined ? (
                                                        <div>
                                                            {tasks.map((item, index) => (
                                                                    <div >

                                                                        {
                                                                            item === clicked ? (
                                                                                <TaskComponent item={clicked}
                                                                                               handleDeleteClicked={handleDeleteClicked}
                                                                                               updateTaskList = {updateList}
                                                                                ></TaskComponent>
                                                                            ) : (
                                                                                <AbbreviatedTaskComponent item={item}
                                                                                                          handleUpdate={updateList}
                                                                                                          handleReboot={handleUpd}
                                                                                                          handleSetClicked={handleSetClicked}
                                                                                ></AbbreviatedTaskComponent>
                                                                            )
                                                                        }

                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    ) : (<div>Задачи отсутствуют</div>)}
                                                    </div>
                                                </div>)
                                    }
                                </div>

                </div>
            ) : (
                <div>
                    <CarouselComponent
                        tasks={tasks}
                        carouselMode={handleCarousel}
                    >

                    </CarouselComponent>
                </div>
            )}
        </div>
    )
}

export default ExamComponent