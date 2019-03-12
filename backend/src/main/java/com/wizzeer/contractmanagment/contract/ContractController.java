package com.wizzeer.contractmanagment.contract;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api")
public class ContractController {
	
	@Autowired
	private ContractService contractService;
	
	@PostMapping("/topics")
	public void addContract(@RequestBody Contract contract) {
		contractService.addContract(contract);
	}

}
