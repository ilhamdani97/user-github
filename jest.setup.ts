import "@testing-library/jest-dom/extend-expect";
import { server } from "./src/mocks/server"; // Adjust the path if needed

// Enable API mocking before running tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
