import './App.css'
import ProductCard from './components/productCard.jsx'
import UserData from './components/userData.jsx'

function App() {

  return (
    <>
      <ProductCard
        image="https://picsum.photos/200"
        name="Mechanical Keyboard"
        price={49.99}
      />
      
      <UserData
        image="https://picsum.photos/seed/picsum/200/300"
        Name="Samantha"
        Email="123@gmail.com"
        Age="30"
      />
    </>
  )
}

export default App
