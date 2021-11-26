/* eslint-disable jest-dom/prefer-to-have-text-content */
import ReactDOM from "react-dom";

import { Counter } from "./";

beforeEach(() => {
  document.body.innerHTML = "";
});

test("counter increments and decrements when the buttons are clicked", () => {
  const div = document.createElement("div");
  document.body.append(div);
  ReactDOM.render(<Counter />, div);

  const [decrement, increment] = div.querySelectorAll("button");
  const count = div.querySelector("span");

  expect(count!.textContent).toBe("0");

  increment.click();
  expect(count!.textContent).toBe("1");

  decrement.click();
  expect(count!.textContent).toBe("0");
});
