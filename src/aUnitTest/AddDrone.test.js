const { handleSubmit, handelRegion, PhotoUplaod } = 
require("./AddDrone");
describe("ADD_DRONE_NAME_TEST", () => {
  it("TEST_CASE_19: check valid drone name", () => {
    expect(handleSubmit("Drone54")).toBe(true);
  });
  it("TEST_CASE_20: check empty", () => {
    expect(handleSubmit("")).toBe(false);
  });
  it("TEST_CASE_21: check only white spaces", () => {
    expect(handleSubmit("   ")).toBe(false);
  });
  it("TEST_CASE_22: check less then two char", () => {
    expect(handleSubmit("d")).toBe(false);
  });
  it("TEST_CASE_23: check more than 10", () => {
    expect(handleSubmit("Drone Number 54")).toBe(false);
  });
  it("TEST_CASE_24: check with special char", () => {
    expect(handleSubmit("drone$f#7")).toBe(false);
  });});
describe("ADD_DRONE_REGION_TEST", () => {
  it("TEST_CASE_25: check valid region", () => {
    expect(handelRegion("حطين")).toBe(true);
  });
  it("TEST_CASE_26: check empty region", () => {
    expect(handelRegion("")).toBe(false);
  });
  it("TEST_CASE_27: check only white spaces", () => {
    expect(handelRegion("الروضة")).toBe(false);
  });});
describe("ADD_DRONE_PHOTO_TEST", () => {
  it("TEST_CASE_28: check valid photo ", () => {
    expect(PhotoUplaod("Drone54.png")).toBe(true);
  });
  it("TEST_CASE_29: check Invalid photo extention ", () => {
    expect(PhotoUplaod("Drone54.pdf")).toBe(false);
  });
  it("TEST_CASE_29: check empty photo  ", () => {
    expect(PhotoUplaod("")).toBe(true);
  });
});
