const getScriptUrl = ({ tests, code, iframe }) =>
  URL.createObjectURL(
    new Blob(
      [
        `
        try {
          ${
            iframe === "tests"
              ? `
            ({
              core: {describe, it, expect, run},
              prettify,
            } = window.jestLite);
          `
              : ``
          }
          ${code}
          ${iframe === "tests" ? tests : ``}
          ${
            iframe === "tests"
              ? `prettify.toHTML(run(), document.getElementById('results'));`
              : ``
          }
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

const run = ({ tests, code, iframe }) => {
  window.ready = false;
  window.frames[iframe].location.reload(true);

  const scriptUrl = getScriptUrl({ tests, code, iframe });
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.id = "script";
  script.src = scriptUrl;

  // wait for the iframe to reload before we append the script
  (async () => {
    if (!window.ready) {
      let waited = 0;
      const started = +new Date();
      while (!window.ready && waited < 1000) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => setTimeout(resolve, 50));
        waited = +new Date() - started;
      }
    }
    window.frames[iframe].document.body.appendChild(script);
  })();
};

export default run;
