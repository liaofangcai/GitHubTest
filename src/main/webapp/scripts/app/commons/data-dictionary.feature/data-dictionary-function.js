(function() {
    define([
        'jquery'
    ], function ($) {
        return {
            getDataDictionary: function (mark, isCascade, cascadeMark){
                var results = {};

                if (isCascade) {
                    $.ajax({
                        url: 'invoke/scaffold/dictionary/main-dictionary/get-dictionary',
                        type: 'get',
                        data: {mark: cascadeMark},
                        async: false
                    }).done(function (result){
                        var cascadeDictionarys = [];
                            cascadeDigitalDictionarys = result.mainDictionarys[0].detailDigitalDictionarys;
                        for (var i = 0; i < cascadeDigitalDictionarys.length; i++) {
                            cascadeDictionarys.push({id: cascadeDigitalDictionarys[i].value, text: cascadeDigitalDictionarys[i].name});
                        }
                        results.cascadeDictionarys = cascadeDictionarys;
                    });
                }

                $.ajax({
                    url: 'invoke/scaffold/dictionary/main-dictionary/get-dictionary',
                    type: 'get',
                    data: {mark: mark},
                    async: false
                }).done(function (result){
                    var digitalDictionarys = [];
                        detailDigitalDictionarys = result.mainDictionarys[0].detailDigitalDictionarys;
                    for (var j = 0; j < detailDigitalDictionarys.length; j++) {
                        digitalDictionarys.push({id: detailDigitalDictionarys[j].value, text: detailDigitalDictionarys[j].name});
                    }
                    results.digitalDictionarys = digitalDictionarys;
                    results.detailDigitalDictionarys = detailDigitalDictionarys;
                });

                return results;
            },
            getFormatDataDictionaryByTypeAndValue: function (type, value) {
                var targetValue;
                $.ajax({
                    url: 'invoke/scaffold/dictionary/main-dictionary/get-dictionary',
                    type: 'get',
                    data: {mark: type},
                    async: false
                }).done(function (result){
                    var digitalDictionarys = [],
                        detailDigitalDictionarys = result.mainDictionarys[0].detailDigitalDictionarys;

                    for (var j = 0; j < detailDigitalDictionarys.length; j++) {
                        if (value == detailDigitalDictionarys[j].value){
                            targetValue = detailDigitalDictionarys[j].name;
                        }
                    }
                });

                return targetValue;
            },
            getDetailDigitalDataByType: function(type) {
                var results = {};
                $.ajax({
                    url: 'invoke/scaffold/dictionary/main-dictionary/get-dictionary',
                    type: 'get',
                    data: {mark: type},
                    async: false
                }).done(function (result){
                    var digitalDictionarys = [];
                        detailDigitalDictionarys = result.mainDictionarys[0].detailDigitalDictionarys;
                    for (var j = 0; j < detailDigitalDictionarys.length; j++) {
                        digitalDictionarys.push({id: detailDigitalDictionarys[j].value, text: detailDigitalDictionarys[j].name});
                    }
                    results.digitalDictionarys = digitalDictionarys;
                    results.detailDigitalDictionarys = detailDigitalDictionarys;
                });

                return results;
            },
            getDataMapByType: function(type) {
                var results = {};
                $.ajax({
                    url: 'invoke/scaffold/dictionary/main-dictionary/get-dictionary',
                    type: 'get',
                    data: {mark: type},
                    async: false
                }).done(function (result){
                        detailDigitalDictionarys = result.mainDictionarys[0].detailDigitalDictionarys;
                    for (var j = 0; j < detailDigitalDictionarys.length; j++) {
                        results[detailDigitalDictionarys[j].value] = detailDigitalDictionarys[j].name;
                    }
                });

                return results;
            }
        };
    });
}).call(this);
