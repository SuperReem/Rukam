import { render, screen } from "@testing-library/react";
import EditReport from "./EditReport";

describe("EditReport", () => {
  it("TEST_CASE_43: check valid Note ", () => {
    render(<EditReport note={"هذه مخلفات بناء"} />);
    expect(screen.getByTitle("validNote")).toBeVisible();
  });
  it("TEST_CASE_44: check delete Note ", () => {
    render(<EditReport note={""} />);
    expect(screen.getByTitle("addnote")).toBeVisible();
  });
  it("TEST_CASE_45: check more than 120 char", () => {
    render(
      <EditReport
        note={
          "هذه مخلفات بناء هناك مخلفات على الأرض كما ترون في الصورة يجب الاستقصاء أولا عن الموقع هذه مخلفات بناء هناك مخلفات على الأرض كما ترون في الصورة يجب الاستقصاء أولا عن الموقع هذه مخلفات بناء هناك مخلفات على الأرض"
        }
      />
    );
    expect(screen.getByTitle("errorMoreThan120")).toBeVisible();
  });
});

