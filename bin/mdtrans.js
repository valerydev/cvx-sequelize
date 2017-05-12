#!/usr/bin/env node

let fs = require('fs')
let path = require('path')
let argv = require('yargs').argv
let colors = require('colors')

// Función para imprimir la ayuda del comando.
function printUsage () {
  let usage = `
  Uso:

    mdtrans --models=<directorio> --output=<fichero> ...

  Opciones:

    --models,  -m: Directorio fuente de los modelos, por defecto: ./models.
    --attribs, -a: Directorio fuente de los attributos.
    --output,  -o: Fichero de salida, si se omite la salida sera por stdout.
    --sorted,  -s: Salida en orden alfabetico.
    --egrep,   -e: Expresión regular para filtrar los modelos.
    --deep,    -d: Incluir en la busqueda las asociaciones de cada modelo.
    --revert,  -r: Revertir formato.
    --help,    -h: Ayuda del commando.

  `

  console.log(usage)
  process.exit()
}

if (argv.help || argv.h) {
  printUsage()
}

// Parametros.
let modelsDir = argv.models || argv.m || './models'
let attribsDir = argv.attribs || argv.a
let outputFile = argv.output || argv.o
let sorted = argv.sorted || argv.s
let regexp = argv.egrep || argv.e
let deep = argv.deep || argv.d
let revert = argv.revert || argv.r

let cwd = process.cwd()

// Configuración por defecto para el cargador de los plugins.
let config = {
  "user": null,
  "password": null,
  "database": "model-test",
  "dialect": "mysql",
  "define": {
    "timestamps": false,
    "freezeTableName": true,
    "underscored": true
  }
}

if (!fs.existsSync(modelsDir)) {
  throw new Error(`El directorio de los modelos no existe: ${modelsDir}`)
}

if (attribsDir) {

  if (!fs.existsSync(attribsDir)) {
    throw new Error(`El directorio de los attributos no existe: ${attribsDir}`)
  }

  config.splitModels = {
    logic: path.resolve(cwd, modelsDir),
    attribs: path.resolve(cwd, attribsDir)
  }
} else {
  config.models = modelsDir
}

let installPlugins = require('../')
let models = installPlugins(config)
let sequelize = models.sequelize

modelTrans(sequelize)

// Función principal.
function modelTrans (sequelize) {
  let models = {}
  let output = []
  let modelNames = Object.keys(sequelize.models)
  let _ = sequelize.constructor.Utils._

  modelNames = sorted ? modelNames.sort() : modelNames 

  modelNames.forEach((modelName)=> {
    let model = sequelize.models[modelName]

    if (model instanceof sequelize.Model) {

      if (regexp) {
        let match = modelName.match(regexp)

        if (match) {

          // Busqueda profunda de asociaciones.
          if (deep) {
            let modelList = getAssociationsModels(model)
            modelList.forEach((modelName)=> models[modelName] = sequelize.models[modelName])
          } else {
            models[modelName] = model
          }
        }
      } else {
        models[modelName] = model
      }
    }
  })

  for (let key in models) {
    let model = models[key]
    let modelName = model.name
    // Si no se define `tableName`, entonces sera el nombre del modelo.
    let tableName = model.tableName || modelName
    let attrs = [modelName].concat(Object.keys(model.attributes))
    let fields = [tableName].concat(_.values(model.attributes).map((attr)=> attr.field || attr.fieldName))
    let formattedLines = []

    for (let i = 0; i < attrs.length; i++) {
      let line

      if (revert) {
        line = fillingChars(' ', fields, i) + `   |   ${attrs[i]}`
      } else {
        line = fillingChars(' ', attrs, i) + `   |   ${fields[i]}`
      }

      formattedLines.push(line)
    }

    let separator = fillingChars('-', formattedLines) + '\n'

    formattedLines = formattedLines.map((line)=> {
      let split = line.split('|')
      let attr = revert ? split[1] : split[0]
      let field = revert ? split[0] : split[1]

      attr = attr.green
      field = field.red
      
      return revert ? `${field}|${attr}\n` : `${attr}|${field}\n`
    })

    let firstLine = formattedLines.shift()
    let split = firstLine.split('|').map((str)=> str.bold)

    output.push(separator)
    output.push(split[0] + '|' + split[1])
    output.push(separator)
    formattedLines = sorted ? formattedLines.sort() : formattedLines
    output = output.concat(formattedLines)
    output.push(separator)
    output.push('\n\n')
  }

  output = output.join(' ')

  // Salida del programa.
  if (outputFile) {
    fs.writeFileSync(outputFile, output)
  } else {
    console.log(output)
  }

  // Función recursiva para obtener las asociaciones.
  function getAssociationsModels (model, modelList = []) {
    let associations = model.associations

    for (let key in associations) {
      let association = associations[key]
      let target = association.target
      let name = target.name

      if (modelList.indexOf(name) >= 0) continue
      modelList.push(name)
      getAssociationsModels(target, modelList)
    }

    return modelList
  }

  function fillingChars(char, lines, curLine) {
    let maxLength = lines.reduce((memo, val)=> val.length > memo ? val.length : memo, 0)

    return _.padEnd(lines[curLine], maxLength, char)
  }
}