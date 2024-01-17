export const openLinkInNewTab = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};
