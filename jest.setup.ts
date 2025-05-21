import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { TextEncoder } from "util";

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}

/*************** Mocks ********************/

jest.mock("@/hooks/useSearchRecipes");
jest.mock("@/config/costants", () => ({
  localStorageKey: "test_key_mocked",
  baseUrl: "",
  linkedinUrl: "https://www.linkedin.com/in/ugo-galliano-a01889204/",
  githubUrl: "https://github.com/ugogalliano",
}));
jest.mock("@uidotdev/usehooks", () => ({
  useDebounce: jest.fn((value) => value),
}));
