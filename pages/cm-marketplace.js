import { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-nextjs-toast'
import styles from '../styles/CMarket.module.less'

const getEternalPrice = async () => {
    // const PANCAKE_ETL = "https://api.pancakeswap.info/api/v2/tokens/0xD44FD09d74cd13838F137B590497595d6b3FEeA4"
    const COIN_GECKO_API = "https://api.coingecko.com/api/v3/simple/price?ids=cryptomines-eternal&vs_currencies=usd"
    const response = await fetch(COIN_GECKO_API);
    const data = await response.json();
    console.log("data", data)
    const EternalPrice = data?.["cryptomines-eternal"]?.usd || 0
    
    return EternalPrice
}

const ADD_TAX = 1.17647
const CM_API = "https://api.cryptomines.app/api/workers"

function Market() {
    const [ETLPrice, setETLPrice] = useState(0)
    const [mintCost, setMintCost] = useState(0)
    const [ownerAddress, setOwnerAddress] = useState('')
    const [marketData, setMarketData] = useState([])
    const [totalETL, setTotalETL] = useState(0)

    const setEternalPrice = () => {
        getEternalPrice()
            .then(price => {
                const mintCost = (20 / price).toFixed(4);
                setMintCost(mintCost)
                setETLPrice(Number(price).toFixed(4))
            })
    }

    useEffect(() => {
        setEternalPrice()
    }, [])

    useEffect(() => {
          const interval = setInterval(setEternalPrice, 10000);
          return () => clearInterval(interval);
    }, []);

    useEffect(async () => {
        //getting data for user marketplace data
        if(ownerAddress) {
            const res = await fetch(CM_API)
            const data = await res.json()

            const filteredData = data.filter(e => e.sellerAddress == ownerAddress)
            setMarketData(filteredData)
            const sumOfPrice = filteredData.reduce((a, b) => {
                return a + Number(b.price)
            }, 0) / 1_000_000_000_000_000_000;

            setTotalETL(sumOfPrice)
        }

        
    },[ownerAddress])

    
    const computeForMarketPrice = multiplier => {
        return (mintCost * ADD_TAX * multiplier).toFixed(3)
    }

    const formatter = new Intl.NumberFormat('en-US', { currency: 'PHP', style: 'currency' })

    const computeForPHPMarketPrice = multiplier => {
        return formatter.format((mintCost * ADD_TAX * multiplier * ETLPrice * 50).toFixed(2))
    }

    const etlToPeso = etl => {
        return formatter.format((etl * ETLPrice * 50).toFixed(2))
    }

    const ETLPriceDisplay = ({ multiplier }) => {
        const price = computeForMarketPrice(multiplier)
        const PHPPrice = computeForPHPMarketPrice(multiplier)

        return (
            <p className={styles.ETLPriceWorker} onClick={() => copyETL(price)}>{price} ETL <span>({PHPPrice})</span></p>
        )
    }

    const copyETL = price => {
        const textField = document.createElement('textarea')
        textField.innerText = price
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        toast.notify(`Good job!`, { type: "success", title: `${price} copied!`})
    }

    const changeOwnerAddress = (e) => {
        setOwnerAddress(e.target.value)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>CM Marketplace Price Estimates</title>
                <link rel="icon" href="./icon.png" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <ToastContainer />
            <div className={styles.headers}>
                <p><span>ETL :</span> $ {ETLPrice}</p>
                <p><span>Mint Cost :</span> {mintCost} ETL</p>
                <p><span>Burn Rewards :</span> {(mintCost / 5).toFixed(5)} ETL</p>
            </div>
            
            <div className={styles.tableHeader}>Workers</div>

            <div className={styles.tableMarketPlace}>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐⭐⭐⭐</div>
                    <div className={styles.minePower}>
                        <div><p>255 MP</p>  <ETLPriceDisplay multiplier={16.5}/></div>
                        <div><p>250 to 254 MP</p>  <ETLPriceDisplay multiplier={15}/></div>
                        <div><p>245 to 249 MP</p>  <ETLPriceDisplay multiplier={13.5}/></div>
                        <div><p>240 to 244 MP</p>  <ETLPriceDisplay multiplier={11.76}/></div>
                        <div><p>235 to 239 MP</p>  <ETLPriceDisplay multiplier={11.5}/></div>
                        <div><p>230 to 234 MP</p>  <ETLPriceDisplay multiplier={11.3}/></div>
                        <div><p>225 to 229 MP</p>  <ETLPriceDisplay multiplier={11.06}/></div>
                        <div><p>220 to 224 MP</p>  <ETLPriceDisplay multiplier={11.05}/></div>
                        <div><p>215 to 219 MP</p>  <ETLPriceDisplay multiplier={10.55}/></div>
                        <div><p>210 to 214 MP</p>  <ETLPriceDisplay multiplier={10.05}/></div>
                        <div><p>205 to 209 MP</p>  <ETLPriceDisplay multiplier={9.95}/></div>
                        <div><p>200 to 204 MP</p>  <ETLPriceDisplay multiplier={9.9}/></div>
                    </div>
                </div>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐⭐⭐</div>
                    <div className={styles.minePower}>
                        <div><p>200 MP</p>  <ETLPriceDisplay multiplier={9.7}/></div>
                        <div><p>195 to 199 MP</p>  <ETLPriceDisplay multiplier={8.55}/></div>
                        <div><p>190 to 194 MP</p>  <ETLPriceDisplay multiplier={7.9}/></div>
                        <div><p>185 to 189 MP</p>  <ETLPriceDisplay multiplier={7.75}/></div>
                        <div><p>180 to 184 MP</p>  <ETLPriceDisplay multiplier={7.2}/></div>
                        <div><p>175 to 179 MP</p>  <ETLPriceDisplay multiplier={6.9}/></div>
                        <div><p>170 to 174 MP</p>  <ETLPriceDisplay multiplier={6.4}/></div>
                        <div><p>165 to 169 MP</p>  <ETLPriceDisplay multiplier={6}/></div>
                        <div><p>160 to 164 MP</p>  <ETLPriceDisplay multiplier={5.9}/></div>
                        <div><p>155 to 159 MP</p>  <ETLPriceDisplay multiplier={5.7}/></div>
                        <div><p>151 to 154 MP</p>  <ETLPriceDisplay multiplier={5.35}/></div>
                        <div><p>150 MP</p>  <ETLPriceDisplay multiplier={5.3}/></div>
                    </div>
                </div>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐⭐</div>
                    <div className={styles.minePower}>
                        <div><p>150 MP</p>  <ETLPriceDisplay multiplier={5.2}/></div>
                        <div><p>145 to 149 MP</p>  <ETLPriceDisplay multiplier={4.6}/></div>
                        <div><p>140 to 144 MP</p>  <ETLPriceDisplay multiplier={4}/></div>
                        <div><p>135 to 139 MP</p>  <ETLPriceDisplay multiplier={3.5}/></div>
                        <div><p>130 to 134 MP</p>  <ETLPriceDisplay multiplier={3.2}/></div>
                        <div><p>125 to 129 MP</p>  <ETLPriceDisplay multiplier={2.8}/></div>
                        <div><p>120 to 124 MP</p>  <ETLPriceDisplay multiplier={2.3}/></div>
                        <div><p>115 to 119 MP</p>  <ETLPriceDisplay multiplier={2.17}/></div>
                        <div><p>110 to 114 MP</p>  <ETLPriceDisplay multiplier={1.96}/></div>
                        <div><p>105 to 109 MP</p>  <ETLPriceDisplay multiplier={1.95}/></div>
                        <div><p>101 to 104 MP</p>  <ETLPriceDisplay multiplier={1.82}/></div>
                        <div><p>100 MP</p>  <ETLPriceDisplay multiplier={1.8}/></div>
                    </div>
                </div>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐</div>
                    <div className={styles.minePower}>
                        <div><p>100 MP</p>  <ETLPriceDisplay multiplier={1.6}/></div>
                        <div><p>95 to 99 MP</p>  <ETLPriceDisplay multiplier={1.25}/></div>
                        <div><p>90 to 94 MP</p>  <ETLPriceDisplay multiplier={1}/></div>
                        <div><p>85 to 89 MP</p>  <ETLPriceDisplay multiplier={0.7}/></div>
                        <div><p>80 to 84 MP</p>  <ETLPriceDisplay multiplier={0.6}/></div>
                        <div><p>75 to 79 MP</p>  <ETLPriceDisplay multiplier={0.5}/></div>
                        <div><p>70 to 74 MP</p>  <ETLPriceDisplay multiplier={0.4}/></div>
                        <div><del>65 to 69 MP</del>  <ETLPriceDisplay multiplier={0.3}/></div>
                        <div><del>60 to 64 MP</del>  <ETLPriceDisplay multiplier={0.2}/></div>
                        <div><del>55 to 59 MP</del>  <ETLPriceDisplay multiplier={0.1}/></div>
                        <div><del>51 to 54 MP</del>  <ETLPriceDisplay multiplier={0.08}/></div>
                        <div><del>50 MP</del>  <ETLPriceDisplay multiplier={0.07}/></div>
                    </div>
                </div>
            </div>

            <div className={styles.tableHeader}>Spaceships</div>
            <div className={styles.tableMarketPlace}>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐⭐⭐⭐</div>
                    <div className={styles.spacePower}>
                        <div><ETLPriceDisplay multiplier={23}/></div>
                    </div>
                </div>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐⭐⭐</div>
                    <div className={styles.spacePower}>
                        <div><ETLPriceDisplay multiplier={11.5}/></div>
                    </div>
                </div>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐⭐</div>
                    <div className={styles.spacePower}>
                        <div><ETLPriceDisplay multiplier={1.5}/></div>
                    </div>
                </div>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐</div>
                    <div className={styles.spacePower}>
                        <div><ETLPriceDisplay multiplier={0.32}/></div>
                    </div>
                </div>
            </div>

            {/* <div className={styles.yourMP}>
                <p> <span>Enter your contract address:</span> <input onChange={changeOwnerAddress}/></p>
                <p><span>Your Marketplace:</span> {marketData.length} item/s</p>
                <p><span>Total Market ETL:</span> {totalETL} ({etlToPeso(totalETL)})</p>
                <p><span>Total Market ETL minus tax:</span> {(totalETL * 0.85).toFixed(3)} ({etlToPeso(totalETL * 0.85)})</p>
            </div> */}

            <div className={styles.footNote}>
                <em>For bug reports, improvement suggestions and requests, dm me @ discord frifster#1185 </em>
            </div>
        </div>
    )
}

export default Market
