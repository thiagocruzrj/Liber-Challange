const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const Cadastro = require('../../models/Cadastro');

// @route POST api/cadastro
// @desc Register user
// @access Public
router.post(
  '/',
  [
    check('name', 'Nome é requerido')
      .not()
      .isEmpty(),
    check('name', 'Nome com no máximo 20 digitos').isLength({ max: 20 }),

    check('email', 'Por favor, insira um E-mail válido').isEmail(),
    check('email', 'E-mail é requerido')
      .not()
      .isEmpty(),

    check('password', 'Entre com uma senha com no máximo 10 digitos').isLength({
      max: 10
    }),
    check('password', 'A senha é é requerida')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Verificando se o usuário existe
      let cadastro = await Cadastro.findOne({ email });
      if (cadastro) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Cadastro já existe!' }] });
      }

      // Get usuários com gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      cadastro = new Cadastro({
        name,
        email,
        password,
        avatar
      });

      // Encriptando senha
      const salt = await bcrypt.genSalt(10);
      cadastro.password = await bcrypt.hash(password, salt);

      await cadastro.save();

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
