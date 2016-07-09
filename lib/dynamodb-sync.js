var Promise = require('bluebird');
var dynamo  = require('valeryweb-utils').dynamo({
  accessKeyId:'AKIAJSWTTAS4YHO3HHXA',
  secretAccessKey:'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',
  region: "us-east-1"
});

var AWS = require('aws-sdk');
var sns = new AWS.SNS({apiVersion: '2010-03-31'});

module.exports = function(batch){
  var syncData = assembleSyncData(batch);
  var requests = assembleRequests([syncData]);

  return Promise.mapSeries(
    requests.map( req => ()=> dynamo.batchWriteWithRetry(req) ),
    runPromise => runPromise()
  ).catch( err =>{ console.error(err.stack) });
};


function assembleSyncData(batch){

  var _ = batch[0].instance.Model.sequelize.Utils._;
  var timestamp = new Date().getTime();
  var md5 = require('md5');

  batch = batch.map( (batchItem, order) => {

    var instance     = batchItem.instance;
    var model        = instance.Model;
    var pkName       = model.primaryKeyAttribute;
    var fieldAttributeMap = model.fieldAttributeMap;
    var attributeFieldMap = _.invert(fieldAttributeMap);

    //Dynamo no acepta valores vacios
    var data = _.omitBy(batchItem.data, (value, key) => {
      if(!_.isNumber(value) && _.isEmpty(value)){
        batchItem.emptyValues = batchItem.emptyValues||[];
        batchItem.emptyValues.push( attributeFieldMap[key] );
        return true;
      }
      return false;
    });

    //Cambiamos los nombres de atributo del modelo por nombres de campo de la BD
    batchItem.table  = model.tableName;
    batchItem.data   = _.mapKeys(data, (value, key) => attributeFieldMap[key]);

    //Agregamos el md5 de la data.
    batchItem.md5   = md5( JSON.stringify(batchItem.data) );

    return batchItem;
  });

  var syncData = {
    batch: batch
  };

  syncData.timestamp  = timestamp;

  //Buscamos alguna instancia que contenga id de contrato y se lo agregamos al item
  var itemWithContract = syncData.batch.find( batchItem => !_.isUndefined(batchItem.instance.Model.attributes.contractId));
  if(itemWithContract) {
    syncData.contractId = itemWithContract.instance.contractId;
  }

  //Buscamos alguna instancia que contenga atributos de nivel de acceso
  var scopedItem = syncData.batch.find( batchItem => !_.isUndefined(batchItem.instance.Model.attributes.classifierId1));

  if( scopedItem ) {
    //A todos los items les asignamos el mismo nivel de acceso
    syncData.classifierId1 = scopedItem.instance.classifierId1 || 0;
    syncData.classifierId2 = scopedItem.instance.classifierId2 || 0;
    syncData.classifierId3 = scopedItem.instance.classifierId3 || 0;
    syncData.branchId      = scopedItem.instance.branchId      || 0;
  }

  syncData.batch.forEach(batchItem => syncData.md5 = md5(batchItem.md5 + (syncData.md5||'')));
  syncData.trxId = md5( timestamp + syncData.md5 );

  //Omitimos la instancia de cada item
  syncData.batch = syncData.batch.map(batchItem => _.omit(batchItem, 'instance'));

  return syncData;
}


function assembleRequests(batch){
  var batches = [[]];
  for(var i = 0, j = 0, ct = 0; i < batch.length; i++) {
    var req = { PutRequest: { Item: batch[i] } };
    if(ct < 25) {
      batches[j].push(req);
      ct++;
    } else {
      batches[++j] = [req];
      ct = 1;
    }
  }

  return batches.map(batch => {
    return { RequestItems: { sync_out: batch } }
  });
}


function notifyUpdate(batch){

}