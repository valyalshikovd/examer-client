import {Button} from "@material-ui/core";


const AbbreviatedTaskComponent = (props) => {

    const handleClick = () => {
        props.handleSetClicked(props.item)
    }

    const deleteTask = () => {

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
            })

    }

    return (
        <div>
            <div onClick={handleClick}>
                <div>
                    {props.item.id}
                </div>
                <div>
                    {props.item.question}
                </div>
            </div>
            <div><Button fullWidth={true} onClick={deleteTask}>удалить</Button></div>
        </div>
    )
}

export default AbbreviatedTaskComponent