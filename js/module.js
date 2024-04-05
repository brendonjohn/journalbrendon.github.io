(async () => {
  // Find the button element
  const button = document.querySelector("#record");

  if (button == null) {
    console.warn("<button> was not found. Exiting early");
    return;
  }

  const { isSupported } = await import(
    "https://unpkg.com/@loomhq/record-sdk/dist/esm/is-supported.js"
  );

  const { supported, error } = await isSupported();

  if (supported !== true || error != null) {
    button.innerHTML = "Not supported";

    if (error) {
      console.log("Error message: ", error.message);
    }

    return;
  }

  const sdk = await import(
    "https://unpkg.com/@loomhq/record-sdk/dist/esm/index.js"
  );

  const publicAppId = "cf421a7e-0945-42ad-8132-57432a0432dd";

  const instance = await sdk.setup({
    publicAppId,
  });

  if (!instance.status().success) {
    button.innerHTML = "Failed to setup";
    return;
  }

  instance.configureButton({
    element: button,
    hooks: {
      onInsertClicked: (oembed) => {
        console.log(["received oembed", oembed.toString()]);
      },
      onRecordingComplete: (video) => {
        console.log(["recording complete", video]);
      },
      onUploadComplete: (video) => {
        console.log(["upload complete", video]);
      },
    },
  });

  button.innerHTML = "Record ⏺";
})();
