import { useEffect, useState } from "react"
import axios from 'axios'

const Header = () => {
    const [temp, setTemp] = useState(null);

    useEffect(() => {
        const fetchTemp = async() => {
            axios.get('/transaction')
            .then((res) => setTemp(JSON.stringify(res.data)))
            .catch((err) => console.log(err))
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
