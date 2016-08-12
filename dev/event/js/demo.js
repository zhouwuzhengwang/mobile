var testTouch = document.querySelector(".testTouch"),
	span = testTouch.querySelector("span");
testTouch.addEventListener("touchstart", function(e){
	console.log("touchstart", "x:" + e.touches[0].clientX + "; y:" + e.touches[0].clientY);
}, 0);
var touchY;
testTouch.addEventListener("touchmove", function(e){
	touchY = e.touches[0].clientY;
	console.log("touchmove", "x:" + e.touches[0].clientX + "; y:" + touchY);
	if(touchY <= this.offsetHeight - span.offsetHeight && touchY >= 0){
		span.style.left = e.touches[0].clientX + "px";
		span.style.top = touchY + "px";
	}
}, 0);
testTouch.addEventListener("touchend", function(e){
	console.log("touchend", "x:" + e.changedTouches[0].clientX + "; y:" + e.changedTouches[0].clientY);
	span.classList.add("rotate");
}, 0);
span.addEventListener("animationstart" , function(e){
	console.log(e.animationName);
	this.innerHTML = this.innerHTML + "6";
}, 0);
span.addEventListener("animationend" , function(){
	this.classList.remove("rotate");
	this.classList.add("scale");
}, 0);
span.addEventListener("transitionend" , function(e){
	console.log(e)
	this.classList.remove("scale");
	this.innerHTML = this.innerHTML.substring(0, this.innerHTML.length - 1);
}, 0);

ajax({
	type : "post",
	url : "http://www.ikindness.cn/api/test/post",
	data : {
		a : 2333,
		b : 666,
		c : "gg"
	},
	success : function(data){
		console.log(data);
	},
	error : function(err){
		console.log(err);
	}
});