const ex = /[&\/[$\]\\#,;@!+()$~%.'":*?<>{}]/g;
export const handleSubmit =  (droneName ="") => {
    if(droneName.trim().replace(" ","").length==0){ //if empty oronly ws
                return false;
            }else if (droneName.length < 2) {
                return false; }
             else if (droneName.length >= 2) {
                if (droneName.length >10) {
                    return false;
                }if( ex.test(droneName)){
                    return false;
                }else{
                    return true;} } 
};

export const handelRegion =  (region ="") => {
    if(region!="حطين"&&region!="النخيل"&&region!="عرقه"){
                return false;
            }else{
                 return true;} 
};

