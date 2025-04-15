'use client'
import React from 'react'
import {useState} from 'react'
import {useSession} from 'next-auth/react'
import  {useRouter} from 'next/navigation'
import Form from '@components/Form'

const CreatePrompt = () => {
  return (
    <div>
        <Form/>
    </div>
  )
}

export default CreatePrompt