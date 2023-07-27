import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { styled } from 'styled-components';
import { Form, Button, Inputs } from "../styled/StyledCreated"
import axios from 'axios';

Modal.setAppElement('#root');

const Editar = (props) => {
    let subtitle;
    const [product, setProduct] = useState({
        ProductId: props.product.productId,
        ProductName: props.product.productName,
        Price: props.product.price,
        Stock: props.product.stock,
        ProductCategory: props.product.productCategory,
        productDescription: props.product.productDescription
    })
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true)
    }

    function afterOpenModal() {
        subtitle.style.color = '#fff';
        subtitle.style.fontSize = '25px';
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#333',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            width: "500px"
        },
    };

    function closeModal(e) {
        setIsOpen(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const registrar = async () => {
            try {
                if(product.ProductName =!null && product.ProductCategory!=null && product.Price>0 && product.Stock>=0){
                    const result = await axios.put(`https://productcrud.azurewebsites.net/api/product/${product.ProductId}`,product)
                    if (result.data.success) setIsOpen(false)
                }else{
                    alert("Error al actualizar producto")
                }
                
            } catch (e) {
                console.log(e)
            }
        }
        registrar();
    }

    return (
        <Div >
            <button onClick={openModal} type='button' className='btn' > <ion-icon style={{ "color": "orange" }} name="brush-sharp"></ion-icon> </button>
            <Modal
                style={customStyles}
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
            >
                <Button onClick={closeModal} style={{}}>X</Button>
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} >Eliminar producto?</h2>
                <hr style={{ width: '100%', height: "2px" }}></hr>
                <h5 style={{color: "white"}}> ProductId: {product.ProductId } </h5>
                <Inputs className='inputs' >
                    <label>Nombre </label>
                    <input type="text" onChange={handleChange} value={product.ProductName} className="form-control" name="ProductName" placeholder="Nombre producto" />
                    <label>Categoría </label>
                    <input type="text" onChange={handleChange} value={product.ProductCategory} className="form-control" name="ProductCategory" placeholder="Categoría" />
                    <label>Stock </label>
                    <input type="number" onChange={handleChange} value={product.Stock} className="form-control" name="Stock" placeholder="Stock" />
                    <label>Precio: </label>
                    <input type="number" onChange={handleChange} value={product.Price} className="form-control" name="Price" placeholder="Precio" />
                </Inputs>
                <Form >
                    <button className='btn btn-success' type='button' onClick={handleRegister}>Actualizar</button>
                    <button className='btn btn-danger' onClick={closeModal}>Cancelar</button>
                </Form>
            </Modal>
        </Div>
    );

}

export default Editar

const Div = styled.div`
  
`
