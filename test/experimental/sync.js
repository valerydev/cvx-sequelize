var models = require('../../')();


var user = {
  "isRoot": false,
  "code": "01",
  "password": "202cb962ac59075b964b07152d234b70",
  "fullName": "test2@test.com",
  "email": "test2@test.com",
  "securityQuestion1": "¿Pregunta1?",
  "securityAnswer1": "Respuesta de seguridad 1",
  "type": "S",
  "ocuppationId": 0,
  "visibilityScope": 3,
  "active": "T",
  "securityQuestion2": "¿Pregunta1?",
  "securityAnswer2": "Respuesta de seguridad 1",
  "allowedIPs": " ",
  "address": "Av. 5 de Julio",
  "connectionScheduleId": 0,
  "disabledMenus": "",
  "photo": "SW1hZ2Vu",
  "classifier3": {
    "name": "",
    "contractId": 0,
    "level": 0,
    "parentId": 0
  },
  "classifier2": {
    "name": "",
    "contractId": 0,
    "level": 0,
    "parentId": 0
  },
  "classifier1": {
    "name": "",
    "contractId": 0,
    "level": 0,
    "parentId": 0
  },
  "branch": {
    "contractId": 1,
    "classifierId1": 0,
    "classifierId2": 0,
    "classifierId3": 0,
    "code": "",
    "name": "",
    "contact": null,
    "startDate": null,
    "countryId": 0,
    "stateId": 0,
    "cityId": 0,
    "subLocationId1": 0,
    "subLocationId2": 0,
    "postalCode": null,
    "timezoneId": 0,
    "timezone": "",
    "address": "",
    "phoneNumbers": "",
    "propertyType": "F"
  },
  "profile": {
    "name": "Administrador",
    "contractId": 1,
    "branchId": 0,
    "code": "01",
    "active": "T",
    "disabledMenus": "",
    "properties": [
      {
        "value": "43",
        "countryId": 0,
        "code": 1,
        "parentCode": 1,
        "position": 1,
        "categoryId": 1,
        "displayType": "S",
        "dataType": "I",
        "valueList": "{\"browse\": 1002, \"displaytext\": \"nombre\", \"value\": \"correlativo\"}",
        "isGroup": "F",
        "name": "Moneda global",
        "auditDescription": "",
        "help": "Indique la moneda que sera utilizada para todos los calculos gobales de ventas, compras, inventario, saldos de clientes y proveedores, pagos de empleados  incluso bancarios. Este valor permite unificar bajo una misma moneda (aplicando la conversion relativa de cada sucursal vs la moneda global) las cifras resultantes de las operaciones realizadas por todas las sucursales en distitos paises.",
        "auditable": "F",
        "config": "F",
        "configurableByContract": "T",
        "configurableByBranch": "F",
        "configurableByProfile": "T",
        "configurableByUser": "F",
        "defaultValue": "",
        "active": "T",
        "internal": "0",
        "ProfileProperty": {
          "profileId": 9,
          "propertyId": 4,
          "value": "43",
          "updatedAt": null,
          "perfil_correlativo": 9,
          "propiedad_correlativo": 4
        },
        "category": {
          "name": "General",
          "createdAt": "2015-06-09T18:51:46.000Z",
          "updatedAt": null
        }
      },
      {
        "value": "21",
        "countryId": 0,
        "code": 2,
        "parentCode": 1,
        "position": 2,
        "categoryId": 1,
        "displayType": "S",
        "dataType": "I",
        "valueList": "{\"browse\": 1003, \"displaytext\": \"nombre\", \"value\": \"correlativo\"}",
        "isGroup": "F",
        "name": "Unidad Global",
        "auditDescription": "",
        "help": "Indique la unidad de representacion global de los productos. Este valor es útil para los reportes que muestren las existencias, entradas y salidas de productos en una sola unidad, aplicando su conversion.",
        "auditable": "F",
        "config": "F",
        "configurableByContract": "T",
        "configurableByBranch": "F",
        "configurableByProfile": "T",
        "configurableByUser": "F",
        "defaultValue": "",
        "active": "T",
        "internal": "0",
        "ProfileProperty": {
          "id": 20,
          "profileId": 9,
          "propertyId": 5,
          "value": "21",
          "updatedAt": null,
          "perfil_correlativo": 9,
          "propiedad_correlativo": 5
        },
        "category": {
          "name": "General",
          "createdAt": "2015-06-09T18:51:46.000Z",
          "updatedAt": null
        }
      }
    ]
  },
  "contract": {
    "number": "123456",
    "startDate": "2015-02-26T00:00:00.000Z",
    "endDate": "2015-02-26T00:00:00.000Z",
    "active": "T",
    "shortName": "IMECA",
    "name": "Nombre",
    "brandName": "MARCA",
    "fiscalId1": "RIF",
    "fiscalId2": "NIT",
    "fiscalId3": null,
    "contact": "contacto principal",
    "contactEmail": "6",
    "secondaryContact": "contacto secundario",
    "secondaryContactEmail": "correoSecundario@correo.com",
    "technicalContact": "contacto tecnico",
    "technicalContactEmail": "correoTecnico@correo.com",
    "businessEmail": "11",
    "address": "direccion",
    "phoneNumbers": "",
    "countryId": 0,
    "stateId": 0,
    "cityId": 0,
    "subLocationId1": 1,
    "subLocationId2": 0,
    "postalCode": "zona po",
    "timezone": "00:00",
    "web": "web",
    "facebook": "facebook",
    "twitter": "twitter",
    "instagram": "instagram",
    "googleplus": null,
    "pinterest": "pinterest",
    "linkedin": "linkedin",
    "publicProfile": "F",
    "mainUserId": 0,
    "logoId": 5,
    "disabledMenus": "",
    "timezoneId": 0,
    "logo": {
    "image": "SW1hZ2Vu",
      "contractId": 5,
      "module": 0,
      "type": "jpeg"
  },
  "properties": [
    {
      "value": "42",
      "countryId": 0,
      "code": 1,
      "parentCode": 1,
      "position": 1,
      "categoryId": 1,
      "displayType": "S",
      "dataType": "I",
      "valueList": "{\"browse\": 1002, \"displaytext\": \"nombre\", \"value\": \"correlativo\"}",
      "isGroup": "F",
      "name": "Moneda global",
      "auditDescription": "",
      "help": "Indique la moneda que sera utilizada para todos los calculos gobales de ventas, compras, inventario, saldos de clientes y proveedores, pagos de empleados  incluso bancarios. Este valor permite unificar bajo una misma moneda (aplicando la conversion relativa de cada sucursal vs la moneda global) las cifras resultantes de las operaciones realizadas por todas las sucursales en distitos paises.",
      "auditable": "F",
      "config": "F",
      "configurableByContract": "T",
      "configurableByBranch": "F",
      "configurableByProfile": "T",
      "configurableByUser": "F",
      "defaultValue": "",
      "active": "T",
      "internal": "0",
      "ContractProperty": {
        "contractId": 1,
        "propertyId": 4,
        "value": "42",
        "updatedAt": "2015-08-07T14:35:28.000Z",
        "contrato_correlativo": 1,
        "propiedad_correlativo": 4
      },
      "category": {
        "name": "General",
        "createdAt": "2015-06-09T18:51:46.000Z",
        "updatedAt": null
      }
    },
    {
      "value": "BB",
      "countryId": 0,
      "code": 2,
      "parentCode": 1,
      "position": 2,
      "categoryId": 1,
      "displayType": "S",
      "dataType": "I",
      "valueList": "{\"browse\": 1003, \"displaytext\": \"nombre\", \"value\": \"correlativo\"}",
      "isGroup": "F",
      "name": "Unidad Global",
      "auditDescription": "",
      "help": "Indique la unidad de representacion global de los productos. Este valor es útil para los reportes que muestren las existencias, entradas y salidas de productos en una sola unidad, aplicando su conversion.",
      "auditable": "F",
      "config": "F",
      "configurableByContract": "T",
      "configurableByBranch": "F",
      "configurableByProfile": "T",
      "configurableByUser": "F",
      "defaultValue": "",
      "active": "T",
      "internal": "0",
      "ContractProperty": {
        "contractId": 1,
        "propertyId": 5,
        "value": "BB",
        "updatedAt": "2015-08-07T14:35:28.000Z",
        "contrato_correlativo": 1,
        "propiedad_correlativo": 5
      },
      "category": {
        "name": "General",
        "createdAt": "2015-06-09T18:51:46.000Z",
        "updatedAt": null
      }
    },
    {
      "value": "T",
      "countryId": 0,
      "code": 3,
      "parentCode": 1,
      "position": 3,
      "categoryId": 1,
      "displayType": "S",
      "dataType": "L",
      "valueList": "T=Si, F=No",
      "isGroup": "F",
      "name": "Sucursal utiliza código propio",
      "auditDescription": "",
      "help": "Indique si la sucursal utiliza código propio",
      "auditable": "F",
      "config": "T",
      "configurableByContract": "T",
      "configurableByBranch": "F",
      "configurableByProfile": "T",
      "configurableByUser": "F",
      "defaultValue": "T",
      "active": "T",
      "internal": "0",
      "ContractProperty": {
        "contractId": 1,
        "propertyId": 6,
        "value": "T",
        "updatedAt": "2015-11-04T19:53:48.000Z",
        "contrato_correlativo": 1,
        "propiedad_correlativo": 6
      },
      "category": {
        "name": "General",
        "createdAt": "2015-06-09T18:51:46.000Z",
        "updatedAt": null
      }
    },
    {
      "value": "3",
      "countryId": 0,
      "code": 4,
      "parentCode": 1,
      "position": 4,
      "categoryId": 1,
      "displayType": "S",
      "dataType": "I",
      "valueList": "",
      "isGroup": "F",
      "name": "Cantidad de niveles de clasificasión",
      "auditDescription": "",
      "help": "Indique el número de niveles de clasificasión",
      "auditable": "F",
      "config": "T",
      "configurableByContract": "T",
      "configurableByBranch": "F",
      "configurableByProfile": "T",
      "configurableByUser": "F",
      "defaultValue": "3",
      "active": "T",
      "internal": "0",
      "ContractProperty": {
        "contractId": 1,
        "propertyId": 7,
        "value": "3",
        "updatedAt": "2015-11-04T19:53:48.000Z",
        "contrato_correlativo": 1,
        "propiedad_correlativo": 7
      },
      "category": {
        "name": "General",
        "createdAt": "2015-06-09T18:51:46.000Z",
        "updatedAt": null
      }
    },
    {
      "value": "0",
      "countryId": 0,
      "code": 5,
      "parentCode": 1,
      "position": 5,
      "categoryId": 1,
      "displayType": "S",
      "dataType": "I",
      "valueList": "0=Domingo,1=Lunes,2=Martes,3=Miercoles,4=Jueves,5=Viernes,6=Sabado",
      "isGroup": "F",
      "name": "Primer día de la semana",
      "auditDescription": "",
      "help": "Indique que dia corresponde al primer día de la semana",
      "auditable": "F",
      "config": "T",
      "configurableByContract": "T",
      "configurableByBranch": "F",
      "configurableByProfile": "T",
      "configurableByUser": "F",
      "defaultValue": "0",
      "active": "T",
      "internal": "0",
      "ContractProperty": {
        "contractId": 1,
        "propertyId": 14,
        "value": "0",
        "updatedAt": "2016-03-03T09:57:19.000Z",
        "contrato_correlativo": 1,
        "propiedad_correlativo": 14
      },
      "category": {
        "name": "General",
        "createdAt": "2015-06-09T18:51:46.000Z",
        "updatedAt": null
      }
    },
    {
      "value": "1",
      "countryId": 0,
      "code": 6,
      "parentCode": 1,
      "position": 6,
      "categoryId": 1,
      "displayType": "I",
      "dataType": "I",
      "valueList": null,
      "isGroup": "F",
      "name": "Menu Designado",
      "auditDescription": null,
      "help": "Configuracion restringida. Solo para indicar la estructura de menu propia de cada contrato y de forma general en caso que el contrato no tenga uno propio.",
      "auditable": "F",
      "config": "T",
      "configurableByContract": "F",
      "configurableByBranch": "F",
      "configurableByProfile": "F",
      "configurableByUser": "F",
      "defaultValue": "1",
      "active": "T",
      "internal": "0",
      "ContractProperty": {
        "contractId": 1,
        "propertyId": 15,
        "value": "1",
        "updatedAt": "2016-03-03T09:57:20.000Z",
        "contrato_correlativo": 1,
        "propiedad_correlativo": 15
      },
      "category": {
        "name": "General",
        "createdAt": "2015-06-09T18:51:46.000Z",
        "updatedAt": null
      }
    },
    {
      "value": "MG",
      "countryId": 0,
      "code": 7,
      "parentCode": 1,
      "position": 7,
      "categoryId": 1,
      "displayType": "S",
      "dataType": "S",
      "valueList": "MG=Moneda Global,ML=Moneda Local",
      "isGroup": "F",
      "name": "Tipo de Moneda a Visualizar",
      "auditDescription": "",
      "help": "Indique e l tipo de Moneda a Visualizar",
      "auditable": "F",
      "config": "T",
      "configurableByContract": "T",
      "configurableByBranch": "F",
      "configurableByProfile": "T",
      "configurableByUser": "T",
      "defaultValue": "MG",
      "active": "T",
      "internal": "0",
      "ContractProperty": {
        "contractId": 1,
        "propertyId": 16,
        "value": "MG",
        "updatedAt": "2016-03-03T09:57:20.000Z",
        "contrato_correlativo": 1,
        "propiedad_correlativo": 16
      },
      "category": {
        "name": "General",
        "createdAt": "2015-06-09T18:51:46.000Z",
        "updatedAt": null
      }
    }
  ]},
  "properties": [
    {
      "value": "X",
      "countryId": 0,
      "code": 2,
      "parentCode": 1,
      "position": 2,
      "categoryId": 1,
      "displayType": "S",
      "dataType": "I",
      "valueList": "{\"browse\": 1003, \"displaytext\": \"nombre\", \"value\": \"correlativo\"}",
      "isGroup": "F",
      "name": "Unidad Global",
      "auditDescription": "",
      "help": "Indique la unidad de representacion global de los productos. Este valor es útil para los reportes que muestren las existencias, entradas y salidas de productos en una sola unidad, aplicando su conversion.",
      "auditable": "F",
      "config": "F",
      "configurableByContract": "T",
      "configurableByBranch": "F",
      "configurableByProfile": "T",
      "configurableByUser": "F",
      "defaultValue": "",
      "active": "T",
      "internal": "0",
      "UserProperty": {
        "userId": 16,
        "propertyId": 5,
        "value": "X",
        "updatedAt": null,
        "usuario_correlativo": 16,
        "propiedad_correlativo": 5
      },
      "category": {
        "name": "General",
        "createdAt": "2015-06-09T18:51:46.000Z",
        "updatedAt": null
      }
    }
  ],
  "photo": "SW1hZ2Vu"
};





models.sync({logging: false}).then(function(){

  var user = models.User.build({email: 'hendrul@gmail.com'});
  user.save().then(function(user){
    console.log(user);
  })
  //console.log();
  //models.User.create(user, {include: {all: true}}).then(function(createdUser){
  //  console.log()
  //})
});
