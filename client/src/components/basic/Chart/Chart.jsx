import { useEffect, useState } from 'react'
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts'
import { axiosInstance } from '../../../config';

const Chart = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axiosInstance('/transaction')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    console.log(data)

    return (
        <>
            <LineChart width={500} height={300} data={data}>
                <XAxis dataKey="Data" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="value" stroke="#24cca8" />
            </LineChart>
        </>
    )
}

export default Chart