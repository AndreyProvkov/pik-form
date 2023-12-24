import { useState } from "react";
import { AppInput } from "./UI/AppInput/AppInput";

function App() {
  const [value, setValue] = useState("");

  const onInput = (value: string) => {
    setValue(value);
  };

  return (
    <>
      <AppInput
        title="Test Test Test"
        description="введите данные полностью"
        placeholder="Текст пример"
        type="text"
        name="name"
        mask={""}
        value={value}
        onInput={onInput}
      />
    </>
  );
}

export default App;
