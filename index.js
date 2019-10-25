const taken_usernames = [ 'nicole' ];
const input = document.getElementById('username');

input.addEventListener('keyup', () => {
	
	const inputValue = input.value;

	if (inputValue) {
		if (taken_usernames.includes(inputValue.trim())) {
			setError(input, 'Desculpe, usuário já utilizado.');
		} else {
			setSuccess(input, 'Você pode usar este usuário.');
		}
	} else {
		document.getElementById('username_feedback').innerHTML = '';
		document.getElementById('username_feedback').parentNode.className = '';
		document.querySelector('[for="username"] strong').innerHTML = '';
	}
});

function setError(el, msg) {
	el.parentNode.querySelector('strong').innerHTML = "Error: ";
	el.parentNode.className='error';
	el.parentNode.querySelector('span').innerHTML = msg;
}

function setSuccess(el, msg) {
	el.parentNode.querySelector('strong').innerHTML = "OK: ";
	el.parentNode.className='success';
	el.parentNode.querySelector('span').innerHTML = msg;
}
