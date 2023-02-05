
const contains = /[\/[\]<>]/g;

function EditReport({ note  }) {
    if (note.length >= 120){
        return(<span title="errorMoreThan120" >"الحد الأعلى هو ١٢٠ حرف."</span>
        );
    }
    if (contains.test(note)){
        return(<span title="invalidNote">  </span>
        );
    }
    return(
        <span title="validNote"></span>
    );
};
export default EditReport;
