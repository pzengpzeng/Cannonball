function component() {
  let element = document.createElement("div");

  element.innerHTML = "Hey";

  return element;
}

document.body.appendChild(component());
