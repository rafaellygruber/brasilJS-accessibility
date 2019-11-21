const taken_usernames = [ 'aline', 'Aline' ];
const usernameInput = document.getElementById('username');
const dateInput = document.getElementById('date');

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

dateInput.addEventListener('keyup', () => {
	
	const date = dateInput.value;

	if(date) {
		const feedback = document.getElementById('dateDescription');
		const dateRegex = new RegExp('^\\d{2}\/\\d{2}\/\\d{4}$', 'g');

		if(dateRegex.test(date)) {
			feedback.innerText = 'Formato válido'
			dateInput.className ='success';
		} else {
			feedback.innerText = 'Formato inválido'
			dateInput.className ='error';
		}

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