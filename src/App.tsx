import './App.css'
import { useFetch } from './hooks';
const url = "https://fakestoreapi.com/products";

type Product = {
  id: number; title: string; price: number;
  description: string; category: string; image: string;
  rating?: { rate: number; count: number };
};

function App() {
  const { data: products, loading, error } = useFetch<Product[]>(url);

  if (loading) {
    return <div>Cargando...</div>
  }

  if(error){
    return <div> Ups! Hay un error: {error.message} </div>
  }
  return (
    <>
      <div>
        {JSON.stringify(products)}
      </div>
    </>
  )
}

export default App
