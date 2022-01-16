import { useEffect, useState } from "react"
import axios from 'axios'

const Header = () => {
    const [temp, setTemp] = useState([]);

    useEffect(() => {
        const fetchTemp = async() => {
            const res = await axios.get('/transaction')
            console.log(res)
        }
        fetchTemp()
    }, [])

    return (
        <div>
            <h1>Banking App Header</h1>
            <p>{temp}</p>
        </div>
    )
}

export default Header
