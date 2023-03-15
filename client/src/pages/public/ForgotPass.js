import React from 'react'
import { ChangePass } from '../smember'

const ForgotPass = () => {
    return (
        <div className='w-full relative bg-white mt-[60px] flex justify-center min-h-screen'>
            <div className='w-3/5'>
                <ChangePass forgot={true} />
            </div>
        </div>
    )
}

export default ForgotPass