import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { API_ROOT } from '../../utils/APIs';

const ManageTask = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParam = new URLSearchParams(location.search)
  const [title, setTitle] = useState(searchParam.get("title"));
  const [description, setDescription] = useState(searchParam.get("description"));
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');


  const clearOldData=()=>{
    setTitle('');
        setDescription('');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!title.trim()) {
      setTitleError('Title is required.');
      hasError = true;
    } else {
      setTitleError('');
    }

    if (!description.trim()) {
      setDescriptionError('Description is required.');
      hasError = true;
    } else {
      setDescriptionError('');
    }

    if (hasError) {
      return;
    }
    const data = {
      title: title,
      description: description,
    }

    if (searchParam.has("taskid")) {
      handleUpdate(data)

    } else {
      try {
        await axios.post(API_ROOT + '/tasks', data);
        console.log('Task saved successfully');
        clearOldData()
      } catch (error) {
        console.error('Error saving task:', error);
      }
    }
    navigate("/")

  };

  useEffect(()=>{
if (!searchParam.has("taskid")) {
  clearOldData()
}
  },[searchParam.get("taskid")])


  const handleUpdate = async (data) => {
    try {
      await axios.put(API_ROOT + `/tasks/${searchParam.get("taskid")}`, data);
      navigate('/');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <h1 className="text-center">{searchParam.get("taskid") ? "Update" : "Create"} Your Task Here</h1>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-sm-4 bg-white"></div>
            <div className="col-sm-4 bg-light">
              <p>
                Task :{' '}
                <input
                  type="text"
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setTitleError(e.target.value ? '' : 'Title is required.');
                  }}
                  value={title}
                  className="form-control"
                />
                {titleError && <p className="text-danger">{titleError}</p>}
              </p>
              <p>
                Description :{' '}
                <textarea style={{ resize: 'none' }}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setDescriptionError(e.target.value ? '' : 'Description is required.');
                  }}
                  value={description}
                  className="form-control"
                ></textarea>
                {descriptionError && <p className="text-danger">{descriptionError}</p>}
              </p>
              <input
                type="submit"
                value={searchParam.get("taskid") ? "Update" : "Create"}
                className="btn btn-outline-info"
              />
              <br />
              <br />
            </div>
            <div className="col-sm-4 bg-white"></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageTask