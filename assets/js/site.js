var pageDescriptionElement = document.querySelector('.page-description');
var pageDescription = pageDescriptionElement.textContent;
var pageDescriptions = pageDescription.split('|');

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

		setTimeout(function() {
			component.domElement.classList.add("page-description-updated");
		}, 0);

	},

	componentDidUpdate: function() {

		var component = this;

		setTimeout(function() {
			component.domElement.classList.add("page-description-updated-active");
		}, 0);

		setTimeout(function() {
			component.domElement.classList.remove("page-description-updated");
			component.domElement.classList.remove("page-description-updated-active");
		}, 1000);
	}

})


function render() {
	ReactDOM.render(React.createElement(PageDescription, {
		page: store.getState().page
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
				description: pageDescriptions[newDescriptionIndex % pageDescriptions.length]
			};
			return state;
		default:
			return state;
	}

}

var store = Redux.createStore(reducer);
store.subscribe(render);

setInterval(function() {
	store.dispatch({
		type: "ROTATE_DESCRIPTION"
	});
}, 5000);

document.addEventListener('DOMContentLoaded', function() {
	render();
});