import { useState } from "react";

const NameInput: React.FC = () => {
  const [name, setName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e: React.ChangeEvent<HTMLInputElement>
    // 이벤트객체 타입 지정 : change이벤트<HTML의Input태그요소>
    setName(e.target.value);
  };

  return <input type="text" value={name} onChange={handleChange} />;
};

export default NameInput;
