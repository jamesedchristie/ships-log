import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { NotesContext } from '../App';
import { AwesomeButton } from 'react-awesome-button';
import '../components/styles/btnTheme.css';
import { FaChevronLeft, FaSave } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import * as store from 'store2';

export function EditNote() {

  const { notes, setNotes } = useContext(NotesContext);

  const { routeIndex } = useParams();
  const noteIndex = parseInt(routeIndex);

  const navigator = useHistory();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  useEffect(() => {
    let note = notes[noteIndex];
    if (store.session.has('draftTitle')) {
      setTitle(store.session('draftTitle'))
    } else {
      setTitle(note.title);
    }
    if (store.session.has('draftContent')) {
      setContent(store.session('draftContent'));
    } else {
      setContent(note.content);
    }
  }, [noteIndex, notes]);

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
    const updatedNotes = Array.from(notes);
    updatedNotes[noteIndex] = {
      title: title,
      content: content,
      datetime: notes[noteIndex].datetime
    };
    setNotes(updatedNotes);
    store('notes', updatedNotes);
    store.session.remove('draftTitle');
    store.session.remove('draftContent');
    navigator.push('/')
  }

  const cancelEdit = () => {
    store.session.remove('draftTitle');
    store.session.remove('draftContent');
    navigator.push('/')
  }

  return (
    <div>
      <IconContext.Provider value={{ size: '1.3em', style: { marginLeft: '5px', marginTop: '1px' } }}>

        <div className="input-container">
          <input type="text" className="title-input" value={title} onChange={onTitleChange} />
        </div>
        <p id="feedback-danger" hidden>* Title must be max 100 charaacters.</p>
        <div className="content-container">
          <textarea className="content-input" value={content} onChange={onContentChange} />
        </div>
        <div className="btn-row">
          <div className="btn-container">
            <AwesomeButton
              type="secondary"
              size="small"
              ripple
              onPress={cancelEdit}
            >
              Back <FaChevronLeft />
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