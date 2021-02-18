import React, { useState, useContext, useMemo } from 'react';
import './Product.css';
import { CartContext } from '../../contexts/CartContext';
import { ProductItem } from '../../types';
import styled from 'styled-components';

interface ButtonProps {
  added: boolean,
  btnText: string
}

const Button = styled.button<ButtonProps>`
  padding: 8px 18px;
  background: ${props => props.added ? (props.btnText === 'ADDED!' ? "#5ee6a6" : "white") : "black"};
  color: ${props => props.added ? (props.btnText === 'ADDED!' ? "white" : "black") : "white"};
  width: 140px;
  border: ${props => props.added ? (props.btnText === 'ADDED!' ? "2px solid transparent" : "2px solid black") : "2px solid transparent"};
  cursor: pointer;
  &:focus {
    outline: none;
  }
`

const Select = styled.select`
  margin: 0 14px 10px 10px;
  padding: 8px 16px 8px 8px;
  background: #f2f2f2;
  color: black;
  border: 2px solid #e6e6e6;
  cursor: pointer;
  &:focus {
    outline: none;
`

type DataProps = {
  data: ProductItem
}

function Product({ data }: DataProps) {

  const { cartItems, addItem } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState('5x7');
  const [imgLoaded, setImgLoaded] = useState(false);
  const [btnText, setBtnText] = useState('ADD ANOTHER');

  const added = useMemo(() => cartItems.some(item => item.id === data.id && item.size === size), [cartItems, data, size])

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(event.target.value)
  }

  const handleAddItem = () => {
    setBtnText('ADDED!');
    const modifiedData: any = Object.assign({}, data)
    modifiedData.price = modifiedData.price[size]
    modifiedData.size = size
    addItem(modifiedData)
    setTimeout(() => setBtnText('ADD ANOTHER'), 1500)
  }
  
  return (
    <div>
      {open && 
        <div className="image-modal">
          <img onClick={() => setOpen(!open)} src={`${data.photo}`} alt={data.name} />
        </div>
      }
      {!imgLoaded && <div className="loader" />}
      <img
        style={ imgLoaded ? {} : { visibility: "hidden" } }
        className="product-image"
        onClick={() => setOpen(!open)}
        src={`${data.photo}`}
        alt={data.name}
        onLoad={() => setImgLoaded(true)}
      />
      <h3>{data.name}</h3>
      <h2>${data.price[size].toFixed(2)}</h2>
      Size:
      <Select 
        value={size} 
        onChange={handleSelect} 
      >
        <option value="5x7">5 x 7</option>
        <option value="8x10">8 x 10</option>
        <option value="11x14">11 x 14</option>
        <option value="16x20">16 x 20</option>
        <option value="24x30">24 x 30</option>
        <option value="30x40">30 x 40</option>
      </Select>
      <Button added={added} btnText={btnText} onClick={handleAddItem}>
        {added ? btnText : "ADD TO CART"}
      </Button>
    </div>
  )
}

export default Product;