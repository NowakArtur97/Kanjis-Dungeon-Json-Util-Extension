let copyButton, dataDiv;

document.addEventListener("DOMContentLoaded", function () {
  copyButton = document.querySelector(".copy_button");
  copyButton.addEventListener("click", copyData);
});

function copyData() {
  dataDiv = document.querySelector(".data");
  dataDiv.textContent = "copy";
}
