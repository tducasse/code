const run = (code) => {
  const scriptUrl = URL.createObjectURL(
    new Blob(
      [
        `
        try {
          ${code}
        } catch(e) {
          console.error(e.message)
        }
        `,
      ],
      {
        type: "text/javascript",
      }
    )
  );
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.id = "script";
  script.src = scriptUrl;
  const iframeHead =
    window.frames.code.document.getElementsByTagName("head")[0];
  window.frames.code.document.getElementById("script").outerHTML = "";
  iframeHead.appendChild(script);
};

export default run;
