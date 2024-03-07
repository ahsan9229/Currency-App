let Base_URL =
  "https://v6.exchangerate-api.com/v6/{Add your Key Hear}/pair/";

const selects = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let selectVal of selects) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (selectVal.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (selectVal.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }
    selectVal.append(newOption);
  }

  selectVal.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const currencyExgRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${Base_URL}/${fromCurr.value}/${toCurr.value}/${amtVal}`;
  let response = await fetch(URL);
  let Data = await response.json();
  let finalAmount = Data.conversion_result;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  console.log(countryCode);
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  currencyExgRate();
});

window.addEventListener("load", () => {
  currencyExgRate();
  // updateFlag();
});
