import Titulo from './Titulo'
import React, {useState} from 'react'
import phoneService from '../services/phoneService'

const AddNumber = ({phonebook, setPhonebook, notifications}) => {
    const allPhones = []
    phoneService.getAll().then(res => res.map(elem => allPhones.push(elem)))

    const getId = () => {
        if(allPhones.length > 0){
            return allPhones[allPhones.length-1].id+1
        }else{
            return 0
        }
    }

    const [fields, setFields] = useState({
        name: "", number: ""
    })

    const onChangeFields = event => {
        const valor = event.target.value
        if(event.target.id === "name") setFields({
                                        ...fields,
                                        name: valor
                                    })
        else setFields({
                ...fields,
                number: valor
            })
    }

    const agregarNumero = event => {
        event.preventDefault()
        let continuar = true
        const newObj = {
            ...fields,
            id : getId()
        }

        allPhones.forEach(phone => {
            if(phone.name === fields.name){
                continuar = false
                newObj.id--;
                if(window.confirm(`${phone.name} has already added to your phonebook. Do you want to edit this?`)){
                    phoneService.update(phone.id, newObj)
                    setPhonebook(phonebook.filter(myPhone => myPhone.id !== phone.id).concat(newObj))
                }
            }
        })
        if(continuar){
            phoneService.addNew(newObj).then(res => {
                notifications({
                    message: `Added '${newObj.name}' succesfully`,
                    type: 1
                })
                setTimeout(() => notifications({
                    message: null,
                    type: 1
                }), 5000)
                setPhonebook(phonebook.concat(newObj))
            }).catch(err => {
                notifications({message: err.response.data.error, type: 2})
                setTimeout(() => notifications({message: null, type: 1}), 5000)
        })
        }
    }

    return (
        <form onSubmit={agregarNumero}>
            <Titulo text="add new"/>
            <label>name: <input type="text" id="name" onChange={onChangeFields} placeholder="name"/></label><br/>
            <label>number: <input type="text" id="number" onChange={onChangeFields} placeholder="number"/></label><br/>
            <button>add</button>
        </form>
    )
}

export default AddNumber