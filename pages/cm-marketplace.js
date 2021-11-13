import { useEffect, useState } from "react";
import Head from "next/head";
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
        return (mintCost * ADD_TAX * multiplier).toFixed(2)
    }

    const computeForPHPMarketPrice = multiplier => {
        const formatter = new Intl.NumberFormat('en-US', { currency: 'PHP', style: 'currency' })
        return formatter.format((mintCost * ADD_TAX * multiplier * ETLPrice * 50).toFixed(2))
    }

    const ETLPriceDisplay = ({ multiplier }) => {
        const price = computeForMarketPrice(multiplier)
        const PHPPrice = computeForPHPMarketPrice(multiplier)

        return (
            <p className={styles.ETLPriceWorker}>{price} ETL ({PHPPrice})</p>
        )
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>CM Marketplace Price Estimates</title>
                <link rel="icon" href="./icon.png" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={styles.headers}>
                <p><span>ETL :</span> $ {ETLPrice}</p>
                <p><span>Mint Cost :</span> {mintCost} ETL</p>
                <p><span>Burn Rewards :</span> {(mintCost / 5).toFixed(2)} ETL</p>
            </div>

            <div className={styles.tableMarketPlace}>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐⭐⭐⭐</div>
                    <div className={styles.minePower}>
                        <div><p>255 MP</p>  <ETLPriceDisplay multiplier={20}/></div>
                        <div><p>250 to 254 MP</p>  <ETLPriceDisplay multiplier={19.5}/></div>
                        <div><p>245 to 249 MP</p>  <ETLPriceDisplay multiplier={19}/></div>
                        <div><p>240 to 244 MP</p>  <ETLPriceDisplay multiplier={18}/></div>
                        <div><p>235 to 239 MP</p>  <ETLPriceDisplay multiplier={17}/></div>
                        <div><p>230 to 234 MP</p>  <ETLPriceDisplay multiplier={16}/></div>
                        <div><p>225 to 229 MP</p>  <ETLPriceDisplay multiplier={15}/></div>
                        <div><p>220 to 224 MP</p>  <ETLPriceDisplay multiplier={14}/></div>
                        <div><p>215 to 219 MP</p>  <ETLPriceDisplay multiplier={13}/></div>
                        <div><p>210 to 214 MP</p>  <ETLPriceDisplay multiplier={12}/></div>
                        <div><p>205 to 209 MP</p>  <ETLPriceDisplay multiplier={11}/></div>
                        <div><p>200 to 204 MP</p>  <ETLPriceDisplay multiplier={10}/></div>
                    </div>
                </div>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐⭐⭐</div>
                    <div className={styles.minePower}>
                        <div><p>200 MP</p>  <ETLPriceDisplay multiplier={10}/></div>
                        <div><p>195 to 199 MP</p>  <ETLPriceDisplay multiplier={9.8}/></div>
                        <div><p>190 to 194 MP</p>  <ETLPriceDisplay multiplier={9.4}/></div>
                        <div><p>185 to 189 MP</p>  <ETLPriceDisplay multiplier={9}/></div>
                        <div><p>180 to 184 MP</p>  <ETLPriceDisplay multiplier={8.6}/></div>
                        <div><p>175 to 179 MP</p>  <ETLPriceDisplay multiplier={8.2}/></div>
                        <div><p>170 to 174 MP</p>  <ETLPriceDisplay multiplier={7.8}/></div>
                        <div><p>165 to 169 MP</p>  <ETLPriceDisplay multiplier={7.4}/></div>
                        <div><p>160 to 164 MP</p>  <ETLPriceDisplay multiplier={7}/></div>
                        <div><p>155 to 159 MP</p>  <ETLPriceDisplay multiplier={6.6}/></div>
                        <div><p>151 to 154 MP</p>  <ETLPriceDisplay multiplier={6.2}/></div>
                        <div><p>150 MP</p>  <ETLPriceDisplay multiplier={5.8}/></div>
                    </div>
                </div>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐⭐</div>
                    <div className={styles.minePower}>
                        <div><p>150 MP</p>  <ETLPriceDisplay multiplier={5.8}/></div>
                        <div><p>145 to 149 MP</p>  <ETLPriceDisplay multiplier={5.6}/></div>
                        <div><p>140 to 144 MP</p>  <ETLPriceDisplay multiplier={5.2}/></div>
                        <div><p>135 to 139 MP</p>  <ETLPriceDisplay multiplier={4.8}/></div>
                        <div><p>130 to 134 MP</p>  <ETLPriceDisplay multiplier={4.4}/></div>
                        <div><p>125 to 129 MP</p>  <ETLPriceDisplay multiplier={4}/></div>
                        <div><p>120 to 124 MP</p>  <ETLPriceDisplay multiplier={3.6}/></div>
                        <div><p>115 to 119 MP</p>  <ETLPriceDisplay multiplier={3.2}/></div>
                        <div><p>110 to 114 MP</p>  <ETLPriceDisplay multiplier={2.8}/></div>
                        <div><p>105 to 109 MP</p>  <ETLPriceDisplay multiplier={2.4}/></div>
                        <div><p>101 to 104 MP</p>  <ETLPriceDisplay multiplier={1.9}/></div>
                        <div><p>100 MP</p>  <ETLPriceDisplay multiplier={1.8}/></div>
                    </div>
                </div>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐</div>
                    <div className={styles.minePower}>
                        <div><p>100 MP</p>  <ETLPriceDisplay multiplier={1.8}/></div>
                        <div><p>95 to 99 MP</p>  <ETLPriceDisplay multiplier={1.75}/></div>
                        <div><p>90 to 94 MP</p>  <ETLPriceDisplay multiplier={1.5}/></div>
                        <div><p>85 to 89 MP</p>  <ETLPriceDisplay multiplier={1.25}/></div>
                        <div><p>80 to 84 MP</p>  <ETLPriceDisplay multiplier={1}/></div>
                        <div><p>75 to 79 MP</p>  <ETLPriceDisplay multiplier={0.75}/></div>
                        <div><p>70 to 74 MP</p>  <ETLPriceDisplay multiplier={0.65}/></div>
                        <div><p>65 to 69 MP</p>  <ETLPriceDisplay multiplier={0.55}/></div>
                        <div><p>60 to 64 MP</p>  <ETLPriceDisplay multiplier={0.45}/></div>
                        <div><p>55 to 59 MP</p>  <ETLPriceDisplay multiplier={0.35}/></div>
                        <div><p>51 to 54 MP</p>  <ETLPriceDisplay multiplier={0.25}/></div>
                        <div><p>50 MP</p>  <ETLPriceDisplay multiplier={0.2}/></div>
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
