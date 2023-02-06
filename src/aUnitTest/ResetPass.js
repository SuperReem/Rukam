const uppercaseRegExp = /(?=.*[A-Z])/;
const lowercaseRegExp = /(?=.*[a-z])/;
const digitsRegExp = /^(?=.*[0-9])/;
const minLengthRegExp = /.{8,}/;
function ResetPass({ thePassword }) {
  const allValid =
    minLengthRegExp.test(thePassword) &&
    digitsRegExp.test(thePassword) &&
    uppercaseRegExp.test(thePassword) &&
    lowercaseRegExp.test(thePassword);
  if (!minLengthRegExp.test(thePassword)) {
    return (  <> <p title="XminimumLessThan8">a</p></>);
  }
  if (!digitsRegExp.test(thePassword)) {
    return ( <> <p title="XnoDigit">a</p> </> );
  }
  if (!uppercaseRegExp.test(thePassword) ||!lowercaseRegExp.test(thePassword)) {
    return ( <> <p title="XnoUpperOrLower">a</p> </>);
  }
  if (allValid){
  return (<> <p title="Tdigit">a</p> <p title="T8ormore">a</p><p title="TupperAndLower">a</p> </>
  );}
}
export default ResetPass;