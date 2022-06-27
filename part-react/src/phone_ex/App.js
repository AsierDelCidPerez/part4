import React, {useState, useEffect} from 'react';
import Filtro from './components/Filtro'
import Titulo from './components/Titulo'
import Report from './components/Report'
import phoneService from './services/phoneService'
import Notification from './components/Notification';
import Adding from './components/Adding'

const App = () => {
    const [phonebook, setPhoneBook] = useState([])
    const [infoMessage, setInfoMessage] = useState({
        message: null,
        type: 2
    })
    /*
        phonebook is an array which contains objects related to the phones:
        i.e.
        phonebook = [
            {
                id: 1
                name: 'Arturo Hellas',
                phone: 963258741,
            },
            ...

        ]
    */
    useEffect(() => {
        phoneService.getAll().then(res => setPhoneBook(res)).catch(err => {
            setInfoMessage({
               message: "Something was wrong, getting info from server",
               type: 1
            })
            setTimeout(() => setInfoMessage(null), 5000)
        })
    }, [])
    return (
        <div>
            <Titulo text="Phonebook"/>
            <Notification message={infoMessage.message} type={infoMessage.type}/>
            <Filtro phonebook={phonebook} setPhonebook={setPhoneBook}/>
            <Adding phonebook={phonebook} setPhonebook={setPhoneBook} notifications={setInfoMessage}/>
            <Report phonebook={[phonebook, setPhoneBook]} notification={setInfoMessage}/>
        </div>
    )
}

export default App