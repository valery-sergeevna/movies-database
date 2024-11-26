import { getCurrentDate } from "./dates.helper";

describe("should return the correct month and day for the mocked current date", () => {
    beforeAll(() => {
        // Mock the current date to a known value
        const fixedDate = new Date(2024, 10, 25);
        jest.spyOn(globalThis, "Date").mockImplementation(
            () => fixedDate as Date,
        );
    });

    afterAll(() => {
        // Restore the original Date implementation
        jest.restoreAllMocks();
    });

    it("should return the correct month and day", () => {
        const result = getCurrentDate();

        // Check if the month and day are returned correctly as two-digit strings
        expect(result.month).toBe("11");
        expect(result.day).toBe("25");
    });
});
