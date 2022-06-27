import phoneService from "../services/phoneService"

const Filtro = ({phonebook, setPhonebook}) => {
    const misPhones = []
    phoneService.getAll().then(res => misPhones.push(...res))
    
    const filtrar = event => setPhonebook(misPhones.filter(person => person.name.match(event.target.value)))
    
    return (
        <div>
            <label>filter shown with <input onChange={filtrar} type="text" placeholder="name"/></label>
        </div>
    )
}

export default Filtro