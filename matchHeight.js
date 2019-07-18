function matchHeight(arr) {
    // Array of child elements in each
    // parent element
    const parentChildElements = [];

    // Push child elements into array of
    // parent elements
    arr.forEach(parent => {
        parentChildElements.push(parent.children);
    });

    // Return array of child element offset
    // heights within each parent element
    const parentChildHeights = parentChildElements.map(items => {
        const arr = [];
        for (let item of items) {
            arr.push(item.offsetHeight);
        }
        return arr;
    });

    // Sum of each parent's child element heights
    const totalHeights = [];

    // Returns total height of each parent's
    // child elements and pushes the returned
    // value to totalHeights array
    parentChildHeights.map(item => {
        const total = item.reduce((acc, val) => {
            return acc + val;
        });
        totalHeights.push(total);
    });

    // Return tallest parent element
    function tallestParentElement(arr, parentChildHeights) {
        // Set variable for tallest child
        const tallestChildElementsHeight = Math.max(...parentChildHeights);
        // Returns tallest parent element offset height
        const tallestParentHeight = Math.max(
            ...Array.from(arr).map(item => item.offsetHeight)
        );
        if (tallestParentHeight >= tallestChildElementsHeight) {
            return tallestParentHeight;
        }
    }

    // Set item heights based on tallest item
    function setItemHeight(arr, tallestParentElement) {
        arr.forEach(item => {
            item.style.height = `${tallestParentElement}px`;
        });
    }

    // Set tallest height on all parent elements
    setItemHeight(arr, tallestParentElement(arr, totalHeights));
}
