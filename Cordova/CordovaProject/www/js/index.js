document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  // referencing items in DOM
  const equals = document.querySelector('.equals');
  const del = document.querySelector('.delete');
  const clear = document.querySelector('.reset');
  const onBtn = document.querySelector('.power-on');
  const offBtn = document.querySelector('.power-off');
  const batteryLevel = document.querySelector('.battery-level');
  const batteryCharge = document.querySelector('.battery-charge');
  const display = document.querySelector('.active');
  const statusItems = document.querySelector('.status-items');
  const btnNum = document.querySelectorAll('.num');
  const opr = document.querySelectorAll('.opr');

  offBtn.addEventListener('click', () => {
    display.style.display = 'none';
    statusItems.style.display = 'none';
  });
  onBtn.addEventListener('click', () => {
    display.textContent = '';
    display.style.display = 'inline';
    statusItems.style.display = 'inline';
  });

  window.addEventListener('batterystatus', onBatteryStatus, false);
  function onBatteryStatus(info) {
    if (info.isPlugged === true) {
      batteryCharge.style.display = 'inline';
    }
    if (info.isPlugged === false) {
      batteryCharge.style.display = 'none';
    }
    batteryLevel.textContent = `${info.level}%`;
  }

  // displaying numbers on screen by iterating through the html-num-class array
  btnNum.forEach((digit) => {
    digit.addEventListener('click', () => {
      if (
        display.textContent.startsWith('0') &&
        display.textContent.charAt(1) !== '.' &&
        display.textContent.charAt(1) !== ''
      ) {
        display.textContent = display.textContent.replace('0', '');
      }
      display.append(digit.textContent);
    });
    if (display.textContent.length >= 17) {
      display.textContent = '';
    }
  });
  let newDisplay = display.textContent;
  // displaying operators on screen by iterating through the html-opr-class array
  opr.forEach((operator) => {
    operator.addEventListener('click', () => {
      display.append(operator.textContent);
    });
  });

  // reset screen key operation
  clear.addEventListener('click', () => {
    display.textContent = '';
  });
  // delete key operation
  del.addEventListener('click', () => {
    if (display.textContent != '0') {
      display.textContent = display.textContent.slice(0, -1);
    }
  });

  // equalTo operation
  equals.addEventListener('click', () => {
    try {
      eval(display.textContent);
    } catch (err) {
      if (err instanceof SyntaxError) {
        display.textContent = 'Invalid Expression';
      }
    } finally {
      display.textContent = eval(display.textContent);
    }
  });
}
