import { Popup as ReactPopup } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Popup = ({ ...props }) => {
    return <ReactPopup {...props} />
}

export const Modal = ({ ...props }) => {
    return <Popup modal {...props} />
}

export default Popup