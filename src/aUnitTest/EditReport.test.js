import { render, screen } from "@testing-library/react";
import EditReport from "./EditReport";


describe("EditReport", () => {
  
    it("check valid Note ", () => {
      render(<EditReport note={"هذه مخلفات بناء"}  />);
      expect(screen.getByTitle("validNote")).toBeVisible();
     });
    //   expect(screen.getByText(note)).toBeVisible();

    it("check more than 120 char", () => {
        render(<EditReport note={"هذه مخلفات بناء هناك مخلفات على الأرض كما ترون في الصورة يجب الاستقصاء أولا عن الموقع هذه مخلفات بناء هناك مخلفات على الأرض كما ترون في الصورة يجب الاستقصاء أولا عن الموقع هذه مخلفات بناء هناك مخلفات على الأرض"}  />);
        expect(screen.getByTitle("errorMoreThan120")).toBeVisible();
    });

    it("check Invalid char ", () => {
        render(<EditReport note={"this is > hhh"}  />);
        expect(screen.getByTitle("invalidNote")).toBeVisible();
    });
    

});
