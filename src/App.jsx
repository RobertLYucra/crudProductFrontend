import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { styled } from 'styled-components';
import CreateProduct from "./assets/Modal/CreateProduct"
import Editar from "./assets/Modal/Editar"
import Eliminar from "./assets/Modal/Eliminar"

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const productsFuntion = async () => {
      const result = await axios.get("http://gestionproduct.somee.com/Product")
      setProducts(result.data.result)
    }
    productsFuntion()
  }, [products])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
  product.productName.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="App" style={{width: "850px"}}>
       <h2 style={{marginBottom:"45px",fontWeight:"bolder",textDecoration:"underline"}}>TIENDA CARMELITA</h2>
      <DivTitulo>
        <input type='text' className='form-control' placeholder='Buscar'  value={searchTerm} onChange={handleSearch}></input>
        <CreateProduct />
      </DivTitulo>      <table className='table table-striped'>

        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredProducts.map((product, key) => {
              return (
                <Tr key={key} >
                  <th>{product.productId}</th>
                  <th>{product.productName}</th>
                  <th>{product.productCategory}</th>
                  <th>{product.stock}</th>
                  <th>{product.price}</th>
                  <th >
                    <ButtonsDiv className='buttons'>
                      <Editar  product={product} />
                      <Eliminar productId={product.productId}/>
                    </ButtonsDiv>
                  </th>
                </Tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default App

const DivTitulo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  input{
    max-width: 450px;
  }
  button{
    height: 40px;
    border-radius: 10px;
    font-weight: bold;
    padding: 7px;
    background:#fff;
      color: #00b300;
      border: 2px solid #00b300;
    &:hover{
      color: white;
    background: #00b300;
    }
  }
`
const Tr = styled.tr`
  th{
    font-weight: 450;
  }
`
const ButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
`