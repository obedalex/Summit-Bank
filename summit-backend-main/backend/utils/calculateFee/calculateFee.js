

const calculateFee = (feeTiers,amount,percentageFee)=>{

    for (let tier of feeTiers){
        if(amount <= tier.max){
            return tier.fee;
        }
    }
    return amount * percentageFee;
}

module.exports = calculateFee