import styles from '../../styles/mobile/Todo.module.css'
import MobileLayout from '../../components/mobile/MobileLayout'
import { API_URL, getHeader } from '../../utils/static'
import { useEffect, useState } from 'react'
import LoadingLottie from '../../components/LoadingLottie'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'

export default function TodoMobile() {
  const [loading, setLoading] = useState(true)
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [editingTodo, setEditingTodo] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [error, setError] = useState(null)

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_URL().todos, {
        headers: getHeader(),
        credentials: 'include',
      })
      const result = await response.json()
      setTodos(result.data || [])
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // TODO 생성
  const addTodo = async () => {
    try {
      const response = await fetch(`${API_URL().todos}`, {
        method: 'POST',
        headers: getHeader(),
        credentials: 'include',
        body: JSON.stringify({ title: newTodo }),
      })
      if (response.ok) {
        await fetchTodos() // 상태 업데이트 후 재페칭
        setNewTodo('')
      }
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  // TODO 해결 체크
  const updateTodo = async (id, complete) => {
    try {
      const response = await fetch(`${API_URL().todos}/${id}`, {
        method: 'PUT',
        headers: getHeader(),
        credentials: 'include',
        body: JSON.stringify({ complete: !complete }),
      })
      if (response.ok) {
        await fetchTodos() // 상태 업데이트 후 재페칭
      }
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  // TODO 수정
  const saveEditTodo = async (id, title) => {
    try {
      const response = await fetch(`${API_URL().todos}/${id}`, {
        method: 'PUT',
        headers: getHeader(),
        credentials: 'include',
        body: JSON.stringify({ title }),
      })
      if (response.ok) {
        await fetchTodos() // 상태 업데이트 후 재페칭
        setEditingTodo(null)
        setEditingText('')
      }
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  // TODO 삭제
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL().todos}/${id}`, {
        method: 'DELETE',
        headers: getHeader(),
        credentials: 'include',
      })
      if (response.ok) {
        await fetchTodos() // 상태 업데이트 후 재페칭
      }
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  if (loading) {
    return (
      <div className={styles.lottie}>
        <LoadingLottie width={'30px'} />
      </div>
    )
  }

  if (error) {
    return <div>Error fetching todos</div>
  }

  return (
    <MobileLayout>
      <div className={styles.todoContainer}>
        <div className={styles.innerTitle}>✅ Todo</div>
        <div className={styles.addTodoContainer}>
          <input
            type='text'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder='새 할 일 입력'
            className={styles.inputNew}
          />
          <button onClick={addTodo} className={styles.addTodoBtn}>
            <IoIosAdd className={styles.addIcon} />
          </button>
        </div>

        <div className={styles.todoList}>
          {todos.length === 0
            ? 'No todos yet'
            : todos
                .slice()
                .reverse()
                .map((todo) => (
                  <div key={todo.id} className={styles.todoItem}>
                    <div className={styles.inputContainer}>
                      {editingTodo === todo.id ? (
                        <input
                          type='text'
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onBlur={() => saveEditTodo(todo.id, editingText)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              saveEditTodo(todo.id, editingText)
                            }
                          }}
                          autoFocus
                          className={styles.inputEdit}
                        />
                      ) : (
                        <span
                          className={todo.complete ? styles.complete : ''}
                          onClick={() => updateTodo(todo.id, todo.complete)}
                        >
                          {todo.title}
                        </span>
                      )}
                    </div>
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
                ))}
        </div>
      </div>
    </MobileLayout>
  )
}
