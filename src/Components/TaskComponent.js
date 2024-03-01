import {Button} from "@material-ui/core";
import {useEffect, useState} from "react";

const TaskComponent = (props) => {
    const [imageSrc, setImageSrc] = useState('')

    useEffect(() => {
        const base64string = props.item.answerPhoto


        setImageSrc('data:image/png;base64,' + base64string)

    })

    return (

        <div>
            <div><Button fullWidth={true} onClick={props.handleDeleteClicked}>назад</Button></div>
            <div>
                {props.item.number}
                {props.item.name}
                {props.item.text}
                {props.item.answer}
                <img src={imageSrc} alt={"бля"}/>
            </div>
        </div>
    )
}
export default TaskComponent
