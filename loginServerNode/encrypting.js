export const mark = {
    encryptData: function (data) {
    
    
        var dataList = [];
        dataList = data.split("");
        var listLength = dataList.length;
    
        var firstString = dataList[0];
        var lastString = dataList[listLength - 1];
    
        dataList[0] = lastString;
        dataList[listLength - 1] = firstString;
    
        //console.log(dataList);
        return dataList;
    }
}