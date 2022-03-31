import ReactPopup from 'reactjs-popup';
import PropTypes from 'prop-types';
import 'reactjs-popup/dist/index.css';
import './Popup.css'

const Popup = ({ open, close, ...props }) => {
    return (
        <ReactPopup modal open={open} onClose={close} {...props} />
    )
}

Popup.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default Popup