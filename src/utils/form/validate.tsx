export default function validate(getValidationSchema) {

    return (values) => {
        console.log(values)
        const validationSchema = getValidationSchema(values);
        try {
            validationSchema.validateSync(values, { abortEarly: false });
            return {}
        } catch (error) {
            return getErrorsFromValidationError(error)
        }
    }
}

function getErrorsFromValidationError(validationError) {
    const FIRST_ERROR = 0;
    window['asd'] = validationError;
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR],
        }
    }, {})
}