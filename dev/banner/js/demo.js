function Banner(option){
	var position = option.position,
		option = option.option,
		adLen = option.length,
		arrAd,
		arrButton,
		previousIndex = adLen - 1,
		currentIndex = 0,
		nextIndex = 1,
		bannerWidth,
		timer;
	function createBanner(){
		var fragment = document.createDocumentFragment();
		arrAd = option.map(function(list, index){
			var ad = document.createElement("a");
			ad.title = list.name;
			ad.href = list.anchorHref;
			ad.style.backgroundImage = "url(" + list.imageUrl + ")";
			fragment.appendChild(ad);
			var startX,
				startT,
				distance,
				direction;
			ad.addEventListener("touchstart", function(e){
				clearInterval(timer);
				startT = Date.now();
				distance = 0;
				currentIndex = index;
				previousIndex = getIndex("previous");
				nextIndex = getIndex();
				startX = e.touches[0].clientX;
			}, 0);
			ad.addEventListener("touchmove", function(e){
				distance = e.touches[0].clientX - startX;
				direction = distance > 0;
				this.style.left = distance + "px";
				if(direction){
					arrAd[previousIndex].style.left = distance - bannerWidth + "px";
					arrAd[nextIndex].style.left = null;
				}else{
					arrAd[previousIndex].style.left = null;
					arrAd[nextIndex].style.left = distance + bannerWidth + "px";
				}
			}, 0);
			ad.addEventListener("touchend", function(e){
				if(Math.abs(distance) > bannerWidth / 2 || Date.now() - startT < 300){
					if(direction){
						nextIndex = currentIndex;
						currentIndex = getIndex("previous");
						previousIndex = getIndex("previous");
					}else{
						previousIndex = currentIndex;
						currentIndex = getIndex();
						nextIndex = getIndex();
					}
					this.classList.add(direction ? "ltr" : "rtl");
					arrAd[currentIndex].classList.add("init");
				}else{
					this.classList.add("init");
					if(direction){
						arrAd[previousIndex].classList.add("rtl");
					}else{
						arrAd[nextIndex].classList.add("ltr");
					}
				}
				autoChange();
			}, 0);
			ad.addEventListener("animationend", function(e){
				if(e.animationName === "current"){
					arrAd[currentIndex].classList.remove("current");
					arrAd[currentIndex].style.left = 0;
				}
				if(e.animationName === "previous"){
					arrAd[previousIndex].classList.remove("previous");
					arrAd[previousIndex].style.left = bannerWidth + "px";
				}
				if(e.animationName === "ltr"){
					arrAd[nextIndex].style.left = null;
					arrAd[nextIndex].classList.remove("ltr");
					arrAd[currentIndex].classList.remove("init");
					arrButton[nextIndex].classList.remove("current");
					arrButton[currentIndex].classList.add("current");
				}
				if(e.animationName === "rtl"){
					arrAd[previousIndex].style.left = bannerWidth + "px";
					arrAd[previousIndex].classList.remove("rtl");
					arrAd[currentIndex].classList.remove("init");
					arrButton[previousIndex].classList.remove("current");
					arrButton[currentIndex].classList.add("current");
				}
				if(e.animationName === "init"){
					arrAd[currentIndex].style.left = 0;
				}
			}, 0);
			return ad;
		});
		position.appendChild(fragment);
	}
	function getIndex(type){
		var index;
		if(type === "previous"){
			index = currentIndex > 0 ? currentIndex - 1 : adLen - 1;
		}else{
			index = currentIndex > adLen - 2 ? 0 : currentIndex + 1;
		}
		return index;
	}
	function createIndicator(){
		var indicator = document.createElement("div");
		indicator.className = "indicator";
		arrButton = option.map(function(list, index){
			var button = document.createElement("em");
			button.appendChild(document.createTextNode(index + 1));
			indicator.appendChild(button);
			button.addEventListener("touchend", function(){
				previousIndex = currentIndex;
				currentIndex = index;
				setView();
				this.classList.add("current");
			}, 0);
			return button;
		});
		arrButton[0].classList.add("current");
		position.appendChild(indicator);
	}
	function setView(){
		arrAd[previousIndex].classList.remove("current");
		arrAd[previousIndex].classList.add("previous");
		arrAd[currentIndex].classList.remove("previous");
		arrAd[currentIndex].classList.add("current");
		arrButton[previousIndex].classList.remove("current");
		arrButton[currentIndex].classList.add("current");
	}
	function autoChange(){
		timer = setInterval(function(){
			previousIndex = currentIndex;
			currentIndex = getIndex();
			nextIndex = getIndex();
			setView();
		}, 4000);
	}
	createBanner();
	bannerWidth = arrAd[0].offsetWidth;
	createIndicator();
	autoChange();
}
var banner = document.querySelector(".banner");
ajax({
	url : "http://www.ikindness.cn/api/test/get",
	success : function(data){
		new Banner({
			position : banner,
			option : data.data
		});
	}
});