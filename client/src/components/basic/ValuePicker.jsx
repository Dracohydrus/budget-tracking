const ValuePicker = ({ name = "picker", values = [], options = {}, setValue, index }) => {
    const { emptyValue = true } = options

    return <>
        <label htmlFor={name}></label>
        <select name={name} onChange={e => setValue(e.target.value, index)}>
            {emptyValue && <option value=""></option>}
            {values.map(data => {
                return <option key={data.value} value={data.value} >{data.text}</option>
            })}
        </select>
    </>
}

export default ValuePicker