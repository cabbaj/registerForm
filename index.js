let changed = () => {
  document.querySelectorAll("input[name=gender]").forEach(input => {
    if (input.checked) console.log(input.value);
  });
};
