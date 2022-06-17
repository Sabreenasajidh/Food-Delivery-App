const validate = (values) => {
  console.log(values);
  
    const errors = {};
    if (!values.first_name) {
      errors.first_name = 'Required';
    } else if (values.first_name.length > 15) {
      errors.first_name = 'Must be 15 characters or less';
    }
  
    if (!values.last_name) {
      errors.last_name = 'Required';
    } else if (values.last_name.length > 20) {
      errors.last_name = 'Must be 20 characters or less';
    }
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.phone_number) {
      errors.phone_number = 'Required';
    }else if (values.phone_number.length > 10){
      errors.phone_number = 'phone no. should be 10 numbers';
    }
     if (!values.role) {
      errors.role = 'Required';
    }   
    return errors;
  };
  export default validate
//  