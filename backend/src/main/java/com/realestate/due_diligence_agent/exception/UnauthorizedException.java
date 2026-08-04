package com.realestate.due_diligence_agent.exception;

/**
 * Thrown when a request cannot be authenticated (invalid credentials,
 * incorrect password, expired session, etc.). Distinct from
 * org.springframework.security.access.AccessDeniedException, which is used
 * for authenticated-but-forbidden (403) cases. Handled by
 * GlobalExceptionHandler and mapped to HTTP 401.
 */
public class UnauthorizedException extends RuntimeException {

    public UnauthorizedException(String message) {
        super(message);
    }

    public UnauthorizedException(String message, Throwable cause) {
        super(message, cause);
    }
}