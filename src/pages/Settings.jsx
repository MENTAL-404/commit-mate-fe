import Layout from '../components/Layout'
import styles from '../styles/Settings.module.css'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ToastMessage from '../components/ToastMessage'
import 'react-toastify/dist/ReactToastify.css'
import {
  SERVER_URL,
  ORGANIZATION,
  getHeader,
  getSelectedRepo,
} from '../utils/static'

export default function Settings() {
  const [repositories, setRepositories] = useState([])
  const [selectedRepo, setSelectedRepo] = useState('')
  const [bookmarks, setBookmarks] = useState([
    { title: '', url: '' },
    { title: '', url: '' },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setSelectedRepo(getSelectedRepo())

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/organizations/${ORGANIZATION}/repositories`,
          {
            headers: getHeader(),
            credentials: 'include',
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch repositories')
        }

        const data = await response.json()
        setRepositories(data.data.repos)
      } catch (error) {
        setRepositories([])
        console.error('Error fetching repositories:', error)
      }
    }

    const fetchBookmarks = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/shortcuts/organization/${ORGANIZATION}`,
          {
            headers: getHeader(),
            credentials: 'include',
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks')
        }

        const data = await response.json()
        const fetchedBookmarks = data.data.map((bookmark) => ({
          id: bookmark.id,
          title: bookmark.title,
          url: bookmark.url,
        }))
        setBookmarks((prev) => prev.map((b, i) => fetchedBookmarks[i] || b))
        setLoading(false)
      } catch (error) {
        setBookmarks([
          { title: '', url: '' },
          { title: '', url: '' },
        ])
        console.error('Error fetching bookmarks:', error)
        setLoading(false)
      }
    }

    fetchRepositories()
    fetchBookmarks()
  }, [])

  const handleChangeRepo = (event) => {
    const newValue = event.target.value
    setSelectedRepo(newValue)
  }

  const handleClickSaveRepo = () => {
    localStorage.setItem('selected_repo', selectedRepo)
    toast.success('선택한 레포지토리가 저장되었습니다.')
  }

  const handleBookmarkChange = (index, field, value) => {
    setBookmarks((prev) => {
      const newBookmarks = [...prev]
      newBookmarks[index][field] = value
      return newBookmarks
    })
  }

  const handleSaveBookmarks = async () => {
    try {
      for (let bookmark of bookmarks) {
        if (bookmark.id) {
          // Update existing bookmarks
          await fetch(`${SERVER_URL}/shortcuts/${bookmark.id}`, {
            method: 'PUT',
            headers: {
              ...getHeader(),
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ title: bookmark.title, url: bookmark.url }),
          })
        } else if (bookmark.title && bookmark.url) {
          // Create new bookmarks
          await fetch(`${SERVER_URL}/shortcuts`, {
            method: 'POST',
            headers: {
              ...getHeader(),
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ title: bookmark.title, url: bookmark.url }),
          })
        }
      }
      toast.success('북마크가 저장되었습니다.')
    } catch (error) {
      toast.error('북마크 저장 중 오류가 발생했습니다.')
      console.error('Error saving bookmarks:', error)
    }
  }

  const handleDeleteBookmark = async (index) => {
    try {
      const bookmark = bookmarks[index]
      if (bookmark.id) {
        await fetch(`${SERVER_URL}/shortcuts/${bookmark.id}`, {
          method: 'DELETE',
          headers: getHeader(),
          credentials: 'include',
        })
      }
      setBookmarks((prev) =>
        prev.map((b, i) => (i === index ? { title: '', url: '' } : b))
      )
      toast.success('북마크가 삭제되었습니다.')
    } catch (error) {
      toast.error('북마크 삭제 중 오류가 발생했습니다.')
      console.error('Error deleting bookmark:', error)
    }
  }

  return (
    <Layout>
      <ToastMessage />
      <div className={styles.container}>
        <div className={styles.section}>
          <h1 className={styles.title}>환경설정</h1>
          <div className={styles.subSection}>
            <div className={styles.subTopSection}>
              <span className={styles.subTitle}>레포지토리 설정</span>
              <button
                className={styles.saveButton}
                onClick={handleClickSaveRepo}
              >
                저장
              </button>
            </div>
            <div className={styles.subBottomSection}>
              <label className={styles.repoLabel}>
                화면에 표시될 레포지토리를 선택해주세요.
              </label>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>레포지토리</label>
                <select
                  className={styles.select}
                  value={selectedRepo}
                  onChange={handleChangeRepo}
                >
                  {repositories.map((repo) => {
                    return (
                      <option value={repo} key={repo}>
                        {repo}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.subSection}>
            <div className={styles.subTopSection}>
              <span className={styles.subTitle}>북마크 설정</span>
              <button
                className={styles.saveButton}
                onClick={handleSaveBookmarks}
              >
                저장
              </button>
            </div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className={styles.subBottomSection}>
                {bookmarks.map((bookmark, index) => (
                  <div className={styles.bookmarkGroup} key={index}>
                    <div className={styles.labelGroup}>
                      <label className={styles.label}>
                        바로가기 {index + 1}
                      </label>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteBookmark(index)}
                      >
                        삭제
                      </button>
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>북마크 이름</label>
                      <input
                        className={styles.input}
                        placeholder='추가할 북마크 이름을 입력해주세요.'
                        value={bookmark.title}
                        onChange={(e) =>
                          handleBookmarkChange(index, 'title', e.target.value)
                        }
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>북마크 URL</label>
                      <input
                        className={styles.input}
                        placeholder='추가할 북마크 URL을 입력해주세요.'
                        value={bookmark.url}
                        onChange={(e) =>
                          handleBookmarkChange(index, 'url', e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
