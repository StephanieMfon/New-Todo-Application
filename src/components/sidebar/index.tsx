"use client";
import Link from "next/link";
import styles from "./sidebar.module.css";
import { useEffect, useState } from "react";
import { Todo } from "@/app/(index)/[id]/page";
import { connect } from "react-redux";
import { getTodos, updateTodo } from "@/app/redux/actions";

const Sidebar = ({
  children,
  todos,
  getTodos,
}: {
  children: React.ReactNode;
  todos: Todo[];
  getTodos: () => void;
}) => {
  const [activeItem, setActiveItem] = useState<number>();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className={styles.navigation}>
      <div className={styles.left_sidebar}>
        <div className={styles.top_section}>
          <div className={styles.profile_section}>
            <img
              className={styles.profile_image}
              src="images/profile.png"
              alt="Profile"
            />
            <div className={styles.header}>
              <h3 className={styles.name}>Hello John</h3>
              <p className={styles.plan_text}>
                <i>What are your plans for today?</i>
              </p>
            </div>
          </div>

          <div className={styles.upgrade_section_wrapper}>
            <div className={styles.upgrade_section}>
              <div className={styles.left}>
                <img src="/images/cup.png" alt="Cup" />

                <h3 className={styles.upgrade_cta}>Go Pro Upgrade Now</h3>
              </div>

              <p className={styles.amount}>$1</p>
            </div>
          </div>
          <div className={styles.menu_items}>
            {todos.map(({ id, title, completed }) => {
              return (
                <Link
                  key={id}
                  className={`${styles.menu_item} ${
                    activeItem === id && styles.active
                  }`}
                  href={`http://localhost:3000/${id}`}
                  onClick={() => setActiveItem(id)}
                >
                  <div className={styles.left}>
                    {completed === true && <img src="/icons/checked.png" />}
                    {completed === false && <img src="/icons/unchecked.png" />}
                    <p>{title}</p>
                  </div>
                  <button className={styles.edit_button}>Edit</button>
                </Link>
              );
            })}
          </div>
        </div>

        <Link
          className={styles.button_wrapper}
          href={`http://localhost:3000/new-todo`}
        >
          <img
            className={styles.button_icon}
            src="/icons/button.png"
            alt="Button"
          />
        </Link>
      </div>

      <main className={styles.main_content}>
        <div>{children}</div>
      </main>
    </div>
  );
};

const mapStateToProps = (state: Todo[]) => ({
  todos: state,
});

const mapDispatchToProps = {
  getTodos,
  updateTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
