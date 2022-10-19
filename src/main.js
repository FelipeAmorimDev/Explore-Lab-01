import "./css/index.css"
import IMask from 'imask';

const date = new Date();
const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");






function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0]);
  ccBgColor02.setAttribute("fill", colors[type][1]);
  ccLogo.setAttribute("src", `cc-${type}.svg`);
}

globalThis.setCardType = setCardType;

// Security Code
const securityCode = document.querySelector("#security-code");
const securityCodePattern = {
  mask: "0000"
}

const securityCodeMask = IMask(securityCode, securityCodePattern)

// Expiracao 
var anoAtual = date.getFullYear();
anoAtual = anoAtual.toString()[2] + anoAtual.toString()[3]
anoAtual = parseInt(anoAtual)
const expirationDate = document.querySelector("#expiration-date");
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: IMask.MaskedRange,
      from: anoAtual,
      to: anoAtual + 10
    }
  }
}

const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

// Credit Card

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask:[
    {
      mask: "0000 0000 0000 0000",
      regex:/^4\d{0,15}/,
      cardType:"visa"
    },
    {
      mask: "0000 0000 0000 0000",
      regex:/(^5[1-5]\d{2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType:"mastercard"
    },
    {
      mask: "0000 0000 0000 0000",
      
      cardType:"default"
    }
  ],
  dispatch: function (appended,dynamicMasked){
    const number = (dynamicMasked.value + appended).replace(/\D/g,'');
    const foundMask = dynamicMasked.compiledMasks.find(
      function(item){
        return number.match(item.regex)
      }
    );
    console.log(foundMask)
    return foundMask
    
  }
}

const cardNumberMasked = IMask(cardNumber,cardNumberPattern)