const Notification = ({text, isSuccess}) => {
    if(text !== null) {
        if(isSuccess) {
            return (
                <div className="success">
                    {text}
                </div>
            )
        }else{
            return (
                <div className="failed">
                    {text}
                </div>
            )
        }
    } else return null
}

export default Notification