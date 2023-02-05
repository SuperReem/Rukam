import { render, screen } from "@testing-library/react";
// const { ConfirmPassword } = require("./ConfirmPassword");
import ConfirmPassword from "./ConfirmPassword";



describe("confirm password", () => {
  
    it("check valid password and confirm", () => {
      render(<ConfirmPassword thePassword={"Dd123123@"} confirmPassword={"Dd123123@"}  />);
      expect(screen.getByTitle("Tsimilar")).toBeVisible();
     });
     it("check difftent password and confirm", () => {
      render(<ConfirmPassword thePassword={"Dd123123@"} confirmPassword={"Aa987987@"}  />);
      expect(screen.getByTitle("Xdiffrent")).toBeVisible();
     });
     it("check empty password and confirm", () => {
      render(<ConfirmPassword thePassword={""} confirmPassword={""}  />);
      expect(screen.getByTitle("Xdiffrent")).toBeVisible();
     });
});
