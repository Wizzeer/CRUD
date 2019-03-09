package com.wizzeer.contractmanagment;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;

import com.wizzeer.contractmanagment.contract.Contract;
import com.wizzeer.contractmanagment.contract.ContractService;

public class ContractManagmentApplication {

	public static void main(String[] args) {
		ApplicationContext ctx = new AnnotationConfigApplicationContext(com.wizzeer.contractmanagment.config.Config.class);
		LocalSessionFactoryBean sf = ctx.getBean(LocalSessionFactoryBean.class);
		Session s = sf.openSession();
		Contract contr = new Contract();
		contr.setClientName("name");
		contr.setContractType("contract");
		contr.setId(1);
		s.beginTransaction();
		s.save(contr);
		s.getTransaction().commit();
	}

}
