import React, { useState } from 'react'
import Modal from 'react-modal';
import { styled } from 'styled-components';
import { Form, Button} from "../styled/StyledCreated"
import axios from 'axios';

Modal.setAppElement('#root');

const Eliminar = (props) => {
    let subtitle;
    const productId = props.productId;
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

    const handleDelete = (e) => {
        e.preventDefault();
        const eliminar = async () => {
            try {
                const result = await axios.delete(`http://gestionproduct.somee.com/Product/${productId}`)
                if(result.data.success) setIsOpen(false)
            } catch (e) {
                console.log(e)
            }
        }
        eliminar();
    }

    return (
        <Div >
            <button onClick={openModal} className="btn" type='button'> <ion-icon style={{"color":"red"}} name="trash-sharp"></ion-icon></button>
            <Modal
                style={customStyles}
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
            >
                <Button onClick={closeModal} style={{}}>X</Button>
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} >¿Eliminar producto?</h2>
                <hr style={{ width: '100%', height: "2px" }}></hr>
                <Form >
                    <button className='btn btn-success' type='button' onClick={handleDelete}>Eliminar</button>
                    <button className='btn btn-danger' onClick={closeModal}>Cancelar</button>
                </Form>
            </Modal>
        </Div>
    );

}

export default Eliminar

const Div = styled.div`
    
`
