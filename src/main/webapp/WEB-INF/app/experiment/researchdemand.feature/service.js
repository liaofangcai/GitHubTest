var {mark}                  = require('cdeio/mark');
var commExpService          = require('commons/export-excel.feature/service');

var {ResearchDemand}         = com.zyeeda.business.experiment.entity;
var {EntityMetaResolver}    = com.zyeeda.cdeio.web.scaffold;

var {SecurityUtils}         = org.apache.shiro;
var {ArrayList}             = java.util;
var {HashMap}               = java.util;
var {Date}                  = java.util;
var {Boolean}               = java.lang;
var {SimpleDateFormat}      = java.text;

exports.createService = function() {
    return{
        getTripApplyByIds: mark('managers', ResearchDemand).mark('tx').on(function (tripApplyMgr, entryIds){
            return tripApplyMgr.find.apply(tripApplyMgr, entryIds);
        }),

        exportExcel: mark('beans',EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
            var beans = new HashMap(),
                vo, vos = new ArrayList(),
                entity, entities,
                meta = resolver.resolveEntity(ResearchDemand),
                dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
                dateSdf = new SimpleDateFormat("yyyy-MM-dd"),
            entities = commExpService.createService().listEntities(options, meta);
            // 按照自己的要求处理数据
            for (i = 0; i < entities.size(); i++) {
                entity = entities.get(i);
                vo = commExpService.createService().convertEntityToObj(entity);
                if(null !== entity.makeDate){
                     vo.makeDate = dateSdf.format(entity.makeDate);
                 }
                 if (null!==entity.demandForworDate) {
                    vo.demandForworDate=dateSdf.format(entity.demandForworDate);
                 };
                 if(null!=entity.examineDate){
                     vo.examineDate=dateSdf.format(entity.examineDate);
                 }
                 if(null!=entity.ratifyDate){
                    vo.ratifyDate=dateSdf.format(entity.ratifyDate);
                 }
                vos.add(vo);
            }
            beans.put('researchs', vos);
            beans.put('footer', '操作时间:' + dateTimeStr);
            return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
        })

    };
}
