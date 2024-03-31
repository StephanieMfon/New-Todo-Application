import styles from "./page.module.css";
const SingleTodo = ({ params }: { params: { id: string } }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h3>Edit Task</h3>
        </div>
        <div className={styles.middle}>
          <p className={styles.tast_name}>Task Name</p>
          <p className={styles.task}>Training at the Gym</p>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.red_button}>Delete</button>
        <button className={styles.save_button}>Save</button>
      </div>
    </div>
  );
};

export default SingleTodo;
