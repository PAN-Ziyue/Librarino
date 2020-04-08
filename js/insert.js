$('ul li').on('click', function () {
	$('li').removeClass('active');
	$(this).addClass('active');
});


function display(id) {
	var target = document.getElementById(id);
	if (target.style.display == "none") {
		target.style.display = "";
	} else {
		traget.style.display = "none";
	}
}