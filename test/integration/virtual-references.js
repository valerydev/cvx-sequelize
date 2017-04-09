let chai = require("chai")
let sinon = require("sinon")
let sinonChai = require("sinon-chai")
let chaiAsPromised = require("chai-as-promised")
let chaiSpies = require("chai-spies")
let assert = chai.assert
let expect = chai.expect
chai.should()
chai.use(sinonChai)
chai.use(chaiAsPromised)
chai.use(chaiSpies)

let Sequelize  = require('sequelize')
global.Promise = Sequelize.Promise
let _          = Sequelize.Utils._
let Promise    = Sequelize.Promise
let validator  = Sequelize.Validator
let modelFactory    = require('../harness/test-models')
let sequelizeEvents = require('../../lib/sequelize-plugins/sequelize-events')
let virtualRefs     = require('../../lib/sequelize-plugins/virtual-references')

describe('virtual-references', function(){
  it('Debe sustituir nombres de atributos por nombres de campo de BD en scopes de asociacion', function(){
    let models = modelFactory.createReferencesTestModel([sequelizeEvents, virtualRefs])
    models.sequelize.emit('afterDefineAll', models)
    let references = models.User.attributes.contractId.references
    expect(references).to.be.undefined
  })
})

