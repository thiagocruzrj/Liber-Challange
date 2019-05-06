const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Conectando do DB
connectDB();

// Inicializando o Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Definindo rotas
app.use('/api/cadastro', require('./routes/api/cadastro'));
app.use('/api/login', require('./routes/api/login'));
app.use('/api/request', require('./routes/api/request'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
