window.onload = function(){
	waterfall("container","box");
	window.onscroll = function () {
		var dataInt = {"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},
					  {"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},
					  {"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},
					  {"src":"11.jpg"},{"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},
					  {"src":"15.jpg"},{"src":"16.jpg"},{"src":"17.jpg"},{"src":"18.jpg"},
					  {"src":"19.jpg"},{"src":"20.jpg"},{"src":"21.jpg"},{"src":"22.jpg"},
					  {"src":"23.jpg"}]};
		if(checkScrollSlide)
		{	var oParent = document.getElementById("container");
		   for(var i = 0;i<dataInt.data.length;i++)
			{	
				var oBox = document.createElement("div");
					oBox.className = "box";
					oParent.appendChild(oBox);

				var oPic = document.createElement("div");
					oPic.className = "pic";
					oBox.appendChild(oPic);
				var oImg = document.createElement("img");
					oImg.src = "images/"+dataInt.data[i].src;		
				oPic.appendChild(oImg);
            }
            waterfall("container","box");
		}
	}
}
function waterfall(parent,box){
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent,box);
	//计算页面的列数，先知道总

	var oBox = oBoxs[0].offsetWidth;
	console.log(oBox);

	var col = Math.floor(document.documentElement.clientWidth/oBox);
	//设置container的宽
	oParent.style.cssText = "width:"+(oBox*col)+"px;margin:0 auto";
	var hArr = [];//存放第一行的高度，需要求最矮的，然后定位第七张
	for(var i = 0;i<oBoxs.length;i++){
		if(i<col)
		{
		hArr.push(oBoxs[i].offsetHeight);
	    }
	    else{
	   		var minH = Math.min.apply(null,hArr);
	   		console.log(minH);//找到高度最小的，
	   		var index = getIndex(hArr,minH);
	   		//找到最小的在第一排的位置，然后求它在页面的位置
	   		oBoxs[i].style.position = "absolute";
	   		oBoxs[i].style.top = minH + "px";
	   		oBoxs[i].style.left = (index*oBox) + "px";
	   		//第2种方法oBoxs[i].style.left = oBoxs[index].offsetWidth+"px";
	   		//然后最矮的图片的高度就得改变了
	   		hArr[index] += oBoxs[i].offsetHeight;
	    }
	}
}
function getByClass(parent,claName){
	//用来存取所以为class=box的元素
	var arrBox = new Array();
	oElements = parent.getElementsByTagName("*");
	for(var i = 0;i<oElements.length;i++)
	{
		if(oElements[i].className == claName)
			arrBox.push(oElements[i]);
	}
	return arrBox;
}
function getIndex(hArr,minH){
	for(var i = 0;i<hArr.length;i++){
		if(hArr[i] == minH)
			return i;
	}
}
//判断是否具备了滚动数据块的条件
function checkScrollSlide(){
	var oParent = document.getElementById("container");
	var oBoxs = oParent.getElementsByTagName("box");
	var height = oBoxs[length-1].offsetTop+Math.floor(oBoxs[length-1].offsetHeight/2);
	console.log(height);
	var scrollH = document.body.scrollTop||document.documentElement.scrollTop;
	var browH = document.body.clientHeight||document.documentElement.clientHeight;
	return height<(scrollH+browH)?true:false;
}