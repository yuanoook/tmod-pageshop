const filters = [
    {
        //fix mockjson patient.ofPatientRelationId -> card.ofPatientRelationId
        test: /patientUser\/queryOfPatientInfomation$/,
        filter (resObj) {
            return Object.assign({}, resObj, {
                data: resObj.data.map(patient => {
                    return Object.assign({}, patient, {
                        treatmentCardList: patient.treatmentCardList.map(card => {
                            return Object.assign({}, card, {
                                ofPatientRelationId: patient.ofPatientRelationId
                            });
                        })
                    })
                })
            })
        }
    },
    {
        //fix mockjson patient.ofPatientRelationId -> card.ofPatientRelationId
        test: /notice\/queryDetail$/,
        filter (resObj) {
            return Object.assign({}, resObj, {
                data: Object.assign({}, resObj.data, {
                    text: `北京大学深圳医院现仅支持线上挂号，
     不开通现场挂号，
请患者们知悉  

<a href="tel:12345678">电话</a>
<br />
    <a href="http://www.baidu.com">网址</a>
    
01233456789012334567890123345678901233456789012334567890123345678901233456789012334567890123345678910123345678901233456789012334567890123345678901233456789012334567890123345678901233456789012334567891012334567890123345678901233456789012334567890123345678901233456789012334567890123345678901233456789101233456789012334567890123345678901233456789012334567890123345678901233456789012334567890123345678910123345678901233456789012334567890123345678901233456789012334567890123345678901233456789012334567891`
                })
            })
        }
    }
]

module.exports = function(req_path, content) {
    var result = content;
    filters.forEach((item) => {
        item.test.test(req_path) && (result = item.filter(result))
    })
    return result;
}