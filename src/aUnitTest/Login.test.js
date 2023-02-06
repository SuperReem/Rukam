const { handleSubmit } = require("./Login");
  it("TEST_CASE_1: check valid email", () => {
    expect(handleSubmit("deemmf0@gmail.com")).toBe(true);
  });
  it("TEST_CASE_2: check empty email", () => {
    expect(handleSubmit("")).toBe(false);
  });
  it("TEST_CASE_3: check invalid emailName", () => {
    expect(handleSubmit("$$@gmail.com")).toBe(false);
  });
  it("TEST_CASE_4: check missing emailName", () => {
    expect(handleSubmit("@gmail.com")).toBe(false);
  });
  it("TEST_CASE_5: check missing @", () => {
    expect(handleSubmit("deemmf0gmail.com")).toBe(false);
  });
  it("TEST_CASE_6: check invalid domain", () => {
    expect(handleSubmit("deemmf0@#.com")).toBe(false);
  });
  it("TEST_CASE_7: check missing domain", () => {
    expect(handleSubmit("deemmf0@.com")).toBe(false);
  });
  it("TEST_CASE_8: check missing dot", () => {
    expect(handleSubmit("deemmf0@gmailcom")).toBe(false);
  });
  it("TEST_CASE_9: check invalid address", () => {
    expect(handleSubmit("deemmf0@gmail.c")).toBe(false);
  });
  it("TEST_CASE_10: check missing address", () => {
    expect(handleSubmit("deemmf0@gmail.")).toBe(false);
  });



//   describe("LOG_IN_EMAIL_TEST", () => {

// });

