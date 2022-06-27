import phoneService from '../services/phoneService'
import Titulo from './Titulo'


const Report = ({phonebook, notification}) => {
    const [phones, setPhones] = phonebook
    
    const deletePhone = event => {
        if(window.confirm(`Are you sure you want to delete: ${event.target.name}`)){
            phoneService.deletePhone(event.target.id).catch(err => {
                notification({
                    message: `${event.target.name} was already deleted from server`,
                    type: 2
                })
                setTimeout(() => notification({message: null, type: 1}), 5000)
            }
            )
            setPhones(phones.filter(phone => phone.id != event.target.id))
        }

    }

    return (
        <div>
            <Titulo text="Numbers"/>
            <ul>
                {
                    phones.map(phone => <li key={phone.id}>{phone.name} {phone.number}&nbsp; <button name={phone.name} id={phone.id} onClick={deletePhone}>Delete</button></li>)
                }
            </ul>
        </div>
    )
}

export default Report