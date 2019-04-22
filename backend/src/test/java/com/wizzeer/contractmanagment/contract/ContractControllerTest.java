package com.wizzeer.contractmanagment.contract;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class ContractControllerTest {
	
	@MockBean
	ContractDaoImpl contracts;

    @Autowired
    ObjectMapper objectMapper;
	
	@Autowired
    private MockMvc mockMvc;
	
	@Before
    public void setUp() {
		
		Contract contract = new Contract();
		contract.setClientName("username");
		
        given(this.contracts.getContract(1))
            .willReturn(contract);

        given(this.contracts.addContract(any(Contract.class)))
            .willReturn(contract);

    }

	@Test
    public void testGetContractUnauthorized() throws Exception {

        this.mockMvc
            .perform(
                get("/contracts/{id}", 1)
                    .accept(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isForbidden());

    }
	
	@Test
    public void testGetAllContractsUnauthorized() throws Exception {

        this.mockMvc
            .perform(
                get("/contracts/")
                    .accept(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isForbidden());

    }
	
	@Test
    public void testDeleteContractUnauthorized() throws Exception {

        this.mockMvc
            .perform(
                delete("/contracts/{id}", 1)
                    .accept(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isForbidden());

    }
	
	@Test
    public void testUpdateContractUnauthorized() throws Exception {

        this.mockMvc
            .perform(
                put("/contracts/{id}", 1)
                    .accept(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isForbidden());

    }
	
	@Test
    public void testAddContractUnauthorized() throws Exception {

        this.mockMvc
            .perform(
                post("/contracts")
                    .accept(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isForbidden());

    }

}

