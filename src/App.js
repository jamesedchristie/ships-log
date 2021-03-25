import React, { createContext, useState } from 'react';
import './App.css';
import { Header, Routes } from './components';
import * as store from 'store2';

export const NotesContext = createContext();

function App() {

  function checkStore() {
    if (store.has('notes')) return store('notes');
    else return [];
  }
  
  const [notes, setNotes] = useState(checkStore());
  
  // useEffect(() => {
  //   console.log("App use effect is running")
  //   let data = store('notes');
  //   if (data) setNotes(data);
  //   else store('notes', []);
  // }, [])

  return (
    <div className="App">
      <NotesContext.Provider
        value={{
          notes,
          setNotes
        }}
      >
        <Header />
        <div className="app-container">
          <Routes />
        </div>
      </NotesContext.Provider>
    </div>
  );
}

export default App;
