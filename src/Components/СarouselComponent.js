import React, {useState} from "react";
import TaskComponent from "./TaskComponent";
import {Button} from "@material-ui/core";


const CarouselComponent = (props) => {

    const [tasks, setTasks] = useState(props.tasks.slice())
    const [currentItemIndex, setCurrentItemIndex] = useState(0)
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
        if(currentItemIndex === 0){
            setCurrentItemIndex(tasks.length - 1)
            setCurrentItem(tasks[currentItemIndex])
            return
        }
        setCurrentItemIndex(currentItemIndex - 1)
        setCurrentItem(tasks[currentItemIndex])

        console.log(currentItem)
        console.log(currentItemIndex)
    }

    const handleNext = () => {

        console.log(currentItem)
        console.log(currentItemIndex)

        if(currentItemIndex === tasks.length - 1){
            setCurrentItemIndex(0)
            setCurrentItem(tasks[currentItemIndex])
            return
        }
        setCurrentItemIndex(currentItemIndex + 1)
        setCurrentItem(tasks[currentItemIndex])

    }

    return(
        <div>
            <div><Button fullWidth={true} onClick={handleShuffle}>перемешать</Button></div>
            <div><Button fullWidth={true} onClick={handlePrev}>prev</Button></div>
            <div><Button fullWidth={true} onClick={handleNext}>next</Button></div>
            <TaskComponent item={currentItem}
                           handleDeleteClicked={handleDeleteClicked}
            ></TaskComponent>
        </div>
    )
}

export default CarouselComponent