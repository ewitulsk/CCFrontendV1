import React, {useEffect, useState} from "react";
import WMetaMask2 from "./WMetaMask2";
import Converter from "./Converter";
import axios from "axios";

function UserInfo({authToken, username, URLBase}){

    const [coalHold, setCoalHold] = useState(0);
    const [ironHold, setIronHold] = useState(0);
    const [goldHold, setGoldHold] = useState(0);
    const [diamondHold, setDiamondHold] = useState(0);
    const [cobbleCoinHold, setCobbleCoinHold] = useState(0.0);
    const [resourceGetError, setResourceGetError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function getResources() {
        const req = {username: username};
        const url = URLBase + 'api/GetUserResource/';
        axios.post(url, req).then(response => {
            setCoalHold(response.data.coalHold);
            //console.log("Coal Hold: " + response.data.coalHold);
            setIronHold(response.data.ironHold);
            setGoldHold(response.data.goldHold);
            setDiamondHold(response.data.diamondHold);
            setCobbleCoinHold(response.data.cobbleCoinHold);
            console.log("ResponseData: "+ response.data.cobbleCoinHold + ", CobbleCoinHold: "+ cobbleCoinHold);
        }).catch(response => {setResourceGetError(true)});
    }

    useEffect(() => {
        setIsLoading(true);
        getResources().then(result => setIsLoading(false));
        console.log(authToken)
    }, [] );

    return(
        <div>
            <h1>{"Resource Page"}</h1>
            <hr/>
            {isLoading ? (<p>Loading Resources...</p>) : (
                <div>
                    <div className={"Resources"}>
                        <h4>Coal</h4>
                        <p>{coalHold}</p>
                        <h4>Iron</h4>
                        <p>{ironHold}</p>
                        <h4>Gold</h4>
                        <p>{goldHold}</p>
                        <h4>Diamond</h4>
                        <p>{diamondHold}</p>
                        <h4>Cobble Coin Hold</h4>
                        <p>{cobbleCoinHold}</p>
                    </div>
                    <div>
                        <Converter username={username} authToken={authToken} URLBase={URLBase} coalHold={coalHold} ironHold={ironHold} goldHold={goldHold} diamondHold={diamondHold} setCoalHold={setCoalHold} setIronHold={setIronHold} setGoldHold={setGoldHold} setDiamondHold={setDiamondHold} cobbleCoinHold={cobbleCoinHold} setCobbleCoinHold={setCobbleCoinHold}/>
                    </div>
                    <div>
                        {!Boolean(window.web3) ? (<p>Please Install MetaMask</p>):(<WMetaMask2 username={username} cobbleCoinHold={cobbleCoinHold} setCobbleCoinHold={setCobbleCoinHold}/>)}
                    </div>
                </div>
            )}
        </div>
    )
}
export default UserInfo;