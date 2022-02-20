/* eslint-disable */
// project styles
import '@/scss/styles';


function requireAll(r) {
	r.keys().forEach(r);
}

requireAll(require.context('./assets/img/svg/', true, /\.svg$/));

fetch('./assets/img/svg/sprite.svg')
	.then((res) => res.text())
	.then((data) => {
		document.body.insertAdjacentHTML('beforeend', data);
	});

import test from '@/scripts/test';

console.log(test);
