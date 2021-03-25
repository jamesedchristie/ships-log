import React, { useContext, useEffect, useState } from 'react';
import { NotesContext } from '../App';
import { AwesomeButton } from 'react-awesome-button';
import '../components/styles/btnTheme.css';
import { FaSave, FaTimes } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import * as store from 'store2';
import { IconContext } from 'react-icons';

export function AddNote() {

  const navigator = useHistory();

  const { notes, setNotes } = useContext(NotesContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (store.session.has('draftTitle')) setTitle(store.session('draftTitle'));
    if (store.session.has('draftContent')) setContent(store.session('draftContent'));
  }, []);

  const onTitleChange = (e) => {
    let value = e.target.value;
    if (value.length > 50) {
      document.getElementById('feedback-danger').hidden = false;
      return;
    } else {
      document.getElementById('feedback-danger').hidden = true;
      setTitle(value);
      store.session('draftTitle', value);
    }
  }

  const onContentChange = (e) => {
    let value = e.target.value;
    setContent(value);
    store.session('draftContent', value);
  }

  const saveNote = () => {
    let newNote = {
      title: title,
      content: content,
      datetime: new Date().toLocaleDateString()
    }
    let notesCopy = Array.from(notes);
    setNotes(notesCopy.concat([newNote]));
    store('notes', notesCopy.concat([newNote]));
    store.session.remove('draftTitle');
    store.session.remove('draftContent');
    navigator.push('/')
  }

  const cancelAdd = () => {
    store.session.remove('draftTitle');
    store.session.remove('draftContent');
    navigator.push('/')
  }

  return (
    <div>
    <IconContext.Provider value={{ size: '1.3em', style: { marginLeft: '5px', marginTop: '1px' } }}>
      <div className="input-container">
        <input
          type="text"
          className="title-input"
          value={title}
          onChange={onTitleChange}
          placeholder="Entry title..."
        />
      </div>
      <p id="feedback-danger" hidden>* Title must be max 100 charaacters.</p>
      <div className="content-container">
        <textarea 
          className="content-input" 
          value={content} 
          onChange={onContentChange} 
          placeholder="Content..." 
        />
      </div>
      <div className="btn-row">
        <div className="btn-container">
          <AwesomeButton
            type="secondary"
            size="small"
            ripple
            onPress={cancelAdd}
          >
            Cancel <FaTimes />
          </AwesomeButton>
        </div>
        <div className="btn-container">
          <AwesomeButton
            type="primary"
            size="small"
            ripple
            onPress={saveNote}
          >
            Save <FaSave />            
          </AwesomeButton>
        </div>
      </div>
      </IconContext.Provider>
    </div>
  )
}