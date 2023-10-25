import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import Modal from "./components/Modal"
import { useEffect, useState } from "react"
import axios from "axios"

const App = () => {
  const [taskId, setTaskId] = useState("")
  const [taskList, setTaskList] = useState([])

  const selectOneTask = async () => {
    if (taskId && taskId !== undefined) {
      await axios.get(`http://localhost:59000/select/${taskId}`).then( (res) => {
        setHandleTask(res.data.title)
        alternarPrioridades(res.data.priority)
      })
    }
  }

  const deleteTask = async () => {
    if (taskId && taskId !== undefined) {
      await axios.delete(`http://localhost:59000/delete/${taskId}`).then( (res) => {
        selectTasks()
        showDeleteModal()
      })
    }
  }

  const selectTasks = async () => {
    await axios.post("http://localhost:59000/read").then( (res) => {
      setTaskList(res.data)
    })
    return false
  }

  const alterarStatus = async (_id?: any, status?: any, progress?: number) => {
    if (status === "Pendência") {
      status = "Em andamento"
      progress = 50
    }else if (status === "Em andamento") {
      status = "Feito"
      progress = 100
    }else if (status === "Feito") {
      status = "Pendência"
      progress = 0
    }

    await axios.put(`http://localhost:59000/update-st-pr/${_id}`, {status, progress}).then( (res) => {
      selectTasks() // Atualiza a tabela do front
    })
  }

  const [selectPriority, setSelectPriority] = useState("")

  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
  const [modalDeleteModal, setModalDeleteModal] = useState(false)

  const [task, setTask] = useState("")
  const [taskKey, setTaskKey] = useState("")

  const trocaModalEditIsOpen = () => {
    setModalEditIsOpen(!modalEditIsOpen)
  }
  
  const setHandleTask = (e?: any) => {
    if (e !== undefined) {
      setTask(e)
    }
  }

  const trocaExibicaoModal = () => {
    setShowAddEditModal(!showAddEditModal)
  }

  const criarTaskId = (_id?: any) => {
    if (_id !== "" && _id !== undefined) {
      setTaskId(_id)
    }
  }
  const showDeleteModal = () => {
      setModalDeleteModal(!modalDeleteModal)
  }

  const alternarPrioridades = (priority?: any) => {
    setSelectPriority(priority)

    setTaskKey(priority)
  }

  useEffect(() => {
    selectOneTask()
  }, [taskId])

  useEffect(() => {
    criarTaskId()
  }, [taskId])

  useEffect(() => {
    selectTasks()
  }, [])

  useEffect(() => {
    setHandleTask()
  }, [task])


  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Lista de Tarefas</h2>
          <Button title="Adicionar Tarefa" icon={<Add />} onClick={() => { trocaExibicaoModal() }} />
        </div>

        {showAddEditModal ? (
          <Modal children={ AddEditTaskForm(trocaExibicaoModal, selectPriority, alternarPrioridades, task, setHandleTask, taskKey, selectTasks, modalEditIsOpen, trocaModalEditIsOpen, taskId) } />
        ) : null }

        <div className="task-container">
          {taskList.map((task) => {
            return (
              <TaskCard task={task} showDeleteModal={showDeleteModal} criarTaskId={criarTaskId} trocaExibicaoModal={trocaExibicaoModal} selectOneTask={selectOneTask} trocaModalEditIsOpen={trocaModalEditIsOpen} alterarStatus={alterarStatus} />
            )})
          }
        </div>

        {modalDeleteModal ? (
        <DeleteModal showDeleteModal={showDeleteModal} deleteTask={deleteTask}/>
        ) : null }
      
      </div>
      {/* {showAddEditModal && <AddEditTaskForm />} */}
      {/* {showDeleteModal && <DeleteModal />} */}
    </div>
  )
}

export default App
