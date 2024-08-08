import React, { useState } from 'react';
import Modal from 'react-modal';
import '../CSS/alert.css';

Modal.setAppElement('#root');

const Alert = ({ isOpen, onClose, onConfirm, lista }) => {
  const [number, setNumber] = useState('');
  const availableNumbers = lista;

  const handleConfirm = () => {
    const intNumber = parseInt(number, 10);
    if (!isNaN(intNumber)) {
      onConfirm(intNumber);
    } else {
      alert("Please enter a valid number");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
       
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="custom-modal-header">
        <button onClick={onClose} className="close-button">X</button>
      </div>
      <div className="custom-modal-body">
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter a number"
          className="input-number"
          list="number-list"
        />
        <datalist id="number-list">
          {availableNumbers.map((num) => (
            <option key={num} value={num.codigo} />
          ))}
        </datalist>
        <div className="modal-buttons">
          <button onClick={onClose} className="cancel-button">Cancel</button>
          <button onClick={handleConfirm} className="confirm-button">Confirm</button>
        </div>
      </div>
    </Modal>
  );
};

export default Alert;
