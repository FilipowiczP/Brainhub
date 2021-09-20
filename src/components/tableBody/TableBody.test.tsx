import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";
import TableBody from "./TableBody";

let container: any | null = null;

//    === SET ELEMENT DOM AS RENDER TARGET ===
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

//   --- CLEAR AFTER ---
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("show event/ user", () => {
  act(() => {
    render(
      <TableBody
        firstName="Jan"
        lastName="Nowak"
        email="Jan.Nowak@gmail.com"
        eventDate="2020-01-02"
      />,
      container
    );
  });

  expect(
    container.querySelector("[data-testid='firstName']").textContent
  ).toEqual("Jan");
  expect(
    container.querySelector("[data-testid='lastName']").textContent
  ).toEqual("Nowak");
  expect(container.querySelector("[data-testid='email']").textContent).toEqual(
    "Jan.Nowak@gmail.com"
  );
  expect(container.querySelector("[data-testid='date']").textContent).toEqual(
    "2020-01-02"
  );
});
