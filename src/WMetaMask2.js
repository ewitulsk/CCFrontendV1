import React, {useEffect, useState} from "react";
import Web3 from "web3";
import Button from "react-bootstrap/Button";
import {getContractABI, getContractAddress} from "./contractData";
import {getTokenABI, getTokenAddress} from "./tokenData";
import axios from "axios";

function WMetaMask2({username, cobbleCoinHold, setCobbleCoinHold}){
    var Tx = require('ethereumjs-tx');
    const [account, setAccount] = useState("");
    const [depositAmount, setDepositAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);

    useEffect(() => {
        async function enableWeb3(){

            window.web3 = new Web3(window.web3.currentProvider);
            window.ethereum.enable();
            if(window.ethereum.selectedAddress == null){
                try{
                    await window.ethereum.request({method: 'eth_requestAccounts'});
                    setAccount(window.ethereum.accounts[0])
                } catch(error){
                    console.log("User denied")
                }
            }
            else{
                setAccount(window.ethereum.selectedAddress);
            }

        }
        enableWeb3()
    }, [] );

    async function deposit(amount){

        window.web3 = new Web3(window.web3.currentProvider);

        const netId = await window.web3.eth.net.getId();
        console.log("netId: "+netId);

        //var hexAmount = window.web3.utils.toHex(amount);
        // eslint-disable-next-line no-undef
        const bigAmount = BigInt(amount*(10**18));

        var token = new window.web3.eth.Contract(getTokenABI(), getTokenAddress(), {from: String(account)});
        var contract = new window.web3.eth.Contract(getContractABI(), getContractAddress(), {from: String(account)});
        var approveTxHash = await token.methods.approve(getContractAddress(), bigAmount).send();
        var txHash = await contract.methods.deposit(username, bigAmount).send();

        var addedAmount = parseFloat(cobbleCoinHold) + parseFloat(amount);

        setCobbleCoinHold(addedAmount);
    }

    async function withdraw(amount){

        window.web3 = new Web3(window.web3.currentProvider);

        const netId = await window.web3.eth.net.getId();
        console.log("netId: "+netId);

        //var hexAmount = window.web3.utils.toHex(amount);
        // eslint-disable-next-line no-undef
        const bigAmount = BigInt(amount*(10**18));

        var contract = new window.web3.eth.Contract(getContractABI(), getContractAddress(), {from: String(account)});

        var txHash = await contract.methods.withdraw(username, bigAmount).send();

        var subAmount = parseFloat(cobbleCoinHold) - parseFloat(amount);

        setCobbleCoinHold(subAmount);

        console.log(cobbleCoinHold);

        console.log(txHash);
    }

    window.ethereum.on('accountsChanged', function(accounts){
        setAccount(accounts[0]);
        console.log(accounts[0]);
    });

    function handleWithdrawSubmit(e){
        e.preventDefault();
        var value = e.target.value;
        if(isNaN(value)){
            value = withdrawAmount;
        }
        setWithdrawAmount(value);
        withdraw(value);
    }

    function handleWithdrawChange(e) {
        setWithdrawAmount(e.target.value);
    }

    function handleDepositSubmit(e){
        e.preventDefault();
        var value = e.target.value;
        if(isNaN(value)){
            value = depositAmount;
        }
        setDepositAmount(value);
        deposit(value);
    }

    function handleDepositChange(e) {
        setDepositAmount(e.target.value);
    }

    return(
        <div className={"wMetaMask"}>

            <p>Wallet Address: {account}</p>
            <form onSubmit={handleDepositSubmit}>
                <input type="text" value={depositAmount} name="depositAmount" onChange={handleDepositChange}/>
                <button type={"submit"} value={"Submit"}>Deposit Amount</button>
            </form>
            <form onSubmit={handleWithdrawSubmit}>
                <input type="text" value={withdrawAmount} name="withdrawAmount" onChange={handleWithdrawChange}/>
                <button type={"submit"} value={"Submit"}>Withdraw Amount</button>
            </form>
        </div>
    )
}


export default WMetaMask2;