import Link from "next/link";
import styles from "./sidebar.module.css";

export const SIDE_NAVIGATION = {
  ITEMS: [
    {
      name: "Travel aid",
      route: "/dashboard/travel-aid",
      icon: "/icons/dashboard/sidebar/travel-aid.png",
      status: true,
    },
    {
      name: "Settings",
      route: "/dashboard/settings",
      icon: "/icons/dashboard/sidebar/settings.png",
      status: false,
    },
    {
      name: "Profile",
      route: "/dashboard/profile",
      icon: "/icons/dashboard/sidebar/profile.png",
      status: false,
    },
    {
      name: "Admin",
      route: "/dashboard/admin",
      icon: "/icons/dashboard/sidebar/admin.png",
      status: false,
    },
  ],
};

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.navigation}>
      <div className={styles.left_sidebar}>
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
          {SIDE_NAVIGATION.ITEMS.map(({ name, route, icon, status }) => {
            return (
              <Link key={name} className={`${styles.menu_item}`} href={route}>
                <div className={styles.left}>
                  {status === true && <img src="/icons/checked.png" />}
                  {status === false && <img src="/icons/unchecked.png" />}
                  <p>{name}</p>
                </div>
                <button className={styles.edit_button}>Edit</button>
              </Link>
            );
          })}
        </div>
        <img
          className={styles.button_icon}
          src="/icons/button.png"
          alt="Button"
        />
      </div>

      <main className={styles.main_content}>
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Sidebar;
