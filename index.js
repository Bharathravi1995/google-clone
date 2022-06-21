window.onload = () => {
  bindInputKeyPress();
  bindSearchBtnClick();
  bindLuckyBtnHover();
  bindLuckyBtnClick();
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function bindSearchBtnClick() {
  document.getElementById("search_btn").addEventListener("click", () => {
    let inputValue = document.getElementById("search_input").value;
    searchKeyword(inputValue);
  });
}

function bindInputKeyPress() {
  let inputElement = document.getElementById("search_input");

  inputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchKeyword(inputElement.value);
    }
  });
}

function bindLuckyBtnClick() {
  document.getElementById("lucky_btn").addEventListener("click", () => {
    searchKeyword(window.luckyText);
  });
}

function searchKeyword(message) {
  if (message)
    window.location.href = `https://www.google.com/search?q=${message}`;
}

function bindLuckyBtnHover() {
  let luckyBtn = document.getElementById("lucky_btn"),
    luckyButtonUlElement = document.getElementById("lucky_btn_ul"),
    btnTimeID;

  luckyBtn.addEventListener("mouseenter", () => {
    btnTimeID = setTimeout(function () {
      let min = 0,
        max = 10,
        randomIndex = getRandomInt(min, max),
        listElements = luckyButtonUlElement.querySelectorAll("li");
      if (randomIndex === 5) {
        randomIndex = 10;
      }
      let topPostion = -36 * randomIndex + 1;

      luckyButtonUlElement.animate({ top: `${topPostion}px` }, 300);
      setTimeout(function () {
        luckyButtonUlElement.style.top = `${topPostion}px`;
      }, 300);

      luckyBtn.style.width = `${listElements[randomIndex].offsetWidth}px`;
      window.luckyText = listElements[randomIndex].innerHTML;
    }, 200);
  });
  luckyBtn.addEventListener("mouseleave", () => {
    clearTimeout(btnTimeID);

    setTimeout(function () {
      luckyButtonUlElement.style.top = "-179px"; // this is the original position
      luckyBtn.style.width = "130.5px"; // reset the original width of the button
    }, 200);
  });
}
