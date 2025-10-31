const audio = document.getElementById("miAudio");

// Cuando el usuario hace clic en cualquier parte del documento, se activa el sonido
document.addEventListener("click", () => {
  // remove muted and explicitly play on the user gesture; run once to avoid repeated calls
  audio.muted = false;
  audio.play().catch(() => {});
}, { once: true });