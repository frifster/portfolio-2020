import { useEffect, useState } from "react";
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
    const [ETLPrice, setETLPrice] = useState(0);
    const [mintCost, setMintCost] = useState(0)

    useEffect(() => {
        getEternalPrice()
            .then(price => {
                const mintCost = (20 / price).toFixed(4);
                setMintCost(mintCost)
                setETLPrice(Number(price).toFixed(4))
            })
    }, [])

    useEffect(() => {
          const interval = setInterval(getEternalPrice, 10000);
          return () => clearInterval(interval);
      }, []);

    return (
        <div className={styles.container}>
            <div className={styles.headers}>
                <p><span>ETL :</span> $ {ETLPrice}</p>
                <p><span>Mint Cost :</span> {mintCost} ETL</p>
                <p><span>Burn Rewards :</span> {(mintCost / 5).toFixed(2)} ETL</p>
            </div>

            <div className={styles.tableMarketPlace}>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐⭐⭐⭐</div>
                    <div className={styles.minePower}>
                        <div><p>255 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 21).toFixed(2)} ETL</p></div>
                        <div><p>250 to 254 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 20).toFixed(2)} ETL</p></div>
                        <div><p>245 to 249 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 19).toFixed(2)} ETL</p></div>
                        <div><p>240 to 244 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 18).toFixed(2)} ETL</p></div>
                        <div><p>235 to 239 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 17).toFixed(2)} ETL</p></div>
                        <div><p>230 to 234 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 16).toFixed(2)} ETL</p></div>
                        <div><p>225 to 229 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 15).toFixed(2)} ETL</p></div>
                        <div><p>220 to 224 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 14).toFixed(2)} ETL</p></div>
                        <div><p>215 to 219 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 13).toFixed(2)} ETL</p></div>
                        <div><p>210 to 214 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 12).toFixed(2)} ETL</p></div>
                        <div><p>205 to 209 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 11).toFixed(2)} ETL</p></div>
                        <div><p>200 to 204 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 10).toFixed(2)} ETL</p></div>
                    </div>
                </div>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐⭐⭐</div>
                    <div className={styles.minePower}>
                        <div><p>200 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 10).toFixed(2)} ETL</p></div>
                        <div><p>195 to 199 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 9.6).toFixed(2)} ETL</p></div>
                        <div><p>190 to 194 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 9.2).toFixed(2)} ETL</p></div>
                        <div><p>185 to 189 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 8.8).toFixed(2)} ETL</p></div>
                        <div><p>180 to 184 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 8.4).toFixed(2)} ETL</p></div>
                        <div><p>175 to 179 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 8).toFixed(2)} ETL</p></div>
                        <div><p>170 to 174 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 7.6).toFixed(2)} ETL</p></div>
                        <div><p>165 to 169 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 7.2).toFixed(2)} ETL</p></div>
                        <div><p>160 to 164 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 6.8).toFixed(2)} ETL</p></div>
                        <div><p>155 to 159 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 6.4).toFixed(2)} ETL</p></div>
                        <div><p>151 to 154 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 6).toFixed(2)} ETL</p></div>
                        <div><p>150 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 5.6).toFixed(2)} ETL</p></div>
                    </div>
                </div>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐⭐</div>
                    <div className={styles.minePower}>
                        <div><p>150 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 5.6).toFixed(2)} ETL</p></div>
                        <div><p>145 to 149 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 5.25).toFixed(2)} ETL</p></div>
                        <div><p>140 to 144 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 4.9).toFixed(2)} ETL</p></div>
                        <div><p>135 to 139 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 4.55).toFixed(2)} ETL</p></div>
                        <div><p>130 to 134 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 4.2).toFixed(2)} ETL</p></div>
                        <div><p>125 to 129 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 3.85).toFixed(2)} ETL</p></div>
                        <div><p>120 to 124 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 3.5).toFixed(2)} ETL</p></div>
                        <div><p>115 to 119 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 3.15).toFixed(2)} ETL</p></div>
                        <div><p>110 to 114 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 2.8).toFixed(2)} ETL</p></div>
                        <div><p>105 to 109 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 2.45).toFixed(2)} ETL</p></div>
                        <div><p>101 to 104 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 2.15).toFixed(2)} ETL</p></div>
                        <div><p>100 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 1.8).toFixed(2)} ETL</p></div>
                    </div>
                </div>
                <div className={styles.rarity}>
                    <div className={styles.rareStar}>⭐⭐</div>
                    <div className={styles.minePower}>
                        <div><p>100 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 1.8).toFixed(2)} ETL</p></div>
                        <div><p>95 to 99 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 1.65).toFixed(2)} ETL</p></div>
                        <div><p>90 to 94 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 1.5).toFixed(2)} ETL</p></div>
                        <div><p>85 to 89 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 1.35).toFixed(2)} ETL</p></div>
                        <div><p>80 to 84 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 1.2).toFixed(2)} ETL</p></div>
                        <div><p>75 to 79 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 1.05).toFixed(2)} ETL</p></div>
                        <div><p>70 to 74 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 0.9).toFixed(2)} ETL</p></div>
                        <div><p>65 to 69 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 0.75).toFixed(2)} ETL</p></div>
                        <div><p>60 to 64 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 0.6).toFixed(2)} ETL</p></div>
                        <div><p>55 to 59 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 0.45).toFixed(2)} ETL</p></div>
                        <div><p>51 to 54 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 0.3).toFixed(2)} ETL</p></div>
                        <div><p>50 MP</p>  <p className={styles.ETLPriceWorker}>{(mintCost * ADD_TAX * 0.15).toFixed(2)} ETL</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Market
