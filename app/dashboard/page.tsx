import { onBoardUser } from '@/modules/auth/actions/auth'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const page = async () => {
  await onBoardUser();
  
  return (
    <div>
        {/* <UserButton/> */}
    </div>
  )
}

export default page