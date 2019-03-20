package com.wizzeer.contractmanagment;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import com.wizzeer.contractmanagment.config.Config;
import com.wizzeer.contractmanagment.config.WebConfig;
import com.wizzeer.contractmanagment.config.WebSecurityConfig;



public class ContractManagmentApplication extends AbstractAnnotationConfigDispatcherServletInitializer{

	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class[] {Config.class, 
							WebSecurityConfig.class};
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		return new Class[] {WebConfig.class};
	}

	@Override
	protected String[] getServletMappings() {
		return new String[] {"/"};
	}
	
	
}
