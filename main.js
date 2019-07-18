const objectArray = document.querySelectorAll(".card");

matchHeight(objectArray);

window.onresize = () => {
    objectArray.forEach(parent => {
        parent.style.removeProperty("height");
    });
    matchHeight(objectArray);
};
