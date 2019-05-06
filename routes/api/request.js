const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Request = require('../../models/Request');
const Cadastro = require('../../models/Cadastro');

// @route POST api/request
// @desc  Create a request
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('description', 'Descrição é requerida')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const cadastro = await Cadastro.findById(req.cadastro.id).select(
        '-password'
      );
      const newRequest = new Request({
        cadastro: req.cadastro.id,
        subject_id: req.body.subject_id,
        date: req.body.date,
        time: req.body.time,
        description: req.body.description
      });
      const request = await newRequest.save();
      res.json(request);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/request
// @desc  Get all requests
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const request = await Request.find().sort({ date: -1 });
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/request/:id
// @desc  Get requests by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ msg: 'Request não encontrado' });
    }

    res.json(request);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Request não encontrado' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/request/:id
// @desc  Deleta a requests
// @access Private
router.delete('/>id', auth, async (req, res) => {
  try {
    const request = await Request.findById(req.param.id);

    if (!post) {
      return res.status(404).json({ msg: 'Request não encontrado' });
    }

    // Checando o usuário
    if (request.cadastro.toString !== req.cadastro.id) {
      return res.status(404).json({ msg: 'Usuário não autorizado' });
    }
    await request.remove();

    res.json({ msg: 'Post Removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Request não encontrado' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
