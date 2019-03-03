package com.wizzeer.contractmanagment.contract;

public class Contract {
	private int id;
	private String clientName;
	private String ContractType;
	
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
		return ContractType;
	}
	public void setContractType(String contractType) {
		ContractType = contractType;
	}
	
	
}
