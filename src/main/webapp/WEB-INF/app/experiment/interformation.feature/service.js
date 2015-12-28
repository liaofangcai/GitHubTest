var {mark}                  = require('cdeio/mark');
var commExpService       = require('commons/export-excel.feature/service');

var {Interformation}     = com.zyeeda.business.experiment.entity;
var {EntityMetaResolver}    = com.zyeeda.cdeio.web.scaffold;

var {SecurityUtils}         = org.apache.shiro;
var {ArrayList}             = java.util;
var {HashMap}               = java.util;
var {Date}                  = java.util;
var {Boolean}               = java.lang;
var {SimpleDateFormat}      = java.text;

exports.createService = function() {
    return{
        exportExcel: mark('beans',EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
            var beans = new HashMap(),
                vo, vos = new ArrayList(),
                entity, entities,
                meta = resolver.resolveEntity(Interformation),
                dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
                dateSdf = new SimpleDateFormat("yyyy-MM-dd"),
             entities = commExpService.createService().listEntities(options, meta);
            // 按照自己的要求处理数据
            for (i = 0; i < entities.size(); i++) {
                entity = entities.get(i);
                vo = commExpService.createService().convertEntityToObj(entity);
                if(null !== entity.aplicationDate){
                     vo.aplicationDate = dateSdf.format(entity.aplicationDate);
                 }
                 if (null!==entity.deptDate) {
                    vo.deptDate=dateSdf.format(entity.deptDate);
                 };
                 if(null!=entity.rocessingResultsDate){
                     vo.rocessingResultsDate=dateSdf.format(entity.rocessingResultsDate);
                 }
                vos.add(vo);
            }
             beans.put('Inteformations', vos);
             beans.put('footer', '操作时间:' + dateTimeStr);
             return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
        }),
    getTripApplyByIds: mark('managers', Interformation).mark('tx').on(function (inforMgr, entryIds){
            return inforMgr.find.apply(inforMgr, entryIds);
        })
    };
}
