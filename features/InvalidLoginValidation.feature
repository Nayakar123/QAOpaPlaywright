Feature: ECommerce Invalid Login Validations
    @Validation
    Scenario Outline: Invalid Login
        Given login to the Ecommerce2 application with the "<username>" and "<password>"
        Then Verify the error message displayed
        Examples:
            | username                   | password    |
            | girish.nayakar25@gmail.com | Renuka@1234 |
            | hello@gmail.com            | Renuka@123  |
            | girish.nayakar@gmail.com   | Renuka@1234 |
            | girish.nayakar25@gmail.com |             |
            |                            | Renuka@1234 |
            | girish.nayakar25@gmail.com |             |
            |                            | Renuka@1234 |