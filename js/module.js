(async () => {
  // Find the button element
  const button = document.querySelector("#record");

  if (button == null) {
    console.warn("<button> was not found. Exiting early");
    return;
  }

  const sdk = await import(
    "https://unpkg.com/@loomhq/record-sdk/dist/esm/index.js"
  );

  const { supported, error } = await sdk.isSupported();

  if (supported !== true || error != null) {
    button.innerHTML = "Failed to load";

    if (error) {
      console.log("Error message: ", error.message);
    }

    return;
  }

  const publicAppId = "cf421a7e-0945-42ad-8132-57432a0432dd";

  const instance = await sdk.setup({
    publicAppId,
  });

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

  button.innerHTML = 'Demo the Recorder';

})();
