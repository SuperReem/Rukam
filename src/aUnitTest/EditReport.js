
function EditReport({ note  }) {
    if (note.length >= 120){ return(<span title="errorMoreThan120" >"الحد الأعلى هو ١٢٠ حرف."</span> );}
    if (note.length==0){
    return( <span title="addnote"  ></span>);}
    return( <span title="validNote"></span>);
};
export default EditReport;