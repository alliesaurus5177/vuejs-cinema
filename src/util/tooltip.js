import { addClass, removeClass } from './helpers';

let mouseOverHandler = function(event){
	let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
	//console.log(span);
	addClass(span, 'tooltip-show');
};


let mouseOutHandler = function(event){
	let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
	removeClass(span, 'tooltip-show');
};

export default {
	install(Vue) {
		Vue.directive('tooltip', {
			bind(el, bindings) {
				//console.log(el); shows us the session time wrappers 
				let span = document.createElement('SPAN'); //just creating span html el
				let text = document.createTextNode(`Seats available: ${bindings.value.seats}`);
				span.appendChild(text);
				addClass(span, 'tooltip');
				el.appendChild(span);
				let div = el.getElementsByTagName('DIV')[0]; //grabs 1st child of this wrapper
				div.addEventListener('mouseover', mouseOverHandler);
				div.addEventListener('mouseout', mouseOutHandler);
				div.addEventListener('touchstart', mouseOverHandler);
				div.addEventListener('touchend', mouseOutHandler);
			}, 
			unbind(el) {
				let div = el.getElementsByTagName('DIV')[0]; //grabs 1st child of this wrapper
				div.removeEventListener('mouseover', mouseOverHandler);
				div.removeEventListener('mouseout', mouseOutHandler);
				div.removeEventListener('touchstart', mouseOverHandler);
				div.removeEventListener('touchend', mouseOutHandler);
			}
		});		
	}
}