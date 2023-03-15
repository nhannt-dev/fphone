import React, { memo, useState, useEffect } from 'react'
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom'
import path from '../ultils/path'

const Search = () => {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const handleEvent = (e) => {
        if (e.keyCode === 13 && location.pathname !== '/' + path.LOGIN) {
            navigate({
                pathname: `/${path.FILTER}`,
                search: createSearchParams({ q: query }).toString()
            })
            setQuery('')
        }
    }
    useEffect(() => {
        window.addEventListener('keyup', handleEvent)

        return () => {
            window.removeEventListener('keyup', handleEvent)
        }
    }, [query])
    return (
        <div>
            <input
                type="text"
                className='bg-white text-gray-700 rounded-md py-2 px-4 w-full'
                placeholder='Bạn cần tìm gì?'
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
        </div>
    )
}

export default memo(Search)