/* Assign a variable to a list of elements */
const nodeList = document.querySelectorAll('.card-content');

/* Run matchHeight function on nodelist */
utils.matchHeight(nodeList);

/* Optional window resize listener to fire function if user resizes their browser window. This listener uses the debounce utility to ensure the function only fires every 150 miliseconds */
window.onresize = utils.debounce(() => {
	utils.matchHeight(nodeList);
}, 150);
