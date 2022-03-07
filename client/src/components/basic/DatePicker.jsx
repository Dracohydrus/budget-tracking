import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

const DatePicker = ({ ...props }) => {
    return <ReactDatePicker {...props} autoFocus />
}

const NewDatePicker = styled(DatePicker)`
    padding: 10px;
`

export default NewDatePicker