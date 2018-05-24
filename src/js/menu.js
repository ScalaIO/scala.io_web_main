function toggleMenu(evt){
  let menuItems=document.getElementById(event.currentTarget.id+"-items");
  let toggle=menuItems.className;
  switch(toggle){
    case "hidden":
        menuItems.className="visible";
        break;
    case "visible":
        menuItems.className="hidden";
        break;
  }
}
document.getElementById("menu").addEventListener('click', toggleMenu);
document.getElementById("previous-editions").addEventListener('click', toggleMenu);
