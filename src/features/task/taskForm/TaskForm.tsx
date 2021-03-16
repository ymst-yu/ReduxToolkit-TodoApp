import React from "react";
import styles from "./TaskForm.module.scss";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";

type Inputs = {
  taskTitle: string;
};

const TaskForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();

  const handleCreate = (data: Inputs) => {
    console.log(data);
    reset(); // フォーム送信後にテキストフィールドに残ってる文字をクリアしてくれる。setInputText("")と同じ。
  };
  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit(handleCreate)} className={styles.form}>
        <TextField
          id="outlined-basic"
          label="New Task"
          variant="outlined"
          fullWidth={true}
          inputRef={register} // register: Formから送信されるデータの取得元を決める。inputRef={register}という形で取得元を決めることができる。その際にname属性の値をデータの名前にすることができる。
          name="taskTitle"
        />
      </form>
    </div>
  );
};

export default TaskForm;
