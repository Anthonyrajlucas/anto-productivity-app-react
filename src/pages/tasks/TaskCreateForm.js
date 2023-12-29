import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import {  Form, Button, Col, Modal , Alert} from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";
import axios from 'axios';
import TaskListStyle from "../../styles/TaskList.module.css";


function TaskCreateForm() {
  const [showModal, setShowModal] = useState(false);  
  const [dueDateError, setDueDateError] = useState("");
  const history = useHistory();
  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "",
    category: "",
  });

  const {  title,
    description,
    due_date,
    priority,
    category } = task;

  const [dropdownData, setDropdownData] = useState({
    priorities: [],
    categories: [],
    states: [],
  });

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prioritiesResponse, categoriesResponse, statesResponse] = await Promise.all([
          axios.get("/priorities"),
          axios.get("/categories"),
          axios.get("/states"),
        ]);

        setDropdownData({
          priorities: prioritiesResponse.data || [],
          categories: categoriesResponse.data || [],
          states: statesResponse.data || [],
        });
      } catch (err) {
        console.error("Axios Error", err);
        console.error("Response Data", err.response?.data);
      }
    };
    fetchData();
  }, []);

  const handleDateChange = (event) => {
    if (event.target.name === "due_date") {
      setDueDateError(""); 
    }
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event) => {
    setTask({
        ...task,
        [event.target.name]: event.target.value,
      });
  };

  const handleDropdownChange = (event, dropdownType) => {
    const selectedId = event.target.value;
    setTask({
      ...task,
      [dropdownType]: selectedId,
    });
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (new Date(due_date) < new Date()) {
      setDueDateError("Due date cannot be earlier than today.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("due_date", due_date);
    formData.append("priority", priority);
    formData.append("category", category);
  try {
    const { data } = await axios.post("/tasks/", formData);
    history.push(`/tasks/${data.id}`);
    setShowModal(true);
    console.log("New Task Created:", data);
  } catch (error) {
    console.log(error);
  } 
  };

  const handleCloseModal = () => {
    setShowModal(false);
    history.push(`/tasks/`);  
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Due Date</Form.Label>
        {dueDateError && (
        <Alert variant="danger">
          {dueDateError}
        </Alert>
      )}        
        <Form.Control
          type="date"
          name="due_date"
          value={due_date}
          onChange={handleDateChange}
          isInvalid={!!dueDateError}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          name="priority"
          value={priority}
          onChange={(event) => handleDropdownChange(event, 'priority')}
        >
          <option value="">Select Priority</option>
          {dropdownData.priorities.map((priorityOption) => (
            <option key={priorityOption.id} value={priorityOption.id}>
              {priorityOption.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={(event) => handleDropdownChange(event, 'category')}
        >
          <option value="">Select Category</option>
          {dropdownData.categories.map((categoryOption) => (
            <option key={categoryOption.id} value={categoryOption.id}>
              {categoryOption.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
      <Button
        className={`${btnStyles.Button}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
    </div>
  );

  return (
    <div className={`${TaskListStyle.Content} ${TaskListStyle.TextAlignCenter} ${TaskListStyle.CustomFormWidth} d-flex flex-column justify-content-center`}>
     <Form onSubmit={handleSubmit}>
     {showModal && (
                    <Modal show={showModal} onHide={handleCloseModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Success</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Task created successfully!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
      )}
      <div className={TaskListStyle.CenterAlignForm}>
        <Col md={7} lg={8}>
          <div
            className={`${TaskListStyle.Content} ${TaskListStyle.TextAlignCenter} d-flex flex-column justify-content-center`}
          >
            <h3>Create Task</h3>
            <div className={TaskListStyle.Content}>
              {textFields}
            </div>
          </div>
        </Col>
      </div>
    </Form>
    </div>
     );

}

export default TaskCreateForm;