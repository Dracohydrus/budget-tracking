import { useEffect, useState } from "react"
import { axiosInstance } from "../config";

const Header = () => {
    const [temp, setTemp] = useState(null);

    useEffect(() => {
        const fetchTemp = async() => {
            axiosInstance.get('/transaction')
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
