import { Schema, model } from "mongoose";

const proyectosSchema = new Schema({
//initJStitulo_proyecto
titulo_proyecto: {
            type: Schema.Types.String,
            required: true,
            
            
            
            
            
            trim: true,
        },
        
//endJStitulo_proyecto
//initJSdescripcion
descripcion: {
            type: Schema.Types.String,
            
            
            
            
            
            
            trim: true,
        },
        
//endJSdescripcion
//initJSfotos
fotos: [{
            type: Schema.Types.Mixed,
            
        }],
        
//endJSfotos
//initJSvideo
video: [{
            type: Schema.Types.Mixed,
            
        }],
        
//endJSvideo
//initJSpropietario
propietario: {
            type: Schema.Types.ObjectId,
            required: true,
            
            
            
            
            ref: "User",
            
            
            
        },
        
//endJSpropietario
//fields
    last_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true, //createdAt updatedAt automatic
    methods: {
        //solo para el documento
    },
    statics: {
        //para todo el modelo
    },
    query: {
        //para odenar o hacer consultas especiales
    }
});
export default model('Proyectos',proyectosSchema);