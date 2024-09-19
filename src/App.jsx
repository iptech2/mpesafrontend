import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');

  const handlePayment = async (amount) => {
    if (!phone) {
      setMessage('Please enter your phone number');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/mpesa', {
        phone,
        amount
      });

      if (response.data) {
        setMessage(`STK Push for Ksh ${amount} initiated successfully. Check your phone.`);
      }
    } catch (error) {
      setMessage('Error initiating payment: ' + error.response.data.error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>M-Pesa Payment</h1>
      <div style={styles.formGroup}>
        <label style={styles.label}>Phone Number:</label>
        <input
          style={styles.input}
          type="tel"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div style={styles.buttonGroup}>
        <button onClick={() => handlePayment(500)} style={styles.button}>Pay Ksh 500</button>
        <button onClick={() => handlePayment(1000)} style={styles.button}>Pay Ksh 1000</button>
        <button onClick={() => handlePayment(2000)} style={styles.button}>Pay Ksh 2000</button>
      </div>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '10px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  buttonGroup: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  message: {
    marginTop: '20px',
    fontWeight: 'bold',
  },
};

export default App;
