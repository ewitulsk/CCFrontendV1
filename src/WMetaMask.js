import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {getContractAddress, getContractABI} from "./contractData"
import {getTokenAddress, getTokenABI} from "./tokenData";

function WMetaMask(){
    var abi = require('ethereumjs-abi');
    const [account, setAccount] = useState("");
    const [depositAmount, setDepositAmount] = useState(0);

    const ethereum = window.ethereum;

    useEffect(() => {
        async function enableEth(){
            if(ethereum.selectedAddress == null){
                try{
                    await ethereum.request({method: 'eth_requestAccounts'});
                    setAccount(ethereum.accounts[0])
                } catch(error){
                    console.log("User denied")
                }
            }
            else{
                setAccount(ethereum.selectedAddress);
            }

        }
        enableEth()
    }, [] );

    /*
    async function deposit(){

        const tokenData = 'a9059cbb0000000000000000000000008688301193f500d742101cac21fca8fc62720cc900000000000000000000000000000000000000000000000000000000000003e8';

        const depositParameters = {
            nonce: '0x00',
            to: tokenAddr,
            from: account,
            data: tokenData,
        };

        const txHash = await ethereum.request({
           method:'eth_sendTransaction',
           params: [depositParameters],
        });
        return txHash;
    }

    function testButton(){

        if(!depositAmount>0 && depositAmount.toString().length > 77){
            console.log("TO BIG NUMBER!!");
        }else{
            console.log("Good Number");

            let da = Number(depositAmount);
            console.log("Da: "+da);

            let hexStr = Number(da).toString(16);
            let str = parseInt(da, 16);
            console.log("Hex Str: " + hexStr);
            console.log("Str: "+str);
        }
    }*/

    ethereum.on('accountsChanged', function(accounts){
        setAccount(accounts[0]);
        console.log(accounts[0]);
    });

    function handleSubmit(e){
        setDepositAmount(e.target.value);
        //deposit();
        e.preventDefault();
    }

    function handleChange(e) {
        setDepositAmount(e.target.value);
    }

    return(
        <div className={"wMetaMask"}>

            <p>Wallet Address: {account}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" value={depositAmount} name="tempAmount" onChange={handleChange}/>
                <button type={"submit"} value={"Submit"}>Deposit Amount</button>
            </form>
        </div>
    )
}

export default WMetaMask;