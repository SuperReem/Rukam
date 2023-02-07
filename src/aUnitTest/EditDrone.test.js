const { EditDroneName, EditRegion, EditPhoto } = require("./EditDrone");

describe("EDIT_DRONE_PHOTO_TEST", () => {
  it("TEST_CASE_30: check updating photo with valid photo ", () => {
    expect(EditPhoto("saqer.jpg")).toBe(true);
  });
  it("TEST_CASE_31: check deleting photo ", () => {
    expect(EditPhoto("")).toBe(true);
  });
  it("TEST_CASE_32: check updating photo with Invalid photo extention ", () => {
    expect(EditPhoto("saqer.docx")).toBe(false);
  });
});
describe("EDIT_DRONE_NAME_TEST", () => {
  it("TEST_CASE_33: check valid drone name", () => {
    expect(EditDroneName("صقر 1")).toBe(true);
  });
  //INVALID TCs
  it("TEST_CASE_35: check change drone name with only white spaces", () => {
    expect(EditDroneName("      ")).toBe(false);
  });
  it("TEST_CASE_36: check update drone name to less then two char", () => {
    expect(EditDroneName("ص")).toBe(false);
  });
  it("TEST_CASE_37: check updadte drone name more than 10", () => {
    expect(EditDroneName("الشيخ صقر طويل العمر")).toBe(false);
  });
  it("TEST_CASE_38: check drone name adding special char", () => {
    expect(EditDroneName("ص|ق*ر٪")).toBe(false);
  });
  it("TEST_CASE_39: check delete drone name", () => {
    expect(EditDroneName("")).toBe(false);
  });
});
describe("EDIT_DRONE_REGION_TEST", () => {
  it("TEST_CASE_40: check change region with valid region", () => {
    expect(EditRegion("النخيل")).toBe(true);
  });
  it("TEST_CASE_41: check change region with only white spaces", () => {
    expect(EditRegion("الياسمين")).toBe(false);
  });
  it("TEST_CASE_42: check delete region", () => {
    expect(EditRegion("")).toBe(false);
  });
});
