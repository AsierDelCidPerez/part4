import logo from './logo.svg';
import React, {useState, useEffect} from 'react'
import './App.css';
import Titulo from './components/Titulo';
import Registro from './components/Registro';
import Filtro from './components/Filtro';
import blogService from './services/blog';
import Notification from './components/Notification';
import Agregar from './components/Agregar';

function App() {

  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({
    text: null, isSuccess: true
  })

  useEffect(() => {
    blogService.getAll().then(res => setBlogs(res))
  }, [])

  return (
    <div>
      <Titulo text="Banco de blogs"/>
      <Notification text={notification.text} isSuccess={notification.isSuccess}/>
      <Filtro blogs={blogs} setBlogs={setBlogs}/>
      <Registro blogs={blogs} setBlogs={setBlogs} notifications={setNotification}/>
      <Agregar blogs={blogs} setBlogs={setBlogs} notifications={setNotification}/>
    </div>
  );
}

export default App;
