package com.wizzeer.contractmanagment.user;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class ApplicationUserController {

	private SessionFactory sessionFactory;

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	private ApplicationUserRepository applicationUserRepository;
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public ApplicationUserController(ApplicationUserRepository applicationUserRepository,
			BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.applicationUserRepository = applicationUserRepository;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}
	
	@ResponseBody
	@PostMapping("/sign-up")
	public String signUp(@RequestBody ApplicationUser user) {
		Session session = sessionFactory.getCurrentSession();
		if(session.createQuery("from ApplicationUser u where u.username='"+user.getUsername()+"'").uniqueResult()==null) {
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
			applicationUserRepository.save(user);
			return "{\"response\": \"User added succesfully\"}";
		}
		else {
			return "{\"response\": \"User already exist\"}";
		}
		
	}

	@RequestMapping("/find/{username}")
	public void getUser(@PathVariable String username) {
		applicationUserRepository.findByUsername(username);
	}
}