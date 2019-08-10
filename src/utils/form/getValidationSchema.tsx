import * as yup from 'yup';


export const ERROR_MESSAGES = {
    required: field => `${field} is required!`,
    invalid: field => `${field} is not valid!`,
    min: (field, len) => `${field} has to be longer than ${len} characters!`,
    number: (field) => `${field} must be number!`,
    passwordConfirmation: 'Passwords are not the same!'
};

export const email = yup.string().email(ERROR_MESSAGES.invalid('E-mail')).required(ERROR_MESSAGES.required('E-mail'));
export const password = yup.string().min(8, ERROR_MESSAGES.min('Password', 8)).required(ERROR_MESSAGES.required('Password'));
export const firstName = yup.string().required(ERROR_MESSAGES.required('First Name'));
export const lastName = yup.string().required(ERROR_MESSAGES.required('Last Name'));
const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;


const validationSchema = {
    email,
    first_name: firstName,
    last_name: lastName,
    password: yup.string()
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/, 'Password expresion that requires one letter, one digit and one number.')
        .min(8, ERROR_MESSAGES.min('Password', 8))
        .required(ERROR_MESSAGES.required('Password')),
    passwordConfirmation: values => yup.string().oneOf([values.password], ERROR_MESSAGES.passwordConfirmation).required(ERROR_MESSAGES.required('Confirm password')),
    name: yup.string().required(ERROR_MESSAGES.required('Name')),
    address: yup.string(),
    template_name: yup.string().required(ERROR_MESSAGES.required('Template Name')),
    street: yup.string(),
    city_state_zip: yup.string(),
    phone: yup.string(),
    fax: yup.string(),
    representative_title: yup.string(),
    content: yup.string().required(ERROR_MESSAGES.required('Content')),
    contact_name: yup.string().required(ERROR_MESSAGES.required('Contact Name')),
    property: yup.string().required(ERROR_MESSAGES.required('Property')),
    gl_account: yup.string().required(ERROR_MESSAGES.required('GL name')),
    gl_code: yup.string().required(ERROR_MESSAGES.required('GL number')),
    file: yup.mixed().required('is required')
};

export const propertyManagerModal = {
    name: yup.string().required(ERROR_MESSAGES.required('Name')),
    address: yup.string().required(ERROR_MESSAGES.required('Address')),
    street: yup.string().required(ERROR_MESSAGES.required('Street')),
    city_state_zip: yup.string().required(ERROR_MESSAGES.required('City/State/Zip')),
    phone: yup.string().required(ERROR_MESSAGES.required('Phone')).matches(phoneRegExp, ERROR_MESSAGES.invalid('Phone')),
    representative_title: yup.string().required(ERROR_MESSAGES.required('Representative Title')),
};

export const vendorCategoryValidationSchema = {
    each_occourrence: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.number('EACH OCCURRENCE')),
    damage_to_rented_premises: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.number('DAMAGE TO RENTED PREMISES')),
    med_exp: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.number('MED EXP')),
    personal_adv_injury: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.number('PERSONAL & ADV INJURY')),
    general_aggregate: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.number('GENERAL AGGREGATE')),
    products_comp: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.number('PRODUCTS - COMP/OP AGG')),
    combined_single_limit: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.number('COMBINED SINGLE LIMIT')),
    bodily_injury_per_person: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.number('BODILY INJURY (PER PERSON)')),
    bodily_injury_per_accident: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.number('BODILY INJURY (PER ACCIDENT)')),
    property_damage_per_accident: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.number('PROPERTY DAMAGE (PER ACCIDENT)')),
    each_occurence: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.number('EACH OCCURRENCE')),
    aggregate: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.number('AGGREGATE')),
    each_accident: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.number('E.L. EACH ACCIDENT')),
    disease_ea_employee: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.number('E.L. DISEASE - EA EMPLOYEE')),
    disease_policy_limit: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.number('E.L. DISEASE - POLICY LIMIT')),
    name: yup.string().required('Name is Required'),
};

export const validationSchemaForCoisVeiw = {
    insured: yup.string().required('Insured is required'),
    // certificate_holder: yup.string().required('Certificate Holder is required'),
    each_occurence: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.invalid('each_occurence')),
    damage_to_rented_premises: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.invalid('damage_to_rented_premises')),
    med_exp: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.invalid('med_exp')),
    personal_adv_injury: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.invalid('personal_adv_injury')),
    products_comp: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.invalid('products_comp')),
    general_aggregate: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.invalid('general_aggregate')),
    bodily_injury_per_person: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.invalid('bodily_injury_per_person')),
    bodily_injury_per_accident: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.invalid('bodily_injury_per_accident')),
    property_damage_per_accident: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.invalid('property_damage_per_accident')),
    each_occourrence_umbrella: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.invalid('each_occourrence_umbrella')),
    aggregate: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.invalid('aggregate')),
    each_accident: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.invalid('each_accident')),
    disease_ea_employee: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.invalid('disease_ea_employee')),
    disease_policy_limit: yup.string().matches(/^[$,0-9]*$/, ERROR_MESSAGES.invalid('disease_policy_limit')),
    exp_date: yup.string().matches(/^\d{4}-\d{1,2}-\d{1,2}$/, ERROR_MESSAGES.invalid('exp_date')).required(),
};

const extractFrom = (values) => {
    const extracted = {...values};
    for (const key in extracted) {
        if (key === 'passwordConfirmation') {
            extracted[key] = validationSchema[key](values);
        } else {
            extracted[key] = validationSchema[key];
        }
    }
    return extracted;
};

const getYupValidationSchema = values => yup.object().shape(extractFrom(values));

export default getYupValidationSchema;
