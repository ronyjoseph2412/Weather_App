let unit = "metric";
let str1 = "";
function toggle() {
    if (document.getElementById("unit").innerHTML === "℃") {
        unit = "imperial";
        document.getElementById("unit").innerHTML = "℉";
        str1 = document.getElementById("cityname").innerHTML;
        get_all_details_toggled(unit, str1);
    }
    else if (document.getElementById("unit").innerHTML === "℉") {
        unit = "metric";
        document.getElementById("unit").innerHTML = "℃";
        str1 = document.getElementById("cityname").innerHTML;
        get_all_details_toggled(unit, str1);
    }
}
function get_all_details_toggled(unit, x) {

    var str = x;
    // Fetching the Data
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + String(str) + "&units=" + unit + "&appid=dc22a8c7538e87bce18f93851b68637c";
    fetch(url).then(response => response.json()).then(data => dispaly_weather_details(data));
    function dispaly_weather_details(data) {
        document.getElementById("cityname").innerHTML = data["name"];
        document.getElementsByClassName("current-temp")[0].innerHTML = data["main"]["temp"];
        document.getElementsByClassName("current-temp")[1].innerHTML = data["main"]["temp"];
        document.getElementsByClassName("max-temp")[0].innerHTML = data["main"]["temp_max"];
        document.getElementsByClassName("max-temp")[0].innerHTML = data["main"]["temp_max"];
        document.getElementsByClassName("max-temp")[1].innerHTML = data["main"]["temp_max"];
        document.getElementsByClassName("min-temp")[0].innerHTML = data["main"]["temp_min"];
        document.getElementsByClassName("min-temp")[1].innerHTML = data["main"]["temp_min"];
        document.getElementById("feels-like").innerHTML = data["main"]["feels_like"];
        var str = data["weather"][0]["description"];
        var description = str.charAt(0).toUpperCase() + str.slice(1);
        document.getElementById("description").innerHTML = description;
        document.getElementById("wind-speed").innerHTML = data["wind"]["speed"];
        document.getElementById("humidity").innerHTML = data["main"]["humidity"];
        d = new Date();
        utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        today_date = new Date(utc + (1000 * data["timezone"]));
        if ((String(today_date.getHours()).length) === 1) {
            hours = "0" + today_date.getHours()
        }
        else {
            hours = today_date.getHours();
        }
        if ((String(today_date.getMinutes()).length) === 1) {
            minutes = "0" + today_date.getMinutes()
        }
        else {
            minutes = today_date.getMinutes();
        }
        time_now = hours + ":" + minutes;
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = month[today_date.getMonth()] + " " + today_date.getDate() + ", " + today_date.getFullYear();
        document.getElementById("time").innerHTML = time_now;
        document.getElementById("date").innerHTML = date;
        document.getElementById("time-sm").innerHTML = time_now;
        document.getElementById("date-sm").innerHTML = date;
        // Sun set Sunrise
        d = new Date();
        let sunrise = data["sys"]["sunrise"] * 1000 + (d.getTimezoneOffset() * 60000);
        sunrise = new Date(sunrise + (1000 * data["timezone"]));
        if ((String(sunrise.getMinutes()).length) === 1) {
            sunrise_minutes = "0" + sunrise.getMinutes()
        }
        else {
            sunrise_minutes = sunrise.getMinutes();
        }
        let sunrise_time = "0" + sunrise.getHours() + ":" + sunrise_minutes;
        let sunset = data["sys"]["sunset"] * 1000 + (d.getTimezoneOffset() * 60000);
        sunset = new Date(sunset + (1000 * data["timezone"]));
        if ((String(sunset.getMinutes()).length) === 1) {
            sunset_minutes = "0" + sunset.getMinutes()
        }
        else {
            sunset_minutes = sunset.getMinutes();
        }
        let sunset_time = sunset.getHours() + ":" + sunset_minutes;
        document.getElementById("sunrise-time").innerHTML = sunrise_time;
        document.getElementById("sunset-time").innerHTML = sunset_time;

        let weather_main = data["weather"][0]["main"];
        let weahter_details = data["weather"][0]["description"];
        var morning_hours = [6,7,8,9,10,11,12,13,14,15,16,17];
        var night_hours = [18,19,20,21,22,23,0,1,2,3,4,5];
        function checkValue(value, arr) {
            var status = false;
            for (var i = 0; i < arr.length; i++) {
                var name = arr[i];
                if (name == value) {
                    status = true;
                    break;
                }
            }
            return status;
        }
        find_weather(weather_main, weahter_details);
        function find_weather(weather_main, weahter_details) {
            if (weather_main === "Clouds") {
                if (checkValue(today_date.getHours(),morning_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/cloudsmorning.gif';
                }
                else if (checkValue(today_date.getHours(),night_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/cloudsnight.gif';
                }
                else {
                    document.getElementById('descriptionimg').src = '/assets/clouds.gif';
                }
            }
            else if (weather_main === "Clear") {
                if (checkValue(today_date.getHours(),morning_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/clearmorning.gif';
                }
                else if (checkValue(today_date.getHours(),night_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/clearnight.gif';
                }
            }
            else if (weather_main === "Mist") {
                document.getElementById('descriptionimg').src = '/assets/mist.gif';
            }
            else if (weather_main === "Squall" || weather_main === "Tornado" || weather_main === "Ash" || weather_main === "Dust" || weather_main === "Sand") {
                document.getElementById('descriptionimg').src = '/assets/whirlwind.gif';
            }
            else if (weather_main === "Smoke" || weather_main === "Haze") {
                console.log("hey");
                document.getElementById('descriptionimg').src = '/assets/smoke.svg';
            }
            else if (weather_main === "Fog") {
                if (checkValue(today_date.getHours(),morning_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/foggymorning.svg';
                }
                else if (checkValue(today_date.getHours(),night_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/foggynight.svg';
                }
            }
            else if (weather_main === "Snow") {
                if (weahter_details === "Light rain and snow" || weahter_details === "Rain and snow" || weahter_details === "Shower snow" || weahter_details === "Heavy shower snow" || weahter_details === "light shower snow") {
                    document.getElementById('descriptionimg').src = '/assets/snowcloud.gif';
                }
                else if (weahter_details === "Heavy snow") {
                    document.getElementById('descriptionimg').src = '/assets/snowflake.gif';
                }
                else {
                    document.getElementById('descriptionimg').src = '/assets/snow.gif';
                }
            }
            else if (weather_main === "Rain") {
                if (weahter_details === "light intensity shower rain" || weahter_details === "shower rain" || weahter_details === "heavy intensity shower rain" || weahter_details === "ragged shower rain") {
                    document.getElementById('descriptionimg').src = '/assets/rainsnow.gif';
                }
                else if (checkValue(today_date.getHours(),morning_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/rainmorning.gif';
                }
                else {
                    document.getElementById('descriptionimg').src = '/assets/rain.gif';
                }
            }
            else if (weather_main === "Drizzle") {
                document.getElementById('descriptionimg').src = '/assets/drizzle.gif';
            }
            else if (weather_main === "Thunderstorm") {
                if (weahter_details === "thunderstorm" || weahter_details === "heavy thunderstorm") {
                    document.getElementById('descriptionimg').src = '/assets/thunder.gif';
                }
                else {
                    document.getElementById('descriptionimg').src = '/assets/thunderstorm.gif';
                }
            }

        }
    }

}

function get_all_details() {
    var entered_city = document.getElementById("enteredcity");
    var str = entered_city.value;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + String(str) + "&units=" + unit + "&appid=dc22a8c7538e87bce18f93851b68637c";
    fetch(url).then(response => response.json()).then(data => dispaly_weather_details(data));
    function dispaly_weather_details(data) {
        document.getElementById("cityname").innerHTML = data["name"];
        document.getElementsByClassName("current-temp")[0].innerHTML = data["main"]["temp"];
        document.getElementsByClassName("current-temp")[1].innerHTML = data["main"]["temp"];
        document.getElementsByClassName("max-temp")[0].innerHTML = data["main"]["temp_max"];
        document.getElementsByClassName("max-temp")[0].innerHTML = data["main"]["temp_max"];
        document.getElementsByClassName("max-temp")[1].innerHTML = data["main"]["temp_max"];
        document.getElementsByClassName("min-temp")[0].innerHTML = data["main"]["temp_min"];
        document.getElementsByClassName("min-temp")[1].innerHTML = data["main"]["temp_min"];
        document.getElementById("feels-like").innerHTML = data["main"]["feels_like"];
        var str = data["weather"][0]["description"];
        var description = str.charAt(0).toUpperCase() + str.slice(1);
        document.getElementById("description").innerHTML = description;
        document.getElementById("wind-speed").innerHTML = data["wind"]["speed"];
        document.getElementById("humidity").innerHTML = data["main"]["humidity"];
        d = new Date();
        utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        today_date = new Date(utc + (1000 * data["timezone"]));
        if ((String(today_date.getHours()).length) === 1) {
            hours = "0" + today_date.getHours()
        }
        else {
            hours = today_date.getHours();
        }
        if ((String(today_date.getMinutes()).length) === 1) {
            minutes = "0" + today_date.getMinutes()
        }
        else {
            minutes = today_date.getMinutes();
        }
        time_now = hours + ":" + minutes;
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = month[today_date.getMonth()] + " " + today_date.getDate() + ", " + today_date.getFullYear();
        document.getElementById("time").innerHTML = time_now;
        document.getElementById("date").innerHTML = date;
        document.getElementById("time-sm").innerHTML = time_now;
        document.getElementById("date-sm").innerHTML = date;
        // Sun set Sunrise
        d = new Date();
        let sunrise = data["sys"]["sunrise"] * 1000 + (d.getTimezoneOffset() * 60000);
        sunrise = new Date(sunrise + (1000 * data["timezone"]));
        if ((String(sunrise.getMinutes()).length) === 1) {
            sunrise_minutes = "0" + sunrise.getMinutes()
        }
        else {
            sunrise_minutes = sunrise.getMinutes();
        }
        let sunrise_time = "0" + sunrise.getHours() + ":" + sunrise_minutes;
        let sunset = data["sys"]["sunset"] * 1000 + (d.getTimezoneOffset() * 60000);
        sunset = new Date(sunset + (1000 * data["timezone"]));
        if ((String(sunset.getMinutes()).length) === 1) {
            sunset_minutes = "0" + sunset.getMinutes()
        }
        else {
            sunset_minutes = sunset.getMinutes();
        }
        let sunset_time = sunset.getHours() + ":" + sunset_minutes;
        document.getElementById("sunrise-time").innerHTML = sunrise_time;
        document.getElementById("sunset-time").innerHTML = sunset_time;

        let weather_main = data["weather"][0]["main"];
        let weahter_details = data["weather"][0]["description"];
        var morning_hours = [6,7,8,9,10,11,12,13,14,15,16,17];
        var night_hours = [18,19,20,21,22,23,0,1,2,3,4,5];
        function checkValue(value, arr) {
            var status = false;
            for (var i = 0; i < arr.length; i++) {
                var name = arr[i];
                if (name == value) {
                    status = true;
                    break;
                }
            }
            return status;
        }
        find_weather(weather_main, weahter_details);
        function find_weather(weather_main, weahter_details) {
            if (weather_main === "Clouds") {
                if (checkValue(today_date.getHours(),morning_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/cloudsmorning.gif';
                }
                else if (checkValue(today_date.getHours(),night_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/cloudsnight.gif';
                }
                else {
                    document.getElementById('descriptionimg').src = '/assets/clouds.gif';
                }
            }
            else if (weather_main === "Clear") {
                if (checkValue(today_date.getHours(),morning_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/clearmorning.gif';
                }
                else if (checkValue(today_date.getHours(),night_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/clearnight.gif';
                }
            }
            else if (weather_main === "Mist") {
                document.getElementById('descriptionimg').src = '/assets/mist.gif';
            }
            else if (weather_main === "Squall" || weather_main === "Tornado" || weather_main === "Ash" || weather_main === "Dust" || weather_main === "Sand") {
                document.getElementById('descriptionimg').src = '/assets/whirlwind.gif';
            }
            else if (weather_main === "Smoke" || weather_main === "Haze") {
                console.log("hey");
                document.getElementById('descriptionimg').src = '/assets/smoke.svg';
            }
            else if (weather_main === "Fog") {
                if (checkValue(today_date.getHours(),morning_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/foggymorning.svg';
                }
                else if (checkValue(today_date.getHours(),night_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/foggynight.svg';
                }
            }
            else if (weather_main === "Snow") {
                if (weahter_details === "Light rain and snow" || weahter_details === "Rain and snow" || weahter_details === "Shower snow" || weahter_details === "Heavy shower snow" || weahter_details === "light shower snow") {
                    document.getElementById('descriptionimg').src = '/assets/snowcloud.gif';
                }
                else if (weahter_details === "Heavy snow") {
                    document.getElementById('descriptionimg').src = '/assets/snowflake.gif';
                }
                else {
                    document.getElementById('descriptionimg').src = '/assets/snow.gif';
                }
            }
            else if (weather_main === "Rain") {
                if (weahter_details === "light intensity shower rain" || weahter_details === "shower rain" || weahter_details === "heavy intensity shower rain" || weahter_details === "ragged shower rain") {
                    document.getElementById('descriptionimg').src = '/assets/rainsnow.gif';
                }
                else if (checkValue(today_date.getHours(),morning_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/rainmorning.gif';
                }
                else {
                    document.getElementById('descriptionimg').src = '/assets/rain.gif';
                }
            }
            else if (weather_main === "Drizzle") {
                document.getElementById('descriptionimg').src = '/assets/drizzle.gif';
            }
            else if (weather_main === "Thunderstorm") {
                if (weahter_details === "thunderstorm" || weahter_details === "heavy thunderstorm") {
                    document.getElementById('descriptionimg').src = '/assets/thunder.gif';
                }
                else {
                    document.getElementById('descriptionimg').src = '/assets/thunderstorm.gif';
                }
            }

        }
    }
}

// let url="api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&units=metric&appid=dc22a8c7538e87bce18f93851b68637c";
function get_default_details() {
    let str = "Bengaluru";
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + String(str) + "&units=metric&appid=dc22a8c7538e87bce18f93851b68637c";
    fetch(url).then(response => response.json()).then(data => default_details(data));
    function default_details(data) {
        document.getElementById("cityname").innerHTML = data["name"];
        document.getElementsByClassName("current-temp")[0].innerHTML = data["main"]["temp"];
        document.getElementsByClassName("current-temp")[1].innerHTML = data["main"]["temp"];
        document.getElementsByClassName("max-temp")[0].innerHTML = data["main"]["temp_max"];
        document.getElementsByClassName("max-temp")[0].innerHTML = data["main"]["temp_max"];
        document.getElementsByClassName("max-temp")[1].innerHTML = data["main"]["temp_max"];
        document.getElementsByClassName("min-temp")[0].innerHTML = data["main"]["temp_min"];
        document.getElementsByClassName("min-temp")[1].innerHTML = data["main"]["temp_min"];
        document.getElementById("feels-like").innerHTML = data["main"]["feels_like"];
        let str = data["weather"][0]["description"];
        let description = str.charAt(0).toUpperCase() + str.slice(1);
        document.getElementById("description").innerHTML = description;
        document.getElementById("wind-speed").innerHTML = data["wind"]["speed"];
        document.getElementById("humidity").innerHTML = data["main"]["humidity"];

        // Sun-rise Sun-set settting
        d = new Date();
        let sunrise = data["sys"]["sunrise"] * 1000 + (d.getTimezoneOffset() * 60000);
        sunrise = new Date(sunrise + (1000 * data["timezone"]));
        if ((String(sunrise.getMinutes()).length) === 1) {
            sunrise_minutes = "0" + sunrise.getMinutes()
        }
        else {
            sunrise_minutes = sunrise.getMinutes();
        }
        let sunrise_time = "0" + sunrise.getHours() + ":" + sunrise_minutes;
        let sunset = data["sys"]["sunset"] * 1000 + (d.getTimezoneOffset() * 60000);
        sunset = new Date(sunset + (1000 * data["timezone"]));
        if ((String(sunset.getMinutes()).length) === 1) {
            sunset_minutes = "0" + sunset.getMinutes()
        }
        else {
            sunset_minutes = sunset.getMinutes();
        }
        let sunset_time = sunset.getHours() + ":" + sunset_minutes;
        document.getElementById("sunrise-time").innerHTML = sunrise_time;
        document.getElementById("sunset-time").innerHTML = sunset_time;

        // Date Setting
        d = new Date();
        utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        today_date = new Date(utc + (1000 * data["timezone"]));
        if ((String(today_date.getHours()).length) === 1) {
            hours = "0" + today_date.getHours()
        }
        else {
            hours = today_date.getHours();
        }
        if ((String(today_date.getMinutes()).length) === 1) {
            minutes = "0" + today_date.getMinutes()
        }
        else {
            minutes = today_date.getMinutes();
        }
        time_now = hours + ":" + minutes;
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = month[today_date.getMonth()] + " " + today_date.getDate() + ", " + today_date.getFullYear();
        document.getElementById("time").innerHTML = time_now;
        document.getElementById("date").innerHTML = date;
        document.getElementById("time-sm").innerHTML = time_now;
        document.getElementById("date-sm").innerHTML = date;
        // document.getElementById('descriptionimg').src = '/assets/cloudsmorning.gif';
        let weather_main = data["weather"][0]["main"];
        let weahter_details = data["weather"][0]["description"];
        var morning_hours = [6,7,8,9,10,11,12,13,14,15,16,17];
        var night_hours = [18,19,20,21,22,23,0,1,2,3,4,5];
        function checkValue(value, arr) {
            var status = false;
            for (var i = 0; i < arr.length; i++) {
                var name = arr[i];
                if (name == value) {
                    status = true;
                    break;
                }
            }
            return status;
        }
        find_weather(weather_main, weahter_details);
        function find_weather(weather_main, weahter_details) {
            if (weather_main === "Clouds") {
                if (checkValue(today_date.getHours(),morning_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/cloudsmorning.gif';
                }
                else if (checkValue(today_date.getHours(),night_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/cloudsnight.gif';
                }
                else {
                    document.getElementById('descriptionimg').src = '/assets/clouds.gif';
                }
            }
            else if (weather_main === "Clear") {
                if (checkValue(today_date.getHours(),morning_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/clearmorning.gif';
                }
                else if (checkValue(today_date.getHours(),night_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/clearnight.gif';
                }
            }
            else if (weather_main === "Mist") {
                document.getElementById('descriptionimg').src = '/assets/mist.gif';
            }
            else if (weather_main === "Squall" || weather_main === "Tornado" || weather_main === "Ash" || weather_main === "Dust" || weather_main === "Sand") {
                document.getElementById('descriptionimg').src = '/assets/whirlwind.gif';
            }
            else if (weather_main === "Smoke" || weather_main === "Haze") {
                console.log("hey");
                document.getElementById('descriptionimg').src = '/assets/smoke.svg';
            }
            else if (weather_main === "Fog") {
                if (checkValue(today_date.getHours(),morning_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/foggymorning.svg';
                }
                else if (checkValue(today_date.getHours(),night_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/foggynight.svg';
                }
            }
            else if (weather_main === "Snow") {
                if (weahter_details === "Light rain and snow" || weahter_details === "Rain and snow" || weahter_details === "Shower snow" || weahter_details === "Heavy shower snow" || weahter_details === "light shower snow") {
                    document.getElementById('descriptionimg').src = '/assets/snowcloud.gif';
                }
                else if (weahter_details === "Heavy snow") {
                    document.getElementById('descriptionimg').src = '/assets/snowflake.gif';
                }
                else {
                    document.getElementById('descriptionimg').src = '/assets/snow.gif';
                }
            }
            else if (weather_main === "Rain") {
                if (weahter_details === "light intensity shower rain" || weahter_details === "shower rain" || weahter_details === "heavy intensity shower rain" || weahter_details === "ragged shower rain") {
                    document.getElementById('descriptionimg').src = '/assets/rainsnow.gif';
                }
                else if (checkValue(today_date.getHours(),morning_hours)) {
                    document.getElementById('descriptionimg').src = '/assets/rainmorning.gif';
                }
                else {
                    document.getElementById('descriptionimg').src = '/assets/rain.gif';
                }
            }
            else if (weather_main === "Drizzle") {
                document.getElementById('descriptionimg').src = '/assets/drizzle.gif';
            }
            else if (weather_main === "Thunderstorm") {
                if (weahter_details === "thunderstorm" || weahter_details === "heavy thunderstorm") {
                    document.getElementById('descriptionimg').src = '/assets/thunder.gif';
                }
                else {
                    document.getElementById('descriptionimg').src = '/assets/thunderstorm.gif';
                }
            }

        }

    }

}