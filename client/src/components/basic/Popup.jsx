import ReactPopup from 'reactjs-popup';
import PropTypes from 'prop-types';
import 'reactjs-popup/dist/index.css';
import './Popup.css'

const Popup = ({ open, setOpen, ...props }) => {
    const closeModal = () => setOpen(false)

    return (
        <ReactPopup modal open={open} onClose={closeModal} {...props} />
    )
}

Popup.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
}

export default Popup