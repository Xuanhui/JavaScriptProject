(function(){
    var app=angular.module('myApp',[]);
    app.controller('MyController',['$scope',myController]);
 var excelJsonObj=[];
    function myController($scope){
        $scope.uploadExcel=function(){
            $('#myTable tbody').empty();//for empty data before append new data from excel file
            var soundStandard=["eeeehk!","eeeehk?","ehhhk","ekhhh"];
            var meaningStandard=["hello","are you sure?","there","fish"];
            var myFile=document.getElementById('file');
            var input=myFile;
            var reader =new FileReader();
            reader.onload=function(){
                var fileData=reader.result;
                var workbook= XLSX.read(fileData,{type:'binary'});
                workbook.SheetNames.forEach(function(sheetName){
                    var rowObject=XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                     excelJsonObj= rowObject;
                });
                for(var i=0; i<excelJsonObj.length;i++)
                {
                    var data=excelJsonObj[i];
                    var sound=data.Sound;//consider all the text are lower case, else use "var sound=data.Sound.toLowerCase();
                    var arr=sound.split("");
                    var actualSound=[];
                    var meaning="";
                    if(arr.length<5){
                        meaning="";
                    }
                    if(arr.length>=5)
                    {
                        for (j = 0; j <= arr.length-5; j++) {
                            if (arr[j] == 'e') {
                                var soundPiece = sound.slice(j, j+5);
                                if (soundPiece == soundStandard[2]) {
                                    actualSound.push(soundPiece);
                                    j = j + 4;
                                }else if (soundPiece == soundStandard[3]) {
                                    actualSound.push(soundPiece);
                                    j = j + 4;
                                } else {
                                    if (j <= arr.length - 7) {
                                        soundPiece = sound.slice(j, j+7);
                                        if (soundPiece == soundStandard[0]) {
                                            actualSound.push(soundPiece);
                                            j = j + 6;
                                        }
                                        if (soundPiece == soundStandard[1]) {
                                            actualSound.push(soundPiece);
                                            j = j + 6;
                                        }
                                    }
                                }
                            }
                        }
// find the userful word in sound.
                        for (k = 0; k < actualSound.length; k++)
                        {
                            for (l = 0; l< soundStandard.length; l++) {
                                if (actualSound[k] == soundStandard[l]) {
                                    if (meaning == "") {
                                        meaning = meaning + meaningStandard[l];
                                        break;
                                    } else {
                                        meaning = meaning.concat(" ", meaningStandard[l]);
                                        break;
                                    }
                                }
                            }
                        }
                    }
//link the translation of each word together.
                    $('#myTable tbody:last-child').append("<tr><td>"+data.ID+"</td><td>"+data.Dolphin_Name+"</td><td>"+data.Sound+"</td><td>"+meaning+"</td></tr>");
                }
            };
            reader.readAsBinaryString(input.files[0]);
        }

    };






})();