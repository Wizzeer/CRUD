package com.wizzeer.contractmanagment.contract;

import java.util.List;

import javax.sql.DataSource;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Service;

@Service
@Configuration
public class ContractService {

	@Autowired
	private ContractDao contractDao;

	public List<Contract> getAllContracts() {
		return null;
	}

	public ContractDao getContractDao() {
		return contractDao;
	}

	public void setContractDao(ContractDao contractDao) {
		this.contractDao = contractDao;
	}



}
