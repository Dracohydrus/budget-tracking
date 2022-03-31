import Popup from '../../../components/basic/Popup'

const UploadPopup = ({ open, setOpen, popupData = [] }) => {
    let counter = 0

    const onSubmit = e => {
        e.preventDefault();
        console.log(e)
    }

    return (
        <Popup modal open={open} setOpen={setOpen}>
            <p style={{ marginTop: '20px' }}>Preview Data:</p>
            <form onSubmit={onSubmit}>
                <table>
                    <tbody>
                        <tr>
                            {popupData[0]?.split(',').map(() => {
                                counter++;
                                return <td><Picker key={counter} /></td>
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

const Picker = () => {
    return <>
        <label htmlFor="picker"></label>
        <select name="picker" id="picker">
            <option value=""></option>
            <option value="description">Description</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
            <option value="both">Credit/Debit</option>
            <option value="currency">Currency</option>
            <option value="transactionDate">Transaction Date</option>
        </select>
    </>
}

export default UploadPopup