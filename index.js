/**
 * Created by MEMEME on 2016/11/13.
 */
window.onload=function(){
    //调用jsonp函数请求当前所在城市
    jsonp('https://api.map.baidu.com/api?v=2.0&ak=Dv1NMU23dh1sGS9n2tUouDEYY96Dfzh3&s=1&callback=getCity');
    //请求天气车数据
    btn.onclick=function (){
        jsonp(createUrl());
    }
};

function getCity(){
    function city(result){
        jsonp(createUrl(result.name));
    }
    var cityName = new BMap.LocalCity();
    cityName.get(city);
}

// 数据请求函数
function jsonp(url){
    var script = document.createElement('script');
    script.src = url;
    document.body.insertBefore(script, document.body.firstChild);
    document.body.removeChild(script);
}

//数据请求成功回调函数，用于将获取到的数据放入页面相应位置
function getWeather(response) {
    var oSpan = document.getElementsByClassName('info');
    var data = response.result.data;
    oSpan[0].innerHTML=data.realtime.city_name;
    oSpan[1].innerHTML=data.realtime.date;
    oSpan[2].innerHTML='星期'+data.weather[0].week;
    oSpan[3].innerHTML=data.realtime.weather.info;
    oSpan[4].innerHTML=data.realtime.weather.temperature+'℃';
    oSpan[5].innerHTML=data.realtime.wind.direct;
    oSpan[6].innerHTML=data.realtime.weather.humidity+'%';
    oSpan[7].innerHTML=data.realtime.time;
    oSpan[8].innerHTML=data.life.info.ziwaixian[0];
    oSpan[9].innerHTML=data.life.info.xiche[0];
    oSpan[10].innerHTML=data.life.info.kongtiao[0];
    oSpan[11].innerHTML=data.life.info.chuanyi[0];

    var aDiv = document.getElementsByClassName('future_box');
    for(var i=0; i<aDiv.length; i++){
        var aSpan = aDiv[i].getElementsByClassName('future_info');
        aSpan[0].innerHTML = data.weather[i].date;
        aSpan[1].innerHTML = '星期'+data.weather[i].week;
        aSpan[2].innerHTML =data.weather[i].info.day[1];
        aSpan[3].innerHTML = data.weather[i].info.day[2]+'℃';
    }

    changeImg(response);
}

//根据获取到的数据更改页面中相应的图片
function changeImg(data){
    var firstImg = document.getElementsByTagName("img")[0];
    var firstWeatherId=data.result.data.realtime.weather.img;
    chooseImg(firstWeatherId,firstImg);

    var aImg = document.getElementById('future_container').getElementsByTagName('img');
    for(var j=0; j<aImg.length; j++){
        var weatherId = data.result.data.weather[j].info.day[0];
        chooseImg(weatherId,aImg[j]);
    }
}

//选择图片
function chooseImg(id,index){
    switch(id){
        case '0':
            index.src='images/weather_icon/1.png';
            break;
        case '1':
            index.src='images/weather_icon/2.png';
            break;
        case '2':
            index.src='images/weather_icon/3.png';
            break;
        case '3':
        case '7':
        case '8':
            index.src='images/weather_icon/4.png';
            break;
        case '6':
            index.src='images/weather_icon/6.png';
            break;
        case '13':
        case '14':
        case '15':
        case '16':
            index.src='images/weather_icon/5.png';
            break;
        case '33':
            index.src='images/weather_icon/7.png';
            break;
        default:
            index.src='images/weather_icon/8.png';
    }
}

//根据城市名创建请求数据及url
function createUrl(){
    var cityName = '';
    if(arguments.length == 0) {
        cityName = document.getElementById('text').value;
    }else{
        cityName = arguments[0];
    }
    var url = 'https://op.juhe.cn/onebox/weather/query?cityname=' + encodeURI(cityName) + '&key=1053d001421b886dcecf81a38422a1a2&callback=getWeather';
    return url;
}