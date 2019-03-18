package com.wizzeer.contractmanagment.contract;

import java.util.List;

import org.hibernate.Session;
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
		sessionFactory.getCurrentSession() 
		.save(contract);
		
	}


	public void deleteContract(int id) {
		Session session = sessionFactory.getCurrentSession();
		Contract contract = session.byId(Contract.class).load(id);
		session.delete(contract);
	}



	public List<Contract> getAllContracts() {
		Session session = sessionFactory.getCurrentSession();
		@SuppressWarnings("unchecked")
		List<Contract> list = session.createQuery("from Contract").list();
		return list;
	}


	public Contract getContract(int id) {
		return sessionFactory.getCurrentSession().get(Contract.class, id);
	}



	public void updateContract(Contract contract, int id) {
		Session session = sessionFactory.getCurrentSession();
		Contract contractInDb = session.byId(Contract.class).load(id);
		contractInDb.setClientName(contract.getClientName());
		contractInDb.setContractType(contract.getContractType());
		session.flush();
	}


	

}
