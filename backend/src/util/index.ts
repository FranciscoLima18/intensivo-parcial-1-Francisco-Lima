import { createError } from "@fastify/error";

// createError(code, message [, statusCode [, Base [, captureStackTrace]]])
export const UCUError = createError("UCU_0001", "Error UCU: %s", 500, Error);
export const UCUNoAutorizadoError = createError(
  "UCU_0002",
  "No autorizado",
  401,
  Error
);
export const UCUNoEncontradoError = createError(
  "UCU_0003",
  "No se encontró el elemento %s",
  404,
  Error
);

export const UCUError2 = createError("UCUError", "UCU Error occurred: %s", 500);
export const UCUErrorUnauthorized = createError(
  "UCUErrorUnauthorized",
  "UCU Unauthorized: %s",
  401
);
export const UCUErrorBadRequest = createError(
  "UCUErrorBadRequest",
  "UCU Bad Request: %s",
  400
);
export const UCUErrorNotFound = createError(
  "UCUErrorNotFound",
  "UCU Resource not found: %s",
  404
);
export const UCUErrorConflict = createError(
  "UCUErrorConflict",
  "UCU Conflict: %s",
  409
);
