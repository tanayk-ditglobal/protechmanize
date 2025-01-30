function onload(){
  const theme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.add("theme-loaded");
};
window.onpaint = onload();
