import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { NotesContext } from '../App';
import { Row } from '../components';
import { AwesomeButton } from 'react-awesome-button';
import '../components/styles/btnTheme.css';
import { IconContext } from 'react-icons';
import { FaPencilAlt } from 'react-icons/fa';
import * as store from 'store2';
import './styles/home.css';

export function Home() {

  const { notes, setNotes } = useContext(NotesContext);

  const navigator = useHistory();

  const onDelete = (index) => {
    let newNotes = notes.filter((n, i) => i !== index);
    setNotes(newNotes);
    store('notes', newNotes);
  }

  const onNewNoteClick = () => {
    navigator.push('/Add');
  }

  return (
    <div>
      <IconContext.Provider value={{ size: '1.3em', style: { marginLeft: '5px' } }}>
        {notes.map((n, i) => <Row note={n} index={i} onDelete={onDelete} />)}
        <div className="add-btn-container">
          <AwesomeButton
            type="primary"
            size="small"
            ripple
            onPress={onNewNoteClick}
          >
            Add&nbsp; <FaPencilAlt />
          </AwesomeButton>
        </div>
      </IconContext.Provider>
    </div>
  )
}