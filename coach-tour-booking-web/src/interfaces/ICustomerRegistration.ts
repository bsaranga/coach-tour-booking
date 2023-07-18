interface ICustomerRegistration {
    customerDetails: CustomerDetails;
    customerLoginCredentials: CustomerLoginCredentials;
}

interface CustomerDetails {
    firstName: string;
    lastName: string;
    surname: string;
    emailAddress: string;
    dateOfBirth: string;
    euPassportNumber: string;
    address1: string;
    address2: string;
    country: string;
    phone: string;
}

interface CustomerLoginCredentials {
    username: string;
    password: string;
}

export default ICustomerRegistration;