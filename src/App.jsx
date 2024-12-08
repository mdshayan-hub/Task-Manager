import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Import the CSS file for placeholder styling

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskCategory, setTaskCategory] = useState("Work");
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("dark");

  // Add Task
  const addTask = () => {
    if (taskTitle.trim() === "") return;
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      category: taskCategory,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
    setTaskTitle("");
    setTaskCategory("Work"); // Reset category
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Task Completion
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  // Filter Tasks based on search term and category
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "#121212" : "#f4f4f4",
        color: theme === "dark" ? "#e0e0e0" : "#333",
        minHeight: "100vh",
      }}
    >
      <div className="container pt-5">
        {/* Header */}
        <div className="d-flex justify-content-between mb-4">
          <h1>📝 Task Manager</h1>
          <button
            className={`btn btn-sm ${
              theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
            }`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

{/* Add Task Section */}
<div className="mb-4">
  <div className="d-flex">
    <input
      type="text"
      className={`form-control shadow-none me-2 ${
        theme === "dark" ? "dark-placeholder" : ""
      }`}
      placeholder="Add a new task..."
      value={taskTitle}
      onChange={(e) => setTaskTitle(e.target.value)}
      style={{
        backgroundColor: theme === "dark" ? "#2b2b2b" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
        border: theme === "dark" ? "1px solid #fff" : "1px solid #000",
      }}
    />
    <button
      className={`me-2 btn ${
        theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
      }`}
      onClick={addTask}
    >
      Add
    </button>
    <select
      className="form-select me-2 shadow-none"
      style={{
        backgroundColor: theme === "dark" ? "#2b2b2b" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
        border: theme === "dark" ? "1px solid #fff" : "1px solid #000",
      }}
      value={taskCategory}
      onChange={(e) => setTaskCategory(e.target.value)}
    >
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Other">Other</option>
    </select>
  </div>
</div>

{/* Search Tasks */}
<div className="mb-4">
  <input
    type="text"
    className={`form-control shadow-none ${
      theme === "dark" ? "dark-placeholder" : ""
    }`}
    placeholder="Search tasks by title or category..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      backgroundColor: theme === "dark" ? "#2b2b2b" : "#fff",
      color: theme === "dark" ? "#fff" : "#333",
      border: theme === "dark" ? "1px solid #fff" : "1px solid #000",
    }}
  />
</div>


        {/* Task Sections */}
        <div className="row">
          {/* Pending Tasks */}
          <div className="col-md-6">
            <h3 className="text-warning my-3">📋 Pending Tasks</h3>
            {filteredTasks.filter((task) => !task.isCompleted).length === 0 ? (
              <p>No pending tasks! 🎉</p>
            ) : (
              <ul className="list-group">
                {filteredTasks
                  .filter((task) => !task.isCompleted)
                  .map((task) => (
                    <li
                      key={task.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                      style={{
                        backgroundColor:
                          theme === "dark" ? "#2b2b2b" : "#fff",
                        color: theme === "dark" ? "#fff" : "#333",
                        border: "1px solid #ccc",
                      }}
                    >
                      <span>
                        {task.title} <small>({task.category})</small>
                      </span>
                      <div>
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => toggleTaskCompletion(task.id)}
                        >
                          Complete
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Completed Tasks */}
          <div className="col-md-6">
            <h3 className="text-success my-3">✅ Completed Tasks</h3>
            {filteredTasks.filter((task) => task.isCompleted).length === 0 ? (
              <p>No completed tasks yet! ⏳</p>
            ) : (
              <ul className="list-group">
                {filteredTasks
                  .filter((task) => task.isCompleted)
                  .map((task) => (
                    <li
                      key={task.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                      style={{
                        backgroundColor:
                          theme === "dark" ? "#2b2b2b" : "#fff",
                        color: theme === "dark" ? "#fff" : "#333",
                        border: "1px solid #ccc",
                      }}
                    >
                      <span className="text-decoration-line-through">
                        {task.title} <small>({task.category})</small>
                      </span>
                      <div>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => toggleTaskCompletion(task.id)}
                        >
                          Undo
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
