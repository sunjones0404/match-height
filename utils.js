(function() {
	utils = {
		matchHeight: function(arr) {
			// Remove height before setting new height
			arr.forEach(parent => {
				// This is required to ensure previous height values do not interfere
				parent.style.removeProperty('height');
			});

			/* Array of child elements in each parent element */
			const parentChildElements = [];

			/* Push child elements into array of parent elements */
			arr.forEach(parent => {
				parentChildElements.push(parent.children);
			});

			/* Return array of child element offset heights within each parent element */
			const parentChildHeights = parentChildElements.map(items => {
				const arr = [];
				for (let item of items) {
					arr.push(item.offsetHeight);
				}
				return arr;
			});

			/* Sum of each parent's child element heights */
			const totalHeights = [];

			/* Returns total height of each parent's child elements and pushes the returned value to totalHeights array */
			parentChildHeights.map(item => {
				const total = item.reduce((acc, val) => {
					return acc + val;
				});
				totalHeights.push(total);
			});

			/* Return tallest parent element */
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

			/* Set item heights based on tallest item */
			function setItemHeight(arr, tallestParentElement) {
				arr.forEach(item => {
					item.style.height = `${tallestParentElement}px`;
				});
			}

			/* Set tallest height on all parent elements */
			setItemHeight(arr, tallestParentElement(arr, totalHeights));
		},
		debounce: function(func, wait, immediate) {
			// Returns a function that, as long as it continues to be invoked, will not
			// be triggered. The function will be called after it stops being called for
			// N milliseconds. If `immediate` is passed, trigger the function on the
			// leading edge, instead of the trailing.
			let timeout;
			return function() {
				const context = this,
					args = arguments;
				const later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				const callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		}
	};
})();
