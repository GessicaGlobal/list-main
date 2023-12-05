
import React, { useState } from "react";


//DECLARANDO OS ESTADOS.......................................................................
export const ToDoListItem = ({ item, onTaskChanged, onRemoveItem, onEditClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.name);

  //FUNCAO PARA EDITAR .........................................................................
  const handleEditClick = () => {
    setIsEditing(true);
  };

  //FUNCAO PARA SALVAR A EDICAO..................................................................
  const handleSaveClick = () => {
    onEditClick(item, editedText);
    setIsEditing(false);
  };


  return (
    <li>
      <div className="spanECheckboxContainer">
      <input
        type="checkbox"
        checked={item.isCompleted}
        onChange={() => onTaskChanged(item, !item.isCompleted)}
      />

      {isEditing ? (
      
        <div>
          <input value={editedText} onChange={(e) => setEditedText(e.target.value)} />
          <button onClick={handleSaveClick}>Salvar</button>
        </div>
      ) : (
        <div className = "buttonAndSpanContainer">

          <div className = "spanContainer">
            <span style={{ textDecoration: item.isCompleted ? "line-through" : "none" }}>
              {item.name}

            </span>
           
          </div>

          <div className = "buttonContainer">
            <button onClick={() => onRemoveItem(item.id)}>Remover</button>
            <button onClick={handleEditClick}>Editar</button>
          </div>

        </div>
      )}
         </div>
    </li>
 
  );
};
