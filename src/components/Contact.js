import React,{useState, useEffect} from 'react'
import ContactForm from './ContactForm'
import firebaseDb from '../firebase'

function Contact() {
    const [contactObject,setContactObject] = useState({})
    const [currentId, setCurrentId] = useState("")




    const getContact = () =>{
        firebaseDb.child('contacts').on('value', snapshot => {
            if(snapshot.val() != null)
            setContactObject(
                {
                    ...snapshot.val()
                }
            )
            else
            setContactObject({})
        })
    }
    const addOrEdit = (obj) => {
        if(currentId == '')
        firebaseDb.child('contacts').push(
            obj,
            err => {
                if(err)
                console.log(err)
                else
                setCurrentId('')
            }
        )
        else
        firebaseDb.child(`contacts/${currentId}`).set(
            obj,
            err => {
                if(err)
                console.log(err)
                else
                setCurrentId('')
            }
        )
    }
    const deleteContact = (key) => {
        if(window.confirm("Are you sure to Delete this Record..?")){
            firebaseDb.child(`contacts/${key}`).remove(
                err => {
                    if(err)
                    console.log(err)
                    else
                    setCurrentId('')
                }
            )
        }
    }
    useEffect(() => {
        getContact();
    },[])

    return (
        <>
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4 text-center">Contact Register</h1>
                
            </div>
        </div>
        <div className="row">
            <div className="col-md-5">
                <ContactForm {...({addOrEdit,currentId,contactObject})}/>
            </div>
            <div className="col-md-7">
                <table className="table table-borderless table-stripped">
                    <thead className="thead-light">
                        <tr>
                            <th>Fullname</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(contactObject).map(id => {
                                return <tr key={id}>
                                    <td>{contactObject[id].fullName}</td>
                                    <td>{contactObject[id].mobile}</td>
                                    <td>{contactObject[id].email}</td>
                                    <td>
                                        <a className="btn text-primary" onClick={()=> {setCurrentId(id)}}>
                                            <i className="fas fa-pencil-alt">Edit</i>
                                        </a>
                                        <a className="btn text-danger " onClick={ () => {deleteContact(id)}}>
                                            <i className="fas fa-trash-alt">Delete</i>
                                        </a>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>  
        </div>
        </>
    )
}

export default Contact
