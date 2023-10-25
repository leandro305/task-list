import Button from "../Button"
import Modal from "../Modal"
import "./style.scss"

interface Props {
  readonly showDeleteModal: () => void
  readonly deleteTask: () => void
}

const DeleteModal: React.FC<Props> = ({showDeleteModal, deleteTask}) => {
  return (
    <Modal>
      <div className="delete-modal">
        <p>Tem certeza de que deseja excluir esta tarefa?</p>
        <div className="delete-modal__actions">
          <Button title="Deletar" onClick={() => { deleteTask() }} />
          <Button title="Cancelar" outline onClick={() => {showDeleteModal()}} />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
