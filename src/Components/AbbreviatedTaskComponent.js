import {Button} from "@material-ui/core";
import "../AbbreviatedTaskComponent.css"

const AbbreviatedTaskComponent = (props) => {

    const handleClick = () => {
       // props.handleUpdate()
        props.handleSetClicked(props.item)
    }

    const deleteTask = (event) => {

        event.stopPropagation();

        const url = "http://127.0.0.1:8080/api/v1/task/" + props.item.id
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(url, options)
            .then(async (response) => {
                props.handleUpdate()
                props.handleReboot()
            })

    }

    return (
        <div className={"task-container"} onClick={handleClick}>
            <div className={"task-info"} >
                <div className={"task-number"}>
                    #{props.item.num + 1}
                </div>
                <div className={"task-question"}>
                    {props.item.question}
                </div>
            </div>
            <div className={"task-delete-button"}><Button  fullWidth={true} onClick={deleteTask}>удалить</Button></div>
        </div>
    )
}

export default AbbreviatedTaskComponent