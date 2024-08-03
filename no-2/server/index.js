const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/wiki', async (req, res) => {
  try {
    const response = await axios.get('https://id.wikipedia.org/wiki/Daftar_kabupaten_di_Indonesia');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
