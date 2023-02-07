import { render, screen } from "@testing-library/react";
import ConfirmPassword from "./ConfirmPassword";

describe("confirm password", () => {
  it("TEST_CASE_16: check valid password and confirm", () => {
    render(
      <ConfirmPassword
        thePassword={"Dd123123@"} 
        confirmPassword={"Dd123123@"}/> );
    expect(screen.getByTitle("Tsimilar")).toBeVisible();
  });
  
  it("TEST_CASE_17: check difftent password and confirm", () => {
    render(
      <ConfirmPassword
        thePassword={"Dd123123@"}
        confirmPassword={"Aa987987@"} />);
    expect(screen.getByTitle("Xdiffrent")).toBeVisible();
  });

  it("TEST_CASE_18: check empty password and confirm", () => {
    render(
    <ConfirmPassword 
    thePassword={""} 
    confirmPassword={""} />);
    expect(screen.getByTitle("Xdiffrent")).toBeVisible();
  });
});
