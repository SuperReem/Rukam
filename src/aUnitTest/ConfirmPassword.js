function ConfirmPassword({ thePassword , confirmPassword }) {
    if (thePassword !== "") {
      if (thePassword === confirmPassword) {
        return (<> <p title="Tsimilar">a</p></>  );  } }
    return ( <> <p title="Xdiffrent">a</p></>);
};
export default ConfirmPassword;