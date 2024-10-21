const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const timesRoutes = require('./routes/timesRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Rotas
app.use('/api', funcionarioRoutes); // Prefixo para as rotas de funcionário
app.use('/api', timesRoutes);

// Definindo a porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
