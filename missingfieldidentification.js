  // Getting external insurance policy json to pass to the function
    $.getJSON("policies.json", function( data ) {
        $.each(data,function(key,val){
                returnListOfRequiredFieldsNotAvailableInPolicy(val);
        })
    });

        function returnListOfRequiredFieldsNotAvailableInPolicy(policyObj)
        {
            //To store policy to be checked
            var result=[];
            //To store policy validation object. required fields
            var checkObj=[]; 
            $.getJSON( "policies-requiredfields.json", function( data ) {

                //Get the validation policy object from policy-requiredfields.json file
                $.each(data,function(key,val){
                    if(key==policyObj["issuer"])
                    {
                        checkObj = val; 
                        return false;
                    }
                });
                
                //Assigning the given policy to the variable result
                result=policyObj; 
                //Check all the fields in validation object with policy object
                $.each(checkObj,function(key,val){
                    //This is to perform validation when the field value is also a object like policyHolder
                    if(toString.call(val) === '[object Object]')
                    {
                        if(result.hasOwnProperty(key))
                        {
                            var objReturn=val;
                            checkObj[key]=returnValidationResultsOfPolicyObject(val, result[key], objReturn);
                            if(checkObj[key]=="")
                                delete checkObj[key];
                        }
                    }
                    //This is to perform validation when the field value is an array like operators
                    else if(toString.call(val) === '[object Array]')
                    {
                        checkObj[key]=returnValidationResultsOfOperatorArrays(val, result[key]);
                        if(checkObj[key]=="")
                            delete checkObj[key];
                    }
                });
                    console.log(checkObj);
                    $("#result").html(JSON.stringify(checkObj));
                    return checkObj;
            });
        }

        // objValid - required fields for the policy
        // objCheck - policy object to check
        // objReturn - return result with the missing required fields 
        function returnValidationResultsOfPolicyObject(objValid, objCheck, objReturn){
            $.each(objValid, function(key,val){
                if(toString.call(val) === '[object Object]')
                {
                    //If the value is an object again pass it this function
                    if(objCheck.hasOwnProperty(key))
                    {
                        var r=returnValidationResultsOfPolicyObject(val,objCheck[key],objReturn[key]);
                        if(r=="")
                            delete objReturn[key];
                    }
                }
                else if(toString.call(val) === '[object Array]')
                {
                    //If the value is an array again pass it to returnValidationResultsOfOperatorArrays function
                    objReturn[key]=returnValidationResultsOfOperatorArrays(val,objCheck[key]);
                }
                else
                {
                    //If the value is a normal field then validate
                    if(objCheck[key]!=null && objCheck[key]!="")
                    {
                        delete objReturn[key]
                    }
                }
            });
            //If the validated object has no errors then remove it from the output
            if($.isEmptyObject(objReturn))
            {
                return "";
            }
            else
            {
                //Check whether there is id field or not. To find whether it's a array object like operators
                if(objCheck.hasOwnProperty("id"))
                {
                    //Then add the id field to the result to identify the object
                    objReturn["id"]=objCheck["id"];
                }
                return objReturn;
            }
        }

        // array of operators
        // objValid - required fields for the policy
        // objCheck - policy object to check
        // arrayObj - returns the array of operators 
        function returnValidationResultsOfOperatorArrays(objValid, objCheck){
            var arrayObj=[];
            var r=[];
            var i=0;
            var ids=[];
            $.each(objValid,function(key,val){
                const c=JSON.stringify(val);
                const c2=JSON.stringify(val);
                //This is to go though all the objects in the array. Like all the operators in the operator array
                $.each(objCheck, function(key,val){
                    if(toString.call(val) === '[object Object]')
                    {
                        //Create output array of objects
                        arrayObj.push(JSON.stringify(returnValidationResultsOfPolicyObject(JSON.parse(c),val,JSON.parse(c2))));  
                        i++;                 
                    }
                });
                return false;
            });
            for(j=0;j<i;j++)
            {
                arrayObj[j]=JSON.parse(arrayObj[j]);
            }
            return arrayObj;
        }
