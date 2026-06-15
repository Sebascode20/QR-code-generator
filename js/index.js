const d = document,
  $qrSection = d.querySelector(".qr-section"),
  $urlSection = d.querySelector(".url-section"),
  $linkDownload = d.getElementById("link-download"),
  $linkShare = d.getElementById("link-share");

d.addEventListener("DOMContentLoaded", (e) => {
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

    generateQR();
    download();
    share();
  });
});

const generateQR = () => {
  const $qrcode = d.querySelector("#qrcode");
  let inputText = d.getElementById("url").value;

  if (inputText) {
    d.getElementById("qrcode").innerHTML = "";
    const qrcode = new QRCode(d.getElementById("qrcode"), {
      text: inputText,
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });

    qrcode.makeCode(inputText);
  }

  $qrcode.style.borderRadius = "50%";
  $qrcode.style.boxShadow = "0 0 0 30px #f8fafc1a";
};

const download = () => {
  const $img = d.querySelector("#qrcode img");

  // Se valida de la existencia del elemento en el DOM y que la imagen tenga un valor en el atributo src.
  if ($img && $img.src) {
    $linkDownload.setAttribute("href", $img.src);
    $linkDownload.download = "codigo-qr.png";
  } else if ($img) {
    // Se espera a que finalice la carga
    $img.onload = () => {
      $linkDownload.setAttribute("href", $img.src);
      $linkDownload.download = "codigo-qr.png";
    };
  }
};

const share = () => {
  const $img = d.querySelector("#qrcode img");

  d.getElementById("link-share").addEventListener("click", async () => {
    if (!$img || !$img.src) {
      alert("There is no QR code image to share.");
      return;
    }

    try {
      let result = await fetch($img.src);
      let blob = await result.blob();
      let file = new File([blob], "codigo-qr.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: "QR code",
          text: "Scan this QR code for more information.",
        });
      } else {
        alert("Your browser does not natively support file sharing.");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error while sharing:", error);
      }
    }
  });
};
