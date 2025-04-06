import React, { useEffect } from 'react';
import '../Styles/Alert.css'; // Make sure this file exists

function Alert(props) {
    const capitalize = (word) => {
        if (word === "danger") {
            word = "Error";
        }
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    useEffect(() => {
        if (props.alert) {
            const timer = setTimeout(() => {
                props.setAlert(null);
            }, 3500); // Auto-hide after 3s
            return () => clearTimeout(timer);
        }
    }, [props.alert, props]);

    return (
        props.alert &&
        <div className="side-alert-container">
            <div className={`side-alert ${props.alert.type}`}>
                <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
            </div>
        </div>
    );
}

export default Alert;
