import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const DEFAULT_OPTIONS = {
    position: toast.POSITION.BOTTOM_RIGHT
}

export const toastInstance = {
    success: (message) => {
        toast.success(message, DEFAULT_OPTIONS)
    },
    error: (message) => {
        toast.error(message, DEFAULT_OPTIONS)
    },
    info: (message) => {
        toast.info(message, DEFAULT_OPTIONS)
    }
}