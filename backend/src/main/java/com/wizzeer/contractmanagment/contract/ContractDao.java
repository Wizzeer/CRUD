package com.wizzeer.contractmanagment.contract;

import java.util.List;

public interface ContractDao{
	
	List<Contract> getAllContracts();
	Contract getContract(int id);
	void addContract(Contract contract);
	void deleteContract(int id);
	void updateContract(Contract contract, int id);
}
