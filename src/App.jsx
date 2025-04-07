import React from 'react';
import TicketForm from './TicketForm'; // Assuming TicketForm is in the same directory
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for the toasts

const App = () => {
  return (
    <div>
      <ToastContainer />
      <TicketForm /> 
    </div>
  );
};

export default App;