package com.realestate.due_diligence_agent.dto;

import com.realestate.due_diligence_agent.entity.Role;

public class SelectRoleRequest {

    private String email;
    private Role role;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}