import ReactPopup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Popup.css'

const Popup = ({ open, setOpen, ...props }) => {
    const closeModal = () => setOpen(false)

    return (
        <ReactPopup modal open={open} onClose={closeModal} {...props} />
    )
}

export default Popup