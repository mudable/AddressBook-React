import { Link, useNavigate } from 'react-router-dom'
import './Home.css'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import AddressBookService from './Service/AddressBookService'
const Home = () => {
    let navigate = useNavigate();
    let value = {
        addressBookArray: [],
    };

    const updateAddressBook = (id) => {
        navigate(`/AddressBookForm/${id}`);
    }

    const [formValue, setForm] = useState(value)

   
    useEffect(() => {
        getAllAddressBook();
    }, [])


    const getAllAddressBook = () => {
        AddressBookService.getAllAddressBookData()
            .then((response) => {
                setForm({
                    addressBookArray: response.data.data
                });
                console.log(response);
            });
    }

    const removeAddressBookData = (id) => {
        let ans = window.confirm(
            "Do you want to delete the data");
        if (ans === true) {
            AddressBookService.deleteAddressBook(id)
                .then((response) => {
                    alert("Data Deleted Successfully");
                    window.location.reload();
                    getAllAddressBook();
                })
                .catch((error) => {
                    toast.error("something went wrong");
                });
        }
        else {
            alert("Data not deleted");
        }
    }

    return (
        <div>
            <head>
                <title>ADDRESSBook App</title>
            </head>
            <body>
                <header class="header-content header">
                    <div class="logo-content">
                        <img src="" alt="logo" />
                        <div>
                            <span class="emp-text">Address</span>
                            <span class="emp-text emp-payroll">Book</span>
                        </div>
                    </div>
                </header>
                <div class="main-content">
                    <div class="header-content employee-header">
                        <div class="emp-detail-text">
                            Personal Details

                        </div>
                        <Link to="/addressBook" >
                            <a class="add-button">

                                Add User
                            </a> </Link>
                    </div>
                    <div class="table-main">
                        <table id="display" class="table">
                            <thead>
                                <tr>
                                    <th>FullName</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>ZipCode</th>
                                    <th>phoneNum</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {
                                formValue.addressBookArray &&
                                formValue.addressBookArray.map((element, index) => (
                                    <tr>
                                        <td>{element.fullName}</td>
                                        <td>{element.address}</td>
                                        <td>{element.city}</td>
                                        <td>{element.state}</td>
                                        <td>{element.zipCode}</td>
                                        <td>{element.phoneNum}</td>
                                        <td>
                                            <button onClick={() => removeAddressBookData(element.id)} alt="delete" scr="deleteIcon">Delete</button>
                                        </td>
                                        <td>
                                            <button onClick={() => updateAddressBook(element.id)} alt="Edit" scr="editIcon">Edit</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </div>
            </body>
        </div>
    )
}

export default Home