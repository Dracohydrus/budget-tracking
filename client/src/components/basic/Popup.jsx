import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export const DeleteConfirmation = () => {
    return new Promise((resolve, reject) => {
        confirmAlert({
            title: "Delete Record",
            message: "Are you sure you want to delete this record?",
            buttons: [{
                label: 'Yes',
                onClick: () => resolve()
            }, {
                label: 'No',
                onClick: () => reject()
            }],
        })
    })
}
