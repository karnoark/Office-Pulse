import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
  return (
    <>
    <UserHeader />
    <UserPost likes={1200} replies={481} postImg="/post1.png" postTitle="let's talk about threads" />
    <UserPost likes={213} replies={567} postImg="/post2.png" postTitle="this tutorial is helpful" />
    <UserPost likes={234} replies={234} postImg="/post3.png" postTitle="Whatever man, but this man rocks!!" />
    <UserPost likes={4672} replies={132} postTitle="Welcome to threads" />
    </>
  )
}

export default UserPage