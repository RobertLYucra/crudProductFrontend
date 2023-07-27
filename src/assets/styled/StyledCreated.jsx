import {styled} from "styled-components"

export const DIV = styled.div`
    
`
export const Form = styled.form`
display: flex;
justify-content: center;
align-items: center;
button{
  height: 40px;
  margin: 10px 6px;
  border-radius: 8px;
}
`

export const Button = styled.button`
  width: 25px;
  height: 25pxS;
  font-weight: bolder;
  margin-bottom:15px;
  background: transparent;
  height: 30px;
  color: red;
  border-radius: 20%;
  border: 1px solid #fff;
`
export const Inputs = styled.form`
    display: flex;
    flex-direction : column;
    label{
      color: white;
      text-decoration: underline;
    }
    input{
        margin: 5px 0;
    }
`