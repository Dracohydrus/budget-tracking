import { useState } from 'react'
import Header from '../../components/header/Header'
import './Hailey.css'

const Hailey = () => {
    const [buttonText, setButtonText] = useState("Push Me")
    const [buttonColor, setButtonColor] = useState("aliceblue")
    const [clicks, setClicks] = useState(0)

    const onClick = () => {
        switch(clicks) {
            case 0:
                setButtonText("Ouch, that hurt!")
                setButtonColor("yellow")
                break;
            case 1:
                setButtonText("STOP IT!")
                setButtonColor('red')
                break;
            case 2:
                break;
            default:
                break;
                
        }
        setClicks(clicks+1)
    }

    return (
        <>
            <Header />
            <div className='hailey'>
                Piece of poo
                <button className={clicks >= 4? "haileyButton angryButtonAnimation" : "haileyButton"} onClick={onClick} style={{backgroundColor: buttonColor}}>{clicks >= 3 ? <i class="far fa-angry"></i> : buttonText}</button>
            </div>
        </>
    )
}

export default Hailey
