window.addEventListener('load', () => {
  alert('**Please Use Crome Browser for better experiance**')
  
  let input_text = document.getElementById('input_text');
  let generate_btn = document.getElementById('generate_btn');
  let qr = document.getElementById('qr');
  let image_div = document.getElementById('image_div');
  let temp_text = document.getElementById('temp_text');
  let btn = document.querySelector('.btn');
  let download_btn = document.getElementById('download_btn');
  let error_alert = document.getElementById('error_alert');
  let success_alert = document.getElementById('success_alert');

  let generate_qr = () => {
    let text = input_text.value;
    if (!(text == '')) {
      temp_text.remove();

      qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}&color=434C60`;
      image_div.style.height = `11.5em`;
      qr.style.opacity = `1`;
      btn.style.opacity = `1`;
      btn.style.height = `2.2em`;

    } else {

      input_text.placeholder = `Don't Leave it Blank!!!`;

      //  console.log(input_text.placeholder);
    }

  }

  generate_btn.addEventListener('click', generate_qr);


  let download_qr = (arg) => {

  }

  download_btn.addEventListener('click', () => {
    //console.log(qr.src);
    download_btn.innerText = 'Downloading...';
    fetch_file(qr.src);
  })

  function fetch_file(url) {
    fetch(url).then(res => res.blob()).then(file => {
      let tempUrl = URL.createObjectURL(file);
      let aTag = document.createElement('a');
      aTag.href = tempUrl;
      // aTag.download = url.replace(/^.*[\\\/]/, '');
      aTag.download = `qr`;
      document.body.appendChild(aTag);
      aTag.click();
      URL.revokeObjectURL(tempUrl);
      download_btn.innerText = `Download`;
      success_alert.style.bottom = '25%';
      success_alert.style.opacity = '1';
      setTimeout(() => {
        success_alert.style.bottom = '-100%';
        success_alert.style.opacity = '0';
      }, 3000)
      aTag.remove();
      //console.log(tempUrl);

    }).catch(() => {
      error_alert.style.bottom = '25%';
      error_alert.style.opacity = '1';
      setTimeout(() => {
        download_btn.innerText = `Download`;
        error_alert.style.bottom = '-100%';
        error_alert.style.opacity = '0';
      }, 3000);


    });
  }

  console.log('Ready To Start. . .');
})
