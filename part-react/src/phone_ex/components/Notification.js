const Notification = ({message, type}) => {
    /*
    TYPES OF NOTIFICATIONS
        1.- ERROR
        2.- OKAY
    */
    if(message === null) return null
    let miClase;
    if(type == 1) miClase = "success"
    else if(type == 2) miClase = "error"
    return (
        <div className={miClase}>
            {message}
        </div>
    )
}

export default Notification