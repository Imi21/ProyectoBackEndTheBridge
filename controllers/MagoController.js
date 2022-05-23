const { Mago, Pedido } = require("../models/index.js");
const bcrypt = require('bcryptjs');

const MagoController = {
  create(req, res) {
    req.body.role = "user";
    const password = bcrypt.hashSync(req.body.password,10)
    Mago.create({...req.body, password:password })
    .then(mago => res.status(201).send({ message: 'Usuario mágico creado con éxito', mago }))
    .catch(console.error)
  },
  login(req,res){
    User.findOne({
    where:{
    email:req.body.email
    }
    }).then(mago=>{
    if(!mago){
    return res.status(400).send({message:"Mago o hechizo incorrectos"})
    }
    const isMatch = bcrypt.compareSync(req.body.password, mago.password);
    if(!isMatch){
    return res.status(400).send({message:"Mago o hechizo incorrectos"})
    }
    res.send(mago)
    })
  },
  async logout(req, res) {
      try {
        await Token.destroy({
        where: {
        [Op.and]: [
        { MagoId: req.mago.id },
        { token: req.headers.authorization }
        ]
        }
        });
        res.send({ message: 'Desconectado con éxito' })
      } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Hubo un problema al tratar de desconectarte' })
      }
  },
  getAll(req, res) {
    Mago.findAll({
      include: [Pedido],
    })
      .then((magos) => res.send(magos))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar los pedidos",
        });
      });
  },
  async delete(req, res) {
    try {
      await Mago.destroy({
        where: {
          id: req.params.id,
        },
      });
      await Pedido.destroy({
        where: {
          MagoId: req.params.id,
        },
      });
      res.send("Avada Kedavra");
    } catch (error) {
      console.log(err);
      res.status(500).send({
        message:
          "Ha habido un problema al eliminar el mago y sus pedidos",
      });
    }
  },
  async update(req, res) {
    await Mago.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send("Usuario mágico actualizado con éxito");
  },
};

module.exports = MagoController;