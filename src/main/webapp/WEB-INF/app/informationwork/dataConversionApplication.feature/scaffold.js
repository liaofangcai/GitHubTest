var {mark}                                       = require('cdeio/mark');
var {json}                                         = require('cdeio/response');
var _                                                = require('underscore');
var fs                                               = require('fs');
var objects                                      = require('cdeio/util/objects');
var response                                   = require('ringo/jsgi/response');
var {getOptionInProperties}            = require('cdeio/config');
var {join}                                          = require('cdeio/util/paths');
var {createService}                         = require('informationwork/engineroom-log.feature/service');
var {DataConversionApplication}    = com.zyeeda.business.informationwork.entity;
var {SecurityUtils}                            = org.apache.shiro;
var {SimpleDateFormat}                   = java.text;
var {Date}                                          = java.util;
var {ArrayList}                                   = java.util;
var URLDecoder                               = java.net.URLDecoder;
var dateTimeStr                  = new SimpleDateFormat("yyyy-MM-dd").format(new Date());

exports.style = 'grid';

exports.enableFrontendExtension = true;

exports.haveFilter = true;

exports.entityLabel = '系统数据转换申请';

exports.filters = {
  defaults: {
    '!dataConversionApplicationFilter': ['']
  }
};

exports.service = function(service){
  return _.extend(service, createService());
};

exports.labels = {
  systemRenewalApplicationNo: '编号',
  applicationTime: '申请日期',
  //系统数据转换计划
  informationSystemName: '信息系统名称',
  masterName:'服务器',
  address:'申请原因',
  updateContent:'影响范围',
  incidence:'数据转换详情',
  proposer: '转换开始时间',
  applicationDepartment:'转换完成时间',
  identifierPersonnal:'申请人',
  identifierTime:'申请部门',
  //审核意见
  departmentHead:'部门主管意见',
  informationDepartment:'信息部门意见',
  companyLeadershipApproval: '公司领导审批',

  headperson: '处理人',
  headdate: '处理日期',

  departmentperson: '处理人',
  departmentdate: '处理日期',

  approvalperson: '处理人',
  approvaldate: '处理日期'
};

exports.forms = {
  edit: {
    groups: [
    {name: 'defaults',columns:2},
    {name: 'remoteAccessApplications',label:'系统数据转换申请',columns:2},
    {name: 'auditOpinion',label: '审核意见', columns: 2}
    ],
    size: 'medium'
  },

  show: {
    groups: [
    {name: 'defaults',columns:2},
    {name: 'remoteAccessApplications',label:'系统数据转换申请',columns:2},
    {name: 'auditOpinion',label: '审核意见', columns: 2}
    ],
    size: 'medium'
  },

  add: {
    groups: [
    {name: 'defaults',columns:2},
    {name: 'remoteAccessApplications',label:'系统数据转换申请',columns:2},
    {name: 'auditOpinion',label: '审核意见', columns: 2}
    ],
    size: 'medium'
  },

  filter: {
    groups: [{name: 'filter'}],
    size: 'medium'
  }
};

exports.fieldGroups = {
  defaults: ['systemRenewalApplicationNo', {name: 'applicationTime', defaultValue: dateTimeStr},],
  //申请部门
  remoteAccessApplications: [
  'informationSystemName','masterName',
  {name: 'address',type :'textarea' ,colspan : 2},{name: 'incidence',type :'textarea' ,colspan : 2},
  {name: 'updateContent',type :'textarea' ,colspan : 2}, 'proposer',
  'applicationDepartment', 'identifierPersonnal','identifierTime'
  ],
  //审核意见
  auditOpinion: [
  {name: 'departmentHead', type: 'textarea', colspan: 2}, 'headperson', 'headdate',
  {name: 'informationDepartment',type:  'textarea', colspan: 2}, 'departmentperson', 'departmentdate',
  {name : 'companyLeadershipApproval',type:  'textarea', colspan: 2} ,'approvalperson', 'approvaldate'
  ],

  filter: [
  'systemRenewalApplicationNo','informationSystemName', 'identifierPersonnal','identifierTime',
  {name: 'applicationTime', type: 'date-range', colspan: 2}, {name: 'applicationDepartment',type: 'date-range', colspan: 2}
  ]
};

exports.grid = {
  columns: [
  'systemRenewalApplicationNo', 'informationSystemName','proposer','applicationDepartment',
  'identifierPersonnal'
  ],
  filterToolbar: true,
  fixedHeader: true,
  numberColumn: true,
  multiple: true,
  defaultOrder: 'createdTime-desc'
};

exports.exporting = {
  template: 'informationwork/dataConversionApplication/dataconversionapplication.xls',
  fileName: 'dataconversionapplication'
};

exports.operators = {
  exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 10, show: 'unselected', style: 'btn-pink' }
};

exports.doWithRouter = function(router) {
  router.get('/export-excel', mark('services', 'commons/export-excel', 'informationwork/dataconversionapplication').on(function (exportXlsSvc, dataConversionApplicationSvc, request) {
    var options = request.params, result;

    options = exportXlsSvc.dealParameters(options, dataConversionApplicationSvc, new DataConversionApplication());
    result = dataConversionApplicationSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

    return json({flag: result.flag, filename: result.filename});
  }))
}
