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
						<img class="avatar" src="${person.picture.large}" alt="Profile Picture"
						<h3>${person.name.first} ${person.name.last}</h3>
						<span class="email">${person.email}</span>
					</div>
					<div class="joined-details">
						<span class="date">${person.registered.date}</span>
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
 * 'array'. Calls 'showPage' to change the view to clicked section(button with num value in nav 
 * bar) of profiles.
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
			showPage(data,e.target.innerHTML);
		}
	});
}


// Call functions
showPage(data,1);
addPagination(data);