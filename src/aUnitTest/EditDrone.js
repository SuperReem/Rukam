const ex = /[&\/[$\]\\#,;@!+()$~%.'":*?<>{}]/g;

export const EditDroneName = (droneName ) => {
  if (droneName.trim().replace(" ", "").length == 0) {
    //if empty oronly ws
    return false;
  } else if (droneName.length < 2) {
    return false;
  } else 
    if (droneName.length > 10) {
      return false;
    }
    if (ex.test(droneName)) {
      return false;
    } else {
      return true;
    }

};
export const EditRegion = (region ) => {
  if (region != "حطين" && region != "النخيل" && region != "عرقه") {
    return false;
  } else {
    return true;
  }
};
export const EditPhoto = (file ) => {
  const checkJPG = file.endsWith(".jpg");
  const checkPNG = file.endsWith(".png");
  const checkJPEG = file.endsWith(".jpeg");
  const emtpy = file.length == 0;

  if (checkPNG || checkJPG || checkJPEG || emtpy) {
    return true;
  } else {
    return false;
  }
};
