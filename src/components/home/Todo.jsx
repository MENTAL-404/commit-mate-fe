import styles from '../../styles/Todo.module.css'
import { SERVER_URL, AUTH_HEADER } from '../../utils/static'
import { useState, useEffect } from 'react'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { IoIosAdd } from "react-icons/io";

export default function Todo() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [editingTodo, setEditingTodo] = useState(null)
  const [editingText, setEditingText] = useState('')

  // Fetch todos from the server
  const fetchTodos = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/todos?complete=`,
        {
          headers: AUTH_HEADER,
        }
      )
      const result = await response.json()
      setTodos(result.data || [])
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // Add a new todo
  const addTodo = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/todos`,
        {
          method: 'POST',
          headers: {
            ...AUTH_HEADER,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: newTodo }),
        }
      )
      if (response.ok) {
        fetchTodos()
        setNewTodo('')
      }
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  // Update a todo's completion status
  const updateTodo = async (id, complete) => {
    try {
      await fetch(
        `${SERVER_URL}/todos/${id}`,
        {
          method: 'PUT',
          headers: {
            ...AUTH_HEADER,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ complete: !complete }),
        }
      )
      fetchTodos()
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  // Update a todo's title
  const saveEditTodo = async (id, title) => {
    try {
      await fetch(
        `${SERVER_URL}/todos/${id}`,
        {
          method: 'PUT',
          headers: {
            ...AUTH_HEADER,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        }
      )
      fetchTodos()
      setEditingTodo(null)
      setEditingText('')
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await fetch(
        `${SERVER_URL}/todos/${id}`,
        {
          method: 'DELETE',
          headers: AUTH_HEADER,
        }
      )
      fetchTodos()
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  return (
    <div className={styles.todoContainer}>
      <div className={styles.innerTitle}>Todo</div>
      <div className={styles.todoList}>
        {todos.length === 0 ? (
          'No todos yet'
        ) : (
          todos.map(todo => (
            <div key={todo.id} className={styles.todoItem}>
              {editingTodo === todo.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={e => setEditingText(e.target.value)}
                  onBlur={() => saveEditTodo(todo.id, editingText)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      saveEditTodo(todo.id, editingText)
                    }
                  }}
                  autoFocus
                  className={styles.editInput}
                />
              ) : (
                <span
                  className={todo.complete ? styles.complete : ''}
                  onClick={() => updateTodo(todo.id, todo.complete)}
                >
                  {todo.title}
                </span>
              )}
              <div className={styles.actionButtons}>
                <FaEdit
                  className={styles.icon}
                  onClick={() => {
                    setEditingTodo(todo.id)
                    setEditingText(todo.title)
                  }}
                />
                <FaTrashAlt
                  className={styles.icon}
                  onClick={() => deleteTodo(todo.id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.addTodoContainer}>
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="새 할 일 입력"
          className={styles.input}
        />
        <button onClick={addTodo} className={styles.addTodoBtn}>
          <IoIosAdd className={styles.addIcon}/>
        </button>
      </div>
    </div>
  )
}
