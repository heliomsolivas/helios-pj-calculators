import { convertMoneyMaskToNumber } from "@/utils/utils.js";

describe("Conversion of Masked Values", () => {
  it("Checks if the conversion works correctly", () => {
    const res = convertMoneyMaskToNumber("R$ 72.000,00");
    expect(res).toEqual(72000);
  });

  it("Should return nothing if masked money is not a string", () => {
    const res = convertMoneyMaskToNumber(720000);
    expect(res).toBeNull;
  });
});
