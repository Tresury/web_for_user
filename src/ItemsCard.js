import {React, useState} from 'react';
import { Items } from './Items';


const ItemsCard = (props) => {

    const [itemData, setItemData] = useState([
        {id: 1, name: "Гавайская Пицца", price: 100, pict: './images/pizza_1.png'},
		{id: 2, name: "Француская Пицца", price: 200, pict: './images/pizza_2.png'},
		{id: 3, name: "Деревенская Пицца", price: 120, pict: './images/pizza_3.png'},
		{id: 4, name: "Колбасная Пицца", price: 140, pict: './images/pizza_4.png'},
    ]);



	return (
			<div>
                <Items itemData={itemData} contract={props.contract} updateBalance={props.updateBalance}></Items>
            </div>
		)
        
}

export default ItemsCard;