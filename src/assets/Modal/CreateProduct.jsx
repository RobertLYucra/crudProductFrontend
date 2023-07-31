import React, { useState } from 'react'
import Modal from 'react-modal';
import { styled } from 'styled-components';
import { Form, Button, Inputs } from "../styled/StyledCreated"
import axios from 'axios';

Modal.setAppElement('#root');

const CreateProduct = () => {
    let subtitle;
    const [product, setProdut] = useState({
        ProductName: "",
        Price: null,
        Stock: null,
        ProductCategory: "",
        productDescription:""
    })
    const [modalIsOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState();

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
        setProdut((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const registrar = async () => {
            try {
                if(product.ProductName !==null && product.ProductCategory!==null && product.Price>0 && product.Stock>=0){
                    const result = await axios.post("https://productcrudd.azurewebsites.net/product", product)
                    if(result.data.success) setIsOpen(false)
                }else{
                    setMessage("Campos inválidos...")
                }
            } catch (e) {
                console.log(e)
            }
        }

        registrar();
    }

    return (
        <Div >
            <button onClick={openModal} type='button' className='btn btn-primary'> Agregar</button>
            <Modal
                style={customStyles}
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
            >
                <Button onClick={closeModal} style={{}}>X</Button>
                <p style={{color:"red",width: "100%", textAlign:"center"}}>{message}</p>
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} >Crear producto</h2>
                <hr style={{ width: '100%', height: "2px" }}></hr>
                <Inputs className='inputs' >
                    <input type="text" onChange={handleChange} className="form-control" name="ProductName" placeholder="Nombre producto" />
                    <input type="text" onChange={handleChange} className="form-control" name="ProductCategory" placeholder="Categoría" />
                    <input type="number" onChange={handleChange} className="form-control" name="Stock" placeholder="Stock" />
                    <input type="number" onChange={handleChange} className="form-control" name="Price" placeholder="Precio" />

                </Inputs>
                <Form >
                    <button className='btn btn-success' type='button' onClick={handleRegister}>Agregar</button>
                    <button className='btn btn-danger' onClick={closeModal}>Cancelar</button>
                </Form>
            </Modal>
        </Div>
    );
}

export default CreateProduct

const Div = styled.div`
 
`
