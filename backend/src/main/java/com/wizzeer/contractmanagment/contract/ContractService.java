package com.wizzeer.contractmanagment.contract;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractService {

	@Autowired
	private ContractDao contractDao;

	public void addContract(Contract contract) {
		contractDao.addContract(contract);
	}



}
