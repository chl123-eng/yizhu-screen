//处理累计金额
export const dealMoneyCountfun = (numStr) => {
    let outerArr = [];
    let innerArr = [];

    numStr.substr(-3).split("").forEach(item => {
    innerArr.push(item)
    })
    innerArr.length > 0 ? outerArr.unshift(innerArr) : "";

    if(numStr.length > 3 && numStr.length <= 6){
      innerArr = [];
      numStr.substr(0, numStr.length - 3).split("").forEach(item => {
        innerArr.push(item)
      })
      innerArr.length > 0 ? outerArr.unshift(innerArr) : "";
    }
    
    if(numStr.length > 6 && numStr.length <= 9){
      innerArr = [];
      numStr.substr(-6, 3).split("").forEach(item => {
        innerArr.push(item)
      })
      innerArr.length > 0 ? outerArr.unshift(innerArr) : "";

      innerArr = [];
      numStr.substr(0, numStr.length - 6).split("").forEach(item => {
        innerArr.push(item)
      })
      innerArr.length > 0 ? outerArr.unshift(innerArr) : "";
    }

    if(numStr.length > 9 && numStr.length <= 12){
      innerArr = [];
      numStr.substr(-6, 3).split("").forEach(item => {
        innerArr.push(item)
      })
      innerArr.length > 0 ? outerArr.unshift(innerArr) : "";

      innerArr = [];
      numStr.substr(-9, 3).split("").forEach(item => {
        innerArr.push(item)
      })
      innerArr.length > 0 ? outerArr.unshift(innerArr) : "";

      innerArr = [];
      numStr.substr(0, numStr.length - 9).split("").forEach(item => {
        innerArr.push(item)
      })
      innerArr.length > 0 ? outerArr.unshift(innerArr) : "";
    }

    return outerArr
}

//数字处理
export const filtersNum = (value) => {
    let num;
    if(value > 9999){//大于9999显示x.xx万
        num=(Math.floor(value/1000)/10) + '万';
    }else if( value < 9999 && value>=0){
        num=value
    }
    return num;
}