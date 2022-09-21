import React, { useState, useEffect } from 'react'
import './AddressBookForm.css'
import AddressBookService from './Service/AddressBookService'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function AddressBookForm() {
    let initialValue = {
        fullName: '',
        phoneNumber: 0,
        address: '',
        city: '',
        state: '',
        zipcode: '',
        isUpdated: false,
    }

    const [formValue, setForm] = useState(initialValue)
    const params = useParams();


    useEffect(() => {
        if (params.id) {
            getAddressBookDataById(params.id);
        }
    }, [params.id]);

    const getAddressBookDataById = (id) => {
        AddressBookService.getAddressBookById(id)
            .then((response) => {
                let object = response.data.data;
                console.log(object);
                setData(object);
            })
            .catch((err) => {
                alert("error is", err);
            });
    };

    const setData = (obj) => {
        setForm({
            ...formValue,
            ...obj,
            id: obj.id,
            isUpdated: true,
            fullName: obj.fullName,
            phoneNum: obj.phoneNum,
            address: obj.address,
            city: obj.city,
            state: obj.state,
            zipCode: obj.zipCode,
        })
    };

    const changeValue = (event) => {
        console.log('====================================');
        console.log(event.target.name);
        console.log('====================================');
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const save = async (event) => {
        event.preventDefault();

        let obj = {
            fullName: formValue.fullName,
            phoneNum: formValue.phoneNumber,
            address: formValue.address,
            city: formValue.city,
            state: formValue.state,
            zipCode: formValue.zipcode,
        }
        console.log(obj);
        if (formValue.isUpdated) {
            var answer = window.confirm("Do you want to update the AddressBook data");
            if (answer === true) {
                AddressBookService.updateAddressBook(params.id, obj)
                    .then((response) => {
                        alert("data updated successfully");
                    })
                    .catch((error) => {
                        toast.error("something went wrong", error);
                    });
            } else {
                window.location.reload();
            }
        } else {
            AddressBookService.addAddressBookData(obj)
                .then((response) => {
                    const result = response.data;
                    console.log(result);
                    alert("Data added successfully");
                })
        }
    }
    return (
        <html>
            <head>
                <title>AddressBook</title>
            </head>
            <body class="WebContainer">
                <header class="header-content ">
                    <div class="logo-content">
                        <img src="" alt="logo" />
                        <div class="header">
                            <span >Address</span>
                            <span>Book</span>
                        </div>
                        <span class="heading"> </span>
                    </div>
                </header>
                <div class="form-size">
                    <form action="#" class="form" onSubmit={save}>
                        <div class="person">
                            <div class="person-address">Person Address Form</div>
                            <img class="form-head-image" src="" alt="logo" />
                        </div>
                        <div class="form-constrains">
                            <div >
                                <label for="name"></label>
                                <input type="text" class="input-name" id="name" name="fullName" placeholder="Your name" value={formValue.fullName} onChange={changeValue} />
                            </div>
                            <div>
                                <label for="phoneNumber"></label>
                                <input type="number" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" value={formValue.phoneNumber} onChange={changeValue} />
                            </div>

                            <div>
                                <label for="address"></label>
                                <textarea class="addressbook" name="address" id="address" placeholder="Your Address" value={formValue.address} onChange={changeValue}></textarea>
                            </div>
                            <div>
                                <label for="city"></label>
                                <select class="city-state" name="city" id="city" required value={formValue.city} onChange={changeValue}>
                                    <option selected disabled hidden value="Select City">Select City</option>
                                    <option value="City">select City</option>
                                    <option value="Ahmednagar">Ahmednagar</option>
                                    <option value="Ahmedabad">Ahmedabad</option>
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                </select>
                                <label for="state"></label>
                                <select class="city-state" name="state" id="state" value={formValue.state} onChange={changeValue}>
                                    <option value="City">select State</option>
                                    <option selected disabled hidden value="Select State">Select State</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="West Bengal">West Bengal</option>
                                </select>
                                <label for="zip"></label>
                                <input type="text" id="zip" name="zipcode" placeholder="ZipCode" value={formValue.zipcode} onChange={changeValue} />
                            </div>

                            <div>

                                <button type="submit" class="button button-submit" id="submitButton">
                                    {formValue.isUpdated ? "Update" : "Submit"}
                                </button>
                                <button type="reset" class="button button-reset"
                                    id="resetButton">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>

            </body>

        </html>

    )
}

export default AddressBookForm