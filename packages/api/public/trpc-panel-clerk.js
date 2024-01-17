window.onload = () => {
  const authButton = document.createElement("button");
  authButton.innerText = "Auth";
  authButton.onclick = () => Clerk.openSignIn();
  const header = document.querySelector("body > div > div > div > div");
  header.appendChild(authButton);

  const startClerk = async () => {
    const Clerk = window.Clerk;

    try {
      await Clerk.load();
    } catch (err) {
      console.error("Error starting Clerk: ", err);
    }
  };

  (() => {
    const script = document.createElement("script");
    script.setAttribute("data-clerk-publishable-key", CLERK_PUBLISHABLE_KEY);
    script.async = true;
    script.src =
      "https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
    script.crossOrigin = "anonymous";
    script.addEventListener("load", startClerk);
    script.addEventListener("error", () => {
      document.getElementById("no-frontend-api-warning").hidden = false;
    });
    document.body.appendChild(script);
  })();
};
