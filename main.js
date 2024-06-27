// general functionality 
window.addEventListener("load", function () {
	document.body.style.display = "inherit";
	loadData(); // Verplaats loadData naar de load event listener
});

function UpdateDate() {
	var date = new Date();
	return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

function writeData(mainContent_wd, peculiarity_wd, people_wd) {
	let todaydate = UpdateDate();

	console.log(people_wd);

	let towrite_maincontent = JSON.parse(localStorage.getItem("maincontent")) || {};
	let towrite_peculiarity = JSON.parse(localStorage.getItem("peculiarity")) || {};
	let towrite_people = JSON.parse(localStorage.getItem("people")) || {};

	towrite_maincontent[todaydate] = mainContent_wd;
	towrite_peculiarity[todaydate] = peculiarity_wd;
	towrite_people[todaydate] = people_wd;

	localStorage.setItem("people", JSON.stringify(towrite_people));
	localStorage.setItem("peculiarity", JSON.stringify(towrite_peculiarity));
	localStorage.setItem("maincontent", JSON.stringify(towrite_maincontent));
}

function readData(part) {
	return JSON.parse(localStorage.getItem(part));
}

function loadData() {
	// page 'home'
	let date = new Date();
	document.getElementById("page-home-greeting").innerText = `Goededag, ${localStorage.getItem("name")}`;
	document.getElementById("page-home-date").innerText = (["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"][(date.getDay() + 6) % 7] + " " +
		date.getDate() + " " + ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"][date.getMonth()]
	);

	// page 'settings'
	// TODO: set values of timetoschool
	document.getElementById("page-settings-name").value = localStorage.getItem("name");
	let timetoschool = JSON.parse(localStorage.getItem("timetoschool")) || [];
	for (let i = 0; i < 5; i++) {
		document.getElementsByClassName("page-settings-timesmodal-input")[i].value = timetoschool[i] || "";
	}

	// page 'new'
	if (localStorage.getItem("maincontent") !== "") {
		let maincontentParsed = JSON.parse(localStorage.getItem("maincontent")) || {};
		document.getElementById("page-new-textarea").value = maincontentParsed[UpdateDate()] || "";
	} else {
		document.getElementById("page-new-textarea").value = "";
	}
}

// handle nav buttons clicked

function changeTab(navclicked) {
	navclicked.style.backgroundColor = "#212529";
	document.getElementById("page-settings").style.display = "none";
	document.getElementById("page" + navclicked.id.slice(3)).style.display = "block";
	for (let i = 0; i < navclicked.parentElement.children.length; i++) {
		if (navclicked.parentElement.children[i] !== navclicked) {
			navclicked.parentElement.children[i].style.backgroundColor = "transparent";
			document.getElementById("page" + navclicked.parentElement.children[i].id.slice(3)).style.display = "none";
		}
	}
}

for (let i = 0; i < document.getElementById("mobile-nav").children.length; i++) {
	document.getElementById(document.getElementById("mobile-nav").children[i].id).addEventListener("click", function () { changeTab(this); });
}

// page 'new'

let enteredPeopleToday = [];

document.getElementById("page-new-peopleinput").addEventListener("keypress", function (e) {
	if (e.key == "Enter") {
		let newbadge = document.createElement("span");
		newbadge.className = "badge text-bg-light mx-1";
		newbadge.innerText = document.getElementById("page-new-peopleinput").value;
		enteredPeopleToday.push(newbadge.innerText);
		document.getElementById("page-new-people").appendChild(newbadge);
		document.getElementById("page-new-people").style.marginLeft = "4%";
		document.getElementById("page-new-peopleinput").value = "";
	}
});

document.getElementById("page-new-submitbtn").addEventListener("click", function () {
	console.log(enteredPeopleToday);
	writeData(document.getElementById("page-new-textarea").value, parseFloat(document.getElementById("page-new-range").value), enteredPeopleToday);
});

function clearlocalstorage() {
	localStorage.setItem("maincontent", "");
	localStorage.setItem("peculiarity", "");
	localStorage.setItem("people", "");
}

// page 'home'

document.getElementById("page-home-tuneicon").addEventListener("click", function () {
	document.getElementById("page-home").style.display = "none";
	document.getElementById("page-settings").style.display = "block";
});

document.getElementById("page-home-fillinreminder-button").addEventListener("click", function () {
	changeTab(document.getElementById("nav-new"));
});

// page 'calendar'

function highlightBtn(btntohighlite) {
	btntohighlite.classList.add("btn-primary")
	btntohighlite.classList.remove("btn-outline-primary");
	document.getElementById("page-calendar" + btntohighlite.id.slice(22)).style.display = "block";
	for (let i = 0; i < btntohighlite.parentElement.children.length; i++) {
		if (btntohighlite.parentElement.children[i] !== btntohighlite) {
			btntohighlite.parentElement.children[i].classList.add("btn-outline-primary");
			btntohighlite.parentElement.children[i].classList.remove("btn-primary");
			document.getElementById("page-calendar" + btntohighlite.parentElement.children[i].id.slice(22)).style.display = "none";
		}
	}
}

for (let i = 0; i < document.getElementById("page-calendar-btngroup").children.length; i++) {
	document.getElementById(document.getElementById("page-calendar-btngroup").children[i].id).addEventListener("click", function () { highlightBtn(this); });
}

// page 'settings'

document.getElementById("page-settings-closeicon").addEventListener("click", function () {
	document.getElementById("page-settings").style.display = "none";
	document.getElementById("page-home").style.display = "block";

	// save settings
	localStorage.setItem("name", document.getElementById("page-settings-name").value);
	let TimetoschoolLocal = [];
	for (let i = 0; i < 5; i++) {
		TimetoschoolLocal[i] = document.getElementsByClassName("page-settings-timesmodal-input")[i].value;
	}
	localStorage.setItem("timetoschool", JSON.stringify(TimetoschoolLocal));
	loadData(); // Zorg ervoor dat loadData niet zichzelf indirect aanroept
});
