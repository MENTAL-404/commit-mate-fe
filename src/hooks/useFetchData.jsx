import { useState, useEffect } from 'react'
import { getHeader } from '../utils/static'

const useFetchData = (url, options) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const response = await fetch(url, {
          headers: getHeader(),
          credentials: 'include',
          ...options,
        })

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const result = await response.json()
        setResponse(result)
      } catch (err) {
        setResponse(null)
        setError(err)
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    if (url === '' || !url) {
      setLoading(false)
      setResponse(null)
      setError('')
    } else {
      fetchData()
    }
  }, [options, url])

  return { loading, response, error }
}

export default useFetchData
