import axios from "axios";

export class AddressBookService  {
    baseUrl="http://localhost:8085/addressbookapp";

    addAddressBookData(data){
        return axios.post(`${this.baseUrl}/add`,data);
     }
     getAllAddressBookData(){
        return axios.get(`${this.baseUrl}/get`);
     }
     getAddressBookById(id){
        return axios.get(`${this.baseUrl}/get/${id}`);
     }
     updateAddressBook(id,data){
        return axios.put(`${this.baseUrl}/update/${id}`,data);
     }
     deleteAddressBook(id){
        return axios.delete(`${this.baseUrl}/delete/${id}`)
     }

 
}

export default new AddressBookService();