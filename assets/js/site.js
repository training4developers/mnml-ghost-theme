

var PageDescription = React.createClass({

	render: function() {

		var component = this;

		return React.DOM.span({
			ref: function(domElement) {
				component.domElement = domElement;
			}
		}, component.props.page.description);
	},

	componentWillUpdate: function() {

		var component = this;

		component.domElement.classList.add("page-description-updated");

	},

	componentDidUpdate: function() {

		var component = this;

		setTimeout(function() {
			component.domElement.classList.add("page-description-updated-active");
		}, 100);

		setTimeout(function() {
			component.domElement.classList.remove("page-description-updated");
			component.domElement.classList.remove("page-description-updated-active");
		}, 2000);
	}

})


function render(pageDescriptionElement) {
	ReactDOM.render(React.createElement(PageDescription, {
		page: window.store.getState().page
	}), pageDescriptionElement);
}

function getInitialState() {
	return {
		page: {
			descriptionIndex: 0,
			description: pageDescriptions[0]
		}
	};
}

function reducer(state, action) {

	if (typeof state === 'undefined') {
		state = getInitialState();
	}

	switch (action.type) {
		case "ROTATE_DESCRIPTION":
			var newDescriptionIndex = state.page.descriptionIndex + 1;
			state.page = {
				descriptionIndex: newDescriptionIndex,
				description: window.pageDescriptions[newDescriptionIndex % window.pageDescriptions.length]
			};
			return state;
		default:
			return state;
	}

}



document.addEventListener('DOMContentLoaded', function() {

	var pageDescriptionElement = document.querySelector('.page-description');

	if (!pageDescriptionElement) return;

	window.pageDescription = pageDescriptionElement.textContent;
	window.pageDescriptions = pageDescription.split('|');

	window.store = Redux.createStore(reducer);
	window.store.subscribe(render.bind(null, pageDescriptionElement));

	setInterval(function() {
		window.store.dispatch({
			type: "ROTATE_DESCRIPTION"
		});
	}, 6000);

	render(pageDescriptionElement);

});
