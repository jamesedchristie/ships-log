import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NotesContext } from '../App';
import * as store from 'store2';

import './styles/header.css';
import { AwesomeButton } from 'react-awesome-button';
import './styles/btnTheme.css';
import { FaRadiation } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function Header() {

  const { setNotes } = useContext(NotesContext);

  const Confirm = ({ closeToast }) => (
    <div>
      <p>Are you sure you want to erase the entire ship's log?</p>
      <div className="btn-row">
        <div className="btn-container">
          <AwesomeButton
            type="secondary"
            size="medium"
            onPress={closeToast}
          >
            <span>Cancel</span>
          </AwesomeButton>
        </div>
        <div className="btn-container">
          <AwesomeButton
            type="link"
            size="medium"
            onPress={() => {
              closeToast();
              deleteAllNotes();
            }}
          >
            <span>Authorise</span>
          </AwesomeButton>
        </div>
      </div>
    </div>
  )

  const confirmDelete = () => {
    toast.dark(<Confirm />, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
      style: {
        borderRadius: "5px",
        boxShadow: "0 0 5px 2px #dc4e2e",
        color: "#d1d5d6"
      }
    })
  }

  const deleteAllNotes = () => {
    store.clearAll();
    setNotes([]);    
  }

  return (
    <IconContext.Provider value={{ size: '1.5em', style: { marginLeft: '5px' } }}>
      <nav>
        <Link to="/" className="logo">
          <span style={{ textShadow: "2px 2px #dc4d2ecc" }}>S</span>
          <span style={{ textShadow: "2px 2px #dc4d2ecc" }}>H</span>
          <span style={{ textShadow: "2px 2px #dc4d2ecc" }}>I</span>
          <span style={{ textShadow: "2px 2px #dc4d2ecc" }}>P</span>
          <span style={{ textShadow: "2px 2px #dc4d2ecc" }}>'</span>
          <span style={{ textShadow: "2px 2px #dc4d2ecc" }}>S</span>
          <span>&nbsp;</span>
          <span style={{ textShadow: "2px 2px #dc4d2ecc" }}>L</span>
          <span style={{ textShadow: "2px 2px #dc4d2ecc" }}>O</span>
          <span style={{ textShadow: "2px 2px #dc4d2ecc" }}>G</span>
        </Link>
        <AwesomeButton
          type="link"
          size="medium"
          onPress={confirmDelete}
        >
          <span>Erase All&nbsp;</span> <FaRadiation />
        </AwesomeButton>
      </nav>
      <ToastContainer />
    </IconContext.Provider>
  )
}