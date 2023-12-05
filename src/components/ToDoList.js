//COMPONENTE QUE PERMITE ADICIONAR, MARCAR COMO CONCLUIDO E RASTREAR TAREFAS

import { useState } from "react"
import { ToDoListItem } from "./ToDoListItem";


//CRIANDO ITEMS DA TODO LIST COM ARRAY..................................................................
export const ToDoList = () => {

    const defaultListItems = [
        { id: 1, name: "sua tarefa", isCompleted: false },
        { id: 2, name: "sua tarefa", isCompleted: false },
        { id: 3, name: "sua tarefa", isCompleted: false },
        { id: 4, name: "sua tarefa", isCompleted: false },

    ];


    const [items, setItems] = useState(defaultListItems)
    const [taskValue, setTaskValue] = useState("");
    const [nextItemId, setNextItemId] = useState(5);


    // SE HOUVER INSERIR UM INPUT REPETIDO RETORNA NADA...................................................
    const handleTaskSubmit = (event) => {
        event.preventDefault();
        if (items.find(i => i.name.toLowerCase() === taskValue.toLowerCase())) {
            alert('Tarefa já foi adicionada!')
            return;

        }
        //CRIANDO IDS AUTOMATICOS PARA OS ITENS CRIADOS PELO USUARIO.......................................
        const newItem = {
            id: nextItemId,
            name: taskValue,
            isCompleted: false,
        };

        setItems([...items, newItem]);
        setTaskValue('')
        setNextItemId(nextItemId + 1);
        event.preventDefault();

    }
    //FUNCAO PARA ATUALIZAR O ESTADO DA TAREFA...................................................

    const handleTaskChanged = (item, newIsCompleted) => {

        const updatedItems = items.map((listItem) => {
            if (listItem.id === item.id) {
                return { ...listItem, isCompleted: newIsCompleted };
            }
            return listItem;
        });

        setItems(updatedItems);
    };


    //FUNCAO PARA REMOVER A LI........................................................................
    const handleRemoveItem = (itemId) => {
        const updatedItems = items.filter((item) => item.id !== itemId);
        setItems(updatedItems);
    };

    //FUNCAO PARA EDITAR O LI.............................................................................
    const handleEditClick = (editedItem, newText) => {

        const updatedItems = items.map((item) => {
            if (item.id === editedItem.id) {
                return { ...item, name: newText };
            }
            return item;
        });

        setItems(updatedItems);
    };

    return (
        <div id="container">
            <div className="todo-list-container">

                <form onSubmit={handleTaskSubmit}>

                    <input
                        type="text"
                        placeholder="Adicione uma nova tarefa"
                        value={taskValue}
                        onChange={(event) => setTaskValue(event.target.value)} />

                    <button type="submit">Adicionar</button>
                </form>


                <ul>
                    {items.map((item) => (
                        <ToDoListItem
                            key={item.id}
                            item={item}
                            onEditClick={handleEditClick}
                            onRemoveItem={handleRemoveItem}
                            onTaskChanged={handleTaskChanged}
                        />
                    ))}


                </ul>
            </div>
        </div>
    );

};