import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'

import Home from './pages/Home'
import PlayBoard from './pages/PlayBoard'
import MyRole from './pages/MyRole'

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#F97316'
        }
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<PlayBoard />} />
          <Route path="/room/:id/play" element={<MyRole />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
