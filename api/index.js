require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/salesTax', async (req, res) => {
  const { city, state } = req.body;
  city.replace(' ', '-');
  const zipCodeRes = await axios.get(
    `https://app.zipcodebase.com/api/v1/code/city?apikey=${process.env.ZIPCODEBASE_API_KEY}&city=${city}&state_name=${state}&country=us`
  );
  const zipCode = zipCodeRes.data.results[0];

  console.log(zipCodeRes);

  const taxjarRes = await axios.get(
    `https://api.taxjar.com/v2/rates/${zipCode}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TAXJAR_API_KEY}`,
      },
    }
  );
  res.status(200).send(taxjarRes.data.rate.combined_rate);
});

app.listen(4001, () => {
  console.log('magic happening on port 4001');
});
