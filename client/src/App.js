import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Component/Header'
import TaskListPage from "./pages/show/TaskList";
import ManageTask from "./pages/create/ManageTask";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Header/>
          <Routes>
             <Route path="/"  element={ <TaskListPage/> } />
             <Route path="/management"  element={ <ManageTask/> } />
           
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
