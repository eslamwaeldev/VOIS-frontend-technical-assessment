import "@testing-library/jest-dom";

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "mocked-url");
});
