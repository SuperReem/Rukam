import { render, screen } from "@testing-library/react";
import ResetPass from "./ResetPass";
describe("The Password", () => {
  it("TEST_CASE_11: check valid password", () => {
    render(<ResetPass thePassword={"Dd123123@"} />);
    expect(screen.getByTitle("Tdigit")).toBeVisible();
    expect(screen.getByTitle("T8ormore")).toBeVisible();
    expect(screen.getByTitle("TupperAndLower")).toBeVisible();
  });
  it("TEST_CASE_12: check missing upercase", () => {
    render(<ResetPass thePassword={"dd123123@"} />);
    expect(screen.getByTitle("XnoUpperOrLower")).toBeVisible();
  });
  it("TEST_CASE_13: check missing lowercase", () => {
    render(<ResetPass thePassword={"DD123123@"} />);
    expect(screen.getByTitle("XnoUpperOrLower")).toBeVisible();
  });
  it("TEST_CASE_14: check less then 8", () => {
    render(<ResetPass thePassword={"Dd123@"} />);
    expect(screen.getByTitle("XminimumLessThan8")).toBeVisible();
  });
  it("TEST_CASE_15: check missing digit", () => {
    render(<ResetPass thePassword={"Ddaaaaaa@"} />);
    expect(screen.getByTitle("XnoDigit")).toBeVisible();
  });});


  