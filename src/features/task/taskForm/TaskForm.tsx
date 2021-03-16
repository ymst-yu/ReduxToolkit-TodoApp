import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TaskForm.module.scss";
import { createTask, handleModalOpen, selectSelectedTask, editTask } from "../taskSlice";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";

type Inputs = {
  taskTitle: string;
};

type PropTypes = {
  edit?: boolean;
};

const TaskForm: React.FC<PropTypes> = ({ edit }) => {
  const dispatch = useDispatch();
  const selectedTask = useSelector(selectSelectedTask);
  const { register, handleSubmit, reset } = useForm();
  const handleCreate = (data: Inputs) => {
    if (!data.taskTitle) return;
    dispatch(createTask(data.taskTitle));
    reset(); // フォーム送信後にテキストフィールドに残ってる文字をクリアしてくれる。setInputText("")と同じ。
  };
  const handleEdit = (data: Inputs) => {
    const sendData = { ...selectedTask, title: data.taskTitle };
    dispatch(editTask(sendData));
    dispatch(handleModalOpen(false));
  };
  return (
    <div className={styles.root}>
      <form onSubmit={edit ? handleSubmit(handleEdit) : handleSubmit(handleCreate)} className={styles.form}>
        <TextField
          id="outlined-basic"
          label={edit ? "Edit Task" : "new Task"}
          defaultValue={edit ? selectedTask.title : ""}
          variant="outlined"
          fullWidth={true}
          inputRef={register} // register: Formから送信されるデータの取得元を決める。inputRef={register}という形で取得元を決めることができる。その際にname属性の値をデータの名前にすることができる。
          name="taskTitle"
        />
        {edit ? (
          <div className={styles.button_wrapper}>
            <button type="submit" className={styles.submit_button}>
              Submit
            </button>
            <button type="button" onClick={() => dispatch(handleModalOpen(false))} className={styles.cancel_button}>
              Cancel
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default TaskForm;
