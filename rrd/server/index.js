const express = require('express')
const { exec } = require("child_process");
const app = express()
const port = 3000



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/rtd0read1/:start", async (req, res) => {
    const timestamp = new Date().getTime();
    const now = parseInt(timestamp / 1000) - 2

    exec(`bash ../bash/fetchAvg.sh ${req.params.start} ${now}`,

    (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        
        const series = stdout.split("\n");
        const newSeries = []
        series.forEach(obj => {
          const entry = obj.split(": ")
          newSeries.push({
            timestmamp: entry[0],
            value: parseFloat(entry[1])
          })
        })

        res.status(200).json({ rtd0read1: newSeries });
    });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})