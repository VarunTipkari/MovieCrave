import { Container } from '@chakra-ui/react'
import './App.css'
import Header from './myCompos/Header'
import Body from './myCompos/Body'
import Footer from './myCompos/Footer'

function App() {

  return (
    <Container fluid h="100vh" p="15px" justifyItems="center">
      <Header />
      <Body />
      <Footer />
    </Container>
  )
}

export default App
