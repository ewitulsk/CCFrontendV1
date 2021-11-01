import React, {useState} from "react";
import axios from "axios";



function Converter({username, authToken, URLBase, coalHold, setCoalHold, ironHold, setIronHold, goldHold, setGoldHold, diamondHold, setDiamondHold, cobbleCoinHold, setCobbleCoinHold}) {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState(0.0);
    const [convErr, setConvErr] = useState(false);

    function postConvert(URLBase, authToken, username){
        const headers = {"Authorization": "Token "+authToken};
        const data = {"username": username, "from": from, "to":to, "amount":amount};
        axios.post(URLBase+'api/convertResource/', data, {headers: headers}).then((response) => {
            setCoalHold(parseFloat(response.data["coalHold"]));
            setIronHold(parseFloat(response.data["ironHold"]));
            setGoldHold(parseFloat(response.data["goldHold"]));
            setDiamondHold(parseFloat(response.data["diamondHold"]));
            setCobbleCoinHold(parseFloat(response.data["cobbleCoinHold"]));
        }).catch((error) => {
            setConvErr(true)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        postConvert(URLBase, authToken, username);
    }

    return(
        <div>
            {convErr ? (<span>Conversion error, make sure you have enough balance</span>):(<span></span>)}
            <div className={"converter"}>
                <form onSubmit={handleSubmit}>
                    <label>From: </label>
                    <select id={"fromSelectId"} name={"fromSelectName"} onChange={(e) => setFrom(e.target.value)}>
                        <option value={""}></option>
                        <option value={"coal"}>Coal</option>
                        <option value={"iron"}>Iron</option>
                        <option value={"gold"}>Gold</option>
                        <option value={"diamond"}>Diamond</option>
                        <option value={"cbbl"}>CBBL Token</option>
                    </select>
                    <input type={"number"} id={"amountName"} name={""} step="any" onChange={(e) => setAmount(e.target.value)}/>
                    <label>To: </label>
                    <select id={"toSelectId"} name={"toSelectName"} onChange={(e) => setTo(e.target.value)}>
                        <option value={""}></option>
                        <option value={"coal"}>Coal</option>
                        <option value={"iron"}>Iron</option>
                        <option value={"gold"}>Gold</option>
                        <option value={"diamond"}>Diamond</option>
                        <option value={"cbbl"}>CBBL Token</option>
                    </select>
                    <button type={"submit"} className={"Submit"}>Convert</button>
                </form>
                <br/>
            </div>
        </div>
    )



}

export default Converter