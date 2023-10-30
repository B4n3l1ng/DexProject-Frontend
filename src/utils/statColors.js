function getStatColor(name) {
  let color;
  switch (name) {
    case "hp":
      color = "red";
      break;
    case "attack":
      color = "orange";
      break;
    case "defense":
      color = "yellow";
      break;
    case "special-attack":
      color = "blue";
      break;
    case "special-defense":
      color = "green";
      break;
    case "speed":
      color = "pink";
      break;
    default:
      color = "#fff";
  }
  return color;
}

export { getStatColor };
