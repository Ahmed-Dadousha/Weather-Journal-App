document.addEventListener('DOMContentLoaded', () => {
	/*Global Variables */
	const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
	const apiKey = ',&appid=b708249b0a1d4c731078cf6e9bf44801&units=imperial';
	// Create a new date instance dynamically with JS
	let d = new Date();
	let date = d.getDate() + '.' + d.getMonth() + 1 + '.' + d.getFullYear();

	//Adding Data to Server
	const postData = async (Data = {}) => {
		const response = await fetch('/postData', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(Data),
		});

		try {
			const newData = await response.json();
			console.log(newData);
			return newData;
		} catch (error) {
			console.log('Error', error);
		}
	};

	//Get Data from openWeatherMap api
	const GetData = async (URL, Code, Key) => {
		if (!Code) {
			alert('Zip code can not be null');
			document.querySelector('#zip').focus();
			return 1;
		} else {
			const res = await fetch(URL + Code + Key);
			try {
				const data = await res.json();
				return data;
			} catch (error) {
				console.log('Error ' + error);
			}
		}
	};

	//Button Click Event
	document.getElementById('generate').addEventListener('click', async () => {
		const zipCode = document.getElementById('zip').value;
		const userResponse = document.querySelector('#feeling').value;

		//Show Data To User
		const showData = async (url) => {
			const respo = await fetch(url);
			try {
				const data = await respo.json();
				//Selecting UI elements to update
				document.querySelector('#date').innerHTML = 'Date: ' + data.date;
				document.querySelector('#temp').innerHTML =
					'Temp: ' + data.temperature + '°C';
				document.querySelector('#content').innerHTML =
					'Feeling: ' + data.userResponse;
			} catch (error) {
				console.log('error' + error);
			}
		};
		// Calling Functions
		GetData(baseURL, zipCode, apiKey).then((data) => {
			if (data === 1) {
				return;
			} else if (!userResponse) {
				alert('Enter Your Feeling');
				document.querySelector('#feeling').focus();
				return;
			}

			postData('/postData', {
				date,
				temperature: data.main.temp,
				userResponse,
			});
			showData('getData');
		});
	});
});
