document.getElementById('get-weather').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('city').value;
    if (city === "") {
        alert("Şehir İsmi Giriniz");
        return;
    }

    const apiKey = "API_KEY"; // OpenWeatherMap API anahtarınızı buraya ekleyin
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // API yanıtını konsola yazdırıyoruz
            if (data.cod === "404") {
                alert("Şehir bulunamadı!");
                return;
            }

            // API'den gelen veri doğru formatta ise işlem yapılır
            if (data && data.sys && data.sys.country) {
                const weatherInfo = `
                    <div class="weather-details">
                        <h2>${data.name}, ${data.sys.country}</h2>
                        <p>Hava Durumu: ${data.weather[0].description}</p>
                        <p>Sıcaklık: ${data.main.temp}°C</p>
                        <p>Nem: ${data.main.humidity}%</p>
                        <p>Rüzgar Hızı: ${data.wind.speed} m/s</p>
                    </div>
                `;
                document.getElementById('weather-info').innerHTML = weatherInfo;
                document.getElementById('weather-info').style.display = 'block';
            } else {
                alert("Veri işlenemedi. Lütfen tekrar deneyin.");
            }
        })
        .catch(error => {
            alert("Bir hata oluştu! Lütfen tekrar deneyin.");
            console.error(error);
        });
}