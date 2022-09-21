import './App.css';
import {Route,Routes} from 'react-router-dom'
import Home from './Component/Home'
import AddressBook from './Component/AddressBookForm'


function App() {
  return (
  <div>
    <Routes>
      <Route path="/home" element={<Home />}/>
      <Route path="/addressBook" element={<AddressBook />}/>
      <Route path="/AddressBookForm/:id" element={<AddressBook/>}/>
    
    </Routes>
     </div>
  );
}

export default App;
