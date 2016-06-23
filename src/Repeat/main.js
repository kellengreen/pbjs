const parent = document.querySelector('.parent');
const animation = 'slide';

document.querySelector('#add').addEventListener('click', () => {
	const child = document.createElement('div');
	child.textContent = 'child';

	child.classList.add('child');
	child.classList.add(`${animation}`);
	child.classList.add(`${animation}-in`);	
	
	parent.appendChild(child);

	requestAnimationFrame(() => {
		child.classList.add(`${animation}-rest`);
		child.classList.remove(`${animation}-in`);
	});
});

document.querySelector('#remove').addEventListener('click', () => {
	const child = parent.querySelector(`.child:not(.${animation}-out)`);	

	child.addEventListener('transitionend', (evt) => {
		console.dir(evt);
		parent.removeChild(child);
		child.classList.remove(`${animation}-out`);
	});
	
	child.classList.add(`${animation}-out`);
});

//=require ../global/main.js

pb.Repeat = class {

};