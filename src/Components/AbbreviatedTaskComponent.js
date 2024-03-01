

const AbbreviatedTaskComponent = (props) => {

    const handleClick = () => {
        props.handleSetClicked(props.item)
    }

    return(
    <div onClick={handleClick}>
        <div>
            {props.item.id}
        </div>
        <div>
            {props.item.text}
        </div>
    </div>
    )
}

export default AbbreviatedTaskComponent