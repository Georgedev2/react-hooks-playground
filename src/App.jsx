import { useState } from 'react';
import './App.css';
import User from './components/User/User';
// import UserWithFix from './components/Counter/UserWithFix';
import Counter from './components/Counter/Counter';
import CounterWithFix from './components/Counter/CounterWithFix';
import LoginForm from './components/LoginForm/LoginForm';
import UserWithFix from './components/User/UserWithFix';
import LoginFormWithFix from './components/LoginForm/ LoginFormWithFix';
function App() {
const [userId, setUserId] = useState(1);

  return <div className="App">
    app
    
    <button onClick={() => setUserId((prevId) => prevId + 1)}>User {userId}</button>
    
    <User userId={userId} />
    
    {/* <UserWithFix userId={userId} /> */}
    
    <CounterWithFix />
    <Counter/>
    
    < LoginForm/>
    <LoginFormWithFix/>
  </div>;
}

export default App;
