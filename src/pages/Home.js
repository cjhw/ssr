import React from 'react'

const Home = () => {
  const handleClick = () => {
    console.log('我被点了')
  }

  return <div onClick={handleClick}>我是首页</div>
}

export default Home
