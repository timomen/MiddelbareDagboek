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
