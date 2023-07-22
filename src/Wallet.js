import {React, useState, useEffect} from 'react';
import {ethers} from 'ethers';
import styles from './Wallet.module.css';
import simple_token_abi from './abi/ERC20abi.json';
import orders_abi from './abi/Orders_abi.json';
import AddClientOrder from './OrderInExtrenalSys';
import ItemsCard from './ItemsCard';


const Wallet = () => {

	let contractAddress = '0x15C295695E1eD168b54a959fAaE28914e3f76966';
    let orderContractAddress = '0x9df31a4c6f0500e2d7CA130FE61b366057f7F147';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);
    const [orderContract, setOrderContract] = useState(null);

	const [tokenName, setTokenName] = useState("Token");
	const [balance, setBalance] = useState(null);


	const eventProvider = new ethers.providers.JsonRpcProvider(
        "https://rpc.test.siberium.net/" // It cam be different network
    );
    
    const eventContract = new ethers.Contract(orderContractAddress, orders_abi, eventProvider);

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Update balance');
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

	const updateBalance = async () => {
		let balanceBigN = await contract.balanceOf(defaultAccount);
		let balanceNumber = balanceBigN.toString();

		let tokenBalance = balanceNumber;

		setBalance(toFixed(tokenBalance));	

		console.log(balance);
	}

	//setInterval(updateBalance, 60000);


   function toFixed(x) {
   if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
         x *= Math.pow(10, e - 1);
         x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
   } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
         e -= 20;
         x /= Math.pow(10, e);
         x += (new Array(e + 1)).join('0');
      }
   }
   return x;
}

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}

	// listen for account changes
	//window.ethereum.on('accountsChanged', accountChangedHandler);

	//window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, simple_token_abi, tempSigner);
		setContract(tempContract);

        let tempOrderContract = new ethers.Contract(orderContractAddress, orders_abi, tempSigner);
        setOrderContract(tempOrderContract);
	}

	useEffect(() => {
		if (contract != null) {
			updateBalance();
			updateTokenName();
		}
	}, [contract]);

	const updateTokenName = async () => {
		setTokenName(await contract.name());
	}



	
	return (
	<div>
			<h2> Магазин за баллы системы лояльности </h2>
			<button className={styles.button5} onClick={connectWalletHandler}>{connButtonText}</button>

			<div className={styles.walletCard}>
			<div>
				<h3>Address: {defaultAccount}</h3>
			</div>

			<div>
				<h3>Balance: {balance} баллов</h3>
			</div>
			{errorMessage}
		</div>
		
		<AddClientOrder orderContract={orderContract}/>
		<ItemsCard contract = {contract} updateBalance={updateBalance}/>

	</div>
	)
}

export default Wallet;