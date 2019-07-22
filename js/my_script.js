var elmtContainCustomSel, selElmt, divSelected;

elmtContainCustomSel = document.getElementsByClassName("custom-select");

for (var i = 0; i < elmtContainCustomSel.length; i++) {
	selElmt = elmtContainCustomSel[i].getElementsByTagName("select")[0];
	divSelected = document.createElement("div");
	divSelected.innerHTML = selElmt.options[selElmt.selectedIndex].innerHTML;
	divSelected.setAttribute("class", "select-selected");
	elmtContainCustomSel[i].appendChild(divSelected);

	divContainSelectItems = document.createElement("div");	
	divContainSelectItems.setAttribute("class", "select-items select-hide");
	for (var j = 1; j < selElmt.length; j++) {
		divItem = document.createElement("div");
		divItem.innerHTML = selElmt.options[j].innerHTML;
		divItem.addEventListener("click", function(e) {
			var y;
			for (var i = 0; i < selElmt.length; i++) {
				if (selElmt.options[i].innerHTML == this.innerHTML) {
					selElmt.selectedIndex = i;
					divSelected.innerHTML = this.innerHTML;
					//act like select form
					y = this.parentNode.getElementsByClassName("same-as-select");
					for (var j = 0; j < y.length; j++) {
						y[j].removeAttribute("class");
					}
					this.setAttribute("class", "same-as-select");
					break;
				}
			}
			divSelected.click();
		});
		divContainSelectItems.appendChild(divItem);
	}
	elmtContainCustomSel[i].appendChild(divContainSelectItems);
	divSelected.addEventListener("click", function(e) {
		e.stopPropagation();
		closeAllSelect(this);
		this.nextSibling.classList.toggle("select-hide");
		this.classList.toggle("select-arrow-active")
	});
}

function closeAllSelect(elmnt) {
  	/* A function that will close all select boxes in the document,
  	except the current select box: */
  	var x, y, i, arrNo = [];
  	x = document.getElementsByClassName("select-items");
  	y = document.getElementsByClassName("select-selected");
  	for (i = 0; i < y.length; i++) {
    	if (elmnt == y[i]) {
      		arrNo.push(i)
    	} 
    	else {
      		y[i].classList.remove("select-arrow-active");
    	}
  	}
  	for (i = 0; i < x.length; i++) {
    	if (arrNo.indexOf(i)) {
      		x[i].classList.add("select-hide");
    	}
  	}
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

//change navbar background when scrolling page
window.onscroll = function() {navBarScrollingEffect()};
function navBarScrollingEffect() {
	if (document.body.scrollTop >= 137 || document.documentElement.scrollTop >= 137) {
		document.getElementById("navBarWrapper").setAttribute("class", "scroll-nav-effect");
		document.getElementById("navBarWrapper").getElementsByTagName("div")[0].style.height = '55px';
		document.getElementById("navBarWrapper").getElementsByTagName("div")[0].style.paddingTop = '8px';
		//Change height for each ul#nav > li > a
		var a = document.getElementsByClassName("height-49px");
		for (var i = 0; i < a.length; i++) {
			a[i].classList.add("height-40px");
			a[i].classList.remove("height-49px");
		}
		//Change all div.sub-nav position
		var arrSubNav = document.getElementsByClassName("sub-nav");
		for (var i = 0; i < arrSubNav.length; i++) {
			arrSubNav[i].style.top = '42px';
		}
		/*Cause div#navBarWrapper > div height - 38px 
		so to keep element's flow stable we + 38px to div#header
		and all element's position in div#header -> a#collectionBtn top + 19px*/
		document.getElementById("header").style.height = '926px';
		document.getElementById("collectionBtn").style.top = '664px';
	}
	else {
		document.getElementById("navBarWrapper").removeAttribute("class");
		document.getElementById("navBarWrapper").getElementsByTagName("div")[0].style.height = '93px';
		document.getElementById("navBarWrapper").getElementsByTagName("div")[0].style.paddingTop = '38px';
		//Recover height for each ul#nav > li > a 
		var a = document.getElementsByClassName("height-40px")
		for (var i = 0; i < a.length; i++) {
			a[i].classList.add("height-49px");
			a[i].classList.remove("height-40px");
		}
		//Recover all div.sub-nav position
		var arrSubNav = document.getElementsByClassName("sub-nav");
		for (var i = 0; i < arrSubNav.length; i++) {
			arrSubNav[i].style.top = '51px';
		}
		/*Cause div#navBarWrapper > div height + 38px 
		so to keep element's flow stable we - 38px to div#header
		and all element's position in div#header -> a#collectionBtn top - 19px*/
		document.getElementById("header").style.height = '888px';
		document.getElementById("collectionBtn").style.top = '645px';
	}
}

//Keep {div.item-window > a}'s position when div.more-info:hover
var arrMoreInfo = document.getElementsByClassName("more-info");
for (var i = 0; i < arrMoreInfo.length; i++) {
	arrMoreInfo[i].onmouseover = function(e) {
		this.previousElementSibling.style.zIndex = '3';
	}
	arrMoreInfo[i].onmouseout = function(e) {
		this.previousElementSibling.style.zIndex = null;
	}
}