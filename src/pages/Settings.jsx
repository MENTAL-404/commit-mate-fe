import Layout from '../components/Layout'
import styles from '../styles/Settings.module.css'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ToastMessage from '../components/ToastMessage'
import 'react-toastify/dist/ReactToastify.css'
import {
  SERVER_URL,
  ORGANIZATION,
  AUTH_HEADER,
  getSelectedRepo,
} from '../utils/static'

export default function Settings() {
  const [repositories, setRepositories] = useState([])
  const [selectedRepo, setSelectedRepo] = useState('')
  const [bookmarks, setBookmarks] = useState([
    { id: '1', title: '', url: '' },
    { id: '2', title: '', url: '' },
  ])

  useEffect(() => {
    setSelectedRepo(getSelectedRepo())

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/organizations/${ORGANIZATION}/repositories`,
          {
            headers: AUTH_HEADER,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch access token')
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
            headers: AUTH_HEADER,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks')
        }

        const data = await response.json()
        let fetchedBookmarks = data.data

        // Ensure there are always at least two bookmark inputs
        while (fetchedBookmarks.length < 2) {
          fetchedBookmarks.push({ id: Date.now().toString(), title: '', url: '' })
        }

        setBookmarks(fetchedBookmarks)
      } catch (error) {
        setBookmarks([
          { id: '1', title: '', url: '' },
          { id: '2', title: '', url: '' },
        ])
        console.error('Error fetching bookmarks:', error)
      }
    }

    fetchRepositories()
    fetchBookmarks()
  }, [])

  const handleChangeRepo = (event) => {
    const newValue = event.target.value
    setSelectedRepo(newValue)
  }

  const handleBookmarkChange = (index, field, value) => {
    const newBookmarks = [...bookmarks]
    newBookmarks[index][field] = value
    setBookmarks(newBookmarks)
  }

  const handleClickSaveRepo = () => {
    localStorage.setItem('selected_repo', selectedRepo)
    toast.success('선택한 레포지토리가 저장되었습니다.')
  }

  const handleClickSaveBookmarks = async () => {
    try {
      for (const bookmark of bookmarks) {
        if (bookmark.title && bookmark.url) {
          const response = await fetch(`${SERVER_URL}/shortcuts/${bookmark.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              ...AUTH_HEADER,
            },
            body: JSON.stringify({
              title: bookmark.title,
              url: bookmark.url,
            }),
          })

          if (!response.ok) {
            throw new Error('Failed to update bookmark')
          }
        }
      }
      toast.success('북마크가 성공적으로 수정되었습니다.')
    } catch (error) {
      toast.error('북마크 수정 중 오류가 발생했습니다.')
      console.error('Error saving bookmarks:', error)
    }
  }

  const handleClickDeleteBookmark = async (id) => {
    try {
      const response = await fetch(`${SERVER_URL}/shortcuts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...AUTH_HEADER,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete bookmark')
      }

      let newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id)

      // Ensure there are always at least two bookmarks
      while (newBookmarks.length < 2) {
        newBookmarks.push({ id: Date.now().toString(), title: '', url: '' })
      }

      setBookmarks(newBookmarks)
      toast.success('북마크가 성공적으로 삭제되었습니다.')
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
              <label className={styles.label}>
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
              <button className={styles.saveButton} onClick={handleClickSaveBookmarks}>
                저장
              </button>
            </div>
            <div className={styles.subBottomSection}>
              {bookmarks.map((bookmark, index) => (
                <div className={styles.bookmarkGroup} key={bookmark.id}>
                  <label className={styles.label}>바로가기 {index + 1}</label>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleClickDeleteBookmark(bookmark.id)}
                  >
                    삭제
                  </button>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>북마크 이름</label>
                    <input
                      className={styles.input}
                      placeholder='입력해주세요'
                      value={bookmark.title || ''}
                      onChange={(e) =>
                        handleBookmarkChange(index, 'title', e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>북마크 URL</label>
                    <input
                      className={styles.input}
                      placeholder='입력해주세요'
                      value={bookmark.url || ''}
                      onChange={(e) =>
                        handleBookmarkChange(index, 'url', e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
