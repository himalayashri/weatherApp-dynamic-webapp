const http = require("http");
const fs = require("fs");
const requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");

let city = "indore";

const replaceValue = (tempValue, orgValue) => {
  //    let temperature = tempValue.replace("{%tempval%}", (((orgValue.main.temp)-32)*5/9).toFixed(2));
  //  temperature = temperature.replace("{%tempmin%}", (((orgValue.main.temp_min)-32)*5/9).toFixed(2));
  //  temperature = temperature.replace("{%tempmax%}", (((orgValue.main.temp_max)-32)*5/9).toFixed(2));
  let temperature = tempValue.replace("{%tempval%}", orgValue.main.temp);
  temperature = temperature.replace("{%tempmin%}", orgValue.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", orgValue.main.temp_max);
  temperature = temperature.replace("{%location%}", orgValue.name);
  temperature = temperature.replace("{%country%}", orgValue.sys.country);
  temperature = temperature.replace("{%tempStatus%}", orgValue.weather[0].main);

  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5d763cf5eda30cc7b790b352b0134ef8&units=metric`
    )
      .on("data", (chunk) => {
        const objData = JSON.parse(chunk);
        const arrData = [objData];
        //   console.log(arrData[0].main.temp);
        const realTimeData = arrData
          .map((val) => replaceValue(homeFile, val))
          .join("");

        // const realTimeData = homeFile.replace("{%tempval%}", arrData[0].main.temp).replace("{%tempmin%}", arrData[0].main.temp_min).replace("{%tempmax%}", arrData[0].main.temp_max).replace("{%location%}", arrData[0].name).replace("{%country%}", arrData[0].sys.country);
        res.write(realTimeData);

        // console.log(realTimeData)
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
      });
  }
});

server.listen(3000, "127.0.0.1");
