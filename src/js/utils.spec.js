const utils = require("./utils");
const mockedStructures = require("../../jest/mockedStructures");

describe("Utils testing suite", function() {

    beforeEach(function() {
        localStorage.removeItem("wallet");
    });
    it("findIndex returns corret index", function() {
        const list = [1, 2, 3, 4];
        const index = utils.findIndex(list, function(item) {
            return item === 3;
        });
        expect(index).toBe(2);
    });
    it("findIndex return -1 when item not found", function() {
        const list = [1,2,3,4];
        const index = utils.findIndex(list, function(item) {
            return item === 10;
        });
        expect(index).toBe(-1);
    });
    it("isValidOperation returns true if operation is valid", function() {
        expect(utils.isValidOperation(mockedStructures.incomeOperation)).toBeTruthy();
    });
    it("isValidOperation returns false if operation is not valid", function() {
        expect(utils.isValidOperation(mockedStructures.invalidOperation)).toBeFalsy();
    });
    it("getWallet returns correct wallet if it exists in the local storage", function() {
        const wallet = {
            balance: 1000,
            operations: [mockedStructures.incomeOperation]
        }
        localStorage.setItem('wallet', JSON.stringify(wallet));
        expect(utils.getWallet()).toEqual(wallet);
    });
    it("getWallet returns standard wallet if it doesn't exist in the local storage", function() {
        const wallet = {
            balance: 0,
            operations: []
        }
        expect(utils.getWallet()).toEqual(wallet);
    });
});