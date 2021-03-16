import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "../taskForm/TaskForm";
import { handleModalOpen, selectIsModalOpen, selectTask, completeTask, deleteTask } from "../taskSlice";
import styles from "./TaskItem.module.scss";
import Checkbox from "@material-ui/core/Checkbox";
import EventNoteIcon from "@material-ui/icons/EventNote";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";

interface PropTypes {
  task: { id: number; title: string; completed: boolean };
}

const TaskItem: React.FC<PropTypes> = ({ task }) => {
  const isModalOpen = useSelector(selectIsModalOpen);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(selectTask(task));
    dispatch(handleModalOpen(true)); // true: action.payloadになる
  };
  const handleClose = () => {
    dispatch(handleModalOpen(false));
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <EventNoteIcon />
        <div className={styles.title_text}>{task.title}</div>
      </div>
      <div className={styles.right_items}>
        <Checkbox checked={task.completed} onClick={() => dispatch(completeTask(task))} className={styles.checkbox} />
        <button onClick={handleOpen} className={styles.edit_button}>
          <EditIcon className={styles.icon} />
        </button>
        <button onClick={() => dispatch(deleteTask(task))} className={styles.delete_button}>
          <DeleteIcon className={styles.icon} />
        </button>
      </div>
      <Modal open={isModalOpen} onClose={handleClose} className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_title}>Edit</div>
          <TaskForm edit />
        </div>
      </Modal>
    </div>
  );
};

export default TaskItem;
