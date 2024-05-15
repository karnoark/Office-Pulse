import { Button, Container } from "@chakra-ui/react"
import {Route, Routes} from 'react-router-dom'
import PostPage from "./pages/PostPage"
import UserPage from "./pages/UserPage"
import Header from "./components/Header"

 

function App() {

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/:username" element={<UserPage />}  />
        <Route path="/:username/post/:pid" element={<PostPage />}  />
      </Routes>
    </Container>
  )
}

export default App
