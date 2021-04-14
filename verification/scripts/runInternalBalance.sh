certoraRun verification/harness/internalBalanceHarness.sol contracts/vault/ProtocolFeesCollector.sol verification/harness/DummyERC20.sol \
  verification/harness/FlashLoanReceiver.sol:Borrower verification/harness/WETH.sol \
  --verify internalBalanceHarness:verification/spec/internalBalance.spec \
  --link internalBalanceHarness:_protocolFeesCollector=ProtocolFeesCollector \
  --link internalBalanceHarness:_weth=WETH \
  --solc solc7.6 \
  --cache balancerInternalBalance \
  --settings -ignoreViewFunctions,-assumeUnwindCond,-copyLoopUnroll=2,-b=2 \
  --rule vault_has_no_relayers \
  --staging --msg "internalBalance rule vault_has_no_relayers first try"