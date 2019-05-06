const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const Cadastro = require('../../models/Cadastro');

// @route GET api/login
// @desc Test route
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const cadastro = await Cadastro.findById(req.cadastro.id).select(
      '-password'
    );
    res.json(cadastro);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/login
// @desc Auth user and get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Por favor, insira um E-mail válido').isEmail(),
    check('password', 'A senha é requerida').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Verificando se o usuário existe
      let cadastro = await Cadastro.findOne({ email });
      if (!cadastro) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Credenciais inválidas' }] });
      }

      const isMatch = await bcrypt.compare(password, cadastro.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Credenciais inválidas' }] });
      }

      // Retornando JsonWebToken
      const payload = {
        cadastro: {
          id: cadastro.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
