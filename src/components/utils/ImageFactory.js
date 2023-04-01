
const BASE_URL = "https://algoquant-resources.s3.amazonaws.com/InvestorImages/" 
const TRADE_FREQUENCIES = ["30_min", "1_hr", "4_hr", "1_day", "1_wk", "1_mo"]

/*
Get a random image for the AI investor
*/
export function GetAIImage() {

    let randomIndex = Math.floor(Math.random() * 3) + 1;
    let image_id = `${BASE_URL}AI/${randomIndex}.png`
    return image_id
}

/*
Get a random image for an Algorithmic Investor.
If trade frequency is not provided then pick a random one
*/
export function GetAlgoImage(tradeFrequency=null) {

    if (!tradeFrequency) {
        tradeFrequency = TRADE_FREQUENCIES[Math.floor(Math.random() * TRADE_FREQUENCIES.length)]
    }

    let randomIndex = Math.floor(Math.random() * 3) + 1;
    let image_id = `${BASE_URL}${tradeFrequency}/${randomIndex}.png`
    
    return image_id
}
