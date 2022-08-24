export const FETCH_HOME_DATA = 'fetch_home_data'

export const fetchHomeData = async (dispath) => {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        articles: [
          {
            id: 1,
            title: '文章标题1',
            content: '文章内容1',
          },
          {
            id: 2,
            title: '文章标题2',
            content: '文章内容2',
          },
        ],
      })
    }, 2000)
  })

  dispath({
    type: FETCH_HOME_DATA,
    payload: data,
  })
}
