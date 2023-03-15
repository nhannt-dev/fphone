import React, { Fragment, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import path from '../../ultils/path'
import { useDispatch, useSelector } from 'react-redux'
import actionTypes from '../../store/actions/actionTypes'
import { AdminSidebar } from '../../components'

const System = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAdmin } = useSelector(state => state.app)
    useEffect(() => {
        if (!isAdmin) dispatch({ type: actionTypes.ALERT, alert: 'Yêu cầu quyền ADMIN', callback: () => { navigate(`/${path.LOGIN}`) } })
    }, [isAdmin])
    return (
        <Fragment>
            {isAdmin && <div className='w-full flex h-screen bg-white'>
                <div className='w-[237px]  px-[6px] pb-[60px] pt-6 font-semibold flex-none'>
                    <AdminSidebar />
                </div>
                <div className='flex-auto p-[22px] h-full overflow-y-auto'>
                    <Outlet />
                </div>
            </div>}
        </Fragment>
    )
}

export default System