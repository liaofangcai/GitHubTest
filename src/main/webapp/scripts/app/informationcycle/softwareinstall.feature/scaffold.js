define([
    'jquery',
    'app/commons/export-excel.feature/export-excel-function',
], function ($, exportUtil) {
    return {
        afterShowDialog: function(dialogType, view, data){
            var me = this;
            if ("add" == dialogType) {
                //取当前时间
                me.feature.request({
                    url: 'get-current-info',
                    type: 'get'
                }).done(function (result){
                    //默认当前时间和数量
                    me.feature.model.set('checkDate', result.result.createdTime);
                    me.feature.model.set('checkMan', result.result.applier.realName);
                    me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
                });
            }
            me.feature.views['form:' + dialogType].setFormData(me.feature.model.toJSON());
        }
    }
})