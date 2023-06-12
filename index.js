var express = require("express");
var app = express();
const pingModule = require("ping");
var PORT = 3000;
  
// For parsing application/json
app.use(express.json());
  
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/url", (req, res, next) => {
 res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

const ping = async(host) => {
  const result = await pingModule.promise.probe(host);
  return {
    host: result.inputHost,
    numeric_host: result.numeric_host,
    alive: result.alive,
    ping: result.time?.toFixed(0),
  };
}

app.get("/:host", async(req, res, next) => {
  const host = req.params.host;
  res.json(await ping(host));
});

app.post("/", async(req, res, next) => {
  console.log(req.body);
  const hosts = req.body;
  const results = await Promise.all(hosts.map(async (host) => {
    return await ping(host);
  }));
  console.log(results);
  res.json(results);
});

app.listen(PORT , () => {
  console.log(`Server running on http://localhost:3000`);
});