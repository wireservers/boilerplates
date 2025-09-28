
import { Provider, useDispatch, useSelector } from 'react-redux'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { store, setTheme } from './store'

const qc = new QueryClient()

function Dashboard() {
  const theme = useSelector((s: any) => s.ui.theme)
  const dispatch = useDispatch()
  const { data } = useQuery({
    queryKey: ['hello'],
    queryFn: async () => ({ message: 'Hello from React Query cache' })
  })

  return (
    <div style={{fontFamily: 'Inter, system-ui, sans-serif', padding: 24}} data-theme={theme}>
      <h1>Starter</h1>
      <p>{data?.message}</p>
      <button onClick={() => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))}>
        Toggle Theme (current: {theme})
      </button>
    </div>
  )
}

export function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={qc}>
        <Dashboard />
      </QueryClientProvider>
    </Provider>
  )
}
