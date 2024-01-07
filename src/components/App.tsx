import { FormPages } from "../pages/FormPages/FormPages";
import style from "./App.module.scss";

// TODO Использовать react router
// TODO Убрать хардкод в компонентах

function App() {
  return (
    <main className={style.main}>
      <FormPages />
    </main>
  );
}

export default App;
