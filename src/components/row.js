import React from 'react';
import { useHistory } from 'react-router';
import { AwesomeButton } from 'react-awesome-button';
import './styles/btnTheme.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import './styles/row.css';

export function Row({ index, note, onDelete }) {

  const navigator = useHistory();

  const editNote = () => {
    navigator.push(`/Edit/${index}`);
  }

  const deleteNote = () => {
    console.log("Delete function called for note " + index);
    onDelete(index);
  }

  return (
    <IconContext.Provider value={{ size: '1em', style: { } }}>
      <div className="note-row">
        <div className="note-container" onClick={editNote}>
          <div className="note-title">
            {note.title}
          </div>
          <div className="note-datetime">
            Stardate {note.datetime.replaceAll('/', '-')}
          </div>
          <div className="note-preview">
            {note.content.slice(0,25).trim()}...
        </div>
        </div>
        <div className="note-edit">
          <AwesomeButton
            type="secondary"
            size="icon"
            ripple
            onPress={editNote}
          >
            <FaEdit />
          </AwesomeButton>
          {/* <Button text="Edit" onClick={editNote} variant="edit-button" /> */}
        </div>
        <div className="note-delete">
          <AwesomeButton
            type="link"
            size="icon"
            ripple
            onPress={deleteNote}
          >
            <FaTrashAlt />
          </AwesomeButton>
        </div>
      </div>
    </IconContext.Provider>
  )
}