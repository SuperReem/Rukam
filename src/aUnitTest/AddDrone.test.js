const { handleSubmit, handelRegion } = require("./AddDrone");
describe("ADD_DRONE_NAME_TEST", () => {
  it("TEST_CASE_: check valid drone name", () => {
    expect(handleSubmit("Drone54")).toBe(true);
  });
  //INVALID TCs
  it("TEST_CASE_: check empty", () => {
    expect(handleSubmit("")).toBe(false);
  });
  it("TEST_CASE_: check only white spaces", () => {
    expect(handleSubmit("   ")).toBe(false);
  });
  it("TEST_CASE_: check less then two char", () => {
    expect(handleSubmit("d")).toBe(false);
  });
  it("TEST_CASE_: check more than 10", () => {
    expect(handleSubmit("Drone Number 54")).toBe(false);
  });
  it("TEST_CASE_: check with special char", () => {
    expect(handleSubmit("drone$f#7")).toBe(false);
  });
});
describe("ADD_DRONE_REGION_TEST", () => {
    it("TEST_CASE_: check valid drone name", () => {
      expect(handelRegion("حطين")).toBe(true);
    });
    it("TEST_CASE_: check valid drone name", () => {
        expect(handelRegion("النخيل")).toBe(true);
    });
    it("TEST_CASE_: check valid drone name", () => {
        expect(handelRegion("عرقه")).toBe(true);
    });
    //INVALID TCs
    it("TEST_CASE_: check empty", () => {
      expect(handelRegion("")).toBe(false);
    });
    it("TEST_CASE_: check only white spaces", () => {
      expect(handelRegion("الروضة")).toBe(false);
    });
  });
  
