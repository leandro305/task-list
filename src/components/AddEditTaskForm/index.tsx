import classNames from "classnames"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"
import axios from "axios"
// import { useState } from "react"

const AddEditTaskForm = (trocaExibicaoModal:()=> void, selectPriority: string, alternarPrioridades:(priority?: any) => void, task: any, setHandleTask:(e?: any) => void, taskKey: any, selectTasks:()=> any, modalEditIsOpen: boolean, trocaModalEditIsOpen:() => any, taskId: any) => {
  
  const addTasks = () => {
    axios.post("http://localhost:59000/create", {"task": task, "priority": taskKey}).then( (res) => {
      trocaExibicaoModal()
      selectTasks()
      setHandleTask(""); alternarPrioridades("") // Tornar os campos task e de prioridades vazios!
    })
  }

  const editTask = async (_id?: any) => {
    await axios.put(`http://localhost:59000/update/${taskId}`, {task, taskKey}).then( (res) => {
      trocaExibicaoModal() // Fecha o modal
      trocaModalEditIsOpen() // Diz pra variavel 'modalEditIsOpen' que o modal edit fechou
      selectTasks() // Atualiza a tabela do front
      setHandleTask(""); alternarPrioridades("") // Tornar os campos task e de prioridades vazios!
    })
  }

  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            
            <span className="modal-title">
              {modalEditIsOpen ? ("Editar Tarefa") : ("Adicionar Tarefa") }
            </span>

            <Close className="cp" onClick={() => { if (modalEditIsOpen) { trocaExibicaoModal(); trocaModalEditIsOpen()} else { trocaExibicaoModal() } setHandleTask(""); alternarPrioridades("")}}/>
          </div>

          <Input label="Tarefa" placeholder="Digite sua tarefa aqui..." onChange={(e) => {setHandleTask(e.target.value)}} name="title" defaultValue={task} />

          <div className="modal-priority">
            <span>Prioridade</span>
            <ul className="priority-buttons">
              {["alta", "media", "baixa"].map((priority) => {
                
                if (selectPriority === priority) {
                  return (
                  <li key={priority} className={classNames(`${selectPriority}-selected`, priority)} onClick={ () => alternarPrioridades(priority)}>
                    {priority}
                  </li>
                  )
                }else {
                  return (
                  <li key={priority} className={classNames(``, priority)} onClick={ () => alternarPrioridades(priority)}>
                    {priority}
                  </li>
                  )
                }

              })}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button title={ modalEditIsOpen ? ("Editar") : ("Adicionar") } onClick={() => { if (modalEditIsOpen) { editTask() } else { addTasks() } }} />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm
