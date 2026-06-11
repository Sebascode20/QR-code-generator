const d = document,
  $qrSection = d.querySelector(".qr-section"),
  $urlSection = d.querySelector(".url-section");

d.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  $urlSection.classList.add("hidden-section");
  $urlSection.classList.remove("url-section");
  $qrSection.classList.remove("hidden-section");
  $qrSection.style.display = "flex";
  $qrSection.style.flexDirection = "column";
  $qrSection.style.alignItems = "center";
  $qrSection.style.flexBasis = "500px";
  $qrSection.style.justifyContent = "space-between";

  let $inputText = document.getElementById("url").value;

  if ($inputText) {
    document.getElementById("qrcode").innerHTML = "";
    const qrcode = new QRCode(document.getElementById("qrcode"), {
      text: $inputText,
      width: 256,
      width: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });

    qrcode.makeCode($inputText);
  }
});
