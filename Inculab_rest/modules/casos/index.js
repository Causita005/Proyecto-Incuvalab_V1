
//initJSfotos
import { deleteFiles } from "../storageGoogle/index.js";
//endJSfotos
import express from 'express';
import { auth_required, getAll, getDocument } from '../../utils/index.js';
import { convertToOr, getQueryDate } from '../../utils/database.js';
import User from '../user/model.js';
import Casos from './model.js';
//imports
const routes = express.Router();

async function searchCasos(searchParams) {
  let query = {};
  if (searchParams?.all) searchParams = {
    all: searchParams?.all,
    //initJStitulo
titulo: searchParams?.all,
//endJStitulo
//initJSdescripcion
descripcion: searchParams?.all,
//endJSdescripcion
//initJSfotos
fotos: searchParams?.all,
//endJSfotos
//initJSvideos
videos: searchParams?.all,
//endJSvideos



//initJSetiquetas
etiquetas: searchParams?.all,
//endJSetiquetas
//fieldsSearch
    createdAt: searchParams?.all,
    updatedAt: searchParams?.all,
  }
  //initJStitulo
if (searchParams?.titulo) query.titulo = { $regex: searchParams.titulo, $options: 'i' };

//endJStitulo
//initJSdescripcion
if (searchParams?.descripcion) query.descripcion = { $regex: searchParams.descripcion, $options: 'i' };

//endJSdescripcion





//initJSetiquetas
if (searchParams?.etiquetas) query.etiquetas = { $regex: searchParams.etiquetas, $options: 'i' };

//endJSetiquetas
//ifSearch
  if (searchParams?.last_user) {
    let id = await User.findOne({ name: { $regex: searchParams.last_user, $options: 'i' } }).exec()._id;
    if (id) query.last_user = { $in: id };
  }
  if (searchParams?.createdAt) {
    const date = getQueryDate(searchParams.createdAt);
    if (date) query.createdAt = date;
  }
  if (searchParams?.updatedAt) {
    const date = getQueryDate(searchParams.updatedAt);
    if (date) query.updatedAt = date;
  }
  if (searchParams?.all) query = convertToOr(query);
  return query;
}

//GET
routes.post('/list', async function (req, res) {
  if (!auth_required(req, res, ['read_casos'], false)) return;
  if (req?.body?.query?.search) req.body.query.find = {
    ...req.body.query.find,
    ...await searchCasos(req?.body?.query?.search)
  }
  const query = await getAll(Casos, req, res);
  if (query) return res.status(200).json(query);
});

routes.post('/read', async function (req, res) {
  if (!auth_required(req, res, ['read_casos'], false)) return;
  const query = await getDocument(Casos, req, res);
  if (query) delete query._doc.password;
  if (query) return res.status(200).json(query);
});

//POST
routes.post('/create', async function (req, res) {
  if (!auth_required(req, res, ['create_casos'], false)) return;
  try {
    var { casos } = req.body;
    //validadores
    casos.last_user = req.currentUser.id;
    //extrasCreate
    var query = await new Casos(casos).save();
    return res.status(200).json(query);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});

//PUT
routes.put('/update/:id', async function (req, res) {
  if (!auth_required(req, res, ['update_casos'], false)) return;
  const { id } = req.params;
  try {
    var { casos } = req.body;
    casos.last_user = req.currentUser.id;
    //extrasUpdate
    const document = await Casos.findByIdAndUpdate(id, {
      $set: casos
    }, { new: true });
    if (!document) {
      return res.status(404).json({ message: "Documento no encontrado" });
    }
    return res.status(200).json(document);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});

//DELETE
routes.delete('/delete/:id', async function (req, res) {
  if (!auth_required(req, res, ['delete_casos'], false)) return;
  const { id } = req.params;
  try {
    const casos = await Casos.findById(id);
    

//initJSfotos
await deleteFiles(casos?.fotos);
//endJSfotos
//initJSvideos
await deleteFiles(casos?.videos);
//endJSvideos




//extrasDelete
    await Casos.deleteOne({ _id: id });
    return res.status(200).json({ message: "Casos Delete" })
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});

export default routes;