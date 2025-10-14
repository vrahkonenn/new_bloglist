const Notice = ({ notice, errorMessage }) => {

    if (notice) {
        return (
            <div className="notice individual">
                <p>{notice}</p>
            </div>
        )
    } else if (errorMessage) {
        return(
            <div className="errorMessage individual">
                <p>{errorMessage}</p>
            </div>
        )
    }
}

export default Notice 