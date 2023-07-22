import React, { useState } from "react";
import styles from './Wallet.module.css';

const Item = (props) => {



    const handleSubmit = async(event) => {
        event.preventDefault();

        let orderNumber = event.target.orderNumber.value;
        let transferAmount = props.price;
        let itemId = props.id;

        let recieverAddress = '0xdf133864bA7De0AC6eaB5FdB8A122128843165F8';

        let signResult = await props.contract.buyItem(recieverAddress, transferAmount, orderNumber, itemId);

        await signResult?.wait();

        props.updateBalance();
      };

    return (
        <div>
            <h1>{props.name}</h1>
            <div className='fig'>
			    <img src={props.pict}  height='400px' width='400px' text-align='center' alt="Пицца 1" />
			</div>
            <form onSubmit={handleSubmit}>
                <label for="orderNumber">Доставить в заказе №:</label>
                <input className={styles.input1} type="number" id="orderNumber" defaultChecked="999"/>
                <div>
                    <button className={styles.button7} type="submit"> Перевести {props.price} токенов </button>
                </div>
            </form>
        
        </div>
    )
}

export { Item };
