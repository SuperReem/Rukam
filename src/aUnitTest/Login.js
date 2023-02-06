const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  export const handleSubmit =  (str ) => {
    if (str === "") {
      return false;
    } else if (!str.match(isValidEmail)) {
      return false;
    } else {
      return true;
    }
  };