import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export const ConfirmationPopup = ({ title, message }) => {
    title = title || "Proceed"
    message = message || "Are you sure you want to proceed?"
    return new Promise((resolve, reject) => {
        confirmAlert({
            title: title,
            message: message,
            buttons: [{
                label: 'Yes',
                onClick: () => resolve('Yes')
            }, {
                label: 'No',
                onClick: () => reject('No')
            }],
        })
    })
}

export const DeleteConfirmation = ({ title, message }) => {
    title = title || "Delete Record"
    message = message || "Are you sure you want to delete this record?"
    return ConfirmationPopup({ title, message })
}

export const Popup = ({ title, message, buttons = [] }) => {
    return new Promise((resolve, reject) => {
        const linkedButtons = buttons.map(buttonText => ({
            label: buttonText,
            onClick: () => resolve(buttonText)
        }))

        confirmAlert({
            title: title,
            message: message,
            buttons: linkedButtons,
        })
    })
}
