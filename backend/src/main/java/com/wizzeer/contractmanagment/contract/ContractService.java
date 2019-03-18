package com.wizzeer.contractmanagment.contract;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContractService {

	@Autowired
	private ContractDao contractDao;
	
	@Transactional
	public Contract getContract(int id) {
		return contractDao.getContract(id);
	}
	
	@Transactional
	public List<Contract> getAllContracts() {
		return contractDao.getAllContracts();
	}

	@Transactional
	public void addContract(Contract contract) {
		contractDao.addContract(contract);
	}

	@Transactional
	public void updateContract(Contract contract, int id) {
		contractDao.updateContract(contract, id);
	}
	
	@Transactional
	public void deleteContract(int id) {
		contractDao.deleteContract(id);
	}
	

}
