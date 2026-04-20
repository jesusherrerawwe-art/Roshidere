(() => {
  const STORAGE = {
    dad: "fanfic.dadName",
    waifu: "fanfic.waifuName",
  };

  const DEFAULTS = {
    dad: "The MVP",
    waifu: "Karen Tendō",
  };

  const dadInput = document.getElementById("dadName");
  const waifuInput = document.getElementById("waifuName");
  const applyBtn = document.getElementById("applyNames");
  const resetBtn = document.getElementById("resetNames");
  const toTopBtn = document.getElementById("toTop");

  const dadNodes = () => Array.from(document.querySelectorAll(".name-dad"));
  const waifuNodes = () => Array.from(document.querySelectorAll(".name-waifu"));

  function readStored(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v && v.trim() ? v.trim() : fallback;
    } catch {
      return fallback;
    }
  }

  function writeStored(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore quota / privacy mode
    }
  }

  function applyNames(dadName, waifuName) {
    dadNodes().forEach((el) => {
      el.textContent = dadName;
    });
    waifuNodes().forEach((el) => {
      el.textContent = waifuName;
    });
  }

  function load() {
    const dadName = readStored(STORAGE.dad, DEFAULTS.dad);
    const waifuName = readStored(STORAGE.waifu, DEFAULTS.waifu);

    dadInput.value = dadName;
    waifuInput.value = waifuName;
    applyNames(dadName, waifuName);
  }

  applyBtn.addEventListener("click", () => {
    const dadName = (dadInput.value || DEFAULTS.dad).trim() || DEFAULTS.dad;
    const waifuName = (waifuInput.value || DEFAULTS.waifu).trim() || DEFAULTS.waifu;

    writeStored(STORAGE.dad, dadName);
    writeStored(STORAGE.waifu, waifuName);

    dadInput.value = dadName;
    waifuInput.value = waifuName;

    applyNames(dadName, waifuName);
    applyBtn.animate([{ transform: "scale(1)" }, { transform: "scale(0.98)" }, { transform: "scale(1)" }], {
      duration: 160,
      easing: "ease-out",
    });
  });

  resetBtn.addEventListener("click", () => {
    dadInput.value = DEFAULTS.dad;
    waifuInput.value = DEFAULTS.waifu;
    try {
      localStorage.removeItem(STORAGE.dad);
      localStorage.removeItem(STORAGE.waifu);
    } catch {
      // ignore
    }
    applyNames(DEFAULTS.dad, DEFAULTS.waifu);
  });

  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "enter") {
      applyBtn.click();
    }
  });

  load();
})();
