import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv"

dotenv.config()


const sequelize = new Sequelize( process.env.DATABASE,
                                 process.env.DB_USER,
                                 process.env.DB_PASSWORD,
                                 {
                                    host:process.env.DB_HOST,
                                    dialect:'postgres'
                                 }
);

const consulta = sequelize.define('consulta', {
	fecha: {   type: DataTypes.STRING, 
	            allowNull: false},
	hora: {  type: DataTypes.STRING, 
                    allowNull: false  },
   numeroBox: {  type: DataTypes.INTEGER, 
                  allowNull: false  },
   rutMedico: {  type: DataTypes.STRING, 
                  allowNull: false  },
   rutPaciente: {  type: DataTypes.STRING, 
                  allowNull: false  }
 },
 {
    timestamps: false,
    createAt: false,
    updatedAt: false
    }
);

const medico = sequelize.define('medico', {
	nombre: {   type: DataTypes.STRING, 
	            allowNull: false},
	rut: { type: DataTypes.STRING  },
    direccion:{type: DataTypes.STRING}
 },
 {
    timestamps: false,
    createAt: false,
    updatedAt: false
    }
);

const especialidad = sequelize.define('especialidad', {
	codigo: {   type: DataTypes.INTEGER, 
	            allowNull: false},
	descripcion: {  type: DataTypes.STRING, 
                    allowNull: false  }
 },
 {
    timestamps: false,
    createAt: false,
    updatedAt: false
    }
);

const paciente = sequelize.define('paciente', {
	nombre: {   type: DataTypes.STRING, 
	            allowNull: false},
	rut: {  type: DataTypes.STRING, 
            allowNull: false },
   direccion:{type: DataTypes.STRING}
 },
 {
    timestamps: false,
    createAt: false,
    updatedAt: false
    }
);

const licencia = sequelize.define('licencia', {
	codigo: {   type: DataTypes.INTEGER, 
	            allowNull: false},
	diagnostico: {  type: DataTypes.STRING, 
                    allowNull: false },
    fechaInicio:{   type: DataTypes.STRING, 
                    allowNull: false},
    fechaTermino: { type: DataTypes.STRING, 
                    allowNull: false}
 },
 {
    timestamps: false,
    createAt: false,
    updatedAt: false
    }
);




especialidad.hasMany(medico);
medico.belongsTo(especialidad);
paciente.hasMany(consulta)
medico.hasOne(consulta)
consulta.belongsTo(medico)
licencia.hasOne(consulta)
consulta.belongsTo(licencia)


await consulta.sync({ force: true })
await licencia.sync({ force: true })
await medico.sync({ force: true })
await especialidad.sync({ force: true })
await paciente.sync({ force: true })


