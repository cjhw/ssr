import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchHomeData } from '../store/actions/home'

const Home = () => {
  const dispatch = useDispatch()
  const homeData = useSelector((state) => state.home)

  useEffect(() => {
    dispatch(fetchHomeData)
  }, [])

  const handleClick = () => {
    console.log('我被点了')
  }

  return (
    <div onClick={handleClick}>
      <h1>主页</h1>
      {homeData?.articles?.map((article) => (
        <li key={article?.id}>
          <p>文章标题：{article?.title}</p>
          <p>文章内容：{article?.content}</p>
        </li>
      ))}
      <button onClick={handleClick}>点我</button>
    </div>
  )
}

Home.getInitialData = async (store) => {
  return store.dispatch(fetchHomeData)
}

export default Home
