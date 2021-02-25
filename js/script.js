/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/**
 * Builds HTML from object literals inside 'array' given as param, 'pageToShow' limits what 
 * section(9 objects) of the 'array' is built to HTML to show on the page. HTML is inserted 
 * directly to the DOM after the needed string is built.
 * @param {array} array 
 * @param {number} pageToShow 
 */
function showPage(array, pageToShow) {
	const firstIndex = 9 * pageToShow - 9;
	const lastIndex = 9 * pageToShow - 1;
	const studentList = document.querySelector('.student-list');
	studentList.innerHTML = '';

	array.forEach((person,i) => {
		if(i >= firstIndex && i <= lastIndex) {
			const personDOM = `
				<li class="student-item cf">
					<div class="student-details">
						<img class="avatar" src="${person.picture.large}" alt="Profile Picture">
						<h3>${person.name.first} ${person.name.last}</h3>
						<span class="email">${person.email}</span>
					</div>
					<div class="joined-details">
						<span class="date">Joined ${person.registered.date.replaceAll("-","/")}</span>
					</div>
				</li>
				`
			studentList.insertAdjacentHTML('beforeend', personDOM);
		}
	});
}

/**
 * Adding pagination to profile view. Page shows 9 profiles, 'array' contains more profiles,
 * so pagination with this function sets up navigation below the profiles to scroll trought
 * 'array'. HTML is built inside a loop for each button and added to DOM directly.
 * Calls 'showPage' to change the view to clicked(button with number value) section of profiles.
 * @param {array} array 
 */
function addPagination(array) {
	const pages = Math.ceil(array.length/9);
	const linkList = document.querySelector('.link-list');
	
	linkList.innerHTML = '';
	for (let i = 0; i < pages; i++) {
		if (i === 0) {		
			const paginationDOM = `
				<li>
					<button type="button" class="active">${i+1}</button>
				</li>
				`;
				linkList.insertAdjacentHTML('beforeend',paginationDOM);
		} else {
			const paginationDOM = `
				<li>
					<button type="button">${i+1}</button>
				</li>
				`;
			linkList.insertAdjacentHTML('beforeend',paginationDOM);
		}
	}

	linkList.addEventListener('click', function (e) {
		if(e.target.tagName === 'BUTTON') {
			document.querySelector('.active').classList.remove('active');
			e.target.classList.add('active');
			showPage(array,e.target.innerHTML);
		}
	});
}

/**
 * Adds search bar to search from student view/array. Added directly to DOM inside header.
 */
function addSearchbar() {
	const header = document.querySelector('.header');
	const searchBar = `
	<label for="search" class="student-search">
  	<input id="search" placeholder="Search by name...">
  	<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
	</label>
	`;
	header.insertAdjacentHTML('beforeend', searchBar);
	addListenersToSearch();
}

/**
 * Adding listeners to Search bar for both 'click' and 'keyup' events. Using 'showPage' and
 * 'addPagination' functions to alter the view according to the search results.
 */
function addListenersToSearch() {
	const searchButton = document.querySelector('.student-search button');
	const searchInput = document.querySelector('#search');
	const studentList = document.querySelector('.student-list');
	const noResultsHTML = `<h2>No results found!</h2>`;

	searchButton.addEventListener('click', function(e) {
		e.preventDefault();
		const resultsArray = filterResults(data,searchInput.value);
		showPage(filterResults(data,searchInput.value),1)
		addPagination(resultsArray);
		if(!resultsArray.length) {
			studentList.insertAdjacentHTML('afterbegin',noResultsHTML);
		}
	});
	searchInput.addEventListener('keyup', function() {
		const resultsArray = filterResults(data,searchInput.value);
		showPage(filterResults(data,searchInput.value),1)
		addPagination(resultsArray);
		if(!resultsArray.length) {
			studentList.insertAdjacentHTML('afterbegin',noResultsHTML);
		}
	})
}

/**
 * Loops trought given array and searches for input string from a combination string of 
 * "first name" + "last name". Returns the results in an array.
 * @param {*} array 
 * @param {*} input 
 */
function filterResults(array,input) {
	const resultsArray = [];
	array.forEach(profile => {
		const targetString = profile.name.first + " " + profile.name.last;
		if (targetString.toLowerCase().includes(input.toLowerCase())) {
			resultsArray.push(profile);
		}
	});
	return resultsArray;
}


// Call functions
showPage(data,1);
addSearchbar();
addPagination(data);