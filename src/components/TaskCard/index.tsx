import classNames from "classnames"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import CircularProgressBar from "../CircularProgressBar"
import "./style.scss"
import React from "react"

interface Props {
  readonly task: any
  readonly showDeleteModal: (e?: any) => any
  readonly criarTaskId: (_id?: any) => any
  readonly trocaExibicaoModal: () => any
  readonly selectOneTask: () => any
  readonly trocaModalEditIsOpen: () => any
  readonly alterarStatus: (_id?: any, status?: any, progress?: number) => any
}

const TaskCard: React.FC<Props> = ({ task, showDeleteModal, criarTaskId, trocaExibicaoModal, selectOneTask, trocaModalEditIsOpen, alterarStatus}) => {
  const { _id, title, priority, status, progress } = task


  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Tarefa</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Prioridade:</span>
        <span className={classNames(`${priority}-priority`, "priority")}>{priority}</span>
      </div>

      <div className="task-status-wrapper">
        <button className="status" onClick={() => { alterarStatus(_id, status, progress) }}>{status}</button>
      </div>

      <div className="progress">
        <CircularProgressBar strokeWidth={2} sqSize={24} percentage={progress} />
      </div>

      <div className="actions">
        <EditIcon className="mr-20 cp" onClick={ () => { trocaExibicaoModal(); criarTaskId(_id);  selectOneTask(); trocaModalEditIsOpen()} }/>
        <DeleteIcon className={classNames("cp")} key={_id} onClick={(e) => { showDeleteModal(); criarTaskId(_id) }} />
      </div>
    </div>
  )
}

export default TaskCard
