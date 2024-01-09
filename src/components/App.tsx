import { FormPages } from "../pages/FormPages/FormPages";
import style from "./App.module.scss";

// TODO Использовать react router
// TODO Убрать хардкод в компонентах
// TODO Добавить адаптив
// TODO Использовать redux / или хотя бы useReducer

function App() {
  return (
    <main className={style.main}>
      <FormPages />
    </main>
  );
}

export default App;
