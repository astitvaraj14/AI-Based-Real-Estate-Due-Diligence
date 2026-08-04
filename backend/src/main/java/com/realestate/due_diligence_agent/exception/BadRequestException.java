package com.realestate.due_diligence_agent.exception;

/**
 * Thrown when a request is invalid or cannot be processed as submitted
 * (validation failures that aren't already covered by bean validation,
 * business-rule violations, duplicate records, etc.). Handled by
 * GlobalExceptionHandler and mapped to HTTP 400.
 */
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}