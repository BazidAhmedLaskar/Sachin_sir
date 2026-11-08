(() => {
  const form = document.querySelector('#study-toolkit');
  const status = document.querySelector('#toolkit-status');
  const reset = document.querySelector('#reset-toolkit');
  const print = document.querySelector('#print-toolkit');
  if (!form || !status || !reset || !print) return;

  const key = 'sachin-study-toolkit-v1';
  const fields = [...form.querySelectorAll('[data-save]')];
  let storageAvailable = true;
  try {
    const saved = JSON.parse(localStorage.getItem(key) || '{}');
    fields.forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(saved, field.name)) return;
      if (field.type === 'checkbox') field.checked = saved[field.name] === true;
      else if (typeof saved[field.name] === 'string') field.value = saved[field.name];
    });
    status.textContent = 'Your changes are saved in this browser on this device.';
  } catch (_) {
    storageAvailable = false;
    status.textContent = 'Browser storage is unavailable. Your changes will not be saved after you leave this page.';
  }

  function save() {
    if (!storageAvailable) return;
    const data = {};
    fields.forEach((field) => { data[field.name] = field.type === 'checkbox' ? field.checked : field.value; });
    try {
      localStorage.setItem(key, JSON.stringify(data));
      status.textContent = 'Saved in this browser on this device.';
    } catch (_) {
      storageAvailable = false;
      status.textContent = 'Browser storage is unavailable. Your changes will not be saved after you leave this page.';
    }
  }
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('input', save);
  form.addEventListener('change', save);
  reset.addEventListener('click', () => {
    form.reset();
    if (storageAvailable) {
      try {
        localStorage.removeItem(key);
        status.textContent = 'Your saved plan has been cleared from this browser.';
      } catch (_) {
        storageAvailable = false;
        status.textContent = 'Could not clear saved browser data. Use your browser settings to remove site data.';
      }
    } else {
      status.textContent = 'The form was cleared. Check your browser settings to remove any previously saved site data.';
    }
  });
  print.addEventListener('click', () => window.print());
  reset.hidden = false;
  print.hidden = false;
})();
