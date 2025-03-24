const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

function fetchSeries(stdout) {
    const series = stdout.split("\n");
    const newSeries = []
    series.forEach(obj => {
      const entry = obj.split(": ")
      newSeries.push({
        timestmamp: entry[0],
        value: parseFloat(entry[1])
      })
    })
    return newSeries
}

/**------------------------------------------------------------------
 * Routes
 * ------------------------------------------------------------------
 */
router.get("/timeseries", async (req, res) => {
    res.status(200).send('<h3>Welcome to the timeseries section</h3>')
});
  
router.get("/rtd0read1/:start", async (req, res) => {
    const timestamp = new Date().getTime();
    const now = parseInt(timestamp / 1000) - 2
    // const now = parseInt(timestamp) - 2
  
    exec(`bash ../scripts/fetchAvg.sh ${req.params.start} ${now}`,
  
    (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        
        const newSeries = fetchSeries(stdout)
  
        res.status(200).json({ rtd0read1: newSeries });
    });
});

module.exports = router;
