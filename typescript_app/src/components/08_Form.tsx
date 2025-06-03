import { useState } from "react";

// 상태 타입 정의
interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    // e : 이벤트 객체 타입 FormEvent == 제출이벤트
    e.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" onChange={handleChange} />
      <input name="password" type="password" onChange={handleChange} />
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;
