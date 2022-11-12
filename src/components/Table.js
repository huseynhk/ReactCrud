import React, { useState, useRef } from 'react';
import info from './info.json';
import './table.css';

function Table() {
    const [data, setData] = useState(info);
    const [editState, setEditState] = useState(-1);
    return (
        <div className='main'>
            <div>
                <AddMember setData={setData} />

                <form onSubmit={handleUpdate}>
                    <table>
                        <thead>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </thead>
                        {
                            data.map((current, index) => (

                                editState === current.id ? <EditMember current={current}
                                    data={data} setData={setData} /> :
                                    <tr key={index}>
                                        <td>{current.name}</td>
                                        <td>{current.email}</td>
                                        <td>{current.phone}</td>
                                        <td>
                                            <button type='button'
                                            onClick={() => handleEdit(current.id)} className='edit'>Update</button>
                                            <button type='button'
                                             onClick={() => handleDelete(current.id)} className='delete'>Delete</button>
                                        </td>
                                    </tr>
                            ))
                        }
                    </table>
                </form>
            </div>
        </div>
    )

    function handleUpdate(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const email = event.target.elements.email.value;
        const phone = event.target.elements.phone.value;
        const alreadyUpdatedData =
        data.map(d => d.id === editState ? { ...d, name: name, email: email, phone: phone } : d)
        setEditState(-1);
        setData(alreadyUpdatedData);
    }

    function handleEdit(id) {
        setEditState(id);
    }

    function handleDelete(id) {
        const alreadyUpdatedData = data.filter((newData) => id !== newData.id);
        setData(alreadyUpdatedData);
    }

}

function EditMember({ current, data, setData }) {

    function handleName(event) {
        const name = event.target.value;
        const updatedData =
        data.map((newData) => newData.id === current.id ? { ...newData, name: name } : newData)
        setData(updatedData)
    }

    function handleEmail(event) {
        const email = event.target.value;
        const updatedData =
        data.map((newData) => newData.id === current.id ? { ...newData, email: email } : newData)
        setData(updatedData)
    }

    function handlePhone(event) {
        const phone = event.target.value;
        const updatedData =
        data.map((newData) => newData.id === current.id ? { ...newData, phone: phone } : newData)
        setData(updatedData)
    }

    return (
        <tr>
            <td><input type="text" onChange={handleName} value={current.name} name="name" placeholder="Enter Your Name" /></td>
            <td><input type="text" onChange={handleEmail} value={current.email} name="email" placeholder="Enter Your Email" /></td>
            <td><input type="text" onChange={handlePhone} value={current.phone} name="phone" placeholder="Enter Your Phone" /></td>
            <td><button type='submit' className='edit' >Edit</button></td>
        </tr>
    )
}


function AddMember({ setData }) {

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();


    function handleValues(event) {
        event.preventDefault();

        const name = event.target.elements.name.value;
        const email = event.target.elements.email.value;
        const phone = event.target.elements.phone.value;
        const newMember = {
            id: 4,
            name,
            email,
            phone,
        };
        setData(prevData => prevData.concat(newMember));
        nameRef.current.value = "";
        emailRef.current.value = "";
        phoneRef.current.value = "";
    }

    return (
        <form onSubmit={handleValues}>

            <input className='mainForm' type="text" name="name" placeholder="Enter Your Name" ref={nameRef} />
            <input className='mainForm' type="text" name="email" placeholder="Enter Your Email" ref={emailRef} />
            <input className='mainForm' type="text" name="phone" placeholder="Enter Your Phone" ref={phoneRef} />
            <button className='user'>Add User</button>

        </form>
    )
}
export default Table


