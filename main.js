// handle nav buttons clicked

function changeTab(navclicked) {
    navclicked.style.backgroundColor = "#212529";
    document.getElementById("page-settings").style.display = "none";
    document.getElementById("page" + navclicked.id.slice(3)).style.display = "block";
    for (var i = 0; i < navclicked.parentElement.children.length; i++) {
        if (navclicked.parentElement.children[i] !== navclicked) {
            navclicked.parentElement.children[i].style.backgroundColor = "transparent";
            document.getElementById("page" + navclicked.parentElement.children[i].id.slice(3)).style.display = "none";
        }
    }
}

for (var i = 0; i < document.getElementById("mobile-nav").children.length; i++) {
    document.getElementById(document.getElementById("mobile-nav").children[i].id).addEventListener("click", function () { changeTab(this); });
}

// page 'new'

document.getElementById("page-new-peopleinput").addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        var newbadge = document.createElement("span");
        newbadge.className = "badge text-bg-light mx-1";
        newbadge.innerText = document.getElementById("page-new-peopleinput").value;
        document.getElementById("page-new-people").appendChild(newbadge);
        document.getElementById("page-new-people").style.marginLeft = "4%";
        document.getElementById("page-new-peopleinput").value = "";
    }
});

// page 'home'

document.getElementById("page-home-tuneicon").addEventListener("click", function () {
    document.getElementById("page-home").style.display = "none";
    document.getElementById("page-settings").style.display = "block";
});

// page 'calendar'

function highlightBtn(btntohighlite) {
    btntohighlite.classList.add("btn-primary")
    btntohighlite.classList.remove("btn-outline-primary");
    document.getElementById("page-calendar" + btntohighlite.id.slice(22)).style.display = "block";
    for (var i = 0; i < btntohighlite.parentElement.children.length; i++) {
        if (btntohighlite.parentElement.children[i] !== btntohighlite) {
            btntohighlite.parentElement.children[i].classList.add("btn-outline-primary");
            btntohighlite.parentElement.children[i].classList.remove("btn-primary");
            document.getElementById("page-calendar" + btntohighlite.parentElement.children[i].id.slice(22)).style.display = "none";
        }
    }
}

for (var i = 0; i < document.getElementById("page-calendar-btngroup").children.length; i++) {
    document.getElementById(document.getElementById("page-calendar-btngroup").children[i].id).addEventListener("click", function () { highlightBtn(this); });
}

// page 'settings'

document.getElementById("page-settings-closeicon").addEventListener("click", function () {
    document.getElementById("page-settings").style.display = "none";
    document.getElementById("page-home").style.display = "block";
});