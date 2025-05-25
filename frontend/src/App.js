import NewUserForm from './Components/NewUserForm';
import LoginForm from './Components/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import ForgotPassword from './Components/ForgotPassword';
import TodoDashboard from './Components/TodoDashBoard';
import AddTodo from './Components/AddTodo';
import TodoList from './Components/TodoList';
import EditTodo from './Components/EditTodo';

function App() {
  return (
   <Router>
    <div className='App'>
      <Routes>
<Route path='/' element={<LoginForm/>}/>
<Route path="/user-registration" element={<NewUserForm />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/Dashboard" element={<TodoDashboard />} />
<Route path="/add-todo" element={<AddTodo />} />
<Route path="/todo-list" element={<TodoList />} />
<Route path="/edit-todo/:id" element={<EditTodo/>} />
<Route path="/log-out" element={<LoginForm/>} />
      </Routes>
    </div>
   </Router>
  );
}

export default App;
