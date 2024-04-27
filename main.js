// handle nav buttons clicked
document.getElementById("nav-new").addEventListener("click", function() {
    document.getElementById("nav-new").style.backgroundColor = "#212529";
    document.getElementById("nav-home").style.backgroundColor = "transparent";
    document.getElementById("nav-calendar").style.backgroundColor = "transparent";
    document.getElementById("page-home").style.display = "none";
    document.getElementById("page-calendar").style.display = "none";
    document.getElementById("page-new").style.display = "block";
});
document.getElementById("nav-home").addEventListener("click", function() {
    document.getElementById("nav-home").style.backgroundColor = "#212529";
    document.getElementById("nav-new").style.backgroundColor = "transparent";
    document.getElementById("nav-calendar").style.backgroundColor = "transparent";
    document.getElementById("page-home").style.display = "block";
    document.getElementById("page-calendar").style.display = "none";
    document.getElementById("page-new").style.display = "none";
});

document.getElementById("nav-calendar").addEventListener("click", function() {
    document.getElementById("nav-calendar").style.backgroundColor = "#212529";
    document.getElementById("nav-new").style.backgroundColor = "transparent";
    document.getElementById("nav-home").style.backgroundColor = "transparent";
    document.getElementById("page-home").style.display = "none";
    document.getElementById("page-calendar").style.display = "block";
    document.getElementById("page-new").style.display = "none";
});

// page 'new'

// people
document.getElementById("page-new-peopleinput").addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
        var newbadge = document.createElement("span");
        newbadge.className = "badge text-bg-light mx-1";
        newbadge.innerText = document.getElementById("page-new-peopleinput").value;
        document.getElementById("page-new-people").appendChild(newbadge);
        document.getElementById("page-new-people").style.marginLeft = "4%";
        document.getElementById("page-new-peopleinput").value = "";
    }
});
