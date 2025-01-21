import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";

const validationError = async (
  input: any
): Promise<ValidationError[] | false> => {
  const errors = await validate(input, {
    validationError: { target: true },
  });

  if (errors.length) {
    return errors;
  }

  return false;
};

// RequestValidator is taking in Type of DTO like "CreateProductRequest"
export const RequestValidator = async <T>(
  type: ClassConstructor<T>,
  body: any // accepting req.body
): Promise<{ errors: boolean | string; input: T }> => {
  console.log('requestValidator type 3', type)
  console.log('requestValidator body 3', body)
  
  const input = plainToClass(type, body);
  console.log('requestValidator typeof input 4', typeof input)
  console.log('requestValidator input 4', input)

  const errors = await validationError(input);
  if (errors) {
    const errorMessage = errors
      .map((error: ValidationError) =>
        (Object as any).values(error.constraints)
      )
      .join(", ");
    return { errors: errorMessage, input };
  }

  return { errors: false, input };
};
