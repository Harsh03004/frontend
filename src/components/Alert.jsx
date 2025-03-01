import React from 'react'

function Alert(props) {
    const capatalize = (word) => {
        if (word==="danger") {
            word="Error";
        }
        let lower = word.toLowerCase();
        // document.getElementById('alertBox').style.invisibility="hidden";
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        // <div style={{height:'50px'}}>
        <div>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert" id='alertBox'>
                <strong>{capatalize(props.alert.type)}</strong>: {props.alert.msg}
            </div>}
        </div>
    )
}

export default Alert