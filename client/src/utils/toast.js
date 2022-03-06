import { toast as toastInstance } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toastInstance.configure()

const DEFAULT_OPTIONS = {
    position: toastInstance.POSITION.BOTTOM_RIGHT
}

const toast = {
    success: (message) => {
        toastInstance.success(message, DEFAULT_OPTIONS)
    },
    error: (message) => {
        toastInstance.error(message, DEFAULT_OPTIONS)
    },
    info: (message) => {
        toastInstance.info(message, DEFAULT_OPTIONS)
    }
}

export default toast;