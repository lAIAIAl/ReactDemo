export function numFormate(originNum){
    let num = Number(originNum)
    if(typeof num !=='number' || isNaN(num))
        return NaN
    let flag = ''
    if(num<0)
        flag = '-'
    let arrInt = ((''+Math.abs(num)).split('.')[0]).split('').reverse()
    let arrFloat = (''+Math.abs(num)).split('.')[1]
    let resultArr = []
    for(let i=0;i<arrInt.length;i++){
        resultArr.push(arrInt[i])
        if((i+1)%3===0&&((arrInt.length-1)!==i))
            resultArr.push(',')
    }
    resultArr = resultArr.reverse()
    if(arrFloat){
        resultArr.push('.')
        for(let j=0;j<arrFloat.length;j++){
            resultArr.push(arrFloat[j])
            if((j+1)%3===0&&((arrFloat.length-1)!==j))
                resultArr.push(',')
        }
    }
    let result = flag + resultArr.join('')
    return result
}