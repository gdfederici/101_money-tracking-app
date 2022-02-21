const WalletModule = require("./Wallet");
const mockedStructures = require("../../../jest/mockedStructures");
const WalletEnums = require("./enums");

describe ("Wallet testing suite", function() {
    beforeEach(function() {
        localStorage.clear();
    });
    it("First instance should be an empty Wallet", function() {
        const wallet = new WalletModule.Wallet();
        expect(wallet.getBalance()).toBe(0);
        expect(wallet.getOperations().length).toBe(0);
    });
    it("addOperation: it works adding the correct balance and operations list", function() {
        const wallet = new WalletModule.Wallet();
        wallet.addOperation(mockedStructures.incomeOperation);
        expect(wallet.getBalance()).toBe(mockedStructures.incomeOperation.amount);
        expect(wallet.getOperations().length).toBe(1);
    });
    it("addOperation: it works removing the correct balance and operations list", function() {
        const wallet = new WalletModule.Wallet();
        wallet.addOperation(mockedStructures.outOperation);
        expect(wallet.getBalance()).toBe(-mockedStructures.outOperation.amount);
        expect(wallet.getOperations().length).toBe(1);
    });
    it("addOperation: it works adding the correct balance and operations list", function() {
        const wallet = new WalletModule.Wallet();
        try {
            wallet.addOperation(mockedStructures.invalidOperation);
        } catch(e) {
            expect(e.message).toBe(WalletEnums.WalletErrors.INVALID_OPERATION);
        }
    });
    it("removeOperation: it works removing an income operation", function () {
        const wallet = new WalletModule.Wallet();
        wallet.addOperation(mockedStructures.incomeOperation);
        const lastOperationAdded = wallet.getOperations()[0];
        wallet.removeOperation(lastOperationAdded.date);
        expect(wallet.getBalance()).toBe(0);
        expect(wallet.getOperations().length).toBe(0);
    });
    it("removeOperation: it works removing an outcome operation", function () {
        const wallet = new WalletModule.Wallet();
        wallet.addOperation(mockedStructures.outOperation);
        const lastOperationAdded = wallet.getOperations()[0];
        wallet.removeOperation(lastOperationAdded.date);
        expect(wallet.getBalance()).toBe(0);
        expect(wallet.getOperations().length).toBe(0);
    });
    it("removeOperation: it fires the correct error when date/id not found", function () {
        const wallet = new WalletModule.Wallet();
        try {
            wallet.removeOperation(242389239);
        } catch(e) {
            expect(e.message).toBe(WalletEnums.WalletErrors.OPERATION_NOT_FOUND);
        }
    });
    it("findOperation: it works finding a corret description", function() {
        const wallet = new WalletModule.Wallet();
        wallet.addOperation(mockedStructures.incomeOperation);
        const searchValue = mockedStructures.incomeOperation.description.substring(0, 2);
        const operationsFound = wallet.findOperation(searchValue);
        expect(operationsFound.length).toBe(1);
    });
    it("saveWallet: it works adding a new operation", function() {
        const wallet = new WalletModule.Wallet();
        wallet.addOperation(mockedStructures.incomeOperation);
        const savedWallet = localStorage.getItem("wallet");
        expect(JSON.parse(savedWallet)).toEqual({ balance: wallet.getBalance(), operations: wallet.getOperations() })
    });
});