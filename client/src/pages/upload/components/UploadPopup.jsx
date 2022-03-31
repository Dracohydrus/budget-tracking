import Popup from '../../../components/basic/Popup'
import PropTypes from 'prop-types';
import ValuePicker from '../../../components/basic/ValuePicker';

const UploadPopup = ({ open, close, popupData = [], updatePickerValues, onSubmit }) => {

    let counter = 0
    return (
        <Popup modal open={open} close={close}>
            <p style={{ marginTop: '20px' }}>Preview Data:</p>
            <form onSubmit={onSubmit}>
                <table>
                    <tbody>
                        <tr>
                            {popupData[0]?.split(',').map(() => {
                                counter++;
                                return <td><Picker key={counter} index={counter} setValue={updatePickerValues} /></td>
                            })}
                        </tr>
                        {popupData.map(data => {
                            counter++;
                            return <PreviewContent key={counter} data={data} />
                        })}
                    </tbody>
                </table>
                <button type="submit">Test</button>
            </form>
        </Popup >
    )
}

const PreviewContent = ({ data: content = [] }) => {
    const columns = content.split(',')
    let counter = 0
    return <>
        <tr>
            {columns.map(data => {
                counter++;
                return <td key={counter}>{data}</td>
            })}
        </tr>
    </>
}

const Picker = ({ index = 0, setValue }) => {
    const values = [
        { value: "description", text: "Description" },
        { value: "credit", text: "Credit" },
        { value: "debit", text: "Debit" },
        { value: "both", text: "Credit/Debit" },
        { value: "currency", text: "Currency" },
        { value: "transactionDate", text: "Transaction Date" },
    ]

    return <ValuePicker name={`picker${index}`} index={index} values={values} setValue={setValue} />
}

UploadPopup.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    popupData: PropTypes.array.isRequired
}

export default UploadPopup