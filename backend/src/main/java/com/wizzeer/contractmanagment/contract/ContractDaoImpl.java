package com.wizzeer.contractmanagment.contract;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ContractDaoImpl implements ContractDao {
	
	private SessionFactory sessionFactory;
	
	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory=sessionFactory;
	}


	
	public void addContract(Contract contract) {
		this.sessionFactory.getCurrentSession() 
			.save(contract);
		
	}


	public void deleteContract(int id) {
		// TODO Auto-generated method stub
		
	}

	

}
