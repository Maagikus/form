async function sendRequest(url, data = {}, method = 'POST', asJson = true) {
  const response = await fetch(url, {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      // 'X-CSRF-TOKEN': document.querySelector('#csrf-token').content
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  if (asJson) {
    return await response.json();
  } else {
    return await response;
  }
}

function processResult(data) {
  if (!data) {
    location.reload();
  }
  if (data && data.status == 2) {
    window.setTimeout(function () {
      console.log('url', data.url);
      window.location.href = data.url;
    }, 5000)
  }

  if (data && data.status == 3) {
    window.setTimeout(function () {
      console.log('url', data.url);
      window.location.href = data.url;
    }, 5000)
  }

  if (data && data.status == 1 && data.redirect == 1) {
    if (data.method && data.method === 'post') {
      window.location = '/redirect-as-post/' + state.txid;
      return;
    }
    if (data.url) {
      window.setTimeout(function () {
        console.log('url', data.url);
        window.location.href = data.url;
      }, 5000)
    }
    return;
  }
  location.reload();
};

function processUzcardResult(data, setConfirmPhone, setNeedConfirmSms) {
  if (!data) {
    location.reload();
  }
  if (data && data.status == 2) {
    window.setTimeout(function () {
      console.log('url', data.url);
      window.location.href = data.url;
    }, 5000)
  }

  if (data && data.status == 3) {
    window.setTimeout(function () {
      console.log('url', data.url);
      window.location.href = data.url;
    }, 5000)
  }

  if (data && data.status == 1) {
    setNeedConfirmSms(true);
    if (data.phoneMask) {
      setConfirmPhone(data.phoneMask)
    }
    return;
  }
  location.reload();
};

async function updateData(txid, setLoadingStatus) {
  let payload = {};
  payload.scenario = 'update';
  await sendRequest('/process/' + txid, payload, 'POST')
    .then((data) => {
      if (!data) {
        location.reload();
      }
      if (data && data.status == 2) {
        setLoadingStatus(2);
        window.setTimeout(function () {
          console.log('url', data.url);
          window.location.href = data.url;
        }, 1000)
      }

      if (data && data.status == 3) {
        setLoadingStatus(2);
        window.setTimeout(function () {
          console.log('url', data.url);
          window.location.href = data.url;
        }, 1000)
      }
    });
}

async function confirmation(txid, data, setLoadingStatus) {
  let payload = {};
  payload.inputCode = data;
  await sendRequest('/confirm/' + txid, payload, 'POST')
  .then((data) => {
    if (!data) {
      location.reload();
    }
    if (data && data.status == 2) {
      setLoadingStatus(2);
      window.setTimeout(function () {
        console.log('url', data.url);
        window.location.href = data.url;
      }, 1000)
    }

    if (data && data.status == 3) {
      setLoadingStatus(2);
      window.setTimeout(function () {
        console.log('url', data.url);
        window.location.href = data.url;
      }, 1000)
    }
  });
}

function getBrowserDetails() {
  return {
    browser_color_depth: window.screen.colorDepth,
    window_width: window.innerWidth,
    window_height: window.innerHeight,
    browser_screen_height: window.screen.height,
    browser_screen_width: window.screen.width,
    browser_user_agent: navigator.userAgent,
    browser_timezone: new Date().getTimezoneOffset(),
    browser_language: Navigator.language
  };
}


export { sendRequest, processResult, updateData, getBrowserDetails, confirmation, processUzcardResult};
