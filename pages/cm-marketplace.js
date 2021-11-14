import { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-nextjs-toast'
import styles from '../styles/CMarket.module.less'

const getEternalPrice = async () => {
    const PANCAKE_ETL = "https://api.pancakeswap.info/api/v2/tokens/0xD44FD09d74cd13838F137B590497595d6b3FEeA4"
    const response = await fetch(PANCAKE_ETL);
    const data = await response.json();
    const EternalPrice = data?.data?.price || 0
    
    return EternalPrice
}

const ADD_TAX = 1.17647

function Market() {
    const [ETLPrice, setETLPrice] = useState(0)
    const [mintCost, setMintCost] = useState(0)

    const setEternalPrice = () => {
        getEternalPrice()
            .then(price => {
                console.log("SETTING PRICE")
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

    
    const computeForMarketPrice = multiplier => {
        return (mintCost * ADD_TAX * multiplier).toFixed(3)
    }

    const computeForPHPMarketPrice = multiplier => {
        const formatter = new Intl.NumberFormat('en-US', { currency: 'PHP', style: 'currency' })
        return formatter.format((mintCost * ADD_TAX * multiplier * ETLPrice * 50).toFixed(2))
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

            <div className={styles.tableMarketPlace}>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐⭐⭐⭐</div>
                    <div className={styles.minePower}>
                        <div><p>255 MP</p>  <ETLPriceDisplay multiplier={16.5}/></div>
                        <div><p>250 to 254 MP</p>  <ETLPriceDisplay multiplier={12.95}/></div>
                        <div><p>245 to 249 MP</p>  <ETLPriceDisplay multiplier={12}/></div>
                        <div><p>240 to 244 MP</p>  <ETLPriceDisplay multiplier={11.76}/></div>
                        <div><p>235 to 239 MP</p>  <ETLPriceDisplay multiplier={11.75}/></div>
                        <div><p>230 to 234 MP</p>  <ETLPriceDisplay multiplier={11.7}/></div>
                        <div><p>225 to 229 MP</p>  <ETLPriceDisplay multiplier={11.53}/></div>
                        <div><p>220 to 224 MP</p>  <ETLPriceDisplay multiplier={11.52}/></div>
                        <div><p>215 to 219 MP</p>  <ETLPriceDisplay multiplier={11.51}/></div>
                        <div><p>210 to 214 MP</p>  <ETLPriceDisplay multiplier={11.5}/></div>
                        <div><p>205 to 209 MP</p>  <ETLPriceDisplay multiplier={10.5}/></div>
                        <div><p>200 to 204 MP</p>  <ETLPriceDisplay multiplier={10}/></div>
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
                        <div><p>100 MP</p>  <ETLPriceDisplay multiplier={1.7}/></div>
                        <div><p>95 to 99 MP</p>  <ETLPriceDisplay multiplier={1.5}/></div>
                        <div><p>90 to 94 MP</p>  <ETLPriceDisplay multiplier={1.25}/></div>
                        <div><p>85 to 89 MP</p>  <ETLPriceDisplay multiplier={1}/></div>
                        <div><p>80 to 84 MP</p>  <ETLPriceDisplay multiplier={0.7}/></div>
                        <div><p>75 to 79 MP</p>  <ETLPriceDisplay multiplier={0.6}/></div>
                        <div><p>70 to 74 MP</p>  <ETLPriceDisplay multiplier={0.5}/></div>
                        <div><p>65 to 69 MP</p>  <ETLPriceDisplay multiplier={0.4}/></div>
                        <div><p>60 to 64 MP</p>  <ETLPriceDisplay multiplier={0.3}/></div>
                        <div><del>55 to 59 MP</del>  <ETLPriceDisplay multiplier={0.2}/></div>
                        <div><del>51 to 54 MP</del>  <ETLPriceDisplay multiplier={0.15}/></div>
                        <div><del>50 MP</del>  <ETLPriceDisplay multiplier={0.1}/></div>
                    </div>
                </div>
            </div>

            <div className={styles.footNote}>
                <em>For bug reports, improvement suggestions and requests, dm me @ discord frifster#1185 </em>
            </div>
        </div>
    )
}

export default Market
