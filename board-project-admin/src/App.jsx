import "./css/App.css";
import Login from "./components/Login";
import { AuthContext, AuthProvider } from "./components/AuthContext";
import { useContext } from "react";
import DashBoard from "./components/DashBoard";

// 컴포넌트 분리하여 하위 컴포넌트에서 useContext 이용하기
function App() {
  return (
    <AuthProvider>
      <AppComponent />
    </AuthProvider>
  );
}

function AppComponent() {
  // 로그인을 했다면 DashBoard 렌더링
  // 로그인을 안했다면 Login 렌더링
  // -> 조건 : 로그인 여부
  // ->        로그인을 했는지 안했는지를 기억해줄 상태값(user)
  //  ->       user 에는 로그인 한 사람에 대한 정보가 세팅.
  //  ->       user는 AuthContext안에 있다!
  //  ->       ContextAPI 를 이용하여 렌더링 조건처리 하면 된다!
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <div className="body-container">
          <DashBoard />
        </div>
      ) : (
        <div className="login-section">
          <Login />
        </div>
      )}
    </>
  );
}

export default App;
