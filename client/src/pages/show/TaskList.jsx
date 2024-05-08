import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { API_ROOT, COMPLETED_STATUS, PENDING_STATUS } from '../../utils/APIs';

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_ROOT}/tasks`);
      setTasks(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleMarkAsDone=async(id)=>{
try {
    
    const response = await axios.put(`${API_ROOT}/tasks/${id}`,{
        status:COMPLETED_STATUS
    });
    if (response.status =200) {
        await fetchData()
    }
} catch (error) {
    
}
  }


  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      try {
        await axios.delete(API_ROOT+`/tasks/${taskId}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div>
    {
      tasks?.length <= 0 ?
      <h1 className='text-center'>No Record Found!</h1>
      :
      (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sr</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                {task.status||"PENDING"}
                </td>
                <td>
                
                {task.status == PENDING_STATUS  &&
                  <Button variant="primary" onClick={() => handleMarkAsDone(task._id)}>Mark as done</Button>}&nbsp;
                <Link to={`/management/?taskid=${task._id}&title=${task.title}&description=${task.description}`}><Button variant="info" >Update</Button></Link>&nbsp;
                  <Button variant="danger" onClick={() => handleDelete(task._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
    </div>
  );
};

export default TaskListPage