import React from 'react'
import SignupCard from '../components/SignupCard'
import { useRecoilValue } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import LoginCard from '../components/LoginCard'

function AuthPage() {
    const authScreenState = useRecoilValue(authScreenAtom)
    console.log(authScreenState)
  return (
    <>
        {authScreenState === "login" ? <LoginCard /> : <SignupCard />}
    </>
  )
}

export default AuthPage