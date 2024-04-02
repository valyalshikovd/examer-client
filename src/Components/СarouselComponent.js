import React, {useState} from "react";
import TaskComponent from "./TaskComponent";
import {Button} from "@mui/material";
import "../CarouselComponent.css"
import ErrorString from "./ErrorString";


const CarouselComponent = (props) => {

    const [tasks, setTasks] = useState(props.tasks.slice())
    const [currentItemIndex, setCurrentItemIndex] = useState(1)
    const [currentItem, setCurrentItem] = useState(tasks[0])

    const handleShuffle = () => {
        console.log(tasks)
        setTasks(shuffle(tasks))
        setCurrentItemIndex(0)
        setCurrentItem(tasks[currentItemIndex])
    }

    const handleDeleteClicked = () => {
        props.carouselMode()
    }

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const handlePrev = () => {
        if (currentItemIndex === 0) {
            setCurrentItemIndex(tasks.length - 1)
            setCurrentItem(tasks[currentItemIndex])
            return
        }
        setCurrentItemIndex(currentItemIndex - 1)
        setCurrentItem(tasks[currentItemIndex])


        const handleNext = () => {


            if (currentItemIndex === tasks.length - 1) {
                setCurrentItemIndex(0)
                setCurrentItem(tasks[currentItemIndex])
                return
            }
            setCurrentItemIndex(currentItemIndex + 1)
            setCurrentItem(tasks[currentItemIndex])

        }

        return (
            <div>
                <div>
                    <div className={"parent-container"}>
                        <div><Button fullWidth={true} onClick={handlePrev}>Пред.</Button></div>
                        <div><Button fullWidth={true} onClick={handleShuffle}>Перемешать</Button></div>
                        <div><Button fullWidth={true} onClick={handleNext}>Cлед.</Button></div>
                    </div>
                    {
                        0 !== tasks.length ? (<div><TaskComponent item={currentItem}
                                                                  handleDeleteClicked={handleDeleteClicked}
                        ></TaskComponent></div>) : (
                            <div>
                                <div><Button fullWidth={true} onClick={handleDeleteClicked}><ErrorString
                                    string={"Список пуст"}></ErrorString></Button></div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}
export default CarouselComponent