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
    window.setTimeout(function() {
      console.log('url',data.url);
      window.location.href = data.url;
  }, 5000)
  }

  if (data && data.status == 3) {
    window.setTimeout(function() {
      console.log('url',data.url);
      window.location.href = data.url;
  }, 5000)
  }

  if (data && data.status == 1 && data.redirect == 1) {
      if (data.method && data.method === 'post') {
          window.location = '/redirect-as-post/' + state.txid;
          return;
      }
      if (data.url) {
          window.setTimeout(function() {
              console.log('url',data.url);
              window.location.href = data.url;
          }, 5000)
      }
      return;
  }
  location.reload();
};


export {sendRequest, processResult};