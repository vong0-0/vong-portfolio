try {
  const theme = window.localStorage.getItem("theme");
  document.documentElement.classList.toggle("dark", theme === "dark");
} catch {
  document.documentElement.classList.remove("dark");
}
