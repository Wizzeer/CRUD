package com.wizzeer.contractmanagment.contract;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContractController {
	
	@Autowired
	private ContractService contractService;
	
	@RequestMapping("/contracts")
	public List<Contract> getAllContracts() {
		return contractService.getAllContracts(); 
	}
	
	@RequestMapping("/contracts/{id}")
	public Contract getContract(@PathVariable int id) {
		return contractService.getContract(id);
	}
	
	@PutMapping("/contracts/{id}")
	public void updateContract(@RequestBody Contract contract, @PathVariable int id) {
		contractService.updateContract(contract, id);
	}
	
	@PostMapping("/contracts")
	public void addContract(@RequestBody Contract contract) {
		contractService.addContract(contract);
	}
	
	@DeleteMapping("/contracts/{id}")
	public void deleteContract(@PathVariable int id) {
		contractService.deleteContract(id);
	}
	
}
