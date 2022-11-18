import App from './App'
import './index.css'

export async function fetchData() {
  return { user: 'pujie' }
}

function ServerEntry(props: any) {
  return <App data={props.data} />
}

export { ServerEntry }
