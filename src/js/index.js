(function() {
    var wallet;
    function addOperation() {

    }
    function removeOperation() {

    }
    function findOperation() {

    }
    function getBalance() {
        return wallet.getBalance();
    }
    function getOperation() {
        return wallet.getOperations();
    }

    document.addEventListener('DOMContentLoaded', function() {
        wallet = new Wallet();
    });
})();