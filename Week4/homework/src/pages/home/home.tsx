import { ROUTE_PATH } from "@shared/router/path";
import * as styles from "./home.css.ts";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className={styles.container}>
      <Link to={ROUTE_PATH.LOGIN} className={styles.link}>
        로그인 하러가기
      </Link>
    </div>
  );
};

export default Home;
