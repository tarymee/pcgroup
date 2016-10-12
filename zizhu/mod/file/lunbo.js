;(function () {
	var lis = document.getElementById("Jslide").getElementsByTagName("li");
	for (var i = 0; i < lis.length; i++) {
		(function (m) {
		if (lis[m].getAttribute("data-type") == "lunbo") {
			swipe(lis[m].querySelector(".m-lunbo"), {
				nav: lis[m].querySelector(".m-lunbo-nav")
			});
		};
		})(i)
	};
})()
