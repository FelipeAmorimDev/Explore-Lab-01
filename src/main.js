import "./css/index.css";
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
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa"
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard"
    },
    {
      mask: "0000 0000 0000 0000",

      cardType: "default"
    }
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '');
    const foundMask = dynamicMasked.compiledMasks.find(
      function (item) {
        return number.match(item.regex)
      }
    );
    
    return foundMask

  }
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  alert("Cartao adicionado!")

})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})

// Nome titular - Card

const nomeTitular = document.querySelector("#card-holder");
const cardTitular = document.querySelector(".cc-holder div:last-child");
nomeTitular.addEventListener("input", () => {
  if (!(nomeTitular.value.length === 0)) {
    cardTitular.innerText = nomeTitular.value;
  }
  else {
    cardTitular.innerText = "FULANO DA SILVA";
  }
})

// CVC - Card

const ccSecurityCard = document.querySelector(".cc-security div:last-child");
securityCode.addEventListener("input", () => {
  if (securityCode.value.length > 0) {
    ccSecurityCard.innerText = securityCodeMask._value;
  }
  else {
    ccSecurityCard.innerText = "123";

  }
})

// Expiracao - Card

const ccExpirationCard = document.querySelector(".cc-expiration div:last-child");
expirationDate.addEventListener("input", () => {
  if (expirationDate.value.length > 0) {
    ccExpirationCard.innerText = expirationDateMasked._value;
  }
  else {
    ccExpirationCard.innerText = "02/32";
  }
})

// ccNumber - Card

const ccNumberCard = document.querySelector(".cc-number");
cardNumber.addEventListener("input", () =>{
  
  
  if (cardNumber.value.length > 0) {
    ccNumberCard.innerText = cardNumberMasked._value;
    let tipoCartao = cardNumberMasked.masked.currentMask.cardType
    setCardType(tipoCartao)
  }
  else {
    ccNumberCard.innerText = "1234 5678 9012 3456";
    let tipoCartao = cardNumberMasked.masked.currentMask.cardType
    setCardType(tipoCartao)
  }
})