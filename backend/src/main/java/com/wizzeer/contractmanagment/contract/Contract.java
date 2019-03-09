package com.wizzeer.contractmanagment.contract;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public
class Contract {

	@Id
	private int id;
	private String clientName;
	private String contractType;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getContractType() {
		return contractType;
	}

	public void setContractType(String contractType) {
		this.contractType = contractType;
	}

}
