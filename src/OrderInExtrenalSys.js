import {React, useState} from 'react'
import styles from './Wallet.module.css';

const AddClientOrder = (props) => {


	const addOrderHandler = async (e) => {
		e.preventDefault();
		let amount = e.target.orderAmount.value;
		let number = e.target.orderNumber.value;

		await props.orderContract.addOrder(number, amount);
	}

	return (
			<div className={styles.ordersCard}>
				<div className={styles.text1}>Укажите данные вашего заказа</div>
				<form onSubmit={addOrderHandler}>
                    <div>
					    <label for='orderNumber'> Номер Заказа </label>
					    <input className={styles.input1} type='number' id='orderNumber' defaultChecked="999"/>
                    </div>
                    <div>
					    <label for='orderAmount'> Сумма заказа </label>
					    <input className={styles.input1} type='number' id='orderAmount' min='0' step='1' defaultChecked="1000"/>
                    </div>
					<button type='submit' className={styles.button7}>Верифицировать заказ</button>
					<p className={styles.text2}>После верификации заказа на ваш адресс придут Pizza Tokens</p>
			    </form>
			</div>
		)
	
}

export default AddClientOrder;