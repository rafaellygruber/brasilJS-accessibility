const taken_usernames = [ 'nicole', 'NICOLE' ];
const usernameInput = document.getElementById('username');
const password2Input = document.getElementById('password2');

usernameInput.addEventListener('keyup', () => {
	
	const inputValue = usernameInput.value;

	if (inputValue) {
		if (taken_usernames.includes(inputValue.trim())) {
			setError(usernameInput, 'Desculpe, usuário já utilizado.', 'username_feedback');
		} else {
			setSuccess(usernameInput, 'Você pode usar este usuário.', 'username_feedback');
		}
	} else {
		document.getElementById('username_feedback').innerHTML = '';
		document.getElementById('username_feedback').parentNode.className = '';
	}
});

function setError(element, message, feedbackElementId) {
	element.className='error';
	document.getElementById(feedbackElementId).innerHTML = message;
}

function setSuccess(element, message, feedbackElementId) {
	element.className='success';
	document.getElementById(feedbackElementId).innerHTML = message;
}

function onBlurExpire () {
	const dateElement = document.getElementById('date');
	const date = dateElement.value;
	const feedback = document.getElementById('dateDescription');
	const dateRegex = new RegExp('^\\d{2}\/\\d{2}\/\\d{4}$', 'g');

	if(dateRegex.test(date)) {
		feedback.innerText = 'Formato válido'
		dateElement.className ='success';
	} else {
		feedback.innerText = 'Formato inválido'
		dateElement.className ='error';
	}
}