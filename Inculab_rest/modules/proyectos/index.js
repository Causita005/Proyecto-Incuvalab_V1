//initJSpropietario
import User from "../user/model.js";
//endJSpropietario
//initJSfotos
import { deleteFiles } from "../storageGoogle/index.js";
//endJSfotos
import express from 'express';
import { auth_required, getAll, getDocument } from '../../utils/index.js';
import { convertToOr, getQueryDate } from '../../utils/database.js';
import Proyectos from './model.js';
//imports
const routes = express.Router();

async function searchProyectos(searchParams) {
  let query = {};
  if (searchParams?.all) searchParams = {
    all: searchParams?.all,
    //initJStitulo_proyecto
titulo_proyecto: searchParams?.all,
//endJStitulo_proyecto
//initJSdescripcion
descripcion: searchParams?.all,
//endJSdescripcion
//initJSfotos
fotos: searchParams?.all,
//endJSfotos
//initJSvideo
video: searchParams?.all,
//endJSvideo
//initJSpropietario
propietario: searchParams?.all,
//endJSpropietario
//fieldsSearch
    createdAt: searchParams?.all,
    updatedAt: searchParams?.all,
  }
  //initJStitulo_proyecto
if (searchParams?.titulo_proyecto) query.titulo_proyecto = { $regex: searchParams.titulo_proyecto, $options: 'i' };

//endJStitulo_proyecto
//initJSdescripcion
if (searchParams?.descripcion) query.descripcion = { $regex: searchParams.descripcion, $options: 'i' };

//endJSdescripcion


//initJSpropietario

            if (searchParams?.propietario) {
                let list = await User.find({ name: { $regex: searchParams.propietario, $options: 'i' }}).exec();
                list = list.map(l => l._id);
                if (list.length > 0) query.propietario = { $in: list };
            }
            
//endJSpropietario
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
  if (!auth_required(req, res, ['read_proyectos'], false)) return;
  if (req?.body?.query?.search) req.body.query.find = {
    ...req.body.query.find,
    ...await searchProyectos(req?.body?.query?.search)
  }
  const query = await getAll(Proyectos, req, res);
  if (query) return res.status(200).json(query);
});

routes.post('/read', async function (req, res) {
  if (!auth_required(req, res, ['read_proyectos'], false)) return;
  const query = await getDocument(Proyectos, req, res);
  if (query) delete query._doc.password;
  if (query) return res.status(200).json(query);
});

//POST
routes.post('/create', async function (req, res) {
  if (!auth_required(req, res, ['create_proyectos'], false)) return;
  try {
    var { proyectos } = req.body;
    //validadores
    proyectos.last_user = req.currentUser.id;
    //extrasCreate
    var query = await new Proyectos(proyectos).save();
    return res.status(200).json(query);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});

//PUT
routes.put('/update/:id', async function (req, res) {
  if (!auth_required(req, res, ['update_proyectos'], false)) return;
  const { id } = req.params;
  try {
    var { proyectos } = req.body;
    proyectos.last_user = req.currentUser.id;
    //extrasUpdate
    const document = await Proyectos.findByIdAndUpdate(id, {
      $set: proyectos
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
  if (!auth_required(req, res, ['delete_proyectos'], false)) return;
  const { id } = req.params;
  try {
    const proyectos = await Proyectos.findById(id);
    

//initJSfotos
await deleteFiles(proyectos?.fotos);
//endJSfotos
//initJSvideo
await deleteFiles(proyectos?.video);
//endJSvideo

//extrasDelete
    await Proyectos.deleteOne({ _id: id });
    return res.status(200).json({ message: "Proyectos Delete" })
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});

export default routes;