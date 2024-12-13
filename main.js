document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("input_text");
  const generateBtn = document.getElementById("generate_btn");
  const qrImage = document.getElementById("qr");
  const imageDiv = document.getElementById("image_div");
  const tempText = document.getElementById("temp_text");
  const btn = document.querySelector(".btn");
  const downloadBtn = document.getElementById("download_btn");
  const errorAlert = document.getElementById("error_alert");
  const successAlert = document.getElementById("success_alert");

  const generateQR = () => {
    const text = inputText.value.trim();

    if (text) {
      tempText?.remove();

      qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
        text
      )}&color=434C60`;
      imageDiv.style.height = "11.5em";
      qrImage.style.opacity = "1";
      btn.style.opacity = "1";
      btn.style.height = "2.2em";
    } else {
      inputText.placeholder = "Don't Leave it Blank!!!";
    }
  };

  const fetchFile = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch the file");
      }

      const blob = await response.blob();
      const tempUrl = URL.createObjectURL(blob);
      const aTag = document.createElement("a");

      aTag.href = tempUrl;
      aTag.download = "qr";
      document.body.appendChild(aTag);
      aTag.click();
      URL.revokeObjectURL(tempUrl);
      aTag.remove();

      successAlert.style.bottom = "25%";
      successAlert.style.opacity = "1";
      setTimeout(() => {
        successAlert.style.bottom = "-100%";
        successAlert.style.opacity = "0";
      }, 3000);
    } catch (error) {
      console.error(error);
      errorAlert.style.bottom = "25%";
      errorAlert.style.opacity = "1";
      setTimeout(() => {
        errorAlert.style.bottom = "-100%";
        errorAlert.style.opacity = "0";
      }, 3000);
    } finally {
      downloadBtn.innerText = "Download";
    }
  };

  generateBtn.addEventListener("click", generateQR);

  downloadBtn.addEventListener("click", () => {
    if (qrImage.src) {
      downloadBtn.innerText = "Downloading...";
      fetchFile(qrImage.src);
    }
  });

  console.log("Ready To Start...");
});
