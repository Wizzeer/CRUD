package com.wizzeer.contractmanagment.contract;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
@EnableWebMvc
@RestController
public class ContractController {
	
	@Autowired
	private ContractService contractService;
	
	@CrossOrigin(origins = "http://localhost:8080")
	@RequestMapping("/contracts")
	public Contract addContract(/*@RequestBody Contract contract*/) {
		//contractService.addContract(contract);
		Contract ctr = new Contract();
		ctr.setId(1);
		ctr.setClientName("name");
		ctr.setContractType("s");
		return ctr;
	}
	

}
